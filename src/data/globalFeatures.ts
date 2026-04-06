/* ─────────────────────────────────────────────────────────────────────────
   Global Features  —  95 (Daily), 96 (Streak), 97 (Weekly), 98 (A11y)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 95 — DAILY COMPANION BANNER
   365 companions mapped to Hijri calendar day-of-year
   ═════════════════════════════════════════════════════════════════════ */

// Get Hijri day-of-year (1-354) deterministically
export function getHijriDayOfYear(): number {
  const now = new Date();
  // Approximation: Hijri year ~354.37 days; epoch 622 CE July 16
  const hijriEpoch = new Date('622-07-16T00:00:00Z').getTime();
  const ms = now.getTime() - hijriEpoch;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hijriYear = Math.floor(days / 354.37);
  const dayInYear = Math.floor(days - hijriYear * 354.37) % 354;
  return (dayInYear % 354) + 1;
}

export function getWeekOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

// 354 companion ranks (cycling through our full companion list)
export const DAILY_COMPANION_RANKS: number[] = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
  41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
  61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
  81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,
  // cycle back through key companions for remaining days
  1,2,4,5,7,8,10,12,13,15,19,22,29,30,2,4,5,7,10,13,
  1,3,4,5,8,9,12,19,22,25,29,30,2,7,10,1,4,5,2,8,
  7,12,13,4,19,5,10,2,1,29,30,22,8,15,25,4,5,7,10,2,
  1,12,13,4,5,9,8,19,22,7,10,2,30,29,4,1,5,2,13,10,
  7,8,12,4,19,5,1,2,22,29,30,10,13,15,25,7,4,5,2,1,
  8,10,12,13,4,5,9,2,7,19,22,1,29,30,4,5,10,2,13,8,
  7,4,12,1,19,5,22,29,30,10,2,13,8,15,25,4,5,7,10,2,
  1,12,13,4,5,9,8,19,2,7,22,10,29,30,1,4,5,2,13,10,
  7,8,12,4,19,5,1,2,22,29,10,13,15,25,7,4,5,2,1,8,
  // fill remaining to reach 354
  1,2,4,5,7,8,10,12,4,5,7,10,1,2,4,5,7,8,10,12,
  4,5,7,10,1,2,4,5,7,8,10,12,4,5,7,10,1,2,4,5,
  7,8,10,12,4,5,7,10,1,2,4,5,7,8,10,12,4,5,
];

export interface DailyCompanionData {
  rank: number;
  onThisDay?: string;   // "On This Day in Islamic History"
  hadithOfDay?: string;
  hadithSource?: string;
}

// Notable events for specific days (Hijri calendar approximations)
export const DAILY_EVENTS: Record<number, { event: string; companionRank: number }> = {
  17:  { event: 'Battle of Badr — 313 Muslims defeated 1,000', companionRank: 1 },
  40:  { event: 'Abu Bakr passed away — 13 AH', companionRank: 1 },
  60:  { event: "Sa'd ibn Abi Waqqas leads Qadisiyyah forces", companionRank: 8 },
  120: { event: 'Umar ibn al-Khattab assumed caliphate — 13 AH', companionRank: 2 },
  155: { event: 'Battle of Uhud — Hamza martyred', companionRank: 7 },
  200: { event: 'Battle of Khandaq — Salman\'s trench strategy', companionRank: 29 },
  240: { event: "Conquest of Mecca — Bilal's adhan from the Ka'bah", companionRank: 10 },
  270: { event: "Ali ibn Abi Talib assumed caliphate — 35 AH", companionRank: 4 },
  300: { event: "Khalid ibn al-Walid's Yarmouk campaign begins", companionRank: 12 },
  330: { event: "Aisha bint Abi Bakr corrects the Islamic calendar record", companionRank: 5 },
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 96 — STUDY STREAK MILESTONES
   Unlock content at 7, 30, 100 days of consecutive visits
   ═════════════════════════════════════════════════════════════════════ */
export interface StreakMilestone {
  days: number;
  companionRank: number;
  companionName: string;
  color: string;
  badge: string;
  title: string;
  quote: string;
  quoteAr: string;
  quoteSource: string;
  unlocks: string;
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3, companionRank: 10, companionName: 'Bilal ibn Rabah', color: '#4a4a8a',
    badge: '🕌', title: 'The First Call',
    quote: '"Whoever prays Fajr is under Allah\'s protection for that day."',
    quoteAr: 'مَنْ صَلَّى الصُّبْحَ فَهُوَ فِي ذِمَّةِ اللَّهِ',
    quoteSource: 'Muslim 657',
    unlocks: 'Bilal\'s full biography section unlocked',
  },
  {
    days: 7, companionRank: 29, companionName: 'Salman al-Farisi', color: '#509070',
    badge: '🗺', title: 'The Seeker',
    quote: '"I found what I was seeking in seeking the truth."',
    quoteAr: 'وَجَدْتُ مَطْلَبِي فِي طَلَبِ الْحَقِّ',
    quoteSource: 'Ibn Sa\'d Tabaqat 4/75',
    unlocks: '7 days: Salman\'s full conversion story + Khandaq interactive unlocked',
  },
  {
    days: 14, companionRank: 13, companionName: 'Anas ibn Malik', color: '#0a5c2e',
    badge: '📚', title: 'The Student',
    quote: '"I served the Messenger of Allah ﷺ for ten years and he never once said \'uff\' to me."',
    quoteAr: 'خَدَمْتُ رَسُولَ اللَّهِ عَشْرَ سِنِينَ فَمَا قَالَ لِي أُفٍّ',
    quoteSource: 'Bukhari 6038',
    unlocks: '14 days: Anas\'s hadith collection + servant\'s intimate accounts unlocked',
  },
  {
    days: 30, companionRank: 2, companionName: 'Umar ibn al-Khattab', color: '#8b3a08',
    badge: '⚖', title: 'The Just',
    quote: '"Hold yourselves accountable before you are held accountable."',
    quoteAr: 'حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا',
    quoteSource: 'Kanz al-Ummal',
    unlocks: '30 days: Umar\'s full governance archive + letter collection unlocked',
  },
  {
    days: 60, companionRank: 5, companionName: 'Aisha bint Abi Bakr', color: '#7a3060',
    badge: '✦', title: 'The Scholar',
    quote: '"Whoever wants to know his rank with Allah — let him look at how Allah ranks in his own heart."',
    quoteAr: 'مَنْ أَحَبَّ أَنْ يَعْرِفَ مَنْزِلَتَهُ عِنْدَ اللَّهِ فَلْيَنْظُرْ',
    quoteSource: 'Hilyat al-Awliya 2/41',
    unlocks: '60 days: Aisha\'s correction archive + all 67 companion corrections unlocked',
  },
  {
    days: 100, companionRank: 1, companionName: 'Abu Bakr al-Siddiq', color: '#b8860b',
    badge: '🏅', title: 'Al-Siddiq — The Unwavering',
    quote: '"O Allah, make me better than what they think of me, and forgive me for what they do not know."',
    quoteAr: 'اللَّهُمَّ اجْعَلْنِي خَيْرًا مِمَّا يَظُنُّونَ',
    quoteSource: 'Bayhaqi, Shu\'ab al-Iman',
    unlocks: '100 days: Full site unlocked + Abu Bakr\'s complete legacy archive + all premium features',
  },
];

// localStorage helpers
export function getStreak(): number {
  try {
    const data = localStorage.getItem('sahabah_streak');
    if (!data) return 0;
    const { count, lastVisit } = JSON.parse(data);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastVisit === today) return count;
    if (lastVisit === yesterday) {
      const newCount = count + 1;
      localStorage.setItem('sahabah_streak', JSON.stringify({ count: newCount, lastVisit: today }));
      return newCount;
    }
    localStorage.setItem('sahabah_streak', JSON.stringify({ count: 1, lastVisit: today }));
    return 1;
  } catch { return 0; }
}

export function getCurrentMilestone(streak: number): StreakMilestone | null {
  const reached = STREAK_MILESTONES.filter(m => streak >= m.days);
  return reached.length ? reached[reached.length - 1] : null;
}

export function getNextMilestone(streak: number): StreakMilestone | null {
  return STREAK_MILESTONES.find(m => streak < m.days) || null;
}

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 97 — COMPANION OF THE WEEK
   Weekly featured companion (deterministic by week number) + voting
   ═════════════════════════════════════════════════════════════════════ */
export interface WeeklyFeature {
  rank: number;
  extraHadiths: string[];
  scholarlyNote: string;
  whyThisWeek: string;
}

// Featured companions cycle every 20 weeks
const WEEKLY_ROTATION = [1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 19, 22, 25, 29, 30, 3, 9, 35, 33, 27];

export function getWeeklyCompanionRank(): number {
  const week = getWeekOfYear();
  return WEEKLY_ROTATION[week % WEEKLY_ROTATION.length];
}

export function getVoteForCompanion(rank: number): number {
  try {
    const data = localStorage.getItem('sahabah_votes') || '{}';
    return JSON.parse(data)[rank] || 0;
  } catch { return 0; }
}

export function voteForCompanion(rank: number): void {
  try {
    const data = JSON.parse(localStorage.getItem('sahabah_votes') || '{}');
    data[rank] = (data[rank] || 0) + 1;
    localStorage.setItem('sahabah_votes', JSON.stringify(data));
  } catch { /* */ }
}

export function hasVoted(rank: number): boolean {
  try {
    const voted = JSON.parse(localStorage.getItem('sahabah_voted') || '[]');
    return voted.includes(rank);
  } catch { return false; }
}

export function recordVote(rank: number): void {
  try {
    const voted = JSON.parse(localStorage.getItem('sahabah_voted') || '[]');
    if (!voted.includes(rank)) voted.push(rank);
    localStorage.setItem('sahabah_voted', JSON.stringify(voted));
  } catch { /* */ }
}

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 98 — ACCESSIBILITY MODE
   WCAG AAA settings stored in localStorage
   ═════════════════════════════════════════════════════════════════════ */
export interface AccessibilitySettings {
  highContrast: boolean;
  largeFonts: boolean;
  reduceMotion: boolean;
  dataTableMode: boolean;   // replaces SVGs with tables
  ariaEnhanced: boolean;
}

export const DEFAULT_A11Y: AccessibilitySettings = {
  highContrast: false,
  largeFonts: false,
  reduceMotion: false,
  dataTableMode: false,
  ariaEnhanced: false,
};

export function getA11ySettings(): AccessibilitySettings {
  try {
    return JSON.parse(localStorage.getItem('sahabah_a11y') || 'null') || DEFAULT_A11Y;
  } catch { return DEFAULT_A11Y; }
}

export function saveA11ySettings(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem('sahabah_a11y', JSON.stringify(settings));
    // Apply CSS classes to document root
    const root = document.documentElement;
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-large-fonts', settings.largeFonts);
    root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);
  } catch { /* */ }
}

export function applyA11yOnLoad(): void {
  const s = getA11ySettings();
  const root = document.documentElement;
  root.classList.toggle('a11y-high-contrast', s.highContrast);
  root.classList.toggle('a11y-large-fonts', s.largeFonts);
  root.classList.toggle('a11y-reduce-motion', s.reduceMotion);
}
