import { useEffect, useRef, useState } from 'react';
import styles from './segments.module.css';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

interface SegmentWrapperProps {
  title: string;
  titleAr?: string;
  icon?: string;
  source?: string;
  confidence?: ConfidenceLevel;
  companionName: string;
  readingLevel?: 'child' | 'adult' | 'scholar';
  reducedMotion: boolean;
  children: (playing: boolean) => React.ReactNode;
  sourceDetail?: string;
}

export default function SegmentWrapper({
  title,
  titleAr,
  icon = '▶',
  source,
  confidence,
  companionName,
  readingLevel = 'adult',
  reducedMotion,
  children,
  sourceDetail,
}: SegmentWrapperProps) {
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-play on viewport entry (once)
  useEffect(() => {
    if (reducedMotion) {
      setPlaying(true);
      setHasPlayed(true);
      return;
    }
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasPlayed) {
          setPlaying(true);
          setHasPlayed(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (wrapperRef.current) observerRef.current.observe(wrapperRef.current);
    return () => observerRef.current?.disconnect();
  }, [reducedMotion, hasPlayed]);

  function handlePlay() {
    setPlaying(true);
    if (!hasPlayed) setHasPlayed(true);
  }
  function handlePause() {
    setPlaying(false);
  }
  function handleReplay() {
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      setHasPlayed(true);
    });
  }

  const confDotClass =
    confidence === 'high'
      ? styles.confHigh
      : confidence === 'medium'
        ? styles.confMedium
        : confidence === 'low'
          ? styles.confLow
          : '';

  const modeClass = readingLevel === 'child' ? styles.modeChild : '';

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${modeClass}`}
      aria-label={`${title} animated segment for ${companionName}`}
      role="region"
    >
      <div className={styles.wrapperTopBar} />
      <div className={styles.wrapperHeader}>
        <span className={styles.wrapperIcon}>{icon}</span>
        <div>
          <div className={styles.wrapperTitle}>{title}</div>
          {titleAr && readingLevel !== 'child' && (
            <div className={styles.wrapperTitleAr}>{titleAr}</div>
          )}
        </div>
        {!reducedMotion && (
          <div className={styles.wrapperControls}>
            {!playing ? (
              <button
                className={`${styles.ctrlBtn}`}
                onClick={handlePlay}
                aria-label="Play animation"
                title="Play"
              >
                ▶
              </button>
            ) : (
              <button
                className={`${styles.ctrlBtn} ${styles.ctrlBtnActive}`}
                onClick={handlePause}
                aria-label="Pause animation"
                title="Pause"
              >
                ⏸
              </button>
            )}
            <button
              className={styles.ctrlBtn}
              onClick={handleReplay}
              aria-label="Replay animation from start"
              title="Replay"
            >
              ↺
            </button>
          </div>
        )}
      </div>

      <div className={styles.segBody}>{children(playing)}</div>

      {(source || confidence) && (
        <div className={styles.wrapperSource}>
          {confidence && <span className={`${styles.confidenceDot} ${confDotClass}`} />}
          {source && <span>{source}</span>}
          {readingLevel === 'scholar' && sourceDetail && (
            <details className={styles.scholarAccordion}>
              <summary>Source breakdown</summary>
              <div className={styles.scholarContent}>{sourceDetail}</div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
