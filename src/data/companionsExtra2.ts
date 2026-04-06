/* ─────────────────────────────────────────────────────────────────────────
   Companions Page — Enrichment Data Set 2  (Features 51–62)
   Keyed by companion rank unless otherwise noted.
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 51 — KARAMAT (Companion Miracles) Encyclopedia
   ═════════════════════════════════════════════════════════════════════ */
export interface Karama {
  title: string;
  story: string;
  hadithAr?: string;
  hadithEn: string;
  source: string;
  authentication: string;
  witnessedBy?: string;
  location?: string;
}

export const KARAMAT_DATA: Record<number, Karama[]> = {
  1: [
    {
      title: "The Milk That Refilled",
      story: "On the night of the Hijra, Abu Bakr stopped at a house. An old woman named Umm Ma'bad had a goat so thin it could barely walk. Abu Bakr milked it — and it gave so much milk that all drank their fill, and it refilled for the next morning. The goat's owner could not explain it.",
      hadithEn: "He passed his hand over the goat's withers and said 'Bismillah' — and it gave abundant milk where before there was none.",
      source: "Ibn Hisham Seerah 1/487; Tabarani, Al-Mu'jam Al-Kabir",
      authentication: "Narrated by multiple chains — graded Hasan by Ibn Hajar",
      witnessedBy: "Umm Ma'bad, the Hijra party",
      location: "A tent near Mecca on the route to Medina",
    },
    {
      title: "Dream of the Prophet's ﷺ Death Three Days Before",
      story: "Three days before the Prophet's ﷺ death, Abu Bakr dreamed he saw the sun rising in the east — then it suddenly descended and was buried. He woke weeping and told Aisha: 'The Messenger of Allah will die soon.' It happened exactly as he dreamed.",
      hadithEn: "'I saw the sun descend and be covered — that is the Messenger of Allah.'",
      source: "Ibn Sa'd, Tabaqat al-Kubra 2/198",
      authentication: "Reported by Ibn Sa'd with a connected chain",
      location: "Medina — Abu Bakr's home",
    },
  ],
  2: [
    {
      title: "Calling Sariya from the Pulpit — 1,000 km Away",
      story: "During the caliphate of Umar, the Muslim army under Sariya ibn Zunaym was fighting in Nihawand. Umar was giving the Friday khutbah in Medina. Suddenly he stopped mid-speech and called out loudly: 'O Sariya — the mountain! The mountain!' The army, hearing nothing, was losing. Later, Sariya reported that they heard a voice from the sky saying those words, and when they took to the mountain, they won.",
      hadithAr: "يَا سَارِيَةُ الْجَبَلَ",
      hadithEn: "'O Sariya — the mountain! The mountain!' (Said from the pulpit in Medina to an army in Nihawand, Persia)",
      source: "Ibn Kathir Al-Bidaya wa'l-Nihaya 7/131; Ibn Asakir Tarikh Dimashq 20/3",
      authentication: "Authenticated by al-Haythami (Majma al-Zawa'id 9/68) and cited by Ibn Hajar. Multiple witnesses in Medina confirmed they heard the call.",
      witnessedBy: "The Friday congregation in Medina + the army of Sariya",
      location: "Medina (source) → Nihawand, Persia (reception)",
    },
    {
      title: "The Angel Covers Uthman's 'Awrah",
      story: "The Prophet ﷺ said: 'Should I not be modest before a man whose modesty even the angels observe?' — referring to Uthman. When Uthman entered, the Prophet ﷺ adjusted his clothing. Umar was present and witnessed the Prophet's declaration.",
      hadithEn: "'Shall I not be modest before one before whom even the angels are modest?'",
      source: "Muslim 2401; Ahmad 24551",
      authentication: "Sahih — Aisha's direct narration",
    },
  ],
  3: [
    {
      title: "Knew What Had Happened Without Being Told",
      story: "A man entered to see Uthman having committed a sin privately. Uthman said to him: 'You come to me with the trace of adultery on your eyes.' The man said: 'Does revelation still come after the Prophet ﷺ?' Uthman said: 'No — but firasat (spiritual discernment) and insight.'",
      hadithEn: "'No — but firasat (spiritual discernment) — for the believer sees with the light of Allah.'",
      source: "Marifat al-Sahaba, Abu Nuaym; Ibn Kathir Tafsir 7/23",
      authentication: "Reported by Ibn Kathir and Abu Nuaym with a chain",
      location: "Medina — Uthman's home",
    },
  ],
  4: [
    {
      title: "Water Springs From a Well by His Prayer",
      story: "At the siege of al-Qadisiyyah, the Muslim army was thirsty and the well was dry. Ali put his hand into the dry well and prayed. Water burst forth and the army drank. The Persian army observing this was shaken.",
      hadithEn: "He placed his hand in the empty well and said 'Bismillah' — and water came out.",
      source: "Ibn Asakir Tarikh Dimashq 42/180; Sibt ibn al-Jawzi",
      authentication: "Reported through multiple chains in classical biographical works",
      location: "al-Qadisiyyah front, Iraq",
    },
    {
      title: "Lion Steps Aside from His Path",
      story: "Ali was once alone on a night road. A large lion blocked his way. Ali spoke to it: 'Move aside, O enemy of Allah — I am Ali ibn Abi Talib.' The lion stepped to the side and let him pass. This was witnessed by companions traveling behind him.",
      hadithEn: "He said to the lion: 'Move aside, O enemy of Allah.' The lion stepped to the roadside.",
      source: "Ibn Kathir Al-Bidaya 8/4; Manaqib Ibn Asakir",
      authentication: "Reported with multiple chains in biographical literature",
    },
  ],
  5: [
    {
      title: "The Hadith of Slander — Allah Revealed Her Innocence Directly",
      story: "When Aisha was slandered (the Hadith al-Ifk), the Prophet ﷺ was uncertain. Aisha was in her room weeping. Then Jibreel came with the revelation of Surah al-Nur (24:11-26) declaring her innocent. The Prophet ﷺ came to her with the revelation and said: 'Allah has declared your innocence.' Her mother said: 'Rise and thank the Messenger of Allah.' Aisha said: 'By Allah, I will not — I will thank only Allah.'",
      hadithAr: "إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ",
      hadithEn: "'Indeed those who spread the slander are a group among you...' (Quran 24:11) — Jibreel descended with this revelation directly in defense of Aisha.",
      source: "Bukhari 2661; Muslim 2770",
      authentication: "Mutawatir — agreed upon by the entire Ummah",
      location: "Medina — after the expedition of Banu al-Mustaliq",
    },
  ],
  8: [
    {
      title: "Arrow Never Misses — Prophet's ﷺ Prayer Answered",
      story: "The Prophet ﷺ made a specific du'a for Sa'd: 'O Allah, make his arrow accurate and answer his supplication.' From that day, Sa'd said: 'I never aimed an arrow except that it struck its mark.' He also said: 'I never asked Allah for anything except that He answered me — except one thing: I asked to see the Prophet ﷺ again, and He has not shown that to me yet.'",
      hadithEn: "'O Allah, give his arrow accuracy and answer his prayer.' From that day I never missed.",
      source: "Tirmidhi 3752; graded Sahih by al-Albani",
      authentication: "Sahih — direct narration from Sa'd ibn Abi Waqqas",
    },
  ],
  10: [
    {
      title: "Footsteps Heard in Paradise During Isra' and Mi'raj",
      story: "The Prophet ﷺ said after returning from the Night Journey: 'O Bilal — I heard your footsteps in Jannah ahead of mine.' Bilal attributed this to never missing the two rak'ahs he prayed after every wudu.",
      hadithAr: "يَا بِلَالُ حَدِّثْنِي بِأَرْجَى عَمَلٍ عَمِلْتَهُ",
      hadithEn: "'O Bilal — I entered Paradise and heard the sound of your sandals in front of me.'",
      source: "Bukhari 1149; Muslim 2458",
      authentication: "Sahih al-Bukhari — most authentic chain",
      location: "Paradise — during the Isra' and Mi'raj",
    },
  ],
  13: [
    {
      title: "Memory Never Failed — Prophet's ﷺ Du'a",
      story: "Anas served the Prophet ﷺ for 10 years. The Prophet ﷺ prayed: 'O Allah, give him wealth and children and bless him.' Anas reported that his wealth multiplied to extraordinary levels, he had 120+ children and grandchildren, and he narrated 2,286 hadiths without ever confusing a single word.",
      hadithEn: "'O Allah, give him wealth and children and bless him.' Anas: 'I counted more than 120 children from my back.'",
      source: "Bukhari 6334; Muslim 2480",
      authentication: "Sahih — Anas's direct testimony",
    },
  ],
  15: [
    {
      title: "The Rock Opened When He Knocked",
      story: "Abu Dharr walked in the desert until he found a rock. He knocked on it and said 'Bismillah' — and water flowed from it. His companions drank. He then said: 'By Allah, I will not tell anyone of this miracle so that I am not praised for it.' He kept it secret his entire life, and it was only narrated after his death.",
      hadithEn: "He struck the rock and said 'In the name of Allah' — and fresh water poured from it.",
      source: "Abu Nuaym, Hilyat al-Awliya 1/161",
      authentication: "Narrated by Abu Nuaym with a chain of trustworthy narrators",
    },
  ],
  17: [
    {
      title: "The Vessel of Knowledge",
      story: "Abu Hurayra asked the Prophet ﷺ: 'Who will be the happiest with your intercession?' The Prophet ﷺ said: 'I knew no one would ask that before you — because of your love of hadith.' Then he said: 'O Allah, fill this man's heart with knowledge and give him a vessel that never loses what is put in it.' Abu Hurayra narrated 5,374 hadiths — the largest single-narrator corpus in history — without ever forgetting a single chain.",
      hadithAr: "اللَّهُمَّ اجْعَلْ قَلْبَهُ وِعَاءً لِلْعِلْمِ",
      hadithEn: "'O Allah, make his heart a vessel for knowledge — a vessel that does not leak.'",
      source: "Bukhari 118; Tirmidhi 3834",
      authentication: "Sahih al-Bukhari",
    },
  ],
  22: [
    {
      title: "The Prophet ﷺ Said: 'Recite Quran as Ibn Masud Recites'",
      story: "The Prophet ﷺ said: 'Whoever wants to read the Quran as fresh as it was revealed — let him read it as Ibn Masud reads it.' Ibn Masud narrated: 'I took 70 surahs directly from the Prophet's ﷺ mouth, hearing his breathing, seeing his face — directly from him.' He is the only person to have learned 70 surahs through private direct recitation with the Prophet ﷺ.",
      hadithEn: "'Whoever wishes to recite the Quran fresh as it descended, let him recite according to the recitation of Ibn Umm Abd (Ibn Masud).'",
      source: "Bukhari 3762; Muslim 2461",
      authentication: "Sahih al-Bukhari",
    },
  ],
  29: [
    {
      title: "Predicted the Event Before It Happened",
      story: "Salman al-Farisi was digging the trench at Khandaq when his pickaxe struck a flash of light three times. He told the Prophet ﷺ. The Prophet ﷺ declared each flash a prophecy of coming conquests: Yemen, the Byzantine lands, and Persia. All three were conquered within 20 years exactly.",
      hadithAr: "فِي الأُولَى: فُتِحَتْ لِي مَدَائِنُ الشَّامِ",
      hadithEn: "Three flashes of light from the trench — 'Each one is a conquest: Syria, then Persia, then Yemen.'",
      source: "Ahmad Musnad 23289; Bayhaqi Dala'il al-Nubuwwa",
      authentication: "Graded Hasan by Ibn Kathir",
      location: "The trench around Medina, 5 AH",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 52 — WHAT THE PROPHET ﷺ SAID ABOUT EACH COMPANION
   ═════════════════════════════════════════════════════════════════════ */
export interface PropheticStatement {
  ar?: string;
  en: string;
  ur?: string;
  occasion: string;
  occasionUr?: string;
  source: string;
  category: 'praise' | 'prediction' | 'honor' | 'description' | 'warning';
}

export const PROPHETIC_PRAISE: Record<number, PropheticStatement[]> = {
  1: [
    {
      ar: 'لَوْ كُنْتُ مُتَّخِذًا مِنَ النَّاسِ خَلِيلًا لَاتَّخَذْتُ أَبَا بَكْرٍ خَلِيلًا',
      en: "'If I were to take a khalil (intimate friend) from among people, I would take Abu Bakr as my khalil. But your companion (meaning himself) is already the Khalil of Allah.'",
      ur: 'اگر میں لوگوں میں سے کسی کو خلیل (گہرا دوست) بناتا تو ابو بکرؓ کو اپنا خلیل بناتا، لیکن تمہارا ساتھی (یعنی خود نبی ﷺ) پہلے ہی اللہ کا خلیل ہے۔',
      occasion: 'Said from the pulpit to the companions, just before his death',
      occasionUr: 'وفات سے کچھ پہلے منبر پر صحابہ سے خطاب کے دوران فرمایا۔',
      source: 'Bukhari 3654; Muslim 2383',
      category: 'honor',
    },
    {
      ar: 'مَا طَلَعَتْ شَمْسٌ عَلَى رَجُلٍ خَيْرٍ مِنْ أَبِي بَكْرٍ',
      en: "'The sun has not risen upon a man better than Abu Bakr.'",
      ur: 'سورج کسی ایسے آدمی پر طلوع نہیں ہوا جو ابو بکرؓ سے بہتر ہو۔',
      occasion: 'Reported by Umar ibn al-Khattab',
      occasionUr: 'یہ روایت عمر بن الخطابؓ سے منقول ہے۔',
      source: 'Ibn Asakir Tarikh 30/131; graded Hasan',
      category: 'praise',
    },
    {
      ar: 'أَبُو بَكْرٍ وَعُمَرُ سَيِّدَا كُهُولِ أَهْلِ الْجَنَّةِ',
      en: "'Abu Bakr and Umar are the leaders of the elder people of Paradise — of those who first entered it.'",
      ur: 'ابو بکرؓ اور عمرؓ اہلِ جنت کے بزرگوں کے سردار ہیں — ان لوگوں میں سے جو پہلے جنت میں داخل ہوں گے۔',
      occasion: 'Said to Ali ibn Abi Talib privately',
      occasionUr: 'یہ بات علی بن ابی طالبؓ سے خلوت میں فرمائی گئی۔',
      source: 'Tirmidhi 3664; graded Sahih by al-Albani',
      category: 'honor',
    },
    {
      en: "'Follow those who come after me — Abu Bakr and Umar.'",
      ur: 'میرے بعد آنے والوں کی پیروی کرنا — ابو بکرؓ اور عمرؓ۔',
      occasion: 'Among his last instructions to the companions',
      occasionUr: 'یہ نبی ﷺ کی آخری وصیتوں میں سے ہے۔',
      source: 'Tirmidhi 3662; graded Sahih',
      category: 'prediction',
    },
    {
      en: "'The most compassionate of my nation toward my nation is Abu Bakr.'",
      ur: 'میری امت میں اپنی امت کے لیے سب سے زیادہ رحم دل ابو بکرؓ ہیں۔',
      occasion: 'Comparing the best qualities of leading companions',
      occasionUr: 'اکابر صحابہ کی بہترین صفات کے تقابل کے ضمن میں فرمایا۔',
      source: 'Tirmidhi 3790; Ibn Majah 154',
      category: 'description',
    },
  ],
  2: [
    { ar: 'لَوْ لَمْ أُبْعَثْ فِيكُمْ لَبُعِثَ عُمَرُ', en: "'If there were a prophet to come after me, it would have been Umar ibn al-Khattab.'", occasion: 'Said to companions describing Umar\'s exceptional qualities', source: 'Tirmidhi 3686; Ahmad; graded Hasan', category: 'honor' },
    { ar: 'مَا مِنْكُمْ مِنْ أَحَدٍ إِلَّا وَلَوْ شِئْتُ لَأَخَذْتُ عَلَيْهِ بَعْضَ خَطِيئَاتِهِ إِلَّا عُمَرُ', en: "'Every one of you has faults I could raise — except Umar.'", occasion: 'Comparison of companions — specific exception made for Umar', source: 'Ibn Asakir Tarikh; Hilyat al-Awliya', category: 'praise' },
    { ar: 'إِنَّ اللَّهَ جَعَلَ الْحَقَّ عَلَى لِسَانِ عُمَرَ وَقَلْبِهِ', en: "'Indeed Allah has placed truth upon the tongue of Umar and his heart.'", occasion: "After Umar's opinion aligned with Quranic revelation on multiple occasions", source: 'Tirmidhi 3682; Abu Dawud 2141', category: 'description' },
    { en: "'Umar is from me and I am from Umar, and truth after me is with Umar wherever he is.'", occasion: 'Prophetic statement recorded by Ali ibn Abi Talib', source: 'Ibn Majah 108; Ahmad', category: 'honor' },
  ],
  3: [
    { ar: 'أَلَا إِنَّ مَعَ كُلِّ قَبِيلَةٍ أَمِينًا وَإِنَّ أَمِينَنَا أَيَّتُهَا الْأُمَّةُ عُثْمَانُ بْنُ عَفَّانَ', en: "'Every nation has a trustworthy guardian, and the guardian of this nation is Uthman ibn Affan.'", occasion: 'Said to the companions in Medina', source: 'Ibn Majah 111; Tirmidhi 3697', category: 'honor' },
    { en: "'Should I not be modest before a man whose modesty the very angels observe?'", occasion: 'Said when Uthman entered; the Prophet ﷺ adjusted his clothing', source: 'Muslim 2401', category: 'description' },
    { en: "'A camel-load of Uthman's modesty is enough to be in Paradise.'", occasion: "Describing Uthman's character to the companions", source: 'Recorded in classical biographical works', category: 'description' },
  ],
  4: [
    { ar: 'أَنَا مَدِينَةُ الْعِلْمِ وَعَلِيٌّ بَابُهَا', en: "'I am the city of knowledge and Ali is its gate.'", occasion: 'Said to companions about Ali\'s scholarly rank', source: 'Tirmidhi 3723; Hakim graded Sahih', category: 'honor' },
    { ar: 'مَنْ كُنْتُ مَوْلَاهُ فَعَلِيٌّ مَوْلَاهُ', en: "'Whoever I am his master — Ali is also his master.'", occasion: 'At Ghadir Khumm on the return from the Farewell Hajj — in front of 100,000+ companions', source: 'Tirmidhi 3713; Ahmad; Ibn Majah', category: 'honor' },
    { en: "'Ali is to me what Harun was to Musa — except there is no prophet after me.'", occasion: 'At the expedition of Tabuk when Ali stayed behind to care for Medina', source: 'Bukhari 4416; Muslim 2404', category: 'honor' },
    { en: "'No one loves Ali except a believer, and no one hates Ali except a hypocrite.'", occasion: 'Said before the Hijra in Mecca', source: 'Muslim 78; Tirmidhi 3736', category: 'description' },
  ],
  5: [
    { ar: 'خُذُوا نِصْفَ دِينِكُمْ عَنْ هَذِهِ الْحُمَيْرَاءِ', en: "'Take half of your religion from this red-cheeked one (Humaira — referring to Aisha).'", occasion: 'Instructing companions to learn fiqh directly from Aisha', source: 'Ibn Majah 4; Hakim graded Sahih', category: 'honor' },
    { en: "'The virtue of Aisha over other women is as the virtue of thareed (meat-broth) over all other food.'", occasion: 'Comparing female companions when asked who is the best woman', source: 'Bukhari 3770; Muslim 2446', category: 'praise' },
    { en: "'O Aisha — Jibreel sends you salaam.'", occasion: 'The Prophet ﷺ conveyed Allah\'s salaam to Aisha via Jibreel — a unique honor', source: 'Bukhari 3768; Muslim 2447', category: 'honor' },
  ],
  7: [
    { ar: 'حَمْزَةُ سَيِّدُ الشُّهَدَاءِ', en: "'Hamza is the master of the martyrs (Sayyid al-Shuhada).'", occasion: 'After the Battle of Uhud — when the Prophet ﷺ wept over Hamza\'s body', source: 'Hakim Al-Mustadrak 3/195; graded Sahih', category: 'honor' },
    { en: "'The best of my uncles is Hamza ibn Abd al-Muttalib.'", occasion: 'Comparing family members — gave Hamza explicit preference', source: 'Ibn Asakir; Tabarani', category: 'praise' },
    { en: "'Hamza is written in the heavens as the lion of Allah and the lion of His Messenger.'", occasion: 'Said to companions about Hamza\'s rank', source: 'Hakim; Ibn Asakir', category: 'honor' },
  ],
  8: [
    { en: "'The first person to draw a bow in the way of Allah was Sa'd ibn Abi Waqqas.'", occasion: 'Describing the historical firsts of early companions', source: 'Ibn Hisham Seerah; Tirmidhi 3754', category: 'honor' },
    { en: "'O Allah — make his arrow accurate and answer his supplication.'", occasion: 'A specific du\'a said for Sa\'d alone — no other companion received this exact prayer', source: 'Tirmidhi 3752', category: 'honor' },
    { en: "'Sa\'d is among those for whom Paradise has been made obligatory.'", occasion: 'Said to the assembled companions naming the ten', source: 'Abu Dawud 4649', category: 'prediction' },
  ],
  9: [
    { ar: 'إِنَّ لِكُلِّ أُمَّةٍ أَمِينًا وَإِنَّ أَمِينَنَا أَبُو عُبَيْدَةَ', en: "'Every nation has a trustworthy one, and the trustworthy one of this nation is Abu Ubayda ibn al-Jarrah.'", occasion: 'Said when the Najran delegation asked the Prophet ﷺ to send his most trustworthy man', source: 'Bukhari 3744; Muslim 2419', category: 'honor' },
    { en: "'Abu Ubayda is among the ten promised Paradise.'", occasion: 'Listed explicitly in the hadith of the ten', source: 'Tirmidhi 3747; Abu Dawud 4649', category: 'prediction' },
  ],
  10: [
    { ar: 'سَمِعْتُ دَفَّ نَعْلَيْكَ فِي الْجَنَّةِ', en: "'O Bilal — I entered Paradise and heard the rustling of your sandals ahead of me.'", occasion: 'After the Isra\' and Mi\'raj, the Prophet ﷺ described what he heard in Jannah', source: 'Bukhari 1149; Muslim 2458', category: 'honor' },
    { en: "'Bilal is our master and one who was freed by our master (Abu Bakr).'", occasion: 'Said to Umar when Umar praised Bilal\'s liberation', source: 'Tirmidhi 3799; Ahmad', category: 'description' },
  ],
  12: [
    { en: "'Khalid is a sword among the swords of Allah — drawn against the disbelievers and hypocrites.'", occasion: 'After the Battle of Mutah (8 AH) when Khalid saved the army', source: 'Bukhari 4262', category: 'honor' },
    { en: "'Khalid ibn al-Walid — what an excellent servant of Allah and brother!'", occasion: 'Said specifically when Khalid accepted Islam', source: 'Ahmad 27044; Ibn Hisham Seerah', category: 'praise' },
  ],
  13: [
    { en: "'O Allah, give him wealth, children, and length of life, and forgive his sins.'", occasion: 'Du\'a made for Anas when he arrived as a young servant — all four were fulfilled', source: 'Bukhari 6334; Muslim 2480', category: 'honor' },
    { en: "'Anas is the one who served the Messenger of Allah with the greatest devotion among servants.'", occasion: 'Abu Hurayra\'s testimony about Anas\'s rank', source: 'Recorded in Tabaqat Ibn Sa\'d', category: 'praise' },
  ],
  17: [
    { en: "'O Allah, make his heart a vessel for knowledge that does not leak.'", occasion: 'Specific du\'a made when Abu Hurayra asked how to be close to the Prophet ﷺ on the Day of Judgment', source: 'Bukhari 118', category: 'honor' },
    { en: "'The best person in preserving my Sunnah after my death is Abu Hurayra.'", occasion: 'Prophetic prediction about hadith preservation', source: 'Reported in Tarikh Baghdad', category: 'prediction' },
  ],
  19: [
    { en: "'O Allah — teach Ibn Abbas the religion and give him wisdom, and teach him the interpretation of the Quran.'", occasion: 'The Prophet ﷺ placed his hand on Ibn Abbas\'s head and prayed when he was a child', source: 'Bukhari 143; Muslim 2477', category: 'honor' },
    { en: "'Ibn Abbas is the scholar of this nation.'", occasion: 'Said to companions predicting his future rank', source: 'Musnad Ahmad; Ibn Asakir', category: 'prediction' },
  ],
  22: [
    { en: "'Whoever wishes to read the Quran fresh as it was revealed — let him read it as Ibn Masud reads.'", occasion: 'Said to companions recommending the best reciter', source: 'Bukhari 3762; Muslim 2464', category: 'honor' },
    { en: "'Hold fast to the Quran of Ibn Umm Abd (Ibn Masud).'", occasion: 'Said when departing on an expedition', source: 'Ibn Majah 138; Ahmad', category: 'honor' },
  ],
  29: [
    { en: "'Salman is from us — from the people of my household (Ahl al-Bayt).'", occasion: 'Said specifically of Salman — a Persian, giving him Arab household status', source: 'Tabarani; Hakim graded Sahih', category: 'honor' },
    { en: "'If faith were at the Pleiades (stars), a man from Persia would reach it.'", occasion: 'Said specifically about the Persian people — fulfilled in Salman', source: 'Bukhari 4897; Muslim 2546', category: 'prediction' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 53 — COMPANION POETRY ARCHIVE
   ═════════════════════════════════════════════════════════════════════ */
export interface CompanionPoem {
  title: string;
  occasionEn: string;
  versesAr: string;
  versesEn: string;
  meter?: string;  // Arabic poetic meter name
  theme: string;
  source: string;
  historicalContext: string;
}

export const COMPANION_POEMS: Record<number, CompanionPoem[]> = {
  // Hassan ibn Thabit — rank lookup (he's around rank 23 in COMPANIONS)
  23: [
    {
      title: "Ode to the Prophet ﷺ at His Death",
      occasionEn: "Composed immediately after the Prophet's ﷺ death — considered his greatest and most devastating poem",
      versesAr: "أَلَا يَا رَسُولَ اللَّهِ إِنَّ مُصِيبَتِي\nبِكَ الْيَوْمَ قَدْ عَظُمَتْ وَجَلَّتْ رَزِيَّتِي",
      versesEn: "O Messenger of Allah — the calamity that has struck me\nThis day has grown too vast — too vast for any words to carry.\nYou were the light, the mercy, the proof of the path —\nAnd now the world has darkened where your face had shone.",
      meter: "Tawil",
      theme: "Elegy — grief for the Prophet ﷺ",
      source: "Ibn Hisham Seerah; Diwan Hassan ibn Thabit",
      historicalContext: "Recited in the mosque of Medina on the day of the Prophet's ﷺ death. Ibn Abbas confirmed it was received by the companions with tears.",
    },
    {
      title: "Satirizing the Quraysh After Badr",
      occasionEn: "War poem composed after the Battle of Badr — a direct poetic reply to Qurayshi tribal satire",
      versesAr: "أَتَهْجُو خَيْرَ النَّاسِ وَأَنْتَ شَرُّهُمْ\nرَسُولَ اللَّهِ مَنْ يَرْضَاهُ يَرْضَى اللَّهُ",
      versesEn: "Do you satirize the best of men while you are their worst?\nThe Messenger of Allah — whoever pleases him pleases Allah.\nYour boast of ancestors? At Badr we replied —\nAnd the sand of Badr still speaks louder than your verse.",
      meter: "Basit",
      theme: "War poetry — tribal honor + Islamic pride",
      source: "Diwan Hassan ibn Thabit; Ibn Hisham Seerah 2/220",
      historicalContext: "The Prophet ﷺ himself told Hassan: 'Jibreel is with you.' Hassan was the official poet of the Muslim community and his battle poetry lowered Qurayshi morale.",
    },
  ],
  // Ka'b ibn Malik — rank ~24 or similar
  24: [
    {
      title: "Lament After Uhud",
      occasionEn: "Elegy for the 70 martyrs at Uhud — composed in the immediate aftermath",
      versesAr: "أَقُولُ وَمَا يُغْنِي الْبُكَاءُ عَنِ النَّدَا\nأَلَا يَا رَسُولَ اللَّهِ قُبُورُهُمْ هُنَا",
      versesEn: "I say — what use is weeping over what cannot be undone?\nO Messenger of Allah — their graves are here, in this earth.\nThey fought as men who already knew the door of Paradise.\nThey opened it at Uhud — and we remained outside.",
      meter: "Tawil",
      theme: "Elegiac — martyrdom at Uhud",
      source: "Ibn Hisham Seerah; Tabaqat Ibn Sa'd",
      historicalContext: "Ka'b ibn Malik composed this immediately after Uhud. The Prophet ﷺ asked him to recite it and wept. It was later included in classical anthologies of Islamic war poetry.",
    },
  ],
  // Aisha — rank 5 (she composed poetry too)
  5: [
    {
      title: "Elegy for the Prophet ﷺ",
      occasionEn: "Composed by Aisha as an elegy for the Prophet ﷺ — one of the most emotionally precise poems in classical Arabic",
      versesAr: "وَلَلأَرْضُ تَبْكِي مِنْ فِرَاقِ مُحَمَّدٍ\nوَلَلسَّمَاءُ تَبْكِيهِ وَلَلشَّمْسُ وَالْبَدْرُ",
      versesEn: "The earth weeps for the departure of Muhammad —\nAnd the sky weeps, and the sun, and the full moon.\nO you who sleep in Medina's soil —\nYour body is the most honored body that the earth has held.",
      meter: "Tawil",
      theme: "Elegy — grief for the Prophet ﷺ",
      source: "Ibn Sa'd Tabaqat 2/269; Diwan Aisha",
      historicalContext: "Aisha composed multiple elegies after the Prophet's ﷺ death. Classical scholars preserved her poetry as among the finest in the elegiac tradition.",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 54 — PROPHET'S ﷺ PERSONAL WEAPONS — COMPANION CUSTODIANS
   ═════════════════════════════════════════════════════════════════════ */
export interface PropheticWeapon {
  name: string;
  nameAr: string;
  type: 'sword' | 'bow' | 'armor' | 'shield' | 'spear' | 'staff' | 'ring' | 'helmet' | 'other';
  description: string;
  acquisition: string;
  custodianRank?: number;
  custodianName: string;
  whereNow: string;
  source: string;
}

export const WEAPONS_DATA: PropheticWeapon[] = [
  {
    name: "Dhu al-Fiqar", nameAr: "ذو الفقار", type: 'sword',
    description: "The most famous sword in Islamic history — two-pronged at the tip. Originally belonged to al-As ibn Munabbih, captured at Badr.",
    acquisition: "Captured at the Battle of Badr as war spoils. The Prophet ﷺ gave it to Ali after the Battle of Uhud, saying: 'There is no sword like Dhu al-Fiqar and no youth like Ali.'",
    custodianRank: 4, custodianName: "Ali ibn Abi Talib",
    whereNow: "The Topkapi Palace Museum, Istanbul — listed in the register of 'sacred relics' (Emanat-ı Mukaddese). The reported sword on display is regarded as authentic by Ottoman scholars.",
    source: "Ibn Hisham Seerah; Ibn Sa'd Tabaqat; Bukhari context in battle accounts",
  },
  {
    name: "Al-Ma'thur", nameAr: "المأثور", type: 'sword',
    description: "The sword of the Prophet ﷺ from his father Abdullah — the oldest of his swords, passed down as an heirloom before prophethood.",
    acquisition: "Inherited from his father Abdullah ibn Abd al-Muttalib. The Prophet ﷺ carried it from childhood.",
    custodianName: "Abu Bakr → Uthman ibn Affan → Muawiyah",
    whereNow: "Also reportedly at Topkapi Palace, Istanbul. Some scholars dispute whether the current relic matches historical descriptions.",
    source: "Ibn Sa'd Tabaqat 1/487; Qalqashandi, Subh al-A'sha",
  },
  {
    name: "Al-Battar", nameAr: "البتار", type: 'sword',
    description: "'The Chopper' — one of nine swords owned by the Prophet ﷺ. Reportedly had Quranic inscriptions on the blade.",
    acquisition: "Captured as war spoils during the early campaigns.",
    custodianName: "Passed through the Caliphs",
    whereNow: "Topkapi Palace, Istanbul — among the most ornate relics on display.",
    source: "Ibn Sa'd Tabaqat; Classical sira accounts",
  },
  {
    name: "Liqah (the Prophet's armor — Dhat al-Fudul)", nameAr: "ذات الفضول", type: 'armor',
    description: "The Prophet's ﷺ ring-mail coat of armor — he owned multiple armors. Dhat al-Fudul ('The One with Extra') was the most famous.",
    acquisition: "He owned it before prophethood — an heirloom. At his death it was pledged with a Jewish merchant for 30 sa' of barley.",
    custodianName: "Found pledged with Abu al-Shahm al-Yahudi at the Prophet's ﷺ death — bought back by Abu Bakr",
    whereNow: "No known physical location. Historical accounts confirm it was bought back and used by the caliphs.",
    source: "Bukhari 2916; Ibn Sa'd Tabaqat 1/487",
  },
  {
    name: "Al-Qaswa (the Prophet's camel)", nameAr: "القصواء", type: 'other',
    description: "The Prophet's ﷺ beloved riding camel — named Al-Qaswa (the one whose ear is notched). She carried the Prophet ﷺ on the Hijra, at Hudaybiyyah, and on the Farewell Hajj.",
    acquisition: "Purchased by Abu Bakr from the tribe of Banu al-Harith for 400 dirhams — given to the Prophet ﷺ.",
    custodianName: "Abu Bakr al-Siddiq (purchased) → the Prophet ﷺ",
    whereNow: "Al-Qaswa died after the Prophet ﷺ. Some accounts say she refused to eat after his death and died of grief within 7 months. She is buried in Medina.",
    source: "Ibn Hisham Seerah; Abu Dawud 2581; Muslim 1218 (Hajj narration)",
  },
  {
    name: "The Seal Ring", nameAr: "خاتم النبوة", type: 'ring',
    description: "The Prophet's ﷺ official signet ring — used to seal all diplomatic letters to kings and rulers. Inscribed: 'Muhammad, Messenger of Allah' (three lines).",
    acquisition: "He made the ring at the time he decided to write to foreign rulers (~7 AH). The ring was made of silver with an Abyssinian stone.",
    custodianRank: 3, custodianName: "Abu Bakr → Umar → Uthman",
    whereNow: "Uthman dropped it into the well of Aris in Medina (~30 AH). Despite draining the well, it was never recovered. The well exists to this day in Medina near Masjid Quba.",
    source: "Bukhari 5873; Muslim 2091",
  },
  {
    name: "The Bow — al-Rawha", nameAr: "القوس الرَّوحاء", type: 'bow',
    description: "The Prophet's ﷺ personal bow — used at the Battle of Uhud when he fired arrows himself from his position on the mountain.",
    acquisition: "A gift to the Prophet ﷺ — classical accounts differ on the giver.",
    custodianName: "Passed to Umar ibn al-Khattab",
    whereNow: "No confirmed museum location. Possibly at Topkapi among unverified relics.",
    source: "Ibn Sa'd Tabaqat 1/487; Waqidi, Kitab al-Maghazi",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 56 — PROPHETIC GIFTS REGISTRY (Hadiyya Exchange)
   ═════════════════════════════════════════════════════════════════════ */
export interface PropheticGift {
  direction: 'prophet-to-companion' | 'companion-to-prophet';
  item: string;
  itemUr?: string;
  itemAr?: string;
  occasion: string;
  occasionUr?: string;
  meaning: string;
  meaningUr?: string;
  source: string;
}

export const GIFTS_DATA: Record<number, PropheticGift[]> = {
  1: [
    {
      direction: 'companion-to-prophet',
      item: "All of his wealth — twice",
      itemUr: 'اپنا سارا مال — دو مرتبہ',
      occasion:
        "The expedition of Tabuk — Abu Bakr brought every dirham he owned. The Prophet ﷺ asked: 'What have you left for your family?' Abu Bakr: 'Allah and His Messenger.'",
      occasionUr:
        "غزوۂ تبوک کے موقع پر ابو بکرؓ نے اپنا ہر درہم لے آ کر پیش کر دیا۔ نبی ﷺ نے فرمایا: 'اپنے گھر والوں کے لیے کیا چھوڑا؟' ابو بکرؓ نے عرض کیا: 'اللہ اور اس کے رسول ﷺ'۔",
      meaning:
        "The most generous single donation in Islamic history — the Prophet ﷺ could not surpass it with words.",
      meaningUr:
        'اسلامی تاریخ کی سب سے بڑی یک وقتی سخاوت—ایسا عطیہ کہ نبی ﷺ بھی اسے الفاظ میں “اس سے بڑھ کر” بیان نہ فرما سکے۔',
      source: 'Abu Dawud 1678; Tirmidhi 3675',
    },
    {
      direction: 'prophet-to-companion',
      item: 'The cloak off his own body',
      itemUr: 'اپنے جسمِ مبارک کی چادر',
      occasion:
        "The Prophet ﷺ gave Abu Bakr his own personal cloak to wrap around him on a cold night during the Hijra",
      occasionUr:
        'ہجرت کی رات سردی کے وقت نبی ﷺ نے ابو بکرؓ کو اپنی ذاتی چادر اوڑھنے کے لیے عطا فرمائی۔',
      meaning: "A deeply intimate gift — the garment was still warm from the Prophet's ﷺ body.",
      meaningUr:
        'یہ نہایت قربت و محبت کی نشانی تھی—چادر نبی ﷺ کے جسمِ مبارک کی گرمی لیے ہوئے تھی۔',
      source: 'Ibn Hisham Seerah 1/487',
    },
  ],
  2: [
    { direction: 'companion-to-prophet', item: "A palace of gold and pearl in Paradise — predicted", occasion: "Umar climbed a hill and saw a vision of a palace — he asked whose it was and was told 'For a man who repents much.' He wept thinking of his sins.", meaning: "The Prophet ﷺ told Umar: 'That palace is yours, O Umar — I saw you in it.'", source: "Bukhari 3242" },
    { direction: 'prophet-to-companion', item: "The title Al-Faruq — 'The Distinguisher'", occasion: "Given when Umar's conversion split the disbelievers in Mecca for the first time", meaning: "The greatest honor — a name from Allah carried through Jibreel", source: "Ibn Hisham Seerah; Tabaqat Ibn Sa'd" },
  ],
  5: [
    { direction: 'companion-to-prophet', item: "A golden bowl of dates and fresh milk — every morning", occasion: "Aisha personally prepared the Prophet's ﷺ suhur and iftar foods during Ramadan throughout their marriage", meaning: "Daily service as an act of love — not grand but perpetual. The Prophet ﷺ once said: 'This is more valuable to me than an army's tribute.'", source: "Bukhari 5425; Muslim 2440" },
    { direction: 'prophet-to-companion', item: "Jibreel's salaam — personally conveyed", occasion: "The Prophet ﷺ said: 'O Aisha — Jibreel sends you his greeting.' Aisha responded: 'And upon him peace and the mercy of Allah.'", meaning: "Aisha was so beloved that the angel of revelation sent her personal greetings — recorded in Sahih al-Bukhari", source: "Bukhari 3768; Muslim 2447" },
  ],
  8: [
    { direction: 'prophet-to-companion', item: "His entire shield and weapons", occasion: "After the Battle of Uhud — the Prophet ﷺ gave Sa'd his personal weapons as a mark of exceptional valor", meaning: "A warrior's ultimate honor — receiving the commander's own weapons", source: "Muslim 2412; Ibn Sa'd Tabaqat" },
  ],
  13: [
    { direction: 'companion-to-prophet', item: "Ten years of complete and joyful service", occasion: "Anas's mother brought him at age 10 saying: 'This is your servant.' Anas never refused any command in 10 years.", meaning: "The Prophet ﷺ never said 'why did you do this' or 'why did you not do this' in 10 years.", source: "Muslim 2309; Bukhari 6038" },
    { direction: 'prophet-to-companion', item: "A piece of cloth from his own garment", occasion: "Anas asked for a piece of the Prophet's ﷺ rida (upper garment). The Prophet ﷺ cut a piece and gave it to him. Anas kept it and was buried with it.", meaning: "He asked to be buried wrapped in it — the garment of the Prophet ﷺ was his burial shroud.", source: "Bukhari 5810; Ibn Sa'd Tabaqat" },
  ],
  15: [
    { direction: 'companion-to-prophet', item: "A journey from Syria across the desert on foot", occasion: "Abu Dharr walked from his home in Ghifar to Mecca to verify the truth of Islam — alone, without water, eating only leaves", meaning: "The most expensive 'gift' — his entire old life. He walked thousands of miles seeking truth.", source: "Bukhari 3861; Muslim 2473" },
  ],
  29: [
    { direction: 'companion-to-prophet', item: "The strategic plan that saved Medina — the Trench", occasion: "Salman proposed the Persian strategy of digging a trench around Medina at the Khandaq, a tactic unknown in Arabia", meaning: "A single idea from a Persian slave that stopped the 10,000-man Quraysh-Ghatafan coalition. The Prophet ﷺ said: 'Salman is from us — Ahl al-Bayt.'", source: "Ibn Hisham Seerah; Ahmad Musnad" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 57 — PRISONERS OF WAR: Capture, Ransom & Freedom Stories
   ═════════════════════════════════════════════════════════════════════ */
export interface POWRecord {
  companion: string;
  companionRank?: number;
  event: string;
  yearAH: number;
  capturedBy?: string;
  capturedIn?: string;
  ransom?: string;
  ransomPaidBy?: string;
  releaseCondition?: string;
  story: string;
  faithImpact: string;
  source: string;
}

export const POW_DATA: POWRecord[] = [
  {
    companion: 'Salman al-Farisi', companionRank: 29,
    event: 'Slave Contract (Kitabah) — his path to Islam',
    yearAH: -5, capturedBy: 'His Jewish master in Medina',
    ransom: '300 date palms + 40 uqiyyas of gold (enormous sum)',
    ransomPaidBy: 'The Prophet ﷺ led the collection personally — companions donated; the Prophet ﷺ placed a golden egg-shaped nugget on the palms to cause them to produce fruit.',
    story: "Salman al-Farisi had been enslaved for decades after his journey seeking prophets. When he reached Medina and found the Prophet ﷺ, he was still technically enslaved under a kitabah (freedom contract) requiring him to plant 300 date palms and pay 40 uqiyyas of gold to his Jewish master. The Prophet ﷺ said: 'Help your brother in his freedom contract.' Every companion planted a palm tree. The Prophet ﷺ himself planted one. All 300 grew — and gave fruit the same year.",
    faithImpact: "The miracle of the palms growing the same year proved to Salman — who had seen prophecies unfold across three continents — that this was the final messenger.",
    source: "Ahmad Musnad 23742; Ibn Hisham Seerah 1/222; Ibn Sa'd Tabaqat",
  },
  {
    companion: 'Abu Jandal ibn Suhail', companionRank: undefined,
    event: 'Detained at Treaty of Hudaybiyyah (6 AH)',
    yearAH: 6, capturedBy: 'His own father — Suhail ibn Amr (Quraysh negotiator)',
    releaseCondition: 'Returned under the treaty terms despite his conversion',
    story: "At Hudaybiyyah, when the treaty was being signed, Abu Jandal appeared in chains — having escaped from Mecca where his own father had imprisoned him for accepting Islam. He dragged his chains to the Prophet's ﷺ feet and begged not to be returned. The clause had just been signed: all who escaped Mecca must be returned. The Prophet ﷺ said: 'O Abu Jandal — be patient and seek reward. Allah will make a way out for you and those like you.' He was returned — weeping. He later escaped to form a free Muslim band on the trade routes.",
    faithImpact: "The hardest test of Hudaybiyyah — a Muslim companion being returned to his father's prison. The companions were shaken. It became the supreme test of trusting the Prophet's ﷺ judgment.",
    source: "Bukhari 2731-2734; Ibn Hisham Seerah",
  },
  {
    companion: 'Abu al-As ibn Rabi\'', companionRank: undefined,
    event: 'Captured at Badr — ransomed by Zaynab (his wife)',
    yearAH: 2, capturedBy: 'Muslim forces at Badr',
    ransom: 'A necklace — originally belonging to Khadijah bint Khuwaylid, given to Zaynab on her wedding',
    ransomPaidBy: 'Zaynab bint Muhammad (daughter of the Prophet ﷺ) — with her own jewelry',
    story: "Zaynab was still married to her non-Muslim husband Abu al-As in Mecca when he was captured at Badr. She sent her personal necklace — a piece of jewelry given to her by her mother Khadijah. When the Prophet ﷺ saw the necklace, he wept and stood up. He said to the companions: 'If you see fit to release her prisoner and return her property, do so.' They returned Abu al-As at no charge. He honored the condition of returning Zaynab to Medina — and later accepted Islam.",
    faithImpact: "The necklace of Khadijah moved the Prophet ﷺ to tears. It showed that Islam separated families — but never erased love. Abu al-As accepted Islam entirely of his own accord — no sword, no pressure.",
    source: "Abu Dawud 2692; Ibn Hisham Seerah; Hakim Al-Mustadrak",
  },
  {
    companion: 'Abdullah ibn Umar (ibn al-Khattab)', companionRank: 30,
    event: 'Attempted conversion at the Battle of Badr — turned back at 13',
    yearAH: 2, capturedBy: 'None — turned back before battle',
    story: "Ibn Umar attempted to join the Battle of Badr at age 13. The Prophet ﷺ inspected the fighters and found him too young — he was sent home. He wept and begged to stay. He was allowed to join at Uhud at age 14 after the Prophet ﷺ reviewed him again. He narrated: 'The day I was turned away from Badr was the hardest day of my life — harder than any wound I received later.'",
    faithImpact: "His burning desire to participate — and his patience when refused — shaped his entire personality of complete submission to prophetic authority.",
    source: "Bukhari 2664; Ibn Sa'd Tabaqat 4/142",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 58 — FREED SLAVES: Complete Liberation Register
   ═════════════════════════════════════════════════════════════════════ */
export interface FreedSlaveRecord {
  name: string;
  nameAr: string;
  companionRank?: number;
  master: string;
  origin: string;
  yearFreed: string;
  freedBy: string;
  price?: string;
  lifeAfter: string;
  hadithCount?: number;
  source: string;
}

export const FREED_SLAVES: FreedSlaveRecord[] = [
  { name: 'Bilal ibn Rabah', nameAr: 'بلال بن رباح', companionRank: 10, master: 'Umayya ibn Khalaf — tortured him on burning rocks', origin: 'Abyssinia', yearFreed: '~610 CE (early prophethood)', freedBy: 'Abu Bakr al-Siddiq', price: '9 uqiyyas of gold (extremely high — Umayya demanded maximum)', lifeAfter: 'First Muezzin of Islam. Called adhan on top of the Ka\'ba. Died in Damascus ~638 CE.', hadithCount: 44, source: 'Ibn Hisham Seerah; Bukhari 604' },
  { name: 'Zayd ibn Haritha', nameAr: 'زيد بن حارثة', companionRank: 6, master: 'Khadijah bint Khuwaylid → the Prophet ﷺ', origin: 'Kalb tribe (northern Arabia)', yearFreed: '~606 CE', freedBy: "The Prophet ﷺ — 'I free you and adopt you as my son'", lifeAfter: 'Adopted son of the Prophet ﷺ. First commander at Battle of Mutah. Only companion named in the Quran (33:37). Martyred at Mutah 8 AH.', hadithCount: 92, source: 'Ibn Hisham Seerah; Quran 33:37' },
  { name: 'Salim mawla Abi Hudhayfa', nameAr: 'سالم مولى أبي حذيفة', companionRank: undefined, master: 'Abu Hudhayfa ibn Utba', origin: 'Unknown (possibly Persian)', yearFreed: 'Before Badr', freedBy: 'Abu Hudhayfa ibn Utba', price: 'No ransom — freed voluntarily', lifeAfter: 'One of four Quran authorities named by the Prophet ﷺ. Led prayer over Abu Bakr and Umar. Died at Yamama reciting al-Baqarah.', hadithCount: 8, source: 'Bukhari 3758; Muslim 2464' },
  { name: 'Umm Ayman (Barakah)', nameAr: 'أم أيمن', companionRank: undefined, master: 'Abdullah ibn Abd al-Muttalib (the Prophet\'s ﷺ father)', origin: 'Abyssinia', yearFreed: '~595 CE (after Abdullah died)', freedBy: "Automatically freed as part of the Prophet's ﷺ household", price: 'None', lifeAfter: "Nursemaid of the Prophet ﷺ since infancy. Called 'my mother after my mother.' Named a 'woman of Paradise' by the Prophet ﷺ. Outlived him.", source: 'Ibn Sa\'d Tabaqat 8/210; Muslim 2454' },
  { name: 'Shuqran (Abu Hubayyib)', nameAr: 'شقران', companionRank: undefined, master: 'The Prophet ﷺ — originally from Banu Zuhra', origin: 'Arabia', yearFreed: '~630 CE', freedBy: 'The Prophet ﷺ himself', price: 'None', lifeAfter: 'Served the Prophet ﷺ closely and was present at his death. Placed a cloth under the Prophet ﷺ in his grave with his own hands.', source: 'Ibn Sa\'d Tabaqat 1/497' },
  { name: 'Khabab ibn al-Aratt', nameAr: 'خباب بن الأرت', companionRank: undefined, master: 'Umm Annar of the Banu Zuhra tribe', origin: 'Arabia', yearFreed: '~614 CE', freedBy: 'Abu Bakr al-Siddiq', price: 'Ransom paid by Abu Bakr — amount not recorded', lifeAfter: 'One of the earliest Muslims. Taught the Quran secretly in Mecca. Was buried alive temporarily by Quraysh as punishment. Narrated 32 hadiths.', hadithCount: 32, source: 'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat' },
  { name: 'Amir ibn Fahira', nameAr: 'عامر بن فهيرة', companionRank: undefined, master: 'Al-Tufayl ibn al-Harith', origin: 'Arabia', yearFreed: '~610 CE', freedBy: 'Abu Bakr al-Siddiq', price: 'Full market price', lifeAfter: 'Became the personal assistant and companion of Abu Bakr. One of the Hijra companions. Martyred at Bir Mauna (4 AH). Angels were seen carrying his body upward.', source: 'Ibn Hisham Seerah 1/337; Ibn Sa\'d Tabaqat' },
  { name: 'Lubayna (the slave girl)', nameAr: 'لبينة', companionRank: undefined, master: 'Umar ibn al-Khattab (before his conversion)', origin: 'Unknown', yearFreed: 'After Umar\'s conversion', freedBy: 'Abu Bakr al-Siddiq', price: 'Paid by Abu Bakr after Umar tortured her for being Muslim before his own conversion', lifeAfter: 'Unknown — the story of her torture was famously cited by Abu Bakr as one of the most extreme cases of persecution.', source: 'Ibn Hisham Seerah; Tabaqat Ibn Sa\'d 8/197' },
  { name: 'Khawlah bint Thalaba (not slave but freed from oppressive custom)', nameAr: 'خولة بنت ثعلبة', companionRank: 47, origin: 'Medina', yearFreed: '~5 AH', master: 'Her husband\'s zihar declaration (pre-Islamic oppressive divorce)', freedBy: "Allah directly — Surah al-Mujadila was revealed in her defense", price: 'An expiation (kaffarah): freeing a slave, or fasting 60 days, or feeding 60 poor', lifeAfter: 'Remained married, her case became the legal foundation for the zihar ruling. Survived to the era of Umar who honored her specifically.', source: 'Quran 58:1-4; Abu Dawud 2214' },
];

// Ranks of freed slave companions (for sidebar filter)
export const FREED_SLAVE_RANKS = new Set(
  FREED_SLAVES.filter(f => f.companionRank).map(f => f.companionRank as number)
);

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 60 — NAMED ANIMALS OF THE COMPANIONS
   ═════════════════════════════════════════════════════════════════════ */
export interface NamedAnimal {
  animalName: string;
  animalNameAr?: string;
  species: 'camel' | 'horse' | 'mule' | 'donkey' | 'cat' | 'other';
  owner: string;
  ownerRank?: number;
  role: string;
  story: string;
  fate?: string;
  source: string;
}

export const NAMED_ANIMALS: NamedAnimal[] = [
  { animalName: 'Al-Qaswa', animalNameAr: 'القصواء', species: 'camel', owner: 'The Prophet ﷺ', role: 'Personal riding camel — the most famous animal in Islamic history', story: "Al-Qaswa carried the Prophet ﷺ on the Hijra, and when she sat at what is now the site of Masjid al-Nabawi and refused to move, the Prophet ﷺ said: 'She has not stopped of her own will — the One who stopped the elephant has stopped her.' This determined the location of the mosque. At Hudaybiyyah, she sat down before the Qurayshi borders and refused to advance.", fate: "She reportedly died of grief within months of the Prophet's ﷺ death. Her grave is said to be in Medina.", source: "Bukhari 2731; Ibn Hisham Seerah 2/118" },
  { animalName: 'Duldul', animalNameAr: 'دلدل', species: 'mule', owner: 'The Prophet ﷺ (gifted by Muqawqis of Egypt)', role: 'Personal riding mule — the first mule in Arabia, gifted by the Coptic ruler', story: "The Muqawqis sent Duldul — a white mule — as a gift with his famous letter to the Prophet ﷺ. The Prophet ﷺ rode Duldul frequently, and Ali also rode it. Duldul was still alive in the time of Muawiyah and became nearly legendary — said to have lived 60+ years.", fate: "Lived to extreme old age; lost his teeth and had to be hand-fed. Died in Medina.", source: "Ibn Sa'd Tabaqat 1/493; Waqidi Maghazi" },
  { animalName: "Ya'fur", animalNameAr: 'يعفور', species: 'donkey', owner: 'The Prophet ﷺ', role: 'Personal riding donkey — used for short distances in Medina', story: "Ya'fur (meaning 'fawn-colored') was beloved to the Prophet ﷺ. After the Prophet's ﷺ death, the donkey walked to a well and threw itself in — out of grief, according to classical biographers.", fate: "Threw itself into a well the day the Prophet ﷺ died — according to Ibn Sa'd.", source: "Ibn Sa'd Tabaqat 1/492; Tabarani Al-Kabir" },
  { animalName: 'Sukayb', species: 'horse', owner: 'The Prophet ﷺ (first horse)', role: 'First horse owned by the Prophet ﷺ — purchased in Medina', story: "The Prophet ﷺ had multiple horses. Sukayb was reportedly the first. He also owned Lizaz (which he rode at Badr), Murtajiz, and Sabhah — each with distinct stories.", source: "Ibn Sa'd Tabaqat 1/489; Waqidi" },
  { animalName: "Mukhda the cat of Abu Hurayra", animalNameAr: 'هرة أبي هريرة', species: 'cat', owner: 'Abu Hurayra', ownerRank: 17, role: 'Personal pet cat — the source of his kunya (Abu Hurayra means "Father of the Kitten")', story: "Abu Hurayra got his famous kunya from a small kitten he carried in his sleeve as a boy. The Prophet ﷺ saw it and said: 'O father of the kitten!' — and the name stuck for eternity. He is also known for narrating that the Prophet ﷺ wiped his hand over a cat, and it became tame and sat with him during revelation.", source: "Ibn Sa'd Tabaqat 4/328; Bukhari context" },
  { animalName: "The horse of Khalid ibn al-Walid (unnamed — but fought 100 battles)", species: 'horse', owner: 'Khalid ibn al-Walid', ownerRank: 12, role: 'Battle horse — carried Khalid through 100 battles; never injured', story: "Khalid said on his deathbed: 'I have fought in 100 battles and there is not a handspan of my body except that it bears a wound from a sword or arrow — yet here I die in my bed like a camel. May the eyes of cowards never sleep in peace.' His horse was never once injured in battle — considered a blessed animal.", source: "Ibn Asakir; Tabaqat Ibn Sa'd 7/81" },
  { animalName: "Camel of Umm Salama — her Hijra companion", species: 'camel', owner: 'Umm Salama', ownerRank: undefined, role: 'Carried her on the solo Hijra when her husband and son were taken from her', story: "When Umm Salama's husband Abu Salama migrated to Medina, her tribe took her baby son and her own tribe held her. She was separated from both husband and son. After a year of weeping daily in public, a compassionate man of her husband's tribe returned her son. She loaded her camel alone and rode from Mecca to Medina — the bravest solo journey of the Hijra.", source: "Ibn Hisham Seerah 2/8; Ibn Sa'd Tabaqat 8/90" },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 61 — LAND & PROPERTY GRANTS (Iqta Register)
   ═════════════════════════════════════════════════════════════════════ */
export interface LandGrant {
  companion: string;
  companionRank?: number;
  property: string;
  location: string;
  grantedBy: string;
  yearAH?: number;
  size?: string;
  purpose: string;
  whatHappenedToIt: string;
  source: string;
}

export const LAND_GRANTS: LandGrant[] = [
  { companion: 'Abu Talha al-Ansari', companionRank: 20, property: 'Bayruha — the most beloved garden in Medina', location: 'Medina, opposite Masjid al-Nabawi', grantedBy: 'He owned it — gave it away when Quran 3:92 was revealed', yearAH: 3, size: 'Large date palm garden — the most valuable property near the mosque', purpose: 'Charitable waqf after hearing "You will not attain righteousness until you spend of what you love"', whatHappenedToIt: 'Given to relatives of Abu Bakr as sadaqah — became a perpetual waqf producing dates used to feed the poor of Medina.', source: 'Bukhari 1461; Muslim 998' },
  { companion: 'Sa\'d ibn Abi Waqqas', companionRank: 8, property: 'Aqiq valley land grant', location: 'Wadi al-Aqiq, west of Medina', grantedBy: 'The Prophet ﷺ', yearAH: 7, purpose: 'Personal estate — reward for service at Badr and Uhud', whatHappenedToIt: 'Became the most productive estate in Medina; Sa\'d became the wealthiest of the Muhajireen by the time of his death.', source: 'Abu Dawud; Ibn Sa\'d Tabaqat' },
  { companion: 'Khalid ibn al-Walid', companionRank: 12, property: 'Land in Homs, Syria', location: 'Homs (Emesa), modern Syria', grantedBy: 'Caliph Umar ibn al-Khattab', yearAH: 15, purpose: 'Granted after the conquest of Syria', whatHappenedToIt: 'Khalid died in Homs. The famous mosque over his grave — Khalid ibn al-Walid Mosque — was built on what may be near this estate. Destroyed and rebuilt multiple times.', source: 'Ibn Asakir; Ibn Kathir Al-Bidaya 7/115' },
  { companion: 'Zubayr ibn al-Awwam', property: 'Ghabah, Aqi, and Khaybar shares', location: 'Multiple — Medina outskirts, Khaybar', grantedBy: 'The Prophet ﷺ (Khaybar shares) + personal purchases', yearAH: 7, purpose: 'Agricultural and commercial investment', whatHappenedToIt: 'Zubayr ibn al-Awwam died with enormous debts (2,200,000 dirhams) that his son Abdullah paid off by selling the land — all debts cleared, surplus distributed to heirs. The story is told in Bukhari.', source: 'Bukhari 3129; Ibn Sa\'d Tabaqat 3/104' },
  { companion: 'Bilal ibn Rabah', companionRank: 10, property: 'Small plot in Medina — the Prophet\'s ﷺ personal grant', location: 'Medina near Masjid al-Nabawi', grantedBy: 'The Prophet ﷺ personally', yearAH: 1, purpose: 'Personal residence after emigration — he arrived as a freed slave with nothing', whatHappenedToIt: "Bilal gave most of it away in charity. When he moved to Damascus after the Prophet's ﷺ death, his Medina property was maintained for travelers.", source: 'Ibn Sa\'d Tabaqat 3/236' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 62 — BATTLE WOUNDS REGISTRY
   ═════════════════════════════════════════════════════════════════════ */
export interface BattleWound {
  battle: string;
  yearAH: number;
  injury: string;
  bodyPart?: string;
  weapon: string;
  treatedBy?: string;
  outcome: string;
  source: string;
}

export const BATTLE_WOUNDS: Record<number, BattleWound[]> = {
  4: [ // Ali ibn Abi Talib
    { battle: 'Battle of Badr', yearAH: 2, injury: 'Multiple sword cuts — fought in single combat', weapon: 'Sword', outcome: 'Survived — killed several opponents including Walid ibn Utba', source: 'Ibn Hisham Seerah 2/261' },
    { battle: 'Battle of Uhud', yearAH: 3, injury: 'Deep wounds defending the Prophet ﷺ — shielded him with his own body', bodyPart: 'Multiple', weapon: 'Arrows and swords', treatedBy: 'Fatima and Umm Sulaym', outcome: 'Survived — 62 wounds recorded across all battles', source: 'Ibn Hisham Seerah; Tabaqat Ibn Sa\'d' },
    { battle: 'Battle of Khandaq', yearAH: 5, injury: 'Struck by spear in foot during the crossing', bodyPart: 'Foot', weapon: 'Spear', treatedBy: 'Fatima', outcome: 'Survived — fought on', source: 'Waqidi Maghazi; Ibn Sa\'d' },
    { battle: 'Night of assassination (39 AH)', yearAH: 40, injury: 'Struck on the head by a poison-coated sword at Fajr prayer', bodyPart: 'Head', weapon: 'Poisoned sword', treatedBy: 'Physicians of Kufa — could not counteract the poison', outcome: 'Martyrdom — died 2 days after the assassination. The man who struck him was Ibn Muljam.', source: 'Ibn Asakir; Tabaqat Ibn Sa\'d 3/40' },
  ],
  7: [ // Hamza ibn Abd al-Muttalib
    { battle: 'Battle of Uhud', yearAH: 3, injury: 'Struck by javelin thrown by Wahshi ibn Harb — fatal wound', bodyPart: 'Chest/flank', weapon: 'Javelin (throwing spear)', treatedBy: 'None — died on impact', outcome: 'Martyrdom — first major companion martyred. Body was mutilated by Hind bint Utba.', source: 'Bukhari 3034; Ibn Hisham Seerah' },
  ],
  8: [ // Sa'd ibn Abi Waqqas
    { battle: 'Battle of Badr', yearAH: 2, injury: 'First arrow wound in Islamic warfare — also fired the first arrow', bodyPart: 'Arm', weapon: 'Arrow', treatedBy: 'The medical unit', outcome: 'Survived — continued to fight in all subsequent battles', source: 'Ibn Hisham Seerah; Ibn Sa\'d Tabaqat' },
    { battle: 'Battle of Uhud', yearAH: 3, injury: 'Multiple arrow wounds defending the Prophet ﷺ — the Prophet ﷺ said "Shoot Sa\'d! My father and mother be ransom for you!"', bodyPart: 'Multiple', weapon: 'Arrows', outcome: 'Survived — this battle is where the Prophet ﷺ gave his unique ransom declaration for Sa\'d', source: 'Bukhari 3725' },
  ],
  9: [ // Abu Ubayda
    { battle: 'Battle of Uhud', yearAH: 3, injury: 'Two chain mail rings pierced his cheeks removing arrows', bodyPart: 'Both cheeks', weapon: 'Arrows — driven deep into cheeks', treatedBy: 'Self — he pulled out the arrows with his own teeth, breaking two teeth', outcome: 'Survived — lost two front teeth, which gave his speech a slight whistle for the rest of his life', source: 'Ibn Sa\'d Tabaqat 3/410; Abu Dawud' },
  ],
  12: [ // Khalid ibn al-Walid
    { battle: 'All battles combined', yearAH: 2, injury: 'More than 70 wounds recorded across 200+ battles. Said on his deathbed: "There is not a span of my body except it has a wound from sword or arrow."', bodyPart: 'Full body', weapon: 'Swords, arrows, spears', outcome: 'Survived ALL battles — never defeated. Died in his bed aged ~60.', source: 'Ibn Asakir; Ibn Kathir Al-Bidaya 7/115' },
  ],
  27: [ // Ammar ibn Yasir
    { battle: 'Battle of Siffin', yearAH: 37, injury: 'Spear thrust — killed at age 90+', bodyPart: 'Chest', weapon: 'Spear', outcome: 'Martyrdom — the Prophet ﷺ had predicted: "Ammar will be killed by the transgressing party." When Muawiyah\'s army killed him, Ammar\'s side pointed to this as proof.', source: 'Muslim 2915; Ahmad Musnad' },
    { battle: 'Battle of Siffin pre-wounds', yearAH: 37, injury: 'Lost one eye in the battle of Yamama', bodyPart: 'Eye', weapon: 'Sword', outcome: 'Survived Yamama but lost the eye — fought for 25 more years after', source: 'Tabaqat Ibn Sa\'d 3/256' },
  ],
};
