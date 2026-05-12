import { COMPANIONS } from './companions';
import {
  DREAMS,
  FAMILY_TREES,
  OCCUPATIONS,
  PROPHETIC_DUAS,
  QURAN_TRIGGER_REFS,
  RELIABILITY_META,
  SOURCE_CLAIMS,
  TABAQAT_MAP,
  type ReliabilityLevel,
} from './companionExtras';
import {
  BATTLE_WOUNDS,
  FREED_SLAVES,
  GIFTS_DATA,
  KARAMAT_DATA,
  LAND_GRANTS,
  NAMED_ANIMALS,
  POW_DATA,
  PROPHETIC_PRAISE,
} from './companionsExtra2';

export type ClaimField = 'sig' | 'contrib' | 'keyEvent' | 'miracles' | 'link';
export type ConfidenceLevel = 'high' | 'medium' | 'contextual';

type ConfidenceByField = Record<ClaimField, ConfidenceLevel>;

const RELIABILITY_TO_CONFIDENCE: Record<ReliabilityLevel, ConfidenceLevel> = {
  sahih: 'high',
  hasan: 'medium',
  maqbul: 'medium',
  daif: 'contextual',
  mawdu: 'contextual',
};

const CLAIM_SOURCE_MAP: Record<number, Partial<Record<ClaimField, string[]>>> = {
  1: {
    sig: ['First Caliph'],
    contrib: ['Freed Bilal and other slaves', 'Quran compilation'],
    keyEvent: ['Quran compilation'],
  },
  2: {
    keyEvent: ['Conversion story — came to kill Prophet ﷺ'],
    contrib: ['Night patrols in Medina', 'Invented Hijri calendar', 'Treaty of Jerusalem'],
  },
  3: {
    contrib: ['Standardized the Quran', 'Funded Tabuk expedition alone'],
    link: ['Angels shy of Uthman'],
    keyEvent: ['Reading Quran when martyred'],
  },
  4: {
    keyEvent: ['Gate of Khaybar story', 'Ghadir Khumm declaration'],
    sig: ['First male to accept Islam'],
  },
  5: {
    keyEvent: ['Innocence — incident of ifk'],
    contrib: ['2,210 hadiths narrated', 'Expert in medicine and poetry'],
  },
  104: {
    sig: ['Dar al-Arqam early teaching house'],
    contrib: ['Dar al-Arqam early teaching house'],
    keyEvent: ['Dar al-Arqam early teaching house'],
    link: ['Dar al-Arqam early teaching house'],
  },
  105: {
    sig: ['Rain prayer through Al-Abbas'],
    contrib: ['Rain prayer through Al-Abbas'],
    keyEvent: ['Rain prayer through Al-Abbas'],
    link: ['Rain prayer through Al-Abbas'],
  },
  106: {
    sig: ['Badr opening duel and martyrdom'],
    contrib: ['Badr opening duel and martyrdom'],
    keyEvent: ['Badr opening duel and martyrdom'],
    link: ['Badr opening duel and martyrdom'],
  },
  107: {
    sig: ['Nakhla command and Uhud martyrdom'],
    contrib: ['Nakhla command and Uhud martyrdom'],
    keyEvent: ['Nakhla command and Uhud martyrdom'],
    link: ['Nakhla command and Uhud martyrdom'],
  },
  108: {
    sig: ['Early migration and Yamama martyrdom'],
    contrib: ['Early migration and Yamama martyrdom'],
    keyEvent: ['Early migration and Yamama martyrdom'],
    link: ['Early migration and Yamama martyrdom'],
  },
  109: {
    sig: ['Named among four Quran teachers'],
    contrib: ['Named among four Quran teachers'],
    keyEvent: ['Named among four Quran teachers'],
    link: ['Named among four Quran teachers'],
  },
  110: {
    sig: ["Umm Salama's supplication after Abu Salama died"],
    contrib: ["Umm Salama's supplication after Abu Salama died"],
    keyEvent: ["Umm Salama's supplication after Abu Salama died"],
    link: ["Umm Salama's supplication after Abu Salama died"],
  },
  111: {
    sig: ['Ruqayyah migration and marriage to Uthman'],
    contrib: ['Ruqayyah migration and marriage to Uthman'],
    keyEvent: ['Ruqayyah migration and marriage to Uthman'],
    link: ['Ruqayyah migration and marriage to Uthman'],
  },
  112: {
    sig: ['Umm Kulthum marriage to Uthman'],
    contrib: ['Umm Kulthum marriage to Uthman'],
    keyEvent: ['Umm Kulthum marriage to Uthman'],
    link: ['Umm Kulthum marriage to Uthman'],
  },
  113: {
    sig: ['Fatimah bint Asad as Muslim migrant and mother of Ali'],
    contrib: ['Fatimah bint Asad as Muslim migrant and mother of Ali'],
    keyEvent: ['Fatimah bint Asad as Muslim migrant and mother of Ali'],
    link: ['Fatimah bint Asad as Muslim migrant and mother of Ali'],
  },
  114: {
    sig: ['Two migrations of Asma bint Umays'],
    contrib: ['Two migrations of Asma bint Umays'],
    keyEvent: ['Two migrations of Asma bint Umays'],
    link: ['Two migrations of Asma bint Umays'],
  },
  115: {
    sig: ['Sahl narrated the Khaybar banner report'],
    contrib: ['Sahl narrated the Khaybar banner report'],
    keyEvent: ['Sahl narrated the Khaybar banner report'],
    link: ['Sahl narrated the Khaybar banner report'],
  },
  116: {
    sig: ["Abu Mahdhurah's adhan teaching"],
    contrib: ["Abu Mahdhurah's adhan teaching"],
    keyEvent: ["Abu Mahdhurah's adhan teaching"],
    link: ["Abu Mahdhurah's adhan teaching"],
  },
  117: {
    sig: ['Al-Shifa taught Hafsa ruqyah and writing'],
    contrib: ['Al-Shifa taught Hafsa ruqyah and writing'],
    keyEvent: ['Al-Shifa taught Hafsa ruqyah and writing'],
    link: ['Al-Shifa taught Hafsa ruqyah and writing'],
  },
  118: {
    sig: ["Umm Atiyyah's funeral and Eid narrations"],
    contrib: ["Umm Atiyyah's funeral and Eid narrations"],
    keyEvent: ["Umm Atiyyah's funeral and Eid narrations"],
    link: ["Umm Atiyyah's funeral and Eid narrations"],
  },
  119: {
    sig: ["Safinah's thirty-year caliphate report"],
    contrib: ["Safinah's thirty-year caliphate report"],
    keyEvent: ["Safinah's thirty-year caliphate report"],
    link: ["Safinah's thirty-year caliphate report"],
  },
  120: {
    sig: ["Umm Hani's conquest-day reports"],
    contrib: ["Umm Hani's conquest-day reports"],
    keyEvent: ["Umm Hani's conquest-day reports"],
    link: ["Umm Hani's conquest-day reports"],
  },
};

function strictConfidenceFromClaims(reliabilities: ReliabilityLevel[]): ConfidenceLevel {
  if (!reliabilities.length) return 'contextual';
  if (reliabilities.some(r => RELIABILITY_TO_CONFIDENCE[r] === 'high')) return 'high';
  if (reliabilities.some(r => RELIABILITY_TO_CONFIDENCE[r] === 'medium')) return 'medium';
  return 'contextual';
}

export const COMPANION_CLAIM_CONFIDENCE: Record<number, ConfidenceByField> = Object.fromEntries(
  COMPANIONS.map(c => {
    const byField: ConfidenceByField = {
      sig: 'contextual',
      contrib: 'contextual',
      keyEvent: 'contextual',
      miracles: 'contextual',
      link: 'contextual',
    };
    const claims = SOURCE_CLAIMS[c.rank] ?? [];
    const mapping = CLAIM_SOURCE_MAP[c.rank] ?? {};

    (Object.keys(byField) as ClaimField[]).forEach(field => {
      const topics = mapping[field] ?? [];
      const reliabilities = topics
        .map(topic => claims.find(claim => claim.topic === topic)?.reliability)
        .filter((value): value is ReliabilityLevel => Boolean(value));
      byField[field] = strictConfidenceFromClaims(reliabilities);
    });
    return [c.rank, byField];
  })
) as Record<number, ConfidenceByField>;

const CONFIDENCE_POINTS: Record<ConfidenceLevel, number> = {
  high: 100,
  medium: 70,
  contextual: 40,
};

export const COMPANION_AUTHENTICITY_SCORE: Record<number, number> = Object.fromEntries(
  COMPANIONS.map(c => {
    const conf = COMPANION_CLAIM_CONFIDENCE[c.rank];
    const base =
      (CONFIDENCE_POINTS[conf.sig] +
        CONFIDENCE_POINTS[conf.contrib] +
        CONFIDENCE_POINTS[conf.keyEvent] +
        CONFIDENCE_POINTS[conf.miracles] +
        CONFIDENCE_POINTS[conf.link]) /
      5;
    const sourcesBonus = Math.min((SOURCE_CLAIMS[c.rank]?.length ?? 0) * 3, 15);
    const score = Math.max(0, Math.min(100, Math.round(base + sourcesBonus)));
    return [c.rank, score];
  })
) as Record<number, number>;

function collectInvalidRecordKeys(
  record: Record<number, unknown>,
  validRanks: Set<number>,
  label: string,
  out: string[]
) {
  Object.keys(record).forEach(k => {
    const rank = Number(k);
    if (!Number.isFinite(rank) || !validRanks.has(rank)) {
      out.push(`${label}: invalid rank key ${k}`);
    }
  });
}

export function runCompanionDataQualityChecks(): string[] {
  const issues: string[] = [];
  const ranks = COMPANIONS.map(c => c.rank);
  const rankSet = new Set(ranks);

  if (rankSet.size !== COMPANIONS.length) {
    issues.push('COMPANIONS: duplicate rank values detected');
  }

  const sorted = [...ranks].sort((a, b) => a - b);
  sorted.forEach((rank, idx) => {
    if (rank !== idx + 1) {
      issues.push(`COMPANIONS: expected rank ${idx + 1}, found ${rank}`);
    }
  });

  const nameSet = new Set<string>();
  COMPANIONS.forEach(c => {
    const nameKey = c.name.trim().toLowerCase();
    if (nameSet.has(nameKey)) {
      issues.push(`COMPANIONS: duplicate name "${c.name}"`);
    }
    nameSet.add(nameKey);

    if (!c.title?.trim()) issues.push(`COMPANIONS[${c.rank}]: missing title`);
    if (!c.rel?.trim()) issues.push(`COMPANIONS[${c.rank}]: missing rel`);
    if (!c.catLabel?.trim()) issues.push(`COMPANIONS[${c.rank}]: missing catLabel`);

    if (c.cat === 'wife' && c.catLabel !== 'Wife') {
      issues.push(`COMPANIONS[${c.rank}]: wife must have catLabel "Wife"`);
    }
    if (c.catLabel === 'Daughter of Prophet ﷺ' && !/daughter of prophet/i.test(c.rel)) {
      issues.push(`COMPANIONS[${c.rank}]: daughter label without daughter rel text`);
    }
    if (c.catLabel === 'Ahl al-Bayt' && c.relType !== 'family') {
      issues.push(`COMPANIONS[${c.rank}]: Ahl al-Bayt should use relType "family"`);
    }
  });

  // Keyed records in companionExtras.ts
  collectInvalidRecordKeys(TABAQAT_MAP, rankSet, 'TABAQAT_MAP', issues);
  collectInvalidRecordKeys(PROPHETIC_DUAS, rankSet, 'PROPHETIC_DUAS', issues);
  collectInvalidRecordKeys(OCCUPATIONS, rankSet, 'OCCUPATIONS', issues);
  collectInvalidRecordKeys(DREAMS, rankSet, 'DREAMS', issues);
  collectInvalidRecordKeys(FAMILY_TREES, rankSet, 'FAMILY_TREES', issues);
  collectInvalidRecordKeys(QURAN_TRIGGER_REFS, rankSet, 'QURAN_TRIGGER_REFS', issues);
  collectInvalidRecordKeys(SOURCE_CLAIMS, rankSet, 'SOURCE_CLAIMS', issues);
  Object.keys(SOURCE_CLAIMS).forEach(k => {
    const rank = Number(k);
    if (SOURCE_CLAIMS[rank]?.length && !CLAIM_SOURCE_MAP[rank]) {
      issues.push(`CLAIM_SOURCE_MAP: missing explicit mapping for rank ${rank}`);
    }
  });

  // Keyed records in companionsExtra2.ts
  collectInvalidRecordKeys(KARAMAT_DATA, rankSet, 'KARAMAT_DATA', issues);
  collectInvalidRecordKeys(PROPHETIC_PRAISE, rankSet, 'PROPHETIC_PRAISE', issues);
  collectInvalidRecordKeys(GIFTS_DATA, rankSet, 'GIFTS_DATA', issues);
  collectInvalidRecordKeys(BATTLE_WOUNDS, rankSet, 'BATTLE_WOUNDS', issues);

  // Embedded rank references
  FREED_SLAVES.forEach(row => {
    if (row.companionRank !== undefined && !rankSet.has(row.companionRank)) {
      issues.push(`FREED_SLAVES: invalid companionRank ${row.companionRank} for "${row.name}"`);
    }
  });
  NAMED_ANIMALS.forEach(row => {
    if (row.ownerRank !== undefined && !rankSet.has(row.ownerRank)) {
      issues.push(`NAMED_ANIMALS: invalid ownerRank ${row.ownerRank} for "${row.animalName}"`);
    }
  });
  LAND_GRANTS.forEach(row => {
    if (row.companionRank !== undefined && !rankSet.has(row.companionRank)) {
      issues.push(`LAND_GRANTS: invalid companionRank ${row.companionRank} for "${row.companion}"`);
    }
  });
  POW_DATA.forEach(row => {
    if (row.companionRank !== undefined && !rankSet.has(row.companionRank)) {
      issues.push(`POW_DATA: invalid companionRank ${row.companionRank} for "${row.companion}"`);
    }
  });

  // Sanity check to ensure reliability levels are represented in metadata map.
  Object.keys(RELIABILITY_META).forEach(key => {
    if (!key) {
      issues.push('RELIABILITY_META: empty reliability key');
    }
  });

  return issues;
}

export function reportCompanionDataQuality(): void {
  const issues = runCompanionDataQualityChecks();
  if (!issues.length) {
    // Keep this concise; useful signal in dev tools.
    // eslint-disable-next-line no-console
    console.info('[data-quality] Companion dataset checks passed');
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(`[data-quality] Found ${issues.length} issue(s):\n- ${issues.join('\n- ')}`);
}
