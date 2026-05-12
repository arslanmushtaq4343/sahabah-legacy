import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Companion } from '../../types';
import { CAT_COLORS } from '../../data/companions';
import { useLanguage } from '../../context/LanguageContext';
import { COMPANION_UR_OVERRIDES, type CompanionUrOverride } from '../../data/companionsUr';
import { useT } from '../../i18n/useT';
import {
  PROPHETIC_DUAS,
  OCCUPATIONS,
  DREAMS,
  FAMILY_TREES,
  SOURCE_CLAIMS,
  RELIABILITY_META,
  type ReliabilityLevel,
} from '../../data/companionExtras';
import { COMPANION_CLAIM_CONFIDENCE, type ConfidenceLevel } from '../../data/companionDataQuality';
import { COMPANION_AUTHENTICITY_SCORE } from '../../data/companionDataQuality';
import { normalizeTransliteration, normalizeTransliterationList } from '../../data/transliteration';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { quranRecitationUrl } from '../../utils/audio';
import { confidenceToStrength, reliabilityToStrength } from '../../utils/sourceConfidence';
import { SourceStrengthBadge } from '../source/SourceStrengthBadge';
import { LAST_WORDS_DATA } from '../../data/lastWords';
import { QURAN_TRIGGERS } from '../../data/quranTriggers';
import { QURAN_TRIGGER_REFS } from '../../data/companionExtras';
import {
  KARAMAT_DATA,
  PROPHETIC_PRAISE,
  COMPANION_POEMS,
  WEAPONS_DATA,
  GIFTS_DATA,
  POW_DATA,
  NAMED_ANIMALS,
  LAND_GRANTS,
  BATTLE_WOUNDS,
} from '../../data/companionsExtra2';
import type { ReadingLevel } from './CompanionsPage';
import { DedicationGenerator, CompanionVoice } from './ModalOverlays';
import {
  getTafsirByCompanion,
  QURAN_MEM_REGISTRY,
  LEGACY_SCORES,
} from '../../data/companionsExtra4';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import styles from './CompanionModal.module.css';
import SegmentsTab from './SegmentsTab';

type ModalTab = 'profile' | 'segments' | 'quran' | 'family' | 'miracles' | 'poetry' | 'tafsir';

interface Props {
  companion: Companion;
  onClose: () => void;
  readingLevel?: ReadingLevel;
  isStudied?: boolean;
  onToggleStudied?: () => void;
}

function radarData(c: Companion) {
  return [
    { subject: 'Hadiths', value: Math.min(100, Math.round((c.hadiths / 5374) * 100)) },
    { subject: 'Battles', value: Math.min(100, c.battles.length * 12) },
    { subject: 'Scholarship', value: c.cat === 'scholar' || c.cat === 'narrator' ? 85 : 40 },
    { subject: 'Sacrifice', value: c.cat === 'martyr' || c.cat === 'warrior' ? 90 : 50 },
    { subject: 'Leadership', value: c.cat === 'caliph' || c.cat === 'general' ? 95 : 45 },
    { subject: 'Legacy', value: c.rank <= 5 ? 100 : c.rank <= 15 ? 75 : 55 },
  ];
}

const PLACE_ATMOSPHERE = {
  mecca: { primary: '#b8860b', secondary: '#8B4513', particleDir: 'up', speed: 'slow' },
  medina: { primary: '#2d6a4f', secondary: '#1b4332', particleDir: 'gentle', speed: 'slow' },
  syria: { primary: '#4a5568', secondary: '#2d3748', particleDir: 'left', speed: 'medium' },
  persia: { primary: '#553c9a', secondary: '#44337a', particleDir: 'spiral', speed: 'medium' },
  yemen: { primary: '#c05621', secondary: '#7b341e', particleDir: 'down', speed: 'fast' },
  default: { primary: '#4a5568', secondary: '#2d3748', particleDir: 'up', speed: 'slow' },
} as const;

type PlaceAtmosphereKey = keyof typeof PLACE_ATMOSPHERE;
type ParticleDir = (typeof PLACE_ATMOSPHERE)[PlaceAtmosphereKey]['particleDir'];
type ParticleSpeed = (typeof PLACE_ATMOSPHERE)[PlaceAtmosphereKey]['speed'];

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseYear(text?: string): number | null {
  if (!text) return null;
  const match = text.match(/(\d{3,4})/);
  return match ? Number(match[1]) : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computeBreathDuration(born?: string, death?: string): string {
  const b = parseYear(born);
  const d = parseYear(death);
  const lifespanRaw = b && d && d > b ? d - b : 60;
  const lifespan = clamp(lifespanRaw, 20, 100);
  const t = (lifespan - 20) / (100 - 20);
  // lifespan 20 => 2.5s, lifespan 100 => 8s
  const seconds = 2.5 + t * (8 - 2.5);
  return `${seconds.toFixed(2)}s`;
}

function getPlaceAtmosphere(place?: string): {
  key: PlaceAtmosphereKey;
  primary: string;
  secondary: string;
  particleDir: ParticleDir;
  speed: ParticleSpeed;
} {
  const p = (place || '').toLowerCase();
  if (p.includes('mecca') || p.includes('makkah'))
    return { key: 'mecca', ...PLACE_ATMOSPHERE.mecca };
  if (p.includes('medina') || p.includes('madinah') || p.includes('yathrib'))
    return { key: 'medina', ...PLACE_ATMOSPHERE.medina };
  if (p.includes('syria') || p.includes('sham') || p.includes('damascus'))
    return { key: 'syria', ...PLACE_ATMOSPHERE.syria };
  if (
    p.includes('persia') ||
    p.includes('iran') ||
    p.includes('fars') ||
    p.includes('kufa') ||
    p.includes('basra')
  )
    return { key: 'persia', ...PLACE_ATMOSPHERE.persia };
  if (p.includes('yemen') || p.includes('aden') || p.includes('hadramawt'))
    return { key: 'yemen', ...PLACE_ATMOSPHERE.yemen };
  return { key: 'default', ...PLACE_ATMOSPHERE.default };
}

function battleClass(
  battleCount: number
): 'battle0' | 'battleLow' | 'battleMed' | 'battleHigh' | 'battleMax' {
  if (battleCount <= 0) return 'battle0';
  if (battleCount <= 5) return 'battleLow';
  if (battleCount <= 15) return 'battleMed';
  if (battleCount <= 30) return 'battleHigh';
  return 'battleMax';
}

function tabTint(tab: ModalTab, catColor: string): string {
  if (tab === 'profile') return `${catColor}0A`; // ~4% opacity in hex
  if (tab === 'segments') return 'rgba(10,8,4,.04)';
  if (tab === 'quran') return 'rgba(184,134,11,.03)';
  if (tab === 'tafsir') return 'rgba(26,52,98,.03)';
  if (tab === 'family') return 'rgba(160,60,100,.03)';
  if (tab === 'miracles') return 'rgba(220,245,255,.03)';
  if (tab === 'poetry') return 'rgba(210,210,210,.03)';
  return 'rgba(255,255,255,.02)';
}

/* ─── Source reliability badge ──────────────────────────────────────── */
function ReliabilityBadge({ level }: { level: ReliabilityLevel }) {
  const m = RELIABILITY_META[level];
  return (
    <span
      className={styles.reliabilityBadge}
      style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}55` }}
    >
      {m.label}
    </span>
  );
}

function ConfidenceBadge({ level, label }: { level: ConfidenceLevel; label: string }) {
  return <SourceStrengthBadge strength={confidenceToStrength(level)} label={label} compact />;
}

function ConfidenceLegend({ t, compact = false }: { t: (key: any) => string; compact?: boolean }) {
  return (
    <section className={styles.confidenceLegend}>
      <span className={styles.confidenceLegendLabel}>
        {compact ? t('comp.modal.confidence.tabNote') : t('comp.modal.confidence.guide')}
      </span>
      <span className={styles.confidenceLegendItem}>
        <SourceStrengthBadge strength="strong" compact />{' '}
        {t('comp.modal.confidence.highDesc')}
      </span>
      <span className={styles.confidenceLegendItem}>
        <SourceStrengthBadge strength="moderate" compact />{' '}
        {t('comp.modal.confidence.mediumDesc')}
      </span>
      <span className={styles.confidenceLegendItem}>
        <SourceStrengthBadge strength="weak" compact />{' '}
        {t('comp.modal.confidence.contextualDesc')}
      </span>
      <span className={styles.confidenceLegendItem}>
        <SourceStrengthBadge strength="disputed" compact /> flagged or rejected report
      </span>
    </section>
  );
}

function CategorySig({
  cat,
  color,
  reducedMotion,
}: {
  cat: string;
  color: string;
  reducedMotion: boolean;
}) {
  const kind =
    cat === 'caliph'
      ? 'caliph'
      : cat === 'warrior'
        ? 'warrior'
        : cat === 'scholar'
          ? 'scholar'
          : cat === 'wife'
            ? 'wife'
            : cat === 'narrator'
              ? 'narrator'
              : cat === 'general'
                ? 'general'
                : cat === 'martyr'
                  ? 'martyr'
                  : 'companion';

  return (
    <svg
      className={[styles.catSig, styles[`catSig_${kind}`], reducedMotion ? styles.catSigStatic : '']
        .filter(Boolean)
        .join(' ')}
      viewBox="0 0 60 60"
      width={60}
      height={60}
      aria-hidden="true"
      style={{ '--sig-color': color } as React.CSSProperties}
    >
      {/* caliph: 8-point star */}
      {kind === 'caliph' && (
        <g className={styles.sigStar}>
          <path d="M30 6 L36 18 L50 22 L38 30 L50 38 L36 42 L30 54 L24 42 L10 38 L22 30 L10 22 L24 18 Z" />
          <circle cx="30" cy="30" r="4" />
        </g>
      )}

      {/* warrior: diagonal slash sweep */}
      {kind === 'warrior' && (
        <g className={styles.sigSlash}>
          <rect x="8" y="28" width="44" height="4" rx="2" />
          <path d="M12 46 L48 14" />
        </g>
      )}

      {/* scholar: Arabic fragments (ع ل م) */}
      {kind === 'scholar' && (
        <g className={styles.sigLetters}>
          <text x="14" y="34">
            ع
          </text>
          <text x="28" y="32">
            ل
          </text>
          <text x="40" y="36">
            م
          </text>
        </g>
      )}

      {/* wife: geometric flower */}
      {kind === 'wife' && (
        <g className={styles.sigFlower}>
          <circle cx="30" cy="30" r="4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="16"
              rx="4.5"
              ry="8"
              transform={`rotate(${i * 45} 30 30)`}
            />
          ))}
        </g>
      )}

      {/* narrator: scroll unfurl */}
      {kind === 'narrator' && (
        <g className={styles.sigScroll}>
          <path d="M18 18 h20 a6 6 0 0 1 0 12 H18 a6 6 0 0 1 0 -12 Z" />
          <path d="M18 30 h24 a6 6 0 0 1 0 12 H18 a6 6 0 0 1 0 -12 Z" />
        </g>
      )}

      {/* general: compass needle */}
      {kind === 'general' && (
        <g className={styles.sigCompass}>
          <circle cx="30" cy="30" r="18" />
          <path d="M30 14 L34 30 L30 46 L26 30 Z" />
        </g>
      )}

      {/* martyr: rising particle */}
      {kind === 'martyr' && (
        <g className={styles.sigMartyr}>
          <circle cx="30" cy="42" r="3.5" />
        </g>
      )}

      {/* companion/other/family: pulse ring */}
      {kind === 'companion' && (
        <g className={styles.sigPulse}>
          <circle cx="30" cy="30" r="10" />
          <circle cx="30" cy="30" r="18" />
        </g>
      )}
    </svg>
  );
}

/* ─── Family Tree SVG ────────────────────────────────────────────────── */
function FamilyTreeView({ rank, color }: { rank: number; color: string }) {
  const tree = FAMILY_TREES[rank];
  if (!tree) {
    return <p className={styles.noData}>Family tree not yet available for this companion.</p>;
  }

  const nodeW = 110,
    nodeH = 40,
    gapX = 130,
    gapY = 80;
  const selfNode = tree.nodes.find(n => n.isCompanion && n.companionRank === rank);
  const others = tree.nodes.filter(n => !(n.isCompanion && n.companionRank === rank));

  // Simple layout: self in centre row, others fanned around
  const layout: Record<string, { x: number; y: number }> = {};
  if (selfNode) layout[selfNode.id] = { x: 260, y: 120 };
  const parents = others.filter(n => {
    const e = tree.edges.find(e => e.from === n.id && e.to === (selfNode?.id ?? ''));
    return !!e;
  });
  const children = others.filter(n => {
    const e = tree.edges.find(e => e.from === (selfNode?.id ?? '') && e.to === n.id);
    return !!e;
  });
  const siblings = others.filter(n => !parents.includes(n) && !children.includes(n));

  parents.forEach((n, i) => {
    layout[n.id] = { x: 90 + i * gapX, y: 40 };
  });
  children.forEach((n, i) => {
    layout[n.id] = { x: 40 + i * (gapX - 10), y: 200 };
  });
  siblings.forEach((n, i) => {
    layout[n.id] = { x: 500 + i * (gapX - 20), y: 120 };
  });

  const allNodes = tree.nodes;
  const svgW = 640,
    svgH = 280;

  return (
    <div className={styles.familyTreeWrap}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className={styles.familySvg}>
        {/* Edges */}
        {tree.edges.map((e, i) => {
          const f = layout[e.from],
            t = layout[e.to];
          if (!f || !t) return null;
          return (
            <line
              key={i}
              x1={f.x + nodeW / 2}
              y1={f.y + nodeH / 2}
              x2={t.x + nodeW / 2}
              y2={t.y + nodeH / 2}
              stroke={color + '66'}
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          );
        })}
        {/* Nodes */}
        {allNodes.map(n => {
          const pos = layout[n.id];
          if (!pos) return null;
          const isSelf = n.isCompanion && n.companionRank === rank;
          return (
            <g key={n.id} transform={`translate(${pos.x},${pos.y})`}>
              <rect
                width={nodeW}
                height={nodeH}
                rx={6}
                fill={isSelf ? color + '33' : '#f0ece0'}
                stroke={isSelf ? color : '#c8b88a'}
                strokeWidth={isSelf ? 2 : 1}
              />
              <text
                x={nodeW / 2}
                y={14}
                textAnchor="middle"
                fontSize={9}
                fill="#2a1a08"
                fontFamily="Amiri, serif"
              >
                {n.labelAr || ''}
              </text>
              <text x={nodeW / 2} y={28} textAnchor="middle" fontSize={8.5} fill="#3a2a10">
                {n.label}
              </text>
              <text x={nodeW / 2} y={38} textAnchor="middle" fontSize={7} fill={color}>
                {n.rel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODAL COMPONENT
   ═════════════════════════════════════════════════════════════════════ */
export default function CompanionModal({
  companion: c,
  onClose,
  readingLevel = 'adult',
  isStudied = false,
  onToggleStudied,
}: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const urOv: CompanionUrOverride = COMPANION_UR_OVERRIDES[c.rank] ?? {};
  const [tab, setTab] = useState<ModalTab>('profile');
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [showDedication, setShowDedication] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [displayedAuthenticity, setDisplayedAuthenticity] = useState(0);
  const [displayedRank, setDisplayedRank] = useState(0);
  const [entrancePhase, setEntrancePhase] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const data = radarData(c);
  const confidence = COMPANION_CLAIM_CONFIDENCE[c.rank];
  const authenticityScore = COMPANION_AUTHENTICITY_SCORE[c.rank] ?? 40;

  const duas = PROPHETIC_DUAS[c.rank] ?? [];
  const occupation = OCCUPATIONS[c.rank];
  const dreams = DREAMS[c.rank] ?? [];
  const sources = SOURCE_CLAIMS[c.rank] ?? [];
  const lastWords = LAST_WORDS_DATA.filter(
    lw => lw.companionRank === c.rank || lw.companion === c.name
  );
  const qtRefs = QURAN_TRIGGER_REFS[c.rank] ?? [];
  const qtEntries = qtRefs.map(id => QURAN_TRIGGERS.find(q => q.id === id)).filter(Boolean);

  // Feature 51-62 data
  const karamat = KARAMAT_DATA[c.rank] ?? [];
  const praise = PROPHETIC_PRAISE[c.rank] ?? [];
  const poems = COMPANION_POEMS[c.rank] ?? [];
  const gifts = GIFTS_DATA[c.rank] ?? [];
  const powRecords = POW_DATA.filter(p => p.companionRank === c.rank);
  const animals = NAMED_ANIMALS.filter(a => a.ownerRank === c.rank);
  const landGrants = LAND_GRANTS.filter(l => l.companionRank === c.rank);
  const wounds = BATTLE_WOUNDS[c.rank] ?? [];
  const weapons = WEAPONS_DATA.filter(w => w.custodianRank === c.rank);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const requestClose = useRef(onClose);
  useEffect(() => {
    requestClose.current = onClose;
  }, [onClose]);

  const closeWithAnimation = () => {
    if (reducedMotion) {
      requestClose.current();
      return;
    }
    if (isClosing) return;
    setIsClosing(true);
    // Let CSS exit animation play, then unmount.
    window.setTimeout(() => requestClose.current(), 220);
  };

  useBodyScrollLock(true);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && closeWithAnimation();
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [reducedMotion, isClosing]);

  useEffect(() => {
    // Reset entrance sequence per open/companion
    if (reducedMotion) {
      setEntrancePhase(5);
      setDisplayedRank(c.rank);
      setDisplayedAuthenticity(authenticityScore);
      return;
    }

    setEntrancePhase(0);
    setDisplayedRank(0);
    setDisplayedAuthenticity(0);
    const timers: number[] = [];

    // 0ms: start Arabic draw immediately
    timers.push(window.setTimeout(() => setEntrancePhase(1), 0));
    // 600ms: English name starts sliding
    timers.push(window.setTimeout(() => setEntrancePhase(2), 600));
    // 1200ms: category stamp
    timers.push(window.setTimeout(() => setEntrancePhase(3), 1200));
    // 1400ms: start count-ups (rank + authenticity)
    timers.push(window.setTimeout(() => setEntrancePhase(4), 1400));
    // 2900ms: rest fade in
    timers.push(window.setTimeout(() => setEntrancePhase(5), 2900));

    return () => {
      timers.forEach(id => window.clearTimeout(id));
    };
  }, [c.rank, authenticityScore, reducedMotion]);

  // Count-up animations (rank + authenticity)
  useEffect(() => {
    if (reducedMotion) return;
    if (entrancePhase < 4) return;

    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayedRank(Math.round(0 + (c.rank - 0) * eased));
      setDisplayedAuthenticity(Math.round(0 + (authenticityScore - 0) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [entrancePhase, reducedMotion, c.rank, authenticityScore]);

  const color = CAT_COLORS[c.cat] || '#b8860b';
  const norm = (value: string) => normalizeTransliteration(value);
  const breathDuration = useMemo(() => computeBreathDuration(c.born, c.death), [c.born, c.death]);
  const battleCount = c.battles?.length ?? 0;
  const battleFx = battleClass(battleCount);
  const atmosphere = useMemo(() => getPlaceAtmosphere(c.place), [c.place]);
  const tabAtmosphereTint = useMemo(() => tabTint(tab, color), [tab, color]);
  const hadiths = c.hadiths ?? 0;
  const hadithScrollSize = useMemo(() => Math.min(hadiths / 10, 20), [hadiths]);
  const hadithScrollPct = useMemo(
    () => `${Math.round((hadithScrollSize / 20) * 100)}%`,
    [hadithScrollSize]
  );
  const confidenceLabel: Record<ConfidenceLevel, string> = {
    high: 'Strong',
    medium: 'Moderate',
    contextual: 'Weak',
  };

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const quoteSectionRef = useRef<HTMLElement | null>(null);
  const quoteObserverRef = useRef<IntersectionObserver | null>(null);
  const [quoteRevealed, setQuoteRevealed] = useState(false);
  const tabTimersRef = useRef<number[]>([]);
  const particleRafRef = useRef<number>(0);

  const handleTabClick = (next: ModalTab) => {
    if (next === tab) return;
    if (reducedMotion) {
      setTab(next);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
      return;
    }
    setIsTabTransitioning(true);
    const t1 = window.setTimeout(() => {
      setTab(next);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;
      const t2 = window.setTimeout(() => setIsTabTransitioning(false), 200);
      tabTimersRef.current.push(t2);
    }, 150);
    tabTimersRef.current.push(t1);
  };

  useEffect(() => {
    return () => {
      tabTimersRef.current.forEach(id => window.clearTimeout(id));
      tabTimersRef.current = [];
    };
  }, []);

  // Animation 2: place-driven background particles (canvas)
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const host = modalRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let last = performance.now();
    let lastFrame = performance.now();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const speedPx: Record<ParticleSpeed, number> = { slow: 12, medium: 22, fast: 34 }; // px/sec baseline
    const dir = atmosphere.particleDir;
    const baseSpeed = speedPx[atmosphere.speed] ?? 12;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const particles = Array.from({ length: 12 }).map(() => ({
      x: rand(0, 1),
      y: rand(0, 1),
      r: rand(1.2, 2.4),
      a: rand(0.05, 0.09),
      phase: rand(0, Math.PI * 2),
    }));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    resize();

    const step = (now: number) => {
      // Pause when tab is hidden
      if (document.visibilityState === 'hidden') {
        particleRafRef.current = requestAnimationFrame(step);
        return;
      }

      // Cap to ~30fps to keep CPU low
      if (now - lastFrame < 33) {
        particleRafRef.current = requestAnimationFrame(step);
        return;
      }
      lastFrame = now;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Very subtle dot color from atmosphere palette
      const dot = atmosphere.primary;
      ctx.fillStyle = dot;

      particles.forEach(p => {
        const s = (baseSpeed * dt) / Math.max(1, Math.min(w, h));
        if (dir === 'up') {
          p.y -= s * 1.6;
        } else if (dir === 'down') {
          p.y += s * 1.8;
        } else if (dir === 'left') {
          p.x -= s * 1.6;
        } else if (dir === 'gentle') {
          p.x += Math.sin(now / 1400 + p.phase) * s * 0.9;
          p.y -= s * 0.8;
        } else if (dir === 'spiral') {
          const cx = 0.5,
            cy = 0.52;
          const ang = now / 2200 + p.phase;
          const rr = 0.18 + 0.14 * Math.sin(now / 2600 + p.phase);
          p.x = cx + Math.cos(ang) * rr;
          p.y = cy + Math.sin(ang) * rr;
        }

        if (p.x < -0.1) p.x = 1.1;
        if (p.x > 1.1) p.x = -0.1;
        if (p.y < -0.1) p.y = 1.1;
        if (p.y > 1.1) p.y = -0.1;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      particleRafRef.current = requestAnimationFrame(step);
    };

    particleRafRef.current = requestAnimationFrame(step);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(particleRafRef.current);
      particleRafRef.current = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [reducedMotion, atmosphere]);

  // Animation 8: quote reveal (IntersectionObserver), play once per modal open
  useEffect(() => {
    setQuoteRevealed(false);
    quoteObserverRef.current?.disconnect();
    quoteObserverRef.current = null;
  }, [c.rank]);

  useEffect(() => {
    if (reducedMotion) return;
    if (tab !== 'profile') {
      quoteObserverRef.current?.disconnect();
      quoteObserverRef.current = null;
      return;
    }
    if (!c.quoteEn) return;
    if (quoteRevealed) return;
    const el = quoteSectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      entries => {
        const hit = entries.some(e => e.isIntersecting);
        if (!hit) return;
        setQuoteRevealed(true);
        obs.disconnect();
        quoteObserverRef.current = null;
      },
      { root: bodyRef.current, threshold: 0.35 }
    );

    quoteObserverRef.current = obs;
    obs.observe(el);
    return () => {
      obs.disconnect();
      quoteObserverRef.current = null;
    };
  }, [tab, reducedMotion, c.quoteEn, quoteRevealed]);

  const modalContent = (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayOut : ''}`}
      onClick={e => e.target === e.currentTarget && closeWithAnimation()}
    >
      <div
        ref={modalRef}
        className={[
          styles.modal,
          styles[battleFx],
          entrancePhase < 5 && !reducedMotion ? styles.entranceActive : '',
          isClosing ? styles.modalOut : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          {
            '--cat-color': color,
            '--breath-duration': breathDuration,
            '--tab-tint': tabAtmosphereTint,
            '--atm-primary': atmosphere.primary,
            '--atm-secondary': atmosphere.secondary,
            '--particle-dir': atmosphere.particleDir,
            '--particle-speed': atmosphere.speed,
          } as React.CSSProperties
        }
      >
        {!reducedMotion && <div className={styles.atmosphereOverlay} aria-hidden="true" />}
        {!reducedMotion && (
          <canvas ref={canvasRef} className={styles.atmosphereCanvas} aria-hidden="true" />
        )}

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerAccent} />
          <div className={styles.headerContent}>
            <div className={styles.catSigWrap}>
              <CategorySig cat={c.cat} color={color} reducedMotion={reducedMotion} />
            </div>
            <div className={styles.headerTop}>
              <span
                className={`${styles.rank} ${entrancePhase >= 4 ? styles.rankVisible : styles.rankHidden}`}
              >
                #{displayedRank}
              </span>
              <span
                className={`${styles.cat} ${entrancePhase >= 3 ? styles.catStamp : styles.catHidden}`}
              >
                {c.catLabel}
              </span>
              <span
                className={`${styles.confidenceBadge} ${styles.authScoreBadge}`}
                title={t('comp.modal.authenticity.hint')}
              >
                {t('comp.modal.authenticity.label')} {displayedAuthenticity}/100
              </span>
              {onToggleStudied && (
                <button
                  className={`${styles.studyBtn} ${isStudied ? styles.studyBtnActive : ''}`}
                  onClick={onToggleStudied}
                  title={isStudied ? 'Unmark as studied' : 'Mark as studied'}
                >
                  {isStudied ? '✓ Studied' : '○ Study'}
                </button>
              )}
              <button className={styles.closeBtn} onClick={closeWithAnimation} aria-label="Close">
                ✕
              </button>
            </div>

            <p className={styles.ar}>{c.ar}</p>
            {lang === 'ur' && <p className={styles.urName}>{c.ur}</p>}
            <h2
              className={`${styles.name} ${entrancePhase >= 2 ? styles.nameSlideIn : styles.nameHidden}`}
            >
              {norm(c.name)}
            </h2>
            <p
              className={`${styles.title} ${entrancePhase >= 5 ? styles.restFadeIn : styles.restHidden}`}
            >
              {norm(c.title)}
            </p>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────── */}
        <div
          className={`${styles.tabs} ${entrancePhase >= 5 ? styles.restFadeIn : styles.restHidden}`}
        >
          {(
            [
              ['profile', `📜 ${t('comp.modal.tabs.profile')}`],
              ['segments', `▶ Segments`],
              ['quran', `✦ ${t('comp.modal.tabs.quran')}`],
              ['tafsir', `📖 ${t('comp.modal.tabs.tafsir')}`],
              ['family', `👨‍👩‍👧‍👦 ${t('comp.modal.tabs.family')}`],
              ['miracles', `✨ ${t('comp.modal.tabs.miracles')}`],
              ['poetry', `🎭 ${t('comp.modal.tabs.poetry')}`],
            ] as [ModalTab, string][]
          ).map(([t, label]) => (
            <button
              key={t}
              className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => handleTabClick(t)}
              style={tab === t ? { borderBottomColor: color, color } : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div
          ref={bodyRef}
          className={[
            styles.body,
            styles.bodySwap,
            entrancePhase >= 5 ? styles.restFadeIn : styles.restHidden,
            isTabTransitioning ? styles.tabFadingOut : styles.tabFadingIn,
          ]
            .filter(Boolean)
            .join(' ')}
          key={tab}
        >
          {/* ════════ SEGMENTS TAB ════════════════════════════════ */}
          {tab === 'segments' && <SegmentsTab companion={c} readingLevel={readingLevel} />}

          {/* ════════ PROFILE TAB ════════════════════════════════ */}
          {tab === 'profile' && (
            <>
              {/* Hadith scroll indicator (data-driven) */}
              {hadiths > 0 && (
                <div className={styles.hadithRibbonWrap}>
                  <div className={styles.hadithRibbon} style={{ width: hadithScrollPct }}>
                    {!reducedMotion && <div className={styles.hadithRibbonShimmer} />}
                    {!reducedMotion && hadiths > 1000 && (
                      <div className={styles.hadithRibbonShimmerFast} />
                    )}
                  </div>
                  <span className={styles.hadithRibbonLabel}>
                    {hadiths.toLocaleString()} narrations
                  </span>
                </div>
              )}
              <ConfidenceLegend t={t} />

              {/* Compact sources panel (always visible) */}
              {sources.length > 0 && readingLevel !== 'scholar' && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.sourceReliability.title')}</h3>
                  <div className={styles.sourceList}>
                    {sources.slice(0, 4).map((s, i) => (
                      <div key={i} className={styles.sourceItem}>
                        <ReliabilityBadge level={s.reliability} />
                        <SourceStrengthBadge
                          strength={reliabilityToStrength(s.reliability)}
                          compact
                        />
                        <span className={styles.sourceTopic}>
                          <strong>{t('comp.modal.sourceReliability.topic')}:</strong> {s.topic}
                        </span>
                        <span className={styles.sourceRef}>
                          <strong>{t('comp.modal.sourceReliability.reference')}:</strong> {s.source}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quick facts grid */}
              <div className={styles.facts}>
                {[
                  { label: t('comp.modal.facts.born'), val: c.born },
                  { label: t('comp.modal.facts.death'), val: c.death },
                  { label: t('comp.modal.facts.origin'), val: c.place },
                  { label: t('comp.modal.facts.tribe'), val: c.tribe },
                  {
                    label: t('comp.modal.facts.hadiths'),
                    val: c.hadiths > 0 ? c.hadiths.toLocaleString() : '—',
                  },
                  {
                    label: t('comp.modal.facts.battles'),
                    val: c.battles.length > 0 ? String(c.battles.length) : '—',
                  },
                ].map(({ label, val }) => (
                  <div key={label} className={styles.fact}>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factVal}>{val || '—'}</span>
                  </div>
                ))}
              </div>

              {/* Occupation before & after Islam (Feature 49) */}
              {occupation && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.occupation')}</h3>
                  <div className={styles.occupationRow}>
                    <div className={styles.occBefore}>
                      <span className={styles.occLabel}>{t('comp.modal.beforeIslam')}</span>
                      <p>{occupation.before}</p>
                    </div>
                    <div className={styles.occArrow}>→</div>
                    <div className={styles.occAfter}>
                      <span className={styles.occLabel}>{t('comp.modal.afterIslam')}</span>
                      <p>{occupation.after}</p>
                    </div>
                  </div>
                  {occupation.note && <p className={styles.occNote}>{occupation.note}</p>}
                </section>
              )}

              {/* Significance */}
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.significance')}</h3>
                  {confidence && (
                    <ConfidenceBadge
                      level={confidence.sig}
                      label={confidenceLabel[confidence.sig]}
                    />
                  )}
                </div>
                <p>
                  {readingLevel === 'child'
                    ? (lang === 'ur' ? (urOv.sigUr ?? c.sig) : norm(c.sig)).split('.')[0] + '.'
                    : lang === 'ur'
                      ? (urOv.sigUr ?? c.sig)
                      : norm(c.sig)}
                </p>
              </section>

              {/* Relationship to Prophet ﷺ */}
              <section className={styles.section}>
                <h3>{t('comp.modal.relationship')}</h3>
                <p>{norm(c.rel)}</p>
              </section>

              {/* Contribution */}
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.contributions')}</h3>
                  {confidence && (
                    <ConfidenceBadge
                      level={confidence.contrib}
                      label={confidenceLabel[confidence.contrib]}
                    />
                  )}
                </div>
                <p>
                  {readingLevel === 'child'
                    ? (lang === 'ur' ? (urOv.contribUr ?? c.contrib) : norm(c.contrib)).slice(
                        0,
                        200
                      ) + '…'
                    : lang === 'ur'
                      ? (urOv.contribUr ?? c.contrib)
                      : norm(c.contrib)}
                </p>
              </section>

              {/* Two columns: Personality + Radar */}
              <div className={styles.twoCol}>
                <section className={styles.section}>
                  <h3>{t('comp.modal.character')}</h3>
                  <ul className={styles.traits}>
                    {(() => {
                      const src =
                        lang === 'ur'
                          ? (urOv.personalityUr ?? c.personality)
                          : normalizeTransliterationList(c.personality);
                      const items = Array.isArray(src) ? src : [src];
                      return items.map((trait: string, i: number) => <li key={i}>{trait}</li>);
                    })()}
                  </ul>
                </section>
                <div className={styles.radar}>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart
                      data={data}
                      role="img"
                      aria-label={`Contribution radar chart for ${c.name}: Hadiths, Battles, Scholarship, Sacrifice, Leadership, and Legacy scores`}
                    >
                      <title>{c.name} — Contribution Radar</title>
                      <PolarGrid stroke="#2c2820" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a6e5a', fontSize: 11 }} />
                      <Radar dataKey="value" stroke={color} fill={color} fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Prophet's Du'a (Feature 05) */}
              {duas.length > 0 && (
                <section className={styles.section}>
                  <h3>
                    {t('comp.modal.duaFor')} {c.name.split(' ')[0]}
                  </h3>
                  <div className={styles.duaList}>
                    {duas.map((d, i) => (
                      <div key={i} className={styles.duaCard}>
                        <p className={`${styles.duaAr} ar`}>{d.ar}</p>
                        <p className={styles.duaEn}>"{d.en}"</p>
                        <p className={styles.duaOccasion}>{d.occasion}</p>
                        <span className={styles.duaSource}>{d.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Event */}
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.keyEvent')}</h3>
                  {confidence && (
                    <ConfidenceBadge
                      level={confidence.keyEvent}
                      label={confidenceLabel[confidence.keyEvent]}
                    />
                  )}
                </div>
                <blockquote className={styles.blockquote}>
                  {lang === 'ur' ? (urOv.keyEventUr ?? c.keyEvent) : norm(c.keyEvent)}
                </blockquote>
              </section>

              {/* Prophetic Link */}
              {c.link && (
                <section className={styles.section}>
                  <div className={styles.sectionHead}>
                    <h3>{t('comp.modal.propheticTestimony')}</h3>
                    {confidence && (
                      <ConfidenceBadge
                        level={confidence.link}
                        label={confidenceLabel[confidence.link]}
                      />
                    )}
                  </div>
                  <blockquote className={styles.blockquote}>
                    {lang === 'ur' ? (urOv.linkUr ?? c.link) : norm(c.link)}
                  </blockquote>
                </section>
              )}

              {/* Quote */}
              {c.quoteEn && (
                <section
                  className={styles.section}
                  ref={node => {
                    quoteSectionRef.current = node;
                  }}
                >
                  <h3>{t('comp.modal.theirWords')}</h3>
                  {c.quote && (
                    <p
                      className={`${styles.quoteAr} ar ${!reducedMotion && quoteRevealed ? styles.quoteCitation : ''}`}
                      style={
                        !reducedMotion && quoteRevealed
                          ? {
                              animationDelay: `${(lang === 'ur' ? (urOv.quoteUr ?? c.quoteEn) : norm(c.quoteEn)).split(/\s+/).length * 40 + 300}ms`,
                            }
                          : undefined
                      }
                    >
                      {c.quote}
                    </p>
                  )}
                  <p className={styles.quoteEn}>
                    "
                    {!reducedMotion && quoteRevealed
                      ? (lang === 'ur' ? (urOv.quoteUr ?? c.quoteEn) : norm(c.quoteEn))
                          .split(/\s+/)
                          .map((w, i) => (
                            <span
                              key={`${w}-${i}`}
                              className={styles.quoteWord}
                              style={{ animationDelay: `${i * 40}ms` }}
                            >
                              {w}{' '}
                            </span>
                          ))
                      : lang === 'ur'
                        ? (urOv.quoteUr ?? c.quoteEn)
                        : norm(c.quoteEn)}
                    "
                  </p>
                </section>
              )}

              {/* Last Words at Death (Feature 04) */}
              {lastWords.length > 0 && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.finalMoments')}</h3>
                  <div className={styles.lastWordsBlock}>
                    {lastWords.map((lw, i) => (
                      <div key={i} className={styles.lastWordCard}>
                        {lw.wordsAr && <p className={`${styles.lwAr} ar`}>{lw.wordsAr}</p>}
                        <p className={styles.lwEn}>{lw.wordsEn}</p>
                        {lw.wordsUr && <p className={styles.lwUr}>{lw.wordsUr}</p>}
                        <p className={styles.lwContext}>{lw.context}</p>
                        <span className={styles.lwSource}>{lw.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Legacy */}
              <section className={styles.section}>
                <h3>{t('comp.modal.legacy')}</h3>
                <p>{lang === 'ur' ? (urOv.legacyUr ?? c.legacy) : norm(c.legacy)}</p>
              </section>

              {/* Appearance + Dreams */}
              <div className={styles.twoCol}>
                {/* Physical description (Feature 08) */}
                {c.appearance && (
                  <section className={styles.section}>
                    <h3>{t('comp.modal.appearance')}</h3>
                    <p>
                      {lang === 'ur' ? (urOv.appearanceUr ?? c.appearance) : norm(c.appearance)}
                    </p>
                  </section>
                )}
                {/* Dreams & Visions (Feature 10) */}
                {dreams.length > 0 && (
                  <section className={styles.section}>
                    <h3>{t('comp.modal.dreams')}</h3>
                    {dreams.map((d, i) => (
                      <div key={i} className={styles.dreamCard}>
                        <p className={styles.dreamSummary}>
                          {lang === 'ur' ? (d.summaryUr ?? d.summary) : d.summary}
                        </p>
                        {readingLevel !== 'child' && (
                          <p className={styles.dreamDetail}>
                            {lang === 'ur' ? (d.detailUr ?? d.detail) : d.detail}
                          </p>
                        )}
                        <span className={styles.dreamSource}>{d.source}</span>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              {/* Miracles */}
              {c.miracles && (
                <section className={styles.section}>
                  <div className={styles.sectionHead}>
                    <h3>{t('comp.modal.miracles')}</h3>
                    {confidence && (
                      <ConfidenceBadge
                        level={confidence.miracles}
                        label={confidenceLabel[confidence.miracles]}
                      />
                    )}
                  </div>
                  <p>
                    {(() => {
                      const src = lang === 'ur' ? (urOv.miraclesUr ?? c.miracles) : c.miracles;
                      const text = Array.isArray(src) ? src.join(' · ') : src;
                      return lang === 'ur' ? text : norm(text);
                    })()}
                  </p>
                </section>
              )}

              {/* Battles */}
              {c.battles.length > 0 && (
                <section className={styles.section}>
                  <h3>Battles</h3>
                  <div className={styles.tags}>
                    {c.battles.map(b => (
                      <span key={b} className={styles.tag}>
                        {b}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Burial */}
              {c.burial && (
                <section className={styles.section}>
                  <h3>Burial</h3>
                  <p>{c.burial}</p>
                </section>
              )}

              {/* Expanded source reliability meter (Feature 35) */}
              {sources.length > 0 && readingLevel === 'scholar' && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.sourceReliability.title')}</h3>
                  <div className={styles.sourceList}>
                    {sources.map((s, i) => (
                      <div key={i} className={styles.sourceItem}>
                        <ReliabilityBadge level={s.reliability} />
                        <span className={styles.sourceTopic}>
                          <strong>{t('comp.modal.sourceReliability.topic')}:</strong> {s.topic}
                        </span>
                        <span className={styles.sourceRef}>
                          <strong>{t('comp.modal.sourceReliability.reference')}:</strong> {s.source}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 52: What the Prophet ﷺ Said ── */}
              {praise.length > 0 && (
                <section className={styles.section}>
                  <h3>What the Prophet ﷺ Said About {c.name.split(' ')[0]}</h3>
                  <div className={styles.praiseList}>
                    {praise.map((p, i) => (
                      <div key={i} className={styles.praiseCard}>
                        <span className={styles.praiseCat}>{p.category}</span>
                        {p.ar && <p className={`${styles.praiseAr} ar`}>{p.ar}</p>}
                        <p className={styles.praiseEn}>{lang === 'ur' ? (p.ur ?? p.en) : p.en}</p>
                        <p className={styles.praiseOccasion}>
                          {lang === 'ur' ? (p.occasionUr ?? p.occasion) : p.occasion}
                        </p>
                        <span className={styles.praiseSource}>{p.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 54: Weapons Custodian ── */}
              {weapons.length > 0 && (
                <section className={styles.section}>
                  <h3>Prophetic Weapons in Their Custody</h3>
                  <div className={styles.weaponList}>
                    {weapons.map((w, i) => (
                      <div key={i} className={styles.weaponCard}>
                        <div className={styles.weaponHeader}>
                          <span className={styles.weaponName}>{w.name}</span>
                          <span className={styles.weaponNameAr} dir="rtl">
                            {w.nameAr}
                          </span>
                          <span className={styles.weaponType}>{w.type}</span>
                        </div>
                        <p className={styles.weaponDesc}>{w.description}</p>
                        <p className={styles.weaponAcq}>
                          <strong>Acquisition:</strong> {w.acquisition}
                        </p>
                        <p className={styles.weaponNow}>
                          <strong>Where now:</strong> {w.whereNow}
                        </p>
                        <span className={styles.weaponSource}>{w.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 56: Prophetic Gifts ── */}
              {gifts.length > 0 && (
                <section className={styles.section}>
                  <h3>Gift Exchange with the Prophet ﷺ</h3>
                  <div className={styles.giftList}>
                    {gifts.map((g, i) => (
                      <div
                        key={i}
                        className={`${styles.giftCard} ${g.direction === 'prophet-to-companion' ? styles.giftFromProphet : styles.giftToCompanion}`}
                      >
                        <div className={styles.giftDir}>
                          {g.direction === 'prophet-to-companion'
                            ? '→ From the Prophet ﷺ'
                            : '← To the Prophet ﷺ'}
                        </div>
                        <p className={styles.giftItem}>
                          {lang === 'ur' ? (g.itemUr ?? g.item) : g.item}
                        </p>
                        <p className={styles.giftOccasion}>
                          {lang === 'ur' ? (g.occasionUr ?? g.occasion) : g.occasion}
                        </p>
                        <p className={styles.giftMeaning}>
                          <em>{lang === 'ur' ? (g.meaningUr ?? g.meaning) : g.meaning}</em>
                        </p>
                        <span className={styles.giftSource}>{g.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 57: POW Records ── */}
              {powRecords.length > 0 && (
                <section className={styles.section}>
                  <h3>Captivity & Freedom Story</h3>
                  {powRecords.map((p, i) => (
                    <div key={i} className={styles.powCard}>
                      <div className={styles.powHeader}>
                        <span className={styles.powEvent}>{p.event}</span>
                        <span className={styles.powYear}>
                          {Math.abs(p.yearAH)} {p.yearAH < 0 ? 'BH' : 'AH'}
                        </span>
                      </div>
                      {p.ransom && (
                        <p className={styles.powRansom}>
                          <strong>Ransom:</strong> {p.ransom}
                        </p>
                      )}
                      {p.ransomPaidBy && (
                        <p className={styles.powPaidBy}>
                          <strong>Paid by:</strong> {p.ransomPaidBy}
                        </p>
                      )}
                      <p className={styles.powStory}>{p.story}</p>
                      <p className={styles.powFaith}>
                        <strong>Faith impact:</strong> {p.faithImpact}
                      </p>
                      <span className={styles.powSource}>{p.source}</span>
                    </div>
                  ))}
                </section>
              )}

              {/* ── Feature 60: Named Animals ── */}
              {animals.length > 0 && (
                <section className={styles.section}>
                  <h3>Named Animals</h3>
                  <div className={styles.animalList}>
                    {animals.map((a, i) => (
                      <div key={i} className={styles.animalCard}>
                        <div className={styles.animalHeader}>
                          <span className={styles.animalName}>{a.animalName}</span>
                          {a.animalNameAr && (
                            <span className={styles.animalNameAr} dir="rtl">
                              {a.animalNameAr}
                            </span>
                          )}
                          <span className={styles.animalSpecies}>{a.species}</span>
                        </div>
                        <p className={styles.animalRole}>{a.role}</p>
                        <p className={styles.animalStory}>{a.story}</p>
                        {a.fate && (
                          <p className={styles.animalFate}>
                            <em>Fate: {a.fate}</em>
                          </p>
                        )}
                        <span className={styles.animalSource}>{a.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 61: Land Grants ── */}
              {landGrants.length > 0 && (
                <section className={styles.section}>
                  <h3>Land & Property Grants</h3>
                  {landGrants.map((l, i) => (
                    <div key={i} className={styles.landCard}>
                      <div className={styles.landHeader}>
                        <span className={styles.landProp}>{l.property}</span>
                        <span className={styles.landLoc}>{l.location}</span>
                      </div>
                      <p>
                        <strong>Granted by:</strong> {l.grantedBy}
                      </p>
                      <p>
                        <strong>Purpose:</strong> {l.purpose}
                      </p>
                      <p>
                        <strong>Legacy:</strong> {l.whatHappenedToIt}
                      </p>
                      <span className={styles.landSource}>{l.source}</span>
                    </div>
                  ))}
                </section>
              )}

              {/* ── Feature 62: Battle Wounds ── */}
              {wounds.length > 0 && (
                <section className={styles.section}>
                  <h3>Battle Wounds Registry</h3>
                  <div className={styles.woundList}>
                    {wounds.map((w, i) => (
                      <div key={i} className={styles.woundCard}>
                        <div className={styles.woundHeader}>
                          <span className={styles.woundBattle}>{w.battle}</span>
                          <span className={styles.woundYear}>{w.yearAH} AH</span>
                        </div>
                        <p className={styles.woundInjury}>{w.injury}</p>
                        <p className={styles.woundWeapon}>
                          Weapon: {w.weapon}
                          {w.bodyPart ? ` · ${w.bodyPart}` : ''}
                        </p>
                        {w.treatedBy && (
                          <p className={styles.woundTreated}>Treated by: {w.treatedBy}</p>
                        )}
                        <p
                          className={`${styles.woundOutcome} ${w.outcome.toLowerCase().includes('martyr') ? styles.woundMartyr : ''}`}
                        >
                          {w.outcome}
                        </p>
                        <span className={styles.woundSource}>{w.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ════════ QURAN TAB (Feature 01) ═════════════════════ */}
          {tab === 'quran' && (
            <div className={styles.quranTab}>
              <ConfidenceLegend t={t} compact />
              {confidence && (
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.tabs.quran')}</h3>
                  <ConfidenceBadge
                    level={confidence.link}
                    label={confidenceLabel[confidence.link]}
                  />
                </div>
              )}
              {qtEntries.length > 0 ? (
                <>
                  <p className={styles.quranIntro}>
                    These Quranic ayahs were revealed because of or directly relating to{' '}
                    {c.name.split(' ')[0]}.
                  </p>
                  {qtEntries.map((qt, i) => {
                    if (!qt) return null;
                    const recitationUrl = quranRecitationUrl(qt.ayahRef);
                    return (
                        <div key={i} className={styles.quranEntry}>
                          <div className={styles.quranRef}>
                            <span className={styles.quranSurah}>{qt.surah}</span>
                            <span className={styles.quranAyahNum}>{qt.ayahRef}</span>
                            {recitationUrl && (
                              <a
                                className={styles.quranAudioLink}
                                href={recitationUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                              >
                                Recitation
                              </a>
                            )}
                          </div>
                          <p className={`${styles.quranAr} ar`}>{qt.ayahAr}</p>
                          <p className={styles.quranEn}>"{qt.ayahEn}"</p>
                          {qt.ayahUr && <p className={styles.quranUr}>{qt.ayahUr}</p>}
                          <div className={styles.quranStory}>
                            <h4>The Story</h4>
                            <p>{qt.story}</p>
                          </div>
                          {qt.companionResponse && (
                            <div className={styles.quranResponse}>
                              <h4>{c.name.split(' ')[0]}'s Response</h4>
                              <p>{qt.companionResponse}</p>
                            </div>
                          )}
                          <span className={styles.quranSource}>{qt.source}</span>
                        </div>
                      );
                  })}
                </>
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا تَعْلَمُ</p>
                  <p>
                    No specific Quranic revelation linked to {c.name.split(' ')[0]} has been
                    recorded in our current dataset.
                  </p>
                  <p className={styles.noDataSub}>
                    This does not mean none exist — the database is continuously expanding.
                  </p>
                </div>
              )}
              {/* Feature 92 — Quran Memorization Registry */}
              {(() => {
                const memRecord = QURAN_MEM_REGISTRY.find(r => r.rank === c.rank);
                if (!memRecord) return null;
                return (
                  <div className={styles.memRecord}>
                    <h4 className={styles.memTitle}>📖 Quran Memorization & Teaching Record</h4>
                    <div className={styles.memDesig} style={{ borderLeftColor: color }}>
                      <strong>Prophet's ﷺ Designation:</strong> {memRecord.designation}
                    </div>
                    <p className={styles.memHadith}>{memRecord.hadiths}</p>
                    <span className={styles.memSource}>{memRecord.source}</span>
                    {memRecord.knownSurahs && (
                      <div className={styles.memSurahs}>
                        <strong>Known Surahs:</strong>
                        {memRecord.knownSurahs.map((s, i) => (
                          <span key={i} className={styles.memSurah}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {memRecord.specialNote && (
                      <p className={styles.memNote}>{memRecord.specialNote}</p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {tab === 'tafsir' &&
            (() => {
              const tafsirEntries = getTafsirByCompanion(c.rank);
              const legScore = LEGACY_SCORES.find(ls => ls.rank === c.rank);
              return (
                <div className={styles.tafsirTab}>
                  <ConfidenceLegend t={t} compact />
                  {confidence && (
                    <div className={styles.sectionHead}>
                      <h3>{t('comp.modal.tabs.tafsir')}</h3>
                      <ConfidenceBadge
                        level={confidence.contrib}
                        label={confidenceLabel[confidence.contrib]}
                      />
                    </div>
                  )}
                  {/* Legacy Score (Feature 100) */}
                  {legScore && (
                    <div className={styles.legacyScore} style={{ borderColor: legScore.color }}>
                      <div className={styles.lsHeader}>
                        <span className={styles.lsTitle}>Legacy Score</span>
                        <span className={styles.lsTotal} style={{ color: legScore.color }}>
                          {legScore.total}
                          <span className={styles.lsMax}>/1000</span>
                        </span>
                      </div>
                      <div className={styles.lsBars}>
                        {[
                          { label: 'Hadiths', val: legScore.hadithScore, max: 300 },
                          { label: 'Fiqh Impact', val: legScore.fiqhScore, max: 250 },
                          { label: 'Naming', val: legScore.namingScore, max: 200 },
                          { label: 'Reach', val: legScore.reachScore, max: 150 },
                          { label: 'Tafsir', val: legScore.tafsirScore, max: 100 },
                          { label: 'Sacrifice', val: legScore.sacrificeScore, max: 100 },
                        ].map(({ label, val, max }) => (
                          <div key={label} className={styles.lsBar}>
                            <span className={styles.lsBarLabel}>{label}</span>
                            <div className={styles.lsBarTrack}>
                              <div
                                className={styles.lsBarFill}
                                style={{
                                  width: `${(val / max) * 100}%`,
                                  background: legScore.color,
                                }}
                              />
                            </div>
                            <span className={styles.lsBarVal}>
                              {val}/{max}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className={styles.lsBreakdown}>{legScore.breakdown}</p>
                    </div>
                  )}
                  {/* Tafsir entries (Feature 87) */}
                  {tafsirEntries.length > 0 ? (
                    <>
                      <p className={styles.tafsirIntro}>
                        Quranic interpretations attributed to {c.name.split(' ')[0]} in Ibn Jarir
                        al-Tabari's <em>Jami' al-Bayan</em> — the most authoritative classical
                        tafsir.
                      </p>
                      {tafsirEntries.map((t, i) => (
                        <div
                          key={i}
                          className={styles.tafsirEntry}
                          style={{ borderLeftColor: color }}
                        >
                          <div className={styles.tafsirRef}>
                            <span className={styles.tafsirSurah} style={{ color }}>
                              Surah {t.surahName} ({t.surah}:{t.ayah})
                            </span>
                            {t.context && <span className={styles.tafsirContext}>{t.context}</span>}
                          </div>
                          <div className={`${styles.tafsirAyah} ar`}>{t.ayahText}</div>
                          <p className={styles.tafsirInterp}>{t.interpretation}</p>
                          {t.significance && (
                            <div className={styles.tafsirSig}>
                              <strong>Why this matters:</strong> {t.significance}
                            </div>
                          )}
                          <span className={styles.tafsirSource}>{t.source}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className={styles.noDataBlock}>
                      <p className={styles.noDataAr}>لَيْسَ بَعْدُ</p>
                      <p>
                        No tafsir contributions from {c.name.split(' ')[0]} have been digitized in
                        our current dataset.
                      </p>
                      <p className={styles.noDataSub}>
                        Our tafsir archive currently covers: Ibn Abbas, Aisha, Ali, Umar, Abu Bakr,
                        and Ibn Mas'ud. Expanding continuously.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

          {/* ════════ FAMILY TAB (Feature 30) ════════════════════ */}
          {tab === 'family' && (
            <div className={styles.familyTab}>
              {confidence && (
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.tabs.family')}</h3>
                  <ConfidenceBadge
                    level={confidence.link}
                    label={confidenceLabel[confidence.link]}
                  />
                </div>
              )}
              <p className={styles.familyIntro}>
                Family household of {c.name} — connections to other companions highlighted.
              </p>
              <FamilyTreeView rank={c.rank} color={color} />
              {!FAMILY_TREES[c.rank] && (
                <div className={styles.noDataBlock}>
                  <p>Family tree not yet available. Coming in next update.</p>
                </div>
              )}
            </div>
          )}

          {/* ════════ MIRACLES TAB (Feature 51) ═══════════════════ */}
          {tab === 'miracles' && (
            <div className={styles.miraclesTab}>
              <ConfidenceLegend t={t} compact />
              {confidence && (
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.tabs.miracles')}</h3>
                  <ConfidenceBadge
                    level={confidence.miracles}
                    label={confidenceLabel[confidence.miracles]}
                  />
                </div>
              )}
              <p className={styles.tabIntro}>
                Karamat (supernatural events) witnessed by or through {c.name.split(' ')[0]} —
                authenticated from classical hadith sources with full chain and scholar evaluation.
              </p>
              {karamat.length > 0 ? (
                karamat.map((k, i) => (
                  <div key={i} className={styles.karamaCard} style={{ borderLeftColor: color }}>
                    <div className={styles.karamaNum} style={{ background: color + '22', color }}>
                      Karama {i + 1}
                    </div>
                    <h4 className={styles.karamaTitle}>{k.title}</h4>
                    <p className={styles.karamaStory}>{k.story}</p>
                    {k.hadithAr && <p className={`${styles.karamaAr} ar`}>{k.hadithAr}</p>}
                    <blockquote className={styles.karamaEn}>"{k.hadithEn}"</blockquote>
                    {k.witnessedBy && (
                      <p className={styles.karamaMeta}>
                        <strong>Witnessed by:</strong> {k.witnessedBy}
                      </p>
                    )}
                    {k.location && (
                      <p className={styles.karamaMeta}>
                        <strong>Location:</strong> {k.location}
                      </p>
                    )}
                    <div className={styles.karamaFooter}>
                      <span className={styles.karamaAuth}>{k.authentication}</span>
                      <span className={styles.karamaSource}>{k.source}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا يُوجَدُ</p>
                  <p>
                    No authenticated karamat have been recorded for {c.name.split(' ')[0]} in our
                    current dataset.
                  </p>
                  <p className={styles.noDataSub}>
                    This does not mean none exist — our karamat database covers key figures and is
                    continuously expanding.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ════════ POETRY TAB (Feature 53) ════════════════════ */}
          {tab === 'poetry' && (
            <div className={styles.poetryTab}>
              {confidence && (
                <div className={styles.sectionHead}>
                  <h3>{t('comp.modal.tabs.poetry')}</h3>
                  <ConfidenceBadge
                    level={confidence.contrib}
                    label={confidenceLabel[confidence.contrib]}
                  />
                </div>
              )}
              <p className={styles.tabIntro}>
                Verses composed by {c.name.split(' ')[0]} — preserved in classical Arabic literary
                collections with historical context and meter analysis.
              </p>
              {poems.length > 0 ? (
                poems.map((poem, i) => (
                  <div key={i} className={styles.poemCard} style={{ borderColor: color + '44' }}>
                    <div className={styles.poemHeader}>
                      <h4 className={styles.poemTitle}>{poem.title}</h4>
                      {poem.meter && (
                        <span className={styles.poemMeter} style={{ color }}>
                          {poem.meter} meter
                        </span>
                      )}
                    </div>
                    <p className={styles.poemOccasion}>{poem.occasionEn}</p>
                    <div className={styles.poemVerses}>
                      <pre className={`${styles.poemAr} ar`}>{poem.versesAr}</pre>
                      <div className={styles.poemEn}>{poem.versesEn}</div>
                    </div>
                    <p className={styles.poemTheme}>
                      <strong>Theme:</strong> {poem.theme}
                    </p>
                    <p className={styles.poemContext}>{poem.historicalContext}</p>
                    <span className={styles.poemSource}>{poem.source}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا يُوجَدُ</p>
                  <p>
                    No attributed poetry has been recorded for {c.name.split(' ')[0]} in our current
                    dataset.
                  </p>
                  <p className={styles.noDataSub}>
                    Many companions composed poetry that has not survived in complete form. Our
                    poetry archive is expanding.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer tools — Feature 84 & 86 */}
        <div className={styles.footerTools}>
          <button
            className={styles.dedicationBtn}
            style={{ borderColor: `${color}44`, background: `${color}11`, color }}
            onClick={() => setShowDedication(true)}
          >
            ✦ Generate Dedication Card
          </button>
          <button className={styles.voiceBtn} onClick={() => setShowVoice(true)}>
            💬 Companion Voice
          </button>
        </div>
        {showDedication && (
          <DedicationGenerator companionRank={c.rank} onClose={() => setShowDedication(false)} />
        )}
        {showVoice && <CompanionVoice companionRank={c.rank} onClose={() => setShowVoice(false)} />}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
