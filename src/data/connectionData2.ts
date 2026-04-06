/* ─────────────────────────────────────────────────────────────────────────
   Connections Page — Enrichment Data Set 2  (Features 66, 70, 71, 73)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 66 — THE SUNNAH PRESERVATION TREE
   Which companion preserved which major Islamic practice
   ═════════════════════════════════════════════════════════════════════ */
export interface SunnahNode {
  id: string;
  label: string;
  labelAr: string;
  type: 'root' | 'category' | 'practice';
  companionRank?: number;
  companionName?: string;
  description?: string;
  whyVital?: string;  // what would have been lost
  source?: string;
  color: string;
  children?: string[];  // child IDs
}

export const SUNNAH_TREE_NODES: SunnahNode[] = [
  { id:'root', label:'Prophetic Sunnah', labelAr:'السنة النبوية', type:'root', color:'#d4a820', children:['cat-worship','cat-law','cat-social','cat-knowledge'] },

  { id:'cat-worship', label:'Worship Practices', labelAr:'العبادات', type:'category', color:'#b8860b', children:['adhan','witr','eid','tayammum','wisal-fast','tahajjud-detail','friday-khutba'] },
  { id:'cat-law', label:'Legal Rulings', labelAr:'الأحكام', type:'category', color:'#1a3462', children:['inheritance','wills','jizia','blood-money','marriage-contract'] },
  { id:'cat-social', label:'Social Sunnah', labelAr:'السنن الاجتماعية', type:'category', color:'#0a5c2e', children:['entering-home','sneezing','marketplace-etiquette','food-etiquette','greeting'] },
  { id:'cat-knowledge', label:'Quranic Sciences', labelAr:'علوم القرآن', type:'category', color:'#7a3060', children:['quran-seven','tafsir-detail','qiraat','naskh-mansukh'] },

  { id:'adhan', label:'The Adhan', labelAr:'الأذان', type:'practice', companionRank:10, companionName:'Bilal ibn Rabah', description:'The call to prayer — its exact wording, tone, and timing. Bilal called the adhan directly in the Prophet\'s ﷺ presence for 9 years.', whyVital:'No other companion had the exact vocal authority. When Bilal left Medina after the Prophet\'s ﷺ death, it marked the symbolic end of an era.', source:'Bukhari 604; Muslim 377', color:'#4a4a8a' },
  { id:'witr', label:'The Witr Prayer', labelAr:'الوتر', type:'practice', companionRank:4, companionName:'Ali ibn Abi Talib', description:'The odd-numbered night prayer capping the night. Ali narrated the specific timing, units, and qunut supplication.', whyVital:'The detailed witr procedure — especially the qunut in the second half of Ramadan — was primarily preserved through Ali\'s narrations.', source:'Tirmidhi 429; Nasai 1717', color:'#0a3d2e' },
  { id:'eid', label:'Eid Prayer Procedure', labelAr:'صلاة العيد', type:'practice', companionRank:1, companionName:'Abu Bakr al-Siddiq', description:"The first Eid prayer after the Prophet's ﷺ death was led by Abu Bakr — establishing the exact format.", whyVital:'If Abu Bakr had not led and narrated the exact Eid prayer format, the procedure of 6 extra takbirat and the specific khutbah order would have been uncertain.', source:'Bukhari 956; Muslim 889', color:'#b8860b' },
  { id:'tayammum', label:'Tayammum (Dry Ablution)', labelAr:'التيمم', type:'practice', companionRank:undefined, companionName:'Ammar ibn Yasir + Aisha', description:'Tayammum was revealed on a journey when Aisha lost her necklace. Ammar narrated the exact method when sand was used.', whyVital:'Ammar ibn Yasir preserved the correct method — only striking the earth once (not twice as some thought). His narration corrected an error that spread.', source:'Bukhari 338; Muslim 368', color:'#509070' },
  { id:'wisal-fast', label:'Wisal Fasting Prohibition', labelAr:'نهي الوصال', type:'practice', companionRank:17, companionName:'Abu Hurayra', description:'The prohibition against fasting consecutive days without breaking fast. Abu Hurayra preserved this ruling precisely.', whyVital:'Without this precise narration, the ruling could have been misunderstood. Abu Hurayra\'s detailed account of the Prophet\'s ﷺ warning is the primary source.', source:'Bukhari 1963; Muslim 1102', color:'#d4a820' },
  { id:'tahajjud-detail', label:'Tahajjud Detail', labelAr:'تفاصيل التهجد', type:'practice', companionRank:5, companionName:'Aisha bint Abi Bakr', description:'The exact number of rak\'ahs, the Prophet\'s ﷺ posture, his weeping, the specific surahs — all preserved by Aisha.', whyVital:'Aisha uniquely observed the Prophet\'s ﷺ private nighttime worship. No male companion had this access. Her narrations are irreplaceable.', source:'Bukhari 1130; Muslim 738', color:'#7a3060' },
  { id:'friday-khutba', label:'Friday Khutbah Format', labelAr:'خطبة الجمعة', type:'practice', companionRank:30, companionName:'Ibn Umar', description:'The exact format of the Friday sermon — two khutbahs, sitting between them, specific formulas — preserved primarily by Ibn Umar.', whyVital:"Ibn Umar attended every single Friday prayer in Medina for 60+ years after the Prophet's ﷺ death, maintaining the exact practice.", source:'Muslim 861; Abu Dawud 1092', color:'#b8860b' },

  { id:'inheritance', label:'Inheritance Law', labelAr:'المواريث', type:'practice', companionRank:19, companionName:'Ibn Abbas', description:'The complex system of Islamic inheritance — exact shares, conditions, exceptions. Ibn Abbas was the primary juristic authority.', whyVital:'Ibn Abbas resolved disputed cases that others could not. His rulings became the foundation for Maliki and Shafii inheritance law.', source:'Bukhari chapter on inheritance; extensive fiqh works', color:'#2a5080' },
  { id:'wills', label:'Will & Testament Law', labelAr:'الوصية', type:'practice', companionRank:2, companionName:'Umar ibn al-Khattab', description:'The rules for written wills, limits on bequest (1/3 max), conditions for validity.', whyVital:"Umar's written will is preserved and was the model — it established the 1/3 rule's application in governance contexts.", source:'Bukhari 2738; Muwatta Malik', color:'#8b3a08' },
  { id:'blood-money', label:'Diya (Blood Money)', labelAr:'الدية', type:'practice', companionRank:8, companionName:'Sa\'d ibn Abi Waqqas', description:"The specific amounts of blood money (diya) for different injuries and death. Sa'd's court cases preserved precise rulings.", whyVital:"Sa'd as one of the first Islamic judges established binding precedents for diya that governed Islamic courts for centuries.", source:'Abu Dawud 4541; Muwatta Malik 43', color:'#0a3d2e' },

  { id:'greeting', label:'The Islamic Greeting', labelAr:'السلام', type:'practice', companionRank:2, companionName:'Umar ibn al-Khattab', description:"The exact wording, obligation, and rulings of Assalamu Alaikum wa Rahmatullahi wa Barakatuh. Umar standardized the full greeting.", whyVital:"Umar specifically warned against shortening the greeting — his insistence preserved the full form.", source:'Bukhari 6233; Tirmidhi 2690', color:'#8b3a08' },
  { id:'food-etiquette', label:'Food & Eating Sunnah', labelAr:'آداب الطعام', type:'practice', companionRank:13, companionName:'Anas ibn Malik', description:'Every detail of prophetic eating — right hand, sitting, saying bismillah, cleaning the plate, not blowing on food. Anas served food to the Prophet ﷺ for 10 years.', whyVital:'As the personal servant, Anas observed private moments of the Prophet ﷺ at table that no one else saw.', source:'Bukhari 5376; Muslim 2022', color:'#b8860b' },

  { id:'quran-seven', label:'Seven Quranic Readings (Ahruf)', labelAr:'الأحرف السبعة', type:'practice', companionRank:22, companionName:'Ibn Masud + Ubay ibn Ka\'b', description:'The seven valid modes of Quranic recitation. Ibn Masud preserved Iraqi readings; Ubay preserved Syrian readings.', whyVital:'Without these companions, regional variations in recitation would have caused conflict. Uthman\'s standardization relied on their expertise.', source:'Bukhari 4992; Tirmidhi 2943', color:'#b8860b' },
  { id:'tafsir-detail', label:'Quranic Interpretation', labelAr:'التفسير', type:'practice', companionRank:19, companionName:'Ibn Abbas', description:'The meanings of rare Quranic words and the asbab al-nuzul (reasons for revelation). Ibn Abbas is the founder of tafsir as a science.', whyVital:'Without Ibn Abbas, vast portions of Quranic vocabulary would be interpretively unclear. He is the source of 1,696 hadiths on interpretation alone.', source:'Bukhari 143; Tafsir works', color:'#2a5080' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 70 — THE CONVERSION CHAIN (Who Brought Whom to Islam)
   D3 tree — conversion genealogy of first ~50 Muslims
   ═════════════════════════════════════════════════════════════════════ */
export interface ConversionNode {
  id: string;
  name: string;
  nameAr: string;
  companionRank?: number;
  convertedBy: string | null;  // id of the person who brought them
  year: string;   // approximate year of conversion
  yearBH?: number;  // years before Hijra
  category: string;
  color: string;
  note?: string;
}

export const CONVERSION_NODES: ConversionNode[] = [
  // First Muslims — The Prophet ﷺ as root
  { id:'prophet',  name:'Prophet Muhammad ﷺ', nameAr:'محمد ﷺ', convertedBy:null, year:'610 CE', category:'prophet', color:'#d4a820', note:'The Messenger of Allah — first to receive revelation' },

  // Direct first Muslims
  { id:'khadijah', name:'Khadijah bint Khuwaylid', nameAr:'خديجة', companionRank:undefined, convertedBy:'prophet', year:'610 CE', yearBH:13, category:'wife', color:'#d4a820', note:'First human to accept Islam' },
  { id:'ali',      name:'Ali ibn Abi Talib', nameAr:'علي', companionRank:4, convertedBy:'prophet', year:'610 CE', yearBH:13, category:'family', color:'#0a3d2e', note:'First male child to accept' },
  { id:'abu-bakr', name:'Abu Bakr al-Siddiq', nameAr:'أبو بكر', companionRank:1, convertedBy:'prophet', year:'610 CE', yearBH:13, category:'companion', color:'#b8860b', note:'First free adult male' },
  { id:'zayd',     name:'Zayd ibn Haritha', nameAr:'زيد', companionRank:6, convertedBy:'prophet', year:'610 CE', yearBH:13, category:'family', color:'#509070', note:'First freed slave' },

  // Abu Bakr\'s chain (he personally converted 5-6 of the 10 Paradise)
  { id:'uthman',   name:'Uthman ibn Affan', nameAr:'عثمان', companionRank:3, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#1a3462' },
  { id:'talha',    name:'Talha ibn Ubaydullah', nameAr:'طلحة', companionRank:undefined, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#2a5080' },
  { id:'zubayr',   name:'Zubayr ibn al-Awwam', nameAr:'الزبير', companionRank:undefined, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#509070' },
  { id:'sad',      name:'Sa\'d ibn Abi Waqqas', nameAr:'سعد', companionRank:8, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#0a3d2e' },
  { id:'abu-ubayda',name:'Abu Ubayda ibn al-Jarrah', nameAr:'أبو عبيدة', companionRank:9, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#2a5080' },
  { id:'abd-rahman',name:"Abd al-Rahman ibn Awf", nameAr:'عبد الرحمن', companionRank:11, convertedBy:'abu-bakr', year:'610 CE', yearBH:13, category:'companion', color:'#2a5040' },

  // Ali\'s chain
  { id:'ammar',    name:'Ammar ibn Yasir', nameAr:'عمار', companionRank:27, convertedBy:'ali', year:'610 CE', yearBH:12, category:'companion', color:'#8b3a08', note:'With his parents — the first family to accept Islam' },
  { id:'yasir',    name:'Yasir (father of Ammar)', nameAr:'ياسر', convertedBy:'ali', year:'610 CE', yearBH:12, category:'companion', color:'#8b3a08', note:'First martyr family' },
  { id:'sumayya',  name:'Sumayya bint Khabbat', nameAr:'سمية', convertedBy:'ali', year:'610 CE', yearBH:12, category:'companion', color:'#8b3a08', note:'First martyr of Islam' },

  // Khadijah\'s chain
  { id:'waraqah',  name:'Waraqah ibn Nawfal', nameAr:'ورقة', convertedBy:'khadijah', year:'610 CE', yearBH:13, category:'family', color:'#d4a820', note:'Her cousin — confirmed prophethood' },
  { id:'fatima',   name:'Fatima bint Muhammad', nameAr:'فاطمة', convertedBy:'khadijah', year:'~613 CE', yearBH:10, category:'family', color:'#d4a820', note:'Born into Islam' },

  // Zayd\'s chain (his converted contacts)
  { id:'osama',    name:"Osama ibn Zayd", nameAr:'أسامة', companionRank:undefined, convertedBy:'zayd', year:'~617 CE', yearBH:6, category:'family', color:'#509070', note:'Born Muslim — son of Zayd' },

  // Later conversions via companions (waves)
  { id:'umar',     name:"Umar ibn al-Khattab", nameAr:'عمر', companionRank:2, convertedBy:'prophet', year:'~616 CE', yearBH:7, category:'companion', color:'#8b3a08', note:'The conversion that broke Quraysh' },
  { id:'hamza',    name:'Hamza ibn Abd al-Muttalib', nameAr:'حمزة', companionRank:7, convertedBy:'prophet', year:'~615 CE', yearBH:8, category:'family', color:'#a02020', note:'Converted after learning Abu Jahl struck the Prophet ﷺ' },

  // Umar\'s chain
  { id:'hafsah',   name:"Hafsa bint Umar", nameAr:'حفصة', companionRank:undefined, convertedBy:'umar', year:'~618 CE', yearBH:5, category:'family', color:'#8b3a08' },
  { id:'abd-ibn-umar', name:"Abdullah ibn Umar", nameAr:'عبدالله', companionRank:30, convertedBy:'umar', year:'~618 CE', yearBH:5, category:'family', color:'#b8860b', note:'Born/raised Muslim' },

  // Abu Bakr\'s later chain continues
  { id:'bilal',    name:'Bilal ibn Rabah', nameAr:'بلال', companionRank:10, convertedBy:'abu-bakr', year:'~610 CE', yearBH:12, category:'freed-slave', color:'#4a4a8a', note:'Abu Bakr purchased his freedom' },
  { id:'aisha',    name:'Aisha bint Abi Bakr', nameAr:'عائشة', companionRank:5, convertedBy:'abu-bakr', year:'~613 CE', yearBH:10, category:'family', color:'#7a3060', note:'Born into Islam' },
  { id:'abd-bakr', name:"Abd al-Rahman ibn Abi Bakr", nameAr:'عبد الرحمن', convertedBy:'abu-bakr', year:'~617 CE', yearBH:6, category:'family', color:'#b8860b' },

  // Uthman\'s chain
  { id:'ruqayya',  name:"Ruqayya bint Muhammad", nameAr:'رقية', convertedBy:'uthman', year:'~613 CE', yearBH:10, category:'family', color:'#1a3462', note:"The Prophet's daughter — married to Uthman" },

  // Ibn Masud — unique entry point
  { id:'ibn-masud', name:"Abdullah ibn Masud", nameAr:'ابن مسعود', companionRank:22, convertedBy:'prophet', year:'~611 CE', yearBH:12, category:'companion', color:'#b8860b', note:'Converted hearing the Prophet ﷺ recite directly' },

  // Salman through a chain
  { id:'salman',   name:"Salman al-Farisi", nameAr:'سلمان الفارسي', companionRank:29, convertedBy:'prophet', year:'~622 CE', yearBH:1, category:'companion', color:'#509070', note:'Arrived in Medina via decades of travel' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 71 — THE HIJRA ROUTE — Day-by-Day Journey
   Animated stops from Mecca to Medina
   ═════════════════════════════════════════════════════════════════════ */
export interface HijraStop {
  day: number;
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
  event: string;
  companions: string[];
  note?: string;
  category: 'departure' | 'hiding' | 'rest' | 'encounter' | 'arrival' | 'travel';
  color: string;
}

export const HIJRA_STOPS: HijraStop[] = [
  { day:0,  name:"Mecca — Abu Bakr's House",  nameAr:'مكة — بيت أبي بكر',  lat:21.42, lng:39.82, event:"Night of departure — Ali slept in the Prophet's ﷺ bed as a decoy. The Prophet ﷺ and Abu Bakr left through the back while Qurayshi assassins waited at the front door.", companions:['Prophet ﷺ','Abu Bakr al-Siddiq'], category:'departure', color:'#d4a820' },
  { day:1,  name:'Cave of Thawr',  nameAr:'غار ثور',  lat:21.37, lng:39.83, event:"3 nights hiding in Cave Thawr. Quraysh searched but Allah caused a spider to spin a web and a dove to nest at the entrance — Quraysh turned back saying 'No one has entered here.' Abu Bakr wept fearing for the Prophet ﷺ; the Prophet ﷺ said: 'Do not grieve — Allah is with us.'", companions:['Prophet ﷺ','Abu Bakr al-Siddiq'], note:'Cave Thawr — 3 nights', category:'hiding', color:'#b8860b' },
  { day:4,  name:'Qudayd / Arj Valley', nameAr:'عَرَج',  lat:21.76, lng:39.77, event:"Left the cave on the 4th night. Abdullah ibn Urayqit (a trusted non-Muslim guide) led them on an unfamiliar coastal route to avoid detection. They traveled by night.", companions:['Prophet ﷺ','Abu Bakr','Abdullah ibn Urayqit (guide)'], category:'travel', color:'#509070' },
  { day:5,  name:"Umm Ma'bad's Tent", nameAr:"خيمة أم معبد", lat:21.88, lng:39.71, event:"A woman named Umm Ma'bad had a goat too weak to walk. Abu Bakr milked it and it gave abundant milk. She was so moved she became Muslim. Her description of the Prophet ﷺ is the most detailed physical description in Islamic literature.", companions:['Prophet ﷺ','Abu Bakr','Umm Ma\'bad'], category:'encounter', color:'#7a3060' },
  { day:6,  name:'Resting — Qaha Valley', nameAr:'وادي قاحة', lat:22.10, lng:39.68, event:'Brief rest — they traveled mostly by night avoiding the main Mecca-Medina road. The reward of 100 camels for the Prophet\'s ﷺ capture made every tribesman a potential bounty hunter.', companions:['Prophet ﷺ','Abu Bakr'], category:'rest', color:'#8b3a08' },
  { day:7,  name:"Buraidah ibn al-Husayb's encounter", nameAr:'لقاء بريدة', lat:22.35, lng:39.60, event:"Buraidah ibn al-Husayb — a bounty hunter — intercepted them. He intended to claim the 100-camel reward. Instead, the Prophet ﷺ spoke to him and he accepted Islam on the spot with 70 men from his clan.", companions:['Prophet ﷺ','Abu Bakr','Buraidah ibn al-Husayb'], category:'encounter', color:'#0a5c2e' },
  { day:8,  name:"Suraqah's Pursuit",  nameAr:'مطاردة سراقة', lat:22.50, lng:39.55, event:"Suraqah ibn Malik, a fierce horseman, pursued them for the reward. Each time he rode close, his horse's legs sank into the ground. He swore an oath to stop. The Prophet ﷺ told him: 'On that day, Suraqah, you will wear the bracelets of Khosrow.' Suraqah later claimed them under Umar's caliphate.", companions:['Prophet ﷺ','Abu Bakr','Suraqah ibn Malik'], category:'encounter', color:'#8b1a38' },
  { day:10, name:'Quba — Medina outskirts', nameAr:'قباء',  lat:24.44, lng:39.61, event:"Arrived at Quba — the first settlement before Medina. The Prophet ﷺ rested 4 days and founded the first mosque in Islam — Masjid Quba. Ali arrived on foot 3 days later after fulfilling his duties as decoy.", companions:['Prophet ﷺ','Abu Bakr','Ali (arriving separately)'], note:'First mosque of Islam built here', category:'arrival', color:'#0a3d2e' },
  { day:14, name:'Madinah al-Munawwarah', nameAr:'المدينة المنورة', lat:24.47, lng:39.61, event:"The Prophet ﷺ entered Medina on his camel Al-Qaswa. Every family wanted him to dismount at their home. He said: 'Let her go — she is commanded.' Al-Qaswa sat at the spot now beneath Masjid al-Nabawi. Ansari families wept with joy. The women of Medina sang: 'The full moon has risen over us from the valley of Wada'.", companions:['Prophet ﷺ','Abu Bakr','All the Ansar of Medina'], category:'arrival', color:'#d4a820', note:'12 Rabi al-Awwal 1 AH — September 622 CE' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 73 — TRIBAL TERRITORY MAP — Companion Origins
   Arabian Peninsula tribal territories with companion mapping
   ═════════════════════════════════════════════════════════════════════ */
export interface Tribe {
  id: string;
  name: string;
  nameAr: string;
  group: 'quraysh' | 'ansar' | 'yemeni' | 'non-arab' | 'other-arab';
  color: string;
  region: string;
  // SVG map position (normalized 0-1 on Arabian Peninsula map)
  cx: number;  // center x
  cy: number;  // center y
  r: number;   // radius (relative influence/size)
  companionRanks: number[];
  note: string;
}

export const TRIBES: Tribe[] = [
  // Quraysh sub-tribes (Mecca)
  { id:'banu-hashim',     name:"Banu Hashim",      nameAr:'بنو هاشم',      group:'quraysh', color:'#d4a820', region:'Mecca', cx:0.38, cy:0.52, r:0.06, companionRanks:[4,7],     note:"Clan of the Prophet ﷺ — nobility of Mecca" },
  { id:'banu-taym',       name:"Banu Taym",        nameAr:'بنو تيم',        group:'quraysh', color:'#b8860b', region:'Mecca', cx:0.36, cy:0.50, r:0.05, companionRanks:[1],       note:"Abu Bakr's clan — known for trade and fairness" },
  { id:'banu-adi',        name:"Banu Adi",         nameAr:'بنو عدي',        group:'quraysh', color:'#c8a020', region:'Mecca', cx:0.40, cy:0.50, r:0.05, companionRanks:[2],       note:"Umar's clan — known for diplomatic roles" },
  { id:'banu-umayya',     name:"Banu Umayya",      nameAr:'بنو أمية',       group:'quraysh', color:'#a09020', region:'Mecca', cx:0.38, cy:0.48, r:0.06, companionRanks:[3],       note:"Uthman's clan — wealthiest of Quraysh" },
  { id:'banu-makhzum',    name:"Banu Makhzum",     nameAr:'بنو مخزوم',      group:'quraysh', color:'#b0a030', region:'Mecca', cx:0.36, cy:0.54, r:0.05, companionRanks:[12],      note:"Khalid ibn al-Walid's clan — renowned warriors" },
  { id:'banu-zuhrah',     name:"Banu Zuhrah",      nameAr:'بنو زهرة',       group:'quraysh', color:'#c0a840', region:'Mecca', cx:0.40, cy:0.54, r:0.04, companionRanks:[8,11],    note:"Sa'd ibn Abi Waqqas and Abd al-Rahman's clan" },
  { id:'banu-asad-mecca', name:"Banu Asad (Mecca)",nameAr:'بنو أسد',        group:'quraysh', color:'#a8a030', region:'Mecca', cx:0.34, cy:0.52, r:0.04, companionRanks:[],        note:"Khadijah's clan" },

  // Ansar (Medina tribes)
  { id:'aus',             name:"Aus (Medina)",     nameAr:'الأوس',          group:'ansar',   color:'#0a5c2e', region:'Medina', cx:0.42, cy:0.42, r:0.07, companionRanks:[20],      note:"One of the two Ansari tribes — warriors and farmers" },
  { id:'khazraj',         name:"Khazraj (Medina)", nameAr:'الخزرج',         group:'ansar',   color:'#0a7040', region:'Medina', cx:0.44, cy:0.40, r:0.07, companionRanks:[13,35],   note:"Anas ibn Malik and Jabir's tribe — largest Ansari tribe" },
  { id:'banu-najjar',     name:"Banu al-Najjar",   nameAr:'بنو النجار',     group:'ansar',   color:'#0a6035', region:'Medina', cx:0.43, cy:0.42, r:0.04, companionRanks:[24],      note:"Sub-clan of Khazraj — Ka'b ibn Malik's tribe" },

  // Non-Arab
  { id:'persia',          name:"Persian / Farisi",  nameAr:'الفارسي',       group:'non-arab', color:'#509070', region:'Persia (modern Iran)', cx:0.80, cy:0.28, r:0.06, companionRanks:[29], note:"Salman al-Farisi — Persian convert" },
  { id:'abyssinia',       name:"Abyssinian / Habashat", nameAr:'الحبشة',   group:'non-arab', color:'#4a4a8a', region:'Abyssinia (Ethiopia)', cx:0.25, cy:0.68, r:0.05, companionRanks:[10], note:"Bilal ibn Rabah — Abyssinian origin" },
  { id:'rum',             name:"Rum (Byzantine)",   nameAr:'الروم',          group:'non-arab', color:'#2a5080', region:'Byzantine Syria', cx:0.32, cy:0.25, r:0.04, companionRanks:[],   note:"Some companions were Byzantines who accepted Islam" },

  // Yemeni tribes
  { id:'himyar',          name:"Himyar (Yemen)",    nameAr:'حمير',           group:'yemeni',  color:'#8b3a08', region:'Yemen', cx:0.38, cy:0.78, r:0.06, companionRanks:[],        note:"Ancient Yemeni dynasty — many became Muslim after Farwa ibn Amr's conversion" },
  { id:'azd',             name:"Azd (Oman/Yemen)",  nameAr:'الأزد',          group:'yemeni',  color:'#6a2a08', region:'Oman and southern Arabia', cx:0.55, cy:0.72, r:0.05, companionRanks:[], note:"Muadh ibn Jabal's background" },

  // Other Arab
  { id:'ghifar',          name:"Banu Ghifar",       nameAr:'بنو غفار',       group:'other-arab', color:'#509070', region:'Northwest Arabia near Red Sea', cx:0.30, cy:0.42, r:0.04, companionRanks:[15], note:"Abu Dharr al-Ghifari's tribe — desert nomads known for honesty" },
  { id:'kalb',            name:"Banu Kalb",          nameAr:'بنو كلب',        group:'other-arab', color:'#4a8070', region:'Syria-Arabia border', cx:0.42, cy:0.25, r:0.04, companionRanks:[],   note:"Dihya al-Kalbi — the companion envoy to Heraclius" },
  { id:'fazara',          name:"Fazara (Ghatafan)",  nameAr:'فزارة',          group:'other-arab', color:'#5a6040', region:'Najd region', cx:0.50, cy:0.42, r:0.04, companionRanks:[],   note:"Part of the Ghatafan coalition at Khandaq" },
];

// Map from companion rank to tribe ID
export const COMPANION_TRIBE: Record<number, string> = {
  1:'banu-taym', 2:'banu-adi', 3:'banu-umayya', 4:'banu-hashim',
  5:'banu-taym', 6:'banu-hashim', 7:'banu-hashim', 8:'banu-zuhrah',
  9:'banu-makhzum', 10:'abyssinia', 11:'banu-zuhrah', 12:'banu-makhzum',
  13:'khazraj', 15:'ghifar', 17:'ansar-other', 19:'banu-hashim',
  20:'aus', 22:'banu-hashim', 24:'banu-najjar', 29:'persia',
  30:'banu-adi', 35:'khazraj',
};
