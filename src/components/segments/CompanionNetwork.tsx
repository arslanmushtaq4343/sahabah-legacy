import { useEffect, useMemo, useState } from 'react';
import {
  FAMILY_EDGES,
  TRADE_EDGES,
  IKHTILAF_EDGES,
  type GraphEdge,
} from '../../data/connectionData';
import { COMPANIONS } from '../../data/companions';
import styles from './segments.module.css';

interface Props {
  selfRank: number;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

type LayerKey = 'family' | 'trade' | 'ikhtilaf';

interface Connection {
  layer: LayerKey;
  otherRank: number;
  otherName: string;
  label?: string;
  strength: number;
}

const LAYER_META: Record<LayerKey, { label: string; color: string }> = {
  family: { label: 'Family', color: '#c9a84c' },
  trade: { label: 'Trade & Commerce', color: '#1a4b6e' },
  ikhtilaf: { label: 'Ikhtilaf (disagreement)', color: '#b41e1e' },
};

function collect(layer: LayerKey, edges: GraphEdge[], selfRank: number): Connection[] {
  return edges
    .filter(e => e.source === selfRank || e.target === selfRank)
    .map(e => {
      const otherRank = e.source === selfRank ? e.target : e.source;
      const other = COMPANIONS.find(c => c.rank === otherRank);
      return {
        layer,
        otherRank,
        otherName: other?.name ?? `Companion #${otherRank}`,
        label: e.label,
        strength: e.strength ?? 0.5,
      };
    });
}

export default function CompanionNetwork({
  selfRank,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const connections = useMemo(() => {
    return [
      ...collect('family', FAMILY_EDGES, selfRank),
      ...collect('trade', TRADE_EDGES, selfRank),
      ...collect('ikhtilaf', IKHTILAF_EDGES, selfRank),
    ];
  }, [selfRank]);

  const placed = useMemo(() => {
    const layerOrder: LayerKey[] = ['family', 'trade', 'ikhtilaf'];
    const byLayer: Record<LayerKey, Connection[]> = { family: [], trade: [], ikhtilaf: [] };
    connections.forEach(c => byLayer[c.layer].push(c));

    const positioned: Array<Connection & { x: number; y: number; angle: number }> = [];
    const cx = 50;
    const cy = 50;
    const radii: Record<LayerKey, number> = { family: 22, trade: 33, ikhtilaf: 42 };

    layerOrder.forEach(layer => {
      const items = byLayer[layer];
      const n = items.length;
      if (n === 0) return;
      const r = radii[layer];
      items.forEach((c, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        positioned.push({
          ...c,
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          angle,
        });
      });
    });
    return positioned;
  }, [connections]);

  const [centerVisible, setCenterVisible] = useState(reducedMotion);
  const [revealedCount, setRevealedCount] = useState(reducedMotion ? placed.length : 0);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setCenterVisible(true);
      setRevealedCount(placed.length);
      return;
    }
    setCenterVisible(false);
    setRevealedCount(0);

    const ts: number[] = [];
    ts.push(window.setTimeout(() => setCenterVisible(true), 300));
    const start = 900;
    const gap = Math.max(120, Math.min(250, 2400 / Math.max(1, placed.length)));
    placed.forEach((_, i) => {
      ts.push(
        window.setTimeout(() => setRevealedCount(c => Math.max(c, i + 1)), start + i * gap)
      );
    });
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion, placed]);

  if (placed.length === 0) {
    return (
      <div className={styles.netEmpty}>
        No companion-to-companion network edges recorded for {companionName} yet.
      </div>
    );
  }

  const counts: Record<LayerKey, number> = { family: 0, trade: 0, ikhtilaf: 0 };
  connections.forEach(c => counts[c.layer]++);

  return (
    <div className={styles.netPanel}>
      <svg className={styles.netSvg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {placed.slice(0, revealedCount).map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke={LAYER_META[p.layer].color}
            strokeOpacity={0.3 + p.strength * 0.5}
            strokeWidth={0.4 + p.strength * 1.0}
          />
        ))}

        <circle cx="50" cy="50" r="6" fill={color} fillOpacity="0.18" />
        <circle
          cx="50"
          cy="50"
          r="3.5"
          fill={color}
          opacity={centerVisible ? 1 : 0}
          style={{ transition: 'opacity 0.6s ease' }}
        />

        {placed.slice(0, revealedCount).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill={LAYER_META[p.layer].color}
            stroke={LAYER_META[p.layer].color}
            strokeWidth="0.4"
          />
        ))}
      </svg>

      <div
        className={`${styles.netCenterLabel} ${centerVisible ? styles.netCenterLabelVisible : ''}`}
        style={{ color }}
      >
        {companionName}
      </div>

      <div className={styles.netLegend}>
        {(Object.keys(LAYER_META) as LayerKey[]).map(k => (
          <div key={k} className={styles.netLegendItem}>
            <span
              className={styles.netLegendDot}
              style={{ background: LAYER_META[k].color }}
              aria-hidden="true"
            />
            <span>
              {LAYER_META[k].label} <span className={styles.netLegendCount}>· {counts[k]}</span>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.netList}>
        {placed.slice(0, revealedCount).map((p, i) => (
          <div key={i} className={styles.netListItem}>
            <span
              className={styles.netListDot}
              style={{ background: LAYER_META[p.layer].color }}
            />
            <span className={styles.netListName}>{p.otherName}</span>
            {p.label && <span className={styles.netListLabel}>— {p.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
