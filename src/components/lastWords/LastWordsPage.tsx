import { useState, useMemo } from 'react';
import { LAST_WORDS_DATA, LW_CATEGORIES, type LastWords, type LastWordsCategory } from '../../data/lastWords';
import s from './LastWordsPage.module.css';

const ALL_CATS: Array<{ id: 'all' | LastWordsCategory; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'prayer', label: 'Prayer & Du\'a' },
  { id: 'testament', label: 'Final Testament' },
  { id: 'guidance', label: 'Guidance' },
  { id: 'devotion', label: 'Devotion' },
  { id: 'battle', label: 'On the Battlefield' },
  { id: 'prophecy', label: 'Prophetic Word' },
];

export default function LastWordsPage() {
  const [cat, setCat] = useState<'all' | LastWordsCategory>('all');
  const [onlyObscure, setOnlyObscure] = useState(false);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return LAST_WORDS_DATA.filter((w) => {
      if (cat !== 'all' && w.category !== cat) return false;
      if (onlyObscure && !w.isObscure) return false;
      if (q && !w.companion.toLowerCase().includes(q) && !w.wordsEn.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [cat, onlyObscure, search]);

  return (
    <div className={`${s.page} premium-page`}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerGlow} aria-hidden />
        <p className={s.eyebrow}>Collection 04 · Final Statements</p>
        <h1 className={s.title}>
          Last <span className={s.dim}>Words</span>
        </h1>
        <p className={s.lead}>
          The final recorded statements of the companions before they died — in Arabic with source,
          context, and classification. Some are famous. Many have never been compiled together.
        </p>
        <div className={s.headerNote}>
          ✦ Every entry is sourced from classical primary texts: Tabaqat Ibn Sa'd, Hilyat al-Awliya', 
          Siyar A'lam al-Nubala', and canonical Hadith collections.
        </div>
      </header>

      {/* Controls */}
      <div className={s.controls}>
        <div className={s.row1}>
          <input
            className={s.search}
            placeholder="Search companion or words…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className={s.obscureToggle}>
            <input
              type="checkbox"
              checked={onlyObscure}
              onChange={(e) => setOnlyObscure(e.target.checked)}
            />
            <span className={s.toggleLabel}>Show rarely-cited only</span>
          </label>
        </div>
        <div className={s.cats}>
          {ALL_CATS.map((c) => (
            <button
              key={c.id}
              className={`${s.catBtn} ${cat === c.id ? s.catActive : ''}`}
              onClick={() => setCat(c.id)}
              style={cat === c.id && c.id !== 'all' ? { '--ac': LW_CATEGORIES[c.id as LastWordsCategory].color } as React.CSSProperties : undefined}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className={s.count}>{filtered.length} entries</p>
      </div>

      {/* Cards */}
      <div className={s.cards}>
        {filtered.map((w) => (
          <WordCard
            key={w.id}
            entry={w}
            isOpen={expanded === w.id}
            onToggle={() => setExpanded(expanded === w.id ? null : w.id)}
          />
        ))}
        {filtered.length === 0 && <div className={s.empty}>No matching entries.</div>}
      </div>
    </div>
  );
}

function WordCard({ entry: w, isOpen, onToggle }: { entry: LastWords; isOpen: boolean; onToggle: () => void }) {
  const catMeta = LW_CATEGORIES[w.category];
  return (
    <article
      className={`${s.card} ${isOpen ? s.cardOpen : ''}`}
      style={{ '--cc': catMeta.color } as React.CSSProperties}
    >
      <button className={s.cardBtn} onClick={onToggle}>
        {/* Candle / symbol */}
        <div className={s.candleCol}>
          <span className={s.candleIcon}>🕯️</span>
          {w.isObscure && <span className={s.rareBadge}>Rare</span>}
        </div>

        {/* Main */}
        <div className={s.cardMain}>
          <div className={s.cardTop}>
            <div className={s.compInfo}>
              <span className={s.compName}>{w.companion}</span>
              <span className={s.compAr}>{w.companionAr}</span>
            </div>
            <div className={s.cardRight}>
              {w.yearAH && (
                <span className={s.yearTag}>{String(w.yearAH).startsWith('-') ? `${w.yearAH} BH` : `${w.yearAH} AH`}</span>
              )}
              <span className={s.catTag} style={{ background: catMeta.color + '1a', color: catMeta.color }}>
                {catMeta.label}
              </span>
              <span className={s.chevron}>{isOpen ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Arabic words */}
          <p className={s.wordsAr} dir="rtl">{w.wordsAr}</p>
          {/* English preview */}
          <p className={s.wordsEn}>{w.wordsEn}</p>
        </div>
      </button>

      {/* Expanded */}
      {isOpen && (
        <div className={s.detail}>
          {w.wordsUr && (
            <p className={s.wordsUr} dir="rtl">{w.wordsUr}</p>
          )}

          <div className={s.contextBlock}>
            <span className={s.contextLabel}>Context</span>
            <p className={s.contextText}>{w.context}</p>
          </div>

          <div className={s.sourceRow}>
            <span className={s.srcLabel}>Primary Source</span>
            <span className={s.srcText}>{w.source}</span>
          </div>
        </div>
      )}
    </article>
  );
}
