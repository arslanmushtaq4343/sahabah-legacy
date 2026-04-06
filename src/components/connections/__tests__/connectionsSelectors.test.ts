import { describe, expect, it } from 'vitest';
import { computeTopConnected } from '../connectionsSelectors';
import type { GraphLayer } from '../connectionsTypes';

const companions = [
  { rank: 1, name: 'Abu Bakr' },
  { rank: 2, name: 'Umar' },
  { rank: 3, name: 'Uthman' },
] as any[];

const emptyLayerSet: Record<GraphLayer, Array<{ source: number; target?: number }>> = {
  scholarly: [],
  family: [],
  trade: [],
  ikhtilaf: [],
  teaching: [],
};

describe('connectionsSelectors.computeTopConnected', () => {
  it('counts normal source-target edges for undirected degree ranking', () => {
    const edgeSets = {
      ...emptyLayerSet,
      family: [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
      ],
    };
    const top = computeTopConnected(companions, edgeSets, 'family', 2);
    expect(top[0].companion.rank).toBe(1);
    expect(top[0].degree).toBe(2);
  });

  it('supports source-only edges for teaching-style rankings', () => {
    const edgeSets = {
      ...emptyLayerSet,
      teaching: [
        { source: 1 },
        { source: 1 },
        { source: 2 },
      ],
    };
    const top = computeTopConnected(companions, edgeSets, 'teaching', 2);
    expect(top[0].companion.rank).toBe(1);
    expect(top[0].degree).toBe(2);
    expect(top[1].companion.rank).toBe(2);
    expect(top[1].degree).toBe(1);
  });

  it('does not double-count self-loop shaped edges', () => {
    const edgeSets = {
      ...emptyLayerSet,
      teaching: [{ source: 3, target: 3 }],
    };
    const top = computeTopConnected(companions, edgeSets, 'teaching', 3);
    const uthman = top.find(t => t.companion.rank === 3);
    expect(uthman?.degree).toBe(1);
  });
});
