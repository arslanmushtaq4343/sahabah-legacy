import { describe, expect, it } from 'vitest';
import { COMPANIONS } from '../companions';
import { runCompanionDataQualityChecks } from '../companionDataQuality';

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\b(al|as|ibn|bin|bint|abu|umm)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

describe('COMPANIONS dataset', () => {
  it('contains exactly 120 contiguous ranked companions', () => {
    expect(COMPANIONS).toHaveLength(120);

    const ranks = COMPANIONS.map(c => c.rank).sort((a, b) => a - b);
    expect(ranks).toEqual(Array.from({ length: 120 }, (_, i) => i + 1));
  });

  it('does not include duplicate companion names', () => {
    const normalized = COMPANIONS.map(c => normalizeName(c.name));
    expect(new Set(normalized).size).toBe(normalized.length);
  });

  it('passes the shared data-quality checks', () => {
    expect(runCompanionDataQualityChecks()).toEqual([]);
  });
});
