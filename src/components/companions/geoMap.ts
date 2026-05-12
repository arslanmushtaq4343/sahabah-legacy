/**
 * Place-name → coordinate lookup for the Arabian Peninsula map.
 * Coordinates are in the GeographicMap SVG viewBox (800 × 600).
 */

export interface GeoPlace {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Group used for theming. */
  group: 'hijaz' | 'najd' | 'yemen' | 'gulf' | 'levant' | 'iraq' | 'persia' | 'egypt' | 'africa';
}

export const GEO_PLACES: Record<string, GeoPlace> = {
  mecca: { id: 'mecca', label: 'Mecca', x: 260, y: 360, group: 'hijaz' },
  medina: { id: 'medina', label: 'Medina', x: 250, y: 240, group: 'hijaz' },
  taif: { id: 'taif', label: "Ta'if", x: 300, y: 380, group: 'hijaz' },
  khaybar: { id: 'khaybar', label: 'Khaybar', x: 240, y: 200, group: 'hijaz' },
  tabuk: { id: 'tabuk', label: 'Tabuk', x: 200, y: 110, group: 'hijaz' },
  yamamah: { id: 'yamamah', label: 'Yamamah', x: 410, y: 340, group: 'najd' },
  najd: { id: 'najd', label: 'Najd', x: 380, y: 290, group: 'najd' },
  yemen: { id: 'yemen', label: 'Yemen', x: 300, y: 510, group: 'yemen' },
  sanaa: { id: 'sanaa', label: "Sana'a", x: 300, y: 510, group: 'yemen' },
  aden: { id: 'aden', label: 'Aden', x: 340, y: 560, group: 'yemen' },
  hadramawt: { id: 'hadramawt', label: 'Hadramawt', x: 440, y: 510, group: 'yemen' },
  oman: { id: 'oman', label: 'Oman', x: 590, y: 420, group: 'gulf' },
  muscat: { id: 'muscat', label: 'Muscat', x: 600, y: 410, group: 'gulf' },
  bahrain: { id: 'bahrain', label: 'Bahrain', x: 490, y: 320, group: 'gulf' },
  damascus: { id: 'damascus', label: 'Damascus', x: 210, y: 60, group: 'levant' },
  syria: { id: 'syria', label: 'Syria', x: 220, y: 70, group: 'levant' },
  homs: { id: 'homs', label: 'Homs', x: 215, y: 50, group: 'levant' },
  palestine: { id: 'palestine', label: 'Palestine', x: 165, y: 90, group: 'levant' },
  jerusalem: { id: 'jerusalem', label: 'Jerusalem', x: 165, y: 90, group: 'levant' },
  kufa: { id: 'kufa', label: 'Kufa', x: 380, y: 100, group: 'iraq' },
  najaf: { id: 'najaf', label: 'Najaf', x: 380, y: 110, group: 'iraq' },
  basra: { id: 'basra', label: 'Basra', x: 470, y: 150, group: 'iraq' },
  iraq: { id: 'iraq', label: 'Iraq', x: 420, y: 130, group: 'iraq' },
  persia: { id: 'persia', label: 'Persia', x: 620, y: 110, group: 'persia' },
  isfahan: { id: 'isfahan', label: 'Isfahan', x: 640, y: 130, group: 'persia' },
  iran: { id: 'iran', label: 'Persia', x: 620, y: 110, group: 'persia' },
  egypt: { id: 'egypt', label: 'Egypt', x: 60, y: 200, group: 'egypt' },
  fustat: { id: 'fustat', label: 'Fustat', x: 60, y: 200, group: 'egypt' },
  abyssinia: { id: 'abyssinia', label: 'Abyssinia', x: 90, y: 540, group: 'africa' },
  ethiopia: { id: 'ethiopia', label: 'Abyssinia', x: 90, y: 540, group: 'africa' },
  habashah: { id: 'habashah', label: 'Abyssinia', x: 90, y: 540, group: 'africa' },
};

const GROUP_COLORS_GEO: Record<GeoPlace['group'], string> = {
  hijaz: '#d4a820',
  najd: '#a17030',
  yemen: '#c05621',
  gulf: '#3f8ea0',
  levant: '#6b5aa6',
  iraq: '#8b3a08',
  persia: '#553c9a',
  egypt: '#509070',
  africa: '#4a4a8a',
};

export function geoGroupColor(g: GeoPlace['group']): string {
  return GROUP_COLORS_GEO[g];
}

const PLACE_PATTERNS: { regex: RegExp; key: keyof typeof GEO_PLACES }[] = [
  { regex: /masjid al[- ]nabawi|baqi|uhud|wadi mecca/i, key: 'medina' }, // burial-only signals
  { regex: /mecca|makkah/i, key: 'mecca' },
  { regex: /medina|madinah|yathrib/i, key: 'medina' },
  { regex: /ta[' ]?if/i, key: 'taif' },
  { regex: /khaybar/i, key: 'khaybar' },
  { regex: /tabuk/i, key: 'tabuk' },
  { regex: /sana[' ]?a/i, key: 'sanaa' },
  { regex: /yemen/i, key: 'yemen' },
  { regex: /aden/i, key: 'aden' },
  { regex: /hadramawt|hadhramaut/i, key: 'hadramawt' },
  { regex: /muscat/i, key: 'muscat' },
  { regex: /oman/i, key: 'oman' },
  { regex: /bahrain/i, key: 'bahrain' },
  { regex: /yamamah|yamama/i, key: 'yamamah' },
  { regex: /najd/i, key: 'najd' },
  { regex: /damascus|dimashq/i, key: 'damascus' },
  { regex: /homs/i, key: 'homs' },
  { regex: /syria|al[- ]?sham|levant/i, key: 'syria' },
  { regex: /jerusalem|al[- ]?quds/i, key: 'jerusalem' },
  { regex: /palestine/i, key: 'palestine' },
  { regex: /najaf/i, key: 'najaf' },
  { regex: /kufa/i, key: 'kufa' },
  { regex: /basra/i, key: 'basra' },
  { regex: /iraq/i, key: 'iraq' },
  { regex: /isfahan|esfahan/i, key: 'isfahan' },
  { regex: /persia|iran|fars/i, key: 'persia' },
  { regex: /fustat|cairo/i, key: 'fustat' },
  { regex: /egypt|misr/i, key: 'egypt' },
  { regex: /abyssinia|habashah|ethiopia/i, key: 'abyssinia' },
];

/**
 * Parse a free-text place string ("Mecca", "Najaf, Iraq", "Bab al-Saghir Cemetery, Damascus")
 * into a GeoPlace. Returns null when no known location matches.
 */
export function resolvePlace(text?: string): GeoPlace | null {
  if (!text) return null;
  for (const { regex, key } of PLACE_PATTERNS) {
    if (regex.test(text)) return GEO_PLACES[key];
  }
  return null;
}
