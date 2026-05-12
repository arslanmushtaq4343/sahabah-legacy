import { useEffect, useMemo, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  caliphate: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

interface ParsedCaliphate {
  duration: string;
  yearStart: number | null;
  yearEnd: number | null;
  description: string;
}

function parseCaliphate(raw: string): ParsedCaliphate {
  const trimmed = raw.trim();
  // Format examples:
  //   "2 years, 3 months, 11 days (632–634 CE). In this brief time..."
  //   "12 years (644–656 CE). Naval victories..."
  const yearMatch = trimmed.match(/\((\d{3,4})\s*[–-]\s*(\d{3,4})\s*CE\)/);
  const yearStart = yearMatch ? parseInt(yearMatch[1], 10) : null;
  const yearEnd = yearMatch ? parseInt(yearMatch[2], 10) : null;

  const parenIdx = trimmed.indexOf('(');
  const duration = parenIdx > 0 ? trimmed.slice(0, parenIdx).trim() : '';

  const closeParenIdx = trimmed.indexOf(')');
  const description =
    closeParenIdx > 0
      ? trimmed
          .slice(closeParenIdx + 1)
          .replace(/^[.\s]+/, '')
          .trim()
      : trimmed;

  return { duration, yearStart, yearEnd, description };
}

export default function CaliphateReignTimeline({
  caliphate,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const parsed = useMemo(() => parseCaliphate(caliphate), [caliphate]);

  const [headerVisible, setHeaderVisible] = useState(reducedMotion);
  const [barProgress, setBarProgress] = useState(reducedMotion ? 1 : 0);
  const [startMarkVisible, setStartMarkVisible] = useState(reducedMotion);
  const [endMarkVisible, setEndMarkVisible] = useState(reducedMotion);
  const [descVisible, setDescVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setHeaderVisible(true);
      setBarProgress(1);
      setStartMarkVisible(true);
      setEndMarkVisible(true);
      setDescVisible(true);
      return;
    }
    setHeaderVisible(false);
    setBarProgress(0);
    setStartMarkVisible(false);
    setEndMarkVisible(false);
    setDescVisible(false);

    const ts: number[] = [];
    ts.push(window.setTimeout(() => setHeaderVisible(true), 200));
    ts.push(window.setTimeout(() => setStartMarkVisible(true), 800));

    // Animate bar progress 0 → 1 over ~2.4s starting at 1000ms
    const start = 1000;
    const dur = 2400;
    const steps = 36;
    for (let i = 1; i <= steps; i++) {
      ts.push(
        window.setTimeout(() => setBarProgress(i / steps), start + (dur * i) / steps)
      );
    }
    ts.push(window.setTimeout(() => setEndMarkVisible(true), start + dur + 200));
    ts.push(window.setTimeout(() => setDescVisible(true), start + dur + 600));

    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  const haveYears = parsed.yearStart !== null && parsed.yearEnd !== null;
  const span = haveYears ? parsed.yearEnd! - parsed.yearStart! : 0;

  return (
    <div className={styles.reignPanel}>
      <div
        className={`${styles.reignHeader} ${headerVisible ? styles.reignHeaderVisible : ''}`}
      >
        <div className={styles.reignTitle} style={{ color }}>
          Caliphate of {companionName}
        </div>
        {parsed.duration && (
          <div className={styles.reignDuration}>{parsed.duration}</div>
        )}
      </div>

      {haveYears && (
        <div className={styles.reignTimeline}>
          <div className={styles.reignBarTrack}>
            <div
              className={styles.reignBarFill}
              style={{
                width: `${barProgress * 100}%`,
                background: `linear-gradient(90deg, ${color}, ${color}80)`,
                boxShadow: `0 0 12px ${color}66`,
              }}
            />
            <div
              className={`${styles.reignMark} ${styles.reignMarkStart} ${startMarkVisible ? styles.reignMarkVisible : ''}`}
              style={{ borderColor: color, background: color }}
            />
            <div
              className={`${styles.reignMark} ${styles.reignMarkEnd} ${endMarkVisible ? styles.reignMarkVisible : ''}`}
              style={{ borderColor: color, background: color }}
            />
          </div>
          <div className={styles.reignAxis}>
            <span
              className={`${styles.reignYear} ${startMarkVisible ? styles.reignYearVisible : ''}`}
              style={{ color }}
            >
              {parsed.yearStart} CE
            </span>
            {span > 1 && (
              <span className={styles.reignSpan}>
                {span} year{span === 1 ? '' : 's'}
              </span>
            )}
            <span
              className={`${styles.reignYear} ${endMarkVisible ? styles.reignYearVisible : ''}`}
              style={{ color }}
            >
              {parsed.yearEnd} CE
            </span>
          </div>
        </div>
      )}

      {parsed.description && (
        <div
          className={`${styles.reignDescription} ${descVisible ? styles.reignDescriptionVisible : ''}`}
        >
          {parsed.description}
        </div>
      )}
    </div>
  );
}
