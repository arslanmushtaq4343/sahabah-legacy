/**
 * Canonical client-side types for the Sahabah Archive.
 *
 * These were previously re-exported from a `@sahabah/shared-types` package that
 * was never installed in this repo, leaving every consumer with implicit `any`.
 * The types are now defined locally so the client builds cleanly on its own.
 */

export type CompanionCategory =
  | 'caliph'
  | 'warrior'
  | 'general'
  | 'scholar'
  | 'narrator'
  | 'wife'
  | 'martyr'
  | 'other';

export type RelType =
  | 'companion'
  | 'family'
  | 'wife'
  | 'son'
  | 'daughter'
  | 'father'
  | 'mother'
  | 'brother'
  | 'sister'
  | 'cousin'
  | 'uncle'
  | 'in-law'
  | 'student'
  | 'teacher'
  | 'freed-slave'
  | 'other';

export type ConversionEra = 'early' | 'middle' | 'late';

export type Language = 'en' | 'ur';

export type SortField = 'rank' | 'name' | 'hadiths' | 'battles';
export type SortDir = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: CompanionCategory | 'all';
  sortField: SortField;
  sortDir: SortDir;
}

export interface CompareState {
  ranks: number[];
}

export interface RadarMetric {
  subject: string;
  value: number;
}

export interface ConnectionEdge {
  source: number;
  target: number;
  type: string;
  weight?: number;
  label?: string;
}

export interface InsightDataPoint {
  label: string;
  value: number;
  color?: string;
  rank?: number;
}

export interface CompanionsApiResponse {
  companions: Companion[];
  total: number;
}

export interface Companion {
  rank: number;
  name: string;
  ar: string;
  ur: string;
  title: string;
  cat: CompanionCategory;
  catLabel: string;
  rel: string;
  relType: RelType | string;
  born: string;
  death: string;
  place: string;
  tribe: string;
  sig: string;
  contrib: string;
  hadiths: number;
  battles: string[];
  burial: string;
  quote: string;
  quoteEn: string;
  link: string;
  personality: string[];
  appearance: string;
  keyEvent: string;
  legacy: string;
  miracles: string | string[];

  /* Optional fields (present on some companions only) */
  caliphate?: string;
  convera?: ConversionEra;

  /* Optional Urdu overlays (provided per-companion in companionsUr.ts) */
  sigUr?: string;
  contribUr?: string;
  quoteUr?: string;
  linkUr?: string;
  personalityUr?: string | string[];
  legacyUr?: string;
  keyEventUr?: string;
  appearanceUr?: string;
  miraclesUr?: string | string[];
}
