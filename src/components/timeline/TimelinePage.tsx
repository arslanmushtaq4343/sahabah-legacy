import { useMemo, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { IMAMS, IMAM_COLORS, IM_NODES } from '../../data/imams';
import { BATTLE_SHORT, BATTLE_YEAR, KEY_BATTLES } from '../../data/insights';
import { normalizeTransliteration } from '../../data/transliteration';
import styles from './TimelinePage.module.css';

type TimelineKind = 'prophetic' | 'companion' | 'battle' | 'imam' | 'transmission';

interface TimelineEvent {
  id: string;
  year: number;
  kind: TimelineKind;
  title: string;
  subtitle: string;
  detail: string;
  accent: string;
  meta: string;
}

const KIND_LABEL: Record<TimelineKind | 'all', string> = {
  all: 'All',
  prophetic: 'Prophet',
  companion: 'Companions',
  battle: 'Battles',
  imam: 'Imams',
  transmission: 'Hadith Transmission',
};

const PROPHETIC_EVENTS: TimelineEvent[] = [
  {
    id: 'prophet-birth',
    year: 570,
    kind: 'prophetic',
    title: 'Birth of the Prophet',
    subtitle: 'Mecca',
    detail: 'The final Messenger is born into Banu Hashim of Quraysh.',
    accent: '#6eaaff',
    meta: 'Pre-revelation',
  },
  {
    id: 'first-revelation',
    year: 610,
    kind: 'prophetic',
    title: 'First Revelation',
    subtitle: 'Cave Hira',
    detail: 'The Quran begins with the first revelation and the first believers gather.',
    accent: '#c9a84c',
    meta: 'Start of prophethood',
  },
  {
    id: 'hijrah',
    year: 622,
    kind: 'prophetic',
    title: 'Hijrah to Madinah',
    subtitle: 'Islamic calendar begins',
    detail: 'The community moves from persecution to a public covenant and city-state.',
    accent: '#2ca66f',
    meta: '1 AH',
  },
  {
    id: 'farewell',
    year: 632,
    kind: 'prophetic',
    title: 'Final Year of Prophethood',
    subtitle: 'Farewell Hajj and passing',
    detail: 'The Sunnah is completed and the Companions carry the trust forward.',
    accent: '#6eaaff',
    meta: '11 AH',
  },
];

function parseYear(value?: string) {
  if (!value) return null;
  const ce = value.match(/(\d{3,4})\s*CE/i);
  if (ce) return Number(ce[1]);
  const first = value.match(/(\d{3,4})/);
  return first ? Number(first[1]) : null;
}

function roughAh(year: number) {
  if (year < 622) return 'BH';
  return `${Math.max(1, Math.round(year - 621))} AH`;
}

function buildTimelineEvents(): TimelineEvent[] {
  const events: TimelineEvent[] = [...PROPHETIC_EVENTS];

  KEY_BATTLES.forEach(battle => {
    const year = BATTLE_YEAR[battle];
    events.push({
      id: `battle:${battle}`,
      year,
      kind: 'battle',
      title: BATTLE_SHORT[battle] ?? battle,
      subtitle: battle,
      detail: 'A major military or civil conflict recorded across the companion dataset.',
      accent: '#cf5c5c',
      meta: roughAh(year),
    });
  });

  COMPANIONS.forEach(c => {
    const year = parseYear(c.death);
    if (!year) return;
    const prominent = c.rank <= 35 || c.hadiths >= 1000 || c.battles.length >= 5;
    if (!prominent) return;
    events.push({
      id: `companion:${c.rank}`,
      year,
      kind: 'companion',
      title: normalizeTransliteration(c.name),
      subtitle: c.catLabel,
      detail: normalizeTransliteration(c.sig),
      accent: CAT_COLORS[c.cat] ?? '#c9a84c',
      meta: `${roughAh(year)} · ${c.hadiths.toLocaleString()} hadiths`,
    });
  });

  IMAMS.forEach(imam => {
    const born = parseYear(imam.born);
    const died = parseYear(imam.died);
    if (born) {
      events.push({
        id: `imam-born:${imam.id}`,
        year: born,
        kind: 'imam',
        title: `${normalizeTransliteration(imam.name)} born`,
        subtitle: imam.bornPlace,
        detail: normalizeTransliteration(imam.origin.split('.')[0]),
        accent: IMAM_COLORS[imam.key] ?? '#4d8ddb',
        meta: roughAh(born),
      });
    }
    if (died) {
      events.push({
        id: `imam-died:${imam.id}`,
        year: died,
        kind: 'imam',
        title: `${normalizeTransliteration(imam.name)} dies`,
        subtitle: imam.diedPlace,
        detail: normalizeTransliteration(imam.books_legacy.split('.')[0]),
        accent: IMAM_COLORS[imam.key] ?? '#4d8ddb',
        meta: roughAh(died),
      });
    }
  });

  IM_NODES.forEach(node => {
    const year = parseYear(node.died);
    if (!year || node.id === 'prop') return;
    events.push({
      id: `transmission:${node.id}`,
      year,
      kind: 'transmission',
      title: normalizeTransliteration(node.name),
      subtitle: node.ar,
      detail: normalizeTransliteration(node.detail),
      accent: IMAM_COLORS[node.m] ?? '#8fb8ff',
      meta: `d. ${node.died}`,
    });
  });

  return events.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

export default function TimelinePage() {
  const [searchParams] = useSearchParams();
  const initialKind = searchParams.get('kind') as TimelineKind | 'all' | null;
  const [kind, setKind] = useState<TimelineKind | 'all'>(
    initialKind && initialKind in KIND_LABEL ? initialKind : 'all'
  );
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const events = useMemo(() => buildTimelineEvents(), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(event => {
      if (kind !== 'all' && event.kind !== kind) return false;
      if (!q) return true;
      return `${event.title} ${event.subtitle} ${event.detail} ${event.meta}`.toLowerCase().includes(q);
    });
  }, [events, kind, query]);

  const years = filtered.map(event => event.year);
  const minYear = years.length ? Math.min(...years) : 570;
  const maxYear = years.length ? Math.max(...years) : 900;
  const span = Math.max(1, maxYear - minYear);

  return (
    <div className={`${styles.page} premium-page`}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Timeline Mode</p>
          <h1>Unified Islamic Knowledge Timeline</h1>
          <p>
            Prophet's life, companion milestones, battles, four imams, and hadith transmission
            links in one searchable chronology.
          </p>
        </div>
        <div className={styles.range}>
          <strong>
            {minYear}-{maxYear}
          </strong>
          <span>{filtered.length} events</span>
        </div>
      </header>

      <section className={styles.controls}>
        <div className={styles.chips} role="tablist" aria-label="Timeline filters">
          {(Object.keys(KIND_LABEL) as Array<TimelineKind | 'all'>).map(item => (
            <button
              key={item}
              className={`${styles.chip} ${kind === item ? styles.chipActive : ''}`}
              onClick={() => setKind(item)}
              aria-selected={kind === item}
            >
              {KIND_LABEL[item]}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search names, battles, hadith links..."
          aria-label="Search timeline"
        />
      </section>

      <section className={styles.map} aria-label="Timeline density map">
        {filtered.map(event => (
          <span
            key={event.id}
            className={styles.mapDot}
            style={{
              '--x': `${((event.year - minYear) / span) * 100}%`,
              '--accent': event.accent,
            } as CSSProperties}
            title={`${event.year}: ${event.title}`}
          />
        ))}
      </section>

      <section className={styles.timeline}>
        {filtered.map(event => (
          <article
            key={event.id}
            className={styles.event}
            style={{ '--accent': event.accent } as CSSProperties}
          >
            <div className={styles.year}>
              <strong>{event.year}</strong>
              <span>{event.meta}</span>
            </div>
            <div className={styles.marker} />
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.kind}>{KIND_LABEL[event.kind]}</span>
                <span>{event.subtitle}</span>
              </div>
              <h2>{event.title}</h2>
              <p>{event.detail}</p>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className={styles.empty}>No timeline events match this filter.</div>}
      </section>
    </div>
  );
}
