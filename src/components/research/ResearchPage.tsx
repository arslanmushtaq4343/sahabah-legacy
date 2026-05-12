import { type CSSProperties, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Companion } from '../../types';
import { COMPANIONS } from '../../data/companions';
import { IMAMS, type Imam } from '../../data/imams';
import { BATTLE_SHORT, BATTLE_YEAR } from '../../data/insights';
import { TEACHER_STUDENT_EDGES } from '../../data/connectionData';
import {
  RELIABILITY_META,
  SOURCE_CLAIMS,
  TABAQAT_MAP,
  type ReliabilityLevel,
} from '../../data/companionExtras';
import {
  COMPANION_AUTHENTICITY_SCORE,
  runCompanionDataQualityChecks,
} from '../../data/companionDataQuality';
import { runResearchDataAudit, type ResearchDataAuditReport } from '../../data/researchAudit';
import { FIQH_ROOTS } from '../../data/imamsExtra2';
import { IJTIHAD_CHANGES, QAWL_SAHABI } from '../../data/imamsExtra3';
import { QURAN_TRIGGERS } from '../../data/quranTriggers';
import { normalizeTransliteration } from '../../data/transliteration';
import styles from './ResearchPage.module.css';

type EntityKind = 'companion' | 'imam' | 'scholar';
type DashboardSeverity = 'issue' | 'review' | 'info';

interface EntityOption {
  id: string;
  name: string;
  kind: EntityKind;
  subtitle: string;
  bornYear: number | null;
  deathYear: number | null;
}

interface PathNode {
  id: string;
  label: string;
  kind: EntityKind;
  detail: string;
}

interface PathEdge {
  from: string;
  to: string;
  label: string;
  detail: string;
  source: string;
}

interface TimelineEvent {
  id: string;
  entityId: string;
  entityName: string;
  year: number;
  label: string;
  detail: string;
  tone: string;
}

interface ConflictCase {
  id: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  source: string;
  positions: Array<{ label: string; value: string; note?: string; accepted?: boolean }>;
}

interface DashboardItem {
  id: string;
  severity: DashboardSeverity;
  title: string;
  detail: string;
  link?: string;
}

const REQUIRED_COMPANION_FIELDS = [
  'name',
  'title',
  'rel',
  'born',
  'death',
  'place',
  'tribe',
  'sig',
  'contrib',
  'legacy',
  'keyEvent',
  'link',
] as const satisfies ReadonlyArray<keyof Companion>;

const REQUIRED_IMAM_FIELDS = [
  'name',
  'title',
  'born',
  'died',
  'origin',
  'sig',
  'teachers',
  'students',
  'keyWorks',
  'method',
] as const satisfies ReadonlyArray<keyof Imam>;

const CURATED_TRANSMISSION_EDGES: PathEdge[] = [
  {
    from: 'c:7',
    to: 'n:hammam ibn munabbih',
    label: 'direct student',
    detail: 'Hammam preserved Abu Hurayra narrations in the early Sahifah Hammam stream.',
    source: 'Sahifah Hammam tradition; companion transmission data',
  },
  {
    from: 'n:hammam ibn munabbih',
    to: 'n:mamar ibn rashid',
    label: 'hadith transmitter',
    detail: "Ma'mar transmitted from Hammam and carried this Yemeni hadith material forward.",
    source: 'Hadith transmission summaries',
  },
  {
    from: 'n:mamar ibn rashid',
    to: 'n:abd al-razzaq al-sanani',
    label: 'teacher',
    detail: "Abd al-Razzaq was a major transmitter of Ma'mar and a central Musannaf compiler.",
    source: 'Musannaf Abd al-Razzaq transmission stream',
  },
  {
    from: 'n:abd al-razzaq al-sanani',
    to: 'i:hanbali',
    label: 'teacher of Imam Ahmad',
    detail: 'Imam Ahmad travelled for hadith and transmitted from Abd al-Razzaq.',
    source: 'Hanbali biographical tradition',
  },
];

const SCHOLAR_DETAILS: Record<string, string> = {
  'n:hammam ibn munabbih': 'Early hadith transmitter linked to Abu Hurayra narrations.',
  'n:mamar ibn rashid': 'Yemeni transmitter who carried Hammam material into later collections.',
  'n:abd al-razzaq al-sanani': 'Compiler of al-Musannaf and teacher in major hadith routes.',
};

function norm(value: string) {
  return normalizeTransliteration(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function slugName(value: string) {
  return norm(value).replace(/\s+/g, ' ');
}

function parseYear(value: string | undefined) {
  if (!value) return null;
  const match = value.match(/(\d{3,4})/);
  return match ? Number(match[1]) : null;
}

function entityIdForCompanion(rank: number) {
  return `c:${rank}`;
}

function entityIdForImam(id: string) {
  return `i:${id}`;
}

function entityIdFromName(name: string, companions: Companion[], imams: Imam[]) {
  const key = norm(name);
  if (/abu hurayra|abu huraira|abu hurairah/.test(key)) return entityIdForCompanion(7);
  if (/ahmad/.test(key) && /imam|hanbal/.test(key)) return entityIdForImam('hanbali');
  if (/abu hanifa|hanifa/.test(key)) return entityIdForImam('hanafi');
  if (/malik/.test(key) && /imam|anas/.test(key)) return entityIdForImam('maliki');
  if (/shafi/.test(key)) return entityIdForImam('shafi');

  const companion = companions.find(c => norm(c.name) === key || key.includes(norm(c.name)));
  if (companion) return entityIdForCompanion(companion.rank);

  const imam = imams.find(im => norm(im.name) === key || key.includes(norm(im.name)));
  if (imam) return entityIdForImam(imam.id);

  return `n:${slugName(name)}`;
}

function buildEntities(): EntityOption[] {
  const companions = COMPANIONS.map(c => ({
    id: entityIdForCompanion(c.rank),
    name: normalizeTransliteration(c.name),
    kind: 'companion' as const,
    subtitle: `#${c.rank} - ${c.catLabel}`,
    bornYear: parseYear(c.born),
    deathYear: parseYear(c.death),
  }));

  const imams = IMAMS.map(imam => ({
    id: entityIdForImam(imam.id),
    name: normalizeTransliteration(imam.name),
    kind: 'imam' as const,
    subtitle: imam.honorific,
    bornYear: parseYear(imam.born),
    deathYear: parseYear(imam.died),
  }));

  return [...companions, ...imams].sort((a, b) => a.name.localeCompare(b.name));
}

function correctedTeacherRank(edge: (typeof TEACHER_STUDENT_EDGES)[number]) {
  const text = `${edge.studentName} ${edge.subject} ${edge.legacy}`.toLowerCase();
  if (text.includes('abu hurayra') || text.includes('5,374')) return 7;
  return edge.teacherRank;
}

function buildPathGraph(entities: EntityOption[]) {
  const nodeMap = new Map<string, PathNode>();
  entities.forEach(entity => {
    nodeMap.set(entity.id, {
      id: entity.id,
      label: entity.name,
      kind: entity.kind,
      detail: entity.subtitle,
    });
  });

  Object.entries(SCHOLAR_DETAILS).forEach(([id, detail]) => {
    const label = id.replace(/^n:/, '').replace(/\b\w/g, char => char.toUpperCase());
    nodeMap.set(id, { id, label, kind: 'scholar', detail });
  });

  const edges: PathEdge[] = [...CURATED_TRANSMISSION_EDGES];

  TEACHER_STUDENT_EDGES.forEach(edge => {
    const teacherRank = correctedTeacherRank(edge);
    const from = entityIdForCompanion(teacherRank);
    const to = `n:${slugName(edge.studentName)}`;
    if (!nodeMap.has(to)) {
      nodeMap.set(to, {
        id: to,
        label: normalizeTransliteration(edge.studentName),
        kind: 'scholar',
        detail: edge.subject,
      });
    }
    edges.push({
      from,
      to,
      label: edge.subject,
      detail: edge.legacy,
      source: 'Teacher-student transmission dataset',
    });
  });

  IMAMS.forEach(imam => {
    const chain = imam.teacherChain.map(name => entityIdFromName(name, COMPANIONS, IMAMS));
    imam.teacherChain.forEach((name, index) => {
      const id = chain[index];
      if (!nodeMap.has(id)) {
        nodeMap.set(id, {
          id,
          label: normalizeTransliteration(name),
          kind: id.startsWith('i:') ? 'imam' : 'scholar',
          detail: `Appears in ${imam.name} teacher chain`,
        });
      }
    });
    chain.forEach((from, index) => {
      const to = chain[index + 1];
      if (!to) return;
      edges.push({
        from,
        to,
        label: 'teacher chain',
        detail: `${nodeMap.get(from)?.label ?? from} precedes ${nodeMap.get(to)?.label ?? to} in ${imam.name}'s chain.`,
        source: `${imam.name} teacherChain`,
      });
    });
  });

  return { nodeMap, edges };
}

function findPath(from: string, to: string, edges: PathEdge[]) {
  const queue = [from];
  const visited = new Set([from]);
  const previous = new Map<string, PathEdge>();
  const adjacency = new Map<string, PathEdge[]>();

  edges.forEach(edge => {
    if (!adjacency.has(edge.from)) adjacency.set(edge.from, []);
    adjacency.get(edge.from)?.push(edge);
  });

  while (queue.length) {
    const current = queue.shift();
    if (!current || current === to) break;
    (adjacency.get(current) ?? []).forEach(edge => {
      if (visited.has(edge.to)) return;
      visited.add(edge.to);
      previous.set(edge.to, edge);
      queue.push(edge.to);
    });
  }

  if (!visited.has(to)) return [];

  const path: PathEdge[] = [];
  let cursor = to;
  while (cursor !== from) {
    const edge = previous.get(cursor);
    if (!edge) return [];
    path.unshift(edge);
    cursor = edge.from;
  }
  return path;
}

function buildTimelineForEntity(entityId: string, options: EntityOption[]) {
  const entity = options.find(item => item.id === entityId);
  if (!entity) return [];

  const events: TimelineEvent[] = [];
  const add = (event: Omit<TimelineEvent, 'entityId' | 'entityName'>) => {
    events.push({ ...event, entityId, entityName: entity.name });
  };

  if (entity.bornYear) {
    add({
      id: `${entityId}:birth`,
      year: entity.bornYear,
      label: 'Birth',
      detail: entity.subtitle,
      tone: '#69a9ff',
    });
  }

  if (entity.kind === 'companion') {
    const companion = COMPANIONS.find(c => entityIdForCompanion(c.rank) === entityId);
    if (companion) {
      companion.battles.forEach(battle => {
        const year = BATTLE_YEAR[battle] ?? BATTLE_YEAR[BATTLE_SHORT[battle] ?? ''];
        if (!year) return;
        add({
          id: `${entityId}:${battle}`,
          year,
          label: BATTLE_SHORT[battle] ?? battle,
          detail: 'Battle participation recorded in the companion profile.',
          tone: '#c9a84c',
        });
      });

      const midYear =
        entity.bornYear && entity.deathYear
          ? Math.round(entity.bornYear + (entity.deathYear - entity.bornYear) * 0.55)
          : entity.deathYear ?? entity.bornYear ?? 632;
      add({
        id: `${entityId}:key`,
        year: midYear,
        label: 'Key event',
        detail: companion.keyEvent || companion.sig,
        tone: '#60c6a8',
      });
    }
  }

  if (entity.kind === 'imam') {
    const imam = IMAMS.find(im => entityIdForImam(im.id) === entityId);
    if (imam) {
      const born = entity.bornYear ?? 700;
      add({
        id: `${entityId}:study`,
        year: born + 24,
        label: 'Formation',
        detail: imam.teachers,
        tone: '#60c6a8',
      });
      add({
        id: `${entityId}:legacy`,
        year: born + 45,
        label: 'Method and works',
        detail: imam.keyWorks,
        tone: '#c9a84c',
      });
    }
  }

  if (entity.deathYear) {
    add({
      id: `${entityId}:death`,
      year: entity.deathYear,
      label: 'Death',
      detail: entity.kind === 'imam' ? 'End of life and preserved school legacy.' : 'Final year in the companion record.',
      tone: '#d97979',
    });
  }

  return events.sort((a, b) => a.year - b.year);
}

function buildConflictCases(): ConflictCase[] {
  const fiqhCases: ConflictCase[] = FIQH_ROOTS.map(item => ({
    id: `fiqh:${item.id}`,
    title: item.topic,
    category: item.category,
    status: 'madhab difference',
    summary: item.whyDifference,
    source: item.companionNarrations.map(row => row.source).join('; '),
    positions: item.madhabPositions.map(row => ({
      label: row.madhab,
      value: row.ruling,
      note: row.reasoning,
    })),
  }));

  const qawlCases: ConflictCase[] = QAWL_SAHABI.map(item => ({
    id: `qawl:${item.topic}`,
    title: item.topic,
    category: item.category,
    status: item.usulStatus,
    summary: item.usulNote,
    source: item.source,
    positions: item.madhabAdoption.map(row => ({
      label: row.madhab,
      value: row.accepted ? 'Accepts this companion position' : 'Does not adopt this position',
      note: row.note,
      accepted: row.accepted,
    })),
  }));

  const changeCases: ConflictCase[] = IJTIHAD_CHANGES.map(item => ({
    id: `change:${item.companion}:${item.topic}`,
    title: item.topic,
    category: 'ijtihad evolution',
    status: 'revised report',
    summary: item.reasonForChange,
    source: item.hadithOrSource,
    positions: [
      { label: 'Original position', value: item.originalPosition },
      { label: 'Revised position', value: item.revisedPosition },
      { label: 'Madhab impact', value: item.madhahbImpact },
    ],
  }));

  return [...fiqhCases, ...qawlCases, ...changeCases];
}

function missingStringFields<T extends Record<string, unknown>>(row: T, fields: ReadonlyArray<keyof T>) {
  return fields.filter(field => {
    const value = row[field];
    return typeof value !== 'string' || !value.trim();
  });
}

function buildDashboardItems(audit: ResearchDataAuditReport): DashboardItem[] {
  const items: DashboardItem[] = [];
  items.push({
    id: 'audit:external-profile-coverage',
    severity: audit.coverage.externalProfileCoveragePercent >= 80 ? 'info' : 'review',
    title: 'External source coverage',
    detail: `${audit.coverage.profilesWithExternalClaims}/${audit.totals.companions} companion profiles have at least one external source-backed claim.`,
  });
  items.push({
    id: 'audit:high-risk-local-only',
    severity: audit.totals.highRiskLocalOnlyClaims ? 'review' : 'info',
    title: 'High-risk local-only claims',
    detail: `${audit.totals.highRiskLocalOnlyClaims} death, family, battle, virtue, quote, miracle, or hadith-count claims still depend only on local profile data.`,
  });

  audit.issues
    .filter(issue => issue.severity === 'issue')
    .slice(0, 20)
    .forEach(issue => {
      items.push({
        id: `audit:${issue.id}`,
        severity: issue.severity,
        title: issue.title,
        detail: issue.detail,
        link: issue.companionRank ? `/companions?rank=${issue.companionRank}` : undefined,
      });
    });

  runCompanionDataQualityChecks().forEach((issue, index) => {
    items.push({
      id: `built-in:${index}`,
      severity: 'issue',
      title: 'Companion quality check',
      detail: issue,
    });
  });

  COMPANIONS.forEach(c => {
    const missing = missingStringFields(c, REQUIRED_COMPANION_FIELDS);
    if (missing.length) {
      items.push({
        id: `companion:${c.rank}:missing`,
        severity: 'issue',
        title: `${c.name} has missing profile fields`,
        detail: missing.join(', '),
        link: `/companions?rank=${c.rank}`,
      });
    }

    if (!SOURCE_CLAIMS[c.rank]?.length) {
      items.push({
        id: `companion:${c.rank}:sources`,
        severity: 'review',
        title: `${c.name} has no source claims mapped`,
        detail: 'The profile can display biography, but the source-confidence layer has no explicit claim rows yet.',
        link: `/companions?rank=${c.rank}`,
      });
    }

    if (!TABAQAT_MAP[c.rank]) {
      items.push({
        id: `companion:${c.rank}:tabaqat`,
        severity: 'review',
        title: `${c.name} missing tabaqat tier`,
        detail: 'Generation tier is absent from the enrichment map.',
        link: `/companions?rank=${c.rank}`,
      });
    }
  });

  IMAMS.forEach(imam => {
    const missing = missingStringFields(imam, REQUIRED_IMAM_FIELDS);
    if (missing.length) {
      items.push({
        id: `imam:${imam.id}:missing`,
        severity: 'issue',
        title: `${imam.name} has missing imam fields`,
        detail: missing.join(', '),
        link: `/imams?imam=${imam.id}`,
      });
    }
  });

  TEACHER_STUDENT_EDGES.forEach((edge, index) => {
    const teacher = COMPANIONS.find(c => c.rank === edge.teacherRank);
    const text = `${edge.subject} ${edge.legacy}`.toLowerCase();
    if (teacher && (text.includes('abu hurayra') || text.includes('5,374')) && !/hurayra|huraira/i.test(teacher.name)) {
      items.push({
        id: `edge:${index}:mismatch`,
        severity: 'issue',
        title: 'Teacher-student edge likely points to the wrong rank',
        detail: `Edge to ${edge.studentName} mentions Abu Hurayra material but currently points to #${edge.teacherRank} ${teacher.name}.`,
      });
    }
  });

  const triggerCompanions = new Set(QURAN_TRIGGERS.map(trigger => norm(trigger.companion)));
  COMPANIONS.filter(c => c.catLabel === 'Wife' || c.hadiths > 1000).forEach(c => {
    if (!triggerCompanions.has(norm(c.name))) {
      items.push({
        id: `quran:${c.rank}:review`,
        severity: 'info',
        title: `${c.name} has no Quran trigger match`,
        detail: 'This may be correct, but high-profile narrators and household figures should be reviewed for revelation links.',
        link: `/companions?rank=${c.rank}`,
      });
    }
  });

  return items;
}

function reliabilityCounts() {
  const counts: Record<ReliabilityLevel, number> = {
    sahih: 0,
    hasan: 0,
    maqbul: 0,
    daif: 0,
    mawdu: 0,
  };
  Object.values(SOURCE_CLAIMS).forEach(claims => {
    claims.forEach(claim => {
      counts[claim.reliability] += 1;
    });
  });
  return counts;
}

function strengthLabel(score: number) {
  if (score >= 80) return 'strong';
  if (score >= 60) return 'moderate';
  return 'needs review';
}

export default function ResearchPage() {
  const entityOptions = useMemo(() => buildEntities(), []);
  const [fromId, setFromId] = useState('c:7');
  const [toId, setToId] = useState('i:hanbali');
  const [leftTimelineId, setLeftTimelineId] = useState('c:7');
  const [rightTimelineId, setRightTimelineId] = useState('i:hanbali');
  const [conflictQuery, setConflictQuery] = useState('');
  const [dashboardFilter, setDashboardFilter] = useState<DashboardSeverity | 'all'>('all');

  const { nodeMap, edges } = useMemo(() => buildPathGraph(entityOptions), [entityOptions]);
  const path = useMemo(() => findPath(fromId, toId, edges), [edges, fromId, toId]);
  const conflictCases = useMemo(() => buildConflictCases(), []);
  const audit = useMemo(() => runResearchDataAudit(), []);
  const dashboardItems = useMemo(() => buildDashboardItems(audit), [audit]);
  const reliability = useMemo(() => reliabilityCounts(), []);

  const filteredConflicts = conflictCases.filter(item => {
    const q = norm(conflictQuery);
    if (!q) return true;
    return norm(`${item.title} ${item.category} ${item.summary} ${item.source}`).includes(q);
  });

  const filteredDashboard = dashboardItems.filter(item => {
    if (dashboardFilter === 'all') return true;
    return item.severity === dashboardFilter;
  });

  const timelineEvents = [
    ...buildTimelineForEntity(leftTimelineId, entityOptions),
    ...buildTimelineForEntity(rightTimelineId, entityOptions),
  ].sort((a, b) => a.year - b.year);
  const minYear = Math.min(...timelineEvents.map(event => event.year));
  const maxYear = Math.max(...timelineEvents.map(event => event.year));
  const span = Math.max(1, maxYear - minYear);
  const sourceCoverage = audit.coverage.externalProfileCoveragePercent;
  const averageAuthenticity = Math.round(
    Object.values(COMPANION_AUTHENTICITY_SCORE).reduce((sum, score) => sum + score, 0) /
      COMPANIONS.length
  );
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Research Lab</p>
          <h1>Research Path Finder</h1>
          <p>
            Connect transmitters, compare lifetimes, inspect disputed reports, and find missing
            data before it becomes an empty panel.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>{entityOptions.length}</strong>
            <span>searchable people</span>
          </div>
          <div>
            <strong>{conflictCases.length}</strong>
            <span>conflict cases</span>
          </div>
          <div>
            <strong>{sourceCoverage}%</strong>
            <span>source coverage</span>
          </div>
        </div>
      </header>

      <section className={styles.panel} aria-labelledby="path-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Path Finder</p>
            <h2 id="path-title">Connect Abu Hurayra to Imam Ahmad</h2>
          </div>
          <span>{path.length ? `${path.length} links found` : 'No route found'}</span>
        </div>

        <div className={styles.selectGrid}>
          <label>
            From
            <select value={fromId} onChange={event => setFromId(event.target.value)}>
              {entityOptions.map(entity => (
                <option key={entity.id} value={entity.id}>
                  {entity.name} - {entity.subtitle}
                </option>
              ))}
            </select>
          </label>
          <label>
            To
            <select value={toId} onChange={event => setToId(event.target.value)}>
              {entityOptions.map(entity => (
                <option key={entity.id} value={entity.id}>
                  {entity.name} - {entity.subtitle}
                </option>
              ))}
            </select>
          </label>
        </div>

        {path.length > 0 ? (
          <ol className={styles.pathList}>
            <li className={styles.pathNode}>
              <strong>{nodeMap.get(path[0].from)?.label ?? path[0].from}</strong>
              <span>{nodeMap.get(path[0].from)?.detail}</span>
            </li>
            {path.map(edge => (
              <li key={`${edge.from}:${edge.to}:${edge.label}`} className={styles.pathStep}>
                <div className={styles.pathConnector}>
                  <span>{edge.label}</span>
                </div>
                <div className={styles.pathNode}>
                  <strong>{nodeMap.get(edge.to)?.label ?? edge.to}</strong>
                  <span>{edge.detail}</span>
                  <em>{edge.source}</em>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.empty}>No direct route is available in the current transmission data.</div>
        )}
      </section>

      <section className={styles.panel} aria-labelledby="timeline-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Timeline Compare</p>
            <h2 id="timeline-title">Compare two lives on one chronology</h2>
          </div>
          <span>
            {minYear}-{maxYear} CE
          </span>
        </div>

        <div className={styles.selectGrid}>
          <label>
            First profile
            <select value={leftTimelineId} onChange={event => setLeftTimelineId(event.target.value)}>
              {entityOptions.map(entity => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Second profile
            <select value={rightTimelineId} onChange={event => setRightTimelineId(event.target.value)}>
              {entityOptions.map(entity => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.compareTimeline}>
          {timelineEvents.map(event => {
            const x = ((event.year - minYear) / span) * 100;
            return (
              <article
                key={event.id}
                className={styles.timelineEvent}
                style={{ '--x': `${x}%`, '--accent': event.tone } as CSSProperties}
              >
                <div className={styles.timelinePin} />
                <div className={styles.timelineCard}>
                  <span>{event.year} CE</span>
                  <strong>{event.entityName}</strong>
                  <h3>{event.label}</h3>
                  <p>{event.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="conflict-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Source Conflict View</p>
            <h2 id="conflict-title">Where reports or legal readings differ</h2>
          </div>
          <input
            className={styles.search}
            value={conflictQuery}
            onChange={event => setConflictQuery(event.target.value)}
            placeholder="Search conflict cases..."
            aria-label="Search source conflicts"
          />
        </div>

        <div className={styles.conflictGrid}>
          {filteredConflicts.slice(0, 8).map(item => (
            <article key={item.id} className={styles.conflictCard}>
              <div className={styles.conflictTop}>
                <span>{item.status}</span>
                <em>{item.category}</em>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <small>{item.source}</small>
              <div className={styles.positions}>
                {item.positions.slice(0, 4).map(position => (
                  <div
                    key={`${item.id}:${position.label}`}
                    className={position.accepted === false ? styles.positionMuted : undefined}
                  >
                    <strong>{position.label}</strong>
                    <span>{position.value}</span>
                    {position.note && <em>{position.note}</em>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="dashboard-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Data Completeness Dashboard</p>
            <h2 id="dashboard-title">Missing bios, sources, and empty sections</h2>
          </div>
          <div className={styles.filterBtns}>
            {(['all', 'issue', 'review', 'info'] as const).map(item => (
              <button
                key={item}
                className={dashboardFilter === item ? styles.filterActive : undefined}
                onClick={() => setDashboardFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.dashboardStats}>
          <div>
            <strong>{averageAuthenticity}%</strong>
            <span>avg authenticity</span>
          </div>
          <div>
            <strong>{audit.coverage.profilesWithExternalClaims}</strong>
            <span>externally sourced</span>
          </div>
          <div>
            <strong>{audit.totals.highRiskLocalOnlyClaims}</strong>
            <span>local-only risk</span>
          </div>
          <div>
            <strong>{dashboardItems.filter(item => item.severity === 'issue').length}</strong>
            <span>hard issues</span>
          </div>
        </div>

        <div className={styles.reliabilityBar} aria-label="Source reliability distribution">
          {(Object.keys(reliability) as ReliabilityLevel[]).map(level => {
            const total = Object.values(reliability).reduce((sum, count) => sum + count, 0) || 1;
            const width = Math.max(4, (reliability[level] / total) * 100);
            return (
              <div
                key={level}
                style={
                  {
                    '--width': `${width}%`,
                    '--accent': RELIABILITY_META[level].color,
                  } as CSSProperties
                }
              >
                <span />
                <strong>
                  {RELIABILITY_META[level].label}: {reliability[level]}
                </strong>
              </div>
            );
          })}
        </div>

        <div className={styles.issueList}>
          {filteredDashboard.slice(0, 18).map(item => (
            <article key={item.id} className={`${styles.issue} ${styles[item.severity]}`}>
              <span>{item.severity}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
                {item.link && <Link to={item.link}>Open record</Link>}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.coverageNote}>
          <strong>Coverage signal:</strong> external profile coverage is {sourceCoverage}%, the
          legacy average authenticity score is {strengthLabel(averageAuthenticity)}, and the audit
          is tracking {audit.totals.claims} structured claims across {audit.totals.sources} sources.
        </div>
      </section>
    </div>
  );
}
