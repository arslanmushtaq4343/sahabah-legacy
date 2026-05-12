import { useEffect, useRef, useState } from 'react';
import type { LifeArcNode } from '../../data/companionSegments';
import styles from './segments.module.css';

interface Props {
  arc: LifeArcNode[];
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

const TYPE_DOT: Record<string, string> = {
  birth: styles.arcDotBirth,
  death: styles.arcDotDeath,
  battle: styles.arcDotBattle,
  migration: styles.arcDotHijra,
  role: styles.arcDotHonor,
  conversion: styles.arcDotHonor,
};

export default function LifeArcScroll({ arc, playing, reducedMotion, color }: Props) {
  const [shown, setShown] = useState(reducedMotion ? arc.length : 0);
  const [lineVisible, setLineVisible] = useState(reducedMotion);
  const outerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setShown(arc.length);
      setLineVisible(true);
      return;
    }
    setShown(0);
    setLineVisible(false);
    const t1 = setTimeout(() => setLineVisible(true), 100);
    let i = 0;
    const interval = setInterval(
      () => {
        i++;
        setShown(i);
        // auto-scroll to current node
        const el = nodeRefs.current[i - 1];
        if (el && outerRef.current)
          el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        if (i >= arc.length) clearInterval(interval);
      },
      reducedMotion ? 0 : 500
    );
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [playing, reducedMotion, arc.length]);

  if (!arc.length)
    return (
      <div className={styles.noData}>
        <div className={styles.noDataAr}>لا بيانات</div>
        Life arc timeline not yet recorded for this companion.
      </div>
    );

  return (
    <div className={styles.arcOuter} ref={outerRef}>
      <div className={styles.arcTrack}>
        <div className={`${styles.arcLine} ${lineVisible ? styles.arcLineVisible : ''}`} />
        {arc.map((node, i) => (
          <div
            key={i}
            ref={el => {
              nodeRefs.current[i] = el;
            }}
            className={`${styles.arcNode} ${i < shown || reducedMotion ? styles.arcNodeVisible : ''}`}
            style={{ transitionDelay: reducedMotion ? '0ms' : `${i * 80}ms` }}
            title={node.sourceRef}
          >
            <div className={styles.arcYear}>
              {node.year > 0 ? `${node.year} CE` : `${Math.abs(node.year)} BH`}
            </div>
            <div
              className={`${styles.arcDot} ${TYPE_DOT[node.type] ?? ''}`}
              style={
                node.type === 'role' || node.type === 'conversion'
                  ? { borderColor: color }
                  : undefined
              }
            />
            <div className={styles.arcLabel}>{node.label}</div>
            <div className={styles.arcLabelAr}>{node.labelAr}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
