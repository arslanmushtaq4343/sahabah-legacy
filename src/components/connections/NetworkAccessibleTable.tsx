/**
 * Accessible table fallback for the D3 companion network graph.
 *
 * Presents the same relationship data the D3 force-graph visualises, but in a
 * semantically correct, keyboard-navigable, screen-reader-friendly HTML table.
 *
 * Activated by a toggle button near the graph. Hidden by default so sighted
 * users still get the rich visual experience, but always available to assistive
 * technologies via the toggle.
 */
import { useState, useId } from 'react';
import { COMPANIONS } from '../../data/companions';
import styles from './NetworkAccessibleTable.module.css';

const BRANCHES = [
  { id: 'family',  label: 'Ahl al-Bayt',         color: '#b8860b', types: ['family'] as string[] },
  { id: 'wives',   label: 'Mothers of Believers', color: '#8b1a1a', types: ['wife'] as string[] },
  { id: 'comp',    label: 'Close Companions',     color: '#1a3462', types: ['companion'] as string[] },
  { id: 'warrior', label: 'Warriors & Generals',  color: '#8b3a08', types: ['warrior', 'general', 'martyr'] as string[] },
  { id: 'scholar', label: 'Scholars & Narrators', color: '#2a5080', types: ['scholar', 'narrator'] as string[] },
  { id: 'convert', label: 'Converts & Others',    color: '#0a4030', types: ['convert', 'other', 'caliph'] as string[] },
];

const ERA_LABEL: Record<string, string> = {
  early:  'Pre-Hijrah (Mecca)',
  middle: 'Hijrah Era (Medina)',
  late:   'Conquest Era',
};

type SortKey = 'name' | 'branch' | 'hadiths' | 'battles' | 'era';

function getBranch(c: (typeof COMPANIONS)[number]) {
  return BRANCHES.find(b => b.types.includes(c.relType) || b.types.includes(c.cat)) ?? BRANCHES[5];
}

export function NetworkAccessibleTable() {
  const tableId = useId();
  const [open, setOpen]         = useState(false);
  const [sortKey, setSortKey]   = useState<SortKey>('name');
  const [sortAsc, setSortAsc]   = useState(true);
  const [branchFilter, setBranchFilter] = useState<string>('all');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(a => !a);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const rows = [...COMPANIONS]
    .filter(c => branchFilter === 'all' || getBranch(c).id === branchFilter)
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name')    cmp = a.name.localeCompare(b.name);
      if (sortKey === 'branch')  cmp = getBranch(a).label.localeCompare(getBranch(b).label);
      if (sortKey === 'hadiths') cmp = (a.hadiths ?? 0) - (b.hadiths ?? 0);
      if (sortKey === 'battles') cmp = (a.battles?.length ?? 0) - (b.battles?.length ?? 0);
      if (sortKey === 'era') {
        const order = { early: 0, middle: 1, late: 2 };
        cmp = (order[a.convera ?? 'late'] ?? 2) - (order[b.convera ?? 'late'] ?? 2);
      }
      return sortAsc ? cmp : -cmp;
    });

  function ariaSortDir(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (sortKey !== key) return 'none';
    return sortAsc ? 'ascending' : 'descending';
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.toggleBtn}
        aria-expanded={open}
        aria-controls={tableId}
        onClick={() => setOpen(v => !v)}
      >
        {open ? '↑ Hide table view' : '♿ View as accessible table'}
      </button>

      <div
        id={tableId}
        role="region"
        aria-label="Companion network — accessible table view"
        aria-live="polite"
        hidden={!open}
        className={styles.tableRegion}
      >
        <p className={styles.description}>
          This table presents the same companion network data as the D3 graph above.
          Use it to sort, filter, and navigate companion relationships with a keyboard or screen reader.
        </p>

        {/* Branch filter */}
        <div className={styles.filterRow} role="group" aria-label="Filter by branch">
          <span className={styles.filterLabel}>Filter by branch:</span>
          {['all', ...BRANCHES.map(b => b.id)].map(id => {
            const branch = BRANCHES.find(b => b.id === id);
            return (
              <button
                key={id}
                type="button"
                className={`${styles.filterBtn} ${branchFilter === id ? styles.filterBtnActive : ''}`}
                style={branch && branchFilter === id ? { borderColor: branch.color, color: branch.color } : undefined}
                onClick={() => setBranchFilter(id)}
                aria-pressed={branchFilter === id}
              >
                {branch ? branch.label : 'All Branches'}
              </button>
            );
          })}
        </div>

        <p className={styles.count} aria-live="polite">
          Showing {rows.length} of {COMPANIONS.length} companions
        </p>

        <div className={styles.tableScroll}>
          <table className={styles.table} aria-label="Companion network connections">
            <thead>
              <tr>
                <th scope="col" aria-sort={ariaSortDir('name')}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort('name')}
                    aria-label={`Sort by name ${sortKey === 'name' ? (sortAsc ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    Name {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : '⇅'}
                  </button>
                </th>
                <th scope="col">Arabic</th>
                <th scope="col" aria-sort={ariaSortDir('branch')}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort('branch')}
                    aria-label={`Sort by branch ${sortKey === 'branch' ? (sortAsc ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    Branch {sortKey === 'branch' ? (sortAsc ? '▲' : '▼') : '⇅'}
                  </button>
                </th>
                <th scope="col">Relationship</th>
                <th scope="col" aria-sort={ariaSortDir('era')}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort('era')}
                    aria-label={`Sort by era ${sortKey === 'era' ? (sortAsc ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    Era {sortKey === 'era' ? (sortAsc ? '▲' : '▼') : '⇅'}
                  </button>
                </th>
                <th scope="col" aria-sort={ariaSortDir('hadiths')}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort('hadiths')}
                    aria-label={`Sort by hadith count ${sortKey === 'hadiths' ? (sortAsc ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    Hadiths {sortKey === 'hadiths' ? (sortAsc ? '▲' : '▼') : '⇅'}
                  </button>
                </th>
                <th scope="col" aria-sort={ariaSortDir('battles')}>
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort('battles')}
                    aria-label={`Sort by battles ${sortKey === 'battles' ? (sortAsc ? 'descending' : 'ascending') : 'ascending'}`}
                  >
                    Battles {sortKey === 'battles' ? (sortAsc ? '▲' : '▼') : '⇅'}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(c => {
                const branch = getBranch(c);
                return (
                  <tr key={c.rank} className={styles.row}>
                    <td className={styles.nameCell}>
                      <strong>{c.name}</strong>
                      {c.title && <span className={styles.title}>{c.title}</span>}
                    </td>
                    <td className={styles.arCell} lang="ar" dir="rtl">{c.ar}</td>
                    <td>
                      <span
                        className={styles.branch}
                        style={{ borderColor: branch.color, color: branch.color }}
                      >
                        {branch.label}
                      </span>
                    </td>
                    <td className={styles.relCell}>{c.rel}</td>
                    <td>{ERA_LABEL[c.convera ?? 'late'] ?? 'Conquest Era'}</td>
                    <td className={styles.numCell}>
                      {c.hadiths > 0 ? c.hadiths.toLocaleString() : '—'}
                    </td>
                    <td className={styles.numCell}>
                      {c.battles?.length > 0
                        ? <span title={c.battles.join(', ')}>{c.battles.length}</span>
                        : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
