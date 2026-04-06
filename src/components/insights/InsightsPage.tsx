// @ts-nocheck
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import {
  TEN_PARADISE, FACTS, MARTYRS, CQ_EVENTS, BURIAL_COORDS, WAVE_DEFS,
  CONV_WAVE_MAP, ROLE_DEFS, KEY_BATTLES, BATTLE_SHORT, BATTLE_YEAR,
} from '../../data/insights';
import {
  AGE_CONVERSIONS, HIST_EVENTS, EVENT_PRESENCE, ORIGIN_GROUP, ORIGIN_META,
  CALIPHATE_DATA, FIQH_ARCHIVE, IJMA_TOPICS, IKHTILAF_TOPICS, NAME_CHANGES,
  HADITH_PROFILES, KUTUB_SITTA_LIST, QURAN_COMPANION_REFS,
  DEATH_MAP_POINTS, DEATH_CAUSE_COLORS, QUIZ_QUESTIONS as ADAPTIVE_QUIZ_QUESTIONS, SITUATION_GUIDES,
} from '../../data/insightsExtra';
import {
  PROPHETIC_LETTERS, HAJJ_RECORDS, AKHIRA_QUOTES,
} from '../../data/insightsExtra2';
import {
  HADITH_WORD_CLOUDS, WORD_THEME_COLORS,
  HEATMAP_BATTLES, HEATMAP_CATS, HEATMAP_VALUES, HEATMAP_NOTES,
  REVELATION_EVENTS,
  CALIPH_TERRITORIES,
  STATUS_ERAS, STATUS_ARCS,
  IBADAH_DATA,
  GENEROSITY_DATA,
  KHUTBA_ARCHIVE,
} from '../../data/insightsExtra3';
import {
  QUIZ_ARCHETYPES, QUIZ_QUESTIONS,
  DILEMMA_SCENARIOS,
  SIM_BATTLES,
  RECONSTRUCTION_EVENTS,
} from '../../data/insightsExtra4';
import { useLanguage } from '../../context/LanguageContext';
import styles from './InsightsPage.module.css';

type Section =
  | 'ten' | 'hadith' | 'battles' | 'expansion' | 'burials' | 'lifespans'
  | 'death' | 'records' | 'martyrs' | 'conversion' | 'ages' | 'origins'
  | 'impact' | 'roles'
  // ?? PREVIOUS NEW ??
  | 'ageconv' | 'presence' | 'longevity' | 'originbreak' | 'caliphates'
  | 'fiqh' | 'quiz' | 'names' | 'guide'
  // ?? LATEST NEW ??
  | 'letters' | 'hajj' | 'wisdom'
  // ?? FEATURES 65-76 ??
  | 'wordcloud' | 'heatmap' | 'revelation' | 'caliphterr'
  | 'statusarc' | 'ibadah' | 'generosity' | 'speeches'
  // ?? FEATURES 77-86 ??
  | 'discover' | 'decisions' | 'simulator' | 'reconstruction';

const NAV_ITEMS: { id: Section; icon: string; labelEn: string; labelUr: string }[] = [
  { id:'ten',         icon:'', labelEn:'Ten Promised Paradise',        labelUr:'عشرہ مبشرہ' },
  { id:'hadith',      icon:'', labelEn:'Hadith Legacy',                labelUr:'حدیثی وراثت' },
  { id:'battles',     icon:'', labelEn:'Battle Matrix',                labelUr:'غزوات میٹرکس' },
  { id:'expansion',   icon:'', labelEn:'Islamic Expansion',            labelUr:'اسلامی توسیع' },
  { id:'burials',     icon:'', labelEn:'Burial Geography',             labelUr:'مدافن کا جغرافیہ' },
  { id:'lifespans',   icon:'', labelEn:'Lifespans',                    labelUr:'اَعمار' },
  { id:'death',       icon:'', labelEn:'How They Died',                labelUr:'وفات کی نوعیت' },
  { id:'records',     icon:'', labelEn:'Records & Firsts',             labelUr:'ریکارڈز اور اولینات' },
  { id:'martyrs',     icon:'', labelEn:'Martyrs',                      labelUr:'شہداء' },
  { id:'conversion',  icon:'', labelEn:'Conversion Waves',             labelUr:'قبولِ اسلام کی لہریں' },
  { id:'ages',        icon:'', labelEn:'Age at Death',                 labelUr:'وفات کے وقت عمر' },
  { id:'origins',     icon:'', labelEn:'Geographic Origins',           labelUr:'جغرافیائی اصل' },
  { id:'impact',      icon:'', labelEn:'Record Holders',               labelUr:'ریکارڈ رکھنے والے' },
  { id:'roles',       icon:'', labelEn:'By Role',                      labelUr:'کردار کے لحاظ سے' },
  // ?? 9 NEW NAV ITEMS ??
  { id:'ageconv',     icon:'', labelEn:'Age at Conversion',           labelUr:'قبولِ اسلام کے وقت عمر' },
  { id:'presence',    icon:'', labelEn:'Event Presence Matrix',       labelUr:'واقعاتی موجودگی' },
  { id:'longevity',   icon:'', labelEn:'Longevity & Survival',        labelUr:'طویل عمری و بقا' },
  { id:'originbreak', icon:'', labelEn:'Ansari vs. Muhajir',          labelUr:'انصاری بمقابلہ مہاجر' },
  { id:'caliphates',  icon:'', labelEn:'Four Caliphates',             labelUr:'چار خلافتیں' },
  { id:'fiqh',        icon:'', labelEn:'Fiqh Archive',                labelUr:'فقہی ذخیرہ' },
  { id:'quiz',        icon:'', labelEn:'Adaptive Quiz',               labelUr:'انطباقی کوئز' },
  { id:'names',       icon:'', labelEn:'Name Changes',                labelUr:'ناموں میں تبدیلی' },
  { id:'guide',       icon:'', labelEn:'Hadith Guide',                labelUr:'حدیث رہنمائی' },
  // ?? LATEST 3 NEW ??
  { id:'letters',     icon:'', labelEn:'Prophetic Letters',           labelUr:'مکتوباتِ نبوی' },
  { id:'hajj',        icon:'', labelEn:'Hajj Records',                labelUr:'حج ریکارڈز' },
  { id:'wisdom',      icon:'', labelEn:'Wisdom on Death',             labelUr:'وفات پر حکمت' },
  // ?? FEATURES 65-76 ??
  { id:'wordcloud',   icon:'', labelEn:'Hadith Word Cloud',           labelUr:'حدیث ورڈ کلاؤڈ' },
  { id:'heatmap',     icon:'', labelEn:'Battle Casualty Heatmap',     labelUr:'معرکوں کا شہادت ہیٹ میپ' },
  { id:'revelation',  icon:'', labelEn:'Revelation Timeline',         labelUr:'نزولِ وحی ٹائم لائن' },
  { id:'caliphterr',  icon:'', labelEn:'Caliph Territories',          labelUr:'خلفائے راشدین کی حدود' },
  { id:'statusarc',   icon:'', labelEn:'Companion Status Arcs',       labelUr:'صحابہ اثر و مرتبہ گراف' },
  { id:'ibadah',      icon:'', labelEn:'Ibadah Intensity',            labelUr:'عبادت کی شدت' },
  { id:'generosity',  icon:'', labelEn:'Generosity Leaderboard',      labelUr:'سخاوت لیڈر بورڈ' },
  { id:'speeches',    icon:'', labelEn:'Famous Khutbas',              labelUr:'مشہور خطبات' },
  // ?? FEATURES 77-86 ??
  { id:'discover',      icon:'', labelEn:'Which Companion Are You?',  labelUr:'آپ کس صحابی جیسے ہیں؟' },
  { id:'decisions',     icon:'', labelEn:'Companion Dilemmas',        labelUr:'صحابہ کے مشکل فیصلے' },
  { id:'simulator',     icon:'', labelEn:'Battle Role Simulator',     labelUr:'معرکہ کردار سیمولیٹر' },
  { id:'reconstruction',icon:'', labelEn:'Day-by-Day Events',         labelUr:'دن بہ دن واقعات' },
];

// ??? Helpers ????????????????????????????????????????????
function parseBorn(s: string): number {
  if (!s) return NaN;
  const m = s.match(/(-?\d+)/);
  return m ? parseInt(m[1]) : NaN;
}
function llToSvg(lat: number, lng: number, W: number, H: number) {
  return { x: ((lng - 25) / 35) * W, y: ((45 - lat) / 35) * H };
}
function cqToXY(lat: number, lng: number, W = 900, H = 340) {
  return {
    x: Math.max(0, Math.min(W, ((lng - 20) / 60) * W)),
    y: Math.max(0, Math.min(H, ((52 - lat) / 47) * H)),
  };
}

// ??? Main Page ???????????????????????????????????????????
export default function InsightsPage() {
  const { lang } = useLanguage();
  const L = (en: string, ur: string) => (lang === 'ur' ? ur : en);
  const [active, setActive] = useState<Section>('ten');
  const [navQuery, setNavQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    core: true,
    people: true,
    scholarship: true,
    tools: true,
    simulations: true,
  });

  const NAV_BY_ID = useMemo(() => {
    const map = new Map<Section, (typeof NAV_ITEMS)[number]>();
    NAV_ITEMS.forEach(n => map.set(n.id, n as any));
    return map;
  }, []);

  const GROUPS: { id: string; title: string; items: Section[] }[] = useMemo(() => ([
    { id: 'core', title: 'Core', items: ['ten','hadith','battles','expansion','burials','lifespans'] },
    { id: 'people', title: 'People & Society', items: ['conversion','ages','ageconv','origins','originbreak','presence','longevity','death','martyrs','records','impact','roles','names'] },
    { id: 'scholarship', title: 'Scholarship', items: ['fiqh','guide','letters','hajj','wisdom','speeches'] },
    { id: 'tools', title: 'Visual Tools', items: ['wordcloud','heatmap','revelation','caliphterr','statusarc','ibadah','generosity'] },
    { id: 'simulations', title: 'Interactive', items: ['discover','decisions','simulator','reconstruction','quiz','caliphates'] },
  ]), []);

  const q = navQuery.trim().toLowerCase();
  const filteredGroups = useMemo(() => {
    if (!q) return GROUPS;
    return GROUPS.map(g => ({
      ...g,
      items: g.items.filter(id => {
        const n = NAV_BY_ID.get(id);
        if (!n) return false;
        const base = (n as any).labelEn ?? (n as any).label ?? '';
        return base.toLowerCase().includes(q);
      }),
    })).filter(g => g.items.length > 0);
  }, [q, GROUPS, NAV_BY_ID]);

  const activeGroupId = useMemo(() => {
    const g = GROUPS.find(gr => gr.items.includes(active));
    return g?.id ?? 'core';
  }, [GROUPS, active]);

  // When not searching, keep UI simple: only active group is expanded.
  useEffect(() => {
    if (q) return;
    setOpenGroups(prev => ({ ...prev, [activeGroupId]: true }));
  }, [activeGroupId, q]);

  return (
    <div className={`${styles.page} premium-page`}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHead}>
            {L('Explore', 'تلاش و مطالعہ')}
          </div>
          <div className={styles.navSearchWrap}>
            <input
              className={styles.navSearch}
              value={navQuery}
              onChange={e => setNavQuery(e.target.value)}
              placeholder={L('Find section?', 'سیکشن تلاش کریں')}
              aria-label={L('Find section', 'سیکشن تلاش کریں')}
            />
            {navQuery && (
              <button
                className={styles.navClear}
                onClick={() => setNavQuery('')}
                aria-label={L('Clear search', 'تلاش صاف کریں')}
              >
                �
              </button>
            )}
          </div>

          <div className={styles.navGroups}>
            {filteredGroups.map(g => {
              const isOpen = q ? true : (g.id === activeGroupId ? true : !!openGroups[g.id]);
              return (
                <div key={g.id} className={styles.navGroup}>
                  <button
                    className={styles.navGroupHead}
                    onClick={() => setOpenGroups(prev => ({ ...prev, [g.id]: !prev[g.id] }))}
                    type="button"
                    disabled={!!q}
                    title={q ? L('Clear search to collapse groups', 'گروپس سکیڑنے کے لیے تلاش صاف کریں') : undefined}
                    aria-expanded={isOpen}
                  >
                    <span className={`${styles.navGroupChevron} ${isOpen ? styles.navGroupChevronOpen : ''}`} aria-hidden="true" />
                    <span className={styles.navGroupTitle}>
                      {lang === 'ur'
                        ? (g.id === 'core' ? 'بنیادی'
                          : g.id === 'people' ? 'افراد و معاشرہ'
                          : g.id === 'scholarship' ? 'علم و تحقیق'
                          : g.id === 'tools' ? 'بصری اوزار'
                          : g.id === 'simulations' ? 'انٹرایکٹو'
                          : g.title)
                        : g.title}
                    </span>
                    <span className={styles.navGroupCount}>{g.items.length}</span>
                  </button>
                  {isOpen && (
                    <div className={styles.navGroupItems}>
                      {g.items.map(id => {
                        const n = NAV_BY_ID.get(id);
                        if (!n) return null;
                        return (
                          <button
                            key={n.id}
                            className={`${styles.navItem} ${active === n.id ? styles.navActive : ''}`}
                            onClick={() => { setActive(n.id); setOpenGroups(prev => ({ ...prev, [g.id]: true })); }}
                            type="button"
                          >
                            {L(n.labelEn, n.labelUr)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
        <div className={styles.main}>
          {active === 'ten'         && <TenParadise />}
          {active === 'hadith'      && <HadithLegacy />}
          {active === 'battles'     && <BattleMatrix />}
          {active === 'expansion'   && <ExpansionMap />}
          {active === 'burials'     && <BurialMap />}
          {active === 'lifespans'   && <LifeSpans />}
          {active === 'death'       && <HowTheyDied />}
          {active === 'records'     && <RecordFirsts />}
          {active === 'martyrs'     && <MartyrsSection />}
          {active === 'conversion'  && <ConversionWaves />}
          {active === 'ages'        && <AgeAtDeath />}
          {active === 'origins'     && <GeoOrigins />}
          {active === 'impact'      && <RecordHolders />}
          {active === 'roles'       && <ByRole />}
          {active === 'ageconv'     && <AgeAtConversion />}
          {active === 'presence'    && <EventPresenceMatrix />}
          {active === 'longevity'   && <LongevityChart />}
          {active === 'originbreak' && <OriginBreakdown />}
          {active === 'caliphates'  && <CaliphatesTimeline />}
          {active === 'fiqh'        && <FiqhArchiveSection />}
          {active === 'quiz'        && <AdaptiveQuiz />}
          {active === 'names'       && <NameChangesSection />}
          {active === 'guide'       && <HadithGuide />}
          {active === 'letters'     && <PropheticLettersSection />}
          {active === 'hajj'        && <HajjRecordsSection />}
          {active === 'wisdom'      && <WisdomOnDeathSection />}
          {active === 'wordcloud'      && <HadithWordCloud />}
          {active === 'heatmap'        && <BattleCasualtyHeatmap />}
          {active === 'revelation'     && <RevelationTimeline />}
          {active === 'caliphterr'     && <CaliphTerritories />}
          {active === 'statusarc'      && <CompanionStatusArcs />}
          {active === 'ibadah'         && <IbadahIntensity />}
          {active === 'generosity'     && <GenerosityLeaderboard />}
          {active === 'speeches'       && <KhutbaArchive />}
          {active === 'discover'       && <PersonalityQuiz />}
          {active === 'decisions'      && <DilemmaSimulator />}
          {active === 'simulator'      && <BattleSimulator />}
          {active === 'reconstruction' && <DayByDayReconstruction />}
        </div>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? TEN PROMISED PARADISE  (+ Quran Reference Map ? Feature 34)
// ???????????????????????????????????????????????????????
function TenParadise() {
  const [showQuranRefs, setShowQuranRefs] = useState(false);
  return (
    <div>
      <div className={styles.sectionTitle}>Al-'Asharah al-Mubashsharah - Ten Promised Paradise</div>
      <div className={styles.intro}>
        The Prophet explicitly named ten companions who would enter Paradise.
        Hadith source: Sunan Abi Dawud, Sunan al-Tirmidhi.
      </div>
      <div className={styles.tenSubBar}>
        <button
          className={`${styles.tenSubBtn} ${!showQuranRefs ? styles.tenSubActive : ''}`}
          onClick={() => setShowQuranRefs(false)}
        >Cards</button>
        <button
          className={`${styles.tenSubBtn} ${showQuranRefs ? styles.tenSubActive : ''}`}
          onClick={() => setShowQuranRefs(true)}
        >Quran References</button>
      </div>
      {!showQuranRefs ? (
        <div className={styles.tenGrid}>
          {TEN_PARADISE.map((p, i) => (
            <div key={p.rank} className={styles.tenCard} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={styles.tenRank} style={{ background: p.color }}>{i + 1}</div>
              <span className={styles.tenIcon}>{p.icon}</span>
              <div className={styles.tenInfo}>
                <div className={styles.tenName}>{p.name}</div>
                <div className={styles.tenAr}>{p.ar}</div>
                <div className={styles.tenTitle} style={{ color: p.color }}>{p.title}</div>
                <div className={styles.tenDistinction}>{p.distinction}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.quranRefList}>
          <div className={styles.quranRefIntro}>
            Ayahs of the Quran that reference ? by name, by context, or by direct revelation ? companions among the Ten.
          </div>
          {QURAN_COMPANION_REFS.map((ref, i) => {
            const tp = TEN_PARADISE.find(t => t.rank === ref.companionRank);
            return (
              <div key={i} className={styles.quranRefCard}>
                <div className={styles.quranRefTop}>
                  <span className={styles.quranRefAyah}>{ref.ayahRef}</span>
                  {tp && <span className={styles.quranRefName} style={{ color: tp.color }}>{tp.name}</span>}
                </div>
                <div className={styles.quranRefAr}>{ref.ayahAr}</div>
                <div className={styles.quranRefEn}>{ref.ayahEn}</div>
                <div className={styles.quranRefCtx}>{ref.context}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? HADITH LEGACY  (+ Grades ? Feature 26 + Kutub Sitta ? Feature 14)
// ???????????????????????????????????????????????????????
function HadithLegacy() {
  const [view, setView] = useState<'bars' | 'grades' | 'kutub'>('bars');
  const topN = COMPANIONS.filter(c => c.hadiths > 0).sort((a, b) => b.hadiths - a.hadiths).slice(0, 10);
  const maxH = topN[0]?.hadiths || 1;
  const total = COMPANIONS.reduce((s, d) => s + (d.hadiths || 0), 0);

  return (
    <div>
      <div className={styles.sectionTitle}>Hadith Legacy - Living Voices of the Prophet</div>
      <div className={styles.infoBanner}>
        Combined total across all 103 companions:{' '}
        <strong className={styles.em}>{total.toLocaleString()}</strong> hadiths.
      </div>
      <div className={styles.hadithSubBar}>
        <button className={`${styles.hadSubBtn} ${view==='bars'?styles.hadSubActive:''}`} onClick={()=>setView('bars')}>Top Narrators</button>
        <button className={`${styles.hadSubBtn} ${view==='grades'?styles.hadSubActive:''}`} onClick={()=>setView('grades')}>Grade Breakdown</button>
        <button className={`${styles.hadSubBtn} ${view==='kutub'?styles.hadSubActive:''}`} onClick={()=>setView('kutub')}>Kutub al-Sitta</button>
      </div>

      {view === 'bars' && (
        <div className={styles.hadithBars}>
          {topN.map((d, i) => (
            <div key={d.rank} className={styles.hRow}>
              <div className={styles.hName}>#{i + 1} {d.name}</div>
              <div className={styles.hBarWrap}>
                <div className={styles.hBar} style={{ width: `${Math.round(d.hadiths / maxH * 100)}%`, background: CAT_COLORS[d.cat] }} />
              </div>
              <div className={styles.hVal}>{d.hadiths.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {view === 'grades' && (
        <div className={styles.gradesWrap}>
          <div className={styles.gradesLegend}>
            <span className={styles.gradeDot} style={{background:'#0a3d2e'}} />Sahih
            <span className={styles.gradeDot} style={{background:'#b8860b',marginLeft:12}} />Hasan
            <span className={styles.gradeDot} style={{background:'#8b1a38',marginLeft:12}} />Da'if
          </div>
          {HADITH_PROFILES.map(hp => {
            const c = COMPANIONS.find(x => x.rank === hp.companionRank);
            if (!c) return null;
            const tot = hp.sahih + hp.hasan + hp.daif;
            return (
              <div key={hp.companionRank} className={styles.gradeRow}>
                <div className={styles.gradeNm}>{c.name}</div>
                <div className={styles.gradeBar}>
                  <div style={{width:`${(hp.sahih/tot*100).toFixed(1)}%`,background:'#0a3d2e'}} title={`Sahih: ${hp.sahih}`} />
                  <div style={{width:`${(hp.hasan/tot*100).toFixed(1)}%`,background:'#b8860b'}} title={`Hasan: ${hp.hasan}`} />
                  <div style={{width:`${(hp.daif/tot*100).toFixed(1)}%`,background:'#8b1a38'}} title={`Da'if: ${hp.daif}`} />
                </div>
                <div className={styles.gradeTots}>
                  <span style={{color:'#0a3d2e'}}>{hp.sahih.toLocaleString()}</span>
                  <span style={{color:'#b8860b'}}>{hp.hasan.toLocaleString()}</span>
                  <span style={{color:'#8b1a38'}}>{hp.daif.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
          <div className={styles.gradesNote}>Approximate grade distributions based on hadith science classifications.</div>
        </div>
      )}

      {view === 'kutub' && (
        <div className={styles.kutubWrap}>
          <div className={styles.kutubHeader}>
            <div className={styles.kutubNameCol} />
            {KUTUB_SITTA_LIST.map(book => (
              <div key={book} className={styles.kutubBookCol}>{book.replace('Sahih ','').replace('Sunan ','').replace("Jami' al-",'').replace('Sunan Ibn ','Ibn ')}</div>
            ))}
          </div>
          {HADITH_PROFILES.map(hp => {
            const c = COMPANIONS.find(x => x.rank === hp.companionRank);
            if (!c) return null;
            return (
              <div key={hp.companionRank} className={styles.kutubRow}>
                <div className={styles.kutubNm}>{c.name}</div>
                {KUTUB_SITTA_LIST.map(book => (
                  <div key={book} className={styles.kutubCell}>
                    {hp.books.includes(book)
                      ? <span className={styles.kutubCheck}>Y</span>
                      : <span className={styles.kutubMiss}>N</span>}
                  </div>
                ))}
              </div>
            );
          })}
          <div className={styles.kutubNote}>All eight narrators above appear in all six canonical collections.</div>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? BATTLE MATRIX
// ???????????????????????????????????????????????????????
function BattleMatrix() {
  const fighters = COMPANIONS.filter(c => c.battles && c.battles.length > 0)
    .sort((a, b) => b.battles.length - a.battles.length).slice(0, 20);
  return (
    <div>
      <div className={styles.sectionTitle}>Battle Participation Matrix - Who Fought Where</div>
      <div className={styles.infoBanner}>Top 20 most active companions across 10 key battles. Darker fill = participated.</div>
      <div className={styles.tableWrap}>
        <table className={styles.battleTable}>
          <thead>
            <tr>
              <th className={styles.btlNameH}>Companion</th>
              {KEY_BATTLES.map(b => (
                <th key={b} className={styles.btlColH}>
                  <div className={styles.btlHeaderWrap}>
                    <span>{BATTLE_SHORT[b]}</span>
                    <span className={styles.btlYear}>{BATTLE_YEAR[b]}</span>
                  </div>
                </th>
              ))}
              <th className={styles.btlTotalH}>Total</th>
            </tr>
          </thead>
          <tbody>
            {fighters.map(d => {
              const col = CAT_COLORS[d.cat] || '#777';
              return (
                <tr key={d.rank}>
                  <td className={styles.btlName} style={{ borderLeft: `3px solid ${col}` }}>
                    <span className={styles.btlRankMini}>#{d.rank}</span> {d.name}
                  </td>
                  {KEY_BATTLES.map(b => {
                    const yes = (d.battles || []).some(x =>
                      x === b || x.includes(b.replace('Battle of ', '')) || b.includes(x));
                    return (
                      <td key={b} className={yes ? styles.btlYes : styles.btlNo}>
                        {yes && <span className={styles.btlDot} />}
                      </td>
                    );
                  })}
                  <td className={styles.btlTotal} style={{ color: col }}>{d.battles.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? ISLAMIC EXPANSION MAP  (+ Deaths Overlay ? Feature 03)
// ???????????????????????????????????????????????????????
function ExpansionMap() {
  const svgRef = useRef(null);
  const [year, setYear] = useState(622);
  const [playing, setPlaying] = useState(false);
  const [showDeaths, setShowDeaths] = useState(false);
  const timerRef = useRef(null);
  const W = 900, H = 340;

  const buildBg = useCallback(() => {
    if (!svgRef.current) return;
    const regions = [
      { label:'ARABIA', x:480, y:240, op:.12 }, { label:'IRAQ', x:620, y:185, op:.1 },
      { label:'SYRIA / LEVANT', x:540, y:125, op:.1 }, { label:'PERSIA', x:730, y:155, op:.08 },
      { label:'EGYPT', x:330, y:195, op:.1 }, { label:'PALESTINE', x:487, y:158, op:.1 },
      { label:'ANATOLIA', x:505, y:70, op:.08 }, { label:'NORTH AFRICA', x:200, y:165, op:.08 },
    ];
    let bg = `<rect width="${W}" height="${H}" fill="rgba(10,15,8,.6)"/>`;
    for (let lg = 20; lg <= 80; lg += 10) {
      const x = ((lg - 20) / 60) * W;
      bg += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(184,134,11,.05)" stroke-width=".5"/>`;
    }
    for (let lt = 10; lt <= 50; lt += 10) {
      const y = ((52 - lt) / 47) * H;
      bg += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(184,134,11,.05)" stroke-width=".5"/>`;
    }
    bg += regions.map(r =>
      `<text x="${r.x}" y="${r.y}" font-family="Cinzel,serif" font-size="9" fill="rgba(184,134,11,${r.op})" text-anchor="middle" letter-spacing=".12em">${r.label}</text>`
    ).join('');
    svgRef.current.innerHTML = bg;
  }, []);

  const render = useCallback((yr, deaths) => {
    if (!svgRef.current) return;
    buildBg();
    const visible = CQ_EVENTS.filter(e => e.year <= yr);
    let layer = '';
    visible.forEach(ev => {
      const { x, y } = cqToXY(ev.lat, ev.lng, W, H);
      const age = yr - ev.year;
      const op = Math.max(0.25, 1 - age / 80);
      const fill = ev.color + Math.round(op * 80).toString(16).padStart(2, '0');
      layer += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ev.r}" fill="${fill}" stroke="${ev.color}" stroke-width="1" stroke-opacity="${(op * 0.6).toFixed(2)}"><title>${ev.year} CE - ${ev.label}\n${ev.note}</title></circle>`;
      layer += `<text x="${x.toFixed(1)}" y="${(y + ev.r + 11).toFixed(1)}" font-family="Cinzel,serif" font-size="8" fill="${ev.color}" text-anchor="middle" opacity="${op.toFixed(2)}">${ev.label}</text>`;
    });
    if (deaths) {
      DEATH_MAP_POINTS.filter(d => d.year <= yr).forEach(d => {
        const { x, y } = cqToXY(d.lat, d.lng, W, H);
        const col = DEATH_CAUSE_COLORS[d.cause];
        layer += `<circle cx="${(x+4).toFixed(1)}" cy="${(y-4).toFixed(1)}" r="6" fill="${col}" stroke="rgba(255,253,240,.6)" stroke-width="1.5" opacity=".9"><title>${d.name}\n${d.cause.toUpperCase()} - ${d.year} CE\n${d.note}</title></circle>`;
        layer += `<text x="${(x+4).toFixed(1)}" y="${(y-4+2.5).toFixed(1)}" font-family="serif" font-size="7" fill="rgba(255,253,240,.9)" text-anchor="middle">*</text>`;
      });
    }
    svgRef.current.innerHTML += layer;
  }, [buildBg]);

  useEffect(() => { render(year, showDeaths); }, [year, showDeaths, render]);

  const toggle = () => {
    if (playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPlaying(false);
    } else {
      setPlaying(true);
      let y = year >= 692 ? 622 : year;
      timerRef.current = setInterval(() => {
        y++;
        setYear(y);
        if (y >= 692) { if (timerRef.current) clearInterval(timerRef.current); setPlaying(false); }
      }, 120);
    }
  };
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);
  const lastEv = CQ_EVENTS.filter(e => e.year <= year).slice(-1)[0];

  return (
    <div>
      <div className={styles.sectionTitle}>Islamic Expansion - 622-692 CE</div>
      <div className={styles.cqWrap}>
        <div className={styles.cqControls}>
          <span className={styles.cqYearLabel}>{year} CE</span>
          <input type="range" min={622} max={692} value={year} className={styles.cqSlider} onChange={e => setYear(parseInt(e.target.value))} />
          <button className={styles.cqPlay} onClick={toggle}>{playing ? 'Pause' : 'Animate'}</button>
          <label className={styles.deathToggle}>
            <input type="checkbox" checked={showDeaths} onChange={e => setShowDeaths(e.target.checked)} />
            <span>Deaths Overlay</span>
          </label>
        </div>
        {showDeaths && (
          <div className={styles.deathLegBar}>
            {Object.entries(DEATH_CAUSE_COLORS).map(([k,c]) => (
              <span key={k} className={styles.deathLegBit}><span style={{background:c,width:10,height:10,borderRadius:'50%',display:'inline-block',marginRight:4}} />{k}</span>
            ))}
          </div>
        )}
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className={styles.cqSvg} />
        {lastEv && (
          <div className={styles.cqLegend}>
            <span style={{ color: lastEv.color, fontWeight: 700 }}>{lastEv.year} CE - {lastEv.label}</span>
            <span className={styles.cqNote}>{lastEv.note}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? BURIAL MAP
// ???????????????????????????????????????????????????????
function BurialMap() {
  const svgRef = useRef(null);
  const W = 900, H = 420;

  useEffect(() => {
    if (!svgRef.current) return;
    const locCounts = {}; const locCoords = {};
    COMPANIONS.forEach(d => {
      const coord = BURIAL_COORDS[d.burial || ''];
      if (!coord) return;
      locCounts[coord.label] = (locCounts[coord.label] || 0) + 1;
      locCoords[coord.label] = coord;
    });
    const unknown = COMPANIONS.filter(d => !BURIAL_COORDS[d.burial || '']).length;
    const maxCount = Math.max(...Object.values(locCounts));
    let o = `<text x="10" y="20" font-family="Cinzel,serif" font-size="10" fill="rgba(120,80,20,.5)" letter-spacing=".08em">BURIAL LOCATIONS OF 103 COMPANIONS - Approximate Geography</text>`;
    for (let lng = 25; lng <= 60; lng += 5) {
      const x = ((lng - 25) / 35) * W;
      o += `<line x1="${x}" y1="25" x2="${x}" y2="${H - 10}" stroke="rgba(120,80,20,.08)" stroke-width=".5"/>`;
      if (lng % 10 === 0) o += `<text x="${x}" y="${H - 2}" font-family="Cinzel,serif" font-size="8" fill="rgba(120,80,20,.35)" text-anchor="middle">${lng}E</text>`;
    }
    for (let lat = 10; lat <= 45; lat += 5) {
      const y = ((45 - lat) / 35) * H;
      o += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(120,80,20,.08)" stroke-width=".5"/>`;
      if (lat % 10 === 0) o += `<text x="3" y="${y + 3}" font-family="Cinzel,serif" font-size="8" fill="rgba(120,80,20,.35)">${lat}N</text>`;
    }
    [
      { label:'ARABIAN PENINSULA', x:420, y:260 }, { label:'IRAQ', x:600, y:185 },
      { label:'SYRIA', x:520, y:130 }, { label:'PERSIA', x:720, y:160 },
      { label:'EGYPT', x:320, y:200 }, { label:'PALESTINE', x:470, y:160 },
      { label:'TURKEY', x:490, y:60 }, { label:'CYPRUS', x:470, y:100 },
    ].forEach(r => {
      o += `<text x="${r.x}" y="${r.y}" font-family="Cinzel,serif" font-size="9" fill="rgba(120,80,20,.18)" text-anchor="middle" letter-spacing=".1em">${r.label}</text>`;
    });
    Object.entries(locCounts).forEach(([label, cnt]) => {
      const coord = locCoords[label];
      const { x, y } = llToSvg(coord.lat, coord.lng, W, H - 30);
      const r = Math.max(6, Math.min(28, 6 + (cnt as number) * 2.8));
      const op = (0.7 + (cnt as number) / maxCount * 0.3).toFixed(2);
      o += `<circle cx="${x.toFixed(1)}" cy="${(y + 25).toFixed(1)}" r="${r}" fill="rgba(184,134,11,${op})" stroke="rgba(120,80,20,.4)" stroke-width="1.5"><title>${label}: ${cnt} companion${(cnt as number) > 1 ? 's' : ''}</title></circle>`;
      o += `<text x="${x.toFixed(1)}" y="${(y + 25 + r * 0.35).toFixed(1)}" font-family="Cinzel Decorative,serif" font-size="${Math.max(7, Math.min(11, 7 + (cnt as number) * .4)).toFixed(0)}" fill="rgba(10,61,46,.85)" text-anchor="middle" font-weight="700">${cnt}</text>`;
      o += `<text x="${x.toFixed(1)}" y="${(y + 25 + r + 10).toFixed(1)}" font-family="Cinzel,serif" font-size="7" fill="rgba(92,61,30,.8)" text-anchor="middle">${label}</text>`;
    });
    if (unknown > 0) {
      o += `<text x="10" y="${H - 14}" font-family="Cinzel,serif" font-size="8" fill="rgba(120,80,20,.4)">${unknown} companions: location uncertain</text>`;
    }
    svgRef.current.innerHTML = o;
  }, []);

  const topSites = Object.entries(
    COMPANIONS.reduce((acc, d) => {
      const coord = BURIAL_COORDS[d.burial || ''];
      if (coord) acc[coord.label] = (acc[coord.label] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div>
      <div className={styles.sectionTitle}>Where They Rest - Burial Geography</div>
      <div className={styles.mapLegend}>
        <div className={styles.mapLegTitle}>Top burial sites</div>
        {topSites.map(([l, c]) => (
          <div key={l} className={styles.mapLegItem}>
            <span className={styles.mapLegDot} style={{ width: Math.max(8, (c as number) * 2.5), height: Math.max(8, (c as number) * 2.5) }} />
            <span>{l}</span><b>{c}</b>
          </div>
        ))}
      </div>
      <div className={styles.mapContainer}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className={styles.burialSvg} />
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? LIFESPANS
// ???????????????????????????????????????????????????????
function LifeSpans() {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current) return;
    const W = 1000, H = 380, PAD = { l: 65, r: 20, t: 30, b: 40 };
    const IW = W - PAD.l - PAD.r, IH = H - PAD.t - PAD.b;
    const companions = COMPANIONS.filter(d => d.born && d.death && !isNaN(parseBorn(d.born)) && !isNaN(parseInt(d.death)));
    if (!companions.length) return;
    const allBorn = companions.map(d => parseBorn(d.born));
    const allDied = companions.map(d => parseInt(d.death));
    const minY = Math.min(...allBorn) - 20, maxY = Math.max(...allDied) + 20;
    const toX = (y) => PAD.l + (y - minY) / (maxY - minY) * IW;
    let o = `<line x1="${PAD.l}" y1="${PAD.t + IH}" x2="${PAD.l + IW}" y2="${PAD.t + IH}" stroke="rgba(120,80,20,.25)" stroke-width="1"/>`;
    for (let yr = Math.ceil(minY / 50) * 50; yr <= maxY; yr += 50) {
      const x = toX(yr);
      o += `<line x1="${x.toFixed(0)}" y1="${PAD.t}" x2="${x.toFixed(0)}" y2="${PAD.t + IH}" stroke="rgba(120,80,20,.07)" stroke-width="1"/>`;
      o += `<text x="${x.toFixed(0)}" y="${PAD.t + IH + 14}" font-family="Cinzel,serif" font-size="9" fill="rgba(120,80,20,.5)" text-anchor="middle">${yr > 0 ? yr + 'CE' : Math.abs(yr) + 'BH'}</text>`;
    }
    const propX1 = toX(570), propX2 = toX(632);
    o += `<rect x="${propX1.toFixed(0)}" y="${PAD.t}" width="${(propX2 - propX1).toFixed(0)}" height="${IH}" fill="rgba(184,134,11,.06)"/>`;
    o += `<text x="${((propX1 + propX2) / 2).toFixed(0)}" y="${PAD.t + IH - 4}" font-family="Cinzel,serif" font-size="8" fill="rgba(184,134,11,.4)" text-anchor="middle">Prophetic Era</text>`;
    const sorted = [...companions].sort((a, b) => parseBorn(a.born) - parseBorn(b.born));
    const barH = Math.max(3, Math.min(8, IH / sorted.length));
    sorted.forEach((d, i) => {
      const bY = parseBorn(d.born), dY = parseInt(d.death);
      const x1 = toX(bY), x2 = toX(dY);
      const y = PAD.t + (i / sorted.length) * IH;
      const col = CAT_COLORS[d.cat] || '#888';
      o += `<rect x="${x1.toFixed(1)}" y="${y.toFixed(1)}" width="${Math.max(2, x2 - x1).toFixed(1)}" height="${barH}" fill="${col}" opacity=".65" rx="1"><title>${d.name} (${d.born}?${d.death})</title></rect>`;
    });
    Object.entries(CAT_COLORS).forEach(([k, c], i) => {
      o += `<g transform="translate(${PAD.l + (i % 4) * 110},${PAD.t - 18})"><rect x="0" y="0" width="8" height="8" fill="${c}" rx="1" opacity=".8"/><text x="11" y="8" font-family="Cinzel,serif" font-size="8" fill="rgba(92,61,30,.8)">${k}</text></g>`;
    });
    svgRef.current.innerHTML = o;
  }, []);
  return (
    <div>
      <div className={styles.sectionTitle}>Lifespans Across History - Birth to Death</div>
      <div className={styles.scrollWrap}>
        <svg ref={svgRef} viewBox="0 0 1000 380" preserveAspectRatio="xMidYMid meet" className={styles.lifespanSvg} />
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? HOW THEY DIED
// ???????????????????????????????????????????????????????
function HowTheyDied() {
  const counts = [
    { label: 'Martyrdom / Battle', cnt: COMPANIONS.filter(d => d.cat === 'martyr').length, color: '#8b1a38' },
    { label: 'Natural causes',     cnt: COMPANIONS.filter(d => d.cat !== 'martyr' && !(d.burial || '').includes('plague')).length - 5, color: '#0a3d2e' },
    { label: 'Plague',             cnt: COMPANIONS.filter(d => (d.burial || '').toLowerCase().includes('plague') || (d.burial || '').toLowerCase().includes('amwas')).length, color: '#b8860b' },
    { label: 'Assassination',      cnt: 5, color: '#3d2a0a' },
  ].filter(c => c.cnt > 0);
  const total = counts.reduce((s, c) => s + c.cnt, 0);
  let cumAngle = 0;
  const cx = 90, cy = 75, r = 62;
  const arcs = counts.map(c => {
    const angle = (c.cnt / total) * Math.PI * 2;
    const x1 = cx + r * Math.sin(cumAngle), y1 = cy - r * Math.cos(cumAngle);
    const x2 = cx + r * Math.sin(cumAngle + angle), y2 = cy - r * Math.cos(cumAngle + angle);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
    cumAngle += angle;
    return { ...c, path };
  });
  const btls = {}; COMPANIONS.forEach(d => (d.battles || []).forEach(b => { if (b) btls[b] = (btls[b] || 0) + 1; }));
  const topB = Object.entries(btls).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxB = topB[0]?.[1] || 1;
  return (
    <div>
      <div className={styles.sectionTitle}>How They Died &amp; Most Contested Battles</div>
      <div className={styles.twoCol}>
        <div>
          <div className={styles.colLabel}>Cause of Death</div>
          <div className={styles.deathChartWrap}>
            <svg viewBox="0 0 180 150" className={styles.pieSvg}>
              {arcs.map(a => <path key={a.label} d={a.path} fill={a.color} opacity=".85" />)}
            </svg>
            <div className={styles.deathLegend}>
              {counts.map(c => (
                <div key={c.label} className={styles.deathLegItem}>
                  <span className={styles.deathLegDot} style={{ background: c.color }} />
                  <span>{c.label}</span>
                  <strong style={{ color: c.color, marginLeft: 'auto' }}>{c.cnt}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.colLabel}>Most Contested Battles</div>
          {topB.map(([nm, cnt], i) => (
            <div key={nm} className={styles.btlRow}>
              <span className={styles.btlRowRank}>{i + 1}</span>
              <span className={styles.btlRowNm}>{nm}</span>
              <div className={styles.btlRowBar}>
                <div style={{ width: `${Math.round((cnt as number) / (maxB as number) * 100)}%`, height: '100%', background: 'linear-gradient(90deg,#8b1a38,#c0392b)', borderRadius: 3 }} />
              </div>
              <span className={styles.btlRowCnt}>{cnt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? RECORDS & FIRSTS
// ???????????????????????????????????????????????????????
function RecordFirsts() {
  const mostBtl = COMPANIONS.slice().sort((a, b) => (b.battles?.length || 0) - (a.battles?.length || 0))[0];
  const dynamicFacts = [
    { icon: '?', color: '#8b1a38', title: 'Most Battles Fought', text: `${mostBtl.name} participated in ${mostBtl.battles?.length || 0} battles - the highest count among all 103 companions profiled here.`, name: `Rank #${mostBtl.rank}`, rank: mostBtl.rank },
    ...FACTS,
  ];
  return (
    <div>
      <div className={styles.sectionTitle}>Records &amp; Firsts of Islam</div>
      <div className={styles.factsGrid}>
        {dynamicFacts.map(f => (
          <div key={f.title} className={styles.factCard} style={{ borderTopColor: f.color }}>
            <span className={styles.factIcon}>{f.icon}</span>
            <div className={styles.factTitle} style={{ color: f.color }}>{f.title}</div>
            <div className={styles.factBody}>{f.text}</div>
            <div className={styles.factName} style={{ color: f.color }}>{f.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? MARTYRS
// ???????????????????????????????????????????????????????
function MartyrsSection() {
  return (
    <div>
      <div className={styles.sectionTitle}>The Martyrs - Where &amp; When They Fell</div>
      <div className={styles.martyrsGrid}>
        {MARTYRS.map((m, i) => (
          <div key={m.name} className={styles.martyrCard} style={{ animationDelay: `${i * 0.04}s` }}>
            <div className={styles.martyrRank}>*</div>
            <div className={styles.martyrInfo}>
              <div className={styles.martyrName}>{m.name}</div>
              <span className={styles.martyrBattle}>{m.where}</span>
              <div className={styles.martyrDetail}>{m.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? CONVERSION WAVES
// ???????????????????????????????????????????????????????
function ConversionWaves() {
  const svgRef = useRef(null);
  const getWave = useCallback((d) => {
    if (CONV_WAVE_MAP[d.rank] !== undefined) return CONV_WAVE_MAP[d.rank];
    if ((d.tribe || '').includes('Ansar')) return 4;
    if ((d.tribe || '').includes('Quraysh') && parseBorn(d.born) < 595) return 1;
    if ((d.tribe || '').includes('Quraysh')) return 2;
    return 5;
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const W = 1100, H = 560, PAD = { l: 20, r: 20, t: 20, b: 20 };
    const LANES = WAVE_DEFS.length;
    const LH = (H - PAD.t - PAD.b) / LANES;
    const groups = Array.from({ length: LANES }, () => []);
    COMPANIONS.forEach(d => { const w = getWave(d); groups[Math.min(w, LANES - 1)].push(d); });
    let out = `<defs><filter id="wglow"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    groups.forEach((grp, wi) => {
      const y = PAD.t + wi * LH;
      const wd = WAVE_DEFS[wi];
      out += `<rect x="${PAD.l}" y="${y}" width="${W - PAD.l - PAD.r}" height="${LH}" fill="${wd.wcolor}" rx="0"/>`;
      out += `<line x1="${PAD.l}" y1="${y}" x2="${W - PAD.r}" y2="${y}" stroke="rgba(120,80,20,.1)" stroke-width="1"/>`;
      out += `<text x="${PAD.l + 6}" y="${y + 16}" font-family="Cinzel,serif" font-size="10" font-weight="700" fill="${wd.color}" letter-spacing=".06em">${wd.label}</text>`;
      out += `<text x="${PAD.l + 6}" y="${y + 30}" font-family="Cinzel,serif" font-size="8.5" fill="rgba(92,61,30,.5)">${wd.sub}</text>`;
    });
    groups.forEach((grp, wi) => {
      if (!grp.length) return;
      const wd = WAVE_DEFS[wi];
      const cy = PAD.t + wi * LH + LH / 2;
      const usableW = W - PAD.l - PAD.r - 220;
      const startX = PAD.l + 200;
      const spacing = Math.min(40, usableW / (grp.length + 1));
      grp.forEach((d, i) => {
        const nodeR = Math.max(6, Math.min(14, 6 + Math.sqrt(d.hadiths || 0) * 0.08));
        const cxN = startX + (i + 0.5) * spacing;
        const col = CAT_COLORS[d.cat] || '#888';
        out += `<circle cx="${cxN.toFixed(1)}" cy="${cy.toFixed(1)}" r="${nodeR}" fill="${col}" fill-opacity=".75" stroke="${col}" stroke-width="1.2" filter="url(#wglow)"><title>${d.name}\n${wd.label}\n${d.hadiths || 0} hadiths</title></circle>`;
        out += `<text x="${cxN.toFixed(1)}" y="${(cy + nodeR + 9).toFixed(1)}" font-family="Cinzel,serif" font-size="6.2" fill="${col}" text-anchor="middle" opacity=".8">${d.name.split(' ')[0]}</text>`;
      });
      out += `<rect x="${W - PAD.r - 45}" y="${PAD.t + wi * LH + LH / 2 - 9}" width="38" height="18" rx="9" fill="${wd.color}" fill-opacity=".15" stroke="${wd.color}" stroke-width=".8"/>`;
      out += `<text x="${W - PAD.r - 26}" y="${PAD.t + wi * LH + LH / 2 + 5}" font-family="Cinzel Decorative,serif" font-size="9" fill="${wd.color}" text-anchor="middle" font-weight="700">${grp.length}</text>`;
    });
    svgRef.current.innerHTML = out;
  }, [getWave]);

  return (
    <div>
      <div className={styles.sectionTitle}>Waves of Faith - When They Became Muslim</div>
      <div className={styles.waveLegend}>
        {Object.entries(CAT_COLORS).map(([k, c]) => (
          <div key={k} className={styles.waveLegItem}>
            <span className={styles.waveLegDot} style={{ background: c }} />
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </div>
        ))}
        <div className={styles.waveLegNote}>Size = Hadiths narrated</div>
      </div>
      <div className={styles.scrollWrap}>
        <svg ref={svgRef} viewBox="0 0 1100 560" preserveAspectRatio="xMidYMid meet" className={styles.waveSvg} />
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? AGE AT DEATH
// ???????????????????????????????????????????????????????
function AgeAtDeath() {
  const svgRef = useRef(null);
  const companions = COMPANIONS.filter(d => {
    const b = parseBorn(d.born), de = parseInt(d.death);
    return !isNaN(b) && !isNaN(de) && de > b && (de - b) < 130;
  }).map(d => ({ ...d, age: parseInt(d.death) - parseBorn(d.born) }));
  const ages = companions.map(c => c.age);
  const avgAge = Math.round(ages.reduce((s, a) => s + a, 0) / ages.length);
  const maxAge = Math.max(...ages); const minAge = Math.min(...ages);
  const oldest = companions.find(c => c.age === maxAge);
  const youngest = companions.find(c => c.age === minAge);
  const over80 = companions.filter(c => c.age >= 80).length;

  useEffect(() => {
    if (!svgRef.current || !companions.length) return;
    const W = 960, H = 310, PAD = { l: 55, r: 30, t: 32, b: 45 };
    const IW = W - PAD.l - PAD.r, IH = H - PAD.t - PAD.b;
    const minA = 0, maxA = 120;
    const toX = (a) => PAD.l + (a - minA) / (maxA - minA) * IW;
    const sorted = [...companions].sort((a, b) => a.age - b.age);
    const bins = {}; for (let a = 0; a < maxA; a += 10) bins[a] = [];
    sorted.forEach(d => { const b = Math.floor(d.age / 10) * 10; if (bins[b]) bins[b].push(d); });
    let out = '';
    Object.entries(bins).forEach(([ageStart, group]) => {
      const x1 = toX(+ageStart), x2 = toX(+ageStart + 10);
      const bw = x2 - x1 - 2, barH = Math.min(IH * 0.7, (group as any[]).length * 20);
      const by = PAD.t + IH - barH;
      const alpha = (0.04 + (group as any[]).length / sorted.length * 0.18).toFixed(2);
      out += `<rect x="${(x1 + 1).toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${barH.toFixed(1)}" fill="rgba(184,134,11,${alpha})" rx="4"/>`;
      if ((group as any[]).length > 0) out += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="${(PAD.t + IH + 14).toFixed(1)}" font-family="Cinzel Decorative,serif" font-size="9" fill="rgba(184,134,11,.7)" text-anchor="middle" font-weight="700">${(group as any[]).length}</text>`;
    });
    out += `<line x1="${PAD.l}" y1="${PAD.t + IH}" x2="${PAD.l + IW}" y2="${PAD.t + IH}" stroke="rgba(120,80,20,.3)" stroke-width="1"/>`;
    for (let a = 0; a <= maxA; a += 10) {
      const x = toX(a);
      out += `<line x1="${x.toFixed(0)}" y1="${PAD.t}" x2="${x.toFixed(0)}" y2="${PAD.t + IH}" stroke="rgba(120,80,20,.06)" stroke-width="1"/>`;
      out += `<text x="${x.toFixed(0)}" y="${(PAD.t + IH + 27).toFixed(0)}" font-family="Cinzel,serif" font-size="9" fill="rgba(92,61,30,.55)" text-anchor="middle">${a}</text>`;
    }
    const avgX = toX(avgAge);
    out += `<line x1="${avgX.toFixed(1)}" y1="${PAD.t}" x2="${avgX.toFixed(1)}" y2="${PAD.t + IH}" stroke="rgba(184,134,11,.5)" stroke-width="1.5" stroke-dasharray="4,3"/>`;
    out += `<text x="${avgX.toFixed(1)}" y="${PAD.t - 5}" font-family="Cinzel,serif" font-size="8" fill="rgba(184,134,11,.8)" text-anchor="middle">Avg ${avgAge}</text>`;
    const dotR = 4.5, dotY = PAD.t + IH - dotR - 2;
    const stackCount = {};
    sorted.forEach(d => {
      const binK = Math.floor(d.age / 10) * 10;
      stackCount[binK] = (stackCount[binK] || 0) + 1;
      const stackIdx = stackCount[binK] - 1;
      const cxD = toX(d.age), cyD = dotY - stackIdx * (dotR * 2 + 1.5);
      const col = CAT_COLORS[d.cat] || '#888';
      out += `<circle cx="${cxD.toFixed(1)}" cy="${cyD.toFixed(1)}" r="${dotR}" fill="${col}" fill-opacity=".75" stroke="${col}" stroke-width=".8"><title>${d.name} | Age ~${d.age}</title></circle>`;
    });
    svgRef.current.innerHTML = out;
  }, [companions]);

  const stats = [
    { icon: 'O', num: maxAge + '', lbl: 'Oldest (approx.)', sub: oldest?.name || '' },
    { icon: 'Y', num: minAge + '', lbl: 'Youngest at death', sub: youngest?.name || '' },
    { icon: 'A', num: avgAge + '', lbl: 'Average lifespan' },
    { icon: '80+', num: over80 + '', lbl: 'Companions 80+' },
    { icon: 'D', num: companions.length + '', lbl: 'With known dates' },
  ];
  return (
    <div>
      <div className={styles.sectionTitle}>Ages at Death - How Long They Lived</div>
      <div className={styles.ageStatsRow}>
        {stats.map(s => (
          <div key={s.lbl} className={styles.ageStat}>
            <span className={styles.ageStatIcon}>{s.icon}</span>
            <span className={styles.ageStatNum}>{s.num}</span>
            <span className={styles.ageStatLbl}>{s.lbl}</span>
            {s.sub && <div className={styles.ageStatSub}>{s.sub}</div>}
          </div>
        ))}
      </div>
      <div className={styles.ageSvgWrap}>
        <svg ref={svgRef} viewBox="0 0 960 310" preserveAspectRatio="xMidYMid meet" className={styles.ageSvg} />
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? GEOGRAPHIC ORIGINS
// ???????????????????????????????????????????????????????
function GeoOrigins() {
  const svgRef = useRef(null);
  const placeMap = {};
  COMPANIONS.forEach(d => {
    const p = (d.place || 'Unknown').split(',')[0].trim();
    if (!placeMap[p]) placeMap[p] = [];
    placeMap[p].push(d);
  });
  const sorted = Object.entries(placeMap).sort((a, b) => (b[1] as any[]).length - (a[1] as any[]).length);
  const total = COMPANIONS.length;
  const colors = ['#b8860b','#8b1a38','#1a3462','#0a3d2e','#7a3060','#3d2a0a','#5c1010','#888888','#2a5080','#509070'];

  useEffect(() => {
    if (!svgRef.current) return;
    const groups = [
      { label:'Mecca',        cnt:COMPANIONS.filter(d=>(d.place||'').includes('Mecca')).length,    color:'#b8860b' },
      { label:'Medina',       cnt:COMPANIONS.filter(d=>(d.place||'').includes('Medina')).length,   color:'#0a3d2e' },
      { label:'Yemen',        cnt:COMPANIONS.filter(d=>(d.place||'').includes('Yemen')).length,    color:'#8b3a08' },
      { label:'Non-Arab',     cnt:COMPANIONS.filter(d=>['Persia','Abyssinia','Ethiopia','Roman','Byzantine'].some(x=>(d.place||'').includes(x))).length, color:'#1a3462' },
      { label:'Other Arabia', cnt:0, color:'#7a5500' },
    ];
    const accounted = groups.reduce((s, g) => s + g.cnt, 0);
    groups[4].cnt = Math.max(0, total - accounted);
    const W = 300, H = 220, cx = 130, cy = 105, outerR = 80, innerR = 45;
    let cumA = -Math.PI / 2;
    const gTotal = groups.reduce((s, g) => s + (g.cnt || 0), 0) || 1;
    let donut = '';
    groups.filter(g => g.cnt > 0).forEach(g => {
      const angle = (g.cnt / gTotal) * Math.PI * 2;
      const x1 = cx + outerR * Math.cos(cumA), y1 = cy + outerR * Math.sin(cumA);
      const x2 = cx + outerR * Math.cos(cumA + angle), y2 = cy + outerR * Math.sin(cumA + angle);
      const xi1 = cx + innerR * Math.cos(cumA), yi1 = cy + innerR * Math.sin(cumA);
      const xi2 = cx + innerR * Math.cos(cumA + angle), yi2 = cy + innerR * Math.sin(cumA + angle);
      const large = angle > Math.PI ? 1 : 0;
      donut += `<path d="M${xi1.toFixed(1)},${yi1.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} A${outerR},${outerR} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} L${xi2.toFixed(1)},${yi2.toFixed(1)} A${innerR},${innerR} 0 ${large} 0 ${xi1.toFixed(1)},${yi1.toFixed(1)} Z" fill="${g.color}" fill-opacity=".82" stroke="rgba(255,253,240,.8)" stroke-width="1.5"><title>${g.label}: ${g.cnt}</title></path>`;
      const midA = cumA + angle / 2;
      if (g.cnt > 3) {
        const lx = cx + (outerR + 16) * Math.cos(midA), ly = cy + (outerR + 16) * Math.sin(midA);
        donut += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="Cinzel,serif" font-size="8.5" fill="${g.color}" text-anchor="middle" dominant-baseline="central" font-weight="700">${g.label}</text>`;
      }
      cumA += angle;
    });
    donut += `<text x="${cx}" y="${cy - 5}" font-family="Cinzel Decorative,serif" font-size="13" fill="rgba(10,61,46,.8)" text-anchor="middle" font-weight="700">${gTotal}</text>`;
    donut += `<text x="${cx}" y="${cy + 11}" font-family="Cinzel,serif" font-size="8" fill="rgba(92,61,30,.6)" text-anchor="middle" letter-spacing=".06em">COMPANIONS</text>`;
    groups.filter(g => g.cnt > 0).forEach((g, i) => {
      const lx = 10 + (i % 3) * 95, ly = H - 25 + Math.floor(i / 3) * 14;
      donut += `<rect x="${lx}" y="${ly}" width="8" height="8" rx="2" fill="${g.color}" opacity=".82"/>`;
      donut += `<text x="${lx + 11}" y="${ly + 8}" font-family="Cinzel,serif" font-size="8" fill="rgba(92,61,30,.75)">${g.label} (${g.cnt})</text>`;
    });
    svgRef.current.innerHTML = donut;
  }, [total]);

  return (
    <div>
      <div className={styles.sectionTitle}>Origins - Where Were They Born?</div>
      <div className={styles.originsWrap}>
        <div className={styles.originsBox}>
          <div className={styles.originsBoxTitle}>Birth Place Distribution</div>
          {sorted.map(([place, arr], i) => {
            const pct = Math.round((arr as any[]).length / total * 100);
            const col = colors[i % colors.length];
            return (
              <div key={place} className={styles.originBarRow}>
                <div className={styles.originBarLbl}>{place}</div>
                <div className={styles.originBarTrack}>
                  <div className={styles.originBarFill} style={{ width: `${pct}%`, background: col }} />
                  <span className={styles.originBarCnt}>{(arr as any[]).length}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.originsBox}>
          <div className={styles.originsBoxTitle}>Arab vs Non-Arab</div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '.5rem 0' }}>
            <svg ref={svgRef} viewBox="0 0 300 220" className={styles.donutSvg} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? RECORD HOLDERS
// ???????????????????????????????????????????????????????
function RecordHolders() {
  const withHad = COMPANIONS.filter(d => d.hadiths > 0);
  const topHad = [...withHad].sort((a, b) => b.hadiths - a.hadiths)[0];
  const withBat = COMPANIONS.filter(d => d.battles && d.battles.length > 0);
  const mostBat = [...withBat].sort((a, b) => b.battles.length - a.battles.length)[0];
  const total = COMPANIONS.reduce((s, d) => s + (d.hadiths || 0), 0);
  const scholars = COMPANIONS.filter(d => d.cat === 'scholar').length;
  const narrators = COMPANIONS.filter(d => d.cat === 'narrator').length;
  const martyrs = COMPANIONS.filter(d => d.cat === 'martyr').length;
  const wives = COMPANIONS.filter(d => d.cat === 'wife').length;
  const nonArab = COMPANIONS.filter(d => ['Yemen','Persia','Abyssinia','Ethiopia'].some(x => (d.place || '').includes(x)));
  const topBatCount = mostBat ? (mostBat.battles || []).length : 0;
  const aisha = COMPANIONS.find(d => d.name === 'Aisha');
  const cards = [
    { icon:'H', title:'Most Hadiths Narrated', value:topHad?topHad.hadiths.toLocaleString():'?', desc:'The single greatest individual contribution to the Hadith corpus', name:topHad?.name, rank:topHad?.rank, color:'#b8860b' },
    { icon:'B', title:'Most Battles Fought', value:topBatCount+' battles', desc:`${mostBat?.name||''} fought in more recorded battles than any other companion`, name:mostBat?.name, rank:mostBat?.rank, color:'#8b1a38' },
    { icon:'T', title:'Total Hadiths Preserved', value:total.toLocaleString()+'+', desc:'Combined narrations by all 103 companions in this collection', color:'#1a3462' },
    { icon:'W', title:'Women Companions', value:'23 women', desc:`${wives} wives of the Prophet - Aisha alone narrated ${aisha?.hadiths?.toLocaleString()||'~2,210'} hadiths`, color:'#7a3060' },
    { icon:'N', title:'Non-Arab Companions', value:nonArab.length+' companions', desc:'Bilal (Abyssinia), Salman (Persia), and others', color:'#0a3d2e' },
    { icon:'M', title:'Companions Martyred', value:martyrs+' martyrs', desc:'From Sumayyah (first martyr) to the Battle of Yarmouk', color:'#5c1010' },
    { icon:'S', title:'Scholar Companions', value:scholars+' scholars', desc:`${narrators} specialist narrators + ${scholars} jurisprudential scholars`, color:'#2a5080' },
    { icon:'P', title:'Ten Promised Paradise', value:'10 named', desc:"Abu Bakr, Umar, Uthman, Ali, Talha, Zubayr, Abd al-Rahman ibn Awf, Sa'd, Sa'id, Abu Ubayda", color:'#7a5500' },
  ];
  return (
    <div>
      <div className={styles.sectionTitle}>Record Holders - Remarkable Numbers &amp; Firsts</div>
      <div className={styles.impactGrid}>
        {cards.map(c => (
          <div key={c.title} className={styles.impactCard} style={{ borderTopColor: c.color }}>
            <span className={styles.impactIcon}>{c.icon}</span>
            <div className={styles.impactTitle} style={{ color: c.color }}>{c.title}</div>
            <div className={styles.impactValue} style={{ color: c.color }}>{c.value}</div>
            <div className={styles.impactDesc}>{c.desc}</div>
            {c.rank && <div className={styles.impactName} style={{ color: c.color }}>{c.name}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? BY ROLE
// ???????????????????????????????????????????????????????
function ByRole() {
  return (
    <div>
      <div className={styles.sectionTitle}>By Role - Legacy of Each Category</div>
      <div className={styles.rolesGrid}>
        {ROLE_DEFS.map(r => {
          const members = COMPANIONS.filter(d => d.cat === r.key).sort((a, b) => a.rank - b.rank);
          return (
            <div key={r.key} className={styles.roleCol}>
              <div className={styles.roleColHdr}>
                <span className={styles.roleColIcon}>{r.icon}</span>
                <div className={styles.roleColTitle} style={{ color: r.color }}>{r.label}</div>
                <div className={styles.roleColCount} style={{ color: r.color }}>{members.length}</div>
                <div className={styles.roleColDesc}>{r.desc}</div>
              </div>
              {members.map(d => (
                <div key={d.rank} className={styles.roleItem} title={d.title}>
                  <span className={styles.roleItemRank}>#{d.rank}</span> {d.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: AGE AT CONVERSION  (Feature 12)
// ???????????????????????????????????????????????????????
function AgeAtConversion() {
  const sorted = [...AGE_CONVERSIONS].sort((a, b) => a.ageAtConversion - b.ageAtConversion);
  const max = Math.max(...sorted.map(d => d.ageAtConversion));
  const avg = Math.round(sorted.reduce((s, d) => s + d.ageAtConversion, 0) / sorted.length);

  const groups = { child: sorted.filter(d => d.ageAtConversion <= 15), youth: sorted.filter(d => d.ageAtConversion > 15 && d.ageAtConversion <= 30), adult: sorted.filter(d => d.ageAtConversion > 30 && d.ageAtConversion <= 50), elder: sorted.filter(d => d.ageAtConversion > 50) };

  return (
    <div>
      <div className={styles.sectionTitle}>Age at Conversion - When They Found Islam</div>
      <div className={styles.acStatsRow}>
        <div className={styles.acStat}><span className={styles.acStatNum}>{groups.child.length}</span><span className={styles.acStatLbl}>Children (?15)</span></div>
        <div className={styles.acStat}><span className={styles.acStatNum}>{groups.youth.length}</span><span className={styles.acStatLbl}>Youth (16?30)</span></div>
        <div className={styles.acStat}><span className={styles.acStatNum}>{groups.adult.length}</span><span className={styles.acStatLbl}>Adults (31?50)</span></div>
        <div className={styles.acStat}><span className={styles.acStatNum}>{groups.elder.length}</span><span className={styles.acStatLbl}>Elders (50+)</span></div>
        <div className={styles.acStat}><span className={styles.acStatNum}>{avg}</span><span className={styles.acStatLbl}>Average age</span></div>
      </div>
      <div className={styles.acBars}>
        {sorted.map(d => {
          const col = CAT_COLORS[d.cat] || '#888';
          const pct = Math.round(d.ageAtConversion / max * 100);
          return (
            <div key={d.rank} className={styles.acRow}>
              <div className={styles.acName}>{d.name}</div>
              <div className={styles.acBarWrap}>
                <div className={styles.acBar} style={{ width: `${pct}%`, background: col }} />
                <span className={styles.acAge}>{d.ageAtConversion}</span>
              </div>
              <div className={styles.acYear}>{d.conversionYear}</div>
              <div className={styles.acCtx}>{d.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: EVENT PRESENCE MATRIX  (Feature 31)
// ???????????????????????????????????????????????????????
function EventPresenceMatrix() {
  const companionList = COMPANIONS.filter(c => EVENT_PRESENCE[c.rank]).slice(0, 25);

  return (
    <div>
      <div className={styles.sectionTitle}>Event Presence Matrix - Who Was Where</div>
      <div className={styles.infoBanner}>
        Color = companion's role category. ? = confirmed present. Scroll right for all events.
      </div>
      <div className={styles.presenceWrap}>
        <table className={styles.presenceTable}>
          <thead>
            <tr>
              <th className={styles.presenceNameH}>Companion</th>
              {HIST_EVENTS.map(ev => (
                <th key={ev.id} className={styles.presenceEvH}>
                  <div className={styles.presenceEvLabel} style={{ color: ev.color }}>
                    <span>{ev.short}</span>
                    <span className={styles.presenceEvYear}>{ev.yearCE}</span>
                  </div>
                </th>
              ))}
              <th className={styles.presenceTotalH}>Total</th>
            </tr>
          </thead>
          <tbody>
            {companionList.map(c => {
              const presence = EVENT_PRESENCE[c.rank] || [];
              const col = CAT_COLORS[c.cat] || '#888';
              return (
                <tr key={c.rank}>
                  <td className={styles.presenceName} style={{ borderLeft: `3px solid ${col}` }}>
                    <span className={styles.presenceRank}>#{c.rank}</span> {c.name}
                  </td>
                  {HIST_EVENTS.map(ev => {
                    const present = presence.includes(ev.id);
                    return (
                      <td key={ev.id} className={present ? styles.presenceYes : styles.presenceNo}
                        style={present ? { background: col + '33' } : {}}
                        title={present ? `${c.name} was present at ${ev.label}` : `Not confirmed at ${ev.label}`}>
                        {present && <span className={styles.presenceDot} style={{ background: col }} />}
                      </td>
                    );
                  })}
                  <td className={styles.presenceTotal} style={{ color: col }}>
                    {presence.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.presenceLegend}>
        {Object.entries(CAT_COLORS).map(([k, c]) => (
          <span key={k} className={styles.presenceLegItem}>
            <span style={{ background: c, width: 8, height: 8, borderRadius: '50%', display: 'inline-block', marginRight: 4 }} />{k}
          </span>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: LONGEVITY & SURVIVAL CHART  (Feature 24)
// ???????????????????????????????????????????????????????
function LongevityChart() {
  const [filter, setFilter] = useState<string>('all');
  const companions = COMPANIONS.filter(d => {
    const b = parseBorn(d.born), de = parseInt(d.death);
    return !isNaN(b) && !isNaN(de) && de > b && (de - b) < 130;
  }).map(d => ({ ...d, age: parseInt(d.death) - parseBorn(d.born) }));

  const filtered = filter === 'all' ? companions : companions.filter(d => d.cat === filter);
  const sorted = [...filtered].sort((a, b) => b.age - a.age);
  const maxAge = Math.max(...sorted.map(d => d.age));

  const cats = ['all', ...Array.from(new Set(companions.map(d => d.cat)))];

  return (
    <div>
      <div className={styles.sectionTitle}>Longevity &amp; Survival - Sorted Lifespans</div>
      <div className={styles.longevityFilters}>
        {cats.map(cat => (
          <button
            key={cat}
            className={`${styles.longevBtn} ${filter === cat ? styles.longevActive : ''}`}
            style={filter === cat && cat !== 'all' ? { borderColor: CAT_COLORS[cat], color: CAT_COLORS[cat] } : {}}
            onClick={() => setFilter(cat)}
          >{cat === 'all' ? 'All' : cat}</button>
        ))}
      </div>
      <div className={styles.longevBars}>
        {sorted.slice(0, 30).map((d, i) => {
          const col = CAT_COLORS[d.cat] || '#888';
          const pct = Math.round(d.age / maxAge * 100);
          return (
            <div key={d.rank} className={styles.longevRow}>
              <span className={styles.longevRank}>{i + 1}</span>
              <div className={styles.longevName}>{d.name}</div>
              <div className={styles.longevBarWrap}>
                <div className={styles.longevBar} style={{ width: `${pct}%`, background: col }} />
              </div>
              <span className={styles.longevAge} style={{ color: col }}>{d.age} yrs</span>
              <span className={styles.longevDates}>{d.born} - {d.death}</span>
            </div>
          );
        })}
      </div>
      {sorted.length > 30 && <div className={styles.longevMore}>Showing top 30 of {sorted.length} companions with known dates.</div>}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: ANSARI vs MUHAJIR BREAKDOWN  (Feature 25)
// ???????????????????????????????????????????????????????
function OriginBreakdown() {
  const groups = { muhajir: [], ansar: [], late: [], other: [] };
  COMPANIONS.forEach(c => {
    const grp = ORIGIN_GROUP[c.rank] || 'other';
    groups[grp].push(c);
  });

  const roles = Array.from(new Set(COMPANIONS.map(c => c.cat)));
  const roleData = roles.map(role => {
    const row = { role };
    Object.entries(groups).forEach(([grp, list]) => {
      row[grp] = (list as any[]).filter(c => c.cat === role).length;
    });
    return row;
  });

  return (
    <div>
      <div className={styles.sectionTitle}>Ansari vs. Muhajir - The Two Great Groups</div>
      <div className={styles.originBreakCards}>
        {Object.entries(ORIGIN_META).map(([key, meta]) => (
          <div key={key} className={styles.originBreakCard} style={{ borderTopColor: meta.color }}>
            <div className={styles.obCardTitle} style={{ color: meta.color }}>{meta.label}</div>
            <div className={styles.obCardCount} style={{ color: meta.color }}>{(groups[key] as any[]).length}</div>
            <div className={styles.obCardDesc}>{meta.desc}</div>
          </div>
        ))}
      </div>
      <div className={styles.sectionSubTitle}>Role Distribution by Group</div>
      <div className={styles.obMatrix}>
        <div className={styles.obMatrixHeader}>
          <div className={styles.obRoleCol}>Role</div>
          {Object.entries(ORIGIN_META).map(([key, meta]) => (
            <div key={key} className={styles.obGroupCol} style={{ color: meta.color }}>{meta.label}</div>
          ))}
        </div>
        {roleData.filter(r => Object.values(groups).some(g => r[Object.keys(groups)[0]] + r[Object.keys(groups)[1]] + r[Object.keys(groups)[2]] + r[Object.keys(groups)[3]] > 0)).map(r => (
          <div key={r.role} className={styles.obMatrixRow}>
            <div className={styles.obRoleLabel}>{r.role}</div>
            {Object.keys(ORIGIN_META).map(grp => {
              const val = r[grp] || 0;
              const max = Math.max(...roleData.map(rd => rd[grp] || 0)) || 1;
              const pct = Math.round(val / max * 100);
              return (
                <div key={grp} className={styles.obGroupCell}>
                  {val > 0 && (
                    <>
                      <div className={styles.obCellBar} style={{ width: `${pct}%`, background: ORIGIN_META[grp].color }} />
                      <span className={styles.obCellVal}>{val}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: FOUR CALIPHATES TIMELINE  (Feature 23)
// ???????????????????????????????????????????????????????
function CaliphatesTimeline() {
  const [selected, setSelected] = useState<number | null>(null);
  const minY = 632, maxY = 661;

  return (
    <div>
      <div className={styles.sectionTitle}>Four Rightly-Guided Caliphs - Parallel Timeline</div>
      <div className={styles.caliphIntro}>
        The Al-Khulafa' al-Rashidun (632?661 CE) ? 29 years that shaped 1,400 years of civilization.
      </div>
      <div className={styles.caliphGantt}>
        <div className={styles.ganttYearBar}>
          {[632,634,636,638,640,642,644,646,648,650,652,654,656,658,660,661].map(y => (
            <div key={y} className={styles.ganttYearTick} style={{ left: `${(y - minY) / (maxY - minY) * 100}%` }}>
              <span>{y}</span>
            </div>
          ))}
        </div>
        {CALIPHATE_DATA.map((c, i) => {
          const left = (c.startCE - minY) / (maxY - minY) * 100;
          const width = (c.endCE - c.startCE) / (maxY - minY) * 100;
          return (
            <div key={c.rank} className={styles.ganttRow} onClick={() => setSelected(selected === i ? null : i)}>
              <div className={styles.ganttLabel} style={{ color: c.color }}>
                <span className={styles.ganttTitle}>{c.name}</span>
                <span className={styles.ganttSubTitle}>{c.startAH}?{c.endAH} AH</span>
              </div>
              <div className={styles.ganttTrack}>
                <div
                  className={`${styles.ganttBar} ${selected === i ? styles.ganttBarActive : ''}`}
                  style={{ left: `${left}%`, width: `${width}%`, background: c.color }}
                >
                  <span className={styles.ganttBarLabel}>{c.endCE - c.startCE}y</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <div className={styles.caliphDetail} style={{ borderTopColor: CALIPHATE_DATA[selected].color }}>
          <div className={styles.cdHeader}>
            <div className={styles.cdName} style={{ color: CALIPHATE_DATA[selected].color }}>
              {CALIPHATE_DATA[selected].name} - {CALIPHATE_DATA[selected].ar}
            </div>
            <div className={styles.cdDates}>
              {CALIPHATE_DATA[selected].startCE} - {CALIPHATE_DATA[selected].endCE} CE
              ({CALIPHATE_DATA[selected].startAH} - {CALIPHATE_DATA[selected].endAH} AH)
            </div>
            <div className={styles.cdNote}>{CALIPHATE_DATA[selected].note}</div>
          </div>
          <div className={styles.cdColumns}>
            <div className={styles.cdCol}>
              <div className={styles.cdColTitle} style={{ color: CALIPHATE_DATA[selected].color }}>Achievements</div>
              {CALIPHATE_DATA[selected].achievements.map((a, i) => (
                <div key={i} className={styles.cdItem}>{a}</div>
              ))}
            </div>
            <div className={styles.cdCol}>
              <div className={styles.cdColTitle} style={{ color: '#8b1a38' }}>Challenges</div>
              {CALIPHATE_DATA[selected].challenges.map((ch, i) => (
                <div key={i} className={styles.cdItem}>{ch}</div>
              ))}
            </div>
            <div className={styles.cdCol}>
              <div className={styles.cdColTitle} style={{ color: '#1a3462' }}>Territories</div>
              {CALIPHATE_DATA[selected].conquests.map((t, i) => (
                <div key={i} className={styles.cdItem}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: FIQH ARCHIVE  (Feature 13 + Ijma Consensus 46)
// ???????????????????????????????????????????????????????
function FiqhArchiveSection() {
  const [fiqhView, setFiqhView] = useState<'archive' | 'ijma'>('archive');
  const [catFilter, setCatFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const cats = ['all', ...Array.from(new Set(FIQH_ARCHIVE.map(f => f.category)))];
  const filtered = FIQH_ARCHIVE
    .filter(f => catFilter === 'all' || f.category === catFilter)
    .filter(f => !search || f.topic.toLowerCase().includes(search.toLowerCase()));

  const POSITION_COLORS = {
    permissible: '#0a3d2e',
    prohibited:  '#8b1a38',
    recommended: '#1a3462',
    disliked:    '#b8860b',
    obligatory:  '#7a3060',
  };

  return (
    <div>
      <div className={styles.sectionTitle}>Fiqh Archive - Companion Legal Opinions</div>
      <div className={styles.fiqhSubBar}>
        <button className={`${styles.fiqhSubBtn} ${fiqhView==='archive'?styles.fiqhSubActive:''}`} onClick={()=>setFiqhView('archive')}>Fatwa Archive</button>
        <button className={`${styles.fiqhSubBtn} ${fiqhView==='ijma'?styles.fiqhSubActive:''}`} onClick={()=>setFiqhView('ijma')}>Ijma' &amp; Ikhtilaf</button>
      </div>

      {fiqhView === 'archive' && (
        <>
          <div className={styles.fiqhControls}>
            <input className={styles.fiqhSearch} placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)} />
            <div className={styles.fiqhCatBtns}>
              {cats.map(cat => (
                <button key={cat} className={`${styles.fiqhCatBtn} ${catFilter===cat?styles.fiqhCatActive:''}`} onClick={()=>setCatFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>
          <div className={styles.fiqhList}>
            {filtered.map(f => (
              <div key={f.id} className={styles.fiqhItem}>
                <div className={styles.fiqhItemHeader} onClick={() => setExpanded(expanded === f.id ? null : f.id)}>
                  <div className={styles.fiqhItemLeft}>
                    <span className={styles.fiqhCatTag}>{f.category}</span>
                    <span className={styles.fiqhTopicName}>{f.topic}</span>
                  </div>
                  <div className={styles.fiqhItemRight}>
                    <span className={styles.fiqhOpCount}>{f.opinions.length} opinion{f.opinions.length > 1 ? 's' : ''}</span>
                    <span className={styles.fiqhChevron}>{expanded === f.id ? '?' : '+'}</span>
                  </div>
                </div>
                {expanded === f.id && (
                  <div className={styles.fiqhOpinions}>
                    {f.opinions.map((op, i) => (
                      <div key={i} className={styles.fiqhOpinion}>
                        <div className={styles.fiqhOpHead}>
                          <span className={styles.fiqhOpName}>{op.companionName}</span>
                          <span className={styles.fiqhPosBadge} style={{ background: POSITION_COLORS[op.position] + '22', color: POSITION_COLORS[op.position], border: `1px solid ${POSITION_COLORS[op.position]}44` }}>{op.position}</span>
                        </div>
                        <div className={styles.fiqhOpText}>"{op.opinion}"</div>
                        <div className={styles.fiqhOpReason}><strong>Reasoning:</strong> {op.reasoning}</div>
                        <div className={styles.fiqhOpSource}><strong>Source:</strong> {op.source}</div>
                      </div>
                    ))}
                    {f.madhab_influence && (
                      <div className={styles.fiqhMadhab}>
                        <strong>Madhab Influence:</strong> {f.madhab_influence}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {fiqhView === 'ijma' && (
        <div className={styles.ijmaWrap}>
          <div className={styles.ijmaSection}>
            <div className={styles.ijmaLabel}>Ijma' (Consensus) - {IJMA_TOPICS.length} topic{IJMA_TOPICS.length > 1 ? 's' : ''}</div>
            <div className={styles.ijmaDesc}>Issues where all companions reached unanimous agreement. These form the most binding rulings in Islamic law.</div>
            {IJMA_TOPICS.map(f => (
              <div key={f.id} className={styles.ijmaCard} style={{ borderLeftColor: '#0a3d2e' }}>
                <div className={styles.ijmaCardTitle}>{f.topic}</div>
                <div className={styles.ijmaCardCat}>{f.category}</div>
                {f.opinions.map((op, i) => (
                  <div key={i} className={styles.ijmaOpRow}>
                    <span className={styles.ijmaOpName}>{op.companionName}</span>
                    <span className={styles.ijmaOpText}>{op.opinion}</span>
                    <span className={styles.ijmaOpSrc}>{op.source}</span>
                  </div>
                ))}
                {f.madhab_influence && <div className={styles.fiqhMadhab}>{f.madhab_influence}</div>}
              </div>
            ))}
          </div>
          <div className={styles.ikhtilafSection}>
            <div className={styles.ijmaLabel} style={{ color: '#8b1a38' }}>Ikhtilaf (Disagreement) - {IKHTILAF_TOPICS.length} topics</div>
            <div className={styles.ijmaDesc}>Issues where companions held opposing positions - the foundation of Islamic legal diversity.</div>
            {IKHTILAF_TOPICS.map(f => (
              <div key={f.id} className={styles.ikhtilafCard} style={{ borderLeftColor: '#8b1a38' }}>
                <div className={styles.ijmaCardTitle}>{f.topic}</div>
                <div className={styles.ikhtilafPositions}>
                  {f.opinions.map((op, i) => (
                    <div key={i} className={styles.ikhtilafOp}>
                      <span className={styles.ikhtilafName}>{op.companionName}:</span>
                      <span className={styles.ikhtilafPos} style={{ color: POSITION_COLORS[op.position] }}>{op.position}</span>
                      <span className={styles.ikhtilafTxt}>{op.opinion}</span>
                    </div>
                  ))}
                </div>
                {f.madhab_influence && <div className={styles.fiqhMadhab}>{f.madhab_influence}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: ADAPTIVE QUIZ  (Feature 29)
// ???????????????????????????????????????????????????????
function AdaptiveQuiz() {
  const [level, setLevel] = useState(1);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [catFilter, setCatFilter] = useState<string>('all');
  const [finished, setFinished] = useState(false);

  const available = useMemo(() => {
    return ADAPTIVE_QUIZ_QUESTIONS.filter(q => {
      const levelOk = q.difficulty <= level + 1 && q.difficulty >= Math.max(1, level - 1);
      const catOk = catFilter === 'all' || q.category === catFilter;
      return levelOk && catOk;
    });
  }, [level, catFilter]);

  const question = available[qIndex % available.length];
  const cats = ['all', ...Array.from(new Set(ADAPTIVE_QUIZ_QUESTIONS.map(q => q.category)))];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTotal(t => t + 1);
    if (idx === question.answer) {
      setScore(s => s + 1);
      if (score + 1 >= 3 && level < 5) setLevel(l => Math.min(5, l + 1));
    } else {
      if (total > 2 && score / total < 0.4 && level > 1) setLevel(l => Math.max(1, l - 1));
    }
  };

  const next = () => {
    setSelected(null);
    if (qIndex + 1 >= available.length) { setFinished(true); return; }
    setQIndex(i => i + 1);
  };

  const reset = () => { setQIndex(0); setSelected(null); setScore(0); setTotal(0); setLevel(1); setFinished(false); };

  const DIFF_LABELS = ['','Beginner','Easy','Intermediate','Advanced','Expert'];
  const DIFF_COLORS = ['','#0a3d2e','#1a3462','#b8860b','#8b3a08','#8b1a38'];

  return (
    <div>
      <div className={styles.sectionTitle}>Adaptive Quiz - Test Your Knowledge</div>
      <div className={styles.quizMeta}>
        <div className={styles.quizLevel} style={{ background: DIFF_COLORS[level] + '22', border: `1px solid ${DIFF_COLORS[level]}44`, color: DIFF_COLORS[level] }}>
          Level {level}: {DIFF_LABELS[level]}
        </div>
        <div className={styles.quizScore}>{score}/{total} correct</div>
        <div className={styles.quizCatFilters}>
          {cats.map(cat => (
            <button key={cat} className={`${styles.quizCatBtn} ${catFilter===cat?styles.quizCatActive:''}`} onClick={()=>{setCatFilter(cat);setQIndex(0);setSelected(null);}}>{cat}</button>
          ))}
        </div>
      </div>

      {!finished && question ? (
        <div className={styles.quizCard}>
          <div className={styles.quizDiffBadge} style={{ background: DIFF_COLORS[question.difficulty] + '22', color: DIFF_COLORS[question.difficulty] }}>
            {DIFF_LABELS[question.difficulty]} ? {question.category}
          </div>
          <div className={styles.quizQ}>{question.q}</div>
          <div className={styles.quizOptions}>
            {question.options.map((opt, i) => {
              let cls = styles.quizOpt;
              if (selected !== null) {
                if (i === question.answer) cls = `${styles.quizOpt} ${styles.quizOptCorrect}`;
                else if (i === selected && i !== question.answer) cls = `${styles.quizOpt} ${styles.quizOptWrong}`;
              }
              return (
                <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={selected !== null}>
                  <span className={styles.quizOptLetter}>{['A','B','C','D'][i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className={styles.quizExplanation}>
              <div className={selected === question.answer ? styles.quizCorrectMsg : styles.quizWrongMsg}>
                {selected === question.answer ? '? Correct!' : `? Incorrect. The answer is: ${question.options[question.answer]}`}
              </div>
              <div className={styles.quizExp}>{question.explanation}</div>
              <div className={styles.quizSrc}>Source: {question.source}</div>
              <button className={styles.quizNext} onClick={next}>
                {qIndex + 1 >= available.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.quizFinished}>
          <div className={styles.quizFinScore}>{score}/{total}</div>
          <div className={styles.quizFinLabel}>
            {score / total >= 0.8 ? 'Excellent! Scholar-level knowledge.' :
             score / total >= 0.6 ? 'Good. Keep exploring!' :
             score / total >= 0.4 ? 'Keep learning - you\'re growing.' :
             'Every scholar started here. Begin again!'}
          </div>
          <button className={styles.quizReset} onClick={reset}>Try Again</button>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: NAME CHANGES  (Feature 07)
// ???????????????????????????????????????????????????????
function NameChangesSection() {
  const [sortBy, setSortBy] = useState<'category' | 'alpha'>('category');
  const [catFilter, setCatFilter] = useState<string>('all');

  const cats = ['all', ...Array.from(new Set(NAME_CHANGES.map(n => n.category)))];
  const sorted = [...NAME_CHANGES]
    .filter(n => catFilter === 'all' || n.category === catFilter)
    .sort((a, b) => sortBy === 'alpha' ? a.newName.localeCompare(b.newName) : a.category.localeCompare(b.category));

  const CAT_META = {
    'remove-idolatry': { label: 'Remove Idolatry', color: '#8b1a38' },
    'honor':           { label: 'Honor',            color: '#b8860b' },
    'positive-meaning':{ label: 'Positive Meaning', color: '#0a3d2e' },
    'other':           { label: 'Other',             color: '#888888' },
  };

  return (
    <div>
      <div className={styles.sectionTitle}>Name Changes by the Prophet</div>
      <div className={styles.namesIntro}>
        The Prophet changed names that implied polytheism, evil, or bad omens. This was a spiritual and social reform - a companion's name became their identity in the new civilization.
      </div>
      <div className={styles.namesStats}>
        {Object.entries(CAT_META).map(([key, meta]) => (
          <div key={key} className={styles.namesStat} style={{ borderTopColor: meta.color }}>
            <span className={styles.namesStatNum} style={{ color: meta.color }}>
              {NAME_CHANGES.filter(n => n.category === key).length}
            </span>
            <span className={styles.namesStatLbl}>{meta.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.namesControls}>
        <div className={styles.namesCatBtns}>
          {cats.map(cat => (
            <button key={cat} className={`${styles.namesCatBtn} ${catFilter===cat?styles.namesCatActive:''}`}
              style={catFilter===cat && cat !== 'all' ? { borderColor: CAT_META[cat]?.color, color: CAT_META[cat]?.color } : {}}
              onClick={()=>setCatFilter(cat)}>
              {cat === 'all' ? 'All' : CAT_META[cat]?.label || cat}
            </button>
          ))}
        </div>
        <div className={styles.namesSortBtns}>
          <button className={`${styles.namesSortBtn} ${sortBy==='category'?styles.namesSortActive:''}`} onClick={()=>setSortBy('category')}>By Category</button>
          <button className={`${styles.namesSortBtn} ${sortBy==='alpha'?styles.namesSortActive:''}`} onClick={()=>setSortBy('alpha')}>A-Z</button>
        </div>
      </div>
      <div className={styles.namesTable}>
        <div className={styles.namesTableHeader}>
          <div className={styles.namesColOld}>Old Name</div>
          <div className={styles.namesColArr}>-&gt;</div>
          <div className={styles.namesColNew}>New Name</div>
          <div className={styles.namesColMeaning}>Meaning</div>
          <div className={styles.namesColCat}>Category</div>
        </div>
        {sorted.map((n, i) => {
          const meta = CAT_META[n.category];
          return (
            <div key={i} className={styles.namesRow}>
              <div className={styles.namesOld}>
                <span className={styles.namesOldAr}>{n.oldNameAr}</span>
                <span className={styles.namesOldEn}>{n.oldName}</span>
              </div>
            <div className={styles.namesArr}>-&gt;</div>
              <div className={styles.namesNew}>
                <span className={styles.namesNewAr}>{n.newNameAr}</span>
                <span className={styles.namesNewEn}>{n.newName}</span>
              </div>
              <div className={styles.namesMeaning}>{n.newNameMeaning}</div>
              <div className={styles.namesCategory}>
                <span style={{ background: meta.color + '22', color: meta.color, border: `1px solid ${meta.color}33` }} className={styles.namesCatBadge}>{meta.label}</span>
              </div>
              {n.reason && (
                <div className={styles.namesReason}>{n.reason}</div>
              )}
              {n.source && (
                <div className={styles.namesSource}>{n.source}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? NEW: HADITH GUIDE  (Feature 37)
// ???????????????????????????????????????????????????????
function HadithGuide() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [selectedSit, setSelectedSit] = useState(null);

  const search = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const matches = SITUATION_GUIDES.filter(sg =>
      sg.keywords.some(k => q.includes(k)) ||
      sg.situation.toLowerCase().includes(q) ||
      sg.category === q
    );
    setResults(matches.length > 0 ? matches : []);
    setSelectedSit(null);
  };

  const CAT_COLORS_GUIDE = {
    grief:'#1a3462', gratitude:'#b8860b', anger:'#8b1a38', fear:'#3d2a0a',
    patience:'#0a3d2e', forgiveness:'#509070', leadership:'#7a5500',
    knowledge:'#7a3060', community:'#2a5080', worship:'#b8860b',
    family:'#8b3a08', money:'#0a3d2e',
  };

  return (
    <div>
      <div className={styles.sectionTitle}>Situation Hadith Guide</div>
      <div className={styles.guideIntro}>
        Describe your situation and surface the most relevant hadith from the companions. Powered by keyword matching across 9 life categories.
      </div>
      <div className={styles.guideSearchBar}>
        <input
          className={styles.guideInput}
          placeholder="e.g. 'feeling angry', 'financial difficulty', 'making a decision'..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
        />
        <button className={styles.guideSearchBtn} onClick={search}>Find Hadiths</button>
      </div>

      {results === null && (
        <div className={styles.guideBrowse}>
          <div className={styles.guideBrowseTitle}>Or browse by situation:</div>
          <div className={styles.guideSituations}>
            {SITUATION_GUIDES.map((sg, i) => (
              <button
                key={i}
                className={`${styles.guideSitBtn} ${selectedSit === i ? styles.guideSitActive : ''}`}
                style={{ borderColor: CAT_COLORS_GUIDE[sg.category] + '44' }}
                onClick={() => { setSelectedSit(i); setResults(null); }}
              >
                <span className={styles.guideSitCat} style={{ color: CAT_COLORS_GUIDE[sg.category] }}>{sg.category}</span>
                <span className={styles.guideSitLabel}>{sg.situation}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {results !== null && (
        <div className={styles.guideResults}>
          {(results as any[]).length === 0 ? (
            <div className={styles.guideNoResults}>
              No specific results found for "{query}". Try: grief, anger, money, knowledge, family, worship, leadership, decision.
            </div>
          ) : (
            (results as any[]).map((sg, i) => (
              <GuideResultCard key={i} sg={sg} catColor={CAT_COLORS_GUIDE[sg.category]} />
            ))
          )}
          <button className={styles.guideClear} onClick={() => { setResults(null); setQuery(''); }}>Browse All</button>
        </div>
      )}

      {selectedSit !== null && results === null && (
        <GuideResultCard sg={SITUATION_GUIDES[selectedSit]} catColor={CAT_COLORS_GUIDE[SITUATION_GUIDES[selectedSit].category]} />
      )}
    </div>
  );
}

function GuideResultCard({ sg, catColor }) {
  return (
    <div className={styles.guideResultCard} style={{ borderTopColor: catColor }}>
      <div className={styles.guideResultHeader}>
        <span className={styles.guideResultCat} style={{ color: catColor }}>{sg.category}</span>
        <span className={styles.guideResultSit}>{sg.situation}</span>
      </div>
      {sg.hadiths.map((h, i) => (
        <div key={i} className={styles.guideHadith}>
          <div className={styles.guideHadithText}>"{h.text}"</div>
          <div className={styles.guideHadithMeta}>
            <span className={styles.guideHadithNarrator} style={{ color: catColor }}>{h.narrator}</span>
            <span className={styles.guideHadithSource}>{h.source}</span>
          </div>
          <div className={styles.guideHadithRelevance}>{h.relevance}</div>
        </div>
      ))}
    </div>
  );
}

/* ???????????????????????????????????????????????????????????????????????
   FEATURE 55 ? PROPHETIC LETTERS ARCHIVE
   ????????????????????????????????????????????????????????????????????? */
function PropheticLettersSection() {
  const [selected, setSelected] = useState(null);
  const letter = selected !== null ? PROPHETIC_LETTERS[selected] : null;

  const RESPONSE_COLORS = {
    accepted: '#0a5c2e', rejected: '#8b1a38', partial: '#b8860b',
    delayed: '#2a5080', 'killed-envoy': '#4a0000',
  };

  return (
    <div>
      <div className={styles.sectionTitle}>Prophetic Letters Archive - Diplomatic Correspondence of the Prophet</div>
      <div className={styles.intro}>
        In 6-8 AH, the Prophet sent letters to every major ruler on earth - a unique moment
        in history where one man addressed the Byzantine Emperor, Persian Shahanshah, Egyptian
        Governor, and Abyssinian King simultaneously. 40+ letters - never visualized together.
      </div>

      {letter ? (
        <div className={styles.letterDetail}>
          <button className={styles.letterBack} onClick={() => setSelected(null)}>All Letters</button>
          <div className={styles.letterDetailCard} style={{ borderTopColor: letter.color }}>
            <div className={styles.letterDetailHeader}>
              <div>
                <span className={styles.letterNum}>Letter #{letter.id}</span>
                <h3 className={styles.letterRecipient}>{letter.recipient}</h3>
                <p className={styles.letterTitle}>{letter.recipientTitle}</p>
                <p className={styles.letterKingdom}>{letter.kingdom}</p>
              </div>
              <div className={styles.letterMeta}>
                <span className={styles.letterYear}>{letter.year} - {letter.yearAH} AH</span>
                <span
                  className={styles.letterResponse}
                  style={{ background: RESPONSE_COLORS[letter.responseType] + '22', color: RESPONSE_COLORS[letter.responseType], border: `1px solid ${RESPONSE_COLORS[letter.responseType]}44` }}
                >
                  {letter.responseType === 'accepted' ? 'Accepted Islam' :
                   letter.responseType === 'rejected' ? 'Rejected' :
                   letter.responseType === 'partial' ? 'Partial Response' :
                   letter.responseType === 'killed-envoy' ? 'Killed the Envoy' : 'Delayed'}
                </span>
              </div>
            </div>

            <div className={styles.letterOpeningBlock}>
              <div className={styles.letterOpeningAr} dir="rtl">{letter.openingAr}</div>
              <blockquote className={styles.letterOpeningEn}>{letter.openingEn}</blockquote>
            </div>

            <div className={styles.letterSection}>
              <h4>Scribe & Envoy</h4>
              <p>Scribe: <strong>{letter.scribe}</strong></p>
              <p>Envoy: <strong>{letter.envoy}</strong></p>
            </div>

            <div className={styles.letterSection}>
              <h4>The Response</h4>
              <p>{letter.response}</p>
            </div>

            <div className={styles.letterSection}>
              <h4>Historical Outcome</h4>
              <p>{letter.historicalOutcome}</p>
            </div>

            <div className={styles.letterSection}>
              <h4>Is the Letter Preserved?</h4>
              <p>{letter.letterPreserved}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.lettersGrid}>
          {PROPHETIC_LETTERS.map((l, i) => (
            <div
              key={i}
              className={styles.letterCard}
              style={{ borderTopColor: l.color, cursor: 'pointer' }}
              onClick={() => setSelected(i)}
            >
              <div className={styles.letterCardTop}>
                <span className={styles.letterCardNum} style={{ color: l.color }}>Letter {l.id}</span>
                <span className={styles.letterCardYear}>{l.yearAH} AH</span>
              </div>
              <h4 className={styles.letterCardRecipient}>{l.recipient}</h4>
              <p className={styles.letterCardTitle}>{l.recipientTitle}</p>
              <p className={styles.letterCardKingdom}>{l.kingdom}</p>
              <div className={styles.letterCardEnvoy}>
                <span>Envoy: {l.envoy}</span>
              </div>
              <div
                className={styles.letterCardStatus}
                style={{
                  background: RESPONSE_COLORS[l.responseType] + '15',
                  color: RESPONSE_COLORS[l.responseType],
                }}
              >
                {l.responseType === 'accepted' ? '? Accepted' :
                 l.responseType === 'rejected' ? '? Rejected' :
                 l.responseType === 'partial' ? '? Partial' : '? Delayed'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ???????????????????????????????????????????????????????????????????????
   FEATURE 59 ? COMPANION HAJJ RECORDS
   ????????????????????????????????????????????????????????????????????? */
function HajjRecordsSection() {
  const [activeRole, setActiveRole] = useState('all');
  const ROLES = ['all', 'leader', 'narrator', 'teacher', 'emotional', 'participant'];
  const ROLE_COLORS = {
    leader: '#b8860b', narrator: '#1a3462', teacher: '#0a5c2e',
    emotional: '#7a3060', participant: '#8b3a08',
  };

  const filtered = activeRole === 'all'
    ? HAJJ_RECORDS
    : HAJJ_RECORDS.filter(h => h.role === activeRole);

  return (
    <div>
      <div className={styles.sectionTitle}>Companion Hajj Records - Who Led, Who Taught, Who Wept</div>
      <div className={styles.intro}>
        Every recorded Hajj associated with a companion from the first official Islamic Hajj
        in 9 AH to the Farewell Pilgrimage and beyond. Sourced from classical sira and hadith.
      </div>

      <div className={styles.hajjRoleBar}>
        {ROLES.map(r => (
          <button
            key={r}
            className={`${styles.hajjRoleBtn} ${activeRole === r ? styles.hajjRoleActive : ''}`}
            style={activeRole === r && r !== 'all' ? { borderColor: ROLE_COLORS[r], color: ROLE_COLORS[r] } : undefined}
            onClick={() => setActiveRole(r)}
          >
            {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.hajjGrid}>
        {filtered.map((h, i) => (
          <div key={i} className={styles.hajjCard} style={{ borderLeftColor: h.color }}>
            <div className={styles.hajjCardTop}>
              <span
                className={styles.hajjRole}
                style={{ background: (ROLE_COLORS[h.role] || '#888') + '22', color: ROLE_COLORS[h.role] || '#888' }}
              >
                {h.role}
              </span>
              <span className={styles.hajjYear}>{h.year}</span>
            </div>
            <h4 className={styles.hajjCompanion} style={{ color: h.color }}>{h.companion}</h4>
            <p className={styles.hajjEvent}>{h.event}</p>
            <p className={styles.hajjDetail}>{h.detail}</p>
            <div className={styles.hajjUnique}>
              <span className={styles.hajjUniqueLabel}>Unique Fact</span>
              <p>{h.uniqueFact}</p>
            </div>
            <span className={styles.hajjSource}>{h.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????????????????????
   FEATURE 64 ? COMPANION WISDOM ON DEATH & AKHIRA
   ????????????????????????????????????????????????????????????????????? */
function WisdomOnDeathSection() {
  const [activeTheme, setActiveTheme] = useState('all');
  const [search, setSearch] = useState('');
  const THEMES = ['all', 'death', 'grave', 'judgment', 'paradise', 'hell', 'soul', 'preparation'];

  const filtered = AKHIRA_QUOTES.filter(q => {
    const matchTheme = activeTheme === 'all' || q.theme === activeTheme;
    const s = search.toLowerCase();
    const matchSearch = !s || q.quoteEn.toLowerCase().includes(s) || q.companion.toLowerCase().includes(s);
    return matchTheme && matchSearch;
  });

  const THEME_COLORS = {
    death: '#4a2000', grave: '#1a3030', judgment: '#3a0a0a', paradise: '#0a3d2e',
    hell: '#5a0000', soul: '#2a2050', preparation: '#2a3a10',
  };

  const OCC_ICONS = {
    deathbed: 'DB', reflection: 'RF', prayer: 'PR', sermon: 'SR', conversation: 'CV',
  };

  return (
    <div>
      <div className={styles.sectionTitle}>Companion Wisdom on Death &amp; the Akhira</div>
      <div className={styles.intro}>
        200+ curated statements the companions made about death, the grave, the Day of Judgment,
        and Paradise - in their own words, not from the Prophet. Never compiled digitally.
        Sourced from Hilyat al-Awliya, Tabaqat Ibn Sa'd, Shu'ab al-Iman, and Nahj al-Balagha.
      </div>

      <input
        className={styles.wisdomSearch}
        placeholder="Search quotes or companions?"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className={styles.wisdomThemes}>
        {THEMES.map(t => (
          <button
            key={t}
            className={`${styles.wisdomThemeBtn} ${activeTheme === t ? styles.wisdomThemeActive : ''}`}
            style={activeTheme === t && t !== 'all' ? { borderColor: THEME_COLORS[t] || '#888', color: '#c8b88a' } : undefined}
            onClick={() => setActiveTheme(t)}
          >
            {t === 'all' ? 'All Themes' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.wisdomCount}>{filtered.length} quote{filtered.length !== 1 ? 's' : ''}</div>

      <div className={styles.wisdomGrid}>
        {filtered.map((q, i) => (
          <div key={i} className={styles.wisdomCard} style={{ borderLeftColor: q.color }}>
            <div className={styles.wisdomCardTop}>
              <span className={styles.wisdomOcc} title={q.occasion}>{OCC_ICONS[q.occasion] || ''}</span>
              <span
                className={styles.wisdomThemeBadge}
                style={{ background: (THEME_COLORS[q.theme] || '#444') + '33', color: q.color }}
              >
                {q.theme}
              </span>
            </div>
            {q.quoteAr && <p className={`${styles.wisdomAr} ar`}>{q.quoteAr}</p>}
            <blockquote className={styles.wisdomEn} style={{ borderLeftColor: q.color }}>
              {q.quoteEn}
            </blockquote>
            <div className={styles.wisdomFooter}>
              <span className={styles.wisdomCompanion} style={{ color: q.color }}>{q.companion}</span>
              <span className={styles.wisdomContext}>{q.context}</span>
            </div>
            <span className={styles.wisdomSource}>{q.source}</span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.wisdomEmpty}>No quotes match your filter. Try a different theme or search.</div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 65 ? HADITH WORD CLOUD
// ???????????????????????????????????????????????????????
const WC_COMPANIONS = [
  { rank:17, name:'Abu Hurayra',    color:'#d4a820' },
  { rank:5,  name:'Aisha',          color:'#7a3060' },
  { rank:30, name:'Ibn Umar',       color:'#b8860b' },
  { rank:13, name:'Anas ibn Malik', color:'#0a5c2e' },
  { rank:19, name:'Ibn Abbas',      color:'#2a5080' },
  { rank:35, name:'Jabir',          color:'#8b3a08' },
];

function HadithWordCloud() {
  const [selected, setSelected] = useState(17);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const comp = WC_COMPANIONS.find(c => c.rank === selected)!;
  const words = HADITH_WORD_CLOUDS[selected] || [];
  const maxCount = Math.max(...words.map(w => w.count));

  // Lay out words in a rough spiral pattern
  const placed = words.map((w, i) => {
    const angle = i * 137.5 * (Math.PI / 180);
    const dist = Math.sqrt(i) * 38;
    const size = 12 + ((w.count / maxCount) * 32);
    return { ...w, size, x: 50 + dist * Math.cos(angle) / 5, y: 50 + dist * Math.sin(angle) / 5 };
  });

  return (
    <div className={styles.wcPage}>
      <div className={styles.sectionTitle}>Companion Hadith Word Cloud - Linguistic DNA</div>
      <p className={styles.intro}>The most frequent themes in each companion's narration corpus ? revealing their unique spiritual vocabulary. Abu Hurayra's narrations revolve around mercy and prayer; Aisha's around night worship and women's law; Ibn Abbas around Quranic interpretation.</p>
      <div className={styles.wcTabs}>
        {WC_COMPANIONS.map(c => (
          <button key={c.rank} className={`${styles.wcTab} ${selected === c.rank ? styles.wcTabActive : ''}`}
            style={selected === c.rank ? { borderBottomColor: c.color, color: c.color } : {}}
            onClick={() => setSelected(c.rank)}>
            {c.name}
          </button>
        ))}
      </div>
      <div className={styles.wcCanvas}>
        {placed.map(w => (
          <span key={w.word}
            className={styles.wcWord}
            style={{
              left: `${w.x}%`, top: `${w.y}%`,
              fontSize: `${w.size}px`,
              color: hoveredWord === w.word ? '#fff' : WORD_THEME_COLORS[w.theme] || comp.color,
              opacity: hoveredWord && hoveredWord !== w.word ? 0.3 : 1,
              fontWeight: w.count > maxCount * 0.7 ? 700 : 400,
            }}
            onMouseEnter={() => setHoveredWord(w.word)}
            onMouseLeave={() => setHoveredWord(null)}>
            {w.word}
          </span>
        ))}
      </div>
      {hoveredWord && (() => {
        const wData = words.find(w => w.word === hoveredWord);
        return wData ? (
          <div className={styles.wcTooltip} style={{ borderColor: WORD_THEME_COLORS[wData.theme] }}>
            <strong style={{ color: WORD_THEME_COLORS[wData.theme] }}>{wData.word}</strong>
            <span>Frequency: {wData.count} narrations</span>
            <span className={styles.wcThemeBadge} style={{ background: WORD_THEME_COLORS[wData.theme] + '30', color: WORD_THEME_COLORS[wData.theme] }}>{wData.theme}</span>
          </div>
        ) : null;
      })()}
      <div className={styles.wcLegend}>
        {Object.entries(WORD_THEME_COLORS).map(([theme, color]) => (
          <span key={theme} className={styles.wcLegendItem} style={{ color }}>* {theme}</span>
        ))}
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 67 ? BATTLE CASUALTY HEATMAP
// ???????????????????????????????????????????????????????
function BattleCasualtyHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const cellColor = (val: number) => {
    if (val === 0) return '#0d1117';
    const alpha = val / 10;
    return `rgba(180,30,30,${alpha})`;
  };

  return (
    <div className={styles.hmPage}>
      <div className={styles.sectionTitle}>Battle Casualty Heatmap - Martyrdom Concentration</div>
      <p className={styles.intro}>Color intensity shows martyrdom concentration. Uhud killed primarily Ansar warriors; Yamama decimated the Quran memorizers; Yarmouk fell heavily on senior generals. Hover cells for detail.</p>
      <div className={styles.hmScroll}>
        <table className={styles.hmTable}>
          <thead>
            <tr>
              <th className={styles.hmCorner}>Battle</th>
              {HEATMAP_CATS.map(c => <th key={c} className={styles.hmCatHead}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_BATTLES.map((b, bi) => (
              <tr key={b}>
                <td className={styles.hmBattleLabel}>{b}</td>
                {HEATMAP_CATS.map((c, ci) => {
                  const val = HEATMAP_VALUES[bi][ci];
                  const key = `${b}_${c}`;
                  const note = HEATMAP_NOTES[key];
                  return (
                    <td key={c}
                      className={styles.hmCell}
                      style={{ background: cellColor(val) }}
                      onMouseEnter={() => setHoveredCell(key)}
                      onMouseLeave={() => setHoveredCell(null)}>
                      {val > 0 && <span className={styles.hmVal}>{val}</span>}
                      {note && <span className={styles.hmHotspot}>!</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hoveredCell && (() => {
        const [battle, cat] = hoveredCell.split('_');
        const bi = HEATMAP_BATTLES.indexOf(battle);
        const ci = HEATMAP_CATS.indexOf(cat);
        const val = bi >= 0 && ci >= 0 ? HEATMAP_VALUES[bi][ci] : 0;
        const note = HEATMAP_NOTES[hoveredCell];
        return (
          <div className={styles.hmTooltip}>
            <strong>{battle} - {cat}</strong>
            <span>Intensity: {val}/10</span>
            {note && <p>{note}</p>}
          </div>
        );
      })()}
      <div className={styles.hmScale}>
        <span>Low</span>
        {[1,2,3,4,5,6,7,8,9,10].map(v => (
          <span key={v} className={styles.hmScaleCell} style={{ background: cellColor(v) }}>{v}</span>
        ))}
        <span>High</span>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 68 ? 23-YEAR REVELATION TIMELINE
// ???????????????????????????????????????????????????????
const CAT_COLORS_REV: Record<string, string> = {
  command: '#d4a820', defense: '#8b1a38', consolation: '#0a5c2e',
  law: '#1a3462', story: '#509070', prophecy: '#7a3060',
};

function RevelationTimeline() {
  const [selected, setSelected] = useState<number | null>(null);
  const ev = selected !== null ? REVELATION_EVENTS.find(e => e.id === selected) : null;

  const getX = (e: typeof REVELATION_EVENTS[0]) => {
    const year = e.yearAH !== undefined ? e.yearAH : -(e.yearBH || 0);
    return ((year + 13) / 23) * 100;
  };

  return (
    <div className={styles.revPage}>
      <div className={styles.sectionTitle}>The 23-Year Revelation Timeline</div>
      <p className={styles.intro}>Each major ayah as a glowing pulse on the timeline of prophethood ? tagged with the companion or event that triggered it. Scroll right to see all 23 years unfold.</p>
      <div className={styles.revLegend}>
        {Object.entries(CAT_COLORS_REV).map(([cat, col]) => (
          <span key={cat} className={styles.revLegendItem} style={{ color: col }}>* {cat}</span>
        ))}
      </div>
      <div className={styles.revTrackWrap}>
        <div className={styles.revTrack}>
          {/* Year markers */}
          {[-13,-10,-5,0,5,10].map(yr => (
            <div key={yr} className={styles.revYearMark} style={{ left: `${((yr+13)/23)*100}%` }}>
              <span>{yr < 0 ? `${-yr}BH` : `${yr}AH`}</span>
            </div>
          ))}
          <div className={styles.revHijraLine} style={{ left: `${(13/23)*100}%` }}>
            <span>Hijra</span>
          </div>
          {REVELATION_EVENTS.map(e => (
            <button key={e.id}
              className={`${styles.revPulse} ${selected === e.id ? styles.revPulseActive : ''}`}
              style={{
                left: `${getX(e)}%`,
                background: CAT_COLORS_REV[e.category],
                boxShadow: selected === e.id ? `0 0 16px 4px ${CAT_COLORS_REV[e.category]}` : `0 0 8px 2px ${CAT_COLORS_REV[e.category]}66`,
              }}
              onClick={() => setSelected(selected === e.id ? null : e.id)}
              title={e.ayahRef}>
            </button>
          ))}
        </div>
      </div>
      {ev && (
        <div className={styles.revDetail} style={{ borderColor: CAT_COLORS_REV[ev.category] }}>
          <div className={styles.revDetailHeader}>
            <span className={styles.revRef} style={{ color: CAT_COLORS_REV[ev.category] }}>{ev.surah} ? {ev.ayahRef}</span>
            <span className={styles.revCatBadge} style={{ background: CAT_COLORS_REV[ev.category] + '30', color: CAT_COLORS_REV[ev.category] }}>{ev.category}</span>
            <span className={styles.revYear}>{ev.yearAH !== undefined ? `${ev.yearAH} AH` : `${ev.yearBH} BH`}</span>
          </div>
          <p className={`${styles.revAr} ar`}>{ev.ayahAr}</p>
          <blockquote className={styles.revEn}>{ev.ayahEn}</blockquote>
          <div className={styles.revTrigger}><strong>Trigger:</strong> {ev.trigger}</div>
          <p className={styles.revStory}>{ev.story}</p>
        </div>
      )}
      {!ev && <p className={styles.revHint}>Click any glowing point to see the ayah, its trigger, and the story behind it.</p>}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 69 ? CALIPH TERRITORY SNAPSHOTS
// ???????????????????????????????????????????????????????
function CaliphTerritories() {
  const [selected, setSelected] = useState(0);
  const caliph = CALIPH_TERRITORIES[selected];

  return (
    <div className={styles.ctPage}>
      <div className={styles.sectionTitle}>Islamic World at Each Caliph's Death - Territory Snapshots</div>
      <p className={styles.intro}>Four snapshots of the Muslim world ? showing which companions governed which province at the death of each Rashidun Caliph. The growth in 30 years is staggering.</p>
      <div className={styles.ctTabs}>
        {CALIPH_TERRITORIES.map((c, i) => (
          <button key={i}
            className={`${styles.ctTab} ${selected === i ? styles.ctTabActive : ''}`}
            style={selected === i ? { borderBottomColor: c.color, color: c.color } : {}}
            onClick={() => setSelected(i)}>
            {c.caliph.split(' ')[0]} {c.caliph.split(' ')[1]}
          </button>
        ))}
      </div>
      <div className={styles.ctCard} style={{ borderColor: caliph.color }}>
        <div className={styles.ctCardHeader}>
          <h3 style={{ color: caliph.color }}>{caliph.caliph}</h3>
          <span className={styles.ctYear}>{caliph.yearDied}</span>
        </div>
        <p className={styles.ctSummary}>{caliph.summary}</p>
        <div className={styles.ctArea}><strong>Territory:</strong> {caliph.totalArea}</div>
        <div className={styles.ctProvinces}>
          {caliph.provinces.map((p, i) => (
            <div key={i} className={styles.ctProvince} style={{ borderLeftColor: caliph.color }}>
              <div className={styles.ctProvName}>{p.name}</div>
              <div className={styles.ctProvGov}>Gov: <strong>{p.governor}</strong></div>
              {p.notes && <div className={styles.ctProvNote}>{p.notes}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 72 ? COMPANION STATUS ARCS (Bump Chart)
// ???????????????????????????????????????????????????????
function CompanionStatusArcs() {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 700, H = 320, PAD = 80;
  const eraCount = STATUS_ERAS.length;
  const maxRank = 12;

  const getX = (eraIdx: number) => PAD + (eraIdx / (eraCount - 1)) * (W - 2 * PAD);
  const getY = (rank: number | null) => rank === null ? -30 : PAD + ((rank - 1) / (maxRank - 1)) * (H - 2 * PAD);

  return (
    <div className={styles.saPage}>
      <div className={styles.sectionTitle}>Companion Status Arcs - How Influence Evolved</div>
      <p className={styles.intro}>A bump chart showing each major companion's relative status/influence across 5 eras. Hover a line to see their journey.</p>
      <div className={styles.saWrap}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.saSvg}>
          {/* Era labels */}
          {STATUS_ERAS.map((era, i) => (
            <text key={i} x={getX(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#888" className={styles.saEraLabel}>
              {era.split('\n')[0]}
            </text>
          ))}
          {STATUS_ERAS.map((era, i) => (
            <text key={`sub${i}`} x={getX(i)} y={H} textAnchor="middle" fontSize="8" fill="#555">
              {era.split('\n')[1]}
            </text>
          ))}
          {/* Grid lines */}
          {STATUS_ERAS.map((_, i) => (
            <line key={i} x1={getX(i)} y1={PAD - 10} x2={getX(i)} y2={H - PAD + 10} stroke="#222" strokeWidth="1" />
          ))}
          {/* Lines */}
          {STATUS_ARCS.map(arc => {
            const points = arc.statusByEra
              .map((rank, i) => rank !== null ? { x: getX(i), y: getY(rank) } : null);
            const segments: string[] = [];
            let seg: string[] = [];
            points.forEach((pt, i) => {
              if (pt) {
                seg.push(`${i === 0 || seg.length === 0 ? 'M' : 'L'}${pt.x},${pt.y}`);
              } else {
                if (seg.length > 0) { segments.push(seg.join(' ')); seg = []; }
              }
            });
            if (seg.length > 0) segments.push(seg.join(' '));
            const isHov = hovered === arc.rank;
            return (
              <g key={arc.rank} onMouseEnter={() => setHovered(arc.rank)} onMouseLeave={() => setHovered(null)}>
                {segments.map((d, si) => (
                  <path key={si} d={d} fill="none"
                    stroke={arc.color}
                    strokeWidth={isHov ? 3 : 1.5}
                    strokeOpacity={hovered !== null && !isHov ? 0.15 : 0.9}
                    strokeLinejoin="round" />
                ))}
                {points.map((pt, i) => pt && (
                  <circle key={i} cx={pt.x} cy={pt.y} r={isHov ? 5 : 3}
                    fill={arc.color} opacity={hovered !== null && !isHov ? 0.15 : 1} />
                ))}
                {points[0] && (
                  <text x={PAD - 4} y={getY(arc.statusByEra[0] || 8) + 4}
                    textAnchor="end" fontSize="9" fill={arc.color}
                    opacity={hovered !== null && !isHov ? 0.15 : 1}>
                    {arc.name.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
          {/* Y-axis label */}
          <text x={16} y={H / 2} textAnchor="middle" fontSize="9" fill="#666" transform={`rotate(-90,16,${H/2})`}>Relative Influence (lower = higher)</text>
        </svg>
      </div>
      {hovered && (() => {
        const arc = STATUS_ARCS.find(a => a.rank === hovered);
        return arc ? (
          <div className={styles.saDetail} style={{ borderColor: arc.color }}>
            <strong style={{ color: arc.color }}>{arc.name}</strong>
            <p>{arc.arc}</p>
            <div className={styles.saEraRow}>
              {STATUS_ERAS.map((era, i) => (
                <div key={i} className={styles.saEraBit}>
                  <span className={styles.saEraName}>{era.split('\n')[0]}</span>
                  <span className={styles.saEraVal} style={{ color: arc.color }}>
                    {arc.statusByEra[i] !== null ? `#${arc.statusByEra[i]}` : '?'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })()}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 74 ? IBADAH INTENSITY CHART
// ???????????????????????????????????????????????????????
function IbadahIntensity() {
  const [selected, setSelected] = useState<number | null>(null);
  const maxMetric = 100;
  const item = selected !== null ? IBADAH_DATA[selected] : null;

  return (
    <div className={styles.ibPage}>
      <div className={styles.sectionTitle}>Ibadah Intensity Chart - Documented Acts of Worship</div>
      <p className={styles.intro}>A visual comparison of documented worship habits ? quantified from classical hadith and sira narrations. Abu Bakr prayed all night weeping; Uthman completed the Quran in a single night's prayer; Ali performed 1,000 rak'ahs per month.</p>
      <div className={styles.ibBars}>
        {IBADAH_DATA.map((d, i) => (
          <div key={i} className={`${styles.ibBar} ${selected === i ? styles.ibBarActive : ''}`}
            onClick={() => setSelected(selected === i ? null : i)}>
            <div className={styles.ibBarLabel}>
              <span className={styles.ibName}>{d.companion}</span>
              <span className={styles.ibPractice}>{d.practice}</span>
            </div>
            <div className={styles.ibBarTrack}>
              <div className={styles.ibBarFill}
                style={{ width: `${(d.metric / maxMetric) * 100}%`, background: d.color }} />
              <span className={styles.ibIntensity} style={{ color: d.color }}>{d.intensity}</span>
            </div>
          </div>
        ))}
      </div>
      {item && (
        <div className={styles.ibDetail} style={{ borderColor: item.color }}>
          <div className={styles.ibDetailHeader}>
            <strong style={{ color: item.color }}>{item.companion}</strong>
            <span className={styles.ibDetailPractice}>{item.practice}</span>
          </div>
          <p className={styles.ibDetailText}>{item.detail}</p>
          <span className={styles.ibDetailSource}>Source: {item.source}</span>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 75 ? GENEROSITY LEADERBOARD
// ???????????????????????????????????????????????????????
function GenerosityLeaderboard() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? GENEROSITY_DATA[selected] : null;

  return (
    <div className={styles.genPage}>
      <div className={styles.sectionTitle}>Generosity Leaderboard - What They Gave &amp; When</div>
      <p className={styles.intro}>Ranked visualization of the greatest documented acts of giving by the companions ? amounts, occasions, percentage of total wealth, and the specific context. Sourced entirely from hadith and classical history.</p>
      <div className={styles.genList}>
        {GENEROSITY_DATA.map((g, i) => (
          <div key={i} className={`${styles.genItem} ${selected === i ? styles.genItemActive : ''}`}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{ borderLeftColor: g.color }}>
            <div className={styles.genRankBadge} style={{ background: g.color }}>#{g.rank}</div>
            <div className={styles.genInfo}>
              <div className={styles.genName} style={{ color: g.color }}>{g.companion}</div>
              <div className={styles.genOccasion}>{g.occasion}</div>
              <div className={styles.genAmount}>{g.amount}</div>
            </div>
            <div className={styles.genPercent} style={{ color: g.color }}>{g.percentOfWealth}</div>
          </div>
        ))}
      </div>
      {item && (
        <div className={styles.genDetail} style={{ borderColor: item.color }}>
          <div className={styles.genDetailHeader}>
            <strong style={{ color: item.color }}>{item.companion}</strong>
            <span>{item.occasion}</span>
          </div>
          <blockquote className={styles.genContext}>{item.context}</blockquote>
          <p className={styles.genImpact}><strong>Impact:</strong> {item.impact}</p>
          <p className={styles.genSource}>Source: {item.source}</p>
        </div>
      )}
    </div>
  );
}

// ???????????????????????????????????????????????????????
// ? FEATURE 76 ? FAMOUS KHUTBAS ARCHIVE
// ???????????????????????????????????????????????????????
function KhutbaArchive() {
  const [selected, setSelected] = useState<number | null>(null);
  const speech = selected !== null ? KHUTBA_ARCHIVE.find(s => s.id === selected) : null;

  return (
    <div className={styles.khPage}>
      <div className={styles.sectionTitle}>Famous Khutbas of the Companions - Speech Archive</div>
      <p className={styles.intro}>Every major public address delivered by a companion ? with Arabic excerpts, full context, audience, and historical impact. From Abu Bakr's first speech as Caliph to Ali's philosophical addresses in Nahj al-Balagha.</p>
      <div className={styles.khGrid}>
        {KHUTBA_ARCHIVE.map(s => (
          <div key={s.id}
            className={`${styles.khCard} ${selected === s.id ? styles.khCardActive : ''}`}
            style={{ borderTopColor: s.color }}
            onClick={() => setSelected(selected === s.id ? null : s.id)}>
            <div className={styles.khCardTop}>
              <span className={styles.khCompanion} style={{ color: s.color }}>{s.companion}</span>
              <span className={styles.khYear}>{s.year}</span>
            </div>
            <div className={styles.khTitle}>{s.title}</div>
            <div className={styles.khOccasion}>{s.occasion}</div>
          </div>
        ))}
      </div>
      {speech && (
        <div className={styles.khDetail} style={{ borderColor: speech.color }}>
          <div className={styles.khDetailHeader}>
            <strong style={{ color: speech.color }}>{speech.companion}</strong>
            <span className={styles.khDetailTitle}>{speech.title}</span>
            <span className={styles.khDetailYear}>{speech.year} ? {speech.occasion}</span>
          </div>
          <div className={styles.khAudience}><strong>Audience:</strong> {speech.audience}</div>
          <blockquote className={`${styles.khAr} ar`}>{speech.excerptAr}</blockquote>
          <blockquote className={styles.khEn}>{speech.excerptEn}</blockquote>
          <p className={styles.khImpact}><strong>Historical Impact:</strong> {speech.impact}</p>
          <p className={styles.khLegacy}><strong>Legacy:</strong> {speech.legacy}</p>
          <span className={styles.khSource}>Source: {speech.source}</span>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 77 ? PERSONALITY QUIZ
// -------------------------------------------------------
function PersonalityQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<typeof QUIZ_ARCHETYPES[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (qId: number, optIdx: number) => {
    const newAnswers = { ...answers, [qId]: optIdx };
    setAnswers(newAnswers);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      // Calculate result
      const scores: Record<string, number> = {};
      Object.entries(newAnswers).forEach(([qIdStr, optIdx]) => {
        const q = QUIZ_QUESTIONS.find(q => q.id === parseInt(qIdStr));
        if (!q) return;
        const opt = q.options[optIdx];
        opt.archetypes.forEach(a => { scores[a] = (scores[a] || 0) + 1; });
      });
      const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
      setResult(QUIZ_ARCHETYPES.find(a => a.id === topId) || QUIZ_ARCHETYPES[0]);
    }
  };

  const reset = () => { setAnswers({}); setResult(null); setCurrentQ(0); };

  if (result) {
    return (
      <div className={styles.quizResult}>
        <div className={styles.sectionTitle}>Your Companion Archetype</div>
        <div className={styles.quizResultCard} style={{ borderColor: result.color }}>
          <div className={styles.quizResultTop} style={{ background: result.color + '15' }}>
            <span className={`${styles.quizResultAr} ar`}>{result.nameAr}</span>
            <h2 className={styles.quizResultName} style={{ color: result.color }}>{result.name}</h2>
            <span className={styles.quizResultTitle}>{result.title}</span>
          </div>
          <p className={styles.quizResultSummary}>{result.traitSummary}</p>
          <ul className={styles.quizTraits}>
            {result.traitDetails.map((t, i) => (
              <li key={i} className={styles.quizTrait}>{t}</li>
            ))}
          </ul>
          <blockquote className={styles.quizHadith} style={{ borderLeftColor: result.color }}>
            {result.supportingHadith}
          </blockquote>
          <p className={styles.quizSource}>{result.source}</p>
          <p className={styles.quizWhy}><strong>Why this match:</strong> {result.whyMatch}</p>
          <button className={styles.quizRetry} onClick={reset}>Take Quiz Again</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQ];
  const progress = (currentQ / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className={styles.quizPage}>
      <div className={styles.sectionTitle}>Which Companion Are You?</div>
      <p className={styles.intro}>12 questions built from actual companion behaviors and documented character traits ? not a generic personality test. Each question reflects a real Islamic dilemma or behavioral choice.</p>
      <div className={styles.quizProgress}>
        <div className={styles.quizProgressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.quizQNum}>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</div>
      <div className={styles.quizCard}>
        <div className={styles.quizQuestion}>{q.question}</div>
        <p className={styles.quizContext}>{q.context}</p>
        <div className={styles.quizOptions}>
          {q.options.map((opt, i) => (
            <button key={i}
              className={`${styles.quizOpt} ${answers[q.id] === i ? styles.quizOptSelected : ''}`}
              onClick={() => handleAnswer(q.id, i)}>
              <span className={styles.quizOptLetter}>{String.fromCharCode(65 + i)}</span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      {currentQ > 0 && (
        <button className={styles.quizBack} onClick={() => setCurrentQ(c => c - 1)}>Back</button>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 79 ? DILEMMA SIMULATOR
// -------------------------------------------------------
function DilemmaSimulator() {
  const [selected, setSelected] = useState<number | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const scenario = selected !== null ? DILEMMA_SCENARIOS.find(s => s.id === selected) : null;

  const handleSelect = (id: number) => {
    setSelected(id); setChosen(null); setRevealed(false);
  };

  const handleChoose = (idx: number) => {
    setChosen(idx); setRevealed(true);
  };

  return (
    <div className={styles.dilPage}>
      <div className={styles.sectionTitle}>"What Would You Do?" - Companion Dilemma Simulator</div>
      <p className={styles.intro}>Real historical dilemmas faced by companions ? presented as branching decisions. Choose your path, then see what the companion actually did and the hadith explaining why.</p>
      <div className={styles.dilGrid}>
        {DILEMMA_SCENARIOS.map(s => (
          <button key={s.id}
            className={`${styles.dilCard} ${selected === s.id ? styles.dilCardActive : ''}`}
            style={{ borderTopColor: s.color }}
            onClick={() => handleSelect(s.id)}>
            <span className={styles.dilComp} style={{ color: s.color }}>{s.companion}</span>
            <span className={styles.dilTitle}>{s.title}</span>
            <span className={styles.dilYear}>{s.year}</span>
          </button>
        ))}
      </div>

      {scenario && (
        <div className={styles.dilScenario}>
          <div className={styles.dilSetup}>
            <div className={styles.dilSetupHeader}>
              <span className={`${styles.dilSetupAr} ar`}>{scenario.companionAr}</span>
              <strong style={{ color: scenario.color }}>{scenario.companion}</strong>
              <span className={styles.dilSetupYear}>{scenario.year}</span>
            </div>
            <h3 className={styles.dilSetupTitle}>{scenario.title}</h3>
            <p className={styles.dilSetupText}>{scenario.setup}</p>
          </div>

          <div className={styles.dilChoices}>
            {scenario.choices.map((ch, i) => (
              <button key={i}
                className={`${styles.dilChoice} ${revealed && chosen === i ? (ch.isReal ? styles.dilChoiceReal : styles.dilChoiceWrong) : ''}`}
                style={revealed && chosen === i ? { borderColor: ch.color } : {}}
                onClick={() => !revealed && handleChoose(i)}>
                <span className={styles.dilChoiceLetter}>{String.fromCharCode(65 + i)}</span>
                <span className={styles.dilChoiceText}>{ch.text}</span>
                {revealed && <span className={styles.dilChoiceBadge} style={{ background: ch.color }}>{ch.isReal ? '? Real Choice' : '? Not chosen'}</span>}
              </button>
            ))}
          </div>

          {revealed && chosen !== null && (
            <div className={styles.dilReveal} style={{ borderColor: scenario.color }}>
              <div className={styles.dilRevealHeader}>
                {scenario.choices[chosen].isReal
                  ? <span className={styles.dilRevealMatch}>You matched the companion's choice ?</span>
                  : <span className={styles.dilRevealNoMatch}>The companion chose differently</span>}
              </div>
              <div className={styles.dilOutcome}>
                <strong>Outcome of the real choice:</strong>
                <p>{scenario.choices.find(c => c.isReal)?.outcome}</p>
              </div>
              <blockquote className={styles.dilHadith} style={{ borderLeftColor: scenario.color }}>
                {scenario.realChoiceHadith}
              </blockquote>
              <p className={styles.dilHadithSource}>{scenario.source}</p>
              <p className={styles.dilLesson}><strong>The lesson:</strong> {scenario.lesson}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 82 ? BATTLE ROLE SIMULATOR
// -------------------------------------------------------
function BattleSimulator() {
  const [selectedBattle, setSelectedBattle] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const battle = selectedBattle ? SIM_BATTLES.find(b => b.id === selectedBattle) : null;

  return (
    <div className={styles.bsPage}>
      <div className={styles.sectionTitle}>Battle Role Simulator - Assign Your Army</div>
      <p className={styles.intro}>Pick a battle and see each position, then reveal the Prophet's actual deployment. Compare your intuition with the brilliant strategic placements that changed history.</p>
      <div className={styles.bsBattlePicker}>
        {SIM_BATTLES.map(b => (
          <button key={b.id}
            className={`${styles.bsBattleBtn} ${selectedBattle === b.id ? styles.bsBattleBtnActive : ''}`}
            style={selectedBattle === b.id ? { borderColor: b.color, color: b.color } : {}}
            onClick={() => { setSelectedBattle(b.id); setRevealed(false); }}>
            {b.name}
            <span className={styles.bsBattleYear}>{b.year}</span>
          </button>
        ))}
      </div>

      {battle && (
        <div className={styles.bsContent}>
          <p className={styles.bsIntro}>{battle.intro}</p>

          {/* Battlefield SVG */}
          <div className={styles.bsMapWrap}>
            <svg viewBox="0 0 400 280" className={styles.bsSvg}>
              <rect width={400} height={280} fill="#0d1a0a" rx={8} />
              {/* Enemy line */}
              <rect x={0} y={0} width={400} height={60} fill="rgba(139,26,56,.15)" />
              <text x={200} y={35} textAnchor="middle" fontSize={11} fill="#8b1a3888">ENEMY FORCES</text>
              {/* Muslim side */}
              <rect x={0} y={220} width={400} height={60} fill="rgba(10,92,46,.1)" />
              <text x={200} y={255} textAnchor="middle" fontSize={11} fill="rgba(10,92,46,.6)">MUSLIM FORCES</text>

              {battle.positions.map(pos => (
                <g key={pos.id}>
                  <circle cx={pos.x * 4} cy={pos.y * 2.8} r={22}
                    fill={revealed ? battle.color + '22' : '#1a1a1a'}
                    stroke={battle.color} strokeWidth={1.5} strokeOpacity={0.6} />
                  <text x={pos.x * 4} y={pos.y * 2.8 - 5}
                    textAnchor="middle" fontSize={8} fill={battle.color} fontWeight="700">
                    {pos.label.split(' ').slice(0, 2).join(' ')}
                  </text>
                  {revealed && (() => {
                    const dep = battle.actualDeployment.find(d => d.positionId === pos.id);
                    return dep ? (
                      <text x={pos.x * 4} y={pos.y * 2.8 + 8}
                        textAnchor="middle" fontSize={7} fill="#fff" opacity={0.8}>
                        {dep.companionName.split(' ').slice(0, 2).join(' ')}
                      </text>
                    ) : null;
                  })()}
                </g>
              ))}
            </svg>
          </div>

          <button className={styles.bsRevealBtn}
            style={{ background: revealed ? '#333' : battle.color }}
            onClick={() => setRevealed(!revealed)}>
            {revealed ? '? Hide Deployment' : `? Reveal Prophet's ? Actual Deployment`}
          </button>

          {revealed && (
            <div className={styles.bsDeployments}>
              {battle.actualDeployment.map((dep, i) => {
                const pos = battle.positions.find(p => p.id === dep.positionId);
                return (
                  <div key={i} className={styles.bsDeployment} style={{ borderLeftColor: battle.color }}>
                    <div className={styles.bsDepHeader}>
                      <span className={styles.bsDepPos} style={{ color: battle.color }}>{pos?.label}</span>
                      <span className={styles.bsDepComp}>{dep.companionName}</span>
                    </div>
                    <p className={styles.bsDepReason}>{dep.reason}</p>
                  </div>
                );
              })}
              <div className={styles.bsStratNote} style={{ borderColor: battle.color }}>
                <strong>Strategic Note:</strong> {battle.strategicNote}
              </div>
              <div className={styles.bsOutcome}><strong>Outcome:</strong> {battle.outcome}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------
// ? FEATURE 85 ? DAY-BY-DAY EVENT RECONSTRUCTION
// -------------------------------------------------------
function DayByDayReconstruction() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeMoment, setActiveMoment] = useState(0);

  const event = selectedEvent ? RECONSTRUCTION_EVENTS.find(e => e.id === selectedEvent) : null;
  const moment = event ? event.moments[activeMoment] : null;

  const handleEventSelect = (id: string) => {
    setSelectedEvent(id); setActiveMoment(0);
  };

  return (
    <div className={styles.rcPage}>
      <div className={styles.sectionTitle}>Day-by-Day Event Reconstruction</div>
      <p className={styles.intro}>For 4 pivotal events ? a scrollable reconstruction naming which companion was where at each moment. Sourced entirely from authenticated narrations.</p>
      <div className={styles.rcPicker}>
        {RECONSTRUCTION_EVENTS.map(e => (
          <button key={e.id}
            className={`${styles.rcEventBtn} ${selectedEvent === e.id ? styles.rcEventBtnActive : ''}`}
            style={selectedEvent === e.id ? { borderBottomColor: e.color, color: e.color } : {}}
            onClick={() => handleEventSelect(e.id)}>
            {e.title}
          </button>
        ))}
      </div>

      {event && (
        <div className={styles.rcContent}>
          <p className={styles.rcIntro}>{event.intro}</p>
          <div className={styles.rcLayout}>
            <div className={styles.rcTimeline}>
              {event.moments.map((m, i) => (
                <button key={i}
                  className={`${styles.rcMomentBtn} ${activeMoment === i ? styles.rcMomentActive : ''}`}
                  style={activeMoment === i ? { borderLeftColor: event.color } : {}}
                  onClick={() => setActiveMoment(i)}>
                  <span className={styles.rcTime}>{m.time}</span>
                  <span className={styles.rcMomentTitle}>{m.event}</span>
                  <span className={styles.rcLocation}>{m.location}</span>
                </button>
              ))}
            </div>
            {moment && (
              <div className={styles.rcDetail} style={{ borderColor: event.color }}>
                <div className={styles.rcDetailHeader}>
                  <span className={styles.rcDetailTime} style={{ color: event.color }}>{moment.time}</span>
                  <h3 className={styles.rcDetailEvent}>{moment.event}</h3>
                  <span className={styles.rcDetailLocation}>{moment.location}</span>
                </div>
                <div className={styles.rcCompanions}>
                  <strong>Present:</strong>
                  {moment.companions.map((c, i) => (
                    <span key={i} className={styles.rcCompanion} style={{ color: event.color }}>{c}</span>
                  ))}
                </div>
                <p className={styles.rcDetailText}>{moment.detail}</p>
                {moment.significance && (
                  <div className={styles.rcSignificance} style={{ borderColor: event.color }}>
                    <strong>Why this moment matters:</strong> {moment.significance}
                  </div>
                )}
                <span className={styles.rcSource}>{moment.source}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
