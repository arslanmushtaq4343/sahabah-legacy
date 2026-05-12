import { COMPANIONS } from './companions';
import { HISTORICAL_CLAIMS, CLAIM_FIELD_META, type HistoricalClaim } from './claims';
import { SOURCE_REGISTRY, isExternalCitation, type SourceId } from './sources';

export type AuditSeverity = 'issue' | 'review' | 'info';

export interface AuditFinding {
  id: string;
  severity: AuditSeverity;
  title: string;
  detail: string;
  entityId?: string;
  companionRank?: number;
  field?: string;
}

export interface ResearchDataAuditReport {
  generatedAt: string;
  totals: {
    companions: number;
    sources: number;
    claims: number;
    externalClaims: number;
    draftClaims: number;
    verifiedClaims: number;
    localOnlyClaims: number;
    highRiskLocalOnlyClaims: number;
    zeroHadithProfiles: number;
    emptyBattleProfiles: number;
  };
  coverage: {
    profilesWithAnyClaims: number;
    profilesWithExternalClaims: number;
    profilesWithVerifiedClaims: number;
    profileClaimCoveragePercent: number;
    externalProfileCoveragePercent: number;
    verifiedProfileCoveragePercent: number;
  };
  fieldCoverage: Record<string, { total: number; external: number; verified: number }>;
  reliability: Record<string, number>;
  issues: AuditFinding[];
  nextActions: string[];
}

function hasExternalCitation(claim: HistoricalClaim) {
  return claim.citations.some(isExternalCitation);
}

function hasVerifiedCitation(claim: HistoricalClaim) {
  return claim.status === 'verified' && hasExternalCitation(claim);
}

function percent(count: number, total: number) {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

function addFinding(
  issues: AuditFinding[],
  severity: AuditSeverity,
  id: string,
  title: string,
  detail: string,
  extra: Partial<AuditFinding> = {}
) {
  issues.push({ id, severity, title, detail, ...extra });
}

export function runResearchDataAudit(now = new Date()): ResearchDataAuditReport {
  const issues: AuditFinding[] = [];
  const knownSources = new Set(Object.keys(SOURCE_REGISTRY));
  const companionRanks = new Set(COMPANIONS.map(c => c.rank));

  const claimsByCompanion = new Map<number, HistoricalClaim[]>();
  COMPANIONS.forEach(companion => claimsByCompanion.set(companion.rank, []));

  const fieldCoverage: ResearchDataAuditReport['fieldCoverage'] = {};
  const reliability: Record<string, number> = {
    strong: 0,
    moderate: 0,
    weak: 0,
    disputed: 0,
  };

  HISTORICAL_CLAIMS.forEach(claim => {
    reliability[claim.confidence] = (reliability[claim.confidence] ?? 0) + 1;
    fieldCoverage[claim.field] ??= { total: 0, external: 0, verified: 0 };
    fieldCoverage[claim.field].total += 1;
    if (hasExternalCitation(claim)) fieldCoverage[claim.field].external += 1;
    if (hasVerifiedCitation(claim)) fieldCoverage[claim.field].verified += 1;

    if (claim.companionRank !== undefined) {
      if (!companionRanks.has(claim.companionRank)) {
        addFinding(
          issues,
          'issue',
          `claim:${claim.id}:invalid-rank`,
          'Claim references an unknown companion rank',
          `${claim.id} points to companion rank ${claim.companionRank}.`,
          { companionRank: claim.companionRank, field: claim.field }
        );
      } else {
        claimsByCompanion.get(claim.companionRank)?.push(claim);
      }
    }

    if (!claim.citations.length) {
      addFinding(
        issues,
        'issue',
        `claim:${claim.id}:no-citations`,
        'Claim has no citations',
        claim.label,
        { entityId: claim.entityId, companionRank: claim.companionRank, field: claim.field }
      );
    }

    claim.citations.forEach((citation, index) => {
      if (!knownSources.has(citation.sourceId)) {
        addFinding(
          issues,
          'issue',
          `claim:${claim.id}:unknown-source:${index}`,
          'Claim cites an unknown source',
          `${claim.id} uses sourceId "${citation.sourceId}".`,
          { entityId: claim.entityId, companionRank: claim.companionRank, field: claim.field }
        );
      }
    });

    if (!hasExternalCitation(claim) && CLAIM_FIELD_META[claim.field].highRisk) {
      addFinding(
        issues,
        'review',
        `claim:${claim.id}:local-only-high-risk`,
        'High-risk claim only has local citation',
        `${claim.entityName}: ${claim.label}`,
        { entityId: claim.entityId, companionRank: claim.companionRank, field: claim.field }
      );
    }
  });

  COMPANIONS.forEach(companion => {
    const claims = claimsByCompanion.get(companion.rank) ?? [];
    const externalClaims = claims.filter(hasExternalCitation);
    const verifiedClaims = claims.filter(hasVerifiedCitation);

    if (!claims.length) {
      addFinding(
        issues,
        'issue',
        `companion:${companion.rank}:no-claims`,
        `${companion.name} has no structured claims`,
        'Every companion profile should have claim-level data.',
        { companionRank: companion.rank }
      );
    }

    if (!externalClaims.length) {
      addFinding(
        issues,
        'review',
        `companion:${companion.rank}:no-external-claims`,
        `${companion.name} has no external source claims`,
        'Profile is present but remains draft-level until at least one external citation is added.',
        { companionRank: companion.rank }
      );
    }

    if (!verifiedClaims.length) {
      addFinding(
        issues,
        'info',
        `companion:${companion.rank}:no-verified-claims`,
        `${companion.name} has no verified external claims`,
        'Add at least one sahih Quran/hadith or strong biographical source claim.',
        { companionRank: companion.rank }
      );
    }

    if (companion.hadiths === 0) {
      addFinding(
        issues,
        'review',
        `companion:${companion.rank}:zero-hadith-count`,
        `${companion.name} has hadiths set to 0`,
        'Confirm whether this means no narrations, unknown count, or not yet researched.',
        { companionRank: companion.rank, field: 'hadith_count' }
      );
    }

    if (!companion.battles.length) {
      addFinding(
        issues,
        'review',
        `companion:${companion.rank}:empty-battles`,
        `${companion.name} has no battle participation data`,
        'Use an explicit unknown/not-applicable model instead of an empty array if this is unresolved.',
        { companionRank: companion.rank, field: 'battle' }
      );
    }
  });

  const referencedSources = new Set<SourceId>();
  HISTORICAL_CLAIMS.forEach(claim => {
    claim.citations.forEach(citation => referencedSources.add(citation.sourceId));
  });
  Object.keys(SOURCE_REGISTRY).forEach(sourceId => {
    if (!referencedSources.has(sourceId as SourceId)) {
      addFinding(
        issues,
        'info',
        `source:${sourceId}:unreferenced`,
        'Source is registered but not yet cited',
        `No claim currently cites ${sourceId}.`
      );
    }
  });

  const companionClaimSets = [...claimsByCompanion.values()];
  const profilesWithAnyClaims = companionClaimSets.filter(claims => claims.length > 0).length;
  const profilesWithExternalClaims = companionClaimSets.filter(claims =>
    claims.some(hasExternalCitation)
  ).length;
  const profilesWithVerifiedClaims = companionClaimSets.filter(claims =>
    claims.some(hasVerifiedCitation)
  ).length;
  const externalClaims = HISTORICAL_CLAIMS.filter(hasExternalCitation);
  const localOnlyClaims = HISTORICAL_CLAIMS.filter(claim => !hasExternalCitation(claim));
  const highRiskLocalOnlyClaims = localOnlyClaims.filter(
    claim => CLAIM_FIELD_META[claim.field].highRisk
  );

  return {
    generatedAt: now.toISOString(),
    totals: {
      companions: COMPANIONS.length,
      sources: Object.keys(SOURCE_REGISTRY).length,
      claims: HISTORICAL_CLAIMS.length,
      externalClaims: externalClaims.length,
      draftClaims: HISTORICAL_CLAIMS.filter(claim => claim.status === 'draft').length,
      verifiedClaims: HISTORICAL_CLAIMS.filter(claim => claim.status === 'verified').length,
      localOnlyClaims: localOnlyClaims.length,
      highRiskLocalOnlyClaims: highRiskLocalOnlyClaims.length,
      zeroHadithProfiles: COMPANIONS.filter(c => c.hadiths === 0).length,
      emptyBattleProfiles: COMPANIONS.filter(c => c.battles.length === 0).length,
    },
    coverage: {
      profilesWithAnyClaims,
      profilesWithExternalClaims,
      profilesWithVerifiedClaims,
      profileClaimCoveragePercent: percent(profilesWithAnyClaims, COMPANIONS.length),
      externalProfileCoveragePercent: percent(profilesWithExternalClaims, COMPANIONS.length),
      verifiedProfileCoveragePercent: percent(profilesWithVerifiedClaims, COMPANIONS.length),
    },
    fieldCoverage,
    reliability,
    issues,
    nextActions: [
      'Add external citations for all high-risk local-only claims.',
      'Replace local-only hadith counts with cited narrator-count sources.',
      'Convert empty battle arrays into cited participated/not-applicable/unknown states.',
      'Use Wikidata only for alias and identifier reconciliation, not final truth.',
      'Prioritize companions ranked 1-20, then remaining profiles in batches of 20.',
    ],
  };
}
