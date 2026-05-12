import { lazy, Suspense, useMemo } from 'react';
import type { Companion } from '../../types';
import type { ReadingLevel } from './CompanionsPage';
import { getSegmentData } from '../../data/companionSegments';
import { LAST_WORDS_DATA } from '../../data/lastWords';
import { QURAN_TRIGGERS } from '../../data/quranTriggers';
import { COMPANION_AUTHENTICITY_SCORE } from '../../data/companionDataQuality';
import { CAT_COLORS } from '../../data/companions';
import { LAQAB_DATA } from '../../data/laqab';
import SegmentWrapper from '../segments/SegmentWrapper';
import segStyles from '../segments/segments.module.css';

const LegacyTicker = lazy(() => import('../segments/LegacyTicker'));
const RadarExplainer = lazy(() => import('../segments/RadarExplainer'));
const HadithImpactWave = lazy(() => import('../segments/HadithImpactWave'));
const LifeArcScroll = lazy(() => import('../segments/LifeArcScroll'));
const BattleMapPulse = lazy(() => import('../segments/BattleMapPulse'));
const QuranRevealMoment = lazy(() => import('../segments/QuranRevealMoment'));
const FinalMomentsCinematic = lazy(() => import('../segments/FinalMomentsCinematic'));
const CalligraphyReveal = lazy(() => import('../segments/CalligraphyReveal'));
const PersonalityConstellation = lazy(() => import('../segments/PersonalityConstellation'));
const QuoteTypewriter = lazy(() => import('../segments/QuoteTypewriter'));
const KeyEventSpotlight = lazy(() => import('../segments/KeyEventSpotlight'));
const AppearancePortrait = lazy(() => import('../segments/AppearancePortrait'));
const TribalLineageTree = lazy(() => import('../segments/TribalLineageTree'));
const CaliphateReignTimeline = lazy(() => import('../segments/CaliphateReignTimeline'));
const LegacyEcho = lazy(() => import('../segments/LegacyEcho'));
const BondWithProphet = lazy(() => import('../segments/BondWithProphet'));
const MiraclesShimmer = lazy(() => import('../segments/MiraclesShimmer'));
const HonoredTitleLaqab = lazy(() => import('../segments/HonoredTitleLaqab'));
const GeographicJourney = lazy(() => import('../segments/GeographicJourney'));

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function radarData(c: Companion) {
  return [
    { subject: 'Hadiths', value: Math.min(100, Math.round((c.hadiths / 5374) * 100)) },
    { subject: 'Battles', value: Math.min(100, c.battles.length * 12) },
    { subject: 'Scholarship', value: c.cat === 'scholar' || c.cat === 'narrator' ? 85 : 40 },
    { subject: 'Sacrifice', value: c.cat === 'martyr' || c.cat === 'warrior' ? 90 : 50 },
    { subject: 'Leadership', value: c.cat === 'caliph' || c.cat === 'general' ? 95 : 45 },
    { subject: 'Legacy', value: c.rank <= 5 ? 100 : c.rank <= 15 ? 75 : 55 },
  ];
}

function Fallback() {
  return (
    <div className={segStyles.segSuspense}>
      Loading segment…
      <div className={segStyles.segLoadBar} />
    </div>
  );
}

interface Props {
  companion: Companion;
  readingLevel?: ReadingLevel;
}

export default function SegmentsTab({ companion, readingLevel = 'adult' }: Props) {
  const rm = prefersReducedMotion();
  const color = CAT_COLORS[companion.cat] ?? '#c9a84c';
  const seg = useMemo(() => getSegmentData(companion.rank), [companion.rank]);
  const authScore = COMPANION_AUTHENTICITY_SCORE[companion.rank] ?? 0;
  const lastWords = LAST_WORDS_DATA.find(l => l.companionRank === companion.rank);
  const quranEntries = useMemo(
    () => QURAN_TRIGGERS.filter(q => q.companion === companion.name),
    [companion.name]
  );
  const radarPoints = useMemo(() => radarData(companion), [companion]);
  const laqab = useMemo(
    () => LAQAB_DATA.find(l => l.companionRank === companion.rank),
    [companion.rank]
  );
  const hasMiracles = useMemo(() => {
    if (!companion.miracles) return false;
    if (Array.isArray(companion.miracles)) return companion.miracles.length > 0;
    return companion.miracles.trim().length > 0;
  }, [companion.miracles]);

  return (
    <div>
      <div className={segStyles.tabIntro}>
        Animated documentary segments for{' '}
        <span className={segStyles.tabIntroName}>{companion.name}</span>. Each panel is data-sourced
        from primary Islamic references.
      </div>

      {/* 0 — Calligraphy Reveal */}
      <Suspense fallback={<Fallback />}>
        <SegmentWrapper
          title="Name in Calligraphy"
          titleAr="الاسم بالخط العربي"
          icon="✍️"
          companionName={companion.name}
          readingLevel={readingLevel}
          reducedMotion={rm}
        >
          {playing => (
            <CalligraphyReveal
              nameAr={companion.ar}
              title={companion.title}
              titleAr={companion.title}
              playing={playing}
              reducedMotion={rm}
              color={color}
              rank={companion.rank}
            />
          )}
        </SegmentWrapper>
      </Suspense>

      {/* 0a — Bond with the Prophet ﷺ */}
      {companion.link && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Bond with the Prophet ﷺ"
            titleAr="الصلة بالنبي ﷺ"
            icon="✿"
            source="Sahih al-Bukhari & Muslim · Sira"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <BondWithProphet
                link={companion.link}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0aa — Honored Title (Laqab) */}
      {laqab && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Honored Title (Laqab)"
            titleAr="اللقب الشريف"
            icon="🎖"
            source={laqab.source}
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
            sourceDetail={laqab.significance}
          >
            {playing => (
              <HonoredTitleLaqab
                laqab={laqab}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0b — Personality Constellation */}
      {companion.personality && companion.personality.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Personality Constellation"
            titleAr="كوكبة الشخصية"
            icon="⭐"
            source="Character analysis from primary Sira sources"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <PersonalityConstellation
                traits={companion.personality!}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0c — Quote Typewriter */}
      {companion.quote && companion.quoteEn && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Famous Quote"
            titleAr="الحكمة المأثورة"
            icon="💬"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <QuoteTypewriter
                quoteAr={companion.quote!}
                quoteEn={companion.quoteEn!}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0d — Key Event Spotlight */}
      {companion.keyEvent && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Defining Moment"
            titleAr="اللحظة الفاصلة"
            icon="✦"
            source="Sira & primary biographical sources"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <KeyEventSpotlight
                keyEvent={companion.keyEvent}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0e — Appearance Portrait */}
      {companion.appearance && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Appearance"
            titleAr="الهيئة والوصف"
            icon="❋"
            source="Sira & Tabaqat physical descriptions"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <AppearancePortrait
                appearance={companion.appearance}
                nameAr={companion.ar}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 0f — Tribal Lineage */}
      {companion.tribe && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Tribal Lineage"
            titleAr="النسب القبلي"
            icon="🌿"
            source="Genealogical records (Ansab) · Ibn Hazm"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <TribalLineageTree
                tribe={companion.tribe}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 1 — Legacy Ticker */}
      <Suspense fallback={<Fallback />}>
        <SegmentWrapper
          title="Legacy at a Glance"
          titleAr="الإرث في لمحة"
          icon="📊"
          source="Kutub al-Sittah + Tabaqat"
          confidence="high"
          companionName={companion.name}
          readingLevel={readingLevel}
          reducedMotion={rm}
          sourceDetail="Hadith count from Mishkat al-Masabih cross-referenced with Musnad Ahmad; battle count from Ibn Hisham's Sira."
        >
          {playing => (
            <LegacyTicker
              stats={seg.legacyStats!}
              hadithCount={companion.hadiths}
              battleCount={companion.battles.length}
              authenticityScore={authScore}
              companionName={companion.name}
              playing={playing}
              reducedMotion={rm}
              color={color}
            />
          )}
        </SegmentWrapper>
      </Suspense>

      {/* 1b — Caliphate Reign (caliphs only) */}
      {companion.caliphate && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Caliphate Reign"
            titleAr="فترة الخلافة"
            icon="👑"
            source="Tarikh al-Tabari · Al-Bidaya wa'l-Nihaya"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <CaliphateReignTimeline
                caliphate={companion.caliphate!}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 2 — Life Arc */}
      {seg.lifeArc && seg.lifeArc.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Life Arc Timeline"
            titleAr="محطات الحياة"
            icon="🕰️"
            source="Ibn Hisham · Tabaqat Ibn Sad"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <LifeArcScroll
                arc={seg.lifeArc!}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 2b — Geographic Journey */}
      {(companion.born || companion.place || companion.burial) && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Geographic Journey"
            titleAr="الرحلة الجغرافية"
            icon="📍"
            source="Tabaqat Ibn Sad · burial-site records"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <GeographicJourney
                born={companion.born}
                place={companion.place}
                burial={companion.burial}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 3 — Radar */}
      {seg.radarAnnotations && seg.radarAnnotations.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Scholar's Radar"
            titleAr="رادار العالِم"
            icon="🔬"
            source="Derived from authenticated sources"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <RadarExplainer
                radarPoints={radarPoints}
                annotations={seg.radarAnnotations!}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 4 — Hadith Wave */}
      {seg.hadithNetwork && seg.hadithNetwork.totalCount > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Hadith Transmission Wave"
            titleAr="موجة نقل الحديث"
            icon="🌊"
            source="Rijal al-Hadith databases"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <HadithImpactWave
                network={seg.hadithNetwork!}
                playing={playing}
                reducedMotion={rm}
                color={color}
                companionName={companion.name}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 5 — Battle Map */}
      {seg.battleGeo && seg.battleGeo.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Battle Map"
            titleAr="خريطة المعارك"
            icon="⚔️"
            source="Ibn Hisham · Al-Bidaya wa'l-Nihaya"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <BattleMapPulse
                battles={seg.battleGeo!}
                playing={playing}
                reducedMotion={rm}
                color={color}
                companionName={companion.name}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 6 — Quran Reveal */}
      {quranEntries.length > 0 && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Quran Revealed"
            titleAr="لحظة نزول الآية"
            icon="📖"
            source="Asbab al-Nuzul · Tafsir al-Tabari"
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <QuranRevealMoment
                entries={quranEntries}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 6b — Miracles */}
      {hasMiracles && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Miracles"
            titleAr="المعجزات والكرامات"
            icon="✨"
            source="Sahih hadith collections · Sira"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <MiraclesShimmer
                miracles={companion.miracles}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 7 — Final Moments */}
      {lastWords && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Final Moments"
            titleAr="اللحظات الأخيرة"
            icon="☾"
            source={lastWords.source}
            confidence="high"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <FinalMomentsCinematic
                entry={lastWords}
                playing={playing}
                reducedMotion={rm}
                color={color}
                readingLevel={readingLevel}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}

      {/* 8 — Legacy Echo */}
      {companion.legacy && (
        <Suspense fallback={<Fallback />}>
          <SegmentWrapper
            title="Lasting Echo"
            titleAr="الأثر الباقي"
            icon="◆"
            source="Synthesis from authenticated biographical sources"
            confidence="medium"
            companionName={companion.name}
            readingLevel={readingLevel}
            reducedMotion={rm}
          >
            {playing => (
              <LegacyEcho
                legacy={companion.legacy}
                companionName={companion.name}
                playing={playing}
                reducedMotion={rm}
                color={color}
              />
            )}
          </SegmentWrapper>
        </Suspense>
      )}
    </div>
  );
}
