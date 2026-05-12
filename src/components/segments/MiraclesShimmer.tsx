import { useEffect, useMemo, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  miracles: string | string[];
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

const SPARKLE_POSITIONS = [
  { x: 12, y: 18, size: 0.8, delay: 0 },
  { x: 86, y: 22, size: 1.1, delay: 0.4 },
  { x: 22, y: 78, size: 0.9, delay: 0.8 },
  { x: 78, y: 70, size: 0.7, delay: 1.1 },
  { x: 50, y: 8, size: 1.0, delay: 1.4 },
  { x: 8, y: 50, size: 0.6, delay: 1.7 },
  { x: 92, y: 52, size: 0.8, delay: 2.0 },
  { x: 50, y: 92, size: 0.9, delay: 2.3 },
];

export default function MiraclesShimmer({
  miracles,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const items = useMemo(() => {
    if (Array.isArray(miracles)) return miracles.filter(Boolean);
    return [miracles].filter(Boolean);
  }, [miracles]);

  const [headerVisible, setHeaderVisible] = useState(reducedMotion);
  const [sparklesActive, setSparklesActive] = useState(reducedMotion);
  const [revealedCount, setRevealedCount] = useState(reducedMotion ? items.length : 0);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setHeaderVisible(true);
      setSparklesActive(true);
      setRevealedCount(items.length);
      return;
    }
    setHeaderVisible(false);
    setSparklesActive(false);
    setRevealedCount(0);

    const ts: number[] = [];
    ts.push(window.setTimeout(() => setHeaderVisible(true), 200));
    ts.push(window.setTimeout(() => setSparklesActive(true), 600));

    const start = 1100;
    const gap = 1400;
    items.forEach((_, i) => {
      ts.push(
        window.setTimeout(() => setRevealedCount(c => Math.max(c, i + 1)), start + i * gap)
      );
    });
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion, items]);

  return (
    <div className={styles.miraclesPanel}>
      <div className={styles.miraclesSparkleStage} aria-hidden="true">
        {SPARKLE_POSITIONS.map((p, i) => (
          <div
            key={i}
            className={`${styles.miraclesSparkle} ${sparklesActive ? styles.miraclesSparkleActive : ''}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              color,
              animationDelay: `${p.delay}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div
        className={`${styles.miraclesHeader} ${headerVisible ? styles.miraclesHeaderVisible : ''}`}
        style={{ color }}
      >
        <span className={styles.miraclesHeaderIcon}>✨</span>
        <span>Miracles attributed to {companionName}</span>
      </div>

      <div className={styles.miraclesList}>
        {items.slice(0, revealedCount).map((item, i) => (
          <div key={i} className={styles.miraclesItem}>
            <span className={styles.miraclesItemMark} style={{ color }}>
              ◈
            </span>
            <span className={styles.miraclesItemText}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
