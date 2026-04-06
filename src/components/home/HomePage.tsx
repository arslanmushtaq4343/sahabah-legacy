import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANIONS } from '../../data/companions';
import styles from './HomePage.module.css';

/* ── CountUp component ──────────────────────────────────── */
function CountUp({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Data ────────────────────────────────────────────────── */
const TOTAL_HADITHS = COMPANIONS.reduce((s, c) => s + (c.hadiths || 0), 0);
const UNIQUE_BATTLES = [...new Set(COMPANIONS.flatMap(c => c.battles))].length;

const STATS = [
  { label: 'Companions Profiled', value: COMPANIONS.length, isNum: true, suffix: '' },
  { label: 'Hadiths Narrated',    value: TOTAL_HADITHS,     isNum: true, suffix: '' },
  { label: 'Battles Documented',  value: UNIQUE_BATTLES,    isNum: true, suffix: '+' },
  { label: 'Years of Legacy',     value: 1400,              isNum: true, suffix: '+' },
];

const FEATURED = COMPANIONS.slice(0, 6);

const QUOTES = [
  { text: 'Whoever guides someone to goodness will have a reward like the one who did it.', person: 'Abu Hurairah (رضي الله عنه)' },
  { text: 'Take advantage of five before five: youth before old age, health before sickness, wealth before poverty, free time before business, and life before death.', person: 'Ibn Abbas (رضي الله عنه)' },
  { text: 'The best of you are those who are best in character.', person: 'Aisha (رضي الله عنها)' },
  { text: 'Do not belittle any act of goodness, even meeting your brother with a cheerful face.', person: 'Abu Dhar al-Ghifari (رضي الله عنه)' },
];

const DAILY_QUOTE = QUOTES[new Date().getDate() % QUOTES.length];

const EXPLORE_TILES = [
  { to: '/companions',  icon: '📖', title: 'Companions',    desc: 'Detailed profiles of all 103 companions with biography, hadiths, and legacy.' },
  { to: '/connections', icon: '🕸', title: 'Connections',   desc: 'Interactive force-directed network mapping relationships between companions.' },
  { to: '/insights',    icon: '📊', title: 'Insights',      desc: 'Data visualizations — hadiths, battles, eras, and community patterns.' },
  { to: '/imams',       icon: '⛓', title: 'Imam Chain',    desc: 'Knowledge transmission chains from companions through scholars to today.' },
];

export default function HomePage() {
  return (
    <div className={`${styles.page} premium-page`}>

      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className={styles.hero}>
        {/* Decorative rotating star ornament */}
        <div className={styles.heroOrnaWrap} aria-hidden="true">
          <svg className={styles.heroOrna} viewBox="0 0 300 300">
            <polygon points="150,22 170,102 241,60 199,130 278,150 199,170 241,240 170,198 150,278 130,198 59,240 101,170 22,150 101,130 59,60 130,102"
              fill="none" stroke="rgba(184,134,11,0.14)" strokeWidth="1.2" />
            <circle cx="150" cy="150" r="108" fill="none" stroke="rgba(184,134,11,0.07)" strokeWidth="0.8" />
            <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(184,134,11,0.04)" strokeWidth="0.6" />
          </svg>
          <svg className={`${styles.heroOrna} ${styles.heroOrnaInner}`} viewBox="0 0 200 200">
            <polygon points="100,14 114,68 161,40 133,87 185,100 133,113 161,160 114,132 100,186 86,132 39,160 67,113 15,100 67,87 39,40 86,68"
              fill="none" stroke="rgba(184,134,11,0.09)" strokeWidth="0.8" />
          </svg>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.bismillahWrap}>
            <span className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          </div>
          <div className={styles.heroBadge}>The Digital Encyclopedia</div>
          <h1 className={styles.heroTitle}>
            The Companions<br />
            <span className={styles.heroTitleAccent}>of the Prophet ﷺ</span>
          </h1>
          <p className={styles.heroSub}>
            An encyclopaedic record of those who walked beside the Messenger of Allah —
            their sacrifice, knowledge, and legacy across fourteen centuries of Islamic history.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/companions" className={styles.ctaPrimary}>
              <span>Explore All Companions</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link to="/connections" className={styles.ctaSecondary}>
              Network Map
            </Link>
            <Link to="/insights" className={styles.ctaSecondary}>
              Insights
            </Link>
          </div>
        </div>

        {/* Divider ornament */}
        <div className={styles.heroDiv} aria-hidden="true">
          <span />
          <svg width="28" height="28" viewBox="0 0 28 28">
            <polygon points="14,1 17,10 26,10 19,16 22,25 14,19.5 6,25 9,16 2,10 11,10"
              fill="rgba(184,134,11,0.35)" />
          </svg>
          <span />
        </div>
      </section>

      {/* ══ Stats bar ══════════════════════════════════════ */}
      <section className={styles.statsBar}>
        {STATS.map(({ label, value, isNum, suffix }, i) => (
          <div key={label} className={styles.stat} style={{ animationDelay: `${i * .12}s` }}>
            <span className={styles.statValue}>
              {isNum ? <CountUp end={value} suffix={suffix} /> : value}
            </span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </section>

      {/* ══ Featured companions ════════════════════════════ */}
      <section className={styles.featured}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadLeft}>
            <span className={styles.sectionEyebrow}>The Foremost</span>
            <h2 className={styles.sectionTitle}>Featured Companions</h2>
          </div>
          <Link to="/companions" className={styles.viewAll}>View all 103 →</Link>
        </div>
        <div className={styles.cards}>
          {FEATURED.map((c, i) => (
            <Link
              to="/companions"
              key={c.rank}
              className={styles.card}
              style={{ '--cat': `var(--color-${c.cat})`, animationDelay: `${i * .08}s` } as React.CSSProperties}
            >
              <div className={styles.cardAccent} />
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.cardRank}>Rank #{c.rank}</span>
                  <span className={styles.cardCat} style={{ background: `var(--color-${c.cat})` }}>
                    {c.catLabel}
                  </span>
                </div>
                <p className={styles.cardAr}>{c.ar}</p>
                <h3 className={styles.cardName}>{c.name}</h3>
                <p className={styles.cardTitle}>{c.title}</p>
                <p className={styles.cardSig}>{c.sig}</p>
                <div className={styles.cardMeta}>
                  {c.hadiths > 0 && <span>📜 {c.hadiths.toLocaleString()} hadiths</span>}
                  {c.battles.length > 0 && <span>⚔️ {c.battles.length} battles</span>}
                  {c.born && <span>🗓 {c.born}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ Daily wisdom quote ═════════════════════════════ */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteMark} aria-hidden="true">"</div>
        <blockquote className={styles.quoteText}>{DAILY_QUOTE.text}</blockquote>
        <cite className={styles.quotePerson}>{DAILY_QUOTE.person}</cite>
        <div className={styles.quoteOrn} aria-hidden="true">✦ ✦ ✦</div>
      </section>

      {/* ══ Explore tiles ══════════════════════════════════ */}
      <section className={styles.explore}>
        <div className={styles.exploreHead}>
          <span className={styles.sectionEyebrow}>Navigate</span>
          <h2 className={styles.sectionTitle}>Explore the Archive</h2>
        </div>
        <div className={styles.tiles}>
          {EXPLORE_TILES.map(({ to, icon, title, desc }, i) => (
            <Link key={to} to={to} className={styles.tile}
              style={{ animationDelay: `${i * .1}s` }}>
              <span className={styles.tileIcon}>{icon}</span>
              <div className={styles.tileBody}>
                <h3 className={styles.tileTitle}>{title}</h3>
                <p className={styles.tileDesc}>{desc}</p>
              </div>
              <span className={styles.tileArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer bar */}
      <footer className={styles.footerBar}>
        <span className={styles.footerOrn}>✦</span>
        <span>1,400 years of preserved knowledge</span>
        <span className={styles.footerOrn}>✦</span>
      </footer>
    </div>
  );
}
