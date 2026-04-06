import type { ConnectionsUiState, SavedConnectionsView } from './connectionsTypes';

const STORAGE_KEY = 'sahabah_connections_saved_views_v1';

export function readSavedViews(): SavedConnectionsView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedConnectionsView[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSavedViews(views: SavedConnectionsView[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch {
    // best effort
  }
}

export function createSavedView(name: string, state: ConnectionsUiState): SavedConnectionsView {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim() || 'Saved view',
    createdAt: Date.now(),
    state,
  };
}
