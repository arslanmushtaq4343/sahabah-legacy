import { type KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANIONS } from '../../data/companions';
import { IMAMS } from '../../data/imams';
import { QURAN_TRIGGERS } from '../../data/quranTriggers';
import { BATTLE_SHORT, BATTLE_YEAR, KEY_BATTLES } from '../../data/insights';
import { normalizeTransliteration } from '../../data/transliteration';
import styles from './CommandPalette.module.css';

type ResultType = 'page' | 'companion' | 'imam' | 'quran' | 'battle';

interface CommandResult {
  id: string;
  type: ResultType;
  title: string;
  subtitle: string;
  body: string;
  path: string;
  keywords: string;
}

const PAGES: CommandResult[] = [
  {
    id: 'page:home',
    type: 'page',
    title: 'Home',
    subtitle: 'Main archive landing',
    body: 'Open the first screen',
    path: '/',
    keywords: 'home landing archive',
  },
  {
    id: 'page:study',
    type: 'page',
    title: 'Study Mode',
    subtitle: 'Daily plan, notes, progress',
    body: 'Continue learning and review saved notes',
    path: '/study',
    keywords: 'study notes progress bookmarks daily plan',
  },
  {
    id: 'page:timeline',
    type: 'page',
    title: 'Timeline Mode',
    subtitle: 'Unified chronology',
    body: 'Prophet, companions, battles, imams, hadith transmission',
    path: '/timeline',
    keywords: 'timeline chronology battles imams hadith prophet',
  },
  {
    id: 'page:research',
    type: 'page',
    title: 'Research Lab',
    subtitle: 'Claims, citations, and data quality',
    body: 'Inspect source coverage, transmission paths, and profile audit signals',
    path: '/research',
    keywords: 'research claims citations sources audit provenance data quality',
  },
  {
    id: 'page:connections',
    type: 'page',
    title: 'Connections Atlas',
    subtitle: 'Relationship and transmission maps',
    body: 'Open network, conversion, journeys, and scholarly layers',
    path: '/connections',
    keywords: 'connections graph network atlas relationships',
  },
  {
    id: 'page:insights',
    type: 'page',
    title: 'Insights',
    subtitle: 'Data visualizations',
    body: 'Explore hadith, battle, social, and revelation patterns',
    path: '/insights',
    keywords: 'insights charts data visualization',
  },
  {
    id: 'page:quran',
    type: 'page',
    title: 'Quran Trigger Index',
    subtitle: 'Asbab al-Nuzul',
    body: 'Open companion-linked Quran revelation triggers',
    path: '/library/quran-triggers',
    keywords: 'quran ayah surah revelation asbab nuzul',
  },
];

const TYPE_LABEL: Record<ResultType, string> = {
  page: 'Page',
  companion: 'Companion',
  imam: 'Imam',
  quran: 'Quran',
  battle: 'Battle',
};

function norm(value: string) {
  return normalizeTransliteration(value || '').toLowerCase();
}

function scoreResult(result: CommandResult, query: string) {
  const q = norm(query);
  if (!q) return 1;
  const title = norm(result.title);
  const subtitle = norm(result.subtitle);
  const keywords = norm(result.keywords);
  const body = norm(result.body);
  let score = 0;
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 60;
  if (title.includes(q)) score += 35;
  if (subtitle.includes(q)) score += 18;
  if (keywords.includes(q)) score += 14;
  if (body.includes(q)) score += 8;
  return score;
}

export function CommandPalette() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const index = useMemo<CommandResult[]>(() => {
    const companions = COMPANIONS.map(c => ({
      id: `companion:${c.rank}`,
      type: 'companion' as const,
      title: normalizeTransliteration(c.name),
      subtitle: `#${c.rank} - ${c.catLabel}`,
      body: normalizeTransliteration(c.sig),
      path: `/companions?rank=${c.rank}`,
      keywords: `${c.name} ${c.ar} ${c.ur} ${c.title} ${c.catLabel} ${c.tribe} ${c.hadiths} hadiths ${c.battles.join(' ')}`,
    }));

    const imams = IMAMS.map(imam => ({
      id: `imam:${imam.id}`,
      type: 'imam' as const,
      title: normalizeTransliteration(imam.name),
      subtitle: imam.honorific,
      body: normalizeTransliteration(imam.sig),
      path: `/imams?imam=${imam.id}`,
      keywords: `${imam.name} ${imam.ar} ${imam.ur} ${imam.title} ${imam.honorific} ${imam.teachers} ${imam.students} ${imam.keyWorks}`,
    }));

    const quran = QURAN_TRIGGERS.map(trigger => ({
      id: `quran:${trigger.id}`,
      type: 'quran' as const,
      title: `${trigger.surah} ${trigger.ayahRef}`,
      subtitle: normalizeTransliteration(trigger.companion),
      body: normalizeTransliteration(trigger.story),
      path: `/library/quran-triggers?q=${encodeURIComponent(trigger.ayahRef)}`,
      keywords: `${trigger.surah} ${trigger.surahAr} ${trigger.ayahRef} ${trigger.companion} ${trigger.companionAr} ${trigger.category}`,
    }));

    const battles = KEY_BATTLES.map(battle => ({
      id: `battle:${battle}`,
      type: 'battle' as const,
      title: BATTLE_SHORT[battle] ?? battle,
      subtitle: `${battle} - ${BATTLE_YEAR[battle]} CE`,
      body: 'Open battle in the unified timeline',
      path: `/timeline?kind=battle&q=${encodeURIComponent(BATTLE_SHORT[battle] ?? battle)}`,
      keywords: `${battle} ${BATTLE_SHORT[battle]} ${BATTLE_YEAR[battle]} battle timeline`,
    }));

    return [...PAGES, ...companions, ...imams, ...quran, ...battles];
  }, []);

  const results = useMemo(() => {
    const scored = index
      .map(result => ({ result, score: scoreResult(result, query) }))
      .filter(row => row.score > 0)
      .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
      .slice(0, 10)
      .map(row => row.result);
    return scored;
  }, [index, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('sahabah-command-open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('sahabah-command-open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setActive(0);
  }, [query, open]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const run = (result: CommandResult) => {
    navigate(result.path);
    close();
  };

  const handleInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(current => Math.min(results.length - 1, current + 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(current => Math.max(0, current - 1));
      return;
    }
    if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      run(results[active]);
    }
  };

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(true)}
        title="Search everything (Ctrl+K)"
        aria-label="Search everything"
      >
        Search
        <span>Ctrl K</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={event => event.target === event.currentTarget && close()}>
          <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Command palette">
            <div className={styles.searchRow}>
              <span aria-hidden="true">/</span>
              <input
                ref={inputRef}
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={handleInputKey}
                placeholder="Search companions, imams, Quran ayahs, battles, pages..."
                aria-label="Search all content"
              />
              <kbd>Esc</kbd>
            </div>

            <div className={styles.results} role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  className={`${styles.result} ${index === active ? styles.resultActive : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => run(result)}
                  role="option"
                  aria-selected={index === active}
                >
                  <span className={styles.type}>{TYPE_LABEL[result.type]}</span>
                  <span className={styles.resultText}>
                    <strong>{result.title}</strong>
                    <small>{result.subtitle}</small>
                    <em>{result.body}</em>
                  </span>
                  <span className={styles.go}>Open</span>
                </button>
              ))}
              {results.length === 0 && (
                <div className={styles.empty}>No matching records. Try a name, ayah, battle, or page.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
