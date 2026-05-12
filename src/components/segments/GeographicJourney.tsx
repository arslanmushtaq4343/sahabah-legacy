import { useEffect, useMemo, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  born: string;
  place: string;
  burial: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

interface Stop {
  label: string;
  location: string;
  x: number;
  y: number;
}

function shortenLocation(loc: string): string {
  if (loc.length <= 28) return loc;
  return loc.slice(0, 25) + '…';
}

export default function GeographicJourney({
  born,
  place,
  burial,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const stops = useMemo<Stop[]>(() => {
    return [
      { label: 'Born', location: place || born, x: 18, y: 65 },
      { label: 'Lived & Served', location: place, x: 50, y: 35 },
      { label: 'Buried', location: burial, x: 82, y: 60 },
    ];
  }, [born, place, burial]);

  const [headerVisible, setHeaderVisible] = useState(reducedMotion);
  const [pathDrawn, setPathDrawn] = useState(reducedMotion);
  const [pinCount, setPinCount] = useState(reducedMotion ? stops.length : 0);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setHeaderVisible(true);
      setPathDrawn(true);
      setPinCount(stops.length);
      return;
    }
    setHeaderVisible(false);
    setPathDrawn(false);
    setPinCount(0);

    const ts: number[] = [];
    ts.push(window.setTimeout(() => setHeaderVisible(true), 200));
    ts.push(window.setTimeout(() => setPinCount(1), 800));
    ts.push(window.setTimeout(() => setPathDrawn(true), 1200));
    ts.push(window.setTimeout(() => setPinCount(2), 2200));
    ts.push(window.setTimeout(() => setPinCount(3), 3200));
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion, stops.length]);

  return (
    <div className={styles.journeyPanel}>
      <div
        className={`${styles.journeyHeader} ${headerVisible ? styles.journeyHeaderVisible : ''}`}
        style={{ color }}
      >
        Geographic Journey of {companionName}
      </div>

      <div className={styles.journeyMap}>
        <svg
          className={styles.journeySvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Background grid */}
          <defs>
            <pattern id="journey-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeOpacity="0.06" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#journey-grid)" />

          {/* Curving travel path through the three stops */}
          <path
            d={`M ${stops[0].x} ${stops[0].y} Q ${stops[1].x} ${stops[1].y - 18} ${stops[1].x} ${stops[1].y} Q ${stops[1].x} ${stops[1].y + 14} ${stops[2].x} ${stops[2].y}`}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            strokeDasharray="2 2"
            className={`${styles.journeyPath} ${pathDrawn ? styles.journeyPathDrawn : ''}`}
          />

          {/* Pin circles */}
          {stops.map((s, i) => (
            <g
              key={i}
              className={`${styles.journeyPin} ${i < pinCount ? styles.journeyPinVisible : ''}`}
              style={{ transformOrigin: `${s.x}% ${s.y}%` }}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r="2.4"
                fill={color}
                opacity="0.25"
              />
              <circle
                cx={s.x}
                cy={s.y}
                r="1.2"
                fill={color}
              />
            </g>
          ))}
        </svg>

        {stops.map((s, i) => (
          <div
            key={i}
            className={`${styles.journeyStop} ${i < pinCount ? styles.journeyStopVisible : ''}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
            }}
          >
            <div className={styles.journeyStopLabel} style={{ color }}>
              {s.label}
            </div>
            <div className={styles.journeyStopLocation}>{shortenLocation(s.location)}</div>
          </div>
        ))}
      </div>

      <div className={styles.journeyLegend}>
        <span style={{ color }}>●</span> A life in motion across the early Muslim world
      </div>
    </div>
  );
}
