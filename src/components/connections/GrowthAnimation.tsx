import { useEffect, useRef, useState } from 'react';
import { GROWTH_DATA } from '../../data/connectionData';
import styles from './ConnectionsPage.module.css';

const MAX_COUNT = GROWTH_DATA[GROWTH_DATA.length - 1].count;
const DOT_R = 4.5;
const COLS = 60;
const SVG_W = 660;
const SVG_H = 360;

export default function GrowthAnimation() {
  const [step,    setStep   ] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.body.classList.contains('tahajjud')
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = GROWTH_DATA[step];
  const pct = current.count / MAX_COUNT;

  /* animated dot grid */
  const totalDots = 100; // we show 100 dots max; each dot = 1% of max
  const activeDots = Math.round(pct * totalDots);

  const dots = Array.from({ length: totalDots }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const active = i < activeDots;
    return { x: 28 + col * 10, y: 30 + row * 10, active };
  });

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStep(s => {
          if (s >= GROWTH_DATA.length - 1) { setPlaying(false); return s; }
          return s + 1;
        });
      }, 900);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('tahajjud'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaying(false);
    setStep(parseInt(e.target.value));
  };

  return (
    <div className={styles.growthWrap}>
      <div className={styles.growthHeader}>
        <div>
          <p className={styles.growthEyebrow}>Community Growth</p>
          <h2 className={styles.growthTitle}>From 1 to 100,000</h2>
          <p className={styles.growthSub}>The expansion of the Muslim community — 610 to 633 CE</p>
        </div>
        <div className={styles.growthCounter}>
          <span className={styles.growthNum}>{current.count.toLocaleString()}</span>
          <span className={styles.growthLabel}>Muslims</span>
          <span className={styles.growthYear}>{current.yearCE} CE / {current.yearAH < 0 ? `${Math.abs(current.yearAH)} BH` : `${current.yearAH} AH`}</span>
        </div>
      </div>

      {/* Dot grid visualization */}
      <div className={styles.growthVizWrap}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className={styles.growthSvg}>
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x} cy={d.y} r={DOT_R}
              fill={d.active ? (isDark ? '#7aa8d8' : '#b8860b') : (isDark ? '#9ec1e62a' : '#2a1a0840')}
              style={{
                transition: 'fill .4s ease',
                opacity: d.active ? 1 : 0.35,
              }}
            />
          ))}
          {/* Progress bar */}
          <rect x={28} y={SVG_H - 22} width={SVG_W - 56} height={6} rx={3} fill={isDark ? '#9ec1e626' : '#2a1a0820'} />
          <rect x={28} y={SVG_H - 22} width={(SVG_W - 56) * pct} height={6} rx={3}
            fill={isDark ? '#7aa8d8' : '#b8860b'} style={{ transition: 'width .5s ease' }} />
          <text x={28} y={SVG_H - 8} fontSize={9} fill={isDark ? '#bdd8f3' : '#8a6a30'} fontFamily="serif" letterSpacing=".08em">
            {(pct * 100).toFixed(1)}% of peak community size
          </text>
        </svg>
      </div>

      {/* Event note */}
      <div className={styles.growthNote}>
        <span className={styles.growthNoteDot} />
        {current.note}
      </div>

      {/* Timeline slider */}
      <div className={styles.growthControls}>
        <button
          className={`${styles.growthPlayBtn} ${playing ? styles.growthPause : ''}`}
          onClick={() => { if (step >= GROWTH_DATA.length - 1) setStep(0); setPlaying(p => !p); }}
        >
          {playing ? '⏸ Pause' : step >= GROWTH_DATA.length - 1 ? '↺ Replay' : '▶ Play'}
        </button>

        <input
          type="range"
          className={styles.growthSlider}
          min={0} max={GROWTH_DATA.length - 1}
          value={step}
          onChange={handleSlider}
        />

        <div className={styles.growthYears}>
          {GROWTH_DATA.map((g, i) => (
            <button
              key={i}
              className={`${styles.growthYearPip} ${i === step ? styles.growthYearActive : ''}`}
              onClick={() => { setPlaying(false); setStep(i); }}
              title={`${g.yearCE} CE — ${g.count.toLocaleString()}`}
            />
          ))}
        </div>
      </div>

      {/* Timeline table */}
      <div className={styles.growthTable}>
        {GROWTH_DATA.map((g, i) => (
          <div
            key={i}
            className={`${styles.growthRow} ${i === step ? styles.growthRowActive : ''}`}
            onClick={() => { setPlaying(false); setStep(i); }}
          >
            <span className={styles.growthRowYear}>
              {g.yearCE} CE {g.yearAH < 0 ? `(${Math.abs(g.yearAH)} BH)` : `(${g.yearAH} AH)`}
            </span>
            <span className={styles.growthRowCount}>{g.count.toLocaleString()}</span>
            <span className={styles.growthRowNote}>{g.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
