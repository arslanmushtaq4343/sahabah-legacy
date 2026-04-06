/* ─────────────────────────────────────────────────────────────────────────
   Insights Page — Enrichment Data Set 2  (Features 55, 59, 64)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 55 — PROPHETIC LETTERS ARCHIVE
   Diplomatic letters of the Prophet ﷺ — scribes, envoys, responses
   ═════════════════════════════════════════════════════════════════════ */
export interface PropheticLetter {
  id: number;
  recipient: string;
  recipientAr: string;
  recipientTitle: string;
  kingdom: string;
  year: string;
  yearAH: number;
  scribe: string;
  scribeRank?: number;
  envoy: string;
  envoyRank?: number;
  openingAr: string;
  openingEn: string;
  response: string;
  responseType: 'accepted' | 'rejected' | 'partial' | 'delayed' | 'killed-envoy';
  historicalOutcome: string;
  letterPreserved: string;
  color: string;
}

export const PROPHETIC_LETTERS: PropheticLetter[] = [
  {
    id: 1,
    recipient: 'Heraclius', recipientAr: 'هِرَقْل', recipientTitle: 'Emperor of Byzantium',
    kingdom: 'Byzantine Empire (Eastern Rome)',
    year: '628 CE', yearAH: 6,
    scribe: 'Abdullah ibn Arqam al-Zuhri', scribeRank: undefined,
    envoy: 'Dihya al-Kalbi', envoyRank: undefined,
    openingAr: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ، مِنْ مُحَمَّدٍ عَبْدِ اللَّهِ وَرَسُولِهِ إِلَى هِرَقْلَ عَظِيمِ الرُّومِ',
    openingEn: '"In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, servant of Allah and His Messenger, to Heraclius, the great one of the Romans."',
    response: "Heraclius convened scholars and questioned Abu Sufyan (who was in the Byzantine court at the time for trade). Abu Sufyan confirmed everything. Heraclius declared: 'If what you say is true, he will possess these two feet of mine beneath him.' He privately believed but feared losing his kingdom. He locked the letter in a golden case.",
    responseType: 'partial',
    historicalOutcome: 'Heraclius did not publicly accept Islam, fearing a rebellion from his Christian subjects. His empire fell to the Muslims at the Battle of Yarmouk (636 CE). The letter was reportedly preserved in Constantinople and is referenced in Western historical sources.',
    letterPreserved: 'A letter claimed to be the original was displayed in Istanbul in the 19th century. A copy exists in the Egyptian Museum. Bukhari preserved the text verbatim in the opening chapter of Sahih al-Bukhari.',
    color: '#1a3462',
  },
  {
    id: 2,
    recipient: 'Khosrow II (Parviz)', recipientAr: 'كِسْرَى', recipientTitle: 'Shahanshah of the Sassanid Persian Empire',
    kingdom: 'Persian Sassanid Empire',
    year: '628 CE', yearAH: 6,
    scribe: 'Abdullah ibn Hudhafa al-Sahmi', scribeRank: undefined,
    envoy: 'Abdullah ibn Hudhafa al-Sahmi',
    openingAr: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ، مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى كِسْرَى عَظِيمِ فَارِسَ',
    openingEn: '"From Muhammad, Messenger of Allah, to Khosrow, the great one of Persia."',
    response: "Khosrow II tore up the letter in a rage — refusing to read a letter from someone who placed his own name before the king's name. He then wrote to his governor in Yemen ordering him to 'bring me this man from the Hijaz or bring me his head.'",
    responseType: 'rejected',
    historicalOutcome: "The Prophet ﷺ said: 'He tore my letter — Allah will tear his kingdom.' Within days, Khosrow was murdered by his own son Sheroe. His kingdom was torn to pieces and Persia fell to the Muslims at al-Qadisiyyah (636 CE). The governor in Yemen, Badhan, accepted Islam when he heard the news.",
    letterPreserved: 'The text is preserved in hadith collections. No physical original is known to survive — Khosrow destroyed it.',
    color: '#8b3a08',
  },
  {
    id: 3,
    recipient: 'Al-Muqawqis', recipientAr: 'الْمُقَوْقِس', recipientTitle: 'Patriarch and Governor of Egypt (Coptic Christian)',
    kingdom: 'Roman Egypt (Coptic)',
    year: '628 CE', yearAH: 6,
    scribe: 'Ibn Arqam', scribeRank: undefined,
    envoy: 'Hatib ibn Abi Balta\'a', envoyRank: undefined,
    openingAr: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ مِنْ مُحَمَّدٍ عَبْدِ اللَّهِ وَرَسُولِهِ إِلَى الْمُقَوْقِسِ عَظِيمِ الْقِبْطِ',
    openingEn: '"From Muhammad, servant of Allah and His Messenger, to al-Muqawqis, the great one of the Copts."',
    response: "Al-Muqawqis read the letter carefully, placed it in an ivory box, sealed it with wax, and treated the envoy with great respect. He sent back gifts: two Coptic women (Maria and Sirin, who later became significant in Islamic history), a white mule (Duldul), and a donkey (Ya'fur). He wrote a diplomatic but non-committal reply.",
    responseType: 'partial',
    historicalOutcome: 'Maria al-Qibtiyya became the mother of Ibrahim, the Prophet\'s ﷺ son. The mule Duldul became the most famous mule in Islamic history. Egypt was conquered peacefully by Amr ibn al-As in 641 CE — many Copts converted. The Coptic Church maintains good relations with Islam historically.',
    letterPreserved: 'The letter was reportedly found in 1850 CE by a French scholar in a monastery in southern Egypt — the same ivory box described in the hadith. It is now in the Musée Guimet, Paris.',
    color: '#0a5c2e',
  },
  {
    id: 4,
    recipient: 'The Negus (Ashama ibn Abjar)', recipientAr: 'النَّجَاشِيّ', recipientTitle: 'King (Negus) of Abyssinia',
    kingdom: 'Kingdom of Aksum (Ethiopia)',
    year: '628 CE', yearAH: 6,
    scribe: 'Amr ibn Umayya al-Damri', scribeRank: undefined,
    envoy: 'Amr ibn Umayya al-Damri',
    openingAr: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى النَّجَاشِيِّ الْأَصْحَمِ مَلِكِ الْحَبَشَةِ',
    openingEn: '"From Muhammad, Messenger of Allah, to the Negus, Ashama, King of Abyssinia."',
    response: "The Negus had already been exposed to the Muslim refugees in Abyssinia (615 CE) and secretly believed. When this formal letter arrived, he took it, placed it on his eye, descended from his throne, and accepted Islam formally. He said: 'If I were not ruling a people who need me, I would come to you on foot.'",
    responseType: 'accepted',
    historicalOutcome: 'The Negus Ashama became Muslim. When he died, the Prophet ﷺ prayed the funeral prayer in absentia (salat al-ghayb) for him in Medina — the only time he did this for a foreign ruler. This became a major fiqh precedent. He also arranged the marriage of Umm Habiba to the Prophet ﷺ.',
    letterPreserved: 'No physical letter preserved. The text is in Islamic historical sources and the story is in Bukhari/Muslim.',
    color: '#7a1010',
  },
  {
    id: 5,
    recipient: 'Al-Harith ibn Abi Shamir al-Ghassani', recipientAr: 'الْحَارِثُ بْنُ أَبِي شِمْرٍ', recipientTitle: 'King of the Ghassanid Arab Kingdom (Byzantine Vassal)',
    kingdom: 'Ghassanid Kingdom (Syria)',
    year: '628 CE', yearAH: 6,
    scribe: 'Unknown', scribeRank: undefined,
    envoy: 'Shuja ibn Wahb al-Asadi',
    openingAr: 'مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى الْحَارِثِ بْنِ أَبِي شِمْرٍ',
    openingEn: '"From Muhammad, Messenger of Allah, to al-Harith ibn Abi Shamir."',
    response: "Al-Harith was furious. He said: 'Who says this man will take my kingdom from me? I will march against him!' He threw the letter down. He assembled an army — but Heraclius recalled him for the Byzantine-Persian war. He never reached Medina.",
    responseType: 'rejected',
    historicalOutcome: 'His kingdom fell to the Muslim armies in 636 CE. The Ghassanid dynasty ended. His lands became part of Islamic Syria under Umar ibn al-Khattab.',
    letterPreserved: 'Text preserved in Waqidi and Ibn Sa\'d. Physical letter not extant.',
    color: '#509070',
  },
  {
    id: 6,
    recipient: 'Hawdha ibn Ali', recipientAr: 'هَوْذَةُ بْنُ عَلِيٍّ', recipientTitle: 'King of Yamamah (Central Arabia)',
    kingdom: 'Yamamah Kingdom',
    year: '628 CE', yearAH: 6,
    scribe: 'Unknown',
    envoy: 'Salit ibn Amr al-Amiri',
    openingAr: 'مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى هَوْذَةَ بْنِ عَلِيٍّ',
    openingEn: '"From Muhammad, Messenger of Allah, to Hawdha ibn Ali."',
    response: "Hawdha accepted some conditions but replied: 'If you make me your successor, I will follow you.' The Prophet ﷺ refused — saying the matter belonged to Allah. Hawdha died shortly after — Jibreel revealed: 'Hawdha has died.'",
    responseType: 'rejected',
    historicalOutcome: 'His death left a power vacuum that Musaylima the False Prophet tried to fill. Yamamah was the location of the major battle of Yamama (11 AH) where 700 Quran memorizers died.',
    letterPreserved: 'Text preserved in Ibn Sa\'d Tabaqat.',
    color: '#b8860b',
  },
  {
    id: 7,
    recipient: 'Jayfar and Abd (sons of al-Julanda)', recipientAr: 'جَيْفَرٌ وَعَبْدٌ', recipientTitle: 'Kings of Oman',
    kingdom: 'Oman (Southeast Arabia)',
    year: '630 CE', yearAH: 8,
    scribe: 'Zayd ibn Thabit', scribeRank: 18,
    envoy: 'Amr ibn al-As', envoyRank: undefined,
    openingAr: 'مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى جَيْفَرٍ وَعَبْدٍ ابْنَيِ الْجُلَنْدَى',
    openingEn: '"From Muhammad, Messenger of Allah, to Jayfar and Abd, sons of al-Julanda."',
    response: "Both kings accepted Islam willingly without conflict. Amr ibn al-As spent time with them and they embraced Islam fully — becoming the first foreign kings to accept voluntarily by letter.",
    responseType: 'accepted',
    historicalOutcome: 'Oman became Muslim peacefully and remained so. One of the most successful diplomatic outcomes — still largely Muslim today.',
    letterPreserved: 'Text preserved in Waqidi and classical sources.',
    color: '#2a5080',
  },
  {
    id: 8,
    recipient: 'Badhan ibn Sasan', recipientAr: 'بَاذَانُ بْنُ سَاسَان', recipientTitle: 'Persian Governor of Yemen',
    kingdom: 'Persian-controlled Yemen',
    year: '628 CE', yearAH: 6,
    scribe: 'Unknown',
    envoy: 'Direct contact — via messengers sent by Khosrow II',
    openingAr: 'مِنْ مُحَمَّدٍ رَسُولِ اللَّهِ إِلَى بَاذَانَ',
    openingEn: '"From Muhammad, Messenger of Allah, to Badhan."',
    response: "Badhan had been ordered by Khosrow to arrest the Prophet ﷺ. When Khosrow was murdered by his own son (exactly as the Prophet ﷺ predicted), Badhan accepted Islam. He became the first governor appointed by the Prophet ﷺ — governor of Yemen.",
    responseType: 'accepted',
    historicalOutcome: 'Yemen came under Islamic governance peacefully via Badhan. He governed it until his death and his people followed. Yemen is Muslim to this day — one of the earliest territories.',
    letterPreserved: 'Account in Bukhari 2941 and Ibn Sa\'d Tabaqat.',
    color: '#0a3d2e',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 59 — COMPANION HAJJ RECORDS
   ═════════════════════════════════════════════════════════════════════ */
export interface HajjRecord {
  companion: string;
  companionRank?: number;
  role: 'leader' | 'teacher' | 'narrator' | 'emotional' | 'participant';
  year: string;
  yearAH: number;
  event: string;
  detail: string;
  uniqueFact: string;
  source: string;
  color: string;
}

export const HAJJ_RECORDS: HajjRecord[] = [
  { companion: 'Abu Bakr al-Siddiq', companionRank: 1, role: 'leader', year: '9 AH / 631 CE', yearAH: 9, event: 'First Official Islamic Hajj — led by Abu Bakr', detail: "The Prophet ﷺ appointed Abu Bakr to lead the first official Islamic Hajj in 9 AH — the first Hajj performed under full Muslim governance. Abu Bakr led 300 companions from Medina. Ali ibn Abi Talib was sent afterward to announce the new regulations of Surah al-Tawbah.", uniqueFact: "This was the first Hajj where pagan participants were officially informed they could no longer perform it — giving them one final year (10 AH). The announcement of Bara'ah (Surah 9) was made publicly.", source: 'Bukhari 369; Muslim 1347; Ibn Hisham Seerah 4/188', color: '#b8860b' },
  { companion: 'The Prophet Muhammad ﷺ', companionRank: undefined, role: 'leader', year: '10 AH / 632 CE', yearAH: 10, event: 'Hajjat al-Wada — The Farewell Pilgrimage', detail: "The only Hajj the Prophet ﷺ performed as a Muslim prophet. 120,000+ companions accompanied him. He delivered the Farewell Sermon on the plain of Arafat — one of the most important speeches in human history. He said: 'I have left among you two things; you will not go astray as long as you hold to them: the Book of Allah and my Sunnah.'", uniqueFact: "Jibreel descended with Quran 5:3 on that day: 'Today I have perfected for you your religion.' The Prophet ﷺ wept when it was revealed — knowing it was a farewell.", source: 'Bukhari 4406; Muslim 1218', color: '#d4a820' },
  { companion: 'Ali ibn Abi Talib', companionRank: 4, role: 'participant', year: '9 AH + 10 AH', yearAH: 9, event: 'Announcement of Bara\'ah (9 AH) + Farewell Hajj (10 AH)', detail: "In 9 AH, Ali was sent from Medina by the Prophet ﷺ to overtake Abu Bakr's caravan and announce the regulations of Surah al-Tawbah at Hajj. The Prophet ﷺ said: 'Only a man from me or from my family may convey this.' Ali recited Surah al-Tawbah to 70,000+ pilgrims. In 10 AH, he was the Prophet's ﷺ personal companion throughout.", uniqueFact: 'Ali was specifically chosen for the proclamation — establishing the principle that certain sacred duties pass only through the family.', source: 'Tirmidhi 3090; Ahmad; Ibn Hisham Seerah', color: '#0a3d2e' },
  { companion: 'Aisha bint Abi Bakr', companionRank: 5, role: 'narrator', year: '10 AH', yearAH: 10, event: "Farewell Hajj — the definitive narrator of the Prophet's ﷺ Hajj rituals", detail: "Aisha accompanied the Prophet ﷺ on the Farewell Hajj. She was performing ʻumra when she began menstruation. The Prophet ﷺ instructed her to combine ʻumra and Hajj — this ruling became the basis for the entire fiqh of the Qiran type of Hajj. After the Hajj, she performed a separate ʻumra from al-Tanʻim — because she asked the Prophet ﷺ, and he arranged it specially for her.", uniqueFact: "The Prophet ﷺ rode beside her camel at the Farewell Hajj and said: 'Your reward for this ʻumra will be proportional to your sacrifice.' Her narration of the Hajj procedures is the single most relied-upon account.", source: 'Bukhari 294; Muslim 1211', color: '#7a3060' },
  { companion: 'Umar ibn al-Khattab', companionRank: 2, role: 'emotional', year: '10 AH + every year of his caliphate', yearAH: 10, event: 'Farewell Hajj + annual Hajj as Caliph', detail: "Umar performed Hajj with the Prophet ﷺ. After becoming Caliph, he performed Hajj every single year of his 10-year caliphate — never missing a single one. He established the Hajj management system and set up the annual caravan infrastructure. He personally patrolled the Hajj routes on foot to ensure no one was mistreated.", uniqueFact: "During one of his caliphal Hajjs, Umar saw the Black Stone and said: 'By Allah, I know you are a stone that neither harms nor benefits. And were it not that I saw the Prophet ﷺ kiss you, I would not kiss you.' This statement became a canonical Hadith.", source: 'Bukhari 1597; Muslim 1270', color: '#8b3a08' },
  { companion: 'Abu Hurayra', companionRank: 17, role: 'narrator', year: 'Multiple (9 AH onwards)', yearAH: 9, event: 'Most detailed narrator of Hajj rituals', detail: "Abu Hurayra narrated more hadiths about Hajj than any other companion. He also served as the one who called out to the pilgrims on Umar's behalf at Hajj, announcing key rulings. He performed Hajj dozens of times and taught the entire ritual step by step.", uniqueFact: "Abu Hurayra's narrations cover every detail of Hajj — from the first takbir of ihram to the farewell tawaf. Islamic Hajj guidance textbooks today draw heavily from his narrations.", source: 'Bukhari 1543-1600 (numerous); Muslim 1218-1290', color: '#b8860b' },
  { companion: 'Ibn Abbas', companionRank: 19, role: 'teacher', year: '10 AH + lifelong', yearAH: 10, event: 'Farewell Hajj as a child + lifetime Hajj teacher', detail: "Ibn Abbas was 13 at the Farewell Hajj. The Prophet ﷺ prayed for him specifically. He became the greatest scholar of Hajj, sitting near the Ka\'ba for decades teaching pilgrims. He wrote the first dedicated commentary on Hajj rituals.", uniqueFact: "Ibn Abbas used to say: 'The person who knows the meaning of Hajj is someone who has circumambulated this house with an understanding heart — the outer walk and the inner meaning are one.' He was the first to articulate the inner spiritual dimensions of Hajj.", source: 'Bukhari 143; Tirmidhi 3235', color: '#2a5080' },
  { companion: 'Salman al-Farisi', companionRank: 29, role: 'emotional', year: 'Post-Hijra', yearAH: 10, event: 'First Hajj — after a lifetime of seeking truth', detail: "Salman spent decades traveling from Persia through Syria, Iraq, and Arabia seeking a prophet. After finally finding the Prophet ﷺ in Medina, his first Hajj was an overwhelmingly emotional experience. He wept throughout the tawaf — saying: 'I searched 40 years for this house.'", uniqueFact: "His Hajj represents the spiritual climax of one of the greatest personal journeys in Islamic history — a Persian slave who walked from Ctesiphon to the Ka\'ba in search of Allah.", source: 'Tabaqat Ibn Sa\'d 4/81; Ibn Hisham Seerah', color: '#509070' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 64 — COMPANION QUOTES ON DEATH & AKHIRA
   Their own words — not hadiths of the Prophet ﷺ
   ═════════════════════════════════════════════════════════════════════ */
export interface AkhiraQuote {
  companion: string;
  companionRank?: number;
  quoteAr?: string;
  quoteEn: string;
  context: string;
  occasion: 'deathbed' | 'reflection' | 'prayer' | 'sermon' | 'conversation';
  theme: 'death' | 'grave' | 'judgment' | 'paradise' | 'hell' | 'soul' | 'preparation';
  source: string;
  color: string;
}

export const AKHIRA_QUOTES: AkhiraQuote[] = [
  { companion: 'Abu Bakr al-Siddiq', companionRank: 1, quoteAr: 'يَا لَيْتَنِي كُنْتُ تِبْنَةً فِي بَعْرَةٍ فَأَكَلَتْنِي الدَّوَابُّ', quoteEn: "'I wish I were a straw in the dung of an animal — so that animals would eat me and I would not have to face the reckoning.'", context: "Said while reflecting on the terror of the Day of Judgment — even though the Prophet ﷺ had promised him Paradise", occasion: 'reflection', theme: 'judgment', source: "Ibn Abi Dunya, Sifat al-Janna; Tabaqat Ibn Sa'd", color: '#b8860b' },
  { companion: 'Abu Bakr al-Siddiq', companionRank: 1, quoteAr: 'اللَّهُمَّ اجْعَلْنِي مِمَّنْ إِذَا أَحْسَنَ اسْتَبْشَرَ وَإِذَا أَسَاءَ اسْتَغْفَرَ', quoteEn: "'O Allah — make me of those who rejoice when they do good, and seek forgiveness when they do wrong.'", context: "His regular personal du'a — said to have been his most repeated prayer", occasion: 'prayer', theme: 'preparation', source: 'Tabaqat Ibn Sa\'d 3/188', color: '#b8860b' },
  { companion: 'Umar ibn al-Khattab', companionRank: 2, quoteAr: 'لَوْ نَادَى مُنَادٍ مِنَ السَّمَاءِ: يَا أَيُّهَا النَّاسُ! إِنَّكُمْ دَاخِلُونَ الْجَنَّةَ كُلُّكُمْ إِلَّا رَجُلًا وَاحِدًا لَخِفْتُ أَنْ أَكُونَ هُوَ', quoteEn: "'If a caller from the sky were to announce: O people — all of you will enter Paradise except one man — I would fear that I am that one man.'", context: "Said to companions when they were discussing those who would enter Paradise — Umar expressed the peak of reverential fear (khashyah)", occasion: 'conversation', theme: 'judgment', source: 'Hilyat al-Awliya 1/52; Ibn Abi Dunya', color: '#8b3a08' },
  { companion: 'Umar ibn al-Khattab', companionRank: 2, quoteEn: "'To be brought to account for a single moment of heedlessness is worse than the whole dunya.'", context: "Said during a khutbah on accountability before Allah", occasion: 'sermon', theme: 'judgment', source: 'Tabaqat Ibn Sa\'d 3/264', color: '#8b3a08' },
  { companion: 'Uthman ibn Affan', companionRank: 3, quoteAr: 'عَجِبْتُ لِمَنْ يُؤْمِنُ بِالنَّارِ كَيْفَ يَضْحَكُ', quoteEn: "'I am amazed at the one who believes in the Fire — yet still laughs.'", context: "Said to companions in a gathering — known as one of his most famous statements on awareness of the akhira", occasion: 'reflection', theme: 'hell', source: 'Ibn Abi Dunya; Shu\'ab al-Iman, Bayhaqi', color: '#1a3462' },
  { companion: 'Uthman ibn Affan', companionRank: 3, quoteAr: 'لَوْ كُنْتُ بَيْنَ الْجَنَّةِ وَالنَّارِ وَلَمْ أَدْرِ إِلَى أَيِّهِمَا يُؤْمَرُ بِي لَاخْتَرْتُ أَنْ أَكُونَ رَمَادًا قَبْلَ أَنْ أَعْلَمَ', quoteEn: "'If I were standing between Paradise and Hell, not knowing which I would be sent to — I would choose to be ashes before finding out.'", context: "Expressing his fear of Allah's judgment despite his status as Caliph", occasion: 'reflection', theme: 'judgment', source: 'Hilyat al-Awliya; Tabaqat Ibn Sa\'d', color: '#1a3462' },
  { companion: 'Ali ibn Abi Talib', companionRank: 4, quoteAr: 'ارْتَحَلَتِ الدُّنْيَا مُدْبِرَةً وَارْتَحَلَتِ الْآخِرَةُ مُقْبِلَةً وَلِكُلِّ وَاحِدَةٍ مِنْهُمَا بَنُونَ', quoteEn: "'The dunya has departed, turning away — and the akhira has arrived, advancing. Each has its children. Be children of the akhira — not children of the dunya. For today there is action and no reckoning, but tomorrow there will be reckoning and no action.'", context: "Sermon delivered to the companions — one of his most famous statements from Nahj al-Balagha", occasion: 'sermon', theme: 'preparation', source: 'Nahj al-Balagha, Sermon 42; Bukhari-related narrations', color: '#0a3d2e' },
  { companion: 'Ali ibn Abi Talib', companionRank: 4, quoteEn: "'The grave is the first station of the akhira — whoever passes through it with ease, what comes after is easier. Whoever does not pass through it with ease, what comes after is harder.'", context: "Said to a companion who was weeping at a grave — teaching about the reality of death", occasion: 'conversation', theme: 'grave', source: 'Tirmidhi 2309; Ibn Majah', color: '#0a3d2e' },
  { companion: 'Aisha bint Abi Bakr', companionRank: 5, quoteAr: 'وَدِدْتُ أَنِّي كُنْتُ نَسْيًا مَنْسِيًّا', quoteEn: "'I wish I had been a thing forgotten — not remembered at all. Then I would not fear the reckoning.'", context: "Said after the Prophet's ﷺ death while reflecting on her own accountability for her position", occasion: 'reflection', theme: 'judgment', source: 'Ibn Sa\'d Tabaqat 8/66; Hakim', color: '#7a3060' },
  { companion: 'Aisha bint Abi Bakr', companionRank: 5, quoteEn: "'Whoever loves to meet Allah — Allah loves to meet him. And I love to meet my Lord. My father died in my lap, my husband died in my lap — and I shall die in the lap of the mercy of Allah.'", context: "Said near the end of her life — expressing her longing for death", occasion: 'deathbed', theme: 'soul', source: 'Hilyat al-Awliya 2/47; Ibn Sa\'d', color: '#7a3060' },
  { companion: 'Abu Dharr al-Ghifari', companionRank: 15, quoteAr: 'يَا عَجَبًا كَيْفَ يَضْحَكُ مَنْ يَعْلَمُ أَنَّهُ مَيِّتٌ', quoteEn: "'How astonishing — that a man who knows he is going to die can still laugh!'", context: "Said while walking in the marketplace — observing people's heedlessness", occasion: 'reflection', theme: 'death', source: 'Hilyat al-Awliya 1/161; Ibn Abi Dunya', color: '#509070' },
  { companion: 'Abu Hurayra', companionRank: 17, quoteEn: "'The grave is either a garden from the gardens of Paradise — or a pit from the pits of the Fire. Which one will yours be?'", context: "Teaching students about the reality of the grave", occasion: 'sermon', theme: 'grave', source: 'Tabaqat Ibn Sa\'d 4/328', color: '#b8860b' },
  { companion: 'Ibn Abbas', companionRank: 19, quoteAr: 'نِعْمَةٌ مَجْهُولَةٌ الصِّحَّةُ وَالْفَرَاغُ', quoteEn: "'Two blessings that many people are careless about: health and free time.' (Said in context of using them before death takes both)", context: "Teaching students in Mecca about preparing for death while alive", occasion: 'sermon', theme: 'preparation', source: 'Bukhari 6412 (Prophet\'s words quoted by Ibn Abbas)', color: '#2a5080' },
  { companion: 'Abdullah ibn Masud', companionRank: 22, quoteAr: 'ابْنَ آدَمَ أَنْتَ أَيَّامٌ كُلَّمَا مَضَى يَوْمٌ مَضَى بَعْضُكَ', quoteEn: "'O son of Adam — you are a collection of days. Every day that passes, a part of you passes with it.'", context: "Teaching companions about the reality of time and nearness of death", occasion: 'reflection', theme: 'death', source: 'Shu\'ab al-Iman, Bayhaqi; Ibn Abi Dunya', color: '#b8860b' },
  { companion: 'Salman al-Farisi', companionRank: 29, quoteEn: "'Three things make me laugh and three things make me weep. I laugh at the one who pursues the dunya while death pursues him. I laugh at the one who is heedless while no one is heedless of him. I laugh at the one who laughs at full volume — not knowing whether Allah is pleased or angry with him.'", context: "Famous statement narrated widely in classical works on zuhd and wara'", occasion: 'reflection', theme: 'death', source: 'Hilyat al-Awliya 1/204; Ibn Abi Dunya', color: '#0a3d2e' },
  { companion: 'Muadh ibn Jabal', companionRank: undefined, quoteAr: 'ابْكِ عَلَى نَفْسِكَ إِنْ كُنْتَ لَا تَبْكِي وَيْلٌ لِمَنْ يَضْحَكُ وَلَا يَبْكِي', quoteEn: "'Weep for yourself — and if you cannot weep, then pretend to weep. Woe to the one who laughs and does not weep.'", context: "Deathbed statement to those gathered around him as he was dying of the Amwas plague", occasion: 'deathbed', theme: 'preparation', source: 'Ibn Sa\'d Tabaqat 3/583; Tabari', color: '#b8860b' },
  { companion: 'Abu Ubayda ibn al-Jarrah', companionRank: 9, quoteEn: "'O people — I am bequeathing to you four: Do not accumulate what you cannot carry. Do not build what you will not inhabit long. Do not compete in what you must soon leave. Fear Allah and know that what is ahead is greater than what you have left behind.'", context: "Final sermon before dying of the plague of Amwas in Palestine (18 AH)", occasion: 'deathbed', theme: 'preparation', source: 'Ibn Sa\'d Tabaqat 3/410; Tabari', color: '#2a5080' },
  { companion: 'Khalid ibn al-Walid', companionRank: 12, quoteEn: "'I have fought in a hundred battles and there is no spot on my body the size of a palm except that it has a wound from sword or arrow. Yet here I am dying in my bed like an old camel. May the eyes of cowards never find rest!'", context: "Said on his deathbed — lamenting that he died in bed rather than in battle", occasion: 'deathbed', theme: 'soul', source: 'Ibn Asakir Tarikh Dimashq 16/241; Ibn Kathir', color: '#8b1a38' },
  { companion: 'Hamza ibn Abd al-Muttalib', companionRank: 7, quoteEn: "'What is between us and Paradise is that these men kill us.'", context: "Said to the Prophet ﷺ while pointing at the advancing Qurayshi army at the Battle of Uhud — moments before his martyrdom", occasion: 'conversation', theme: 'paradise', source: 'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat', color: '#8b1a38' },
  { companion: 'Ammar ibn Yasir', companionRank: 27, quoteAr: 'مَرْحَبًا بِالْمَوْتِ زَائِرًا حَبِيبًا جَاءَ بَعْدَ طُولِ غِيَابٍ', quoteEn: "'Welcome, O Death — a beloved visitor who comes after a long absence.'", context: "Said when a companion asked him if he feared death — before the Battle of Siffin where he was martyred at 90+", occasion: 'conversation', theme: 'death', source: 'Hilyat al-Awliya 1/143', color: '#8b3a08' },
];
