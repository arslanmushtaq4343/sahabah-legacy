import type { Companion } from '../../types';
import { COMPANIONS } from '../../data/companions';

const YEAR_FALLBACK_MIN = 560;
const YEAR_FALLBACK_MAX = 700;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function parseYear(text?: string): number | null {
  if (!text) return null;
  const match = text.match(/(\d{3,4})/);
  return match ? Number(match[1]) : null;
}

function hashText(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const BORN_YEARS = COMPANIONS.map(c => parseYear(c.born)).filter(
  (n): n is number => typeof n === 'number'
);
export const BORN_MIN = BORN_YEARS.length ? Math.min(...BORN_YEARS) : YEAR_FALLBACK_MIN;
export const BORN_MAX = BORN_YEARS.length ? Math.max(...BORN_YEARS) : YEAR_FALLBACK_MAX;

export interface CardTheme {
  ambientTint: string;
  driftX: string;
  driftY: string;
  shimmerDuration: string;
  ringCount: string;
  ringOpacity: string;
  ringDuration: string;
  wearOpacity: string;
  wearScale: string;
  breathDuration: string;
  breathDepth: string;
  hoverDuration: string;
  liftY: string;
  tribeDelay: string;
  tribeOffset: string;
  toneMix: string;
  era: string;
  eraTint: string;
  battleLevel: string;
  emberOpacity: string;
  glintInterval: string;
  scrollDepth: string;
  scrollSpeed: string;
  rankTier: string;
  auraStrength: string;
  riverWidth: string;
  riverSpeed: string;
}

function regionMotion(place: string) {
  const p = place.toLowerCase();
  const isCoastal = /yemen|aden|oman|bahrain|sea|coast/.test(p);
  if (/mecca|makkah/.test(p))
    return { tint: '#d8a24b', driftX: '4px', driftY: '-16px', shimmerDuration: '6.4s' };
  if (/medina|madinah|yathrib/.test(p))
    return { tint: '#2f7a46', driftX: '2px', driftY: '-8px', shimmerDuration: '6.8s' };
  if (/yemen|aden|hadramawt/.test(p))
    return { tint: '#1f6f78', driftX: '16px', driftY: '-3px', shimmerDuration: '7.2s' };
  if (/persia|iran|fars|kufa|basra/.test(p))
    return { tint: '#6b5aa6', driftX: '-10px', driftY: '-4px', shimmerDuration: '7.1s' };
  if (isCoastal)
    return { tint: '#3f8ea0', driftX: '14px', driftY: '-2px', shimmerDuration: '7.4s' };
  return { tint: '#9b8c6b', driftX: '5px', driftY: '-7px', shimmerDuration: '6.9s' };
}

function hadithRing(hadiths: number) {
  if (hadiths <= 0) return { ringCount: '1', ringOpacity: '0', ringDuration: '8.20s' };
  const count = Math.max(1, Math.min(72, Math.round(hadiths / 10)));
  const strength = Math.min(1, hadiths / 600);
  const duration = Math.max(3.2, 8.2 - strength * 4.8);
  const opacity = Math.min(0.14, 0.06 + strength * 0.14);
  return {
    ringCount: String(count),
    ringOpacity: opacity.toFixed(3),
    ringDuration: `${duration.toFixed(2)}s`,
  };
}

function battleWear(battles: number) {
  const strength = clamp(battles / 30, 0, 1);
  return {
    wearOpacity: (0.02 + strength * 0.18).toFixed(3),
    wearScale: (0.85 + strength * 0.25).toFixed(3),
  };
}

function lifespan(born?: string, death?: string) {
  const b = parseYear(born);
  const d = parseYear(death);
  const ls = b && d && d > b ? d - b : 60;
  const t = clamp((ls - 20) / 70, 0, 1);
  const duration = 2.1 + t * 4.0;
  const depth = 0.003 + t * 0.007;
  return { breathDuration: `${duration.toFixed(2)}s`, breathDepth: depth.toFixed(4) };
}

function rankHover(rank: number) {
  const t = clamp((rank - 1) / 102, 0, 1);
  const duration = 0.38 - t * 0.2;
  const lift = 3 + t * 4;
  return { hoverDuration: `${duration.toFixed(3)}s`, liftY: `${lift.toFixed(2)}px` };
}

function tribeSync(tribe?: string) {
  const h = hashText((tribe || 'unknown').toLowerCase());
  const delayMs = (h % 9) * 140;
  const offset = ((h % 13) - 6) * 0.6;
  return { tribeDelay: `${delayMs}ms`, tribeOffset: `${offset.toFixed(2)}px` };
}

function bornTone(born?: string) {
  const y = parseYear(born) ?? BORN_MIN;
  const t = BORN_MAX === BORN_MIN ? 0.5 : clamp((y - BORN_MIN) / (BORN_MAX - BORN_MIN), 0, 1);
  const warmPct = 75 - t * 45;
  return { toneMix: `${warmPct.toFixed(1)}%` };
}

function era(born?: string) {
  const y = parseYear(born) ?? 620;
  if (y < 610) return { era: 'pre', eraTint: '#d1a06a' };
  if (y < 622) return { era: 'early', eraTint: '#d4a820' };
  if (y < 633) return { era: 'hijra', eraTint: '#f0c85a' };
  return { era: 'post', eraTint: '#b8c7d9' };
}

function battleEnergy(battles: number) {
  const lvl = clamp(battles / 20, 0, 1);
  const ember = battles === 0 ? 0 : 0.06 + lvl * 0.22;
  const glint = battles >= 20 ? 3.6 : battles >= 10 ? 5.2 : battles >= 1 ? 7.4 : 0;
  return {
    battleLevel: lvl.toFixed(3),
    emberOpacity: ember.toFixed(3),
    glintInterval: glint ? `${glint.toFixed(2)}s` : '0s',
  };
}

function hadithScroll(hadiths: number) {
  const t = clamp(hadiths / 500, 0, 1);
  const depth = hadiths <= 0 ? 0 : 0.12 + t * 0.62;
  const speed = 9.5 - t * 6.4;
  return { scrollDepth: depth.toFixed(3), scrollSpeed: `${speed.toFixed(2)}s` };
}

function rankAura(rank: number) {
  if (rank <= 4) return { rankTier: 'khulafa', auraStrength: '1.00' };
  if (rank <= 20) return { rankTier: 'silver', auraStrength: '0.72' };
  if (rank <= 60) return { rankTier: 'dots', auraStrength: '0.44' };
  return { rankTier: 'single', auraStrength: '0.22' };
}

function lifespanRiver(born?: string, death?: string, battles = 0, hadiths = 0) {
  const b = parseYear(born);
  const d = parseYear(death);
  const ls = b && d && d > b ? d - b : 60;
  const width = clamp((ls - 20) / 70, 0, 1);
  const eventful = clamp((battles / 20) * 0.55 + (hadiths / 600) * 0.45, 0, 1);
  const speed = 7.8 - eventful * 4.8;
  return { riverWidth: `${(20 + width * 72).toFixed(1)}%`, riverSpeed: `${speed.toFixed(2)}s` };
}

const CACHE = new Map<number, CardTheme>();

export function getCardTheme(c: Companion): CardTheme {
  const cached = CACHE.get(c.rank);
  if (cached) return cached;

  const region = regionMotion(c.place || '');
  const ring = hadithRing(c.hadiths || 0);
  const wear = battleWear(c.battles.length);
  const life = lifespan(c.born, c.death);
  const hover = rankHover(c.rank);
  const tribe = tribeSync(c.tribe);
  const tone = bornTone(c.born);
  const e = era(c.born);
  const energy = battleEnergy(c.battles.length);
  const scroll = hadithScroll(c.hadiths || 0);
  const aura = rankAura(c.rank);
  const river = lifespanRiver(c.born, c.death, c.battles.length, c.hadiths || 0);

  const theme: CardTheme = {
    ambientTint: region.tint,
    driftX: region.driftX,
    driftY: region.driftY,
    shimmerDuration: region.shimmerDuration,
    ringCount: ring.ringCount,
    ringOpacity: ring.ringOpacity,
    ringDuration: ring.ringDuration,
    wearOpacity: wear.wearOpacity,
    wearScale: wear.wearScale,
    breathDuration: life.breathDuration,
    breathDepth: life.breathDepth,
    hoverDuration: hover.hoverDuration,
    liftY: hover.liftY,
    tribeDelay: tribe.tribeDelay,
    tribeOffset: tribe.tribeOffset,
    toneMix: tone.toneMix,
    era: e.era,
    eraTint: e.eraTint,
    battleLevel: energy.battleLevel,
    emberOpacity: energy.emberOpacity,
    glintInterval: energy.glintInterval,
    scrollDepth: scroll.scrollDepth,
    scrollSpeed: scroll.scrollSpeed,
    rankTier: aura.rankTier,
    auraStrength: aura.auraStrength,
    riverWidth: river.riverWidth,
    riverSpeed: river.riverSpeed,
  };
  CACHE.set(c.rank, theme);
  return theme;
}

export function themeToCSSVars(
  t: CardTheme,
  rank: number,
  catColor: string,
  idx: number
): React.CSSProperties {
  return {
    '--cat-color': catColor,
    '--stagger': `${Math.min(idx * 28, 320)}ms`,
    '--ambient-delay': `${(rank % 9) * 120}ms`,
    '--ambient-duration': `${4.8 + (rank % 5) * 0.45}s`,
    '--ambient-tint': t.ambientTint,
    '--drift-x': t.driftX,
    '--drift-y': t.driftY,
    '--shimmer-duration': t.shimmerDuration,
    '--hadith-rings': t.ringCount,
    '--hadith-opacity': t.ringOpacity,
    '--hadith-duration': t.ringDuration,
    '--wear-opacity': t.wearOpacity,
    '--wear-scale': t.wearScale,
    '--breath-duration': t.breathDuration,
    '--breath-depth': t.breathDepth,
    '--hover-duration': t.hoverDuration,
    '--lift-y': t.liftY,
    '--tribe-delay': t.tribeDelay,
    '--tribe-offset': t.tribeOffset,
    '--tone-mix': t.toneMix,
    '--era': t.era,
    '--era-tint': t.eraTint,
    '--battle-level': t.battleLevel,
    '--ember-opacity': t.emberOpacity,
    '--glint-interval': t.glintInterval,
    '--scroll-depth': t.scrollDepth,
    '--scroll-speed': t.scrollSpeed,
    '--rank-tier': t.rankTier,
    '--rank-strength': t.auraStrength,
    '--river-width': t.riverWidth,
    '--river-speed': t.riverSpeed,
  } as React.CSSProperties;
}
