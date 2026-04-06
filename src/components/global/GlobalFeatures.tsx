// @ts-nocheck
import { useState, useEffect } from 'react';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import {
  getHijriDayOfYear, DAILY_COMPANION_RANKS, DAILY_EVENTS,
  getStreak, STREAK_MILESTONES, getCurrentMilestone, getNextMilestone,
  getWeeklyCompanionRank, getVoteForCompanion, voteForCompanion, hasVoted, recordVote,
  getA11ySettings, saveA11ySettings, applyA11yOnLoad,
} from '../../data/globalFeatures';
import styles from './GlobalFeatures.module.css';

/* ══════════════════════════════════════════════════════════
   FEATURE 95 — DAILY COMPANION BANNER
   ══════════════════════════════════════════════════════════ */
export function DailyCompanionBanner() {
  const dayOfYear = getHijriDayOfYear();
  const rank = DAILY_COMPANION_RANKS[(dayOfYear - 1) % DAILY_COMPANION_RANKS.length];
  const companion = COMPANIONS.find(c => c.rank === rank);
  const todayEvent = DAILY_EVENTS[dayOfYear];
  const [dismissed, setDismissed] = useState(false);
  const color = companion ? CAT_COLORS[companion.category] : '#d4a820';

  if (!companion || dismissed) return null;

  return (
    <div className={styles.dailyBanner} style={{ borderBottomColor: color }}>
      <div className={styles.dailyLeft}>
        <span className={styles.dailyBadge} style={{ background: color + '20', color, border: `1px solid ${color}44` }}>
          Today's Companion
        </span>
        <span className={`${styles.dailyAr} ar`}>{companion.ar || ''}</span>
        <strong className={styles.dailyName} style={{ color }}>#{companion.rank} — {companion.name}</strong>
        {companion.description && (
          <span className={styles.dailyDesc}>{companion.description.slice(0, 120)}…</span>
        )}
        {todayEvent && (
          <span className={styles.dailyEvent}>📅 On This Day: {todayEvent.event}</span>
        )}
      </div>
      <button className={styles.dailyDismiss} onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURE 96 — STUDY STREAK TRACKER
   ══════════════════════════════════════════════════════════ */
export function StudyStreakBar() {
  const [streak, setStreak] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
  }, []);

  const current = getCurrentMilestone(streak);
  const next = getNextMilestone(streak);

  if (streak === 0) return null;

  const progressToNext = next
    ? ((streak - (current?.days || 0)) / (next.days - (current?.days || 0))) * 100
    : 100;

  return (
    <>
      <div className={styles.streakBar} onClick={() => setShowDetail(true)}>
        <span className={styles.streakIcon}>{current?.badge || '🌙'}</span>
        <div className={styles.streakInfo}>
          <span className={styles.streakCount}>{streak} day streak</span>
          {next && <span className={styles.streakNext}>{next.days - streak} days to {next.title}</span>}
        </div>
        <div className={styles.streakProgressTrack}>
          <div className={styles.streakProgressFill}
            style={{ width: `${Math.min(100, progressToNext)}%`, background: current?.color || '#d4a820' }} />
        </div>
        {current && (
          <span className={styles.streakMilestone} style={{ color: current.color }}>{current.title}</span>
        )}
      </div>

      {showDetail && (
        <div className={styles.streakOverlay} onClick={e => e.target === e.currentTarget && setShowDetail(false)}>
          <div className={styles.streakModal}>
            <button className={styles.streakClose} onClick={() => setShowDetail(false)}>✕</button>
            <h2 className={styles.streakModalTitle}>📅 Study Streak — {streak} Days</h2>
            <div className={styles.streakMilestones}>
              {STREAK_MILESTONES.map((m, i) => {
                const reached = streak >= m.days;
                return (
                  <div key={i} className={`${styles.smCard} ${reached ? styles.smReached : ''}`}
                    style={{ borderLeftColor: reached ? m.color : '#333' }}>
                    <div className={styles.smHeader}>
                      <span className={styles.smBadge}>{m.badge}</span>
                      <span className={styles.smDays} style={{ color: reached ? m.color : '#666' }}>{m.days} days</span>
                      <span className={styles.smTitle} style={{ color: reached ? m.color : '#666' }}>{m.title}</span>
                      {reached && <span className={styles.smReachedBadge}>✓ Unlocked</span>}
                    </div>
                    <span className={styles.smComp}>{m.companionName}</span>
                    {reached && (
                      <>
                        <blockquote className={styles.smQuote} style={{ borderLeftColor: m.color }}>{m.quote}</blockquote>
                        <p className={styles.smUnlocks}>{m.unlocks}</p>
                      </>
                    )}
                    {!reached && <p className={styles.smLocked}>{m.days - streak} more days to unlock</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURE 97 — COMPANION OF THE WEEK
   ══════════════════════════════════════════════════════════ */
export function WeeklyCompanionBadge() {
  const weeklyRank = getWeeklyCompanionRank();
  const companion = COMPANIONS.find(c => c.rank === weeklyRank);
  const [votes, setVotes] = useState(getVoteForCompanion(weeklyRank));
  const [voted, setVoted] = useState(hasVoted(weeklyRank));
  const [showDetail, setShowDetail] = useState(false);

  const color = companion ? CAT_COLORS[companion.category] : '#d4a820';

  const handleVote = () => {
    if (voted || !companion) return;
    voteForCompanion(companion.rank);
    recordVote(companion.rank);
    setVotes(v => v + 1);
    setVoted(true);
  };

  if (!companion) return null;

  return (
    <>

      {showDetail && companion && (
        <div className={styles.weeklyOverlay} onClick={e => e.target === e.currentTarget && setShowDetail(false)}>
          <div className={styles.weeklyModal} style={{ borderTopColor: color }}>
            <button className={styles.weeklyClose} onClick={() => setShowDetail(false)}>✕</button>
            <div className={styles.weeklyModalHeader} style={{ background: color + '10' }}>
              <span className={`${styles.weeklyModalAr} ar`}>{companion.ar || ''}</span>
              <h2 className={styles.weeklyModalName} style={{ color }}>
                ⭐ Companion of the Week
              </h2>
              <h3 className={styles.weeklyModalComp}>#{companion.rank} — {companion.name}</h3>
            </div>
            <div className={styles.weeklyContent}>
              {companion.description && <p className={styles.weeklyDesc}>{companion.description}</p>}
              {companion.significance && <p className={styles.weeklySig}>{companion.significance}</p>}
              {companion.legacy && (
                <div className={styles.weeklyLegacy} style={{ borderLeftColor: color }}>
                  <strong>Legacy:</strong> {companion.legacy}
                </div>
              )}
              <div className={styles.weeklyVote}>
                <p>Vote to feature this companion again next week:</p>
                <button className={styles.weeklyVoteBtn}
                  style={{ background: voted ? '#333' : color, opacity: voted ? .7 : 1 }}
                  onClick={handleVote} disabled={voted}>
                  {voted ? `✓ Voted — ${votes} votes` : `👍 Vote (${votes} votes)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURE 98 — ACCESSIBILITY MODE PANEL
   ══════════════════════════════════════════════════════════ */
export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(getA11ySettings());

  useEffect(() => { applyA11yOnLoad(); }, []);

  const update = (key: string, val: boolean) => {
    const next = { ...settings, [key]: val };
    setSettings(next);
    saveA11ySettings(next);
  };

  const options = [
    { key: 'highContrast', label: 'High Contrast', desc: 'WCAG AAA compliant — increases all contrast ratios for visibility' },
    { key: 'largeFonts',   label: 'Large Fonts',   desc: 'Increases all font sizes by 20% for easier reading' },
    { key: 'reduceMotion', label: 'Reduce Motion', desc: 'Removes all animations and transitions' },
    { key: 'dataTableMode',label: 'Table Mode',    desc: 'Replaces SVG visualizations with accessible data tables' },
  ];

  return (
    <>
      <button className={styles.a11yToggle}
        aria-label="Accessibility settings"
        title="Accessibility Settings"
        onClick={() => setOpen(!open)}>
        ♿
      </button>

      {open && (
        <div className={styles.a11yPanel} role="dialog" aria-label="Accessibility Settings">
          <div className={styles.a11yHeader}>
            <h3>♿ Accessibility Settings</h3>
            <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          {options.map(opt => (
            <label key={opt.key} className={styles.a11yOption}>
              <div className={styles.a11yOptionText}>
                <span className={styles.a11yOptionLabel}>{opt.label}</span>
                <span className={styles.a11yOptionDesc}>{opt.desc}</span>
              </div>
              <div className={`${styles.a11yToggleSwitch} ${settings[opt.key] ? styles.a11yOn : ''}`}
                onClick={() => update(opt.key, !settings[opt.key])}
                role="switch" aria-checked={settings[opt.key]} tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && update(opt.key, !settings[opt.key])}>
                <div className={styles.a11yToggleKnob} />
              </div>
            </label>
          ))}
          <p className={styles.a11yNote}>Settings are saved in your browser and persist across visits.</p>
        </div>
      )}
    </>
  );
}
