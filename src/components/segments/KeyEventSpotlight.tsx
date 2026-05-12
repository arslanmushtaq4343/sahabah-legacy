import { useEffect, useMemo, useState } from 'react';
import styles from './segments.module.css';

interface Props {
  keyEvent: string;
  companionName: string;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
  readingLevel?: string;
}

export default function KeyEventSpotlight({
  keyEvent,
  companionName,
  playing,
  reducedMotion,
  color,
  readingLevel,
}: Props) {
  const sentences = useMemo(() => {
    return keyEvent
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean);
  }, [keyEvent]);

  const [stageDim, setStageDim] = useState(reducedMotion);
  const [beamVisible, setBeamVisible] = useState(reducedMotion);
  const [markerVisible, setMarkerVisible] = useState(reducedMotion);
  const [labelVisible, setLabelVisible] = useState(reducedMotion);
  const [revealedCount, setRevealedCount] = useState(reducedMotion ? sentences.length : 0);
  const [stampVisible, setStampVisible] = useState(reducedMotion);

  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setStageDim(true);
      setBeamVisible(true);
      setMarkerVisible(true);
      setLabelVisible(true);
      setRevealedCount(sentences.length);
      setStampVisible(true);
      return;
    }

    setStageDim(false);
    setBeamVisible(false);
    setMarkerVisible(false);
    setLabelVisible(false);
    setRevealedCount(0);
    setStampVisible(false);

    const timeouts: number[] = [];
    timeouts.push(window.setTimeout(() => setStageDim(true), 100));
    timeouts.push(window.setTimeout(() => setBeamVisible(true), 600));
    timeouts.push(window.setTimeout(() => setMarkerVisible(true), 1200));
    timeouts.push(window.setTimeout(() => setLabelVisible(true), 1800));

    const sentenceStart = 2400;
    const sentenceGap = 1100;
    sentences.forEach((_, i) => {
      timeouts.push(
        window.setTimeout(() => setRevealedCount(c => Math.max(c, i + 1)), sentenceStart + i * sentenceGap)
      );
    });
    timeouts.push(
      window.setTimeout(
        () => setStampVisible(true),
        sentenceStart + sentences.length * sentenceGap + 200
      )
    );

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [playing, reducedMotion, sentences]);

  const visibleSentences = sentences.slice(0, revealedCount);
  const labelText = readingLevel === 'child' ? 'A defining moment' : 'The defining moment';

  return (
    <div className={styles.spotlightPanel}>
      <div className={`${styles.spotlightDim} ${stageDim ? styles.spotlightDimActive : ''}`} />

      <div
        className={`${styles.spotlightBeam} ${beamVisible ? styles.spotlightBeamVisible : ''}`}
        style={{ background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${color}33 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      <div
        className={`${styles.spotlightMarker} ${markerVisible ? styles.spotlightMarkerVisible : ''}`}
        style={{ color }}
        aria-hidden="true"
      >
        ✦
      </div>

      <div className={styles.spotlightContent}>
        <div
          className={`${styles.spotlightLabel} ${labelVisible ? styles.spotlightLabelVisible : ''}`}
          style={{ color }}
        >
          {labelText} — <span className={styles.spotlightLabelName}>{companionName}</span>
        </div>

        <div className={styles.spotlightStory}>
          {visibleSentences.map((s, i) => (
            <p key={i} className={styles.spotlightSentence}>
              {i === 0 && (
                <span className={styles.spotlightDropCap} style={{ color }}>
                  {s.charAt(0)}
                </span>
              )}
              {i === 0 ? s.slice(1) : s}
            </p>
          ))}
        </div>
      </div>

      <div
        className={`${styles.spotlightStamp} ${stampVisible ? styles.spotlightStampVisible : ''}`}
        style={{ borderColor: color, color }}
        aria-hidden="true"
      >
        Key Moment
      </div>
    </div>
  );
}
