// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';
import { ISNAD_NODES, VALID_CHAINS, FIQH_ROOTS } from '../../data/imamsExtra2';
import { QIRAAT_SEVEN, QAWL_SAHABI, IJTIHAD_CHANGES, IMAM_AHADITH } from '../../data/imamsExtra3';
import { loadLoveRespectHadiths } from '../../data/loveRespectHadiths';
import {
  IMAMS, IM_NODES, IM_ERAS, ISNADS_DATA,
  LEGACY_SCHOOLS, MODERN_SCHOLARS, INSTITUTIONS,
  IMAM_COLORS, IMAM_BG,
} from '../../data/imams';
import type { Imam } from '../../data/imams';
import {
  JARH_TADIL, HOUSEHOLD_STAFF, SAHABIYYAT, CONVERTS_DATA,
  DIASPORA_CENTERS, FINAL_CIRCLE,
} from '../../data/imamsExtra';
import { LAQAB_DATA } from '../../data/laqab';
import { COMPANIONS } from '../../data/companions';
import { SITUATION_GUIDES } from '../../data/insightsExtra';
import { useT } from '../../i18n/useT';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ImamsPage.module.css';

const MADHAB_LABEL: Record<string, string> = {
  hf: 'Hanafi', ml: 'Maliki', sf: "Shafi'i", hb: 'Hanbali', all: 'Multi', had: 'Hadith',
};

const MADHAB_COLORS = {
  hf: '#b8860b', ml: '#0a5c2e', sf: '#1a3462', hb: '#7a1010',
};

function AhadithTab() {
  const t = useT();
  const { lang } = useLanguage();
  const collections = IMAM_AHADITH;
  const [imamKey, setImamKey] = useState(collections[0]?.imamKey ?? 'hf');
  const col = collections.find(c => c.imamKey === imamKey) ?? collections[0];
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [mode, setMode] = useState<'imam' | 'love'>('imam');
  const [loveData, setLoveData] = useState<any[] | null>(null);
  const [loveTag, setLoveTag] = useState<string>('all');
  const [loveLoading, setLoveLoading] = useState(false);

  useEffect(() => {
    if (mode !== 'love' || loveData) return;
    setLoveLoading(true);
    loadLoveRespectHadiths().then(d => {
      setLoveData((d || []).map((h: any, i: number) => ({ id: `lr-${i + 1}`, ...h })));
      setLoveLoading(false);
    }).catch(() => setLoveLoading(false));
  }, [mode, loveData]);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch { /* ignore */ }
    }
  };

  const filteredImam = useMemo(() => {
    const hs = col?.hadiths ?? [];
    const qq = q.trim().toLowerCase();
    if (!qq) return hs;
    return hs.filter(h =>
      h.topic.toLowerCase().includes(qq) ||
      (h.topicUr || '').toLowerCase().includes(qq) ||
      h.en.toLowerCase().includes(qq) ||
      (h.ur || '').toLowerCase().includes(qq) ||
      h.ar.toLowerCase().includes(qq) ||
      h.source.toLowerCase().includes(qq)
    );
  }, [col, q]);

  const filteredLove = useMemo(() => {
    if (!loveData) return [];
    const qq = q.trim().toLowerCase();
    return loveData.filter((h: any) => {
      const tagOk = loveTag === 'all' || (h.tags || []).includes(loveTag);
      if (!tagOk) return false;
      if (!qq) return true;
      return (
        (h.ar || '').includes(qq) ||
        (h.en || '').toLowerCase().includes(qq) ||
        (h.ur || '').includes(qq) ||
        (h.src || '').toLowerCase().includes(qq)
      );
    });
  }, [loveData, loveTag, q]);

  if (!col) return null;

  const preview = (text: string) => {
    const words = (text ?? '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    return words.slice(0, 7).join(' ') + (words.length > 7 ? '…' : '');
  };

  // Keep the Love & Respect count accurate (loader dataset may not match the old fixed "150").
  const loveLabelBase = t('ahadith.mode.love');
  const loveLabelStripped = loveLabelBase
    .replace(/\(\s*[\d\u0660-\u0669\u06f0-\u06f9]+\s*\)\s*$/u, '')
    .trim();
  const loveLabelCount = loveData ? loveData.length : null;
  const loveLabelCountStr = loveLabelCount == null
    ? ''
    : (lang === 'ur' ? new Intl.NumberFormat('ur-PK').format(loveLabelCount) : String(loveLabelCount));
  const loveLabel = loveLabelCountStr ? `${loveLabelStripped} (${loveLabelCountStr})` : loveLabelStripped;

  return (
    <div className={styles.ahadithTab}>
      <div className={styles.ahadithHero} style={{ '--ah-col': col.color } as React.CSSProperties}>
        <div className={styles.ahadithHeroInner}>
          <div className={styles.ahadithHeroTitle}>{t('ahadith.libraryTitle')}</div>
          <div className={styles.ahadithHeroSub}>
            {t('ahadith.librarySub')}
          </div>
        </div>
      </div>
      <div className={styles.ahadithTop}>
        <div className={styles.ahModeToggle}>
          <button
            type="button"
            className={`${styles.ahModeBtn} ${mode === 'imam' ? styles.ahModeBtnActive : ''}`}
            onClick={() => { setMode('imam'); setQ(''); setOpen({}); }}
          >
            {t('ahadith.mode.imam')}
          </button>
          <button
            type="button"
            className={`${styles.ahModeBtn} ${mode === 'love' ? styles.ahModeBtnActive : ''}`}
            onClick={() => { setMode('love'); setQ(''); setOpen({}); }}
          >
            {loveLabel}
          </button>
        </div>
        <div className={styles.ahadithImams}>
          {mode === 'imam' && collections.map(c => (
            <button
              key={c.imamKey}
              type="button"
              className={[styles.ahadithImamCard, imamKey === c.imamKey ? styles.ahadithImamCardActive : ''].join(' ')}
              onClick={() => { setImamKey(c.imamKey); setQ(''); setOpen({}); }}
              style={{ '--imam-col': c.color } as React.CSSProperties}
              title={`${c.imamName} — 20`}
            >
              <span className={styles.ahadithImamWatermark} aria-hidden="true">20</span>
              <span className={styles.ahadithImamCardName}>{c.imamName}</span>
              <span className={styles.ahadithImamCardMeta}>20 · curated</span>
            </button>
          ))}
        </div>
        <div className={styles.ahCmdBar}>
          <input
            className={styles.ahCmdSearch}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={t('ahadith.searchPlaceholder')}
            aria-label="Search ahadith"
          />
          <button
            type="button"
            className={styles.ahCmdIconBtn}
            onClick={() => {
              const next: Record<string, boolean> = {};
              (mode === 'imam' ? filteredImam : filteredLove).forEach(h => { next[h.id] = true; });
              setOpen(next);
            }}
            title="Expand all"
            aria-label="Expand all"
          >
            +
          </button>
          <button
            type="button"
            className={styles.ahCmdIconBtn}
            onClick={() => setOpen({})}
            title="Collapse all"
            aria-label="Collapse all"
          >
            −
          </button>
          <button
            type="button"
            className={styles.ahCmdIconBtn}
            onClick={() => {
              const hs = col.hadiths;
              if (!hs || hs.length === 0) return;
              const pick = hs[Math.floor(Math.random() * hs.length)];
              setOpen({ [pick.id]: true });
            }}
            title="Open a random hadith"
            aria-label="Random hadith"
          >
            ↻
          </button>
        </div>
      </div>
      <div className={styles.ahList}>
        {mode === 'love' && (
          <div className={styles.ahTagRow}>
            {['all','love','respect','brotherhood','parents','prophet','kids'].map(tag => (
              <button
                key={tag}
                type="button"
                className={`${styles.ahTagBtn} ${loveTag === tag ? styles.ahTagBtnActive : ''}`}
                onClick={() => { setLoveTag(tag); setOpen({}); }}
              >
                {tag === 'all' ? t('ahadith.tags.all')
                  : tag === 'love' ? t('ahadith.tags.love')
                  : tag === 'respect' ? t('ahadith.tags.respect')
                  : tag === 'brotherhood' ? t('ahadith.tags.brotherhood')
                  : tag === 'parents' ? t('ahadith.tags.parents')
                  : tag === 'prophet' ? t('ahadith.tags.prophet')
                  : t('ahadith.tags.kids')}
              </button>
            ))}
          </div>
        )}
        {mode === 'love' && loveLoading && (
          <div className={styles.hadithEmpty}>{t('ahadith.loading')}</div>
        )}
        {(mode === 'imam' ? filteredImam : filteredLove).map((h, idx) => {
          const isOpen = !!open[h.id];
          const title =
            mode === 'love'
              ? ((h.en || '').split(' ').slice(0, 6).join(' ') + ((h.en || '').split(' ').length > 6 ? '…' : ''))
              : (lang === 'ur' ? (h.topicUr ?? h.topic) : h.topic);
          const source = mode === 'love' ? h.src : h.source;
          const previewText = lang === 'ur' ? (h.ur ?? h.en) : h.en;
          return (
            <div key={h.id} className={styles.ahRow} style={{ '--had-col': col.color } as React.CSSProperties}>
              <button
                type="button"
                className={styles.ahRowHead}
                onClick={() => setOpen(prev => ({ ...prev, [h.id]: !prev[h.id] }))}
                aria-expanded={isOpen}
              >
                <span className={styles.ahRowLeft}>
                  <span className={styles.ahRowNum}>{String(idx + 1).padStart(2, '0')}.</span>
                  <span className={styles.ahRowText}>
                    <span className={styles.ahRowTitle}>{title}</span>
                      <span className={styles.ahRowPreview}>{preview(previewText)}</span>
                  </span>
                </span>
                <span className={[styles.ahRowChevron, isOpen ? styles.ahRowChevronOpen : ''].join(' ')} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className={styles.ahRowBody}>
                  <div className={styles.ahRowAr}>{h.ar}</div>
                  {mode === 'imam' && lang === 'ur' && h.ur ? (
                    <div className={styles.ahRowEn}>{h.ur}</div>
                  ) : (
                    <div className={styles.ahRowEn}>{h.en}</div>
                  )}
                  {mode === 'love' && lang === 'ur' && h.ur && <div className={styles.ahRowUr}>{h.ur}</div>}
                  <div className={styles.ahRowFoot}>
                    <div className={styles.ahRowSource}>{source}</div>
                    <div className={styles.ahRowActions}>
                      <button type="button" className={styles.ahRowActionBtn} onClick={() => copyText(h.ar)} title="Copy Arabic" aria-label="Copy Arabic">AR</button>
                      <button type="button" className={styles.ahRowActionBtn} onClick={() => copyText(h.en)} title="Copy English" aria-label="Copy English">EN</button>
                      {(mode === 'love' || mode === 'imam') && h.ur && (
                        <button type="button" className={styles.ahRowActionBtn} onClick={() => copyText(h.ur)} title="Copy Urdu" aria-label="Copy Urdu">UR</button>
                      )}
                      <button
                        type="button"
                        className={styles.ahRowActionBtn}
                        onClick={() => copyText(
                          mode === 'imam' && lang === 'ur' && h.ur
                            ? `${title}\n\n${h.ar}\n\n${h.ur}\n\n${source}`
                            : `${title}\n\n${h.ar}\n\n${h.en}\n\n${source}`
                        )}
                        title="Copy full"
                        aria-label="Copy full"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {(mode === 'imam' ? filteredImam : filteredLove).length === 0 && (
          <div className={styles.hadithEmpty}>{t('ahadith.noMatches')}</div>
        )}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   JARH WA TA'DIL section inside Imam Modal  (Feature 33)
   ??????????????????????????????????????????????????????? */
function JarhTadilSection({ imamKey }: { imamKey: string }) {
  const entries = JARH_TADIL[imamKey] || [];
  if (!entries.length) return null;
  const RATING_COLORS = {
    thiqah: '#0a3d2e', sadouq: '#1a3462', 'layyinul-hadith': '#b8860b',
    daif: '#8b1a38', majhul: '#888', hasan: '#509070',
  };
  const RATING_EN = {
    thiqah: 'Trustworthy (Thiqah)', sadouq: 'Truthful (Sadouq)',
    'layyinul-hadith': 'Weak narrator', daif: 'Weak (Daif)', majhul: 'Unknown', hasan: 'Good (Hasan)',
  };
  return (
    <div className={styles.imamSection}>
      <h4>Al-Jarh wa al-Ta'dil ? Narrator Reliability</h4>
      {entries.map((e, i) => (
        <div key={i} className={styles.jtEntry}>
          <div className={styles.jtHeader}>
            <span className={styles.jtName}>{e.scholarName}</span>
            <span className={styles.jtNameAr}>{e.scholarAr}</span>
            <span className={styles.jtDied}>d. {e.died}</span>
            <span className={styles.jtRating} style={{ background: RATING_COLORS[e.rating] + '22', color: RATING_COLORS[e.rating], border: `1px solid ${RATING_COLORS[e.rating]}44` }}>
              {e.ratingAr} ? {RATING_EN[e.rating]}
            </span>
          </div>
          <div className={styles.jtCritics}>
            {e.assessedBy.map((a, j) => (
              <div key={j} className={styles.jtCriticRow}>
                <span className={styles.jtCriticName}>{a.critic}:</span>
                <span className={styles.jtVerdictEn}>{a.verdict}</span>
                <span className={styles.jtVerdictAr}>{a.verdictAr}</span>
              </div>
            ))}
          </div>
          {e.specialStatus && (
            <div className={styles.jtSpecial}>{e.specialStatus}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   IMAM MODAL  (enhanced with Jarh wa Ta'dil)
   ??????????????????????????????????????????????????????? */
function ImamModal({ imam, onClose, initialAhadithOpen }: { imam: Imam; onClose: () => void; initialAhadithOpen?: boolean }) {
  const t = useT();
  const { lang } = useLanguage();
  const col = IMAM_COLORS[imam.key];
  const hadithCollection = IMAM_AHADITH.find(c => c.imamKey === imam.key);
  const [hadithQ, setHadithQ] = useState('');
  const [openHadith, setOpenHadith] = useState<Record<string, boolean>>(() => {
    if (!initialAhadithOpen || !hadithCollection) return {};
    const next: Record<string, boolean> = {};
    hadithCollection.hadiths.forEach(h => { next[h.id] = true; });
    return next;
  });
  const filteredHadith = useMemo(() => {
    const hs = hadithCollection?.hadiths ?? [];
    const q = hadithQ.trim().toLowerCase();
    if (!q) return hs;
    return hs.filter(h =>
      h.topic.toLowerCase().includes(q) ||
      h.en.toLowerCase().includes(q) ||
      h.ar.toLowerCase().includes(q) ||
      h.source.toLowerCase().includes(q)
    );
  }, [hadithCollection, hadithQ]);
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.imamModal}>
        <button className={styles.imamModalClose} onClick={onClose} aria-label="Close">×</button>
        <div className={styles.imamModalHeader} style={{ borderColor: col }}>
          <div className={styles.imamNum} style={{ background: IMAM_BG[imam.key], color: col }}>{imam.num}</div>
          <div>
            <p className={styles.imamModalAr}>{imam.ar}</p>
            <p className={styles.imamModalUr} style={{ color: col }}>{imam.ur}</p>
            <h2 className={styles.imamModalName}>{imam.name}</h2>
            <span className={styles.honorific} style={{ background: IMAM_BG[imam.key], color: col, borderColor: col + '60' }}>
              {imam.honorific}
            </span>
          </div>
        </div>
        <div className={styles.imamModalBody}>
          <div className={styles.imamFacts}>
            {[
              { l: 'Born',      v: `${imam.born} · ${imam.bornPlace}` },
              { l: 'Died',      v: `${imam.died} · ${imam.diedPlace}` },
              { l: 'Full Name', v: imam.title },
            ].map(({ l, v }) => (
              <div key={l} className={styles.imamFact}>
                <span className={styles.imamFactL}>{l}</span>
                <span className={styles.imamFactV}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'ابتدائی حالات' : 'Origin & Early Life'}</h4>
            <p>{lang === 'ur' ? (imam.originUr ?? imam.origin) : imam.origin}</p>
            <p className={styles.mt4}>{lang === 'ur' ? (imam.heritageUr ?? imam.heritage) : imam.heritage}</p>
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'سلسلۂ اساتذہ' : 'Chain to the Prophet ﷺ'}</h4>
            <div className={styles.teacherChain}>
              {imam.teacherChain.map((t, i) => (
                <span key={i} className={styles.chainLink}>
                  {i > 0 && <span className={styles.chainArrow}>→</span>}
                  <span className={styles.chainNode}>{t}</span>
                </span>
              ))}
            </div>
            <p className={styles.mt4}><strong>{lang === 'ur' ? 'اساتذہ:' : 'Full teachers:'}</strong> {lang === 'ur' ? (imam.teachersUr ?? imam.teachers) : imam.teachers}</p>
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'مشہور شاگرد' : 'Famous Students'}</h4><p>{lang === 'ur' ? (imam.studentsUr ?? imam.students) : imam.students}</p></div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'کتب و وراثت' : 'Key Works & Legacy'}</h4>
            <p>{lang === 'ur' ? (imam.keyWorksUr ?? imam.keyWorks) : imam.keyWorks}</p>
            <p className={styles.mt4}>{lang === 'ur' ? (imam.books_legacyUr ?? imam.books_legacy) : imam.books_legacy}</p>
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'فقہی طریقہ (اصول)' : 'Legal Methodology'}</h4>
            <div className={styles.methodBox} style={{ borderColor: col }}>
              <p>{lang === 'ur' ? (imam.methodUr ?? imam.method) : imam.method}</p>
            </div>
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'آزمائش و اصول' : 'Trial & Principles'}</h4><p>{lang === 'ur' ? (imam.trialUr ?? imam.trial) : imam.trial}</p></div>

          {hadithCollection && (
            <div className={styles.imamSection}>
              <h4>{lang === 'ur' ? 'احادیث (20)' : 'Ahadith (20)'}</h4>
              <div className={styles.hadithTools}>
                <input
                  className={styles.hadithSearch}
                  value={hadithQ}
                  onChange={e => setHadithQ(e.target.value)}
                  placeholder={t('ahadith.searchPlaceholder')}
                  aria-label="Search ahadith"
                />
                <button
                  type="button"
                  className={styles.hadithBtn}
                  onClick={() => {
                    const next: Record<string, boolean> = {};
                    filteredHadith.forEach(h => { next[h.id] = true; });
                    setOpenHadith(next);
                  }}
                  title="Expand all"
                >
                  Expand
                </button>
                <button
                  type="button"
                  className={styles.hadithBtn}
                  onClick={() => setOpenHadith({})}
                  title="Collapse all"
                >
                  Collapse
                </button>
              </div>
              <div className={styles.hadithList}>
                {filteredHadith.map(h => {
                  const isOpen = !!openHadith[h.id];
                  return (
                    <div key={h.id} className={styles.hadithCard} style={{ borderColor: col + '55' }}>
                      <button
                        type="button"
                        className={styles.hadithHead}
                        onClick={() => setOpenHadith(prev => ({ ...prev, [h.id]: !prev[h.id] }))}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.hadithTopic}>{h.topic}</span>
                        <span className={[styles.hadithChevron, isOpen ? styles.hadithChevronOpen : ''].join(' ')} aria-hidden="true" />
                      </button>
                      {isOpen && (
                        <div className={styles.hadithBody}>
                          <div className={styles.hadithAr}>{h.ar}</div>
                          <div className={styles.hadithEn}>{h.en}</div>
                          <div className={styles.hadithSource}>{h.source}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredHadith.length === 0 && (
                  <div className={styles.hadithEmpty}>No matches. Try a different search.</div>
                )}
              </div>
            </div>
          )}

          {/* ?? NEW: Jarh wa Ta'dil  (Feature 33) ?? */}
          <JarhTadilSection imamKey={imam.key} />

          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'قول' : 'Famous Quote'}</h4>
            <blockquote className={styles.imamQuote} style={{ borderColor: col }}>
              {lang === 'ur' ? (imam.signatureUr ?? imam.signature) : imam.signature}
            </blockquote>
          </div>
          <div className={styles.imamSection}><h4>{lang === 'ur' ? 'اثر و رسوخ (آج)' : 'Global Reach Today (2026)'}</h4>
            <p>{lang === 'ur' ? (imam.reachUr ?? imam.reach) : imam.reach}</p>
            <p className={styles.keyFact}>{lang === 'ur' ? (imam.keyFactUr ?? imam.keyFact) : imam.keyFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   TAB 1 ? FOUR IMAMS
   ??????????????????????????????????????????????????????? */
function FourImamsTab() {
  const [selected, setSelected] = useState<Imam | null>(null);
  const [autoOpenAhadith, setAutoOpenAhadith] = useState(false);
  const { lang } = useLanguage();
  return (
    <div>
      <div className={styles.imamGrid}>
        {IMAMS.map(im => {
          const col = IMAM_COLORS[im.key];
          const hasHadith = !!IMAM_AHADITH.find(c => c.imamKey === im.key);
          return (
            <div key={im.id} className={styles.imamCard} style={{ borderColor: IMAM_COLORS[im.key] + '55' }} onClick={() => { setSelected(im); setAutoOpenAhadith(false); }}>
              <div className={styles.imamCardTop} style={{ background: `linear-gradient(135deg,${IMAM_BG[im.key]},transparent)` }}>
                <div className={styles.imamTopRow}>
                  <div className={styles.imamBadge} style={{ background: IMAM_BG[im.key], color: col }}>{im.num}</div>
                  <div>
                    <p className={styles.imamCardAr} style={{ color: col }}>{im.ar}</p>
                    <p className={styles.imamCardUr} style={{ color: col }}>{im.ur}</p>
                    <h3 className={styles.imamCardName}>{im.name}</h3>
                    <span className={styles.honorific} style={{ background: IMAM_BG[im.key], color: col, borderColor: col + '50' }}>{im.honorific}</span>
                  </div>
                </div>
                <p className={styles.imamDates}>{im.born}, {im.bornPlace} &nbsp;·&nbsp; {im.died}, {im.diedPlace}</p>
              </div>
              <div className={styles.imamCardBody}>
                <p className={styles.imamSig}>"{lang === 'ur' ? (im.sigUr ?? im.sig) : im.sig}"</p>
                <div className={styles.imamGrid2}>
                  <div className={styles.igItem}><span className={styles.igL}>{lang === 'ur' ? 'اصل' : 'Origin'}</span><span className={styles.igV}>{(lang === 'ur' ? (im.originUr ?? im.origin) : im.origin).split('.')[0]}</span></div>
                  <div className={styles.igItem}><span className={styles.igL}>{lang === 'ur' ? 'اثر' : 'Global Reach'}</span><span className={styles.igV}>{(lang === 'ur' ? (im.reachUr ?? im.reach) : im.reach).split('.')[0]}</span></div>
                  <div className={styles.igItem}><span className={styles.igL}>{lang === 'ur' ? 'اہم کتاب' : 'Key Work'}</span><span className={styles.igV}>{(lang === 'ur' ? (im.keyWorksUr ?? im.keyWorks) : im.keyWorks).split('.')[0].split('?')[0].trim()}</span></div>
                  <div className={styles.igItem}><span className={styles.igL}>{lang === 'ur' ? 'مشہور شاگرد' : 'Top Student'}</span><span className={styles.igV}>{(lang === 'ur' ? (im.studentsUr ?? im.students) : im.students).split('(')[0].split(',')[0].trim()}</span></div>
                </div>
                <div className={styles.methodBox} style={{ borderColor: col }}>
                  <p className={styles.methodTitle} style={{ color: col }}>{lang === 'ur' ? 'فقہی طریقہ (اصول)' : 'Legal Method (Usul)'}</p>
                  <p className={styles.methodText}>{(lang === 'ur' ? (im.methodUr ?? im.method) : im.method).substring(0, 160)}…</p>
                </div>
              </div>
              <div className={styles.tcChain}>
                {im.teacherChain.map((t, i) => (
                  <span key={i}>
                    {i > 0 && <span className={styles.tcArrow}>→</span>}
                    <span className={styles.tcNode}>{t}</span>
                  </span>
                ))}
              </div>
              <div className={styles.imamReachBar} style={{ color: col }}>
                {im.reach.split('.')[0]} &nbsp;·&nbsp; <strong>Click for full profile</strong>
                {hasHadith && (
                  <button
                    type="button"
                    className={styles.ahadithQuick}
                    onClick={(e) => { e.stopPropagation(); setSelected(im); setAutoOpenAhadith(true); }}
                    title="Open ahadith for this Imam"
                  >
                    Ahadith (20)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selected && <ImamModal imam={selected} onClose={() => { setSelected(null); setAutoOpenAhadith(false); }} initialAhadithOpen={autoOpenAhadith} />}
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   TAB 2 ? TRANSMISSION CHAIN
   ??????????????????????????????????????????????????????? */
function TransmissionChainTab() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const grouped = IM_NODES.reduce<Record<string, typeof IM_NODES>>((acc, n) => {
    const k = String(n.era);
    (acc[k] = acc[k] ?? []).push(n);
    return acc;
  }, {});
  const eraOrder = IM_ERAS.map(e => String(e.id));

  return (
    <div className={styles.chainWrap}>
      {eraOrder.map(eraKey => {
        const nodes = grouped[eraKey];
        if (!nodes || nodes.length === 0) return null;
        const era = IM_ERAS.find(e => String(e.id) === eraKey)!;
        const isSource = era.id === 0;
        const isToday = era.id === 10;
        return (
          <div key={eraKey} className={[styles.eraRow, isSource ? styles.eraSource : '', isToday ? styles.eraToday : ''].join(' ')}>
            <div className={styles.eraLabel}>
              <span className={styles.eraNum}>{isSource ? '?' : isToday ? '?' : `Era ${era.id}`}</span>
              <span className={styles.eraName}>{era.label}</span>
              <span className={styles.eraYr}>{era.yr}</span>
            </div>
            <div className={styles.eraConnector}><div className={styles.eraLine} /></div>
            <div className={styles.eraNodes}>
              {nodes.map(n => {
                const col = IMAM_COLORS[n.m] ?? IMAM_COLORS.all;
                const bg = IMAM_BG[n.m] ?? IMAM_BG.all;
                const isOpen = expanded === n.id;
                return (
                  <div key={n.id}
                    className={[styles.chainNode, n.IMAM ? styles.chainNodeImam : '', n.special === 'today' ? styles.chainNodeToday : '', n.special === 'golden' ? styles.chainNodeGolden : ''].join(' ')}
                    style={{ '--node-col': col, '--node-bg': bg } as React.CSSProperties}
                    onClick={() => setExpanded(isOpen ? null : n.id)}>
                    <p className={styles.chainNodeAr}>{n.ar}</p>
                    <p className={styles.chainNodeName}>{n.name}</p>
                    {n.died && <p className={styles.chainNodeDied}>d. {n.died}</p>}
                    <span className={styles.chainMadhab}>{MADHAB_LABEL[n.m] ?? n.m}</span>
                    {isOpen && (
                      <div className={styles.chainDetail}>
                        <p>{n.detail}</p>
                        {n.to.length > 0 && (
                          <p className={styles.chainToLabel}>
                            Transmitted to: {n.to.map(tid => {
                              const t = IM_NODES.find(x => x.id === tid);
                              return t ? t.name : tid;
                            }).join(' ? ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   TAB 3 ? ISNAD CHAINS  (+ Final Circle ? Feature 11)
   ??????????????????????????????????????????????????????? */
function IsnadTab() {
  const [isnadView, setIsnadView] = useState<'chains'|'final'|'builder'>('chains');
  const showFinalCircle = isnadView === 'final';
  return (
    <div>
      <div className={styles.isnadSubBar}>
        <button className={`${styles.isnadSubBtn} ${isnadView === 'chains' ? styles.isnadSubActive : ''}`} onClick={() => setIsnadView('chains')}>Isnad Chains</button>
        <button className={`${styles.isnadSubBtn} ${isnadView === 'final' ? styles.isnadSubActive : ''}`} onClick={() => setIsnadView('final')}>Final Circle</button>
        <button className={`${styles.isnadSubBtn} ${isnadView === 'builder' ? styles.isnadSubActive : ''}`} onClick={() => setIsnadView('builder')}>Chain Builder</button>
      </div>

      {!showFinalCircle ? (
        <div className={styles.isnadList}>
          {ISNADS_DATA.map((isn, i) => (
            <div key={i} className={styles.isnadCard}>
              <div className={styles.isnadHdr}>
                <p className={styles.isnadNum}>HADITH {i + 1} OF {ISNADS_DATA.length}</p>
                <h3 className={styles.isnadTitle}>{isn.title}</h3>
                <p className={styles.isnadAr}>"{isn.ar}"</p>
                <p className={styles.isnadEn}>"{isn.en}"</p>
                <p className={styles.isnadSrc}>{isn.source}</p>
              </div>
              <div className={styles.isnadBody}>
                <p className={styles.isnadSig}>{isn.sig}</p>
                <p className={styles.isnadChainLbl}>COMPLETE ISNAD FROM PROPHET TO YOU ({isn.chain.length} LINKS)</p>
                <div className={styles.isnadFlow}>
                  {isn.chain.map((nd, ni) => (
                    <div key={ni} className={styles.isnadStep}>
                      {ni > 0 && <div className={styles.isnadArr}>→</div>}
                      <div className={styles.isnadNode}>
                        <div className={styles.isnadCircle} style={{ background: nd.c, color: nd.tc, borderColor: nd.c }}>
                          {nd.ar.split(' ').slice(0, 2).join('\n')}
                        </div>
                        <p className={styles.isnadNname}>{nd.name}</p>
                        <p className={styles.isnadNrole}>{nd.yr}</p>
                        <p className={styles.isnadNrole}>{nd.role.length > 40 ? nd.role.substring(0, 40) + '...' : nd.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.isnadNote}><strong>Chain Analysis:</strong> {isn.note}</div>
              </div>
            </div>
          ))}
        </div>
      ) : isnadView === 'final' ? (
        <FinalCircleSection />
      ) : (
        <IsnadChainBuilder />
      )}
      {/* Feature 94 ? Ijtihad Evolution */}
      <IjtihadSection />
    </div>
  );
}

function FinalCircleSection() {
  const fc = FINAL_CIRCLE;
  return (
    <div className={styles.fcWrap}>
      <div className={styles.fcHeader}>
        <div className={styles.fcTitle}>{fc.title}</div>
        <div className={styles.fcSubtitle}>{fc.subtitle}</div>
        <div className={styles.fcDesc}>{fc.description}</div>
      </div>
      <div className={styles.fcHadithCard}>
        <div className={styles.fcHadithLabel}>The Shortest Sacred Chain (3 Links)</div>
        <div className={styles.fcHadithAr}>{fc.hadith.ar}</div>
        <div className={styles.fcHadithEn}>"{fc.hadith.en}"</div>
        <div className={styles.fcHadithSrc}>{fc.hadith.source}</div>
        <div className={styles.fcHadithNote}>{fc.hadith.note}</div>
      </div>
      <div className={styles.fcCircleTitle}>Who Was Present in the Final Hours</div>
      <div className={styles.fcCircle}>
        {fc.presentCompanions.map((c, i) => (
          <div key={i} className={styles.fcCompCard} style={{ borderTopColor: c.color }}>
            <div className={styles.fcCompAr}>{c.nameAr}</div>
            <div className={styles.fcCompName} style={{ color: c.color }}>{c.name}</div>
            <div className={styles.fcCompRole}>{c.role}</div>
          </div>
        ))}
      </div>
      <div className={styles.fcLastWordsCard}>
        <div className={styles.fcLwLabel}>The Final Words of the Prophet</div>
        <div className={styles.fcLwAr}>{fc.lastWords.ar}</div>
        <div className={styles.fcLwEn}>"{fc.lastWords.en}"</div>
        <div className={styles.fcLwSrc}>{fc.lastWords.source}</div>
      </div>
      <blockquote className={styles.fcAbuBakrQuote}>
        <div className={styles.fcAbuBakrLabel}>Abu Bakr's Announcement to all of Medina:</div>
        "{fc.abubakrSpeech}"
      </blockquote>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   TAB 4 ? LIVING LEGACY  (+ Diaspora Map ? Feature 22)
   ??????????????????????????????????????????????????????? */
function LegacyTab() {
  const [showDiaspora, setShowDiaspora] = useState(false);
  const W = 800, H = 320;

  function cqXY(lat: number, lng: number) {
    return {
      x: Math.max(0, Math.min(W, ((lng + 20) / 140) * W)),
      y: Math.max(0, Math.min(H, ((70 - lat) / 90) * H)),
    };
  }

  return (
    <div>
      <h2 className={styles.legacySection}>The Four Schools Today</h2>
      <div className={styles.schoolGrid}>
        {LEGACY_SCHOOLS.map(s => (
          <div key={s.key} className={styles.schoolCard} style={{ borderColor: s.border, background: `linear-gradient(165deg,${s.bg},rgba(22,20,15,.99))` }}>
            <div className={styles.schoolTop} style={{ background: `linear-gradient(135deg,${s.bg},${s.bg}88)` }}>
              <p className={styles.schoolPct} style={{ color: s.col }}>{s.pct}</p>
              <p className={styles.schoolPop} style={{ color: s.tc }}>{s.pop}</p>
              <h3 className={styles.schoolName} style={{ color: s.col }}>{s.name}</h3>
              <p className={styles.schoolAr} style={{ color: s.col }}>{s.ar}</p>
            </div>
            <div className={styles.schoolBody}>
              <p className={styles.schoolRegions} style={{ color: s.tc }}><strong>Active in:</strong> {s.regions}</p>
              <p className={styles.schoolWhy} style={{ color: s.tc }}><strong>Why this region?</strong> {s.why.substring(0, 180)}?</p>
              <div className={styles.schoolScholars}>
                {s.scholars.map(sc => (
                  <span key={sc} className={styles.schoolTag} style={{ color: s.col, borderColor: s.border }}>{sc}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ?? NEW: Diaspora Map  (Feature 22) ?? */}
      <h2 className={styles.legacySection}>
        Scholarship Diaspora Map
        <button className={styles.diasporaToggle} onClick={() => setShowDiaspora(!showDiaspora)}>
          {showDiaspora ? 'Hide Map' : 'Show Map'}
        </button>
      </h2>
      {showDiaspora && (
        <div className={styles.diasporaWrap}>
          <div className={styles.diasporaLegend}>
            {Object.entries(MADHAB_COLORS).map(([key, col]) => (
              <span key={key} className={styles.diasporaLegItem}>
                <span style={{ background: col, width: 10, height: 10, borderRadius: '50%', display: 'inline-block', marginRight: 5 }} />
                {MADHAB_LABEL[key]}
              </span>
            ))}
          </div>
          <div className={styles.diasporaSvgWrap}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className={styles.diasporaSvg}>
              <rect width={W} height={H} fill="rgba(10,15,8,.7)" />
              {/* Grid lines */}
              {[-20,-10,0,10,20,30,40,50,60,70,80,90,100,110,120].map(lng => {
                const x = ((lng + 20) / 140) * W;
                return <line key={lng} x1={x} y1={0} x2={x} y2={H} stroke="rgba(184,134,11,.05)" strokeWidth=".5" />;
              })}
              {[-10,0,10,20,30,40,50,60,70].map(lat => {
                const y = ((70 - lat) / 90) * H;
                return <line key={lat} x1={0} y1={y} x2={W} y2={y} stroke="rgba(184,134,11,.05)" strokeWidth=".5" />;
              })}
              {/* Region labels */}
              {[
                { label:'ARABIA', x:420, y:195 }, { label:'PERSIA/IRAN', x:530, y:160 },
                { label:'SOUTH ASIA', x:620, y:175 }, { label:'CENTRAL ASIA', x:570, y:115 },
                { label:'NORTH AFRICA', x:250, y:155 }, { label:'WEST AFRICA', x:155, y:215 },
                { label:'EUROPE', x:230, y:80 }, { label:'SE ASIA', x:700, y:235 },
              ].map(r => (
                <text key={r.label} x={r.x} y={r.y} fontFamily="Cinzel,serif" fontSize="8" fill="rgba(184,134,11,.12)" textAnchor="middle" letterSpacing=".08em">{r.label}</text>
              ))}
              {/* Diaspora circles */}
              {DIASPORA_CENTERS.map((d, i) => {
                const { x, y } = cqXY(d.lat, d.lng);
                const col = MADHAB_COLORS[d.madhab] || '#888';
                const r = Math.max(5, Math.min(16, d.count * 1.5));
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={r} fill={col + 'cc'} stroke={col} strokeWidth="1.2">
                      <title>{d.city} ? {MADHAB_LABEL[d.madhab]}\n{d.note}</title>
                    </circle>
                    <text x={x} y={y + r + 9} fontFamily="Cinzel,serif" fontSize="7" fill={col} textAnchor="middle" opacity=".85">{d.city}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className={styles.diasporaList}>
            {(['hf','ml','sf','hb'] as const).map(madhab => (
              <div key={madhab} className={styles.diasporaMadhab}>
                <div className={styles.diasporaMadhabTitle} style={{ color: MADHAB_COLORS[madhab] }}>
                  {MADHAB_LABEL[madhab]} Centers
                </div>
                {DIASPORA_CENTERS.filter(d => d.madhab === madhab).map((d, i) => (
                  <div key={i} className={styles.diasporaCity}>
                    <span className={styles.diasporaCityDot} style={{ background: MADHAB_COLORS[madhab] }} />
                    <span className={styles.diasporaCityName}>{d.city}</span>
                    <span className={styles.diasporaCityNote}>{d.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ?? NEW: Madhab Root Finder (Feature 83) ?? */}
      <h2 className={styles.legacySection}>
        Madhab Root Finder ? Companion Opinion Behind Every Ruling
      </h2>
      <MadhabRootFinder />

      {/* Feature 91 ? Qawl al-Sahabi */}
      <QawlSahabiSection />

      <h2 className={styles.legacySection}>Modern Scholars</h2>
      <div className={styles.modernGrid}>
        {MODERN_SCHOLARS.map(s => {
          const col = IMAM_COLORS[s.key];
          const bg = IMAM_BG[s.key];
          return (
            <div key={s.name} className={styles.modernCard}>
              <p className={styles.modernName}>{s.name}</p>
              <p className={styles.modernAr}>{s.ar}</p>
              <p className={styles.modernDates}>{s.dates}</p>
              <p className={styles.modernDesc}>{s.desc}</p>
              <span className={styles.madhab} style={{ background: bg, color: col, borderColor: col + '50' }}>{MADHAB_LABEL[s.key]}</span>
            </div>
          );
        })}
      </div>

      <h2 className={styles.legacySection}>Living Institutions</h2>
      <div className={styles.instGrid}>
        {INSTITUTIONS.map(inst => {
          const col = IMAM_COLORS[inst.key];
          const bg = IMAM_BG[inst.key];
          return (
            <div key={inst.name} className={styles.instCard}>
              <h4 className={styles.instName}>{inst.name}</h4>
              <p className={styles.instYr}>{inst.yr}</p>
              <p className={styles.instDesc}>{inst.desc}</p>
              <span className={styles.madhab} style={{ background: bg, color: col, borderColor: col + '50' }}>{MADHAB_LABEL[inst.key]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   NEW TAB: HOUSEHOLD STAFF  (Feature 47)
   ??????????????????????????????????????????????????????? */
function HouseholdTab() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const CAT_COLORS = {
    servant:'#b8860b', 'freed-slave':'#1a3462', scribe:'#0a3d2e',
    caller:'#7a3060', muezzin:'#7a3060', guard:'#8b1a38',
    cook:'#8b3a08', nurse:'#509070',
  };
  return (
    <div>
      <div className={styles.sectionTitle}>The Prophet's Household - Those Who Served</div>
      <div className={styles.hhIntro}>
        A complete register of companions who lived in or regularly served the Prophet's household - each a living witness to his private character.
      </div>
      <div className={styles.hhGrid}>
        {HOUSEHOLD_STAFF.map((m, i) => {
          const col = CAT_COLORS[m.roleCategory] || '#888';
          return (
            <div key={i} className={`${styles.hhCard} ${expanded === i ? styles.hhCardOpen : ''}`}
              style={{ borderTopColor: col }} onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className={styles.hhCardTop}>
                <div className={styles.hhNameAr}>{m.nameAr}</div>
                <div className={styles.hhName}>{m.name}</div>
                <span className={styles.hhCatBadge} style={{ background: col + '22', color: col }}>{m.roleCategory.replace('-', ' ')}</span>
                <div className={styles.hhRole}>{m.role}</div>
              </div>
              {expanded === i && (
                <div className={styles.hhCardBody}>
                  {m.origin && <div className={styles.hhDetail}><strong>Origin:</strong> {m.origin}</div>}
                  <div className={styles.hhNotes}>{m.notes}</div>
                  {m.specialHonor && (
                    <div className={styles.hhHonor} style={{ borderLeftColor: col }}>
                      <strong>Special Honor:</strong> {m.specialHonor}
                    </div>
                  )}
                  <div className={styles.hhSource}>{m.source}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   NEW TAB: SAHABIYYAT  (Feature 36)
   ??????????????????????????????????????????????????????? */
function SahabiyyatTab() {
  const [catFilter, setCatFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const CAT_COLORS = {
    wife:'#7a3060', scholar:'#1a3462', warrior:'#8b1a38',
    martyr:'#5c1010', narrator:'#b8860b', companion:'#0a3d2e',
  };
  const cats = ['all', 'wife', 'scholar', 'warrior', 'martyr', 'narrator', 'companion'];

  const filtered = SAHABIYYAT.filter(s =>
    (catFilter === 'all' || s.category === catFilter) &&
    (!search || s.name.toLowerCase().includes(search.toLowerCase()) || s.nameAr.includes(search))
  );

  return (
    <div>
      <div className={styles.sectionTitle}>Sahabiyyat - Women of the First Generation</div>
      <div className={styles.sabIntro}>
        The women companions of the Prophet - scholars, warriors, nurses, narrators, and the first martyrs. 200+ women are recorded; shown here are the most documented.
      </div>
      <div className={styles.sabControls}>
        <input className={styles.sabSearch} placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className={styles.sabCatBtns}>
          {cats.map(cat => (
            <button key={cat} className={`${styles.sabCatBtn} ${catFilter === cat ? styles.sabCatActive : ''}`}
              style={catFilter === cat && cat !== 'all' ? { borderColor: CAT_COLORS[cat], color: CAT_COLORS[cat] } : {}}
              onClick={() => setCatFilter(cat)}>
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.sabStats}>
        {cats.filter(c => c !== 'all').map(cat => (
          <div key={cat} className={styles.sabStat}>
            <span className={styles.sabStatNum} style={{ color: CAT_COLORS[cat] }}>{SAHABIYYAT.filter(s => s.category === cat).length}</span>
            <span className={styles.sabStatLbl}>{cat}</span>
          </div>
        ))}
      </div>
      <div className={styles.sabGrid}>
        {filtered.map((s, i) => {
          const col = CAT_COLORS[s.category];
          const isOpen = selected === s.id;
          return (
            <div key={s.id} className={`${styles.sabCard} ${isOpen ? styles.sabCardOpen : ''}`}
              style={{ borderTopColor: col }} onClick={() => setSelected(isOpen ? null : s.id)}>
              <div className={styles.sabCardTop}>
                <div className={styles.sabNameAr}>{s.nameAr}</div>
                <div className={styles.sabName}>{s.name}</div>
                {s.title && <div className={styles.sabTitle} style={{ color: col }}>{s.title}</div>}
                <div className={styles.sabMeta}>
                  <span className={styles.sabCatBadge} style={{ background: col + '22', color: col }}>{s.category}</span>
                  {s.hadiths ? <span className={styles.sabHadiths}>{s.hadiths.toLocaleString()} hadiths</span> : null}
                  {s.died && <span className={styles.sabDied}>d. {s.died}</span>}
                </div>
              </div>
              {isOpen && (
                <div className={styles.sabCardBody}>
                  <p className={styles.sabBio}>{s.bio}</p>
                  <div className={styles.sabDistinction} style={{ borderLeftColor: col }}>
                    <strong>Distinction:</strong> {s.distinction}
                  </div>
                  <div className={styles.sabSource}>{s.source}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   NEW TAB: CONVERTS  (Feature 48)
   ??????????????????????????????????????????????????????? */
function ConvertsTab() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div>
      <div className={styles.sectionTitle}>Former Enemies - Conversion Stories</div>
      <div className={styles.convIntro}>
        The most dramatic turnarounds in Islamic history ? men and women who dedicated their lives to opposing Islam, then became its champions. The same people. A different heart.
      </div>
      {CONVERTS_DATA.map((c, i) => (
        <div key={i} className={`${styles.convCard} ${selected === i ? styles.convCardOpen : ''}`}
          style={{ borderLeftColor: c.color }}>
          <div className={styles.convHeader} onClick={() => setSelected(selected === i ? null : i)}>
            <div className={styles.convLeft}>
              <div className={styles.convNameAr}>{c.nameAr}</div>
              <div className={styles.convName} style={{ color: c.color }}>{c.name}</div>
              <div className={styles.convYear}>{c.yearConverted}</div>
              <div className={styles.convPreRole}>{c.preIslamRole.substring(0, 90)}...</div>
            </div>
            <div className={styles.convChevron}>{'>'}</div>
          </div>
          {selected === i && (
            <div className={styles.convBody}>
              <div className={styles.convSection}>
                <div className={styles.convSectionTitle} style={{ color: '#8b1a38' }}>Before Islam</div>
                <p>{c.preIslamRole}</p>
              </div>
              <div className={styles.convSection}>
                <div className={styles.convSectionTitle} style={{ color: '#b8860b' }}>The Turning Point</div>
                <p>{c.conversionTrigger}</p>
              </div>
              <div className={styles.convSection}>
                <div className={styles.convSectionTitle} style={{ color: c.color }}>The Moment of Conversion</div>
                <p>{c.momentDescription}</p>
              </div>
              {c.dramatic_quote && (
                <blockquote className={styles.convQuote} style={{ borderColor: c.color }}>
                  {c.dramatic_quote}
                </blockquote>
              )}
              <div className={styles.convSection}>
                <div className={styles.convSectionTitle} style={{ color: '#0a3d2e' }}>Post-Islam Legacy</div>
                <p>{c.postIslamLegacy}</p>
              </div>
              <div className={styles.convSource}>{c.source}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   NEW TAB: LAQAB  (Feature 02)
   ??????????????????????????????????????????????????????? */
function LaqabTab() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = LAQAB_DATA.filter(l =>
    !search ||
    l.laqab.toLowerCase().includes(search.toLowerCase()) ||
    l.laqabEn.toLowerCase().includes(search.toLowerCase()) ||
    l.companion.toLowerCase().includes(search.toLowerCase()) ||
    l.laqabAr.includes(search)
  );

  return (
    <div>
      <div className={styles.sectionTitle}>Laqab - Prophetic Nicknames</div>
      <div className={styles.laqabIntro}>
        Every honorific personally given by the Prophet - in the moment - to a companion. Each laqab is a divine snapshot of character, preserved in Arabic and transmitted through the centuries.
      </div>
      <div className={styles.laqabSearch}>
        <input className={styles.laqabInput} placeholder="Search by laqab, meaning, or companion name..." value={search} onChange={e => setSearch(e.target.value)} />
        <span className={styles.laqabCount}>{filtered.length} of {LAQAB_DATA.length} honorifics</span>
      </div>
      <div className={styles.laqabGrid}>
        {filtered.map((l, i) => {
          const isOpen = selected === l.id;
          return (
            <div key={l.id} className={`${styles.laqabCard} ${isOpen ? styles.laqabCardOpen : ''}`}
              style={{ borderTopColor: l.color }} onClick={() => setSelected(isOpen ? null : l.id)}>
              <div className={styles.laqabCardTop}>
                <div className={styles.laqabAr}>{l.laqabAr}</div>
                <div className={styles.laqabName} style={{ color: l.color }}>{l.laqab}</div>
                <div className={styles.laqabEn}>{l.laqabEn}</div>
                <div className={styles.laqabCompanion}>{l.companion}</div>
              </div>
              {isOpen && (
                <div className={styles.laqabCardBody}>
                  <div className={styles.laqabOccasion}>{l.occasionEn}</div>
                  {l.prophetsWordsAr && (
                    <div className={styles.laqabProphetWords}>
                      <div className={styles.laqabPwLabel}>Prophet said:</div>
                      <div className={styles.laqabPwAr}>{l.prophetsWordsAr}</div>
                      <div className={styles.laqabPwEn}>"{l.prophetsWordsEn}"</div>
                    </div>
                  )}
                  <div className={styles.laqabSignificance}>{l.significance}</div>
                  <div className={styles.laqabSource}>{l.source}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ???????????????????????????????????????????????????????
   NEW TAB: GUIDE ? "What would the companion say?"  (Feature 50)
   ??????????????????????????????????????????????????????? */
function GuideTab() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof SITUATION_GUIDES | null>(null);
  const [selectedSit, setSelectedSit] = useState<number | null>(null);

  const CAT_COLORS = {
    grief:'#1a3462', gratitude:'#b8860b', anger:'#8b1a38', fear:'#3d2a0a',
    patience:'#0a3d2e', forgiveness:'#509070', leadership:'#7a5500',
    knowledge:'#7a3060', community:'#2a5080', worship:'#b8860b',
    family:'#8b3a08', money:'#0a3d2e',
  };

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

  return (
    <div>
      <div className={styles.sectionTitle}>What Would They Say? Companion Hadith Guide</div>
      <div className={styles.guideTabIntro}>
        Describe your situation. Surface the most relevant companions and their hadith narrations. Built from the site's own hadith corpus - direct quotes from those who witnessed the Prophet ﷺ.
      </div>
      <div className={styles.guideTabSearch}>
        <input
          className={styles.guideTabInput}
          placeholder="e.g. 'I feel angry', 'financial hardship', 'important decision', 'family conflict'..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
        />
        <button className={styles.guideTabBtn} onClick={search}>Find Hadiths</button>
      </div>

      {results === null && (
        <div className={styles.guideBrowse}>
          <div className={styles.guideBrowseTitle}>Or browse by situation:</div>
          <div className={styles.guideSituationGrid}>
            {SITUATION_GUIDES.map((sg, i) => (
              <button key={i}
                className={`${styles.guideSitBtn} ${selectedSit === i ? styles.guideSitActive : ''}`}
                style={{ borderColor: CAT_COLORS[sg.category] + '44' }}
                onClick={() => { setSelectedSit(i); setResults(null); }}>
                <span className={styles.guideSitCat} style={{ color: CAT_COLORS[sg.category] }}>{sg.category}</span>
                <span className={styles.guideSitLabel}>{sg.situation}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {results !== null && (
        <div>
          {results.length === 0 ? (
            <div className={styles.guideNoResults}>
              No results for "{query}". Try: grief, anger, money, family, knowledge, worship, leadership, decision.
            </div>
          ) : (
            results.map((sg, i) => (
              <GuideResultBlock key={i} sg={sg} catColor={CAT_COLORS[sg.category]} />
            ))
          )}
          <button className={styles.guideClear} onClick={() => { setResults(null); setQuery(''); }}>Browse All Situations</button>
        </div>
      )}

      {selectedSit !== null && results === null && (
        <GuideResultBlock sg={SITUATION_GUIDES[selectedSit]} catColor={CAT_COLORS[SITUATION_GUIDES[selectedSit].category]} />
      )}
    </div>
  );
}

function GuideResultBlock({ sg, catColor }) {
  const narratorData = useMemo(() => {
    return sg.hadiths.map(h => {
      const c = COMPANIONS.find(x => x.rank === h.narratorRank);
      return { ...h, companion: c };
    });
  }, [sg]);

  return (
    <div className={styles.guideResult} style={{ borderTopColor: catColor }}>
      <div className={styles.guideResultHeader}>
        <span className={styles.guideResultCat} style={{ color: catColor }}>{sg.category}</span>
        <span className={styles.guideResultSit}>{sg.situation}</span>
      </div>
      {narratorData.map((h, i) => (
        <div key={i} className={styles.guideHadithBlock}>
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

/* ???????????????????????????????????????????????????????
   PAGE ROOT
   ??????????????????????????????????????????????????????? */
const TABS = [
  { key: 'imams',     labelKey: 'imams.tabs.fourImams' },
  { key: 'ahadith',   labelKey: 'imams.tabs.ahadith' },
  { key: 'chain',     labelKey: 'imams.tabs.transmission' },
  { key: 'isnad',     labelKey: 'imams.tabs.isnad' },
  { key: 'qiraat',    labelKey: 'imams.tabs.qiraat' },
  { key: 'legacy',    labelKey: 'imams.tabs.legacy' },
  { key: 'household', labelKey: 'imams.tabs.household' },
  { key: 'sahabiyyat',labelKey: 'imams.tabs.sahabiyyat' },
  { key: 'converts',  labelKey: 'imams.tabs.converts' },
  { key: 'laqab',     labelKey: 'imams.tabs.laqab' },
  { key: 'guide',     labelKey: 'imams.tabs.guide' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function ImamsPage() {
  const [tab, setTab] = useState<TabKey>('imams');
  const t = useT();
  return (
    <div className={`${styles.page} premium-page`}>
      <div className={styles.header}>
        <h1>{t('imams.title')}</h1>
        <p className={styles.sub}>{t('imams.subtitle')}</p>
      </div>
      <div className={styles.tabNav}>
        {TABS.map(ti => (
          <button key={ti.key}
            className={[
              styles.tabBtn,
              ti.key === 'ahadith' ? styles.tabBtnAhadith : '',
              tab === ti.key ? styles.tabActive : '',
            ].join(' ')}
            onClick={() => setTab(ti.key)}>
            {t(ti.labelKey as any)}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tab === 'imams'      && <FourImamsTab />}
        {tab === 'ahadith'   && <AhadithTab />}
        {tab === 'chain'      && <TransmissionChainTab />}
        {tab === 'isnad'      && <IsnadTab />}
        {tab === 'qiraat'     && <QiraatTab />}
        {tab === 'legacy'     && <LegacyTab />}
        {tab === 'household'  && <HouseholdTab />}
        {tab === 'sahabiyyat' && <SahabiyyatTab />}
        {tab === 'converts'   && <ConvertsTab />}
        {tab === 'laqab'      && <LaqabTab />}
        {tab === 'guide'      && <GuideTab />}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ? FEATURE 78 ? ISNAD CHAIN BUILDER (Drag & Drop)
   -----------------------------------------------------== */
function IsnadChainBuilder() {
  const sahabas = ISNAD_NODES.filter(n => n.type === 'sahabi');
  const tabiun  = ISNAD_NODES.filter(n => n.type === 'tabii');
  const scholars = ISNAD_NODES.filter(n => n.type === 'imam' || n.type === 'scholar');

  const [sel0, setSel0] = useState('');
  const [sel1, setSel1] = useState('');
  const [sel2, setSel2] = useState('');
  const [validated, setValidated] = useState(null);

  const validate = () => {
    if (!sel0 || !sel1 || !sel2) return;
    const isValid = VALID_CHAINS.some(([s, t, sc]) => s === sel0 && t === sel1 && sc === sel2);
    // Also check partial validity ? does each node know the next?
    const n0 = ISNAD_NODES.find(n => n.id === sel0);
    const n1 = ISNAD_NODES.find(n => n.id === sel1);
    const n2 = ISNAD_NODES.find(n => n.id === sel2);
    setValidated({ isValid, n0, n1, n2 });
  };

  const reset = () => { setSel0(''); setSel1(''); setSel2(''); setValidated(null); };

  const renderSelect = (nodes, val, setter, label, color) => (
    <div className={styles.ibSelectBox} style={{ borderColor: color + '44' }}>
      <div className={styles.ibSelectLabel} style={{ color }}>{label}</div>
      <select className={styles.ibSelect}
        value={val} onChange={e => { setter(e.target.value); setValidated(null); }}>
        <option value="">Choose a {label}</option>
        {nodes.map(n => (
          <option key={n.id} value={n.id}>{n.name} (d. {n.died})</option>
        ))}
      </select>
      {val && (() => {
        const node = ISNAD_NODES.find(n => n.id === val);
        return node ? (
          <div className={styles.ibNodePreview}>
            <span className={`${styles.ibNodeAr} ar`}>{node.nameAr}</span>
            <span className={styles.ibNodeBio}>{node.bio}</span>
          </div>
        ) : null;
      })()}
    </div>
  );

  return (
    <div className={styles.ibPage}>
      <div className={styles.ibIntro}>
        Build your own isnad chain: choose a Sahabi, Tabi'i, and Classical Scholar. The system validates whether this chain is historically documented and shows the recorded chain for comparison.
      </div>
      <div className={styles.ibChainBuilder}>
        {renderSelect(sahabas, sel0, setSel0, 'Sahabi Narrator', '#d4a820')}
        <div className={styles.ibArrow}>→</div>
        {renderSelect(tabiun, sel1, setSel1, "Tabi'i", '#509070')}
        <div className={styles.ibArrow}>→</div>
        {renderSelect(scholars, sel2, setSel2, 'Classical Scholar/Imam', '#b8860b')}
      </div>
      <div className={styles.ibActions}>
        <button className={styles.ibValidateBtn} onClick={validate} disabled={!sel0 || !sel1 || !sel2}>
          Validate Chain
        </button>
        <button className={styles.ibResetBtn} onClick={reset}>Reset</button>
      </div>

      {validated && (
        <div className={styles.ibResult} style={{ borderColor: validated.isValid ? '#0a5c2e' : '#8b1a38' }}>
          {validated.isValid ? (
            <>
              <div className={styles.ibResultValid}>Historically Documented Chain</div>
              <p className={styles.ibResultNote}>This exact chain is recorded in classical hadith scholarship. The links are confirmed by multiple classical scholars.</p>
            </>
          ) : (
            <>
              <div className={styles.ibResultInvalid}>Chain Not Directly Documented</div>
              <p className={styles.ibResultNote}>This specific combination is not recorded in our database. The narrators may have lived in the right eras, but there is no confirmed direct link in this exact order. Below are known valid chains for comparison.</p>
            </>
          )}
          <div className={styles.ibResultChain}>
            <div className={styles.ibResultLink} style={{ borderColor: '#d4a820' }}>
              <span className={`${styles.ibLinkAr} ar`}>{validated.n0?.nameAr}</span>
              <strong>{validated.n0?.name}</strong>
              <span>{validated.n0?.bio?.slice(0, 100)}...</span>
            </div>
            <div className={styles.ibChainArrow}>→</div>
            <div className={styles.ibResultLink} style={{ borderColor: '#509070' }}>
              <span className={`${styles.ibLinkAr} ar`}>{validated.n1?.nameAr}</span>
              <strong>{validated.n1?.name}</strong>
              <span>{validated.n1?.bio?.slice(0, 100)}...</span>
            </div>
            <div className={styles.ibChainArrow}>→</div>
            <div className={styles.ibResultLink} style={{ borderColor: '#b8860b' }}>
              <span className={`${styles.ibLinkAr} ar`}>{validated.n2?.nameAr}</span>
              <strong>{validated.n2?.name}</strong>
              <span>{validated.n2?.bio?.slice(0, 100)}...</span>
            </div>
          </div>
          {!validated.isValid && (
            <div className={styles.ibKnownChains}>
              <strong>Known valid chains featuring {validated.n0?.name}:</strong>
              {VALID_CHAINS.filter(([s]) => s === sel0).map(([s, t, sc], i) => {
                const tn = ISNAD_NODES.find(n => n.id === t);
                const scn = ISNAD_NODES.find(n => n.id === sc);
                return (
                  <div key={i} className={styles.ibKnownChain}>
                    {validated.n0?.name} → {tn?.name} → {scn?.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className={styles.ibExplainer}>
        <strong>How Isnad Validation Works:</strong> Each link in a chain requires that the narrator (a) lived in the same era as their teacher, (b) resided in overlapping cities, and (c) is recorded as having met. Classical hadith scholars spent their lives verifying these connections - traveling across the Islamic world to confirm a single link.
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ? FEATURE 83 ? MADHAB ROOT FINDER
   -----------------------------------------------------== */
const MADHAB_STYLE_MAP = {
  'Hanafi': { color: '#b8860b', bg: '#b8860b15' },
  'Maliki': { color: '#0a5c2e', bg: '#0a5c2e15' },
  "Shafi'i": { color: '#1a3462', bg: '#1a346215' },
  'Hanbali': { color: '#7a1010', bg: '#7a101015' },
};

function MadhabRootFinder() {
  const [activeId, setActiveId] = useState(null);
  const [activePos, setActivePos] = useState(null);

  const root = activeId ? FIQH_ROOTS.find(r => r.id === activeId) : null;

  const CAT_ICONS = { prayer:'PR', fasting:'FA', zakat:'ZA', hajj:'HJ', family:'FM', transactions:'TX', purity:'PU', food:'FD' };

  return (
    <div className={styles.mrPage}>
      <p className={styles.mrIntro}>
        Enter any fiqh topic to see which companion's narration each madhab traces back to, the exact hadith, and why scholars interpreted it differently. Never built as an interactive tool before.
      </p>
      <div className={styles.mrTopicGrid}>
        {FIQH_ROOTS.map(r => (
          <button key={r.id}
            className={`${styles.mrTopicBtn} ${activeId === r.id ? styles.mrTopicActive : ''}`}
            onClick={() => { setActiveId(r.id); setActivePos(null); }}>
            <span className={styles.mrTopicIcon}>{CAT_ICONS[r.category]}</span>
            <span className={styles.mrTopicLabel}>{r.topic}</span>
            <span className={`${styles.mrTopicAr} ar`}>{r.topicAr}</span>
          </button>
        ))}
      </div>

      {root && (
        <div className={styles.mrContent}>
          <h3 className={styles.mrTitle}>{root.topic}</h3>
          <p className={styles.mrQuestion}><em>{root.question}</em></p>

          <div className={styles.mrNarrations}>
            <h4 className={styles.mrNarrationsTitle}>Companion Narrations:</h4>
            {root.companionNarrations.map((n, i) => (
              <div key={i} className={styles.mrNarration}>
                <div className={styles.mrNarrComp}>{n.companion} ? <em>{n.position}</em></div>
                <blockquote className={styles.mrNarrHadith}>{n.hadith}</blockquote>
                <span className={styles.mrNarrSource}>{n.source}</span>
              </div>
            ))}
          </div>

          <h4 className={styles.mrMadhabsTitle}>Madhab Positions:</h4>
          <div className={styles.mrMadhabs}>
            {root.madhabPositions.map((m, i) => {
              const st = MADHAB_STYLE_MAP[m.madhab];
              return (
                <div key={i} className={`${styles.mrMadhab} ${activePos === i ? styles.mrMadhabActive : ''}`}
                  style={{ borderTopColor: st.color }}
                  onClick={() => setActivePos(activePos === i ? null : i)}>
                  <div className={styles.mrMadhabHeader}>
                    <span className={styles.mrMadhabName} style={{ color: st.color }}>{m.madhab}</span>
                    <span className={styles.mrMadhabRoot}>Root: {m.rootCompanion}</span>
                  </div>
                  <p className={styles.mrMadhabRuling}>{m.ruling}</p>
                  {activePos === i && (
                    <p className={styles.mrMadhabReason}><strong>Reasoning:</strong> {m.reasoning}</p>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.mrWhyDiff}>
            <strong>Why the difference?</strong> {root.whyDifference}
          </div>
          <div className={styles.mrModern}>
            <strong>Modern relevance:</strong> {root.modernRelevance}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   ? FEATURE 90 ? THE 7 QIRA'AT
   -----------------------------------------------------== */
function QiraatTab() {
  const [selected, setSelected] = useState(QIRAAT_SEVEN[4]); // Default: Asim (Hafs)

  return (
    <div className={styles.qrPage}>
      <h2 className={styles.qrTitle}>The 7 Canonical Quranic Recitation Styles</h2>
      <p className={styles.qrIntro}>
        Each of the 7 canonical recitation styles (Qira'at Sab') traced back to the specific companion whose recitation it preserves. The oral tradition passed unbroken for 1,400 years through thousands of authenticated chains.
      </p>
      <div className={styles.qrPicker}>
        {QIRAAT_SEVEN.map(q => (
          <button key={q.id}
            className={`${styles.qrBtn} ${selected.id === q.id ? styles.qrBtnActive : ''}`}
            style={selected.id === q.id ? { borderColor: q.color, background: q.color + '15', color: q.color } : {}}
            onClick={() => setSelected(q)}>
            <span className={`${styles.qrBtnAr} ar`}>{q.qariAr}</span>
            <span className={styles.qrBtnName}>{q.qariName}</span>
            <span className={styles.qrBtnRegion}>{q.region}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className={styles.qrDetail} style={{ borderColor: selected.color }}>
          <div className={styles.qrDetailHeader} style={{ background: selected.color + '10' }}>
            <span className={`${styles.qrDetailAr} ar`}>{selected.qariAr}</span>
            <h3 className={styles.qrDetailName} style={{ color: selected.color }}>{selected.qariName}</h3>
            <div className={styles.qrDetailMeta}>
              <span>d. {selected.died}</span>
              <span className={styles.qrRegionBadge} style={{ borderColor: selected.color, color: selected.color }}>{selected.regionAr} ({selected.region})</span>
            </div>
          </div>
          <div className={styles.qrBody}>
            <div className={styles.qrSection}>
              <h4 className={styles.qrSecTitle}>Companion Source</h4>
              <p className={styles.qrSecText}>{selected.companionSource}</p>
            </div>
            <div className={styles.qrSection}>
              <h4 className={styles.qrSecTitle}>Transmission Chain</h4>
              <p className={styles.qrSecText}>{selected.companionTransmission}</p>
            </div>
            <div className={styles.qrSection}>
              <h4 className={styles.qrSecTitle}>Distinctive Feature</h4>
              <p className={styles.qrSecText}>{selected.distinctiveFeature}</p>
            </div>
            <div className={styles.qrSection}>
              <h4 className={styles.qrSecTitle}>Two Primary Transmitters (Rawis)</h4>
              <p className={styles.qrSecText}>{selected.twoRawis}</p>
            </div>
            <div className={styles.qrSection}>
              <h4 className={styles.qrSecTitle}>Modern Use</h4>
              <p className={styles.qrSecText}>{selected.modernUse}</p>
            </div>
            <div className={styles.qrExample}>
              <strong>Example verse: </strong>{selected.exampleVerse}
              <p className={styles.qrDiff}>{selected.exampleDiff}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.qrNote}>
        <strong>What makes Qira'at unique:</strong> These are not "translations" or "versions" ? they are the same Quran with minor phonetic variations (vowel elongations, assimilation rules, dialect features) all traced back to the Prophet ? through authenticated chains. Each style has been memorized and transmitted orally without interruption for 1,400 years.
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ? FEATURE 91 ? QAWL AL-SAHABI (extends LegacyTab)
   + FEATURE 94 ? IJTIHAD CHANGES (extends IsnadTab)
   These are exported so they can be called from LegacyTab
   -----------------------------------------------------== */
export function QawlSahabiSection() {
  const [selected, setSelected] = useState(null);
  const STATUS_COLORS = { binding: '#0a5c2e', persuasive: '#b8860b', contested: '#8b1a38' };
  const MADHAB_COLORS_Q = { 'Hanafi': '#b8860b', 'Maliki': '#0a5c2e', "Shafi'i": '#1a3462', 'Hanbali': '#7a1010' };

  return (
    <div className={styles.qsPage}>
      <h3 className={styles.qsTitle}>Qawl al-Sahabi ? Companion Legal Opinions That Became Law</h3>
      <p className={styles.qsIntro}>
        Companion opinions (qawl sahabi) adopted as binding or persuasive by subsequent classical scholars ? with the usul al-fiqh debate around each, which madhab accepted it, and the exact companion statement.
      </p>
      <div className={styles.qsGrid}>
        {QAWL_SAHABI.map((q, i) => (
          <div key={i}
            className={`${styles.qsCard} ${selected === i ? styles.qsCardActive : ''}`}
            style={{ borderTopColor: q.color }}
            onClick={() => setSelected(selected === i ? null : i)}>
            <div className={styles.qsCardTop}>
              <span className={styles.qsComp} style={{ color: q.color }}>{q.companion}</span>
              <span className={styles.qsStatus} style={{ background: STATUS_COLORS[q.usulStatus] + '22', color: STATUS_COLORS[q.usulStatus] }}>{q.usulStatus}</span>
            </div>
            <span className={styles.qsTopic}>{q.topic}</span>
            <span className={`${styles.qsTopicAr} ar`}>{q.topicAr}</span>
            {selected === i && (
              <div className={styles.qsDetail}>
                <blockquote className={`${styles.qsOpAr} ar`}>{q.opinionAr}</blockquote>
                <p className={styles.qsOpEn}>{q.opinionEn}</p>
                <p className={styles.qsUsulNote}><strong>Usul al-Fiqh note:</strong> {q.usulNote}</p>
                <div className={styles.qsMadhabs}>
                  {q.madhabAdoption.map((m, j) => (
                    <div key={j} className={styles.qsMadhab} style={{ borderLeftColor: MADHAB_COLORS_Q[m.madhab] }}>
                      <span className={styles.qsMadhabName} style={{ color: MADHAB_COLORS_Q[m.madhab] }}>{m.madhab}</span>
                      <span className={styles.qsMadhabVerdict} style={{ color: m.accepted ? '#0a5c2e' : '#8b1a38' }}>{m.accepted ? '? Accepted' : '? Rejected'}</span>
                      <span className={styles.qsMadhabNote}>{m.note}</span>
                    </div>
                  ))}
                </div>
                <span className={styles.qsSource}>{q.source}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function IjtihadSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.ijPage}>
      <h3 className={styles.ijTitle}>Companion Ijtihad Evolution ? Opinions That Changed</h3>
      <p className={styles.ijIntro}>
        Cases where a companion changed their own legal opinion after the Prophet ? died ? showing the living, growing nature of companion scholarship and intellectual honesty.
      </p>
      {IJTIHAD_CHANGES.map((c, i) => (
        <div key={i} className={styles.ijCard} style={{ borderLeftColor: c.color }}
          onClick={() => setExpanded(expanded === i ? null : i)}>
          <div className={styles.ijHeader}>
            <span className={styles.ijComp} style={{ color: c.color }}>{c.companion}</span>
            <span className={styles.ijTopic}>{c.topic}</span>
          </div>
          <div className={styles.ijPositions}>
            <div className={styles.ijOld}><strong>Original:</strong> {c.originalPosition}</div>
            <div className={styles.ijArrow}>→ Changed to</div>
            <div className={styles.ijNew}><strong>Revised:</strong> {c.revisedPosition}</div>
          </div>
          {expanded === i && (
            <>
              <p className={styles.ijReason}><strong>Why:</strong> {c.reasonForChange}</p>
              <p className={styles.ijImpact}><strong>Madhab impact:</strong> {c.madhahbImpact}</p>
              <span className={styles.ijSource}>{c.hadithOrSource}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
