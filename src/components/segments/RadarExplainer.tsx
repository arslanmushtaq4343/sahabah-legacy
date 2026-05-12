import { useEffect, useState } from 'react';
import type { RadarAxisAnnotation } from '../../data/companionSegments';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import styles from './segments.module.css';

const AXIS_COLORS: Record<string, string> = {
  legacy: '#c9a84c',
  battles: '#b41e1e',
  scholarship: '#1a4b6e',
  sacrifice: '#1a4b6e',
  leadership: '#1f7a3d',
};

interface Props {
  radarPoints: { subject: string; value: number }[];
  annotations: RadarAxisAnnotation[];
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

export default function RadarExplainer({
  radarPoints,
  annotations,
  playing,
  reducedMotion,
  color,
}: Props) {
  const [revealed, setRevealed] = useState<number>(reducedMotion ? radarPoints.length : 0);
  const [animatedPoints, setAnimatedPoints] = useState(
    reducedMotion ? radarPoints : radarPoints.map(p => ({ ...p, value: 0 }))
  );

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setRevealed(radarPoints.length);
      setAnimatedPoints(radarPoints);
      return;
    }
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setRevealed(idx);
      setAnimatedPoints(radarPoints.map((p, i) => ({ ...p, value: i < idx ? p.value : 0 })));
      if (idx >= radarPoints.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [playing, reducedMotion, radarPoints]);

  return (
    <div className={styles.radarWrap}>
      <div className={styles.radarChartArea}>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={animatedPoints}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'rgba(201,168,76,0.7)', fontSize: 10 }}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.18}
              isAnimationActive={!reducedMotion}
              animationDuration={500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.radarAnnotations}>
        {annotations.slice(0, revealed).map((a, i) => (
          <div
            key={a.axis}
            className={`${styles.radarAnnotCard} ${styles.radarAnnotCardVisible}`}
            style={{
              borderLeftColor: AXIS_COLORS[a.axis] ?? color,
              transitionDelay: reducedMotion ? '0ms' : `${i * 100}ms`,
            }}
          >
            <div className={styles.radarAnnotAxis} style={{ color: AXIS_COLORS[a.axis] ?? color }}>
              {a.axis.toUpperCase()} · {a.score}/100
            </div>
            <div>{a.reason}</div>
            {a.confidence !== 'high' && (
              <div style={{ fontSize: '0.6rem', marginTop: 2, opacity: 0.6 }}>{a.confidence}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
