import { useEffect, useMemo, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  tribe: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

interface ParsedTribe {
  parent: string | null;
  sub: string;
  tags: string[];
}

function parseTribe(raw: string): ParsedTribe {
  const trimmed = raw.trim();
  const tags: string[] = [];

  // Form: "Quraysh - Banu X"  OR  "Quraysh — Banu X"
  const dashMatch = trimmed.match(/^([^-—]+?)\s*[-—]\s*(.+)$/);
  if (dashMatch) {
    return {
      parent: dashMatch[1].trim(),
      sub: dashMatch[2].trim(),
      tags,
    };
  }

  // Form: "X (Y)" possibly with "(Y, allied)" etc.
  const parenMatch = trimmed.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
  if (parenMatch) {
    const sub = parenMatch[1].trim();
    const inside = parenMatch[2].trim();

    const innerParts = inside.split(',').map(s => s.trim());
    const parent = innerParts.shift() ?? null;
    innerParts.forEach(t => tags.push(t));
    return { parent, sub, tags };
  }

  return { parent: null, sub: trimmed, tags };
}

export default function TribalLineageTree({
  tribe,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const parsed = useMemo(() => parseTribe(tribe), [tribe]);

  const [parentVisible, setParentVisible] = useState(reducedMotion);
  const [line1Drawn, setLine1Drawn] = useState(reducedMotion);
  const [subVisible, setSubVisible] = useState(reducedMotion);
  const [line2Drawn, setLine2Drawn] = useState(reducedMotion);
  const [companionVisible, setCompanionVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setParentVisible(true);
      setLine1Drawn(true);
      setSubVisible(true);
      setLine2Drawn(true);
      setCompanionVisible(true);
      return;
    }
    setParentVisible(false);
    setLine1Drawn(false);
    setSubVisible(false);
    setLine2Drawn(false);
    setCompanionVisible(false);

    const ts = [
      window.setTimeout(() => setParentVisible(true), 200),
      window.setTimeout(() => setLine1Drawn(true), 700),
      window.setTimeout(() => setSubVisible(true), 1300),
      window.setTimeout(() => setLine2Drawn(true), 1800),
      window.setTimeout(() => setCompanionVisible(true), 2300),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  const hasParent = !!parsed.parent;
  const totalNodes = (hasParent ? 1 : 0) + 1 + 1; // parent? + sub + companion
  const verticalGap = totalNodes === 3 ? 70 : 90;

  return (
    <div className={styles.lineagePanel}>
      <svg
        className={styles.lineageSvg}
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Connecting lines */}
        {hasParent && (
          <line
            x1="160"
            y1="38"
            x2="160"
            y2={38 + verticalGap - 32}
            stroke={color}
            strokeWidth="1.5"
            className={`${styles.lineageLine} ${line1Drawn ? styles.lineageLineDrawn : ''}`}
          />
        )}
        <line
          x1="160"
          y1={hasParent ? 38 + verticalGap + 10 : 70}
          x2="160"
          y2={hasParent ? 38 + verticalGap * 2 - 22 : 70 + verticalGap - 22}
          stroke={color}
          strokeWidth="1.5"
          className={`${styles.lineageLine} ${(hasParent ? line2Drawn : line1Drawn) ? styles.lineageLineDrawn : ''}`}
        />
      </svg>

      <div className={styles.lineageNodes}>
        {hasParent && (
          <div
            className={`${styles.lineageNode} ${styles.lineageParent} ${parentVisible ? styles.lineageNodeVisible : ''}`}
            style={{ borderColor: color }}
          >
            <div className={styles.lineageNodeLabel}>Parent Tribe</div>
            <div className={styles.lineageNodeName} style={{ color }}>
              {parsed.parent}
            </div>
          </div>
        )}

        <div
          className={`${styles.lineageNode} ${styles.lineageSub} ${subVisible ? styles.lineageNodeVisible : ''}`}
          style={{ borderColor: color }}
        >
          <div className={styles.lineageNodeLabel}>
            {hasParent ? 'Sub-tribe / Clan' : 'Tribe / Lineage'}
          </div>
          <div className={styles.lineageNodeName} style={{ color }}>
            {parsed.sub}
          </div>
          {parsed.tags.length > 0 && (
            <div className={styles.lineageTags}>
              {parsed.tags.map(t => (
                <span key={t} className={styles.lineageTag}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className={`${styles.lineageNode} ${styles.lineageCompanion} ${companionVisible ? styles.lineageNodeVisible : ''}`}
          style={{ borderColor: color, background: `${color}15` }}
        >
          <div className={styles.lineageNodeLabel}>Companion</div>
          <div className={styles.lineageNodeName} style={{ color }}>
            {companionName}
          </div>
        </div>
      </div>
    </div>
  );
}
