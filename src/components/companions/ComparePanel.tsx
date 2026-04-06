import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { useCompare } from '../../context/CompareContext';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import styles from './ComparePanel.module.css';

const COLORS = ['#c9a84c', '#8b4513', '#1a3462'];

function buildRadar(rank: number) {
  const c = COMPANIONS.find(x => x.rank === rank);
  if (!c) return null;
  return [
    { subject: 'Hadiths', value: Math.min(100, Math.round((c.hadiths / 5374) * 100)) },
    { subject: 'Battles', value: Math.min(100, c.battles.length * 12) },
    { subject: 'Scholarship', value: c.cat === 'scholar' || c.cat === 'narrator' ? 85 : 40 },
    { subject: 'Sacrifice',   value: c.cat === 'martyr' || c.cat === 'warrior' ? 90 : 50 },
    { subject: 'Leadership',  value: c.cat === 'caliph' || c.cat === 'general' ? 95 : 45 },
    { subject: 'Legacy',      value: c.rank <= 5 ? 100 : c.rank <= 15 ? 75 : 55 },
  ];
}

export default function ComparePanel() {
  const { selected, clear, toggle, isPanelOpen, closePanel } = useCompare();

  if (!isPanelOpen || selected.length === 0) return null;

  const companions = selected.map(r => COMPANIONS.find(c => c.rank === r)).filter(Boolean);

  // Merge radar data for multi-line chart
  const radarKeys = ['Hadiths', 'Battles', 'Scholarship', 'Sacrifice', 'Leadership', 'Legacy'];
  const mergedData = radarKeys.map(key => {
    const entry: Record<string, unknown> = { subject: key };
    companions.forEach(c => {
      const row = buildRadar(c!.rank);
      entry[c!.name] = row?.find(r => r.subject === key)?.value ?? 0;
    });
    return entry;
  });

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && closePanel()}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Compare Companions</h2>
          <div className={styles.headerActions}>
            <button className={styles.clearBtn} onClick={() => { clear(); closePanel(); }}>Clear all</button>
            <button className={styles.closeBtn} onClick={closePanel}>✕</button>
          </div>
        </div>

        <div className={styles.body}>
          {/* Columns */}
          <div
            className={styles.cols}
            style={{ gridTemplateColumns: `repeat(${companions.length}, 1fr)` }}
          >
            {companions.map((c, i) => (
              <div key={c!.rank} className={styles.col} style={{ '--accent': COLORS[i] } as React.CSSProperties}>
                <div className={styles.colAccent} />
                <div className={styles.colInner}>
                  <button className={styles.removeBtn} onClick={() => toggle(c!.rank)}>✕</button>
                  <p className={styles.ar}>{c!.ar}</p>
                  <h3 className={styles.name}>{c!.name}</h3>
                  <p className={styles.catLabel} style={{ background: CAT_COLORS[c!.cat] }}>{c!.catLabel}</p>
                  <dl className={styles.dl}>
                    <dt>Title</dt><dd>{c!.title}</dd>
                    <dt>Born</dt><dd>{c!.born || '—'}</dd>
                    <dt>Tribe</dt><dd>{c!.tribe}</dd>
                    <dt>Hadiths</dt><dd>{c!.hadiths.toLocaleString()}</dd>
                    <dt>Battles</dt><dd>{c!.battles.length}</dd>
                    <dt>Burial</dt><dd>{c!.burial || '—'}</dd>
                  </dl>
                  <p className={styles.sig}>{c!.sig}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Radar overlay */}
          <div className={styles.radarWrap}>
            <h3 className={styles.radarTitle}>Profile Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                data={mergedData}
                role="img"
                aria-label={`Multi-companion radar comparison for ${companions.map(c => c!.name).join(', ')} across Hadiths, Battles, Scholarship, Sacrifice, Leadership, and Legacy`}
              >
                <title>Companion Comparison — {companions.map(c => c!.name).join(' vs ')}</title>
                <PolarGrid stroke="#2c2820" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a6e5a', fontSize: 11 }} />
                {companions.map((c, i) => (
                  <Radar
                    key={c!.rank}
                    name={c!.name}
                    dataKey={c!.name}
                    stroke={COLORS[i]}
                    fill={COLORS[i]}
                    fillOpacity={0.15}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

