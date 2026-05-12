import { describe, expect, it } from 'vitest';
import { HISTORICAL_CLAIMS } from '../claims';
import { runResearchDataAudit } from '../researchAudit';
import { SOURCE_REGISTRY } from '../sources';

describe('research data audit', () => {
  it('tracks the structured claim corpus', () => {
    const audit = runResearchDataAudit(new Date('2026-05-12T00:00:00.000Z'));

    expect(audit.totals.claims).toBe(HISTORICAL_CLAIMS.length);
    expect(audit.totals.sources).toBe(Object.keys(SOURCE_REGISTRY).length);
    expect(audit.coverage.profileClaimCoveragePercent).toBe(100);
    expect(audit.coverage.profilesWithExternalClaims).toBeGreaterThan(0);
  });

  it('keeps every citation tied to a registered source', () => {
    const sourceIds = new Set(Object.keys(SOURCE_REGISTRY));
    const unknownCitations = HISTORICAL_CLAIMS.flatMap(claim =>
      claim.citations
        .filter(citation => !sourceIds.has(citation.sourceId))
        .map(citation => `${claim.id}:${citation.sourceId}`)
    );

    expect(unknownCitations).toEqual([]);
  });

  it('surfaces remaining local-only research risk', () => {
    const audit = runResearchDataAudit(new Date('2026-05-12T00:00:00.000Z'));

    expect(audit.totals.highRiskLocalOnlyClaims).toBeGreaterThan(0);
    expect(audit.issues.some(issue => issue.id.includes('local-only-high-risk'))).toBe(true);
    expect(audit.nextActions.length).toBeGreaterThan(0);
  });
});
