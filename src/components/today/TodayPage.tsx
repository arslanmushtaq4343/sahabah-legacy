import { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { BIRTH_AH, DEATH_AH, KEY_EVENTS } from '../../data/connectionData';
import { getHijriDayOfYear, DAILY_EVENTS } from '../../data/globalFeatures';
import styles from './TodayPage.module.css';

const MIN_YEAR = -55;
const MAX_YEAR = 100;

function formatYear(yearAH: number): string {
  if (yearAH < 0) return `${Math.abs(yearAH)} BH`;
  if (yearAH === 0) return '0 (Year of Hijra)';
  return `${yearAH} AH`;
}

function approxCurrentHijriYear(): number {
  // Rough conversion from CE to AH for the "today" anchor.
  const ce = new Date().getFullYear();
  return Math.floor((ce - 622) * 1.030684);
}

export default function TodayPage() {
  const { yearParam } = useParams<{ yearParam?: string }>();
  const navigate = useNavigate();

  const initialYear = useMemo(() => {
    if (yearParam) {
      const n = parseInt(yearParam, 10);
      if (!Number.isNaN(n) && n >= MIN_YEAR && n <= MAX_YEAR) return n;
    }
    return 11; // Year of the Prophet's ﷺ death — pivotal anchor for the companion era
  }, [yearParam]);

  const [year, setYear] = useState(initialYear);

  useEffect(() => {
    setYear(initialYear);
  }, [initialYear]);

  const dayOfYear = getHijriDayOfYear();
  const todayEvent = DAILY_EVENTS[dayOfYear];
  const todayEventCompanion = todayEvent
    ? COMPANIONS.find(c => c.rank === todayEvent.companionRank)
    : null;
  const currentHijriYear = approxCurrentHijriYear();

  const eventsThisYear = useMemo(() => KEY_EVENTS.filter(e => e.yearAH === year), [year]);

  const bornThisYear = useMemo(() => {
    return Object.entries(BIRTH_AH)
      .filter(([, y]) => y === year)
      .map(([rank]) => COMPANIONS.find(c => c.rank === parseInt(rank, 10)))
      .filter((c): c is (typeof COMPANIONS)[0] => !!c);
  }, [year]);

  const diedThisYear = useMemo(() => {
    return Object.entries(DEATH_AH)
      .filter(([, y]) => y === year)
      .map(([rank]) => COMPANIONS.find(c => c.rank === parseInt(rank, 10)))
      .filter((c): c is (typeof COMPANIONS)[0] => !!c);
  }, [year]);

  function changeYear(delta: number) {
    const next = Math.min(MAX_YEAR, Math.max(MIN_YEAR, year + delta));
    setYear(next);
    navigate(`/today/${next}`, { replace: true });
  }

  function pickYear(y: number) {
    setYear(y);
    navigate(`/today/${y}`, { replace: true });
  }

  const yearMarkers = KEY_EVENTS.map(e => e.yearAH);
  const sliderPct = ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  return (
    <div className={`${styles.page} premium-page`}>
      {/* ── Hero ───────────────────────────────────────── */}
      <header className={styles.hero}>
        <span className={styles.eyebrow}>The Time Axis</span>
        <h1 className={styles.title}>On This Day &amp; Year</h1>
        <p className={styles.subtitle}>
          Browse the era of the Sahabah by Hijri year. Each year reveals who was born, who passed,
          and the events that shaped Islamic history.
        </p>
      </header>

      {/* ── Today's spotlight (day-of-year) ───────────── */}
      {todayEvent && (
        <section className={styles.todayCard}>
          <div className={styles.todayLabel}>
            <span className={styles.todayDot} />
            On this day in Islamic history (Hijri day {dayOfYear} · ~{currentHijriYear} AH)
          </div>
          <div className={styles.todayEvent}>{todayEvent.event}</div>
          {todayEventCompanion && (
            <Link to="/companions" className={styles.todayLink}>
              See {todayEventCompanion.name} →
            </Link>
          )}
        </section>
      )}

      {/* ── Year navigator ────────────────────────────── */}
      <section className={styles.navigator}>
        <button
          className={styles.navBtn}
          onClick={() => changeYear(-1)}
          disabled={year <= MIN_YEAR}
          aria-label="Previous year"
        >
          ← {formatYear(year - 1)}
        </button>
        <div className={styles.navCenter}>
          <div className={styles.yearLabel}>{formatYear(year)}</div>
          <div className={styles.yearCe}>{622 + Math.round(year / 1.0307)} CE (approx)</div>
        </div>
        <button
          className={styles.navBtn}
          onClick={() => changeYear(1)}
          disabled={year >= MAX_YEAR}
          aria-label="Next year"
        >
          {formatYear(year + 1)} →
        </button>
      </section>

      {/* ── Slider with markers ────────────────────────── */}
      <section className={styles.slider}>
        <div className={styles.sliderTrack}>
          {yearMarkers.map((m, i) => {
            const pct = ((m - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
            return (
              <button
                key={i}
                className={styles.sliderMarker}
                style={{ left: `${pct}%` }}
                onClick={() => pickYear(m)}
                title={KEY_EVENTS[i].label}
                aria-label={KEY_EVENTS[i].label}
              />
            );
          })}
          <div
            className={styles.sliderHandle}
            style={{ left: `${sliderPct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className={styles.sliderRange}>
          <span>{formatYear(MIN_YEAR)}</span>
          <span>{formatYear(MAX_YEAR)}</span>
        </div>
      </section>

      {/* ── Three cards: Events / Born / Died ──────────── */}
      <section className={styles.cards}>
        <article className={styles.card}>
          <header className={styles.cardHead}>
            <span className={styles.cardIcon}>✦</span>
            <h2>Key Events</h2>
            <span className={styles.cardCount}>{eventsThisYear.length}</span>
          </header>
          {eventsThisYear.length === 0 ? (
            <p className={styles.empty}>No major recorded events this year.</p>
          ) : (
            <ul className={styles.eventList}>
              {eventsThisYear.map((e, i) => (
                <li key={i} className={styles.eventItem}>
                  <div className={styles.eventLabel}>{e.label}</div>
                  <div className={styles.eventNote}>{e.note}</div>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className={styles.card}>
          <header className={styles.cardHead}>
            <span className={styles.cardIcon}>◌</span>
            <h2>Born</h2>
            <span className={styles.cardCount}>{bornThisYear.length}</span>
          </header>
          {bornThisYear.length === 0 ? (
            <p className={styles.empty}>No companion in our archive born this year.</p>
          ) : (
            <ul className={styles.companionList}>
              {bornThisYear.map(c => (
                <li
                  key={c.rank}
                  className={styles.companionItem}
                  style={{ borderLeftColor: CAT_COLORS[c.cat] ?? '#888' }}
                >
                  <div className={styles.companionAr}>{c.ar}</div>
                  <div className={styles.companionName}>{c.name}</div>
                  <div className={styles.companionCat}>{c.catLabel}</div>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className={styles.card}>
          <header className={styles.cardHead}>
            <span className={styles.cardIcon}>☾</span>
            <h2>Passed</h2>
            <span className={styles.cardCount}>{diedThisYear.length}</span>
          </header>
          {diedThisYear.length === 0 ? (
            <p className={styles.empty}>No companion in our archive passed this year.</p>
          ) : (
            <ul className={styles.companionList}>
              {diedThisYear.map(c => (
                <li
                  key={c.rank}
                  className={styles.companionItem}
                  style={{ borderLeftColor: CAT_COLORS[c.cat] ?? '#888' }}
                >
                  <div className={styles.companionAr}>{c.ar}</div>
                  <div className={styles.companionName}>{c.name}</div>
                  <div className={styles.companionCat}>{c.catLabel}</div>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <footer className={styles.footer}>
        <Link to="/companions" className={styles.footerLink}>
          Browse all companions →
        </Link>
      </footer>
    </div>
  );
}
