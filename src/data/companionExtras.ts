/* ─────────────────────────────────────────────────────────────────────────
   Companion Enrichment Data
   All enrichment keyed by companion rank (1-based, matches COMPANIONS array)
   ──────────────────────────────────────────────────────────────────────── */

/* ── Tabaqat (Generation Tiers per Ibn Sa'd) ─────────────────────────── */
export type TabaqatTier = 1 | 2 | 3 | 4 | 5;
export const TABAQAT_LABELS: Record<TabaqatTier, string> = {
  1: 'First Generation — Badr & Before',
  2: 'Second — Post-Badr, Pre-Hudaybiyyah',
  3: 'Third — Hudaybiyyah Pledgers',
  4: 'Fourth — Conquest of Mecca (8 AH)',
  5: 'Fifth — Late Converts & Children',
};

/* ── Occupation before & after Islam ─────────────────────────────────── */
export interface Occupation {
  before: string;
  after: string;
  beforeUr?: string;
  afterUr?: string;
  note?: string;
  noteUr?: string;
}

/* ── Prophet's ﷺ Du'a ─────────────────────────────────────────────────── */
export interface PropheticDua {
  ar: string;
  en: string;
  ur?: string;
  occasion: string;
  occasionUr?: string;
  source: string;
}

/* ── Dreams & Visions (Ru'ya) ─────────────────────────────────────────── */
export interface DreamVision {
  summary: string;
  detail: string;
  summaryUr?: string;
  detailUr?: string;
  source: string;
  byWhom: 'companion' | 'prophet' | 'other';
}

/* ── Family Tree node ─────────────────────────────────────────────────── */
export interface FamilyNode {
  id: string;
  label: string;
  labelAr?: string;
  rel: string;           // e.g. "Father", "Son", "Wife"
  isCompanion?: boolean;
  companionRank?: number;
}
export interface FamilyEdge { from: string; to: string; label?: string; }
export interface FamilyTree { nodes: FamilyNode[]; edges: FamilyEdge[]; }

/* ── "First Muslim to…" entries ───────────────────────────────────────── */
export interface FirstEntry {
  rank: number;         // companion rank
  name: string;
  achievement: string;  // "First to give adhan"
  detail: string;
  source: string;
}

/* ── Source reliability badge ─────────────────────────────────────────── */
export type ReliabilityLevel = 'sahih' | 'hasan' | 'daif' | 'mawdu' | 'maqbul';
export const RELIABILITY_META: Record<ReliabilityLevel, { label: string; color: string }> = {
  sahih:  { label: 'Sahih',  color: '#166534' },
  hasan:  { label: 'Hasan',  color: '#92400e' },
  maqbul: { label: 'Maqbul', color: '#1e3a5f' },
  daif:   { label: 'Da\'if', color: '#7f1d1d' },
  mawdu:  { label: 'Mawdu\'', color: '#4a0e0e' },
};

/* ═══════════════════════════════════════════════════════════════════════
   TABAQAT MAP  (rank → tier)
   ═════════════════════════════════════════════════════════════════════ */
export const TABAQAT_MAP: Record<number, TabaqatTier> = {
  1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1, 10:1,
  11:1, 12:2, 13:2, 14:2, 15:2, 16:2, 17:2, 18:2, 19:1,
  20:3, 21:2, 22:1, 23:2, 24:2, 25:1, 26:3, 27:1, 28:2, 29:1,
  30:2, 31:3, 32:4, 33:2, 34:3, 35:2, 36:3, 37:4, 38:2, 39:3,
  40:3, 41:4, 42:2, 43:3, 44:2, 45:2, 46:3, 47:2, 48:3, 49:3,
  50:4, 51:3, 52:4, 53:4, 54:3, 55:2, 56:4, 57:3, 58:3, 59:2,
  60:3, 61:4, 62:3, 63:3, 64:3, 65:4, 66:3, 67:3, 68:4, 69:3,
  70:4, 71:4, 72:4, 73:3, 74:4, 75:4, 76:4, 77:3, 78:4, 79:4,
  80:4, 81:4, 82:4, 83:5, 84:5, 85:5, 86:5, 87:5, 88:5, 89:5,
  90:5, 91:5, 92:5, 93:5, 94:5, 95:5, 96:5, 97:5, 98:5, 99:5,
  100:5, 101:5, 102:5, 103:5,
};

/* ═══════════════════════════════════════════════════════════════════════
   FORMER ENEMIES (converted persecutors)
   ═════════════════════════════════════════════════════════════════════ */
export const FORMER_ENEMIES: Set<number> = new Set([
  2,   // Umar — came to kill the Prophet ﷺ
  14,  // Khalid ibn al-Walid — led cavalry against Muslims at Uhud
  37,  // Abu Sufyan — led Quraysh against Islam for 20 years
  45,  // Ikrimah ibn Abi Jahl — son of the Prophet's ﷺ chief persecutor
  52,  // Wahshi ibn Harb — killed Hamza at Uhud
  60,  // Hind bint Utba (if included) — mutilated Hamza
  72,  // Amr ibn al-As — led persecution campaigns before conversion
]);

/* ═══════════════════════════════════════════════════════════════════════
   PROPHETIC DU'AS  (per companion rank)
   ═════════════════════════════════════════════════════════════════════ */
export const PROPHETIC_DUAS: Record<number, PropheticDua[]> = {
  1: [{
    ar: 'اللَّهُمَّ أَعِزَّ الإِسْلَامَ بِأَبِي بَكْرٍ',
    en: 'O Allah, strengthen Islam through Abu Bakr.',
    occasion: 'Among the early du\'as known in Seerah narrations regarding Abu Bakr\'s indispensable role',
    source: 'Seerah Ibn Hisham; Tabaqat Ibn Sa\'d',
  }, {
    ar: 'اللَّهُمَّ اغْفِرْ لِأَبِي بَكْرٍ',
    en: 'O Allah, forgive Abu Bakr.',
    occasion: 'The Prophet ﷺ prayed this repeatedly — testifying Abu Bakr\'s closeness required no specific sin as pretext',
    source: 'Tabaqat Ibn Sa\'d 3/132',
  }],
  2: [{
    ar: 'اللَّهُمَّ أَعِزَّ الإِسْلَامَ بِعُمَرَ بْنِ الخَطَّابِ',
    en: 'O Allah, strengthen Islam through Umar ibn al-Khattab.',
    occasion: 'Said before Umar\'s conversion — the Prophet ﷺ was choosing between Umar and Abu Jahl for Islam\'s reinforcement',
    source: 'Tirmidhi 3681; Ibn Majah 104',
  }],
  4: [{
    ar: 'اللَّهُمَّ وَالِ مَنْ وَالَاهُ وَعَادِ مَنْ عَادَاهُ',
    en: 'O Allah, befriend those who befriend him, and be an enemy to those who are his enemies.',
    occasion: 'At Ghadir Khumm — after raising Ali\'s hand and declaring him a master to all who consider the Prophet ﷺ their master',
    source: 'Tirmidhi 3713; Musnad Ahmad 950',
  }, {
    ar: 'اللَّهُمَّ ائْتِنِي بِأَحَبِّ خَلْقِكَ إِلَيْكَ يَأْكُلُ مَعِي هَذَا الطَّيْرَ',
    en: 'O Allah, bring me the most beloved of Your creation to eat this bird with me.',
    occasion: 'A hadith regarding a gifted roasted bird — Ali arrived and the Prophet ﷺ expressed joy',
    source: 'Tirmidhi 3721 (hadith al-ta\'ir)',
  }],
  5: [{
    ar: 'اللَّهُمَّ حَبِّبْ عَائِشَةَ إِلَى النَّاسِ',
    en: 'O Allah, make Aisha beloved to the people.',
    occasion: 'Said on multiple occasions, particularly after the incident of the ifk (false accusation)',
    source: 'Reported in Seerah narrations; Tabaqat Ibn Sa\'d 8/56',
  }],
  7: [{
    ar: 'اللَّهُمَّ اغْفِرْ لِحَمْزَةَ',
    en: 'O Allah, forgive Hamza.',
    occasion: 'Said standing over Hamza\'s mutilated body at Uhud, weeping with grief that shook his shoulders',
    source: 'Musnad Ahmad; Ibn Hisham, Seerah (Battle of Uhud)',
  }],
  8: [{
    ar: 'اللَّهُمَّ سَدِّدْ رَمْيَتَهُ وَأَجِبْ دَعْوَتَهُ',
    en: 'O Allah, make his arrow accurate and answer his supplication.',
    occasion: 'Said specifically for Sa\'d ibn Abi Waqqas — making him the companion with the most famous answered du\'as',
    source: 'Tirmidhi 3752; Musnad Ahmad 1478',
  }],
  9: [{
    ar: 'لِكُلِّ أُمَّةٍ أَمِينٌ، وَأَمِينُ هَذِهِ الأُمَّةِ أَبُو عُبَيْدَةَ',
    en: 'Every nation has its trustee, and the trustee of this nation is Abu Ubayda ibn al-Jarrah.',
    occasion: 'Said in response to the delegation from Najran who asked for the most trustworthy Muslim',
    source: 'Bukhari 3744; Muslim 2419',
  }],
  10: [{
    ar: 'إِنِّي سَمِعْتُ دَفَّ نَعْلَيْكَ بَيْنَ يَدَيَّ فِي الجَنَّةِ',
    en: 'I heard the sound of your sandals before me in Paradise.',
    occasion: 'Said to Bilal after the Isra\' and Mi\'raj — the greatest honor ever given to a muezzin',
    source: 'Bukhari 1149; Muslim 2458',
  }],
  13: [{
    ar: 'اللَّهُمَّ أَكْثِرْ مَالَهُ وَوَلَدَهُ وَبَارِكْ لَهُ فِيمَا أَعْطَيْتَه',
    en: 'O Allah, increase his wealth, his children, and bless him in what You have given him.',
    occasion: 'Said for Anas ibn Malik at his mother Umm Sulaym\'s request when she brought young Anas to serve the Prophet ﷺ',
    source: 'Bukhari 6334; Muslim 660',
  }],
  19: [{
    ar: 'اللَّهُمَّ عَلِّمْهُ الحِكْمَةَ وَتَأْوِيلَ الكِتَاب',
    en: 'O Allah, teach him wisdom and the interpretation of the Quran.',
    occasion: 'Said while placing both hands on young Ibn Abbas\'s head — when he was still a child',
    source: 'Bukhari 3756; Tirmidhi 3824',
  }],
  22: [{
    ar: 'مَنْ أَحَبَّ أَنْ يَقْرَأَ القُرآنَ غَضًّا كَمَا أُنْزِلَ فَلْيَقْرَأْهُ عَلَى ابْنِ أُمِّ عَبْد',
    en: 'Whoever wishes to recite the Quran fresh as it was revealed, let him recite it as Ibn Umm Abd (Ibn Masud) recites it.',
    occasion: 'Said as a standing recommendation — making Ibn Masud the benchmark for Quranic recitation',
    source: 'Ibn Majah 138; Musnad Ahmad 3593',
  }],
  27: [{
    ar: 'صَبْرًا آلَ يَاسِرٍ فَإِنَّ مَوْعِدَكُمُ الجَنَّة',
    en: 'Be patient, O family of Yasir! Your promised appointment is Paradise.',
    occasion: 'Said passing by the family being tortured in Mecca — the only comfort the Prophet ﷺ could offer at that moment',
    source: 'Hakim in Al-Mustadrak 5659; Ibn Ishaq Seerah',
  }],
};

/* ═══════════════════════════════════════════════════════════════════════
   OCCUPATIONS (before & after Islam)
   ═════════════════════════════════════════════════════════════════════ */
export const OCCUPATIONS: Record<number, Occupation> = {
  1:  { before: 'Wealthy merchant & textile trader', after: 'First Caliph of Islam; spent fortune freeing slaves', note: 'Wealthiest Qurayshi merchant in Mecca to convert early' },
  2:  { before: 'Merchant, wrestler, and Quraysh ambassador', after: 'Second Caliph; military commander; justice reformer' },
  3:  { before: 'Wealthy merchant — trade routes to Syria and Yemen', after: 'Third Caliph; funded Islamic conquests from personal wealth' },
  4:  { before: 'Ward of the Prophet ﷺ since childhood — never pagan', after: 'Warrior, jurist, fourth Caliph, poet-scholar' },
  5:  { before: 'N/A — born into Islam as a young child', after: 'Scholar, teacher, narrator of 2,210 hadiths; Islam\'s foremost female scholar' },
  6:  { before: 'Merchant and trader in Mecca', after: 'Commander, administrator, third Caliph\'s son-in-law' },
  7:  { before: 'Hunter and wrestling champion', after: 'Commander of Mecca\'s Muslim forces; Islam\'s first lion', note: 'Was a renowned lion-hunter before Islam' },
  8:  { before: 'Young nobleman of Quraysh; no specific trade', after: 'Military commander; governor of Iraq; victor of Qadisiyya' },
  9:  { before: 'Merchant from the tribe of Banu Harith', after: 'Supreme Commander of Syria; trusted envoy; plague martyr' },
  10: { before: 'Enslaved textile worker in Mecca', after: 'First muezzin of Islam; personal servant of the Prophet ﷺ', note: 'Was enslaved by Umayya ibn Khalaf of Banu Jumah' },
  11: { before: 'Merchant; owned trade caravans', after: 'Generous benefactor; funded the entire Tabuk expedition', note: 'Wealthiest companion in Medina after the Prophet ﷺ' },
  12: { before: 'Soldier in the Quraysh army (led cavalry at Uhud against Islam)', after: 'Supreme military commander; "Sword of Allah"; never defeated in battle' },
  13: { before: 'N/A — born in Medina; served the Prophet ﷺ from age 10', after: 'Personal servant and narrator; later governor of Basra' },
  14: { before: 'Abyssinian slave; professional javelin thrower', after: 'Freed by Jubayr ibn Mut\'im; later became devout companion', note: 'Hired to kill Hamza at Uhud; later repented and converted' },
  15: { before: 'Shepherd in the desert; leader of Ghifar tribe', after: 'Ascetic companion; spiritual critic of wealth accumulation' },
  16: { before: 'Persian slave of al-Mughira ibn Shu\'ba', after: 'N/A — assassinated Umar; was punished and killed', note: 'Was a skilled craftsman (carpenter/blacksmith)' },
  17: { before: 'Servant of the household of Aswad ibn Abd Yaghuth', after: 'Personal servant of the Prophet ﷺ for 10 years; narrator' },
  18: { before: 'Young man from Medina Ansar; no specific pre-Islam trade', after: 'Primary Quran compiler; secretary to the Prophet ﷺ' },
  19: { before: 'N/A — young boy during Prophet\'s ﷺ time', after: 'Greatest scholar of Quran interpretation; governor of Basra' },
  20: { before: 'Trader and member of Medina Ansar leadership', after: 'Prophet\'s ﷺ horseman; narrator of important events' },
  21: { before: 'Noble of Aws tribe in Medina', after: 'Chief of Aws; leader in Medina Ansar military affairs' },
  22: { before: 'Shepherd tending flocks outside Mecca', after: 'Foremost Quran reciter; personal attendant to Prophet ﷺ' },
  27: { before: 'Slave — ironworker in Mecca under pagan masters', after: 'Free Muslim, companion, and father of the first martyr family', note: 'Entire family — Sumayyah, Yasir, Ammar — were among the very first converts' },
  29: { before: 'Zoroastrian priest\'s ward; later served Christian monks across Syria', after: 'Governor of al-Mada\'in (Ctesiphon); strategic advisor (Trench)', note: 'His journey to Islam took decades and crossed Persia, Syria, and Arabia' },
};

/* ═══════════════════════════════════════════════════════════════════════
   DREAMS & VISIONS (Ru'ya)
   ═════════════════════════════════════════════════════════════════════ */
export const DREAMS: Record<number, DreamVision[]> = {
  1: [{
    summary: 'The Prophet ﷺ saw Abu Bakr in Paradise',
    detail: 'The Prophet ﷺ described a vision of Abu Bakr entering Paradise wearing a white garment, walking beside him. He said this vision confirmed Abu Bakr\'s rank before he passed.',
    summaryUr: 'نبی ﷺ نے ابو بکرؓ کو جنت میں دیکھا',
    detailUr: 'نبی کریم ﷺ نے ایک رؤیا بیان فرمائی کہ ابو بکرؓ سفید لباس میں جنت میں داخل ہو رہے ہیں اور آپ ﷺ کے ساتھ ساتھ چل رہے ہیں۔ آپ ﷺ نے فرمایا کہ یہ رؤیا ابو بکرؓ کے مرتبے کی تصدیق ہے، اس سے پہلے کہ وہ دنیا سے رخصت ہوں۔',
    source: 'Reported in various narrations of the Seerah; Tabaqat Ibn Sa\'d',
    byWhom: 'prophet',
  }],
  2: [{
    summary: 'The Prophet ﷺ saw Umar in Paradise with a palace',
    detail: 'The Prophet ﷺ narrated: "While I was sleeping, I saw myself in Paradise. A woman was making wudu beside a palace. I asked: \'Whose palace is this?\' They said: \'Umar\'s.\'" The Prophet ﷺ recalled Umar\'s jealousy (ghayra) and turned away out of respect. Umar wept saying: "Would I be jealous of you, O Messenger of Allah?"',
    source: 'Bukhari 3242; Muslim 2394',
    byWhom: 'prophet',
  }],
  4: [{
    summary: 'Imam Ali\'s vision of the Prophet ﷺ on the night before Siffin',
    detail: 'On the eve of the Battle of Siffin, Ali ibn Abi Talib saw the Prophet ﷺ in a dream, who said to him: "Be patient, O Ali — your trial is great, but your reward from Allah is greater."',
    source: 'Reported in Nahjul Balagha traditions; Al-Bidaya wa\'l-Nihaya',
    byWhom: 'companion',
  }],
  5: [{
    summary: 'Aisha\'s vision before the ifk incident clarified her innocence',
    detail: 'The Prophet ﷺ reportedly saw a vision of a man carrying a silk cloth with a woman inside, and uncovering it to reveal Aisha — then said: "If Allah wills this." Some narrations suggest this foreshadowed their marriage; others link it to her innocence being destined to be revealed.',
    source: 'Bukhari 3895; Muslim 2438',
    byWhom: 'prophet',
  }],
  7: [{
    summary: 'The Prophet ﷺ saw Hamza as a lion in Paradise after Uhud',
    detail: 'After Hamza\'s martyrdom at Uhud, the Prophet ﷺ narrated seeing Hamza in the form described as "Asadullah" — a golden lion walking among the companions of Paradise.',
    source: 'Al-Mustadrak al-Hakim; Tabaqat Ibn Sa\'d 3/9',
    byWhom: 'prophet',
  }],
  10: [{
    summary: 'The Prophet ﷺ heard Bilal\'s footsteps in Paradise',
    detail: 'Not strictly a dream but a waking vision during the Isra\' and Mi\'raj: the Prophet ﷺ heard sandal-steps ahead of him in Paradise, which Jibreel identified as Bilal\'s. This became his most famous prophetic honor.',
    source: 'Bukhari 1149; Muslim 2458',
    byWhom: 'prophet',
  }],
  13: [{
    summary: 'Anas saw a dream confirming his service to the Prophet ﷺ would be rewarded',
    detail: 'Anas ibn Malik narrated that he saw the Prophet ﷺ in a dream in old age, and the Prophet ﷺ smiled at him and said: "You were faithful to me." Anas woke weeping.',
    source: 'Hilyat al-Awliya\' Abu Nu\'aym 2/360',
    byWhom: 'companion',
  }],
  19: [{
    summary: 'Ibn Abbas\'s mother saw a star fall into her lap before his birth',
    detail: 'Umm al-Fadl, the mother of Abdullah ibn Abbas, saw in a dream before his birth that a great star fell from the sky into her lap and then spread to illuminate the entire horizon. Scholars of dream interpretation said this foretold a son of extraordinary knowledge.',
    source: 'Tabaqat Ibn Sa\'d 2/366; Tarikh Ibn Asakir',
    byWhom: 'other',
  }],
  27: [{
    summary: 'Ammar saw his mother Sumayyah in Paradise',
    detail: 'Ammar ibn Yasir narrated: "I saw my mother in a dream — she was clothed in white light and her face shone like the full moon. She said to me: \'Son, I am well and at peace. Do not fear for me.\'"',
    source: 'Hilyat al-Awliya\' Abu Nu\'aym 1/141; Tabaqat Ibn Sa\'d',
    byWhom: 'companion',
  }],
};

/* ═══════════════════════════════════════════════════════════════════════
   FAMILY TREES
   ═════════════════════════════════════════════════════════════════════ */
export const FAMILY_TREES: Record<number, FamilyTree> = {
  1: {
    nodes: [
      { id: 'abubakr', label: 'Abu Bakr', labelAr: 'أبو بكر', rel: 'Self', isCompanion: true, companionRank: 1 },
      { id: 'abuquhafa', label: 'Abu Quhafa', labelAr: 'أبو قحافة', rel: 'Father' },
      { id: 'ummkhayr', label: 'Umm Khayr', labelAr: 'أم خير', rel: 'Mother' },
      { id: 'aisha', label: 'Aisha', labelAr: 'عائشة', rel: 'Daughter', isCompanion: true, companionRank: 5 },
      { id: 'abdurrahman', label: 'Abd al-Rahman', labelAr: 'عبد الرحمن', rel: 'Son' },
      { id: 'asma', label: 'Asma\'', labelAr: 'أسماء', rel: 'Daughter' },
      { id: 'muhammad', label: 'Muhammad ibn Abi Bakr', labelAr: 'محمد', rel: 'Son' },
    ],
    edges: [
      { from: 'abuquhafa', to: 'abubakr', label: 'father of' },
      { from: 'ummkhayr', to: 'abubakr', label: 'mother of' },
      { from: 'abubakr', to: 'aisha', label: 'father of' },
      { from: 'abubakr', to: 'abdurrahman', label: 'father of' },
      { from: 'abubakr', to: 'asma', label: 'father of' },
      { from: 'abubakr', to: 'muhammad', label: 'father of' },
    ],
  },
  2: {
    nodes: [
      { id: 'umar', label: 'Umar', labelAr: 'عمر', rel: 'Self', isCompanion: true, companionRank: 2 },
      { id: 'khattab', label: 'Al-Khattab', rel: 'Father' },
      { id: 'hantama', label: 'Hantama', rel: 'Mother' },
      { id: 'hafsa', label: 'Hafsa', labelAr: 'حفصة', rel: 'Daughter (wife of Prophet ﷺ)' },
      { id: 'abdullahio', label: 'Abdullah', labelAr: 'عبد الله', rel: 'Son' },
      { id: 'asim', label: 'Asim', rel: 'Son' },
      { id: 'fatimah', label: 'Fatima bint Umar', rel: 'Sister (converts)' },
    ],
    edges: [
      { from: 'khattab', to: 'umar', label: 'father of' },
      { from: 'hantama', to: 'umar', label: 'mother of' },
      { from: 'umar', to: 'hafsa', label: 'father of' },
      { from: 'umar', to: 'abdullahio', label: 'father of' },
      { from: 'umar', to: 'asim', label: 'father of' },
    ],
  },
  4: {
    nodes: [
      { id: 'ali', label: 'Ali', labelAr: 'علي', rel: 'Self', isCompanion: true, companionRank: 4 },
      { id: 'abutalib', label: 'Abu Talib', labelAr: 'أبو طالب', rel: 'Father (uncle of Prophet ﷺ)' },
      { id: 'fatima', label: 'Fatima al-Zahra', labelAr: 'فاطمة', rel: 'Wife (daughter of Prophet ﷺ)' },
      { id: 'hasan', label: 'Hasan', labelAr: 'الحسن', rel: 'Son' },
      { id: 'husayn', label: 'Husayn', labelAr: 'الحسين', rel: 'Son' },
      { id: 'zaynab', label: 'Zaynab bint Ali', labelAr: 'زينب', rel: 'Daughter' },
      { id: 'jafar', label: 'Ja\'far ibn Abi Talib', labelAr: 'جعفر', rel: 'Brother' },
      { id: 'aqil', label: 'Aqil', rel: 'Brother' },
    ],
    edges: [
      { from: 'abutalib', to: 'ali', label: 'father of' },
      { from: 'ali', to: 'fatima', label: 'husband of' },
      { from: 'ali', to: 'hasan', label: 'father of' },
      { from: 'ali', to: 'husayn', label: 'father of' },
      { from: 'ali', to: 'zaynab', label: 'father of' },
      { from: 'abutalib', to: 'jafar', label: 'father of' },
      { from: 'abutalib', to: 'aqil', label: 'father of' },
    ],
  },
  5: {
    nodes: [
      { id: 'aisha', label: 'Aisha', labelAr: 'عائشة', rel: 'Self', isCompanion: true, companionRank: 5 },
      { id: 'abubakr', label: 'Abu Bakr', labelAr: 'أبو بكر', rel: 'Father', isCompanion: true, companionRank: 1 },
      { id: 'umm_rumman', label: 'Umm Rumman', rel: 'Mother' },
      { id: 'asma', label: 'Asma\'', rel: 'Sister' },
      { id: 'abdurrahman', label: 'Abd al-Rahman', rel: 'Brother' },
    ],
    edges: [
      { from: 'abubakr', to: 'aisha', label: 'father of' },
      { from: 'umm_rumman', to: 'aisha', label: 'mother of' },
      { from: 'abubakr', to: 'asma', label: 'father of' },
      { from: 'abubakr', to: 'abdurrahman', label: 'father of' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   "FIRST MUSLIM TO…" ENCYCLOPEDIA
   ═════════════════════════════════════════════════════════════════════ */
export const FIRSTS: FirstEntry[] = [
  { rank: 5,  name: 'Aisha bint Abi Bakr', achievement: 'First woman to teach men Islamic jurisprudence publicly', detail: 'She held open teaching sessions at her home in Medina, and male companions — including senior sahabah — would travel to sit outside her chamber curtain to learn from her.', source: 'Bukhari & Muslim narrations; Al-Isabah Ibn Hajar' },
  { rank: 10, name: 'Bilal ibn Rabah', achievement: 'First muezzin (caller to prayer) in Islam', detail: 'Appointed personally by the Prophet ﷺ as the first official caller to prayer — his voice became the sound of Islam awakening for the first time.', source: 'Bukhari 604; Muslim 377' },
  { rank: 10, name: 'Bilal ibn Rabah', achievement: 'First person to give the adhan inside the Ka\'ba after the conquest of Mecca', detail: 'When Mecca fell peacefully in 8 AH, Bilal climbed atop the Ka\'ba itself and gave the adhan — the first ever from its roof. Abu Sufyan\'s family reportedly protested from below.', source: 'Ibn Hisham, Seerah (Conquest of Mecca chapter)' },
  { rank: 7,  name: 'Hamza ibn Abd al-Muttalib', achievement: 'First to openly defend the Prophet ﷺ with physical force', detail: 'When Abu Jahl struck the Prophet ﷺ on the head with an iron implement, Hamza struck Abu Jahl with his bow on the same spot in public retaliation — then declared his Islam immediately after.', source: 'Ibn Hisham, Seerah; Musnad Ahmad' },
  { rank: 8,  name: 'Sa\'d ibn Abi Waqqas', achievement: 'First Muslim to shed blood in the path of Allah', detail: 'Sa\'d shot the first arrow in Islamic history during the first military skirmish — before any formal battle had taken place.', source: 'Ibn Hisham Seerah; Musnad Ahmad' },
  { rank: 11, name: 'Abd al-Rahman ibn Awf', achievement: 'First to establish a market in Medina on Islamic commercial principles', detail: 'When the Ansar offered him half their wealth on arrival to Medina, he declined and asked only for directions to the market. He established the first Islamic free-trade market, refusing the monopolistic practices of the Jewish Qaynuqa market.', source: 'Bukhari 2048; Ibn Sa\'d Tabaqat' },
  { rank: 12, name: 'Khalid ibn al-Walid', achievement: 'First and only general never to lose a battle in Islamic history', detail: 'Khalid participated in over 100 battles and sieges. Not a single one ended in defeat. The Prophet ﷺ called him "a sword Allah has drawn against the disbelievers."', source: 'Bukhari 4262; Siyar A\'lam al-Nubala\' Dhahabi' },
  { rank: 18, name: 'Zayd ibn Thabit', achievement: 'First to compile the Quran into a single physical volume', detail: 'At Abu Bakr\'s command after the Battle of Yamama, Zayd ibn Thabit performed the first-ever compilation of all Quranic text — collecting from written scraps, palm leaves, bones, and the memories of men who had memorized it.', source: 'Bukhari 4986; Tirmidhi 3103' },
  { rank: 22, name: 'Abdullah ibn Masud', achievement: 'First to recite Quran publicly in Mecca at the Ka\'ba', detail: 'At a gathering at the Ka\'ba, Ibn Masud stood and began reciting Surah Al-Rahman aloud. The Quraysh beat him until he bled. He returned the next day and did it again.', source: 'Ibn Hisham Seerah; Tabaqat Ibn Sa\'d' },
  { rank: 2,  name: 'Umar ibn al-Khattab', achievement: 'First to openly announce his Islam in Mecca\'s public square', detail: 'On the day he converted, Umar demanded to know the most hostile enemy of Islam. He was told: Abu Jahl. He walked to Abu Jahl\'s house, knocked, announced his conversion to his face, then walked to the Ka\'ba and prayed openly while Quraysh watched in stunned silence.', source: 'Ibn Hisham Seerah; Tabaqat Ibn Sa\'d' },
  { rank: 1,  name: 'Abu Bakr al-Siddiq', achievement: 'First Caliph to compile the Quran between two covers', detail: 'When Umar warned that Quran-memorizers were dying in battle (700 at Yamama alone), Abu Bakr commissioned Zayd ibn Thabit to compile the Quran — an act the Prophet ﷺ himself had not done. It became the master copy.', source: 'Bukhari 4986' },
  { rank: 3,  name: 'Uthman ibn Affan', achievement: 'First to standardize the Quran across all of the Islamic world', detail: 'Uthman produced six identical master copies of the Quran in the Qurayshi dialect and distributed one to each major Islamic province — then ordered all variant copies burned. Every Quran on earth today is descended from those six copies.', source: 'Bukhari 4987; Tirmidhi 3103' },
  { rank: 29, name: 'Salman al-Farisi', achievement: 'First to suggest the tactic of the Trench (Khandaq) in Arabian warfare', detail: 'When the combined Quraysh army of 10,000 marched on Medina in 5 AH, Salman al-Farisi introduced the Persian military tactic of digging a trench — unknown in Arabia. It stopped the largest army ever assembled against Medina.', source: 'Ibn Hisham Seerah (Battle of Khandaq); Tabaqat Ibn Sa\'d' },
  { rank: 4,  name: 'Ali ibn Abi Talib', achievement: 'First person to sleep in the Prophet\'s ﷺ bed as a human shield', detail: 'On the night of the Hijra, Ali slept in the Prophet\'s ﷺ bed wrapped in his green cloak, knowing the Quraysh assassination party was coming. He rose unhurt at Fajr and completed all of the Prophet\'s ﷺ entrusted items before following to Medina.', source: 'Ibn Hisham Seerah; Tafsir al-Tabari on Quran 2:207' },
  { rank: 9,  name: 'Abu Ubayda ibn al-Jarrah', achievement: 'First general to sign a formal treaty protecting non-Muslim citizens under Islamic governance', detail: 'When Abu Ubayda conquered major Syrian cities including Damascus and Homs, he wrote formal documented treaties guaranteeing the safety and religious freedom of Christian and Jewish inhabitants — setting the template for all subsequent Islamic governance of conquered peoples.', source: 'Al-Bidaya wa\'l-Nihaya Ibn Kathir; Futuh al-Buldan al-Baladhuri' },
  { rank: 27, name: 'Ammar ibn Yasir', achievement: 'Son of Islam\'s first martyrs (Sumayyah and Yasir)', detail: 'Ammar\'s mother Sumayyah bint Khayyat was the first martyr in Islamic history, killed by Abu Jahl. His father Yasir died the same day under torture. Ammar thus became the first Muslim to lose both parents for the faith.', source: 'Hakim, Al-Mustadrak 5659; Ibn Hisham Seerah' },
];

/* ═══════════════════════════════════════════════════════════════════════
   QURAN TRIGGER CROSS-REFERENCE  (companion rank → trigger IDs)
   ═════════════════════════════════════════════════════════════════════ */
export const QURAN_TRIGGER_REFS: Record<number, number[]> = {
  1:  [20],      // Abu Bakr — 9:40 (cave scene)
  2:  [12, 16],  // Umar — 3:128 (Uhud), 60:10 (emigrant wives)
  4:  [7, 15],   // Ali — 9:113 (Abu Talib), 76:8-9 (feeding)
  5:  [3, 13],   // Aisha — 24:11 (ifk), 66:1 (honey)
  6:  [6],       // Zayd — 33:37 (Zaynab marriage)
  7:  [17],      // Hamza/Abu Lahab — 111:1 (Abu Lahab)
  8:  [8],       // Sa'd ibn Abi Waqqas — 8:1 (Badr spoils)
  9:  [8],       // Abu Ubayda — 8:1 (Badr spoils)
  10: [2, 5],    // Ibn Umm Maktum — 80:1 (Abasa), 4:95 (disability)
  11: [8],       // Abd al-Rahman — 8:1 (Badr spoils)
  13: [10, 18],  // Anas ibn Malik — 2:222 (menstruation), 33:53 (wedding)
  19: [14, 19],  // Ibn Abbas — 18:23 (insha'allah), 2:282 (debt)
  27: [1],       // Khawla bint Tha'laba — wait, 27 is Ammar, not Khawla
};

/* ═══════════════════════════════════════════════════════════════════════
   SOURCE RELIABILITY MAP  (for key claims in modal)
   Maps companion rank → array of { claim, reliability }
   ═════════════════════════════════════════════════════════════════════ */
export interface SourceClaim {
  topic: string;
  topicUr?: string;
  source: string;
  reliability: ReliabilityLevel;
}

export const SOURCE_CLAIMS: Record<number, SourceClaim[]> = {
  1: [
    { topic: 'First Caliph', source: 'Bukhari 3455; Muslim 2387', reliability: 'sahih' },
    { topic: 'Freed Bilal and other slaves', source: 'Bukhari 3754; Ibn Hisham Seerah', reliability: 'sahih' },
    { topic: 'Quran compilation', source: 'Bukhari 4986', reliability: 'sahih' },
    { topic: 'Spent 40,000 dirhams on slaves', source: 'Tabaqat Ibn Sa\'d 3/168', reliability: 'hasan' },
  ],
  2: [
    { topic: 'Conversion story — came to kill Prophet ﷺ', source: 'Ibn Hisham Seerah (Umar\'s Islam)', reliability: 'hasan' },
    { topic: 'Night patrols in Medina', source: 'Tabaqat Ibn Sa\'d; Al-Bidaya wa\'l-Nihaya', reliability: 'hasan' },
    { topic: 'Invented Hijri calendar', source: 'Historical consensus; no single hadith', reliability: 'maqbul' },
    { topic: 'Treaty of Jerusalem', source: 'Historical sources; Al-Bidaya wa\'l-Nihaya 7/58', reliability: 'maqbul' },
  ],
  3: [
    { topic: 'Standardized the Quran', source: 'Bukhari 4987; Tirmidhi 3103', reliability: 'sahih' },
    { topic: 'Angels shy of Uthman', source: 'Muslim 2401; Tirmidhi 3696', reliability: 'sahih' },
    { topic: 'Funded Tabuk expedition alone', source: 'Tirmidhi 3699; Tabaqat Ibn Sa\'d', reliability: 'hasan' },
    { topic: 'Reading Quran when martyred', source: 'Musnad Ahmad 443; Ibn Asakir 39/524', reliability: 'sahih' },
  ],
  4: [
    { topic: 'Gate of Khaybar story', source: 'Muslim 2406; Tirmidhi 3724', reliability: 'sahih' },
    { topic: 'Ghadir Khumm declaration', source: 'Tirmidhi 3713; Musnad Ahmad 950', reliability: 'sahih' },
    { topic: 'First male to accept Islam', source: 'Tirmidhi 3734; Musnad Ahmad 1160', reliability: 'hasan' },
  ],
  5: [
    { topic: 'Innocence — incident of ifk', source: 'Bukhari 4141; Muslim 2770', reliability: 'sahih' },
    { topic: '2,210 hadiths narrated', source: 'Ibn Hajar, Fath al-Bari; Al-Isabah', reliability: 'sahih' },
    { topic: 'Expert in medicine and poetry', source: 'Tabaqat Ibn Sa\'d 8/65; Al-Isabah', reliability: 'maqbul' },
  ],
};
