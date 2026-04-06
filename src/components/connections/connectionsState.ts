import type { ConnectionsUiState, GraphLayer, GraphTab, GraphView } from './connectionsTypes';

export const INITIAL_CONNECTIONS_STATE: ConnectionsUiState = {
  activeFilter: 'all',
  activeEra: 'all',
  graphLayer: 'scholarly',
  graphView: 'network',
  graphTab: 'graph',
  isPathMode: false,
  compareMode: false,
};

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
const GRAPH_LAYERS = new Set<GraphLayer>(['scholarly', 'family', 'trade', 'ikhtilaf', 'teaching']);
const GRAPH_VIEWS = new Set<GraphView>(['network', 'diaspora']);

type ConnectionsAction =
  | { type: 'setActiveFilter'; value: string }
  | { type: 'setActiveEra'; value: string }
  | { type: 'setGraphLayer'; value: GraphLayer }
  | { type: 'setGraphView'; value: GraphView }
  | { type: 'setGraphTab'; value: GraphTab }
  | { type: 'togglePathMode' }
  | { type: 'setPathMode'; value: boolean }
  | { type: 'toggleCompareMode' }
  | { type: 'setCompareMode'; value: boolean }
  | { type: 'applySavedView'; value: Partial<ConnectionsUiState> }
  | { type: 'resetAll' };

export function connectionsReducer(
  state: ConnectionsUiState,
  action: ConnectionsAction
): ConnectionsUiState {
  switch (action.type) {
    case 'setActiveFilter':
      return { ...state, activeFilter: action.value };
    case 'setActiveEra':
      return { ...state, activeEra: action.value };
    case 'setGraphLayer':
      return GRAPH_LAYERS.has(action.value) ? { ...state, graphLayer: action.value } : state;
    case 'setGraphView':
      return GRAPH_VIEWS.has(action.value) ? { ...state, graphView: action.value } : state;
    case 'setGraphTab':
      return GRAPH_TABS.has(action.value) ? { ...state, graphTab: action.value } : state;
    case 'togglePathMode':
      return { ...state, isPathMode: !state.isPathMode };
    case 'setPathMode':
      return { ...state, isPathMode: action.value };
    case 'toggleCompareMode':
      return { ...state, compareMode: !state.compareMode };
    case 'setCompareMode':
      return { ...state, compareMode: action.value };
    case 'applySavedView': {
      const next = { ...state };
      if (action.value.activeFilter !== undefined) next.activeFilter = action.value.activeFilter;
      if (action.value.activeEra !== undefined) next.activeEra = action.value.activeEra;
      if (action.value.graphLayer !== undefined && GRAPH_LAYERS.has(action.value.graphLayer)) {
        next.graphLayer = action.value.graphLayer;
      }
      if (action.value.graphView !== undefined && GRAPH_VIEWS.has(action.value.graphView)) {
        next.graphView = action.value.graphView;
      }
      if (action.value.graphTab !== undefined && GRAPH_TABS.has(action.value.graphTab)) {
        next.graphTab = action.value.graphTab;
      }
      if (action.value.isPathMode !== undefined) next.isPathMode = Boolean(action.value.isPathMode);
      if (action.value.compareMode !== undefined) next.compareMode = Boolean(action.value.compareMode);
      return next;
    }
    case 'resetAll':
      return { ...INITIAL_CONNECTIONS_STATE };
    default:
      return state;
  }
}
