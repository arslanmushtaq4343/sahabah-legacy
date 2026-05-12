import { useEffect, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  link: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function BondWithProphet({
  link,
  companionName,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [prophetVisible, setProphetVisible] = useState(reducedMotion);
  const [companionVisible, setCompanionVisible] = useState(reducedMotion);
  const [bondDrawn, setBondDrawn] = useState(reducedMotion);
  const [pulseActive, setPulseActive] = useState(reducedMotion);
  const [textVisible, setTextVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setProphetVisible(true);
      setCompanionVisible(true);
      setBondDrawn(true);
      setPulseActive(true);
      setTextVisible(true);
      return;
    }
    setProphetVisible(false);
    setCompanionVisible(false);
    setBondDrawn(false);
    setPulseActive(false);
    setTextVisible(false);

    const ts = [
      window.setTimeout(() => setProphetVisible(true), 200),
      window.setTimeout(() => setCompanionVisible(true), 700),
      window.setTimeout(() => setBondDrawn(true), 1200),
      window.setTimeout(() => setPulseActive(true), 2200),
      window.setTimeout(() => setTextVisible(true), 2400),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div className={styles.bondPanel}>
      <div className={styles.bondNodes}>
        <div
          className={`${styles.bondNode} ${styles.bondProphet} ${prophetVisible ? styles.bondNodeVisible : ''}`}
          style={{ borderColor: color }}
        >
          <div className={styles.bondGlyph} style={{ color }}>
            ﷺ
          </div>
          {readingLevel !== 'child' && (
            <div className={styles.bondNodeLabel}>The Messenger of Allah</div>
          )}
        </div>

        <svg
          className={styles.bondSvg}
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bond-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M 4 30 Q 50 6 96 30"
            fill="none"
            stroke="url(#bond-grad)"
            strokeWidth="1.4"
            className={`${styles.bondPath} ${bondDrawn ? styles.bondPathDrawn : ''}`}
          />
          <path
            d="M 4 30 Q 50 54 96 30"
            fill="none"
            stroke="url(#bond-grad)"
            strokeWidth="1.4"
            opacity="0.5"
            className={`${styles.bondPath} ${bondDrawn ? styles.bondPathDrawn : ''}`}
          />
          <circle
            cx="50"
            cy="30"
            r="3"
            fill={color}
            className={`${styles.bondHeart} ${pulseActive ? styles.bondHeartPulse : ''}`}
          />
        </svg>

        <div
          className={`${styles.bondNode} ${styles.bondCompanion} ${companionVisible ? styles.bondNodeVisible : ''}`}
          style={{ borderColor: color, background: `${color}10` }}
        >
          <div className={styles.bondCompanionName} style={{ color }}>
            {companionName}
          </div>
          <div className={styles.bondNodeLabel}>Companion</div>
        </div>
      </div>

      <div
        className={`${styles.bondText} ${textVisible ? styles.bondTextVisible : ''}`}
      >
        {link}
      </div>
    </div>
  );
}
