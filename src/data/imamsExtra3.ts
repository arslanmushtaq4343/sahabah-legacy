/* ─────────────────────────────────────────────────────────────────────────
   Imams Extra 3  —  Features 90 (Qira'at), 91 (Qawl Sahabi), 94 (Ijtihad)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 90 — THE 7 QIRA'AT (Canonical Recitation Styles)
   Each style traced back to its founding companion and dialect region
   ═════════════════════════════════════════════════════════════════════ */
export interface QiraatStyle {
  id: string;
  qariName: string;          // Name of the Qari (classical reader) who formalized it
  qariAr: string;
  died: string;
  region: string;
  regionAr: string;
  color: string;
  companionSource: string;   // The companion whose recitation this preserves
  companionRank?: number;
  companionTransmission: string;  // How the chain works
  distinctiveFeature: string;     // What makes this recitation style unique
  twoRawis: string;              // The two main transmitters (rawis)
  modernUse: string;             // Where this recitation is used today
  exampleVerse: string;          // A verse showing the difference
  exampleDiff: string;           // The specific phonetic difference
}

export const QIRAAT_SEVEN: QiraatStyle[] = [
  {
    id: 'nafi', qariName: "Nafi' al-Madani", qariAr: "نافع المدني", died: '169 AH / 785 CE', color: '#0a5c2e',
    region: 'Medina', regionAr: 'المدينة المنورة',
    companionSource: "Ubayy ibn Ka'b + Abu Hurayra + Ibn Abbas",
    companionTransmission: "Nafi' recited from 70 Tabi'i scholars, tracing back primarily to Ubayy ibn Ka'b (the Prophet's ﷺ designated recitation master) via Yazid ibn al-Qa'qa'.",
    distinctiveFeature: "Known for its clarity and measured pace (tarteel). Characterized by specific vowel elongations (madd) and the idgham (assimilation) rules that differ from other styles.",
    twoRawis: 'Warsh (d. 197 AH) — used in North/West Africa, Egypt. Qalun (d. 220 AH) — used in Libya and some Medina communities.',
    modernUse: 'The Warsh recitation is used throughout North Africa (Morocco, Algeria, Tunisia, Libya), West Africa, and parts of the Gulf. Over 400 million Muslims recite in the Nafi\' tradition.',
    exampleVerse: 'Surah Al-Fatiha 1:4 — مَالِكِ يَوْمِ الدِّينِ',
    exampleDiff: 'Warsh reads: "Maalik" (with madd — elongation) vs. Hafs: "Malik" (no elongation). Both are equally valid and documented.',
  },
  {
    id: 'ibn-kathir', qariName: "Ibn Kathir al-Makki", qariAr: "ابن كثير المكي", died: '120 AH / 737 CE', color: '#b8860b',
    region: 'Mecca', regionAr: 'مكة المكرمة',
    companionSource: 'Abdullah ibn al-Zubayr + Abu Ayyub al-Ansari + Anas ibn Malik',
    companionTransmission: "Ibn Kathir received from Mujahid and Dirba ibn Kilab, tracing to Abdullah ibn al-Zubayr who received from Uthman ibn Affan and Ubayy ibn Ka'b.",
    distinctiveFeature: "Mecca's recitation tradition — compact and precise. Known for its treatment of hamza (glottal stop) and specific voweling patterns.",
    twoRawis: "Bazzi (d. 250 AH) and Qunbul (d. 291 AH) — both based in Mecca.",
    modernUse: 'Primarily academic and in some Gulf communities. The Mecca itself primarily uses Hafs today due to the Quran printing standardization.',
    exampleVerse: 'Bismillah treatment and joining of ayahs',
    exampleDiff: "Ibn Kathir's tradition reads Bismillah as part of each surah's beginning with different madd rules than Hafs.",
  },
  {
    id: 'abu-amr', qariName: "Abu Amr al-Basri", qariAr: "أبو عمرو البصري", died: '154 AH / 770 CE', color: '#8b3a08',
    region: 'Basra', regionAr: 'البصرة',
    companionSource: "Anas ibn Malik + Abu Musa al-Ash'ari",
    companionTransmission: "The Basra recitation tradition traces through Abu Musa al-Ash'ari (the most beautiful reciter among companions — the Prophet ﷺ called his voice a 'flute of David') and the extraordinary community of Basra.",
    distinctiveFeature: "Known for idgham (assimilation) — the merging of consecutive similar sounds. More flowing and connected than other styles. Reflects the influence of Abu Musa al-Ash'ari's melodic recitation tradition.",
    twoRawis: "Duri (d. 246 AH) — most widely transmitted; Susi (d. 261 AH).",
    modernUse: 'Used in parts of Sudan, Somalia, Yemen, and some East African communities. The Duri transmission is most common.',
    exampleVerse: 'Treatment of nun sakinah and tanwin',
    exampleDiff: 'Abu Amr fully assimilates similar adjacent sounds across word boundaries — creating a more fluid recitation style.',
  },
  {
    id: 'ibn-aamir', qariName: "Ibn Aamir al-Shami", qariAr: "ابن عامر الشامي", died: '118 AH / 736 CE', color: '#1a3462',
    region: 'Damascus (Syria)', regionAr: 'دمشق',
    companionSource: "Uthman ibn Affan + Mu'adh ibn Jabal",
    companionTransmission: "Ibn Aamir received from al-Mughirah ibn Abi Shihab who received directly from Uthman ibn Affan — the Caliph who standardized the Quran. The Syrian tradition thus traces directly to the man who produced the authorized mushaf.",
    distinctiveFeature: "The Damascus tradition reflects the recitation Uthman himself used when distributing the authorized copies. Known for specific treatment of two hamzas in the same word.",
    twoRawis: "Hisham (d. 245 AH) — the dominant Syrian transmission; Ibn Dhakwan (d. 242 AH).",
    modernUse: 'Used in Syria, Jordan, and parts of Lebanon. After the Syrian civil war, Hisham transmission communities became significant in diaspora communities.',
    exampleVerse: 'Surah Al-Baqarah 2:232 — أَن يَنكِحْنَ أَزْوَاجَهُنَّ',
    exampleDiff: "Ibn Aamir separates the two hamzas differently from other traditions, reflecting the Uthmanic mushaf tradition.",
  },
  {
    id: 'asim', qariName: "Asim ibn Abi al-Najud", qariAr: "عاصم بن أبي النجود", died: '127 AH / 744 CE', color: '#509070',
    region: 'Kufa', regionAr: 'الكوفة',
    companionSource: "Abdullah ibn Mas'ud + Ali ibn Abi Talib",
    companionTransmission: "Asim received from Abu Abd al-Rahman al-Sulami who received from Ali ibn Abi Talib AND Abdullah ibn Mas'ud — making the Kufa tradition the confluence of both Ali's and Ibn Mas'ud's recitation schools.",
    distinctiveFeature: "The most widely used recitation in the world today — in its Hafs transmission. Known for precise articulation points (makhaarij) and clear hamza pronunciation.",
    twoRawis: "Hafs (d. 180 AH) — used by 1.8 billion Muslims today; Shu'ba (d. 193 AH).",
    modernUse: "Via the Hafs transmission: the official recitation of Saudi Arabia, Egypt, Pakistan, India, Turkey, Indonesia, and most of the Muslim world. The Medina mushaf (King Fahad Quran Complex) uses Hafs 'an Asim. This is what 90%+ of Muslims worldwide hear and recite.",
    exampleVerse: 'Standard Arabic Quran recitation as heard globally',
    exampleDiff: "Hafs 'an Asim is the baseline against which all other recitations are typically compared.",
  },
  {
    id: 'hamza', qariName: "Hamza al-Zayyat al-Kufi", qariAr: "حمزة الزيات الكوفي", died: '156 AH / 772 CE', color: '#7a1010',
    region: 'Kufa', regionAr: 'الكوفة',
    companionSource: "Ali ibn Abi Talib + Abdullah ibn Mas'ud (via Kufa chain)",
    companionTransmission: "Hamza received from al-A'mash and Ja'far al-Sadiq — tracing back through the Kufa tradition to Ali ibn Abi Talib. He was a hadith scholar and recitation teacher simultaneously.",
    distinctiveFeature: "Known for unique treatment of hamza — full pronunciation rather than softening. Also has specific rules for waqf (pause) that differ significantly from Hafs.",
    twoRawis: "Khalaf (d. 229 AH) and Khallad (d. 220 AH).",
    modernUse: 'Used by a scholarly minority in Egypt and historically in Iraq. Important for Quranic science studies.',
    exampleVerse: 'Consistent full hamza pronunciation throughout',
    exampleDiff: "Hamza fully articulates the hamza wherever it appears — considered the 'hardest' recitation for non-native Arabic speakers to master.",
  },
  {
    id: 'kisai', qariName: "Al-Kisa'i al-Kufi", qariAr: "الكسائي الكوفي", died: '189 AH / 804 CE', color: '#4a4a8a',
    region: 'Kufa → Baghdad', regionAr: 'الكوفة — بغداد',
    companionSource: "Ali ibn Abi Talib (via Kufa chain) + Abu Bakr al-Siddiq (via Abu Abd al-Rahman al-Sulami)",
    companionTransmission: "Al-Kisa'i was simultaneously an Arabic grammar scholar (student of Sibawayhi's rival in the Basra-Kufa grammar dispute) and a Quran recitation master. He combines the Kufa tradition with grammatical precision.",
    distinctiveFeature: "Known for imam al-nahw (grammar mastery) combined with recitation — his style reflects Arabic grammatical logic. Specific treatment of imalah (vowel inclination toward 'e' sound).",
    twoRawis: "Abu al-Harith (d. 240 AH) and Duri (d. 246 AH — the same Duri who transmits Abu Amr).",
    modernUse: 'Primarily in scholarly and academic settings. Al-Kisa\'i\'s recitation is studied for its linguistic precision.',
    exampleVerse: 'Imalah (inclination) treatment in specific vowel contexts',
    exampleDiff: "Al-Kisa'i reads certain /'a'/ vowels as inclined toward /'e'/ — reflecting a North Arabian dialect feature documented by Arab grammarians.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 91 — QAWL AL-SAHABI
   Companion legal opinions that became binding/persuasive in Islamic law
   ═════════════════════════════════════════════════════════════════════ */
export interface QawlEntry {
  companion: string;
  companionRank: number;
  color: string;
  topic: string;
  topicAr: string;
  category: 'prayer' | 'inheritance' | 'marriage' | 'trade' | 'purity' | 'political' | 'worship' | 'criminal';
  opinionEn: string;
  opinionAr: string;
  source: string;
  usulStatus: 'binding' | 'persuasive' | 'contested';
  usulNote: string;
  madhabAdoption: { madhab: string; accepted: boolean; note: string }[];
}

export const QAWL_SAHABI: QawlEntry[] = [
  {
    companion: 'Umar ibn al-Khattab', companionRank: 2, color: '#8b3a08',
    topic: 'Three Talaqs in One Sitting = One Talaq (reversed)', topicAr: 'الطلاق الثلاث دفعة واحدة',
    category: 'marriage',
    opinionEn: 'Umar ruled that pronouncing triple divorce in one sitting counts as three final divorces — reversing the Prophet\'s ﷺ earlier practice where it was treated as one revocable divorce.',
    opinionAr: 'إذا قال الرجل: أنتِ طالق ثلاثاً وقعت الثلاث',
    source: "Muslim 1472; Ibn Sa'd commentary",
    usulStatus: 'contested',
    usulNote: "Umar's ruling was a policy decision (siyasah) to curb abuse of the divorce formula — he saw that men were saying 'three times' carelessly. The original Sunnah treated it as one. Ibn Taymiyya later ruled it should revert to one, as per the original Prophetic practice. This remains one of the most disputed qawl sahabi.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: true, note: "Accepts Umar's ruling as the established practice" },
      { madhab: 'Maliki', accepted: true, note: "Follows the Umar ruling as Medinan consensus" },
      { madhab: "Shafi'i", accepted: true, note: "Follows the majority position" },
      { madhab: 'Hanbali', accepted: false, note: "Ibn Hanbal initially followed the majority; Ibn Taymiyya (Hanbali) later argued for one talaq only" },
    ],
  },
  {
    companion: 'Umar ibn al-Khattab', companionRank: 2, color: '#8b3a08',
    topic: 'The Tarawih Prayer — Organized Group Worship', topicAr: 'صلاة التراويح جماعة',
    category: 'prayer',
    opinionEn: 'Umar organized the scattered individual Tarawih prayer (which people were performing alone or in small groups in Ramadan) into a single congregation led by Ubayy ibn Ka\'b. He said: "What an excellent innovation (bid\'ah) this is!"',
    opinionAr: 'نعمت البدعة هذه',
    source: 'Bukhari 2010',
    usulStatus: 'binding',
    usulNote: "Umar's organized Tarawih became the universal Muslim practice in Ramadan. His use of the word 'bid'ah' here is the basis of the classical distinction between bid'ah hasanah (good innovation) and bid'ah sayyi'ah (bad innovation) — a major debate in Islamic legal theory.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: true, note: "20 rak'ahs, following Umar's organized format" },
      { madhab: 'Maliki', accepted: true, note: "36 rak'ahs (Medina practice); organized format follows Umar" },
      { madhab: "Shafi'i", accepted: true, note: "20 rak'ahs; universal adoption of Umar's organized format" },
      { madhab: 'Hanbali', accepted: true, note: "20 rak'ahs; consensus on Umar's organization" },
    ],
  },
  {
    companion: "Abu Bakr al-Siddiq", companionRank: 1, color: '#b8860b',
    topic: "The Dhawi al-Arham Inheritance Principle", topicAr: 'توريث ذوي الأرحام',
    category: 'inheritance',
    opinionEn: "Abu Bakr ruled that in the absence of direct heirs, inheritance should pass to maternal relatives (dhawi al-arham) — expanding the Quranic inheritance system beyond what the text explicitly states.",
    opinionAr: 'يرث ذوو الأرحام عند عدم العصبة والفرض',
    source: "Ibn Qudama al-Mughni; Bayhaqi",
    usulStatus: 'persuasive',
    usulNote: "This qawl directly shaped how Hanafi and Hanbali madhabs handle inheritance when primary heirs are absent. The Maliki madhab rejects dhawi al-arham inheritance in favor of giving the estate to the public treasury (Bayt al-Mal). A classic case where one companion opinion divided the madhabs.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: true, note: "Fully adopts dhawi al-arham inheritance — Abu Bakr's ruling is foundational" },
      { madhab: 'Maliki', accepted: false, note: "Rejects dhawi al-arham — gives to Bayt al-Mal instead" },
      { madhab: "Shafi'i", accepted: true, note: "Accepts with conditions on who qualifies as dhawi al-arham" },
      { madhab: 'Hanbali', accepted: true, note: "Fully accepts — considers Abu Bakr's ruling binding" },
    ],
  },
  {
    companion: "Ali ibn Abi Talib", companionRank: 4, color: '#0a3d2e',
    topic: "The Hadd Penalty for Wine — 80 Lashes", topicAr: 'حد الخمر ثمانون جلدة',
    category: 'criminal',
    opinionEn: 'The Quran does not specify the number of lashes for wine drinking. Ali argued for 80 lashes by analogy: "A drunk man becomes confused and when confused he slanders people, and slander (qadhf) carries 80 lashes — therefore wine carries 80."',
    opinionAr: 'إذا شرب سكر وإذا سكر هذى وإذا هذى افترى فحدّوه حد المفتري',
    source: "Bukhari 6775; Muwatta Malik",
    usulStatus: 'binding',
    usulNote: "Ali's qiyas (analogical reasoning) became the established ruling in all four madhabs — making it one of the clearest examples of a companion opinion establishing a ruling through reasoning, not explicit text. The rule was implemented during Umar's caliphate at Ali's recommendation.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: true, note: "80 lashes — Ali's analogy fully adopted" },
      { madhab: 'Maliki', accepted: true, note: "80 lashes — based on Ali's reasoning and Umar's implementation" },
      { madhab: "Shafi'i", accepted: false, note: "40 lashes (from the Sunnah) — Al-Shafi'i rejected the analogical increase; 80 is ta'zir (discretionary)" },
      { madhab: 'Hanbali', accepted: true, note: "80 lashes — following the majority companion position" },
    ],
  },
  {
    companion: "Aisha bint Abi Bakr", companionRank: 5, color: '#7a3060',
    topic: "Recitation of Quran While Menstruating (from memory)", topicAr: 'قراءة الحائض القرآن',
    category: 'worship',
    opinionEn: "Aisha held that a woman in the state of menstruation may recite the Quran from memory (without touching the physical mushaf). She herself recited while in this state.",
    opinionAr: 'تقرأ الحائض القرآن من غير مس المصحف',
    source: "Bayhaqi; Ibn Abi Shayba; narrated via Aisha's students",
    usulStatus: 'persuasive',
    usulNote: "Aisha's practice and opinion became a key data point in the most debated women's worship question in Islamic jurisprudence. Her position was adopted by Ibn Taymiyya and is the basis of contemporary fatwas permitting Quran recitation during menstruation.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: false, note: "Prohibits any Quran recitation during menstruation" },
      { madhab: 'Maliki', accepted: true, note: "Permits recitation without touching mushaf — follows Aisha's position" },
      { madhab: "Shafi'i", accepted: false, note: "Prohibits recitation during menstruation" },
      { madhab: 'Hanbali', accepted: true, note: "Permits recitation from memory — Ibn Taymiyya explicitly followed Aisha's position" },
    ],
  },
  {
    companion: "Ibn Abbas", companionRank: 19, color: '#2a5080',
    topic: "Mut'ah (Temporary Marriage) — Its Status After the Prophet ﷺ", topicAr: "نكاح المتعة",
    category: 'marriage',
    opinionEn: "Ibn Abbas initially permitted mut'ah in cases of extreme necessity, arguing its prohibition was not definitively established in the Quran. He later recanted this view, saying he had not known of its final prohibition.",
    opinionAr: 'كان ابن عباس يرخّص فيها ثم رجع',
    source: "Muslim 1405; Ibn Sa'd Tabaqat 2/14",
    usulStatus: 'contested',
    usulNote: "Ibn Abbas's early permission — and later reversal — is one of the most discussed companion opinion evolutions. The Shi'a tradition accepts mut'ah based on Ibn Abbas's earlier position. The Sunni consensus follows the Prophet's ﷺ definitive prohibition narrated by Ali and others. A classic case of a companion's evolving ijtihad affecting inter-madhab division.",
    madhabAdoption: [
      { madhab: 'Hanafi', accepted: false, note: "Unanimously prohibited — follows Prophet's ﷺ prohibition, not Ibn Abbas's early view" },
      { madhab: 'Maliki', accepted: false, note: "Unanimously prohibited" },
      { madhab: "Shafi'i", accepted: false, note: "Unanimously prohibited" },
      { madhab: 'Hanbali', accepted: false, note: "Unanimously prohibited" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 94 — COMPANION IJTIHAD EVOLUTION
   Cases where companions changed their own legal opinions
   ═════════════════════════════════════════════════════════════════════ */
export interface IjtihadChange {
  companion: string;
  companionRank: number;
  color: string;
  topic: string;
  originalPosition: string;
  revisedPosition: string;
  reasonForChange: string;
  hadithOrSource: string;
  year?: string;
  madhahbImpact: string;
}

export const IJTIHAD_CHANGES: IjtihadChange[] = [
  {
    companion: 'Umar ibn al-Khattab', companionRank: 2, color: '#8b3a08',
    topic: "Women Performing Hajj Without a Mahram",
    originalPosition: "Women require a mahram (male guardian) for Hajj — Umar initially refused to permit the Prophet's ﷺ wives to go on Hajj without a mahram.",
    revisedPosition: "Umar later permitted the Prophet's ﷺ wives to perform Hajj with a trusted group of male companions (Uthman and Abd al-Rahman ibn Awf). He distinguished between senior, respected women and others.",
    reasonForChange: "Reconciling the Prophetic command for women to perform Hajj with the mahram principle — Umar concluded that a group of trusted companions fulfilled the spirit of the mahram requirement for mature women.",
    hadithOrSource: "Bukhari 1860; Ibn Sa'd Tabaqat 3/300 — the documented reversal",
    madhahbImpact: "This reversal influenced the Maliki and Hanbali positions that allow groups of women to travel to Hajj together without individual mahrams — a ruling of enormous practical significance.",
  },
  {
    companion: 'Umar ibn al-Khattab', companionRank: 2, color: '#8b3a08',
    topic: "The Share of the Prophet's ﷺ Family in Zakat",
    originalPosition: "Umar initially distributed zakat according to a strictly egalitarian formula, reducing the share of Quraysh relative to their status.",
    revisedPosition: "Umar later instituted a diwan (registry) with differentiated stipends — giving higher amounts to those with earlier conversion, greater sacrifice, and Prophetic family connection.",
    reasonForChange: "Pragmatic governance: equal distribution caused social instability. The diwan system recognized spiritual and historical contribution as valid criteria for public welfare differentiation.",
    hadithOrSource: "Tabari Tarikh 4/218; Ibn Sa'd Tabaqat 3/298",
    madhahbImpact: "The diwan system became the model for Islamic public finance — differentiating between basic welfare (equal) and meritocratic civic rewards (differentiated).",
  },
  {
    companion: 'Aisha bint Abi Bakr', companionRank: 5, color: '#7a3060',
    topic: "The Vision of the Prophet ﷺ — Did He See Allah?",
    originalPosition: "Aisha initially did not correct narrations that the Prophet ﷺ saw Allah with his physical eyes during the Miraj.",
    revisedPosition: "Aisha explicitly stated: 'Whoever claims the Prophet ﷺ saw His Lord has lied greatly.' She argued the Quran says 'No vision can grasp Him' — this applies universally.",
    reasonForChange: "Aisha's correction arose when asked directly — she realized the theological implication of companions narrating physical vision of Allah and intervened with Quranic evidence.",
    hadithOrSource: "Muslim 177; Bukhari 4855 — Aisha's direct correction",
    madhahbImpact: "Aisha's correction is cited by al-Ash'ari and the majority theological school as settling this question. The Mu'tazilite position (no vision) was not adopted, but Aisha's clarification shaped the mainstream Sunni nuance: vision of the heart (fu'ad) yes, physical eyes unclear.",
  },
  {
    companion: 'Ibn Abbas', companionRank: 19, color: '#2a5080',
    topic: "Killing Apostates — Is It Mandatory?",
    originalPosition: "Ibn Abbas initially held the mainstream position that apostasy carries the death penalty.",
    revisedPosition: "Ibn Abbas later stated: 'Present repentance to them first. If they repent, release them. If they do not, then imprison them — do not kill them hastily.' He argued for a period of seeking repentance, not immediate execution.",
    reasonForChange: "Ibn Abbas's extensive Quranic scholarship led him to distinguish between apostasy + active warfare against Muslims (punishable by death) and apostasy alone (for which he argued imprisonment and invitation to repentance).",
    hadithOrSource: "Ibn Abi Shayba Musannaf 12/264; Bayhaqi Sunan al-Kubra",
    madhahbImpact: "Ibn Abbas's revised opinion influenced later scholars who distinguished between different types of apostasy. In contemporary Islamic legal discourse, his position is cited by scholars arguing for differentiation between 'belief apostasy' and 'combatant apostasy.'",
  },
  {
    companion: "Sa'd ibn Abi Waqqas", companionRank: 8, color: '#5a3080',
    topic: "Participation in Muslim Civil Conflicts (Fitna)",
    originalPosition: "Sa'd initially prepared to fight alongside Ali against Mu'awiyah, believing Ali's cause was just.",
    revisedPosition: "Sa'd withdrew entirely from the conflict. He said: 'Bring me a sword that distinguishes between a Muslim and a non-Muslim — for the Prophet ﷺ said the one who fights civil strife with it is a kafir.' He lived in self-imposed isolation outside Medina until his death.",
    reasonForChange: "Sa'd believed the hadith about civil strife (fitna) prohibited him from taking sides in what was essentially an intra-Muslim conflict. He applied the prophetic warning literally and chose no-position as the most religiously sound position.",
    hadithOrSource: "Bukhari 7084; Ibn Sa'd Tabaqat 3/147",
    madhahbImpact: "Sa'd's position became the intellectual foundation for the classical 'quietist' position in Islamic political thought: when scholars cannot clearly identify the just side, non-participation is the safest and most pious option.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   NEW — IMAM AHADITH COLLECTIONS (4 × 20 = 80)
   Curated teaching-friendly ahadith sets (Arabic + English + source)
   ═════════════════════════════════════════════════════════════════════ */
export interface ImamHadith {
  id: string;
  topic: string;
  topicUr?: string;
  ar: string;
  en: string;
  ur?: string;
  source: string;
}

export interface ImamHadithCollection {
  imamKey: 'hf' | 'ml' | 'sf' | 'hb';
  imamName: string;
  color: string;
  hadiths: ImamHadith[]; // exactly 20
}

export const IMAM_AHADITH: ImamHadithCollection[] = [
  {
    imamKey: 'hf',
    imamName: 'Imam Abu Hanifa',
    color: '#b8860b',
    hadiths: [
      { id:'hf-01', topic:'Intention', topicUr:'نیت', ar:'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ', en:'Actions are only by intentions.', ur:'اعمال کا دارومدار نیتوں پر ہے۔', source:'Sahih al-Bukhari, Sahih Muslim' },
      { id:'hf-02', topic:'Certainty', topicUr:'شک چھوڑو', ar:'دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ', en:'Leave what makes you doubt for what does not make you doubt.', ur:'جو چیز تمہیں شک میں ڈالے اسے چھوڑ دو، اور اسے اختیار کرو جو شک میں نہ ڈالے۔', source:'Jamiʿ al-Tirmidhi; al-Nasa’i' },
      { id:'hf-03', topic:'Ease', topicUr:'آسانی', ar:'إِنَّ الدِّينَ يُسْرٌ', en:'This religion is ease.', ur:'یہ دین آسان ہے۔', source:'Sahih al-Bukhari' },
      { id:'hf-04', topic:'Harm', topicUr:'نقص نہ دو', ar:'لَا ضَرَرَ وَلَا ضِرَارَ', en:'There is no harming and no reciprocating harm.', ur:'نہ نقصان پہنچانا ہے اور نہ جواب میں نقصان دینا ہے۔', source:'Ibn Majah; Malik (Muwatta); Hasan by many scholars' },
      { id:'hf-05', topic:'Good character', topicUr:'بہترین اخلاق', ar:'إِنَّ مِنْ خِيَارِكُمْ أَحَاسِنَكُمْ أَخْلَاقًا', en:'The best of you are those with the best character.', ur:'تم میں سے بہترین وہ ہیں جن کے اخلاق سب سے بہتر ہوں۔', source:'Sahih al-Bukhari' },
      { id:'hf-06', topic:'Truthfulness', topicUr:'سچائی', ar:'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ', en:'Hold fast to truthfulness, for truthfulness leads to righteousness.', ur:'سچائی کو لازم پکڑو، کیونکہ سچائی نیکی تک پہنچاتی ہے۔', source:'Sahih Muslim' },
      { id:'hf-07', topic:'Seeking knowledge', topicUr:'علم کی سمجھ', ar:'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ', en:'Whoever Allah wants good for, He grants him understanding of the religion.', ur:'اللہ جس کے ساتھ بھلائی کا ارادہ فرمائے اسے دین کی سمجھ عطا فرماتا ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-08', topic:'Halal/haram clarity', topicUr:'حلال و حرام واضح', ar:'الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ', en:'The lawful is clear and the unlawful is clear.', ur:'حلال واضح ہے اور حرام بھی واضح ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-09', topic:'Worship quality', topicUr:'احسان', ar:'إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ', en:'Allah has prescribed excellence (ihsan) in everything.', ur:'اللہ نے ہر چیز میں احسان (بہتر طریقہ) کو لازم کیا ہے۔', source:'Sahih Muslim' },
      { id:'hf-10', topic:'Brotherhood', topicUr:'مسلمان بھائی سے محبت', ar:'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', en:'None of you truly believes until he loves for his brother what he loves for himself.', ur:'تم میں سے کوئی حقیقی مومن نہیں، جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے کرتا ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-11', topic:'Speech', topicUr:'اچھی بات یا خاموشی', ar:'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', en:'Whoever believes in Allah and the Last Day should say good or remain silent.', ur:'جو اللہ اور یومِ آخرت پر ایمان رکھتا ہے وہ اچھا کہے یا خاموش رہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-12', topic:'Religion as advice', topicUr:'دین خیرخواہی', ar:'الدِّينُ النَّصِيحَةُ', en:'Religion is sincere counsel.', ur:'دین خیرخواہی ہے۔', source:'Sahih Muslim' },
      { id:'hf-13', topic:'Mercy', topicUr:'رحم', ar:'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ', en:'The merciful are shown mercy by the Most Merciful.', ur:'جو رحم کرتے ہیں اُن پر رحمٰن رحم فرماتا ہے۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'hf-14', topic:'Justice', topicUr:'ظلم سے بچو', ar:'اتَّقُوا الظُّلْمَ فَإِنَّ الظُّلْمَ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ', en:'Beware of ظلم, for ظلم will be darkness on the Day of Resurrection.', ur:'ظلم سے بچو، کیونکہ ظلم قیامت کے دن اندھیروں کا سبب ہوگا۔', source:'Sahih Muslim' },
      { id:'hf-15', topic:'Prayer', topicUr:'سجده میں قرب', ar:'أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ', en:'The closest a servant is to his Lord is while prostrating.', ur:'بندہ اپنے رب کے سب سے زیادہ قریب سجدے کی حالت میں ہوتا ہے۔', source:'Sahih Muslim' },
      { id:'hf-16', topic:'Purity', topicUr:'طہارت آدھا ایمان', ar:'الطُّهُورُ شَطْرُ الإِيمَانِ', en:'Purification is half of faith.', ur:'صفائی/طہارت ایمان کا آدھا حصہ ہے۔', source:'Sahih Muslim' },
      { id:'hf-17', topic:'Goodness', topicUr:'بھلائی', ar:'مَنِ اسْتَطَاعَ مِنْكُمْ أَنْ يَنْفَعَ أَخَاهُ فَلْيَفْعَلْ', en:'Whoever can benefit his brother, let him do so.', ur:'تم میں سے جو اپنے بھائی کو فائدہ پہنچا سکتا ہو اسے چاہیے کہ پہنچائے۔', source:'Sahih Muslim' },
      { id:'hf-18', topic:'Hope', topicUr:'اللہ کے ساتھ حسنِ ظن', ar:'قَالَ اللَّهُ: أَنَا عِنْدَ ظَنِّ عَبْدِي بِي', en:'Allah says: I am as My servant thinks of Me.', ur:'اللہ فرماتا ہے: میں اپنے بندے کے میرے بارے میں گمان کے مطابق ہوں۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-19', topic:'Consistency', topicUr:'ہمیشگی', ar:'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ', en:'The most beloved deeds to Allah are those done consistently, even if small.', ur:'اللہ کے ہاں سب سے محبوب عمل وہ ہے جو ہمیشگی سے کیا جائے، چاہے وہ کم ہو۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hf-20', topic:'Community', topicUr:'جماعت کو لازم پکڑو', ar:'عَلَيْكُمْ بِالْجَمَاعَةِ', en:'Hold fast to the الجماعة (the community).', ur:'جماعت کو لازم پکڑو۔', source:'Jamiʿ al-Tirmidhi (wording variants)' },
    ],
  },
  {
    imamKey: 'ml',
    imamName: 'Imam Malik',
    color: '#0a5c2e',
    hadiths: [
      { id:'ml-01', topic:'Sunnah', topicUr:'سنت/دو امانت', ar:'تَرَكْتُ فِيكُمْ أَمْرَيْنِ لَنْ تَضِلُّوا مَا تَمَسَّكْتُمْ بِهِمَا: كِتَابَ اللَّهِ وَسُنَّتِي', en:'I have left among you two matters; you will never go astray as long as you hold to them: the Book of Allah and my Sunnah.', ur:'میں تمہارے درمیان دو چیزیں چھوڑ رہا ہوں؛ جب تک تم انہیں مضبوطی سے تھامے رکھو گے، تم کبھی گمراہ نہ ہوگے: اللہ کی کتاب اور میری سنت۔', source:'Muwatta Malik (reported); other chains exist with variant wordings' },
      { id:'ml-02', topic:'Manners', topicUr:'اچھے اخلاق کی تکمیل', ar:'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الأَخْلَاقِ', en:'I was sent to perfect righteous character.', ur:'مجھے اس لیے بھیجا گیا ہے کہ میں اچھے (محمود) اخلاق کی تکمیل کروں۔', source:'Muwatta Malik; Musnad Ahmad (with variants)' },
      { id:'ml-03', topic:'Prayer rows', topicUr:'صفیں سیدھی', ar:'سَوُّوا صُفُوفَكُمْ فَإِنَّ تَسْوِيَةَ الصُّفُوفِ مِنْ تَمَامِ الصَّلَاةِ', en:'Straighten your rows, for straightening rows is part of completing the prayer.', ur:'اپنی صفیں سیدھی کرو؛ صفوں کو درست کرنا نماز کو پورا کرنے میں سے ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-04', topic:'Congregation', topicUr:'جماعت کی فضیلت', ar:'صَلَاةُ الْجَمَاعَةِ أَفْضَلُ مِنْ صَلَاةِ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً', en:'Congregational prayer is better than individual prayer by 27 degrees.', ur:'جماعت کے ساتھ نماز اکیلے نماز سے ستائیس درجے بہتر ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-05', topic:'Neighbors', topicUr:'پڑوسی کا حق', ar:'مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ', en:'Jibril kept advising me about the neighbor…', ur:'جبریل مجھے پڑوسی کے بارے میں بار بار نصیحت کرتے رہے… یہاں تک کہ مجھے گمان ہونے لگا کہ وہ پڑوسی کو وراثت میں حصہ دار بنا دیں گے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-06', topic:'Parents', topicUr:'والدین کی رضا', ar:'رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ', en:'The pleasure of the Lord lies in the pleasure of the parent.', ur:'رب کی خوشنودی والدین کی خوشنودی میں ہے۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'ml-07', topic:'Trust', topicUr:'منافق کی علامات', ar:'آيَةُ الْمُنَافِقِ ثَلَاثٌ...', en:'The signs of a hypocrite are three…', ur:'منافق کی علامات تین ہیں: جب بات کرے تو جھوٹ بولے، جب وعدہ کرے تو خلاف کرے، اور جب امانت دی جائے تو خیانت کرے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-08', topic:'Backbiting', topicUr:'مسلمان کی حرمت', ar:'كُلُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ حَرَامٌ', en:'A Muslim’s blood, wealth, and honor are sacred to another Muslim.', ur:'ایک مسلمان کا خون، اس کا مال اور اس کی عزت دوسرے مسلمان کے لیے حرام (حرمت والی) ہے۔', source:'Sahih Muslim' },
      { id:'ml-09', topic:'Wudu', topicUr:'وضو/طہارت کے بغیر نہیں', ar:'لَا تُقْبَلُ صَلَاةٌ بِغَيْرِ طُهُورٍ', en:'No prayer is accepted without purification.', ur:'بغیر طہارت/پاکی کے کوئی نماز قبول نہیں ہوتی۔', source:'Sahih Muslim' },
      { id:'ml-10', topic:'Masjid', topicUr:'مسجد میں جانا', ar:'مَنْ غَدَا إِلَى الْمَسْجِدِ...', en:'Whoever goes to the mosque in the morning/evening…', ur:'جو صبح یا شام مسجد کی طرف جائے اللہ تعالیٰ اس کے لیے جنت میں مہمانی تیار کرتا ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-11', topic:'Supplication', topicUr:'دعا عبادت ہے', ar:'الدُّعَاءُ هُوَ الْعِبَادَةُ', en:'Duʿā’ is worship.', ur:'دعا ہی عبادت ہے۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'ml-12', topic:'Quran people', topicUr:'قرآن سیکھنے والے', ar:'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', en:'The best of you are those who learn the Quran and teach it.', ur:'تم میں سب سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے۔', source:'Sahih al-Bukhari' },
      { id:'ml-13', topic:'Fasting', topicUr:'ایمان کے ساتھ روزہ', ar:'مَنْ صَامَ رَمَضَانَ إِيمَانًا...', en:'Whoever fasts Ramadan with faith…', ur:'جو شخص ایمان کے ساتھ اور ثواب کی امید پر رمضان کے روزے رکھے، اس کے پچھلے گناہ معاف کر دیے جاتے ہیں۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-14', topic:'Hajj', topicUr:'مقبول حج', ar:'مَنْ حَجَّ فَلَمْ يَرْفُثْ...', en:'Whoever performs Hajj and does not commit obscenity…', ur:'جس نے حج کیا اور نہ فحش بات کی، نہ فسق و فجور—وہ ایسا لوٹے گا جیسے وہ (آج ہی) اپنی ماں کے پیٹ سے پیدا ہوا ہو۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-15', topic:'Good deeds', topicUr:'برائی کے بعد بھلائی', ar:'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ...', en:'Fear Allah wherever you are… and follow a bad deed with a good one.', ur:'جہاں کہیں بھی ہو اللہ سے ڈرو؛ برائی کے بعد بھلائی کر دو، وہ اسے مٹا دے گی۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'ml-16', topic:'Love', topicUr:'محبت کی منزل', ar:'المَرْءُ مَعَ مَنْ أَحَبَّ', en:'A person will be with whom he loves.', ur:'انسان اسی کے ساتھ ہوگا جس سے وہ محبت کرتا ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-17', topic:'Charity', topicUr:'صدقہ کم نہیں کرتا', ar:'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ', en:'Charity does not decrease wealth.', ur:'صدقہ کبھی مال میں کمی نہیں کرتا۔', source:'Sahih Muslim' },
      { id:'ml-18', topic:'Best Islam', topicUr:'اسلام کی بہترین خصلت', ar:'أَفْضَلُ الإِسْلَامِ...', en:'The best Islam is feeding others and greeting those you know and don’t.', ur:'اسلام کی بہترین خوبی یہ ہے کہ کھانا کھلاؤ، اور سلام پھیلاؤ اُنہیں بھی جنہیں تم جانتے ہو اور انہیں بھی جنہیں نہیں جانتے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'ml-19', topic:'Markets', topicUr:'دھوکہ سے بچو', ar:'مَنْ غَشَّ فَلَيْسَ مِنَّا', en:'Whoever cheats is not from us.', ur:'جو دھوکہ دے، وہ ہم میں سے نہیں۔', source:'Sahih Muslim' },
      { id:'ml-20', topic:'Moderation', topicUr:'سداد و اعتدال', ar:'سَدِّدُوا وَقَارِبُوا', en:'Be upright and be moderate.', ur:'سیدھے رہو اور اعتدال اختیار کرو۔', source:'Sahih al-Bukhari' },
    ],
  },
  {
    imamKey: 'sf',
    imamName: "Imam al-Shafi'i",
    color: '#1a3462',
    hadiths: [
      { id:'sf-01', topic:'Sincerity', topicUr:'اخلاص', ar:'إِنَّ اللَّهَ لَا يَقْبَلُ مِنَ الْعَمَلِ إِلَّا مَا كَانَ خَالِصًا', en:'Allah only accepts deeds done sincerely for Him.', ur:'بے شک اللہ کسی عمل کو قبول نہیں فرماتا مگر وہ جو خالص اسی کے لیے ہو۔', source:'Al-Nasa’i (meaning supported across narrations)' },
      { id:'sf-02', topic:'Following Sunnah', topicUr:'سنت کی پیروی', ar:'مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ', en:'Whoever introduces into this matter of ours what is not from it, it is rejected.', ur:'جو شخص ہمارے دین/امر میں کوئی ایسی بات داخل کرے جو اس میں سے نہیں، وہ مردود ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'sf-03', topic:'Knowledge path', topicUr:'علم کا راستہ', ar:'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا...', en:'Whoever treads a path seeking knowledge…', ur:'جو علم حاصل کرنے کے لیے راستہ چلے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔', source:'Sahih Muslim' },
      { id:'sf-04', topic:'Quran + Sunnah', topicUr:'قرآن و سنت کی تھام', ar:'تَرَكْتُ فِيكُمْ مَا إِنْ تَمَسَّكْتُمْ بِهِ لَنْ تَضِلُّوا', en:'I left among you that which if you hold to it you will not go astray…', ur:'میں تمہارے درمیان وہ چیز چھوڑ کر جا رہا ہوں کہ اگر تم اسے مضبوطی سے تھام لو گے تو گمراہ نہ ہو گے۔', source:'Reported with multiple chains/wordings' },
      { id:'sf-05', topic:'Gentleness', topicUr:'نرمی', ar:'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ', en:'Gentleness is not in anything except that it beautifies it.', ur:'نرمی کسی چیز میں ہو تو اسے زینت دیتی ہے۔', source:'Sahih Muslim' },
      { id:'sf-06', topic:'Anger', topicUr:'غصہ سے بچو', ar:'لَا تَغْضَبْ', en:'Do not become angry.', ur:'غصہ نہ کرو۔', source:'Sahih al-Bukhari' },
      { id:'sf-07', topic:'Reliance', topicUr:'توکل', ar:'لَوْ أَنَّكُمْ تَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ', en:'If you relied upon Allah as He deserves…', ur:'اگر تم اللہ پر ایسے توکل کرتے جیسے توکل کا حق ہے، تو وہ تمہیں ایسے رزق دیتا ہے جیسے پرندوں کو روزی دیتا ہے؛ وہ صبح نکلتے ہیں اور شام کو پیٹ بھر کر لوٹتے ہیں۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'sf-08', topic:'Brotherhood', topicUr:'مسلمان بھائی چارگی', ar:'الْمُسْلِمُ أَخُو الْمُسْلِمِ', en:'A Muslim is the brother of a Muslim…', ur:'مسلمان مسلمان کا بھائی ہے؛ نہ وہ اس پر ظلم کرتا ہے اور نہ اسے بے یار و مددگار چھوڑتا ہے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'sf-09', topic:'Removing harm', topicUr:'تکلیف دور کرنا', ar:'الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً...', en:'Faith has over seventy branches… removing harm from the road is part of it.', ur:'ایمان کے ستر سے زیادہ حصے/شاخیں ہیں؛ راستے سے تکلیف دہ چیز ہٹا دینا ایمان کی شاخ ہے۔', source:'Sahih Muslim' },
      { id:'sf-10', topic:'Purity', topicUr:'طہارت ہی کنجی', ar:'مِفْتَاحُ الصَّلَاةِ الطُّهُورُ', en:'The key to prayer is purification.', ur:'نماز کی کنجی طہارت/پاکی ہے۔', source:'Abu Dawud; al-Tirmidhi' },
      { id:'sf-11', topic:'Moderation', topicUr:'غلو سے بچو', ar:'هَلَكَ الْمُتَنَطِّعُونَ', en:'The extremists are ruined.', ur:'حد سے بڑھنے والے لوگ ہلاک ہو گئے۔', source:'Sahih Muslim' },
      { id:'sf-12', topic:'Forgiveness', topicUr:'رحم', ar:'مَنْ لَا يَرْحَمْ لَا يُرْحَمْ', en:'Whoever does not show mercy will not be shown mercy.', ur:'جو رحم نہیں کرتا، اس پر رحم نہیں کیا جاتا۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'sf-13', topic:'Good speech', topicUr:'بے فائدہ بات چھوڑنا', ar:'إِنَّ مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكَهُ مَا لَا يَعْنِيهِ', en:'From the beauty of a person’s Islam is leaving what does not concern him.', ur:'انسان کے اسلام کی خوبی یہ ہے کہ وہ وہ بات چھوڑ دے جو اسے فائدہ نہ دے۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'sf-14', topic:'Truth', topicUr:'دھوکہ سے بچو', ar:'مَنْ غَشَّنَا فَلَيْسَ مِنَّا', en:'Whoever deceives us is not from us.', ur:'جو ہمیں دھوکہ دے وہ ہم میں سے نہیں۔', source:'Sahih Muslim' },
      { id:'sf-15', topic:'Prayer time', topicUr:'نماز وقت پر', ar:'الصَّلَاةُ عَلَى وَقْتِهَا', en:'Prayer at its proper time.', ur:'نماز کو اس کے مقررہ وقت پر ادا کرنا۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'sf-16', topic:'Dhikr', topicUr:'کثرتِ ذکر والے', ar:'سَبَقَ الْمُفَرِّدُونَ', en:'The “mufarridun” have surpassed… (those who remember Allah often).', ur:'مفردین نے سبقت لے لی… (وہ لوگ جو اللہ کو کثرت سے یاد کرتے ہیں)۔', source:'Sahih Muslim' },
      { id:'sf-17', topic:'Quran reflection', topicUr:'عمر + اچھا عمل', ar:'خَيْرُ النَّاسِ مَنْ طَالَ عُمْرُهُ وَحَسُنَ عَمَلُهُ', en:'The best people are those whose lives are long and deeds are good.', ur:'لوگوں میں سب سے بہتر وہ ہے جس کی عمر لمبی ہو اور اس کے اعمال اچھے ہوں۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'sf-18', topic:'Repentance', topicUr:'توبہ کی قبولیت', ar:'إِنَّ اللَّهَ يَبْسُطُ يَدَهُ...', en:'Allah extends His Hand at night to accept the repentance…', ur:'بے شک اللہ رات کو اپنا ہاتھ پھیلاتا ہے تاکہ دن میں گناہ کرنے والا توبہ کرے… اور دن میں اپنا ہاتھ پھیلاتا ہے تاکہ رات میں گناہ کرنے والا توبہ کرے…', source:'Sahih Muslim' },
      { id:'sf-19', topic:'Dua', topicUr:'دعا سب سے باعزت', ar:'لَيْسَ شَيْءٌ أَكْرَمَ عَلَى اللَّهِ مِنَ الدُّعَاءِ', en:'Nothing is more honored to Allah than supplication.', ur:'اللہ کے نزدیک دعا سے زیادہ باعزت کوئی چیز نہیں۔', source:'Jamiʿ al-Tirmidhi' },
      { id:'sf-20', topic:'Unity', topicUr:'جماعت کے ساتھ برکت', ar:'يَدُ اللَّهِ مَعَ الْجَمَاعَةِ', en:'Allah’s hand is with the الجماعة (community).', ur:'اللہ کی مدد/رحمت جماعت کے ساتھ ہے۔', source:'Jamiʿ al-Tirmidhi' },
    ],
  },
  {
    imamKey: 'hb',
    imamName: 'Imam Ahmad ibn Hanbal',
    color: '#7a1010',
    hadiths: [
      { id:'hb-01', topic:'Sabr', topicUr:'صبر', ar:'وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ', en:'No one is given a gift better and more expansive than patience.', ur:'کسی کو صبر سے بہتر اور وسیع تر کوئی نعمت نہیں دی گئی۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hb-02', topic:'Trials', topicUr:'آزمائش', ar:'عَجَبًا لِأَمْرِ الْمُؤْمِنِ', en:'Amazing is the affair of the believer…', ur:'مومن کا معاملہ عجیب ہے… (ہر حال میں اللہ کی حکمت ہے)۔', source:'Sahih Muslim' },
      { id:'hb-03', topic:'Courage with truth', topicUr:'سچ کے ساتھ جرات', ar:'قُلِ الْحَقَّ وَلَوْ كَانَ مُرًّا', en:'Speak the truth even if it is bitter.', ur:'سچ بولو، اگرچہ وہ تلخ ہو۔', source:'Reported with varying chains (meaning widely cited)' },
      { id:'hb-04', topic:'Steadfastness', topicUr:'ثابت قدمی', ar:'اسْتَقِمْ كَمَا أُمِرْتَ', en:'Be steadfast as you have been commanded.', ur:'جیسے تمہیں حکم دیا گیا ہے ویسے ہی ثابت قدم رہو۔', source:'Quranic principle (11:112) used with Prophetic guidance context' },
      { id:'hb-05', topic:'Avoid oppression', topicUr:'ظلم سے بچو', ar:'اتَّقُوا دَعْوَةَ الْمَظْلُومِ', en:'Beware the supplication of the oppressed.', ur:'مظلوم کی دعا سے بچو؛ وہ دعا قبول ہوتی ہے۔', source:'Sahih al-Bukhari' },
      { id:'hb-06', topic:'Humility', topicUr:'تواضع', ar:'مَنْ تَوَاضَعَ لِلَّهِ رَفَعَهُ اللَّهُ', en:'Whoever humbles himself for Allah, Allah will raise him.', ur:'جو شخص اللہ کے لیے تواضع اختیار کرے، اللہ اسے بلند کرتا ہے۔', source:'Sahih Muslim (meaning in various narrations)' },
      { id:'hb-07', topic:'Sunnah adherence', topicUr:'سنت کی پابندی', ar:'عَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الرَّاشِدِينَ', en:'Hold to my Sunnah and the Sunnah of the rightly guided caliphs.', ur:'میری سنت اور ہدایت یافتہ خلفاء کی سنت کو مضبوطی سے تھام لو۔', source:'Abu Dawud; al-Tirmidhi' },
      { id:'hb-08', topic:'Bidʿah warning', topicUr:'بدعت سے اجتناب', ar:'وَشَرَّ الْأُمُورِ مُحْدَثَاتُهَا', en:'The worst matters are newly-invented matters.', ur:'بدترین باتیں وہ ہیں جو نئی ایجاد (بدعت) کی صورت میں نکالی جائیں۔', source:'Sahih Muslim (khutbah hadith)' },
      { id:'hb-09', topic:'Quran in hardship', topicUr:'مشکل میں قرآن', ar:'اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي شَفِيعًا', en:'Recite the Quran, for it will come as an intercessor.', ur:'قرآن پڑھو؛ کیونکہ یہ قیامت کے دن سفارش کرنے کے لیے آئے گا۔', source:'Sahih Muslim' },
      { id:'hb-10', topic:'Night prayer', topicUr:'تہجد/رات کی نماز', ar:'أَفْضَلُ الصَّلَاةِ بَعْدَ الْفَرِيضَةِ صَلَاةُ اللَّيْلِ', en:'The best prayer after the obligatory is the night prayer.', ur:'فرض کے بعد سب سے افضل نماز رات کی نماز (تہجد) ہے۔', source:'Sahih Muslim' },
      { id:'hb-11', topic:'Dhikr', topicUr:'ذکر کی مثال', ar:'مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ...', en:'The example of the one who remembers his Lord…', ur:'اللہ کو یاد کرنے والے کی مثال زندہ اور مردہ جیسی ہے۔', source:'Sahih al-Bukhari' },
      { id:'hb-12', topic:'Charity', topicUr:'آگ سے بچاؤ', ar:'اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ', en:'Protect yourselves from the Fire even with half a date.', ur:'آگ سے بچو، اگرچہ کھجور کا آدھا دانہ ہی کیوں نہ ہو۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hb-13', topic:'Helping', topicUr:'ایک دوسرے کی مدد', ar:'وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ', en:'Allah helps the servant as long as he helps his brother.', ur:'اللہ بندے کی مدد کرتا ہے جب تک بندہ اپنے بھائی کی مدد میں لگا رہتا ہے۔', source:'Sahih Muslim' },
      { id:'hb-14', topic:'Justice', topicUr:'انصاف/عدل', ar:'انْصُرْ أَخَاكَ ظَالِمًا أَوْ مَظْلُومًا', en:'Support your brother whether he is an oppressor or oppressed.', ur:'اپنے بھائی کی مدد کرو چاہے وہ ظالم ہو یا مظلوم۔', source:'Sahih al-Bukhari' },
      { id:'hb-15', topic:'Avoid fitnah', topicUr:'فتنہ سے بچاؤ', ar:'إِذَا التَقَى الْمُسْلِمَانِ بِسَيْفَيْهِمَا...', en:'When two Muslims meet with swords…', ur:'جب دو مسلمان تلواروں کے ساتھ آپس میں لڑیں تو قاتل اور مقتول دونوں جہنم میں ہوں گے۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hb-16', topic:'Purification', topicUr:'پاکی/طہارت', ar:'إِذَا وَلَغَ الْكَلْبُ فِي إِنَاءِ أَحَدِكُمْ...', en:'If a dog licks the vessel…', ur:'اگر تم میں سے کسی برتن میں کتا منہ ڈال دے/چاٹ لے تو اسے سات بار دھوؤ، جن میں سے ایک مرتبہ مٹی کے ساتھ ہو۔', source:'Sahih Muslim' },
      { id:'hb-17', topic:'Reliance', topicUr:'فائدہ کی حرص', ar:'احْرِصْ عَلَى مَا يَنْفَعُكَ...', en:'Be keen on what benefits you…', ur:'اپنے لیے فائدہ مند چیز پر حرص رکھو… اور اللہ کی تقدیر پر بھروسہ کرو۔', source:'Sahih Muslim' },
      { id:'hb-18', topic:'Repentance', topicUr:'توبہ قبول', ar:'التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لَا ذَنْبَ لَهُ', en:'The one who repents from sin is like one who has no sin.', ur:'جو شخص گناہ سے توبہ کرتا ہے وہ ایسے ہے جیسے اس سے کوئی گناہ سرزد ہی نہ ہوا ہو۔', source:'Ibn Majah (hasan meaning widely accepted)' },
      { id:'hb-19', topic:'Hope/mercy', topicUr:'رحمت کی وسعت', ar:'إِنَّ لِلَّهِ مِائَةَ رَحْمَةٍ', en:'Allah has one hundred mercies…', ur:'بے شک اللہ کے پاس سو رحمتیں ہیں… (ان میں سے ایک رحم دنیا میں بھیج دی گئی ہے جس کی وجہ سے مخلوق ایک دوسرے پر رحم کرتی ہے)۔', source:'Sahih al-Bukhari; Sahih Muslim' },
      { id:'hb-20', topic:'Worship', topicUr:'نماز (وقت پر)', ar:'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ الصَّلَاةُ لِوَقْتِهَا', en:'The most beloved deeds to Allah: prayer at its time…', ur:'اللہ کے نزدیک سب سے محبوب عمل: نماز کو اس کے وقت پر ادا کرنا ہے…', source:'Sahih al-Bukhari; Sahih Muslim' },
    ],
  },
];
