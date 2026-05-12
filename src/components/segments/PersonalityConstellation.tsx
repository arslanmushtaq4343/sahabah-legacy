import { useEffect, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  traits: string[];
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

// Deterministic position generator for stars
function getStarPositions(count: number) {
  const positions: { x: number; y: number }[] = [];
  const W = 320,
    H = 200;
  const golden = 2.399963229728653;
  for (let i = 0; i < count; i++) {
    const theta = i * golden;
    const r = Math.sqrt(i / count) * Math.min(W, H) * 0.42;
    const x = W / 2 + r * Math.cos(theta);
    const y = H / 2 + r * Math.sin(theta);
    positions.push({ x, y });
  }
  return positions;
}

function getConnections(count: number): [number, number][] {
  const connections: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    // Connect to next and skip-one
    if (i + 1 < count) connections.push([i, i + 1]);
    if (i + 2 < count && i % 2 === 0) connections.push([i, i + 2]);
  }
  return connections;
}

export default function PersonalityConstellation({ traits, playing, reducedMotion, color }: Props) {
  const [revealed, setRevealed] = useState(reducedMotion ? traits.length : 0);
  const [linesVisible, setLinesVisible] = useState(reducedMotion);
  const [pulsingIdx, setPulsingIdx] = useState(-1);

  const positions = getStarPositions(traits.length);
  const connections = getConnections(traits.length);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setRevealed(traits.length);
      setLinesVisible(true);
      return;
    }

    setRevealed(0);
    setLinesVisible(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= traits.length) {
        clearInterval(interval);
        setLinesVisible(true);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [playing, reducedMotion, traits.length]);

  // Pulse each star in sequence
  useEffect(() => {
    if (!linesVisible) return;
    let i = 0;
    const interval = setInterval(() => {
      setPulsingIdx(i % traits.length);
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, [linesVisible, traits.length]);

  return (
    <div className={styles.constellWrap}>
      <svg viewBox="0 0 320 200" className={styles.constellSvg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {linesVisible &&
          connections.map(([a, b], i) =>
            a < revealed && b < revealed ? (
              <line
                key={i}
                x1={positions[a].x}
                y1={positions[a].y}
                x2={positions[b].x}
                y2={positions[b].y}
                stroke={color}
                strokeWidth="0.8"
                strokeOpacity="0.25"
                className={styles.constellLine}
              />
            ) : null
          )}

        {/* Stars */}
        {positions.map((pos, i) => {
          const isRevealed = i < revealed || reducedMotion;
          const isPulsing = pulsingIdx === i;
          return (
            <g
              key={i}
              style={{ opacity: isRevealed ? 1 : 0, transition: `opacity 0.4s ease ${i * 50}ms` }}
            >
              {/* Outer glow pulse */}
              {isPulsing && !reducedMotion && (
                <circle cx={pos.x} cy={pos.y} r={12} fill={color} fillOpacity={0.1}>
                  <animate attributeName="r" values="8;16;8" dur="1.2s" repeatCount="1" />
                  <animate
                    attributeName="fill-opacity"
                    values="0.15;0;0.15"
                    dur="1.2s"
                    repeatCount="1"
                  />
                </circle>
              )}
              {/* Star dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isPulsing && !reducedMotion ? 5 : 4}
                fill={color}
                fillOpacity={isRevealed ? 0.85 : 0}
                filter="url(#starGlow)"
                style={{ transition: 'r 0.3s ease' }}
              />
              {/* Inner bright core */}
              <circle cx={pos.x} cy={pos.y} r={1.5} fill="#fff" fillOpacity={0.8} />
            </g>
          );
        })}
      </svg>

      {/* Trait labels grid */}
      <div className={styles.constellTraits}>
        {traits.map((trait, i) => (
          <div
            key={i}
            className={`${styles.constellTrait} ${pulsingIdx === i ? styles.constellTraitActive : ''}`}
            style={{
              opacity: i < revealed || reducedMotion ? 1 : 0,
              transitionDelay: reducedMotion ? '0ms' : `${i * 80}ms`,
              borderColor: pulsingIdx === i ? color : undefined,
              color: pulsingIdx === i ? color : undefined,
            }}
          >
            <span className={styles.constellTraitDot} style={{ background: color }} />
            {trait}
          </div>
        ))}
      </div>
    </div>
  );
}
