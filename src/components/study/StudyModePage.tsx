import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { IMAMS, IMAM_COLORS } from '../../data/imams';
import { DAILY_COMPANION_RANKS, getHijriDayOfYear } from '../../data/globalFeatures';
import { normalizeTransliteration } from '../../data/transliteration';
import { useStudyJournal } from '../../hooks/useStudyJournal';
import type { Companion } from '../../types';
import type { Imam } from '../../data/imams';
import styles from './StudyModePage.module.css';

type TargetKind = 'companion' | 'imam';

interface StudyTarget {
  key: string;
  kind: TargetKind;
  id: string;
  name: string;
  ar: string;
  label: string;
  description: string;
  accent: string;
  path: string;
  minutes: number;
}

const NOTES_KEY = 'sahabah_study_notes_v1';
const IMAMS_KEY = 'sahabah_studied_imams_v1';
const LAST_KEY = 'sahabah_study_last_v1';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function companionTarget(c: Companion, label: string, minutes: number): StudyTarget {
  return {
    key: `companion:${c.rank}`,
    kind: 'companion',
    id: String(c.rank),
    name: normalizeTransliteration(c.name),
    ar: c.ar,
    label,
    description: normalizeTransliteration(c.sig),
    accent: CAT_COLORS[c.cat] ?? '#c9a84c',
    path: '/companions',
    minutes,
  };
}

function imamTarget(imam: Imam, label: string, minutes: number): StudyTarget {
  return {
    key: `imam:${imam.id}`,
    kind: 'imam',
    id: imam.id,
    name: normalizeTransliteration(imam.name),
    ar: imam.ar,
    label,
    description: normalizeTransliteration(imam.sig),
    accent: IMAM_COLORS[imam.key] ?? '#4d8ddb',
    path: '/imams',
    minutes,
  };
}

function buildDailyPlan(): StudyTarget[] {
  const rawDay = getHijriDayOfYear();
  const day = Number.isFinite(rawDay) ? Math.max(1, Math.floor(rawDay)) : 1;
  const rankA = DAILY_COMPANION_RANKS[(day - 1) % DAILY_COMPANION_RANKS.length];
  const rankB = DAILY_COMPANION_RANKS[(day + 29) % DAILY_COMPANION_RANKS.length];
  const rankC = DAILY_COMPANION_RANKS[(day + 83) % DAILY_COMPANION_RANKS.length];
  const companionA = COMPANIONS.find(c => c.rank === rankA) ?? COMPANIONS[0];
  const companionB = COMPANIONS.find(c => c.rank === rankB) ?? COMPANIONS[1];
  const companionC = COMPANIONS.find(c => c.rank === rankC) ?? COMPANIONS[2];
  const imamIndex = IMAMS.length ? day % IMAMS.length : 0;
  const imam = IMAMS[imamIndex] ?? IMAMS[0];

  const plan = [
    companionTarget(companionA, 'Daily profile', 7),
    companionTarget(companionB, 'Hadith and legacy', 6),
    companionTarget(companionC, 'Battle or family link', 5),
  ];
  if (imam) plan.splice(2, 0, imamTarget(imam, 'Imam chain', 8));
  return plan;
}

export default function StudyModePage() {
  const { studied, markStudied, unmarkStudied, isStudied, count } = useStudyJournal();
  const [studiedImams, setStudiedImams] = useState<Set<string>>(
    () => new Set(readJson<string[]>(IMAMS_KEY, []))
  );
  const [notes, setNotes] = useState<Record<string, string>>(() => readJson(NOTES_KEY, {}));
  const [lastTarget, setLastTarget] = useState<StudyTarget | null>(() =>
    readJson<StudyTarget | null>(LAST_KEY, null)
  );
  const plan = useMemo(() => buildDailyPlan(), []);
  const today = todayKey();

  const completedPlan = plan.filter(target =>
    target.kind === 'companion' ? isStudied(Number(target.id)) : studiedImams.has(target.id)
  ).length;
  const companionProgress = Math.round((count / COMPANIONS.length) * 100);
  const imamProgress = Math.round((studiedImams.size / IMAMS.length) * 100);
  const noteCount = Object.values(notes).filter(Boolean).length;
  const studiedCompanions = [...studied]
    .map(rank => COMPANIONS.find(c => c.rank === rank))
    .filter((c): c is Companion => Boolean(c))
    .slice(-8)
    .reverse();

  const setImamStudied = (id: string, value: boolean) => {
    setStudiedImams(prev => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      writeJson(IMAMS_KEY, [...next]);
      return next;
    });
  };

  const toggleTarget = (target: StudyTarget) => {
    if (target.kind === 'companion') {
      const rank = Number(target.id);
      if (isStudied(rank)) unmarkStudied(rank);
      else markStudied(rank);
      return;
    }
    setImamStudied(target.id, !studiedImams.has(target.id));
  };

  const updateNote = (key: string, value: string) => {
    const next = { ...notes, [key]: value };
    setNotes(next);
    writeJson(NOTES_KEY, next);
  };

  const rememberTarget = (target: StudyTarget) => {
    setLastTarget(target);
    writeJson(LAST_KEY, target);
  };

  return (
    <div className={`${styles.page} premium-page`}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Study Mode</p>
          <h1>Daily Reference Plan</h1>
          <p>
            A focused queue for companions and imams, with persistent notes, progress, bookmarks,
            and a continue point for repeated study.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>{completedPlan}/4</strong>
            <span>today</span>
          </div>
          <div>
            <strong>{count}</strong>
            <span>companions</span>
          </div>
          <div>
            <strong>{studiedImams.size}</strong>
            <span>imams</span>
          </div>
          <div>
            <strong>{noteCount}</strong>
            <span>notes</span>
          </div>
        </div>
      </header>

      <section className={styles.progressBand}>
        <ProgressPill label="Companions" value={companionProgress} detail={`${count}/${COMPANIONS.length}`} />
        <ProgressPill label="Imams" value={imamProgress} detail={`${studiedImams.size}/${IMAMS.length}`} />
        <ProgressPill label="Today's Plan" value={(completedPlan / plan.length) * 100} detail={today} />
      </section>

      {lastTarget && (
        <section className={styles.continueBox}>
          <div>
            <span className={styles.continueLabel}>Continue where you left off</span>
            <strong>{lastTarget.name}</strong>
            <p>{lastTarget.description}</p>
          </div>
          <Link className={styles.primaryLink} to={lastTarget.path} onClick={() => rememberTarget(lastTarget)}>
            Continue
          </Link>
        </section>
      )}

      <section className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}>Today</p>
          <h2>Plan for {today}</h2>
        </div>
        <span>{plan.reduce((sum, target) => sum + target.minutes, 0)} min</span>
      </section>

      <div className={styles.planGrid}>
        {plan.map(target => {
          const done =
            target.kind === 'companion' ? isStudied(Number(target.id)) : studiedImams.has(target.id);
          return (
            <article
              key={target.key}
              className={`${styles.planCard} ${done ? styles.planCardDone : ''}`}
              style={{ '--accent': target.accent } as CSSProperties}
            >
              <div className={styles.planTop}>
                <span className={styles.kind}>{target.kind}</span>
                <span className={styles.minutes}>{target.minutes} min</span>
              </div>
              <p className={`${styles.ar} ar`}>{target.ar}</p>
              <h3>{target.name}</h3>
              <span className={styles.label}>{target.label}</span>
              <p>{target.description}</p>
              <textarea
                value={notes[target.key] ?? ''}
                onChange={event => updateNote(target.key, event.target.value)}
                placeholder="Private study note..."
                aria-label={`Study note for ${target.name}`}
              />
              <div className={styles.cardActions}>
                <button onClick={() => toggleTarget(target)}>{done ? 'Marked studied' : 'Mark studied'}</button>
                <Link to={target.path} onClick={() => rememberTarget(target)}>
                  Open
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.lowerGrid}>
        <section className={styles.panel}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Bookmarks</p>
              <h2>Recently studied companions</h2>
            </div>
          </div>
          {studiedCompanions.length > 0 ? (
            <div className={styles.bookmarkList}>
              {studiedCompanions.map(c => (
                <Link
                  key={c.rank}
                  to="/companions"
                  className={styles.bookmarkItem}
                  onClick={() => rememberTarget(companionTarget(c, 'Bookmarked profile', 5))}
                >
                  <span>#{c.rank}</span>
                  <strong>{normalizeTransliteration(c.name)}</strong>
                  <em>{c.hadiths.toLocaleString()} hadiths</em>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No studied companions yet. Mark a profile from today's plan.</p>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Notes</p>
              <h2>Notebook index</h2>
            </div>
          </div>
          <div className={styles.noteList}>
            {Object.entries(notes)
              .filter(([, value]) => value.trim())
              .slice(-8)
              .reverse()
              .map(([key, value]) => (
                <div key={key} className={styles.noteItem}>
                  <strong>{key.replace(':', ' #')}</strong>
                  <p>{value}</p>
                </div>
              ))}
            {noteCount === 0 && <p className={styles.empty}>Notes you write in daily cards appear here.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProgressPill({ label, value, detail }: { label: string; value: number; detail: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={styles.progressPill}>
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
      <div className={styles.track}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <em>{pct}%</em>
    </div>
  );
}
