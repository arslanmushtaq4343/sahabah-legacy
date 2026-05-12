import { useState } from 'react';
import { DEDICATION_QUOTES, VOICE_ENTRIES } from '../../data/companionsExtra3';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import styles from './CompanionsPage.module.css';

/* ----------------------------------------------------------------
   Dedication Generator (Feature 84) — used by CompanionModal
   ---------------------------------------------------------------- */
export function DedicationGenerator({
  companionRank,
  onClose,
}: {
  companionRank?: number;
  onClose: () => void;
}) {
  useBodyScrollLock(true);
  const available = companionRank
    ? DEDICATION_QUOTES.filter(q => q.rank === companionRank)
    : DEDICATION_QUOTES;
  const [selected, setSelected] = useState(available[0] || DEDICATION_QUOTES[0]);

  return (
    <div className={styles.dgOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.dgBox}>
        <button type="button" className={styles.dgClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.dgTitle}>Dedication Generator</h2>
        <p className={styles.dgSub}>
          Choose a companion and a quote to generate a printable framed card with Arabic calligraphy
          styling.
        </p>
        <div className={styles.dgPicker}>
          {DEDICATION_QUOTES.map((q, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dgPickBtn} ${selected === q ? styles.dgPickActive : ''}`}
              style={selected === q ? { borderColor: q.color, color: q.color } : {}}
              onClick={() => setSelected(q)}
            >
              {q.companion.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        <div className={styles.dgCard} style={{ borderColor: selected.color }} id="dg-printable">
          <div className={styles.dgBorder} style={{ borderColor: selected.color + '66' }}>
            <div className={styles.dgTopOrnament} style={{ color: selected.color }}>
              ✦✦✦
            </div>
            {selected.quoteAr && (
              <div className={`${styles.dgQuoteAr} ar`} style={{ color: selected.color }}>
                {selected.quoteAr}
              </div>
            )}
            <div className={styles.dgQuoteEn}>{selected.quoteEn}</div>
            <div className={styles.dgAttrib} style={{ color: selected.color }}>
              {selected.companion}
            </div>
            <div className={styles.dgOccasion}>{selected.occasion}</div>
            <div className={styles.dgSource}>{selected.source}</div>
            <div className={styles.dgBottomOrnament} style={{ color: selected.color }}>
              ✦✦✦
            </div>
          </div>
        </div>
        <button type="button" className={styles.dgPrint} onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Companion Voice (Feature 86) — used by CompanionModal
   ---------------------------------------------------------------- */
export function CompanionVoice({
  companionRank,
  onClose,
}: {
  companionRank?: number;
  onClose: () => void;
}) {
  useBodyScrollLock(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof VOICE_ENTRIES | null>(null);

  const search = () => {
    const q = query.toLowerCase().trim();
    if (!q) return;
    const words = q.split(/\s+/);
    const scored = VOICE_ENTRIES.filter(
      e => !companionRank || e.companionRank === companionRank || e.companionRank === 0
    )
      .map(e => {
        const score = e.keywords.filter(kw =>
          words.some(w => kw.includes(w) || w.includes(kw))
        ).length;
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
        <button type="button" className={styles.cvClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.cvTitle}>Companion Voice</h2>
        <p className={styles.cvSub}>
          Type any question or feeling — the system finds the closest matching statement from a
          companion, retrieved from authenticated historical records.
        </p>
        <div className={styles.cvSearch}>
          <input
            className={styles.cvInput}
            placeholder="e.g. 'I feel anxious about money', 'how to be brave', 'dealing with injustice'…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
          />
          <button type="button" className={styles.cvSearchBtn} onClick={search}>
            Find a Voice
          </button>
        </div>

        {results !== null && results.length === 0 && (
          <p className={styles.cvNoResult}>
            No close match found. Try: anger, anxiety, money, death, knowledge, patience, truth,
            leadership, purpose, family.
          </p>
        )}
        {results !== null && results.length > 0 && (
          <div className={styles.cvResults}>
            {results.map((e, i) => (
              <div key={i} className={styles.cvResult} style={{ borderTopColor: e.color }}>
                <div className={styles.cvResultTop}>
                  <span className={styles.cvTopic} style={{ color: e.color }}>
                    {e.topic}
                  </span>
                  <span className={styles.cvComp}>{e.companion}</span>
                </div>
                {e.quoteAr && <div className={`${styles.cvQuoteAr} ar`}>{e.quoteAr}</div>}
                <blockquote className={styles.cvQuote} style={{ borderLeftColor: e.color }}>
                  {e.quoteEn}
                </blockquote>
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
                <button
                  key={i}
                  type="button"
                  className={styles.cvTopicBtn}
                  style={{ borderLeftColor: e.color }}
                  onClick={() => {
                    setQuery(e.topic);
                    setResults([e]);
                  }}
                >
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
