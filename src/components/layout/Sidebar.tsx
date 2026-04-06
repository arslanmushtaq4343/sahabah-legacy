import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCompare } from '../../context/CompareContext';
import { useT } from '../../i18n/useT';
import styles from './Sidebar.module.css';

/* ── Tahajjud Night Mode hook (Feature 38) ── */
function useTahajjud() {
  const isTahajjudHour = () => {
    const h = new Date().getHours();
    return h >= 0 && h < 4;
  };
  const [active, setActive] = useState(() => {
    const stored = localStorage.getItem('tahajjud_mode');
    if (stored !== null) return stored === 'true';
    return isTahajjudHour();
  });

  useEffect(() => {
    if (active) document.body.classList.add('tahajjud');
    else document.body.classList.remove('tahajjud');
    localStorage.setItem('tahajjud_mode', String(active));
  }, [active]);

  // Auto-detect at midnight
  useEffect(() => {
    const stored = localStorage.getItem('tahajjud_mode');
    if (stored !== null) return; // respect manual setting
    const check = () => {
      const hour = new Date().getHours();
      const should = hour >= 0 && hour < 4;
      setActive(should);
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return { active, toggle: () => setActive(a => !a) };
}

const NAV = [
  { to: '/',            icon: '🕌', key: 'nav.home' },
  { to: '/companions',  icon: '📖', key: 'nav.companions' },
  { to: '/connections', icon: '🕸', key: 'nav.connections' },
  { to: '/insights',    icon: '📊', key: 'nav.insights' },
  { to: '/imams',       icon: '⛓', key: 'nav.imams' },
  { to: '/library',     icon: '✦',  key: 'nav.archive', divider: true },
];

export default function Sidebar() {
  const { lang, toggle } = useLanguage();
  const t = useT();
  const { selected, openPanel } = useCompare();
  const { active: tahajjud, toggle: toggleTahajjud } = useTahajjud();

  return (
    <aside className={`${styles.sidebar} ${tahajjud ? styles.sidebarTahajjud : ''}`}>
      <div className={styles.brand}>
        <span className={styles.brandAr}>الصحابة</span>
        <span className={styles.brandEn}>Sahabah</span>
      </div>

      <nav className={styles.nav}>
        {NAV.map(({ to, icon, key, divider }) => (
          <div key={to}>
            {divider && <div className={styles.navDivider} />}
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ''].join(' ')
              }
            >
              <span className={styles.icon}>{icon}</span>
              <span>{t(key as any)}</span>
            </NavLink>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        {selected.length > 0 && (
          <button className={styles.compareBtn} onClick={openPanel}>
            {t('ui.compare')} ({selected.length})
          </button>
        )}
        <button className={styles.langBtn} onClick={toggle}>
          {lang === 'en' ? t('ui.language.ur') : t('ui.language.en')}
        </button>
        <button
          className={`${styles.tahajjudBtn} ${tahajjud ? styles.tahajjudActive : ''}`}
          onClick={toggleTahajjud}
          title={tahajjud ? 'Exit Night Mode' : 'Tahajjud Night Mode (auto-activates 12–4 AM)'}
        >
          {tahajjud ? t('ui.nightMode.exit') : t('ui.nightMode.enter')}
        </button>
      </div>
    </aside>
  );
}

