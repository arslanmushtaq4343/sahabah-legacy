/* ─────────────────────────────────────────────────────────────────────────
   Imams Page — Enrichment Data
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   AL-JARH WA AL-TA'DIL  (Feature 33)
   Classical narrator reliability assessments
   ═════════════════════════════════════════════════════════════════════ */
export interface JarhTadilEntry {
  scholarName: string;
  scholarAr: string;
  died: string;
  rating: 'thiqah' | 'sadouq' | 'layyinul-hadith' | 'daif' | 'majhul' | 'hasan';
  ratingAr: string;
  ratingEn: string;
  assessedBy: { critic: string; verdict: string; verdictAr: string }[];
  specialStatus?: string;
}

export const JARH_TADIL: Record<string, JarhTadilEntry[]> = {
  hf: [
    {
      scholarName: 'Abu Hanifa al-Numan', scholarAr: 'أبو حنيفة النعمان', died: '150 AH',
      rating: 'sadouq',
      ratingAr: 'صدوق', ratingEn: 'Truthful — hadiths accepted with review of chain',
      assessedBy: [
        { critic: 'Yahya ibn Maʿin',   verdict: "He was truthful (ṣadūq) in hadith — but gave priority to qiyās when hadith was weak in his view", verdictAr: 'كان صدوقاً' },
        { critic: 'Ibn Abi Hatim al-Razi', verdict: 'Not the strongest in hadith — but his fiqh is the most systematic of all imams', verdictAr: 'ليس بالقوي في الحديث' },
        { critic: 'Imam al-Dhahabi',   verdict: 'The imam of the imams in fiqh — but hadith transmission is not his primary legacy', verdictAr: 'إمام الأئمة في الفقه' },
        { critic: 'Ibn Hajar al-Asqalani', verdict: 'His fiqh methodology preserved by students in Ẓāhir al-Riwāya — a complete and verified legal corpus', verdictAr: 'حفظ فقهه أصحابه' },
      ],
      specialStatus: 'Al-Imam al-Aʿẓam — his status in fiqh is undisputed even by those who critique his hadith transmission',
    },
    {
      scholarName: 'Abu Yusuf al-Qadi', scholarAr: 'أبو يوسف القاضي', died: '182 AH',
      rating: 'thiqah', ratingAr: 'ثقة', ratingEn: 'Trustworthy — hadith accepted',
      assessedBy: [
        { critic: 'Yahya ibn Maʿin', verdict: 'Thiqah — trustworthy', verdictAr: 'ثقة' },
        { critic: 'Ahmad ibn Hanbal', verdict: 'I wrote hadith from Abu Yusuf — he was careful with isnad', verdictAr: 'كتبت عنه الحديث وكان متحرياً' },
      ],
    },
    {
      scholarName: 'Muhammad al-Shaybani', scholarAr: 'محمد الشيباني', died: '189 AH',
      rating: 'sadouq', ratingAr: 'صدوق', ratingEn: 'Truthful with minor weakness in memory',
      assessedBy: [
        { critic: 'Imam al-Shafii', verdict: "I carried from Muhammad al-Shaybani camel-loads of knowledge — he was the ocean of fiqh", verdictAr: 'حملت من محمد الشيباني وقر بعير' },
        { critic: 'Yahya ibn Maʿin', verdict: 'There is some weakness in his memory of hadith', verdictAr: 'فيه ضعف في الحفظ' },
      ],
    },
  ],
  ml: [
    {
      scholarName: 'Imam Malik ibn Anas', scholarAr: 'مالك بن أنس', died: '179 AH',
      rating: 'thiqah',
      ratingAr: 'إمام ثبت حجة', ratingEn: 'Imam — Firm, a Proof in Hadith',
      assessedBy: [
        { critic: 'Yahya ibn Maʿin',     verdict: "Malik is the most reliable of all narrators from al-Zuhri — he is the imam of the imams", verdictAr: 'مالك أثبت الناس في الزهري' },
        { critic: 'Imam al-Shafii',     verdict: "When scholars are mentioned, Malik is a star. No isnad in the world is more authentic than Malik → Nafi' → Ibn Umar", verdictAr: 'إذا ذُكر العلماء فمالك النجم' },
        { critic: 'Ahmad ibn Hanbal',   verdict: "Malik is the imam of Muslims in our time. I have not seen anyone more God-fearing in transmitting hadith than Malik", verdictAr: 'مالك إمام المسلمين في وقتنا' },
        { critic: 'Ibn Mahdī',          verdict: "The four most precise hadith scholars: Malik, al-Awzāʿī, al-Thawrī, and Hammād ibn Zayd — and Malik is the most precise of them", verdictAr: 'أتقن أهل الحديث أربعة، مالك أتقنهم' },
      ],
      specialStatus: '"Silsilat al-Dhahab" — The Golden Chain: Malik → Nafi → Ibn Umar → Prophet ﷺ. The most authentic chain in all of Islamic scholarship.',
    },
  ],
  sf: [
    {
      scholarName: "Imam al-Shafi'i", scholarAr: 'الإمام الشافعي', died: '204 AH',
      rating: 'thiqah',
      ratingAr: 'ثقة حافظ إمام', ratingEn: 'Trustworthy, Memorizer, Imam',
      assessedBy: [
        { critic: 'Ahmad ibn Hanbal',   verdict: "Al-Shafi'i was the most precise person in Quran and Sunnah in our time. His chain to the Prophet ﷺ is among the shortest", verdictAr: 'كان الشافعي أفقه الناس في كتاب الله وسنة رسوله' },
        { critic: 'Yahya ibn Maʿin',     verdict: "Al-Shafi'i is thiqah (trustworthy). I never heard anyone speak ill of him", verdictAr: 'الشافعي ثقة' },
        { critic: 'Ibn Hibbān',          verdict: "He memorized the Quran at 7, memorized the Muwatta at 10, and authored al-Risala at 15 — the first systematic work in Islamic legal theory", verdictAr: 'حفظ القرآن وهو في السابعة' },
      ],
      specialStatus: 'Author of al-Risala — the first book ever written on the science of Usul al-Fiqh (Islamic legal methodology)',
    },
  ],
  hb: [
    {
      scholarName: 'Imam Ahmad ibn Hanbal', scholarAr: 'الإمام أحمد بن حنبل', died: '241 AH',
      rating: 'thiqah',
      ratingAr: 'إمام ثبت حافظ', ratingEn: 'Imam — Firm, a Memorizer of Hadith',
      assessedBy: [
        { critic: 'Imam al-Shafii',      verdict: "I left Baghdad and there was no one more pious, more learned in fiqh, or more God-fearing than Ahmad ibn Hanbal", verdictAr: 'ما خلفت ببغداد أتقى من أحمد بن حنبل' },
        { critic: 'Yahya ibn Maʿin',     verdict: "Ahmad ibn Hanbal is not in need of my endorsement — he is an imam", verdictAr: 'أحمد لا يحتاج إلى تزكيتي، هو إمام' },
        { critic: 'Ali ibn al-Madini',   verdict: "Ahmad memorized one million hadiths — I have not seen his equal in knowledge of Sunnah", verdictAr: 'لم أر أحداً أعلم بالسنة منه' },
        { critic: 'Imam al-Dhahabi',     verdict: "Ahmad ibn Hanbal is the imam of the Muslims in his age, the Proof of Islam. Whoever knows his life knows he is the greatest proof that the Sunnah is preserved", verdictAr: 'هو إمام المسلمين وحجة الإسلام' },
      ],
      specialStatus: 'Musnad Ahmad: the single largest hadith collection in history — ~28,000 hadiths organized by companion. Endured 3 years of torture under the Mutazilite Mihna (Inquisition) rather than affirm the Quran was created.',
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   PROPHET'S HOUSEHOLD STAFF  (Feature 47)
   ═════════════════════════════════════════════════════════════════════ */
export interface HouseholdMember {
  name: string;
  nameAr: string;
  role: string;
  roleCategory: 'servant' | 'freed-slave' | 'scribe' | 'caller' | 'muezzin' | 'guard' | 'cook' | 'nurse';
  origin?: string;
  notes: string;
  source: string;
  specialHonor?: string;
}

export const HOUSEHOLD_STAFF: HouseholdMember[] = [
  {
    name: 'Anas ibn Malik', nameAr: 'أنس بن مالك', role: "Personal servant for 10 years in Medina",
    roleCategory: 'servant', origin: 'Medina (Ansar)',
    notes: "Brought by his mother Umm Sulaym at age 10. The Prophet ﷺ never once scolded him in 10 years. Narrated 2,286 hadiths — making him the 3rd largest narrator in history. Died ~712 CE aged ~100.",
    source: "Bukhari 6038; Muslim 2309",
    specialHonor: "The Prophet ﷺ prayed for him: 'O Allah, give him wealth and children and bless him.' His wealth and progeny multiplied extraordinarily.",
  },
  {
    name: 'Bilal ibn Rabah', nameAr: 'بلال بن رباح', role: "First Muezzin of Islam — personal caller to prayer",
    roleCategory: 'muezzin', origin: 'Abyssinia (freed slave)',
    notes: "Freed from torture by Abu Bakr. Personal muezzin of the Prophet ﷺ. After the Prophet's ﷺ death, could not bear to give adhan — moved to Syria and gave adhan only twice more in his life.",
    source: "Bukhari 604; Ibn Hisham Seerah",
    specialHonor: "Prophet ﷺ heard Bilal's footsteps in Jannah. First to call adhan on top of the Ka'ba at Conquest of Mecca. Called 'Sayyid al-Mu'azzineen' — Master of those who call to prayer.",
  },
  {
    name: 'Zayd ibn Haritha', nameAr: 'زيد بن حارثة', role: "Adopted son — personal companion and commander",
    roleCategory: 'servant', origin: 'Kalb tribe (freed slave)',
    notes: "Captured as a child, bought by Khadija, given to the Prophet ﷺ. Prophet ﷺ freed and adopted him — he was called 'Zayd ibn Muhammad' until the Quran ended the practice of adoption (33:37). First commander at Battle of Mutah.",
    source: "Quran 33:37; Ibn Hisham Seerah",
    specialHonor: "Only companion named in the Quran by first name. Prophet ﷺ announced his death in real-time to Medina while the battle was still fought 800 km away.",
  },
  {
    name: "Rabi'ah ibn Ka'b al-Aslami", nameAr: "ربيعة بن كعب الأسلمي", role: "Night servant — prepared water and served at night",
    roleCategory: 'servant', origin: 'Aslam tribe',
    notes: "When the Prophet ﷺ asked what he wished for, he requested: 'Your companionship in Paradise.' The Prophet ﷺ said: 'Help me against your own soul with much prostration.'",
    source: "Muslim 489",
    specialHonor: "Prophet ﷺ granted him his wish of companionship in Paradise in exchange for frequent sujud.",
  },
  {
    name: 'Umm Ayman (Barakah)', nameAr: 'أم أيمن (بركة)', role: "Nursemaid and household caretaker",
    roleCategory: 'nurse', origin: 'Abyssinia (freed slave)',
    notes: "Was the nursemaid of the Prophet ﷺ as an infant. Outlived him. He used to call her 'my mother after my mother' (ummi baʿda ummi). She wept bitterly at his death — when asked why, she said: 'I knew he would die — I weep because revelation has ended.'",
    source: "Muslim 2454; Ibn Hisham Seerah",
    specialHonor: "The only person alive who knew the Prophet ﷺ from his infancy to his death. Called 'the woman of Paradise' by the Prophet ﷺ.",
  },
  {
    name: 'Zayd ibn Thabit', nameAr: 'زيد بن ثابت', role: "Personal scribe — wrote Quranic revelation",
    roleCategory: 'scribe', origin: 'Medina (Ansar)',
    notes: "Became the Prophet's ﷺ personal secretary at age 11. Wrote Quranic verses as they were revealed. Later compiled the first written Quran under Abu Bakr and standardized it under Uthman.",
    source: "Bukhari 4986; Tirmidhi 3103",
    specialHonor: "The Prophet ﷺ said: 'The most learned of my Ummah in the laws of inheritance is Zayd ibn Thabit.' He was given the pen — a divine metaphor — as his legacy.",
  },
  {
    name: 'Abdullah ibn Masud', nameAr: 'عبد الله بن مسعود', role: "Personal attendant — custodian of sandals and miswak",
    roleCategory: 'servant', origin: 'Hudhail tribe',
    notes: "Was the Prophet's ﷺ personal attendant — held his sandals, brought his miswak, served as his closest daily companion. The Prophet ﷺ said: 'If you want to recite Quran as fresh as it was revealed, recite it as Ibn Masud recites.'",
    source: "Bukhari 4713; Muslim 2461",
    specialHonor: "Was given the Prophet's ﷺ personal miswak — a sacred trust. First to recite Quran publicly in Mecca despite being beaten.",
  },
  {
    name: 'Salim Mawla Abi Hudhayfa', nameAr: 'سالم مولى أبي حذيفة', role: "Freed slave who led prayer over the Muhajiroon",
    roleCategory: 'freed-slave', origin: 'Unknown (freed slave)',
    notes: "The Prophet ﷺ commanded senior companions to 'take the Quran from four people' — Salim was one. He led prayer over Abu Bakr, Umar, and Abu Hudhayfa. Died at Yamama battle reciting Surah al-Baqarah.",
    source: "Bukhari 3758; Muslim 2464",
    specialHonor: "One of four named by the Prophet ﷺ as Quran authorities. A freed slave leading prayers over the Khulafa' al-Rashidun — a testament to Islam's meritocracy.",
  },
  {
    name: 'Abu Kabsha al-Ansari', nameAr: 'أبو كبشة الأنصاري', role: "Household attendant in Medina",
    roleCategory: 'servant', origin: 'Medina (Ansar)',
    notes: "Attended the Prophet ﷺ closely in Medina. The Prophet ﷺ referred to him as a sign of what true service means — giving oneself completely without expectation of status.",
    source: "Ibn Sa'd, Tabaqat al-Kubra 4/170",
  },
  {
    name: 'Miqdad ibn al-Aswad', nameAr: 'المقداد بن الأسود', role: "Personal guard and horseman",
    roleCategory: 'guard', origin: 'Yemen (freed slave)',
    notes: "First horseman in Islamic warfare. Personal companion and guard of the Prophet ﷺ. At Badr, when the Prophet ﷺ asked for counsel, only Miqdad and two others spoke — he said: 'Lead us, O Messenger — we will not say what the Children of Israel said to Musa.'",
    source: "Bukhari 4609; Muslim 1779",
    specialHonor: "One of the first six Muslims. The Prophet ﷺ said: 'Allah commanded me to love four people, and told me He loves them: Ali, Miqdad, Abu Dharr, and Salman.'",
  },
  {
    name: 'Shurayh ibn Hani', nameAr: 'شريح بن هانئ', role: "Served water and wudu to the Prophet ﷺ",
    roleCategory: 'servant', origin: 'Yemen',
    notes: "Specialized in preparing wudu water for the Prophet ﷺ. The Prophet ﷺ prayed for him specifically, saying 'may Allah bless your hand' after he served wudu exceptionally.",
    source: "Abu Dawud 3202; Nasa'i transmissions",
  },
  {
    name: "Kharijah ibn Zayd", nameAr: "خارجة بن زيد", role: "Served in the household after the Prophet ﷺ",
    roleCategory: 'servant', origin: 'Medina (Ansar)',
    notes: "Son of Zayd ibn Thabit. Continued service to the Prophet's ﷺ household after his father. Became a leading fiqh scholar in Medina and was one of the Seven Fuqaha (Jurists) of Medina.",
    source: "Ibn Sa'd Tabaqat 5/268",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   SAHABIYYAT — WOMEN COMPANIONS  (Feature 36)
   ═════════════════════════════════════════════════════════════════════ */
export interface Sahabiyyah {
  id: number;
  name: string;
  nameAr: string;
  title?: string;
  category: 'wife' | 'scholar' | 'warrior' | 'martyr' | 'narrator' | 'companion';
  color: string;
  born?: string;
  died?: string;
  origin?: string;
  hadiths?: number;
  bio: string;
  distinction: string;
  source: string;
}

export const SAHABIYYAT: Sahabiyyah[] = [
  { id:1,  name:'Khadijah bint Khuwaylid', nameAr:'خديجة بنت خويلد', title:'Umm al-Mu\'minin al-Kubra', category:'wife',     color:'#b8860b', born:'~555 CE', died:'619 CE', origin:'Mecca', hadiths:0,   bio:"The Prophet's ﷺ first wife, first believer, and greatest supporter. A successful businesswoman who proposed marriage to the Prophet ﷺ at age 40. She was the first human being to accept Islam.", distinction:'First Muslim in history. Her wealth funded early Islam entirely. The Prophet ﷺ never married another during her life. Angel Jibreel conveyed Allah\'s salaam to her personally.', source:'Bukhari 3820; Muslim 2432' },
  { id:2,  name:'Aisha bint Abi Bakr',     nameAr:'عائشة بنت أبي بكر', title:'Umm al-Mu\'minin', category:'scholar',  color:'#7a3060', born:'613 CE', died:'678 CE', origin:'Mecca', hadiths:2210, bio:"Wife of the Prophet ﷺ and the greatest female scholar in Islamic history. Narrated 2,210 hadiths. Taught companions, corrected caliphs, and issued legal rulings for 40 years after the Prophet's ﷺ death.", distinction:'The only virgin wife of the Prophet ﷺ. Quran was revealed in her room. The Prophet ﷺ died with his head in her lap. She corrected 76 companion opinions in fiqh.', source:'Bukhari 3775; Muslim 2436' },
  { id:3,  name:'Fatima bint Muhammad',    nameAr:'فاطمة بنت محمد',    title:'Sayyidat Nisa al-Jannah', category:'companion', color:'#0a3d2e', born:'605 CE', died:'632 CE', origin:'Mecca', hadiths:18,  bio:'Youngest daughter of the Prophet ﷺ. Called the "Leader of the Women of Paradise" and the Prophet\'s ﷺ favorite child. She survived the Prophet ﷺ by only 6 months.', distinction:'The Prophet ﷺ stood when she entered and said "part of me" (bud\'ah minni). The line of the Prophet ﷺ continues through her alone — every Sayyid on earth is her descendant.', source:'Bukhari 3714; Muslim 2449' },
  { id:4,  name:'Hafsa bint Umar',         nameAr:'حفصة بنت عمر',     title:'Umm al-Mu\'minin', category:'scholar',  color:'#8b3a08', born:'605 CE', died:'665 CE', origin:'Mecca', hadiths:60,  bio:"Wife of the Prophet ﷺ and the guardian of the first written Quran. The Prophet ﷺ divorced her then took her back after Angel Jibreel told him she was 'a woman who fasts much.'", distinction:'Was entrusted with the master Quran manuscript compiled by Abu Bakr. The Uthmani mushaf was copied from HER copy. She is the indirect guardian of the Quran for all humanity.', source:'Bukhari 4986; Ibn Sa\'d Tabaqat' },
  { id:5,  name:'Umm Salamah',             nameAr:'أم سلمة',          title:'Umm al-Mu\'minin', category:'scholar',  color:'#2a5080', born:'~596 CE',died:'680 CE', origin:'Mecca', hadiths:378, bio:"The last wife of the Prophet ﷺ to die. One of the most prolific female narrators. Emigrated to Abyssinia then Medina. The Prophet ﷺ valued her counsel in the Treaty of Hudaybiyyah.", distinction:'Her advice at Hudaybiyyah averted a crisis — the Prophet ﷺ acted on it and all companions followed. 378 hadiths. Still issuing legal opinions until age 84.', source:'Bukhari 2731; Muslim 2449' },
  { id:6,  name:'Zaynab bint Khuzayma',    nameAr:'زينب بنت خزيمة',   title:'Umm al-Masakin', category:'wife',     color:'#509070', born:'~590 CE',died:'624 CE', origin:'Arabia',hadiths:0,   bio:"Called 'Mother of the Poor' (Umm al-Masakin) for her extreme generosity. A wife of the Prophet ﷺ who died only 2–3 months after marriage — the shortest of all marriages.", distinction:'Her title "Umm al-Masakin" was given before Islam — she was known for feeding the poor her entire life. The Prophet ﷺ buried her himself.', source:'Ibn Sa\'d Tabaqat 8/115' },
  { id:7,  name:'Maymuna bint al-Harith',  nameAr:'ميمونة بنت الحارث',title:'Umm al-Mu\'minin', category:'wife',     color:'#7a5500', born:'~594 CE',died:'673 CE', origin:'Arabia',hadiths:46,  bio:"The last woman the Prophet ﷺ married. The Prophet ﷺ freed her from the obligation of entering his chamber — she requested to stay. Lived 40 years after his death.", distinction:'The Prophet ﷺ married her on his deathbed illness-era while in ihram — generating one of the most discussed fiqh cases. Her nephew Ibn Abbas became the greatest Quran scholar.', source:'Muslim 1410; Ibn Sa\'d Tabaqat 8/134' },
  { id:8,  name:"Umm 'Atiyya al-Ansariyyah", nameAr:"أم عطية الأنصارية", category:'warrior', color:'#8b1a38', born:'unknown', died:'unknown', origin:'Medina',hadiths:40,  bio:"Participated in 7 military expeditions. Prepared food, treated wounded, cared for sick, and participated in battles alongside the Prophet ﷺ.", distinction:'The Prophet ﷺ gave her permission to join battles. "I participated in 7 ghazawat with the Prophet ﷺ." She washed the body of the Prophet\'s ﷺ daughter Zaynab at death.', source:'Bukhari 2882; Muslim 1679' },
  { id:9,  name:'Nusayba bint Ka\'ab',     nameAr:"نسيبة بنت كعب",    title:'Umm Umarah', category:'warrior',  color:'#5c1010', born:'unknown', died:'~640 CE', origin:'Medina',hadiths:0,   bio:"The greatest female warrior in Islamic history. At Uhud, when all men fled, she physically shielded the Prophet ﷺ with her body, fighting off attackers with sword and bow.", distinction:'Received 13 wounds at Uhud. The Prophet ﷺ said: "Everywhere I turned at Uhud, I saw Nusayba fighting to protect me." Fought at Yamama at age 60, lost her hand, and survived.', source:'Ibn Sa\'d Tabaqat 8/412; Ibn Hisham Seerah' },
  { id:10, name:'Sumayya bint Khayyat',    nameAr:"سمية بنت خياط",    title:'Awwal Shahidah', category:'martyr',   color:'#8b1a38', born:'unknown', died:'~615 CE', origin:'Mecca', hadiths:0,   bio:"First martyr in the history of Islam. An elderly freed slave woman with no tribal protection. Refused to recant Islam despite horrific torture. Killed by Abu Jahl with his own spear.", distinction:'The Prophet ﷺ passed by her family being tortured and said "Be patient, O family of Yasir — your meeting place is Paradise." She and her husband Yasir are Islam\'s first martyrs.', source:'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat 8/206' },
  { id:11, name:"Umm Sulaym bint Milhan", nameAr:"أم سليم بنت ملحان", category:'scholar',  color:'#1a3462', born:'unknown', died:'~640 CE', origin:'Medina',hadiths:17,  bio:"Mother of Anas ibn Malik. When her first husband refused to accept Islam, she divorced him on grounds of faith alone. When her husband al-Nadr died, she asked the Prophet ﷺ for marriage — whose mahr was 'your acceptance of Islam.'", distinction:'The Prophet ﷺ visited her home regularly. Carried a sword to battle. When her son died, kept it secret from her husband until after he ate, then told him — a story the Prophet ﷺ called the greatest act of patience he had witnessed.', source:'Bukhari 5470; Muslim 917' },
  { id:12, name:'Asma bint Abi Bakr',     nameAr:"أسماء بنت أبي بكر",  title:'Dhat al-Nitaqayn', category:'narrator', color:'#b8860b', born:'595 CE', died:'692 CE', origin:'Mecca', hadiths:58, bio:"Daughter of Abu Bakr. Called 'Dhat al-Nitaqayn' (She of the Two Belts) for tearing her belt to tie provisions for the Prophet ﷺ at the Hijra. Died at age 97.", distinction:'Her son Abdullah ibn Zubayr was the last Caliph of the companion era. When he was crucified at the Ka\'ba, she walked to see him despite blindness at 97 and said: "An assassin does not shame the one killed." Died 3 days after her son.', source:'Bukhari 3905; Muslim 2007' },
  { id:13, name:'Zaynab bint Ali',         nameAr:"زينب بنت علي",      category:'companion', color:'#0a3d2e', born:'626 CE', died:'682 CE', origin:'Medina',hadiths:0,   bio:"Granddaughter of the Prophet ﷺ, daughter of Ali and Fatima. Witnessed the massacre at Karbala (680 CE) and gave the famous speech in Yazid's court — one of the most powerful speeches in Islamic history.", distinction:'Her speech in Yazid\'s court: "Do you think, O Yazid, that we have become contemptible in your sight? I swear by Allah — we are the family of the Prophet and the light of revelation." Established public mourning of Karbala.', source:'Al-Tabari History; Ibn Athir' },
  { id:14, name:'Rufayda al-Aslamiyya',    nameAr:'رفيدة الأسلمية',    category:'warrior',  color:'#509070', born:'unknown', died:'unknown', origin:'Medina',hadiths:0,   bio:"The first nurse in Islamic history and the world's first battlefield nurse. The Prophet ﷺ gave her a specific area inside the mosque for her medical tent during battles.", distinction:'At the Battle of Khandaq, the Prophet ﷺ specifically commanded the wounded to be taken to Rufayda. She established field medicine 1,200 years before Florence Nightingale.', source:'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat 8/216' },
  { id:15, name:'Khawla bint Thalaba',     nameAr:"خولة بنت ثعلبة",   category:'scholar',  color:'#7a3060', born:'unknown', died:'~640 CE', origin:'Medina',hadiths:3,   bio:"The woman whose argument directly led to the revelation of Surah al-Mujadila (Chapter 58 of the Quran). Her husband declared zihar (a pre-Islamic divorce that was oppressive). She argued her case directly to Allah — and Allah answered.", distinction:'Quran 58:1 opens: "Allah has heard the argument of the woman who disputes with you concerning her husband and directs her complaint to Allah." Allah took her side. She argued before the Prophet ﷺ and Allah.', source:'Quran 58:1-4; Abu Dawud 2214' },
  { id:16, name:'Umm Waraqa al-Ansariyya',nameAr:"أم ورقة الأنصارية", category:'scholar',  color:'#2a5080', born:'unknown', died:'~644 CE', origin:'Medina',hadiths:0,   bio:"Had memorized the entire Quran. The Prophet ﷺ personally visited her and appointed her to lead prayer over the women and men of her entire household — an extraordinary honor.", distinction:'The Prophet ﷺ would visit her and call her "al-Shahida" — the witness/martyr — even before her death, as if foretelling her martyrdom. She was murdered by her servants.', source:'Abu Dawud 591; Ibn Sa\'d Tabaqat 8/454' },
  { id:17, name:'Hind bint Utba',          nameAr:"هند بنت عتبة",      category:'companion', color:'#8b3a08', born:'unknown', died:'~641 CE', origin:'Mecca', hadiths:0,   bio:"The most dramatic conversion in Islamic history. She mutilated Hamza's body at Uhud. Became Muslim at the Conquest of Mecca. The Prophet ﷺ accepted her Islam despite her past.", distinction:'The Prophet ﷺ said to her at the Conquest: "Welcome." She accepted and became a practicing Muslim. Her later sincerity was attested by companions. Her son Muawiyah became the first Umayyad Caliph.', source:'Ibn Hisham Seerah; Bukhari 4185' },
  { id:18, name:'Umm Haram bint Milhan',   nameAr:"أم حرام بنت ملحان", category:'warrior',  color:'#1a3462', born:'unknown', died:'649 CE', origin:'Medina',hadiths:3,   bio:"Participated in the first Islamic naval expedition to Cyprus in 649 CE. The Prophet ﷺ had predicted she would be among the first to sail for Islam — a prophecy she lived to fulfill.", distinction:'Prophet ﷺ prayed for her to be among the first Islamic naval warriors. She was martyred on the island of Cyprus and is buried there — the Hala Sultan Tekke mosque marks her grave today.', source:'Bukhari 2877; Muslim 1912' },
  { id:19, name:'Umm Kulthum bint Ali',    nameAr:"أم كلثوم بنت علي",  category:'companion', color:'#509070', born:'~627 CE',died:'~680 CE', origin:'Medina',hadiths:0,   bio:"Daughter of Ali and Fatima, granddaughter of the Prophet ﷺ. Married Umar ibn al-Khattab — a marriage that united the greatest families of Islam.", distinction:'The union of the house of Fatima and the house of Umar — through her — is seen as a spiritual reconciliation between the two greatest figures of early Islam.', source:'Tabaqat Ibn Sa\'d 8/337' },
  { id:20, name:'Rubayyi bint Muawwidh',   nameAr:"ربيع بنت معوذ",    category:'narrator', color:'#b8860b', born:'unknown', died:'unknown', origin:'Medina',hadiths:12,  bio:"Witnessed the Prophet ﷺ performing wudu at her wedding morning — then taught his exact method to all who came after. The most precise early transmitter of ritual practice.", distinction:'Her transmission of the Prophet\'s ﷺ wudu method became the definitive reference used by Malik ibn Anas in the Muwatta — the most authentic transmission of daily prayer practice.', source:'Bukhari 186; Abu Dawud 118' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FORMER ENEMIES & CONVERSION STORIES  (Feature 48)
   ═════════════════════════════════════════════════════════════════════ */
export interface ConvertStory {
  name: string;
  nameAr: string;
  preIslamRole: string;
  yearConverted: string;
  conversionTrigger: string;
  momentDescription: string;
  postIslamLegacy: string;
  source: string;
  color: string;
  dramatic_quote?: string;
}

export const CONVERTS_DATA: ConvertStory[] = [
  {
    name: 'Umar ibn al-Khattab', nameAr: 'عمر بن الخطاب',
    preIslamRole: "The most feared persecutor of Muslims in Mecca. Personally tortured and intimidated converts. Set out with a sword to kill the Prophet ﷺ.",
    yearConverted: '~616 CE (Year 6 of prophethood)',
    conversionTrigger: "He went to kill the Prophet ﷺ. A companion told him: 'Before you attack, know that your own sister and brother-in-law have become Muslim.' He went to their house and struck his sister. When he saw her bleeding, he was overcome with shame and asked to read what they had.",
    momentDescription: "He read Surah Ta-Ha: 'Ta-Ha. We have not sent down the Quran upon you to cause you distress...' He went immediately to the Prophet ﷺ and declared Islam. The Prophet ﷺ said 'Allahu Akbar' so loudly the entire mosque echoed.",
    postIslamLegacy: "2nd Caliph. Conquered Persia, Syria, Egypt. Invented the Hijri calendar, state treasury, and public administration. Prophet ﷺ said: 'If there were a prophet after me it would have been Umar.'",
    source: "Ibn Hisham Seerah; Tabarani; Ibn Kathir Al-Bidaya",
    color: '#8b3a08',
    dramatic_quote: "'I came to kill him. I left as his follower. The same Quran that I sought to silence became the reason I speak its truth to this day.'",
  },
  {
    name: 'Khalid ibn al-Walid', nameAr: 'خالد بن الوليد',
    preIslamRole: "The most brilliant military commander in Arabia. Defeated the Muslims at Uhud with a flanking maneuver. Led multiple campaigns against the Prophet ﷺ and the early Muslims.",
    yearConverted: '8 AH / 629 CE (Before Conquest of Mecca)',
    conversionTrigger: "After the Treaty of Hudaybiyyah, he began to question his own conscience. He secretly consulted his brother Walid ibn al-Walid (who was already Muslim), who wrote him a letter saying: 'A man of your intelligence cannot be blind to the truth of Islam.'",
    momentDescription: "Khalid travelled to Medina and declared Islam. The Prophet ﷺ walked out to receive him, saying: 'I always hoped that his intelligence would lead him to something great.' Khalid said: 'O Messenger of Allah, pray for forgiveness for all that preceded.' The Prophet ﷺ replied: 'Islam erases everything before it.'",
    postIslamLegacy: "Never lost a single battle after converting. Conquered Syria, Iraq, and Persia. Given the title 'Sword of Allah' (Sayf Allah) by the Prophet ﷺ personally. Led 200+ battles undefeated.",
    source: "Ibn Hisham Seerah; Ibn Kathir; Bukhari 4262",
    color: '#8b1a38',
    dramatic_quote: "'I had a nightmare every night that I was in a dark pit until the night I dreamed of green open space. That was the night I decided to accept Islam.'",
  },
  {
    name: 'Amr ibn al-As', nameAr: 'عمرو بن العاص',
    preIslamRole: "One of the most cunning political operators of Quraysh. Negotiated with the Abyssinian King to have the Muslim refugees extradited. A key orchestrator of opposition to Islam.",
    yearConverted: '8 AH / 629 CE',
    conversionTrigger: "Met Khalid ibn al-Walid on the road to Medina. Both were going independently to convert. Amr had spoken to the Abyssinian Negus (who was secretly Muslim) and heard the Negus say: 'By Allah, if you go to Muhammad now, you will find only good.'",
    momentDescription: "Presented himself before the Prophet ﷺ and declared: 'I want to make bay'ah (pledge) to you.' The Prophet ﷺ asked: 'On what condition, O Amr?' Amr said: 'That all my past sins be forgiven.' The Prophet ﷺ said: 'Do you not know that Islam erases what came before it?'",
    postIslamLegacy: "Conquered Egypt in 641 CE. Established Alexandria as an Islamic city. His letter to Umar ibn al-Khattab describing Egypt's conquest is one of the masterpieces of Arabic prose.",
    source: "Muslim 121; Ibn Hisham Seerah",
    color: '#1a3462',
    dramatic_quote: "'I was the one who negotiated against the Muslims in Abyssinia. The same king whose court I used against them — he became the evidence that brought me to Islam.'",
  },
  {
    name: 'Abu Sufyan ibn Harb', nameAr: 'أبو سفيان بن حرب',
    preIslamRole: "The supreme leader of Mecca and Islam's greatest enemy for 20 years. Financed and led every major military campaign against the Prophet ﷺ including Uhud and the Battle of the Trench.",
    yearConverted: '8 AH / 630 CE (Day of Conquest of Mecca)',
    conversionTrigger: "The night before the Conquest, Abbas ibn Abd al-Muttalib found Abu Sufyan wandering near the Muslim camp and brought him to the Prophet ﷺ. Abbas said: 'O Messenger of Allah, Abu Sufyan loves honor — honor him.' The Prophet ﷺ said: 'Whoever enters Abu Sufyan's house is safe.'",
    momentDescription: "When 10,000 Muslim troops marched into Mecca the next day, Abu Sufyan stood watching. The Prophet ﷺ passed and Abu Sufyan was struck by his dignity. He said his shahada that day and the Prophet ﷺ accepted it completely.",
    postIslamLegacy: "His son Yazid became the first Islamic governor of Syria. His other son Muawiyah became the first Umayyad Caliph. Abu Sufyan fought at the Battle of Yarmouk for Islam aged 70, losing his eye. Lost his other eye at the Battle of Nihawand.",
    source: "Ibn Hisham Seerah; Bukhari 4280",
    color: '#b8860b',
    dramatic_quote: "'For 20 years I fought him. Today I stand in his army. This is not defeat — this is the finest thing I have ever done.'",
  },
  {
    name: 'Wahshi ibn Harb', nameAr: 'وحشي بن حرب',
    preIslamRole: "A Javelin specialist who was specifically hired by Hind bint Utba to kill Hamza — the Prophet's ﷺ beloved uncle. He killed Hamza at Uhud and mutilated his body.",
    yearConverted: '8 AH / 630 CE (Conquest of Mecca)',
    conversionTrigger: "After the Conquest of Mecca, Wahshi fled, fearing execution. He eventually came to the Prophet ﷺ, who said: 'Are you the one who killed Hamza?' Wahshi said yes. The Prophet ﷺ said: 'Can you hide your face from me? I cannot bear to see you because of Hamza.' But he accepted his Islam.",
    momentDescription: "Wahshi accepted Islam and said: 'O Prophet of Allah, I accepted Islam and I will not hide from you — but I cannot bear to look at you.' The Prophet ﷺ said: 'The one who grieves you is the one who killed Hamza, not you.' Wahshi later killed the false prophet Musaylima at Yamama — atoning for his past.",
    postIslamLegacy: "Wahshi said: 'I killed the best of people in ignorance (Hamza) and killed the worst of people in Islam (Musaylima). I hope my Islam atones for my past.' The Prophet ﷺ prayed for him.",
    source: "Bukhari 3034; Ibn Hisham Seerah",
    color: '#7a1010',
    dramatic_quote: "'With the same javelin that killed the best of men, I killed the worst of men. I have carried this weapon my whole life — and it has carried me to Allah.'",
  },
  {
    name: 'Hind bint Utba', nameAr: 'هند بنت عتبة',
    preIslamRole: "The fiercest enemy of the Prophet ﷺ among women. Her father was killed at Badr. She hired Wahshi to kill Hamza. After Uhud, she chewed Hamza's liver on the battlefield.",
    yearConverted: '8 AH / 630 CE (Day of Conquest of Mecca)',
    conversionTrigger: "At the Conquest of Mecca, women came to make bay'ah (pledge) to the Prophet ﷺ. Hind came — veiled, as she feared being recognized. When the Prophet ﷺ made the pledge conditions, she questioned some, and he recognized her voice.",
    momentDescription: "He said: 'Are you Hind?' She said: 'Yes. Pardon what is past, O Prophet of Allah, and Allah will pardon you.' He said: 'Welcome, O Hind.' She wept and accepted Islam completely.",
    postIslamLegacy: "Her son Muawiyah became the first Umayyad Caliph. She spent the remainder of her life in sincere practice. Companions who knew her later attested to the genuineness of her Islam.",
    source: "Ibn Hisham Seerah; Bukhari 4185",
    color: '#7a3060',
    dramatic_quote: "'By Allah, no tent people were more hateful to me than yours. Today no tent people are more beloved to me than yours. He forgave me. I cannot comprehend what he is.'",
  },
  {
    name: 'Ikrimah ibn Abi Jahl', nameAr: 'عكرمة بن أبي جهل',
    preIslamRole: "Son of Abu Jahl — Islam's greatest enemy. Fought against Muslims at multiple battles including Uhud. Fled Mecca at the Conquest fearing execution for his war crimes.",
    yearConverted: '8 AH / 630 CE',
    conversionTrigger: "Fled to Yemen, then to Abyssinia. His wife Umm Hakim accepted Islam at the Conquest and the Prophet ﷺ gave her his personal guarantee of safety for Ikrimah if he returned. She sailed to bring him back.",
    momentDescription: "When his boat was caught in a storm, Ikrimah said: 'If only the God of Muhammad could save me from this, I would believe.' The storm stopped. He sailed back to Medina. The Prophet ﷺ said to companions: 'Ikrimah is coming to you as a believer — do not insult his father in front of him.'",
    postIslamLegacy: "Died as a martyr at the Battle of Ajnadayn (634 CE) — the first major battle after the Prophet's ﷺ death — shouting 'Am I not the son of Abu Jahl? Let me not disgrace my lineage this time in the right cause.'",
    source: "Ibn Hisham Seerah; Ibn Sa'd Tabaqat",
    color: '#5c1010',
    dramatic_quote: "'In that storm, I realized I had been fighting the Lord of every storm. I could not outrun Him. I could not outsail Him. I came back.'",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   SCHOLARSHIP DIASPORA MAP  (Feature 22)
   Where each imam's students settled — for SVG map in Legacy section
   ═════════════════════════════════════════════════════════════════════ */
export interface DiasporaCenter {
  city: string;
  lat: number;
  lng: number;
  madhab: 'hf' | 'ml' | 'sf' | 'hb';
  count: number;  // relative number of students
  note: string;
}

export const DIASPORA_CENTERS: DiasporaCenter[] = [
  // Hanafi spread
  { city:'Baghdad',    lat:33.3, lng:44.4, madhab:'hf', count:9, note:'Abu Hanifa died here. Center of Hanafi legal development.' },
  { city:'Kufa',       lat:32.0, lng:44.4, madhab:'hf', count:8, note:'Birthplace of Abu Hanifa and Hanafi fiqh school.' },
  { city:'Samarkand',  lat:39.6, lng:66.9, madhab:'hf', count:7, note:'Hanafi school dominant in all of Central Asia from here.' },
  { city:'Constantinople',lat:41.0,lng:28.9,madhab:'hf', count:9, note:'Ottoman Empire adopted Hanafi — spread across 30 countries.' },
  { city:'Delhi',      lat:28.6, lng:77.2, madhab:'hf', count:8, note:'Hanafi entered India via Mahmud of Ghazna; dominant today.' },
  { city:'Tashkent',   lat:41.3, lng:69.2, madhab:'hf', count:6, note:'Hanafi spread throughout Uzbekistan and Tajikistan.' },
  { city:'Lahore',     lat:31.5, lng:74.3, madhab:'hf', count:7, note:'Pakistan is predominantly Hanafi via Deobandi/Barelvi.' },
  // Maliki spread
  { city:'Medina',     lat:24.5, lng:39.6, madhab:'ml', count:9, note:'Origin — Malik lived and died here. Amal al-Madina.' },
  { city:'Cordoba',    lat:37.9, lng:-4.8, madhab:'ml', count:8, note:'Maliki carried to Andalusia — dominated for 700 years.' },
  { city:'Fez',        lat:34.0, lng:-5.0, madhab:'ml', count:9, note:'Morocco: Maliki dominant. Al-Qarawiyyin mosque-university.' },
  { city:'Tunis',      lat:36.8, lng:10.2, madhab:'ml', count:8, note:'North Africa: uniformly Maliki from 8th century.' },
  { city:'Cairo',      lat:30.1, lng:31.2, madhab:'ml', count:7, note:'Al-Azhar originally Maliki; Shafi\'i overtook by 10th century.' },
  { city:'Timbuktu',   lat:16.8, lng:-3.0, madhab:'ml', count:7, note:'Sub-Saharan Africa: Maliki entered via Ghana and Mali empires.' },
  { city:'Dakar',      lat:14.7, lng:-17.4,madhab:'ml', count:6, note:'West Africa (Senegal, Guinea): uniformly Maliki today.' },
  // Shafi'i spread
  { city:'Cairo',      lat:30.0, lng:31.3, madhab:'sf', count:8, note:'Al-Shafi\'i buried here. Al-Azhar became primarily Shafi\'i.' },
  { city:'Baghdad',    lat:33.4, lng:44.3, madhab:'sf', count:7, note:'Al-Shafi\'i taught here; Imam Ahmad was his student.' },
  { city:'Mecca',      lat:21.4, lng:39.8, madhab:'sf', count:8, note:'Al-Shafi\'i born here; Shafi\'i dominant in Hijaz for centuries.' },
  { city:'Yemen',      lat:15.4, lng:44.2, madhab:'sf', count:7, note:'Yemen predominantly Shafi\'i today.' },
  { city:'Kuala Lumpur',lat:3.1,lng:101.7, madhab:'sf', count:8, note:'Southeast Asia (Malaysia, Indonesia): uniformly Shafi\'i.' },
  { city:'Jakarta',    lat:-6.2, lng:106.8,madhab:'sf', count:8, note:'Largest Muslim country — predominantly Shafi\'i.' },
  { city:'Mogadishu',  lat:2.0,  lng:45.3, madhab:'sf', count:6, note:'East Africa (Somalia, Kenya) predominantly Shafi\'i.' },
  // Hanbali spread
  { city:'Baghdad',    lat:33.5, lng:44.5, madhab:'hb', count:9, note:'Ahmad ibn Hanbal\'s home. His school concentrated here.' },
  { city:'Damascus',   lat:33.5, lng:36.3, madhab:'hb', count:8, note:'Ibn Taymiyya (d.1328) revived Hanbali thought from here.' },
  { city:'Riyadh',     lat:24.7, lng:46.7, madhab:'hb', count:9, note:'Saudi Arabia: official state madhab — Hanbali via Wahhabi reform.' },
  { city:'Mecca',      lat:21.3, lng:39.8, madhab:'hb', count:7, note:'Hanbali dominant in Hijaz since Saudi unification (1932).' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FINAL CIRCLE — PROPHET'S LAST COMPANIONS  (Feature 11)
   The shortest and most sacred isnad chain
   ═════════════════════════════════════════════════════════════════════ */
export const FINAL_CIRCLE = {
  title: "The Final Circle — The Prophet's ﷺ Last Days",
  subtitle: "12 Rabi al-Awwal 11 AH · 8 June 632 CE",
  description: "In the final days before the Prophet's ﷺ death, a small circle of companions was present. These are the shortest chains (aqsab al-asanid) in all of hadith science — direct witnesses to the last revelation.",
  hadith: {
    ar: 'مَا أَنْهَرَ الدَّمَ وَذُكِرَ اسْمُ اللَّهِ فَكُلْ',
    en: '"Whatever causes blood to flow, if the name of Allah has been mentioned over it, then eat it."',
    source: 'Bukhari 5498 — narrated by Rafi ibn Khadij — 3-link chain to the Prophet ﷺ',
    note: 'This narration has only 3 links: Rafi ibn Khadij → Nafi → Ibn Umar → Prophet ﷺ. Known as the "Golden Chain" — minimum possible links.',
  },
  presentCompanions: [
    { name: "Aisha bint Abi Bakr", nameAr: "عائشة", role: "In whose room the Prophet ﷺ died, with his head in her lap. Narrated his last words.", color: '#7a3060' },
    { name: "Fatima bint Muhammad", nameAr: "فاطمة", role: "Daughter — wept openly. Prophet ﷺ whispered to her: 'You will be the first of my family to follow me.' She smiled.", color: '#0a3d2e' },
    { name: "Ali ibn Abi Talib", nameAr: "علي", role: "Son-in-law — prepared the ritual washing of the Prophet's ﷺ body.", color: '#0a3d2e' },
    { name: "Abu Bakr al-Siddiq", nameAr: "أبو بكر", role: "Returned from al-Sunh upon hearing the news. Kissed the Prophet's ﷺ forehead. Delivered the famous announcement.", color: '#b8860b' },
    { name: "Umar ibn al-Khattab", nameAr: "عمر", role: "Stood with sword saying 'He has not died' — until Abu Bakr's recitation of 3:144 brought him to his knees.", color: '#8b3a08' },
    { name: "Abbas ibn Abd al-Muttalib", nameAr: "العباس", role: "Uncle — participated in the ritual washing. His lineage became the Abbasid Caliphate.", color: '#1a3462' },
    { name: "Anas ibn Malik", nameAr: "أنس", role: "Personal servant — stood outside weeping. 'I never saw a day brighter than when the Prophet ﷺ came to Medina. And I never saw a darker day than the day he left it.'", color: '#509070' },
    { name: "Abdullah ibn Abbas", nameAr: "ابن عباس", role: "Young — was 13. Received direct du'a: 'O Allah, teach him the religion and give him wisdom.' Present at this moment.", color: '#2a5080' },
  ],
  lastWords: {
    ar: 'الصَّلَاةَ الصَّلَاةَ وَمَا مَلَكَتْ أَيْمَانُكُمْ',
    en: '"The prayer, the prayer — and those whom your right hands possess (care for the vulnerable)."',
    source: 'Abu Dawud 5156; Ibn Majah 2698',
  },
  abubakrSpeech: '"Whoever worshipped Muhammad — Muhammad has died. Whoever worshipped Allah — Allah lives and never dies." [Quran 3:144]',
};
