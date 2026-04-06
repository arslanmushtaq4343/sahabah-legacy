/* ─────────────────────────────────────────────────────────────────────────
   Connection-page enrichment data
   All edges keyed by companion rank (1-based)
   ──────────────────────────────────────────────────────────────────────── */

/* ── Types ────────────────────────────────────────────────────────────── */
export interface GraphEdge {
  source: number;   // companion rank
  target: number;
  label?: string;
  strength?: number; // 0-1
}

export interface CityPosition {
  name: string;
  x: number;   // 0-1 fraction of diaspora SVG width
  y: number;   // 0-1 fraction of diaspora SVG height
  label?: string;
}

export interface KeyEvent {
  label: string;
  yearAH: number;
  note: string;
}

export interface GrowthPoint {
  yearAH: number;
  yearCE: number;
  count: number;
  note: string;
}

export interface MigrationStep {
  city: string;
  yearAH: number | string;
  note: string;
}

/* ═══════════════════════════════════════════════════════════════════════
   BIRTH / DEATH YEARS IN AH  (negative = before Hijra)
   CE ↔ AH: AH ≈ (CE − 622) × 1.031    pre-Hijra negative
   ═════════════════════════════════════════════════════════════════════ */
export const BIRTH_AH: Record<number, number> = {
  1:-49, 2:-38, 3:-46, 4:-22, 5:-8,  6:-46, 7:-50, 8:-15, 9:-52, 10:-35,
  11:-35,12:-20,13:-10, 14:0,  15:-50,16:0,  17:-10,18:  7, 19:  2, 20:-12,
  21:-20,22:-35,23:-15,24:-18,25:-30,26:  0, 27:-30,28:-28,29:-35,30:-10,
  31:-5, 32:  0,33:-18,34:-10,35:-22,36:-15,37:-45,38:-12,39: -8,40:-15,
  41:  5,42:-20,43:-10,44:-25,45:  0, 46:-18,47:-12,48:-8, 49:-10,50:-20,
  51:-10,52:  0,53:-5, 54:-8, 55:-15,56:-10,57:  5, 58:-5, 59:-20,60:-25,
  61:-12,62:-8, 63:-5, 64:-10,65:-12,66:  0, 67:-8, 68:-5, 69:  2, 70:-8,
  71:  0,72:-15,73:-5, 74:-8, 75:  5, 76:  8, 77:-10,78:  0, 79:  3, 80:  5,
  81:  5,82:  8,83: 10,84: 12,85: 14,86: 16,87: 10,88:  8, 89: 12,90: 14,
  91: 16,92: 18,93: 15,94: 17,95: 19,96: 14,97: 13,98: 11,99: 16,100:18,
  101:20,102:16,103:14,
};

export const DEATH_AH: Record<number, number> = {
  1: 13, 2: 23, 3: 35, 4: 40, 5: 58, 6: 32, 7:  3, 8: 55, 9: 18, 10:20,
  11:32, 12:21, 13:93, 14:58, 15:32, 16:23, 17:74, 18:45, 19:68, 20:78,
  21:74, 22:32, 23:65, 24:60, 25:32, 26:50, 27:37, 28:40, 29:36, 30:80,
  31:55, 32:49, 33:62, 34:58, 35:48, 36:60, 37:32, 38:65, 39:72, 40:55,
  41:32, 42:70, 43:65, 44:65, 45:35, 46:68, 47:63, 48:80, 49:70, 50:63,
  51:75, 52:58, 53:65, 54:72, 55:60, 56:55, 57:70, 58:62, 59:80, 60:42,
  61:75, 62:70, 63:68, 64:72, 65:80, 66:65, 67:70, 68:75, 69:80, 70:75,
  71:70, 72:65, 73:72, 74:80, 75:70, 76:75, 77:68, 78:72, 79:78, 80:80,
  81:82, 82:85, 83:88, 84:90, 85:92, 86:95, 87:88, 88:85, 89:90, 90:92,
  91:95, 92:98, 93:95, 94:97, 95:99, 96:94, 97:93, 98:91, 99:96,100:98,
  101:100,102:97,103:95,
};

/* ═══════════════════════════════════════════════════════════════════════
   LAYER 1 — FAMILY / BLOOD + MARRIAGE EDGES
   source & target are companion ranks
   ═════════════════════════════════════════════════════════════════════ */
export const FAMILY_EDGES: GraphEdge[] = [
  // Abu Bakr family
  { source:  1, target:  5, label: 'Father → Daughter (Aisha)',   strength: 1   },
  { source:  1, target:  2, label: 'Father-in-law of Umar (Asma married Umar\'s brother)', strength: .6 },
  // Umar family
  { source:  2, target:  5, label: 'Umar\'s daughter Hafsa = wife of Prophet ﷺ — Aisha is step-wife relation', strength: .5 },
  // Uthman family (married two daughters of Prophet ﷺ)
  { source:  3, target:  4, label: 'Both married into Prophet\'s ﷺ family',      strength: .5 },
  // Ali family
  { source:  4, target:  5, label: 'Aisha + Ali — both beloved by Prophet ﷺ',    strength: .4 },
  { source:  4, target:  7, label: 'Ali + Hamza — cousins',                       strength: .9 },
  { source:  4, target:  6, label: 'Ali + Zayd — both raised in Prophet\'s ﷺ home', strength: .7 },
  // Hamza
  { source:  7, target:  1, label: 'Hamza is milk-uncle of Abu Bakr\'s daughter', strength: .4 },
  // Khadija / Prophet's family circle
  { source:  5, target: 19, label: 'Aisha + Ibn Abbas — uncle-niece relationship', strength: .8 },
  // Anas ibn Malik family
  { source: 13, target:  5, label: 'Anas\'s half-sister Abu Talha married — extended Ansar family', strength: .4 },
  // Bilal + Abu Bakr (freed slave — brotherhood bond)
  { source: 10, target:  1, label: 'Freed by Abu Bakr — Islamic brotherhood',     strength: .8 },
  // Sa'd ibn Abi Waqqas — maternal uncle of Prophet ﷺ
  { source:  8, target:  4, label: 'Both of Hashim lineage — tribal cousins',      strength: .6 },
  // Salman al-Farisi — adopted into Prophet's family as "Ahl al-Bayt" (hadith)
  { source: 29, target:  4, label: 'Prophet ﷺ declared Salman Ahl al-Bayt',        strength: .7 },
  // Abu Ubayda — no direct blood but very close
  { source:  9, target:  1, label: 'Abu Ubayda + Abu Bakr — closest inner circle', strength: .6 },
  // Abd al-Rahman ibn Awf — married Abu Bakr's daughter
  { source: 11, target:  1, label: 'Married Abu Bakr\'s daughter Umm Kulthum',     strength: .8 },
  // Usama ibn Zayd (rank 20 approx) — son of Zayd, beloved of Prophet ﷺ
  { source: 20, target:  6, label: 'Usama ibn Zayd — son of Zayd (rank 6)',        strength: 1   },
  { source: 20, target:  5, label: 'Usama + Aisha — step-relationship through Prophet ﷺ family', strength: .5 },
  // Asma bint Umays — wife of Ja'far, then Abu Bakr
  { source: 40, target:  1, label: 'Asma bint Umays married Abu Bakr after Ja\'far\'s martyrdom', strength: .8 },
  // Khalid + Umar — allied by conquest
  { source: 12, target:  2, label: 'Khalid commanded by Umar; Umar eventually dismissed him', strength: .5 },
  // Abdullah ibn Umar (rank ~30) + Umar
  { source: 30, target:  2, label: 'Abdullah ibn Umar — son of Umar',             strength: 1   },
  { source: 30, target:  5, label: 'Ibn Umar + Aisha — shared many narrations',   strength: .5  },
];

/* ═══════════════════════════════════════════════════════════════════════
   WEALTH LEVELS  (1–10 scale, for node sizing in trade layer)
   ═════════════════════════════════════════════════════════════════════ */
export const WEALTH_LEVELS: Record<number, number> = {
  1:  9,   // Abu Bakr — spent entire fortune
  2:  6,   // Umar — moderate wealth
  3:  8,   // Uthman — enormously wealthy
  4:  3,   // Ali — minimal personal wealth
  5:  2,   // Aisha — scholarship not trade
  6:  2,   // Zayd — servant background
  7:  5,   // Hamza — warrior nobleman
  8:  4,   // Sa'd — noble but not wealthy merchant
  9:  4,   // Abu Ubayda — moderate
  10: 1,   // Bilal — enslaved background
  11: 10,  // Abd al-Rahman ibn Awf — richest companion
  12: 5,   // Khalid — warrior noble
  13: 2,   // Anas — servant boy
  14: 1,   // Wahshi — enslaved background
  15: 1,   // Abu Dharr — anti-wealth ascetic
  17: 2,   // Abu Hurayra — poor
  18: 3,   // Zayd ibn Thabit — scribe
  19: 4,   // Ibn Abbas — noble family
  22: 1,   // Ibn Masud — shepherd background
  27: 1,   // Ammar — enslaved family
  29: 1,   // Salman — Persian slave background
  37: 8,   // Abu Sufyan — wealthy Qurayshi chief
};

/* ═══════════════════════════════════════════════════════════════════════
   LAYER 2 — TRADE / COMMERCIAL EDGES
   ═════════════════════════════════════════════════════════════════════ */
export const TRADE_EDGES: GraphEdge[] = [
  { source:  1, target: 11, label: 'Abu Bakr + Abd al-Rahman — major trading partners', strength: .9 },
  { source:  1, target:  3, label: 'Abu Bakr + Uthman — both Quraysh textile merchants', strength: .8 },
  { source:  3, target: 11, label: 'Uthman + Abd al-Rahman — commercial alliance & market co-founders', strength: .9 },
  { source:  2, target: 11, label: 'Umar + Abd al-Rahman — Umar relied on Ibn Awf for state economics', strength: .6 },
  { source: 11, target:  8, label: 'Abd al-Rahman + Sa\'d — traded routes to Syria', strength: .7 },
  { source:  7, target:  1, label: 'Hamza + Abu Bakr — trading connections pre-Islam', strength: .5 },
  { source: 37, target:  3, label: 'Abu Sufyan + Uthman — Umayyad commercial alliance', strength: .7 },
  { source: 37, target: 11, label: 'Abu Sufyan + Abd al-Rahman — both major Quraysh traders', strength: .6 },
  { source:  9, target: 11, label: 'Abu Ubayda + Ibn Awf — co-founders of Medina market structure', strength: .6 },
  { source: 11, target: 12, label: 'Ibn Awf + Khalid — financed early conquests', strength: .5 },
  { source: 29, target:  8, label: 'Salman + Sa\'d — established trade in Iraq after conquest', strength: .6 },
  { source: 19, target:  3, label: 'Ibn Abbas + Uthman — Ibn Abbas was close to Uthman\'s caliphate', strength: .4 },
];

/* ═══════════════════════════════════════════════════════════════════════
   LAYER 3 — IKHTILAF (SCHOLARLY DISAGREEMENT) EDGES
   source and target disagreed on this fiqh/theological matter
   ═════════════════════════════════════════════════════════════════════ */
export const IKHTILAF_EDGES: GraphEdge[] = [
  // Abu Bakr vs Umar — Ridda wars (Abu Bakr fought apostates; Umar initially disagreed)
  { source:  1, target:  2, label: 'Ridda Wars: Abu Bakr decided to fight; Umar initially opposed', strength: .7 },
  // Umar vs Aisha — many juristic differences
  { source:  2, target:  5, label: 'Mut\'a marriage (Umar abolished; Aisha narrated different rulings)', strength: .8 },
  // Umar vs Ali — succession / political differences
  { source:  2, target:  4, label: 'Succession after Prophet ﷺ: Ali believed he had prior right; Umar chose Abu Bakr', strength: .9 },
  // Ali vs Aisha — Battle of Jamal
  { source:  4, target:  5, label: 'Battle of the Camel (36 AH): political / military confrontation', strength: 1   },
  // Ibn Abbas vs Zayd ibn Thabit — inheritance calculations
  { source: 19, target: 18, label: 'Inheritance (\'awl): Ibn Abbas rejected the \'awl doctrine; Zayd supported it', strength: .8 },
  // Ibn Abbas vs Umar — temporary marriage and finger-cut theft
  { source: 19, target:  2, label: 'Multiple juristic differences: wine prohibition wording, pilgrimage rites', strength: .7 },
  // Ibn Masud vs others — Quran compilation (opposed Uthman\'s burning of variant copies)
  { source: 22, target:  3, label: 'Ibn Masud refused to surrender his personal mushaf; opposed Uthmani compilation', strength: .9 },
  { source: 22, target: 18, label: 'Ibn Masud vs Zayd: disputed some Quranic order and surah inclusions', strength: .7 },
  // Abu Dharr vs Uthman — wealth distribution (Abu Dharr was anti-wealth accumulation)
  { source: 15, target:  3, label: 'Abu Dharr publicly criticized the wealth of Uthman and companions — exiled to Rabadha', strength: 1  },
  { source: 15, target: 11, label: 'Abu Dharr vs Ibn Awf: openly condemned commercial wealth as forbidden hoarding', strength: .8 },
  // Muawiyah vs Ali — Siffin and Quran arbitration
  { source:  4, target: 42, label: 'Battle of Siffin (37 AH): Ali vs Muawiyah on the caliphate legitimacy', strength: 1   },
  // Abu Hurayra vs Umar — number of hadiths narrated (Umar limited hadith narration)
  { source: 17, target:  2, label: 'Umar restricted excessive hadith narration; Abu Hurayra defied this in practice', strength: .7 },
  // Ammar vs Uthman — political opposition
  { source: 27, target:  3, label: 'Ammar ibn Yasir opposed Uthman\'s policies and was beaten by his supporters', strength: .8 },
  // Khalid vs Umar — Khalid killed an ally (incident at Malik ibn Nuwayra); Umar demanded punishment
  { source: 12, target:  2, label: 'Killing of Malik ibn Nuwayra: Umar demanded Khalid be punished; Abu Bakr pardoned', strength: .8 },
];

/* ═══════════════════════════════════════════════════════════════════════
   CITY POSITIONS FOR DIASPORA VIEW
   Normalized 0-1 coordinates for a ~700×440 SVG world map
   roughly centred on the Arabian Peninsula
   ═════════════════════════════════════════════════════════════════════ */
export const CITY_POSITIONS: Record<string, CityPosition> = {
  'Mecca':          { name: 'Mecca',          x: .52, y: .60, label: 'مكة المكرمة' },
  'Medina':         { name: 'Medina',          x: .50, y: .52, label: 'المدينة المنورة' },
  'Taif':           { name: 'Taif',            x: .53, y: .63 },
  'Mada\'in':       { name: "Mada'in",         x: .63, y: .38 },
  'Damascus':       { name: 'Damascus',        x: .44, y: .32 },
  'Jerusalem':      { name: 'Jerusalem',       x: .41, y: .36 },
  'Cairo':          { name: 'Cairo/Egypt',     x: .33, y: .40 },
  'Kufa':           { name: 'Kufa',            x: .61, y: .40 },
  'Basra':          { name: 'Basra',           x: .64, y: .46 },
  'Baghdad':        { name: 'Baghdad',         x: .62, y: .36 },
  'Persia':         { name: 'Persia/Isfahan',  x: .72, y: .34 },
  'Abyssinia':      { name: 'Abyssinia',       x: .48, y: .76 },
  'Constantinople': { name: 'Constantinople',  x: .38, y: .20 },
  'Yemen':          { name: "San'a (Yemen)",   x: .54, y: .73 },
  'Najd':           { name: 'Najd',            x: .56, y: .55 },
  'Syria':          { name: 'Syria (Sham)',    x: .44, y: .30 },
  'Iraq':           { name: 'Iraq',            x: .62, y: .40 },
  'Najaf':          { name: 'Najaf',           x: .61, y: .43 },
  'Hims':           { name: 'Homs (Hims)',     x: .43, y: .28 },
  'Alexandria':     { name: 'Alexandria',      x: .31, y: .38 },
  'Tunisia':        { name: 'North Africa',    x: .22, y: .32 },
  'Andalus':        { name: 'Al-Andalus',      x: .12, y: .28 },
  'Bahrain':        { name: 'Bahrain',         x: .65, y: .53 },
  'Makran':         { name: 'Makran (Pakistan)',x:.78, y: .48 },
  'Khurasan':       { name: 'Khurasan',        x: .78, y: .32 },
  'Rabadha':        { name: 'Rabadha',         x: .55, y: .58 },
  'Azruh':          { name: 'Azruh (Jordan)',  x: .43, y: .37 },
};

/* Companion rank → primary city for diaspora view */
export const COMPANION_CITY: Record<number, string> = {
  1:'Medina',  2:'Medina',  3:'Medina',  4:'Najaf',   5:'Medina',
  6:'Medina',  7:'Mecca',   8:'Kufa',    9:'Sham',    10:'Damascus',
  11:'Medina', 12:'Syria',  13:'Basra',  14:'Kufa',   15:'Rabadha',
  16:'Medina', 17:'Medina', 18:'Medina', 19:'Mecca',  20:'Medina',
  21:'Medina', 22:'Kufa',   23:'Medina', 24:'Medina', 25:'Medina',
  26:'Medina', 27:'Kufa',   28:'Medina', 29:'Mada\'in',30:'Medina',
  31:'Medina', 32:'Syria',  33:'Medina', 34:'Medina', 35:'Medina',
  36:'Medina', 37:'Damascus',38:'Medina',39:'Medina', 40:'Medina',
  41:'Medina', 42:'Damascus',43:'Medina',44:'Medina', 45:'Syria',
  46:'Medina', 47:'Kufa',   48:'Medina', 49:'Medina', 50:'Basra',
  51:'Medina', 52:'Kufa',   53:'Kufa',   54:'Medina', 55:'Medina',
  56:'Medina', 57:'Medina', 58:'Medina', 59:'Medina', 60:'Medina',
  61:'Medina', 62:'Medina', 63:'Medina', 64:'Medina', 65:'Medina',
  66:'Medina', 67:'Medina', 68:'Medina', 69:'Medina', 70:'Medina',
  71:'Medina', 72:'Medina', 73:'Medina', 74:'Medina', 75:'Medina',
  76:'Medina', 77:'Medina', 78:'Medina', 79:'Medina', 80:'Medina',
  81:'Medina', 82:'Medina', 83:'Medina', 84:'Medina', 85:'Medina',
  86:'Medina', 87:'Medina', 88:'Medina', 89:'Medina', 90:'Medina',
  91:'Medina', 92:'Medina', 93:'Medina', 94:'Medina', 95:'Medina',
  96:'Medina', 97:'Medina', 98:'Medina', 99:'Medina',100:'Medina',
  101:'Medina',102:'Medina',103:'Medina',
};

/* ═══════════════════════════════════════════════════════════════════════
   KEY EVENTS  (for "Who was alive during X" dropdown)
   ═════════════════════════════════════════════════════════════════════ */
export const KEY_EVENTS: KeyEvent[] = [
  { label: 'First Revelation (0 AH / 610 CE)',     yearAH:   0, note: 'Surah Al-Alaq revealed at Cave Hira' },
  { label: 'Hijra — Migration to Medina (1 AH)',   yearAH:   1, note: 'Foundation of the Islamic state' },
  { label: 'Battle of Badr (2 AH)',                yearAH:   2, note: 'First major victory of Islam' },
  { label: 'Battle of Uhud (3 AH)',                yearAH:   3, note: 'Hamza martyred; test of resolve' },
  { label: 'Battle of Khandaq (5 AH)',             yearAH:   5, note: 'Salman\'s trench saved Medina' },
  { label: 'Treaty of Hudaybiyyah (6 AH)',         yearAH:   6, note: 'Strategic peace with Quraysh' },
  { label: 'Conquest of Mecca (8 AH)',             yearAH:   8, note: 'Islam\'s greatest bloodless victory' },
  { label: 'Farewell Pilgrimage (10 AH)',          yearAH:  10, note: 'Prophet\'s ﷺ last Hajj' },
  { label: 'Death of Prophet ﷺ (11 AH)',           yearAH:  11, note: 'Abu Bakr becomes first Caliph' },
  { label: 'Ridda Wars end (12 AH)',               yearAH:  12, note: 'Arabia unified under Abu Bakr' },
  { label: 'Battle of Yamama (12 AH)',             yearAH:  12, note: '700 Quran-memorizers killed' },
  { label: 'Battle of Yarmouk (15 AH)',            yearAH:  15, note: 'Syria opens to Islam' },
  { label: 'Battle of Qadisiyya (15 AH)',          yearAH:  15, note: 'Persia falls to Sa\'d ibn Abi Waqqas' },
  { label: 'Caliphate of Uthman begins (24 AH)',   yearAH:  24, note: 'Quran standardized' },
  { label: 'Uthman\'s Martyrdom (35 AH)',          yearAH:  35, note: 'First major civil strife (fitna)' },
  { label: 'Battle of Jamal (36 AH)',              yearAH:  36, note: 'Ali vs Aisha; political rupture' },
  { label: 'Battle of Siffin (37 AH)',             yearAH:  37, note: 'Ali vs Muawiyah; arbitration crisis' },
  { label: 'Martyrdom of Ali (40 AH)',             yearAH:  40, note: 'End of the Rightly-Guided Caliphs' },
  { label: 'Year of the Congregation (41 AH)',     yearAH:  41, note: 'Hasan transfers caliphate to Muawiyah' },
  { label: 'Death of Muawiyah (60 AH)',            yearAH:  60, note: 'Yazid takes power; Husayn refuses bayah' },
  { label: 'End of Companion Era (~100 AH)',       yearAH: 100, note: 'Death of last major companions' },
];

/* ═══════════════════════════════════════════════════════════════════════
   COMMUNITY GROWTH DATA  (feature 21 — growth animation)
   ═════════════════════════════════════════════════════════════════════ */
export const GROWTH_DATA: GrowthPoint[] = [
  { yearAH: -12, yearCE: 610, count:     1, note: 'Khadija — first Muslim' },
  { yearAH: -11, yearCE: 611, count:     4, note: 'Abu Bakr, Ali, Zayd join' },
  { yearAH: -10, yearCE: 612, count:    15, note: 'First batch of companions' },
  { yearAH:  -9, yearCE: 613, count:    40, note: 'Open invitation begins' },
  { yearAH:  -8, yearCE: 614, count:   100, note: 'House of al-Arqam group' },
  { yearAH:  -7, yearCE: 615, count:   200, note: 'First Hijra to Abyssinia (83 companions)' },
  { yearAH:  -4, yearCE: 618, count:   400, note: 'Umar + Hamza convert — prestige surge' },
  { yearAH:   0, yearCE: 622, count:   600, note: 'Hijra to Medina; Ansar join' },
  { yearAH:   1, yearCE: 623, count:  1500, note: 'Medina community established' },
  { yearAH:   2, yearCE: 624, count:  3000, note: 'After Badr — rapid growth' },
  { yearAH:   5, yearCE: 627, count:  5000, note: 'Before Khandaq' },
  { yearAH:   6, yearCE: 628, count:  6000, note: 'Hudaybiyyah — conversion boom' },
  { yearAH:   8, yearCE: 630, count: 10000, note: 'Conquest of Mecca — Abu Sufyan converts' },
  { yearAH:   9, yearCE: 631, count: 30000, note: 'Tabuk expedition — mass pledges' },
  { yearAH:  10, yearCE: 632, count: 70000, note: 'Farewell Pilgrimage — 100,000+ present' },
  { yearAH:  11, yearCE: 633, count:100000, note: 'Prophet ﷺ passes — ummah secured' },
];

/* ═══════════════════════════════════════════════════════════════════════
   MIGRATION PATHS  (feature 17 — companion rank → journey)
   ═════════════════════════════════════════════════════════════════════ */
export const MIGRATION_PATHS: Record<number, MigrationStep[]> = {
  1: [
    { city: 'Mecca',   yearAH: -49, note: 'Born in Mecca; merchant life begins' },
    { city: 'Taif',    yearAH:  -5, note: 'Trade journeys to Taif' },
    { city: 'Medina',  yearAH:   1, note: 'Hijra with the Prophet ﷺ — Cave Thawr journey' },
    { city: 'Medina',  yearAH:  13, note: 'Died and buried at Masjid al-Nabawi' },
  ],
  2: [
    { city: 'Mecca',     yearAH: -38, note: 'Born; noble of Quraysh Adi clan' },
    { city: 'Medina',    yearAH:   1, note: 'Hijra — announced Islam publicly at Ka\'ba first' },
    { city: 'Jerusalem', yearAH:  16, note: 'Travelled to accept keys of Jerusalem personally' },
    { city: 'Medina',    yearAH:  23, note: 'Martyred at Masjid al-Nabawi in Fajr prayer' },
  ],
  4: [
    { city: 'Mecca',   yearAH: -22, note: 'Born in Ka\'ba — first birth inside Ka\'ba in Islamic history' },
    { city: 'Medina',  yearAH:   1, note: 'Slept in Prophet\'s ﷺ bed during Hijra night' },
    { city: 'Basra',   yearAH:  36, note: 'Battle of Jamal — defeated Aisha\'s army' },
    { city: 'Kufa',    yearAH:  37, note: 'Made Kufa capital; administered from there' },
    { city: 'Najaf',   yearAH:  40, note: 'Martyred at Kufa mosque; buried at Najaf' },
  ],
  5: [
    { city: 'Mecca',   yearAH:  -8, note: 'Born in Mecca to Abu Bakr' },
    { city: 'Medina',  yearAH:   1, note: 'Moved with family at Hijra' },
    { city: 'Medina',  yearAH:  58, note: 'Died in Medina after long scholarly life' },
  ],
  7: [
    { city: 'Mecca',   yearAH: -50, note: 'Born; Prophet\'s ﷺ paternal uncle, lion-hunter' },
    { city: 'Medina',  yearAH:   1, note: 'Hijra — Islam\'s protector' },
    { city: 'Uhud',    yearAH:   3, note: 'Martyred at Battle of Uhud; buried on the battlefield' },
  ],
  10: [
    { city: 'Mecca',   yearAH: -35, note: 'Born into slavery; owned by Umayya ibn Khalaf' },
    { city: 'Medina',  yearAH:   1, note: 'Freed by Abu Bakr; first muezzin' },
    { city: 'Damascus', yearAH: 12, note: 'Moved to Syria after Prophet\'s ﷺ death; gave final adhan there' },
    { city: 'Damascus', yearAH: 20, note: 'Died in Damascus (or Aleppo) — buried in Syria' },
  ],
  12: [
    { city: 'Mecca',   yearAH: -20, note: 'Born; brilliant military strategist of Quraysh' },
    { city: 'Medina',  yearAH:   8, note: 'Converted to Islam; given title "Sword of Allah"' },
    { city: 'Syria',   yearAH:  15, note: 'Led conquest of Syria — undefeated general' },
    { city: 'Hims',    yearAH:  21, note: 'Died in Homs/Medina — never defeated in 100+ battles' },
  ],
  13: [
    { city: 'Medina',  yearAH: -10, note: 'Born in Medina to Ansar family' },
    { city: 'Medina',  yearAH:   1, note: 'Placed as servant of Prophet ﷺ at age 10' },
    { city: 'Basra',   yearAH:  45, note: 'Appointed governor of Basra by Ali' },
    { city: 'Basra',   yearAH:  93, note: 'Died at Basra aged ~103 — last major companion' },
  ],
  22: [
    { city: 'Mecca',   yearAH: -35, note: 'Born outside Mecca — shepherd tending flocks' },
    { city: 'Medina',  yearAH:   1, note: 'Hijra; closest attendant to Prophet ﷺ' },
    { city: 'Kufa',    yearAH:  23, note: 'Sent to Kufa by Umar to teach Quran; stayed 20+ years' },
    { city: 'Medina',  yearAH:  32, note: 'Recalled by Uthman; died in Medina refusing to give mushaf' },
  ],
  29: [
    { city: 'Persia',  yearAH: -35, note: 'Born in Isfahan to Zoroastrian priest family' },
    { city: 'Syria',   yearAH: -20, note: '15 years serving Christian monks across Syria' },
    { city: 'Medina',  yearAH:   5, note: 'Arrived in Medina; converted; suggested the Trench tactic' },
    { city: "Mada'in", yearAH:  21, note: 'Appointed governor of al-Mada\'in (Ctesiphon) by Umar' },
    { city: "Mada'in", yearAH:  36, note: 'Died in Mada\'in; one of the greatest companions of non-Arab origin' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   30-DIMENSION COMPARISON FIELDS  (feature 28)
   ═════════════════════════════════════════════════════════════════════ */
export const COMPARISON_DIMS = [
  { key: 'rank',         label: 'Rank',               group: 'Identity'   },
  { key: 'ar',           label: 'Arabic Name',         group: 'Identity'   },
  { key: 'title',        label: 'Title / Laqab',       group: 'Identity'   },
  { key: 'catLabel',     label: 'Category',            group: 'Identity'   },
  { key: 'born',         label: 'Born',                group: 'Life'       },
  { key: 'death',        label: 'Died',                group: 'Life'       },
  { key: 'place',        label: 'Origin',              group: 'Life'       },
  { key: 'tribe',        label: 'Tribe',               group: 'Life'       },
  { key: 'burial',       label: 'Burial Place',        group: 'Life'       },
  { key: 'rel',          label: 'Relationship to ﷺ',  group: 'Relationship'},
  { key: 'relType',      label: 'Rel. Type',           group: 'Relationship'},
  { key: 'hadiths',      label: 'Hadiths Narrated',    group: 'Scholarship'},
  { key: 'battles',      label: 'Battles',             group: 'Military'   },
  { key: 'cat',          label: 'Role',                group: 'Military'   },
  { key: 'sig',          label: 'Historical Significance', group: 'Legacy' },
  { key: 'keyEvent',     label: 'Key Event',           group: 'Legacy'     },
  { key: 'quoteEn',      label: 'Famous Quote',        group: 'Legacy'     },
  { key: 'legacy',       label: 'Legacy',              group: 'Legacy'     },
  { key: 'appearance',   label: 'Physical Description',group: 'Character'  },
  { key: 'miracles',     label: 'Miracles & Distinctions', group: 'Character'},
  { key: 'personality',  label: 'Personality Traits',  group: 'Character'  },
  { key: 'link',         label: 'Prophetic Testimony', group: 'Prophetic'  },
  { key: 'contrib',      label: 'Contributions',       group: 'Prophetic'  },
  { key: 'caliphate',    label: 'Caliphate Period',     group: 'Political'  },
  { key: '_tabaqat',     label: 'Tabaqat Generation',  group: 'Historical' },
  { key: '_wealthLevel', label: 'Wealth Level (1–10)', group: 'Historical' },
  { key: '_cityName',    label: 'Primary City',        group: 'Geographic' },
  { key: '_birthAH',     label: 'Birth (AH)',          group: 'Geographic' },
  { key: '_deathAH',     label: 'Death (AH)',          group: 'Geographic' },
  { key: '_isEnemy',     label: 'Former Enemy of Islam',group: 'Historical'},
] as const;

/* ═══════════════════════════════════════════════════════════════════════
   TEACHER → STUDENT PAIRS  (Feature 63)
   companion rank → array of tabi'i names they directly taught
   ═════════════════════════════════════════════════════════════════════ */
export interface TeacherStudentEdge {
  teacherRank: number;   // companion rank
  studentName: string;   // tabi'i name
  studentAr: string;
  subject: string;       // what they transmitted
  legacy: string;        // how it shaped scholarship
}

export const TEACHER_STUDENT_EDGES: TeacherStudentEdge[] = [
  // Abu Bakr's transmission line
  { teacherRank:1, studentName:"Urwa ibn al-Zubayr",      studentAr:"عروة بن الزبير",    subject:"Sira and early Islamic history", legacy:"Became the first systematic biographer — his accounts form the backbone of Ibn Hisham's Seerah" },
  { teacherRank:1, studentName:"Qasim ibn Muhammad",      studentAr:"القاسم بن محمد",    subject:"Fiqh and caliphate history",     legacy:"One of the Seven Jurists of Medina; transmitted Abu Bakr's legal positions" },
  // Umar's transmission line
  { teacherRank:2, studentName:"Nafi' mawla Ibn Umar",    studentAr:"نافع مولى ابن عمر", subject:"Sunnah and Medina practice",     legacy:"The 'Golden Chain': Malik←Nafi'←Ibn Umar←Prophet ﷺ — most authenticated isnad" },
  { teacherRank:2, studentName:"Said ibn al-Musayyab",    studentAr:"سعيد بن المسيب",    subject:"Fiqh and companion opinions",    legacy:"Greatest tabi'i jurist — his rulings form the foundation of Maliki fiqh" },
  { teacherRank:2, studentName:"Masruq ibn al-Ajdad",     studentAr:"مسروق بن الأجدع",   subject:"Hadith and Quran interpretation","legacy":"Primary transmitter of Umar's legal opinions and Aisha's hadiths" },
  // Uthman's transmission line
  { teacherRank:3, studentName:"Sa'id ibn al-Musayyab",   studentAr:"سعيد بن المسيب",    subject:"Quran compilation and Uthman's rulings", legacy:"Preserved Uthman's fatawa — including the authoritative Uthmanic mushaf decisions" },
  // Ali's transmission line
  { teacherRank:4, studentName:"Masruq ibn al-Ajdad",     studentAr:"مسروق",              subject:"Ali's jurisprudence",            legacy:"Transmitted Ali's fatawa on prayer, blood money, and governance" },
  { teacherRank:4, studentName:"Shuraih al-Qadi",         studentAr:"شريح القاضي",        subject:"Islamic judicial procedure",     legacy:"First professional Islamic judge; trained by Ali — shaped all subsequent judicial tradition" },
  // Aisha's transmission line
  { teacherRank:5, studentName:"Urwa ibn al-Zubayr",      studentAr:"عروة بن الزبير",    subject:"2,210 hadiths across all topics", legacy:"Urwa was Aisha's nephew — took ALL her narrations; became the channel for half of Islamic fiqh" },
  { teacherRank:5, studentName:"Amra bint Abd al-Rahman", studentAr:"عمرة بنت عبد الرحمن",subject:"Women's fiqh and family law",    legacy:"Primary female tabi'iyya for Aisha's rulings on women — Imam Malik cited her constantly" },
  { teacherRank:5, studentName:"Masruq ibn al-Ajdad",     studentAr:"مسروق",              subject:"Aisha's hadith narrations",      legacy:"Masruq and Urwa together transmitted ~90% of what we know from Aisha" },
  // Ibn Abbas's transmission line
  { teacherRank:19, studentName:"Ata ibn Abi Rabah",      studentAr:"عطاء بن أبي رباح",  subject:"Quran tafsir and Hajj rituals",  legacy:"Greatest mufassir after Ibn Abbas; his tafsir became the base for all subsequent commentary" },
  { teacherRank:19, studentName:"Mujahid ibn Jabr",       studentAr:"مجاهد بن جبر",       subject:"Quran interpretation",           legacy:"Mujahid read the Quran with Ibn Abbas 30 times — his tafsir is cited by al-Bukhari 300+ times" },
  { teacherRank:19, studentName:"Ikrima mawla Ibn Abbas", studentAr:"عكرمة مولى ابن عباس",subject:"Tafsir and hadith",               legacy:"Transmitted Ibn Abbas's entire hadith corpus — became foundation of fiqh in North Africa" },
  { teacherRank:19, studentName:"Sa'id ibn Jubayr",       studentAr:"سعيد بن جبير",       subject:"Quran sciences",                 legacy:"Martyred by al-Hajjaj — one of the most revered tabi'i scholars; his tafsir is preserved" },
  // Ibn Masud's transmission line
  { teacherRank:22, studentName:"Alqama al-Nakha'i",      studentAr:"علقمة النخعي",       subject:"Hadith and Ibn Masud's fiqh",    legacy:"Ibn Masud's primary student — teacher of Ibrahim al-Nakha'i — teacher of Hammad — teacher of Abu Hanifa: the Hanafi chain" },
  { teacherRank:22, studentName:"Masruq ibn al-Ajdad",    studentAr:"مسروق",              subject:"Quran recitation methodology",   legacy:"Transmitted Ibn Masud's unique recitation style — one of the most honored readers in early Islam" },
  // Anas ibn Malik's transmission line
  { teacherRank:13, studentName:"al-Hasan al-Basri",      studentAr:"الحسن البصري",       subject:"Prophetic ethics and zuhd",      legacy:"Greatest preacher of the tabi'in generation; his sermons shaped Islamic spiritual tradition for centuries" },
  { teacherRank:13, studentName:"Muhammad ibn Sirin",     studentAr:"محمد بن سيرين",      subject:"Dream interpretation + hadith",  legacy:"The foremost expert on dream interpretation in Islamic tradition — his work used to this day" },
  { teacherRank:13, studentName:"Thabit al-Bunani",       studentAr:"ثابت البناني",        subject:"Daily prophetic behavior",       legacy:"Preserved the most intimate narrations about the Prophet's ﷺ daily routine" },
  // Abu Hurayra's transmission line
  { teacherRank:17, studentName:"Hammam ibn Munabbih",    studentAr:"همام بن منبه",        subject:"5,374 hadiths directly",         legacy:"Wrote the Sahifah Hammam — the oldest dated hadith manuscript in existence (30 AH)" },
  { teacherRank:17, studentName:"Ibn al-Musayyab",        studentAr:"ابن المسيب",          subject:"Hadith and fiqh",                legacy:"Abu Hurayra's son-in-law — took his entire collection; became the bridge to Maliki fiqh" },
  // Sa'd ibn Abi Waqqas's line
  { teacherRank:8, studentName:"Aamir ibn Sa'd",          studentAr:"عامر بن سعد",         subject:"Father's hadiths and battles",   legacy:"Primary transmitter of Sa'd's narrations — many Sahih hadiths pass through him" },
];
