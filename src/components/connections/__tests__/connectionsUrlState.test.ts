import { describe, expect, it } from 'vitest';
import { parseConnectionsStateFromSearch, serializeConnectionsStateToSearch } from '../connectionsUrlState';
import { INITIAL_CONNECTIONS_STATE } from '../connectionsState';

describe('connectionsUrlState', () => {
  it('serializes view state into query string', () => {
    const search = serializeConnectionsStateToSearch({
      ...INITIAL_CONNECTIONS_STATE,
      graphLayer: 'family',
      graphTab: 'hijra',
      compareMode: true,
    });
    expect(search).toContain('layer=family');
    expect(search).toContain('tab=hijra');
    expect(search).toContain('compare=1');
  });

  it('parses known params and ignores invalid values', () => {
    const parsed = parseConnectionsStateFromSearch(
      '?tab=journeys&layer=trade&view=diaspora&path=1&compare=1&era=early&filter=family'
    );
    expect(parsed.graphTab).toBe('journeys');
    expect(parsed.graphLayer).toBe('trade');
    expect(parsed.graphView).toBe('diaspora');
    expect(parsed.isPathMode).toBe(true);
    expect(parsed.compareMode).toBe(true);
    expect(parsed.activeEra).toBe('early');
    expect(parsed.activeFilter).toBe('family');
  });
});
