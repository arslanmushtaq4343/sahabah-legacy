import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { VOICE_ENTRIES } from '../../data/companionsExtra3';
import styles from './VoicesPage.module.css';

export default function VoicesPage() {
  const topics = useMemo(() => {
    const set = new Set<string>();
    VOICE_ENTRIES.forEach(v => set.add(v.topic));
    return Array.from(set).sort();
  }, []);

  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [randomSeed, setRandomSeed] = useState(() => Math.random());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return VOICE_ENTRIES.filter(v => {
      if (activeTopic !== 'all' && v.topic !== activeTopic) return false;
      if (!q) return true;
      const haystack = [
        v.topic,
        v.companion,
        v.quoteEn,
        v.quoteAr ?? '',
        v.context,
        ...v.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeTopic, search]);

  const randomEntry =
    filtered.length === 0
      ? null
      : filtered[Math.floor(randomSeed * filtered.length) % filtered.length];

  const surfaceRandom = useCallback(() => {
    setRandomSeed(Math.random());
  }, []);

  return (
    <div className={`${styles.page} premium-page`}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>The Sayings Wall</span>
        <h1 className={styles.title}>Voices of the Sahabah</h1>
        <p className={styles.subtitle}>
          Wisdom and counsel preserved from the companions of the Prophet ﷺ — searchable by life
          situation, theme, or word.
        </p>
      </header>

      {/* ── Random surface ─────────────────────────────── */}
      {randomEntry && (
        <section className={styles.spotlight} style={{ borderLeftColor: randomEntry.color }}>
          <div className={styles.spotlightLabel}>
            <span>Surfaced for you</span>
            <button
              type="button"
              onClick={surfaceRandom}
              className={styles.spotlightShuffle}
              aria-label="Surface another saying"
              title="Shuffle"
            >
              ⤺ shuffle
            </button>
          </div>
          {randomEntry.quoteAr && (
            <div className={styles.spotlightAr} style={{ color: randomEntry.color }}>
              {randomEntry.quoteAr}
            </div>
          )}
          <blockquote className={styles.spotlightEn}>{randomEntry.quoteEn}</blockquote>
          <div className={styles.spotlightMeta}>
            <span className={styles.spotlightCompanion} style={{ color: randomEntry.color }}>
              {randomEntry.companion}
            </span>
            <span className={styles.spotlightDot}>·</span>
            <span className={styles.spotlightTopic}>{randomEntry.topic}</span>
          </div>
        </section>
      )}

      {/* ── Filters ─────────────────────────────────────── */}
      <section className={styles.filters}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by word, companion, or theme…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search sayings"
        />
        <div className={styles.topicChips} role="tablist" aria-label="Filter by topic">
          <button
            className={`${styles.chip} ${activeTopic === 'all' ? styles.chipActive : ''}`}
            onClick={() => setActiveTopic('all')}
            role="tab"
            aria-selected={activeTopic === 'all' ? 'true' : 'false'}
          >
            All ({VOICE_ENTRIES.length})
          </button>
          {topics.map(t => {
            const count = VOICE_ENTRIES.filter(v => v.topic === t).length;
            return (
              <button
                key={t}
                className={`${styles.chip} ${activeTopic === t ? styles.chipActive : ''}`}
                onClick={() => setActiveTopic(t)}
                role="tab"
                aria-selected={activeTopic === t ? 'true' : 'false'}
              >
                {t} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Result count ─────────────────────────────── */}
      <div className={styles.resultBar}>
        <span>
          Showing <strong>{filtered.length}</strong>
          {filtered.length === VOICE_ENTRIES.length ? ' sayings' : ` of ${VOICE_ENTRIES.length}`}
        </span>
        {(search || activeTopic !== 'all') && (
          <button
            className={styles.clear}
            onClick={() => {
              setSearch('');
              setActiveTopic('all');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyMark}>✦</div>
          <p>No sayings match those filters. Try a different theme or clear your search.</p>
        </div>
      ) : (
        <section className={styles.grid}>
          {filtered.map((v, i) => (
            <article
              key={`${v.companionRank}-${i}`}
              className={styles.card}
              style={{ borderTopColor: v.color }}
            >
              <header className={styles.cardHead}>
                <span className={styles.cardTopic}>{v.topic}</span>
              </header>
              {v.quoteAr && (
                <div className={styles.cardAr} style={{ color: v.color }}>
                  {v.quoteAr}
                </div>
              )}
              <blockquote className={styles.cardEn}>{v.quoteEn}</blockquote>
              <div className={styles.cardContext}>{v.context}</div>
              <footer className={styles.cardFoot}>
                <div className={styles.cardCompanion} style={{ color: v.color }}>
                  — {v.companion}
                </div>
                <div className={styles.cardSource}>{v.source}</div>
              </footer>
            </article>
          ))}
        </section>
      )}

      <footer className={styles.pageFoot}>
        <Link to="/companions" className={styles.footLink}>
          Browse companions →
        </Link>
      </footer>
    </div>
  );
}
