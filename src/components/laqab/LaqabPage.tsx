import { useState, useMemo } from 'react';
import { LAQAB_DATA, type Laqab } from '../../data/laqab';
import s from './LaqabPage.module.css';

export default function LaqabPage() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return LAQAB_DATA;
    return LAQAB_DATA.filter(
      (l) =>
        l.companion.toLowerCase().includes(q) ||
        l.laqab.toLowerCase().includes(q) ||
        l.laqabEn.toLowerCase().includes(q) ||
        l.occasionEn.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className={`${s.page} premium-page`}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.halo} aria-hidden />
        <p className={s.eyebrow}>Collection 02 · Honorific Titles</p>
        <h1 className={s.title}>
          Prophetic <span className={s.gold}>Laqab</span> Encyclopedia
        </h1>
        <p className={s.lead}>
          Every honorific personally bestowed by the Prophet ﷺ — with Arabic script, meaning,
          the occasion given, the Prophet's exact words, and hadith source.
        </p>
      </header>

      {/* Search */}
      <div className={s.searchBar}>
        <input
          className={s.search}
          placeholder="Search companion or nickname…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={s.countLabel}>{filtered.length} titles</span>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {filtered.map((l) => (
          <LaqabCard
            key={l.id}
            laqab={l}
            isActive={active === l.id}
            onToggle={() => setActive(active === l.id ? null : l.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LaqabCard({ laqab: l, isActive, onToggle }: { laqab: Laqab; isActive: boolean; onToggle: () => void }) {
  return (
    <article
      className={`${s.card} ${isActive ? s.cardActive : ''}`}
      style={{ '--ac': l.color } as React.CSSProperties}
    >
      {/* Front / summary */}
      <button className={s.front} onClick={onToggle}>
        <div className={s.medalRing} aria-hidden>
          <div className={s.medalInner}>{l.laqabAr.split(' ')[0]}</div>
        </div>

        <div className={s.cardMeta}>
          <p className={s.laqabEn}>{l.laqabEn}</p>
          <h2 className={s.laqabAr}>{l.laqabAr}</h2>
          <p className={s.laqabLatin}>{l.laqab}</p>
        </div>

        <div className={s.compRow}>
          <span className={s.compName}>{l.companion}</span>
          <span className={s.compAr}>{l.companionAr}</span>
        </div>

        <div className={s.expandHint}>{isActive ? 'Close ▲' : 'Full details ▼'}</div>
      </button>

      {/* Expanded */}
      {isActive && (
        <div className={s.detail}>
          <div className={s.sect}>
            <span className={s.sectLabel}>Occasion Given</span>
            <p className={s.sectText}>{l.occasionEn}</p>
          </div>

          {l.prophetsWordsAr && (
            <div className={s.quoteBlock}>
              <p className={s.quoteAr} dir="rtl">{l.prophetsWordsAr}</p>
              {l.prophetsWordsEn && <p className={s.quoteEn}>"{l.prophetsWordsEn}"</p>}
              <span className={s.quoteLabel}>— Words of the Prophet ﷺ</span>
            </div>
          )}

          <div className={s.sect}>
            <span className={s.sectLabel}>Historical Significance</span>
            <p className={s.sectText}>{l.significance}</p>
          </div>

          <div className={s.sourceRow}>
            <span className={s.srcLabel}>Source</span>
            <span className={s.srcText}>{l.source}</span>
          </div>
        </div>
      )}
    </article>
  );
}
