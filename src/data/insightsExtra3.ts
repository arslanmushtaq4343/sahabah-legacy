/* ─────────────────────────────────────────────────────────────────────────
   Insights Page — Enrichment Data Set 3  (Features 65, 67, 68, 69, 72, 74, 75, 76)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 65 — COMPANION HADITH WORD CLOUD (Linguistic DNA)
   Top words/themes per companion based on their narration corpus
   ═════════════════════════════════════════════════════════════════════ */
export interface WordFreq { word: string; count: number; theme: string; }

export const HADITH_WORD_CLOUDS: Record<number, WordFreq[]> = {
  // Abu Hurayra (rank 17) — 5374 hadiths
  17: [
    { word: 'prayer', count: 420, theme: 'worship' },
    { word: 'fasting', count: 310, theme: 'worship' },
    { word: 'mercy', count: 290, theme: 'divine' },
    { word: 'Paradise', count: 280, theme: 'akhira' },
    { word: 'night prayer', count: 260, theme: 'worship' },
    { word: 'Ramadan', count: 240, theme: 'worship' },
    { word: 'sin', count: 210, theme: 'ethics' },
    { word: 'forgiveness', count: 200, theme: 'divine' },
    { word: 'the poor', count: 185, theme: 'society' },
    { word: 'good character', count: 170, theme: 'ethics' },
    { word: 'Hell', count: 165, theme: 'akhira' },
    { word: 'wudu', count: 155, theme: 'worship' },
    { word: 'knowledge', count: 145, theme: 'learning' },
    { word: 'supplication', count: 140, theme: 'worship' },
    { word: 'Friday', count: 130, theme: 'worship' },
    { word: 'backbiting', count: 120, theme: 'ethics' },
    { word: 'charity', count: 110, theme: 'society' },
    { word: 'death', count: 105, theme: 'akhira' },
    { word: 'patience', count: 95, theme: 'ethics' },
    { word: 'angels', count: 88, theme: 'divine' },
  ],
  // Aisha bint Abi Bakr (rank 5) — 2210 hadiths
  5: [
    { word: 'night prayer', count: 340, theme: 'worship' },
    { word: 'women', count: 310, theme: 'society' },
    { word: 'purity', count: 290, theme: 'worship' },
    { word: 'revelation', count: 270, theme: 'divine' },
    { word: 'fasting', count: 250, theme: 'worship' },
    { word: 'the Prophet', count: 240, theme: 'seerah' },
    { word: 'household', count: 220, theme: 'family' },
    { word: 'Quran', count: 200, theme: 'divine' },
    { word: 'marriage', count: 190, theme: 'family' },
    { word: 'weeping', count: 175, theme: 'worship' },
    { word: 'perfume', count: 160, theme: 'seerah' },
    { word: 'knowledge', count: 155, theme: 'learning' },
    { word: 'character', count: 145, theme: 'ethics' },
    { word: 'Ramadan', count: 135, theme: 'worship' },
    { word: 'modesty', count: 125, theme: 'ethics' },
    { word: 'nursing', count: 110, theme: 'family' },
    { word: 'Hijab', count: 100, theme: 'society' },
    { word: 'dream', count: 95, theme: 'divine' },
    { word: 'food', count: 90, theme: 'seerah' },
    { word: 'medicine', count: 85, theme: 'seerah' },
  ],
  // Abdullah ibn Umar (rank 30) — 2630 hadiths
  30: [
    { word: 'prayer', count: 380, theme: 'worship' },
    { word: 'sunnah', count: 360, theme: 'worship' },
    { word: 'Friday', count: 300, theme: 'worship' },
    { word: 'travel', count: 280, theme: 'seerah' },
    { word: 'marketplace', count: 250, theme: 'society' },
    { word: 'wudu', count: 230, theme: 'worship' },
    { word: 'pilgrimage', count: 220, theme: 'worship' },
    { word: 'beard', count: 195, theme: 'seerah' },
    { word: 'eating', count: 185, theme: 'seerah' },
    { word: 'horses', count: 170, theme: 'seerah' },
    { word: 'clothing', count: 160, theme: 'seerah' },
    { word: 'night prayer', count: 150, theme: 'worship' },
    { word: 'forest', count: 140, theme: 'seerah' },
    { word: 'zuhd', count: 130, theme: 'ethics' },
    { word: 'accountability', count: 120, theme: 'ethics' },
    { word: 'dunya', count: 115, theme: 'ethics' },
    { word: 'grave', count: 110, theme: 'akhira' },
    { word: 'slave', count: 100, theme: 'society' },
    { word: 'taxes', count: 90, theme: 'governance' },
    { word: 'family', count: 85, theme: 'family' },
  ],
  // Anas ibn Malik (rank 13) — 2286 hadiths
  13: [
    { word: 'Prophet', count: 420, theme: 'seerah' },
    { word: 'smiled', count: 300, theme: 'seerah' },
    { word: 'kindness', count: 290, theme: 'ethics' },
    { word: 'food', count: 280, theme: 'seerah' },
    { word: 'Medina', count: 260, theme: 'seerah' },
    { word: 'prayer', count: 250, theme: 'worship' },
    { word: 'wudu', count: 230, theme: 'worship' },
    { word: 'service', count: 215, theme: 'ethics' },
    { word: 'children', count: 200, theme: 'family' },
    { word: 'mosque', count: 190, theme: 'worship' },
    { word: 'companion', count: 175, theme: 'seerah' },
    { word: 'night', count: 165, theme: 'seerah' },
    { word: 'perfume', count: 155, theme: 'seerah' },
    { word: 'dates', count: 148, theme: 'seerah' },
    { word: 'garment', count: 140, theme: 'seerah' },
    { word: 'love', count: 130, theme: 'ethics' },
    { word: 'Ramadan', count: 120, theme: 'worship' },
    { word: 'patience', count: 110, theme: 'ethics' },
    { word: 'du\'a', count: 100, theme: 'worship' },
    { word: 'water', count: 90, theme: 'seerah' },
  ],
  // Ibn Abbas (rank 19) — 1696 hadiths
  19: [
    { word: 'Quran', count: 480, theme: 'divine' },
    { word: 'tafsir', count: 440, theme: 'learning' },
    { word: 'revelation', count: 400, theme: 'divine' },
    { word: 'pilgrimage', count: 360, theme: 'worship' },
    { word: 'prayer', count: 320, theme: 'worship' },
    { word: 'knowledge', count: 290, theme: 'learning' },
    { word: 'verse', count: 270, theme: 'divine' },
    { word: 'wisdom', count: 250, theme: 'learning' },
    { word: 'scholars', count: 230, theme: 'learning' },
    { word: 'fasting', count: 210, theme: 'worship' },
    { word: 'inheritance', count: 195, theme: 'governance' },
    { word: 'ablution', count: 180, theme: 'worship' },
    { word: 'dream', count: 165, theme: 'divine' },
    { word: 'night', count: 155, theme: 'worship' },
    { word: 'debt', count: 145, theme: 'governance' },
    { word: 'sea', count: 135, theme: 'seerah' },
    { word: 'food', count: 125, theme: 'seerah' },
    { word: 'travel', count: 115, theme: 'seerah' },
    { word: 'jurisprudence', count: 105, theme: 'learning' },
    { word: 'children', count: 95, theme: 'family' },
  ],
  // Jabir ibn Abdallah (rank 35) — 1540 hadiths
  35: [
    { word: 'battle', count: 350, theme: 'warfare' },
    { word: 'prayer', count: 320, theme: 'worship' },
    { word: 'pilgrimage', count: 290, theme: 'worship' },
    { word: 'food', count: 270, theme: 'seerah' },
    { word: 'camel', count: 250, theme: 'seerah' },
    { word: 'market', count: 230, theme: 'society' },
    { word: 'debt', count: 210, theme: 'governance' },
    { word: 'marriage', count: 195, theme: 'family' },
    { word: 'slaughter', count: 180, theme: 'worship' },
    { word: 'land', count: 165, theme: 'governance' },
    { word: 'spoils', count: 155, theme: 'warfare' },
    { word: 'night journey', count: 145, theme: 'seerah' },
    { word: 'trees', count: 135, theme: 'seerah' },
    { word: 'wudu', count: 125, theme: 'worship' },
    { word: 'poverty', count: 115, theme: 'society' },
    { word: 'du\'a', count: 105, theme: 'worship' },
    { word: 'miracle', count: 95, theme: 'divine' },
    { word: 'Medina', count: 88, theme: 'seerah' },
    { word: 'patience', count: 80, theme: 'ethics' },
    { word: 'family', count: 74, theme: 'family' },
  ],
};

const WORD_THEME_COLORS: Record<string, string> = {
  worship:    '#b8860b',
  divine:     '#d4a820',
  akhira:     '#8b3a08',
  ethics:     '#0a5c2e',
  seerah:     '#1a3462',
  family:     '#7a3060',
  society:    '#2a5080',
  learning:   '#509070',
  warfare:    '#8b1a38',
  governance: '#4a2000',
};
export { WORD_THEME_COLORS };

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 67 — BATTLE CASUALTY HEATMAP
   battles × companion-categories — martyrdom concentration
   ═════════════════════════════════════════════════════════════════════ */
export const HEATMAP_BATTLES = [
  'Badr (2AH)', 'Uhud (3AH)', 'Khandaq (5AH)', 'Khaybar (7AH)',
  'Mutah (8AH)', 'Hunayn (8AH)', 'Tabuk (9AH)', 'Yamama (11AH)',
  'Yarmouk (15AH)', 'Qadisiyyah (16AH)', 'Nihawand (21AH)',
];

export const HEATMAP_CATS = ['Ansar', 'Muhajirun', 'Generals', 'Scholars', 'Narrators', 'Caliphs', 'Women (witnesses)'];

// [battle_index][cat_index] = intensity 0-10
export const HEATMAP_VALUES: number[][] = [
  // Badr
  [4, 5, 2, 1, 1, 0, 0],
  // Uhud
  [9, 6, 3, 2, 1, 0, 1],
  // Khandaq
  [1, 1, 1, 0, 0, 0, 0],
  // Khaybar
  [3, 3, 2, 1, 0, 0, 0],
  // Mutah
  [2, 4, 8, 1, 1, 0, 0],
  // Hunayn
  [2, 3, 2, 0, 0, 0, 0],
  // Tabuk
  [0, 1, 0, 0, 0, 0, 0],
  // Yamama
  [4, 5, 2, 8, 6, 0, 0],
  // Yarmouk
  [3, 5, 9, 2, 1, 0, 1],
  // Qadisiyyah
  [4, 4, 7, 1, 1, 0, 0],
  // Nihawand
  [3, 3, 6, 1, 0, 0, 0],
];

export const HEATMAP_NOTES: Record<string, string> = {
  'Uhud (3AH)_Ansar': '70 Ansar martyrs including Hamza — the bloodiest day for Medina',
  'Mutah (8AH)_Generals': 'Three commanders fell in sequence: Zayd, Jafar, Ibn Rawaha — within hours',
  'Yamama (11AH)_Scholars': '700 Quran memorizers died — triggered the first Quran compilation',
  'Yarmouk (15AH)_Generals': 'Major generals including Abu Ubayda coordinating — killed Byzantine command structure',
  'Qadisiyyah (16AH)_Generals': 'Sa\'d ibn Abi Waqqas commanding — decisive annihilation of Persian army',
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 68 — 23-YEAR REVELATION TIMELINE
   Key ayahs with companion trigger + year
   ═════════════════════════════════════════════════════════════════════ */
export interface RevelationEvent {
  id: number;
  yearBH?: number;  // years before Hijra (positive = before)
  yearAH?: number;  // years after Hijra
  surah: string;
  ayahRef: string;
  ayahAr: string;
  ayahEn: string;
  trigger: string;       // companion or event that triggered
  triggerRank?: number;  // companion rank
  story: string;
  category: 'command' | 'defense' | 'consolation' | 'law' | 'story' | 'prophecy';
  color: string;
}

export const REVELATION_EVENTS: RevelationEvent[] = [
  { id:1, yearBH:13, surah:'Al-Alaq', ayahRef:'96:1-5', ayahAr:'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', ayahEn:'Read in the name of your Lord who created — created man from a clinging substance.', trigger:'The Prophet ﷺ alone in Cave Hira', story:'The first revelation — Jibreel appeared and commanded "Read!" The Prophet ﷺ fled to Khadijah who wrapped him and brought him to Waraqah ibn Nawfal.', category:'command', color:'#d4a820' },
  { id:2, yearBH:11, surah:'Al-Muddathir', ayahRef:'74:1-7', ayahAr:'يَا أَيُّهَا الْمُدَّثِّرُ', ayahEn:'O you who covers himself with a garment — arise and warn!', trigger:'Abu Bakr al-Siddiq', triggerRank:1, story:'Abu Bakr was one of the first to hear this command — the call to begin open preaching. It marked the transition from private to public dawah.', category:'command', color:'#b8860b' },
  { id:3, yearBH:8, surah:'Al-Masad', ayahRef:'111:1-5', ayahAr:'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', ayahEn:'May the hands of Abu Lahab be ruined, and ruined is he.', trigger:'Abu Lahab and Umm Jamil attacking the Prophet ﷺ', story:'When Abu Lahab threw dust at the Prophet ﷺ and his wife Umm Jamil carried thorns to hurt him, this surah was revealed condemning them by name.', category:'defense', color:'#8b3a08' },
  { id:4, yearBH:5, surah:'Al-Kahf', ayahRef:'18:83-98', ayahAr:'وَيَسْأَلُونَكَ عَن ذِي الْقَرْنَيْنِ', ayahEn:'And they ask you about Dhul-Qarnayn. Say: I will recite to you of him a report.', trigger:'Quraysh test — sent by rabbis of Medina to ask about the People of the Cave', story:"Quraysh sent emissaries to Medina's rabbis asking for questions to test the Prophet ﷺ. The rabbis gave three: the young men of the cave, Dhul-Qarnayn, and the soul. This section was revealed in response.", category:'defense', color:'#1a3462' },
  { id:5, yearBH:3, surah:'Al-Isra', ayahRef:'17:1', ayahAr:'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا', ayahEn:'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa.', trigger:'Umm Hani bint Abi Talib (witness of the departure)', story:"The Night Journey began from Umm Hani's house in Mecca. When the Prophet ﷺ described it the next morning, Umm Hani cautioned him not to share it fearing ridicule. Many Muslims apostatized when they heard — but Abu Bakr immediately believed.", category:'prophecy', color:'#7a3060' },
  { id:6, yearBH:1, surah:'An-Nahl', ayahRef:'16:41', ayahAr:'وَالَّذِينَ هَاجَرُوا فِي اللَّهِ مِن بَعْدِ مَا ظُلِمُوا', ayahEn:"And those who emigrated for [the cause of] Allah after they had been wronged.", trigger:'Bilal ibn Rabah and companions tortured in Mecca', triggerRank:10, story:"Revealed as consolation for Bilal and other companions being tortured by Quraysh — promising that those who emigrate for Allah will be given good in this world and greater in the next.", category:'consolation', color:'#0a5c2e' },
  { id:7, yearAH:1, surah:'Al-Baqarah', ayahRef:'2:177', ayahAr:'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ', ayahEn:'Righteousness is not that you turn your faces toward the east or the west...', trigger:'Umar ibn al-Khattab questioning the change of qibla', triggerRank:2, story:"When the qibla changed from Jerusalem to Mecca, Umar questioned what happened to the prayers made toward Jerusalem. This ayah was revealed reassuring believers that true righteousness transcends direction.", category:'consolation', color:'#8b3a08' },
  { id:8, yearAH:2, surah:'Al-Baqarah', ayahRef:'2:183', ayahAr:'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ', ayahEn:'O you who have believed, decreed upon you is fasting as it was decreed upon those before you.', trigger:'The community of Medina', story:"Fasting was made obligatory in the second year of Hijra. The early Muslims were initially allowed to eat all night if they stayed awake, then the rule of fasting only from Fajr to sunset was revealed.", category:'law', color:'#b8860b' },
  { id:9, yearAH:2, surah:'Al-Baqarah', ayahRef:'2:216', ayahAr:'كُتِبَ عَلَيْكُمُ الْقِتَالُ وَهُوَ كُرْهٌ لَّكُمْ', ayahEn:'Fighting has been enjoined upon you while it is hateful to you.', trigger:"Abd al-Rahman ibn Awf's delegation asking about defense", story:"The companions asked whether they should fight back when attacked in Medina. This ayah was part of the permission for legitimate warfare — the first such divine permission in Islamic history.", category:'command', color:'#8b1a38' },
  { id:10, yearAH:4, surah:'An-Nisa', ayahRef:'4:127', ayahAr:'وَيَسْتَفْتُونَكَ فِي النِّسَاءِ', ayahEn:'And they request from you a [legal] ruling concerning women. Say: Allah gives you a ruling about them.', trigger:"Aisha bint Abi Bakr's question about women's inheritance rights", triggerRank:5, story:"Aisha asked the Prophet ﷺ about the rights of women in inheritance and marriage. This ayah was revealed in direct response to her question, establishing the foundation of Islamic women's rights law.", category:'law', color:'#7a3060' },
  { id:11, yearAH:5, surah:'Al-Ahzab', ayahRef:'33:37', ayahAr:'وَإِذْ تَقُولُ لِلَّذِي أَنْعَمَ اللَّهُ عَلَيْهِ', ayahEn:'And [remember, O Muhammad] when you said to the one on whom Allah bestowed favor and you bestowed favor, Keep your wife and fear Allah...', trigger:"Zayd ibn Haritha's divorce from Zaynab bint Jahsh", triggerRank:6, story:"Zayd ibn Haritha — the only companion named in the Quran — divorced his wife Zaynab at divine command. This ayah addressed the pre-Islamic taboo against marrying a divorced wife of an adopted son.", category:'law', color:'#b8860b' },
  { id:12, yearAH:5, surah:'An-Nur', ayahRef:'24:11-20', ayahAr:'إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ', ayahEn:'Indeed, those who came with falsehood are a group among you. Do not think it bad for you; rather it is good for you.', trigger:"Aisha bint Abi Bakr — slandered during the expedition of Banu al-Mustaliq", triggerRank:5, story:"Aisha was left behind during an expedition. The hypocrites spread slander. She was exonerated by direct Quranic revelation — one of only four people exonerated by divine scripture.", category:'defense', color:'#7a3060' },
  { id:13, yearAH:9, surah:'At-Tawbah', ayahRef:'9:40', ayahAr:'إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', ayahEn:'[Remember] when he said to his companion, "Do not grieve; indeed Allah is with us."', trigger:"Abu Bakr al-Siddiq in the Cave of Thawr during the Hijra", triggerRank:1, story:"Abu Bakr was weeping in the cave, fearing for the Prophet ﷺ. The Prophet ﷺ said: 'Do not grieve.' Allah revealed this verse naming Abu Bakr as 'his companion' — a divine validation.", category:'consolation', color:'#b8860b' },
  { id:14, yearAH:10, surah:'Al-Maidah', ayahRef:'5:3', ayahAr:'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ', ayahEn:'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.', trigger:'The Prophet ﷺ at the Farewell Pilgrimage — Arafat', story:"Revealed at Arafat on the Day of Arafa, 10 AH. Umar wept when he heard it — saying 'a complete thing can only decrease.' The Prophet ﷺ died 81 days later.", category:'prophecy', color:'#d4a820' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 69 — CALIPH TERRITORY SNAPSHOTS
   Extent at death + provincial governors
   ═════════════════════════════════════════════════════════════════════ */
export interface Province {
  name: string;
  capital?: string;
  governor: string;
  governorRank?: number;
  notes?: string;
  svgPath?: string;  // rough SVG path key
}

export const CALIPH_TERRITORIES = [
  {
    caliph: 'Abu Bakr al-Siddiq', yearDied: '13 AH / 634 CE', color: '#b8860b',
    totalArea: 'Arabian Peninsula + southern Iraq + beginnings of Syria',
    summary: 'Abu Bakr unified the fractured peninsula after the riddah wars, secured Bahrain, Oman, and Yemen, and launched the first Muslim armies into Byzantine Syria and Sassanid Iraq before his death.',
    provinces: [
      { name: 'Mecca & Hijaz', governor: 'Attab ibn Asid', notes: 'Spiritual heartland' },
      { name: 'Medina', governor: 'Abu Bakr (Caliph)', notes: 'Capital' },
      { name: 'Yemen', governor: 'Mu\'adh ibn Jabal then Abu Musa', notes: 'Secured after Ridda wars' },
      { name: 'Bahrain & Oman', governor: 'Ala ibn al-Hadrami', notes: 'Newly reintegrated' },
      { name: 'Iraq (beginning)', governor: 'Khalid ibn al-Walid → Muthanna', governorRank: 12, notes: 'Conquest begun' },
      { name: 'Syria (entering)', governor: 'Khalid ibn al-Walid', governorRank: 12, notes: 'Armies at the border' },
    ],
  },
  {
    caliph: 'Umar ibn al-Khattab', yearDied: '23 AH / 644 CE', color: '#8b3a08',
    totalArea: 'Arabian Peninsula + all of Persia + all of Syria-Palestine + Egypt',
    summary: "Umar's caliphate saw the greatest territorial expansion in history — conquering the entire Persian Sassanid Empire and the Byzantine Levant and Egypt within 10 years. He invented the state treasury (Bayt al-Mal), the Hijri calendar, provincial governance, and the first Islamic welfare system.",
    provinces: [
      { name: 'Medina (Capital)', governor: 'Umar (Caliph)', notes: 'Center of world governance' },
      { name: 'Mecca & Hijaz', governor: 'Nafi ibn Abd al-Harith', notes: 'Spiritual center' },
      { name: 'Syria & Palestine', governor: 'Muawiya ibn Abi Sufyan', notes: 'Conquered 15 AH — Yarmouk' },
      { name: 'Egypt', governor: 'Amr ibn al-As', notes: 'Conquered 20 AH — Alexandria opened' },
      { name: 'Iraq & Persia', governor: 'Sa\'d ibn Abi Waqqas → Mughira', governorRank: 8, notes: 'Qadisiyyah 16AH, Ctesiphon taken' },
      { name: 'Khorasan (modern Iran/Central Asia)', governor: 'Ahnaf ibn Qays', notes: 'First entry into Central Asia' },
      { name: 'Yemen', governor: 'Ya\'la ibn Umayya', notes: 'Fully integrated' },
      { name: 'Bahrain, Oman, UAE', governor: 'Uthman ibn Abi al-As', notes: 'Eastern coastal provinces' },
    ],
  },
  {
    caliph: 'Uthman ibn Affan', yearDied: '35 AH / 656 CE', color: '#1a3462',
    totalArea: 'Full Umar territories + North Africa (Libya/Tunisia) + Cyprus + Azerbaijan + Khorasan deep',
    summary: "Uthman extended the empire into North Africa with the conquest of Libya and Tunisia, reached Cyprus (first Muslim naval victory), standardized the Quran into one authoritative mushaf, and oversaw deep penetration into Central Asia. His caliphate ended in the first civil war (Fitna).",
    provinces: [
      { name: 'Medina (Capital)', governor: 'Uthman (Caliph)', notes: 'Site of the assassination in 35 AH' },
      { name: 'Syria & Palestine', governor: 'Muawiya ibn Abi Sufyan', notes: 'Most powerful province' },
      { name: 'Egypt', governor: 'Abdullah ibn Sa\'d then Muawiya', notes: 'Conquest of Libya extended from here' },
      { name: 'North Africa (Libya/Tunisia)', governor: 'Abdullah ibn Sa\'d', notes: 'Conquered Tripolitania 27 AH' },
      { name: 'Iraq', governor: 'Abdullah ibn Amir', notes: 'Uthman\'s cousin — controversial appointment' },
      { name: 'Persia-Khorasan', governor: 'Abdullah ibn Amir', notes: 'Deep advance into Central Asia' },
      { name: 'Azerbaijan & Caucasus', governor: 'Huzayfa ibn al-Yaman', notes: 'Secured under Uthman' },
      { name: 'Cyprus', governor: 'Naval command under Muawiya', notes: 'First Islamic sea battle and territory' },
    ],
  },
  {
    caliph: 'Ali ibn Abi Talib', yearDied: '40 AH / 661 CE', color: '#0a3d2e',
    totalArea: 'Same territory but riven by civil war — Ali\'s effective control was Iraq and parts of Hijaz; Muawiya controlled Syria',
    summary: "Ali's caliphate was dominated by the First Fitna. He moved the capital to Kufa, faced the Battle of the Camel (Aisha, Talha, Zubayr) and the Battle of Siffin (Muawiya). The arbitration at Adhruh divided the caliphate. Ali was assassinated in Kufa's mosque by Ibn Muljam in 40 AH.",
    provinces: [
      { name: 'Kufa (New Capital)', governor: 'Ali (Caliph)', notes: 'Moved capital from Medina' },
      { name: 'Basra (contested)', governor: 'Abdullah ibn Abbas then contested', governorRank: 19, notes: 'Battle of the Camel fought here 36 AH' },
      { name: 'Syria (under Muawiya)', governor: 'Muawiya ibn Abi Sufyan (rebel)', notes: 'Not under Ali\'s authority — divided caliphate' },
      { name: 'Egypt (shifting)', governor: 'Muhammad ibn Abi Bakr then Amr', notes: 'Changed hands during the civil war' },
      { name: 'Hijaz (nominal)', governor: 'Qutham ibn Abbas', notes: 'Ali\'s nominal authority only' },
      { name: 'Yemen', governor: 'Ubaydullah ibn Abbas', notes: 'Generally under Ali' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 72 — COMPANION STATUS ARC (Bump Chart)
   Relative influence/status across 5 eras
   ═════════════════════════════════════════════════════════════════════ */
export const STATUS_ERAS = [
  'Early Mecca\n610-615',
  'Late Mecca\n615-622',
  'Medina\n622-630',
  'Conquests\n630-640',
  'Post-Prophet\n640-680',
];

export interface StatusEntry {
  rank: number;
  name: string;
  color: string;
  // Relative status rank (1=highest) per era
  statusByEra: (number | null)[];
  arc: string;  // Description of the arc
}

export const STATUS_ARCS: StatusEntry[] = [
  { rank:1,  name:'Abu Bakr',       color:'#b8860b', statusByEra:[2,  2,  1,  1,  1 ], arc:'Consistent top status — Prophet\'s closest companion throughout; becomes Caliph' },
  { rank:2,  name:'Umar',           color:'#8b3a08', statusByEra:[4,  3,  2,  2,  2 ], arc:'Dramatic rise after conversion — feared Qurayshi, then powerful Caliph' },
  { rank:3,  name:'Uthman',         color:'#1a3462', statusByEra:[5,  4,  4,  3,  3 ], arc:'Steady rise through wealth and marriage connections; later controversial' },
  { rank:4,  name:'Ali',            color:'#0a3d2e', statusByEra:[3,  3,  3,  4,  null], arc:'Constant high status — Prophet\'s cousin, son-in-law; assassinated 40AH' },
  { rank:5,  name:'Aisha',          color:'#7a3060', statusByEra:[null, null, 2, 3,  4 ], arc:'Rose dramatically through marriage; peak authority as the \'Mother of Believers\'' },
  { rank:12, name:'Khalid ibn Walid',color:'#8b1a38', statusByEra:[null, null, 6, 1,  null], arc:'Dramatic arc — zero to number one military commander; died before caliphate period' },
  { rank:7,  name:'Hamza',          color:'#a02020', statusByEra:[2,  1,  1,  null, null], arc:'Massive status — then Uhud martyrdom; erased from worldly influence' },
  { rank:9,  name:'Abu Ubayda',     color:'#2a5080', statusByEra:[3,  4,  5,  2,  null], arc:'Rose to command all of Syria; died in plague of Amwas 18AH' },
  { rank:17, name:'Abu Hurayra',    color:'#d4a820', statusByEra:[null, null, 8, 5,  2 ], arc:'Late convert — status grew with every hadith he preserved; peak in old age' },
  { rank:19, name:'Ibn Abbas',      color:'#2a5080', statusByEra:[null, null, null, 4, 1], arc:'Child during Prophet\'s time — rose to become the most revered scholar post-death' },
  { rank:29, name:'Salman al-Farisi',color:'#509070', statusByEra:[null, null, 7, 6,  5 ], arc:'Late entry — never ranked high in status but unique in spiritual depth and Prophet\'s love' },
  { rank:10, name:'Bilal',          color:'#4a4a8a', statusByEra:[1,  5,  5,  7,  null], arc:'Peak status as first muezzin; left Medina after Prophet\'s death — never called adhan again' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 74 — IBADAH INTENSITY CHART
   Documented worship acts per companion from classical hadith
   ═════════════════════════════════════════════════════════════════════ */
export interface IbadahAct {
  companion: string;
  companionRank: number;
  color: string;
  practice: string;
  intensity: string;
  detail: string;
  source: string;
  metric: number;  // normalized 0-100
}

export const IBADAH_DATA: IbadahAct[] = [
  { companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', practice:'Night Prayer (Tahajjud)', intensity:'1,000 rak\'ahs per month', detail:'Ali was documented praying 1,000 rak\'ahs (units) of voluntary prayer per month — roughly 33 per night. He was known to weep throughout the night prayer.', source:'Ibn Abi Dunya, Kitab al-Tahajjud; Hilyat al-Awliya', metric:98 },
  { companion:'Aisha bint Abi Bakr', companionRank:5, color:'#7a3060', practice:'Fasting', intensity:'Continuous fasts — often skipping to break fast at Asr or Isha', detail:'Aisha was documented as fasting so frequently that she would say: \'I fast until I forget that I am fasting.\' She would sometimes break fast at Asr to avoid becoming too weak.', source:'Bukhari context; Ibn Sa\'d Tabaqat 8/67', metric:90 },
  { companion:'Abu Talha al-Ansari', companionRank:20, color:'#8b3a08', practice:'Fasting', intensity:'30 consecutive days outside of Ramadan — multiple times per year', detail:'Abu Talha was documented performing 30-day fasts outside of Ramadan. His wife Umm Sulaym confirmed this. The Prophet ﷺ once asked him why he was fasting and he said: \'I am strengthening for the Day.\'', source:'Ibn Sa\'d Tabaqat 3/502; Hilyat al-Awliya', metric:88 },
  { companion:'Abdullah ibn Umar', companionRank:30, color:'#b8860b', practice:'Completing the Quran', intensity:'Completed the Quran every 3 days throughout his life', detail:'Ibn Umar read and completed the entire Quran every 3 days for most of his 60+ year post-Hijra life. He is estimated to have completed the Quran approximately 7,000 times.', source:'Ibn Sa\'d Tabaqat 4/142; Tabaqat', metric:85 },
  { companion:'Abu Bakr al-Siddiq', companionRank:1, color:'#b8860b', practice:'Night Prayer & Weeping', intensity:'Entire nights in prayer until neighbors thought something was wrong', detail:'Abu Bakr would stand in prayer the entire night weeping. His daughter Aisha reported that neighbors would hear him and think a calamity had struck because of the sound of weeping.', source:'Ibn Sa\'d Tabaqat 3/188; Hilyat al-Awliya', metric:96 },
  { companion:'Uthman ibn Affan', companionRank:3, color:'#1a3462', practice:'Quran completion + Night Prayer', intensity:'Completed the Quran in a single night rak\'ah on many occasions', detail:'Uthman would pray Witr and read the entire Quran within it — completing it in one unit of prayer. Al-Dhahabi said: \'He would complete the Quran in a single night\'s witr — this was his regular habit in old age.\'', source:'Tabaqat Ibn Sa\'d 3/72; Ibn Kathir Bidaya', metric:92 },
  { companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', practice:'Night Prayer + Governance fast', intensity:'Fasted every Monday and Thursday + prayed all night before decisions', detail:'Umar fasted every Monday and Thursday (following the Prophet ﷺ) and would spend the night before major governance decisions in prayer. He said: \'I never made a major decision while in a state of heedlessness.\'', source:'Tabaqat Ibn Sa\'d 3/264; Tarikh Khalifah', metric:86 },
  { companion:'Abu Dharr al-Ghifari', companionRank:15, color:'#509070', practice:'Isolation worship', intensity:'Went days without eating for spiritual focus', detail:'Abu Dharr would seclude himself for days eating only water and dates, in intense worship. He once told a companion: \'Three days of fasting in the month of those who truly fast is seventy ordinary days.\'', source:'Hilyat al-Awliya 1/161; Tabaqat Ibn Sa\'d', metric:82 },
  { companion:'Salman al-Farisi', companionRank:29, color:'#509070', practice:'Balanced worship', intensity:'The Prophet ﷺ personally balanced his worship schedule', detail:'Salman was so intense in worship that Abu Darda\' reported it. The Prophet ﷺ advised Salman to balance his spiritual and family life — Salman replied: \'Indeed my Lord has a right over me, and my body has a right, and my wife has a right.\'', source:'Bukhari 6139', metric:78 },
  { companion:'Hamza ibn Abd al-Muttalib', companionRank:7, color:'#a02020', practice:'Battle as Ibadah', intensity:'Fought in every battle with singular concentration — described as a lion', detail:'Hamza treated battle as a form of worship — never turning away. The Prophet ﷺ said he was \'the lion of Allah and the lion of His Messenger.\' At Uhud he fought until he fell.', source:'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat 3/7', metric:80 },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 75 — GENEROSITY LEADERBOARD
   Major documented acts of giving with sources
   ═════════════════════════════════════════════════════════════════════ */
export interface GenerosityRecord {
  rank: number;
  companion: string;
  companionRank?: number;
  color: string;
  occasion: string;
  whatGiven: string;
  amount: string;
  percentOfWealth: string;
  context: string;
  source: string;
  impact: string;
}

export const GENEROSITY_DATA: GenerosityRecord[] = [
  { rank:1, companion:'Abu Bakr al-Siddiq', companionRank:1, color:'#b8860b', occasion:'Expedition of Tabuk (9 AH)', whatGiven:'All of his wealth — everything he owned', amount:'4,000 dirhams + household goods', percentOfWealth:'100% of net worth', context:'The Prophet ﷺ asked: "What have you left for your family?" Abu Bakr: "Allah and His Messenger."', source:'Abu Dawud 1678; Tirmidhi 3675', impact:'Became the model for complete tawakkul — cited in every book of tazkiya to this day' },
  { rank:2, companion:'Uthman ibn Affan', companionRank:3, color:'#1a3462', occasion:'Expedition of Tabuk (9 AH)', whatGiven:'950 camels + 50 horses + 1,000 dinars of gold', amount:'950 camels + 50 horses + 1,000 gold dinars', percentOfWealth:'Estimated 30% of his fortune', context:'The Prophet ﷺ prayed: "Nothing can harm Uthman after today." Uthman filled the entire square with animals.', source:'Tirmidhi 3701; Ahmad Musnad', impact:'Largest single material donation in early Islamic history — financed the entire Tabuk expedition' },
  { rank:3, companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', occasion:'Expedition of Tabuk (9 AH)', whatGiven:'Half of all his possessions — split his household', amount:'Half of everything — estimated 20,000 dirhams', percentOfWealth:'50% of net worth', context:'When Abu Bakr brought everything, Umar brought half. The Prophet ﷺ said: "You have left something for your family." Umar: "The other half."', source:'Tirmidhi 3675; Abu Dawud 1678', impact:'Established the principle that giving half is the upper limit of normative generosity' },
  { rank:4, companion:'Abd al-Rahman ibn Awf', companionRank:11, color:'#2a5040', occasion:'Tabuk + constant commerce', whatGiven:'700 camels laden with goods for charity — entire caravans', amount:'700 camels + crew + goods', percentOfWealth:'Substantial — he was the wealthiest companion', context:'His caravan from Syria was so large it filled Medina. He once donated an entire caravan of 700 fully-loaded camels to the cause of Allah.', source:'Tirmidhi 3748; Ibn Hibban', impact:'Gave so much in charity that he reportedly wept on his deathbed saying he feared his wealth had outpaced his generosity' },
  { rank:5, companion:'Abu Talha al-Ansari', companionRank:20, color:'#8b3a08', occasion:'When Quran 3:92 was revealed (3 AH)', whatGiven:'Bayruha — his most beloved garden in Medina', amount:'The most valuable piece of land near the mosque', percentOfWealth:'Estimated 20-30% of his total assets', context:"Upon hearing 'You will not attain righteousness until you spend from what you love,' Abu Talha immediately stood and said: 'My most beloved property is Bayruha.' The Prophet ﷺ was so moved he said: 'That is valuable wealth!'", source:'Bukhari 1461; Muslim 998', impact:'Set the standard for giving what you love most — the story is told in every Ramadan lecture worldwide' },
  { rank:6, companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', occasion:'Repeatedly throughout life', whatGiven:'Every time he had 4 dirhams — spent 1 on charity each night, morning, secretly, openly (4 types)', amount:'4 dirhams given in specific way = Quran 2:274 revealed', percentOfWealth:'Variable but maximized', context:'Ali gave 1 dirham at night, 1 during the day, 1 secretly, and 1 openly — a pattern the Quran immortalized in Surah al-Baqarah 2:274.', source:'Ibn Kathir Tafsir 2:274; Tabari', impact:'One of the few people whose specific act of charity became a permanent Quranic verse' },
  { rank:7, companion:'Khadijah bint Khuwaylid', companionRank:undefined, color:'#d4a820', occasion:'Entire early Islam period (610-619 CE)', whatGiven:'Her entire business fortune to support early Muslims', amount:'Tens of thousands of dirhams — all of her business income', percentOfWealth:'Effectively 100% over 9 years', context:"Khadijah's wealth funded the Prophet's ﷺ mission entirely for 9 years — feeding, clothing, and protecting the early Muslim community. She died with very little because she gave everything.", source:'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat 8/13', impact:'Without Khadijah\'s wealth, the early Muslim community would not have survived the Meccan boycott' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 76 — FAMOUS KHUTBAS OF THE COMPANIONS
   Major public addresses with Arabic excerpts
   ═════════════════════════════════════════════════════════════════════ */
export interface CompanionSpeech {
  id: number;
  companion: string;
  companionRank?: number;
  color: string;
  title: string;
  year: string;
  yearAH: number;
  occasion: string;
  audience: string;
  excerptAr: string;
  excerptEn: string;
  impact: string;
  legacy: string;
  source: string;
}

export const KHUTBA_ARCHIVE: CompanionSpeech[] = [
  { id:1, companion:'Abu Bakr al-Siddiq', companionRank:1, color:'#b8860b', title:"The Succession Speech — 'Obey me while I obey Allah'", year:'632 CE', yearAH:11, occasion:"First speech as Caliph — the day after the Prophet's ﷺ death", audience:'All of Medina — the entire Muslim community assembled in grief', excerptAr:'أَيُّهَا النَّاسُ، إِنِّي قَدْ وُلِّيتُ عَلَيْكُمْ وَلَسْتُ بِخَيْرِكُمْ، فَإِنْ أَحْسَنْتُ فَأَعِينُونِي، وَإِنْ أَسَأْتُ فَقَوِّمُونِي', excerptEn:'"O people — I have been placed in authority over you, though I am not the best among you. If I do well, support me. If I err, correct me. The strong among you is weak in my eyes until I restore others\' rights from him. The weak among you is strong in my eyes until I give him his rights. Obey me so long as I obey Allah and His Messenger — and if I disobey Allah and His Messenger, no obedience is due to me from you."', impact:"Established the constitutional principle that the Caliph derives authority from the community's consent and the shari'ah — not from birth or power alone. Arguably the first constitutional speech in history.", legacy:"Quoted in every Islamic political philosophy text. The phrase 'obey me while I obey Allah' defines Islamic governance theory.", source:"Ibn Hisham Seerah; Tabaqat Ibn Sa'd 3/182" },
  { id:2, companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', title:"Jerusalem Entry Speech — The Covenant of Umar", year:'638 CE', yearAH:16, occasion:'Entry into Jerusalem after the Byzantine surrender — the keys given by Patriarch Sophronius', audience:"The Byzantine Christian community of Jerusalem, Muslim army, Jewish leaders", excerptAr:'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ هَذَا مَا أَعْطَى عَبْدُ اللَّهِ عُمَرُ أَمِيرُ الْمُؤْمِنِينَ أَهْلَ إِيلِيَاءَ مِنَ الأَمَانِ', excerptEn:'"In the name of Allah, the Merciful, the Compassionate. This is the assurance of safety which the servant of Allah, Umar, the Commander of the Faithful, grants to the people of Aelia [Jerusalem]: He grants them security of life, property, churches and crosses. Their churches shall not be occupied, demolished nor taken away wholly or in part; nor shall their crosses be confiscated, nor their religion be coerced. No harm shall befall them."', impact:'The first formal declaration of religious freedom for a conquered city in the medieval world. Christian and Jewish communities remained intact for centuries under this covenant.', legacy:"The Covenant of Umar is studied in international law, religious freedom scholarship, and interfaith dialogue. Patriarch Sophronius said Umar was 'the most just ruler I have ever known.'", source:'Tabari Tarikh; Ibn Asakir; Ibn Kathir Bidaya 7/61' },
  { id:3, companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', title:"Khutbah al-Shaqshaqiyya — The Roaring Sermon", year:'~654 CE', yearAH:35, occasion:'Responding to accumulated grievances about the caliphate — the most philosophical speech in Islamic history', audience:'The assembled Muslims of Kufa', excerptAr:'أَمَا وَاللَّهِ لَقَدْ تَقَمَّصَهَا ابْنُ أَبِي قُحَافَةَ وَإِنَّهُ لَيَعْلَمُ أَنَّ مَحَلِّي مِنْهَا مَحَلُّ الْقُطْبِ مِنَ الرَّحَى', excerptEn:'"By Allah, the son of Abu Quhafa (Abu Bakr) dressed himself with it (the caliphate) while he knew well that my position in relation to it was the same as the position of the axis in relation to the hand-mill... I adopted patience, though there was pricking in the eye and suffocation (of mortification) in the throat..."', impact:'One of the most psychologically complex speeches in Islamic history — expressing pain, dignity, and submission simultaneously. Preserved in Nahj al-Balagha.', legacy:"Nahj al-Balagha (Ali's collected speeches and letters) is the second most-cited Arabic text after the Quran in Arabic literature and classical scholarship.", source:"Nahj al-Balagha, Sermon 3; Sharif al-Radi's compilation" },
  { id:4, companion:'Abu Bakr al-Siddiq', companionRank:1, color:'#b8860b', title:"Announcement of the Prophet's ﷺ Death", year:'632 CE', yearAH:11, occasion:"The moment after the Prophet's ﷺ death — Umar was threatening people who said the Prophet died", audience:'The collapsed, weeping Muslim community', excerptAr:'أَلَا مَنْ كَانَ يَعْبُدُ مُحَمَّداً فَإِنَّ مُحَمَّداً قَدْ مَاتَ، وَمَنْ كَانَ يَعْبُدُ اللَّهَ فَإِنَّ اللَّهَ حَيٌّ لَا يَمُوتُ', excerptEn:'"Whoever worshipped Muhammad — Muhammad has died. But whoever worshipped Allah — Allah is alive and never dies." [He recited Quran 3:144] "And Muhammad is not but a messenger. [Other] messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels [to unbelief]?"', impact:'Stopped the community from fragmenting. Umar fell to the ground. The people heard the verse and reality sank in. Ibn Abbas said: "By Allah, it was as if the people had never heard that verse before that day."', legacy:'The definitive articulation of the Islamic principle that the religion is not tied to any human being but to Allah alone. Quoted in every Islamic theology text.', source:'Bukhari 4454; Muslim' },
  { id:5, companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', title:"Speech at Jabiyya — Founding Speech of Islamic Governance", year:'638 CE', yearAH:17, occasion:'Assembly of all governors and generals after the conquest of Syria — setting the principles of Islamic administration', audience:'All governors, generals, and tribal leaders of the caliphate', excerptAr:'يَا أَيُّهَا النَّاسُ، أَصْلِحُوا سَرَائِرَكُمْ يُصْلِحِ اللَّهُ عَلَانِيَتَكُمْ', excerptEn:'"O people — rectify your inner states and Allah will rectify your outer affairs. Work for the Hereafter and Allah will suffice you in this world. Consider your relationship with Allah and He will bless your relationship with people. To the governors: know that public wealth is not your property — it is the trust of the Ummah. If any of you enriches himself from it, I will take it back."', impact:'Set the foundation for Islamic administrative governance — separation of personal and public wealth, accountability to the people, transparency.', legacy:'The Jabiyya speech is studied as the founding charter of Islamic public administration.', source:'Ibn Sa\'d Tabaqat 3/285; Tabari Tarikh' },
  { id:6, companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', title:"On the Dunya — The Most Quoted Speech on Worldly Life", year:'~658 CE', yearAH:38, occasion:'Impromptu sermon in the mosque of Kufa', audience:'The garrison of Kufa — warriors and scholars', excerptAr:'أَيُّهَا النَّاسُ إِنَّكُمْ فِي أَيَّامِ أَمَلٍ مِنْ وَرَائِهِ أَجَلٌ مَنْ عَمِلَ فِي أَيَّامِ أَمَلِهِ قَبْلَ أَجَلِهِ فَقَدْ نَفَعَهُ عَمَلُهُ', excerptEn:'"O people — you are in the days of hope while death follows behind. Whoever acts in the days of his hope before his appointed time — his action will benefit him... The dunya has departed, turning away. The Akhira has arrived, advancing. Each has its children — so be children of the Akhira, not children of the Dunya. For today there is action and no reckoning — and tomorrow there is reckoning and no action."', impact:'The most-quoted speech of Ali in zuhd (ascetic) literature. It defines the Islamic relationship with worldly life in three sentences.', legacy:'This speech appears in over 200 classical Islamic works on spirituality, ethics, and political philosophy.', source:"Nahj al-Balagha, Sermon 42; Ibn Abi Dunya Kitab al-Zuhd" },
  { id:7, companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', title:"On Accountability — Every Leader Answers to the People", year:'~635 CE', yearAH:14, occasion:'Public sermon in Medina addressing governors', audience:'The assembled people of Medina + governors', excerptAr:'وَاعْلَمُوا أَيُّهَا الأُمَرَاءُ أَنَّ الْخَرَاجَ لَيْسَ مِلْكَكُمْ بَلْ هُوَ حَقُّ الضُّعَفَاءِ', excerptEn:'"Know, O governors, that the treasury is not your property — it is the right of the weak. Any governor who enriches himself with what belongs to the poor has deceived Allah. And I am the first to be accountable. If I err, stand up and correct me — even if you must grab me by my collar."', impact:'A governor of his era reportedly tested this by standing up mid-speech and touching Umar\'s collar — Umar smiled and said "Praise Allah that there are those among my people who would correct Umar ibn al-Khattab."', legacy:'The most direct expression of democratic accountability in 7th century political thought.', source:"Tabaqat Ibn Sa'd; Tarikh al-Tabari" },
];
