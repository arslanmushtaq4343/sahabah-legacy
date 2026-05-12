import { useEffect, useState } from 'react';
import type { LastWords } from '../../data/lastWords';
import styles from './segments.module.css';

interface Props {
  entry: LastWords;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function FinalMomentsCinematic({
  entry,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [dimActive, setDimActive] = useState(reducedMotion);
  const [crescentVisible, setCrescentVisible] = useState(reducedMotion);
  const [crescentArcVisible, setCrescentArcVisible] = useState(reducedMotion);
  const [wordsAr, setWordsAr] = useState(reducedMotion);
  const [wordsEn, setWordsEn] = useState(reducedMotion);
  const [locationVis, setLocationVis] = useState(reducedMotion);
  const [sourceVis, setSourceVis] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setDimActive(true);
      setCrescentVisible(true);
      setCrescentArcVisible(true);
      setWordsAr(true);
      setWordsEn(true);
      setLocationVis(true);
      setSourceVis(true);
      return;
    }
    const ts = [
      setTimeout(() => setDimActive(true), 100),
      setTimeout(() => setCrescentVisible(true), 600),
      setTimeout(() => setCrescentArcVisible(true), 1000),
      setTimeout(() => setWordsAr(true), 1500),
      setTimeout(() => setWordsEn(true), 2800),
      setTimeout(() => setLocationVis(true), 3800),
      setTimeout(() => setSourceVis(true), 4200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div className={styles.finalPanel}>
      <div className={`${styles.finalDim} ${dimActive ? styles.finalDimActive : ''}`} />

      {/* Crescent SVG */}
      <div
        className={`${styles.finalCrescent} ${crescentVisible ? styles.finalCrescentVisible : ''}`}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M 30 8 A 16 16 0 1 0 30 40 A 12 12 0 1 1 30 8 Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            className={`${styles.finalCrescentArc} ${crescentArcVisible ? styles.finalCrescentArcVisible : ''}`}
          />
        </svg>
      </div>

      <div className={styles.finalContent}>
        <div
          className={`${styles.finalWordsAr} ${wordsAr ? styles.finalWordsArVisible : ''}`}
          style={{ color }}
        >
          {entry.wordsAr}
        </div>
        {readingLevel !== 'child' && (
          <div className={`${styles.finalWordsEn} ${wordsEn ? styles.finalWordsEnVisible : ''}`}>
            {entry.wordsEn}
          </div>
        )}
        <div
          className={`${styles.finalLocation} ${locationVis ? styles.finalLocationVisible : ''}`}
        >
          <span style={{ color, marginRight: 6 }}>☾</span>
          {entry.companionAr && <span>{entry.companionAr} · </span>}
          {entry.yearAH && <span className={styles.finalYearCount}>{entry.yearAH} AH</span>}
        </div>
        {entry.context && readingLevel === 'scholar' && (
          <details className={styles.scholarAccordion} style={{ marginTop: 12 }}>
            <summary>Historical context</summary>
            <div className={styles.scholarContent}>{entry.context}</div>
          </details>
        )}
      </div>

      <div
        className={`${styles.finalSourceChip} ${sourceVis ? styles.finalSourceChipVisible : ''}`}
      >
        {entry.source}
      </div>
    </div>
  );
}
