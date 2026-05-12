import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import * as d3 from 'd3';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import {
  FAMILY_EDGES,
  TRADE_EDGES,
  IKHTILAF_EDGES,
  BIRTH_AH,
  DEATH_AH,
  KEY_EVENTS,
  CITY_POSITIONS,
  COMPANION_CITY,
  WEALTH_LEVELS,
  COMPARISON_DIMS,
  TEACHER_STUDENT_EDGES,
} from '../../data/connectionData';
import { TABAQAT_MAP, FORMER_ENEMIES } from '../../data/companionExtras';
import { SUNNAH_TREE_NODES, CONVERSION_NODES, HIJRA_STOPS } from '../../data/connectionData2';
import { COMPANION_LETTERS, PEER_TESTIMONIES, C2C_NARRATIONS } from '../../data/connectionsExtra';
import { normalizeTransliteration } from '../../data/transliteration';
import { useLanguage } from '../../context/LanguageContext';
import { buildGraphModel, validateConnectionEdges } from './connectionsGraphModel';
import { connectionsReducer, INITIAL_CONNECTIONS_STATE } from './connectionsState';
import {
  computeTopConnected,
  filterCompanionsByBranch,
  filterCompanionsByEra,
} from './connectionsSelectors';
import { createSavedView, readSavedViews, writeSavedViews } from './connectionsSavedViews';
import { exportCompanionsCsv, exportSvgAsPng } from './connectionsExport';
import {
  parseConnectionsStateFromSearch,
  serializeConnectionsStateToSearch,
} from './connectionsUrlState';
import type { GraphLayer, GraphTab, GraphView, SavedConnectionsView } from './connectionsTypes';
/* Tab sub-components — lazy loaded so they don't bloat the initial D3 chunk */
const GrowthAnimation = lazy(() => import('./GrowthAnimation'));
const JourneysMap = lazy(() => import('./JourneysMap'));
import { NetworkAccessibleTable } from './NetworkAccessibleTable';
import { PageHeader } from '../layout/PageHeader';
import styles from './ConnectionsPage.module.css';
import shellStyles from './ConnectionsShell.module.css';
import sidebarStyles from './ConnectionsSidebar.module.css';
import tabsStyles from './ConnectionsTabs.module.css';
import graphStyles from './ConnectionsGraph.module.css';

/* ─── Branch definitions ─────────────────────────────────── */
/* Branch / layer / era / filter configs.
   Hex values are desaturated ~30% from the original palette so the six
   branches read as a quiet earthy family on parchment instead of six
   competing saturated chips. */
const BRANCHES = [
  { id: 'family', label: 'Ahl al-Bayt', color: '#a07f2c', types: ['family'] },
  { id: 'wives', label: 'Mothers of Believers', color: '#813434', types: ['wife'] },
  { id: 'comp', label: 'Close Companions', color: '#2a4570', types: ['companion'] },
  {
    id: 'warrior',
    label: 'Warriors & Generals',
    color: '#7a4318',
    types: ['warrior', 'general', 'martyr'],
  },
  {
    id: 'scholar',
    label: 'Scholars & Narrators',
    color: '#3e5c84',
    types: ['scholar', 'narrator'],
  },
  {
    id: 'convert',
    label: 'Converts & Others',
    color: '#2a493d',
    types: ['convert', 'other', 'caliph'],
  },
];

const SIDEBAR_FILTERS = [
  { id: 'all', label: 'All Branches', dot: 'linear-gradient(135deg,#0f6f5c,#0a5547)' },
  { id: 'family', label: 'Ahl al-Bayt', dot: '#a07f2c' },
  { id: 'wives', label: 'Mothers of Believers', dot: '#813434' },
  { id: 'comp', label: 'Close Companions', dot: '#2a4570' },
  { id: 'warrior', label: 'Warriors & Generals', dot: '#7a4318' },
  { id: 'scholar', label: 'Scholars & Narrators', dot: '#3e5c84' },
  { id: 'convert', label: 'Converts & Others', dot: '#2a493d' },
];

const ERA_CONFIG = [
  { id: 'all', label: 'All Time', icon: '', desc: `All ${COMPANIONS.length} companions` },
  { id: 'early', label: 'Pre-Hijrah', icon: '', desc: 'Earliest converts — Mecca' },
  { id: 'middle', label: 'Hijrah Era', icon: '', desc: 'Migration & Medina years' },
  { id: 'late', label: 'Conquest Era', icon: '', desc: 'Post-Hudaybiyyah converts' },
];

const LAYER_CONFIG: { id: GraphLayer; label: string; icon: string; color: string; desc: string }[] =
  [
    {
      id: 'scholarly',
      label: 'Scholarly Links',
      icon: '',
      color: '#2a4570',
      desc: 'Default D3 network — shared teaching/narration connections',
    },
    {
      id: 'family',
      label: 'Blood & Marriage',
      icon: '',
      color: '#a07f2c',
      desc: 'Family ties, blood relations, and marriage connections',
    },
    {
      id: 'trade',
      label: 'Trade Network',
      icon: '',
      color: '#2a5a3a',
      desc: 'Commercial relationships; node size shows wealth level',
    },
    {
      id: 'ikhtilaf',
      label: 'Disagreements',
      icon: '',
      color: '#8b3a3a',
      desc: 'Scholarly and political ikhtilaf — opposing opinions',
    },
    {
      id: 'teaching',
      label: 'Ilm Transmission',
      icon: '',
      color: '#4a3070',
      desc: "Companion → Tabi'i direct teaching chains — how knowledge spread",
    },
  ];

function isTahajjudHour() {
  const h = new Date().getHours();
  return h >= 0 && h < 4;
}

function isDarkHex(hex: string): boolean {
  const h = hex.replace('#', '').trim();
  if (h.length !== 6) return true;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  // relative luminance (sRGB)
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L < 0.55;
}

/* ─── Pre-computed stats ────────────────────────────────── */
const TOP_HADITHS = [...COMPANIONS].sort((a, b) => (b.hadiths || 0) - (a.hadiths || 0)).slice(0, 7);
const TOP_BATTLES = [...COMPANIONS]
  .sort((a, b) => (b.battles?.length || 0) - (a.battles?.length || 0))
  .slice(0, 7);

/* ─── BFS path finder ───────────────────────────────────── */
// Shorthand for D3 datum callbacks — used throughout the file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type D3D = any;

function bfs(adj: Record<string, string[]>, startId: string, endId: string): string[] | null {
  if (startId === endId) return [startId];
  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);
  while (queue.length) {
    const path = queue.shift()!;
    const curr = path[path.length - 1];
    for (const next of adj[curr] || []) {
      if (!visited.has(next)) {
        const newPath = [...path, next];
        if (next === endId) return newPath;
        visited.add(next);
        queue.push(newPath);
      }
    }
  }
  return null;
}

function shortName(name: string): string {
  const w = normalizeTransliteration(name).split(' ');
  return w[0] === 'Abu' || w[0] === 'Ibn' || w[0] === 'Umm' ? w.slice(0, 2).join(' ') : w[0];
}

/* ─── Comparison panel data builder ────────────────────── */
type EnrichedCompanion = (typeof COMPANIONS)[number] & {
  _tabaqat: string;
  _wealthLevel: string;
  _cityName: string;
  _birthAH: string;
  _deathAH: string;
  _isEnemy: string;
  [key: string]: unknown;
};

function buildCompareData(c: (typeof COMPANIONS)[number]): EnrichedCompanion {
  return {
    ...c,
    _tabaqat: TABAQAT_MAP[c.rank] ? `Generation ${TABAQAT_MAP[c.rank]}` : '—',
    _wealthLevel: WEALTH_LEVELS[c.rank] != null ? String(WEALTH_LEVELS[c.rank]) : '—',
    _cityName: COMPANION_CITY[c.rank] ?? '—',
    _birthAH:
      BIRTH_AH[c.rank] !== undefined
        ? BIRTH_AH[c.rank] < 0
          ? `${Math.abs(BIRTH_AH[c.rank])} BH`
          : `${BIRTH_AH[c.rank]} AH`
        : '—',
    _deathAH: DEATH_AH[c.rank] !== undefined ? `${DEATH_AH[c.rank]} AH` : '—',
    _isEnemy: FORMER_ENEMIES.has(c.rank) ? 'Yes — converted enemy' : 'No',
  };
}

/* ═══════════════════════════════════════════════════════════
   DIASPORA VIEW  (feature 22)
   ═══════════════════════════════════════════════════════ */
function DiasporaView({ companions, isDark }: { companions: typeof COMPANIONS; isDark: boolean }) {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const W = 700,
    H = 420;
  const groups: Record<string, typeof companions> = {};
  companions.forEach(c => {
    const city = COMPANION_CITY[c.rank] ?? 'Medina';
    (groups[city] = groups[city] || []).push(c);
  });

  const bg = isDark ? '#0d0a07' : '#f0e8d4';
  const textFill = isDark ? '#d4a85099' : '#8a704099';

  return (
    <div className={styles.diasporaWrap}>
      <p className={styles.diasporaIntro}>
        {L(
          `Geographic spread of the ${COMPANIONS.length} companions — where each companion lived after the Hijra. Cities with more companions show larger clusters.`,
          `${COMPANIONS.length} صحابہ کرام کا جغرافیائی پھیلاؤ — ہجرت کے بعد ہر صحابی کہاں آباد ہوئے، اس کا نقشہ۔ جن شہروں میں زیادہ صحابہ تھے وہاں بڑے کلسٹر نظر آئیں گے۔`
        )}
      </p>
      <div className={styles.diasporaSvgWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.diasporaSvg}>
          <rect width={W} height={H} fill={bg} rx={8} />
          {/* Region shading */}
          <ellipse cx={490} cy={265} rx={130} ry={145} fill={isDark ? '#ffffff08' : '#e8dcc818'} />
          <ellipse cx={390} cy={195} rx={85} ry={90} fill={isDark ? '#ffffff06' : '#ddd5c215'} />
          <ellipse cx={585} cy={200} rx={95} ry={100} fill={isDark ? '#ffffff06' : '#e0d8c815'} />
          <ellipse cx={285} cy={255} rx={75} ry={65} fill={isDark ? '#ffffff06' : '#d8d2c015'} />

          {/* City labels */}
          {Object.entries(CITY_POSITIONS).map(([city, pos]) => (
            <text
              key={city}
              x={pos.x * W}
              y={pos.y * H + 3}
              fontSize={7.5}
              fill={textFill}
              fontFamily="serif"
              textAnchor="middle"
            >
              {city}
            </text>
          ))}

          {/* Companion dots clustered by city */}
          {Object.entries(groups).map(([city, cList]) => {
            const pos = CITY_POSITIONS[city];
            if (!pos) return null;
            const cx = pos.x * W,
              cy = pos.y * H;
            const spread = Math.min(40, cList.length * 3);
            return cList.map((c, i) => {
              const angle = (i / cList.length) * 2 * Math.PI;
              const r = cList.length === 1 ? 0 : (spread / 2) * (0.6 + 0.4 * (i / cList.length));
              const nx = cx + r * Math.cos(angle);
              const ny = cy + r * Math.sin(angle);
              const branch = BRANCHES.find(
                b => b.types.includes(c.relType) || b.types.includes(c.cat)
              );
              const color = (branch || BRANCHES[5]).color;
              return (
                <g key={c.rank}>
                  <circle
                    cx={nx}
                    cy={ny}
                    r={c.rank <= 10 ? 7 : c.rank <= 30 ? 5 : 3.5}
                    fill={color}
                    stroke={isDark ? '#ffffff20' : '#ffffff60'}
                    strokeWidth={0.8}
                    opacity={0.9}
                  >
                    <title>
                      {lang === 'ur'
                        ? `${normalizeTransliteration(c.name)} - ${city} (رہائش)`
                        : `${normalizeTransliteration(c.name)} - ${city}`}
                    </title>
                  </circle>
                  {c.rank <= 10 && (
                    <text
                      x={nx}
                      y={ny + 3}
                      textAnchor="middle"
                      fontSize={5.5}
                      fill="#fff"
                      fontWeight="900"
                      pointerEvents="none"
                    >
                      {c.rank}
                    </text>
                  )}
                </g>
              );
            });
          })}

          {/* City size indicators */}
          {Object.entries(groups).map(([city, cList]) => {
            const pos = CITY_POSITIONS[city];
            if (!pos) return null;
            return (
              <text
                key={'lbl-' + city}
                x={pos.x * W}
                y={pos.y * H - 12}
                textAnchor="middle"
                fontSize={8.5}
                fontWeight="700"
                fill={isDark ? '#d4a85090' : '#6a504090'}
                fontFamily="serif"
              >
                {city} ({cList.length})
              </text>
            );
          })}
        </svg>
      </div>
      {/* Legend */}
      <div className={styles.diasporaLegend}>
        {BRANCHES.map(b => (
          <span key={b.id} className={styles.diasporaLegItem}>
            <span className={styles.diasporaLegDot} style={{ background: b.color }} />
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPARISON PANEL  (feature 28)
   ═══════════════════════════════════════════════════════ */
function ComparePanel({
  rankA,
  rankB,
  onClear,
}: {
  rankA: number;
  rankB: number;
  onClear: () => void;
}) {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const cA = COMPANIONS.find(c => c.rank === rankA);
  const cB = COMPANIONS.find(c => c.rank === rankB);
  if (!cA || !cB) return null;
  const dA = buildCompareData(cA);
  const dB = buildCompareData(cB);

  const groups: Record<string, (typeof COMPARISON_DIMS)[number][]> = {};
  COMPARISON_DIMS.forEach(d => {
    (groups[d.group] = groups[d.group] || []).push(d);
  });

  return (
    <div className={styles.comparePanel}>
      <div className={styles.comparePanelHeader}>
        <h3 className={styles.comparePanelTitle}>
          {L('30-Dimension Comparison', '۳۰ ابعاد پر مشتمل موازنہ')}
        </h3>
        <button className={styles.compareClearBtn} onClick={onClear}>
          ✕ {L('Clear', 'صاف کریں')}
        </button>
      </div>

      <div className={styles.comparePanelCols}>
        <div className={styles.compareColHead}>
          <p className={styles.compareColAr}>{cA.ar}</p>
          <p className={styles.compareColName}>{normalizeTransliteration(cA.name)}</p>
          <p className={styles.compareColTitle}>{normalizeTransliteration(cA.title)}</p>
        </div>
        <div className={styles.compareColDivider} />
        <div className={styles.compareColHead} style={{ textAlign: 'right' }}>
          <p className={styles.compareColAr}>{cB.ar}</p>
          <p className={styles.compareColName}>{normalizeTransliteration(cB.name)}</p>
          <p className={styles.compareColTitle}>{normalizeTransliteration(cB.title)}</p>
        </div>
      </div>

      <div className={styles.compareDims}>
        {Object.entries(groups).map(([group, dims]) => (
          <div key={group} className={styles.compareGroup}>
            <div className={styles.compareGroupLabel}>
              {lang === 'ur'
                ? group === 'Core Profile'
                  ? 'بنیادی تعارف'
                  : group === 'Knowledge & Hadith'
                    ? 'علم و حدیث'
                    : group === 'Battles & Bravery'
                      ? 'غزوات و شجاعت'
                      : group === 'Social & Family'
                        ? 'خاندانی و سماجی پہلو'
                        : group === 'Legacy'
                          ? 'ترکہ و وراثت'
                          : group
                : group}
            </div>
            {dims.map(dim => {
              const vA = dA[dim.key];
              const vB = dB[dim.key];
              const same = JSON.stringify(vA) === JSON.stringify(vB);
              return (
                <div
                  key={dim.key}
                  className={`${styles.compareRow} ${same ? styles.compareRowSame : ''}`}
                >
                  <div className={styles.compareCell}>
                    {Array.isArray(vA) ? vA.join(', ') : String(vA || '—')}
                  </div>
                  <div className={styles.compareDimLabel}>{dim.label}</div>
                  <div className={`${styles.compareCell} ${styles.compareCellR}`}>
                    {Array.isArray(vB) ? vB.join(', ') : String(vB || '—')}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function ConnectionsPage() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const loadRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<SVGSVGElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d3State = useRef<Record<string, any> | null>(null);
  const pathSRef = useRef<{ mode: boolean; start: string | null }>({ mode: false, start: null });

  const [uiState, dispatch] = useReducer(connectionsReducer, INITIAL_CONNECTIONS_STATE);
  const { activeFilter, activeEra, graphLayer, graphView, graphTab, isPathMode, compareMode } =
    uiState;
  /* Lens panel — floats over the canvas, dismissible. Default open so a
     first-time user sees the filter controls; once they close it a small
     "Lens" pill appears top-left of the canvas to bring it back. */
  // Default to closed so the clean inline-controls layout (era slider,
  // branches strip, full-width graph) is what users see first. Users
  // can open the Lens drawer via the bottom "Lens" pill when needed.
  const [lensOpen, setLensOpen] = useState(false);
  /* Closes the nearest <details> ancestor — used by menu items inside
     the kebab/More dropdowns so the menu collapses after a click. */
  const closeNearestDetails = (e: React.MouseEvent) => {
    let n: HTMLElement | null = e.currentTarget as HTMLElement;
    while (n) {
      if (n.tagName === 'DETAILS') {
        (n as HTMLDetailsElement).open = false;
        break;
      }
      n = n.parentElement;
    }
  };

  // Debug telemetry transport (POST to a local dev ingest endpoint) was
  // disabled because the endpoint isn't part of this build — every call
  // produced a console-visible ERR_CONNECTION_REFUSED that no .catch() can
  // suppress. Restore the fetch/sendBeacon body if you bring the ingest
  // server at 127.0.0.1:7643 back online.
  const debugPost = useCallback((_payload: Record<string, unknown>) => {
    /* no-op */
  }, []);

  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.body.classList.contains('tahajjud');
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pathResult, setPathResult] = useState<{ names: string[]; hops: number } | null>(null);
  const [statsTab, setStatsTab] = useState('hadiths');
  const [sideTab, setSideTab] = useState('network');
  const [searchQ, setSearchQ] = useState('');
  const [searchErr, setSearchErr] = useState(false);

  /* era slider (18) */
  const [eraYear, setEraYear] = useState<number>(11); // default: death of Prophet ﷺ
  const [useEraSlider, setUseEraSlider] = useState(false);

  /* event dropdown (20) */
  const [eventFilter, setEventFilter] = useState<string>('');

  const [compareRanks, setCompareRanks] = useState<number[]>([]);
  const [savedViews, setSavedViews] = useState<SavedConnectionsView[]>([]);

  // Keep Connections theme in sync with global Tahajjud mode.
  useEffect(() => {
    const stored = localStorage.getItem('tahajjud_mode');
    const active = stored !== null ? stored === 'true' : isTahajjudHour();
    if (active) document.body.classList.add('tahajjud');
    else document.body.classList.remove('tahajjud');
    setIsDark(active);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const active = document.body.classList.contains('tahajjud');
      setIsDark(active);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTahajjud = useCallback(() => {
    const next = !document.body.classList.contains('tahajjud');
    if (next) document.body.classList.add('tahajjud');
    else document.body.classList.remove('tahajjud');
    localStorage.setItem('tahajjud_mode', String(next));
    setIsDark(next);
  }, []);

  /* sidebar filter counts */
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: COMPANIONS.length };
    COMPANIONS.forEach(c => {
      const br = BRANCHES.find(b => b.types.includes(c.relType) || b.types.includes(c.cat));
      const id = (br || BRANCHES[5]).id;
      counts[id] = (counts[id] || 0) + 1;
    });
    return counts;
  }, []);

  const topConnected = useMemo(
    () =>
      computeTopConnected(
        COMPANIONS,
        {
          scholarly: C2C_NARRATIONS.map(n => ({ source: n.narratorRank, target: n.sourceRank })),
          family: FAMILY_EDGES,
          trade: TRADE_EDGES,
          ikhtilaf: IKHTILAF_EDGES,
          teaching: TEACHER_STUDENT_EDGES.map(e => ({ source: e.teacherRank })),
        },
        graphLayer,
        5
      ),
    [graphLayer]
  );

  useEffect(() => {
    setSavedViews(readSavedViews());
  }, []);

  useEffect(() => {
    const parsed = parseConnectionsStateFromSearch(location.search);
    if (Object.keys(parsed).length > 0) {
      dispatch({ type: 'applySavedView', value: parsed });
    }
    // only first parse on mount/navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const search = serializeConnectionsStateToSearch(uiState);
    navigate({ search: `?${search}` }, { replace: true });
  }, [navigate, uiState]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const rankSet = new Set(COMPANIONS.map(c => c.rank));
      const teachingWarnings = TEACHER_STUDENT_EDGES.filter(e => !rankSet.has(e.teacherRank)).map(
        e => `[teaching] unknown teacher rank ${e.teacherRank}`
      );
      const warnings = [
        ...validateConnectionEdges(COMPANIONS, FAMILY_EDGES, 'family'),
        ...validateConnectionEdges(COMPANIONS, TRADE_EDGES, 'trade'),
        ...validateConnectionEdges(COMPANIONS, IKHTILAF_EDGES, 'ikhtilaf'),
        ...teachingWarnings,
      ];
      warnings.forEach(w => console.warn('[ConnectionsDataValidation]', w));
    }
  }, []);

  /* ── companions visible during selected AH event ─────── */
  const companionsAtEvent = useMemo(() => {
    if (!eventFilter) return null;
    const ev = KEY_EVENTS.find(e => e.label === eventFilter);
    if (!ev) return null;
    const year = ev.yearAH;
    return new Set(
      COMPANIONS.filter(c => {
        const b = BIRTH_AH[c.rank] ?? -99;
        const d = DEATH_AH[c.rank] ?? 999;
        return b <= year && d >= year;
      }).map(c => c.rank)
    );
  }, [eventFilter]);

  /* ── era-slider visibility ─────────────────────────────── */
  const companionsByEraYear = useMemo(() => {
    if (!useEraSlider) return null;
    return new Set(
      COMPANIONS.filter(c => {
        const b = BIRTH_AH[c.rank] ?? -99;
        const d = DEATH_AH[c.rank] ?? 999;
        return b <= eraYear && d >= eraYear;
      }).map(c => c.rank)
    );
  }, [eraYear, useEraSlider]);

  /* ═══════════════════════════════════════════════════════
     D3 INIT
  ═══════════════════════════════════════════════════════ */
  useEffect(() => {
    // #region agent log
    debugPost({
      sessionId: 'ea09d6',
      runId: 'run1',
      hypothesisId: 'H1',
      location: 'ConnectionsPage.tsx:499',
      message: 'init-effect-enter',
      data: {
        graphTab,
        graphView,
        hasWrapRef: !!wrapRef.current,
        hasSvgRef: !!svgRef.current,
        hasD3State: !!d3State.current,
      },
      timestamp: Date.now(),
    });
    // #endregion
    if (graphTab !== 'graph' || graphView !== 'network') return;
    const wrapEl = wrapRef.current;
    const svgEl = svgRef.current;
    if (!wrapEl || !svgEl) return;

    function initD3(W: number, H: number) {
      // #region agent log
      debugPost({
        sessionId: 'ea09d6',
        runId: 'run1',
        hypothesisId: 'H2',
        location: 'ConnectionsPage.tsx:505',
        message: 'initD3-start',
        data: { W, H, hasD3State: !!d3State.current },
        timestamp: Date.now(),
      });
      // #endregion
      if (d3State.current) return;
      try {
        // svgEl is guaranteed non-null by the outer guard at useEffect entry
        const svg_ = svgEl!;
        svg_.removeAttribute('width');
        svg_.removeAttribute('height');
        svg_.setAttribute('viewBox', `0 0 ${W} ${H}`);
        const darkActive =
          document.body.classList.contains('tahajjud') ||
          !!wrapRef.current?.closest('.connections-dark');
        const initBg = darkActive ? '#0b1628' : '#faf8f5';
        svg_.style.background = initBg;
        wrapEl!.style.background = initBg;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const svg: any = d3.select(svgEl!);
        svg.selectAll('*').remove();
        const defs = svg.append('defs');

        ['gp', 'gb', 'gc'].forEach((id, i) => {
          const f = defs
            .append('filter')
            .attr('id', id)
            .attr('x', '-80%')
            .attr('y', '-80%')
            .attr('width', '260%')
            .attr('height', '260%');
          f.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', [18, 10, 4][i])
            .attr('result', 'b');
          const m = f.append('feMerge');
          m.append('feMergeNode').attr('in', 'b');
          m.append('feMergeNode').attr('in', 'SourceGraphic');
        });

        const gsf = defs
          .append('filter')
          .attr('id', 'gSearch')
          .attr('x', '-100%')
          .attr('y', '-100%')
          .attr('width', '300%')
          .attr('height', '300%');
        gsf
          .append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', 14)
          .attr('result', 'b');
        const gsm = gsf.append('feMerge');
        gsm.append('feMergeNode').attr('in', 'b');
        gsm.append('feMergeNode').attr('in', 'b');
        gsm.append('feMergeNode').attr('in', 'SourceGraphic');

        const gpf = defs
          .append('filter')
          .attr('id', 'gPath')
          .attr('x', '-60%')
          .attr('y', '-60%')
          .attr('width', '220%')
          .attr('height', '220%');
        gpf
          .append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', 8)
          .attr('result', 'b');
        const gpm = gpf.append('feMerge');
        gpm.append('feMergeNode').attr('in', 'b');
        gpm.append('feMergeNode').attr('in', 'SourceGraphic');

        /* Arrow marker for teaching layer */
        const teachArrow = defs
          .append('marker')
          .attr('id', 'teacharrow')
          .attr('viewBox', '0 0 10 10')
          .attr('refX', 9)
          .attr('refY', 5)
          .attr('markerWidth', 6)
          .attr('markerHeight', 6)
          .attr('orient', 'auto');
        teachArrow.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', '#5a2080');

        /* gradients */
        const pg = defs
          .append('radialGradient')
          .attr('id', 'propgrad')
          .attr('cx', '35%')
          .attr('cy', '28%');
        pg.append('stop').attr('offset', '0%').attr('stop-color', '#fff8d0');
        pg.append('stop').attr('offset', '50%').attr('stop-color', '#d4a017');
        pg.append('stop').attr('offset', '100%').attr('stop-color', '#8b6008');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const branches: Array<(typeof BRANCHES)[number] & { companions: any[] }> = BRANCHES.map(
          b => ({ ...b, companions: [] as any[] })
        );
        COMPANIONS.forEach(d => {
          const br = branches.find(b => b.types.includes(d.relType) || b.types.includes(d.cat));
          (br || branches[5]).companions.push(d);
        });
        branches.forEach(b => b.companions.sort((a, z) => a.rank - z.rank));

        branches.forEach(br => {
          const g = defs
            .append('radialGradient')
            .attr('id', 'brg-' + br.id)
            .attr('cx', '35%')
            .attr('cy', '28%');
          g.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', br.color + 'ee');
          g.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', br.color + '99');
        });

        const cg = defs
          .append('radialGradient')
          .attr('id', 'cmpg')
          .attr('cx', '35%')
          .attr('cy', '28%');
        // Slightly lighter center so node rings/labels read cleanly on light backgrounds
        cg.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(84,62,22,.92)');
        cg.append('stop').attr('offset', '55%').attr('stop-color', 'rgba(40,30,12,.94)');
        cg.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(18,13,6,.98)');

        /* ── build graph ─────────────────────────────────── */
        const cx = W / 2,
          cy = H / 2;
        const bR = Math.min(220, Math.min(W, H) * 0.36);
        const maxH = Math.max(...COMPANIONS.map(c => c.hadiths || 0));
        performance.mark('connections:model:start');
        const model = buildGraphModel(COMPANIONS, BRANCHES, W, H);
        const nodes = model.nodes as any[];
        const linksR = model.linksResolved as any[];
        const nodeMap = model.nodeById as Record<string, any>;
        const adjList = model.adjacency;
        // #region agent log
        debugPost({
          sessionId: 'ea09d6',
          runId: 'run1',
          hypothesisId: 'H3',
          location: 'ConnectionsPage.tsx:587',
          message: 'graph-model-built',
          data: {
            nodesCount: nodes.length,
            linksCount: linksR.length,
            nodeMapCount: Object.keys(nodeMap).length,
            adjKeys: Object.keys(adjList).length,
          },
          timestamp: Date.now(),
        });
        // #endregion
        performance.mark('connections:model:end');
        performance.measure(
          'connections:model',
          'connections:model:start',
          'connections:model:end'
        );

        /* ── minimap scale & mutable refs ────────────────── */
        const mmW = 164,
          mmH = 114;
        const mmScale = mmW / W;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let mmViewport: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let mmLinks_: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let mmNodes_: any = null;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function updateViewportRect(t: any) {
          if (!mmViewport) return;
          const vx = (-t.x / t.k) * mmScale;
          const vy = (-t.y / t.k) * mmScale;
          mmViewport
            .attr('x', vx)
            .attr('y', vy)
            .attr('width', (W / t.k) * mmScale)
            .attr('height', (H / t.k) * mmScale);
        }

        function updateMinimap() {
          if (!mmLinks_ || !mmNodes_) return;
          mmLinks_
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .attr('x1', (d: any) => d.source.x * mmScale)
            .attr('y1', (d: any) => d.source.y * mmScale)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .attr('x2', (d: any) => d.target.x * mmScale)
            .attr('y2', (d: any) => d.target.y * mmScale);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mmNodes_.attr('cx', (d: any) => d.x * mmScale).attr('cy', (d: any) => d.y * mmScale);
          updateViewportRect(d3.zoomTransform(svgEl!));
        }

        /* ── zoom & pan ──────────────────────────────────── */
        const mainG = svg.append('g');
        const initT = d3.zoomIdentity;

        const zoom = d3
          .zoom()
          .scaleExtent([0.08, 8])
          .on('zoom', e => {
            mainG.attr('transform', e.transform);
            updateViewportRect(e.transform);
          });
        svg.call(zoom);

        /* ── BASE links ──────────────────────────────────── */
        const linkG = mainG.append('g');
        const linkEls = linkG
          .selectAll('line')
          .data(linksR)
          .join('line')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr('stroke', (d: any) => {
            if (d.type === 'spoke') return d.target.br ? d.target.br.color : '#888';
            return d.source.br ? d.source.br.color : d.target.color || '#888';
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr('stroke-width', (d: any) => (d.type === 'spoke' ? 3.2 : 1.55))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr('stroke-opacity', (d: any) => (d.type === 'spoke' ? 0.72 : 0.36));

        /* ── OVERLAY LINK GROUPS (for layers 19, 15, 09, 63) ─── */
        const familyLinkG = mainG
          .append('g')
          .attr('class', 'family-layer')
          .style('display', 'none');
        const tradeLinkG = mainG.append('g').attr('class', 'trade-layer').style('display', 'none');
        const ikhtilafLinkG = mainG
          .append('g')
          .attr('class', 'ikhtilaf-layer')
          .style('display', 'none');
        const teachingLinkG = mainG
          .append('g')
          .attr('class', 'teaching-layer')
          .style('display', 'none');
        const builtLayers = {
          family: false,
          trade: false,
          ikhtilaf: false,
          teaching: false,
        };

        /* Family edges */
        function buildFamilyEdges() {
          familyLinkG.selectAll('*').remove();
          FAMILY_EDGES.forEach(e => {
            const sNode = nodeMap['cp-' + e.source];
            const tNode = nodeMap['cp-' + e.target];
            if (!sNode || !tNode) return;
            const edgeData = { source: sNode, target: tNode, label: e.label };
            familyLinkG
              .append('line')
              .datum(edgeData)
              .attr('stroke', '#b8860b')
              .attr('stroke-width', 2.5)
              .attr('stroke-dasharray', '8 3')
              .attr('stroke-opacity', 0.7)
              .attr('x1', sNode.x)
              .attr('y1', sNode.y)
              .attr('x2', tNode.x)
              .attr('y2', tNode.y);
          });
        }

        /* Trade edges */
        function buildTradeEdges() {
          tradeLinkG.selectAll('*').remove();
          TRADE_EDGES.forEach(e => {
            const sNode = nodeMap['cp-' + e.source];
            const tNode = nodeMap['cp-' + e.target];
            if (!sNode || !tNode) return;
            tradeLinkG
              .append('line')
              .datum({ source: sNode, target: tNode })
              .attr('stroke', '#2a7040')
              .attr('stroke-width', 2.2)
              .attr('stroke-dasharray', '5 4')
              .attr('stroke-opacity', 0.65)
              .attr('x1', sNode.x)
              .attr('y1', sNode.y)
              .attr('x2', tNode.x)
              .attr('y2', tNode.y);
          });
        }

        /* Ikhtilaf edges */
        function buildIkhtilafEdges() {
          ikhtilafLinkG.selectAll('*').remove();
          IKHTILAF_EDGES.forEach(e => {
            const sNode = nodeMap['cp-' + e.source];
            const tNode = nodeMap['cp-' + e.target];
            if (!sNode || !tNode) return;
            ikhtilafLinkG
              .append('line')
              .datum({ source: sNode, target: tNode })
              .attr('stroke', '#c0392b')
              .attr('stroke-width', 2)
              .attr('stroke-dasharray', '4 4')
              .attr('stroke-opacity', 0.75)
              .attr('x1', sNode.x)
              .attr('y1', sNode.y)
              .attr('x2', tNode.x)
              .attr('y2', tNode.y);
          });
        }

        /* Teaching/Ilm edges (Feature 63) */
        function buildTeachingEdges() {
          teachingLinkG.selectAll('*').remove();
          TEACHER_STUDENT_EDGES.forEach((e, idx) => {
            const sNode = nodeMap['cp-' + e.teacherRank];
            if (!sNode) return;
            // Place student node as a satellite around the teacher node
            const angle = (idx / TEACHER_STUDENT_EDGES.length) * 2 * Math.PI;
            const dist = 60 + Math.random() * 30;
            const sx = sNode.x + Math.cos(angle) * dist;
            const sy = sNode.y + Math.sin(angle) * dist;
            // Arrow line from teacher to student
            const g = teachingLinkG.append('g');
            g.append('line')
              .attr('stroke', '#5a2080')
              .attr('stroke-width', 1.6)
              .attr('stroke-dasharray', '6 3')
              .attr('stroke-opacity', 0.75)
              .attr('marker-end', 'url(#teacharrow)')
              .attr('x1', sNode.x)
              .attr('y1', sNode.y)
              .attr('x2', sx)
              .attr('y2', sy);
            // Student label circle
            g.append('circle')
              .attr('cx', sx)
              .attr('cy', sy)
              .attr('r', 14)
              .attr('fill', '#1a0a30')
              .attr('stroke', '#5a2080')
              .attr('stroke-width', 1.2);
            g.append('text')
              .attr('x', sx)
              .attr('y', sy - 2)
              .attr('text-anchor', 'middle')
              .attr('font-size', 6.5)
              .attr('fill', '#c0a0e8')
              .attr('pointer-events', 'none')
              .text(normalizeTransliteration(e.studentName).split(' ')[0]);
            g.append('text')
              .attr('x', sx)
              .attr('y', sy + 7)
              .attr('text-anchor', 'middle')
              .attr('font-size', 5.5)
              .attr('fill', '#8060a8')
              .attr('pointer-events', 'none')
              .text(e.subject.slice(0, 12) + '…');
            g.append('title').text(
              `${normalizeTransliteration(e.studentName)}\n${e.studentAr}\nTaught: ${normalizeTransliteration(e.subject)}\nLegacy: ${normalizeTransliteration(e.legacy)}`
            );
          });
        }

        function ensureLayerBuilt(layer: GraphLayer) {
          if (layer === 'family' && !builtLayers.family) {
            buildFamilyEdges();
            builtLayers.family = true;
          }
          if (layer === 'trade' && !builtLayers.trade) {
            buildTradeEdges();
            builtLayers.trade = true;
          }
          if (layer === 'ikhtilaf' && !builtLayers.ikhtilaf) {
            buildIkhtilafEdges();
            builtLayers.ikhtilaf = true;
          }
          if (layer === 'teaching' && !builtLayers.teaching) {
            buildTeachingEdges();
            builtLayers.teaching = true;
          }
        }

        const pathG = mainG.append('g').attr('class', 'path-ov');

        /* ── companion nodes ─────────────────────────────── */
        const nodeG = mainG.append('g');
        const tip = tipRef.current!;

        const compGroups = nodeG
          .selectAll('.comp-node')
          .data(nodes.filter(n => n.type === 'companion'))
          .join('g')
          .classed('comp-node', true)
          .style('cursor', 'pointer')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .call(
            (d3.drag() as any)
              .on('start', (e: any, d: any) => {
                if (pathSRef.current.mode) return;
                if (!e.active) sim.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on('drag', (e: any, d: any) => {
                if (pathSRef.current.mode) return;
                d.fx = e.x;
                d.fy = e.y;
              })
              .on('end', (e: any, d: any) => {
                if (pathSRef.current.mode) return;
                if (!e.active) sim.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              })
          );

        compGroups
          .append('circle')
          .attr('class', styles.pulseRing)
          .attr('r', (d: D3D) => d.r + (d.pulseR || 0))
          .attr('fill', 'none')
          .attr('stroke', (d: D3D) => d.color)
          .attr('stroke-width', 1.5)
          .attr('stroke-opacity', (d: D3D) => (d.pulseR > 0 ? 0.18 : 0))
          .style('animation-duration', (d: D3D) => {
            if (!d.data.hadiths) return '0s';
            return (2.5 + (1 - d.data.hadiths / maxH) * 5).toFixed(1) + 's';
          });

        compGroups
          .append('circle')
          .attr('r', (d: D3D) => d.r + 7)
          .attr('fill', 'none')
          .attr('stroke', (d: D3D) => d.color)
          .attr('stroke-opacity', 0.18)
          .attr('stroke-width', 2);

        compGroups
          .append('circle')
          .attr('r', (d: D3D) => d.r)
          .attr('fill', 'url(#cmpg)')
          .attr('stroke', (d: D3D) => d.color)
          .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.4))
          .attr('filter', 'url(#gc)');

        compGroups
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', (d: D3D) =>
            d.data.rank <= 3 ? 13 : d.data.rank <= 10 ? 11 : d.data.rank <= 30 ? 9 : 7.5
          )
          // High-contrast rank label for all node colors (fixes dark-on-dark readability)
          .attr('font-weight', '900')
          .attr('fill', 'rgba(255,252,240,.98)')
          .attr('stroke', (d: D3D) => d.color)
          .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.8))
          .attr('paint-order', 'stroke')
          .attr('pointer-events', 'none')
          .text((d: D3D) => d.data.rank);

        compGroups
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'hanging')
          .attr('font-size', (d: D3D) => (d.data.rank <= 10 ? 10 : 8.5))
          .attr('font-weight', (d: D3D) => (d.data.rank <= 10 ? '700' : '500'))
          .attr('fill', 'rgba(28,18,8,.92)')
          .attr('pointer-events', 'none')
          .attr('dy', (d: D3D) => d.r + 5)
          .text((d: D3D) => shortName(d.data.name));

        compGroups
          .on('mouseover', (e: D3D, d: D3D) => {
            if (pathSRef.current.mode || d3State.current?.compareMode) return;
            const dd = d.data;
            tip.innerHTML =
              `<div class="${styles.ntName}">${normalizeTransliteration(dd.name)}</div>` +
              `<div class="${styles.ntAr}">${dd.ar}</div>` +
              `<div class="${styles.ntTitle}" style="color:${d.color}">${normalizeTransliteration(dd.title || dd.rel)}</div>` +
              `<div class="${styles.ntRel}">${normalizeTransliteration(dd.rel)}</div>` +
              `<div class="${styles.ntDesc}">${normalizeTransliteration(dd.sig)}</div>` +
              `<div class="${styles.ntStats}">` +
              `<div class="${styles.ntStat}"><b>#${dd.rank}</b>Rank</div>` +
              `<div class="${styles.ntStat}"><b>${dd.born}</b>Born</div>` +
              `<div class="${styles.ntStat}"><b>${dd.death}</b>Died</div>` +
              (dd.hadiths
                ? `<div class="${styles.ntStat}"><b>${dd.hadiths.toLocaleString()}</b>Hadiths</div>`
                : '') +
              (dd.battles?.length
                ? `<div class="${styles.ntStat}"><b>${dd.battles.length}</b>Battles</div>`
                : '') +
              `</div>`;
            tip.classList.add(styles.nodeTooltipShow);
          })
          .on('mousemove', (e: D3D) => {
            if (pathSRef.current.mode || d3State.current?.compareMode) return;
            const tx = e.clientX + 16,
              ty = e.clientY - 14;
            tip!.style.left = (tx + 325 > window.innerWidth ? e.clientX - 330 : tx) + 'px';
            tip!.style.top = ty + 'px';
          })
          .on('mouseout', () => tip?.classList.remove(styles.nodeTooltipShow))
          .on('click', (e: D3D, d: D3D) => {
            e.stopPropagation();
            const ps = pathSRef.current;
            const cm = d3State.current;

            /* ── Compare mode click ──────────────────────── */
            if (cm?.compareMode) {
              const rank = d.data.rank;
              const current = cm.compareRanks || [];
              if (current.includes(rank)) {
                cm.compareRanks = current.filter((r: D3D) => r !== rank);
              } else if (current.length < 2) {
                cm.compareRanks = [...current, rank];
              } else {
                cm.compareRanks = [rank];
              }
              cm.onUpdateCompare?.(cm.compareRanks);
              /* highlight selected nodes */
              compGroups
                .select('circle:nth-child(3)')
                .attr('stroke', (n: D3D) =>
                  cm.compareRanks.includes(n.data.rank) ? '#ffd700' : n.color
                )
                .attr('stroke-width', (n: D3D) =>
                  cm.compareRanks.includes(n.data.rank) ? 3.5 : n.data.rank <= 10 ? 2.2 : 1.4
                );
              return;
            }

            /* ── Path mode click ─────────────────────────── */
            if (!ps.mode) return;
            if (!ps.start) {
              ps.start = d.id;
              compGroups
                .filter((n: D3D) => n.id === d.id)
                .select('circle:nth-child(3)')
                .attr('stroke', '#22cc44')
                .attr('stroke-width', 4)
                .attr('filter', 'url(#gPath)');
              tip.innerHTML = `<div class="${styles.ntName}" style="color:#22cc44">✓ Start: ${normalizeTransliteration(d.data.name)}</div><div class="${styles.ntDesc}" style="margin-top:.4rem">Now click any destination companion</div>`;
              tip.style.left = e.clientX + 16 + 'px';
              tip.style.top = e.clientY - 14 + 'px';
              tip.classList.add(styles.nodeTooltipShow);
              setTimeout(() => tip.classList.remove(styles.nodeTooltipShow), 2200);
            } else if (ps.start !== null && ps.start !== d.id) {
              const path = bfs(adjList, ps.start, String(d.id));
              pathG.selectAll('*').remove();
              if (path) {
                const pathSet = new Set(path);
                const pathEdges = linksR.filter(l => {
                  for (let i = 0; i < path.length - 1; i++) {
                    if (
                      (l.source.id === path[i] && l.target.id === path[i + 1]) ||
                      (l.target.id === path[i] && l.source.id === path[i + 1])
                    )
                      return true;
                  }
                  return false;
                });
                pathG
                  .selectAll('line')
                  .data(pathEdges)
                  .join('line')
                  .attr('stroke', '#ffd700')
                  .attr('stroke-width', 5)
                  .attr('stroke-linecap', 'round')
                  .attr('x1', (l: D3D) => l.source.x)
                  .attr('y1', (l: D3D) => l.source.y)
                  .attr('x2', (l: D3D) => l.target.x)
                  .attr('y2', (l: D3D) => l.target.y)
                  .each(function (this: Element, l: D3D) {
                    const len = Math.hypot(l.target.x - l.source.x, l.target.y - l.source.y);
                    d3.select(this)
                      .attr('stroke-dasharray', len)
                      .attr('stroke-dashoffset', len)
                      .transition()
                      .duration(350)
                      .delay((_, i) => i * 180)
                      .attr('stroke-dashoffset', 0);
                  });
                compGroups
                  .select('circle:nth-child(3)')
                  .attr('stroke', (n: D3D) =>
                    n.id === ps.start ? '#22cc44' : n.id === d.id ? '#ff4466' : n.color
                  )
                  .attr('stroke-width', (n: D3D) =>
                    pathSet.has(n.id) ? 3.5 : n.data.rank <= 10 ? 2.2 : 1.4
                  )
                  .attr('filter', (n: D3D) => (pathSet.has(n.id) ? 'url(#gPath)' : 'url(#gc)'));
                const names = path.map(id => {
                  if (id === 'prophet') return 'Prophet ﷺ';
                  const nd = nodeMap[id];
                  return nd.type === 'branch' ? `[${nd.br.label}]` : shortName(nd.data.name);
                });
                setPathResult({ names, hops: path.length - 1 });
              } else {
                setPathResult({ names: [], hops: -1 });
              }
              ps.start = null;
            }
          });

        /* ── branch hub nodes ────────────────────────────── */
        const branchGroups = nodeG
          .selectAll('.branch-node')
          .data(nodes.filter(n => n.type === 'branch'))
          .join('g')
          .classed('branch-node', true)
          .style('cursor', 'pointer');

        branchGroups
          .append('circle')
          .attr('r', 54)
          .attr('fill', 'none')
          .attr('stroke', (d: D3D) => d.br.color)
          .attr('stroke-opacity', 0.16)
          .attr('stroke-width', 14);
        branchGroups
          .append('circle')
          .attr('r', 38)
          .attr('fill', (d: D3D) => 'url(#brg-' + d.br.id + ')')
          .attr('stroke', (d: D3D) => d.br.color)
          .attr('stroke-width', 0)
          .attr('filter', 'url(#gb)');
        branchGroups
          .append('circle')
          .attr('r', 33)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(255,255,255,.25)')
          .attr('stroke-width', 1);
        branchGroups
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', 11)
          .attr('font-weight', '900')
          .attr('fill', '#ffffff')
          .attr('stroke', 'rgba(0,0,0,.55)')
          .attr('stroke-width', 3.2)
          .attr('paint-order', 'stroke')
          .attr('pointer-events', 'none')
          .text((d: D3D) => d.br.label.split(' ')[0]);
        branchGroups
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'hanging')
          .attr('font-size', 9)
          .attr('font-weight', '800')
          .attr('fill', 'rgba(255,255,255,.98)')
          .attr('stroke', 'rgba(0,0,0,.55)')
          .attr('stroke-width', 2.6)
          .attr('paint-order', 'stroke')
          .attr('dy', 43)
          .attr('pointer-events', 'none')
          .text((d: D3D) => d.br.companions.length + ' companions');

        branchGroups.on('click', (e: D3D, d: D3D) => {
          if (pathSRef.current.mode) return;
          const brId = d.br.id;
          const wasActive = d3.select(e.currentTarget).classed('active-branch');
          compGroups.style('opacity', 1);
          linkEls.style('opacity', 1);
          branchGroups.classed('active-branch', false);
          if (!wasActive) {
            compGroups.style('opacity', (n: D3D) => (n.brId === brId ? 1 : 0.07));
            linkEls.style('opacity', (l: D3D) => {
              return l.target.brId === brId ||
                l.source.id === 'br-' + brId ||
                l.target.id === 'br-' + brId
                ? 1
                : 0.04;
            });
            d3.select(e.currentTarget).classed('active-branch', true);
          }
        });

        /* ── Prophet ﷺ center node ───────────────────────── */
        const propG = nodeG.append('g').style('cursor', 'pointer');
        [68, 57].forEach((r, i) =>
          propG
            .append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .attr('fill', 'none')
            .attr('stroke', `rgba(184,134,11,${0.1 + i * 0.08})`)
            .attr('stroke-width', i ? 1 : 0.7)
        );
        propG
          .append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', 46)
          .attr('fill', 'url(#propgrad)')
          .attr('filter', 'url(#gp)')
          .attr('stroke', 'rgba(255,255,255,.5)')
          .attr('stroke-width', 2);
        propG
          .append('text')
          .attr('x', cx)
          .attr('y', cy)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', 28)
          .attr('fill', '#1a0a00')
          .attr('pointer-events', 'none')
          .text('ﷺ');
        propG
          .append('text')
          .attr('x', cx)
          .attr('y', cy + 62)
          .attr('text-anchor', 'middle')
          .attr('font-size', 9)
          .attr('letter-spacing', '.14em')
          .attr('font-weight', '900')
          .attr('fill', '#6a4000')
          .attr('pointer-events', 'none')
          .text('PROPHET ﷺ');
        propG.on('click', () => {
          pathG.selectAll('*').remove();
          pathSRef.current.start = null;
          compGroups
            .style('opacity', 1)
            .select('circle:nth-child(3)')
            .attr('stroke', (d: D3D) => d.color)
            .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.4))
            .attr('filter', 'url(#gc)');
          linkEls.style('opacity', 1);
          branchGroups.classed('active-branch', false);
          dispatch({ type: 'setActiveFilter', value: 'all' });
          setPathResult(null);
        });

        /* ── force simulation ────────────────────────────── */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sim: any = (d3.forceSimulation as any)(nodes)
          .force(
            'link',
            (d3.forceLink as any)(linksR)
              .id((d: D3D) => d.id)
              .distance((d: D3D) => (d.type === 'spoke' ? Math.min(180, bR * 0.82) : 78))
              .strength((d: D3D) => (d.type === 'spoke' ? 0.9 : 0.45))
          )
          .force(
            'charge',
            d3
              .forceManyBody()
              .strength((d: D3D) =>
                d.type === 'prophet' ? -1200 : d.type === 'branch' ? -500 : -110
              )
          )
          .force(
            'collide',
            d3
              .forceCollide()
              .radius((d: D3D) => (d.r || 18) + 24)
              .strength(0.85)
              .iterations(3)
          )
          .force('center', d3.forceCenter(cx, cy).strength(0.03))
          .alphaDecay(0.03)
          .velocityDecay(0.42);
        // #region agent log
        debugPost({
          sessionId: 'ea09d6',
          runId: 'run1',
          hypothesisId: 'H11',
          location: 'ConnectionsPage.tsx:1028',
          message: 'sim-created',
          data: { nodesCount: nodes.length, linksCount: linksR.length, width: W, height: H },
          timestamp: Date.now(),
        });
        // #endregion
        let loggedFirstTick = false;
        sim
          .on('tick', () => {
            if (!loggedFirstTick) {
              loggedFirstTick = true;
              const compNodes = nodes.filter((n: D3D) => n.type === 'companion');
              const xs = compNodes.map((n: D3D) => n.x);
              const ys = compNodes.map((n: D3D) => n.y);
              // #region agent log
              debugPost({
                sessionId: 'ea09d6',
                runId: 'run1',
                hypothesisId: 'H12',
                location: 'ConnectionsPage.tsx:1037',
                message: 'sim-first-tick',
                data: {
                  compNodeCount: compNodes.length,
                  xMin: Math.min(...xs),
                  xMax: Math.max(...xs),
                  yMin: Math.min(...ys),
                  yMax: Math.max(...ys),
                  hasNaN:
                    xs.some((v: number) => Number.isNaN(v)) ||
                    ys.some((v: number) => Number.isNaN(v)),
                },
                timestamp: Date.now(),
              });
              // #endregion
            }
            linkEls
              .attr('x1', (d: D3D) => d.source.x)
              .attr('y1', (d: D3D) => d.source.y)
              .attr('x2', (d: D3D) => d.target.x)
              .attr('y2', (d: D3D) => d.target.y);
            compGroups.attr('transform', (d: D3D) => `translate(${d.x},${d.y})`);
            branchGroups.attr('transform', (d: D3D) => `translate(${d.x},${d.y})`);
            /* update layer edge positions */
            familyLinkG
              .selectAll('line')
              .attr('x1', (d: D3D) => d.source.x)
              .attr('y1', (d: D3D) => d.source.y)
              .attr('x2', (d: D3D) => d.target.x)
              .attr('y2', (d: D3D) => d.target.y);
            tradeLinkG
              .selectAll('line')
              .attr('x1', (d: D3D) => d.source.x)
              .attr('y1', (d: D3D) => d.source.y)
              .attr('x2', (d: D3D) => d.target.x)
              .attr('y2', (d: D3D) => d.target.y);
            ikhtilafLinkG
              .selectAll('line')
              .attr('x1', (d: D3D) => d.source.x)
              .attr('y1', (d: D3D) => d.source.y)
              .attr('x2', (d: D3D) => d.target.x)
              .attr('y2', (d: D3D) => d.target.y);
            updateMinimap();
          })
          .on('end', () => {
            const pad = 60;
            const xs = nodes.filter(n => n.type !== 'prophet').map(n => n.x);
            const ys = nodes.filter(n => n.type !== 'prophet').map(n => n.y);
            if (!xs.length) return;
            const x0 = Math.min(...xs) - pad,
              x1 = Math.max(...xs) + pad;
            const y0 = Math.min(...ys) - pad,
              y1 = Math.max(...ys) + pad;
            const s = Math.min(0.98, W / (x1 - x0), H / (y1 - y0));
            const tx = W / 2 - s * ((x0 + x1) / 2);
            const ty = H / 2 - s * ((y0 + y1) / 2);
            // #region agent log
            debugPost({
              sessionId: 'ea09d6',
              runId: 'run1',
              hypothesisId: 'H13',
              location: 'ConnectionsPage.tsx:1061',
              message: 'sim-end-fit-transform',
              data: { x0, x1, y0, y1, s, tx, ty, width: W, height: H },
              timestamp: Date.now(),
            });
            // #endregion
            svg
              .transition()
              .duration(900)
              .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(s));
          });

        /* ── in-SVG legend ───────────────────────────────── */
        const lH = branches.length * 26 + 46;
        const leg = svg.append('g').attr('transform', `translate(${W - 186},14)`);
        leg
          .append('rect')
          .attr('width', 172)
          .attr('height', lH)
          .attr('rx', 12)
          .attr('fill', 'rgba(255,253,242,.95)')
          .attr('stroke', 'rgba(120,80,20,.2)')
          .attr('stroke-width', 0.9);
        leg
          .append('text')
          .attr('x', 12)
          .attr('y', 20)
          .attr('font-size', 8.5)
          .attr('font-weight', '900')
          .attr('fill', '#8b6008')
          .attr('letter-spacing', '.1em')
          .text('NETWORK MAP');
        branches.forEach((br, i) => {
          const gy = 36 + i * 26;
          leg
            .append('circle')
            .attr('cx', 20)
            .attr('cy', gy)
            .attr('r', 8)
            .attr('fill', br.color + 'cc')
            .attr('stroke', br.color)
            .attr('stroke-width', 1.5);
          leg
            .append('text')
            .attr('x', 34)
            .attr('y', gy + 4)
            .attr('font-size', 9.5)
            .attr('fill', '#1a0e06')
            .text(br.label);
          leg
            .append('text')
            .attr('x', 162)
            .attr('y', gy + 4)
            .attr('text-anchor', 'end')
            .attr('font-size', 9)
            .attr('font-weight', '700')
            .attr('fill', br.color)
            .text(br.companions.length);
        });

        const hintG = svg.append('g').attr('transform', `translate(${W / 2},${H - 14})`);
        hintG
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('font-size', 10)
          .attr('fill', 'rgba(120,80,20,.4)')
          .text('✦  Drag nodes  ·  Click hub to focus  ·  Click ﷺ to reset  ·  Scroll to zoom  ✦');

        /* ── minimap setup ────────────────────────────────── */
        const mmEl = minimapRef.current;
        if (mmEl) {
          const mmSvg = d3.select(mmEl);
          mmSvg.selectAll('*').remove();

          mmLinks_ = mmSvg
            .append('g')
            .selectAll('line')
            .data(linksR)
            .join('line')
            .attr('stroke', (d: D3D) =>
              d.type === 'spoke'
                ? d.target.br
                  ? d.target.br.color
                  : '#888'
                : d.target.color || '#aaa'
            )
            .attr('stroke-width', 0.5)
            .attr('stroke-opacity', 0.4);

          mmNodes_ = mmSvg
            .append('g')
            .selectAll('circle')
            .data(nodes.filter((n: D3D) => n.type !== 'prophet'))
            .join('circle')
            .attr('r', (d: D3D) => (d.type === 'branch' ? 5 : 1.8))
            .attr('fill', (d: D3D) => (d.type === 'branch' ? d.br.color : d.color || '#888'))
            .attr('opacity', 0.9);

          mmSvg
            .append('circle')
            .attr('cx', cx * mmScale)
            .attr('cy', cy * mmScale)
            .attr('r', 4)
            .attr('fill', '#d4a017');

          mmViewport = mmSvg
            .append('rect')
            .attr('fill', 'rgba(212,175,55,.07)')
            .attr('stroke', '#d4af37')
            .attr('stroke-width', 1.5)
            .attr('rx', 2);

          mmEl.addEventListener('click', e => {
            const rect = mmEl.getBoundingClientRect();
            const wx = (e.clientX - rect.left) / mmScale;
            const wy = (e.clientY - rect.top) / mmScale;
            const t = d3.zoomTransform(svgEl!);
            svg
              .transition()
              .duration(400)
              .call(
                zoom.transform,
                d3.zoomIdentity.translate(W / 2 - wx * t.k, H / 2 - wy * t.k).scale(t.k)
              );
          });
        }

        /* ── fly-to helper ────────────────────────────────── */
        function flyToNode(query: string) {
          const q = query.toLowerCase().trim();
          const node = nodes.find(
            n =>
              n.type === 'companion' &&
              (normalizeTransliteration(n.data.name).toLowerCase().includes(q) ||
                n.data.ar.includes(q))
          );
          if (!node) return false;
          const scale = 2.8;
          const tx = W / 2 - node.x * scale;
          const ty = H / 2 - node.y * scale;
          svg
            .transition()
            .duration(900)
            .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
          compGroups
            .filter((n: D3D) => n.id === node.id)
            .select('circle:nth-child(3)')
            .attr('filter', 'url(#gSearch)')
            .transition()
            .delay(950)
            .duration(600)
            .attr('filter', 'url(#gc)');
          return true;
        }

        /* hide loading spinner ASAP once graph is interactive */
        requestAnimationFrame(() => {
          // #region agent log
          debugPost({
            sessionId: 'ea09d6',
            runId: 'run1',
            hypothesisId: 'H10',
            location: 'ConnectionsPage.tsx:1123',
            message: 'raf-before-hide-loading',
            data: { loadDisplayBefore: loadRef.current?.style.display ?? null },
            timestamp: Date.now(),
          });
          // #endregion
          if (loadRef.current) loadRef.current.style.display = 'none';
          // #region agent log
          debugPost({
            sessionId: 'ea09d6',
            runId: 'run1',
            hypothesisId: 'H10',
            location: 'ConnectionsPage.tsx:1124',
            message: 'raf-after-hide-loading',
            data: { loadDisplayAfter: loadRef.current?.style.display ?? null },
            timestamp: Date.now(),
          });
          // #endregion
        });

        d3State.current = {
          compGroups,
          linkEls,
          branchGroups,
          sim,
          zoom,
          svg,
          branches,
          initT,
          nodes,
          nodeMap,
          linksR,
          pathG,
          adjList,
          updateMinimap,
          flyToNode,
          hintG,
          familyLinkG,
          tradeLinkG,
          ikhtilafLinkG,
          teachingLinkG,
          ensureLayerBuilt,
          compareMode: false,
          compareRanks: [],
          onUpdateCompare: null,
        };
        // #region agent log
        debugPost({
          sessionId: 'ea09d6',
          runId: 'run1',
          hypothesisId: 'H6',
          location: 'ConnectionsPage.tsx:1128',
          message: 'initD3-elements-created',
          data: {
            compNodeCount: compGroups.size(),
            baseLinkCount: linkEls.size(),
            branchCount: branchGroups.size(),
            svgChildCount: svgEl?.childElementCount ?? null,
          },
          timestamp: Date.now(),
        });
        // #endregion
      } catch (err) {
        // #region agent log
        debugPost({
          sessionId: 'ea09d6',
          runId: 'run1',
          hypothesisId: 'H4',
          location: 'ConnectionsPage.tsx:1137',
          message: 'initD3-error',
          data: { error: String(err) },
          timestamp: Date.now(),
        });
        // #endregion
        console.error('[ConnectionsInitError]', err);
        if (loadRef.current) {
          loadRef.current.style.display = 'none';
        }
      }
    }

    let initiated = false;
    const minInitWidth = 220;
    const minInitHeight = 120;
    const maybeInit = (width: number, height: number) => {
      // #region agent log
      debugPost({
        sessionId: 'ea09d6',
        runId: 'run1',
        hypothesisId: 'H5',
        location: 'ConnectionsPage.tsx:1148',
        message: 'maybeInit-check',
        data: { width, height, minInitWidth, minInitHeight, initiated },
        timestamp: Date.now(),
      });
      // #endregion
      if (initiated) return;
      if (width > minInitWidth && height > minInitHeight) {
        // #region agent log
        debugPost({
          sessionId: 'ea09d6',
          runId: 'run1',
          hypothesisId: 'H5',
          location: 'ConnectionsPage.tsx:1150',
          message: 'maybeInit-triggered-initD3',
          data: { width, height },
          timestamp: Date.now(),
        });
        // #endregion
        initiated = true;
        ro.disconnect();
        initD3(width, height);
      }
    };
    const ro = new ResizeObserver(entries => {
      if (initiated) return;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        maybeInit(width, height);
        if (initiated) break;
      }
    });
    ro.observe(wrapEl);
    const firstRect = wrapEl.getBoundingClientRect();
    maybeInit(firstRect.width, firstRect.height);
    const loadingFallbackTimer = window.setTimeout(() => {
      if (loadRef.current && loadRef.current.style.display !== 'none') {
        loadRef.current.style.display = 'none';
      }
    }, 3500);

    return () => {
      // #region agent log
      debugPost({
        sessionId: 'ea09d6',
        runId: 'run1',
        hypothesisId: 'H9',
        location: 'ConnectionsPage.tsx:1173',
        message: 'init-effect-cleanup',
        data: {
          graphTab,
          graphView,
          hadD3State: !!d3State.current,
          loadDisplayAtCleanup: loadRef.current?.style.display ?? null,
        },
        timestamp: Date.now(),
      });
      // #endregion
      window.clearTimeout(loadingFallbackTimer);
      ro.disconnect();
      if (d3State.current) {
        d3State.current.sim.stop();
        d3State.current = null;
      }
    };
  }, [graphTab, graphView]);

  /* ── filter effect ──────────────────────────────────── */
  useEffect(() => {
    const s = d3State.current;
    if (!s) return;
    const { compGroups, linkEls, branchGroups, branches } = s;
    const frame = requestAnimationFrame(() => {
      if (activeFilter === 'all') {
        compGroups.style('opacity', 1);
        linkEls.style('opacity', 1);
        branchGroups.classed('active-branch', false);
      } else {
        const br = branches.find((b: D3D) => b.id === activeFilter);
        if (!br) return;
        compGroups.style('opacity', (n: D3D) => (n.brId === br.id ? 1 : 0.07));
        linkEls.style('opacity', (l: D3D) => {
          return l.target.brId === br.id ||
            l.source.id === 'br-' + br.id ||
            l.target.id === 'br-' + br.id
            ? 1
            : 0.04;
        });
        branchGroups.classed('active-branch', (d: D3D) => d.br.id === br.id);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeFilter]);

  /* ── era effect ─────────────────────────────────────── */
  useEffect(() => {
    const s = d3State.current;
    if (!s) return;
    s.compGroups
      .transition()
      .duration(420)
      .style('opacity', (n: D3D) => (activeEra === 'all' || n.era === activeEra ? 1 : 0.06));
  }, [activeEra]);

  /* ── graph layer effect (features 19, 15, 09, 63) ─────── */
  useEffect(() => {
    const s = d3State.current;
    if (!s) return;
    s.ensureLayerBuilt?.(graphLayer);
    performance.mark('connections:layer:start');
    const { linkEls, familyLinkG, tradeLinkG, ikhtilafLinkG, teachingLinkG } = s;
    linkEls.style('display', graphLayer === 'scholarly' ? null : 'none');
    familyLinkG.style('display', graphLayer === 'family' ? null : 'none');
    tradeLinkG.style('display', graphLayer === 'trade' ? null : 'none');
    ikhtilafLinkG.style('display', graphLayer === 'ikhtilaf' ? null : 'none');
    teachingLinkG.style('display', graphLayer === 'teaching' ? null : 'none');
    // #region agent log
    debugPost({
      sessionId: 'ea09d6',
      runId: 'run1',
      hypothesisId: 'H7',
      location: 'ConnectionsPage.tsx:1240',
      message: 'layer-effect-applied',
      data: {
        graphLayer,
        baseDisplay: linkEls.style('display'),
        familyDisplay: familyLinkG.style('display'),
        tradeDisplay: tradeLinkG.style('display'),
        ikhtilafDisplay: ikhtilafLinkG.style('display'),
        teachingDisplay: teachingLinkG.style('display'),
      },
      timestamp: Date.now(),
    });
    // #endregion

    /* for trade layer — scale node sizes by wealth */
    if (graphLayer === 'trade') {
      s.compGroups
        .select('circle:nth-child(3)')
        .transition()
        .duration(400)
        .attr('r', (d: D3D) => {
          const w = WEALTH_LEVELS[d.data.rank] ?? 3;
          return 8 + w * 2.2;
        });
    } else {
      s.compGroups
        .select('circle:nth-child(3)')
        .transition()
        .duration(400)
        .attr('r', (d: D3D) => d.r);
    }
    performance.mark('connections:layer:end');
    performance.measure('connections:layer', 'connections:layer:start', 'connections:layer:end');
  }, [graphLayer]);

  /* ── era slider + event filter effect (18, 20) ──────── */
  useEffect(() => {
    const s = d3State.current;
    if (!s) return;
    const visibleSet = companionsAtEvent ?? companionsByEraYear;
    if (!visibleSet) {
      s.compGroups.transition().duration(400).style('opacity', 1);
      return;
    }
    s.compGroups
      .transition()
      .duration(400)
      .style('opacity', (n: D3D) => (visibleSet.has(n.data.rank) ? 1 : 0.05));
  }, [companionsAtEvent, companionsByEraYear]);

  /* ── compare mode effect (28) ────────────────────────── */
  useEffect(() => {
    const s = d3State.current;
    if (!s) return;
    s.compareMode = compareMode;
    s.compareRanks = compareRanks;
    s.onUpdateCompare = (ranks: D3D) => setCompareRanks([...ranks]);
    if (!compareMode) {
      s.compareRanks = [];
      s.compGroups
        ?.select('circle:nth-child(3)')
        .attr('stroke', (d: D3D) => d.color)
        .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.4));
    }
  }, [compareMode, compareRanks]);

  /* ── dark mode effect ───────────────────────────────── */
  useEffect(() => {
    const svgEl = svgRef.current;
    const wrapEl = wrapRef.current;
    const s = d3State.current;
    if (!svgEl || !wrapEl) return;
    const bg = isDark ? '#08060a' : '#faf8f5';
    svgEl.style.background = bg;
    wrapEl.style.background = bg;
    if (s) {
      s.compGroups
        .selectAll('text:last-of-type')
        .attr('fill', isDark ? 'rgba(255,240,200,.7)' : '#2a1a08');
      s.hintG.select('text').attr('fill', isDark ? 'rgba(200,180,100,.25)' : 'rgba(120,80,20,.4)');
    }
  }, [isDark]);

  /* ── path mode effect ───────────────────────────────── */
  useEffect(() => {
    pathSRef.current.mode = isPathMode;
    if (!isPathMode) {
      pathSRef.current.start = null;
      const s = d3State.current;
      if (s) {
        s.pathG.selectAll('*').remove();
        s.compGroups
          .select('circle:nth-child(3)')
          .attr('stroke', (d: D3D) => d.color)
          .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.4))
          .attr('filter', 'url(#gc)');
      }
      setPathResult(null);
    }
  }, [isPathMode]);

  /* ── search ─────────────────────────────────────────── */
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const s = d3State.current;
      if (!s || !searchQ.trim()) return;
      performance.mark('connections:search:start');
      const found = s.flyToNode(searchQ);
      if (!found) {
        setSearchErr(true);
        setTimeout(() => setSearchErr(false), 900);
      }
      performance.mark('connections:search:end');
      performance.measure(
        'connections:search',
        'connections:search:start',
        'connections:search:end'
      );
    },
    [searchQ]
  );

  /* ── fullscreen ─────────────────────────────────────── */
  const enterFullscreen = () => {
    wrapRef.current?.requestFullscreen?.().catch(() => {});
    setIsFullscreen(true);
  };
  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setIsFullscreen(false);
  };
  useEffect(() => {
    const fn = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener('fullscreenchange', fn);
    return () => document.removeEventListener('fullscreenchange', fn);
  }, []);

  /* ── reset / expand ─────────────────────────────────── */
  const resetAll = () => {
    dispatch({ type: 'resetAll' });
    setPathResult(null);
    setUseEraSlider(false);
    setEventFilter('');
    setCompareRanks([]);
    const s = d3State.current;
    if (!s) return;
    s.svg.transition().duration(700).call(s.zoom.transform, s.initT);
    s.compGroups
      .style('opacity', 1)
      .select('circle:nth-child(3)')
      .attr('stroke', (d: D3D) => d.color)
      .attr('stroke-width', (d: D3D) => (d.data.rank <= 10 ? 2.2 : 1.4))
      .attr('filter', 'url(#gc)');
    s.linkEls.style('opacity', 1);
    s.branchGroups.classed('active-branch', false);
    s.pathG.selectAll('*').remove();
  };
  const expandAll = () => {
    const s = d3State.current;
    if (!s) return;
    s.sim.alpha(0.4).restart();
    s.compGroups.style('opacity', 1);
    s.linkEls.style('opacity', 1);
    s.branchGroups.classed('active-branch', false);
    dispatch({ type: 'setActiveFilter', value: 'all' });
  };

  const exportCurrentCsv = () => {
    exportCompanionsCsv(visibleCompanions, `connections-${graphLayer}-${activeEra}.csv`);
  };

  const exportCurrentPng = () => {
    if (!svgRef.current) return;
    exportSvgAsPng(svgRef.current, `connections-${graphLayer}.png`);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      if (!isCmdK) return;
      e.preventDefault();
      const action = window.prompt(
        'Quick action: reset | compare | path | trade | family | scholarly | exportcsv | exportpng',
        'reset'
      );
      if (!action) return;
      const a = action.trim().toLowerCase();
      if (a === 'reset') resetAll();
      if (a === 'compare') dispatch({ type: 'toggleCompareMode' });
      if (a === 'path') dispatch({ type: 'togglePathMode' });
      if (a === 'trade') dispatch({ type: 'setGraphLayer', value: 'trade' });
      if (a === 'family') dispatch({ type: 'setGraphLayer', value: 'family' });
      if (a === 'scholarly') dispatch({ type: 'setGraphLayer', value: 'scholarly' });
      if (a === 'exportcsv') exportCurrentCsv();
      if (a === 'exportpng') exportCurrentPng();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resetAll, exportCurrentCsv, exportCurrentPng]);

  /* ── count companions alive at event ──────────────────── */
  const aliveCount = companionsAtEvent
    ? companionsAtEvent.size
    : companionsByEraYear
      ? companionsByEraYear.size
      : COMPANIONS.length;

  const visibleCompanions = useMemo(
    () =>
      filterCompanionsByEra(
        filterCompanionsByBranch(COMPANIONS, BRANCHES, activeFilter),
        activeEra
      ),
    [activeEra, activeFilter]
  );

  const saveCurrentView = useCallback(() => {
    const name = window.prompt(
      L('Name this saved view', 'اس محفوظ منظر کا نام درج کریں'),
      'Network view'
    );
    if (!name) return;
    const view = createSavedView(name, uiState);
    const next = [view, ...savedViews].slice(0, 12);
    setSavedViews(next);
    writeSavedViews(next);
  }, [L, savedViews, uiState]);

  const applySavedView = useCallback(
    (id: string) => {
      const view = savedViews.find(v => v.id === id);
      if (!view) return;
      dispatch({ type: 'applySavedView', value: view.state });
      setCompareRanks([]);
      setPathResult(null);
    },
    [savedViews]
  );

  const deleteSavedView = useCallback(
    (id: string) => {
      const next = savedViews.filter(v => v.id !== id);
      setSavedViews(next);
      writeSavedViews(next);
    },
    [savedViews]
  );

  /* ── render ─────────────────────────────────────────── */
  return (
    <div
      className={`${styles.page} ${shellStyles.pageShell} premium-page ${isDark ? styles.dark : ''} ${isDark ? 'connections-dark' : ''}`}
    >
      <div
        className={`${styles.layout} ${shellStyles.layoutFrame}`}
        data-graph-tab={graphTab}
      >
        {/* ══ Vertical tab sidebar — primary navigation ══════════════ */}
        <aside className={styles.tabSidebar}>
          <div className={styles.tabSidebarHead}>
            <span className={styles.tabSidebarOrnament} aria-hidden="true" />
            {L('Atlas Views', 'مناظرِ اطلس')}
            <span className={styles.tabSidebarOrnament} aria-hidden="true" />
          </div>
          {(() => {
            type TabDef = {
              id: GraphTab;
              labelEn: string;
              labelUr: string;
              descEn: string;
              descUr: string;
              icon: JSX.Element;
            };
            type TabGroup = {
              id: string;
              labelEn: string;
              labelUr: string;
              items: TabDef[];
            };
            const TABS: TabDef[] = [
              {
                id: 'graph',
                labelEn: 'Network',
                labelUr: 'نیٹ ورک',
                descEn: 'Relationship graph',
                descUr: 'تعلقاتی گراف',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
                    <circle cx="4" cy="6" r="1.6" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="6" r="1.6" fill="currentColor" stroke="none" />
                    <circle cx="4" cy="18" r="1.6" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="18" r="1.6" fill="currentColor" stroke="none" />
                    <path d="M12 12 4 6M12 12l8-6M12 12 4 18M12 12l8 6" opacity="0.6" />
                  </svg>
                ),
              },
              {
                id: 'growth',
                labelEn: 'Growth',
                labelUr: 'ترقی',
                descEn: 'Conversion timeline',
                descUr: 'قبولِ اسلام کا سلسلہ',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 18 9 12l4 4 8-9" />
                    <path d="M14 5h7v7" />
                  </svg>
                ),
              },
              {
                id: 'journeys',
                labelEn: 'Journeys',
                labelUr: 'سفر',
                descEn: 'Travel and migration',
                descUr: 'سفر و ہجرت',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="9" r="3" />
                    <path d="M12 22s7-7.6 7-13a7 7 0 0 0-14 0c0 5.4 7 13 7 13z" />
                  </svg>
                ),
              },
              {
                id: 'sunnah',
                labelEn: 'Sunnah Tree',
                labelUr: 'شجرۂ سنت',
                descEn: 'Practice preservation',
                descUr: 'سنت کی حفاظت',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21V12" />
                    <path d="M12 12c0-3 2-5 5-5" />
                    <path d="M12 12c0-3-2-5-5-5" />
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="6" cy="9" r="1.6" />
                    <circle cx="18" cy="9" r="1.6" />
                  </svg>
                ),
              },
              {
                id: 'conversion',
                labelEn: 'Conversion Chain',
                labelUr: 'سلسلۂ قبولِ اسلام',
                descEn: 'Who guided whom',
                descUr: 'کس نے کسے ہدایت دی',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 12 7 14a3 3 0 0 1-4-4l3-3a3 3 0 0 1 4 0" />
                    <path d="m15 12 2-2a3 3 0 0 1 4 4l-3 3a3 3 0 0 1-4 0" />
                    <path d="m9 15 6-6" />
                  </svg>
                ),
              },
              {
                id: 'hijra',
                labelEn: 'Hijra Route',
                labelUr: 'راہِ ہجرت',
                descEn: 'Migration to Madinah',
                descUr: 'ہجرتِ مدینہ',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 18c4-2 6 2 10 0s6 2 6 2" />
                    <circle cx="4" cy="18" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
                    <path d="M9 4l2 2-2 2" />
                  </svg>
                ),
              },
              {
                id: 'letters',
                labelEn: 'Letters',
                labelUr: 'مکتوبات',
                descEn: 'Prophetic correspondence',
                descUr: 'نبویﷺ مکاتیب',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                ),
              },
              {
                id: 'testimonies',
                labelEn: 'Testimonies',
                labelUr: 'گواہیاں',
                descEn: 'Peer accounts',
                descUr: 'باہمی شہادات',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 8h6" />
                    <path d="M7 12h4" />
                    <path d="M5 4h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-4l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  </svg>
                ),
              },
              {
                id: 'narration',
                labelEn: 'Narration Map',
                labelUr: 'نقشۂ روایت',
                descEn: 'Hadith transmission',
                descUr: 'حدیثی نقلِ علم',
                icon: (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <path d="M8 6h8" opacity="0.6" />
                    <path d="M8 18h8" opacity="0.6" />
                    <path d="M6 8v8" opacity="0.6" />
                    <path d="M18 8v8" opacity="0.6" />
                  </svg>
                ),
              },
            ];
            const byId = new Map<GraphTab, TabDef>(TABS.map(t => [t.id, t]));
            const pick = (ids: GraphTab[]): TabDef[] =>
              ids.map(id => byId.get(id)).filter((t): t is TabDef => !!t);
            const GROUPS: TabGroup[] = [
              {
                id: 'primary',
                labelEn: 'Primary',
                labelUr: 'بنیادی',
                items: pick(['graph', 'growth', 'journeys']),
              },
              {
                id: 'relations',
                labelEn: 'Relations',
                labelUr: 'تعلقات',
                items: pick(['sunnah', 'conversion', 'hijra']),
              },
              {
                id: 'scholarship',
                labelEn: 'Scholarship',
                labelUr: 'علم و روایت',
                items: pick(['letters', 'testimonies', 'narration']),
              },
            ];
            return GROUPS.map((g, gi) => (
              <div key={g.id} className={styles.tabSidebarGroup}>
                {gi > 0 && (
                  <div className={styles.tabSidebarDivider} aria-hidden="true">
                    <span className={styles.tabSidebarDividerLine} />
                    <span className={styles.tabSidebarDividerLbl}>
                      {L(g.labelEn, g.labelUr)}
                    </span>
                    <span className={styles.tabSidebarDividerLine} />
                  </div>
                )}
                {gi === 0 && (
                  <div className={styles.tabSidebarFirstLbl} aria-hidden="true">
                    {L(g.labelEn, g.labelUr)}
                  </div>
                )}
                {g.items.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`${styles.tabSidebarBtn} ${graphTab === t.id ? styles.tabSidebarBtnActive : ''}`}
                    onClick={() => dispatch({ type: 'setGraphTab', value: t.id })}
                    title={L(t.descEn, t.descUr)}
                  >
                    <span className={styles.tabSidebarIcon}>{t.icon}</span>
                    <span className={styles.tabSidebarBtnBody}>
                      <span className={styles.tabSidebarBtnLbl}>
                        {L(t.labelEn, t.labelUr)}
                      </span>
                      <span className={styles.tabSidebarBtnDesc}>
                        {L(t.descEn, t.descUr)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ));
          })()}

          {/* Custom View Builder — collapsed drawer at the bottom */}
          <details className={styles.tabSidebarBuilder}>
            <summary className={styles.tabSidebarBuilderHead}>
              <span className={styles.tabSidebarBuilderIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className={styles.tabSidebarBuilderTitle}>
                {L('Custom View', 'حسبِ خواہش منظر')}
              </span>
              <span className={styles.tabSidebarBuilderCaret} aria-hidden="true" />
            </summary>
            <div className={styles.tabSidebarBuilderBody}>
              <div className={styles.tabSidebarBuilderHint}>
                {L(
                  'Combine multiple atlas layers into one composite view.',
                  'متعدد سطحیں ایک مرکب منظر میں جوڑیں۔'
                )}
              </div>
              <div className={styles.tabSidebarBuilderList}>
                {[
                  { en: 'Family ties', ur: 'خاندانی روابط' },
                  { en: 'Trade routes', ur: 'تجارتی راستے' },
                  { en: 'Hadith narration', ur: 'حدیثی روایت' },
                  { en: 'Battle presence', ur: 'غزواتی موجودگی' },
                ].map((opt, i) => (
                  <label key={i} className={styles.tabSidebarBuilderItem}>
                    <input type="checkbox" />
                    <span>{L(opt.en, opt.ur)}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                className={styles.tabSidebarBuilderApply}
                disabled
                title={L('Coming soon', 'جلد دستیاب')}
              >
                {L('Apply Custom View', 'منظر لاگو کریں')}
              </button>
            </div>
          </details>
        </aside>

        {/* ══ Lens — bottom-row tools, only on Network tab ══════════ */}
        {!lensOpen && graphTab === 'graph' && (
          <button
            type="button"
            className={styles.lensReopenPill}
            onClick={() => setLensOpen(true)}
          >
            {L('Lens', 'عدسہ')}
          </button>
        )}
        {lensOpen && graphTab === 'graph' && (
        <aside className={`${styles.sidebar} ${sidebarStyles.sidebarPanel}`}>
          <div className={`${styles.brand} ${sidebarStyles.sidebarBrand}`}>
            {L('Connections Network', 'روابط کا نیٹ ورک')}
            <button
              type="button"
              className={styles.lensCloseBtn}
              onClick={() => setLensOpen(false)}
              aria-label={L('Hide Lens', 'عدسہ چھپائیں')}
              title={L('Hide Lens', 'عدسہ چھپائیں')}
            >
              {'×'}
            </button>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              className={`${styles.searchInput} ${searchErr ? styles.searchInputErr : ''}`}
              type="text"
              placeholder={L('Search companion name…', 'صحابی کا نام تلاش کریں…')}
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
            <button className={styles.searchBtn} type="submit">
              ⌖
            </button>
          </form>

          {/* Side tab switch */}
          <div className={styles.sideTabRow}>
            <button
              className={`${styles.sideTab} ${sideTab === 'network' ? styles.sideTabActive : ''}`}
              onClick={() => setSideTab('network')}
              type="button"
            >
              {L('Network', 'نیٹ ورک')}
            </button>
            <button
              className={`${styles.sideTab} ${sideTab === 'stats' ? styles.sideTabActive : ''}`}
              onClick={() => setSideTab('stats')}
              type="button"
            >
              {L('Stats', 'اعداد و شمار')}
            </button>
          </div>

          {sideTab === 'network' && (
            <>
              <div className={`${styles.section} ${sidebarStyles.sectionCard}`}>
                <div className={styles.sectionHeading}>{L('Network Map', 'نیٹ ورک نقشہ')}</div>
                {SIDEBAR_FILTERS.map(f => (
                  <button
                    key={f.id}
                    className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterBtnActive : ''}`}
                    onClick={() => dispatch({ type: 'setActiveFilter', value: f.id })}
                    type="button"
                  >
                    <span className={styles.filterDot} style={{ background: f.dot }} />
                    <span className={styles.filterLabel}>
                      {lang === 'ur'
                        ? f.id === 'all'
                          ? 'تمام شاخیں'
                          : f.id === 'family'
                            ? 'اہلِ بیت'
                            : f.id === 'wives'
                              ? 'امہات المؤمنین'
                              : f.id === 'comp'
                                ? 'قریب ترین صحابہ'
                                : f.id === 'warrior'
                                  ? 'مجاہدین و سالار'
                                  : f.id === 'scholar'
                                    ? 'علما و راوی'
                                    : 'قبولِ اسلام و دیگر'
                        : f.label}
                    </span>
                    <span className={styles.filterCount}>{filterCounts[f.id] ?? 0}</span>
                  </button>
                ))}
              </div>

              {/* Era controls live solely on the Era Lens slider above the
                  graph. Quick-jump pills under that slider replace the
                  Pre-Hijrah / Hijrah / Conquest buttons that used to live
                  here, so era never has two sources of truth. */}
            </>
          )}

          {sideTab === 'stats' && (
            <div className={styles.statsPanel}>
              <div className={styles.statsTabs}>
                <button
                  className={`${styles.stTab} ${statsTab === 'hadiths' ? styles.stTabActive : ''}`}
                  onClick={() => setStatsTab('hadiths')}
                  type="button"
                >
                  {L('Hadiths', 'احادیث')}
                </button>
                <button
                  className={`${styles.stTab} ${statsTab === 'battles' ? styles.stTabActive : ''}`}
                  onClick={() => setStatsTab('battles')}
                  type="button"
                >
                  {L('Battles', 'غزوات')}
                </button>
              </div>
              <div className={styles.statsList}>
                {(statsTab === 'hadiths' ? TOP_HADITHS : TOP_BATTLES).map((c, i) => {
                  const val = statsTab === 'hadiths' ? c.hadiths || 0 : c.battles?.length || 0;
                  const maxVal =
                    statsTab === 'hadiths'
                      ? TOP_HADITHS[0].hadiths || 1
                      : TOP_BATTLES[0].battles?.length || 1;
                  const color = statsTab === 'hadiths' ? '#2a5080' : '#8b3a08';
                  return (
                    <div key={c.rank} className={styles.statRow}>
                      <span className={styles.statIdx}>#{i + 1}</span>
                      <div className={styles.statBody}>
                        <div className={styles.statName}>
                          {c.name.split(' ').slice(0, 3).join(' ')}
                        </div>
                        <div className={styles.statBar}>
                          <div
                            className={styles.statBarFill}
                            style={{ width: `${(val / maxVal) * 100}%`, background: color }}
                          />
                        </div>
                      </div>
                      <span className={styles.statVal}>{val.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {pathResult && (
            <div className={styles.pathResult}>
              {pathResult.hops === -1 ? (
                <div className={styles.pathNoResult}>
                  {L('No path found', 'کوئی راستہ نہیں ملا')}
                </div>
              ) : (
                <>
                  <div className={styles.pathResultTitle}>
                    🔗{' '}
                    {lang === 'ur'
                      ? `${pathResult.hops} قدم فاصلے پر`
                      : `${pathResult.hops} hop${pathResult.hops !== 1 ? 's' : ''} apart`}
                  </div>
                  <div className={styles.pathChain}>
                    {pathResult.names.map((n, i) => (
                      <span key={i}>
                        {i > 0 && <span className={styles.pathArrow}>→</span>}
                        <span className={styles.pathNode}>{n}</span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className={`${styles.section} ${sidebarStyles.sectionCard}`}>
            <div className={styles.sectionHeading}>{L('Graph Layer', 'گراف کی سطح')}</div>
            {LAYER_CONFIG.map((l) => (
              <button
                key={l.id}
                className={`${styles.filterBtn} ${graphLayer === l.id ? styles.filterBtnActive : ''}`}
                onClick={() => dispatch({ type: 'setGraphLayer', value: l.id })}
                type="button"
                title={l.desc}
              >
                <span className={styles.filterDot} style={{ background: l.color }} />
                <span className={styles.filterLabel}>
                  {lang === 'ur'
                    ? l.id === 'scholarly' ? 'علمی روابط'
                    : l.id === 'family' ? 'نسب و نکاح'
                    : l.id === 'trade' ? 'تجارتی نیٹ ورک'
                    : l.id === 'ikhtilaf' ? 'اختلافات'
                    : 'نقلِ علم'
                    : l.label}
                </span>
              </button>
            ))}
          </div>

                    <div className={`${styles.section} ${sidebarStyles.sectionCard}`}>
            <div className={styles.sectionHeading}>{L('View', 'منظر')}</div>
            <div className={styles.controls}>
              <button
                className={`${styles.ctrlBtn} ${graphView === 'diaspora' ? styles.ctrlBtnGold : ''}`}
                onClick={() =>
                  dispatch({
                    type: 'setGraphView',
                    value: graphView === 'network' ? 'diaspora' : 'network',
                  })
                }
                type="button"
              >
                {graphView === 'network'
                  ? L('Diaspora View', 'دیارِ صحابہ نقشہ')
                  : L('← Back to Network', '← واپس نیٹ ورک پر')}
              </button>
              <details className={styles.quickActionMenu}>
                <summary
                  className={styles.ctrlBtn}
                  aria-label={L('More actions', 'مزید آپشنز')}
                >
                  {L('Save · Export', 'محفوظ · برآمد')}
                </summary>
                <div className={styles.quickActionMenuPanel}>
                  <button
                    className={styles.quickActionMenuItem}
                    type="button"
                    onClick={(e) => { closeNearestDetails(e); saveCurrentView(); }}
                  >
                    {L('Save View', 'منظر محفوظ کریں')}
                  </button>
                  <button
                    className={styles.quickActionMenuItem}
                    type="button"
                    onClick={(e) => { closeNearestDetails(e); exportCurrentCsv(); }}
                  >
                    {L('Export CSV', 'سی ایس وی برآمد')}
                  </button>
                  <button
                    className={styles.quickActionMenuItem}
                    type="button"
                    onClick={(e) => { closeNearestDetails(e); exportCurrentPng(); }}
                  >
                    {L('Export PNG', 'پی این جی برآمد')}
                  </button>
                </div>
              </details>
            </div>
          </div>

<div className={`${styles.section} ${sidebarStyles.sectionCard}`}>
            <div className={styles.sectionHeading}>{L('Era Lens', 'زمانی عدسہ')}</div>
            <div className={styles.eraSliderGroup} style={{ padding: '0 10px' }}>
              <label className={styles.eraSliderLabel}>
                <input
                  type="checkbox"
                  className={styles.eraSliderCheck}
                  checked={useEraSlider}
                  onChange={(e) => {
                    setUseEraSlider(e.target.checked);
                    setEventFilter('');
                  }}
                />
                {L('Era:', 'دور:')}{' '}
                <strong>
                  {eraYear < 0
                    ? `${Math.abs(eraYear)} ${L('BH', 'قبل ہجرت')}`
                    : `${eraYear} ${L('AH', 'ہجری')}`}
                </strong>
                <span className={styles.eraLensCount}>
                  {lang === 'ur' ? ` (${aliveCount} زندہ)` : ` (${aliveCount} alive)`}
                </span>
              </label>
              <input
                type="range"
                className={styles.eraLensSlider}
                min={-15}
                max={100}
                step={1}
                value={eraYear}
                disabled={!useEraSlider}
                onChange={(e) => setEraYear(parseInt(e.target.value))}
              />
              <div className={styles.eraSliderTicks}>
                {([
                  { y: -13, en: 'Pre-Islam', ur: 'قبلِ اسلام' },
                  { y: 0, en: 'Hijrah', ur: 'ہجرت' },
                  { y: 2, en: 'Badr', ur: 'بدر' },
                  { y: 8, en: 'Conquest', ur: 'فتحِ مکہ' },
                  { y: 11, en: 'Death of ﷺ', ur: 'وفاتِ نبی ﷺ' },
                  { y: 40, en: '40 AH', ur: '40 ہجری' },
                  { y: 100, en: '100 AH', ur: '100 ہجری' },
                ] as { y: number; en: string; ur: string }[]).map((p) => (
                  <span
                    key={p.y}
                    className={styles.eraSliderTick}
                    onClick={() => {
                      setUseEraSlider(true);
                      setEraYear(p.y);
                      setEventFilter('');
                    }}
                    title={p.en}
                  >
                    {L(p.en, p.ur)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.section} ${sidebarStyles.controlsCard}`}>
            <div className={styles.sectionHeading}>{L('Controls', 'کنٹرول')}</div>
            <div className={styles.controls}>
              <button className={styles.ctrlBtn} onClick={resetAll} type="button">
                ⟳ &nbsp;{L('Reset All', 'ری سیٹ')}
              </button>
              <button className={styles.ctrlBtn} onClick={expandAll} type="button">
                ↔ &nbsp;{L('Expand', 'پھیلائیں')}
              </button>
              <button
                className={`${styles.ctrlBtn} ${isPathMode ? styles.ctrlBtnRed : styles.ctrlBtnPath}`}
                onClick={() => dispatch({ type: 'togglePathMode' })}
                type="button"
              >
                {isPathMode
                  ? L('Cancel Path', 'راستہ منسوخ')
                  : L('Find Path', 'راستہ تلاش')}
              </button>
              <button
                className={`${styles.ctrlBtn} ${compareMode ? styles.ctrlBtnGold : ''}`}
                onClick={() => {
                  dispatch({ type: 'toggleCompareMode' });
                  setCompareRanks([]);
                }}
                type="button"
              >
                {compareMode
                  ? `✕ ${L('Exit Compare', 'موازنہ بند')}`
                  : L('Compare Mode', 'موازنہ موڈ')}
              </button>
              <button
                className={`${styles.ctrlBtn} ${isDark ? styles.ctrlBtnGold : ''}`}
                onClick={toggleTahajjud}
                type="button"
              >
                {isDark ? L('Light', 'دن') : L('Night Mode', 'رات')}
              </button>
              <button
                className={`${styles.ctrlBtn} ${styles.ctrlBtnGold}`}
                onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                type="button"
              >
                {isFullscreen
                  ? L('Exit Full Screen', 'فل اسکرین بند')
                  : L('Full Screen', 'فل اسکرین')}
              </button>
            </div>
          </div>

          {/* Inline help panel removed — onboarding is now a one-line
              hint on the canvas + tooltips on individual controls. */}
        </aside>
        )}

        {/* ══ Main area ══════════════════════════════════ */}
        <div className={`${styles.main} ${shellStyles.mainCanvas}`}>
          {/* Editorial header — bilingual title lockup + live stats chips */}
          <header className={styles.atlasHeader}>
            <div className={styles.atlasHeaderTitleRow}>
              <h1 className={styles.atlasHeaderTitle}>
                {L('Connections Atlas', 'روابط کا اطلس')}
              </h1>
              <span className={styles.atlasHeaderTitleAr} aria-hidden={lang === 'ur'}>
                {lang === 'ur' ? 'Connections Atlas' : 'الأطلس الشبكي'}
              </span>
            </div>
            <div className={styles.atlasHeaderMarqueeWrap} aria-hidden="true">
              <div className={styles.atlasHeaderMarquee}>
                {(() => {
                  const text = L(
                    'Explore relationship layers · conversion chains · journeys · transmission maps · scholarly lineages · prophetic correspondence',
                    'تعلقات · قبولِ اسلام کے سلسلے · اسفار · نقلِ علم · علمی شجرات · مکاتیبِ نبویﷺ'
                  );
                  return (
                    <>
                      <span>{text}</span>
                      <span aria-hidden="true">{text}</span>
                    </>
                  );
                })()}
              </div>
            </div>
            <p className={styles.atlasHeaderSr}>
              {L(
                'Explore relationship layers, conversion chains, journeys, and transmission maps with focused controls.',
                'مرکوز کنٹرولز کے ساتھ تعلقات، قبولِ اسلام کے سلسلے، اسفار، اور نقلِ علم کے نقشے دیکھیں۔'
              )}
            </p>
            <div className={styles.atlasStatsRow} role="status" aria-live="polite">
              <span className={styles.atlasStatChip}>
                <span className={styles.atlasStatDot} style={{ background: '#0f6f5c' }} aria-hidden="true" />
                <strong>{useEraSlider ? aliveCount : COMPANIONS.length}</strong>
                <span>{L('Companions Active', 'فعال صحابہ')}</span>
              </span>
              <span className={styles.atlasStatChip}>
                <span className={styles.atlasStatDot} style={{ background: '#b8860b' }} aria-hidden="true" />
                <strong>9</strong>
                <span>{L('Atlas Views', 'مناظرِ اطلس')}</span>
              </span>
              <span className={styles.atlasStatChip}>
                <span className={styles.atlasStatDot} style={{ background: '#8b1a38' }} aria-hidden="true" />
                <strong>
                  {useEraSlider
                    ? eraYear < 0
                      ? `${Math.abs(eraYear)} ${L('BH', 'ق.ہ.')}`
                      : `${eraYear} ${L('AH', 'ہـ')}`
                    : L('All Eras', 'تمام ادوار')}
                </strong>
                <span>{L('Era Lens', 'دور کا عدسہ')}</span>
              </span>
              <span
                className={`${styles.atlasStatChip} ${styles.atlasStatChipMuted}`}
                title={L('Active graph layer', 'فعال گراف کی سطح')}
              >
                <span className={styles.atlasStatDot} style={{ background: 'currentColor' }} aria-hidden="true" />
                <strong>
                  {(() => {
                    const l = LAYER_CONFIG.find(x => x.id === graphLayer);
                    if (!l) return '—';
                    return lang === 'ur'
                      ? l.id === 'scholarly'
                        ? 'علمی روابط'
                        : l.id === 'family'
                          ? 'نسب و نکاح'
                          : l.id === 'trade'
                            ? 'تجارتی نیٹ ورک'
                            : l.id === 'ikhtilaf'
                              ? 'اختلافات'
                              : 'نقلِ علم'
                      : l.label;
                  })()}
                </strong>
                <span>{L('Layer', 'سطح')}</span>
              </span>
            </div>
          </header>
          <div className={shellStyles.contentCanvas}>
            {/* ── Graph sub-tab bar ─────────────────────── */}
            <div className={`${styles.graphTabBar} ${tabsStyles.topNav}`}>
              {(() => {
                const TABS = [
                  { id: "graph" as GraphTab, labelEn: "Network", labelUr: "نیٹ ورک" },
                  { id: "growth" as GraphTab, labelEn: "Growth", labelUr: "ترقی" },
                  { id: "journeys" as GraphTab, labelEn: "Journeys", labelUr: "سفر" },
                  { id: "sunnah" as GraphTab, labelEn: "Sunnah Tree", labelUr: "شجرۂ سنت" },
                  { id: "conversion" as GraphTab, labelEn: "Conversion Chain", labelUr: "سلسلۂ قبولِ اسلام" },
                  { id: "hijra" as GraphTab, labelEn: "Hijra Route", labelUr: "راہِ ہجرت" },
                  { id: "letters" as GraphTab, labelEn: "Letters", labelUr: "مکتوبات" },
                  { id: "testimonies" as GraphTab, labelEn: "Testimonies", labelUr: "گواہیاں" },
                  { id: "narration" as GraphTab, labelEn: "Narration Map", labelUr: "نقشۂ روایت" },
                ];
                const PRIMARY = TABS.slice(0, 3);
                const MORE = TABS.slice(3);
                const moreActive = MORE.find((x) => x.id === graphTab);
                return (
                  <>
                    {PRIMARY.map((t) => (
                      <button
                        key={t.id}
                        className={`${styles.graphTabBtn} ${graphTab === t.id ? styles.graphTabActive : ""}`}
                        onClick={() => dispatch({ type: "setGraphTab", value: t.id })}
                        type="button"
                      >
                        {L(t.labelEn, t.labelUr)}
                      </button>
                    ))}
                    <details className={styles.tabMoreMenu}>
                      <summary
                        className={`${styles.graphTabBtn} ${moreActive ? styles.graphTabActive : ""}`}
                      >
                        {moreActive ? L(moreActive.labelEn, moreActive.labelUr) : L("More", "مزید")}
                        {" ▾"}
                      </summary>
                      <div className={styles.tabMoreMenuPanel}>
                        {MORE.map((t) => (
                          <button
                            key={t.id}
                            className={`${styles.tabMoreMenuItem} ${graphTab === t.id ? styles.tabMoreMenuItemActive : ""}`}
                            onClick={() => dispatch({ type: "setGraphTab", value: t.id })}
                            type="button"
                          >
                            {L(t.labelEn, t.labelUr)}
                          </button>
                        ))}
                      </div>
                    </details>
                  </>
                );
              })()}
            </div>

            {/* ── Network tab ───────────────────────────── */}
            {graphTab === 'graph' && (
              <>
                {/* Layer toggles (features 19, 15, 09) + View toggle (22) */}
                {!lensOpen && (
                  <div className={`${styles.layerBar} ${tabsStyles.controlRow}`}>
                    <div className={styles.layerBarLeft}>
                      <span className={styles.layerBarLabel}>
                        {L('Graph Layer:', 'گراف کی سطح:')}
                      </span>
                    {LAYER_CONFIG.map(l => (
                      <button
                        key={l.id}
                        className={`${styles.layerBtn} ${graphLayer === l.id ? styles.layerBtnActive : ''}`}
                        style={
                          graphLayer === l.id
                            ? {
                                borderColor: l.color,
                                color: isDarkHex(l.color) ? 'rgba(255,255,255,.98)' : '#1a1208',
                                background: l.color + (isDarkHex(l.color) ? '66' : '33'),
                              }
                            : undefined
                        }
                        onClick={() => dispatch({ type: 'setGraphLayer', value: l.id })}
                        type="button"
                        title={L(
                          l.desc,
                          l.id === 'scholarly'
                            ? 'بنیادی نیٹ ورک — تعلیم و روایت کے روابط'
                            : l.id === 'family'
                              ? 'خونی اور ازدواجی رشتوں کا نیٹ ورک'
                              : l.id === 'trade'
                                ? 'تجارتی تعلقات؛ نوڈ کا سائز مالداری کے مطابق'
                                : l.id === 'ikhtilaf'
                                  ? 'علمی و سیاسی اختلافات — متضاد آراء'
                                  : 'صحابی → تابعی براہِ راست تدریسی سلسلہ — علم کیسے پھیلا'
                        )}
                      >
                        {lang === 'ur'
                          ? l.id === 'scholarly'
                            ? 'علمی روابط'
                            : l.id === 'family'
                              ? 'نسب و نکاح'
                              : l.id === 'trade'
                                ? 'تجارتی نیٹ ورک'
                                : l.id === 'ikhtilaf'
                                  ? 'اختلافات'
                                  : 'نقلِ علم'
                          : l.label}
                      </button>
                      ))}
                    </div>
                    <div className={`${styles.layerBarRight} ${tabsStyles.actionCluster}`}>
                    {/* Diaspora stays a visible toggle since it changes
                        the canvas itself; Save / CSV / PNG are infrequent
                        and now live behind a single kebab. */}
                    <button
                      className={`${styles.viewToggleBtn} ${graphView === 'diaspora' ? styles.viewToggleActive : ''}`}
                      onClick={() =>
                        dispatch({
                          type: 'setGraphView',
                          value: graphView === 'network' ? 'diaspora' : 'network',
                        })
                      }
                      type="button"
                    >
                      {graphView === 'network'
                        ? L('Diaspora View', 'دیارِ صحابہ نقشہ')
                        : L('← Back to Network', '← واپس نیٹ ورک پر')}
                    </button>
                    <details className={styles.quickActionMenu}>
                      <summary
                        className={styles.quickActionBtn}
                        aria-label={L('More actions', 'مزید آپشنز')}
                      >
                        {'⋯'}
                      </summary>
                      <div className={styles.quickActionMenuPanel}>
                        <button
                          className={styles.quickActionMenuItem}
                          type="button"
                          onClick={(e) => { closeNearestDetails(e); saveCurrentView(); }}
                        >
                          {L('Save View', 'منظر محفوظ کریں')}
                        </button>
                        <button
                          className={styles.quickActionMenuItem}
                          type="button"
                          onClick={(e) => { closeNearestDetails(e); exportCurrentCsv(); }}
                        >
                          {L('Export CSV', 'سی ایس وی برآمد')}
                        </button>
                        <button
                          className={styles.quickActionMenuItem}
                          type="button"
                          onClick={(e) => { closeNearestDetails(e); exportCurrentPng(); }}
                        >
                          {L('Export PNG', 'پی این جی برآمد')}
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
                )}

                {/* State chips removed — active layer / filter / era are
                    already visible in the Lens column, so showing them
                    again here was duplicate signal. Compare-mode and path-
                    mode now have their own status banners below. */}

                {savedViews.length > 0 && (
                  <div className={`${styles.savedViewsBar} ${tabsStyles.savedViewsStrip}`}>
                    <span className={styles.savedViewsLabel}>
                      {L('Saved Views:', 'محفوظ مناظر:')}
                    </span>
                    {savedViews.map(v => (
                      <span key={v.id} className={styles.savedViewItem}>
                        <button
                          type="button"
                          className={styles.savedViewBtn}
                          onClick={() => applySavedView(v.id)}
                        >
                          {v.name}
                        </button>
                        <button
                          type="button"
                          className={styles.savedViewDelete}
                          aria-label={L('Delete saved view', 'محفوظ منظر حذف کریں')}
                          onClick={() => deleteSavedView(v.id)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Era Lens — single source of truth for the era control.
                    Lives in the Lens sidebar by default; this canvas-bar copy
                    is only shown when the Lens is hidden so the user still has
                    access to the era slider. Quick-jump pills under the slider
                    snap it to landmark dates (Hijrah · Badr · Conquest of
                    Mecca · Death of the Prophet ﷺ). */}
                {!lensOpen && (
                <div className={styles.eraControlBar}>
                  <div className={styles.eraSliderGroup}>
                    <label className={styles.eraSliderLabel}>
                      <input
                        type="checkbox"
                        className={styles.eraSliderCheck}
                        checked={useEraSlider}
                        onChange={e => {
                          setUseEraSlider(e.target.checked);
                          setEventFilter('');
                        }}
                      />
                      {L('Era Lens:', 'زمانی عدسہ:')}{' '}
                      <strong>
                        {eraYear < 0
                          ? `${Math.abs(eraYear)} ${L('BH', 'قبل ہجرت')}`
                          : `${eraYear} ${L('AH', 'ہجری')}`}
                      </strong>
                      <span className={styles.eraLensCount}>
                        {lang === 'ur' ? ` (${aliveCount} صحابہ زندہ)` : ` (${aliveCount} alive)`}
                      </span>
                    </label>
                    <input
                      type="range"
                      className={styles.eraLensSlider}
                      min={-15}
                      max={100}
                      step={1}
                      value={eraYear}
                      disabled={!useEraSlider}
                      onChange={e => setEraYear(parseInt(e.target.value))}
                    />
                    <div className={styles.eraSliderTicks}>
                      {(
                        [
                          { y: -13, en: 'Pre-Islam', ur: 'قبلِ اسلام' },
                          { y: 0, en: 'Hijrah', ur: 'ہجرت' },
                          { y: 2, en: 'Badr', ur: 'بدر' },
                          { y: 8, en: 'Conquest of Mecca', ur: 'فتحِ مکہ' },
                          { y: 11, en: 'Death of Prophet ﷺ', ur: 'وفاتِ نبی ﷺ' },
                          { y: 40, en: '40 AH', ur: '40 ہجری' },
                          { y: 100, en: '100 AH', ur: '100 ہجری' },
                        ] as { y: number; en: string; ur: string }[]
                      ).map(p => (
                        <span
                          key={p.y}
                          className={styles.eraSliderTick}
                          onClick={() => {
                            setUseEraSlider(true);
                            setEraYear(p.y);
                            setEventFilter('');
                          }}
                          title={p.en}
                        >
                          {L(p.en, p.ur)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                )}

                {!lensOpen && (
                <div className={styles.connectionsNetworkBar}>
                  <span className={styles.cnBarLabel}>
                    {L('Connections Network', 'روابط کا نیٹ ورک')}
                  </span>
                  <div className={styles.cnBarChips}>
                    {SIDEBAR_FILTERS.map((f) => (
                      <button
                        key={f.id}
                        className={`${styles.cnBarChip} ${activeFilter === f.id ? styles.cnBarChipActive : ''}`}
                        onClick={() => dispatch({ type: 'setActiveFilter', value: f.id })}
                        type="button"
                      >
                        <span className={styles.cnBarDot} style={{ background: f.dot }} />
                        <span className={styles.cnBarChipLabel}>
                          {lang === 'ur'
                            ? f.id === 'all' ? 'تمام شاخیں'
                            : f.id === 'family' ? 'اہلِ بیت'
                            : f.id === 'wives' ? 'امہات المؤمنین'
                            : f.id === 'comp' ? 'قریب ترین صحابہ'
                            : f.id === 'warrior' ? 'مجاہدین و سالار'
                            : f.id === 'scholar' ? 'علما و راوی'
                            : 'قبولِ اسلام و دیگر'
                            : f.label}
                        </span>
                        <span className={styles.cnBarChipCount}>{filterCounts[f.id] ?? 0}</span>
                      </button>
                    ))}
                  </div>
                </div>
                )}


                {/* Compare mode banner */}
                {compareMode && (
                  <div className={styles.compareBanner}>
                    <strong>{L('Compare Mode', 'موازنہ موڈ')}</strong>{' '}
                    {L('— Click', '— گراف پر کلک کریں')} <em>{L('two', 'دو')}</em>{' '}
                    {L('companions on the graph.', 'صحابہ کا انتخاب کریں۔')}&nbsp;
                    {compareRanks.length === 0 &&
                      L('Select first companion…', 'پہلا صحابی منتخب کریں…')}
                    {compareRanks.length === 1 && (
                      <>
                        <span style={{ color: '#ffd700' }}>
                          ✓ {COMPANIONS.find(c => c.rank === compareRanks[0])?.name}
                        </span>{' '}
                        {L('selected — now select second…', 'منتخب ہو گیا — اب دوسرا منتخب کریں…')}
                      </>
                    )}
                    {compareRanks.length === 2 && (
                      <span style={{ color: '#44cc88' }}>
                        {L(
                          'Both selected ↓ See comparison panel below',
                          'دونوں منتخب ہو گئے ↓ نیچے موازنہ پینل دیکھیں'
                        )}
                      </span>
                    )}
                  </div>
                )}

                {isPathMode && (
                  <div className={styles.pathBanner}>
                    <strong>{L('Path Finder', 'راستہ تلاش')}</strong>{' '}
                    {L('— Click any', '— پہلے کسی بھی')} <em>{L('first', 'پہلے')}</em>{' '}
                    {L(
                      'companion (turns green), then click a',
                      'صحابی پر کلک کریں (سبز ہو جائے گا)، پھر'
                    )}{' '}
                    <em>{L('second', 'دوسرے')}</em>{' '}
                    {L(
                      'to reveal their connection chain',
                      'پر کلک کر کے دونوں کے درمیان رابطہ چین دیکھیں'
                    )}
                  </div>
                )}

                {/* Network or Diaspora */}
                {graphView === 'network' ? (
                  <div
                    ref={wrapRef}
                    className={`${styles.graphWrapper} ${graphStyles.canvasFrame} ${isFullscreen ? styles.isFullscreen : ''}`}
                  >
                    {isFullscreen && (
                      <>
                        <div className={styles.fsTitle}>
                          {L('Companion Connections Network', 'صحابہ کے باہمی روابط کا نیٹ ورک')}
                        </div>
                        <button className={styles.fsExitBtn} type="button" onClick={exitFullscreen}>
                          ✕ &nbsp;{L('Exit Fullscreen', 'فل اسکرین بند کریں')}
                        </button>
                      </>
                    )}
                    <div ref={loadRef} className={styles.loading}>
                      <div className={styles.spinner} />
                      <span>
                        {L(
                          `Loading ${COMPANIONS.length} Companion Network…`,
                          `${COMPANIONS.length} صحابہ کا نیٹ ورک لوڈ ہو رہا ہے…`
                        )}
                      </span>
                    </div>
                    <svg
                      ref={svgRef}
                      className={styles.svg}
                      role="img"
                      aria-label={`Interactive force-directed graph showing ${COMPANIONS.length} Companions of the Prophet ﷺ grouped by scholarly, family, warrior, and narrator connections. Use the accessible table below for a keyboard-navigable view.`}
                    />
                    <div ref={tipRef} className={styles.nodeTooltip} />
                    <div className={styles.minimapWrap}>
                      <div className={styles.minimapHeader}>{L('Overview', 'اجمالی نقشہ')}</div>
                      <svg ref={minimapRef} className={styles.minimap} width="164" height="114" />
                    </div>
                  </div>
                ) : (
                  <DiasporaView companions={COMPANIONS} isDark={isDark} />
                )}

                {/* Accessible table fallback for keyboard/screen-reader users */}
                <NetworkAccessibleTable />

                {/* Comparison panel (28) — shown below graph when 2 nodes selected */}
                {compareMode && compareRanks.length === 2 && (
                  <ComparePanel
                    rankA={compareRanks[0]}
                    rankB={compareRanks[1]}
                    onClear={() => {
                      setCompareRanks([]);
                    }}
                  />
                )}

                {/* ── Editorial bottom shelf — Related Insights + Did You Know ── */}
                <AtlasBottomShelf lang={lang} />
              </>
            )}

            {/* ── Growth sub-tab (21) ────────────────────── */}
            {graphTab === 'growth' && (
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                    Loading growth animation…
                  </div>
                }
              >
                <GrowthAnimation />
              </Suspense>
            )}

            {/* ── Journeys sub-tab (17) ─────────────────── */}
            {graphTab === 'journeys' && (
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
                    Loading journeys map…
                  </div>
                }
              >
                <JourneysMap forceDark={isDark} />
              </Suspense>
            )}
            {graphTab === 'sunnah' && <SunnahTreeView />}
            {graphTab === 'conversion' && <ConversionChainView />}
            {graphTab === 'hijra' && <HijraRouteView />}
            {graphTab === 'letters' && <CorrespondenceArchive />}
            {graphTab === 'testimonies' && <PeerTestimonyView />}
            {graphTab === 'narration' && <NarrationMapView />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ATLAS BOTTOM SHELF — Related Insights cards + Did You Know rotator
   Sits below the Network graph; uses the inline-controls layout's
   reclaimed bottom space rather than leaving it dead beige. */
function AtlasBottomShelf({ lang }: { lang: 'en' | 'ur' }) {
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);

  const insights: { en: string; ur: string; descEn: string; descUr: string; href: string; icon: JSX.Element }[] = [
    {
      en: 'Battle Matrix',
      ur: 'غزوات میٹرکس',
      descEn: 'Who fought where, when',
      descUr: 'کس نے کہاں جنگ کی',
      href: '/insights',
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m14 4 6 6-12 12H2v-6Z" />
          <path d="m14 10 6-6" />
        </svg>
      ),
    },
    {
      en: 'Hadith Legacy',
      ur: 'حدیثی وراثت',
      descEn: 'Top narrators',
      descUr: 'اعلیٰ راوی',
      href: '/insights',
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      en: 'Conversion Waves',
      ur: 'قبولِ اسلام کی لہریں',
      descEn: 'How Islam spread',
      descUr: 'اسلام کی توسیع',
      href: '/insights',
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
          <path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
        </svg>
      ),
    },
    {
      en: 'Imam Chain',
      ur: 'سلسلۂ ائمہ',
      descEn: 'Scholarly lineages',
      descUr: 'علمی شجرات',
      href: '/imams',
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M12 8v2M12 14v2" />
        </svg>
      ),
    },
  ];

  const facts: { en: string; ur: string }[] = [
    {
      en: 'Abu Hurairah narrated 5,374 hadiths — the most of any companion.',
      ur: 'حضرت ابو ہریرہؓ نے 5,374 احادیث روایت کیں — سب سے زیادہ۔',
    },
    {
      en: 'Aisha (ra) issued more legal rulings than any other female companion.',
      ur: 'حضرت عائشہؓ نے کسی بھی صحابیہ سے زیادہ فقہی فتاوی صادر فرمائے۔',
    },
    {
      en: 'Khalid ibn al-Walid never lost a battle in over 100 engagements.',
      ur: 'حضرت خالد بن ولیدؓ 100 سے زائد معرکوں میں کبھی شکست نہ کھائی۔',
    },
    {
      en: 'The Ten Promised Paradise were named in a single hadith by the Prophet ﷺ.',
      ur: 'عشرہ مبشرہ کا تذکرہ نبی کریمﷺ کی ایک ہی حدیث میں ہے۔',
    },
    {
      en: 'Bilal (ra) became the first muezzin of Islam after his emancipation.',
      ur: 'حضرت بلالؓ آزادی کے بعد اسلام کے پہلے مؤذن بنے۔',
    },
  ];
  const [factIdx, setFactIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFactIdx(i => (i + 1) % facts.length), 7000);
    return () => clearInterval(t);
  }, [facts.length]);

  return (
    <div className={styles.atlasShelf}>
      <div className={styles.atlasShelfRelated}>
        <div className={styles.atlasShelfHead}>
          <span className={styles.atlasShelfHeadAccent} aria-hidden="true" />
          <span className={styles.atlasShelfHeadLbl}>
            {L('Related Insights', 'متعلقہ بصیرتیں')}
          </span>
          <span className={styles.atlasShelfHeadCount}>{insights.length}</span>
        </div>
        <div className={styles.atlasShelfStrip}>
          {insights.map((it, i) => (
            <a key={i} href={it.href} className={styles.atlasShelfCard}>
              <span className={styles.atlasShelfCardIcon}>{it.icon}</span>
              <span className={styles.atlasShelfCardBody}>
                <span className={styles.atlasShelfCardTitle}>
                  {L(it.en, it.ur)}
                </span>
                <span className={styles.atlasShelfCardDesc}>
                  {L(it.descEn, it.descUr)}
                </span>
              </span>
              <span className={styles.atlasShelfCardArrow} aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.atlasShelfFact}>
        <span className={styles.atlasShelfFactLbl}>
          {L('Did You Know', 'کیا آپ جانتے ہیں')}
        </span>
        <span className={styles.atlasShelfFactQuote} key={factIdx}>
          {L(facts[factIdx].en, facts[factIdx].ur)}
        </span>
        <div className={styles.atlasShelfFactDots} aria-hidden="true">
          {facts.map((_, i) => (
            <span
              key={i}
              className={`${styles.atlasShelfFactDot} ${i === factIdx ? styles.atlasShelfFactDotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FEATURE 66 — SUNNAH PRESERVATION TREE
   ════════════════════════════════════════════════════════════*/
function SunnahTreeView() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['cat-worship']));
  const node = selected ? SUNNAH_TREE_NODES.find(n => n.id === selected) : null;

  const cats = SUNNAH_TREE_NODES.filter(n => n.type === 'category');
  const practices = SUNNAH_TREE_NODES.filter(n => n.type === 'practice');

  const toggleCat = (id: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.stPage}>
      <div className={styles.stHeader}>
        <h2 className={styles.stTitle}>{L('The Sunnah Preservation Tree', 'شجرۂ تحفظِ سنت')}</h2>
        <p className={styles.stIntro}>
          {L(
            'Every major Islamic practice branching from the companion who preserved and transmitted it. If that companion had died earlier, the practice might have been lost.',
            'ہر بڑی اسلامی عبادت اور عمل اُس صحابی سے جڑی ہوئی دکھائی گئی ہے جس نے اسے محفوظ اور منتقل کیا۔ اگر وہ صحابی پہلے وفات پا جاتے تو یہ عمل شاید ہم تک نہ پہنچتا۔'
          )}
        </p>
      </div>
      <div className={styles.stLayout}>
        <div className={styles.stTree}>
          {cats.map(cat => (
            <div key={cat.id} className={styles.stCatBlock}>
              <button
                className={styles.stCatBtn}
                style={{ borderLeftColor: cat.color, color: cat.color }}
                onClick={() => toggleCat(cat.id)}
              >
                <span>{expandedCats.has(cat.id) ? '▼' : '▶'}</span>
                <span className={`${styles.stCatAr} ar`}>{cat.labelAr}</span>
                <span>{cat.label}</span>
                <span className={styles.stCatCount}>
                  {practices.filter(p => cat.children?.includes(p.id)).length}
                </span>
              </button>
              {expandedCats.has(cat.id) && (
                <div className={styles.stPractices}>
                  {practices
                    .filter(p => cat.children?.includes(p.id))
                    .map(p => (
                      <button
                        key={p.id}
                        className={`${styles.stPracticeBtn} ${selected === p.id ? styles.stPracticeActive : ''}`}
                        style={
                          selected === p.id
                            ? { borderLeftColor: p.color, background: p.color + '15' }
                            : { borderLeftColor: p.color + '60' }
                        }
                        onClick={() => setSelected(selected === p.id ? null : p.id)}
                      >
                        <span className={styles.stPracticeName}>{p.label}</span>
                        {p.companionName && (
                          <span className={styles.stPracticeComp} style={{ color: p.color }}>
                            → {p.companionName}
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.stDetail}>
          {node ? (
            <div className={styles.stDetailCard} style={{ borderColor: node.color }}>
              <div className={styles.stDetailAr}>
                <span className={`${styles.stDetailArText} ar`}>{node.labelAr}</span>
              </div>
              <h3 style={{ color: node.color }}>{node.label}</h3>
              {node.companionName && (
                <div className={styles.stDetailComp}>
                  {L('Preserved by:', 'جس صحابی نے محفوظ کیا:')}{' '}
                  <strong style={{ color: node.color }}>{node.companionName}</strong>
                </div>
              )}
              {node.description && <p className={styles.stDetailDesc}>{node.description}</p>}
              {node.whyVital && (
                <div className={styles.stVital}>
                  <strong>{L('Why Vital:', 'اہم کیوں؟')}</strong> {node.whyVital}
                </div>
              )}
              {node.source && <span className={styles.stDetailSource}>{node.source}</span>}
            </div>
          ) : (
            <div className={styles.stDetailEmpty}>
              <p>
                {L(
                  'Select a practice from the tree to see which companion preserved it and why it was vital.',
                  'درخت سے کوئی عمل منتخب کریں تاکہ معلوم ہو کہ اسے کس صحابی نے محفوظ کیا اور وہ کیوں اہم ہے۔'
                )}
              </p>
              <p className={styles.stDetailEmptySub}>
                {L(
                  'Each practice traces back to a single companion who witnessed, transmitted, or preserved it — making their life essential to Islamic practice today.',
                  'ہر عمل ایک ایسے صحابی سے جڑتا ہے جس نے اسے دیکھا، روایت کیا یا محفوظ کیا — اسی سے آج ہماری عبادت مکمل ہوتی ہے۔'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FEATURE 70 — CONVERSION CHAIN
   ════════════════════════════════════════════════════════════*/
const GROUP_COLORS: Record<string, string> = {
  prophet: 'var(--color-accent)',
  wife: '#a07f2c',
  family: '#a07f2c',
  companion: '#2a4570',
  'freed-slave': '#4a4a7a',
  other: '#4a7060',
};

function ConversionChainView() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const selNode = selected ? CONVERSION_NODES.find(n => n.id === selected) : null;

  const convertedBy = useMemo(() => {
    const map: Record<string, string[]> = {};
    CONVERSION_NODES.forEach(n => {
      if (n.convertedBy) {
        (map[n.convertedBy] = map[n.convertedBy] || []).push(n.id);
      }
    });
    return map;
  }, []);

  const categories = ['all', 'prophet', 'family', 'companion', 'freed-slave'];
  const filtered =
    filter === 'all' ? CONVERSION_NODES : CONVERSION_NODES.filter(n => n.category === filter);

  const renderNode = (nodeId: string, depth: number = 0) => {
    const n = CONVERSION_NODES.find(nd => nd.id === nodeId);
    if (!n) return null;
    const children = convertedBy[nodeId] || [];
    const isSelected = selected === nodeId;
    return (
      <div
        key={nodeId}
        className={`${styles.cvNode} ${graphStyles.conversionRow}`}
        style={{ marginLeft: depth * 20 }}
      >
        <button
          className={`${styles.cvNodeBtn} ${isSelected ? styles.cvNodeActive : ''}`}
          style={{
            borderLeftColor: n.color,
            background: isSelected ? n.color + '20' : undefined,
          }}
          onClick={() => setSelected(isSelected ? null : nodeId)}
        >
          <span className={`${styles.cvAr} ar`}>{n.nameAr}</span>
          <span className={styles.cvName} style={{ color: n.color }}>
            {n.name}
          </span>
          <span className={styles.cvYear}>{n.year}</span>
          {children.length > 0 && (
            <span className={styles.cvChain} style={{ color: n.color }}>
              ↳ {children.length}
            </span>
          )}
        </button>
        {isSelected && n.note && <div className={styles.cvNote}>{n.note}</div>}
        {children
          .filter(cid => {
            const cn = CONVERSION_NODES.find(nd => nd.id === cid);
            return filter === 'all' || cn?.category === filter;
          })
          .map(cid => renderNode(cid, depth + 1))}
      </div>
    );
  };

  return (
    <div className={`${styles.cvPage} ${graphStyles.conversionPage}`}>
      <div className={styles.cvHeader}>
        <h2 className={styles.cvTitle}>
          {L(
            'The Conversion Chain — Who Brought Whom to Islam',
            'سلسلۂ قبولِ اسلام — کس نے کسے اسلام تک پہنچایا'
          )}
        </h2>
        <p className={styles.cvIntro}>
          {L(
            "A tree showing the conversion genealogy of the first Muslims. Abu Bakr personally brought Uthman, Talha, Zubayr, Sa'd, Abu Ubayda, Abd al-Rahman, and Bilal to Islam — making him the most influential recruiter in history after the Prophet ﷺ himself.",
            'ابتدائی مسلمانوں کے قبولِ اسلام کا شجرہ، کہ کون کس کے ذریعے مسلمان ہوا۔ سیدنا ابوبکر رضی اللہ عنہ نے خود عثمان، طلحہ، زبیر، سعد، ابو عبیدہ، عبد الرحمن بن عوف اور بلال وغیرہ کو اسلام کی طرف بلایا — یوں نبی کریم ﷺ کے بعد سب سے زیادہ لوگوں کے اسلام لانے کا سبب بنے۔'
          )}
        </p>
      </div>
      <div className={styles.cvFilters}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.cvFilter} ${filter === cat ? styles.cvFilterActive : ''}`}
            style={
              filter === cat
                ? { borderColor: GROUP_COLORS[cat] || '#888', color: GROUP_COLORS[cat] || '#888' }
                : {}
            }
            onClick={() => setFilter(cat)}
          >
            {lang === 'ur'
              ? cat === 'all'
                ? 'سب'
                : cat === 'prophet'
                  ? 'نبی ﷺ'
                  : cat === 'family'
                    ? 'اہلِ بیت'
                    : cat === 'companion'
                      ? 'صحابہ'
                      : 'آزاد شدہ غلام'
              : cat === 'prophet'
                ? 'Prophet'
                : cat === 'family'
                  ? 'Family'
                  : cat === 'companion'
                    ? 'Companions'
                    : cat === 'freed-slave'
                      ? 'Freed slaves'
                      : 'All'}
          </button>
        ))}
      </div>
      <div className={`${styles.cvTree} ${graphStyles.conversionTree}`}>
        {renderNode('prophet')}
      </div>
      {selNode && (
        <div className={styles.cvDetail} style={{ borderColor: selNode.color }}>
          <strong style={{ color: selNode.color }}>{selNode.name}</strong>
          <span className={`ar ${styles.cvDetailAr}`}>{selNode.nameAr}</span>
          <span>{selNode.year}</span>
          {selNode.note && <p>{selNode.note}</p>}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FEATURE 71 — HIJRA ROUTE ANIMATED MAP
   ════════════════════════════════════════════════════════════*/
/* Day-by-day category indicators were emoji glyphs; replaced with empty
   strings so the day list renders as a clean tag + label list. The
   category color (CAT_COLORS_L) still encodes the type. */
const CAT_ICON: Record<string, string> = {
  departure: '',
  hiding: '',
  travel: '',
  encounter: '',
  rest: '',
  arrival: '',
};

function HijraRouteView() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [activeDay, setActiveDay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = HIJRA_STOPS[activeDay];

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActiveDay(d => {
          if (d >= HIJRA_STOPS.length - 1) {
            setPlaying(false);
            return d;
          }
          return d + 1;
        });
      }, 2000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  // Map coordinates: Arabian Peninsula lng 37-42, lat 20-26
  const mapLng = [37, 43];
  const mapLat = [20.5, 25.5];
  const W = 600,
    H = 360;
  const toX = (lng: number) => ((lng - mapLng[0]) / (mapLng[1] - mapLng[0])) * W;
  const toY = (lat: number) => H - ((lat - mapLat[0]) / (mapLat[1] - mapLat[0])) * H;

  return (
    <div className={styles.hrPage}>
      <div className={styles.hrHeader}>
        <h2 className={styles.hrTitle}>
          {L('The Hijra Route — Day-by-Day Journey', 'راہِ ہجرت — دن بہ دن سفر')}
        </h2>
        <p className={styles.hrIntro}>
          {L(
            "The Prophet ﷺ and Abu Bakr's 14-day journey from Mecca to Medina in 622 CE. Every stop, encounter, and miracle — animated day by day.",
            'نبی کریم ﷺ اور سیدنا ابوبکر رضی اللہ عنہ کا مکہ سے مدینہ تک ۱۴ روزہ سفر، ۶۲۲ء میں۔ ہر پڑاؤ، ہر ملاقات اور ہر کرامت کو دن بہ دن دکھایا گیا ہے۔'
          )}
        </p>
      </div>
      <div className={styles.hrLayout}>
        <div className={styles.hrMapWrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.hrSvg}>
            <rect width={W} height={H} fill="var(--color-surface2)" rx={8} />
            {/* Desert texture */}
            <text x={300} y={180} textAnchor="middle" fontSize={100} opacity={0.05} fill="var(--color-text)">
            </text>
            {/* Route line */}
            <polyline
              points={HIJRA_STOPS.map(s => `${toX(s.lng)},${toY(s.lat)}`).join(' ')}
              fill="none"
              stroke="var(--color-border-md)"
              strokeWidth={2}
              strokeDasharray="4,4"
            />
            {/* Stops */}
            {HIJRA_STOPS.map((s, i) => {
              const x = toX(s.lng),
                y = toY(s.lat);
              const isActive = i === activeDay;
              const isPast = i < activeDay;
              return (
                <g key={i} style={{ cursor: 'pointer' }} onClick={() => setActiveDay(i)}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 12 : 7}
                    fill={isActive ? s.color : isPast ? s.color + '88' : 'var(--color-disabled-text)'}
                    stroke={isActive ? 'var(--color-bg)' : 'transparent'}
                    strokeWidth={2}
                  />
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={1}
                      opacity={0.5}
                    >
                      <animate
                        attributeName="r"
                        from="12"
                        to="24"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <text
                    x={x}
                    y={y + (isActive ? 26 : 18)}
                    textAnchor="middle"
                    fontSize={isActive ? 9 : 7}
                    fill={isActive ? 'var(--color-bg)' : 'var(--color-muted)'}
                  >
                    {s.name.split('—')[0].split(' ').slice(0, 2).join(' ')}
                  </text>
                </g>
              );
            })}
            {/* Labels */}
            <text
              x={toX(39.82)}
              y={toY(21.42) + 40}
              textAnchor="middle"
              fontSize={8}
              fill="var(--color-text)"
            >
              Mecca
            </text>
            <text
              x={toX(39.61)}
              y={toY(24.47) - 20}
              textAnchor="middle"
              fontSize={8}
              fill="var(--color-text-soft)"
            >
              Medina
            </text>
          </svg>
        </div>
        <div className={styles.hrTimeline}>
          <div className={styles.hrControls}>
            <button
              className={styles.hrPlayBtn}
              onClick={() => setPlaying(p => !p)}
              style={{ background: playing ? 'var(--color-danger)' : 'var(--color-accent)' }}
            >
              {playing ? L('⏸ Pause', '⏸ روکیں') : L('▶ Play Journey', '▶ سفر چلائیں')}
            </button>
            <span className={styles.hrDayBadge}>
              {L('Day', 'دن')} {stop.day}
            </span>
          </div>
          <div className={styles.hrStops}>
            {HIJRA_STOPS.map((s, i) => (
              <button
                key={i}
                className={`${styles.hrStop} ${activeDay === i ? styles.hrStopActive : ''}`}
                style={activeDay === i ? { borderLeftColor: s.color } : {}}
                onClick={() => setActiveDay(i)}
              >
                <span className={styles.hrStopIcon}>{CAT_ICON[s.category]}</span>
                <span className={styles.hrStopName}>{s.name}</span>
                <span className={styles.hrStopDay}>
                  {L('Day', 'دن')} {s.day}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.hrDetail} style={{ borderColor: stop.color }}>
        <div className={styles.hrDetailHeader}>
          <span className={styles.hrCatBadge} style={{ background: stop.color }}>
            {CAT_ICON[stop.category]} {stop.category}
          </span>
          <span className={styles.hrDetailName} style={{ color: stop.color }}>
            {stop.name}
          </span>
          <span className={`${styles.hrDetailAr} ar`}>{stop.nameAr}</span>
          {stop.note && <span className={styles.hrDetailNote}>{stop.note}</span>}
        </div>
        <p className={styles.hrEvent}>{stop.event}</p>
        <div className={styles.hrCompanions}>
          <strong>{L('Present:', 'موجود صحابہ:')}</strong> {stop.companions.join(' · ')}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ■ FEATURE 88 · CORRESPONDENCE ARCHIVE
// -------------------------------------------------------
const CAT_COLORS_L: Record<string, string> = {
  governance: '#2a493d',
  military: '#7a3030',
  theological: '#2a4570',
  personal: '#a07f2c',
  political: '#4a7060',
};

function CorrespondenceArchive() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [selected, setSelected] = useState<(typeof COMPANION_LETTERS)[number] | null>(null);
  const [catFilter, setCatFilter] = useState('all');
  const cats = ['all', 'governance', 'military', 'political', 'theological'];
  const filtered =
    catFilter === 'all'
      ? COMPANION_LETTERS
      : COMPANION_LETTERS.filter(l => l.category === catFilter);

  return (
    <div className={styles.corrPage}>
      <div className={styles.sectionTitle}>
        {L('Companion-to-Companion Correspondence Archive', 'صحابہ کے درمیان مکتوبات کا آرکائیو')}
      </div>
      <p className={styles.intro}>
        {L(
          'Every documented letter exchanged between companions — with Arabic excerpts, full context, and historical significance. These letters shaped the governance, military strategy, and theology of the early Islamic state.',
          'ہر وہ مکتوب جو ایک صحابی نے دوسرے صحابی کو لکھا، یہاں اکٹھا ہے — عربی اقتباسات، مکمل پس منظر اور تاریخی اہمیت کے ساتھ۔ انہی خطوط نے ابتدائی اسلامی ریاست کی حکمتِ عملی، نظامِ حکومت اور دینی فکر کو تشکیل دیا۔'
        )}
      </p>
      <div className={styles.corrCats}>
        {cats.map(c => (
          <button
            key={c}
            className={`${styles.corrCatBtn} ${catFilter === c ? styles.corrCatActive : ''}`}
            style={
              catFilter === c && c !== 'all'
                ? { borderColor: CAT_COLORS_L[c], color: CAT_COLORS_L[c] }
                : {}
            }
            onClick={() => setCatFilter(c)}
          >
            {lang === 'ur'
              ? c === 'all'
                ? 'سب'
                : c === 'governance'
                  ? 'حکومت'
                  : c === 'military'
                    ? 'فوجی امور'
                    : c === 'political'
                      ? 'سیاسی'
                      : 'عقیدتی'
              : c === 'all'
                ? 'All'
                : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.corrGrid}>
        {filtered.map(l => (
          <button
            key={l.id}
            className={`${styles.corrCard} ${selected?.id === l.id ? styles.corrCardActive : ''}`}
            style={{ borderTopColor: l.fromColor }}
            onClick={() => setSelected(selected?.id === l.id ? null : l)}
          >
            <div className={styles.corrCardHeader}>
              <span className={styles.corrFrom} style={{ color: l.fromColor }}>
                {L('From:', 'بھیجنے والے:')} {l.from}
              </span>
              <span className={styles.corrTo}>
                {L('To:', 'موصول کنندہ:')} {l.to}
              </span>
            </div>
            <span className={styles.corrSubject}>{l.subject}</span>
            <span className={styles.corrYear}>{l.year}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className={styles.corrDetail} style={{ borderColor: selected.fromColor }}>
          <div className={styles.corrDetailHeader}>
            <span className={styles.corrDetailFrom} style={{ color: selected.fromColor }}>
              {selected.from} ? {selected.to}
            </span>
            <span className={styles.corrDetailYear}>{selected.year}</span>
          </div>
          <h3 className={styles.corrDetailTitle}>{selected.subject}</h3>
          <blockquote className={`${styles.corrAr} ar`}>{selected.excerptAr}</blockquote>
          <blockquote className={styles.corrEn}>{selected.excerptEn}</blockquote>
          <p className={styles.corrContext}>{selected.fullContextEn}</p>
          <div className={styles.corrSig}>
            <strong>{L('Historical Significance:', 'تاریخی اہمیت:')}</strong>{' '}
            {selected.historicalSignificance}
          </div>
          <span className={styles.corrSource}>{selected.source}</span>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ■ FEATURE 89 · PEER TESTIMONY ARCHIVE
// -------------------------------------------------------
const TEST_COLORS = {
  praise: '#2a493d',
  critique: '#7a3030',
  factual: '#2a4570',
  grief: '#6a2858',
};

function PeerTestimonyView() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [aboutFilter, setAboutFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const uniqueAbout = [...new Set(PEER_TESTIMONIES.map(t => t.about))].sort();
  const filtered = aboutFilter
    ? PEER_TESTIMONIES.filter(t => t.about === aboutFilter)
    : PEER_TESTIMONIES;

  return (
    <div className={styles.testPage}>
      <div className={styles.sectionTitle}>
        {L('What Companions Said About Each Other', 'صحابہ نے ایک دوسرے کے بارے میں کیا کہا')}
      </div>
      <p className={styles.intro}>
        {L(
          "Every recorded statement a companion made about another companion — peer testimonies from the people who knew them best. Never compiled digitally in this form. Sourced from Sahih Bukhari, Sahih Muslim, Tabaqat Ibn Sa'd, and Hilyat al-Awliya.",
          'ہر وہ قول جس میں ایک صحابی نے کسی دوسرے صحابی کے بارے میں رائے دی — اُن ہی لوگوں کی گواہیاں جو انہیں سب سے بہتر جانتے تھے۔ اس انداز سے یہ مواد پہلے کبھی ڈیجیٹل شکل میں جمع نہیں ہوا۔ مراجع: صحیح بخاری، صحیح مسلم، طبقات ابن سعد، حلیۃ الاولیاء وغیرہ۔'
        )}
      </p>
      <div className={styles.testFilter}>
        <strong>{L('Filter by subject:', 'کن صحابی کے بارے میں؟')}</strong>
        <button
          className={`${styles.testFilterBtn} ${!aboutFilter ? styles.testFilterActive : ''}`}
          onClick={() => setAboutFilter(null)}
        >
          {L('All', 'سب')}
        </button>
        {uniqueAbout.map(a => (
          <button
            key={a}
            className={`${styles.testFilterBtn} ${aboutFilter === a ? styles.testFilterActive : ''}`}
            onClick={() => setAboutFilter(aboutFilter === a ? null : a)}
          >
            {a.split(' ').slice(0, 3).join(' ')}
          </button>
        ))}
      </div>
      <div className={styles.testList}>
        {filtered.map((t, i) => (
          <div
            key={i}
            className={`${styles.testCard} ${expanded === i ? styles.testCardOpen : ''}`}
            style={{ borderLeftColor: TEST_COLORS[t.category] }}
          >
            <div
              className={styles.testCardHeader}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className={styles.testMeta}>
                <span className={styles.testSpeaker} style={{ color: t.speakerColor }}>
                  {t.speaker}
                </span>
                <span className={styles.testAbout}>
                  on <strong>{t.about}</strong>
                </span>
                <span className={styles.testRel}>{t.relationship}</span>
              </div>
              <span
                className={styles.testCatBadge}
                style={{
                  background: TEST_COLORS[t.category] + '22',
                  color: TEST_COLORS[t.category],
                }}
              >
                {t.category}
              </span>
            </div>
            <blockquote className={styles.testQuote} style={{ borderLeftColor: t.speakerColor }}>
              {t.testimony}
            </blockquote>
            {expanded === i && (
              <>
                <p className={styles.testContext}>{t.context}</p>
                <span className={styles.testSource}>{t.source}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ■ FEATURE 93 · COMPANION-TO-COMPANION NARRATION MAP
// -------------------------------------------------------
function NarrationMapView() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.narPage}>
      <div className={styles.sectionTitle}>
        {L('Companion-to-Companion Hadith Narration Map', 'صحابی سے صحابی تک روایت کا نقشہ')}
      </div>
      <p className={styles.intro}>
        {L(
          'Instances where one companion narrated a hadith from another companion (not from the Prophet ﷺ directly) — a second-order transmission map revealing who trusted whom as a scholarly source and the informal hierarchy among companions.',
          'وہ مواقع جہاں ایک صحابی نے براہِ راست کسی دوسرے صحابی سے حدیث روایت کی (نہ کہ براہِ راست نبی ﷺ سے) — دوسری سطح کی یہ سند ہمیں بتاتی ہے کہ علم میں کون کسے اپنا معتبر ماخذ سمجھتا تھا، اور صحابہ کے درمیان غیر رسمی علمی درجہ بندی کیا تھی۔'
        )}
      </p>
      <div className={styles.narGrid}>
        {C2C_NARRATIONS.map((n, i) => (
          <div
            key={i}
            className={`${styles.narCard} ${selected === i ? styles.narCardActive : ''}`}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className={styles.narChain}>
              <span className={styles.narNode} style={{ color: n.narratorColor }}>
                {n.narrator}
              </span>
              <span className={styles.narArrow}>→</span>
              <span className={styles.narNode} style={{ color: '#d4a820' }}>
                {n.source}
              </span>
            </div>
            <span className={styles.narSubject}>{n.subject}</span>
            {selected === i && (
              <div className={styles.narDetail}>
                <div className={styles.narRel}>{n.relationship}</div>
                <blockquote className={styles.narHadith}>{n.hadith}</blockquote>
                <div className={styles.narWhy}>
                  <strong>{L('Why significant:', 'اہمیت کی وجہ:')}</strong> {n.whySignificant}
                </div>
                <span className={styles.narSource}>{n.sourceRef}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
