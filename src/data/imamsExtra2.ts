/* ─────────────────────────────────────────────────────────────────────────
   Imams Page — Enrichment Data Set 2  (Features 78, 83)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 78 — ISNAD CHAIN BUILDER (Interactive)
   Historical Sahabi → Tabi'i → Scholar chains with validation
   ═════════════════════════════════════════════════════════════════════ */

export interface IsnadLink {
  id: string;
  name: string;
  nameAr: string;
  died: string;
  type: 'sahabi' | 'tabii' | 'scholar' | 'imam';
  madhab?: string;
  color: string;
  bio: string;
  knownStudents: string[];   // IDs they transmitted to
  knownTeachers: string[];   // IDs they received from
}

export const ISNAD_NODES: IsnadLink[] = [
  // Sahaba
  { id:'abu-hurayra', name:"Abu Hurayra", nameAr:"أبو هريرة", died:"681 CE / 59 AH", type:'sahabi', color:'#d4a820', bio:"Most prolific hadith narrator — 5,374 hadiths. He narrated from the Prophet ﷺ for 3 years of constant companionship.", knownStudents:['ibn-sirin','makhul','zuhri-t','hammam','saeed-maqburi'], knownTeachers:[] },
  { id:'aisha', name:"Aisha bint Abi Bakr", nameAr:"عائشة", died:"678 CE / 58 AH", type:'sahabi', color:'#7a3060', bio:"2,210 hadiths. Corrected other companions 67 times. The primary source for private prophetic life.", knownStudents:['urwa','qasim-ibn-muhammad','amra'], knownTeachers:[] },
  { id:'ibn-umar', name:"Abdullah ibn Umar", nameAr:"ابن عمر", died:"693 CE / 73 AH", type:'sahabi', color:'#b8860b', bio:"2,630 hadiths. Known for precise adherence to prophetic practice. Lived 60+ years after the Prophet ﷺ.", knownStudents:['nafi-mawla','salim-ibn-abd','ibn-shihab'], knownTeachers:[] },
  { id:'ibn-abbas', name:"Abdullah ibn Abbas", nameAr:"ابن عباس", died:"688 CE / 68 AH", type:'sahabi', color:'#2a5080', bio:"1,696 hadiths. Founder of Quranic tafsir. The Prophet ﷺ prayed: 'O Allah, grant him understanding in religion.'", knownStudents:['mujahid','ata-ibn-abi','saeed-jubayr','tawus'], knownTeachers:[] },
  { id:'anas-ibn-malik', name:"Anas ibn Malik", nameAr:"أنس بن مالك", died:"711 CE / 93 AH", type:'sahabi', color:'#0a5c2e', bio:"2,286 hadiths. Served the Prophet ﷺ for 10 years. The Prophet ﷺ prayed for his wealth, children, and long life.", knownStudents:['hasan-basri','qatada','ibn-sirin'], knownTeachers:[] },
  { id:'jabir', name:"Jabir ibn Abdullah", nameAr:"جابر بن عبدالله", died:"697 CE / 78 AH", type:'sahabi', color:'#8b3a08', bio:"1,540 hadiths. Last companion to die in Medina. Narrated extensively on worship, battles, and prophetic life.", knownStudents:['ata-ibn-abi','amr-ibn-dinar','abu-zubair'], knownTeachers:[] },

  // Tabi'un
  { id:'urwa', name:"Urwa ibn al-Zubayr", nameAr:"عروة بن الزبير", died:"713 CE / 94 AH", type:'tabii', color:'#509070', bio:"First systematic biographer of the Prophet ﷺ. Nephew of Aisha. His accounts form the backbone of Ibn Hisham's Seerah.", knownStudents:['zuhri-t','hisham-ibn-urwa'], knownTeachers:['aisha','ibn-umar','jabir'] },
  { id:'nafi-mawla', name:"Nafi' (mawla Ibn Umar)", nameAr:"نافع مولى ابن عمر", died:"735 CE / 117 AH", type:'tabii', color:'#b8860b', bio:"The most important Tabi'i chain link for Ibn Umar's narrations. His chain (Malik → Nafi' → Ibn Umar) is called 'The Golden Chain' by hadith scholars.", knownStudents:['malik-ibn-anas','ayub-sakhtiyani'], knownTeachers:['ibn-umar'] },
  { id:'hasan-basri', name:"Al-Hasan al-Basri", nameAr:"الحسن البصري", died:"728 CE / 110 AH", type:'tabii', color:'#0a5c2e', bio:"The greatest Tabi'i scholar of Basra. Profound ascetic and theologian. Born 2 years before the death of Umar, met many companions.", knownStudents:['qatada','ayub-sakhtiyani','ibn-awn'], knownTeachers:['anas-ibn-malik','ibn-umar','jabir'] },
  { id:'mujahid', name:"Mujahid ibn Jabr", nameAr:"مجاهد بن جبر", died:"722 CE / 104 AH", type:'tabii', color:'#2a5080', bio:"Read the Quran to Ibn Abbas 30 times asking about each verse. The greatest Tabi'i mufassir (Quranic interpreter).", knownStudents:['sufyan-thawri-t','ibn-jurayj'], knownTeachers:['ibn-abbas','jabir'] },
  { id:'saeed-jubayr', name:"Sa'id ibn Jubayr", nameAr:"سعيد بن جبير", died:"714 CE / 95 AH", type:'tabii', color:'#2a5080', bio:"One of the greatest Tabi'i scholars. Memorized the Quran. Executed by Hajjaj for refusing to support his authority.", knownStudents:['sufyan-thawri-t','shu-ba'], knownTeachers:['ibn-abbas'] },
  { id:'zuhri-t', name:"Ibn Shihab al-Zuhri", nameAr:"ابن شهاب الزهري", died:"742 CE / 124 AH", type:'tabii', color:'#b8860b', bio:"The most important Tabi'i hadith scholar — considered the first to formally write hadith at the caliph's request. Narrates from both Urwa and Abu Hurayra's students.", knownStudents:['malik-ibn-anas','sufyan-ibn-uyayna','al-awzai'], knownTeachers:['urwa','aisha','abu-hurayra'] },
  { id:'ata-ibn-abi', name:"Ata ibn Abi Rabah", nameAr:"عطاء بن أبي رباح", died:"732 CE / 114 AH", type:'tabii', color:'#509070', bio:"Mufti of Mecca for 70 years. Freed slave who became the most authoritative voice in Mecca on Islamic law.", knownStudents:['ibn-jurayj','sufyan-thawri-t'], knownTeachers:['ibn-abbas','jabir','aisha'] },

  // Classical Scholars / Imams
  { id:'malik-ibn-anas', name:"Imam Malik ibn Anas", nameAr:"مالك بن أنس", died:"795 CE / 179 AH", type:'imam', madhab:'ml', color:'#0a5c2e', bio:"Founder of the Maliki madhab. His Muwatta is the oldest surviving hadith collection. His chain via Nafi' from Ibn Umar is called 'The Golden Chain.'", knownStudents:['imam-shafii','ibn-al-qasim','abd-al-rahman'], knownTeachers:['nafi-mawla','zuhri-t','yahya-ibn-said'] },
  { id:'abu-hanifa', name:"Imam Abu Hanifa", nameAr:"أبو حنيفة", died:"767 CE / 150 AH", type:'imam', madhab:'hf', color:'#b8860b', bio:"Founder of the Hanafi madhab — the most widely followed in the world. Known for ra'y (considered legal opinion) and qiyas (analogical reasoning).", knownStudents:['abu-yusuf','muhammad-shaybani'], knownTeachers:['hasan-basri','ata-ibn-abi','hammad-ibn-sulayman'] },
  { id:'imam-shafii', name:"Imam al-Shafi'i", nameAr:"الإمام الشافعي", died:"820 CE / 204 AH", type:'imam', madhab:'sf', color:'#1a3462', bio:"Founder of Usul al-Fiqh (principles of Islamic jurisprudence) and the Shafi'i madhab. Studied under Imam Malik.", knownStudents:['imam-ahmad','ismail-muzani','rabi-ibn-sulayman'], knownTeachers:['malik-ibn-anas','sufyan-ibn-uyayna','waki'] },
  { id:'imam-ahmad', name:"Imam Ahmad ibn Hanbal", nameAr:"أحمد بن حنبل", died:"855 CE / 241 AH", type:'imam', madhab:'hb', color:'#7a1010', bio:"Founder of the Hanbali madhab. His Musnad contains 30,000 hadiths. Refused to accept the Mu'tazilite doctrine under torture.", knownStudents:['bukhari-teacher','ibn-abi-dunya'], knownTeachers:['imam-shafii','sufyan-ibn-uyayna','yahya-ibn-muin'] },
  { id:'bukhari', name:"Imam al-Bukhari", nameAr:"الإمام البخاري", died:"870 CE / 256 AH", type:'scholar', color:'#1a3462', bio:"Author of Sahih al-Bukhari — the most authenticated book after the Quran. He memorized 600,000 hadiths and accepted only 7,275 as fully authentic.", knownStudents:['muslim','tirmidhi'], knownTeachers:['imam-ahmad','ali-ibn-madini','yahya-ibn-muin'] },
  { id:'muslim', name:"Imam Muslim", nameAr:"الإمام مسلم", died:"875 CE / 261 AH", type:'scholar', color:'#2a5080', bio:"Author of Sahih Muslim — the second most authenticated hadith collection. Studied under Bukhari and collected 300,000 hadiths, accepting 12,000.", knownStudents:['tirmidhi'], knownTeachers:['bukhari','ahmad-ibn-yusuf','yahya-ibn-muin'] },
];

// Known valid chains: (sahabi_id, tabii_id, scholar_id) that are historically documented
export const VALID_CHAINS: [string, string, string][] = [
  ['abu-hurayra', 'zuhri-t', 'malik-ibn-anas'],
  ['ibn-umar', 'nafi-mawla', 'malik-ibn-anas'],
  ['aisha', 'urwa', 'zuhri-t'],
  ['ibn-abbas', 'mujahid', 'sufyan-thawri-t'],
  ['ibn-abbas', 'saeed-jubayr', 'sufyan-thawri-t'],
  ['anas-ibn-malik', 'hasan-basri', 'abu-hanifa'],
  ['jabir', 'ata-ibn-abi', 'imam-shafii'],
  ['ibn-umar', 'nafi-mawla', 'imam-ahmad'],
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 83 — MADHAB ROOT FINDER
   Fiqh topic → companion narration → which madhab and why scholars differed
   ═════════════════════════════════════════════════════════════════════ */

export interface FiqhRoot {
  id: string;
  topic: string;
  topicAr: string;
  category: 'prayer' | 'fasting' | 'zakat' | 'hajj' | 'family' | 'transactions' | 'purity' | 'food';
  question: string;
  companionNarrations: {
    companion: string;
    companionRank?: number;
    position: string;
    hadith: string;
    source: string;
  }[];
  madhabPositions: {
    madhab: 'Hanafi' | 'Maliki' | "Shafi'i" | 'Hanbali';
    color: string;
    ruling: string;
    rootCompanion: string;
    reasoning: string;
  }[];
  whyDifference: string;
  modernRelevance: string;
}

export const FIQH_ROOTS: FiqhRoot[] = [
  {
    id: 'combining-prayers',
    topic: 'Combining Prayers While Traveling',
    topicAr: 'الجمع بين الصلاتين في السفر',
    category: 'prayer',
    question: 'Can you combine Dhuhr with Asr, and Maghrib with Isha while traveling?',
    companionNarrations: [
      { companion: 'Ibn Abbas', companionRank: 19, position: 'Allowed both combining AND shortening', hadith: '"The Prophet ﷺ combined Dhuhr and Asr, and Maghrib and Isha at Medina — not from fear and not from rain." (Indicating it is allowed even without travel)', source: 'Muslim 705' },
      { companion: 'Anas ibn Malik', companionRank: 13, position: 'Allowed combining during travel', hadith: '"When the Prophet ﷺ hastened a journey, he would delay Dhuhr to the beginning of Asr time, then pray them together, then delay Maghrib until Isha became due and pray them together."', source: 'Bukhari 1112' },
      { companion: 'Muadh ibn Jabal', companionRank: undefined, position: 'Combines specifically during active travel march', hadith: '"The Prophet ﷺ combined prayers during the Battle of Tabuk — delaying or advancing based on the march."', source: 'Abu Dawud 1220' },
    ],
    madhabPositions: [
      { madhab: 'Hanafi', color: '#b8860b', ruling: "NOT allowed except at Arafat and Muzdalifah during Hajj. Regular combining is not permitted — one can only delay one prayer to the very beginning of the next.", rootCompanion: "Abdullah ibn Masud (narrated that he prayed separately)", reasoning: "Hanafis argue the Ibn Abbas narration refers to praying Dhuhr at the very end of its time and Asr at the very beginning — appearing combined but technically not. They prioritize narrations that show separate prayer." },
      { madhab: 'Maliki', color: '#0a5c2e', ruling: 'Allowed during travel for Dhuhr-Asr and Maghrib-Isha. Cannot combine at home.', rootCompanion: "Anas ibn Malik's Medina practice", reasoning: "Maliki madhab follows the Medinan practice. Anas ibn Malik lived in Medina and narrated the combining during journey. Malik's Muwatta preserves this as the Medinan consensus." },
      { madhab: "Shafi'i", color: '#1a3462', ruling: 'Allowed during travel AND during rain (if reaching the mosque is genuinely difficult). Both advancing and delaying allowed.', rootCompanion: "Ibn Abbas + Muadh ibn Jabal narrations", reasoning: "Al-Shafi'i accepted both the travel and rain narrations. He derived a broader principle: legitimate hardship permits combining. His students established specific conditions for rain combining." },
      { madhab: 'Hanbali', color: '#7a1010', ruling: 'Most permissive: allowed during travel, rain, illness, fear, and even legitimate hardship at home.', rootCompanion: "Ibn Abbas narration (combining in Medina without travel or rain)", reasoning: "Ibn Hanbal took Ibn Abbas's Medina narration at face value — that combining is allowed without strict conditions. He extended it to illness and genuine need, making his madhab the most flexible on this issue." },
    ],
    whyDifference: "The key tension is Ibn Abbas's narration of combining in Medina (seemingly without travel or rain). Hanafis interpret this technically (end of one prayer time/beginning of next). Shafi'is accept it but limit it. Hanbalis take it broadly. The difference is hermeneutic — how literally to read the narration.",
    modernRelevance: 'This ruling affects millions of travelers, especially airplane passengers. The Hanbali position is most commonly followed for air travel. Most contemporary scholars allow combining during travel regardless of madhab.',
  },
  {
    id: 'raising-hands',
    topic: 'Raising Hands During Prayer (Rafa\' al-Yadayn)',
    topicAr: 'رفع اليدين في الصلاة',
    category: 'prayer',
    question: 'Should you raise your hands before and after ruku (bowing), or only at the opening takbir?',
    companionNarrations: [
      { companion: 'Abdullah ibn Umar', companionRank: 30, position: 'Raise at opening, before ruku, after ruku, and when rising from 3rd rak\'ah', hadith: '"I saw the Messenger of Allah raise his hands at the beginning of prayer, before bowing, after bowing, and when rising from the second rak\'ah."', source: 'Bukhari 735' },
      { companion: 'Jabir ibn Abdullah', companionRank: 35, position: 'The Prophet ﷺ raised hands only at the opening', hadith: '(Narration suggesting simpler practice — used by some Hanafi scholars)', source: 'Disputed chain; used by some scholars' },
      { companion: 'Malik ibn al-Huwairith', companionRank: undefined, position: 'Raise at all four moments', hadith: '"He raised his hands at the opening, before bowing, and after bowing — until they were level with his ears."', source: 'Muslim 391' },
    ],
    madhabPositions: [
      { madhab: 'Hanafi', color: '#b8860b', ruling: 'Only raise hands at the opening takbir. All other raisings are considered dropped (mansukh) or not transmitted through reliable chains.', rootCompanion: 'Abdullah ibn Masud (narrated simpler form)', reasoning: "The Hanafi position relies on a narration from Ibn Masud showing no raising in ruku. They argue the later companions of Kufa — the center of Hanafi scholarship — followed this." },
      { madhab: 'Maliki', color: '#0a5c2e', ruling: "Only at the opening and when rising from the second rak'ah — not before/after ruku.", rootCompanion: "Ibn Umar — partial adoption of his narration", reasoning: "Malik adopted the Medinan practice as transmitted in his time. The Medinan consensus in his era did not include raising at ruku." },
      { madhab: "Shafi'i", color: '#1a3462', ruling: "Raise at opening, before ruku, after ruku, and when rising from second rak'ah.", rootCompanion: 'Ibn Umar — full adoption of his narration', reasoning: "Al-Shafi'i accepted Ibn Umar's full narration in Bukhari as the most authentic. His chain is: Shafi'i → Malik → Nafi' → Ibn Umar — one of the strongest chains in hadith." },
      { madhab: 'Hanbali', color: '#7a1010', ruling: "Raise at opening, before ruku, after ruku, and when rising — same as Shafi'i.", rootCompanion: 'Ibn Umar + Malik ibn al-Huwairith', reasoning: "Ahmad ibn Hanbal was a hadith scholar first. He accepted all the authentic narrations of raising hands and combined them into the most expansive practice." },
    ],
    whyDifference: "The Hanafi position comes from Kufa scholarship which favored Abdullah ibn Masud's practice. The other three madhabs follow the Medina-Mecca transmission via Ibn Umar. This is the classic Kufa vs. Medina tension in early hadith transmission.",
    modernRelevance: "This is one of the most visible differences between madhabs in congregational prayer. Both positions are fully authentic — the difference is which companion chain was prioritized.",
  },
  {
    id: 'touching-quran',
    topic: 'Touching the Quran Without Wudu',
    topicAr: 'مس المصحف بغير وضوء',
    category: 'purity',
    question: 'Is it permissible to touch the physical Quran without wudu (ritual purification)?',
    companionNarrations: [
      { companion: 'Umar ibn al-Khattab', companionRank: 2, position: 'Required purification before touching the Quran', hadith: '"Do not touch the Quran except in a state of purity." (Letter sent by the Prophet ﷺ to Amr ibn Hazm — narrated via Malik)', source: "Muwatta Malik 1/199" },
      { companion: 'Abdullah ibn Masud', companionRank: 22, position: 'Discouraged but not strictly prohibited', hadith: 'Ibn Masud was known to give broad latitude — but the narration is indirect', source: 'Indirect narration' },
      { companion: 'Ali ibn Abi Talib', companionRank: 4, position: 'Touched the Quran — specific practice unclear', hadith: '"Ali would not prevent anyone from reciting Quran in any state — only from touching the mushaf without purity."', source: 'Bayhaqi; chain debated' },
    ],
    madhabPositions: [
      { madhab: 'Hanafi', color: '#b8860b', ruling: 'Prohibited to touch the mushaf without wudu. Permitted to carry it in a case or touch it through a barrier. Recitation from memory without wudu is allowed.', rootCompanion: 'Umar ibn al-Khattab via letter to Amr ibn Hazm', reasoning: 'The Hanafi position is based on the Quranic verse 56:79 ("None shall touch it except the purified") taken to apply to the physical mushaf. Umar\'s practice confirmed this.' },
      { madhab: 'Maliki', color: '#0a5c2e', ruling: "Prohibited to touch the mushaf without wudu. One of the strictest positions — extends to copies of the Quran in any form.", rootCompanion: "Umar's letter — preserved in Malik's Muwatta", reasoning: "Malik's Muwatta explicitly preserved the letter from the Prophet ﷺ to Amr ibn Hazm. Malik took this as binding and applied it strictly as the Medinan consensus." },
      { madhab: "Shafi'i", color: '#1a3462', ruling: "Prohibited to touch the mushaf without wudu. Similar to Maliki — extends to Quranic inscriptions.", rootCompanion: "Umar's narration + Quran 56:79", reasoning: "Al-Shafi'i combined the Quranic verse with the prophetic letter and Medinan practice." },
      { madhab: 'Hanbali', color: '#7a1010', ruling: "Prohibited without wudu. Applies to the Arabic text specifically — touching translations may be permissible.", rootCompanion: "Umar's letter; broader application", reasoning: "Ibn Hanbal applied the prohibition to the Arabic Quranic text specifically. The distinction about translations was developed by later Hanbali scholars." },
    ],
    whyDifference: "All four madhabs agree on the prohibition — this is one of the few issues of near-consensus. The differences are in application: covers/cases, translations, phone screens showing Quranic text. The Quran 56:79 reference is debated — some scholars say 'purified' refers to angels, not ritual purity.",
    modernRelevance: 'The most common modern question: does the prohibition apply to Quran apps on phones? Most contemporary scholars say no — digital text is not a mushaf. But the debate continues among different schools.',
  },
];
