// ═══════════════════════════════════════════════════════
//  INSIGHTS STATIC DATA  — extracted from sahabah_v2.html
// ═══════════════════════════════════════════════════════

export interface TenParadiseEntry {
  rank: number; name: string; ar: string; title: string;
  distinction: string; icon: string; color: string;
}

export const TEN_PARADISE: TenParadiseEntry[] = [
  { rank:1,  name:'Abu Bakr al-Siddiq',        ar:'أبو بكر الصديق',    title:'Al-Siddiq',        icon:'👑', color:'#b8860b',
    distinction:'The only companion named in the Quran (9:40). Prophet ﷺ said no one gave him more in friendship and wealth than Abu Bakr.' },
  { rank:2,  name:'Umar ibn al-Khattab',        ar:'عمر بن الخطاب',     title:'Al-Faruq',         icon:'⚔️', color:'#8b3a08',
    distinction:"Prophet ﷺ said: 'If there were a prophet after me it would have been Umar.' Singled out — the only caliph to conquer two superpowers simultaneously." },
  { rank:3,  name:'Uthman ibn Affan',           ar:'عثمان بن عفان',     title:'Dhul-Nurayn',      icon:'💎', color:'#1a3462',
    distinction:"Married two daughters of the Prophet ﷺ — hence 'Man of Two Lights.' Funded the Tabuk expedition single-handedly with 10,000 gold coins." },
  { rank:4,  name:'Ali ibn Abi Talib',          ar:'علي بن أبي طالب',   title:'Asad Allah',       icon:'🌟', color:'#0a3d2e',
    distinction:"First child to accept Islam at age 10. Prophet ﷺ said at Khaybar: 'I will give the banner to a man who loves Allah and His Messenger and is loved by them.'" },
  { rank:5,  name:'Talha ibn Ubayd Allah',      ar:'طلحة بن عبيدالله',  title:'Al-Fayyad',        icon:'🛡️', color:'#5c1010',
    distinction:"Shielded the Prophet ﷺ with his own body at Uhud, losing the use of his hand forever to arrows. The Prophet ﷺ personally named him 'Living Martyr.'" },
  { rank:6,  name:'Zubayr ibn al-Awwam',        ar:'الزبير بن العوام',  title:"Hawari al-Rasul",  icon:'⚔️', color:'#3d2a0a',
    distinction:"Drew the first sword in defense of Islam at age 15. Prophet ﷺ said: 'Every prophet has a disciple — mine is Zubayr.' Nephew and son-in-law of the Prophet ﷺ." },
  { rank:7,  name:'Abd al-Rahman ibn Awf',      ar:'عبدالرحمن بن عوف', title:'Al-Ghani Lillah',  icon:'💰', color:'#7a5500',
    distinction:"Arrived in Medina penniless and became Arabia's wealthiest trader in months through the Prophet's ﷺ personal prayer. Freed 30,000 enslaved people over his lifetime." },
  { rank:8,  name:"Sa'd ibn Abi Waqqas",        ar:'سعد بن أبي وقاص',  title:'Faris al-Islam',   icon:'🏹', color:'#2a5080',
    distinction:"First Muslim to fire an arrow in combat. His prayers were famously guaranteed answered — the Prophet ﷺ said 'Do not pray against Sa'd, for Allah answers his prayer.'" },
  { rank:9,  name:"Sa'id ibn Zayd",             ar:'سعيد بن زيد',       title:'Al-Awwal',         icon:'✨', color:'#509070',
    distinction:"Accepted Islam so early no date is recorded. Absent at Badr because the Prophet ﷺ sent him on a mission — yet the Prophet ﷺ counted him among Badr's spiritual rewards anyway." },
  { rank:10, name:'Abu Ubayda ibn al-Jarrah',   ar:'أبو عبيدة بن الجراح',title:'Amin al-Ummah',  icon:'🕊', color:'#6b4c11',
    distinction:"Named 'Trustworthy of the Entire Nation' personally by the Prophet ﷺ — the only companion given a universal communal title. Refused to flee the plague and died with his soldiers." },
];

// ─── Records & Firsts ───────────────────────────────────
export interface FactCard {
  icon: string; color: string; title: string; text: string; name: string; rank?: number;
}

export const FACTS: FactCard[] = [
  { icon:'📜', color:'#0a3d2e', title:'Most Hadiths Narrated',
    text:"Abu Hurayra narrated 5,374 hadiths — more than any other companion. He converted late (7 AH) yet outnarrated companions who knew the Prophet ﷺ for decades. He attributed this to the Prophet's ﷺ prayer for his memory.",
    name:'Abu Hurayra — Rank #6', rank:6 },
  { icon:'🌍', color:'#1a3462', title:'Farthest Burial from Mecca',
    text:'Abu Ayyub al-Ansari is buried beneath the walls of Constantinople (Istanbul) — more than 2,000 km from Mecca. He died on campaign aged ~90, and his grave became the Eyüp Sultan Mosque.',
    name:'Abu Ayyub al-Ansari — Rank #32', rank:32 },
  { icon:'📖', color:'#7a3060', title:'Only Companion Named in the Quran',
    text:'Zayd ibn Haritha is the only companion named directly in the Quran (33:37). Allah revealed his name to settle a legal ruling about adoption — an eternal singularity in Quranic history.',
    name:'Zayd ibn Haritha — Rank #51', rank:51 },
  { icon:'🏆', color:'#5c1010', title:'First Martyr in All of Islam',
    text:'Sumayya bint Khayyat — an elderly freed slave woman with no tribal protection — was the first human being to die for Islam. Killed by Abu Jahl with his own spear in Mecca, circa 615 CE.',
    name:'Sumayya bint Khayyat — Rank #28', rank:28 },
  { icon:'🌟', color:'#b8860b', title:'Longest Confirmed Lifespan',
    text:"Anas ibn Malik lived ~100 years (612–712 CE), personally bridging the prophetic era to the Tabi'in generation. He was the Prophet's ﷺ personal servant for 10 years and narrated 2,286 hadiths.",
    name:'Anas ibn Malik — Rank #18', rank:18 },
  { icon:'📢', color:'#1a3462', title:'First Public Quran Recitation',
    text:"Abdullah ibn Masud walked alone into the Ka'bah surrounded by Quraysh chiefs and recited Surah al-Rahman aloud — the first public Quranic recitation in history. He was beaten bloody and returned louder the next day.",
    name:'Abdullah ibn Masud — Rank #24', rank:24 },
  { icon:'👑', color:'#3d2a0a', title:'Briefest and Most Consequential Caliphate',
    text:"Abu Bakr's caliphate lasted only 2 years, 3 months, 11 days — yet in that time: compiled the Quran into one book, defeated the Ridda apostasy across Arabia, and launched simultaneous conquests of Persia and Byzantium.",
    name:'Abu Bakr al-Siddiq — Rank #1', rank:1 },
  { icon:'✨', color:'#509070', title:'Only Companion Allah Commanded the Prophet ﷺ to Read Quran To',
    text:"Ubayy ibn Ka'b is the only companion whom Allah specifically instructed the Prophet ﷺ to recite the Quran to by name. The Prophet ﷺ wept when he delivered this message — Ubayy asked: 'Did Allah really name me?' He said yes.",
    name:"Ubayy ibn Ka'b — Rank #25", rank:25 },
  { icon:'🕊', color:'#0a3d2e', title:'Guardian of the Master Quran Manuscript',
    text:'Hafsa bint Umar was entrusted with the first physical written copy of the Quran — compiled by Abu Bakr after Yamama. When Uthman standardized the Mushaf, this was the sole master copy used.',
    name:'Hafsa bint Umar — Rank #21', rank:21 },
  { icon:'💰', color:'#7a5500', title:'Most Slaves Freed by One Companion',
    text:'Abd al-Rahman ibn Awf freed over 30,000 enslaved people throughout his life — more than any other companion. He also donated 700 loaded camels of goods in a single charitable act.',
    name:'Abd al-Rahman ibn Awf — Rank #14', rank:14 },
  { icon:'🏅', color:'#8b1a38', title:'The Living Martyr of Uhud',
    text:"Talha ibn Ubayd Allah took 39 arrows shielding the Prophet ﷺ at Uhud — paralyzing his sword arm permanently. The Prophet ﷺ said while Talha was still alive: 'Whoever wishes to see a walking martyr, let him look at Talha.'",
    name:'Talha ibn Ubayd Allah — Rank #12', rank:12 },
];

// ─── Martyrs ────────────────────────────────────────────
export interface MartyrEntry { name: string; where: string; year: number; note: string; }

export const MARTYRS: MartyrEntry[] = [
  { name:'Sumayya bint Khayyat',      where:'Mecca (~615 CE)',  year:615, note:'First martyr in Islam. An elderly freed slave woman — no tribal protection. Refused to recant under torture. Killed by Abu Jahl with his own spear.' },
  { name:'Hamza ibn Abd al-Muttalib', where:'Uhud (625 CE)',    year:625, note:'Asad Allah (Lion of Allah). Killed by Wahshi, a javelin specialist hired specifically to target him by Hind bint Utba.' },
  { name:"Mus'ab ibn Umayr",          where:'Uhud (625 CE)',    year:625, note:'Carried the banner until both arms were severed. Wrapped in a shroud too small to cover his entire body. The Prophet ﷺ wept standing over him.' },
  { name:'Khubayb ibn Adi',           where:'Mecca (625 CE)',   year:625, note:"Captured, sold, and crucified by the Quraysh. Asked permission to pray two rak'as before execution — establishing this Sunnah for every martyr after him." },
  { name:"Sa'd ibn Mu'adh",           where:'Medina (627 CE)',  year:627, note:'Died of wounds from Khandaq. The Throne of Allah shook at his arrival in paradise — a narration in both Sahih Bukhari and Muslim.' },
  { name:'Zayd ibn Haritha',          where:"Mu'tah (629 CE)",  year:629, note:"First commander at Mu'tah. The Prophet ﷺ announced his death in Medina while the battle was still ongoing — before any messenger had arrived." },
  { name:'Jafar ibn Abi Talib',       where:"Mu'tah (629 CE)",  year:629, note:'Lost both arms then held the banner with his stumps before falling. Allah gave him wings in Paradise — he is called Jafar al-Tayyar (the Flying One).' },
  { name:'Abd Allah ibn Rawaha',      where:"Mu'tah (629 CE)",  year:629, note:"Recited improvised poetry charging into battle. Third commander at Mu'tah. Died in the footsteps of Zayd and Jafar." },
  { name:'Umar ibn al-Khattab',       where:'Medina (644 CE)',  year:644, note:"Stabbed multiple times during Fajr prayer by Abu Lu'lu'a. Even in death he insisted: do not punish any non-Muslim over me. Buried next to the Prophet ﷺ." },
  { name:'Uthman ibn Affan',          where:'Medina (656 CE)',  year:656, note:'Besieged in his own home for weeks, killed while reading the Quran. His blood fell on the open Mushaf at verse 2:137 — documented by multiple eyewitnesses.' },
  { name:'Ali ibn Abi Talib',         where:'Kufa (661 CE)',    year:661, note:"Struck with a poisoned sword during Fajr prayer by Ibn Muljam. Said as he died: 'By the Lord of the Ka'bah — I have succeeded (fuzt)!'" },
  { name:'Ammar ibn Yasir',           where:'Siffin (657 CE)',  year:657, note:"Killed by Muawiyah's forces at ~90 years old — fulfilling the Prophet's ﷺ exact prophecy: 'The transgressing group will kill Ammar.' This prophecy was used as evidence during the battle itself." },
  { name:'Al-Husayn ibn Ali',         where:'Karbala (680 CE)', year:680, note:'72 companions against 30,000 soldiers. Refused to pledge allegiance to Yazid. His death on 10 Muharram became the most mourned day in Islamic history.' },
  { name:'Habib ibn Zayd al-Ansari',  where:'Yamama (~633 CE)', year:633, note:'Limbs cut off one by one by the false prophet Musaylima. Refused every chance to recant. His mother Nusayba later fought at the same battle in vengeance.' },
  { name:'Abdullah ibn Zubayr',       where:'Mecca (692 CE)',   year:692, note:"Last companion-era caliph. Held Mecca against Hajjaj ibn Yusuf for years. Crucified at the gate of the Ka'bah itself — the most defiant death of any companion." },
].sort((a, b) => a.year - b.year);

// ─── Islamic Expansion (Conquest) Events ────────────────
export interface CqEvent {
  year: number; label: string; lat: number; lng: number; r: number; color: string; note: string;
}

export const CQ_EVENTS: CqEvent[] = [
  { year:622, label:'Hijra to Medina',           lat:24.47, lng:39.61, r:18, color:'#d4a017', note:'Prophet ﷺ migrates. Islamic state established.' },
  { year:624, label:'Battle of Badr',            lat:23.75, lng:38.77, r:10, color:'#8b3a08', note:'First major battle. 313 Muslims defeat 1,000 Quraysh.' },
  { year:630, label:'Conquest of Mecca',         lat:21.42, lng:39.82, r:22, color:'#d4a017', note:'Mecca surrenders. Most of Arabia accepts Islam.' },
  { year:632, label:'Arabia United',             lat:24.0,  lng:44.0,  r:32, color:'#b8860b', note:"Prophet ﷺ passes. Entire Arabian Peninsula is Muslim." },
  { year:634, label:'Conquest of Syria begins',  lat:33.51, lng:36.29, r:20, color:'#1a3462', note:'Abu Ubayda leads campaign. Damascus falls 636 CE.' },
  { year:636, label:'Battle of Yarmouk',         lat:32.8,  lng:36.1,  r:22, color:'#8b1a38', note:"Khalid's genius. Byzantine empire loses Syria forever." },
  { year:636, label:'Battle of Qadisiyyah',      lat:32.0,  lng:44.3,  r:20, color:'#8b3a08', note:"Sa'd ibn Abi Waqqas. Persian Sassanid empire falls." },
  { year:638, label:'Jerusalem surrenders',      lat:31.78, lng:35.23, r:16, color:'#1a3462', note:"Umar enters Jerusalem in person, on foot, alone." },
  { year:641, label:'Egypt conquered',           lat:30.06, lng:31.25, r:22, color:'#0a3d2e', note:"Amr ibn al-As takes Egypt. Breadbasket of the world." },
  { year:644, label:'Persia fully conquered',    lat:35.7,  lng:51.4,  r:28, color:'#8b3a08', note:"Sa'd's campaigns complete. Ctesiphon becomes Muslim." },
  { year:650, label:'North Africa campaign',     lat:36.8,  lng:10.2,  r:18, color:'#3d6b30', note:"Islam reaches the Maghreb. North African expansion." },
  { year:661, label:'Umayyad Caliphate',         lat:33.51, lng:36.29, r:35, color:'#1a3462', note:"Ali martyred. Muawiyah unifies. Capital moves to Damascus." },
  { year:674, label:'First Siege of Constantinople', lat:41.01, lng:28.96, r:14, color:'#5a2080', note:"Abu Ayyub al-Ansari dies here aged ~90." },
  { year:680, label:'Karbala',                   lat:32.61, lng:44.03, r:12, color:'#8b1010', note:"Husayn ibn Ali martyred with 72 companions." },
  { year:692, label:'Islamic world 692 CE',      lat:27.0,  lng:38.0,  r:42, color:'#d4a017', note:"From Spain to Central Asia — Islam spans the known world." },
];

// ─── Burial Coordinates ─────────────────────────────────
export interface BurialCoord { lat: number; lng: number; label: string; }

export const BURIAL_COORDS: Record<string, BurialCoord> = {
  'Medina':                                                  { lat:24.47, lng:39.61, label:'Medina' },
  'Masjid al-Nabawi, Medina':                               { lat:24.47, lng:39.61, label:'Medina' },
  'Jannat al-Baqi, Medina':                                 { lat:24.47, lng:39.60, label:'Al-Baqi, Medina' },
  'Al-Baqi, Medina':                                        { lat:24.47, lng:39.60, label:'Al-Baqi, Medina' },
  'Uhud Mountain, Medina':                                  { lat:24.51, lng:39.62, label:'Uhud, Medina' },
  'Uhud, Medina':                                           { lat:24.51, lng:39.62, label:'Uhud, Medina' },
  'Uhud, Medina — beside the martyrs':                      { lat:24.51, lng:39.62, label:'Uhud, Medina' },
  'Mecca':                                                  { lat:21.39, lng:39.86, label:'Mecca' },
  "Jannat al-Mu'alla, Mecca":                               { lat:21.40, lng:39.85, label:'Mecca' },
  'Wadi Mecca':                                             { lat:21.39, lng:39.86, label:'Mecca' },
  'Taif, Saudi Arabia':                                     { lat:21.27, lng:40.42, label:"Ta'if" },
  'Al-Rabadha, Saudi Arabia':                               { lat:24.93, lng:41.55, label:'Al-Rabadha' },
  'Yamama, Arabia':                                         { lat:24.09, lng:47.31, label:'Yamama' },
  'Yamama, Saudi Arabia':                                   { lat:24.09, lng:47.31, label:'Yamama' },
  'Yamama (place of martyrdom)':                            { lat:24.09, lng:47.31, label:'Yamama' },
  'Arabia':                                                 { lat:23.5,  lng:45.0,  label:'Arabia' },
  "Ta'nim (outside Mecca) — crucifixion site":              { lat:21.43, lng:39.79, label:"Ta'nim" },
  'Basra, Iraq':                                            { lat:30.51, lng:47.78, label:'Basra' },
  'Kufa, Iraq':                                             { lat:32.03, lng:44.40, label:'Kufa' },
  'Kufa, Iraq (or Medina — sources differ)':                { lat:32.03, lng:44.40, label:'Kufa' },
  'Najaf, Iraq':                                            { lat:31.99, lng:44.33, label:'Najaf' },
  'Karbala, Iraq':                                          { lat:32.62, lng:44.03, label:'Karbala' },
  'Ctesiphon (Salman Pak), Iraq':                           { lat:33.09, lng:44.58, label:'Ctesiphon' },
  "Ctesiphon (Mada'in), Iraq":                              { lat:33.09, lng:44.58, label:'Ctesiphon' },
  "Al-Mada'in, Iraq":                                       { lat:33.09, lng:44.58, label:'Ctesiphon' },
  'Siffin, Syria':                                          { lat:35.85, lng:38.82, label:'Siffin' },
  'Damascus, Syria':                                        { lat:33.51, lng:36.29, label:'Damascus' },
  'Damascus, Syria (Bab al-Saghir cemetery)':               { lat:33.51, lng:36.29, label:'Damascus' },
  'Bab al-Saghir Cemetery, Damascus':                       { lat:33.51, lng:36.29, label:'Damascus' },
  'Homs, Syria':                                            { lat:34.73, lng:36.71, label:'Homs' },
  'Homs, Syria (or Medina — sources differ)':               { lat:34.73, lng:36.71, label:'Homs' },
  'Syria':                                                  { lat:34.8,  lng:38.0,  label:'Syria' },
  'Syria (battlefield burial)':                             { lat:34.5,  lng:37.0,  label:'Syria' },
  'Syria (died in Amwas plague)':                           { lat:31.80, lng:34.98, label:'Amwas, Palestine' },
  'Bayt al-Maqdis (Jerusalem), Palestine':                  { lat:31.78, lng:35.23, label:'Jerusalem' },
  'Palestine':                                              { lat:31.90, lng:35.20, label:'Palestine' },
  'Jordan (died of Amwas plague)':                          { lat:31.80, lng:34.98, label:'Amwas' },
  'Jordan Valley (Amwas plague)':                           { lat:31.80, lng:34.98, label:'Amwas' },
  'Jordan Valley (died in Amwas plague)':                   { lat:31.80, lng:34.98, label:'Amwas' },
  "Mu'tah, Jordan":                                         { lat:31.09, lng:35.76, label:"Mu'tah" },
  'Muqattam Hill, Cairo, Egypt':                            { lat:30.00, lng:31.26, label:'Cairo' },
  'Egypt or Taif':                                          { lat:26.0,  lng:30.0,  label:'Egypt' },
  'Egypt or Syria (sources differ)':                        { lat:29.0,  lng:33.0,  label:'Egypt/Syria' },
  'Nihawand, Persia (modern Iran)':                         { lat:34.77, lng:48.37, label:'Nihawand, Iran' },
  'Ahvaz, Iran':                                            { lat:31.32, lng:48.68, label:'Ahvaz, Iran' },
  'Constantinople (Istanbul), Turkey — Eyüp Sultan Mosque': { lat:41.02, lng:28.93, label:'Istanbul' },
  'Larnaca, Cyprus — Hala Sultan Tekke Mosque':             { lat:34.87, lng:33.61, label:'Cyprus' },
  'Mediterranean Sea (on naval expedition)':                { lat:35.0,  lng:25.0,  label:'Mediterranean Sea' },
  'Sarif, near Mecca (where she was married)':              { lat:21.5,  lng:39.8,  label:'near Mecca' },
};

// ─── Conversion Waves ───────────────────────────────────
export interface WaveDef {
  label: string; sub: string; color: string; wcolor: string;
}

export const WAVE_DEFS: WaveDef[] = [
  { label:'First — Khadijah Alone',      sub:'610 CE',  color:'#d4a017', wcolor:'rgba(212,160,23,.12)' },
  { label:'Sabiqun — First Believers',   sub:'610–613', color:'#b8860b', wcolor:'rgba(184,134,11,.12)' },
  { label:'Hamza, Umar & Cohort',        sub:'614–616', color:'#8b3a08', wcolor:'rgba(139,58,8,.10)' },
  { label:'Abyssinia & Pre-Hijra',       sub:'617–622', color:'#7a3060', wcolor:'rgba(122,48,96,.09)' },
  { label:'The Ansar — After Hijra',     sub:'622–624', color:'#0a3d2e', wcolor:'rgba(10,61,46,.10)' },
  { label:'Khaybar to Hudaybiyya',       sub:'625–628', color:'#1a3462', wcolor:'rgba(26,52,98,.09)' },
  { label:'Before & During Conquest',   sub:'629–630', color:'#5c1010', wcolor:'rgba(92,16,16,.09)' },
  { label:'Born or Raised Muslim',      sub:'N/A',     color:'#4a7020', wcolor:'rgba(74,112,32,.09)' },
];

// rank → wave index
export const CONV_WAVE_MAP: Record<number, number> = {
  17:0,
  1:1, 3:1, 4:1,
  8:1, 13:1, 10:1, 11:1, 14:1, 15:1, 16:1, 23:1, 24:1, 27:1, 28:1,
  2:2, 12:2, 20:2, 30:2, 34:2, 35:2, 38:2, 39:2, 41:2,
  22:3, 37:3,
  31:4, 32:4, 33:4, 36:4, 40:4, 42:4, 25:4, 26:4, 18:4, 19:4, 29:4,
  6:6, 48:6, 7:6, 44:6, 43:6, 50:6,
  5:7, 21:7, 9:7,
};

// ─── Role definitions ────────────────────────────────────
export interface RoleDef {
  key: string; icon: string; label: string; color: string; desc: string;
}

export const ROLE_DEFS: RoleDef[] = [
  { key:'caliph',   icon:'👑', label:'Caliphs',   color:'#b8860b', desc:'Rulers of the Islamic state after the Prophet ﷺ' },
  { key:'warrior',  icon:'⚔️', label:'Warriors',  color:'#8b1a38', desc:'Military commanders and frontline fighters' },
  { key:'scholar',  icon:'📚', label:'Scholars',  color:'#1a3462', desc:'Islamic jurisprudents and teachers' },
  { key:'wife',     icon:'🌹', label:'Wives',     color:'#7a3060', desc:'Mothers of the Believers — wives of the Prophet ﷺ' },
  { key:'narrator', icon:'📜', label:'Narrators', color:'#0a3d2e', desc:'Primary hadith transmitters' },
  { key:'martyr',   icon:'☽',  label:'Martyrs',  color:'#5c1010', desc:'Companions who died in the path of Allah' },
  { key:'general',  icon:'🏛', label:'Generals', color:'#3d2a0a', desc:'Military strategists and expedition leaders' },
  { key:'other',    icon:'✨', label:'Others',   color:'#888888', desc:'Other notable companions and their unique contributions' },
];

// ─── Key Battles (Battle Matrix) ────────────────────────
export const KEY_BATTLES = [
  'Battle of Badr','Battle of Uhud','Battle of Khandaq','Battle of Khaybar',
  'Battle of Hunayn','Battle of Tabuk','Battle of Yarmouk','Battle of Qadisiyyah',
  'Battle of the Camel','Battle of Siffin',
] as const;

export const BATTLE_SHORT: Record<string, string> = {
  'Battle of Badr':'Badr','Battle of Uhud':'Uhud','Battle of Khandaq':'Khandaq',
  'Battle of Khaybar':'Khaybar','Battle of Hunayn':'Hunayn','Battle of Tabuk':'Tabuk',
  'Battle of Yarmouk':'Yarmouk','Battle of Qadisiyyah':'Qadisiyyah',
  'Battle of the Camel':'The Camel','Battle of Siffin':'Siffin',
};

export const BATTLE_YEAR: Record<string, number> = {
  'Battle of Badr':624,'Battle of Uhud':625,'Battle of Khandaq':627,
  'Battle of Khaybar':628,'Battle of Hunayn':630,'Battle of Tabuk':630,
  'Battle of Yarmouk':636,'Battle of Qadisiyyah':636,
  'Battle of the Camel':656,'Battle of Siffin':657,
};

