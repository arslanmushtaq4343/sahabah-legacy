import { useEffect, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  appearance: string;
  nameAr: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function AppearancePortrait({
  appearance,
  nameAr,
  companionName,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const [frameDrawn, setFrameDrawn] = useState(reducedMotion);
  const [ornamentVisible, setOrnamentVisible] = useState(reducedMotion);
  const [nameVisible, setNameVisible] = useState(reducedMotion);
  const [textVisible, setTextVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setFrameDrawn(true);
      setOrnamentVisible(true);
      setNameVisible(true);
      setTextVisible(true);
      return;
    }
    setFrameDrawn(false);
    setOrnamentVisible(false);
    setNameVisible(false);
    setTextVisible(false);

    const ts = [
      window.setTimeout(() => setFrameDrawn(true), 150),
      window.setTimeout(() => setOrnamentVisible(true), 1100),
      window.setTimeout(() => setNameVisible(true), 1600),
      window.setTimeout(() => setTextVisible(true), 2200),
    ];
    return () => ts.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div className={styles.portraitPanel}>
      <svg
        className={styles.portraitFrame}
        viewBox="0 0 320 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="6"
          width="308"
          height="188"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          className={`${styles.portraitFrameRect} ${frameDrawn ? styles.portraitFrameRectDrawn : ''}`}
        />
        <rect
          x="14"
          y="14"
          width="292"
          height="172"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
          opacity="0.5"
          className={`${styles.portraitFrameRectInner} ${frameDrawn ? styles.portraitFrameRectInnerDrawn : ''}`}
        />
      </svg>

      <div
        className={`${styles.portraitOrnament} ${ornamentVisible ? styles.portraitOrnamentVisible : ''}`}
        style={{ color }}
        aria-hidden="true"
      >
        ❋
      </div>

      <div className={styles.portraitContent}>
        {readingLevel !== 'child' && (
          <div
            className={`${styles.portraitName} ${nameVisible ? styles.portraitNameVisible : ''}`}
            style={{ color }}
          >
            {nameAr}
          </div>
        )}
        <div
          className={`${styles.portraitText} ${textVisible ? styles.portraitTextVisible : ''}`}
        >
          {appearance}
        </div>
        <div
          className={`${styles.portraitAttrib} ${textVisible ? styles.portraitAttribVisible : ''}`}
        >
          — As described of {companionName}
        </div>
      </div>
    </div>
  );
}
