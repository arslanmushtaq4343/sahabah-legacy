import { useEffect, useState } from 'react';
import type { BattleGeo } from '../../data/companionSegments';
import styles from './segments.module.css';

interface Props {
  battles: BattleGeo[];
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  companionName: string;
}

// SVG map bounds: x 20-80 (longitude ~30-60E), y 20-80 (latitude ~10-40N)
// Converts our stored x/y (0-100 grid) to SVG viewBox 0-200 x 0-120
function toSvg(x: number, y: number) {
  return { svgX: x * 2, svgY: (100 - y) * 1.2 };
}

const ROLE_COLOR: Record<string, string> = {
  commander: '#c9a84c',
  warrior: '#b41e1e',
  'standard-bearer': '#1a4b6e',
  physician: '#1f7a3d',
  observer: '#666',
};

export default function BattleMapPulse({
  battles,
  playing,
  reducedMotion,
  color,
  companionName,
}: Props) {
  const [shown, setShown] = useState(reducedMotion ? battles.length : 0);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setShown(battles.length);
      return;
    }
    setShown(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setShown(i);
      if (battles[i - 1]) setCurrentYear(battles[i - 1].hijriYear);
      if (i >= battles.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [playing, reducedMotion, battles.length]);

  if (!battles.length)
    return (
      <div className={styles.noData}>
        <div className={styles.noDataAr}>لا بيانات ميدانية</div>
        No battle locations recorded for this companion.
      </div>
    );

  const sorted = [...battles].sort((a, b) => a.hijriYear - b.hijriYear);

  return (
    <div>
      <div className={styles.mapOuter}>
        <svg viewBox="0 0 200 120" className={styles.mapSvg} xmlns="http://www.w3.org/2000/svg">
          {/* Parchment background */}
          <rect width="200" height="120" fill="rgba(20,14,4,0.9)" />
          {/* Simplified Arabian Peninsula + Levant outline */}
          <path
            d="M 60 20 L 90 22 L 110 30 L 130 40 L 140 60 L 135 80 L 120 95 L 100 100 L 80 95 L 70 80 L 55 70 L 45 55 L 50 35 Z"
            fill="rgba(139,100,20,0.08)"
            stroke="rgba(139,100,20,0.2)"
            strokeWidth="0.5"
          />
          {/* Levant */}
          <path
            d="M 55 20 L 65 18 L 70 30 L 60 38 L 50 35 Z"
            fill="rgba(139,100,20,0.06)"
            stroke="rgba(139,100,20,0.15)"
            strokeWidth="0.5"
          />
          {/* Persia */}
          <path
            d="M 130 20 L 170 22 L 180 50 L 160 60 L 140 55 L 130 40 Z"
            fill="rgba(85,60,154,0.06)"
            stroke="rgba(85,60,154,0.15)"
            strokeWidth="0.5"
          />
          {/* River Nile hint */}
          <path
            d="M 30 40 L 35 60 L 40 80"
            fill="none"
            stroke="rgba(26,75,110,0.2)"
            strokeWidth="0.8"
          />

          {/* Battle paths between consecutive shown battles */}
          {sorted.slice(0, shown - 1).map((b, i) => {
            const a = toSvg(b.x, b.y);
            const nx = toSvg(sorted[i + 1].x, sorted[i + 1].y);
            return (
              <line
                key={`path-${i}`}
                x1={a.svgX}
                y1={a.svgY}
                x2={nx.svgX}
                y2={nx.svgY}
                stroke={color}
                strokeWidth={0.6}
                strokeOpacity={0.4}
                strokeDasharray="3 2"
              />
            );
          })}

          {/* Battle dots */}
          {sorted.map((b, i) => {
            const { svgX, svgY } = toSvg(b.x, b.y);
            const isVisible = i < shown || reducedMotion;
            const dotColor = ROLE_COLOR[b.companionRole] ?? color;
            return (
              <g
                key={i}
                className={`${styles.mapBattleDot} ${isVisible ? styles.mapBattleDotVisible : ''}`}
              >
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={4}
                  fill={dotColor}
                  fillOpacity={0.8}
                  stroke={dotColor}
                  strokeWidth={1}
                >
                  {isVisible && !reducedMotion && (
                    <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                  )}
                </circle>
                <text
                  x={svgX}
                  y={svgY - 6}
                  className={`${styles.mapBattleLabel} ${isVisible ? styles.mapBattleLabelVisible : ''}`}
                >
                  {b.battleNameAr}
                </text>
              </g>
            );
          })}
        </svg>
        {currentYear && !reducedMotion && (
          <div className={styles.mapYearBadge}>{currentYear} AH</div>
        )}
      </div>
      <div className={styles.mapLegend}>
        {Object.entries(ROLE_COLOR).map(([role, c]) => (
          <div key={role} className={styles.mapLegendItem}>
            <div className={styles.mapLegendDot} style={{ background: c }} />
            {role}
          </div>
        ))}
      </div>
    </div>
  );
}
