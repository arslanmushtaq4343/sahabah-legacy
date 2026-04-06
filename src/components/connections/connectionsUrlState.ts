import type { ConnectionsUiState, GraphLayer, GraphTab, GraphView } from './connectionsTypes';

const GRAPH_TABS = new Set<GraphTab>([
  'graph',
  'growth',
  'journeys',
  'sunnah',
  'conversion',
  'hijra',
  'letters',
  'testimonies',
  'narration',
]);
const LAYERS = new Set<GraphLayer>(['scholarly', 'family', 'trade', 'ikhtilaf', 'teaching']);
const VIEWS = new Set<GraphView>(['network', 'diaspora']);

export function parseConnectionsStateFromSearch(search: string): Partial<ConnectionsUiState> {
  const params = new URLSearchParams(search);
  const next: Partial<ConnectionsUiState> = {};

  const tab = params.get('tab');
  const layer = params.get('layer');
  const era = params.get('era');
  const filter = params.get('filter');
  const view = params.get('view');
  const path = params.get('path');
  const compare = params.get('compare');

  if (tab && GRAPH_TABS.has(tab as GraphTab)) next.graphTab = tab as GraphTab;
  if (layer && LAYERS.has(layer as GraphLayer)) next.graphLayer = layer as GraphLayer;
  if (view && VIEWS.has(view as GraphView)) next.graphView = view as GraphView;
  if (era) next.activeEra = era;
  if (filter) next.activeFilter = filter;
  if (path === '1') next.isPathMode = true;
  if (compare === '1') next.compareMode = true;

  return next;
}

export function serializeConnectionsStateToSearch(state: ConnectionsUiState): string {
  const params = new URLSearchParams();
  params.set('tab', state.graphTab);
  params.set('layer', state.graphLayer);
  params.set('view', state.graphView);
  params.set('era', state.activeEra);
  params.set('filter', state.activeFilter);
  if (state.isPathMode) params.set('path', '1');
  if (state.compareMode) params.set('compare', '1');
  return params.toString();
}
