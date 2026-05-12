import { memo } from 'react';
import { CAT_COLORS } from '../../data/companions';
import { TABAQAT_MAP, TABAQAT_LABELS, FORMER_ENEMIES } from '../../data/companionExtras';
import { FREED_SLAVE_RANKS } from '../../data/companionsExtra2';
import { COMPANION_CLAIM_CONFIDENCE } from '../../data/companionDataQuality';
import { normalizeTransliteration } from '../../data/transliteration';
import { SourceStrengthBadge } from '../source/SourceStrengthBadge';
import { confidenceToStrength } from '../../utils/sourceConfidence';
import type { Companion } from '../../types';
import { getCardTheme, themeToCSSVars } from './cardTheme';
import styles from './CompanionsPage.module.css';
import type { ReadingLevel } from './CompanionsPage';

export interface CompanionCardProps {
  companion: Companion;
  index: number;
  readingLevel: ReadingLevel;
  selected: boolean;
  bookmarked: boolean;
  onOpen: (c: Companion) => void;
  onCompare: (rank: number) => void;
  onBookmark: (rank: number) => void;
  onCalligraphy: (c: Companion) => void;
  onSpeak: (ar: string) => void;
  onSpeakBio: (c: Companion) => void;
  onShare: (c: Companion) => void;
  onPrint: (c: Companion) => void;
  onRsvp: (c: Companion) => void;
}

function trimSig(sig: string, level: ReadingLevel) {
  const norm = normalizeTransliteration(sig);
  if (level === 'child') return norm.split('.')[0] + '.';
  if (level === 'scholar') return norm;
  return norm.length > 140 ? norm.slice(0, 140) + '…' : norm;
}

function CompanionCardImpl({
  companion: c,
  index,
  readingLevel,
  selected,
  bookmarked,
  onOpen,
  onCompare,
  onBookmark,
  onCalligraphy,
  onSpeak,
  onSpeakBio,
  onShare,
  onPrint,
  onRsvp,
}: CompanionCardProps) {
  const theme = getCardTheme(c);
  const motionVariant = c.rank % 4;
  const isEnemy = FORMER_ENEMIES.has(c.rank);
  const isFreed = FREED_SLAVE_RANKS.has(c.rank);
  const tabaqat = TABAQAT_MAP[c.rank];
  const confidence = COMPANION_CLAIM_CONFIDENCE[c.rank]?.sig;

  const className = [
    styles.card,
    styles.cardEnter,
    c.cat === 'caliph'
      ? styles.entryCaliph
      : c.cat === 'warrior'
        ? styles.entryWarrior
        : c.cat === 'scholar' || c.cat === 'narrator'
          ? styles.entryScholar
          : c.cat === 'wife'
            ? styles.entryWife
            : c.cat === 'martyr'
              ? styles.entryMartyr
              : styles.entryOther,
    motionVariant === 0
      ? styles.cardMotionFloat
      : motionVariant === 1
        ? styles.cardMotionWave
        : motionVariant === 2
          ? styles.cardMotionPulse
          : styles.cardMotionOrbit,
    selected ? styles.cardSelected : '',
    bookmarked ? styles.cardStudied : '',
  ].join(' ');

  return (
    <article className={className} style={themeToCSSVars(theme, c.rank, CAT_COLORS[c.cat], index)}>
      <div className={styles.cardAccent} />
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.rank}>#{c.rank}</span>
          <span className={styles.cat}>{c.catLabel}</span>
          {isEnemy && (
            <span className={styles.enemyBadge} title="Converted former persecutor">
              ⚑
            </span>
          )}
          {isFreed && (
            <span className={styles.freedBadge} title="Freed from slavery">
              ⛓
            </span>
          )}
          {tabaqat && (
            <span className={styles.tabaqatBadge} title={TABAQAT_LABELS[tabaqat]}>
              G{tabaqat}
            </span>
          )}

          <button
            className={styles.calliBtn}
            title="View Arabic calligraphy"
            aria-label="View Arabic calligraphy"
            onClick={e => {
              e.stopPropagation();
              onCalligraphy(c);
            }}
          >
            ﷲ
          </button>

          <button
            className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarkActive : ''}`}
            title={bookmarked ? 'Mark as unread' : 'Mark as studied'}
            aria-label={bookmarked ? 'Remove from study journal' : 'Add to study journal'}
            aria-pressed={bookmarked ? 'true' : 'false'}
            onClick={e => {
              e.stopPropagation();
              onBookmark(c.rank);
            }}
          >
            {bookmarked ? '✓' : '＋'}
          </button>
        </div>

        <div className={styles.arRow}>
          <p className={styles.ar}>{c.ar}</p>
          <button
            className={styles.audioBtn}
            title="Hear Arabic pronunciation"
            aria-label="Play Arabic pronunciation"
            onClick={e => {
              e.stopPropagation();
              onSpeak(c.ar);
            }}
          >
            🔊
          </button>
        </div>

        <h2 className={styles.name}>{normalizeTransliteration(c.name)}</h2>
        <p className={styles.title}>{normalizeTransliteration(c.title)}</p>
        {confidence && (
          <SourceStrengthBadge strength={confidenceToStrength(confidence)} compact />
        )}
        <p className={styles.sig}>{trimSig(c.sig, readingLevel)}</p>

        <div className={styles.meta}>
          {c.hadiths > 0 && <span>{c.hadiths.toLocaleString()} hadiths</span>}
          {c.battles.length > 0 && <span>{c.battles.length} battles</span>}
          {c.born && <span>b. {c.born}</span>}
        </div>

        <div className={styles.actions}>
          <button className={styles.detailBtn} onClick={() => onOpen(c)}>
            Full Profile
          </button>
          <button
            className={[styles.compareBtn, selected ? styles.compareSel : ''].join(' ')}
            aria-pressed={selected ? 'true' : 'false'}
            onClick={() => onCompare(c.rank)}
          >
            {selected ? '✓ Added' : '+ Compare'}
          </button>

          <div className={styles.cardFooterActions}>
            <button
              className={styles.cardFooterBtn}
              title="Listen to short biography"
              aria-label="Listen to short biography"
              onClick={e => {
                e.stopPropagation();
                onSpeakBio(c);
              }}
            >
              <span className={styles.footerBtnIcon}>Bio</span>
              <span className={styles.srOnly}>Short biography audio</span>
            </button>
            <button
              className={styles.cardFooterBtn}
              title="Share companion"
              aria-label="Share companion"
              onClick={e => {
                e.stopPropagation();
                onShare(c);
              }}
            >
              <span className={styles.footerBtnIcon}>↗</span>
              <span className={styles.srOnly}>Share</span>
            </button>
            <button
              className={styles.cardFooterBtn}
              title="Print as A5 classroom card"
              aria-label="Print as A5 classroom card"
              onClick={e => {
                e.stopPropagation();
                onPrint(c);
              }}
            >
              <span className={styles.footerBtnIcon}>⎙</span>
              <span className={styles.srOnly}>Print</span>
            </button>
            <button
              className={styles.cardFooterBtn}
              title="60-second speed biography"
              aria-label="Open 60-second speed biography"
              onClick={e => {
                e.stopPropagation();
                onRsvp(c);
              }}
            >
              <span className={styles.footerBtnIcon}>⏱</span>
              <span className={styles.srOnly}>60-second mode</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

const CompanionCard = memo(CompanionCardImpl);
export default CompanionCard;
