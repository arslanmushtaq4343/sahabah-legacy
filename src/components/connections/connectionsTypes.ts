import type { Companion } from '@sahabah/shared-types';

export type GraphLayer = 'scholarly' | 'family' | 'trade' | 'ikhtilaf' | 'teaching';
export type GraphView = 'network' | 'diaspora';
export type GraphTab =
  | 'graph'
  | 'growth'
  | 'journeys'
  | 'sunnah'
  | 'conversion'
  | 'hijra'
  | 'letters'
  | 'testimonies'
  | 'narration';

export interface BranchDef {
  id: string;
  label: string;
  color: string;
  types: string[];
}

export interface GraphNode {
  id: string;
  type: 'prophet' | 'branch' | 'companion';
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  br?: BranchDef;
  data?: Companion;
  brId?: string;
  color?: string;
  r?: number;
  pulseR?: number;
  era?: string;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  type: 'spoke' | 'branch-leaf';
  br?: BranchDef;
}

export interface ResolvedGraphLink extends Omit<GraphLink, 'source' | 'target'> {
  source: GraphNode;
  target: GraphNode;
}

export interface ConnectionsUiState {
  activeFilter: string;
  activeEra: string;
  graphLayer: GraphLayer;
  graphView: GraphView;
  graphTab: GraphTab;
  isPathMode: boolean;
  compareMode: boolean;
}

export interface SavedConnectionsView {
  id: string;
  name: string;
  createdAt: number;
  state: ConnectionsUiState;
}
