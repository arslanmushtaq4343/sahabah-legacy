import { useState, useMemo } from 'react';
import { QURAN_TRIGGERS, QT_CATEGORIES, type QuranTrigger } from '../../data/quranTriggers';
import s from './QuranTriggersPage.module.css';

export default function QuranTriggersPage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return QURAN_TRIGGERS.filter((t) => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (!q) return true;
      return (
        t.companion.toLowerCase().includes(q) ||
        t.surah.toLowerCase().includes(q) ||
        t.ayahRef.includes(q) ||
        t.story.toLowerCase().includes(q)
      );
    });
  }, [search, cat]);

  const CAT_COLOR: Record<string, string> = {
    personal: '#b8860b', social: '#2a6048', legal: '#1a3462',
    warfare: '#6b1a1a', family: '#6b1a5a', worship: '#5a3060', doctrinal: '#4a3800',
  };

  return (
    <div className={`${s.page} premium-page`}>
      {/* ─ Header ─ */}
      <header className={s.header}>
        <div className={s.headerGlow} aria-hidden />
        <p className={s.eyebrow}>Collection 01 · Asbab al-Nuzul — Companion Edition</p>
        <h1 className={s.title}>
          Quranic <span className={s.gold}>Revelation</span> Trigger Index
        </h1>
        <p className={s.lead}>
          Every ayah of the Quran whose descent was directly occasioned by a companion — with the full
          story, Arabic text, English &amp; Urdu translation, the companion's response, and primary source.
        </p>
      </header>

      {/* ─ Controls ─ */}
      <div className={s.controls}>
        <input
          className={s.search}
          placeholder="Search by companion, surah, or keyword…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={s.cats}>
          {QT_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`${s.catBtn} ${cat === c.id ? s.catActive : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className={s.count}>{filtered.length} entries</p>
      </div>

      {/* ─ List ─ */}
      <div className={s.list}>
        {filtered.map((t) => (
          <TriggerCard
            key={t.id}
            trigger={t}
            isOpen={expanded === t.id}
            onToggle={() => setExpanded(expanded === t.id ? null : t.id)}
            catColor={CAT_COLOR[t.category] || '#b8860b'}
          />
        ))}
        {filtered.length === 0 && (
          <div className={s.empty}>No results found.</div>
        )}
      </div>
    </div>
  );
}

function TriggerCard({
  trigger: t,
  isOpen,
  onToggle,
  catColor,
}: {
  trigger: QuranTrigger;
  isOpen: boolean;
  onToggle: () => void;
  catColor: string;
}) {
  return (
    <article className={`${s.card} ${isOpen ? s.cardOpen : ''}`} style={{ '--cc': catColor } as React.CSSProperties}>
      {/* summary row */}
      <button className={s.summary} onClick={onToggle} aria-expanded={isOpen}>
        <div className={s.summaryLeft}>
          <span className={s.surahRef}>{t.ayahRef}</span>
          <span className={s.surahName}>{t.surah} <span className={s.surahAr}>{t.surahAr}</span></span>
        </div>
        <div className={s.summaryMid}>
          <span className={s.companionName}>{t.companion}</span>
          <span className={s.companionAr}>{t.companionAr}</span>
        </div>
        <div className={s.summaryRight}>
          <span className={s.catTag} style={{ background: catColor + '22', color: catColor }}>{t.category}</span>
          <span className={s.chevron}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* expanded */}
      {isOpen && (
        <div className={s.detail}>
          {/* Arabic + translation */}
          <div className={s.ayahBlock}>
            <p className={s.ayahAr} dir="rtl">{t.ayahAr}</p>
            <p className={s.ayahEn}><span className={s.refBadge}>{t.ayahRef}</span> {t.ayahEn}</p>
            {t.ayahUr && <p className={s.ayahUr} dir="rtl">{t.ayahUr}</p>}
          </div>

          {/* Companion context */}
          <div className={s.companionBox}>
            <span className={s.compLabel}>Companion</span>
            <span className={s.compFull}>{t.companion} — {t.companionAr}</span>
            <span className={s.compRel}>{t.companionRel}</span>
          </div>

          {/* Story */}
          <div className={s.section}>
            <h3 className={s.sectionTitle}>The Story</h3>
            <p className={s.storyText}>{t.story}</p>
          </div>

          {/* Response */}
          <div className={s.section}>
            <h3 className={s.sectionTitle}>Companion's Response</h3>
            <p className={s.storyText}>{t.companionResponse}</p>
          </div>

          {/* Source */}
          <div className={s.sourceRow}>
            <span className={s.sourceLabel}>Primary Source</span>
            <span className={s.sourceText}>{t.source}</span>
          </div>
        </div>
      )}
    </article>
  );
}
