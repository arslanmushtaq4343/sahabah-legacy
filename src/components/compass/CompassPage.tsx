import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ_QUESTIONS, QUIZ_ARCHETYPES } from '../../data/insightsExtra4';
import { COMPANIONS } from '../../data/companions';
import styles from './CompassPage.module.css';

type Stage = 'intro' | 'quiz' | 'result';

export default function CompassPage() {
  const [stage, setStage] = useState<Stage>('intro');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[questionIdx];
  const progress = ((questionIdx + 1) / totalQuestions) * 100;

  const winner = useMemo(() => {
    if (stage !== 'result') return null;
    let topId: string | null = null;
    let topScore = -1;
    for (const [id, score] of Object.entries(tally)) {
      if (score > topScore) {
        topScore = score;
        topId = id;
      }
    }
    if (!topId) return QUIZ_ARCHETYPES[0];
    return QUIZ_ARCHETYPES.find(a => a.id === topId) ?? QUIZ_ARCHETYPES[0];
  }, [stage, tally]);

  const winnerCompanion = useMemo(() => {
    if (!winner) return null;
    return COMPANIONS.find(c => c.rank === winner.rank);
  }, [winner]);

  function start() {
    setStage('quiz');
    setQuestionIdx(0);
    setTally({});
  }

  function pickOption(archetypes: string[]) {
    setTally(prev => {
      const next = { ...prev };
      archetypes.forEach(id => {
        next[id] = (next[id] ?? 0) + 1;
      });
      return next;
    });

    if (questionIdx + 1 < totalQuestions) {
      setQuestionIdx(i => i + 1);
    } else {
      setStage('result');
    }
  }

  function restart() {
    setStage('intro');
    setQuestionIdx(0);
    setTally({});
  }

  /* ── Intro stage ───────────────────────────────── */
  if (stage === 'intro') {
    return (
      <div className={`${styles.page} premium-page`}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>The Companion Compass</span>
          <h1 className={styles.title}>Which Companion's Path Mirrors Yours?</h1>
          <p className={styles.subtitle}>
            {totalQuestions} situational questions. No right or wrong answers — just a reflection on
            how you carry yourself, mapped to a companion of the Prophet ﷺ whose life embodied the
            same disposition.
          </p>
        </header>

        <div className={styles.introCard}>
          <div className={styles.introIcon}>✦</div>
          <h2 className={styles.introTitle}>How it works</h2>
          <ol className={styles.introList}>
            <li>Read each scenario as if you were facing it today.</li>
            <li>Pick the response that feels most natural — not the one that sounds noblest.</li>
            <li>
              At the end you'll be matched to the companion whose temperament most closely fits.
            </li>
          </ol>
          <button className={styles.startBtn} onClick={start}>
            Begin the journey →
          </button>
        </div>

        <div className={styles.introArchetypes}>
          <p className={styles.archHint}>
            You may be matched to any of these companions, among others:
          </p>
          <div className={styles.archGrid}>
            {QUIZ_ARCHETYPES.slice(0, 6).map(a => (
              <div
                key={a.id}
                className={styles.archChip}
                style={{ borderLeftColor: a.color, color: a.color }}
              >
                <div className={styles.archChipName}>{a.name.split(' ').slice(0, 2).join(' ')}</div>
                <div className={styles.archChipTitle}>{a.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Quiz stage ─────────────────────────────────── */
  if (stage === 'quiz' && currentQuestion) {
    return (
      <div className={`${styles.page} premium-page`}>
        <header className={styles.quizHead}>
          <div className={styles.quizProgressLabel}>
            Question {questionIdx + 1} of {totalQuestions}
          </div>
          <div className={styles.quizProgressTrack}>
            <div className={styles.quizProgressFill} style={{ width: `${progress}%` }} />
          </div>
        </header>

        <div className={styles.quizCard}>
          <div className={styles.quizContext}>{currentQuestion.context}</div>
          <h2 className={styles.quizQuestion}>{currentQuestion.question}</h2>

          <div className={styles.quizOptions}>
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                className={styles.quizOption}
                onClick={() => pickOption(opt.archetypes)}
              >
                <span className={styles.quizOptionMark}>{String.fromCharCode(65 + i)}</span>
                <span className={styles.quizOptionText}>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>

        <button className={styles.cancelBtn} onClick={restart}>
          ← Restart
        </button>
      </div>
    );
  }

  /* ── Result stage ─────────────────────────────── */
  if (stage === 'result' && winner) {
    return (
      <div className={`${styles.page} premium-page`}>
        <header className={styles.resultHero}>
          <span className={styles.eyebrow}>Your match</span>
          <h1 className={styles.resultTitle} style={{ color: winner.color }}>
            {winner.title}
          </h1>
          <div className={styles.resultAr}>{winner.nameAr}</div>
          <div className={styles.resultName}>{winner.name}</div>
        </header>

        <div className={styles.resultCard} style={{ borderTopColor: winner.color }}>
          <p className={styles.resultSummary}>{winner.traitSummary}</p>

          <h3 className={styles.resultSection}>Traits</h3>
          <ul className={styles.resultTraits}>
            {winner.traitDetails.map((t, i) => (
              <li key={i} className={styles.resultTrait}>
                <span className={styles.resultTraitDot} style={{ background: winner.color }} />
                {t}
              </li>
            ))}
          </ul>

          <h3 className={styles.resultSection}>Why this match</h3>
          <p className={styles.resultWhy}>{winner.whyMatch}</p>

          <blockquote className={styles.resultHadith} style={{ borderLeftColor: winner.color }}>
            {winner.supportingHadith}
            <cite className={styles.resultSource}>— {winner.source}</cite>
          </blockquote>
        </div>

        <div className={styles.resultActions}>
          {winnerCompanion && (
            <Link
              to="/companions"
              className={styles.resultPrimary}
              style={{ background: winner.color }}
            >
              Explore {winnerCompanion.name} →
            </Link>
          )}
          <button className={styles.resultSecondary} onClick={restart}>
            Retake the compass
          </button>
        </div>
      </div>
    );
  }

  return null;
}
