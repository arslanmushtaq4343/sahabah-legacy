import { useEffect, useState } from 'react';
import type { Laqab } from '../../data/laqab';
import styles from './segments.module.css';

interface Props {
  laqab: Laqab;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function HonoredTitleLaqab({
  laqab,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [scrollVisible, setScrollVisible] = useState(reducedMotion);
  const [titleArVisible, setTitleArVisible] = useState(reducedMotion);
  const [titleEnVisible, setTitleEnVisible] = useState(reducedMotion);
  const [wordsVisible, setWordsVisible] = useState(reducedMotion);
  const [occasionVisible, setOccasionVisible] = useState(reducedMotion);
  const [sourceVisible, setSourceVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setScrollVisible(true);
      setTitleArVisible(true);
      setTitleEnVisible(true);
      setWordsVisible(true);
      setOccasionVisible(true);
      setSourceVisible(true);
      return;
    }
    setScrollVisible(false);
    setTitleArVisible(false);
    setTitleEnVisible(false);
    setWordsVisible(false);
    setOccasionVisible(false);
    setSourceVisible(false);

    const ts = [
      window.setTimeout(() => setScrollVisible(true), 200),
      window.setTimeout(() => setTitleArVisible(true), 900),
      window.setTimeout(() => setTitleEnVisible(true), 1500),
      window.setTimeout(() => setWordsVisible(true), 2100),
      window.setTimeout(() => setOccasionVisible(true), 3000),
      window.setTimeout(() => setSourceVisible(true), 3600),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div
      className={`${styles.laqabPanel} ${scrollVisible ? styles.laqabPanelVisible : ''}`}
      style={{ borderColor: color }}
    >
      <div className={styles.laqabSeal} style={{ borderColor: color, color }}>
        ◈
      </div>

      <div
        className={`${styles.laqabTitleAr} ${titleArVisible ? styles.laqabTitleArVisible : ''}`}
        style={{ color }}
      >
        {laqab.laqabAr}
      </div>

      <div
        className={`${styles.laqabTitleEn} ${titleEnVisible ? styles.laqabTitleEnVisible : ''}`}
      >
        {laqab.laqab} <span className={styles.laqabMeaning}>— {laqab.laqabEn}</span>
      </div>

      {laqab.prophetsWordsAr && laqab.prophetsWordsEn && (
        <div
          className={`${styles.laqabWords} ${wordsVisible ? styles.laqabWordsVisible : ''}`}
          style={{ borderColor: `${color}55` }}
        >
          <div className={styles.laqabWordsLabel} style={{ color }}>
            ﷺ The Prophet said:
          </div>
          <div className={styles.laqabWordsAr} style={{ color }}>
            {laqab.prophetsWordsAr}
          </div>
          {readingLevel !== 'child' && (
            <div className={styles.laqabWordsEn}>{laqab.prophetsWordsEn}</div>
          )}
        </div>
      )}

      <div
        className={`${styles.laqabOccasion} ${occasionVisible ? styles.laqabOccasionVisible : ''}`}
      >
        <span className={styles.laqabOccasionLabel} style={{ color }}>
          Occasion:
        </span>{' '}
        {laqab.occasionEn}
      </div>

      <div
        className={`${styles.laqabSource} ${sourceVisible ? styles.laqabSourceVisible : ''}`}
      >
        {laqab.source}
      </div>
    </div>
  );
}
