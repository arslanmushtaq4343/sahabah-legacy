import { useNavigate } from 'react-router-dom';
import s from './LibraryPage.module.css';

const COLLECTIONS = [
  {
    id: 'quran-triggers',
    num: '01',
    title: 'Quranic Revelation Trigger Index',
    subtitle: 'Asbab al-Nuzul — Companion Edition',
    desc: 'Every ayah of the Quran revealed because of a specific companion — with the full story, companion\'s response, Arabic text, English & Urdu translation, and hadith source. Never compiled in one digital place.',
    count: 20,
    unit: 'Revelation Events',
    icon: '📖',
    accent: '#b8860b',
    path: '/library/quran-triggers',
  },
  {
    id: 'laqab',
    num: '02',
    title: 'Prophetic Nicknames — Laqab Encyclopedia',
    subtitle: 'Honorary Titles Given by the Prophet ﷺ',
    desc: 'Every honorific personally bestowed by the Prophet ﷺ — "Siddiq", "Faruq", "Dhul-Nurayn", "Saifullah" — with the Arabic laqab, its meaning, the occasion given, the Prophet\'s exact words in Arabic, and the source hadith.',
    count: 15,
    unit: 'Prophetic Titles',
    icon: '🏅',
    accent: '#1a3462',
    path: '/library/laqab',
  },
  {
    id: 'deaths',
    num: '03',
    title: 'Death Encyclopedia',
    subtitle: 'Cause-of-Death + Interactive Map',
    desc: 'Every major companion\'s exact death location, cause (martyrdom / natural / plague / assassination), year in AH & CE, who was present, final moments, burial site — visualised on a historical SVG map of the Islamic world.',
    count: 30,
    unit: 'Companion Deaths',
    icon: '⚰️',
    accent: '#5a1a1a',
    path: '/library/deaths',
  },
  {
    id: 'last-words',
    num: '04',
    title: 'Last Words of the Companions',
    subtitle: 'Final Statements Before Death',
    desc: 'The last recorded words of every companion before they died — in Arabic with source book, context, and category. Some are famous, many are obscure, none have ever been compiled together in one digital source.',
    count: 20,
    unit: 'Final Statements',
    icon: '🕯️',
    accent: '#2a0a4a',
    path: '/library/last-words',
  },
];

export default function LibraryPage() {
  const nav = useNavigate();

  return (
    <div className={`${s.page} premium-page`}>
      <header className={s.header}>
        <div className={s.headerDecor} aria-hidden />
        <p className={s.superLabel}>Unique Data — Never Compiled Online</p>
        <h1 className={s.title}>Companion <span className={s.gold}>Archive</span></h1>
        <p className={s.subtitle}>
          Four primary-source compilations drawn from Seerah, Tafsir, Tabaqat, and Hadith literature —
          assembled here for the first time as an interconnected digital reference.
        </p>
        <div className={s.stats}>
          <div className={s.stat}><span className={s.statNum}>85</span><span className={s.statLabel}>Total Entries</span></div>
          <div className={s.statDiv} />
          <div className={s.stat}><span className={s.statNum}>4</span><span className={s.statLabel}>Collections</span></div>
          <div className={s.statDiv} />
          <div className={s.stat}><span className={s.statNum}>50+</span><span className={s.statLabel}>Primary Sources</span></div>
        </div>
      </header>

      <div className={s.grid}>
        {COLLECTIONS.map((col) => (
          <button
            key={col.id}
            className={s.card}
            style={{ '--accent': col.accent } as React.CSSProperties}
            onClick={() => nav(col.path)}
          >
            <div className={s.cardNum}>{col.num}</div>
            <div className={s.cardIcon}>{col.icon}</div>
            <div className={s.cardBody}>
              <p className={s.cardSub}>{col.subtitle}</p>
              <h2 className={s.cardTitle}>{col.title}</h2>
              <p className={s.cardDesc}>{col.desc}</p>
            </div>
            <div className={s.cardFooter}>
              <span className={s.badge} style={{ background: col.accent + '22', color: col.accent, border: `1px solid ${col.accent}44` }}>
                {col.count} {col.unit}
              </span>
              <span className={s.arrow}>→</span>
            </div>
            <div className={s.cardBg} style={{ background: col.accent }} aria-hidden />
          </button>
        ))}
      </div>

      <div className={s.notice}>
        <span className={s.starDeco}>✦</span>
        All entries drawn from classical primary sources: Sahih Bukhari, Sahih Muslim, Musnad Ahmad,
        Tabaqat Ibn Sa'd, Seerah Ibn Hisham, Tafsir Ibn Kathir, Hilyat al-Awliya', and more.
        <span className={s.starDeco}>✦</span>
      </div>
    </div>
  );
}
