import { describe, expect, it } from 'vitest';
import { buildGraphModel, validateConnectionEdges } from '../connectionsGraphModel';
import type { BranchDef } from '../connectionsTypes';

const branches: BranchDef[] = [
  { id: 'family', label: 'Ahl al-Bayt', color: '#b8860b', types: ['family'] },
  { id: 'other', label: 'Other', color: '#1a3462', types: ['other'] },
];

const companions = [
  {
    rank: 1,
    name: 'Abu Bakr',
    ar: 'أبو بكر',
    ur: 'ابو بکر',
    title: 'al-Siddiq',
    cat: 'caliph',
    catLabel: 'Caliph',
    rel: 'Companion',
    relType: 'family',
    born: '',
    death: '',
    place: '',
    tribe: '',
    sig: '',
    contrib: '',
    hadiths: 10,
    battles: [],
    burial: '',
    quote: '',
    quoteEn: '',
    link: '',
    personality: [],
    legacy: '',
    keyEvent: '',
    appearance: '',
    miracles: '',
  },
  {
    rank: 2,
    name: 'Umar',
    ar: 'عمر',
    ur: 'عمر',
    title: 'al-Faruq',
    cat: 'caliph',
    catLabel: 'Caliph',
    rel: 'Companion',
    relType: 'other',
    born: '',
    death: '',
    place: '',
    tribe: '',
    sig: '',
    contrib: '',
    hadiths: 8,
    battles: [],
    burial: '',
    quote: '',
    quoteEn: '',
    link: '',
    personality: [],
    legacy: '',
    keyEvent: '',
    appearance: '',
    miracles: '',
  },
] as any[];

describe('connectionsGraphModel', () => {
  it('builds nodes, links, and adjacency', () => {
    const model = buildGraphModel(companions, branches, 1000, 700);
    expect(model.nodes.length).toBeGreaterThan(0);
    expect(model.linksResolved.length).toBeGreaterThan(0);
    expect(model.nodeById['prophet']).toBeTruthy();
    expect(model.adjacency['prophet'].length).toBeGreaterThan(0);
  });

  it('flags invalid or duplicate edges', () => {
    const warnings = validateConnectionEdges(
      companions,
      [
        { source: 1, target: 2 },
        { source: 1, target: 2 },
        { source: 1, target: 999 },
      ],
      'test'
    );
    expect(warnings.some(w => w.includes('duplicate edge'))).toBe(true);
    expect(warnings.some(w => w.includes('unknown rank'))).toBe(true);
  });
});
