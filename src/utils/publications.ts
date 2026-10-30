import catalogJson from '../data/publications.json';
import overridesJson from '../data/publication-overrides.json';

export interface CatalogPaper {
  id: string;
  title: string;
  year?: number;
  venue?: string;
  authors?: string[];
  url?: string;
  citationCount?: number;
}

interface MatchRule {
  titleIncludes?: string;
  year?: number;
  venueIncludes?: string;
}

interface OverrideEntry {
  id: string;
  match?: MatchRule;
  order?: number;
  highlight?: boolean;
  badge?: string;
  note?: string;
  fallback?: {
    title: string;
    venue?: string;
    year?: number | null;
    url?: string;
  };
}

interface CatalogFile {
  papers?: CatalogPaper[];
}

interface OverridesFile {
  scholarUrl?: string;
  entries?: OverrideEntry[];
}

export interface PublicationView {
  id: string;
  title: string;
  venue: string;
  year: number | null;
  authors: string;
  link: string;
  description: string;
  badges: string[];
  citationCount: number | null;
  order: number | null;
}

const matches = (
  paper: { title?: string; year?: number | null; venue?: string },
  match?: MatchRule,
): boolean => {
  if (
    !match?.titleIncludes &&
    match?.year === undefined &&
    !match?.venueIncludes
  ) {
    return false;
  }
  if (
    match.titleIncludes &&
    !(paper.title || '')
      .toLowerCase()
      .includes(match.titleIncludes.toLowerCase())
  ) {
    return false;
  }
  if (typeof match.year === 'number' && paper.year !== match.year) return false;
  if (
    match.venueIncludes &&
    !(paper.venue || '')
      .toLowerCase()
      .includes(match.venueIncludes.toLowerCase())
  ) {
    return false;
  }
  return true;
};

export const buildPublicationView = (
  catalog: CatalogFile,
  overrides: OverridesFile,
): { scholarUrl: string; papers: PublicationView[] } => {
  const scholarUrl = overrides.scholarUrl || '';
  const entries = overrides.entries || [];
  const used = new Set<string>();
  const cards: PublicationView[] = (catalog.papers || []).map((paper) => {
    const entry = entries.find((candidate) => matches(paper, candidate.match));
    if (entry) used.add(entry.id);
    return {
      id: paper.id,
      title: paper.title,
      venue: paper.venue || '',
      year: paper.year ?? null,
      authors: (paper.authors || []).join(', '),
      link: paper.url || scholarUrl,
      description: entry?.note || '',
      badges: entry?.badge ? [entry.badge] : [],
      citationCount:
        typeof paper.citationCount === 'number' ? paper.citationCount : null,
      order: entry?.order ?? null,
    };
  });

  entries.forEach((entry) => {
    if (used.has(entry.id) || !entry.fallback) return;
    cards.push({
      id: entry.id,
      title: entry.fallback.title,
      venue: entry.fallback.venue || '',
      year: entry.fallback.year ?? null,
      authors: '',
      link: entry.fallback.url || scholarUrl,
      description: entry.note || '',
      badges: entry.badge ? [entry.badge] : [],
      citationCount: null,
      order: entry.order ?? null,
    });
  });

  const mostCited = cards.reduce((max, card) => {
    if (card.citationCount && card.citationCount > max)
      return card.citationCount;
    return max;
  }, 0);
  if (mostCited > 0) {
    cards.forEach((card) => {
      if (
        card.citationCount === mostCited &&
        !card.badges.includes('Most cited')
      ) {
        card.badges.push('Most cited');
      }
    });
  }

  cards.sort((left, right) => {
    const orderDelta = (left.order ?? 10000) - (right.order ?? 10000);
    if (orderDelta !== 0) return orderDelta;
    return (
      (right.year ?? 0) - (left.year ?? 0) ||
      left.title.localeCompare(right.title)
    );
  });

  return { scholarUrl, papers: cards };
};

export const publicationView = buildPublicationView(
  catalogJson as CatalogFile,
  overridesJson as OverridesFile,
);
