import { useEffect, useRef, useState } from 'react';
import { COMPANIONS } from '../../data/companions';
import { MIGRATION_PATHS, CITY_POSITIONS } from '../../data/connectionData';
import styles from './ConnectionsPage.module.css';

const W = 700, H = 440;

const AVAILABLE_RANKS = Object.keys(MIGRATION_PATHS).map(Number).sort((a, b) => a - b);

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function JourneysMap({ forceDark = false }: { forceDark?: boolean }) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const [rank,   setRank  ] = useState(AVAILABLE_RANKS[0]);
  const [step,   setStep  ] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.body.classList.contains('tahajjud')
  );

  const companion = COMPANIONS.find(c => c.rank === rank);
  const path = MIGRATION_PATHS[rank] ?? [];
  const cities = path.map(p => CITY_POSITIONS[p.city]).filter(Boolean);
  const currentStep = Math.min(step, path.length - 1);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setStep(s => {
          if (s >= path.length - 1) { setPlaying(false); return s; }
          return s + 1;
        });
      }, 1200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, path.length]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('tahajjud'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSelect = (r: number) => {
    setRank(r);
    setStep(0);
    setPlaying(false);
  };

  /* Build SVG path string for journey */
  function buildPath(upTo: number) {
    const pts = cities.slice(0, upTo + 1);
    if (pts.length < 2) return '';
    return pts.map((p, i) => {
      const x = p.x * W, y = p.y * H;
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  }

  /* City label overlap map */
  const CITY_LABELS: Record<string, string> = {
    'Mecca': 'مكة',  'Medina': 'المدينة', 'Damascus': 'دمشق',
    "Mada'in": 'المدائن', 'Kufa': 'الكوفة', 'Najaf': 'النجف',
    'Basra': 'البصرة', 'Persia': 'فارس', 'Taif': 'الطائف',
    'Jerusalem': 'القدس', 'Hims': 'حمص', 'Syria': 'الشام',
  };

  const darkMode = forceDark || isDark;

  return (
    <div className={`${styles.journeysWrap} ${darkMode ? styles.journeysWrapDark : ''}`}>
      {/* Companion selector */}
      <div className={`${styles.journeysSelector} ${darkMode ? styles.journeysSelectorDark : ''}`}>
        {AVAILABLE_RANKS.map(r => {
          const c = COMPANIONS.find(x => x.rank === r);
          if (!c) return null;
          return (
            <button
              key={r}
              className={`${styles.journeysPip} ${r === rank ? styles.journeysPipActive : ''}`}
              onClick={() => handleSelect(r)}
              title={c.name}
            >
              <span className={styles.journeysPipAr}>{c.ar.split(' ')[0]}</span>
              <span className={styles.journeysPipName}>{c.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {companion && (
        <div className={`${styles.journeysInfo} ${darkMode ? styles.journeysInfoDark : ''}`}>
          <span className={styles.journeysAr}>{companion.ar}</span>
          <strong className={styles.journeysName}>{companion.name}</strong>
          <span className={styles.journeysTitle}>{companion.title}</span>
        </div>
      )}

      {/* Map SVG */}
      <div className={`${styles.journeysMapWrap} ${darkMode ? styles.journeysMapWrapDark : ''}`}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className={styles.journeysSvg}>
          {/* Background — stylized Middle East map */}
          <rect width={W} height={H} fill={darkMode ? '#0d1b30' : '#f0e8d4'} rx={8} />
          {/* Rough region shading */}
          <ellipse cx={520} cy={250} rx={120} ry={140} fill={darkMode ? '#7aa8d822' : '#e8dcc8'} opacity={.6} /> {/* Arabia */}
          <ellipse cx={420} cy={200} rx={80}  ry={90}  fill={darkMode ? '#7aa8d81c' : '#ddd5c2'} opacity={.5} /> {/* Levant */}
          <ellipse cx={600} cy={200} rx={90}  ry={100} fill={darkMode ? '#7aa8d820' : '#e0d8c8'} opacity={.5} /> {/* Persia */}
          <ellipse cx={300} cy={260} rx={70}  ry={60}  fill={darkMode ? '#7aa8d818' : '#d8d2c0'} opacity={.5} /> {/* Egypt */}

          {/* City dots (background layer) */}
          {Object.entries(CITY_POSITIONS).map(([city, pos]) => (
            <g key={city}>
              <circle cx={pos.x * W} cy={pos.y * H} r={3.5} fill={darkMode ? '#9ec1e655' : '#b8a07040'} stroke={darkMode ? '#9ec1e688' : '#b8a07080'} strokeWidth={.8} />
              <text x={pos.x * W + 5} y={pos.y * H + 3} fontSize={7.5} fill={darkMode ? '#bdd8f3' : '#8a7040'} fontFamily="serif"
                opacity={.7}>{city}</text>
            </g>
          ))}

          {/* Completed journey path */}
          {currentStep >= 1 && (
            <path
              d={buildPath(currentStep)}
              fill="none"
              stroke={darkMode ? '#7aa8d8' : '#b8860b'}
              strokeWidth={2.5}
              strokeDasharray="6 4"
              strokeLinecap="round"
              opacity={.75}
            />
          )}

          {/* Visited city markers */}
          {cities.slice(0, currentStep + 1).map((pos, i) => {
            const isLast = i === currentStep;
            const cityName = path[i]?.city ?? '';
            return (
              <g key={i}>
                {isLast && (
                  <circle cx={pos.x * W} cy={pos.y * H} r={14}
                    fill={darkMode ? '#7aa8d833' : '#b8860b22'} stroke={darkMode ? '#7aa8d8' : '#b8860b'} strokeWidth={1} strokeDasharray="3 2">
                    <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={pos.x * W} cy={pos.y * H} r={isLast ? 7 : 5}
                  fill={isLast ? (darkMode ? '#7aa8d8' : '#b8860b') : (darkMode ? '#7aa8d86e' : '#d4a85070')}
                  stroke={isLast ? (darkMode ? '#d2e5f7' : '#7a5a00') : (darkMode ? '#7aa8d8' : '#b8860b')}
                  strokeWidth={isLast ? 2 : 1} />
                <text x={pos.x * W + 10} y={pos.y * H - 4}
                  fontSize={9} fontWeight={isLast ? '700' : '500'}
                  fill={isLast ? (darkMode ? '#e8f3ff' : '#3a2000') : (darkMode ? '#c8def4' : '#6a5020')}
                  fontFamily="serif">
                  {CITY_LABELS[cityName] || cityName}
                </text>
                <text x={pos.x * W + 10} y={pos.y * H + 8}
                  fontSize={7.5} fill={darkMode ? '#9ec1e6' : '#8a7040'} fontFamily="sans-serif">
                  {path[i]?.yearAH !== undefined
                    ? (typeof path[i].yearAH === 'number' && (path[i].yearAH as number) < 0
                        ? `${Math.abs(path[i].yearAH as number)} BH`
                        : `${path[i].yearAH} AH`)
                    : ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Journey steps */}
      <div className={styles.journeySteps}>
        {path.map((p, i) => (
          <div
            key={i}
            className={`${styles.journeyStep} ${i <= currentStep ? styles.journeyStepVisited : ''} ${i === currentStep ? styles.journeyStepCurrent : ''}`}
            onClick={() => { setPlaying(false); setStep(i); }}
          >
            <div className={styles.journeyStepDot} />
            <div className={styles.journeyStepBody}>
              <span className={styles.journeyStepCity}>{p.city}</span>
              <span className={styles.journeyStepYear}>
                {typeof p.yearAH === 'number' && p.yearAH < 0
                  ? `${Math.abs(p.yearAH)} BH`
                  : `${p.yearAH} AH`}
              </span>
              {i <= currentStep && <p className={styles.journeyStepNote}>{p.note}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.journeysControls}>
        <button
          className={styles.journeysPlayBtn}
          onClick={() => { if (step >= path.length - 1) setStep(0); setPlaying(p => !p); }}
        >
          {playing ? '⏸ Pause' : step >= path.length - 1 ? '↺ Replay' : '▶ Animate Journey'}
        </button>
        <input
          type="range"
          className={styles.journeysSlider}
          min={0} max={Math.max(0, path.length - 1)}
          value={currentStep}
          onChange={e => { setPlaying(false); setStep(parseInt(e.target.value)); }}
        />
      </div>
    </div>
  );
}
