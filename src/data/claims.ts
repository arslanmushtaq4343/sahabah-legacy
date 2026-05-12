import { COMPANIONS } from './companions';
import { SOURCE_CLAIMS, type ReliabilityLevel } from './companionExtras';
import type { CitationRef, SourceId } from './sources';

export type ClaimEntityType = 'companion' | 'imam' | 'event' | 'place' | 'population';

export type ClaimField =
  | 'birth'
  | 'death'
  | 'birthplace'
  | 'burial'
  | 'tribe'
  | 'category'
  | 'relationship'
  | 'family'
  | 'battle'
  | 'virtue'
  | 'event'
  | 'quote'
  | 'hadith_count'
  | 'occupation'
  | 'quran_link'
  | 'miracle'
  | 'population_estimate'
  | 'source_note';

export type ClaimConfidence = 'strong' | 'moderate' | 'weak' | 'disputed';

export type ClaimStatus = 'draft' | 'review' | 'verified';

export interface HistoricalClaim {
  id: string;
  entityType: ClaimEntityType;
  entityId: string;
  entityName: string;
  companionRank?: number;
  field: ClaimField;
  label: string;
  value: string | number | string[];
  citations: CitationRef[];
  confidence: ClaimConfidence;
  status: ClaimStatus;
  tags?: string[];
  notes?: string;
}

export const CLAIM_FIELD_META: Record<ClaimField, { label: string; highRisk: boolean }> = {
  birth: { label: 'Birth', highRisk: false },
  death: { label: 'Death', highRisk: true },
  birthplace: { label: 'Birthplace', highRisk: false },
  burial: { label: 'Burial', highRisk: true },
  tribe: { label: 'Tribe', highRisk: false },
  category: { label: 'Category', highRisk: false },
  relationship: { label: 'Relationship', highRisk: true },
  family: { label: 'Family', highRisk: true },
  battle: { label: 'Battle', highRisk: true },
  virtue: { label: 'Virtue', highRisk: true },
  event: { label: 'Event', highRisk: true },
  quote: { label: 'Quote', highRisk: true },
  hadith_count: { label: 'Hadith count', highRisk: true },
  occupation: { label: 'Occupation', highRisk: false },
  quran_link: { label: 'Quran link', highRisk: true },
  miracle: { label: 'Miracle', highRisk: true },
  population_estimate: { label: 'Population estimate', highRisk: true },
  source_note: { label: 'Source note', highRisk: false },
};

export function companionEntityId(rank: number) {
  return `companion:${rank}`;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function confidenceFromReliability(level: ReliabilityLevel): ClaimConfidence {
  if (level === 'sahih') return 'strong';
  if (level === 'hasan' || level === 'maqbul') return 'moderate';
  if (level === 'mawdu') return 'disputed';
  return 'weak';
}

function sourceIdForLocator(locator: string): SourceId {
  const text = locator.toLowerCase();
  if (text.includes('bukhari')) return 'bukhari';
  if (text.includes('muslim')) return 'muslim';
  if (text.includes('tirmidhi')) return 'tirmidhi';
  if (text.includes('abu dawud')) return 'abu-dawud';
  if (text.includes('ibn majah')) return 'ibn-majah';
  if (text.includes("nasa'i") || text.includes('nasai') || text.includes("nasa'i")) {
    return 'nasai';
  }
  if (text.includes('musnad ahmad')) return 'ahmad';
  if (text.includes("ibn sa'd") || text.includes('tabaqat')) return 'ibn-sad-tabaqat';
  if (text.includes('ibn hisham')) return 'ibn-hisham-seerah';
  if (text.includes('al-isabah') || text.includes('isabah')) return 'ibn-hajar-isabah';
  if (text.includes('dhahabi') || text.includes('siyar')) return 'dhahabi-siyar';
  if (text.includes('hakim') || text.includes('mustadrak')) return 'hakim';
  if (text.includes('bidaya')) return 'bidaya-nihaya';
  if (text.includes('ibn asakir')) return 'ibn-asakir';
  return 'local-profile-data';
}

function citationsFromSourceText(source: string): CitationRef[] {
  return source
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .map(locator => ({
      sourceId: sourceIdForLocator(locator),
      locator,
    }));
}

function fieldForTopic(topic: string): ClaimField {
  const text = topic.toLowerCase();
  if (text.includes('quran')) return 'quran_link';
  if (text.includes('hadith') || text.includes('narrated')) return 'hadith_count';
  if (text.includes('marriage') || text.includes('mother') || text.includes('daughter')) {
    return 'family';
  }
  if (text.includes('caliph') || text.includes('calendar') || text.includes('treaty')) {
    return 'event';
  }
  if (text.includes('conversion') || text.includes('martyr') || text.includes('martyred')) {
    return 'event';
  }
  if (text.includes('angels') || text.includes('first') || text.includes('teacher')) {
    return 'virtue';
  }
  return 'source_note';
}

const STRUCTURED_SOURCE_CLAIMS: HistoricalClaim[] = Object.entries(SOURCE_CLAIMS).flatMap(
  ([rankKey, claims]) => {
    const rank = Number(rankKey);
    const companion = COMPANIONS.find(c => c.rank === rank);
    if (!companion) return [];

    return claims.map((claim, index) => ({
      id: `source-claim-${rank}-${index + 1}-${slug(claim.topic)}`,
      entityType: 'companion' as const,
      entityId: companionEntityId(rank),
      entityName: companion.name,
      companionRank: rank,
      field: fieldForTopic(claim.topic),
      label: claim.topic,
      value: claim.topic,
      citations: citationsFromSourceText(claim.source),
      confidence: confidenceFromReliability(claim.reliability),
      status: claim.reliability === 'sahih' ? ('verified' as const) : ('review' as const),
      tags: ['legacy-source-claim', claim.reliability],
      notes: `Imported from SOURCE_CLAIMS with ${claim.reliability} reliability.`,
    }));
  }
);

const PROFILE_FIELD_MAP: Array<{
  field: ClaimField;
  label: string;
  value: (rank: number) => string | number | string[] | undefined;
}> = [
  { field: 'birth', label: 'Birth date', value: rank => COMPANIONS[rank - 1]?.born },
  { field: 'death', label: 'Death date', value: rank => COMPANIONS[rank - 1]?.death },
  { field: 'birthplace', label: 'Primary place', value: rank => COMPANIONS[rank - 1]?.place },
  { field: 'tribe', label: 'Tribe', value: rank => COMPANIONS[rank - 1]?.tribe },
  { field: 'burial', label: 'Burial place', value: rank => COMPANIONS[rank - 1]?.burial },
  { field: 'category', label: 'Profile category', value: rank => COMPANIONS[rank - 1]?.catLabel },
  { field: 'relationship', label: 'Relationship to Prophet', value: rank => COMPANIONS[rank - 1]?.rel },
  { field: 'hadith_count', label: 'Hadith count', value: rank => COMPANIONS[rank - 1]?.hadiths },
  { field: 'battle', label: 'Battles listed', value: rank => COMPANIONS[rank - 1]?.battles },
];

const PROFILE_BASELINE_CLAIMS: HistoricalClaim[] = COMPANIONS.flatMap(companion =>
  PROFILE_FIELD_MAP.map(({ field, label, value }) => {
    const raw = value(companion.rank);
    return {
      id: `profile-${companion.rank}-${field}`,
      entityType: 'companion' as const,
      entityId: companionEntityId(companion.rank),
      entityName: companion.name,
      companionRank: companion.rank,
      field,
      label,
      value: raw ?? '',
      citations: [
        {
          sourceId: 'local-profile-data',
          locator: `COMPANIONS[rank=${companion.rank}].${field}`,
        },
      ],
      confidence: 'weak' as const,
      status: 'draft' as const,
      tags: ['profile-baseline'],
      notes: 'Baseline claim generated from the local profile dataset; needs external citation.',
    };
  }).filter(claim => {
    if (Array.isArray(claim.value)) return claim.value.length > 0;
    return String(claim.value).trim().length > 0;
  })
);

const DEMOGRAPHY_CLAIMS: HistoricalClaim[] = [
  {
    id: 'pew-global-muslim-population-2010',
    entityType: 'population',
    entityId: 'global-muslims',
    entityName: 'Global Muslim population',
    field: 'population_estimate',
    label: 'Global Muslim population in 2010',
    value: '1.7 billion; 24% of world population',
    citations: [
      {
        sourceId: 'pew',
        locator: 'How the Global Religious Landscape Changed From 2010 to 2020',
        url: 'https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/',
      },
    ],
    confidence: 'strong',
    status: 'verified',
    tags: ['population', 'modern-demography'],
  },
  {
    id: 'pew-global-muslim-population-2020',
    entityType: 'population',
    entityId: 'global-muslims',
    entityName: 'Global Muslim population',
    field: 'population_estimate',
    label: 'Global Muslim population in 2020',
    value: '2.0 billion; 26% of world population',
    citations: [
      {
        sourceId: 'pew',
        locator: 'How the Global Religious Landscape Changed From 2010 to 2020',
        url: 'https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/',
      },
    ],
    confidence: 'strong',
    status: 'verified',
    tags: ['population', 'modern-demography'],
  },
];

export const HISTORICAL_CLAIMS: HistoricalClaim[] = [
  ...STRUCTURED_SOURCE_CLAIMS,
  ...PROFILE_BASELINE_CLAIMS,
  ...DEMOGRAPHY_CLAIMS,
];

export function claimsForCompanion(rank: number): HistoricalClaim[] {
  return HISTORICAL_CLAIMS.filter(claim => claim.companionRank === rank);
}

export function externalClaimsForCompanion(rank: number): HistoricalClaim[] {
  return claimsForCompanion(rank).filter(claim =>
    claim.citations.some(citation => citation.sourceId !== 'local-profile-data')
  );
}
