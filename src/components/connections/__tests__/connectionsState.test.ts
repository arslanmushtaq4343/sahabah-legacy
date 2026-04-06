import { describe, expect, it } from 'vitest';
import { connectionsReducer, INITIAL_CONNECTIONS_STATE } from '../connectionsState';

describe('connectionsReducer', () => {
  it('sets graph layer and tab', () => {
    const s1 = connectionsReducer(INITIAL_CONNECTIONS_STATE, { type: 'setGraphLayer', value: 'trade' });
    const s2 = connectionsReducer(s1, { type: 'setGraphTab', value: 'journeys' });
    expect(s2.graphLayer).toBe('trade');
    expect(s2.graphTab).toBe('journeys');
  });

  it('toggles compare and path modes', () => {
    const s1 = connectionsReducer(INITIAL_CONNECTIONS_STATE, { type: 'toggleCompareMode' });
    const s2 = connectionsReducer(s1, { type: 'togglePathMode' });
    expect(s1.compareMode).toBe(true);
    expect(s2.isPathMode).toBe(true);
  });

  it('resets to defaults', () => {
    const changed = connectionsReducer(INITIAL_CONNECTIONS_STATE, { type: 'setActiveFilter', value: 'family' });
    const reset = connectionsReducer(changed, { type: 'resetAll' });
    expect(reset).toEqual(INITIAL_CONNECTIONS_STATE);
  });
});
