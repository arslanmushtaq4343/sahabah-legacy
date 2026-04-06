import { useEffect, useState, useCallback } from 'react';
import type { Companion } from '../../types';
import { CAT_COLORS } from '../../data/companions';
import { useLanguage } from '../../context/LanguageContext';
import { COMPANION_UR_OVERRIDES } from '../../data/companionsUr';
import { useT } from '../../i18n/useT';
import {
  PROPHETIC_DUAS,
  OCCUPATIONS,
  DREAMS,
  FAMILY_TREES,
  SOURCE_CLAIMS,
  RELIABILITY_META,
  type ReliabilityLevel,
} from '../../data/companionExtras';
import { LAST_WORDS_DATA } from '../../data/lastWords';
import { QURAN_TRIGGERS } from '../../data/quranTriggers';
import { QURAN_TRIGGER_REFS } from '../../data/companionExtras';
import {
  KARAMAT_DATA,
  PROPHETIC_PRAISE,
  COMPANION_POEMS,
  WEAPONS_DATA,
  GIFTS_DATA,
  POW_DATA,
  NAMED_ANIMALS,
  LAND_GRANTS,
  BATTLE_WOUNDS,
} from '../../data/companionsExtra2';
import type { ReadingLevel } from './CompanionsPage';
import { DedicationGenerator, CompanionVoice } from './CompanionsPage';
import { getTafsirByCompanion, QURAN_MEM_REGISTRY, LEGACY_SCORES } from '../../data/companionsExtra4';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from 'recharts';
import styles from './CompanionModal.module.css';

type ModalTab = 'profile' | 'quran' | 'family' | 'miracles' | 'poetry' | 'tafsir';

interface Props {
  companion: Companion;
  onClose: () => void;
  readingLevel?: ReadingLevel;
  isStudied?: boolean;
  onToggleStudied?: () => void;
}

function radarData(c: Companion) {
  return [
    { subject: 'Hadiths',    value: Math.min(100, Math.round((c.hadiths / 5374) * 100)) },
    { subject: 'Battles',    value: Math.min(100, c.battles.length * 12) },
    { subject: 'Scholarship', value: c.cat === 'scholar' || c.cat === 'narrator' ? 85 : 40 },
    { subject: 'Sacrifice',   value: c.cat === 'martyr'  || c.cat === 'warrior'  ? 90 : 50 },
    { subject: 'Leadership',  value: c.cat === 'caliph'  || c.cat === 'general'  ? 95 : 45 },
    { subject: 'Legacy',      value: c.rank <= 5 ? 100 : c.rank <= 15 ? 75 : 55 },
  ];
}

/* ─── Source reliability badge ──────────────────────────────────────── */
function ReliabilityBadge({ level }: { level: ReliabilityLevel }) {
  const m = RELIABILITY_META[level];
  return (
    <span
      className={styles.reliabilityBadge}
      style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}55` }}
    >
      {m.label}
    </span>
  );
}

/* ─── Family Tree SVG ────────────────────────────────────────────────── */
function FamilyTreeView({ rank, color }: { rank: number; color: string }) {
  const tree = FAMILY_TREES[rank];
  if (!tree) {
    return <p className={styles.noData}>Family tree not yet available for this companion.</p>;
  }

  const nodeW = 110, nodeH = 40, gapX = 130, gapY = 80;
  const selfNode = tree.nodes.find(n => n.isCompanion && n.companionRank === rank);
  const others   = tree.nodes.filter(n => !(n.isCompanion && n.companionRank === rank));

  // Simple layout: self in centre row, others fanned around
  const layout: Record<string, { x: number; y: number }> = {};
  if (selfNode) layout[selfNode.id] = { x: 260, y: 120 };
  const parents = others.filter(n => {
    const e = tree.edges.find(e => e.from === n.id && e.to === (selfNode?.id ?? ''));
    return !!e;
  });
  const children = others.filter(n => {
    const e = tree.edges.find(e => e.from === (selfNode?.id ?? '') && e.to === n.id);
    return !!e;
  });
  const siblings = others.filter(n => !parents.includes(n) && !children.includes(n));

  parents.forEach((n, i) => { layout[n.id] = { x: 90 + i * gapX, y: 40 }; });
  children.forEach((n, i) => {
    layout[n.id] = { x: 40 + i * (gapX - 10), y: 200 };
  });
  siblings.forEach((n, i) => { layout[n.id] = { x: 500 + i * (gapX - 20), y: 120 }; });

  const allNodes = tree.nodes;
  const svgW = 640, svgH = 280;

  return (
    <div className={styles.familyTreeWrap}>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className={styles.familySvg}>
        {/* Edges */}
        {tree.edges.map((e, i) => {
          const f = layout[e.from], t = layout[e.to];
          if (!f || !t) return null;
          return (
            <line
              key={i}
              x1={f.x + nodeW / 2} y1={f.y + nodeH / 2}
              x2={t.x + nodeW / 2} y2={t.y + nodeH / 2}
              stroke={color + '66'} strokeWidth={1.5} strokeDasharray="4 3"
            />
          );
        })}
        {/* Nodes */}
        {allNodes.map(n => {
          const pos = layout[n.id];
          if (!pos) return null;
          const isSelf = n.isCompanion && n.companionRank === rank;
          return (
            <g key={n.id} transform={`translate(${pos.x},${pos.y})`}>
              <rect
                width={nodeW} height={nodeH} rx={6}
                fill={isSelf ? color + '33' : '#f0ece0'}
                stroke={isSelf ? color : '#c8b88a'}
                strokeWidth={isSelf ? 2 : 1}
              />
              <text x={nodeW / 2} y={14} textAnchor="middle" fontSize={9} fill="#2a1a08" fontFamily="Amiri, serif">
                {n.labelAr || ''}
              </text>
              <text x={nodeW / 2} y={28} textAnchor="middle" fontSize={8.5} fill="#3a2a10">
                {n.label}
              </text>
              <text x={nodeW / 2} y={38} textAnchor="middle" fontSize={7} fill={color}>
                {n.rel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MODAL COMPONENT
   ═════════════════════════════════════════════════════════════════════ */
export default function CompanionModal({
  companion: c,
  onClose,
  readingLevel = 'adult',
  isStudied = false,
  onToggleStudied,
}: Props) {
  const { lang } = useLanguage();
  const t = useT();
  const urOv = COMPANION_UR_OVERRIDES[c.rank] ?? {};
  const [tab, setTab] = useState<ModalTab>('profile');
  const [showDedication, setShowDedication] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const data = radarData(c);

  const duas      = PROPHETIC_DUAS[c.rank] ?? [];
  const occupation = OCCUPATIONS[c.rank];
  const dreams    = DREAMS[c.rank] ?? [];
  const sources   = SOURCE_CLAIMS[c.rank] ?? [];
  const lastWords = LAST_WORDS_DATA.filter(lw => lw.companionRank === c.rank || lw.companion === c.name);
  const qtRefs    = QURAN_TRIGGER_REFS[c.rank] ?? [];
  const qtEntries = qtRefs.map(id => QURAN_TRIGGERS.find(q => q.id === id)).filter(Boolean);

  // Feature 51-62 data
  const karamat    = KARAMAT_DATA[c.rank] ?? [];
  const praise     = PROPHETIC_PRAISE[c.rank] ?? [];
  const poems      = COMPANION_POEMS[c.rank] ?? [];
  const gifts      = GIFTS_DATA[c.rank] ?? [];
  const powRecords = POW_DATA.filter(p => p.companionRank === c.rank);
  const animals    = NAMED_ANIMALS.filter(a => a.ownerRank === c.rank);
  const landGrants = LAND_GRANTS.filter(l => l.companionRank === c.rank);
  const wounds     = BATTLE_WOUNDS[c.rank] ?? [];
  const weapons    = WEAPONS_DATA.filter(w => w.custodianRank === c.rank);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const color = CAT_COLORS[c.cat] || '#b8860b';

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className={styles.header} style={{ '--cat-color': color } as React.CSSProperties}>
          <div className={styles.headerAccent} />
          <div className={styles.headerContent}>
            <div className={styles.headerTop}>
              <span className={styles.rank}>#{c.rank}</span>
              <span className={styles.cat}>{c.catLabel}</span>
              {onToggleStudied && (
                <button
                  className={`${styles.studyBtn} ${isStudied ? styles.studyBtnActive : ''}`}
                  onClick={onToggleStudied}
                  title={isStudied ? 'Unmark as studied' : 'Mark as studied'}
                >
                  {isStudied ? '✓ Studied' : '○ Study'}
                </button>
              )}
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
            </div>
            <p className={styles.ar}>{c.ar}</p>
            {lang === 'ur' && <p className={styles.urName}>{c.ur}</p>}
            <h2 className={styles.name}>{c.name}</h2>
            <p className={styles.title}>{c.title}</p>
          </div>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────── */}
        <div className={styles.tabs}>
          {([
            ['profile',  `📜 ${t('comp.modal.tabs.profile')}`],
            ['quran',    `✦ ${t('comp.modal.tabs.quran')}`],
            ['tafsir',   `📖 ${t('comp.modal.tabs.tafsir')}`],
            ['family',   `👨‍👩‍👧‍👦 ${t('comp.modal.tabs.family')}`],
            ['miracles', `✨ ${t('comp.modal.tabs.miracles')}`],
            ['poetry',   `🎭 ${t('comp.modal.tabs.poetry')}`],
          ] as [ModalTab, string][]).map(([t, label]) => (
            <button
              key={t}
              className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
              style={tab === t ? { borderBottomColor: color, color } : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* ════════ PROFILE TAB ════════════════════════════════ */}
          {tab === 'profile' && (
            <>
              {/* Quick facts grid */}
              <div className={styles.facts}>
                {[
                  { label: t('comp.modal.facts.born'),    val: c.born },
                  { label: t('comp.modal.facts.death'),   val: c.death },
                  { label: t('comp.modal.facts.origin'),  val: c.place },
                  { label: t('comp.modal.facts.tribe'),   val: c.tribe },
                  { label: t('comp.modal.facts.hadiths'), val: c.hadiths > 0 ? c.hadiths.toLocaleString() : '—' },
                  { label: t('comp.modal.facts.battles'), val: c.battles.length > 0 ? String(c.battles.length) : '—' },
                ].map(({ label, val }) => (
                  <div key={label} className={styles.fact}>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factVal}>{val || '—'}</span>
                  </div>
                ))}
              </div>

              {/* Occupation before & after Islam (Feature 49) */}
              {occupation && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.occupation')}</h3>
                  <div className={styles.occupationRow}>
                    <div className={styles.occBefore}>
                      <span className={styles.occLabel}>{t('comp.modal.beforeIslam')}</span>
                      <p>{occupation.before}</p>
                    </div>
                    <div className={styles.occArrow}>→</div>
                    <div className={styles.occAfter}>
                      <span className={styles.occLabel}>{t('comp.modal.afterIslam')}</span>
                      <p>{occupation.after}</p>
                    </div>
                  </div>
                  {occupation.note && <p className={styles.occNote}>{occupation.note}</p>}
                </section>
              )}

              {/* Significance */}
              <section className={styles.section}>
                <h3>{t('comp.modal.significance')}</h3>
                <p>
                  {readingLevel === 'child'
                    ? ((lang === 'ur' ? (urOv.sigUr ?? c.sig) : c.sig).split('.')[0] + '.')
                    : (lang === 'ur' ? (urOv.sigUr ?? c.sig) : c.sig)}
                </p>
              </section>

              {/* Relationship to Prophet ﷺ */}
              <section className={styles.section}>
                <h3>{t('comp.modal.relationship')}</h3>
                <p>{c.rel}</p>
              </section>

              {/* Contribution */}
              <section className={styles.section}>
                <h3>{t('comp.modal.contributions')}</h3>
                <p>
                  {readingLevel === 'child'
                    ? ((lang === 'ur' ? (urOv.contribUr ?? c.contrib) : c.contrib).slice(0, 200) + '…')
                    : (lang === 'ur' ? (urOv.contribUr ?? c.contrib) : c.contrib)}
                </p>
              </section>

              {/* Two columns: Personality + Radar */}
              <div className={styles.twoCol}>
                <section className={styles.section}>
                  <h3>{t('comp.modal.character')}</h3>
                  <ul className={styles.traits}>
                    {(lang === 'ur' ? (urOv.personalityUr ?? c.personality) : c.personality).map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </section>
                <div className={styles.radar}>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart
                      data={data}
                      role="img"
                      aria-label={`Contribution radar chart for ${c.name}: Hadiths, Battles, Scholarship, Sacrifice, Leadership, and Legacy scores`}
                    >
                      <title>{c.name} — Contribution Radar</title>
                      <PolarGrid stroke="#2c2820" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a6e5a', fontSize: 11 }} />
                      <Radar
                        dataKey="value"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Prophet's Du'a (Feature 05) */}
              {duas.length > 0 && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.duaFor')} {c.name.split(' ')[0]}</h3>
                  <div className={styles.duaList}>
                    {duas.map((d, i) => (
                      <div key={i} className={styles.duaCard}>
                        <p className={`${styles.duaAr} ar`}>{d.ar}</p>
                        <p className={styles.duaEn}>"{d.en}"</p>
                        <p className={styles.duaOccasion}>{d.occasion}</p>
                        <span className={styles.duaSource}>{d.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Key Event */}
              <section className={styles.section}>
                <h3>{t('comp.modal.keyEvent')}</h3>
                <blockquote className={styles.blockquote}>{lang === 'ur' ? (urOv.keyEventUr ?? c.keyEvent) : c.keyEvent}</blockquote>
              </section>

              {/* Prophetic Link */}
              {c.link && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.propheticTestimony')}</h3>
                  <blockquote className={styles.blockquote}>{lang === 'ur' ? (urOv.linkUr ?? c.link) : c.link}</blockquote>
                </section>
              )}

              {/* Quote */}
              {c.quoteEn && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.theirWords')}</h3>
                  {c.quote && <p className={`${styles.quoteAr} ar`}>{c.quote}</p>}
                  <p className={styles.quoteEn}>"{lang === 'ur' ? (urOv.quoteUr ?? c.quoteEn) : c.quoteEn}"</p>
                </section>
              )}

              {/* Last Words at Death (Feature 04) */}
              {lastWords.length > 0 && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.finalMoments')}</h3>
                  <div className={styles.lastWordsBlock}>
                    {lastWords.map((lw, i) => (
                      <div key={i} className={styles.lastWordCard}>
                        {lw.wordsAr && <p className={`${styles.lwAr} ar`}>{lw.wordsAr}</p>}
                        <p className={styles.lwEn}>{lw.wordsEn}</p>
                        {lw.wordsUr && <p className={styles.lwUr}>{lw.wordsUr}</p>}
                        <p className={styles.lwContext}>{lw.context}</p>
                        <span className={styles.lwSource}>{lw.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Legacy */}
              <section className={styles.section}>
                <h3>{t('comp.modal.legacy')}</h3>
                <p>{lang === 'ur' ? (urOv.legacyUr ?? c.legacy) : c.legacy}</p>
              </section>

              {/* Appearance + Dreams */}
              <div className={styles.twoCol}>
                {/* Physical description (Feature 08) */}
                {c.appearance && (
                  <section className={styles.section}>
                    <h3>{t('comp.modal.appearance')}</h3>
                    <p>{lang === 'ur' ? (urOv.appearanceUr ?? c.appearance) : c.appearance}</p>
                  </section>
                )}
                {/* Dreams & Visions (Feature 10) */}
                {dreams.length > 0 && (
                  <section className={styles.section}>
                    <h3>{t('comp.modal.dreams')}</h3>
                    {dreams.map((d, i) => (
                      <div key={i} className={styles.dreamCard}>
                        <p className={styles.dreamSummary}>{lang === 'ur' ? (d.summaryUr ?? d.summary) : d.summary}</p>
                        {readingLevel !== 'child' && (
                          <p className={styles.dreamDetail}>{lang === 'ur' ? (d.detailUr ?? d.detail) : d.detail}</p>
                        )}
                        <span className={styles.dreamSource}>{d.source}</span>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              {/* Miracles */}
              {c.miracles && (
                <section className={styles.section}>
                  <h3>{t('comp.modal.miracles')}</h3>
                  <p>{lang === 'ur' ? (urOv.miraclesUr ?? c.miracles) : c.miracles}</p>
                </section>
              )}

              {/* Battles */}
              {c.battles.length > 0 && (
                <section className={styles.section}>
                  <h3>Battles</h3>
                  <div className={styles.tags}>
                    {c.battles.map(b => <span key={b} className={styles.tag}>{b}</span>)}
                  </div>
                </section>
              )}

              {/* Burial */}
              {c.burial && (
                <section className={styles.section}>
                  <h3>Burial</h3>
                  <p>{c.burial}</p>
                </section>
              )}

              {/* Source reliability meter (Feature 35) */}
              {sources.length > 0 && readingLevel === 'scholar' && (
                <section className={styles.section}>
                  <h3>Source Reliability</h3>
                  <div className={styles.sourceList}>
                    {sources.map((s, i) => (
                      <div key={i} className={styles.sourceItem}>
                        <ReliabilityBadge level={s.reliability} />
                        <span className={styles.sourceTopic}>{s.topic}</span>
                        <span className={styles.sourceRef}>{s.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 52: What the Prophet ﷺ Said ── */}
              {praise.length > 0 && (
                <section className={styles.section}>
                  <h3>What the Prophet ﷺ Said About {c.name.split(' ')[0]}</h3>
                  <div className={styles.praiseList}>
                    {praise.map((p, i) => (
                      <div key={i} className={styles.praiseCard}>
                        <span className={styles.praiseCat}>{p.category}</span>
                        {p.ar && <p className={`${styles.praiseAr} ar`}>{p.ar}</p>}
                        <p className={styles.praiseEn}>{lang === 'ur' ? (p.ur ?? p.en) : p.en}</p>
                        <p className={styles.praiseOccasion}>{lang === 'ur' ? (p.occasionUr ?? p.occasion) : p.occasion}</p>
                        <span className={styles.praiseSource}>{p.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 54: Weapons Custodian ── */}
              {weapons.length > 0 && (
                <section className={styles.section}>
                  <h3>Prophetic Weapons in Their Custody</h3>
                  <div className={styles.weaponList}>
                    {weapons.map((w, i) => (
                      <div key={i} className={styles.weaponCard}>
                        <div className={styles.weaponHeader}>
                          <span className={styles.weaponName}>{w.name}</span>
                          <span className={styles.weaponNameAr} dir="rtl">{w.nameAr}</span>
                          <span className={styles.weaponType}>{w.type}</span>
                        </div>
                        <p className={styles.weaponDesc}>{w.description}</p>
                        <p className={styles.weaponAcq}><strong>Acquisition:</strong> {w.acquisition}</p>
                        <p className={styles.weaponNow}><strong>Where now:</strong> {w.whereNow}</p>
                        <span className={styles.weaponSource}>{w.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 56: Prophetic Gifts ── */}
              {gifts.length > 0 && (
                <section className={styles.section}>
                  <h3>Gift Exchange with the Prophet ﷺ</h3>
                  <div className={styles.giftList}>
                    {gifts.map((g, i) => (
                      <div key={i} className={`${styles.giftCard} ${g.direction === 'prophet-to-companion' ? styles.giftFromProphet : styles.giftToCompanion}`}>
                        <div className={styles.giftDir}>
                          {g.direction === 'prophet-to-companion' ? '→ From the Prophet ﷺ' : '← To the Prophet ﷺ'}
                        </div>
                        <p className={styles.giftItem}>{lang === 'ur' ? (g.itemUr ?? g.item) : g.item}</p>
                        <p className={styles.giftOccasion}>{lang === 'ur' ? (g.occasionUr ?? g.occasion) : g.occasion}</p>
                        <p className={styles.giftMeaning}><em>{lang === 'ur' ? (g.meaningUr ?? g.meaning) : g.meaning}</em></p>
                        <span className={styles.giftSource}>{g.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 57: POW Records ── */}
              {powRecords.length > 0 && (
                <section className={styles.section}>
                  <h3>Captivity & Freedom Story</h3>
                  {powRecords.map((p, i) => (
                    <div key={i} className={styles.powCard}>
                      <div className={styles.powHeader}>
                        <span className={styles.powEvent}>{p.event}</span>
                        <span className={styles.powYear}>{Math.abs(p.yearAH)} {p.yearAH < 0 ? 'BH' : 'AH'}</span>
                      </div>
                      {p.ransom && <p className={styles.powRansom}><strong>Ransom:</strong> {p.ransom}</p>}
                      {p.ransomPaidBy && <p className={styles.powPaidBy}><strong>Paid by:</strong> {p.ransomPaidBy}</p>}
                      <p className={styles.powStory}>{p.story}</p>
                      <p className={styles.powFaith}><strong>Faith impact:</strong> {p.faithImpact}</p>
                      <span className={styles.powSource}>{p.source}</span>
                    </div>
                  ))}
                </section>
              )}

              {/* ── Feature 60: Named Animals ── */}
              {animals.length > 0 && (
                <section className={styles.section}>
                  <h3>Named Animals</h3>
                  <div className={styles.animalList}>
                    {animals.map((a, i) => (
                      <div key={i} className={styles.animalCard}>
                        <div className={styles.animalHeader}>
                          <span className={styles.animalName}>{a.animalName}</span>
                          {a.animalNameAr && <span className={styles.animalNameAr} dir="rtl">{a.animalNameAr}</span>}
                          <span className={styles.animalSpecies}>{a.species}</span>
                        </div>
                        <p className={styles.animalRole}>{a.role}</p>
                        <p className={styles.animalStory}>{a.story}</p>
                        {a.fate && <p className={styles.animalFate}><em>Fate: {a.fate}</em></p>}
                        <span className={styles.animalSource}>{a.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Feature 61: Land Grants ── */}
              {landGrants.length > 0 && (
                <section className={styles.section}>
                  <h3>Land & Property Grants</h3>
                  {landGrants.map((l, i) => (
                    <div key={i} className={styles.landCard}>
                      <div className={styles.landHeader}>
                        <span className={styles.landProp}>{l.property}</span>
                        <span className={styles.landLoc}>{l.location}</span>
                      </div>
                      <p><strong>Granted by:</strong> {l.grantedBy}</p>
                      <p><strong>Purpose:</strong> {l.purpose}</p>
                      <p><strong>Legacy:</strong> {l.whatHappenedToIt}</p>
                      <span className={styles.landSource}>{l.source}</span>
                    </div>
                  ))}
                </section>
              )}

              {/* ── Feature 62: Battle Wounds ── */}
              {wounds.length > 0 && (
                <section className={styles.section}>
                  <h3>Battle Wounds Registry</h3>
                  <div className={styles.woundList}>
                    {wounds.map((w, i) => (
                      <div key={i} className={styles.woundCard}>
                        <div className={styles.woundHeader}>
                          <span className={styles.woundBattle}>{w.battle}</span>
                          <span className={styles.woundYear}>{w.yearAH} AH</span>
                        </div>
                        <p className={styles.woundInjury}>{w.injury}</p>
                        <p className={styles.woundWeapon}>Weapon: {w.weapon}{w.bodyPart ? ` · ${w.bodyPart}` : ''}</p>
                        {w.treatedBy && <p className={styles.woundTreated}>Treated by: {w.treatedBy}</p>}
                        <p className={`${styles.woundOutcome} ${w.outcome.toLowerCase().includes('martyr') ? styles.woundMartyr : ''}`}>{w.outcome}</p>
                        <span className={styles.woundSource}>{w.source}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ════════ QURAN TAB (Feature 01) ═════════════════════ */}
          {tab === 'quran' && (
            <div className={styles.quranTab}>
              {qtEntries.length > 0 ? (
                <>
                  <p className={styles.quranIntro}>
                    These Quranic ayahs were revealed because of or directly relating to {c.name.split(' ')[0]}.
                  </p>
                  {qtEntries.map((qt, i) => qt && (
                    <div key={i} className={styles.quranEntry}>
                      <div className={styles.quranRef}>
                        <span className={styles.quranSurah}>{qt.surah}</span>
                        <span className={styles.quranAyahNum}>{qt.ayahRef}</span>
                      </div>
                      <p className={`${styles.quranAr} ar`}>{qt.ayahAr}</p>
                      <p className={styles.quranEn}>"{qt.ayahEn}"</p>
                      {qt.ayahUr && <p className={styles.quranUr}>{qt.ayahUr}</p>}
                      <div className={styles.quranStory}>
                        <h4>The Story</h4>
                        <p>{qt.story}</p>
                      </div>
                      {qt.companionResponse && (
                        <div className={styles.quranResponse}>
                          <h4>{c.name.split(' ')[0]}'s Response</h4>
                          <p>{qt.companionResponse}</p>
                        </div>
                      )}
                      <span className={styles.quranSource}>{qt.source}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا تَعْلَمُ</p>
                  <p>No specific Quranic revelation linked to {c.name.split(' ')[0]} has been recorded in our current dataset.</p>
                  <p className={styles.noDataSub}>This does not mean none exist — the database is continuously expanding.</p>
                </div>
              )}
              {/* Feature 92 — Quran Memorization Registry */}
              {(() => {
                const memRecord = QURAN_MEM_REGISTRY.find(r => r.rank === c.rank);
                if (!memRecord) return null;
                return (
                  <div className={styles.memRecord}>
                    <h4 className={styles.memTitle}>📖 Quran Memorization & Teaching Record</h4>
                    <div className={styles.memDesig} style={{ borderLeftColor: color }}>
                      <strong>Prophet's ﷺ Designation:</strong> {memRecord.designation}
                    </div>
                    <p className={styles.memHadith}>{memRecord.hadiths}</p>
                    <span className={styles.memSource}>{memRecord.source}</span>
                    {memRecord.knownSurahs && (
                      <div className={styles.memSurahs}>
                        <strong>Known Surahs:</strong>
                        {memRecord.knownSurahs.map((s, i) => <span key={i} className={styles.memSurah}>{s}</span>)}
                      </div>
                    )}
                    {memRecord.specialNote && <p className={styles.memNote}>{memRecord.specialNote}</p>}
                  </div>
                );
              })()}
            </div>
          )}

          {tab === 'tafsir' && (() => {
            const tafsirEntries = getTafsirByCompanion(c.rank);
            const legScore = LEGACY_SCORES.find(ls => ls.rank === c.rank);
            return (
              <div className={styles.tafsirTab}>
                {/* Legacy Score (Feature 100) */}
                {legScore && (
                  <div className={styles.legacyScore} style={{ borderColor: legScore.color }}>
                    <div className={styles.lsHeader}>
                      <span className={styles.lsTitle}>Legacy Score</span>
                      <span className={styles.lsTotal} style={{ color: legScore.color }}>{legScore.total}<span className={styles.lsMax}>/1000</span></span>
                    </div>
                    <div className={styles.lsBars}>
                      {[
                        { label: 'Hadiths', val: legScore.hadithScore, max: 300 },
                        { label: 'Fiqh Impact', val: legScore.fiqhScore, max: 250 },
                        { label: 'Naming', val: legScore.namingScore, max: 200 },
                        { label: 'Reach', val: legScore.reachScore, max: 150 },
                        { label: 'Tafsir', val: legScore.tafsirScore, max: 100 },
                        { label: 'Sacrifice', val: legScore.sacrificeScore, max: 100 },
                      ].map(({ label, val, max }) => (
                        <div key={label} className={styles.lsBar}>
                          <span className={styles.lsBarLabel}>{label}</span>
                          <div className={styles.lsBarTrack}>
                            <div className={styles.lsBarFill} style={{ width: `${(val/max)*100}%`, background: legScore.color }} />
                          </div>
                          <span className={styles.lsBarVal}>{val}/{max}</span>
                        </div>
                      ))}
                    </div>
                    <p className={styles.lsBreakdown}>{legScore.breakdown}</p>
                  </div>
                )}
                {/* Tafsir entries (Feature 87) */}
                {tafsirEntries.length > 0 ? (
                  <>
                    <p className={styles.tafsirIntro}>
                      Quranic interpretations attributed to {c.name.split(' ')[0]} in Ibn Jarir al-Tabari's <em>Jami' al-Bayan</em> — the most authoritative classical tafsir.
                    </p>
                    {tafsirEntries.map((t, i) => (
                      <div key={i} className={styles.tafsirEntry} style={{ borderLeftColor: color }}>
                        <div className={styles.tafsirRef}>
                          <span className={styles.tafsirSurah} style={{ color }}>Surah {t.surahName} ({t.surah}:{t.ayah})</span>
                          {t.context && <span className={styles.tafsirContext}>{t.context}</span>}
                        </div>
                        <div className={`${styles.tafsirAyah} ar`}>{t.ayahText}</div>
                        <p className={styles.tafsirInterp}>{t.interpretation}</p>
                        {t.significance && (
                          <div className={styles.tafsirSig}>
                            <strong>Why this matters:</strong> {t.significance}
                          </div>
                        )}
                        <span className={styles.tafsirSource}>{t.source}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={styles.noDataBlock}>
                    <p className={styles.noDataAr}>لَيْسَ بَعْدُ</p>
                    <p>No tafsir contributions from {c.name.split(' ')[0]} have been digitized in our current dataset.</p>
                    <p className={styles.noDataSub}>Our tafsir archive currently covers: Ibn Abbas, Aisha, Ali, Umar, Abu Bakr, and Ibn Mas'ud. Expanding continuously.</p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ════════ FAMILY TAB (Feature 30) ════════════════════ */}
          {tab === 'family' && (
            <div className={styles.familyTab}>
              <p className={styles.familyIntro}>
                Family household of {c.name} — connections to other companions highlighted.
              </p>
              <FamilyTreeView rank={c.rank} color={color} />
              {!FAMILY_TREES[c.rank] && (
                <div className={styles.noDataBlock}>
                  <p>Family tree not yet available. Coming in next update.</p>
                </div>
              )}
            </div>
          )}

          {/* ════════ MIRACLES TAB (Feature 51) ═══════════════════ */}
          {tab === 'miracles' && (
            <div className={styles.miraclesTab}>
              <p className={styles.tabIntro}>
                Karamat (supernatural events) witnessed by or through {c.name.split(' ')[0]} —
                authenticated from classical hadith sources with full chain and scholar evaluation.
              </p>
              {karamat.length > 0 ? (
                karamat.map((k, i) => (
                  <div key={i} className={styles.karamaCard} style={{ borderLeftColor: color }}>
                    <div className={styles.karamaNum} style={{ background: color + '22', color }}>
                      Karama {i + 1}
                    </div>
                    <h4 className={styles.karamaTitle}>{k.title}</h4>
                    <p className={styles.karamaStory}>{k.story}</p>
                    {k.hadithAr && <p className={`${styles.karamaAr} ar`}>{k.hadithAr}</p>}
                    <blockquote className={styles.karamaEn}>"{k.hadithEn}"</blockquote>
                    {k.witnessedBy && (
                      <p className={styles.karamaMeta}>
                        <strong>Witnessed by:</strong> {k.witnessedBy}
                      </p>
                    )}
                    {k.location && (
                      <p className={styles.karamaMeta}>
                        <strong>Location:</strong> {k.location}
                      </p>
                    )}
                    <div className={styles.karamaFooter}>
                      <span className={styles.karamaAuth}>{k.authentication}</span>
                      <span className={styles.karamaSource}>{k.source}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا يُوجَدُ</p>
                  <p>No authenticated karamat have been recorded for {c.name.split(' ')[0]} in our current dataset.</p>
                  <p className={styles.noDataSub}>This does not mean none exist — our karamat database covers key figures and is continuously expanding.</p>
                </div>
              )}
            </div>
          )}

          {/* ════════ POETRY TAB (Feature 53) ════════════════════ */}
          {tab === 'poetry' && (
            <div className={styles.poetryTab}>
              <p className={styles.tabIntro}>
                Verses composed by {c.name.split(' ')[0]} — preserved in classical Arabic literary
                collections with historical context and meter analysis.
              </p>
              {poems.length > 0 ? (
                poems.map((poem, i) => (
                  <div key={i} className={styles.poemCard} style={{ borderColor: color + '44' }}>
                    <div className={styles.poemHeader}>
                      <h4 className={styles.poemTitle}>{poem.title}</h4>
                      {poem.meter && (
                        <span className={styles.poemMeter} style={{ color }}>
                          {poem.meter} meter
                        </span>
                      )}
                    </div>
                    <p className={styles.poemOccasion}>{poem.occasionEn}</p>
                    <div className={styles.poemVerses}>
                      <pre className={`${styles.poemAr} ar`}>{poem.versesAr}</pre>
                      <div className={styles.poemEn}>{poem.versesEn}</div>
                    </div>
                    <p className={styles.poemTheme}><strong>Theme:</strong> {poem.theme}</p>
                    <p className={styles.poemContext}>{poem.historicalContext}</p>
                    <span className={styles.poemSource}>{poem.source}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noDataBlock}>
                  <p className={styles.noDataAr}>لَا يُوجَدُ</p>
                  <p>No attributed poetry has been recorded for {c.name.split(' ')[0]} in our current dataset.</p>
                  <p className={styles.noDataSub}>Many companions composed poetry that has not survived in complete form. Our poetry archive is expanding.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer tools — Feature 84 & 86 */}
        <div style={{ display:'flex', gap:'10px', padding:'12px 20px', borderTop:'1px solid rgba(255,255,255,.06)' }}>
          <button
            style={{ flex:1, padding:'8px', borderRadius:6, border:`1px solid ${color}44`, background:color+'11', color:color, cursor:'pointer', fontSize:12 }}
            onClick={() => setShowDedication(true)}>
            ✦ Generate Dedication Card
          </button>
          <button
            style={{ flex:1, padding:'8px', borderRadius:6, border:'1px solid #666', background:'transparent', color:'#ccc', cursor:'pointer', fontSize:12 }}
            onClick={() => setShowVoice(true)}>
            💬 Companion Voice
          </button>
        </div>
        {showDedication && <DedicationGenerator companionRank={c.rank} onClose={() => setShowDedication(false)} />}
        {showVoice && <CompanionVoice companionRank={c.rank} onClose={() => setShowVoice(false)} />}
      </div>
    </div>
  );
}
