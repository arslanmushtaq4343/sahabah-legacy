/* ─────────────────────────────────────────────────────────────────────────
   Companions Page — Enrichment Data Set 3  (Features 80, 81, 84, 86)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 80 — CUSTOM COMPANION CARD GENERATOR
   Name lookup + printable biography card
   ═════════════════════════════════════════════════════════════════════ */

export interface NameEntry {
  name: string;        // Arabic name in English
  nameAr: string;      // Arabic script
  meaning: string;     // Meaning in English
  meaningContext: string; // Cultural/historical context
  companionRanks: number[]; // Companions who share this name
  gender: 'male' | 'female' | 'both';
  popularity: 'common' | 'rare' | 'very-rare';
  nameOrigin: string;  // Arabic, Persian, etc.
}

export const NAME_DATABASE: NameEntry[] = [
  { name:'Muhammad', nameAr:'محمد', meaning:'The Praised One', meaningContext:'Derived from hamd (praise). The Prophet ﷺ said: "The most beloved names to Allah are Abdullah and Abd al-Rahman, and the most honorable are Harith and Hammam."', companionRanks:[], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Ahmad', nameAr:'أحمد', meaning:'The Most Praiseworthy', meaningContext:'One of the Prophet\'s ﷺ names mentioned in the Quran (61:6) — "His name will be Ahmad." Closely related to Muhammad.', companionRanks:[], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Abdullah', nameAr:'عبد الله', meaning:'Servant of Allah', meaningContext:'The Prophet ﷺ said Abdullah and Abd al-Rahman are the most beloved names to Allah. The Prophet\'s ﷺ own father was named Abdullah.', companionRanks:[30], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Umar', nameAr:'عمر', meaning:'Life / Flourishing', meaningContext:'Derived from umr (lifespan). Associated with Umar ibn al-Khattab — the second Caliph and one of the most transformative leaders in history.', companionRanks:[2], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Ali', nameAr:'علي', meaning:'Elevated / Noble', meaningContext:'Means one who is high, elevated. Associated with Ali ibn Abi Talib — the Prophet\'s ﷺ cousin, son-in-law, and fourth Caliph, known for wisdom and bravery.', companionRanks:[4], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Ibrahim', nameAr:'إبراهيم', meaning:'Father of Nations', meaningContext:'The Prophet Abraham ﷺ — friend of Allah (Khalilullah). The Prophet ﷺ named his son Ibrahim, who died in infancy. The Quran mentions Ibrahim more than any other prophet.', companionRanks:[], gender:'male', popularity:'common', nameOrigin:'Semitic/Arabic' },
  { name:'Aisha', nameAr:'عائشة', meaning:'She Who Lives / The Living One', meaningContext:'Derived from aysh (living). Associated with Aisha bint Abi Bakr — the Prophet\'s ﷺ wife, the most learned woman in Islamic history, narrator of 2,210 hadiths.', companionRanks:[5], gender:'female', popularity:'common', nameOrigin:'Arabic' },
  { name:'Fatima', nameAr:'فاطمة', meaning:'One Who Weans / Abstains', meaningContext:'One who is protected from fire. Fatima al-Zahra was the Prophet\'s ﷺ daughter — he said: "Fatima is a part of me. Whoever angers her angers me."', companionRanks:[], gender:'female', popularity:'common', nameOrigin:'Arabic' },
  { name:'Hasan', nameAr:'حسن', meaning:'Good / Beautiful / Handsome', meaningContext:'The Prophet ﷺ named his grandson Hasan. He would say: "Hasan and Husayn are the masters of the youth of Paradise."', companionRanks:[], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Hussain', nameAr:'حسين', meaning:'The Little Good One / The Beautiful', meaningContext:'Diminutive of Hasan — a term of endearment. The Prophet ﷺ said: "Husayn is from me and I am from Husayn." He was the Prophet\'s ﷺ most beloved grandson.', companionRanks:[], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Maryam', nameAr:'مريم', meaning:'Sea of Bitterness / Beloved / Wished-For Child', meaningContext:'Mary, mother of Prophet Isa ﷺ. The Quran named an entire surah after her. She is the only woman named by name in the Quran (34 times).', companionRanks:[], gender:'female', popularity:'common', nameOrigin:'Hebrew/Arabic' },
  { name:'Khadijah', nameAr:'خديجة', meaning:'Premature Child / Early Born', meaningContext:'Associated with Khadijah bint Khuwaylid — the Prophet\'s ﷺ first wife and greatest supporter. The Prophet ﷺ said: "She believed in me when no one else did."', companionRanks:[], gender:'female', popularity:'common', nameOrigin:'Arabic' },
  { name:'Zaynab', nameAr:'زينب', meaning:'Fragrant Flower / Father\'s Ornament', meaningContext:'Named after a fragrant plant. Both the Prophet\'s ﷺ daughter and his wife shared this name. A name of dignity and noble character.', companionRanks:[], gender:'female', popularity:'common', nameOrigin:'Arabic' },
  { name:'Sumayyah', nameAr:'سمية', meaning:'High / Elevated / The First', meaningContext:'Sumayyah bint Khabbat — the first martyr of Islam. She was killed by Abu Jahl for refusing to abandon her faith. Her name carries the honor of the first sacrifice.', companionRanks:[], gender:'female', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Bilal', nameAr:'بلال', meaning:'Moist / Refreshing / He Who Quenches', meaningContext:'Derived from ball (moisture, freshness). Bilal ibn Rabah — the first muezzin of Islam, the man whose faith withstood maximum torture. The Prophet ﷺ heard his footsteps in Paradise.', companionRanks:[10], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Salman', nameAr:'سلمان', meaning:'Safe / Peaceful / Sound', meaningContext:'Derived from salam (peace). Salman al-Farisi — the great seeker. The Prophet ﷺ called him "of us, of the Ahl al-Bayt." His story is one of the greatest conversion journeys in history.', companionRanks:[29], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Hamza', nameAr:'حمزة', meaning:'Lion / The Strong One', meaningContext:'Associated with Hamza ibn Abd al-Muttalib — the Prophet\'s ﷺ uncle, called "the Lion of Allah and of His Messenger." He was the most powerful warrior of early Islam.', companionRanks:[7], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Anas', nameAr:'أنس', meaning:'Friendliness / Affection / Intimacy', meaningContext:'Derived from uns (intimacy, companionship). Anas ibn Malik served the Prophet ﷺ for 10 years from age 10 and narrated 2,286 hadiths — the most intimate portrait of the Prophet\'s ﷺ daily life.', companionRanks:[13], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Khalid', nameAr:'خالد', meaning:'The Eternal / The Immortal', meaningContext:'Khalid ibn al-Walid — "the Sword of Allah." He never lost a single battle in over 100 engagements. His name was given to him by the Prophet ﷺ as a title.', companionRanks:[12], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Ammar', nameAr:'عمار', meaning:'Builder / One Who Builds', meaningContext:'Ammar ibn Yasir — whose entire family accepted Islam together and were the first family to suffer martyrdom for it. The Prophet ﷺ said of him: "The unjust faction will kill him."', companionRanks:[27], gender:'male', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Safiyyah', nameAr:'صفية', meaning:'The Pure / The Clear', meaningContext:'Safiyyah bint Abd al-Muttalib — the Prophet\'s ﷺ aunt and a fierce defender of the faith. Also Safiyyah bint Huyayy, his wife. A name of spiritual purity.', companionRanks:[], gender:'female', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Asma', nameAr:'أسماء', meaning:'Names / Virtues / High Standards', meaningContext:'Asma bint Abi Bakr — who carried food to the Prophet ﷺ and her father in Cave Thawr while pregnant. She was given the title Dhaat al-Nitaqayn (She of Two Belts) by the Prophet ﷺ himself.', companionRanks:[], gender:'female', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Talha', nameAr:'طلحة', meaning:'Tree of Paradise / Banana Tree', meaningContext:'Talha ibn Ubaydullah — one of the Ten Promised Paradise. He received 24 wounds in a single day at Uhud shielding the Prophet ﷺ with his body. His hand was permanently crippled.', companionRanks:[], gender:'male', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Zubayr', nameAr:'الزبير', meaning:'Brave / Strong', meaningContext:'Al-Zubayr ibn al-Awwam — one of the Ten Promised Paradise, the first person to draw a sword in Islam\'s defense. Nephew of the Prophet ﷺ and son-in-law of Abu Bakr.', companionRanks:[], gender:'male', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Sad', nameAr:'سعد', meaning:'Happiness / Good Fortune', meaningContext:'Sa\'d ibn Abi Waqqas — the maternal uncle of the Prophet ﷺ, one of the first 6 Muslims, commander at Qadisiyyah who conquered Persia. The Prophet ﷺ said: "This is my uncle — let any man show me his uncle."', companionRanks:[8], gender:'male', popularity:'common', nameOrigin:'Arabic' },
  { name:'Ruqayyah', nameAr:'رقية', meaning:'Ascent / Rising', meaningContext:"The Prophet's ﷺ daughter, wife of Uthman ibn Affan. Her migration to Abyssinia with Uthman was called by the Prophet ﷺ as the second migration after that of Ibrahim and Lut ﷺ.", companionRanks:[], gender:'female', popularity:'rare', nameOrigin:'Arabic' },
  { name:'Hafsa', nameAr:'حفصة', meaning:'Lioness / Young Lioness', meaningContext:"Hafsa bint Umar — daughter of Umar, wife of the Prophet ﷺ, known for her intelligence and strength of character. She was the custodian of the original Quran manuscript during Umar's caliphate.", companionRanks:[], gender:'female', popularity:'rare', nameOrigin:'Arabic' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 81 — COMPANION QUOTE AUTHENTICITY CHECKER
   Database of quotes with authentic/misattributed/fabricated verdicts
   ═════════════════════════════════════════════════════════════════════ */

export type AuthenticityVerdict = 'authentic' | 'hasan' | 'misattributed' | 'unverified' | 'fabricated';

export interface QuoteRecord {
  quote: string;
  quoteAr?: string;
  attribution: string;
  verdict: AuthenticityVerdict;
  source?: string;
  correctAttribution?: string;   // if misattributed — who actually said it
  scholarNote: string;
  color: string;
}

export const QUOTE_DATABASE: QuoteRecord[] = [
  {
    quote: '"Be in this world as if you were a stranger or a traveler."',
    quoteAr: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ',
    attribution: 'The Prophet ﷺ / Ibn Umar',
    verdict: 'authentic',
    source: 'Bukhari 6416 — narrated by Ibn Umar',
    scholarNote: "One of the most authentic and frequently cited hadiths in Islamic spirituality. It is the Prophet's ﷺ statement narrated by Ibn Umar, NOT Ibn Umar's own statement — a common misattribution.",
    color: '#0a5c2e',
  },
  {
    quote: '"Speak the truth even if it is bitter."',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Ibn Hibban 5722; graded Sahih',
    scholarNote: 'Authentic hadith narrated by multiple companions.',
    color: '#0a5c2e',
  },
  {
    quote: '"Cleanliness is half of faith."',
    quoteAr: 'الطَّهُورُ شَطْرُ الإِيمَانِ',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Muslim 223; Tirmidhi 3517',
    scholarNote: "Authentic hadith from Abu Malik al-Ash'ari, though the Arabic word tahur refers specifically to ritual purification (wudu/ghusl), not general hygiene — a subtle distinction often lost in translation.",
    color: '#0a5c2e',
  },
  {
    quote: '"The ink of the scholar is more sacred than the blood of the martyr."',
    attribution: 'The Prophet ﷺ',
    verdict: 'fabricated',
    source: 'No authentic chain exists',
    scholarNote: 'Ibn al-Jawzi, al-Nawawi, Ibn Taymiyya, and al-Albani all declared this fabricated (mawdu\'). It does not appear in any authentic hadith collection. The sentiment may be beautiful — but attributing it to the Prophet ﷺ is a sin.',
    color: '#8b1a38',
  },
  {
    quote: '"Trust in Allah, but tie your camel."',
    attribution: 'The Prophet ﷺ',
    verdict: 'hasan',
    source: 'Tirmidhi 2517 — graded Hasan (good) by Tirmidhi',
    scholarNote: "This hadith is narrated by Anas ibn Malik. Tirmidhi graded it Hasan. Some scholars questioned the chain's strength but the meaning is confirmed by other narrations.",
    color: '#b8860b',
  },
  {
    quote: '"Seek knowledge, even unto China."',
    attribution: 'The Prophet ﷺ',
    verdict: 'fabricated',
    source: 'No authenticated chain',
    scholarNote: 'Ibn al-Jawzi and al-Albani declared it fabricated. The concept is correct — seeking knowledge is obligatory — but this specific wording with "China" has no sound chain. The authentic command to seek knowledge is in Ibn Majah 224 (Sahih): "Seeking knowledge is obligatory on every Muslim."',
    color: '#8b1a38',
  },
  {
    quote: '"The best jihad is a word of truth in front of a tyrant."',
    quoteAr: 'أَفْضَلُ الْجِهَادِ كَلِمَةُ حَقٍّ عِنْدَ سُلْطَانٍ جَائِرٍ',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Abu Dawud 4344; Tirmidhi 2174; graded Sahih',
    scholarNote: 'Authenticated by multiple chains. One of the most powerful political hadiths in Islam.',
    color: '#0a5c2e',
  },
  {
    quote: '"I was a hidden treasure and I wanted to be known, so I created creation."',
    attribution: 'Allah / Hadith Qudsi',
    verdict: 'fabricated',
    source: 'No chain of any kind exists',
    scholarNote: 'Al-Sakhawi, Ibn Taymiyya, and al-Albani all stated this has no chain whatsoever — it is among the most widely circulated fabrications in Islamic social media. The concept of divine self-disclosure has basis in the Quran and authentic hadiths — but this wording was invented.',
    color: '#8b1a38',
  },
  {
    quote: '"Do not be a people without opinion."',
    attribution: 'Umar ibn al-Khattab',
    verdict: 'authentic',
    source: 'Tabaqat Ibn Sa\'d 3/307; Kanz al-Ummal',
    scholarNote: "A well-documented statement of Umar — one of his famous governance principles about not following blindly.",
    color: '#0a5c2e',
  },
  {
    quote: '"When you see a person who has been given more than you in money and form, look to those who have been given less."',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Muslim 2963; narrated by Abu Hurayra',
    scholarNote: "One of the most psychologically precise hadiths. Authentic and narrated by Abu Hurayra.",
    color: '#0a5c2e',
  },
  {
    quote: '"Be with the truthful."',
    attribution: 'The Prophet ﷺ',
    verdict: 'misattributed',
    source: 'Quran 9:119 — not a hadith',
    correctAttribution: 'Allah ﷻ — Surah Al-Tawbah 9:119',
    scholarNote: 'This is a Quranic verse, not a hadith. It is commonly circulated on social media as if it were a hadith of the Prophet ﷺ. The full verse: "O you who believe, fear Allah and be with the truthful."',
    color: '#1a3462',
  },
  {
    quote: '"Paradise lies beneath the feet of mothers."',
    attribution: 'The Prophet ﷺ',
    verdict: 'hasan',
    source: 'Nasai 3104; Ahmad 15490 — graded acceptable by many scholars',
    scholarNote: 'Some hadith scholars questioned the chain. Ibn Hajar classified it as acceptable. Al-Albani accepted it. The meaning is fully supported by multiple strong hadiths about maternal rights.',
    color: '#b8860b',
  },
  {
    quote: '"Actions are judged by intentions."',
    quoteAr: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    attribution: 'The Prophet ﷺ / Umar ibn al-Khattab',
    verdict: 'authentic',
    source: 'Bukhari 1; Muslim 1907 — the very first hadith in Sahih Bukhari',
    scholarNote: "The first hadith in Bukhari's collection — among the most authenticated statements in Islamic history. Narrated by Umar ibn al-Khattab.",
    color: '#0a5c2e',
  },
  {
    quote: '"This dunya is the prison of the believer and the paradise of the disbeliever."',
    quoteAr: 'الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Muslim 2956; Tirmidhi 2324',
    scholarNote: 'Authentic hadith narrated by Abu Hurayra. One of the most quoted statements on the Islamic relationship with material life.',
    color: '#0a5c2e',
  },
  {
    quote: '"Whoever knows himself knows his Lord."',
    attribution: 'The Prophet ﷺ',
    verdict: 'fabricated',
    source: 'No authentic chain',
    scholarNote: "This is a philosophical maxim of ancient Greek origin (attributed to Thales and others), adapted into Islamic discourse. Ibn Taymiyya explicitly stated: 'It is not an authentic hadith.' Al-Albani also rejected it. It echoes Sufi philosophical concepts but has no prophetic origin.",
    color: '#8b1a38',
  },
  {
    quote: '"The strong person is not the one who can wrestle others down. The strong person is the one who controls himself when angry."',
    quoteAr: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
    attribution: 'The Prophet ﷺ',
    verdict: 'authentic',
    source: 'Bukhari 6114; Muslim 2609',
    scholarNote: 'Fully authentic, narrated by Abu Hurayra. One of the most significant psychological hadiths in Islam.',
    color: '#0a5c2e',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 84 — DEDICATION GENERATOR
   Companion quotes for calligraphy cards
   ═════════════════════════════════════════════════════════════════════ */

export interface DedicationQuote {
  rank: number;
  companion: string;
  quoteAr: string;
  quoteEn: string;
  occasion: string;
  source: string;
  color: string;
}

export const DEDICATION_QUOTES: DedicationQuote[] = [
  { rank:1,  companion:'Abu Bakr al-Siddiq',       color:'#b8860b', quoteAr:'اللَّهُمَّ اجْعَلْنِي خَيْرًا مِمَّا يَظُنُّونَ، وَاغْفِرْ لِي مَا لَا يَعْلَمُونَ', quoteEn:'"O Allah, make me better than what they think of me, and forgive me for what they do not know."', occasion:"Said regularly when people praised him", source:'Bayhaqi, Shu\'ab al-Iman' },
  { rank:2,  companion:'Umar ibn al-Khattab',       color:'#8b3a08', quoteAr:'حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا', quoteEn:'"Hold yourselves accountable before you are held accountable."', occasion:"Said as Caliph — one of his most repeated maxims", source:'Kanz al-Ummal; Hilyat al-Awliya' },
  { rank:3,  companion:'Uthman ibn Affan',           color:'#1a3462', quoteAr:'مَا أَسَرَّ أَحَدٌ سَرِيرَةً إِلَّا أَظْهَرَهَا اللَّهُ عَلَى صَفَحَاتِ وَجْهِهِ', quoteEn:'"No one conceals a secret thought without Allah showing it on the pages of his face."', occasion:"One of his most famous sayings on inner accountability", source:'Ibn Abi Dunya; Hilyat al-Awliya' },
  { rank:4,  companion:'Ali ibn Abi Talib',           color:'#0a3d2e', quoteAr:'اعْرِفِ الْحَقَّ تَعْرِفْ أَهْلَهُ', quoteEn:'"Know the truth and you will know its people."', occasion:"On the methodology of recognizing truth over personality", source:'Nahj al-Balagha' },
  { rank:4,  companion:'Ali ibn Abi Talib',           color:'#0a3d2e', quoteAr:'الْيَوْمَ عَمَلٌ وَلَا حِسَابَ، وَغَدًا حِسَابٌ وَلَا عَمَلَ', quoteEn:'"Today there is action without reckoning. Tomorrow there is reckoning without action."', occasion:"Sermon in the mosque of Kufa", source:'Nahj al-Balagha, Sermon 42' },
  { rank:5,  companion:'Aisha bint Abi Bakr',         color:'#7a3060', quoteAr:'مَنْ أَحَبَّ أَنْ يَعْرِفَ مَنْزِلَتَهُ عِنْدَ اللَّهِ فَلْيَنْظُرْ كَيْفَ مَنْزِلَةُ اللَّهِ مِنْهُ', quoteEn:'"Whoever wants to know his rank with Allah — let him look at how Allah ranks in his own heart."', occasion:"Teaching her students in Medina", source:'Hilyat al-Awliya 2/41' },
  { rank:7,  companion:'Hamza ibn Abd al-Muttalib',   color:'#a02020', quoteAr:'لَا يَدْرِي أَحَدٌ مَا قَدَّرَ اللَّهُ لَهُ حَتَّى يَفْعَلَ', quoteEn:'"No one knows what Allah has decreed for them until they actually act."', occasion:"Before a battle engagement", source:'Ibn Sa\'d Tabaqat' },
  { rank:10, companion:'Bilal ibn Rabah',             color:'#4a4a8a', quoteAr:'أَحَدٌ أَحَدٌ', quoteEn:'"One. One." (Ahad, Ahad — his words under torture, affirming Allah\'s oneness)', occasion:"While being tortured on the sands of Mecca", source:'Ibn Hisham Seerah' },
  { rank:12, companion:'Khalid ibn al-Walid',         color:'#8b1a38', quoteAr:'مَا مِنْ لَيْلَةٍ يُهْدَى إِلَيَّ فِيهَا عَرُوسٌ أَنَا إِلَيْهَا أَشَوْقُ مِنِّي إِلَى لَيْلَةٍ شَدِيدَةِ الْبَرْدِ فِي سَرِيَّةٍ', quoteEn:'"No bride has ever been brought to me that I desired more than a freezing cold night on a military campaign."', occasion:"His deathbed speech, lamenting he would die in bed", source:'Ibn Sa\'d Tabaqat 7/94' },
  { rank:13, companion:'Anas ibn Malik',              color:'#0a5c2e', quoteAr:'خَدَمْتُ رَسُولَ اللَّهِ عَشْرَ سِنِينَ فَمَا قَالَ لِي قَطُّ أُفٍّ', quoteEn:'"I served the Messenger of Allah for ten years and he never once said \'uff\' to me — not a word of displeasure."', occasion:"Anas describing his 10 years of service", source:'Bukhari 6038' },
  { rank:15, companion:'Abu Dharr al-Ghifari',        color:'#509070', quoteAr:'يَكْفِينِي مِنَ الدُّنْيَا ثَلَاثٌ: رِدَاءٌ يُوَارِي عَوْرَتِي، وَكِسْرَةٌ تُقِيمُ صُلْبِي، وَحَجَرٌ أَتَوَسَّدُهُ', quoteEn:'"Three things of the world are enough for me: a garment to cover myself, a morsel to sustain my back, and a rock to rest my head."', occasion:"Said in the desert of Rabadha, his place of exile", source:'Hilyat al-Awliya 1/166' },
  { rank:29, companion:'Salman al-Farisi',            color:'#509070', quoteAr:'وَجَدْتُ مَطْلَبِي فِي طَلَبِ الْحَقِّ', quoteEn:'"I found what I was seeking in seeking the truth."', occasion:"Describing his long journey to find the final Prophet ﷺ", source:'Ibn Sa\'d Tabaqat 4/75' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 86 — "COMPANION VOICE" — Wisdom Retrieval
   Query → closest companion statement from the site's data
   ═════════════════════════════════════════════════════════════════════ */

export interface VoiceEntry {
  keywords: string[];
  topic: string;
  companion: string;
  companionRank: number;
  color: string;
  quoteEn: string;
  quoteAr?: string;
  context: string;
  source: string;
}

export const VOICE_ENTRIES: VoiceEntry[] = [
  { keywords:['angry','anger','rage','temper','mad','furious'], topic:'Controlling Anger', companion:'The Prophet ﷺ', companionRank:0, color:'#d4a820', quoteEn:'"The strong person is not the one who can wrestle others down. The strong person is the one who controls himself when angry."', quoteAr:'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ', context:'The Prophet ﷺ defined strength not as physical force but as emotional mastery. When a companion asked for advice, the Prophet ﷺ said three times: "Do not be angry."', source:'Bukhari 6114' },
  { keywords:['worry','anxious','anxiety','fear','afraid','scared','stress'], topic:'Overcoming Fear & Anxiety', companion:'The Prophet ﷺ via Abu Bakr', companionRank:1, color:'#b8860b', quoteEn:'"Do not grieve — indeed, Allah is with us."', quoteAr:'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', context:"The Prophet ﷺ said this to Abu Bakr in the Cave of Thawr when Abu Bakr wept fearing for the Prophet's ﷺ life. The Quran immortalized this moment in 9:40.", source:'Quran 9:40; Bukhari 3922' },
  { keywords:['money','wealth','rich','poor','charity','give','donate','financial','debt'], topic:'Relationship with Wealth', companion:'Abu Dharr al-Ghifari', companionRank:15, color:'#509070', quoteEn:'"Three things of the world are enough for me: a garment to cover myself, a morsel to sustain my back, and a rock to rest my head."', context:"Abu Dharr was exiled for denouncing wealth accumulation. He chose poverty over compromise — living in the desert of Rabadha with almost nothing until his death.", source:'Hilyat al-Awliya 1/166' },
  { keywords:['knowledge','learn','study','scholar','education','reading','book'], topic:'Seeking Knowledge', companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', quoteEn:'"Know the truth and you will know its people."', quoteAr:'اعْرِفِ الْحَقَّ تَعْرِفْ أَهْلَهُ', context:"Ali's principle was to judge people by truth — not truth by people. His approach to knowledge was entirely principle-based, not personality-based. This is his most famous epistemological statement.", source:'Nahj al-Balagha' },
  { keywords:['death','die','dying','grave','akhira','afterlife','paradise','heaven','hell'], topic:'Remembering Death', companion:'Ali ibn Abi Talib', companionRank:4, color:'#0a3d2e', quoteEn:'"Today there is action without reckoning. Tomorrow there is reckoning without action."', quoteAr:'الْيَوْمَ عَمَلٌ وَلَا حِسَابَ، وَغَدًا حِسَابٌ وَلَا عَمَلَ', context:'Ali delivered this in a sermon in Kufa. It defines the Islamic imperative to act now — because the day of reckoning allows no corrections.', source:'Nahj al-Balagha, Sermon 42' },
  { keywords:['injustice','unfair','oppression','wrong','corrupt','justice','rights'], topic:'Standing for Justice', companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', quoteEn:'"Hold yourselves accountable before you are held accountable."', quoteAr:'حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا', context:"Umar's governance was built on personal accountability first. He held himself to the same standard he demanded of governors. He once said: 'Correct me even if you must grab me by the collar.'", source:'Kanz al-Ummal' },
  { keywords:['prayer','salah','worship','fast','fasting','night','tahajjud','ibadah'], topic:'Worship and Devotion', companion:'Aisha bint Abi Bakr', companionRank:5, color:'#7a3060', quoteEn:'"Whoever wants to know his rank with Allah — let him look at how Allah ranks in his own heart."', context:"Aisha taught this as the ultimate test of one's spiritual state — not outward observation, but inner honesty about where Allah truly sits in your priorities.", source:'Hilyat al-Awliya 2/41' },
  { keywords:['patient','patience','hardship','trial','test','difficulty','struggle','suffer'], topic:'Patience in Hardship', companion:'Bilal ibn Rabah', companionRank:10, color:'#4a4a8a', quoteEn:'"Ahad. Ahad." (One. One.)', context:'Bilal repeated this single word — the oneness of Allah — while being tortured with a boulder on his chest on the hot sand of Mecca. His entire theology under maximum pressure was one word.', source:'Ibn Hisham Seerah' },
  { keywords:['truth','honest','lie','sincere','trust','trustworthy','integrity'], topic:'Truth and Integrity', companion:'The Prophet ﷺ via Abu Dharr', companionRank:15, color:'#509070', quoteEn:'"The most truthful speech I have ever heard was from Abu Dharr al-Ghifari."', context:"The Prophet ﷺ said this about Abu Dharr — who was known for his refusal to soften or shade the truth under any pressure. His motto: 'I will speak the truth even if it costs me everything.'", source:'Tirmidhi 3801' },
  { keywords:['family','parents','mother','father','wife','husband','children','marriage'], topic:'Family and Relationships', companion:'Anas ibn Malik', companionRank:13, color:'#0a5c2e', quoteEn:'"I served the Messenger of Allah for ten years and he never once said \'uff\' to me — not a word of displeasure."', context:"Anas joined the Prophet ﷺ at age 10 and served him for a decade. In all those years — through the stress of prophethood, battle, and governance — the Prophet ﷺ never expressed frustration with Anas. This is the most documented account of the Prophet's ﷺ patience with family and servants.", source:'Bukhari 6038' },
  { keywords:['arrogant','proud','humble','humility','ego','self','confidence','narciss'], topic:'Humility and Self-Awareness', companion:'Abu Bakr al-Siddiq', companionRank:1, color:'#b8860b', quoteEn:'"O Allah, make me better than what they think of me, and forgive me for what they do not know."', quoteAr:'اللَّهُمَّ اجْعَلْنِي خَيْرًا مِمَّا يَظُنُّونَ، وَاغْفِرْ لِي مَا لَا يَعْلَمُونَ', context:'Abu Bakr said this whenever people praised him. He was acutely aware of the gap between his public image and his private reality — and that only Allah knew the truth of both.', source:"Bayhaqi, Shu'ab al-Iman" },
  { keywords:['leadership','lead','manage','decision','choice','responsibility','power'], topic:'Leadership and Responsibility', companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', quoteEn:'"If a stray dog were to die hungry on the banks of the Euphrates, Umar would be asked about it on the Day of Judgment."', context:"Umar said this about himself — expressing the terrifying weight of leadership. He meant: every person under your authority is your responsibility. Every neglected need is on you.", source:"Ibn Sa'd Tabaqat 3/295" },
  { keywords:['search','purpose','meaning','lost','direction','guidance','path'], topic:'Searching for Purpose', companion:'Salman al-Farisi', companionRank:29, color:'#509070', quoteEn:'"I found what I was seeking in seeking the truth."', context:"Salman spent decades searching — leaving Persia, serving priests, becoming enslaved — all pursuing one thing: the final messenger. His conclusion was that the seeking itself was the path.", source:"Ibn Sa'd Tabaqat 4/75" },
  { keywords:['past','regret','mistake','sin','forgive','repent','forgiveness','guilt'], topic:'Repentance and Moving Forward', companion:'Umar ibn al-Khattab', companionRank:2, color:'#8b3a08', quoteEn:'"I never stopped making amends for my doubt at Hudaybiyyah — fasting, praying, and giving charity — hoping it would be expiation."', context:"Umar regretted doubting the Prophet ﷺ at Hudaybiyyah for the rest of his life. He didn't minimize it or justify it — he compensated for it. Islamic repentance is not just verbal but behavioral.", source:'Ibn Hisham Seerah; Bukhari context' },
  { keywords:['battle','fight','war','conflict','courage','brave','soldier','warrior'], topic:'Courage and Sacrifice', companion:'Khalid ibn al-Walid', companionRank:12, color:'#8b1a38', quoteEn:'"No bride has ever been brought to me that I desired more than a freezing cold night on a military campaign — seeking the cause of Allah."', context:"Khalid\'s deathbed speech — his great grief was dying in bed rather than in battle. He had fought in over 100 engagements and said the nights before battle were the most beautiful of his life.", source:"Ibn Sa'd Tabaqat 7/94" },
];
