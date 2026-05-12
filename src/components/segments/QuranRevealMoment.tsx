import { useEffect, useState } from 'react';
import type { QuranTrigger } from '../../data/quranTriggers';
import styles from './segments.module.css';

interface Props {
  entries: QuranTrigger[];
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function QuranRevealMoment({
  entries,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'arabic' | 'english' | 'context' | 'source'>(
    reducedMotion ? 'source' : 'idle'
  );
  const entry = entries[activeIdx];

  const isMedinan = entry ? entry.surahNum >= 2 && entry.surahNum <= 66 : false;
  const bgColor = isMedinan ? 'rgba(139,80,0,0.12)' : 'rgba(26,50,110,0.1)';

  useEffect(() => {
    if (!playing) {
      if (!reducedMotion) setPhase('idle');
      return;
    }
    if (reducedMotion) {
      setPhase('source');
      return;
    }
    setPhase('idle');
    const t1 = setTimeout(() => setPhase('arabic'), 300);
    const t2 = setTimeout(() => setPhase('english'), 1400);
    const t3 = setTimeout(() => setPhase('context'), 2200);
    const t4 = setTimeout(() => setPhase('source'), 3000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [playing, reducedMotion, activeIdx]);

  function switchEntry(idx: number) {
    setActiveIdx(idx);
    setPhase('idle');
    setTimeout(() => setPhase('arabic'), 150);
    setTimeout(() => setPhase('english'), 1200);
    setTimeout(() => setPhase('context'), 2000);
    setTimeout(() => setPhase('source'), 2800);
  }

  if (!entries.length)
    return (
      <div className={styles.noData}>
        <div className={styles.noDataAr}>لا توجد آيات مرتبطة</div>
        No Quran revelations linked to this companion in our current dataset.
      </div>
    );

  return (
    <div>
      {entries.length > 1 && (
        <div className={styles.segTabBar}>
          {entries.map((e, i) => (
            <button
              key={i}
              className={`${styles.segTabPill} ${i === activeIdx ? styles.segTabPillActive : ''}`}
              onClick={() => switchEntry(i)}
              style={i === activeIdx ? { borderColor: color, color } : undefined}
            >
              {e.ayahRef}
            </button>
          ))}
        </div>
      )}
      <div className={styles.quranPanel}>
        <div
          className={`${styles.quranBg} ${phase !== 'idle' ? styles.quranBgVisible : ''}`}
          style={{ background: bgColor }}
        />
        {/* Particles */}
        {!reducedMotion && phase !== 'idle' && (
          <div className={styles.quranParticles}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={styles.quranParticle}
                style={{
                  left: `${10 + i * 11}%`,
                  animationDuration: `${3 + i * 0.4}s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}
        <div className={styles.quranContent}>
          <div
            className={`${styles.quranAyahAr} ${phase !== 'idle' ? styles.quranAyahArVisible : ''}`}
            style={{ color }}
          >
            {entry.ayahAr}
          </div>
          {readingLevel !== 'child' && (
            <div
              className={`${styles.quranAyahEn} ${['english', 'context', 'source'].includes(phase) ? styles.quranAyahEnVisible : ''}`}
            >
              {entry.ayahEn}
            </div>
          )}
          <div
            className={`${styles.quranContextBanner} ${['context', 'source'].includes(phase) ? styles.quranContextBannerVisible : ''}`}
          >
            <strong>{entry.companion}:</strong> {entry.story.slice(0, 180)}
            {entry.story.length > 180 ? '…' : ''}
          </div>
          {readingLevel !== 'child' && (
            <span
              className={`${styles.quranSourceChip} ${phase === 'source' ? styles.quranSourceChipVisible : ''}`}
            >
              {entry.source.split(';')[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
