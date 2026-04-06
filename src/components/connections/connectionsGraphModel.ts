import type { Companion } from '@sahabah/shared-types';
import type { BranchDef, GraphLink, GraphNode, ResolvedGraphLink } from './connectionsTypes';

export interface GraphModel {
  nodes: GraphNode[];
  links: GraphLink[];
  linksResolved: ResolvedGraphLink[];
  nodeById: Record<string, GraphNode>;
  adjacency: Record<string, string[]>;
}

export function buildGraphModel(
  companions: Companion[],
  branches: BranchDef[],
  width: number,
  height: number
): GraphModel {
  const cx = width / 2;
  const cy = height / 2;
  const branchRadius = Math.min(220, Math.min(width, height) * 0.36);
  const maxHadith = Math.max(...companions.map(c => c.hadiths || 0));

  const enrichedBranches = branches.map(b => ({ ...b, companions: [] as Companion[] }));
  companions.forEach(c => {
    const branch =
      enrichedBranches.find(b => b.types.includes(c.relType) || b.types.includes(c.cat)) ||
      enrichedBranches[enrichedBranches.length - 1];
    branch.companions.push(c);
  });
  enrichedBranches.forEach(b => b.companions.sort((a, z) => a.rank - z.rank));

  const nodes: GraphNode[] = [{ id: 'prophet', type: 'prophet', x: cx, y: cy, fx: cx, fy: cy }];
  const links: GraphLink[] = [];

  enrichedBranches.forEach((branch, i) => {
    const angle = (i / enrichedBranches.length) * 2 * Math.PI - Math.PI / 2;
    nodes.push({
      id: `br-${branch.id}`,
      type: 'branch',
      br: branch,
      x: cx + branchRadius * Math.cos(angle),
      y: cy + branchRadius * Math.sin(angle),
    });
    links.push({ source: 'prophet', target: `br-${branch.id}`, type: 'spoke', br: branch });
  });

  enrichedBranches.forEach((branch, i) => {
    const angle = (i / enrichedBranches.length) * 2 * Math.PI - Math.PI / 2;
    branch.companions.forEach(companion => {
      const nodeR = companion.rank <= 3 ? 22 : companion.rank <= 10 ? 18 : companion.rank <= 30 ? 15 : 12;
      const pulseR = companion.hadiths > 0 ? 6 + (companion.hadiths / maxHadith) * 20 : 0;
      nodes.push({
        id: `cp-${companion.rank}`,
        type: 'companion',
        data: companion,
        brId: branch.id,
        color: branch.color,
        r: nodeR,
        pulseR,
        era: companion.convera || 'late',
        x: cx + branchRadius * Math.cos(angle) + (Math.random() - 0.5) * 180,
        y: cy + branchRadius * Math.sin(angle) + (Math.random() - 0.5) * 180,
      });
      links.push({ source: `br-${branch.id}`, target: `cp-${companion.rank}`, type: 'branch-leaf', br: branch });
    });
  });

  const nodeById: Record<string, GraphNode> = {};
  nodes.forEach(n => {
    nodeById[n.id] = n;
  });

  const linksResolved: ResolvedGraphLink[] = links
    .map(l => ({
      ...l,
      source: nodeById[l.source as string],
      target: nodeById[l.target as string],
    }))
    .filter(l => l.source && l.target);

  const adjacency: Record<string, string[]> = {};
  linksResolved.forEach(l => {
    const sId = l.source.id;
    const tId = l.target.id;
    (adjacency[sId] = adjacency[sId] || []).push(tId);
    (adjacency[tId] = adjacency[tId] || []).push(sId);
  });

  return { nodes, links, linksResolved, nodeById, adjacency };
}

export function validateConnectionEdges(
  companions: Companion[],
  edges: Array<{ source: number; target: number }>,
  label: string
): string[] {
  const warnings: string[] = [];
  const rankSet = new Set(companions.map(c => c.rank));
  const dedupe = new Set<string>();

  edges.forEach(e => {
    if (!rankSet.has(e.source) || !rankSet.has(e.target)) {
      warnings.push(`[${label}] unknown rank in edge ${e.source} -> ${e.target}`);
    }
    const key = `${Math.min(e.source, e.target)}:${Math.max(e.source, e.target)}`;
    if (dedupe.has(key)) warnings.push(`[${label}] duplicate edge ${e.source} -> ${e.target}`);
    dedupe.add(key);
  });

  return warnings;
}
