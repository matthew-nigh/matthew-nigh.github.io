import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  assertExpectedAuthor,
  assertSafeOutput,
  mergeCatalog,
  paperFromSemanticScholar,
  papersFromDblpRows,
} from './publications-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcesFile = path.join(root, 'src/data/publication-sources.json');
const publicationsFile = path.join(root, 'src/data/publications.json');

const SPARQL = `PREFIX dblp: <https://dblp.org/rdf/schema#>
SELECT ?pub ?title ?year ?doi ?venue ?authorName ?ordinal WHERE {
  ?pub dblp:authoredBy <https://dblp.org/pid/PID> .
  ?pub dblp:title ?title .
  OPTIONAL { ?pub dblp:yearOfPublication ?year . }
  OPTIONAL { ?pub dblp:doi ?doi . }
  OPTIONAL { ?pub dblp:publishedIn ?venue . }
  OPTIONAL {
    ?pub dblp:hasSignature ?sig .
    ?sig dblp:signatureDblpName ?authorName .
    ?sig dblp:signatureOrdinal ?ordinal .
  }
}`;

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'matthew-nigh-github-pages',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

async function fetchDblp(pid) {
  const query = SPARQL.replace('PID', pid);
  const endpoint = new URL('https://sparql.dblp.org/sparql');
  endpoint.searchParams.set('query', query);
  const body = await fetchJson(endpoint, {
    headers: { Accept: 'application/sparql-results+json' },
  });
  return papersFromDblpRows(body?.results?.bindings || []);
}

async function fetchSemanticScholar(authorId) {
  const papers = [];
  let offset = 0;
  const fields = [
    'title',
    'year',
    'venue',
    'publicationVenue',
    'externalIds',
    'citationCount',
    'authors',
    'url',
  ].join(',');

  while (offset < 1000) {
    const endpoint = new URL(
      `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers`,
    );
    endpoint.searchParams.set('limit', '100');
    endpoint.searchParams.set('offset', String(offset));
    endpoint.searchParams.set('fields', fields);
    const body = await fetchJson(endpoint);
    const page = body.data || [];
    papers.push(...page.map(paperFromSemanticScholar));
    if (page.length < 100) break;
    offset += page.length;
  }
  return papers;
}

function readExistingPapers() {
  if (!fs.existsSync(publicationsFile)) return [];
  const parsed = JSON.parse(fs.readFileSync(publicationsFile, 'utf8'));
  return parsed.papers || [];
}

async function loadSource(label, loader) {
  try {
    return await loader();
  } catch (error) {
    console.warn(`${label} request failed: ${error.message}`);
    return null;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const sources = JSON.parse(fs.readFileSync(sourcesFile, 'utf8'));
  const fragments = sources.expectedTitleFragments || [];
  const minimum = sources.minimumExpectedMatches || 3;

  const dblpPapers = await loadSource('DBLP', () =>
    fetchDblp(sources.dblpPid),
  );
  const semanticScholarPapers = await loadSource('Semantic Scholar', () =>
    fetchSemanticScholar(sources.semanticScholarAuthorId),
  );

  if (!dblpPapers && !semanticScholarPapers) {
    throw new Error('Both DBLP and Semantic Scholar requests failed');
  }

  if (dblpPapers) {
    assertExpectedAuthor(dblpPapers, fragments, minimum, 'DBLP');
  }
  if (semanticScholarPapers) {
    assertExpectedAuthor(
      semanticScholarPapers,
      fragments,
      minimum,
      'Semantic Scholar',
    );
  }

  const incoming = [...(dblpPapers || []), ...(semanticScholarPapers || [])];
  const merged = mergeCatalog(readExistingPapers(), incoming);
  const next = {
    sources: {
      dblpPid: sources.dblpPid,
      semanticScholarAuthorId: sources.semanticScholarAuthorId,
    },
    papers: merged,
  };
  const previous = fs.existsSync(publicationsFile)
    ? JSON.parse(fs.readFileSync(publicationsFile, 'utf8'))
    : {};
  const changed =
    JSON.stringify(previous.papers || []) !== JSON.stringify(next.papers);

  console.log(
    `DBLP papers: ${dblpPapers ? dblpPapers.length : 'unavailable'}; Semantic Scholar papers: ${semanticScholarPapers ? semanticScholarPapers.length : 'unavailable'}; catalog size: ${merged.length}; changed: ${changed}`,
  );

  if (!changed) return;
  if (dryRun) {
    console.log(JSON.stringify(next, null, 2));
    return;
  }

  assertSafeOutput(publicationsFile);
  fs.writeFileSync(publicationsFile, `${JSON.stringify(next, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
