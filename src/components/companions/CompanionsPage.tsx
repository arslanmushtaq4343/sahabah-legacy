import { useState, useMemo, useCallback, useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import {
  TABAQAT_MAP,
  TABAQAT_LABELS,
  FORMER_ENEMIES,
  FIRSTS,
  type TabaqatTier,
} from '../../data/companionExtras';
import { FREED_SLAVE_RANKS } from '../../data/companionsExtra2';
import { normalizeTransliteration } from '../../data/transliteration';
import type { Companion, CompanionCategory, FilterState } from '../../types';
import { useCompare } from '../../context/CompareContext';
import { useStudyJournal } from '../../hooks/useStudyJournal';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import CompanionModal from './CompanionModal';
import CompanionCard from './CompanionCard';
import { formatVisualInsightSummary } from './insightMetrics';
import { PageHeader } from '../layout/PageHeader';
import { speakArabic, speakBio } from '../../utils/audio';
import styles from './CompanionsPage.module.css';

export type ReadingLevel = 'child' | 'adult' | 'scholar';

/* ----------------- lazy overlays / panels ----------------- */
const TribalMapOverlay = lazy(() =>
  import('./Overlays').then(m => ({ default: m.TribalMapOverlay }))
);
const NameCardGenerator = lazy(() =>
  import('./Overlays').then(m => ({ default: m.NameCardGenerator }))
);
const QuoteAuthChecker = lazy(() =>
  import('./Overlays').then(m => ({ default: m.QuoteAuthChecker }))
);
const RSVPReader = lazy(() => import('./Overlays').then(m => ({ default: m.RSVPReader })));
const InsightsPanel = lazy(() => import('./InsightsPanel'));

/* ----------------- categories / sort ----------------- */
const CATEGORIES: { value: CompanionCategory | 'all'; label: string }[] = [
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

const TABAQAT_TIERS: { value: TabaqatTier | 'all'; label: string }[] = [
  { value: 'all', label: 'All Generations' },
  { value: 1, label: 'Gen 1 · Badr & Before' },
  { value: 2, label: 'Gen 2 · Pre-Hudaybiyyah' },
  { value: 3, label: 'Gen 3 · Hudaybiyyah' },
  { value: 4, label: 'Gen 4 · Conquest Era' },
  { value: 5, label: 'Gen 5 · Late & Children' },
];

const INITIAL: FilterState = {
  search: '',
  category: 'all',
  sortField: 'rank',
  sortDir: 'asc',
};

/* ----------------- precomputed search index ----------------- */
const SEARCH_INDEX: { rank: number; name: string; title: string; ar: string; ur: string }[] =
  COMPANIONS.map(c => ({
    rank: c.rank,
    name: normalizeTransliteration(c.name).toLowerCase(),
    title: normalizeTransliteration(c.title).toLowerCase(),
    ar: c.ar,
    ur: c.ur,
  }));
const SEARCH_BY_RANK: Record<number, (typeof SEARCH_INDEX)[number]> = {};
SEARCH_INDEX.forEach(row => {
  SEARCH_BY_RANK[row.rank] = row;
});

/* ----------------- speech / share / print ----------------- */
function printCompanionCard(c: Companion) {
  const win = window.open('', '_blank', 'width=620,height=900');
  if (!win) return;
  const color = CAT_COLORS[c.cat] || '#b8860b';
  win.document.write(`<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${normalizeTransliteration(c.name)} — Companion Card</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap" rel="stylesheet"/>
  <style>
    @page { size: A5; margin: 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #faf6ee; color: #1a1208; width: 148mm; min-height: 210mm; padding: 8mm; }
    .header { border-top: 4px solid ${color}; padding: 6mm 0 4mm; margin-bottom: 4mm; }
    .rank { font-size: 9pt; letter-spacing: .14em; text-transform: uppercase; color: ${color}; }
    .ar { font-family: Amiri, serif; font-size: 26pt; direction: rtl; text-align: right; color: ${color}; margin: 2mm 0; }
    .name { font-family: 'Cinzel Decorative', serif; font-size: 14pt; color: #1a1208; margin: 1mm 0; }
    .title { font-size: 9pt; color: #6a5030; letter-spacing: .1em; margin-bottom: 3mm; }
    .divider { border: none; border-top: 1px solid ${color}44; margin: 3mm 0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 4mm; margin: 3mm 0; }
    .fact { font-size: 8pt; }
    .fact-label { font-weight: bold; color: ${color}; display: block; }
    .sig { font-size: 9pt; line-height: 1.5; margin: 3mm 0; }
    .quote { font-size: 9.5pt; font-style: italic; border-left: 3px solid ${color}; padding-left: 3mm; margin: 3mm 0; color: #3a2810; }
    .footer { margin-top: auto; padding-top: 3mm; border-top: 1px solid ${color}33; font-size: 7.5pt; color: #8a7a5a; text-align: center; letter-spacing: .1em; }
  </style>
</head>
<body>
  <div class="header">
    <div class="rank">#${c.rank} · ${c.catLabel}</div>
    <div class="ar">${c.ar}</div>
    <div class="name">${normalizeTransliteration(c.name)}</div>
    <div class="title">${normalizeTransliteration(c.title)}</div>
  </div>
  <hr class="divider"/>
  <div class="grid">
    <div class="fact"><span class="fact-label">Born</span>${c.born || '—'}</div>
    <div class="fact"><span class="fact-label">Died</span>${c.death || '—'}</div>
    <div class="fact"><span class="fact-label">Origin</span>${c.place || '—'}</div>
    <div class="fact"><span class="fact-label">Tribe</span>${c.tribe || '—'}</div>
    ${c.hadiths > 0 ? `<div class="fact"><span class="fact-label">Hadiths</span>${c.hadiths.toLocaleString()}</div>` : ''}
    ${c.battles.length > 0 ? `<div class="fact"><span class="fact-label">Battles</span>${c.battles.length}</div>` : ''}
  </div>
  <hr class="divider"/>
  <p class="sig">${normalizeTransliteration(c.sig)}</p>
  ${c.quoteEn ? `<p class="quote">"${normalizeTransliteration(c.quoteEn)}"</p>` : ''}
  <div class="footer">The Companions of the Prophet · Sahabah Archive</div>
  <script>window.onload=()=>{ window.print(); window.close(); }<\/script>
</body></html>`);
  win.document.close();
}

async function shareCompanion(c: Companion) {
  const text = `${normalizeTransliteration(c.name)} (${c.ar}) · ${normalizeTransliteration(c.title)}\n\n"${normalizeTransliteration(c.quoteEn || c.sig)}"\n\n#Sahabah #IslamicHistory`;
  if (navigator.share) {
    try {
      await navigator.share({ title: c.name, text, url: window.location.href });
      return;
    } catch {
      /* cancelled */
    }
  }
  await navigator.clipboard.writeText(text);
  alert('Copied to clipboard! Paste to share.');
}

/* ----------------- animated number hook ----------------- */
function useAnimatedNumber(target: number, duration = 520) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (typeof window === 'undefined') {
      setValue(target);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const startValue = value;
    const delta = target - startValue;
    if (delta === 0) return;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(startValue + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);
  return value;
}

/* ----------------- calligraphy / firsts (lightweight, kept inline) ----------------- */
const CALLIGRAPHY_STYLES = [
  { id: 'naskh', label: 'Naskh', fontFamily: '"Amiri", serif', color: '#b8860b' },
  { id: 'thuluth', label: 'Thuluth', fontFamily: '"Scheherazade New", serif', color: '#1a3462' },
  { id: 'kufi', label: 'Kufi', fontFamily: '"Reem Kufi", sans-serif', color: '#2a5040' },
  { id: 'diwani', label: 'Diwani', fontFamily: '"Lateef", serif', color: '#5a1a1a' },
];

function CalligraphyOverlay({
  ar,
  name,
  onClose,
}: {
  ar: string;
  name: string;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  useBodyScrollLock(true);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return createPortal(
    <div className={styles.calliOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        className={styles.calliBox}
        role="dialog"
        aria-modal="true"
        aria-label="Arabic calligraphy"
      >
        <button className={styles.calliClose} onClick={onClose} aria-label="Close">
          ✕
        </button>
        <p className={styles.calliSubtitle}>Arabic Calligraphy</p>
        <h3 className={styles.calliName}>{name}</h3>
        <div
          className={styles.calliDisplay}
          style={{
            fontFamily: CALLIGRAPHY_STYLES[active].fontFamily,
            color: CALLIGRAPHY_STYLES[active].color,
          }}
        >
          {ar}
        </div>
        <div className={styles.calliStyles}>
          {CALLIGRAPHY_STYLES.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.calliStyleBtn} ${active === i ? styles.calliStyleActive : ''}`}
              style={active === i ? { borderColor: s.color, color: s.color } : undefined}
              onClick={() => setActive(i)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className={styles.calliHint}>
          Tap a style to switch · {CALLIGRAPHY_STYLES[active].label} script
        </div>
      </div>
    </div>,
    document.body
  );
}

function FirstsPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  useBodyScrollLock(true);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const filtered = useMemo(() => {
    if (!q) return FIRSTS;
    const low = q.toLowerCase();
    return FIRSTS.filter(
      f =>
        f.name.toLowerCase().includes(low) ||
        f.achievement.toLowerCase().includes(low) ||
        f.detail.toLowerCase().includes(low)
    );
  }, [q]);
  const sorted = [...filtered].sort((a, b) => a.achievement.localeCompare(b.achievement));

  return createPortal(
    <div className={styles.firstsOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        className={styles.firstsBox}
        role="dialog"
        aria-modal="true"
        aria-label="First Muslim To index"
      >
        <div className={styles.firstsHeader}>
          <div>
            <p className={styles.firstsEyebrow}>A–Z Index</p>
            <h2 className={styles.firstsTitle}>First Muslim To</h2>
          </div>
          <button className={styles.firstsClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <input
          className={styles.firstsSearch}
          placeholder="Search achievements…"
          value={q}
          onChange={e => setQ(e.target.value)}
          autoFocus
        />
        <div className={styles.firstsList}>
          {sorted.map((f, i) => (
            <div key={i} className={styles.firstsEntry}>
              <div className={styles.firstsCompanion}>{f.name}</div>
              <div className={styles.firstsAchievement}>{f.achievement}</div>
              <p className={styles.firstsDetail}>{f.detail}</p>
              <span className={styles.firstsSource}>{f.source}</span>
            </div>
          ))}
          {sorted.length === 0 && <div className={styles.firstsEmpty}>No results.</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function CompanionsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL);
  /* Search input is its own state so typing stays instant; the actual filter
     uses a debounced version 150ms behind, so we don't re-filter 100 cards on
     every keystroke. */
  const [searchInput, setSearchInput] = useState('');
  const [selected, setSelected] = useState<Companion | null>(null);
  const [tabaqatFilter, setTabaqatFilter] = useState<TabaqatTier | 'all'>('all');
  const [enemiesFilter, setEnemiesFilter] = useState(false);
  const [freedSlavesFilter, setFreedSlavesFilter] = useState(false);
  const [showTribalMap, setShowTribalMap] = useState(false);
  const [showNameCard, setShowNameCard] = useState(false);
  const [showQuoteChecker, setShowQuoteChecker] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [rsvpCompanion, setRsvpCompanion] = useState<Companion | null>(null);
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('adult');
  const [showFirsts, setShowFirsts] = useState(false);
  const [calligraphyFor, setCalligraphyFor] = useState<Companion | null>(null);

  useEffect(() => {
    const rank = Number(searchParams.get('rank'));
    if (!Number.isFinite(rank)) return;
    const companion = COMPANIONS.find(c => c.rank === rank);
    if (companion) setSelected(companion);
  }, [searchParams]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFilters(prev => (prev.search === searchInput ? prev : { ...prev, search: searchInput }));
    }, 150);
    return () => window.clearTimeout(id);
  }, [searchInput]);

  const { toggle: compareToggle, isSelected } = useCompare();
  const { isStudied, toggleStudied, count: studiedCount } = useStudyJournal();
  const animatedStudiedCount = useAnimatedNumber(studiedCount, 620);
  const animatedStudiedPercent = Math.max(
    0,
    Math.min(100, (animatedStudiedCount / COMPANIONS.length) * 100)
  );
  const visualInsightSummary = useMemo(() => formatVisualInsightSummary(COMPANIONS), []);

  const displayed = useMemo(() => {
    const q = filters.search.toLowerCase();
    const noFilters =
      !q &&
      filters.category === 'all' &&
      tabaqatFilter === 'all' &&
      !enemiesFilter &&
      !freedSlavesFilter;
    const filtered = noFilters
      ? COMPANIONS.slice()
      : COMPANIONS.filter(c => {
          const idx = SEARCH_BY_RANK[c.rank];
          const matchSearch =
            !q ||
            idx.name.includes(q) ||
            idx.ar.includes(q) ||
            idx.ur.includes(q) ||
            idx.title.includes(q);
          const matchCat = filters.category === 'all' || c.cat === filters.category;
          const matchTabaqat = tabaqatFilter === 'all' || TABAQAT_MAP[c.rank] === tabaqatFilter;
          const matchEnemy = !enemiesFilter || FORMER_ENEMIES.has(c.rank);
          const matchFreed = !freedSlavesFilter || FREED_SLAVE_RANKS.has(c.rank);
          return matchSearch && matchCat && matchTabaqat && matchEnemy && matchFreed;
        });

    const dir = filters.sortDir === 'asc' ? 1 : -1;
    return filtered.sort((a, b) => {
      if (filters.sortField === 'rank') return (a.rank - b.rank) * dir;
      if (filters.sortField === 'name')
        return SEARCH_BY_RANK[a.rank].name.localeCompare(SEARCH_BY_RANK[b.rank].name) * dir;
      if (filters.sortField === 'hadiths') return (a.hadiths - b.hadiths) * dir;
      if (filters.sortField === 'battles') return (a.battles.length - b.battles.length) * dir;
      return 0;
    });
  }, [filters, tabaqatFilter, enemiesFilter, freedSlavesFilter]);
  const animatedVisibleCount = useAnimatedNumber(displayed.length, 380);

  const set = useCallback(function setField<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) {
    setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL);
    setSearchInput('');
    setTabaqatFilter('all');
    setEnemiesFilter(false);
    setFreedSlavesFilter(false);
  }, []);

  const openModal = useCallback((c: Companion) => setSelected(c), []);
  const handleCompare = useCallback((rank: number) => compareToggle(rank), [compareToggle]);
  const handleBookmark = useCallback((rank: number) => toggleStudied(rank), [toggleStudied]);
  const handleCalli = useCallback((c: Companion) => setCalligraphyFor(c), []);
  const handleSpeak = useCallback((ar: string) => speakArabic(ar), []);
  const handleSpeakBio = useCallback(
    (c: Companion) => speakBio(c.name, `${c.title}. ${c.sig}`),
    []
  );
  const handleShare = useCallback((c: Companion) => {
    void shareCompanion(c);
  }, []);
  const handlePrint = useCallback((c: Companion) => printCompanionCard(c), []);
  const handleRsvp = useCallback((c: Companion) => setRsvpCompanion(c), []);

  /* ----------------- Phase 2: filter chips ----------------- */
  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];
  if (filters.search)
    activeChips.push({
      key: 'search',
      label: `“${filters.search}”`,
      onRemove: () => {
        setSearchInput('');
        set('search', '');
      },
    });
  if (filters.category !== 'all') {
    const lbl = CATEGORIES.find(c => c.value === filters.category)?.label ?? filters.category;
    activeChips.push({ key: 'cat', label: lbl, onRemove: () => set('category', 'all') });
  }
  if (tabaqatFilter !== 'all') {
    const lbl = TABAQAT_TIERS.find(t => t.value === tabaqatFilter)?.label ?? `Gen ${tabaqatFilter}`;
    activeChips.push({ key: 'tab', label: lbl, onRemove: () => setTabaqatFilter('all') });
  }
  if (enemiesFilter)
    activeChips.push({
      key: 'enemy',
      label: 'Former Persecutors',
      onRemove: () => setEnemiesFilter(false),
    });
  if (freedSlavesFilter)
    activeChips.push({
      key: 'freed',
      label: 'Freed Slaves',
      onRemove: () => setFreedSlavesFilter(false),
    });

  return (
    <div className={`${styles.page} ${styles[`rl_${readingLevel}`]} premium-page`}>
      {/* Header */}
      <PageHeader
        title="The Companions"
        subtitle={`${COMPANIONS.length} companions of the Prophet`}
        rightSlot={
          <div className={styles.readingToggle} role="radiogroup" aria-label="Reading level">
            {(['child', 'adult', 'scholar'] as ReadingLevel[]).map(l => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={readingLevel === l ? 'true' : 'false'}
                className={`${styles.rlBtn} ${readingLevel === l ? styles.rlActive : ''}`}
                onClick={() => setReadingLevel(l)}
              >
                {l === 'child' ? 'Child' : l === 'adult' ? 'Adult' : 'Scholar'}
              </button>
            ))}
          </div>
        }
      />

        <div className={styles.glanceBar}>
          <button className={styles.glanceBtn} onClick={() => setShowFirsts(true)}>
            <span className={styles.glanceStar}>★</span>
            <span className={styles.glanceBtnLabel}>First Muslim To · A–Z Index</span>
            <span className={styles.glanceCount}>{FIRSTS.length} achievements</span>
          </button>

          <button
            className={styles.glanceBtn}
            onClick={() => setShowInsights(true)}
            aria-label="Open visual insights"
          >
            <span className={styles.glanceStar}>📊</span>
            <span className={styles.glanceBtnLabel}>Visual Insights</span>
            <span className={styles.glanceCount}>{visualInsightSummary}</span>
          </button>

          <div className={styles.glanceDivider} />

          <div className={styles.studyStatBlock}>
            <div className={styles.studyProgress}>
              <div
                className={styles.studyProgressFill}
                style={{ width: `${animatedStudiedPercent}%` }}
              />
            </div>
            <span className={styles.studyStatLabel}>
              <span className={styles.studyStatNum}>{animatedStudiedCount}</span>
              &nbsp;of {COMPANIONS.length} studied
            </span>
          </div>
        </div>

      {/* Sticky controls */}
      <div className={`${styles.controls} ${styles.controlsSticky}`} role="search">
        <div className={styles.controlsRow}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search by name, Arabic, Urdu, or title…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            aria-label="Search companions"
          />
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.catFilters} role="tablist" aria-label="Category">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={filters.category === value ? 'true' : 'false'}
                className={[styles.catBtn, filters.category === value ? styles.catActive : ''].join(
                  ' '
                )}
                onClick={() => set('category', value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.controlsRow} ${styles.refineRow}`}>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupLabel}>Generation (Tabaqat)</span>
            <div className={styles.tabaqatFilters}>
              {TABAQAT_TIERS.map(({ value, label }) => (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={tabaqatFilter === value ? 'true' : 'false'}
                  className={[styles.tabBtn, tabaqatFilter === value ? styles.tabActive : ''].join(
                    ' '
                  )}
                  onClick={() => setTabaqatFilter(value as TabaqatTier | 'all')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <button
              className={`${styles.toolsToggle} ${showTools ? styles.toolsActive : ''}`}
              onClick={() => setShowTools(v => !v)}
              aria-expanded={showTools ? 'true' : 'false'}
              type="button"
            >
              {showTools ? '▾' : '▸'} Tools & Filters
              <span className={styles.toolsSub}>Advanced</span>
            </button>

            {showTools && (
              <div className={styles.toolsPanel}>
                <button
                  className={`${styles.enemyToggle} ${enemiesFilter ? styles.enemyActive : ''}`}
                  aria-pressed={enemiesFilter ? 'true' : 'false'}
                  onClick={() => setEnemiesFilter(v => !v)}
                  type="button"
                >
                  {enemiesFilter ? '✓ ' : ''}Former Persecutors
                  <span className={styles.enemyCount}>{FORMER_ENEMIES.size}</span>
                </button>
                <button
                  className={`${styles.enemyToggle} ${styles.freedToggle} ${freedSlavesFilter ? styles.enemyActive : ''}`}
                  aria-pressed={freedSlavesFilter ? 'true' : 'false'}
                  onClick={() => setFreedSlavesFilter(v => !v)}
                  type="button"
                >
                  {freedSlavesFilter ? '✓ ' : ''}Freed Slaves
                  <span className={styles.enemyCount}>{FREED_SLAVE_RANKS.size}</span>
                </button>
                <button
                  className={`${styles.enemyToggle} ${styles.tribalMapBtn}`}
                  onClick={() => setShowTribalMap(true)}
                  type="button"
                >
                  Tribal Origins Map
                </button>
                <button
                  className={`${styles.enemyToggle} ${styles.nameCardBtn}`}
                  onClick={() => setShowNameCard(true)}
                  type="button"
                >
                  Name Card Generator
                </button>
                <button
                  className={`${styles.enemyToggle} ${styles.quoteCheckBtn}`}
                  onClick={() => setShowQuoteChecker(true)}
                  type="button"
                >
                  Quote Checker
                </button>
              </div>
            )}
          </div>

          <div className={`${styles.sortRow} ${styles.sortRowCompact}`}>
            <span className={styles.sortLabel}>Sort</span>
            {(['rank', 'name', 'hadiths', 'battles'] as const).map(f => (
              <button
                key={f}
                type="button"
                aria-pressed={filters.sortField === f ? 'true' : 'false'}
                className={[styles.sortBtn, filters.sortField === f ? styles.sortActive : ''].join(
                  ' '
                )}
                onClick={() =>
                  filters.sortField === f
                    ? set('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc')
                    : set('sortField', f)
                }
              >
                {f}
                {filters.sortField === f && <span>{filters.sortDir === 'asc' ? ' ↑' : ' ↓'}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Active-filter chips */}
        {activeChips.length > 0 && (
          <div className={styles.controlsRow}>
            <div className={styles.filterChipsRow} aria-label="Active filters">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  className={styles.filterChip}
                  onClick={chip.onRemove}
                  aria-label={`Remove filter ${chip.label}`}
                >
                  {chip.label}
                  <span className={styles.filterChipX} aria-hidden="true">
                    ×
                  </span>
                </button>
              ))}
              <button className={styles.filterChipsClear} onClick={clearFilters}>
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      <p className={styles.count} aria-live="polite">
        {displayed.length === COMPANIONS.length
          ? `Showing all ${COMPANIONS.length} companions`
          : `${animatedVisibleCount} of ${COMPANIONS.length} companions`}
      </p>

      {selected && (
        <CompanionModal
          companion={selected}
          onClose={() => setSelected(null)}
          readingLevel={readingLevel}
          isStudied={isStudied(selected.rank)}
          onToggleStudied={() => toggleStudied(selected.rank)}
        />
      )}

      {displayed.length === 0 && (
        <div className={styles.emptyState} role="status" aria-live="polite">
          <div className={styles.emptyOrnament} aria-hidden="true">
            ✦
          </div>
          <h3 className={styles.emptyTitle}>No companions found</h3>
          <p className={styles.emptyMsg}>
            No companions match your current filters. Try broadening your search or clearing the
            filters.
          </p>
          <button className={styles.emptyClearBtn} onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {displayed.map((c, idx) => (
          <CompanionCard
            key={c.rank}
            companion={c}
            index={idx}
            readingLevel={readingLevel}
            selected={isSelected(c.rank)}
            bookmarked={isStudied(c.rank)}
            onOpen={openModal}
            onCompare={handleCompare}
            onBookmark={handleBookmark}
            onCalligraphy={handleCalli}
            onSpeak={handleSpeak}
            onSpeakBio={handleSpeakBio}
            onShare={handleShare}
            onPrint={handlePrint}
            onRsvp={handleRsvp}
          />
        ))}
      </div>

      {/* Lazy overlays */}
      {calligraphyFor && (
        <CalligraphyOverlay
          ar={calligraphyFor.ar}
          name={normalizeTransliteration(calligraphyFor.name)}
          onClose={() => setCalligraphyFor(null)}
        />
      )}
      {showFirsts && <FirstsPanel onClose={() => setShowFirsts(false)} />}
      {showInsights && (
        <Suspense
          fallback={
            <div
              className={styles.insightsOverlay}
              onClick={e => e.target === e.currentTarget && setShowInsights(false)}
            >
              <div className={styles.insightsLoading} role="status" aria-live="polite">
                Loading visual insights...
              </div>
            </div>
          }
        >
          <InsightsPanel
            onClose={() => setShowInsights(false)}
            onSelectCompanion={c => {
              setShowInsights(false);
              setSelected(c);
            }}
          />
        </Suspense>
      )}

      <Suspense fallback={null}>
        {showTribalMap && (
          <TribalMapOverlay companions={COMPANIONS} onClose={() => setShowTribalMap(false)} />
        )}
        {showNameCard && (
          <NameCardGenerator companions={COMPANIONS} onClose={() => setShowNameCard(false)} />
        )}
        {showQuoteChecker && <QuoteAuthChecker onClose={() => setShowQuoteChecker(false)} />}
        {rsvpCompanion && (
          <RSVPReader companion={rsvpCompanion} onClose={() => setRsvpCompanion(null)} />
        )}
      </Suspense>
    </div>
  );
}

/* DedicationGenerator and CompanionVoice were moved to ./Overlays.tsx
   (CompanionModal imports them from there). */
