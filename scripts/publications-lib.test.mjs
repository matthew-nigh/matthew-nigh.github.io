import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assertExpectedAuthor,
  assertSafeOutput,
  mergeCatalog,
  normalizeTitle,
  paperFromSemanticScholar,
  papersFromDblpRows,
} from './publications-lib.mjs';

const conference = {
  title: 'Efficient CNN-Based Super Resolution Algorithms for Mmwave Mobile Radar Imaging.',
  year: 2022,
  venue: 'IEEE International Conference on Image Processing (ICIP)',
  authors: [
    'Christos Vasileiou',
    'Josiah W. Smith',
    'Shiva Thiagarajan',
    'Matthew Nigh',
    'Yiorgos Makris',
    'Murat Torlak',
  ],
  doi: '10.1109/ICIP46576.2022.9897190',
  dblpKey: 'conf/icip/VasileiouSTNMT22',
  sources: ['dblp'],
  preprint: false,
};

const preprint = {
  title: 'Efficient CNN-based Super Resolution Algorithms for mmWave Mobile Radar Imaging',
  year: 2023,
  venue: 'CoRR',
  authors: ['Christos Vasileiou', 'Matthew Nigh'],
  doi: '10.48550/ARXIV.2305.02092',
  dblpKey: 'journals/corr/abs-2305-02092',
  arxivId: '2305.02092',
  sources: ['dblp'],
  preprint: true,
};

test('normalizeTitle ignores case and punctuation', () => {
  assert.equal(
    normalizeTitle('Efficient CNN-based Super Resolution.'),
    'efficient cnn based super resolution',
  );
});

test('merge keeps papers missing from the remote response', () => {
  const existing = [
    {
      id: 'manual:beyond-monte-carlo',
      title: 'Beyond Monte Carlo Methods for Wafer Test',
      year: 2026,
      venue: 'IEEE International Test Conference (ITC)',
      authors: [],
      sources: ['manual'],
    },
  ];
  const merged = mergeCatalog(existing, [conference]);
  assert.equal(merged.length, 2);
  assert.ok(merged.some((paper) => paper.id === 'manual:beyond-monte-carlo'));
});

test('a conference record replaces an earlier arXiv record for the same paper', () => {
  const merged = mergeCatalog([], [preprint, conference]);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].year, 2022);
  assert.equal(
    merged[0].venue,
    'IEEE International Conference on Image Processing (ICIP)',
  );
  assert.equal(merged[0].doi, '10.1109/ICIP46576.2022.9897190');
  assert.equal(merged[0].arxivId, '2305.02092');
});

test('merge collapses an arXiv copy into the conference paper', () => {
  const merged = mergeCatalog([], [conference, preprint]);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].arxivId, '2305.02092');
  assert.equal(
    merged[0].venue,
    'IEEE International Conference on Image Processing (ICIP)',
  );
  assert.equal(merged[0].authors.length, 6);
  assert.equal(merged[0].doi, '10.1109/ICIP46576.2022.9897190');
});

test('a longer source title replaces a short stub and keeps citation counts', () => {
  const existing = [
    {
      id: 'doi:10.1109/example',
      title: 'WALET',
      year: 2026,
      venue: 'IEEE VLSI Test Symposium (VTS)',
      authors: ['Matthew Nigh'],
      sources: ['manual'],
    },
  ];
  const merged = mergeCatalog(existing, [
    {
      title:
        'WALET: SHAP-Guided Classification of Wafer-Level E-Test Variability',
      year: 2026,
      venue: 'IEEE VLSI Test Symposium (VTS)',
      authors: ['Ching-Yi Chang', 'Matthew Nigh'],
      doi: '10.1109/example',
      citationCount: 4,
      sources: ['semantic-scholar'],
    },
  ]);
  assert.equal(merged.length, 1);
  assert.match(merged[0].title, /^WALET: SHAP-Guided/);
  assert.equal(merged[0].citationCount, 4);
  assert.equal(merged[0].id, 'doi:10.1109/example');
});

test('an empty incoming author list does not wipe DBLP authors', () => {
  const merged = mergeCatalog([conference], [
    {
      title: conference.title,
      doi: conference.doi,
      citationCount: 30,
      authors: [],
      sources: ['semantic-scholar'],
    },
  ]);
  assert.equal(merged[0].authors[3], 'Matthew Nigh');
  assert.equal(merged[0].citationCount, 30);
});

test('DBLP rows become ordered author lists and expanded venues', () => {
  const papers = papersFromDblpRows([
    {
      pub: { value: 'https://dblp.org/rec/conf/itc/NighCM24' },
      title: {
        value:
          'Generation and Quality Evaluation of Synthetic Process Control Monitoring Data.',
      },
      year: { value: '2024' },
      doi: { value: 'https://doi.org/10.1109/ITC51657.2024.00042' },
      venue: { value: 'ITC' },
      authorName: { value: 'John M. Carulli' },
      ordinal: { value: '2' },
    },
    {
      pub: { value: 'https://dblp.org/rec/conf/itc/NighCM24' },
      title: {
        value:
          'Generation and Quality Evaluation of Synthetic Process Control Monitoring Data.',
      },
      year: { value: '2024' },
      doi: { value: 'https://doi.org/10.1109/ITC51657.2024.00042' },
      venue: { value: 'ITC' },
      authorName: { value: 'Matthew Nigh' },
      ordinal: { value: '1' },
    },
  ]);
  assert.equal(papers.length, 1);
  assert.deepEqual(papers[0].authors, ['Matthew Nigh', 'John M. Carulli']);
  assert.equal(
    papers[0].venue,
    'IEEE International Test Conference (ITC)',
  );
  assert.equal(papers[0].preprint, false);
});

test('Semantic Scholar records keep citation counts and DOIs', () => {
  const paper = paperFromSemanticScholar({
    paperId: 'abc',
    title: 'STAMP: Semiconductor Tool-chain Attestation',
    year: 2026,
    venue: 'Proceedings of the 63rd ACM/IEEE Design Automation Conference',
    citationCount: 0,
    externalIds: { DOI: '10.1145/3770743.3804428' },
    authors: [{ name: 'Matthew Nigh' }],
    url: 'https://www.semanticscholar.org/paper/abc',
  });
  assert.equal(paper.citationCount, 0);
  assert.equal(paper.doi, '10.1145/3770743.3804428');
  assert.equal(paper.url, 'https://doi.org/10.1145/3770743.3804428');
});

test('author verification rejects a different Matthew Nigh', () => {
  assert.throws(() =>
    assertExpectedAuthor(
      [{ title: 'Unrelated biology paper about cells' }],
      ['Unveiling the Mask', 'Generation and Quality Evaluation'],
      2,
      'DBLP',
    ),
  );
});

test('author verification accepts known titles', () => {
  const matched = assertExpectedAuthor(
    [
      {
        title:
          'Generation and Quality Evaluation of Synthetic Process Control Monitoring Data',
      },
      { title: 'Unveiling the Mask: Trusted Semiconductor Manufacturing' },
    ],
    ['Generation and Quality Evaluation', 'Unveiling the Mask'],
    2,
    'Semantic Scholar',
  );
  assert.equal(matched.length, 2);
});

test('the updater may only write publications.json', () => {
  assert.doesNotThrow(() =>
    assertSafeOutput('/tmp/src/data/publications.json'),
  );
  assert.throws(() =>
    assertSafeOutput('/tmp/src/data/publication-overrides.json'),
  );
});
