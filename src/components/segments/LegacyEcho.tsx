import { useEffect, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  legacy: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

const RIPPLES = [0, 1, 2];

export default function LegacyEcho({
  legacy,
  companionName,
  playing,
  reducedMotion,
  color,
}: Props) {
  const [ripplesActive, setRipplesActive] = useState(reducedMotion);
  const [coreVisible, setCoreVisible] = useState(reducedMotion);
  const [textVisible, setTextVisible] = useState(reducedMotion);
  const [attribVisible, setAttribVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setRipplesActive(true);
      setCoreVisible(true);
      setTextVisible(true);
      setAttribVisible(true);
      return;
    }
    setRipplesActive(false);
    setCoreVisible(false);
    setTextVisible(false);
    setAttribVisible(false);

    const ts = [
      window.setTimeout(() => setCoreVisible(true), 200),
      window.setTimeout(() => setRipplesActive(true), 600),
      window.setTimeout(() => setTextVisible(true), 1400),
      window.setTimeout(() => setAttribVisible(true), 2400),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div className={styles.echoPanel}>
      <div className={styles.echoRippleStage} aria-hidden="true">
        {RIPPLES.map(i => (
          <div
            key={i}
            className={`${styles.echoRipple} ${ripplesActive ? styles.echoRippleActive : ''}`}
            style={{
              borderColor: color,
              animationDelay: `${i * 1.4}s`,
            }}
          />
        ))}
        <div
          className={`${styles.echoCore} ${coreVisible ? styles.echoCoreVisible : ''}`}
          style={{
            background: `radial-gradient(circle, ${color}, ${color}33 60%, transparent 100%)`,
          }}
        />
      </div>

      <div className={styles.echoContent}>
        <div
          className={`${styles.echoLabel} ${coreVisible ? styles.echoLabelVisible : ''}`}
          style={{ color }}
        >
          Lasting Echo
        </div>
        <div
          className={`${styles.echoText} ${textVisible ? styles.echoTextVisible : ''}`}
        >
          {legacy}
        </div>
        <div
          className={`${styles.echoAttrib} ${attribVisible ? styles.echoAttribVisible : ''}`}
        >
          <span style={{ color }}>◆</span> The legacy of {companionName}
        </div>
      </div>
    </div>
  );
}
