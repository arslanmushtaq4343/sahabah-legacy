/* ─────────────────────────────────────────────────────────────────────────
   Insights Page — Enrichment Data
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   AGE AT CONVERSION  (Feature 12)
   birth_CE = approximate; 610 CE = first revelation
   ═════════════════════════════════════════════════════════════════════ */
export interface AgeConvRecord {
  rank: number;
  name: string;
  ageAtConversion: number;
  conversionYear: string;   // "~610 CE" etc.
  context: string;
  cat: string;
}

export const AGE_CONVERSIONS: AgeConvRecord[] = [
  { rank:1,  name:'Abu Bakr al-Siddiq',  ageAtConversion:37, conversionYear:'610 CE', cat:'caliph',  context:'Immediately accepted without hesitation on the first day' },
  { rank:2,  name:'Umar ibn al-Khattab', ageAtConversion:26, conversionYear:'~616 CE',cat:'caliph',  context:'Came to kill the Prophet ﷺ; converted after hearing Surah Ta-Ha' },
  { rank:3,  name:'Uthman ibn Affan',    ageAtConversion:34, conversionYear:'610 CE', cat:'caliph',  context:'Among the first four converts via Abu Bakr' },
  { rank:4,  name:'Ali ibn Abi Talib',   ageAtConversion:10, conversionYear:'610 CE', cat:'caliph',  context:'First child and first male youth to accept Islam' },
  { rank:5,  name:'Aisha bint Abi Bakr', ageAtConversion:5,  conversionYear:'615 CE', cat:'wife',    context:'Born into Muslim household; no moment of conversion known' },
  { rank:6,  name:'Zayd ibn Haritha',    ageAtConversion:15, conversionYear:'~606 CE',cat:'companion',context:'Was in the Prophet\'s ﷺ household; accepted before revelation' },
  { rank:7,  name:'Hamza ibn Abd al-Muttalib',ageAtConversion:40,conversionYear:'~616 CE',cat:'warrior','context':'Converted in fury after Abu Jahl struck the Prophet ﷺ' },
  { rank:8,  name:'Sa\'d ibn Abi Waqqas',ageAtConversion:17, conversionYear:'~611 CE',cat:'warrior', context:'Second or third person to accept Islam at age 17' },
  { rank:9,  name:'Abu Ubayda ibn al-Jarrah',ageAtConversion:28,conversionYear:'610 CE',cat:'general','context':'Among the early converts via Abu Bakr' },
  { rank:10, name:'Bilal ibn Rabah',     ageAtConversion:30, conversionYear:'~610 CE',cat:'other',   context:'Converted and immediately tortured in Mecca for his faith' },
  { rank:11, name:'Abd al-Rahman ibn Awf',ageAtConversion:30,conversionYear:'610 CE', cat:'scholar', context:'Among first batch — converted same day as Uthman' },
  { rank:12, name:'Khalid ibn al-Walid', ageAtConversion:40, conversionYear:'8 AH (630 CE)',cat:'general','context':'Converted just before Conquest of Mecca at height of his career' },
  { rank:13, name:'Anas ibn Malik',      ageAtConversion:10, conversionYear:'~1 AH',  cat:'other',   context:'Brought by his mother at age 10 to serve the Prophet ﷺ in Medina' },
  { rank:14, name:'Wahshi ibn Harb',     ageAtConversion:35, conversionYear:'8 AH',   cat:'other',   context:'Converted at Conquest of Mecca after killing Hamza at Uhud' },
  { rank:15, name:'Abu Dharr al-Ghifari',ageAtConversion:35, conversionYear:'~611 CE',cat:'other',   context:'Travelled from Ghifar alone to verify the Prophet\'s ﷺ message' },
  { rank:17, name:'Abu Hurayra',         ageAtConversion:27, conversionYear:'7 AH (629 CE)',cat:'narrator','context':'Late convert but became greatest hadith narrator in history' },
  { rank:18, name:'Zayd ibn Thabit',     ageAtConversion:11, conversionYear:'~1 AH',  cat:'scholar', context:'One of the youngest companions; became the Prophet\'s ﷺ scribe' },
  { rank:19, name:'Ibn Abbas',           ageAtConversion:3,  conversionYear:'~3 AH',  cat:'scholar', context:'Born into Islam; the Prophet ﷺ placed hands on his head and prayed' },
  { rank:22, name:'Ibn Masud',           ageAtConversion:20, conversionYear:'~613 CE',cat:'scholar', context:'Found shepherding outside Mecca; converted through personal contact' },
  { rank:27, name:'Ammar ibn Yasir',     ageAtConversion:25, conversionYear:'~610 CE',cat:'martyr',  context:'Among the earliest converts; entire family tortured for Islam' },
  { rank:29, name:'Salman al-Farisi',    ageAtConversion:50, conversionYear:'~5 AH',  cat:'other',   context:'Reached Medina after decades of searching for prophethood across Persia and Syria' },
  { rank:37, name:'Abu Sufyan',          ageAtConversion:65, conversionYear:'8 AH',   cat:'other',   context:'Chief enemy of Islam for 20 years; converted at sword\'s edge in 630 CE' },
];

/* ═══════════════════════════════════════════════════════════════════════
   HISTORICAL EVENTS + PRESENCE MATRIX  (Feature 31)
   ═════════════════════════════════════════════════════════════════════ */
export interface HistoricalEvent {
  id: string;
  label: string;
  short: string;
  yearCE: number;
  yearAH: number;
  color: string;
}

export const HIST_EVENTS: HistoricalEvent[] = [
  { id:'revelation', label:'First Revelation',        short:'Revelation',  yearCE:610, yearAH:-12, color:'#b8860b' },
  { id:'hijra',      label:'Hijra to Medina',          short:'Hijra',       yearCE:622, yearAH:1,  color:'#1a3462' },
  { id:'badr',       label:'Battle of Badr',           short:'Badr',        yearCE:624, yearAH:2,  color:'#8b1a38' },
  { id:'uhud',       label:'Battle of Uhud',           short:'Uhud',        yearCE:625, yearAH:3,  color:'#8b3a08' },
  { id:'khandaq',    label:'Battle of Khandaq',        short:'Khandaq',     yearCE:627, yearAH:5,  color:'#0a3d2e' },
  { id:'hudaybiyya', label:'Treaty of Hudaybiyyah',    short:'Hudaybiyya',  yearCE:628, yearAH:6,  color:'#2a5080' },
  { id:'khaybar',    label:'Conquest of Khaybar',      short:'Khaybar',     yearCE:629, yearAH:7,  color:'#5c1010' },
  { id:'mecca',      label:'Conquest of Mecca',        short:'Mecca',       yearCE:630, yearAH:8,  color:'#b8860b' },
  { id:'hunayn',     label:'Battle of Hunayn',         short:'Hunayn',      yearCE:630, yearAH:8,  color:'#7a3060' },
  { id:'tabuk',      label:'Expedition of Tabuk',      short:'Tabuk',       yearCE:631, yearAH:9,  color:'#3d2a0a' },
  { id:'hajj',       label:'Farewell Pilgrimage',      short:'Farewell Hajj',yearCE:632,yearAH:10, color:'#509070' },
  { id:'prophDeath', label:'Death of Prophet ﷺ',      short:'Wafat',       yearCE:632, yearAH:11, color:'#888888' },
];

/* companion rank → array of event ids they were present at */
export const EVENT_PRESENCE: Record<number, string[]> = {
  1:  ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj','prophDeath'],
  2:  ['hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj','prophDeath'],
  3:  ['hijra','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj'],
  4:  ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj'],
  5:  ['hijra','uhud','khandaq','hudaybiyya','khaybar','mecca','hajj','prophDeath'],
  7:  ['revelation','hijra','badr','uhud'],
  8:  ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj'],
  9:  ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn'],
  10: ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj'],
  11: ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk'],
  12: ['mecca','hunayn','tabuk','hajj'],
  13: ['hijra','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj','prophDeath'],
  15: ['revelation','hijra','badr','uhud'],
  17: ['khaybar','mecca','hunayn','tabuk','hajj','prophDeath'],
  18: ['hijra','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk','hajj','prophDeath'],
  19: ['mecca','hajj','prophDeath'],
  22: ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk'],
  27: ['revelation','hijra','badr','uhud','khandaq','hudaybiyya','khaybar','mecca','hunayn'],
  29: ['khandaq','hudaybiyya','khaybar','mecca','hunayn','tabuk'],
  37: ['mecca','hunayn','hajj'],
};

/* ═══════════════════════════════════════════════════════════════════════
   ANSARI / MUHAJIR CLASSIFICATION  (Feature 25)
   ═════════════════════════════════════════════════════════════════════ */
export type OriginGroup = 'muhajir' | 'ansar' | 'late' | 'other';

export const ORIGIN_GROUP: Record<number, OriginGroup> = {
  1:'muhajir', 2:'muhajir', 3:'muhajir', 4:'muhajir', 5:'muhajir',
  6:'muhajir', 7:'muhajir', 8:'muhajir', 9:'muhajir', 10:'muhajir',
  11:'muhajir',12:'late',   13:'ansar',  14:'other',  15:'muhajir',
  16:'other',  17:'late',   18:'ansar',  19:'muhajir',20:'ansar',
  21:'ansar',  22:'muhajir',23:'ansar',  24:'muhajir',25:'ansar',
  26:'ansar',  27:'muhajir',28:'muhajir',29:'late',   30:'ansar',
  31:'ansar',  32:'ansar',  33:'ansar',  34:'ansar',  35:'muhajir',
  36:'ansar',  37:'late',   38:'ansar',  39:'muhajir',40:'muhajir',
  41:'late',   42:'late',   43:'ansar',  44:'ansar',  45:'late',
  46:'ansar',  47:'ansar',  48:'ansar',  49:'ansar',  50:'ansar',
};

export const ORIGIN_META: Record<OriginGroup, { label: string; color: string; desc: string }> = {
  muhajir: { label: 'Muhajiroon', color: '#b8860b', desc: 'Emigrated from Mecca to Medina' },
  ansar:   { label: 'Ansaar',     color: '#1a3462', desc: 'Medina helpers who welcomed the emigrants' },
  late:    { label: 'Late Converts',color:'#0a3d2e',desc: 'Converted after Hudaybiyyah (6 AH) or at Conquest' },
  other:   { label: 'Other',      color: '#888888', desc: 'Non-Qurayshi, non-Medinan origin' },
};

/* ═══════════════════════════════════════════════════════════════════════
   FOUR CALIPHS TIMELINE  (Feature 23)
   ═════════════════════════════════════════════════════════════════════ */
export interface CaliphateRecord {
  rank: number;
  name: string;
  ar: string;
  title: string;
  startCE: number;
  endCE: number;
  startAH: number;
  endAH: number;
  color: string;
  achievements: string[];
  challenges: string[];
  conquests: string[];
  note: string;
}

export const CALIPHATE_DATA: CaliphateRecord[] = [
  {
    rank:1, name:'Abu Bakr al-Siddiq', ar:'أبو بكر الصديق', title:'Al-Siddiq',
    startCE:632, endCE:634, startAH:11, endAH:13, color:'#b8860b',
    achievements:['Compiled Quran into one volume','Defeated 11 false prophets','Launched Persian + Byzantine campaigns','Preserved unity of Arabia'],
    challenges:['Ridda Wars — mass apostasy','Budget: nearly empty treasury','Opposition to Usama\'s army deployment'],
    conquests:['Iraq (partial)','Eastern Arabia'],
    note:'2 years, 3 months — the most consequential short caliphate in history',
  },
  {
    rank:2, name:'Umar ibn al-Khattab', ar:'عمر بن الخطاب', title:'Al-Faruq',
    startCE:634, endCE:644, startAH:13, endAH:23, color:'#8b3a08',
    achievements:['Created Hijri calendar','Established Diwan (state payroll)','Invented state treasury (Bayt al-Mal)','Conquered Jerusalem personally','Night patrols for the poor'],
    challenges:['Plague of Amwas killed 25,000 soldiers','Abu Ubayda died in plague','Assassination plot by Abu Lu\'lu\'a'],
    conquests:['Syria','Iraq','Persia','Egypt','Armenia','Azerbaijan'],
    note:'10 years — the greatest territorial expansion in Islamic history',
  },
  {
    rank:3, name:'Uthman ibn Affan', ar:'عثمان بن عفان', title:'Dhul-Nurayn',
    startCE:644, endCE:656, startAH:23, endAH:35, color:'#1a3462',
    achievements:['Standardized the Quran (Uthmani mushaf)','Built Islamic navy','Expanded Masjid al-Haram','Conquered North Africa and Central Asia'],
    challenges:['Internal opposition (Abu Dharr controversy)','Rebel siege of his home','Assassination while reading Quran'],
    conquests:['Khurasan','North Africa','Cyprus','Armenia full conquest','Tabaristan'],
    note:'12 years — preserved the Quran for all of humanity',
  },
  {
    rank:4, name:'Ali ibn Abi Talib', ar:'علي بن أبي طالب', title:'Asad Allah',
    startCE:656, endCE:661, startAH:35, endAH:40, color:'#0a3d2e',
    achievements:['Maintained justice amid civil war','Nahj al-Balagha (Peak of Eloquence)','Administrative reforms in Iraq','Preserved Islamic law tradition'],
    challenges:['Battle of Jamal vs Aisha','Battle of Siffin vs Muawiyah','Khawarij uprising','Assassination at Kufa mosque'],
    conquests:['No new conquests — period of internal consolidation'],
    note:'4 years, 9 months — the most ethically tested caliphate',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FIQH / FATWA ARCHIVE  (Feature 13 + 46)
   ═════════════════════════════════════════════════════════════════════ */
export interface FiqhOpinion {
  companionRank: number;
  companionName: string;
  position: 'permissible' | 'prohibited' | 'recommended' | 'disliked' | 'obligatory';
  opinion: string;
  reasoning: string;
  source: string;
}

export interface FiqhTopic {
  id: string;
  topic: string;
  category: 'worship' | 'family' | 'commerce' | 'governance' | 'food' | 'purification' | 'theology';
  isIjma: boolean;   // true = unanimous consensus
  opinions: FiqhOpinion[];
  madhab_influence?: string;
}

export const FIQH_ARCHIVE: FiqhTopic[] = [
  {
    id:'wudu_socks',
    topic: 'Wiping over leather socks (Masah \'ala al-Khuffayn)',
    category: 'purification', isIjma: false,
    opinions: [
      { companionRank:2,  companionName:'Umar ibn al-Khattab',   position:'permissible', opinion:'Permitted and practiced it himself', reasoning:'Established sunnah — the Prophet ﷺ demonstrated this explicitly', source:'Bukhari 202; Muslim 276' },
      { companionRank:4,  companionName:'Ali ibn Abi Talib',      position:'permissible', opinion:'Permitted after initial hesitation on evidence', reasoning:'Later confirmed after seeing multiple companions practice it', source:'Ibn Abi Shayba, Musannaf 1/179' },
      { companionRank:5,  companionName:'Aisha bint Abi Bakr',    position:'disliked',    opinion:'Preferred complete wudu over the feet', reasoning:'Did not witness the Prophet ﷺ practicing it in her presence', source:'Tabaqat Ibn Sa\'d 8/67' },
    ],
    madhab_influence: 'Adopted by all four madhabs — the rare case of near-unanimous acceptance',
  },
  {
    id:'mut_a',
    topic: 'Mut\'a (temporary marriage)',
    category: 'family', isIjma: false,
    opinions: [
      { companionRank:2,  companionName:'Umar ibn al-Khattab', position:'prohibited', opinion:'Declared it forbidden and threatened punishment for it', reasoning:'Argued Prophet ﷺ forbade it in his final rulings; protected social order', source:'Muslim 1405; Tirmidhi 1121' },
      { companionRank:19, companionName:'Ibn Abbas',            position:'permissible', opinion:'Maintained it was permitted in conditions of necessity', reasoning:'Could not find a clear abrogating hadith in his assessment', source:'Muslim 1404 (Ibn Abbas narration)' },
    ],
    madhab_influence: 'Prohibiting position adopted by all Sunni madhabs following Umar\'s ruling',
  },
  {
    id:'zakat_ridda',
    topic: 'Fighting those who refuse Zakat',
    category: 'governance', isIjma: false,
    opinions: [
      { companionRank:1, companionName:'Abu Bakr al-Siddiq',   position:'obligatory', opinion:'Fight all who separate prayer from zakat — they are in riddah', reasoning:'Zakat is a pillar; separating it from Islam destroys Islam\'s structure', source:'Bukhari 7285; Muslim 20' },
      { companionRank:2, companionName:'Umar ibn al-Khattab',  position:'disliked',   opinion:'Initially opposed fighting Muslims over zakat', reasoning:'Did not want Muslim blood spilled over a financial matter', source:'Bukhari 7285 (Umar\'s initial objection narrated by Abu Bakr)' },
    ],
    madhab_influence: 'Abu Bakr\'s position became the dominant ruling; established precedent for fighting rebels',
  },
  {
    id:'quran_compilation',
    topic: 'Compiling the Quran into one book',
    category: 'theology', isIjma: false,
    opinions: [
      { companionRank:1,  companionName:'Abu Bakr al-Siddiq',  position:'obligatory', opinion:'Commanded Zayd to compile after Yamama deaths', reasoning:'Protection of Quran after 700 memorizers died required written compilation', source:'Bukhari 4986' },
      { companionRank:18, companionName:'Zayd ibn Thabit',     position:'disliked',   opinion:'Initially refused — "how can I do what the Prophet ﷺ did not do?"', reasoning:'Worried about innovating a process not mandated by the Prophet ﷺ', source:'Bukhari 4986' },
    ],
    madhab_influence: 'Abu Bakr and Umar convinced Zayd; outcome was the master manuscript',
  },
  {
    id:'hadith_narration',
    topic: 'Restricting hadith narration',
    category: 'theology', isIjma: false,
    opinions: [
      { companionRank:2,  companionName:'Umar ibn al-Khattab',  position:'disliked', opinion:'Limited and discouraged excessive hadith narration', reasoning:'Feared mixing with Quran; feared chains of invention', source:'Tabaqat Ibn Sa\'d; Tarikh al-Tabari' },
      { companionRank:17, companionName:'Abu Hurayra',          position:'recommended', opinion:'Narrated freely and taught thousands of hadiths', reasoning:'Was gifted perfect memory by the Prophet\'s ﷺ prayer; feared loss of sunnah', source:'Bukhari 118; Muslim narrations' },
    ],
    madhab_influence: 'Abu Hurayra\'s approach produced the largest single-narrator corpus in hadith literature',
  },
  {
    id:'interest_penalty',
    topic: 'Riba (interest) on delayed debt',
    category: 'commerce', isIjma: true,
    opinions: [
      { companionRank:1,  companionName:'Abu Bakr al-Siddiq', position:'prohibited', opinion:'All forms of riba are absolutely prohibited', reasoning:'Quran is explicit; Prophet ﷺ cursed all parties to a riba transaction', source:'Quran 2:275; Bukhari 2083' },
      { companionRank:19, companionName:'Ibn Abbas',          position:'prohibited', opinion:'Prohibited — clarified that even delayed-payment excess is riba', reasoning:'Unified multiple hadith reports on the topic', source:'Muslim 1584' },
    ],
    madhab_influence: 'Unanimous (ijma) among all companions — no dissent recorded on basic riba prohibition',
  },
  {
    id:'wine_lashes',
    topic: 'Number of lashes for wine drinking',
    category: 'governance', isIjma: false,
    opinions: [
      { companionRank:4,  companionName:'Ali ibn Abi Talib',  position:'obligatory', opinion:'80 lashes — by analogy to slander punishment', reasoning:'Wine causes same social harm as false accusation; qiyas applied', source:'Muslim 1707; Abu Dawud 4480' },
      { companionRank:2,  companionName:'Umar ibn al-Khattab',position:'obligatory', opinion:'80 lashes — agreed with Ali after consultation', reasoning:'Consulted companions and settled on 80 as deterrent', source:'Muslim 1707' },
      { companionRank:19, companionName:'Ibn Abbas',          position:'permissible', opinion:'40 lashes — closer to what the Prophet ﷺ administered', reasoning:'The Prophet ﷺ never exceeded 40 lashes in practice', source:'Bukhari 6773; Muslim 1706' },
    ],
    madhab_influence: 'Hanafi and Maliki adopted 80; Shafi\'i and Hanbali adopted 40 based on Ibn Abbas',
  },
  {
    id:'witr_prayer',
    topic: 'Witr prayer — obligatory or sunnah?',
    category: 'worship', isIjma: false,
    opinions: [
      { companionRank:2,  companionName:'Umar ibn al-Khattab', position:'obligatory', opinion:'Witr is obligatory (wajib)', reasoning:'The Prophet ﷺ said "Witr is an obligation on every Muslim" (Ibn Majah)', source:'Ibn Majah 1190' },
      { companionRank:5,  companionName:'Aisha bint Abi Bakr', position:'recommended', opinion:'Witr is confirmed sunnah, not obligatory', reasoning:'The Prophet ﷺ never punished anyone for missing witr', source:'Muslim 746' },
    ],
    madhab_influence: 'Hanafi considers witr wajib; Shafi\'i, Maliki, Hanbali consider it sunnah',
  },
];

export const IJMA_TOPICS = FIQH_ARCHIVE.filter(f => f.isIjma);
export const IKHTILAF_TOPICS = FIQH_ARCHIVE.filter(f => !f.isIjma);

/* ═══════════════════════════════════════════════════════════════════════
   NAME CHANGES BY PROPHET ﷺ  (Feature 07)
   ═════════════════════════════════════════════════════════════════════ */
export interface NameChange {
  rank?: number;
  oldName: string;
  oldNameAr: string;
  newName: string;
  newNameAr: string;
  newNameMeaning: string;
  reason: string;
  source: string;
  category: 'remove-idolatry' | 'honor' | 'positive-meaning' | 'other';
}

export const NAME_CHANGES: NameChange[] = [
  { rank:1,  oldName:'Abd al-Ka\'ba',     oldNameAr:'عبد الكعبة',    newName:'Abd Allah (Abu Bakr)',  newNameAr:'عبد الله',         newNameMeaning:'Servant of Allah',     reason:'The name implied servitude to the Ka\'ba, a pagan structure; the Prophet ﷺ renamed him to assert monotheism', source:'Ibn Hajar, Al-Isabah 1/234', category:'remove-idolatry' },
  { rank:10, oldName:'Bilal ibn Rabah (name unchanged but his original pagan identity erased)', oldNameAr:'بلال',   newName:'Bilal — became the name of adhan itself', newNameAr:'بلال', newNameMeaning:'High, exalted', reason:'The Prophet ﷺ elevated his name from a slave\'s name to the name associated with the call to prayer for all humanity', source:'Ibn Hisham Seerah; Bukhari 604', category:'honor' },
  { rank:15, oldName:'Jundub ibn Junadah',oldNameAr:'جندب بن جنادة',   newName:'Abu Dharr al-Ghifari', newNameAr:'أبو ذر الغفاري',   newNameMeaning:'Father of traces/tracks',reason:'Given kunya Abu Dharr; original name Jundub retained but kunya became his identity', source:'Muslim 2473; Ibn Hajar Al-Isabah', category:'other' },
  { oldName:'Barira bint Sa\'d',oldNameAr:'برة',               newName:'Barira',               newNameAr:'برة',                newNameMeaning:'Good/Pious',           reason:'Name was already positive; the Prophet ﷺ kept it and elevated her status by naming her specifically', source:'Bukhari 5279', category:'positive-meaning' },
  { oldName:'Abd al-Uzza (Abu Lahab\'s name changed by Quran)', oldNameAr:'عبد العزى',           newName:'(Condemned by name in Quran)', newNameAr:'أبو لهب',       newNameMeaning:'Father of Flame',       reason:'Abu Lahab was his kunya; his real name Abd al-Uzza ("servant of al-Uzza") was an idolatrous name — the Quran condemned him by his evil kunya instead', source:'Quran 111:1', category:'remove-idolatry' },
  { oldName:'Asi ibn Wa\'il',    oldNameAr:'العاصي بن وائل',       newName:'Sa\'id ibn Wa\'il (father of Amr ibn al-As)', newNameAr:'سعيد',           newNameMeaning:'Happy/Fortunate',      reason:'The Prophet ﷺ changed names implying enmity (\'Asi = disobedient) to names with good meaning', source:'Abu Dawud 4952; Tirmidhi 2838', category:'remove-idolatry' },
  { oldName:'Harb (war)',        oldNameAr:'حرب',                    newName:'Silm (peace)',         newNameAr:'سلم',                newNameMeaning:'Peace/Submission',    reason:'The Prophet ﷺ forbade names meaning "war", "fighting", or "enmity" and replaced them with names meaning peace', source:'Abu Dawud 4952', category:'remove-idolatry' },
  { oldName:'Ghurab (crow)',     oldNameAr:'غراب',                   newName:'Alternative name given',newNameAr:'—',                newNameMeaning:'—',                   reason:'The Prophet ﷺ disapproved of animal names with negative connotations (crow = ill omen) and encouraged name changes', source:'Abu Dawud 4953', category:'remove-idolatry' },
  { oldName:'Hazn (sadness)',    oldNameAr:'حزن',                    newName:'Sahl (ease)',           newNameAr:'سهل',                newNameMeaning:'Easy/Smooth',         reason:'The Prophet ﷺ asked Sa\'id ibn al-Musayyab\'s grandfather to change his name from Hazn to Sahl; the grandfather refused — the Prophet ﷺ said "sadness will remain in your family"', source:'Bukhari 6190', category:'positive-meaning' },
  { oldName:'Abd Shams (servant of sun)', oldNameAr:'عبد شمس',      newName:'Abd al-Rahman',         newNameAr:'عبد الرحمن',        newNameMeaning:'Servant of the Most Merciful', reason:'The Prophet ﷺ systematically renamed all "Abd X" of pagan deities to "Abd Allah" or "Abd al-Rahman"', source:'Abu Dawud 4952; Ibn Hajar Al-Isabah', category:'remove-idolatry' },
  { oldName:'Shihab (flame)',    oldNameAr:'شهاب',                   newName:'Hisham',               newNameAr:'هشام',               newNameMeaning:'Generous/Crushing',   reason:'The Prophet ﷺ changed fire-related names; Shihab (shooting star/flame) was renamed to Hisham for a companion of the Ansar', source:'Tirmidhi 2839; Abu Dawud 4956', category:'positive-meaning' },
  { oldName:'\'Uthayya (disobedience)', oldNameAr:'عتبة',            newName:'More suitable name',    newNameAr:'—',                newNameMeaning:'—',                   reason:'The Prophet ﷺ forbade the name \'Uthayya (little disobedience) and Rafi\' (elevated without cause) saying "Allah is al-Rafi\'"', source:'Muslim 2132', category:'remove-idolatry' },
];

/* ═══════════════════════════════════════════════════════════════════════
   HADITH GRADES + KUTUB AL-SITTA  (Features 26 + 14)
   ═════════════════════════════════════════════════════════════════════ */
export const KUTUB_SITTA_LIST = [
  'Sahih al-Bukhari',
  'Sahih Muslim',
  'Sunan Abu Dawud',
  'Jami\' al-Tirmidhi',
  'Sunan al-Nasa\'i',
  'Sunan Ibn Majah',
] as const;

export interface HadithProfile {
  companionRank: number;
  sahih: number;
  hasan: number;
  daif: number;
  books: (typeof KUTUB_SITTA_LIST[number])[];
  topNarration: string;
}

export const HADITH_PROFILES: HadithProfile[] = [
  { companionRank:5,  sahih:1850, hasan:280, daif:80,  books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'The ifk narration and the ruling on prayer in the home — preserved exclusively through her' },
  { companionRank:17, sahih:3500, hasan:1200,daif:674, books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'5,374 hadiths — single largest individual collection in Islamic history' },
  { companionRank:2,  sahih:430,  hasan:75,  daif:32,  books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'537 hadiths including "Actions by intentions" — the most recited opening hadith in Islamic tradition' },
  { companionRank:1,  sahih:105,  hasan:28,  daif:9,   books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'142 hadiths — the cave hadith (9:40 context) is exclusively narrated through him' },
  { companionRank:13, sahih:1950, hasan:240, daif:96,  books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'2,286 hadiths — "Facilitate, do not make difficult; give glad tidings, do not cause people to flee"' },
  { companionRank:4,  sahih:420,  hasan:80,  daif:36,  books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'536 hadiths — "The worth of every person is what he excels at"' },
  { companionRank:19, sahih:1400, hasan:320, daif:120, books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'"Ask me about the Book of Allah" — his Tafsir narrations became the foundation of Quranic commentary' },
  { companionRank:22, sahih:680,  hasan:120, daif:48,  books:['Sahih al-Bukhari','Sahih Muslim','Sunan Abu Dawud','Jami\' al-Tirmidhi','Sunan al-Nasa\'i','Sunan Ibn Majah'], topNarration:'"Whoever wishes to recite Quran fresh as revealed, let him recite as Ibn Masud recites"' },
];

/* ═══════════════════════════════════════════════════════════════════════
   QURAN → COMPANION REFERENCE MAP  (Feature 34)
   For the Ten Paradise section
   ═════════════════════════════════════════════════════════════════════ */
export interface QuranCompanionRef {
  companionRank: number;
  ayahRef: string;
  ayahAr: string;
  ayahEn: string;
  context: string;
}

export const QURAN_COMPANION_REFS: QuranCompanionRef[] = [
  { companionRank:1, ayahRef:'9:40', ayahAr:'إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', ayahEn:'"[When] he said to his companion, Do not grieve; indeed Allah is with us."', context:'Abu Bakr in the cave at Hijra — the only companion named-by-context in the Quran' },
  { companionRank:4, ayahRef:'2:207', ayahAr:'وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ', ayahEn:'"And of the people is he who sells himself, seeking the pleasure of Allah."', context:'Revealed about Ali sleeping in the Prophet\'s ﷺ bed during the night of Hijra' },
  { companionRank:6, ayahRef:'33:37', ayahAr:'...وَإِذْ تَقُولُ لِلَّذِي أَنْعَمَ اللَّهُ عَلَيْهِ وَأَنْعَمْتَ عَلَيْهِ', ayahEn:'"And when you said to the one on whom Allah had bestowed favor and you had bestowed favor..."', context:'Zayd ibn Haritha — the only companion named directly by name in the Quran (Zayd, 33:37)' },
  { companionRank:8, ayahRef:'9:20', ayahAr:'الَّذِينَ آمَنُوا وَهَاجَرُوا وَجَاهَدُوا فِي سَبِيلِ اللَّهِ بِأَمْوَالِهِمْ وَأَنفُسِهِمْ', ayahEn:'"Those who believed and emigrated and strove in the path of Allah with their wealth and lives..."', context:'Multiple ayahs referring to the Badr veterans; Sa\'d was among the first arrow-shooters' },
  { companionRank:7, ayahRef:'3:169', ayahAr:'وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا', ayahEn:'"And never think of those who have been killed in the cause of Allah as dead..."', context:'Revealed after Uhud — often cited as referring to Hamza and the other Uhud martyrs' },
  { companionRank:10, ayahRef:'49:13', ayahAr:'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ', ayahEn:'"Indeed the most noble of you in the sight of Allah is the most righteous of you."', context:'Directly relevant to Bilal — responding to those who mocked his Abyssinian origin; the Prophet ﷺ cited this verse when Bilal gave the adhan on the Ka\'ba' },
];

/* ═══════════════════════════════════════════════════════════════════════
   DEATH CAUSE MAP DATA  (Feature 03)
   lat/lng + cause for expansion map overlay
   ═════════════════════════════════════════════════════════════════════ */
export interface DeathMapPoint {
  name: string;
  lat: number;
  lng: number;
  cause: 'martyrdom' | 'plague' | 'natural' | 'assassination';
  year: number;
  note: string;
  color: string;
}

export const DEATH_MAP_POINTS: DeathMapPoint[] = [
  { name:'Hamza ibn Abd al-Muttalib', lat:24.4,  lng:39.5,  cause:'martyrdom',    year:625, note:'Battle of Uhud — first major companion martyred', color:'#8b1a38' },
  { name:'Musab ibn Umayr',           lat:24.4,  lng:39.5,  cause:'martyrdom',    year:625, note:'Standard-bearer at Uhud', color:'#8b1a38' },
  { name:'Abu Ubayda ibn al-Jarrah',  lat:32.6,  lng:35.9,  cause:'plague',       year:639, note:'Plague of Amwas (Emmaus, Palestine)', color:'#b8860b' },
  { name:'Muadh ibn Jabal',           lat:32.6,  lng:35.9,  cause:'plague',       year:639, note:'Plague of Amwas — died the same year as Abu Ubayda', color:'#b8860b' },
  { name:'Abu Sufyan (Yazid ibn)',     lat:32.6,  lng:35.9,  cause:'plague',       year:639, note:'Son of Abu Sufyan, died in Amwas plague', color:'#b8860b' },
  { name:'Umar ibn al-Khattab',        lat:24.5,  lng:39.6,  cause:'assassination',year:644, note:'Stabbed at Fajr prayer in Masjid al-Nabawi', color:'#c0392b' },
  { name:'Uthman ibn Affan',           lat:24.5,  lng:39.6,  cause:'assassination',year:656, note:'Martyred in his home while reading Quran', color:'#c0392b' },
  { name:'Ali ibn Abi Talib',          lat:32.0,  lng:44.3,  cause:'assassination',year:661, note:'Poisoned sword at Kufa mosque during Fajr', color:'#c0392b' },
  { name:'Khalid ibn al-Walid',        lat:24.5,  lng:39.6,  cause:'natural',      year:642, note:'Died in Medina/Homs — never defeated in battle', color:'#2a5080' },
  { name:'Abu Bakr al-Siddiq',         lat:24.5,  lng:39.6,  cause:'natural',      year:634, note:'Died after brief illness in Medina', color:'#2a5080' },
  { name:'Aisha bint Abi Bakr',        lat:24.5,  lng:39.6,  cause:'natural',      year:678, note:'Died in Medina aged ~64', color:'#2a5080' },
  { name:'Abu Dharr al-Ghifari',       lat:24.7,  lng:40.2,  cause:'natural',      year:652, note:'Died in Rabadha in self-imposed exile', color:'#2a5080' },
  { name:'Abdullah ibn Masud',         lat:24.5,  lng:39.6,  cause:'natural',      year:653, note:'Died in Medina — dispute with Uthman at end', color:'#2a5080' },
];

export const DEATH_CAUSE_COLORS: Record<string, string> = {
  martyrdom:    '#8b1a38',
  plague:       '#b8860b',
  assassination:'#c0392b',
  natural:      '#2a5080',
};

/* ═══════════════════════════════════════════════════════════════════════
   ADAPTIVE QUIZ  (Feature 29)
   ═════════════════════════════════════════════════════════════════════ */
export interface QuizQuestion {
  id: number;
  q: string;
  options: string[];
  answer: number;  // 0-based index
  source: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'identity' | 'hadith' | 'battles' | 'fiqh' | 'history' | 'quran' | 'firsts';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id:1,  q:'Who is the only companion named directly in the Quran by first name?', options:['Ali ibn Abi Talib','Zayd ibn Haritha','Abu Bakr al-Siddiq','Umar ibn al-Khattab'], answer:1, source:'Quran 33:37', difficulty:2, category:'quran', explanation:'Zayd ibn Haritha is named in 33:37 — the only companion called by name in the Quran.' },
  { id:2,  q:'How many hadiths did Abu Hurayra narrate?', options:['1,200','2,286','5,374','3,500'], answer:2, source:'Bukhari 118', difficulty:1, category:'hadith', explanation:'Abu Hurayra narrated 5,374 hadiths — the largest corpus of any single companion.' },
  { id:3,  q:'At which battle did Hamza ibn Abd al-Muttalib achieve martyrdom?', options:['Badr','Uhud','Khandaq','Khaybar'], answer:1, source:'Ibn Hisham Seerah', difficulty:1, category:'battles', explanation:'Hamza was martyred at the Battle of Uhud (3 AH) by Wahshi ibn Harb.' },
  { id:4,  q:'Who was the first person to give the adhan (call to prayer) in Islam?', options:['Umar ibn al-Khattab','Abu Bakr al-Siddiq','Bilal ibn Rabah','Anas ibn Malik'], answer:2, source:'Bukhari 604', difficulty:1, category:'firsts', explanation:'Bilal ibn Rabah was personally appointed by the Prophet ﷺ as Islam\'s first muezzin.' },
  { id:5,  q:'Which companion was declared "Trustworthy of the entire nation" (Amin al-Ummah) by the Prophet ﷺ?', options:['Abu Bakr al-Siddiq','Sa\'d ibn Abi Waqqas','Abu Ubayda ibn al-Jarrah','Khalid ibn al-Walid'], answer:2, source:'Bukhari 3744; Muslim 2419', difficulty:2, category:'identity', explanation:'Abu Ubayda ibn al-Jarrah — given this title when the Najran delegation asked for the most trustworthy Muslim.' },
  { id:6,  q:'Which companion compiled the Quran into a single volume under Abu Bakr\'s command?', options:['Umar ibn al-Khattab','Ali ibn Abi Talib','Zayd ibn Thabit','Abdullah ibn Masud'], answer:2, source:'Bukhari 4986', difficulty:2, category:'history', explanation:'Zayd ibn Thabit initially refused but was convinced, and produced the first compiled Quran.' },
  { id:7,  q:'At what age did Ali ibn Abi Talib accept Islam?', options:['7','10','15','20'], answer:1, source:'Tirmidhi 3734', difficulty:2, category:'identity', explanation:'Ali accepted Islam at approximately 10 years old — the first child to accept Islam.' },
  { id:8,  q:'How long did Abu Bakr\'s caliphate last?', options:['1 year','2 years 3 months','4 years','6 months'], answer:1, source:'Tabaqat Ibn Sa\'d', difficulty:2, category:'history', explanation:'Abu Bakr\'s caliphate lasted 2 years, 3 months, 11 days (632–634 CE).' },
  { id:9,  q:'Who introduced the tactic of digging a trench in Arabian warfare?', options:['Khalid ibn al-Walid','Umar ibn al-Khattab','Salman al-Farisi','Abu Ubayda ibn al-Jarrah'], answer:2, source:'Ibn Hisham Seerah', difficulty:3, category:'firsts', explanation:'Salman al-Farisi suggested the Persian tactic of digging a trench (Khandaq) that stopped the 10,000-strong Quraysh army.' },
  { id:10, q:'In which year (CE) did Umar ibn al-Khattab personally receive the keys to Jerusalem?', options:['634','636','638','642'], answer:2, source:'Al-Bidaya wa\'l-Nihaya', difficulty:3, category:'history', explanation:'Umar entered Jerusalem in 638 CE and signed the Covenant of Umar guaranteeing protection for all inhabitants.' },
  { id:11, q:'Which companion held the opinion that mut\'a (temporary marriage) remained permissible even after Umar prohibited it?', options:['Ali ibn Abi Talib','Aisha bint Abi Bakr','Ibn Abbas','Sa\'d ibn Abi Waqqas'], answer:2, source:'Muslim 1404', difficulty:4, category:'fiqh', explanation:'Ibn Abbas maintained that mut\'a was permissible in conditions of necessity — a famous position of ikhtilaf.' },
  { id:12, q:'Which companion did the Prophet ﷺ say he heard "footsteps in Paradise"?', options:['Abu Bakr al-Siddiq','Umar ibn al-Khattab','Bilal ibn Rabah','Anas ibn Malik'], answer:2, source:'Bukhari 1149', difficulty:2, category:'identity', explanation:'During the Isra\' and Mi\'raj, the Prophet ﷺ heard Bilal\'s sandal steps ahead of him in Paradise.' },
  { id:13, q:'What was the original name of Abd al-Rahman ibn Awf before the Prophet ﷺ changed it?', options:['Abd al-Ka\'ba','Abd al-Uzza','Abd Shams','Abd al-Nabi'], answer:1, source:'Ibn Hajar Al-Isabah', difficulty:4, category:'identity', explanation:'Abd al-Rahman ibn Awf was originally named Abd al-Ka\'ba (servant of the Ka\'ba). The Prophet ﷺ changed it to Abd al-Rahman.' },
  { id:14, q:'How many Quran-memorizers (huffaz) died at the Battle of Yamama?', options:['300','500','700','1,000'], answer:2, source:'Bukhari 4986', difficulty:3, category:'history', explanation:'About 700 Quran memorizers died at Yamama — this prompted Abu Bakr to commission the compilation of the Quran.' },
  { id:15, q:'Which companion was the first to fire an arrow in Islamic warfare?', options:['Khalid ibn al-Walid','Sa\'d ibn Abi Waqqas','Hamza ibn Abd al-Muttalib','Ali ibn Abi Talib'], answer:1, source:'Ibn Hisham Seerah; Musnad Ahmad', difficulty:3, category:'firsts', explanation:'Sa\'d ibn Abi Waqqas shot the first arrow in the history of Islamic warfare, before any formal battle.' },
  { id:16, q:'At which conquest did Khalid ibn al-Walid receive the title "Sword of Allah"?', options:['Battle of Uhud','Battle of Mutah','Conquest of Mecca','Battle of Yarmouk'], answer:1, source:'Bukhari 4262', difficulty:3, category:'battles', explanation:'After the Battle of Mutah (8 AH), the Prophet ﷺ gave Khalid the title "Sword of Allah drawn against the disbelievers."' },
  { id:17, q:'Which companion\'s refusal to surrender his personal mushaf led to direct confrontation with Uthman?', options:['Ubay ibn Ka\'b','Abu Musa al-Ash\'ari','Abdullah ibn Masud','Ali ibn Abi Talib'], answer:2, source:'Tabaqat Ibn Sa\'d', difficulty:4, category:'history', explanation:'Ibn Masud refused to give up his personal mushaf when Uthman standardized the Quran, leading to conflict.' },
  { id:18, q:'Which companion did the Prophet ﷺ make a specific du\'a for: "O Allah, make his arrow accurate and answer his supplication"?', options:['Khalid ibn al-Walid','Ali ibn Abi Talib','Sa\'d ibn Abi Waqqas','Hamza ibn Abd al-Muttalib'], answer:2, source:'Tirmidhi 3752', difficulty:4, category:'identity', explanation:'The Prophet ﷺ said this specific du\'a for Sa\'d ibn Abi Waqqas — making him famous for having answered prayers.' },
  { id:19, q:'How old was Salman al-Farisi approximately when he converted to Islam?', options:['25','35','50','70'], answer:2, source:'Tabaqat Ibn Sa\'d', difficulty:4, category:'identity', explanation:'Salman was approximately 50 years old when he finally reached Medina after decades of searching across Persia and Syria.' },
  { id:20, q:'What does "Dhul-Nurayn" (Uthman ibn Affan\'s title) mean?', options:['Owner of two swords','Possessor of two lights','Man of two caliphates','Bearer of two burdens'], answer:1, source:'Ibn Hajar Al-Isabah', difficulty:2, category:'identity', explanation:'Dhul-Nurayn means "Owner/Possessor of Two Lights" — he married two daughters of the Prophet ﷺ (Ruqayya then Umm Kulthum).' },
];

/* ═══════════════════════════════════════════════════════════════════════
   SITUATION → HADITH GUIDE  (Feature 37)
   ═════════════════════════════════════════════════════════════════════ */
export interface SituationGuide {
  situation: string;
  keywords: string[];
  hadiths: {
    text: string;
    narrator: string;
    narratorRank: number;
    source: string;
    relevance: string;
  }[];
  category: 'grief' | 'gratitude' | 'anger' | 'fear' | 'patience' | 'forgiveness' | 'leadership' | 'knowledge' | 'community' | 'worship' | 'family' | 'money';
}

export const SITUATION_GUIDES: SituationGuide[] = [
  {
    situation: 'Feeling grief or sadness',
    keywords: ['grief','sad','loss','cry','tears','sorrow','depressed','heartbreak'],
    category: 'grief',
    hadiths: [
      { text:'"The eyes shed tears and the heart is grieved, and we will not say except what pleases our Lord. Indeed, O Ibrahim, we are saddened by your parting."', narrator:'Anas ibn Malik', narratorRank:13, source:'Bukhari 1303', relevance:'The Prophet ﷺ wept at his son Ibrahim\'s death — normalizing grief while maintaining gratitude' },
      { text:'"Be gentle, for whenever gentleness is in a thing, it beautifies it, and whenever it is withdrawn from something, it mars it."', narrator:'Aisha bint Abi Bakr', narratorRank:5, source:'Muslim 2594', relevance:'Gentleness — the antidote to the harshness grief can create in oneself and with others' },
      { text:'"Allah does not look at your forms and your wealth, but He looks at your hearts and your deeds."', narrator:'Abu Hurayra', narratorRank:17, source:'Muslim 2564', relevance:'In grief, this reminds us that Allah sees the broken heart — that sincerity matters more than appearance' },
    ],
  },
  {
    situation: 'Struggling with anger',
    keywords: ['angry','anger','rage','furious','frustrated','temper','hostile'],
    category: 'anger',
    hadiths: [
      { text:'"Do not be angry." (Repeated three times to the same questioner)', narrator:'Abu Hurayra', narratorRank:17, source:'Bukhari 6116', relevance:'The Prophet\'s ﷺ repeated, simple, powerful answer to all of a man\'s questions about righteous conduct' },
      { text:'"The strong man is not the one who overcomes people by force. The strong man is the one who controls himself while in anger."', narrator:'Abu Hurayra', narratorRank:17, source:'Bukhari 6114; Muslim 2609', relevance:'Direct definition of strength as anger-control — reframing the concept entirely' },
      { text:'"If a man gets angry while standing, let him sit down. If his anger does not leave, let him lie down."', narrator:'Abu Dharr al-Ghifari', narratorRank:15, source:'Abu Dawud 4782', relevance:'A physical technique given directly by the Prophet ﷺ for managing the anger response' },
    ],
  },
  {
    situation: 'Facing financial hardship',
    keywords: ['money','debt','poor','broke','financial','wealth','poverty','struggle','afford','loans'],
    category: 'money',
    hadiths: [
      { text:'"Wealth is not in having many possessions. Rather, true wealth is the richness of the soul."', narrator:'Abu Hurayra', narratorRank:17, source:'Bukhari 6446; Muslim 1051', relevance:'Redefines wealth from possessions to contentment — the core response to financial anxiety' },
      { text:'"Seek provision from Allah. Ask your Lord for it."', narrator:'Umar ibn al-Khattab', narratorRank:2, source:'Ahmad 205', relevance:'Umar\'s direct injunction to turn to du\'a as a channel of sustenance alongside effort' },
      { text:'"The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower is the one that takes."', narrator:'Ibn Umar', narratorRank:30, source:'Bukhari 1427; Muslim 1033', relevance:'Encourages both effort and generosity — the psychology of abundance over scarcity' },
    ],
  },
  {
    situation: 'Making a difficult decision',
    keywords: ['decision','choice','confused','unsure','dilemma','decide','which','should'],
    category: 'knowledge',
    hadiths: [
      { text:'"Consult your heart. Righteousness is what the soul is comfortable with and the heart is at ease with. And sin is what troubles the soul and creates unease in the chest."', narrator:'Wabisat ibn Ma\'bad (via the Prophet ﷺ)', narratorRank:80, source:'Ahmad 17545; Darimi 2533', relevance:'Direct hadith on using the conscience as a moral compass in unclear situations' },
      { text:'"Take counsel, for the one who takes counsel does not regret."', narrator:'Ali ibn Abi Talib', narratorRank:4, source:'Tabaqat Ibn Sa\'d (Ali\'s sayings)', relevance:'Ali\'s own guidance on decision-making — consultation prevents regret' },
      { text:'"Ask scholars, consult wise men, and do not be hasty."', narrator:'Abu Hurayra', narratorRank:17, source:'Abu Dawud 4941', relevance:'The Prophet\'s ﷺ three-step process for big decisions: ask experts, consult experienced people, move deliberately' },
    ],
  },
  {
    situation: 'Dealing with ingratitude from others',
    keywords: ['ungrateful','thankless','disrespect','betrayal','unfair','unappreciated'],
    category: 'patience',
    hadiths: [
      { text:'"He who does not thank people has not thanked Allah."', narrator:'Abu Hurayra', narratorRank:17, source:'Abu Dawud 4811; Tirmidhi 1954', relevance:'Reveals that ingratitude toward people is connected to ingratitude toward Allah — sets expectation of gratitude as a spiritual duty' },
      { text:'"You will not enter Paradise until you believe, and you will not believe until you love each other. Shall I guide you to something that will make you love each other? Spread the greeting of peace among yourselves."', narrator:'Abu Hurayra', narratorRank:17, source:'Muslim 54', relevance:'Responds to ingratitude with a proactive practice — salaam as relationship-repair tool' },
    ],
  },
  {
    situation: 'Seeking knowledge or studying',
    keywords: ['learn','study','knowledge','education','understand','teach','student','scholar','research'],
    category: 'knowledge',
    hadiths: [
      { text:'"Whoever takes a path in which he seeks knowledge, Allah will make easy for him a path to Paradise."', narrator:'Abu Hurayra', narratorRank:17, source:'Muslim 2699', relevance:'Direct promise from the Prophet ﷺ linking the act of seeking knowledge to the path to Paradise' },
      { text:'"Ask — for the cure of ignorance is asking."', narrator:'Jabir ibn Abdullah', narratorRank:46, source:'Abu Dawud 336; Ibn Majah 572', relevance:'The Prophet\'s ﷺ permission and encouragement to ask questions — removes shame from not knowing' },
      { text:'"The best of you are those who learn the Quran and teach it."', narrator:'Uthman ibn Affan', narratorRank:3, source:'Bukhari 5027', relevance:'Establishes Quran learning and teaching as the highest scholarly pursuit' },
    ],
  },
  {
    situation: 'Family conflict or tension at home',
    keywords: ['family','parents','marriage','spouse','wife','husband','children','conflict','home','relationship'],
    category: 'family',
    hadiths: [
      { text:'"The best of you are those who are best to their wives."', narrator:'Aisha bint Abi Bakr', narratorRank:5, source:'Tirmidhi 3895; Ibn Majah 1977', relevance:'Direct benchmark for goodness in the home — the husband\'s character measured by treatment of wife' },
      { text:'"Treat women kindly. The woman was created from a rib, and the most curved part of a rib is the top. If you try to straighten it, you will break it."', narrator:'Abu Hurayra', narratorRank:17, source:'Bukhari 3331; Muslim 1468', relevance:'The Prophet\'s ﷺ wisdom on accepting difference in personality rather than forcing sameness' },
      { text:'"Whoever believes in Allah and the Last Day should honour his guest. Whoever believes in Allah and the Last Day should honour his neighbour. Whoever believes in Allah and the Last Day should say good or remain silent."', narrator:'Abu Hurayra', narratorRank:17, source:'Bukhari 6475; Muslim 47', relevance:'Practical guide for how to manage all household relationships: hospitality, neighbourhood, speech' },
    ],
  },
  {
    situation: 'Wanting to be more consistent in worship',
    keywords: ['prayer','salah','worship','consistent','habit','ibadah','dhikr','fasting','quran','routine'],
    category: 'worship',
    hadiths: [
      { text:'"The most beloved deeds to Allah are those that are consistent, even if they are small."', narrator:'Aisha bint Abi Bakr', narratorRank:5, source:'Bukhari 6464; Muslim 782', relevance:'Directly addresses the desire for sustainable worship — consistency beats intensity' },
      { text:'"The prayer said at its time is the best deed."', narrator:'Ibn Masud', narratorRank:22, source:'Bukhari 527; Muslim 85', relevance:'Prioritizes the five daily prayers — the foundation on which everything else is built' },
      { text:'"Protect the two rak\'ahs of Fajr — they are better than this world and all it contains."', narrator:'Aisha bint Abi Bakr', narratorRank:5, source:'Muslim 725; Tirmidhi 416', relevance:'Motivates even minimal consistent worship when overwhelmed by daily life' },
    ],
  },
  {
    situation: 'In a position of leadership or responsibility',
    keywords: ['leadership','leader','boss','manage','team','responsibility','authority','power','govern'],
    category: 'leadership',
    hadiths: [
      { text:'"Every one of you is a shepherd, and every one of you is responsible for his flock."', narrator:'Ibn Umar', narratorRank:30, source:'Bukhari 893; Muslim 1829', relevance:'Defines leadership as responsibility — every person is a shepherd of something, including oneself' },
      { text:'"Umar used to say: By Allah, whoever I appoint over the Muslims\' affairs and I find him doing wrong — I will punish him severely. But whoever I find doing good — I will increase his responsibility."', narrator:'Umar ibn al-Khattab', narratorRank:2, source:'Tabaqat Ibn Sa\'d 3/288', relevance:'Umar\'s governance principle: accountability and reward — the model of justice-based leadership' },
      { text:'"Make things easy, do not make them difficult. Give glad tidings and do not cause people to flee."', narrator:'Anas ibn Malik', narratorRank:13, source:'Bukhari 69; Muslim 1734', relevance:'The Prophet\'s ﷺ explicit instruction to those he sent as teachers and governors — the leadership philosophy of ease' },
    ],
  },
];
