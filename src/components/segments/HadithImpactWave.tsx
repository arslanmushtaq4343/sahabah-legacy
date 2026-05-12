import { useEffect, useRef, useState } from 'react';
import type { HadithNetwork } from '../../data/companionSegments';
import styles from './segments.module.css';

interface Props {
  network: HadithNetwork;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  companionName: string;
}

export default function HadithImpactWave({
  network,
  playing,
  reducedMotion,
  color,
  companionName,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rings, setRings] = useState<number>(reducedMotion ? network.generationReach : 0);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const W = 320,
    H = 220,
    CX = 160,
    CY = 110;
  const maxR = Math.min(CX, CY) - 20;
  const ringCount = Math.min(network.generationReach, 5);
  const density =
    network.totalCount > 500
      ? 'massive'
      : network.totalCount > 200
        ? 'dense'
        : network.totalCount > 50
          ? 'moderate'
          : 'sparse';
  const ringOpacity =
    density === 'massive' ? 0.7 : density === 'dense' ? 0.55 : density === 'moderate' ? 0.4 : 0.25;

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setRings(ringCount);
      return;
    }
    setRings(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setRings(i);
      if (i >= ringCount) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, [playing, reducedMotion, ringCount]);

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.waveCanvas}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="waveGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Rings */}
        {Array.from({ length: rings }).map((_, i) => {
          const r = ((i + 1) / ringCount) * maxR;
          const narrators = Math.round(network.totalCount * (1 / (i + 1.5)));
          return (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={1.5 - i * 0.2}
              strokeOpacity={ringOpacity - i * 0.08}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e =>
                setTooltip({
                  x: e.clientX,
                  y: e.clientY,
                  text: `Gen ${i + 1}: ~${narrators} narrators`,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
        {/* Ripple pulse on outermost ring */}
        {rings >= ringCount && !reducedMotion && (
          <circle
            cx={CX}
            cy={CY}
            r={maxR}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeOpacity={0.3}
          >
            <animate
              attributeName="r"
              from={maxR}
              to={maxR + 18}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              from="0.3"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {/* Central node */}
        <circle
          cx={CX}
          cy={CY}
          r={18}
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth={1.5}
        />
        <text x={CX} y={CY + 4} textAnchor="middle" fontSize={8} fill={color} fontFamily="serif">
          {companionName.split(' ')[0]}
        </text>
        {/* Top narrator dots */}
        {rings >= ringCount &&
          network.topNarrators.slice(0, 4).map((n, i) => {
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const nx = CX + Math.cos(angle) * maxR;
            const ny = CY + Math.sin(angle) * maxR;
            return (
              <g key={i}>
                <circle cx={nx} cy={ny} r={5} fill={color} fillOpacity={0.6} />
                <text
                  x={nx}
                  y={ny - 8}
                  textAnchor="middle"
                  fontSize={7}
                  fill="rgba(201,168,76,0.8)"
                >
                  {n.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
      </svg>
      {tooltip && (
        <div className={styles.waveTooltip} style={{ top: 8, right: 8 }}>
          {tooltip.text}
        </div>
      )}
      <div
        style={{
          marginTop: 8,
          fontSize: '0.7rem',
          color: 'rgba(201,168,76,0.6)',
          textAlign: 'center',
        }}
      >
        {network.totalCount.toLocaleString()} hadiths · {ringCount} transmission generations
      </div>
    </div>
  );
}
