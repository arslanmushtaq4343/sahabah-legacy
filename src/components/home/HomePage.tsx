import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANIONS } from '../../data/companions';
import styles from './HomePage.module.css';

/* ── CountUp component ──────────────────────────────────── */
function CountUp({
  end,
  suffix = '',
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
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
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Data ────────────────────────────────────────────────── */
const TOTAL_HADITHS = COMPANIONS.reduce((s, c) => s + (c.hadiths || 0), 0);
const UNIQUE_BATTLES = [...new Set(COMPANIONS.flatMap(c => c.battles))].length;

type StatIconId = 'people' | 'scroll' | 'sword' | 'crescent';
const STATS: { label: string; value: number; suffix: string; icon: StatIconId }[] = [
  { label: 'Companions Profiled', value: COMPANIONS.length, suffix: '', icon: 'people' },
  { label: 'Hadiths Narrated', value: TOTAL_HADITHS, suffix: '', icon: 'scroll' },
  { label: 'Battles Documented', value: UNIQUE_BATTLES, suffix: '+', icon: 'sword' },
  { label: 'Years of Legacy', value: 1400, suffix: '+', icon: 'crescent' },
];

function StatIcon({ id }: { id: StatIconId }) {
  switch (id) {
    case 'people':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'scroll':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 7c0-1.7 1.3-3 3-3h13v15a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z" />
          <path d="M16 4v3a2 2 0 0 0 2 2h3" />
          <path d="M7 9h6M7 13h6M7 17h4" />
        </svg>
      );
    case 'sword':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m14 4 6 6-9 9-3-3z" />
          <path d="m5 19 2 2" />
          <path d="M14 4 9 9" />
        </svg>
      );
    case 'crescent':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      );
  }
}

const FEATURED = COMPANIONS.slice(0, 6);

const QUOTES = [
  {
    text: 'Whoever guides someone to goodness will have a reward like the one who did it.',
    person: 'Abu Hurairah (رضي الله عنه)',
    source: 'Sahih Muslim · 1893',
  },
  {
    text: 'Take advantage of five before five: youth before old age, health before sickness, wealth before poverty, free time before business, and life before death.',
    person: 'Ibn Abbas (رضي الله عنه)',
    source: 'Al-Mustadrak · 7846',
  },
  {
    text: 'The best of you are those who are best in character.',
    person: 'Aisha (رضي الله عنها)',
    source: 'Sahih al-Bukhari · 3559',
  },
  {
    text: 'Do not belittle any act of goodness, even meeting your brother with a cheerful face.',
    person: 'Abu Dhar al-Ghifari (رضي الله عنه)',
    source: 'Sahih Muslim · 2626',
  },
];

const EXPLORE_TILES: { to: string; icon: string; title: string; desc: string }[] = [
  {
    to: '/companions',
    icon: '📖',
    title: 'Companions',
    desc: `Detailed profiles of all ${COMPANIONS.length} companions with biography, hadiths, and legacy.`,
  },
  {
    to: '/connections',
    icon: '🕸',
    title: 'Connections',
    desc: 'Interactive force-directed network mapping relationships between companions.',
  },
  {
    to: '/insights',
    icon: '📊',
    title: 'Insights',
    desc: 'Data visualizations — hadiths, battles, eras, and community patterns.',
  },
  {
    to: '/imams',
    icon: '⛓',
    title: 'Imam Chain',
    desc: 'Knowledge transmission chains from companions through scholars to today.',
  },
  {
    to: '/today',
    icon: '☼',
    title: 'On This Day',
    desc: 'Browse the era of the Sahabah by Hijri year — births, passings, and pivotal events.',
  },
  {
    to: '/voices',
    icon: '❝',
    title: 'Voices',
    desc: 'A searchable wall of sayings, organized by life situation and theme.',
  },
  {
    to: '/compass',
    icon: '✧',
    title: 'Companion Compass',
    desc: 'A short reflective quiz that matches you to a companion archetype.',
  },
];

const FEATURED_TICKER = [
  'Abu Bakr al-Siddiq',
  'Umar al-Faruq',
  'Uthman ibn Affan',
  'Ali ibn Abi Talib',
  'Khadijah bint Khuwaylid',
  'Aisha bint Abi Bakr',
  'Fatimah al-Zahra',
  'Khalid ibn al-Walid',
  'Bilal ibn Rabah',
  'Abu Hurairah',
  'Hamza ibn Abd al-Muttalib',
  'Salman al-Farisi',
];

export default function HomePage() {
  const [quoteIdx, setQuoteIdx] = useState(() => new Date().getDate() % QUOTES.length);
  const quote = QUOTES[quoteIdx];
  const nextQuote = () => setQuoteIdx(i => (i + 1) % QUOTES.length);
  const prevQuote = () => setQuoteIdx(i => (i - 1 + QUOTES.length) % QUOTES.length);

  return (
    <div className={`${styles.page} premium-page`}>
      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className={styles.hero}>
        {/* Decorative rotating star ornament */}
        <div className={styles.heroOrnaWrap} aria-hidden="true">
          <svg className={styles.heroOrna} viewBox="0 0 300 300">
            <polygon
              points="150,22 170,102 241,60 199,130 278,150 199,170 241,240 170,198 150,278 130,198 59,240 101,170 22,150 101,130 59,60 130,102"
              fill="none"
              stroke="rgba(184,134,11,0.14)"
              strokeWidth="1.2"
            />
            <circle cx="150" cy="150" r="108" fill="none" stroke="rgba(184,134,11,0.07)" strokeWidth="0.8" />
            <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(184,134,11,0.04)" strokeWidth="0.6" />
          </svg>
          <svg className={`${styles.heroOrna} ${styles.heroOrnaInner}`} viewBox="0 0 200 200">
            <polygon
              points="100,14 114,68 161,40 133,87 185,100 133,113 161,160 114,132 100,186 86,132 39,160 67,113 15,100 67,87 39,40 86,68"
              fill="none"
              stroke="rgba(184,134,11,0.09)"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Faint full-bleed arabesque watermark */}
        <svg className={styles.heroArabesque} viewBox="0 0 600 400" aria-hidden="true">
          <defs>
            <pattern id="arabesque" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M60 0 L75 45 L120 60 L75 75 L60 120 L45 75 L0 60 L45 45 Z"
                fill="none"
                stroke="rgba(15,111,92,0.18)"
                strokeWidth="0.6"
              />
              <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(184,134,11,0.12)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill="url(#arabesque)" />
        </svg>

        <div className={styles.heroInner}>
          {/* Bismillah ornamental banner */}
          <div className={styles.bismillahWrap}>
            <span className={styles.bismillahRule} aria-hidden="true" />
            <span className={styles.bismillahDiamond} aria-hidden="true" />
            <span className={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className={styles.bismillahDiamond} aria-hidden="true" />
            <span className={styles.bismillahRule} aria-hidden="true" />
          </div>

          {/* Editorial masthead dateline */}
          <div className={styles.masthead}>
            <span className={styles.mastheadDot} aria-hidden="true" />
            <span className={styles.mastheadLeft}>VOL. I</span>
            <span className={styles.mastheadCenter}>The Digital Encyclopedia · Est. 2025</span>
            <span className={styles.mastheadRight}>FOLIO 001</span>
            <span className={styles.mastheadRule} aria-hidden="true" />
          </div>

          {/* Bilingual title lockup */}
          <div className={styles.heroTitleLockup}>
            <div className={styles.heroTitleEn}>
              <h1 className={styles.heroTitle}>The Companions</h1>
              <p className={styles.heroTitleSub}>
                <span className={styles.heroTitleDash} aria-hidden="true">—</span>
                <span className={styles.heroTitleAccent}>of the Prophet ﷺ</span>
              </p>
            </div>
            <div className={styles.heroTitleArCol} aria-hidden="true">
              <span className={styles.heroTitleArMain}>الصَّحَابَةُ</span>
              <span className={styles.heroTitleArSub}>الكِرَام</span>
            </div>
          </div>

          {/* Editorial blockquote subtitle */}
          <blockquote className={styles.heroSub}>
            An encyclopaedic record of those who walked beside the Messenger of Allah — their
            sacrifice, knowledge, and legacy across fourteen centuries of Islamic history.
          </blockquote>

          {/* CTA cluster */}
          <div className={styles.heroCtas}>
            <Link to="/companions" className={styles.ctaPrimary}>
              <span>Explore All Companions</span>
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
            <div className={styles.heroGhostGroup}>
              <Link to="/connections" className={styles.ctaSecondary}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <circle cx="4" cy="6" r="1.4" fill="currentColor" />
                  <circle cx="20" cy="6" r="1.4" fill="currentColor" />
                  <circle cx="4" cy="18" r="1.4" fill="currentColor" />
                  <circle cx="20" cy="18" r="1.4" fill="currentColor" />
                  <path d="M12 12 4 6M12 12l8-6M12 12 4 18M12 12l8 6" opacity="0.5" />
                </svg>
                Network Map
              </Link>
              <span className={styles.ctaSeparator} aria-hidden="true">|</span>
              <Link to="/insights" className={styles.ctaSecondary}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 4 4 5-5" />
                </svg>
                Insights
              </Link>
              <span className={styles.ctaSeparator} aria-hidden="true">|</span>
              <a href="#explore" className={styles.ctaSecondary}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="m6 13 6 6 6-6" />
                </svg>
                Scroll to Discover
              </a>
            </div>
          </div>

          {/* Featured companions ticker */}
          <div className={styles.heroTicker} aria-hidden="true">
            <span className={styles.heroTickerLbl}>
              Featured <span className={styles.heroTickerLblDiamond}>◆</span>
            </span>
            <div className={styles.heroTickerTrack}>
              {(() => {
                const text = FEATURED_TICKER.join('  ◆  ');
                return (
                  <>
                    <span>{text}</span>
                    <span aria-hidden="true">{text}</span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Divider ornament */}
        <div className={styles.heroDiv} aria-hidden="true">
          <span />
          <svg width="28" height="28" viewBox="0 0 28 28">
            <polygon
              points="14,1 17,10 26,10 19,16 22,25 14,19.5 6,25 9,16 2,10 11,10"
              fill="rgba(184,134,11,0.35)"
            />
          </svg>
          <span />
        </div>
      </section>

      {/* ══ Stats bar — monumental editorial band ═════════ */}
      <section className={styles.statsBar} aria-label="Archive statistics">
        <span className={styles.statsMarkLeft}>Live Archive</span>
        <span className={styles.statsMarkRight}>Est. 7th Century AH</span>
        <div className={styles.statsRow}>
          {STATS.map(({ label, value, suffix, icon }, i) => (
            <div key={label} className={styles.stat} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className={styles.statIcon} aria-hidden="true">
                <StatIcon id={icon} />
              </span>
              <span className={styles.statValue}>
                <CountUp end={value} suffix={suffix} />
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ Featured companions — masonry editorial spread ══ */}
      <section className={styles.featured}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadLeft}>
            <span className={styles.sectionEyebrow}>The Foremost</span>
            <h2 className={styles.sectionTitle}>Featured Companions</h2>
            <span className={styles.sectionTitleAr} aria-hidden="true">
              نُخْبَةُ الصَّحَابَة
            </span>
          </div>
          <Link to="/companions" className={styles.viewAll}>
            View all {COMPANIONS.length} <span className={styles.viewAllArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.featGrid}>
          {FEATURED.map((c, i) => {
            // Layout class drives the masonry placement:
            // i=0 → full-width feature, i=1,2,4,5 → half, i=3 → tall narrow right rail
            const layoutClass =
              i === 0
                ? styles.featCardHero
                : i === 3
                  ? styles.featCardTall
                  : styles.featCardHalf;
            return (
              <Link
                to="/companions"
                key={c.rank}
                className={`${styles.featCard} ${layoutClass}`}
                style={
                  {
                    '--cat': `var(--color-${c.cat})`,
                    animationDelay: `${i * 0.08}s`,
                  } as React.CSSProperties
                }
              >
                <span className={styles.featAccent} aria-hidden="true" />
                <span className={styles.featArWatermark} aria-hidden="true">
                  {c.ar}
                </span>
                <div className={styles.featTop}>
                  <span className={styles.featRankSeal}>
                    <span className={styles.featRankSealNum}>#{c.rank}</span>
                  </span>
                  <span
                    className={styles.featRoleStamp}
                    style={{ borderColor: `var(--color-${c.cat})`, color: `var(--color-${c.cat})` }}
                  >
                    {c.catLabel}
                  </span>
                </div>
                <div className={styles.featBody}>
                  <p className={styles.featAr}>{c.ar}</p>
                  <h3 className={styles.featName}>{c.name}</h3>
                  <p className={styles.featEpithet}>
                    <span aria-hidden="true">—</span> {c.title}
                  </p>
                  <p className={styles.featSig}>{c.sig}</p>
                </div>
                <div className={styles.featStats}>
                  {c.hadiths > 0 && (
                    <span className={styles.featStat}>
                      <span className={styles.featStatNum}>{c.hadiths.toLocaleString()}</span>
                      <span className={styles.featStatLbl}>Hadiths</span>
                    </span>
                  )}
                  {c.battles.length > 0 && (
                    <span className={styles.featStat}>
                      <span className={styles.featStatNum}>{c.battles.length}</span>
                      <span className={styles.featStatLbl}>Battles</span>
                    </span>
                  )}
                  {c.born && (
                    <span className={styles.featStat}>
                      <span className={styles.featStatNum}>{c.born}</span>
                      <span className={styles.featStatLbl}>Born</span>
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══ Hadith pull-quote — rotating ═════════════════════ */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteMark} aria-hidden="true">"</div>
        <div className={styles.quoteInner}>
          <span className={styles.quoteProvenance}>Sahih Hadith</span>
          <blockquote className={styles.quoteText} key={quoteIdx}>
            {quote.text}
          </blockquote>
          <div className={styles.quoteAttrRule} aria-hidden="true" />
          <div className={styles.quoteAttrRow}>
            <cite className={styles.quotePerson}>{quote.person}</cite>
            <span className={styles.quoteSource}>· {quote.source}</span>
          </div>
          <div className={styles.quoteNav}>
            <button
              type="button"
              className={styles.quoteNavBtn}
              onClick={prevQuote}
              aria-label="Previous quote"
            >
              ←
            </button>
            <span className={styles.quoteDots} aria-hidden="true">
              {QUOTES.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.quoteDot} ${i === quoteIdx ? styles.quoteDotActive : ''}`}
                />
              ))}
            </span>
            <button
              type="button"
              className={styles.quoteNavBtn}
              onClick={nextQuote}
              aria-label="Next quote"
            >
              →
            </button>
          </div>
        </div>
        <div className={styles.quoteOrn} aria-hidden="true">
          ✦ &nbsp; ◆ &nbsp; ✦
        </div>
      </section>

      {/* ══ Explore tiles — feature + list hybrid ════════════ */}
      <section className={styles.explore} id="explore">
        <div className={styles.exploreHead}>
          <span className={styles.exploreHeadRule} aria-hidden="true" />
          <span className={styles.exploreHeadLbl}>Navigate</span>
          <span className={styles.exploreHeadRule} aria-hidden="true" />
        </div>
        <div className={styles.exploreTitleRow}>
          <h2 className={styles.sectionTitle}>Explore the Archive</h2>
          <span className={styles.sectionTitleAr} aria-hidden="true">
            اسْتَكْشِفِ الأَرْشِيف
          </span>
        </div>

        <div className={styles.exploreGrid}>
          {/* Companions — double-width feature */}
          <Link to="/companions" className={`${styles.exploreFeat} ${styles.exploreFeatCompanions}`}>
            <div className={styles.exploreFeatBadge} aria-hidden="true">
              <svg viewBox="0 0 50 50" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4">
                <polygon
                  points="25,3 30,17 45,17 33,27 38,42 25,33 12,42 17,27 5,17 20,17"
                  fill="currentColor"
                  opacity="0.18"
                />
                <circle cx="25" cy="25" r="9" />
                <path d="M19 28a6 6 0 0 1 12 0" />
                <circle cx="25" cy="22" r="3" />
              </svg>
            </div>
            <div className={styles.exploreFeatBody}>
              <span className={styles.exploreFeatKicker}>Primary archive</span>
              <h3 className={styles.exploreFeatTitle}>Companions</h3>
              <p className={styles.exploreFeatDesc}>
                Detailed profiles of all {COMPANIONS.length} companions — biography, hadiths narrated, battles,
                lineage, and legacy across the early Islamic centuries.
              </p>
              <span className={styles.exploreFeatCta}>
                Start Exploring <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* Connections — wide accent card */}
          <Link to="/connections" className={`${styles.exploreFeat} ${styles.exploreFeatConnections}`}>
            <div className={styles.exploreFeatGraph} aria-hidden="true">
              <svg viewBox="0 0 200 120" width="100%" height="100%">
                <defs>
                  <radialGradient id="hubGrad">
                    <stop offset="0%" stopColor="rgba(184,134,11,0.6)" />
                    <stop offset="100%" stopColor="rgba(184,134,11,0.05)" />
                  </radialGradient>
                </defs>
                {/* edges */}
                {[
                  [40, 30], [40, 90], [80, 20], [80, 100], [140, 25], [140, 95], [170, 50], [170, 80], [25, 60], [180, 60],
                ].map((p, i) => (
                  <line key={i} x1={100} y1={60} x2={p[0]} y2={p[1]} stroke="rgba(15,111,92,0.3)" strokeWidth="0.6" />
                ))}
                {/* hub */}
                <circle cx="100" cy="60" r="14" fill="url(#hubGrad)" />
                <circle cx="100" cy="60" r="5" fill="rgba(184,134,11,0.85)" />
                {/* nodes */}
                {[[40, 30, '#0f6f5c'], [40, 90, '#b8860b'], [80, 20, '#8b1a38'], [80, 100, '#7a5530'], [140, 25, '#0f6f5c'], [140, 95, '#b8860b'], [170, 50, '#8b1a38'], [170, 80, '#7a5530'], [25, 60, '#138a73'], [180, 60, '#138a73']].map((n, i) => (
                  <circle key={i} cx={n[0] as number} cy={n[1] as number} r="3.5" fill={n[2] as string} stroke="#fff" strokeWidth="0.8" />
                ))}
              </svg>
            </div>
            <div className={styles.exploreFeatBody}>
              <span className={styles.exploreFeatKicker}>Atlas</span>
              <h3 className={styles.exploreFeatTitle}>Connections</h3>
              <p className={styles.exploreFeatDesc}>
                Force-directed network mapping relationships, scholarly lineages, and the spread of
                prophetic knowledge.
              </p>
              <span className={styles.exploreFeatCta}>
                Open Atlas <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          {/* Remaining tiles as horizontal list */}
          <div className={styles.exploreList}>
            {EXPLORE_TILES.slice(2).map(({ to, icon, title, desc }, i) => (
              <Link
                key={to}
                to={to}
                className={styles.tile}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className={styles.tileIcon} aria-hidden="true">{icon}</span>
                <div className={styles.tileBody}>
                  <h3 className={styles.tileTitle}>{title}</h3>
                  <p className={styles.tileDesc}>{desc}</p>
                </div>
                <span className={styles.tileArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Editorial footer strip ═══════════════════════════ */}
      <footer className={styles.footerBar}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <span className={styles.footerBrandAr} aria-hidden="true">الصحابة</span>
            <span className={styles.footerBrandWord}>Sahabah</span>
          </div>
          <div className={styles.footerTagline}>
            <span className={styles.footerOrn}>◆</span>
            <span className={styles.footerTaglineText}>1,400 Years of Preserved Knowledge</span>
            <span className={styles.footerOrn}>◆</span>
          </div>
          <nav className={styles.footerNav} aria-label="Footer">
            <Link to="/">Home</Link>
            <span aria-hidden="true">·</span>
            <Link to="/companions">Companions</Link>
            <span aria-hidden="true">·</span>
            <Link to="/insights">Insights</Link>
            <span aria-hidden="true">·</span>
            <Link to="/imams">Archive</Link>
          </nav>
        </div>
        <div className={styles.footerMicro}>
          <span>Built with reverence</span>
          <span aria-hidden="true">·</span>
          <span>All narrations sourced from classical hadith literature</span>
          <span aria-hidden="true">·</span>
          <span>© 2025</span>
        </div>
      </footer>
    </div>
  );
}
