import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OnboardingModal.module.css';

const STORAGE_KEY = 'sahabah_onboarded_v1';

const STEPS = [
  {
    id: 'welcome',
    ornament: '☽',
    title: 'Welcome to Sahabah',
    subtitle: 'An educational journey through Islamic history',
    body: 'This app brings together 103 Companions of the Prophet ﷺ — with detailed biographies, hadiths they narrated, battle records, scholarly connections, and chains of knowledge that reach to this day.',
    cta: 'Next',
  },
  {
    id: 'features',
    ornament: '✦',
    title: 'What you can explore',
    subtitle: 'Six interconnected sections',
    body: null,
    features: [
      { icon: '📖', label: 'Companions', desc: '103 detailed profiles' },
      { icon: '🕸', label: 'Connections', desc: 'Relationship network' },
      { icon: '📊', label: 'Insights', desc: 'Data visualisations' },
      { icon: '⛓', label: 'Imam Chains', desc: 'Knowledge transmission' },
      { icon: '📚', label: 'Library', desc: '4 unique compilations' },
    ],
    cta: 'Next',
  },
  {
    id: 'start',
    ornament: '﷽',
    title: 'Where would you like to begin?',
    subtitle: 'You can change this any time from the sidebar',
    body: null,
    startOptions: [
      { label: 'Browse all Companions', path: '/companions', desc: 'Start with the full catalog' },
      { label: 'Explore Connections', path: '/connections', desc: 'See the relationship network' },
      { label: 'View Insights', path: '/insights', desc: 'Discover patterns in data' },
    ],
    cta: null,
  },
] as const;

export function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      /* Small delay so the page has time to render before the modal appears */
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }, []);

  const handleStart = useCallback((path: string) => {
    dismiss();
    navigate(path);
  }, [dismiss, navigate]);

  if (!visible) return null;

  const current = STEPS[step];

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onClick={e => e.target === e.currentTarget && dismiss()}
    >
      <div className={styles.modal}>
        {/* Progress dots */}
        <div className={styles.dots} aria-hidden="true">
          {STEPS.map((s, i) => (
            <span key={s.id} className={`${styles.dot} ${i === step ? styles.dotActive : ''} ${i < step ? styles.dotDone : ''}`} />
          ))}
        </div>

        {/* Dismiss button */}
        <button className={styles.dismissBtn} onClick={dismiss} aria-label="Skip introduction">
          ✕
        </button>

        {/* Ornament */}
        <div className={styles.ornament} aria-hidden="true">{current.ornament}</div>

        {/* Text */}
        <h2 id="onboarding-title" className={styles.title}>{current.title}</h2>
        <p className={styles.subtitle}>{current.subtitle}</p>

        {'body' in current && current.body && (
          <p className={styles.body}>{current.body}</p>
        )}

        {'features' in current && current.features && (
          <ul className={styles.featureList} aria-label="App sections">
            {current.features.map(f => (
              <li key={f.label} className={styles.featureItem}>
                <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
                <span className={styles.featureLabel}>{f.label}</span>
                <span className={styles.featureDesc}>{f.desc}</span>
              </li>
            ))}
          </ul>
        )}

        {'startOptions' in current && current.startOptions && (
          <div className={styles.startOptions}>
            {current.startOptions.map(opt => (
              <button
                key={opt.path}
                className={styles.startBtn}
                onClick={() => handleStart(opt.path)}
              >
                <span className={styles.startLabel}>{opt.label}</span>
                <span className={styles.startDesc}>{opt.desc}</span>
                <span className={styles.startArrow} aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className={styles.nav}>
          {step > 0 && (
            <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
              ← Back
            </button>
          )}
          {current.cta && (
            <button className={styles.nextBtn} onClick={() => setStep(s => s + 1)}>
              {current.cta} →
            </button>
          )}
          <button className={styles.skipBtn} onClick={dismiss}>
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
