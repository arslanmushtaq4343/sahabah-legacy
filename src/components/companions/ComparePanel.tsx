import type { CSSProperties } from 'react';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { TABAQAT_LABELS, TABAQAT_MAP } from '../../data/companionExtras';
import { IMAMS, IMAM_COLORS } from '../../data/imams';
import { IMAM_AHADITH } from '../../data/imamsExtra3';
import { normalizeTransliteration } from '../../data/transliteration';
import { useCompare, type CompareItem } from '../../context/CompareContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import type { Companion } from '../../types';
import type { Imam } from '../../data/imams';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './ComparePanel.module.css';

const FALLBACK_COLORS = ['#c9a84c', '#4d8ddb', '#2ca66f'];
const RADAR_KEYS = ['Hadiths', 'Battles', 'Scholarship', 'Sacrifice', 'Leadership', 'Legacy'];

interface CompareEntity {
  key: string;
  kind: 'companion' | 'imam';
  id: string;
  name: string;
  ar: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  accent: string;
  era: string;
  hadiths: number;
  teachers: string;
  students: string;
  battles: string;
  works: string;
  legacy: string;
  bio: string;
  method: string;
  chartKey: string;
  metrics: Record<string, number>;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function trimText(value: string, max = 260) {
  const clean = normalizeTransliteration(value || '').trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}...` : clean;
}

function getImamHadithCount(imam: Imam) {
  return IMAM_AHADITH.find(collection => collection.imamKey === imam.key)?.hadiths.length ?? 0;
}

function companionEntity(c: Companion, index: number): CompareEntity {
  const tabaqat = TABAQAT_MAP[c.rank];
  const accent = CAT_COLORS[c.cat] ?? FALLBACK_COLORS[index] ?? '#c9a84c';
  const hadithScore = c.hadiths > 0 ? (c.hadiths / 5374) * 100 : 0;
  const battleScore = c.battles.length * 12;
  const scholarshipScore = c.cat === 'scholar' || c.cat === 'narrator' ? 88 : c.hadiths > 100 ? 68 : 42;
  const sacrificeScore = c.cat === 'martyr' || c.cat === 'warrior' ? 90 : c.battles.length > 3 ? 72 : 52;
  const leadershipScore = c.cat === 'caliph' || c.cat === 'general' ? 95 : c.cat === 'wife' ? 70 : 46;

  return {
    key: `companion:${c.rank}`,
    kind: 'companion',
    id: String(c.rank),
    name: normalizeTransliteration(c.name),
    ar: c.ar,
    subtitle: normalizeTransliteration(c.title),
    badge: c.catLabel,
    badgeColor: accent,
    accent,
    era: tabaqat ? TABAQAT_LABELS[tabaqat] : [c.born, c.death].filter(Boolean).join(' - ') || 'Era not recorded',
    hadiths: c.hadiths,
    teachers: c.rel
      ? `Direct companionship with the Prophet; ${normalizeTransliteration(c.rel)}`
      : 'Direct companionship with the Prophet',
    students:
      c.hadiths > 0
        ? 'Transmission preserved through later narrators and students'
        : 'Legacy preserved through biographical and historical reports',
    battles: c.battles.length > 0 ? c.battles.join(', ') : 'No battle record in current dataset',
    works: normalizeTransliteration(c.contrib || c.keyEvent || c.title),
    legacy: trimText(c.legacy || c.sig),
    bio: trimText(c.sig),
    method: normalizeTransliteration(c.personality?.join(', ') || c.appearance || c.keyEvent || 'Companion profile'),
    chartKey: `entity${index}`,
    metrics: {
      Hadiths: clamp(hadithScore),
      Battles: clamp(battleScore),
      Scholarship: clamp(scholarshipScore),
      Sacrifice: clamp(sacrificeScore),
      Leadership: clamp(leadershipScore),
      Legacy: clamp(c.rank <= 5 ? 100 : c.rank <= 15 ? 78 : 58),
    },
  };
}

function imamEntity(imam: Imam, index: number): CompareEntity {
  const hadithCount = getImamHadithCount(imam);
  const accent = IMAM_COLORS[imam.key] ?? FALLBACK_COLORS[index] ?? '#4d8ddb';
  const reachMatch = imam.reach.match(/(\d+)/);
  const reachScore = reachMatch ? Number(reachMatch[1]) : 30;

  return {
    key: `imam:${imam.id}`,
    kind: 'imam',
    id: imam.id,
    name: normalizeTransliteration(imam.name),
    ar: imam.ar,
    subtitle: normalizeTransliteration(imam.title),
    badge: imam.honorific,
    badgeColor: accent,
    accent,
    era: `${imam.born} - ${imam.died}`,
    hadiths: hadithCount,
    teachers: normalizeTransliteration(imam.teachers),
    students: normalizeTransliteration(imam.students),
    battles: 'Not a battlefield profile; scholarly life and public trials are emphasized',
    works: normalizeTransliteration(imam.keyWorks),
    legacy: trimText(imam.books_legacy || imam.reach),
    bio: trimText(imam.sig),
    method: trimText(imam.method, 320),
    chartKey: `entity${index}`,
    metrics: {
      Hadiths: clamp((hadithCount / 20) * 100),
      Battles: 10,
      Scholarship: 96,
      Sacrifice: clamp(imam.trial ? 82 : 58),
      Leadership: 84,
      Legacy: clamp(70 + reachScore / 2),
    },
  };
}

function buildEntity(item: CompareItem, index: number) {
  if (item.kind === 'companion') {
    const companion = COMPANIONS.find(c => c.rank === Number(item.id));
    return companion ? companionEntity(companion, index) : null;
  }
  const imam = IMAMS.find(i => i.id === item.id);
  return imam ? imamEntity(imam, index) : null;
}

export default function ComparePanel() {
  const { selectedItems, clear, toggleItem, isPanelOpen, closePanel } = useCompare();
  useBodyScrollLock(isPanelOpen && selectedItems.length > 0);

  if (!isPanelOpen || selectedItems.length === 0) return null;

  const entities = selectedItems
    .map((item, index) => buildEntity(item, index))
    .filter((entity): entity is CompareEntity => Boolean(entity));

  if (entities.length === 0) return null;

  const mergedData = RADAR_KEYS.map(key => {
    const entry: Record<string, string | number> = { subject: key };
    entities.forEach(entity => {
      entry[entity.chartKey] = entity.metrics[key] ?? 0;
    });
    return entry;
  });

  const matrixRows = [
    { label: 'Era', get: (entity: CompareEntity) => entity.era },
    { label: 'Hadiths', get: (entity: CompareEntity) => entity.hadiths.toLocaleString() },
    { label: 'Teachers', get: (entity: CompareEntity) => entity.teachers },
    { label: 'Students', get: (entity: CompareEntity) => entity.students },
    {
      label: 'Battles / Works',
      get: (entity: CompareEntity) => (entity.kind === 'imam' ? entity.works : entity.battles),
    },
    { label: 'Legacy', get: (entity: CompareEntity) => entity.legacy },
  ];

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && closePanel()}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Compare Mode</p>
            <h2>Companions & Imams</h2>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.countBadge}>{entities.length}/3 selected</span>
            <button
              className={styles.clearBtn}
              onClick={() => {
                clear();
                closePanel();
              }}
            >
              Clear all
            </button>
            <button className={styles.closeBtn} onClick={closePanel} aria-label="Close compare panel">
              x
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div
            className={styles.cols}
            style={{ gridTemplateColumns: `repeat(${entities.length}, minmax(0, 1fr))` }}
          >
            {entities.map(entity => (
              <div
                key={entity.key}
                className={styles.col}
                style={{ '--accent': entity.accent } as CSSProperties}
              >
                <div className={styles.colAccent} />
                <div className={styles.colInner}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => toggleItem({ kind: entity.kind, id: entity.id })}
                    aria-label={`Remove ${entity.name} from compare`}
                  >
                    x
                  </button>
                  <p className={styles.kind}>{entity.kind}</p>
                  <p className={styles.ar}>{entity.ar}</p>
                  <h3 className={styles.name}>{entity.name}</h3>
                  <p className={styles.subtitle}>{entity.subtitle}</p>
                  <p className={styles.catLabel} style={{ background: entity.badgeColor }}>
                    {entity.badge}
                  </p>

                  <div className={styles.statGrid}>
                    <div>
                      <span>Era</span>
                      <strong>{entity.era}</strong>
                    </div>
                    <div>
                      <span>Hadiths</span>
                      <strong>{entity.hadiths.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span>{entity.kind === 'imam' ? 'Works' : 'Battles'}</span>
                      <strong>{entity.kind === 'imam' ? trimText(entity.works, 80) : entity.battles}</strong>
                    </div>
                    <div>
                      <span>Role</span>
                      <strong>{entity.kind === 'imam' ? 'Scholarship' : entity.badge}</strong>
                    </div>
                  </div>

                  <section className={styles.section}>
                    <h4>Biography</h4>
                    <p>{entity.bio}</p>
                  </section>
                  <section className={styles.section}>
                    <h4>Teachers</h4>
                    <p>{entity.teachers}</p>
                  </section>
                  <section className={styles.section}>
                    <h4>Students</h4>
                    <p>{entity.students}</p>
                  </section>
                  <section className={styles.section}>
                    <h4>{entity.kind === 'imam' ? 'Method' : 'Legacy'}</h4>
                    <p>{entity.kind === 'imam' ? entity.method : entity.legacy}</p>
                  </section>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.matrixWrap}>
            <h3 className={styles.radarTitle}>Side-by-side details</h3>
            <div
              className={styles.matrix}
              role="table"
              aria-label="Side-by-side comparison details"
              style={{ '--compare-cols': entities.length } as CSSProperties}
            >
              {matrixRows.map(row => (
                <div className={styles.matrixRow} role="row" key={row.label}>
                  <div className={styles.matrixLabel} role="rowheader">
                    {row.label}
                  </div>
                  {entities.map(entity => (
                    <div className={styles.matrixCell} role="cell" key={`${row.label}-${entity.key}`}>
                      {row.get(entity)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.radarWrap}>
            <h3 className={styles.radarTitle}>Profile comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                data={mergedData}
                role="img"
                aria-label={`Radar comparison for ${entities.map(entity => entity.name).join(', ')}`}
              >
                <title>Comparison - {entities.map(entity => entity.name).join(' vs ')}</title>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-muted)', fontSize: 11 }} />
                {entities.map(entity => (
                  <Radar
                    key={entity.key}
                    name={entity.name}
                    dataKey={entity.chartKey}
                    stroke={entity.accent}
                    fill={entity.accent}
                    fillOpacity={0.15}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
