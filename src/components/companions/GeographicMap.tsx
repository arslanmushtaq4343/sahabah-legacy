import { useMemo, useState, useEffect, useRef } from 'react';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { normalizeTransliteration } from '../../data/transliteration';
import type { Companion, CompanionCategory } from '../../types';
import { parseYear } from './cardTheme';
import { getCompanionTribe } from './insightMetrics';
import { resolvePlace, geoGroupColor, type GeoPlace } from './geoMap';
import styles from './CompanionsPage.module.css';

type ViewMode = 'dots' | 'heatmap' | 'arrows' | 'timeline';
type GroupFilter = 'all' | 'quraysh' | 'ansar' | 'yemeni' | 'non-arab' | 'other-arab';

const W = 800;
const H = 600;

const TL_MIN_YEAR = 580;
const TL_MAX_YEAR = 700;

const CATEGORY_OPTIONS: { value: CompanionCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'caliph', label: 'Caliphs' },
  { value: 'warrior', label: 'Warriors' },
  { value: 'general', label: 'Generals' },
  { value: 'scholar', label: 'Scholars' },
  { value: 'narrator', label: 'Narrators' },
  { value: 'wife', label: 'Wives' },
  { value: 'martyr', label: 'Martyrs' },
  { value: 'other', label: 'Others' },
];

const GROUP_OPTIONS: { value: GroupFilter; label: string }[] = [
  { value: 'all', label: 'All Groups' },
  { value: 'quraysh', label: 'Quraysh' },
  { value: 'ansar', label: 'Ansar' },
  { value: 'yemeni', label: 'Yemeni' },
  { value: 'non-arab', label: 'Non-Arab' },
  { value: 'other-arab', label: 'Other Arab' },
];

function getGeoGroup(companion: Companion): GroupFilter {
  const tribe = getCompanionTribe(companion).toLowerCase();
  if (tribe.includes('khazraj') || tribe.includes('aws') || tribe.includes('ansar')) return 'ansar';
  if (
    tribe.includes('banu') ||
    tribe.includes('quraysh') ||
    tribe.includes('taym') ||
    tribe.includes('hashim') ||
    tribe.includes('umayya') ||
    tribe.includes('makhzum') ||
    tribe.includes('zuhra')
  ) {
    return 'quraysh';
  }
  if (tribe.includes('yemen') || tribe.includes('daws') || tribe.includes('kinda')) return 'yemeni';
  if (
    tribe.includes('abyssinian') ||
    tribe.includes('persian') ||
    tribe.includes('mawali') ||
    tribe.includes('freed') ||
    tribe.includes('roman')
  ) {
    return 'non-arab';
  }
  return 'other-arab';
}

interface ResolvedCompanion {
  companion: Companion;
  origin: GeoPlace;
  burial: GeoPlace | null;
  cat: CompanionCategory;
  group: string;
  color: string;
  bornYear: number | null;
  deathYear: number | null;
}

const RESOLVED: ResolvedCompanion[] = COMPANIONS.map(c => {
  const origin = resolvePlace(c.place);
  if (!origin) return null;
  const burial = resolvePlace((c as any).burial as string | undefined);
  return {
    companion: c,
    origin,
    burial: burial && burial.id !== origin.id ? burial : null,
    cat: c.cat,
    group: getGeoGroup(c),
    color: CAT_COLORS[c.cat],
    bornYear: parseYear(c.born),
    deathYear: parseYear(c.death),
  };
}).filter((x): x is ResolvedCompanion => x !== null);

const RESOLVED_WITH_DATES = RESOLVED.filter(
  r => r.bornYear != null && r.deathYear != null && r.deathYear > r.bornYear
);

interface Props {
  onSelect: (c: Companion) => void;
}

export default function GeographicMap({ onSelect }: Props) {
  const [mode, setMode] = useState<ViewMode>('dots');
  const [catFilter, setCatFilter] = useState<CompanionCategory | 'all'>('all');
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const [hovered, setHovered] = useState<{ x: number; y: number; label: string } | null>(null);

  /* timeline state */
  const [year, setYear] = useState<number>(622);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(2); // years per second
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    if (mode !== 'timeline' || !playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    lastTickRef.current = performance.now();
    const step = (now: number) => {
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      setYear(y => {
        const next = y + dt * speed;
        if (next >= TL_MAX_YEAR) {
          setPlaying(false);
          return TL_MAX_YEAR;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mode, playing, speed]);

  const filtered = useMemo(() => {
    return RESOLVED.filter(r => {
      const matchCat = catFilter === 'all' || r.cat === catFilter;
      const matchGroup = groupFilter === 'all' || r.group === groupFilter;
      return matchCat && matchGroup;
    });
  }, [catFilter, groupFilter]);

  const placeCounts = useMemo(() => {
    const counts = new Map<string, { place: GeoPlace; count: number; samples: Companion[] }>();
    filtered.forEach(r => {
      const cur = counts.get(r.origin.id);
      if (cur) {
        cur.count += 1;
        if (cur.samples.length < 6) cur.samples.push(r.companion);
      } else {
        counts.set(r.origin.id, { place: r.origin, count: 1, samples: [r.companion] });
      }
    });
    return [...counts.values()];
  }, [filtered]);

  const arrowPairs = useMemo(() => {
    if (mode !== 'arrows') return [];
    const pairs = new Map<
      string,
      { from: GeoPlace; to: GeoPlace; count: number; samples: Companion[] }
    >();
    filtered.forEach(r => {
      if (!r.burial) return;
      const k = `${r.origin.id}->${r.burial.id}`;
      const cur = pairs.get(k);
      if (cur) {
        cur.count += 1;
        if (cur.samples.length < 5) cur.samples.push(r.companion);
      } else {
        pairs.set(k, { from: r.origin, to: r.burial, count: 1, samples: [r.companion] });
      }
    });
    return [...pairs.values()].sort((a, b) => a.count - b.count);
  }, [filtered, mode]);

  const maxCount = placeCounts.reduce((m, p) => Math.max(m, p.count), 1);
  const maxArrow = arrowPairs.reduce((m, p) => Math.max(m, p.count), 1);

  /* Timeline: position every (filtered, dated) companion at current year */
  const timelineDots = useMemo(() => {
    if (mode !== 'timeline') return [];
    const filterCat = (r: ResolvedCompanion) => catFilter === 'all' || r.cat === catFilter;
    const filterGroup = (r: ResolvedCompanion) => groupFilter === 'all' || r.group === groupFilter;
    return RESOLVED_WITH_DATES.filter(r => filterCat(r) && filterGroup(r)).map(r => {
      const b = r.bornYear!;
      const d = r.deathYear!;
      let x = r.origin.x;
      let y = r.origin.y;
      let opacity = 0;
      let phase: 'unborn' | 'alive' | 'dead' = 'unborn';
      if (year < b) {
        opacity = 0;
        phase = 'unborn';
      } else if (year > d) {
        if (r.burial) {
          x = r.burial.x;
          y = r.burial.y;
        }
        opacity = 0.22;
        phase = 'dead';
      } else {
        phase = 'alive';
        opacity = 0.9;
        if (r.burial) {
          const t = (year - b) / Math.max(1, d - b);
          x = r.origin.x + (r.burial.x - r.origin.x) * t;
          y = r.origin.y + (r.burial.y - r.origin.y) * t;
        }
      }
      return { r, x, y, opacity, phase };
    });
  }, [mode, year, catFilter, groupFilter]);

  const aliveCount = timelineDots.filter(d => d.phase === 'alive').length;

  return (
    <div className={styles.insightsChartWrap}>
      <p className={styles.insightsHint}>
        Birthplaces of the Companions across the Arabian Peninsula and beyond. Switch view modes,
        filter by category and tribal group, click any marker for the profile.
      </p>

      <div className={styles.geoControls}>
        <div className={styles.geoModeRow} role="tablist" aria-label="Map view mode">
          {(
            [
              ['dots', 'Dots'],
              ['heatmap', 'Density'],
              ['arrows', 'Migration'],
              ['timeline', 'Timeline ▸'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id ? 'true' : 'false'}
              className={`${styles.geoModeBtn} ${mode === id ? styles.geoModeActive : ''}`}
              onClick={() => setMode(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.geoFilterRow}>
          <label className={styles.geoFilterLabel}>
            Category
            <select
              className={styles.geoSelect}
              value={catFilter}
              onChange={e => setCatFilter(e.target.value as CompanionCategory | 'all')}
            >
              {CATEGORY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.geoFilterLabel}>
            Tribal group
            <select
              className={styles.geoSelect}
              value={groupFilter}
              onChange={e => setGroupFilter(e.target.value as GroupFilter)}
            >
              {GROUP_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <span className={styles.geoCount}>
            {filtered.length} of {RESOLVED.length} located
          </span>
        </div>
      </div>

      {mode === 'timeline' && (
        <div className={styles.geoTimeline} aria-label="Year timeline">
          <button
            type="button"
            className={`${styles.geoTimelineBtn} ${playing ? styles.geoTimelineBtnPlaying : ''}`}
            onClick={() => {
              if (year >= TL_MAX_YEAR) setYear(TL_MIN_YEAR);
              setPlaying(p => !p);
            }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button
            type="button"
            className={styles.geoTimelineBtn}
            onClick={() => {
              setPlaying(false);
              setYear(TL_MIN_YEAR);
            }}
            aria-label="Reset to start"
          >
            ⟲
          </button>

          <div className={styles.geoTimelineYear}>
            <span className={styles.geoTimelineYearNum}>{Math.round(year)}</span>
            <span className={styles.geoTimelineYearLbl}>CE</span>
          </div>

          <input
            type="range"
            min={TL_MIN_YEAR}
            max={TL_MAX_YEAR}
            step={1}
            value={Math.round(year)}
            onChange={e => {
              setPlaying(false);
              setYear(Number(e.target.value));
            }}
            className={styles.geoTimelineSlider}
            aria-label="Year"
          />

          <label className={styles.geoTimelineSpeedLbl}>
            Speed
            <select
              className={styles.geoSelect}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5×</option>
              <option value={1}>1×</option>
              <option value={2}>2×</option>
              <option value={5}>5×</option>
              <option value={10}>10×</option>
            </select>
          </label>

          <span className={styles.geoTimelineAlive}>
            <strong>{aliveCount}</strong> alive
          </span>
        </div>
      )}

      <div className={styles.geoMapWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.geoSvg}
          role="img"
          aria-label="Arabian Peninsula map"
        >
          <defs>
            <radialGradient id="geoSea" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#0f1f2e" />
              <stop offset="100%" stopColor="#08111c" />
            </radialGradient>
            <linearGradient id="geoLand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3a2810" />
              <stop offset="100%" stopColor="#1f1608" />
            </linearGradient>
            <marker
              id="geoArrowHead"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#d4a820" opacity="0.85" />
            </marker>
          </defs>

          <rect width={W} height={H} fill="url(#geoSea)" />

          {/* Stylized Arabian Peninsula outline */}
          <path
            d={`
              M 180 80
              C 200 60, 250 50, 290 70
              C 340 70, 360 90, 380 80
              C 420 90, 470 110, 490 140
              C 520 150, 560 160, 600 140
              C 640 130, 670 150, 690 200
              C 700 250, 690 300, 660 350
              C 640 400, 620 430, 580 450
              C 540 470, 500 480, 460 500
              C 420 520, 380 540, 340 560
              C 300 580, 270 570, 250 540
              C 230 510, 220 470, 200 430
              C 180 380, 170 320, 165 260
              C 160 200, 165 130, 180 80 Z
            `}
            fill="url(#geoLand)"
            stroke="#d4a82066"
            strokeWidth="1.5"
          />

          {/* Africa hint (Abyssinia) */}
          <path
            d="M 30 480 C 40 460, 70 450, 110 470 C 130 490, 140 530, 130 570 C 110 590, 70 590, 50 570 C 30 540, 25 510, 30 480 Z"
            fill="url(#geoLand)"
            stroke="#d4a82044"
            strokeWidth="1"
          />

          {/* Persia / Iraq hint */}
          <path
            d="M 380 30 C 450 20, 550 25, 650 50 C 700 70, 720 100, 700 130 C 660 140, 600 130, 540 120 C 480 115, 420 110, 380 90 Z"
            fill="url(#geoLand)"
            stroke="#d4a82044"
            strokeWidth="1"
          />

          {/* Sea labels */}
          <text
            x={130}
            y={300}
            fill="#d4a82033"
            fontSize={11}
            fontStyle="italic"
            fontFamily="serif"
          >
            Red Sea
          </text>
          <text
            x={620}
            y={250}
            fill="#d4a82033"
            fontSize={11}
            fontStyle="italic"
            fontFamily="serif"
          >
            Persian Gulf
          </text>
          <text
            x={400}
            y={580}
            fill="#d4a82033"
            fontSize={10}
            fontStyle="italic"
            fontFamily="serif"
          >
            Arabian Sea
          </text>

          {/* Migration arrows (rendered behind dots) */}
          {mode === 'arrows' &&
            arrowPairs.map((p, i) => {
              const dx = p.to.x - p.from.x;
              const dy = p.to.y - p.from.y;
              const cx = (p.from.x + p.to.x) / 2 + dy * 0.18;
              const cy = (p.from.y + p.to.y) / 2 - dx * 0.18;
              const width = 0.8 + (p.count / maxArrow) * 3.6;
              const opacity = 0.35 + (p.count / maxArrow) * 0.55;
              return (
                <path
                  key={i}
                  d={`M ${p.from.x} ${p.from.y} Q ${cx} ${cy} ${p.to.x} ${p.to.y}`}
                  fill="none"
                  stroke="#d4a820"
                  strokeWidth={width}
                  strokeOpacity={opacity}
                  markerEnd="url(#geoArrowHead)"
                  onMouseEnter={() =>
                    setHovered({
                      x: cx,
                      y: cy,
                      label: `${p.from.label} → ${p.to.label} · ${p.count} companion${p.count === 1 ? '' : 's'}`,
                    })
                  }
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'help' }}
                />
              );
            })}

          {/* Heatmap circles (sized by count) */}
          {mode === 'heatmap' &&
            placeCounts.map(p => {
              const r = 8 + (p.count / maxCount) * 32;
              const color = geoGroupColor(p.place.group);
              return (
                <g
                  key={p.place.id}
                  onMouseEnter={() =>
                    setHovered({
                      x: p.place.x,
                      y: p.place.y - r - 6,
                      label: `${p.place.label} · ${p.count} companion${p.count === 1 ? '' : 's'}`,
                    })
                  }
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => p.samples[0] && onSelect(p.samples[0])}
                >
                  <circle
                    cx={p.place.x}
                    cy={p.place.y}
                    r={r}
                    fill={color}
                    fillOpacity={0.18}
                    stroke={color}
                    strokeOpacity={0.55}
                    strokeWidth={1.2}
                  />
                  <circle
                    cx={p.place.x}
                    cy={p.place.y}
                    r={Math.min(6, r / 3)}
                    fill={color}
                    fillOpacity={0.85}
                  />
                  <text
                    x={p.place.x}
                    y={p.place.y + r + 12}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#d4a820cc"
                  >
                    {p.place.label} · {p.count}
                  </text>
                </g>
              );
            })}

          {/* Dots view */}
          {mode === 'dots' &&
            (() => {
              const out: JSX.Element[] = [];
              placeCounts.forEach(p => {
                const ringColor = geoGroupColor(p.place.group);
                out.push(
                  <circle
                    key={`ring-${p.place.id}`}
                    cx={p.place.x}
                    cy={p.place.y}
                    r={Math.min(28, 6 + p.count * 1.4)}
                    fill="none"
                    stroke={ringColor}
                    strokeOpacity={0.18}
                    strokeWidth={1}
                  />
                );
                p.samples.forEach((c, i) => {
                  const ang = (i / Math.max(p.count, 1)) * Math.PI * 2;
                  const offset = p.count > 1 ? 8 + Math.min(p.count, 6) * 1.2 : 0;
                  const cx = p.place.x + Math.cos(ang) * offset;
                  const cy = p.place.y + Math.sin(ang) * offset;
                  out.push(
                    <circle
                      key={`dot-${c.rank}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={CAT_COLORS[c.cat]}
                      fillOpacity={0.85}
                      stroke="#08111c"
                      strokeWidth={1}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() =>
                        setHovered({
                          x: cx,
                          y: cy - 12,
                          label: `#${c.rank} ${normalizeTransliteration(c.name)} — ${p.place.label}`,
                        })
                      }
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => onSelect(c)}
                    />
                  );
                });
                out.push(
                  <text
                    key={`lbl-${p.place.id}`}
                    x={p.place.x}
                    y={p.place.y + 22}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#d4a820aa"
                    pointerEvents="none"
                  >
                    {p.place.label}
                  </text>
                );
              });
              return out;
            })()}

          {/* Timeline view: every dated companion at their interpolated position */}
          {mode === 'timeline' &&
            timelineDots.map(({ r, x, y, opacity, phase }) => (
              <circle
                key={r.companion.rank}
                cx={x}
                cy={y}
                r={phase === 'alive' ? 4.5 : 3.5}
                fill={phase === 'dead' ? '#9c8765' : r.color}
                fillOpacity={opacity}
                stroke="#08111c"
                strokeWidth={0.8}
                style={{
                  cursor: opacity > 0 ? 'pointer' : 'default',
                  transition: 'cx 0.18s linear, cy 0.18s linear, fill-opacity 0.25s',
                }}
                onMouseEnter={() =>
                  opacity > 0 &&
                  setHovered({
                    x,
                    y: y - 12,
                    label: `#${r.companion.rank} ${normalizeTransliteration(r.companion.name)} · ${phase === 'dead' ? 'd. ' + r.deathYear : phase === 'alive' ? r.bornYear + '–' + r.deathYear : 'unborn'}`,
                  })
                }
                onMouseLeave={() => setHovered(null)}
                onClick={() => opacity > 0 && onSelect(r.companion)}
              />
            ))}

          {/* Year banner overlay (timeline mode) */}
          {mode === 'timeline' && (
            <g pointerEvents="none">
              <text
                x={W - 16}
                y={28}
                textAnchor="end"
                fontSize={20}
                fontWeight={700}
                fill="#d4a820cc"
                fontFamily="serif"
              >
                {Math.round(year)} CE
              </text>
              {Math.round(year) === 622 && (
                <text
                  x={W - 16}
                  y={48}
                  textAnchor="end"
                  fontSize={11}
                  fill="#d4a820aa"
                  fontStyle="italic"
                >
                  Hijra to Medina
                </text>
              )}
              {Math.round(year) === 632 && (
                <text
                  x={W - 16}
                  y={48}
                  textAnchor="end"
                  fontSize={11}
                  fill="#d4a820aa"
                  fontStyle="italic"
                >
                  Death of the Prophet ﷺ
                </text>
              )}
              {Math.round(year) === 656 && (
                <text
                  x={W - 16}
                  y={48}
                  textAnchor="end"
                  fontSize={11}
                  fill="#d4a820aa"
                  fontStyle="italic"
                >
                  First Fitna begins
                </text>
              )}
              {Math.round(year) === 661 && (
                <text
                  x={W - 16}
                  y={48}
                  textAnchor="end"
                  fontSize={11}
                  fill="#d4a820aa"
                  fontStyle="italic"
                >
                  Umayyad Caliphate begins
                </text>
              )}
            </g>
          )}

          {/* Hover tooltip */}
          {hovered && (
            <g pointerEvents="none">
              <rect
                x={Math.min(W - 220, Math.max(0, hovered.x - 110))}
                y={Math.max(0, hovered.y - 28)}
                width={Math.min(220, Math.max(120, hovered.label.length * 6.4))}
                height={20}
                rx={4}
                fill="#1a1208"
                stroke="#d4a82077"
              />
              <text
                x={Math.min(W - 110, Math.max(110, hovered.x))}
                y={Math.max(14, hovered.y - 14)}
                textAnchor="middle"
                fontSize={11}
                fill="#faf6ee"
              >
                {hovered.label}
              </text>
            </g>
          )}
        </svg>

        <div className={styles.geoLegend}>
          <span className={styles.geoLegTitle}>Region:</span>
          {(
            [
              'hijaz',
              'najd',
              'yemen',
              'gulf',
              'levant',
              'iraq',
              'persia',
              'egypt',
              'africa',
            ] as const
          ).map(g => (
            <span key={g} className={styles.geoLegItem}>
              <span className={styles.geoLegSwatch} style={{ background: geoGroupColor(g) }} />
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
