import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import {
  TABAQAT_MAP, TABAQAT_LABELS, FORMER_ENEMIES, FIRSTS,
  type TabaqatTier,
} from '../../data/companionExtras';
import { FREED_SLAVE_RANKS } from '../../data/companionsExtra2';
import { TRIBES, COMPANION_TRIBE } from '../../data/connectionData2';
import {
  NAME_DATABASE, QUOTE_DATABASE, DEDICATION_QUOTES, VOICE_ENTRIES,
} from '../../data/companionsExtra3';
import type { Companion, CompanionCategory, FilterState } from '../../types';
import { useCompare } from '../../context/CompareContext';
import { useStudyJournal } from '../../hooks/useStudyJournal';
import CompanionModal from './CompanionModal';
import styles from './CompanionsPage.module.css';

export type ReadingLevel = 'child' | 'adult' | 'scholar';

const CATEGORIES: { value: CompanionCategory | 'all'; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'caliph',   label: 'Caliphs' },
  { value: 'warrior',  label: 'Warriors' },
  { value: 'general',  label: 'Generals' },
  { value: 'scholar',  label: 'Scholars' },
  { value: 'narrator', label: 'Narrators' },
  { value: 'wife',     label: 'Wives' },
  { value: 'martyr',   label: 'Martyrs' },
  { value: 'other',    label: 'Others' },
];

const TABAQAT_TIERS: { value: TabaqatTier | 'all'; label: string }[] = [
  { value: 'all', label: 'All Generations' },
  { value: 1,     label: 'Gen 1 · Badr & Before' },
  { value: 2,     label: 'Gen 2 · Pre-Hudaybiyyah' },
  { value: 3,     label: 'Gen 3 · Hudaybiyyah' },
  { value: 4,     label: 'Gen 4 · Conquest Era' },
  { value: 5,     label: 'Gen 5 · Late & Children' },
];

const INITIAL: FilterState = {
  search: '',
  category: 'all',
  sortField: 'rank',
  sortDir: 'asc',
};

/* ??? Arabic calligraphy styles ??????????????????????????????????????? */
const CALLIGRAPHY_STYLES = [
  { id: 'naskh',     label: 'Naskh',     fontFamily: '"Amiri", serif',                 color: '#b8860b' },
  { id: 'thuluth',   label: 'Thuluth',   fontFamily: '"Scheherazade New", serif',       color: '#1a3462' },
  { id: 'kufi',      label: 'Kufi',      fontFamily: '"Reem Kufi", sans-serif',         color: '#2a5040' },
  { id: 'diwani',    label: 'Diwani',    fontFamily: '"Lateef", serif',                 color: '#5a1a1a' },
];

/* ??? Audio pronunciation (Web Speech API) ???????????????????????????? */
function speakArabic(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ar-SA';
  utt.rate = 0.8;
  utt.pitch = 1.1;
  // prefer Arabic voice if available
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find(v => v.lang.startsWith('ar'));
  if (arVoice) utt.voice = arVoice;
  window.speechSynthesis.speak(utt);
}

/* ??? Print A5 card ??????????????????????????????????????????????????? */
function printCompanionCard(c: Companion) {
  const win = window.open('', '_blank', 'width=620,height=900');
  if (!win) return;
  const color = CAT_COLORS[c.cat] || '#b8860b';
  win.document.write(`<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${c.name} - Companion Card</title>
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
    <div class="name">${c.name}</div>
    <div class="title">${c.title}</div>
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
  <p class="sig">${c.sig}</p>
  ${c.quoteEn ? `<p class="quote">"${c.quoteEn}"</p>` : ''}
  <div class="footer">The Companions of the Prophet · Sahabah Archive</div>
  <script>window.onload=()=>{ window.print(); window.close(); }<\/script>
</body></html>`);
  win.document.close();
}

/* ??? Share as social image (Web Share API + canvas fallback) ?????????? */
async function shareCompanion(c: Companion) {
  const text = `${c.name} (${c.ar}) · ${c.title}\n\n\"${c.quoteEn || c.sig}\"\n\n#Sahabah #IslamicHistory`;
  if (navigator.share) {
    try { await navigator.share({ title: c.name, text, url: window.location.href }); return; } catch { /* cancelled */ }
  }
  await navigator.clipboard.writeText(text);
  alert('Copied to clipboard! Paste to share.');
}

/* ??? CalligraphyOverlay component ???????????????????????????????????? */
function CalligraphyOverlay({ ar, name, onClose }: { ar: string; name: string; onClose: () => void }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.calliOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.calliBox}>
        <button className={styles.calliClose} onClick={onClose}>✕</button>
        <p className={styles.calliSubtitle}>Arabic Calligraphy</p>
        <h3 className={styles.calliName}>{name}</h3>
        <div className={styles.calliDisplay} style={{
          fontFamily: CALLIGRAPHY_STYLES[active].fontFamily,
          color: CALLIGRAPHY_STYLES[active].color,
        }}>
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
        <div className={styles.calliHint}>Tap a style to switch · {CALLIGRAPHY_STYLES[active].label} script</div>
      </div>
    </div>
  );
}

/* ??? FirstsPanel component ???????????????????????????????????????????? */
function FirstsPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    if (!q) return FIRSTS;
    const low = q.toLowerCase();
    return FIRSTS.filter(f =>
      f.name.toLowerCase().includes(low) ||
      f.achievement.toLowerCase().includes(low) ||
      f.detail.toLowerCase().includes(low),
    );
  }, [q]);
  // sort alphabetically by achievement
  const sorted = [...filtered].sort((a, b) => a.achievement.localeCompare(b.achievement));

  return (
    <div className={styles.firstsOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.firstsBox}>
        <div className={styles.firstsHeader}>
          <div>
            <p className={styles.firstsEyebrow}>A-Z Index</p>
            <h2 className={styles.firstsTitle}>First Muslim To</h2>
          </div>
          <button className={styles.firstsClose} onClick={onClose}>✕</button>
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
    </div>
  );
}

/* ???????????????????????????????????????????????????????????????????????
   MAIN PAGE
   ????????????????????????????????????????????????????????????????????? */
export default function CompanionsPage() {
  const [filters, setFilters]     = useState<FilterState>(INITIAL);
  const [selected, setSelected]   = useState<Companion | null>(null);
  const [tabaqatFilter, setTabaqatFilter] = useState<TabaqatTier | 'all'>('all');
  const [enemiesFilter, setEnemiesFilter] = useState(false);
  const [freedSlavesFilter, setFreedSlavesFilter] = useState(false);
  const [showTribalMap, setShowTribalMap] = useState(false);
  const [showNameCard, setShowNameCard] = useState(false);
  const [showQuoteChecker, setShowQuoteChecker] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [rsvpCompanion, setRsvpCompanion] = useState<typeof COMPANIONS[0] | null>(null);
  const [readingLevel, setReadingLevel]   = useState<ReadingLevel>('adult');
  const [showFirsts, setShowFirsts]       = useState(false);
  const [calligraphyFor, setCalligraphyFor] = useState<Companion | null>(null);
  const { toggle: compareToggle, isSelected } = useCompare();
  const { isStudied, toggleStudied, count: studiedCount } = useStudyJournal();

  const displayed = useMemo(() => {
    const q = filters.search.toLowerCase();
    return COMPANIONS
      .filter(c => {
        if (!q && filters.category === 'all' && tabaqatFilter === 'all' && !enemiesFilter && !freedSlavesFilter) return true;
        const matchSearch =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.ar.includes(q) ||
          c.ur.includes(q) ||
          c.title.toLowerCase().includes(q);
        const matchCat = filters.category === 'all' || c.cat === filters.category;
        const matchTabaqat = tabaqatFilter === 'all' || TABAQAT_MAP[c.rank] === tabaqatFilter;
        const matchEnemy = !enemiesFilter || FORMER_ENEMIES.has(c.rank);
        const matchFreed = !freedSlavesFilter || FREED_SLAVE_RANKS.has(c.rank);
        return matchSearch && matchCat && matchTabaqat && matchEnemy && matchFreed;
      })
      .sort((a, b) => {
        const dir = filters.sortDir === 'asc' ? 1 : -1;
        if (filters.sortField === 'rank')    return (a.rank - b.rank) * dir;
        if (filters.sortField === 'name')    return a.name.localeCompare(b.name) * dir;
        if (filters.sortField === 'hadiths') return (a.hadiths - b.hadiths) * dir;
        if (filters.sortField === 'battles') return (a.battles.length - b.battles.length) * dir;
        return 0;
      });
  }, [filters, tabaqatFilter, enemiesFilter]);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const clearFilters = useCallback(() => {
    setFilters(INITIAL);
    setTabaqatFilter('all');
    setEnemiesFilter(false);
    setFreedSlavesFilter(false);
  }, []);

  const openModal = useCallback((c: Companion) => {
    setSelected(c);
  }, []);

  return (
    <div className={`${styles.page} ${styles[`rl_${readingLevel}`]} premium-page`}>

      {/* ??? Page Header ?????????????????????????????????????????????? */}
      <div className={styles.header}>
        <div className={styles.headerRow1}>
          <div>
            <h1 className={styles.headerTitle}>The Companions</h1>
            <p className={styles.sub}>{COMPANIONS.length} companions of the Prophet</p>
          </div>
          {/* Reading Level Toggle (Feature 41) */}
          <div className={styles.readingToggle}>
            {(['child', 'adult', 'scholar'] as ReadingLevel[]).map(l => (
              <button
                key={l}
                className={`${styles.rlBtn} ${readingLevel === l ? styles.rlActive : ''}`}
                onClick={() => setReadingLevel(l)}
              >
                {l === 'child' ? 'Child' : l === 'adult' ? 'Adult' : 'Scholar'}
              </button>
            ))}
          </div>
        </div>

        {/* Glance Bar (Feature 06 + 42) */}
        <div className={styles.glanceBar}>
          {/* First Muslim To Index */}
          <button className={styles.glanceBtn} onClick={() => setShowFirsts(true)}>
            <span className={styles.glanceStar}>★</span>
            <span className={styles.glanceBtnLabel}>First Muslim To - A-Z Index</span>
            <span className={styles.glanceCount}>{FIRSTS.length} achievements</span>
          </button>

          <div className={styles.glanceDivider} />

          {/* Study Journal stat (Feature 42) */}
          <div className={styles.studyStatBlock}>
            <div className={styles.studyProgress}>
              <div
                className={styles.studyProgressFill}
                style={{ width: `${(studiedCount / COMPANIONS.length) * 100}%` }}
              />
            </div>
            <span className={styles.studyStatLabel}>
              <span className={styles.studyStatNum}>{studiedCount}</span>
              &nbsp;of {COMPANIONS.length} studied
            </span>
          </div>
        </div>
      </div>

      {/* ??? Controls ????????????????????????????????????????????????? */}
      <div className={styles.controls}>
        <div className={styles.controlsRow}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search by name, Arabic, Urdu, or title…"
          value={filters.search}
          onChange={e => set('search', e.target.value)}
        />
        </div>

        <div className={styles.controlsRow}>
        <div className={styles.catFilters}>
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
                className={[styles.catBtn, filters.category === value ? styles.catActive : ''].join(' ')}
              onClick={() => set('category', value)}
            >
              {label}
            </button>
          ))}
        </div>
        </div>

        <div className={`${styles.controlsRow} ${styles.refineRow}`}>
          {/* Generation */}
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupLabel}>Generation (Tabaqat)</span>
            <div className={styles.tabaqatFilters}>
              {TABAQAT_TIERS.map(({ value, label }) => (
                <button
                  key={String(value)}
                  className={[styles.tabBtn, tabaqatFilter === value ? styles.tabActive : ''].join(' ')}
                  onClick={() => setTabaqatFilter(value as TabaqatTier | 'all')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={styles.filterGroup}>
            <button
              className={`${styles.toolsToggle} ${showTools ? styles.toolsActive : ''}`}
              onClick={() => setShowTools(v => !v)}
              type="button"
            >
              {showTools ? '▾' : '▸'} Tools & Filters
              <span className={styles.toolsSub}>Advanced</span>
            </button>

            {showTools && (
              <div className={styles.toolsPanel}>
                <button
                  className={`${styles.enemyToggle} ${enemiesFilter ? styles.enemyActive : ''}`}
                  onClick={() => setEnemiesFilter(v => !v)}
                  type="button"
                >
                  {enemiesFilter ? '✓ ' : ''}Former Persecutors
                  <span className={styles.enemyCount}>{FORMER_ENEMIES.size}</span>
                </button>
                <button
                  className={`${styles.enemyToggle} ${styles.freedToggle} ${freedSlavesFilter ? styles.enemyActive : ''}`}
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

          {/* Sort */}
          <div className={`${styles.sortRow} ${styles.sortRowCompact}`}>
            <span className={styles.sortLabel}>Sort</span>
            {(['rank', 'name', 'hadiths', 'battles'] as const).map(f => (
            <button
              key={f}
                className={[styles.sortBtn, filters.sortField === f ? styles.sortActive : ''].join(' ')}
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
      </div>

      {/* Results count */}
      <p className={styles.count}>
        {displayed.length === COMPANIONS.length
          ? `Showing all ${COMPANIONS.length} companions`
          : `${displayed.length} of ${COMPANIONS.length} companions`}
      </p>

      {/* Companion Detail Modal (DOM-first so overlay stacks correctly) */}
      {selected && (
        <CompanionModal
          companion={selected}
          onClose={() => setSelected(null)}
          readingLevel={readingLevel}
          isStudied={isStudied(selected.rank)}
          onToggleStudied={() => toggleStudied(selected.rank)}
        />
      )}

      {/* Empty state — no companions match active filters */}
      {displayed.length === 0 && (
        <div className={styles.emptyState} role="status" aria-live="polite">
          <div className={styles.emptyOrnament} aria-hidden="true">✦</div>
          <h3 className={styles.emptyTitle}>No companions found</h3>
          <p className={styles.emptyMsg}>
            No companions match your current filters. Try broadening your search or clearing the filters.
          </p>
          <button className={styles.emptyClearBtn} onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* ??? Grid ????????????????????????????????????????????????????? */}
      <div className={styles.grid}>
        {displayed.map(c => {
          const sel       = isSelected(c.rank);
          const bookmarked = isStudied(c.rank);
          const isEnemy   = FORMER_ENEMIES.has(c.rank);
          const isFreed   = FREED_SLAVE_RANKS.has(c.rank);
          const tabaqat   = TABAQAT_MAP[c.rank];
          return (
            <article
              key={c.rank}
              className={[
                styles.card,
                sel ? styles.cardSelected : '',
                bookmarked ? styles.cardStudied : '',
              ].join(' ')}
              style={{ '--cat-color': CAT_COLORS[c.cat] } as React.CSSProperties}
            >
              <div className={styles.cardAccent} />
              <div className={styles.cardInner}>

                {/* Card Top Row */}
                <div className={styles.cardTop}>
                  <span className={styles.rank}>#{c.rank}</span>
                  <span className={styles.cat}>{c.catLabel}</span>
                  {isEnemy && <span className={styles.enemyBadge} title="Converted former persecutor">⚑</span>}
                  {isFreed && <span className={styles.freedBadge} title="Freed from slavery">⛓</span>}
                  {tabaqat && <span className={styles.tabaqatBadge} title={TABAQAT_LABELS[tabaqat]}>G{tabaqat}</span>}

                  {/* Arabic calligraphy button (Feature 27) */}
                  <button
                    className={styles.calliBtn}
                    title="View Arabic calligraphy"
                    onClick={e => { e.stopPropagation(); setCalligraphyFor(c); }}
                  >✕</button>

                  {/* Study bookmark (Feature 42) */}
                  <button
                    className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarkActive : ''}`}
                    title={bookmarked ? 'Mark as unread' : 'Mark as studied'}
                    onClick={e => { e.stopPropagation(); toggleStudied(c.rank); }}
                  >
                    {bookmarked ? '✓' : '＋'}
                  </button>
                </div>

                {/* Arabic name + audio (Feature 40) */}
                <div className={styles.arRow}>
                <p className={styles.ar}>{c.ar}</p>
                  <button
                    className={styles.audioBtn}
                    title="Hear Arabic pronunciation"
                    onClick={e => { e.stopPropagation(); speakArabic(c.ar); }}
                  >✕</button>
                </div>

                <h2 className={styles.name}>{c.name}</h2>
                <p className={styles.title}>{c.title}</p>

                {/* Sig - reading level aware */}
                <p className={styles.sig}>
                  {readingLevel === 'child'
                    ? c.sig.split('.')[0] + '.'
                    : readingLevel === 'scholar'
                    ? c.sig
                  : c.sig.length > 140 ? c.sig.slice(0, 140) + '…' : c.sig}
                </p>

                <div className={styles.meta}>
                  {c.hadiths > 0 && <span>{c.hadiths.toLocaleString()} hadiths</span>}
                  {c.battles.length > 0 && <span>{c.battles.length} battles</span>}
                  {c.born && <span>b. {c.born}</span>}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <button className={styles.detailBtn} onClick={() => openModal(c)}>
                    Full Profile
                  </button>
                  <button
                    className={[styles.compareBtn, sel ? styles.compareSel : ''].join(' ')}
                    onClick={() => compareToggle(c.rank)}
                  >
                    {sel ? '✓ Added' : '+ Compare'}
                  </button>

                  {/* Card footer actions */}
                  <div className={styles.cardFooterActions}>
                    {/* Share (Feature 45) */}
                    <button
                      className={styles.cardFooterBtn}
                      title="Share companion"
                      onClick={e => { e.stopPropagation(); shareCompanion(c); }}
                    >
                      <span className={styles.footerBtnIcon}>↗</span>
                      <span className={styles.srOnly}>Share</span>
                    </button>
                    {/* Print A5 (Feature 43) */}
                    <button
                      className={styles.cardFooterBtn}
                      title="Print as A5 classroom card"
                      onClick={e => { e.stopPropagation(); printCompanionCard(c); }}
                    >
                      <span className={styles.footerBtnIcon}>⎙</span>
                      <span className={styles.srOnly}>Print</span>
                    </button>
                    {/* 60-Second RSVP mode (Feature 99) */}
                    <button
                      className={styles.cardFooterBtn}
                      title="60-second speed biography"
                      onClick={e => { e.stopPropagation(); setRsvpCompanion(c); }}
                    >
                      <span className={styles.footerBtnIcon}>⏱</span>
                      <span className={styles.srOnly}>60-second mode</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ??? Modals & Overlays ???????????????????????????????????????? */}

      {/* Calligraphy Overlay (Feature 27) */}
      {calligraphyFor && (
        <CalligraphyOverlay
          ar={calligraphyFor.ar}
          name={calligraphyFor.name}
          onClose={() => setCalligraphyFor(null)}
        />
      )}

      {/* Firsts Index Panel (Feature 06) */}
      {showFirsts && <FirstsPanel onClose={() => setShowFirsts(false)} />}

      {/* Tribal Map Overlay (Feature 73) */}
      {showTribalMap && <TribalMapOverlay companions={COMPANIONS} onClose={() => setShowTribalMap(false)} />}

      {/* Name Card Generator (Feature 80) */}
      {showNameCard && <NameCardGenerator companions={COMPANIONS} onClose={() => setShowNameCard(false)} />}

      {/* Quote Authenticity Checker (Feature 81) */}
      {showQuoteChecker && <QuoteAuthChecker onClose={() => setShowQuoteChecker(false)} />}

      {/* 60-Second RSVP Mode (Feature 99) */}
      {rsvpCompanion && <RSVPReader companion={rsvpCompanion} onClose={() => setRsvpCompanion(null)} />}

    </div>
  );
}

/* ??????????????????????????????????????????????????????????????
   FEATURE 73 ? TRIBAL TERRITORY MAP
   ????????????????????????????????????????????????????????????*/
const GROUP_LABELS: Record<string, string> = {
  quraysh: 'Quraysh (Mecca)', ansar: 'Ansar (Medina)', yemeni: 'Yemeni',
  'non-arab': 'Non-Arab', 'other-arab': 'Other Arab',
};
const GROUP_COLORS_T: Record<string, string> = {
  quraysh: '#d4a820', ansar: '#0a5c2e', yemeni: '#8b3a08', 'non-arab': '#4a4a8a', 'other-arab': '#509070',
};

function TribalMapOverlay({ companions, onClose }: { companions: typeof COMPANIONS; onClose: () => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const W = 700, H = 420;

  const hovTribe = hovered ? TRIBES.find(t => t.id === hovered) : null;
  const hovCompanions = hovTribe
    ? companions.filter(c => hovTribe.companionRanks.includes(c.rank))
    : [];

  const groups = ['all', 'quraysh', 'ansar', 'yemeni', 'non-arab', 'other-arab'];
  const visibleTribes = groupFilter === 'all' ? TRIBES : TRIBES.filter(t => t.group === groupFilter);

  return (
    <div className={styles.tribalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.tribalBox}>
        <div className={styles.tribalHeader}>
          <h2 className={styles.tribalTitle}>7th Century Tribal Territory Map - Companion Origins</h2>
          <button className={styles.tribalClose} onClick={onClose}>×</button>
        </div>
        <p className={styles.tribalIntro}>Hover any tribe to see which companions came from it. Color-coded by origin group. Context no modern Islamic site provides.</p>
        <div className={styles.tribalFilters}>
          {groups.map(g => (
            <button key={g}
              className={`${styles.tribalFilter} ${groupFilter === g ? styles.tribalFilterActive : ''}`}
              style={groupFilter === g && g !== 'all' ? { borderColor: GROUP_COLORS_T[g], color: GROUP_COLORS_T[g] } : {}}
              onClick={() => setGroupFilter(g)}>
              {g === 'all' ? 'All' : GROUP_LABELS[g] || g}
            </button>
          ))}
        </div>
        <div className={styles.tribalMapWrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.tribalSvg}>
            <rect width={W} height={H} fill="#0d1520" rx={8} />
            {/* Peninsula outline suggestion */}
            <ellipse cx={W*0.42} cy={H*0.52} rx={W*0.36} ry={H*0.42} fill="none" stroke="#d4a82020" strokeWidth={1.5} />
            {/* Region labels */}
            <text x={W*0.38} y={H*0.52} textAnchor="middle" fontSize={9} fill="#d4a82030" fontFamily="serif">Arabian Peninsula</text>
            <text x={W*0.42} y={H*0.30} textAnchor="middle" fontSize={8} fill="#d4a82030">Medina Region</text>
            <text x={W*0.38} y={H*0.55} textAnchor="middle" fontSize={8} fill="#d4a82030">Mecca Region</text>
            {/* Tribe circles */}
            {visibleTribes.map(tribe => {
              const x = tribe.cx * W, y = tribe.cy * H;
              const isHov = hovered === tribe.id;
              const color = GROUP_COLORS_T[tribe.group] || '#888';
              return (
                <g key={tribe.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(tribe.id)}
                  onMouseLeave={() => setHovered(null)}>
                  <circle cx={x} cy={y} r={tribe.r * W}
                    fill={color + (isHov ? '40' : '15')}
                    stroke={color}
                    strokeWidth={isHov ? 2 : 1}
                    strokeOpacity={isHov ? 0.9 : 0.4} />
                  <text x={x} y={y + 3} textAnchor="middle" fontSize={isHov ? 10 : 8}
                    fill={color} opacity={isHov ? 1 : 0.7} fontWeight={isHov ? '700' : '400'}>
                    {tribe.name.split(' ').slice(-1)[0]}
                  </text>
                  {tribe.companionRanks.length > 0 && (
                    <text x={x} y={y + (tribe.r * W) + 12} textAnchor="middle" fontSize={7} fill={color} opacity={0.6}>
                      {tribe.companionRanks.length} comp.
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {hovTribe && (
            <div className={styles.tribalTooltip} style={{ borderColor: GROUP_COLORS_T[hovTribe.group] }}>
              <div className={styles.tribalTipName}>
                <span className={`ar`}>{hovTribe.nameAr}</span>
                <strong style={{ color: GROUP_COLORS_T[hovTribe.group] }}>{hovTribe.name}</strong>
              </div>
              <div className={styles.tribalTipRegion}>{hovTribe.region}</div>
              <p>{hovTribe.note}</p>
              {hovCompanions.length > 0 && (
                <div className={styles.tribalTipComps}>
                  {hovCompanions.map(c => (
                    <span key={c.rank} className={styles.tribalTipComp} style={{ color: GROUP_COLORS_T[hovTribe.group] }}>
                      #{c.rank} {c.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.tribalLegend}>
          {Object.entries(GROUP_LABELS).map(([key, label]) => (
            <span key={key} className={styles.tribalLegItem} style={{ color: GROUP_COLORS_T[key] }}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 80 ? NAME CARD GENERATOR
// -------------------------------------------------------
function NameCardGenerator({ companions, onClose }: { companions: any[]; onClose: () => void }) {
  const [inputName, setInputName] = useState('');
  const [result, setResult] = useState<typeof NAME_DATABASE[0] | null>(null);
  const [matchedComps, setMatchedComps] = useState<any[]>([]);
  const [selectedComp, setSelectedComp] = useState<any | null>(null);

  const search = () => {
    const q = inputName.toLowerCase().trim();
    if (!q) return;
    const entry = NAME_DATABASE.find(n =>
      n.name.toLowerCase().startsWith(q) ||
      n.name.toLowerCase().includes(q)
    );
    if (entry) {
      setResult(entry);
      const comps = entry.companionRanks.map(r => companions.find(c => c.rank === r)).filter(Boolean);
      setMatchedComps(comps);
      setSelectedComp(comps[0] || null);
    } else {
      setResult(null); setMatchedComps([]); setSelectedComp(null);
    }
  };

  return (
    <div className={styles.ncOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.ncBox}>
        <button className={styles.ncClose} onClick={onClose}>×</button>
        <h2 className={styles.ncTitle}>Companion Name Card Generator</h2>
        <p className={styles.ncSub}>Enter a name to generate a printable biography card showing the companion who bears it, their story, and why this name carries honor.</p>
        <div className={styles.ncSearch}>
          <input className={styles.ncInput} placeholder="Enter a name (e.g. Bilal, Aisha, Hamza, Fatima...)" value={inputName} onChange={e => setInputName(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} />
          <button className={styles.ncSearchBtn} onClick={search}>Generate Card</button>
        </div>

        {result && (
          <div className={styles.ncCard}>
            <div className={styles.ncCardTop}>
              <span className={`${styles.ncNameAr} ar`}>{result.nameAr}</span>
              <h3 className={styles.ncName}>{result.name}</h3>
              <span className={styles.ncMeaning}>{result.meaning}</span>
              <span className={styles.ncOrigin}>{result.nameOrigin} origin ? {result.gender === 'male' ? 'Boys' : result.gender === 'female' ? 'Girls' : 'Both'} ? {result.popularity} name</span>
            </div>
            <p className={styles.ncMeaningContext}>{result.meaningContext}</p>
            {matchedComps.length > 0 && (
              <div className={styles.ncComps}>
                <div className={styles.ncCompsLabel}>Companions with this name:</div>
                {matchedComps.map(c => (
                  <button key={c.rank}
                    className={`${styles.ncCompBtn} ${selectedComp?.rank === c.rank ? styles.ncCompBtnActive : ''}`}
                    onClick={() => setSelectedComp(c)}>
                    #{c.rank} {c.name}
                  </button>
                ))}
              </div>
            )}
            {selectedComp && (
              <div className={styles.ncBio} id="nc-printable">
                <div className={styles.ncBioHeader}>
                  <span className={`${styles.ncBioAr} ar`}>{selectedComp.ar || selectedComp.nameAr || ''}</span>
                  <strong className={styles.ncBioName}>#{selectedComp.rank} ? {selectedComp.name}</strong>
                </div>
                {selectedComp.description && <p className={styles.ncBioDesc}>{selectedComp.description}</p>}
                {selectedComp.significance && <p className={styles.ncBioSig}>{selectedComp.significance}</p>}
                <div className={styles.ncBioFooter}>
                  <span className={styles.ncBioFootNote}>Named after: {selectedComp.name}</span>
                  <span className={styles.ncBioFootNote}>{result.meaning}</span>
                </div>
              </div>
            )}
            <button className={styles.ncPrint} onClick={() => window.print()}>Print Card</button>
          </div>
        )}

        {inputName && !result && (
          <div className={styles.ncNoResult}>
            No companion found with the name "{inputName}". Try: Bilal, Aisha, Hamza, Umar, Ali, Salman, Anas, Fatima, Khadijah, Asma, Safiyyah.
          </div>
        )}

        <div className={styles.ncBrowse}>
          <strong>All names in database:</strong>
          <div className={styles.ncBrowseGrid}>
            {NAME_DATABASE.map(n => (
              <button key={n.name} className={styles.ncBrowseBtn}
                onClick={() => { setInputName(n.name); setResult(n); const comps = n.companionRanks.map(r => companions.find(c => c.rank === r)).filter(Boolean); setMatchedComps(comps); setSelectedComp(comps[0] || null); }}>
                <span className={`${styles.ncBrowseAr} ar`}>{n.nameAr}</span>
                <span>{n.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 81 ? QUOTE AUTHENTICITY CHECKER
// -------------------------------------------------------
const VERDICT_COLORS: Record<string, string> = {
  authentic: '#0a5c2e', hasan: '#b8860b', misattributed: '#1a3462',
  unverified: '#666', fabricated: '#8b1a38',
};
const VERDICT_LABELS: Record<string, string> = {
  authentic: '? Authentic (Sahih/Hasan)', hasan: '~ Acceptable (Hasan)',
  misattributed: '? Misattributed', unverified: '? Unverified', fabricated: '? Fabricated / No Chain',
};

function QuoteAuthChecker({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<typeof QUOTE_DATABASE[0] | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const check = () => {
    const q = input.toLowerCase().replace(/['"]/g, '').trim();
    if (!q) return;
    const match = QUOTE_DATABASE.find(r =>
      r.quote.toLowerCase().replace(/['"]/g, '').includes(q.slice(0, 30)) ||
      q.includes(r.quote.toLowerCase().replace(/['"]/g, '').slice(5, 35))
    );
    if (match) { setResult(match); setNoMatch(false); }
    else { setResult(null); setNoMatch(true); }
  };

  return (
    <div className={styles.qcOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.qcBox}>
        <button className={styles.qcClose} onClick={onClose}>×</button>
        <h2 className={styles.qcTitle}>Companion Quote Authenticity Checker</h2>
        <p className={styles.qcSub}>Paste any quote attributed to a companion or the Prophet. The tool cross-checks it against authenticated sources and returns its true status.</p>
        <div className={styles.qcSearch}>
          <textarea className={styles.qcInput} rows={3}
            placeholder={`Paste a quote here, e.g.: "The ink of the scholar is more sacred than the blood of the martyr."`}
            value={input} onChange={e => setInput(e.target.value)} />
          <button className={styles.qcCheckBtn} onClick={check}>Check Authenticity</button>
        </div>

        {result && (
          <div className={styles.qcResult} style={{ borderLeftColor: VERDICT_COLORS[result.verdict] }}>
            <div className={styles.qcVerdictRow}>
              <span className={styles.qcVerdict}
                style={{ background: VERDICT_COLORS[result.verdict] + '22', color: VERDICT_COLORS[result.verdict], borderColor: VERDICT_COLORS[result.verdict] + '44' }}>
                {VERDICT_LABELS[result.verdict]}
              </span>
              <span className={styles.qcAttrib}>Attributed to: {result.attribution}</span>
            </div>
            <blockquote className={styles.qcQuote}>{result.quote}</blockquote>
            {result.quoteAr && <div className={`${styles.qcQuoteAr} ar`}>{result.quoteAr}</div>}
            {result.source && <p className={styles.qcSource}><strong>Source:</strong> {result.source}</p>}
            {result.correctAttribution && (
              <p className={styles.qcCorrect}><strong>Correct attribution:</strong> {result.correctAttribution}</p>
            )}
            <p className={styles.qcNote}>{result.scholarNote}</p>
          </div>
        )}

        {noMatch && (
          <div className={styles.qcNoMatch}>
            This quote is not in our current database. That does not mean it is authentic ? only that we haven't verified it yet. Browse examples below.
          </div>
        )}

        <div className={styles.qcExamples}>
          <strong>Browse known quotes:</strong>
          <div className={styles.qcExGrid}>
            {QUOTE_DATABASE.map((q, i) => (
              <button key={i} className={styles.qcExBtn}
                style={{ borderLeftColor: VERDICT_COLORS[q.verdict] }}
                onClick={() => { setInput(q.quote); setResult(q); setNoMatch(false); }}>
                <span className={styles.qcExVerdict} style={{ color: VERDICT_COLORS[q.verdict] }}>{VERDICT_LABELS[q.verdict].split(' ')[0]}</span>
                <span className={styles.qcExAttrib}>{q.attribution}</span>
                <span className={styles.qcExText}>{q.quote.slice(0, 60)}?</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 84 ? DEDICATION GENERATOR (card footer button in modal)
// -------------------------------------------------------
export function DedicationGenerator({ companionRank, onClose }: { companionRank?: number; onClose: () => void }) {
  const available = companionRank
    ? DEDICATION_QUOTES.filter(q => q.rank === companionRank)
    : DEDICATION_QUOTES;
  const [selected, setSelected] = useState(available[0] || DEDICATION_QUOTES[0]);

  return (
    <div className={styles.dgOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.dgBox}>
        <button className={styles.dgClose} onClick={onClose}>×</button>
        <h2 className={styles.dgTitle}>Dedication Generator</h2>
        <p className={styles.dgSub}>Choose a companion and a quote to generate a printable framed card with Arabic calligraphy styling. Ready to print at A4/A3 size.</p>
        <div className={styles.dgPicker}>
          {DEDICATION_QUOTES.map((q, i) => (
            <button key={i}
              className={`${styles.dgPickBtn} ${selected === q ? styles.dgPickActive : ''}`}
              style={selected === q ? { borderColor: q.color, color: q.color } : {}}
              onClick={() => setSelected(q)}>
              {q.companion.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        <div className={styles.dgCard} style={{ borderColor: selected.color }} id="dg-printable">
          <div className={styles.dgBorder} style={{ borderColor: selected.color + '66' }}>
            <div className={styles.dgTopOrnament} style={{ color: selected.color }}>***</div>
            {selected.quoteAr && (
              <div className={`${styles.dgQuoteAr} ar`} style={{ color: selected.color }}>{selected.quoteAr}</div>
            )}
            <div className={styles.dgQuoteEn}>{selected.quoteEn}</div>
            <div className={styles.dgAttrib} style={{ color: selected.color }}>{selected.companion}</div>
            <div className={styles.dgOccasion}>{selected.occasion}</div>
            <div className={styles.dgSource}>{selected.source}</div>
            <div className={styles.dgBottomOrnament} style={{ color: selected.color }}>***</div>
          </div>
        </div>
        <button className={styles.dgPrint} onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 86 ? COMPANION VOICE
// -------------------------------------------------------
export function CompanionVoice({ companionRank, onClose }: { companionRank?: number; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof VOICE_ENTRIES | null>(null);

  const search = () => {
    const q = query.toLowerCase().trim();
    if (!q) return;
    const words = q.split(/\s+/);
    const scored = VOICE_ENTRIES
      .filter(e => !companionRank || e.companionRank === companionRank || e.companionRank === 0)
      .map(e => {
        const score = e.keywords.filter(kw => words.some(w => kw.includes(w) || w.includes(kw))).length;
        return { entry: e, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(x => x.entry);
    setResults(scored.length > 0 ? scored : []);
  };

  return (
    <div className={styles.cvOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.cvBox}>
        <button className={styles.cvClose} onClick={onClose}>×</button>
        <h2 className={styles.cvTitle}>Companion Voice</h2>
        <p className={styles.cvSub}>Type any question or feeling ? the system finds the closest matching statement from a companion, purely retrieved from authenticated historical records. Not AI-generated.</p>
        <div className={styles.cvSearch}>
          <input className={styles.cvInput}
            placeholder="e.g. 'I feel anxious about money', 'how to be brave', 'dealing with injustice'..."
            value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} />
          <button className={styles.cvSearchBtn} onClick={search}>Find a Voice</button>
        </div>

        {results !== null && results.length === 0 && (
          <p className={styles.cvNoResult}>No close match found. Try: anger, anxiety, money, death, knowledge, patience, truth, leadership, purpose, family.</p>
        )}
        {results !== null && results.length > 0 && (
          <div className={styles.cvResults}>
            {results.map((e, i) => (
              <div key={i} className={styles.cvResult} style={{ borderTopColor: e.color }}>
                <div className={styles.cvResultTop}>
                  <span className={styles.cvTopic} style={{ color: e.color }}>{e.topic}</span>
                  <span className={styles.cvComp}>{e.companion}</span>
                </div>
                {e.quoteAr && <div className={`${styles.cvQuoteAr} ar`}>{e.quoteAr}</div>}
                <blockquote className={styles.cvQuote} style={{ borderLeftColor: e.color }}>{e.quoteEn}</blockquote>
                <p className={styles.cvContext}>{e.context}</p>
                <span className={styles.cvSource}>{e.source}</span>
              </div>
            ))}
          </div>
        )}

        {results === null && (
          <div className={styles.cvTopics}>
            <strong>Browse by topic:</strong>
            <div className={styles.cvTopicGrid}>
              {VOICE_ENTRIES.map((e, i) => (
                <button key={i} className={styles.cvTopicBtn}
                  style={{ borderLeftColor: e.color }}
                  onClick={() => { setQuery(e.topic); setResults([e]); }}>
                  <span style={{ color: e.color }}>{e.topic}</span>
                  <span className={styles.cvTopicComp}>{e.companion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 99 ? 60-SECOND RSVP BIOGRAPHY READER
// ???????????????????????????????????????????????????????

function RSVPReader({ companion, onClose }: { companion: any; onClose: () => void }) {
  const text = [companion.description, companion.significance, companion.legacy].filter(Boolean).join(' ');
  const words = text.split(/\s+/).filter(Boolean);

  const [wordIdx, setWordIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setWordIdx(i => {
          if (i >= words.length - 1) { setPlaying(false); return i; }
          return i + 1;
        });
      }, Math.floor(60000 / wpm));
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, wpm, words.length]);

  const progress = words.length > 0 ? ((wordIdx + 1) / words.length) * 100 : 0;
  const remaining = Math.ceil((words.length - wordIdx) / wpm * 60);

  return (
    <div className={styles.rsvpOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.rsvpBox}>
        <button className={styles.rsvpClose} onClick={onClose}>×</button>
        <div className={styles.rsvpHeader}>
          <span className={styles.rsvpName}>{companion.name}</span>
          <span className={styles.rsvpTimer}>{remaining}s remaining</span>
        </div>
        <div className={styles.rsvpProgress}>
          <div className={styles.rsvpProgressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.rsvpDisplay}>
          <div className={styles.rsvpFocus} />
          <div className={styles.rsvpWord}>
            {words[wordIdx] || '—'}
          </div>
        </div>
        <div className={styles.rsvpControls}>
          <button className={styles.rsvpBtn} onClick={() => setWordIdx(Math.max(0, wordIdx - 10))}>&lt;&lt;</button>
          <button className={`${styles.rsvpBtn} ${styles.rsvpPlayBtn}`} onClick={() => setPlaying(!playing)}>
            {playing ? 'Pause' : 'Start'}
          </button>
          <button className={styles.rsvpBtn} onClick={() => setWordIdx(Math.min(words.length - 1, wordIdx + 10))}>&gt;&gt;</button>
        </div>
        <div className={styles.rsvpWpmRow}>
          <label className={styles.rsvpWpmLabel}>Speed: {wpm} wpm</label>
          <input type="range" min={100} max={600} step={50} value={wpm}
            onChange={e => setWpm(Number(e.target.value))}
            className={styles.rsvpSlider} />
        </div>
        <div className={styles.rsvpContext}>
          Word {wordIdx + 1} of {words.length} - Click anywhere outside to close
        </div>
      </div>
    </div>
  );
}
