import type { Companion } from '@sahabah/shared-types';
import type { BranchDef, GraphLayer } from './connectionsTypes';

export function filterCompanionsByBranch(companions: Companion[], branches: BranchDef[], activeFilter: string) {
  if (activeFilter === 'all') return companions;
  return companions.filter(c => {
    const br = branches.find(b => b.types.includes(c.relType) || b.types.includes(c.cat));
    return (br || branches[branches.length - 1]).id === activeFilter;
  });
}

export function filterCompanionsByEra(companions: Companion[], activeEra: string) {
  if (activeEra === 'all') return companions;
  return companions.filter(c => (c.convera || 'late') === activeEra);
}

export function computeTopConnected(
  companions: Companion[],
  edgeSets: Record<GraphLayer, Array<{ source: number; target?: number }>>,
  layer: GraphLayer,
  topN = 5
) {
  const degree = new Map<number, number>();
  edgeSets[layer].forEach(e => {
    degree.set(e.source, (degree.get(e.source) || 0) + 1);
    if (typeof e.target === 'number' && e.target !== e.source) {
      degree.set(e.target, (degree.get(e.target) || 0) + 1);
    }
  });
  return companions
    .map(c => ({ companion: c, degree: degree.get(c.rank) || 0 }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, topN);
}
