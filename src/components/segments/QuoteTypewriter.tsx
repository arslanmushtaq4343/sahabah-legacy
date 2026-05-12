import { useEffect, useRef, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  quoteAr: string;
  quoteEn: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function QuoteTypewriter({
  quoteAr,
  quoteEn,
  companionName,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [arShown, setArShown] = useState(reducedMotion ? quoteAr.length : 0);
  const [enShown, setEnShown] = useState(reducedMotion ? quoteEn.length : 0);
  const [cursorAr, setCursorAr] = useState(!reducedMotion);
  const [cursorEn, setCursorEn] = useState(false);
  const [nameVisible, setNameVisible] = useState(reducedMotion);
  const [glowActive, setGlowActive] = useState(reducedMotion);
  const rafAr = useRef<number>(0);
  const rafEn = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setArShown(quoteAr.length);
      setEnShown(quoteEn.length);
      setNameVisible(true);
      setGlowActive(true);
      return;
    }

    setArShown(0);
    setEnShown(0);
    setNameVisible(false);
    setGlowActive(false);
    setCursorAr(true);
    setCursorEn(false);

    // Type Arabic
    let arIdx = 0;
    const arSpeed = Math.max(40, Math.min(100, 2200 / quoteAr.length));
    const typeAr = () => {
      arIdx++;
      setArShown(arIdx);
      if (arIdx < quoteAr.length) {
        rafAr.current = window.setTimeout(typeAr, arSpeed);
      } else {
        setCursorAr(false);
        setGlowActive(true);
        // Start English after pause
        window.setTimeout(() => {
          setCursorEn(true);
          let enIdx = 0;
          const enSpeed = Math.max(25, Math.min(60, 2000 / quoteEn.length));
          const typeEn = () => {
            enIdx++;
            setEnShown(enIdx);
            if (enIdx < quoteEn.length) {
              rafEn.current = window.setTimeout(typeEn, enSpeed);
            } else {
              setCursorEn(false);
              setNameVisible(true);
            }
          };
          typeEn();
        }, 500);
      }
    };
    window.setTimeout(typeAr, 400);
    return () => {
      clearTimeout(rafAr.current);
      clearTimeout(rafEn.current);
    };
  }, [playing, reducedMotion, quoteAr, quoteEn]);

  const displayAr = quoteAr.slice(0, arShown);
  const displayEn = quoteEn.slice(0, enShown);

  return (
    <div className={styles.typeWrap}>
      {/* Decorative open-quote mark */}
      <div className={styles.typeQuoteMark} style={{ color }}>
        ❝
      </div>

      {/* Arabic quote */}
      <div
        className={`${styles.typeAr} ${glowActive ? styles.typeArGlow : ''}`}
        style={{ '--glow-color': color } as React.CSSProperties}
      >
        {displayAr}
        {cursorAr && <span className={styles.typeCursor} style={{ background: color }} />}
      </div>

      {/* English translation */}
      {readingLevel !== 'child' && (
        <div className={styles.typeEn}>
          {displayEn}
          {cursorEn && <span className={styles.typeCursor} style={{ background: color }} />}
        </div>
      )}

      {/* Companion attribution */}
      <div
        className={styles.typeAttrib}
        style={{
          opacity: nameVisible ? 1 : 0,
          transform: `translateY(${nameVisible ? 0 : 6}px)`,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span style={{ color }}>— </span>
        <span className={styles.typeAttribName}>{companionName}</span>
      </div>

      {/* Closing quote */}
      <div className={styles.typeQuoteMarkClose} style={{ color }}>
        ❞
      </div>
    </div>
  );
}
