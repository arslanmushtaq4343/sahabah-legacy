import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { COMPANIONS } from '../../data/companions';
import { TRIBES } from '../../data/connectionData2';
import { NAME_DATABASE, QUOTE_DATABASE } from '../../data/companionsExtra3';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import styles from './CompanionsPage.module.css';

/* ----------------------------------------------------------------
   Tribal Territory Map (Feature 73)
   ---------------------------------------------------------------- */
const GROUP_LABELS: Record<string, string> = {
  quraysh: 'Quraysh (Mecca)',
  ansar: 'Ansar (Medina)',
  yemeni: 'Yemeni',
  'non-arab': 'Non-Arab',
  'other-arab': 'Other Arab',
};
const GROUP_COLORS_T: Record<string, string> = {
  quraysh: '#d4a820',
  ansar: '#0a5c2e',
  yemeni: '#8b3a08',
  'non-arab': '#4a4a8a',
  'other-arab': '#509070',
};

export function TribalMapOverlay({
  companions,
  onClose,
}: {
  companions: typeof COMPANIONS;
  onClose: () => void;
}) {
  useBodyScrollLock(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const W = 700,
    H = 420;

  const hovTribe = hovered ? TRIBES.find(t => t.id === hovered) : null;
  const hovCompanions = hovTribe
    ? companions.filter(c => hovTribe.companionRanks.includes(c.rank))
    : [];

  const groups = ['all', 'quraysh', 'ansar', 'yemeni', 'non-arab', 'other-arab'];
  const visibleTribes =
    groupFilter === 'all' ? TRIBES : TRIBES.filter(t => t.group === groupFilter);

  return (
    <div className={styles.tribalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.tribalBox}>
        <div className={styles.tribalHeader}>
          <h2 className={styles.tribalTitle}>
            7th Century Tribal Territory Map — Companion Origins
          </h2>
          <button className={styles.tribalClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className={styles.tribalIntro}>
          Hover any tribe to see which companions came from it. Color-coded by origin group.
        </p>
        <div className={styles.tribalFilters}>
          {groups.map(g => (
            <button
              key={g}
              className={`${styles.tribalFilter} ${groupFilter === g ? styles.tribalFilterActive : ''}`}
              style={
                groupFilter === g && g !== 'all'
                  ? { borderColor: GROUP_COLORS_T[g], color: GROUP_COLORS_T[g] }
                  : {}
              }
              onClick={() => setGroupFilter(g)}
            >
              {g === 'all' ? 'All' : GROUP_LABELS[g] || g}
            </button>
          ))}
        </div>
        <div className={styles.tribalMapWrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={styles.tribalSvg}>
            <rect width={W} height={H} fill="#0d1520" rx={8} />
            <ellipse
              cx={W * 0.42}
              cy={H * 0.52}
              rx={W * 0.36}
              ry={H * 0.42}
              fill="none"
              stroke="#d4a82020"
              strokeWidth={1.5}
            />
            <text
              x={W * 0.38}
              y={H * 0.52}
              textAnchor="middle"
              fontSize={9}
              fill="#d4a82030"
              fontFamily="serif"
            >
              Arabian Peninsula
            </text>
            <text x={W * 0.42} y={H * 0.3} textAnchor="middle" fontSize={8} fill="#d4a82030">
              Medina Region
            </text>
            <text x={W * 0.38} y={H * 0.55} textAnchor="middle" fontSize={8} fill="#d4a82030">
              Mecca Region
            </text>
            {visibleTribes.map(tribe => {
              const x = tribe.cx * W,
                y = tribe.cy * H;
              const isHov = hovered === tribe.id;
              const color = GROUP_COLORS_T[tribe.group] || '#888';
              return (
                <g
                  key={tribe.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(tribe.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={tribe.r * W}
                    fill={color + (isHov ? '40' : '15')}
                    stroke={color}
                    strokeWidth={isHov ? 2 : 1}
                    strokeOpacity={isHov ? 0.9 : 0.4}
                  />
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    fontSize={isHov ? 10 : 8}
                    fill={color}
                    opacity={isHov ? 1 : 0.7}
                    fontWeight={isHov ? 700 : 400}
                  >
                    {tribe.name.split(' ').slice(-1)[0]}
                  </text>
                  {tribe.companionRanks.length > 0 && (
                    <text
                      x={x}
                      y={y + tribe.r * W + 12}
                      textAnchor="middle"
                      fontSize={7}
                      fill={color}
                      opacity={0.6}
                    >
                      {tribe.companionRanks.length} comp.
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {hovTribe && (
            <div
              className={styles.tribalTooltip}
              style={{ borderColor: GROUP_COLORS_T[hovTribe.group] }}
            >
              <div className={styles.tribalTipName}>
                <span className="ar">{hovTribe.nameAr}</span>
                <strong style={{ color: GROUP_COLORS_T[hovTribe.group] }}>{hovTribe.name}</strong>
              </div>
              <div className={styles.tribalTipRegion}>{hovTribe.region}</div>
              <p>{hovTribe.note}</p>
              {hovCompanions.length > 0 && (
                <div className={styles.tribalTipComps}>
                  {hovCompanions.map(c => (
                    <span
                      key={c.rank}
                      className={styles.tribalTipComp}
                      style={{ color: GROUP_COLORS_T[hovTribe.group] }}
                    >
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
            <span key={key} className={styles.tribalLegItem} style={{ color: GROUP_COLORS_T[key] }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Name Card Generator (Feature 80)
   ---------------------------------------------------------------- */
export function NameCardGenerator({
  companions,
  onClose,
}: {
  companions: any[];
  onClose: () => void;
}) {
  useBodyScrollLock(true);
  const [inputName, setInputName] = useState('');
  const [result, setResult] = useState<(typeof NAME_DATABASE)[0] | null>(null);
  const [matchedComps, setMatchedComps] = useState<any[]>([]);
  const [selectedComp, setSelectedComp] = useState<any | null>(null);

  const search = () => {
    const q = inputName.toLowerCase().trim();
    if (!q) return;
    const entry = NAME_DATABASE.find(
      n => n.name.toLowerCase().startsWith(q) || n.name.toLowerCase().includes(q)
    );
    if (entry) {
      setResult(entry);
      const comps = entry.companionRanks
        .map(r => companions.find(c => c.rank === r))
        .filter(Boolean);
      setMatchedComps(comps);
      setSelectedComp(comps[0] || null);
    } else {
      setResult(null);
      setMatchedComps([]);
      setSelectedComp(null);
    }
  };

  return (
    <div className={styles.ncOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.ncBox}>
        <button className={styles.ncClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.ncTitle}>Companion Name Card Generator</h2>
        <p className={styles.ncSub}>
          Enter a name to generate a printable biography card showing the companion who bears it.
        </p>
        <div className={styles.ncSearch}>
          <input
            className={styles.ncInput}
            placeholder="Enter a name (e.g. Bilal, Aisha, Hamza, Fatima…)"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
          />
          <button className={styles.ncSearchBtn} onClick={search}>
            Generate Card
          </button>
        </div>

        {result && (
          <div className={styles.ncCard}>
            <div className={styles.ncCardTop}>
              <span className={`${styles.ncNameAr} ar`}>{result.nameAr}</span>
              <h3 className={styles.ncName}>{result.name}</h3>
              <span className={styles.ncMeaning}>{result.meaning}</span>
              <span className={styles.ncOrigin}>
                {result.nameOrigin} origin ·{' '}
                {result.gender === 'male' ? 'Boys' : result.gender === 'female' ? 'Girls' : 'Both'}{' '}
                · {result.popularity} name
              </span>
            </div>
            <p className={styles.ncMeaningContext}>{result.meaningContext}</p>
            {matchedComps.length > 0 && (
              <div className={styles.ncComps}>
                <div className={styles.ncCompsLabel}>Companions with this name:</div>
                {matchedComps.map(c => (
                  <button
                    key={c.rank}
                    className={`${styles.ncCompBtn} ${selectedComp?.rank === c.rank ? styles.ncCompBtnActive : ''}`}
                    onClick={() => setSelectedComp(c)}
                  >
                    #{c.rank} {c.name}
                  </button>
                ))}
              </div>
            )}
            {selectedComp && (
              <div className={styles.ncBio} id="nc-printable">
                <div className={styles.ncBioHeader}>
                  <span className={`${styles.ncBioAr} ar`}>
                    {selectedComp.ar || selectedComp.nameAr || ''}
                  </span>
                  <strong className={styles.ncBioName}>
                    #{selectedComp.rank} · {selectedComp.name}
                  </strong>
                </div>
                {selectedComp.description && (
                  <p className={styles.ncBioDesc}>{selectedComp.description}</p>
                )}
                {selectedComp.significance && (
                  <p className={styles.ncBioSig}>{selectedComp.significance}</p>
                )}
                <div className={styles.ncBioFooter}>
                  <span className={styles.ncBioFootNote}>Named after: {selectedComp.name}</span>
                  <span className={styles.ncBioFootNote}>{result.meaning}</span>
                </div>
              </div>
            )}
            <button className={styles.ncPrint} onClick={() => window.print()}>
              Print Card
            </button>
          </div>
        )}

        {inputName && !result && (
          <div className={styles.ncNoResult}>
            No companion found with the name "{inputName}". Try: Bilal, Aisha, Hamza, Umar, Ali,
            Salman, Anas, Fatima, Khadijah, Asma, Safiyyah.
          </div>
        )}

        <div className={styles.ncBrowse}>
          <strong>All names in database:</strong>
          <div className={styles.ncBrowseGrid}>
            {NAME_DATABASE.map(n => (
              <button
                key={n.name}
                className={styles.ncBrowseBtn}
                onClick={() => {
                  setInputName(n.name);
                  setResult(n);
                  const comps = n.companionRanks
                    .map(r => companions.find(c => c.rank === r))
                    .filter(Boolean);
                  setMatchedComps(comps);
                  setSelectedComp(comps[0] || null);
                }}
              >
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

/* ----------------------------------------------------------------
   Quote Authenticity Checker (Feature 81)
   ---------------------------------------------------------------- */
const VERDICT_COLORS: Record<string, string> = {
  authentic: '#0a5c2e',
  hasan: '#b8860b',
  misattributed: '#1a3462',
  unverified: '#666',
  fabricated: '#8b1a38',
};
const VERDICT_LABELS: Record<string, string> = {
  authentic: '✓ Authentic (Sahih/Hasan)',
  hasan: '~ Acceptable (Hasan)',
  misattributed: '✗ Misattributed',
  unverified: '? Unverified',
  fabricated: '✗ Fabricated / No Chain',
};

export function QuoteAuthChecker({ onClose }: { onClose: () => void }) {
  useBodyScrollLock(true);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<(typeof QUOTE_DATABASE)[0] | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const check = () => {
    const q = input.toLowerCase().replace(/['"]/g, '').trim();
    if (!q) return;
    const match = QUOTE_DATABASE.find(
      r =>
        r.quote.toLowerCase().replace(/['"]/g, '').includes(q.slice(0, 30)) ||
        q.includes(r.quote.toLowerCase().replace(/['"]/g, '').slice(5, 35))
    );
    if (match) {
      setResult(match);
      setNoMatch(false);
    } else {
      setResult(null);
      setNoMatch(true);
    }
  };

  return (
    <div className={styles.qcOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.qcBox}>
        <button className={styles.qcClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.qcTitle}>Companion Quote Authenticity Checker</h2>
        <p className={styles.qcSub}>
          Paste any quote attributed to a companion or the Prophet. The tool cross-checks it against
          authenticated sources.
        </p>
        <div className={styles.qcSearch}>
          <textarea
            className={styles.qcInput}
            rows={3}
            placeholder={`Paste a quote here, e.g.: "The ink of the scholar is more sacred than the blood of the martyr."`}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className={styles.qcCheckBtn} onClick={check}>
            Check Authenticity
          </button>
        </div>

        {result && (
          <div
            className={styles.qcResult}
            style={{ borderLeftColor: VERDICT_COLORS[result.verdict] }}
          >
            <div className={styles.qcVerdictRow}>
              <span
                className={styles.qcVerdict}
                style={{
                  background: VERDICT_COLORS[result.verdict] + '22',
                  color: VERDICT_COLORS[result.verdict],
                  borderColor: VERDICT_COLORS[result.verdict] + '44',
                }}
              >
                {VERDICT_LABELS[result.verdict]}
              </span>
              <span className={styles.qcAttrib}>Attributed to: {result.attribution}</span>
            </div>
            <blockquote className={styles.qcQuote}>{result.quote}</blockquote>
            {result.quoteAr && <div className={`${styles.qcQuoteAr} ar`}>{result.quoteAr}</div>}
            {result.source && (
              <p className={styles.qcSource}>
                <strong>Source:</strong> {result.source}
              </p>
            )}
            {result.correctAttribution && (
              <p className={styles.qcCorrect}>
                <strong>Correct attribution:</strong> {result.correctAttribution}
              </p>
            )}
            <p className={styles.qcNote}>{result.scholarNote}</p>
          </div>
        )}

        {noMatch && (
          <div className={styles.qcNoMatch}>
            This quote is not in our current database. That does not mean it is authentic — only
            that we haven't verified it yet.
          </div>
        )}

        <div className={styles.qcExamples}>
          <strong>Browse known quotes:</strong>
          <div className={styles.qcExGrid}>
            {QUOTE_DATABASE.map((q, i) => (
              <button
                key={i}
                className={styles.qcExBtn}
                style={{ borderLeftColor: VERDICT_COLORS[q.verdict] }}
                onClick={() => {
                  setInput(q.quote);
                  setResult(q);
                  setNoMatch(false);
                }}
              >
                <span className={styles.qcExVerdict} style={{ color: VERDICT_COLORS[q.verdict] }}>
                  {VERDICT_LABELS[q.verdict].split(' ')[0]}
                </span>
                <span className={styles.qcExAttrib}>{q.attribution}</span>
                <span className={styles.qcExText}>{q.quote.slice(0, 60)}…</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   60-Second RSVP Reader (Feature 99)
   ---------------------------------------------------------------- */
export function RSVPReader({ companion, onClose }: { companion: any; onClose: () => void }) {
  useBodyScrollLock(true);
  const text = [companion.description, companion.significance, companion.legacy]
    .filter(Boolean)
    .join(' ');
  const words = text.split(/\s+/).filter(Boolean);

  const [wordIdx, setWordIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(
        () => {
          setWordIdx(i => {
            if (i >= words.length - 1) {
              setPlaying(false);
              return i;
            }
            return i + 1;
          });
        },
        Math.floor(60000 / wpm)
      );
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, wpm, words.length]);

  const progress = words.length > 0 ? ((wordIdx + 1) / words.length) * 100 : 0;
  const remaining = Math.ceil(((words.length - wordIdx) / wpm) * 60);

  const content = (
    <div className={styles.rsvpOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.rsvpBox}>
        <button className={styles.rsvpClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.rsvpHeader}>
          <span className={styles.rsvpName}>{companion.name}</span>
          <span className={styles.rsvpTimer}>{remaining}s remaining</span>
        </div>
        <div className={styles.rsvpProgress}>
          <div className={styles.rsvpProgressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.rsvpDisplay}>
          <div className={styles.rsvpFocus} />
          <div className={styles.rsvpWord}>{words[wordIdx] || '—'}</div>
        </div>
        <div className={styles.rsvpControls}>
          <button
            className={styles.rsvpBtn}
            onClick={() => setWordIdx(Math.max(0, wordIdx - 10))}
            aria-label="Back 10 words"
          >
            «
          </button>
          <button
            className={`${styles.rsvpBtn} ${styles.rsvpPlayBtn}`}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? 'Pause' : 'Start'}
          </button>
          <button
            className={styles.rsvpBtn}
            onClick={() => setWordIdx(Math.min(words.length - 1, wordIdx + 10))}
            aria-label="Forward 10 words"
          >
            »
          </button>
        </div>
        <div className={styles.rsvpWpmRow}>
          <label className={styles.rsvpWpmLabel}>Speed: {wpm} wpm</label>
          <input
            type="range"
            min={100}
            max={600}
            step={50}
            value={wpm}
            onChange={e => setWpm(Number(e.target.value))}
            className={styles.rsvpSlider}
          />
        </div>
        <div className={styles.rsvpContext}>
          Word {wordIdx + 1} of {words.length} · Click outside to close
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
