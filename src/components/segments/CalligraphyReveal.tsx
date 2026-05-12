import { useEffect, useRef, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  nameAr: string;
  title: string;
  titleAr?: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  rank: number;
}

export default function CalligraphyReveal({
  nameAr,
  title,
  titleAr,
  playing,
  reducedMotion,
  color,
  rank,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(reducedMotion ? 3 : 0);
  const [ringScale, setRingScale] = useState(reducedMotion ? 1 : 0);
  const [rankVisible, setRankVisible] = useState(reducedMotion);
  const [titleVisible, setTitleVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setPhase(3);
      setRingScale(1);
      setRankVisible(true);
      setTitleVisible(true);
      return;
    }

    setPhase(0);
    setRingScale(0);
    setRankVisible(false);
    setTitleVisible(false);
    const t1 = setTimeout(() => setRingScale(1), 200);
    const t2 = setTimeout(() => setRankVisible(true), 600);
    const t3 = setTimeout(() => setPhase(1), 800);
    const t4 = setTimeout(() => setPhase(2), 1800);
    const t5 = setTimeout(() => setPhase(3), 2400);
    const t6 = setTimeout(() => setTitleVisible(true), 2800);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [playing, reducedMotion]);

  const chars = nameAr.split('');
  const totalChars = chars.length;

  return (
    <div className={styles.calligWrap}>
      {/* Outer ring */}
      <div className={styles.calligRingOuter}>
        <svg
          ref={svgRef}
          viewBox="0 0 300 300"
          className={styles.calligSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="calligGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <filter id="calligGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glow */}
          <circle cx="150" cy="150" r="130" fill="url(#calligGrad)" />

          {/* Animated outer ring */}
          <circle
            cx="150"
            cy="150"
            r="128"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="6 4"
            style={{
              transform: `scale(${ringScale})`,
              transformOrigin: '150px 150px',
              transition: `transform 0.8s cubic-bezier(0.34,1.56,0.64,1)`,
            }}
          >
            {!reducedMotion && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 150 150"
                to="360 150 150"
                dur="30s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* Inner ring */}
          <circle
            cx="150"
            cy="150"
            r="110"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />

          {/* Rank number */}
          <text
            x="150"
            y="80"
            textAnchor="middle"
            fontSize="11"
            fill={color}
            fillOpacity={rankVisible ? 0.6 : 0}
            fontFamily="'Courier New', monospace"
            fontWeight="800"
            letterSpacing="3"
            style={{ transition: 'fill-opacity 0.5s ease' }}
          >
            RANK {rank.toString().padStart(3, '0')}
          </text>

          {/* Arabic name — main calligraphy */}
          <text
            x="150"
            y="170"
            textAnchor="middle"
            fontSize="32"
            fontFamily="var(--font-arabic, 'Amiri', 'Noto Naskh Arabic', serif)"
            fill={color}
            filter="url(#calligGlow)"
            style={{
              direction: 'rtl',
              opacity: phase >= 1 ? 1 : 0,
              transform: `scale(${phase >= 1 ? 1 : 0.7})`,
              transformOrigin: '150px 170px',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {nameAr}
          </text>

          {/* Decorative dots at cardinal points */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 150 + 128 * Math.cos(rad);
            const y = 150 + 128 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill={color}
                fillOpacity={ringScale * 0.8}
                style={{ transition: `fill-opacity 0.3s ease ${i * 100}ms` }}
              />
            );
          })}

          {/* Small decorative stars */}
          {phase >= 2 &&
            [45, 135, 225, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 150 + 118 * Math.cos(rad);
              const y = 150 + 118 * Math.sin(rad);
              return (
                <text
                  key={i}
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="8"
                  fill={color}
                  fillOpacity={0.5}
                  fontFamily="serif"
                >
                  ✦
                </text>
              );
            })}

          {/* Bottom divider */}
          {phase >= 3 && (
            <>
              <line
                x1="100"
                y1="195"
                x2="200"
                y2="195"
                stroke={color}
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              <text
                x="150"
                y="215"
                textAnchor="middle"
                fontSize="9.5"
                fill={color}
                fillOpacity={0.7}
                fontFamily="var(--font-arabic, serif)"
                style={{ direction: 'rtl' }}
              >
                {titleAr ?? title}
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Title below */}
      <div
        className={styles.calligTitle}
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: `translateY(${titleVisible ? 0 : 8}px)`,
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          color,
        }}
      >
        {title}
      </div>
    </div>
  );
}
