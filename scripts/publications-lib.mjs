import path from 'node:path';

export const VENUE_NAMES = {
  ITC: 'IEEE International Test Conference (ITC)',
  VTS: 'IEEE VLSI Test Symposium (VTS)',
  ICIP: 'IEEE International Conference on Image Processing (ICIP)',
  ICCAD: 'IEEE/ACM International Conference on Computer-Aided Design (ICCAD)',
  DAC: 'ACM/IEEE Design Automation Conference (DAC)',
};

const PAPER_KEYS = [
  'id',
  'title',
  'year',
  'venue',
  'authors',
  'doi',
  'url',
  'dblpKey',
  'dblpUrl',
  'semanticScholarId',
  'semanticScholarUrl',
  'arxivId',
  'citationCount',
  'sources',
];

export function normalizeTitle(title) {
  return String(title || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function titlesMatch(left, right) {
  if (!left || !right) return false;
  if (left === right) return true;
  const [shorter, longer] =
    left.length < right.length ? [left, right] : [right, left];
  return shorter.length >= 24 && longer.includes(shorter);
}

export function doiPath(doi) {
  if (!doi) return '';
  return String(doi)
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .trim();
}

export function chooseVenue(dblpVenue, semanticScholarVenue) {
  if (dblpVenue && VENUE_NAMES[dblpVenue]) return VENUE_NAMES[dblpVenue];
  if (dblpVenue && dblpVenue !== 'CoRR') return dblpVenue;
  if (semanticScholarVenue) return semanticScholarVenue;
  return dblpVenue || '';
}

export function isPreprint(paper) {
  const venue = String(paper?.venue || '').toLowerCase();
  const dblpKey = String(paper?.dblpKey || '').toLowerCase();
  const id = String(paper?.id || '').toLowerCase();
  return (
    paper?.preprint === true ||
    venue === 'corr' ||
    venue.includes('arxiv') ||
    dblpKey.includes('journals/corr') ||
    id.includes('journals/corr')
  );
}

function clone(paper) {
  return {
    ...paper,
    authors: paper.authors ? [...paper.authors] : [],
    sources: paper.sources ? [...paper.sources] : [],
  };
}

function doiFromId(id) {
  const value = String(id || '');
  return value.startsWith('doi:') ? value.slice(4).toLowerCase() : '';
}

function samePaper(left, right) {
  const leftDoi = doiPath(left.doi).toLowerCase() || doiFromId(left.id);
  const rightDoi = doiPath(right.doi).toLowerCase() || doiFromId(right.id);
  if (leftDoi && rightDoi && leftDoi === rightDoi) return true;
  if (left.dblpKey && right.dblpKey && left.dblpKey === right.dblpKey) {
    return true;
  }
  if (
    left.semanticScholarId &&
    right.semanticScholarId &&
    left.semanticScholarId === right.semanticScholarId
  ) {
    return true;
  }
  return titlesMatch(normalizeTitle(left.title), normalizeTitle(right.title));
}

function preferAuthors(target, extra) {
  const extraAuthors = extra.authors || [];
  const targetAuthors = target.authors || [];
  if (!extraAuthors.length) return targetAuthors;
  if (!targetAuthors.length) return extraAuthors;
  const extraDblp = (extra.sources || []).includes('dblp');
  const targetDblp = (target.sources || []).includes('dblp');
  if (targetDblp && !extraDblp) return targetAuthors;
  if (extraAuthors.join(' ').length >= targetAuthors.join(' ').length) {
    return extraAuthors;
  }
  return targetAuthors;
}

function mergeInto(target, extra) {
  const extraTitle = String(extra.title || '')
    .trim()
    .replace(/\.$/, '');
  const targetTitle = String(target.title || '')
    .trim()
    .replace(/\.$/, '');
  if (normalizeTitle(extraTitle).length > normalizeTitle(targetTitle).length) {
    target.title = extraTitle;
  } else {
    target.title = targetTitle;
  }

  if (!target.year && extra.year) target.year = extra.year;

  const extraHasDblp = (extra.sources || []).includes('dblp');
  const targetHasDblp = (target.sources || []).includes('dblp');
  if (extra.venue && (!target.venue || (extraHasDblp && !targetHasDblp))) {
    target.venue = extra.venue;
  }

  target.authors = preferAuthors(target, extra);

  if (isPreprint(target) && !isPreprint(extra)) {
    if (extra.venue) target.venue = extra.venue;
    if (extra.year) target.year = extra.year;
    if (extra.authors?.length) target.authors = extra.authors;
    if (extra.doi) target.doi = doiPath(extra.doi);
    if (extra.dblpKey && !String(extra.dblpKey).includes('journals/corr')) {
      target.dblpKey = extra.dblpKey;
      target.dblpUrl =
        extra.dblpUrl || `https://dblp.org/rec/${extra.dblpKey}`;
    }
    target.preprint = false;
  }

  if (typeof extra.citationCount === 'number') {
    target.citationCount = extra.citationCount;
  }

  for (const key of [
    'doi',
    'dblpKey',
    'dblpUrl',
    'semanticScholarId',
    'semanticScholarUrl',
    'arxivId',
  ]) {
    if (!target[key] && extra[key]) target[key] = extra[key];
  }

  if (target.doi) {
    const pathOnly = doiPath(target.doi);
    target.doi = pathOnly;
    target.url = `https://doi.org/${pathOnly}`;
  } else if (!target.url && extra.url) {
    target.url = extra.url;
  }

  target.sources = Array.from(
    new Set([...(target.sources || []), ...(extra.sources || [])]),
  );
  if (!isPreprint(extra)) target.preprint = false;
}

function collapsePreprints(papers) {
  const groups = new Map();
  for (const paper of papers) {
    const key = normalizeTitle(paper.title);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(paper);
  }

  const collapsed = [];
  for (const group of groups.values()) {
    const primary = group.find((paper) => !isPreprint(paper)) || group[0];
    for (const other of group) {
      if (other !== primary) mergeInto(primary, other);
    }
    if (group.some((paper) => !isPreprint(paper))) primary.preprint = false;
    collapsed.push(primary);
  }
  return collapsed;
}

function paperId(paper) {
  if (paper.id) return paper.id;
  const doi = doiPath(paper.doi).toLowerCase();
  if (doi) return `doi:${doi}`;
  if (paper.dblpKey) return `dblp:${paper.dblpKey}`;
  if (paper.semanticScholarId) return `s2:${paper.semanticScholarId}`;
  return `title:${normalizeTitle(paper.title)}`;
}

export function serializePaper(paper) {
  const serialized = { id: paperId(paper) };
  for (const key of PAPER_KEYS) {
    if (key === 'id') continue;
    const value = paper[key];
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    serialized[key] = value;
  }
  serialized.title = String(serialized.title || '')
    .trim()
    .replace(/\.$/, '');
  if (typeof paper.citationCount === 'number') {
    serialized.citationCount = paper.citationCount;
  }
  return serialized;
}

export function mergeCatalog(existingPapers, incomingPapers) {
  const papers = (existingPapers || []).map(clone);
  for (const incoming of incomingPapers || []) {
    if (!incoming?.title) continue;
    const match = papers.find((paper) => samePaper(paper, incoming));
    if (match) mergeInto(match, incoming);
    else papers.push(clone(incoming));
  }

  return collapsePreprints(papers)
    .map(serializePaper)
    .sort(
      (left, right) =>
        (right.year || 0) - (left.year || 0) ||
        left.title.localeCompare(right.title),
    );
}

export function countExpectedMatches(papers, fragments) {
  return (fragments || []).filter((fragment) =>
    (papers || []).some((paper) =>
      normalizeTitle(paper.title).includes(normalizeTitle(fragment)),
    ),
  );
}

export function assertExpectedAuthor(papers, fragments, minimum, label) {
  if (!papers?.length) {
    throw new Error(`${label} returned no papers`);
  }
  const matched = countExpectedMatches(papers, fragments);
  if (matched.length < minimum) {
    throw new Error(
      `${label} does not match Matthew Nigh's known papers (matched ${matched.length} of ${fragments.length}: ${matched.join('; ') || 'none'})`,
    );
  }
  return matched;
}

export function assertSafeOutput(filePath) {
  if (path.basename(filePath) !== 'publications.json') {
    throw new Error(`Refusing to write ${filePath}`);
  }
}

export function papersFromDblpRows(rows) {
  const grouped = new Map();
  for (const row of rows || []) {
    const id = row.pub?.value;
    if (!id) continue;
    if (!grouped.has(id)) {
      grouped.set(id, {
        title: row.title?.value || '',
        year: row.year?.value ? Number(row.year.value) : undefined,
        doi: row.doi?.value || '',
        venue: row.venue?.value || '',
        authors: [],
      });
    }
    if (row.authorName?.value) {
      grouped.get(id).authors.push({
        ordinal: Number(row.ordinal?.value || 0),
        name: row.authorName.value,
      });
    }
  }

  return Array.from(grouped.entries()).map(([pub, record]) => {
    const dblpKey = pub.replace('https://dblp.org/rec/', '');
    const authors = record.authors
      .sort((left, right) => left.ordinal - right.ordinal)
      .map((author) => author.name)
      .filter((name, index, list) => list.indexOf(name) === index);
    const preprint =
      dblpKey.includes('journals/corr') || record.venue === 'CoRR';
    const doi = doiPath(record.doi);
    return {
      title: record.title,
      year: Number.isFinite(record.year) ? record.year : undefined,
      venue: chooseVenue(record.venue, ''),
      authors,
      doi,
      url: doi ? `https://doi.org/${doi}` : `https://dblp.org/rec/${dblpKey}`,
      dblpKey,
      dblpUrl: `https://dblp.org/rec/${dblpKey}`,
      preprint,
      sources: ['dblp'],
    };
  });
}

export function paperFromSemanticScholar(item) {
  const externalIds = item.externalIds || {};
  const doi = doiPath(externalIds.DOI || '');
  const dblpKey = externalIds.DBLP || '';
  const venue = chooseVenue(
    '',
    item.publicationVenue?.name || item.venue || '',
  );
  return {
    title: item.title,
    year: item.year || undefined,
    venue,
    authors: (item.authors || []).map((author) => author.name).filter(Boolean),
    doi,
    url: doi
      ? `https://doi.org/${doi}`
      : item.url || '',
    dblpKey,
    dblpUrl: dblpKey ? `https://dblp.org/rec/${dblpKey}` : '',
    semanticScholarId: item.paperId,
    semanticScholarUrl: item.url || '',
    arxivId: externalIds.ArXiv || '',
    citationCount:
      typeof item.citationCount === 'number' ? item.citationCount : undefined,
    preprint: false,
    sources: ['semantic-scholar'],
  };
}
