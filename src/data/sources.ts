export type SourceKind =
  | 'quran'
  | 'hadith'
  | 'biography'
  | 'history'
  | 'demography'
  | 'knowledge-base'
  | 'corpus'
  | 'local';

export type SourceAccess = 'open' | 'requires-key' | 'commercial' | 'local' | 'reference-only';

export type BaseReliability = 'primary' | 'strong' | 'use-with-review' | 'seed-only';

export interface DataSource {
  id: string;
  title: string;
  author?: string;
  kind: SourceKind;
  language: 'ar' | 'en' | 'ur' | 'multi';
  access: SourceAccess;
  baseReliability: BaseReliability;
  url?: string;
  licenseNote?: string;
  notes?: string;
}

export const SOURCE_REGISTRY = {
  quran: {
    id: 'quran',
    title: 'Quran',
    kind: 'quran',
    language: 'ar',
    access: 'open',
    baseReliability: 'primary',
    url: 'https://quran.com',
    notes: 'Use verse keys and edition-specific text references.',
  },
  'quran-com-api': {
    id: 'quran-com-api',
    title: 'Quran.com / Quran Foundation API',
    kind: 'quran',
    language: 'multi',
    access: 'open',
    baseReliability: 'strong',
    url: 'https://api-docs.quran.com',
    notes: 'Programmatic verse, translation, tafsir, audio, and word-level metadata source.',
  },
  bukhari: {
    id: 'bukhari',
    title: 'Sahih al-Bukhari',
    author: 'Muhammad ibn Ismail al-Bukhari',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'primary',
    url: 'https://sunnah.com/bukhari',
  },
  muslim: {
    id: 'muslim',
    title: 'Sahih Muslim',
    author: 'Muslim ibn al-Hajjaj',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'primary',
    url: 'https://sunnah.com/muslim',
  },
  tirmidhi: {
    id: 'tirmidhi',
    title: "Jami' al-Tirmidhi",
    author: 'Muhammad ibn Isa al-Tirmidhi',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
    url: 'https://sunnah.com/tirmidhi',
  },
  'abu-dawud': {
    id: 'abu-dawud',
    title: 'Sunan Abi Dawud',
    author: 'Abu Dawud al-Sijistani',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
    url: 'https://sunnah.com/abudawud',
  },
  'ibn-majah': {
    id: 'ibn-majah',
    title: 'Sunan Ibn Majah',
    author: 'Ibn Majah',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
    url: 'https://sunnah.com/ibnmajah',
  },
  nasai: {
    id: 'nasai',
    title: "Sunan al-Nasa'i",
    author: "Ahmad ibn Shu'ayb al-Nasa'i",
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
    url: 'https://sunnah.com/nasai',
  },
  ahmad: {
    id: 'ahmad',
    title: 'Musnad Ahmad',
    author: 'Ahmad ibn Hanbal',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
    notes: 'Report-level grading is required before using as strong evidence.',
  },
  'ibn-sad-tabaqat': {
    id: 'ibn-sad-tabaqat',
    title: 'Kitab al-Tabaqat al-Kabir',
    author: "Muhammad ibn Sa'd",
    kind: 'biography',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
    notes: 'Early biographical dictionary; cite edition, volume, and page.',
  },
  'brill-tabaqat': {
    id: 'brill-tabaqat',
    title: "Brill Scholarly Editions: Kitab al-Tabaqat al-Kabir",
    author: "Muhammad ibn Sa'd",
    kind: 'biography',
    language: 'ar',
    access: 'commercial',
    baseReliability: 'strong',
    url: 'https://scholarlyeditions.brill.com/tbqo/',
    notes: 'Scholarly edition metadata and searchable edition; access may require subscription.',
  },
  'ibn-hisham-seerah': {
    id: 'ibn-hisham-seerah',
    title: 'Sirat Ibn Hisham',
    author: 'Ibn Hisham',
    kind: 'history',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
    notes: 'Use for seerah reports with isnad/source review when possible.',
  },
  'ibn-hajar-isabah': {
    id: 'ibn-hajar-isabah',
    title: 'al-Isabah fi Tamyiz al-Sahabah',
    author: 'Ibn Hajar al-Asqalani',
    kind: 'biography',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
    notes: 'Major companion biographical source; cite edition, volume, and page.',
  },
  'dhahabi-siyar': {
    id: 'dhahabi-siyar',
    title: "Siyar A'lam al-Nubala",
    author: 'al-Dhahabi',
    kind: 'biography',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'strong',
  },
  hakim: {
    id: 'hakim',
    title: 'al-Mustadrak ala al-Sahihayn',
    author: 'al-Hakim al-Naysaburi',
    kind: 'hadith',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
    notes: 'Claims require independent grading review.',
  },
  'bidaya-nihaya': {
    id: 'bidaya-nihaya',
    title: "al-Bidaya wa'l-Nihaya",
    author: 'Ibn Kathir',
    kind: 'history',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
  },
  'ibn-asakir': {
    id: 'ibn-asakir',
    title: 'Tarikh Dimashq',
    author: 'Ibn Asakir',
    kind: 'history',
    language: 'ar',
    access: 'reference-only',
    baseReliability: 'use-with-review',
  },
  openiti: {
    id: 'openiti',
    title: 'OpenITI Corpus',
    kind: 'corpus',
    language: 'multi',
    access: 'open',
    baseReliability: 'use-with-review',
    url: 'https://openiti.org/projects/OpenITI%20Corpus.html',
    notes: 'Machine-actionable corpus; text provenance and edition fidelity must be checked.',
  },
  wikidata: {
    id: 'wikidata',
    title: 'Wikidata',
    kind: 'knowledge-base',
    language: 'multi',
    access: 'open',
    baseReliability: 'seed-only',
    url: 'https://www.wikidata.org/wiki/Q188711',
    licenseNote: 'Structured data is CC0; individual claims still require verification.',
    notes: 'Use for identifiers, aliases, and reconciliation, not final authority.',
  },
  pew: {
    id: 'pew',
    title: 'Pew Research Center Religious Demography',
    kind: 'demography',
    language: 'en',
    access: 'open',
    baseReliability: 'strong',
    url: 'https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/',
    notes: 'Use for modern Muslim population estimates and methodology notes.',
  },
  'local-profile-data': {
    id: 'local-profile-data',
    title: 'Local Sahabah profile dataset',
    kind: 'local',
    language: 'multi',
    access: 'local',
    baseReliability: 'seed-only',
    notes: 'Internal curated content. Claims using only this source are draft until externally cited.',
  },
} as const satisfies Record<string, DataSource>;

export type SourceId = keyof typeof SOURCE_REGISTRY;

export interface CitationRef {
  sourceId: SourceId;
  locator?: string;
  hadithNo?: string;
  url?: string;
  quoteSnippet?: string;
  note?: string;
}

export function getSource(sourceId: SourceId): DataSource {
  return SOURCE_REGISTRY[sourceId];
}

export function isExternalCitation(citation: CitationRef): boolean {
  return SOURCE_REGISTRY[citation.sourceId].kind !== 'local';
}
