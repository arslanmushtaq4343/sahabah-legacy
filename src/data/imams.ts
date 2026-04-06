/* ── Four Imams ── */
export interface Imam {
  id: string;
  key: 'hf' | 'ml' | 'sf' | 'hb';
  num: string;
  name: string;
  ar: string;
  ur: string;
  title: string;
  honorific: string;
  born: string;
  bornPlace: string;
  died: string;
  diedPlace: string;
  origin: string;
  originUr?: string;
  heritage: string;
  heritageUr?: string;
  sig: string;
  sigUr?: string;
  teacherChain: string[];
  teachers: string;
  teachersUr?: string;
  students: string;
  studentsUr?: string;
  keyWorks: string;
  keyWorksUr?: string;
  method: string;
  methodUr?: string;
  reach: string;
  reachUr?: string;
  keyFact: string;
  keyFactUr?: string;
  trial: string;
  trialUr?: string;
  signature: string;
  signatureUr?: string;
  books_legacy: string;
  books_legacyUr?: string;
}

export const IMAM_COLORS: Record<string, string> = {
  hf: '#b8860b',
  ml: '#0a5c2e',
  sf: '#1a3462',
  hb: '#7a1010',
  all: 'rgba(92,61,30,.55)',
  had: '#505090',
};

export const IMAM_BG: Record<string, string> = {
  hf: 'rgba(184,134,11,.12)',
  ml: 'rgba(10,92,46,.12)',
  sf: 'rgba(26,52,98,.12)',
  hb: 'rgba(122,16,16,.12)',
  all: 'rgba(120,80,20,.07)',
  had: 'rgba(80,80,144,.09)',
};

export const IMAMS: Imam[] = [
  {
    id: 'hanafi', key: 'hf', num: 'I',
    name: 'Imam Abu Hanifa',
    ar: 'الإمام أبو حنيفة النعمان',
    ur: 'امامِ اعظم ابو حنیفہؒ',
    title: "Al-Nu'man ibn Thabit al-Taymi al-Kufi",
    honorific: "Imam al-A'zam — The Greatest Imam",
    born: '699 CE (80 AH)', bornPlace: 'Kufa, Iraq',
    died: '767 CE (150 AH)', diedPlace: 'Baghdad, Iraq',
    origin: "Persian ancestry — grandfather Zuta from Kabul. First non-Arab founder of a major Islamic school. Wealthy silk merchant — funded students from his own wealth.",
    originUr: "فارسی النسل — دادا زُوطا کابل سے۔ بڑے فقہی مکتب کے پہلے غیر عرب بانی۔ خوشحال ریشم کے تاجر تھے اور اپنے مال سے طلبہ کی کفالت کرتے تھے۔",
    heritage: "Memorized 70,000 poems. Studied under Hammad ibn Abi Sulayman for 18 continuous years. Reportedly met 4 Companions, including Anas ibn Malik ؓ.",
    heritageUr: "۷۰ ہزار اشعار یاد تھے۔ حماد بن ابی سلیمان کے شاگرد رہے (مسلسل ۱۸ سال)۔ روایت ہے کہ ۴ صحابہؓ سے ملاقات ہوئی، جن میں انس بن مالکؓ بھی شامل ہیں۔",
    sig: "The imam who transformed fiqh into a systematic rational science — and died in prison rather than serve tyranny.",
    sigUr: "وہ امام جنہوں نے فقہ کو منظم علمی نظام بنایا — اور ظلم کی خدمت کے بجائے قید میں وفات پائی۔",
    teacherChain: ["Prophet ﷺ", "Ibn Masud ؓ", "Alqama al-Nakha'i", "Ibrahim al-Nakha'i", "Hammad ibn Abi Sulayman", "Abu Hanifa"],
    teachers: "Primary: Hammad ibn Abi Sulayman (18 years). Also: Ata ibn Abi Rabah (Mecca), Nafi' mawla Ibn Umar, al-Sha'bi, Ibn Jurayj.",
    teachersUr: "اہم استاد: حماد بن ابی سلیمان (۱۸ سال)۔ دیگر: عطا بن ابی رباح (مکہ)، نافع مولیٰ ابن عمر، شعبی، ابن جریج۔",
    students: "Abu Yusuf (1st Chief Justice of Islam), Muhammad al-Shaybani (documented the entire school in 6 books), Zufar ibn al-Hudhayl, Hasan ibn Ziyad.",
    studentsUr: "ابو یوسف (اسلام کے پہلے قاضی القضاۃ)، محمد الشیبانی (چھ کتب میں مکتب کی تدوین)، زُفَر بن الہذیل، حسن بن زیاد۔",
    keyWorks: "al-Fiqh al-Akbar (theology). Jurisprudence preserved by students — especially al-Shaybani's Zahir al-Riwaya (6 foundational books).",
    keyWorksUr: "الفقہ الاکبر (عقائد)۔ فقہی روایت شاگردوں کے ذریعے محفوظ ہوئی — خصوصاً الشیبانی کی ظاہر الروایہ (۶ بنیادی کتب)۔",
    method: "Quran → Authenticated Sunnah → Companion consensus → Qiyas (analogy) → Istihsan (juristic preference for equity). Pioneered systematic use of ra'y (informed opinion). Rationalist approach.",
    methodUr: "قرآن → صحیح سنت → اجماعِ صحابہ → قیاس → استحسان (انصاف پر مبنی ترجیح)۔ رائے (علمی اجتہاد) کے منظم استعمال کے پیش رو۔",
    reach: "~48% of Muslims globally. Turkey, Pakistan, India, Bangladesh, Afghanistan, Central Asia, Balkans, Egypt (Ottoman era), Tatarstan. Dominant in ~35 countries.",
    reachUr: "دنیا کے تقریباً 48٪ مسلمان۔ ترکی، پاکستان، بھارت، بنگلہ دیش، افغانستان، وسط ایشیا، بلقان، (عثمانی دور) مصر، تاتارستان؛ تقریباً 35 ممالک میں غالب۔",
    keyFact: "Imam al-Shafi'i said: 'All people in fiqh are Abu Hanifa's children.' He established the principle that a scholar must refuse to serve tyranny — a position he upheld with his life.",
    keyFactUr: "امام شافعیؒ کا قول: \"فقہ میں سب لوگ ابو حنیفہ کے بچے ہیں\"۔ انہوں نے اصول قائم کیا کہ عالم ظلم کی خدمت قبول نہ کرے — اور اسی پر جان دے دی۔",
    trial: "Caliph al-Mansur repeatedly demanded he serve as Chief Judge of Baghdad. Abu Hanifa refused. Imprisoned ~762 CE. Died in prison 767 CE. 50,000 attended his funeral. Buried in Baghdad's Imam Azam Mosque — visited daily.",
    trialUr: "خلیفہ منصور نے بار بار بغداد کا قاضی بننے پر اصرار کیا؛ امام نے انکار کیا۔ تقریباً 762ء میں قید ہوئے، 767ء میں قید ہی میں وفات۔ جنازے میں تقریباً 50 ہزار شریک ہوئے۔ بغداد میں مسجدِ امام اعظم کے قریب مدفون ہیں۔",
    signature: "'I will not open the door to tyranny by serving it.'",
    signatureUr: "\"میں ظلم کی خدمت کر کے ظلم کا دروازہ نہیں کھولوں گا۔\"",
    books_legacy: "al-Hidaya by al-Marghinani (d.1197) — still the Hanafi seminary textbook worldwide. Ottoman Mejelle (1869–1876) — first Islamic civil code based on Hanafi principles.",
    books_legacyUr: "الہدایہ (مرغینانی) — آج بھی دنیا بھر کے حنفی مدارس کا بنیادی متن۔ عثمانی مجلہ (1869–1876) — حنفی اصولوں پر پہلا اسلامی سول کوڈ۔",
  },
  {
    id: 'maliki', key: 'ml', num: 'II',
    name: 'Imam Malik ibn Anas',
    ar: 'الإمام مالك بن أنس الأصبحي',
    ur: 'امام مالک بن انسؒ',
    title: 'Malik ibn Anas ibn Malik al-Asbahi al-Madani',
    honorific: 'Imam Dar al-Hijra — Imam of Medina',
    born: '711 CE (93 AH)', bornPlace: 'Medina, Arabia',
    died: '795 CE (179 AH)', diedPlace: 'Medina, Arabia',
    origin: "Arab — Asbah tribe of Yemen, long settled in Medina. His grandfather was a Companion of the Prophet ﷺ. Spent his entire life in Medina — never leaving the Prophet's ﷺ city.",
    originUr: "عرب — یمن کے قبیلہ اَصْبَح سے، مدینہ میں قدیم سکونت۔ دادا صحابیؓ تھے۔ پوری زندگی مدینہ میں گزاری — شہرِ رسول ﷺ سے باہر نہ گئے۔",
    heritage: "Did not issue a single fatwa until 70 senior scholars confirmed he was qualified. Studied under 900+ teachers. Revised al-Muwatta 40+ times over his life.",
    heritageUr: "۷۰ اکابر علماء کی تصدیق کے بغیر فتویٰ نہ دیا۔ 900 سے زائد اساتذہ سے علم حاصل کیا۔ موطأ کو اپنی زندگی میں 40+ بار نظر ثانی کی۔",
    sig: "The imam who treated Medina's living practice as a living hadith — and spent 40 years perfecting a single book.",
    sigUr: "وہ امام جنہوں نے اہلِ مدینہ کے عمل کو زندہ حدیث سمجھا — اور ایک کتاب کی تکمیل میں 40 سال صرف کیے۔",
    teacherChain: ["Prophet ﷺ", "Abdullah ibn Umar ؓ", "Nafi' (30 yrs service)", "Ibn Shihab al-Zuhri", "Rabi'a al-Ra'y", "Imam Malik"],
    teachers: "Nafi' mawla Ibn Umar (Golden Chain). Ibn Shihab al-Zuhri (greatest hadith synthesizer). Rabi'a al-Ra'y (rational jurisprudence). Said ibn al-Musayyib. Yahya ibn Sa'id al-Ansari.",
    teachersUr: "نافع مولیٰ ابن عمر (سلسلۂ ذَہبی)۔ ابن شہاب الزہری۔ ربیعہ الرائے۔ سعید بن المسیب۔ یحییٰ بن سعید الانصاری۔",
    students: "Imam al-Shafi'i (memorized al-Muwatta at age 10). Ibn al-Qasim (Egypt). Ashhab. Yahya ibn Yahya al-Andalusi (brought school to Spain). Sahnun (compiled al-Mudawwana).",
    studentsUr: "امام شافعیؒ (۱۰ سال میں موطأ حفظ)۔ ابن القاسم (مصر)۔ اشہب۔ یحییٰ الاندلسی (اندلس تک مکتب پہنچایا)۔ سحنون (المدونة کے مرتب)۔",
    keyWorks: "al-Muwatta — first systematic hadith-law compilation. Imam al-Shafi'i: 'No book after the Quran is more correct than al-Muwatta.'",
    keyWorksUr: "الموطأ — حدیث و فقہ کی پہلی منظم تدوین۔ امام شافعیؒ: \"قرآن کے بعد موطأ سے زیادہ صحیح کتاب نہیں\"۔",
    method: "Hadith → Amal ahl al-Madinah (Medina's living practice) → Companion opinion → Maslaha mursala (public interest) → Sadd al-dhara'i (blocking pretexts). Most empirical of the four schools.",
    methodUr: "حدیث → عملِ اہلِ مدینہ → قولِ صحابی → مصالح مرسلہ (عام مصلحت) → سدِ ذرائع۔ چاروں مکاتب میں سب سے زیادہ عملی/تجربی مزاج۔",
    reach: "~25% of Muslims globally. North Africa (Morocco, Algeria, Tunisia, Libya), West Africa (Senegal, Mali, Niger, Nigeria, Mauritania), Sudan, historically all of Islamic Spain (711–1492 CE).",
    reachUr: "دنیا کے تقریباً 25٪ مسلمان۔ شمالی افریقہ (مراکش، الجزائر، تیونس، لیبیا)، مغربی افریقہ، سوڈان؛ تاریخی طور پر اندلس (711–1492)۔",
    keyFact: "Flogged 70 lashes by Abbasid governor in 762 CE for a fatwa about oaths under compulsion. His arm was dislocated. He never retracted the fatwa. His persecutor's name is forgotten; Malik's is taught to every student.",
    keyFactUr: "762ء میں جبر کے تحت قسم کے مسئلے پر فتویٰ دینے پر 70 کوڑے لگے؛ بازو اتر گیا۔ فتویٰ واپس نہ لیا۔ ظلم کرنے والے کا نام مٹ گیا، مالکؒ کا نام ہر طالب علم پڑھتا ہے۔",
    trial: "Refused to legitimize Abbasid rule through fatwas. Flogged publicly. Said after: 'Whoever does not know me — I am Malik ibn Anas. I do not retract.'",
    trialUr: "عباسی اقتدار کو فتووں سے جائز قرار دینے سے انکار۔ عوام میں کوڑے لگے۔ فرمایا: \"جو مجھے نہیں جانتا—میں مالک بن انس ہوں، میں رجوع نہیں کرتا۔\"",
    signature: "'Knowledge is a light that Allah places where He wills — it cannot be acquired through arrogance.'",
    signatureUr: "\"علم نور ہے جو اللہ جسے چاہے عطا کرے—تکبر سے حاصل نہیں ہوتا۔\"",
    books_legacy: "al-Mudawwana al-Kubra (via Sahnun) — Maliki encyclopedia. Mukhtasar Khalil (d.1374) — most used Maliki fiqh summary in North/West Africa. Ibn Abi Zayd's al-Risala — introductory primer still taught in West African madrasas.",
    books_legacyUr: "المدونة الکبریٰ — مالکی فقہ کا انسائیکلوپیڈیا۔ مختصر خلیل — شمال/مغربی افریقہ میں سب سے زیادہ پڑھا جانے والا خلاصہ۔ ابن ابی زید کی الرسالہ — آج بھی مدارس میں بنیادی نصاب۔",
  },
  {
    id: 'shafi', key: 'sf', num: 'III',
    name: "Imam al-Shafi'i",
    ar: 'الإمام محمد بن إدريس الشافعي',
    ur: 'امام شافعیؒ',
    title: "Muhammad ibn Idris ibn al-Abbas al-Shafi'i al-Muttalibi",
    honorific: 'Nasir al-Sunnah — Defender of the Sunnah',
    born: '767 CE (150 AH)', bornPlace: 'Gaza, Palestine',
    died: '820 CE (204 AH)', diedPlace: 'Fustat (Old Cairo), Egypt',
    origin: "Qurayshi Arab — Muttalib branch of Hashim, same great-grandfather as the Prophet ﷺ. Born the same year Abu Hanifa died! Father died before his birth.",
    originUr: "قریشی عرب — بنو مُطَّلب (ہاشم کی شاخ)، نبی ﷺ کے ساتھ ایک ہی جدِ اعلیٰ۔ اسی سال پیدا ہوئے جس سال ابو حنیفہؒ کی وفات ہوئی۔ والد پیدائش سے پہلے وفات پا گئے۔",
    heritage: "Memorized the Quran at age 7. Memorized al-Muwatta at age 10. Went to the Hudhayil tribe in the desert to master Arabic poetry. Came to Imam Malik in Medina with no money and a letter of recommendation.",
    heritageUr: "۷ برس میں قرآن حفظ، ۱۰ برس میں موطأ حفظ۔ فصیح عربی اور شاعری کے لیے قبیلہ ہذیل کے ساتھ صحراء میں وقت گزارا۔ مدینہ میں امام مالکؒ کے پاس سفارش نامے کے ساتھ، بغیر مال کے آئے۔",
    sig: "The architect of Islamic legal theory — the first scholar to write a systematic book on how Islamic law should be derived.",
    sigUr: "اصولِ فقہ کے معمار — اسلامی قانون کے استخراج کے اصولوں پر پہلی منظم کتاب لکھنے والے۔",
    teacherChain: ["Prophet ﷺ", "Aisha ؓ / Ibn Abbas ؓ", "Urwa / Mujahid", "Ibn Shihab al-Zuhri", "Imam Malik", "al-Shaybani (Hanafi)", "Imam al-Shafi'i"],
    teachers: "Imam Malik (primary; years in Medina). Muslim ibn Khalid al-Zanji (Mecca). Muhammad al-Shaybani (Baghdad — mastered Hanafi fiqh here to understand and refine it!). Sufyan ibn Uyayna. Waki' ibn al-Jarrah.",
    teachersUr: "امام مالکؒ (بنیادی استاد؛ مدینہ میں کئی سال)۔ مسلم بن خالد الزنجی (مکہ)۔ محمد الشیبانی (بغداد—حنفی فقہ میں مہارت)۔ سفیان بن عیینہ۔ وکیع بن الجراح۔",
    students: "Imam Ahmad ibn Hanbal (called him 'the greatest scholar I ever met'). al-Muzani (primary Shafi'i textbook compiler). al-Buwayti (died in Abbasid prison). al-Rabi ibn Sulayman al-Muradi (transmitted al-Umm).",
    studentsUr: "امام احمدؒ (انہیں \"سب سے بڑا عالم\" کہا)۔ المزنی (اہم متون کے مرتب)۔ البویطی (عباسی قید میں وفات)۔ الربیع المرادی (الام کی روایت)۔",
    keyWorks: "al-Risala — the FIRST book ever written on usul al-fiqh (Islamic legal theory). al-Umm (9 volumes of fiqh). Two positions: Qaul Qadim (old Iraqi) and Qaul Jadid (new Egyptian, which supersedes).",
    keyWorksUr: "الرسالہ — اصولِ فقہ پر تاریخ کی پہلی کتاب۔ الام (۹ جلدیں)۔ دو آراء: قولِ قدیم (عراقی) اور قولِ جدید (مصری—جو غالب/راجح)۔",
    method: "Strict hierarchy: Quran → Mutawatir Sunnah → Ahad Sunnah → Ijma → Qiyas. Restricted independent ra'y. His al-Risala defined how all four schools reason — even schools that disagree use his methodology.",
    methodUr: "سخت ترتیب: قرآن → متواتر سنت → آحاد سنت → اجماع → قیاس۔ آزاد رائے کو محدود کیا۔ الرسالہ نے استدلال کے اصول مرتب کیے جن سے تمام مکاتب فائدہ اٹھاتے ہیں۔",
    reach: "~28% of Muslims globally. Indonesia (225 million), Malaysia, Brunei, East Africa (Kenya, Tanzania, Somalia), Yemen, Egypt, Syria, Kurdish regions, Malabar India.",
    reachUr: "دنیا کے تقریباً 28٪ مسلمان۔ انڈونیشیا، ملائشیا، برونائی، مشرقی افریقہ، یمن، مصر، شام، کرد علاقوں اور ہندوستان (ملابار) میں وسیع اثر۔",
    keyFact: "Uniquely mastered both Maliki and Hanafi traditions before creating his own school. Imam Ahmad: 'I entered Baghdad and did not imagine Allah had created a man like al-Shafi'i.'",
    keyFactUr: "مالکی اور حنفی دونوں روایتوں میں مہارت کے بعد اپنا مکتب قائم کیا۔ امام احمدؒ: \"میں بغداد آیا اور گمان نہ تھا کہ اللہ نے شافعی جیسا شخص پیدا کیا ہوگا\"۔",
    trial: "Arrested in Yemen on charges of supporting an Alid revolt. Brought in chains before Caliph Harun al-Rashid. Defended himself with such eloquence the caliph released and honored him. His Yemeni co-accused were executed.",
    trialUr: "یمن میں علوی بغاوت کی حمایت کے الزام میں گرفتار ہوئے۔ زنجیروں میں ہارون الرشید کے سامنے پیش کیے گئے؛ ایسی فصاحت سے دفاع کیا کہ خلیفہ نے رہا کر کے عزت دی۔ ہم ملزمان میں سے بعض کو قتل کیا گیا۔",
    signature: "'Whoever learns fiqh without hadith is like one who builds without foundation. Whoever learns hadith without fiqh is like one who grows crops but cannot harvest them.'",
    signatureUr: "\"جو حدیث کے بغیر فقہ سیکھے وہ بنیاد کے بغیر عمارت ہے؛ اور جو فقہ کے بغیر حدیث سیکھے وہ کھیتی اگاتا ہے مگر کاٹ نہیں سکتا۔\"",
    books_legacy: "al-Majmu by al-Nawawi (d.1277) — supreme Shafi'i encyclopedia. Fath al-Bari by Ibn Hajar al-Asqalani (d.1449) — 13-volume Bukhari commentary. Entire Southeast Asian Islamic law is Shafi'i.",
    books_legacyUr: "المجموع (نووی) — شافعی فقہ کا عظیم انسائیکلوپیڈیا۔ فتح الباری (ابن حجر) — صحیح بخاری کی 13 جلدوں پر شرح۔ جنوب مشرقی ایشیا کی فقہی روایت بڑی حد تک شافعی ہے۔",
  },
  {
    id: 'hanbali', key: 'hb', num: 'IV',
    name: 'Imam Ahmad ibn Hanbal',
    ar: 'الإمام أحمد بن حنبل الشيباني',
    ur: 'امام احمد بن حنبلؒ',
    title: 'Ahmad ibn Muhammad ibn Hanbal al-Shaybani al-Baghdadi',
    honorific: 'Imam al-Sunnah — Imam of the Prophetic Tradition',
    born: '780 CE (164 AH)', bornPlace: 'Baghdad, Iraq',
    died: '855 CE (241 AH)', diedPlace: 'Baghdad, Iraq',
    origin: "Arab — Banu Shayban tribe. Born in Baghdad. Father died young. Most widely traveled of the four Imams — journeyed to Kufa, Basra, Mecca, Medina, Yemen, Syria, Persia for 30 years.",
    originUr: "عرب — بنو شیبان۔ بغداد میں پیدائش، والد کم عمری میں وفات پا گئے۔ چاروں ائمہ میں سب سے زیادہ سفر کرنے والے—30 سال تک کوفہ، بصرہ، مکہ، مدینہ، یمن، شام اور فارس کے اسفار۔",
    heritage: "Collected 700,000+ hadiths. Students describe him fasting continuously, sleeping only briefly, dedicating every hour to scholarship. Studied under 300+ teachers.",
    heritageUr: "700,000+ احادیث جمع کیں۔ شاگردوں کے مطابق مسلسل روزے، بہت کم نیند، اور ہر ساعت علم میں صرف۔ 300+ اساتذہ سے استفادہ۔",
    sig: "The man who endured years of flogging and imprisonment rather than agree the Quran was created — and whose resistance ended a state-imposed heresy.",
    sigUr: "وہ امام جنہوں نے قرآن کے مخلوق ہونے کے نظریے کو ماننے کے بجائے برسوں کی قید و کوڑے برداشت کیے—اور جن کے صبر نے ریاستی فتنہ ختم کر دیا۔",
    teacherChain: ["Prophet ﷺ", "Companions (multiple chains)", "Major Tabi'in", "Imam al-Shafi'i + 300+ hadith masters", "Imam Ahmad"],
    teachers: "Imam al-Shafi'i (called Ahmad 'one of the eight greatest scholars'). Yahya ibn Sa'id al-Qattan. Abd al-Rahman ibn Mahdi. Sufyan ibn Uyayna. Waki' ibn al-Jarrah. Hushaym ibn Bashir.",
    teachersUr: "امام شافعیؒ (انہیں \"آٹھ عظیم علماء\" میں شمار کیا)۔ یحییٰ بن سعید القطان۔ عبدالرحمن بن مہدی۔ سفیان بن عیینہ۔ وکیع بن الجراح۔ ہشیم بن بشیر۔",
    students: "Abu Dawud al-Sijistani (Sunan Abu Dawud). Sons Salih and Abd Allah (transmitted and expanded al-Musnad). Harb ibn Ismail. Ibrahim al-Harbi. Every major 9th-century hadith scholar studied under him.",
    studentsUr: "ابو داود السجستانی۔ بیٹے صالح اور عبداللہ (المسند کی روایت/توسیع)۔ حرب بن اسماعیل۔ ابراہیم الحربی۔ 9ویں صدی کے بڑے محدثین نے ان سے استفادہ کیا۔",
    keyWorks: "al-Musnad — 30,000+ hadiths (largest personal collection). Kitab al-Zuhd. Kitab al-Iman. Legal opinions preserved in al-Masa'il by his sons.",
    keyWorksUr: "المسند — 30,000+ احادیث (ذاتی مجموعات میں سب سے بڑا)۔ کتاب الزہد۔ کتاب الایمان۔ فقہی مسائل بیٹوں کی \"المسائل\" میں محفوظ۔",
    method: "Quran → Sahih Hadith (prioritized even over scholarly consensus) → Weak Hadith (when no stronger evidence exists) → Companion opinion → Qiyas (minimized). Anti-speculative. Closest to the literal text.",
    methodUr: "قرآن → صحیح حدیث (اجماع پر بھی مقدم) → ضعیف حدیث (جب قوی دلیل نہ ہو) → قولِ صحابی → قیاس (کم سے کم)۔ نص پر سب سے زیادہ قائم۔",
    reach: "~10% of Muslims globally. Saudi Arabia (official state law), Qatar, UAE (partially), Kuwait, historically all of Najd (central Arabia). Wahhabi/Salafi movements trace Hanbali jurisprudential roots.",
    reachUr: "دنیا کے تقریباً 10٪ مسلمان۔ سعودی عرب (سرکاری قانون)، قطر، کویت، اور جزوی طور پر امارات؛ تاریخی طور پر نجد۔ سلفی/وہابی تحریکوں کی فقہی جڑیں حنبلی ہیں۔",
    keyFact: "During the Mihna (833–848 CE), every scholar in Baghdad capitulated and declared the Quran 'created.' Ahmad alone refused — for 28 months of imprisonment and flogging. His endurance broke the state's will.",
    keyFactUr: "محنہ (833–848) میں بغداد کے اکثر علماء نے دباؤ میں اقرار کیا؛ احمدؒ نے 28 ماہ قید و کوڑے کے باوجود انکار کیا۔ ان کی استقامت نے ریاست کا دباؤ توڑ دیا۔",
    trial: "Flogged before Caliph al-Mu'tasim until unconscious — twice. Never recanted. When freed, 800,000+ people lined Baghdad's streets. He said: 'If I had submitted, millions of ordinary Muslims would have too. The deen would have been corrupted.'",
    trialUr: "خلیفہ معتصم کے سامنے دو بار بے ہوش ہونے تک کوڑے۔ رجوع نہ کیا۔ رہائی پر بغداد کی گلیوں میں لاکھوں افراد نکل آئے۔ فرمایا: \"اگر میں جھک جاتا تو عوام بھی جھک جاتے، دین میں فساد آ جاتا\"۔",
    signature: "'Do not follow my opinion, nor Malik's, nor Shafi'i's — take from where we took: the Quran and Sunnah.'",
    signatureUr: "\"میری رائے نہ لو، نہ مالکؒ کی، نہ شافعیؒ کی—وہیں سے لو جہاں سے ہم نے لیا: قرآن اور سنت۔\"",
    books_legacy: "al-Mughni by Ibn Qudama (d.1223) — 10-volume Hanbali encyclopedia. Ibn Taymiyyah's 37-volume collected fatwas. Modern Saudi law is primarily Hanbali.",
    books_legacyUr: "المغنی (ابن قدامہ) — 10 جلدوں پر حنبلی انسائیکلوپیڈیا۔ ابن تیمیہ کے مجموعہ فتاویٰ (37 جلدیں)۔ جدید سعودی قانون زیادہ تر حنبلی ہے۔",
  },
];

/* ── Transmission Chain Eras ── */
export interface Era {
  id: number;
  label: string;
  yr: string;
}

export const IM_ERAS: Era[] = [
  { id: 0,   label: "PROPHET ﷺ",                              yr: "570–632 CE" },
  { id: 1,   label: "SAHABA — THE COMPANIONS",               yr: "632–715 CE" },
  { id: 2,   label: "TABI'IN — THE SUCCESSORS",              yr: "650–742 CE" },
  { id: 3,   label: "TABA' AL-TABI'IN — 2ND GENERATION",    yr: "700–780 CE" },
  { id: 4,   label: "THE FOUR IMAMS ✦",                      yr: "699–855 CE" },
  { id: 5,   label: "DIRECT STUDENTS & TRANSMITTERS",        yr: "775–920 CE" },
  { id: 5.5, label: "SIX HADITH COMPILERS — KUTUB AL-SITTA", yr: "810–915 CE" },
  { id: 6,   label: "CLASSICAL SCHOLARS",                    yr: "850–1100 CE" },
  { id: 7,   label: "MEDIEVAL MASTERS",                      yr: "1100–1500 CE" },
  { id: 8,   label: "EARLY MODERN",                          yr: "1500–1900 CE" },
  { id: 9,   label: "MODERN ERA",                            yr: "1900–2026 CE" },
  { id: 10,  label: "THE KNOWLEDGE REACHES YOU — 2026 CE",  yr: "You, Today" },
];

/* ── Chain Nodes ── */
export interface ChainNode {
  id: string;
  era: number;
  name: string;
  ar: string;
  m: string;         // madhab key
  died?: string;
  detail: string;
  to: string[];
  special?: string;
  IMAM?: boolean;
}

export const IM_NODES: ChainNode[] = [
  { id:'prop',        era:0,  name:"Muhammad ﷺ",                    ar:"رسول الله ﷺ",             m:'all',  special:'prophet',
    detail:"The Final Prophet ﷺ (570–632 CE). His sayings (Hadith), actions (Sunnah) and approvals (Taqrir) — preserved by his companions — are the primary source of all four madhabs. Every link in this chain begins here.",
    to:['ibn_masud','ali','ibn_umar','aisha','ibn_abbas','abu_hurayra','anas'] },

  // Sahaba
  { id:'ibn_masud',   era:1,  name:"Ibn Masud ؓ",                   ar:"ابن مسعود",               m:'hf',  died:"653 CE",
    detail:"Abdullah ibn Masud ؓ — Personal attendant of the Prophet ﷺ. 848 hadiths. PRIMARY source of the Hanafi chain via Alqama → Ibrahim al-Nakha'i → Hammad → Abu Hanifa.",
    to:['alqama'] },
  { id:'ali',         era:1,  name:"Ali ibn Abi Talib ؓ",           ar:"علي بن أبي طالب",          m:'all', died:"661 CE",
    detail:"Ali ؓ — 4th Caliph, cousin and son-in-law of the Prophet ﷺ. First child to accept Islam. 586 hadiths. Legal opinions feed multiple madhab chains.",
    to:['hasan_basri'] },
  { id:'ibn_umar',    era:1,  name:"Ibn Umar ؓ",                    ar:"ابن عمر",                  m:'ml',  died:"693 CE",
    detail:"Abdullah ibn Umar ؓ — Son of Caliph Umar. 2,630 hadiths. SOURCE of the GOLDEN CHAIN: Prophet ﷺ → Ibn Umar → Nafi' → Malik.",
    to:['nafi'] },
  { id:'aisha',       era:1,  name:"Aisha ؓ",                       ar:"عائشة",                    m:'sf',  died:"678 CE",
    detail:"Aisha ؓ — Mother of Believers. 2,210 hadiths. Primary source for family law and personal practices. Feeds Maliki and Shafi'i chains via Urwa ibn al-Zubayr.",
    to:['urwa','ibn_shihab'] },
  { id:'ibn_abbas',   era:1,  name:"Ibn Abbas ؓ",                   ar:"ابن عباس",                 m:'sf',  died:"687 CE",
    detail:"Abdullah ibn Abbas ؓ — 'Scholar of the Ummah.' 1,660 hadiths. Primary source for Quranic exegesis. Students Mujahid and Ata feed the Shafi'i chain.",
    to:['ata_rabah','mujahid'] },
  { id:'abu_hurayra', era:1,  name:"Abu Hurayra ؓ",                 ar:"أبو هريرة",                m:'all', died:"678 CE",
    detail:"5,374 hadiths — more than any companion. The Prophet ﷺ prayed for his memory. Narrations feed ALL four schools and all six canonical hadith collections.",
    to:['said_musayyib','ibn_shihab'] },
  { id:'anas',        era:1,  name:"Anas ibn Malik ؓ",              ar:"أنس بن مالك",              m:'all', died:"712 CE",
    detail:"Served the Prophet ﷺ for 10 years. 2,286 hadiths. Lived to ~103 years — connecting the Prophetic era to the Tabi'in. In all six collections.",
    to:['ibn_shihab','hasan_basri'] },

  // Tabi'in
  { id:'alqama',      era:2,  name:"Alqama al-Nakha'i",            ar:"علقمة النخعي",             m:'hf',  died:"681 CE",
    detail:"Top student of Ibn Masud in Kufa. Critical link: Ibn Masud → Alqama → Ibrahim → Hammad → Abu Hanifa.",
    to:['ibrahim_n'] },
  { id:'hasan_basri', era:2,  name:"Hasan al-Basri",               ar:"الحسن البصري",             m:'all', died:"728 CE",
    detail:"Greatest scholar and preacher of the Tabi'in. Studied under Ali, Ibn Umar, Anas. Major synthesizer of early Islamic jurisprudence.",
    to:['hammad','qatada'] },
  { id:'said_musayyib',era:2, name:"Said ibn al-Musayyib",         ar:"سعيد بن المسيب",           m:'ml',  died:"715 CE",
    detail:"'The Jurist of Jurists.' Medina's greatest Tabi'i. Primary transmitter of Abu Hurayra's hadiths. Direct teacher of Ibn Shihab al-Zuhri.",
    to:['ibn_shihab'] },
  { id:'nafi',        era:2,  name:"Nafi' ✦ Golden Chain",         ar:"نافع مولى ابن عمر",        m:'ml',  died:"735 CE", special:'golden',
    detail:"Nafi' mawla Ibn Umar — Served Abdullah ibn Umar for 30 years. Al-Bukhari called the chain Prophet ﷺ → Ibn Umar → Nafi' → Malik the 'GOLDEN CHAIN' — the most authentic sequence in hadith history.",
    to:['imam_malik'] },
  { id:'urwa',        era:2,  name:"Urwa ibn al-Zubayr",           ar:"عروة بن الزبير",           m:'sf',  died:"712 CE",
    detail:"Nephew of Aisha ؓ. Primary transmitter of Aisha's hadiths. His student Ibn Shihab al-Zuhri linked the Shafi'i and Maliki chains.",
    to:['ibn_shihab'] },
  { id:'ata_rabah',   era:2,  name:"Ata ibn Abi Rabah",            ar:"عطاء بن أبي رباح",         m:'sf',  died:"732 CE",
    detail:"Grand Mufti of Mecca. Freed Nubian slave. Studied under Ibn Abbas for years. Primary Meccan scholarly link.",
    to:['ibn_jurayj'] },
  { id:'mujahid',     era:2,  name:"Mujahid ibn Jabr",             ar:"مجاهد بن جبر",             m:'sf',  died:"722 CE",
    detail:"Greatest early Quranic exegete. Top student of Ibn Abbas. Ibn Abbas reviewed his tafsir three times.",
    to:['ibn_jurayj'] },
  { id:'ibn_shihab',  era:2,  name:"Ibn Shihab al-Zuhri",          ar:"ابن شهاب الزهري",          m:'all', died:"742 CE",
    detail:"Greatest hadith synthesizer of his era. Al-Bukhari: 'al-Zuhri is the most prolific and most reliable of the Tabi'in.' DIRECT teacher of Imam Malik. Nearly every page of Bukhari and Muslim contains al-Zuhri.",
    to:['imam_malik','yahya_ansari'] },

  // Taba' al-Tabi'in
  { id:'ibrahim_n',   era:3,  name:"Ibrahim al-Nakha'i",           ar:"إبراهيم النخعي",           m:'hf',  died:"714 CE",
    detail:"Kufa's leading scholar. Nephew of Alqama. His student Hammad ibn Abi Sulayman became Abu Hanifa's teacher for 18 years — making Ibrahim the critical 3rd link.",
    to:['hammad'] },
  { id:'qatada',      era:3,  name:"Qatada al-Sadusi",             ar:"قتادة السدوسي",            m:'all', died:"735 CE",
    detail:"Basra's greatest hadith scholar. Blind from birth. Student of Hasan al-Basri and Anas. Prodigious memory. Hadiths in all six collections.",
    to:['hammad'] },
  { id:'hammad',      era:3,  name:"Hammad ibn Abi Sulayman",      ar:"حماد بن أبي سليمان",       m:'hf',  died:"738 CE",
    detail:"Abu Hanifa's PRIMARY teacher for 18 consecutive years. Student of Ibrahim al-Nakha'i. Without Hammad, the Hanafi school would not exist.",
    to:['imam_hanafi'] },
  { id:'rabi_ray',    era:3,  name:"Rabi'a al-Ra'y",               ar:"ربيعة الرأي",              m:'ml',  died:"753 CE",
    detail:"Malik's key teacher for rational jurisprudence (ra'y). Gave Malik the methodological framework for reasoning alongside hadith.",
    to:['imam_malik'] },
  { id:'yahya_ansari',era:3,  name:"Yahya ibn Sa'id al-Ansari",    ar:"يحيى بن سعيد الأنصاري",   m:'ml',  died:"760 CE",
    detail:"Medinan hadith scholar. Student of Ibn Shihab al-Zuhri. Connected the al-Zuhri tradition to Malik's circle.",
    to:['imam_malik'] },
  { id:'ibn_jurayj',  era:3,  name:"Ibn Jurayj (Mecca)",           ar:"ابن جريج",                 m:'sf',  died:"767 CE",
    detail:"FIRST scholar to write organized hadith compilations in the Hejaz. His systematic approach prefigured al-Muwatta. Shafi'i's teachers trained in this tradition.",
    to:['imam_shafi','sufyan_uy'] },
  { id:'sufyan_uy',   era:3,  name:"Sufyan ibn Uyayna",            ar:"سفيان بن عيينة",           m:'sf',  died:"814 CE",
    detail:"Mecca's greatest hadith scholar. Taught 70+ years at the Ka'ba. Both Malik and Shafi'i studied under him.",
    to:['imam_shafi','imam_ahmad'] },
  { id:'sufyan_th',   era:3,  name:"Sufyan al-Thawri",             ar:"سفيان الثوري",             m:'all', died:"778 CE",
    detail:"'Prince of the Believers in Hadith.' Kufa's greatest scholar after Abu Hanifa. Fed the Hanbali tradition. Imam Ahmad studied his hadiths extensively.",
    to:['imam_ahmad'] },

  // Four Imams
  { id:'imam_hanafi', era:4,  name:"Imam Abu Hanifa",              ar:"أبو حنيفة",                m:'hf',  died:"767 CE", IMAM:true,
    detail:"d. 767 CE — Founder of the Hanafi school. Click for full profile.",
    to:['abu_yusuf','shaybani','zufar'] },
  { id:'imam_malik',  era:4,  name:"Imam Malik",                   ar:"مالك بن أنس",              m:'ml',  died:"795 CE", IMAM:true,
    detail:"d. 795 CE — Founder of the Maliki school. Click for full profile.",
    to:['ibn_qasim','yahya_andal','imam_shafi'] },
  { id:'imam_shafi',  era:4,  name:"Imam al-Shafi'i",              ar:"الشافعي",                  m:'sf',  died:"820 CE", IMAM:true,
    detail:"d. 820 CE — Founder of the Shafi'i school. Click for full profile.",
    to:['muzani','buwayti','rabi_m','imam_ahmad'] },
  { id:'imam_ahmad',  era:4,  name:"Imam Ahmad ibn Hanbal",        ar:"أحمد بن حنبل",             m:'hb',  died:"855 CE", IMAM:true,
    detail:"d. 855 CE — Founder of the Hanbali school. Click for full profile.",
    to:['abu_dawud_s','salih_a','abd_allah_a'] },

  // Direct Students
  { id:'zufar',       era:5,  name:"Zufar ibn al-Hudhayl",         ar:"زفر",                      m:'hf',  died:"775 CE",
    detail:"Most rigorous in legal reasoning among Abu Hanifa's students.",
    to:['tahawi'] },
  { id:'abu_yusuf',   era:5,  name:"Abu Yusuf (Chief Justice)",    ar:"أبو يوسف",                 m:'hf',  died:"798 CE",
    detail:"FIRST Qadi al-Qudat (Chief Justice of Islam). Made Hanafi school official school of the Abbasid Empire. Wrote Kitab al-Kharaj on Islamic taxation.",
    to:['tahawi','shaybani'] },
  { id:'shaybani',    era:5,  name:"Muhammad al-Shaybani",         ar:"الشيباني",                 m:'hf',  died:"805 CE",
    detail:"The DOCUMENTARIAN of Hanafi school. His 6 Zahir al-Riwaya books ARE the Hanafi school. Also studied under Malik and Shafi'i.",
    to:['tahawi'] },
  { id:'ibn_qasim',   era:5,  name:"Ibn al-Qasim",                 ar:"ابن القاسم",               m:'ml',  died:"806 CE",
    detail:"Stayed with Imam Malik 20 years in Medina. Primary transmitter of Malik's rulings. Al-Mudawwana compiled through his narrations to Sahnun.",
    to:['sahnun'] },
  { id:'yahya_andal', era:5,  name:"Yahya al-Andalusi",            ar:"يحيى الأندلسي",            m:'ml',  died:"849 CE",
    detail:"From Córdoba, Spain. Memorized al-Muwatta entirely. Single-handedly made Maliki school dominant in Al-Andalus (711–1492 CE). North/West Africa follow Malik today because of him.",
    to:[] },
  { id:'muzani',      era:5,  name:"al-Muzani",                    ar:"المزني",                   m:'sf',  died:"878 CE",
    detail:"Shafi'i's most brilliant student. Mukhtasar al-Muzani — primary Shafi'i textbook still used today. Transmitted the authoritative 'new Egyptian position.'",
    to:['ibn_surayj'] },
  { id:'buwayti',     era:5,  name:"al-Buwayti (Martyr)",          ar:"البويطي",                  m:'sf',  died:"845 CE",
    detail:"Shafi'i's successor in Egypt. Died in Abbasid chains for refusing the Mu'tazilite 'Quran created' doctrine — same as Imam Ahmad.",
    to:['ibn_surayj'] },
  { id:'rabi_m',      era:5,  name:"al-Rabi al-Muradi",            ar:"الربيع المرادي",            m:'sf',  died:"884 CE",
    detail:"Official transmitter of al-Shafi'i's books. Without al-Rabi, the text of al-Umm might have been lost.",
    to:['ibn_surayj'] },
  { id:'salih_a',     era:5,  name:"Salih ibn Ahmad",              ar:"صالح بن أحمد",              m:'hb',  died:"880 CE",
    detail:"Eldest son of Imam Ahmad. Transmitted his father's legal opinions. Wrote Masa'il — primary Hanbali source.",
    to:['khallal'] },
  { id:'abd_allah_a', era:5,  name:"Abd Allah ibn Ahmad",          ar:"عبدالله بن أحمد",           m:'hb',  died:"903 CE",
    detail:"Younger son. Added 10,000+ hadiths to al-Musnad. The al-Musnad we have today is his edition.",
    to:['khallal'] },
  { id:'abu_dawud_s', era:5,  name:"Abu Dawud al-Sijistani",       ar:"أبو داود",                 m:'hb',  died:"889 CE",
    detail:"Direct student of Imam Ahmad. Sunan Abu Dawud (4,800 hadiths from 500,000 examined) — one of the six canonical collections. Imam Ahmad approved the work.",
    to:[] },

  // Six Hadith Compilers
  { id:'bukhari',     era:5.5, name:"Imam al-Bukhari",             ar:"البخاري",                  m:'had', died:"870 CE",
    detail:"Sahih al-Bukhari: 7,275 hadiths selected from 600,000+ examined over 16 years. The most authenticated book after the Quran.",
    to:[] },
  { id:'muslim',      era:5.5, name:"Imam Muslim",                 ar:"مسلم",                     m:'had', died:"875 CE",
    detail:"Sahih Muslim: 7,563 hadiths. Second most authenticated collection.",
    to:[] },
  { id:'tirmidhi',    era:5.5, name:"al-Tirmidhi",                 ar:"الترمذي",                  m:'had', died:"892 CE",
    detail:"Jami al-Tirmidhi: 3,956 hadiths. First to systematically grade hadiths (Sahih/Hasan/Da'if).",
    to:[] },
  { id:'nasai',       era:5.5, name:"al-Nasa'i",                   ar:"النسائي",                  m:'had', died:"915 CE",
    detail:"Sunan al-Nasa'i: 5,761 hadiths. Strictest critic of narrator chains after the two Sahihs.",
    to:[] },
  { id:'ibn_majah',   era:5.5, name:"Ibn Majah",                   ar:"ابن ماجه",                 m:'had', died:"887 CE",
    detail:"Sunan Ibn Majah: 4,341 hadiths. Completes the Kutub al-Sitta (Six Books).",
    to:[] },

  // Classical
  { id:'tahawi',      era:6,  name:"al-Tahawi",                    ar:"الطحاوي",                  m:'hf',  died:"933 CE",
    detail:"Aqidah al-Tahawiyya — accepted by ALL four schools as the universal Sunni creed. Proved Hanafi fiqh is fully grounded in hadith.",
    to:['sarakhsi'] },
  { id:'sahnun',      era:6,  name:"Sahnun (N.Africa)",            ar:"سحنون",                    m:'ml',  died:"854 CE",
    detail:"Compiled al-Mudawwana al-Kubra in Qayrawan, Tunisia. THE definitive Maliki encyclopedia — made North Africa permanently Maliki.",
    to:['ibn_abi_zayd'] },
  { id:'ibn_surayj',  era:6,  name:"Ibn Surayj",                   ar:"ابن سريج",                 m:'sf',  died:"918 CE",
    detail:"'Peacock of the Jurists.' Spread Shafi'i school from Baghdad to Persia and Khorasan. Reportedly wrote 400 books.",
    to:['ghazali'] },
  { id:'khallal',     era:6,  name:"al-Khallal",                   ar:"الخلال",                   m:'hb',  died:"923 CE",
    detail:"Spent his life collecting every statement of Imam Ahmad. His 20-volume al-Jami preserved Hanbali jurisprudence comprehensively.",
    to:['abu_yala'] },
  { id:'ibn_abi_zayd',era:6,  name:"Ibn Abi Zayd",                 ar:"ابن أبي زيد",              m:'ml',  died:"996 CE",
    detail:"'The Young Malik.' His al-Risala — most widely used intro to Maliki fiqh — still taught across North/West Africa.",
    to:[] },

  // Medieval
  { id:'sarakhsi',    era:7,  name:"al-Sarakhsi",                  ar:"السرخسي",                  m:'hf',  died:"1090 CE",
    detail:"Dictated his 30-volume al-Mabsut from MEMORY while in prison. The encyclopedia of Hanafi fiqh.",
    to:['marghinani'] },
  { id:'marghinani',  era:7,  name:"al-Marghinani",                ar:"المرغيناني",               m:'hf',  died:"1197 CE",
    detail:"al-Hidaya — STILL the primary Hanafi seminary textbook worldwide. British colonial government translated it to govern Muslim subjects in India.",
    to:[] },
  { id:'ibn_rushd',   era:7,  name:"Ibn Rushd (Averroës)",         ar:"ابن رشد",                  m:'ml',  died:"1198 CE",
    detail:"Bidayat al-Mujtahid — finest comparative fiqh textbook ever written. Maliki judge in Córdoba.",
    to:[] },
  { id:'ghazali',     era:7,  name:"al-Ghazali",                   ar:"الغزالي",                  m:'sf',  died:"1111 CE",
    detail:"'Proof of Islam.' Ihya Ulum al-Din — greatest synthesis of jurisprudence, theology and spirituality. Permanently changed Islamic intellectual history.",
    to:[] },
  { id:'nawawi',      era:7,  name:"al-Nawawi",                    ar:"النووي",                   m:'sf',  died:"1277 CE",
    detail:"Died at 44, wrote 50+ major works. Riyad al-Salihin in every Muslim home. al-Majmu — most comprehensive Shafi'i encyclopedia.",
    to:[] },
  { id:'ibn_qudama',  era:7,  name:"Ibn Qudama",                   ar:"ابن قدامة",                m:'hb',  died:"1223 CE",
    detail:"al-Mughni (10 volumes) — most comprehensive Hanbali encyclopedia. Still the definitive Hanbali reference in Saudi Arabia.",
    to:['ibn_taymiyya'] },
  { id:'abu_yala',    era:7,  name:"al-Qadi Abu Ya'la",            ar:"أبو يعلى",                 m:'hb',  died:"1066 CE",
    detail:"Chief Hanbali judge of Baghdad. Systematized Hanbali theology.",
    to:['ibn_qudama'] },
  { id:'ibn_hajar',   era:7,  name:"Ibn Hajar al-Asqalani",        ar:"ابن حجر",                  m:'sf',  died:"1449 CE",
    detail:"Fath al-Bari — 13-volume commentary on Sahih al-Bukhari — the greatest hadith commentary ever written. Defined hadith criticism for all generations.",
    to:[] },
  { id:'ibn_taymiyya',era:7,  name:"Ibn Taymiyyah",                ar:"ابن تيمية",                m:'hb',  died:"1328 CE",
    detail:"'Sheikh al-Islam.' 37 volumes of fatwas. Imprisoned 6 times. Called for return to primary sources. Influenced every modern Islamic reform movement. Died in Damascus citadel prison.",
    to:['ibn_qayyim'] },
  { id:'ibn_qayyim',  era:7,  name:"Ibn al-Qayyim",                ar:"ابن القيم",                m:'hb',  died:"1350 CE",
    detail:"Ibn Taymiyyah's greatest student. Zad al-Ma'ad, I'lam al-Muwaqqi'in. Bridges jurisprudence with spirituality.",
    to:['ibn_abd_wahhab'] },

  // Early Modern
  { id:'shah_wali',   era:8,  name:"Shah Waliullah",               ar:"شاه ولي الله",             m:'hf',  died:"1762 CE",
    detail:"Greatest Islamic synthesizer of the early modern era. Hujjat Allah al-Baligha. Reconciled all four madhabs. His sons produced the Deobandi and Barelvi movements.",
    to:['deoband','barelvi'] },
  { id:'shawkani',    era:8,  name:"al-Shawkani",                  ar:"الشوكاني",                 m:'all', died:"1834 CE",
    detail:"Chief Judge of Yemen 30 years. Called for ijtihad over blind madhab following. Bridges traditional and reformist.",
    to:[] },
  { id:'ibn_abd_wahhab',era:8,name:"Ibn Abd al-Wahhab",            ar:"ابن عبدالوهاب",            m:'hb',  died:"1792 CE",
    detail:"Reformist Hanbali scholar. Alliance with Muhammad ibn Saud (1744) became Saudi Arabia. Movement spread globally through Saudi wealth.",
    to:['ibn_baz'] },

  // Modern
  { id:'deoband',     era:9,  name:"Darul Uloom Deoband",          ar:"دارالعلوم ديوبند",         m:'hf',  died:"est. 1867",
    detail:"Founded 1867 CE, India. Most influential Hanafi seminary of the 20th century. Graduates teach across Pakistan, India, Bangladesh, Afghanistan, UK, South Africa.",
    to:['today'] },
  { id:'barelvi',     era:9,  name:"Ahmad Rida Khan Barelvi",      ar:"أحمد رضا خان",             m:'hf',  died:"1921 CE",
    detail:"Ala Hazrat. Founded Barelvi movement (1898). Hanafi with Sufi practices. Represents ~60% of South Asian Muslims today.",
    to:['today'] },
  { id:'azhar',       era:9,  name:"Al-Azhar (Cairo)",             ar:"الأزهر",                   m:'all', died:"est. 972 CE",
    detail:"World's oldest continuously operating university (est. 972 CE). Primary Maliki/Shafi'i faculty. Grand Imam's fatwas recognized globally.",
    to:['today'] },
  { id:'qaradawi',    era:9,  name:"al-Qaradawi",                  ar:"القرضاوي",                 m:'ml',  died:"2022 CE",
    detail:"al-Halal wa al-Haram fi al-Islam — most-read 20th-century fiqh book. European Council for Fatwa. Passed away 2022.",
    to:['today'] },
  { id:'zuhayli',     era:9,  name:"al-Zuhayli",                   ar:"الزحيلي",                  m:'hf',  died:"2015 CE",
    detail:"al-Fiqh al-Islami wa Adillatuh (8 vols) — most comprehensive modern encyclopedia of all four madhabs.",
    to:['today'] },
  { id:'ibn_baz',     era:9,  name:"Sheikh Ibn Baz",               ar:"ابن باز",                  m:'hb',  died:"1999 CE",
    detail:"Grand Mufti of Saudi Arabia 1993–1999. 10,000+ fatwas. Hanbali-Salafi. Spread the school globally through Saudi institutions.",
    to:['today'] },
  { id:'uthaymin',    era:9,  name:"Ibn Uthaymin",                 ar:"ابن عثيمين",               m:'hb',  died:"2001 CE",
    detail:"Saudi Hanbali scholar. 200+ published volumes. Known for accessible explanations. Among the most downloaded Islamic scholars.",
    to:['today'] },

  // Today
  { id:'today',       era:10, name:"The Knowledge Reaches You",    ar:"وصل إليك العلم — 2026",   m:'all', IMAM:true, special:'today',
    detail:"2026 CE. Every hadith in Bukhari and Muslim traces back through this chart to the Prophet ﷺ. Every prayer, every wudu, every fast — preserved across 1,400 years. رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ",
    to:[] },
];

/* ── Isnad Chains ── */
export interface IsnadLink {
  name: string;
  ar: string;
  yr: string;
  role: string;
  c: string;
  tc: string;
}

export interface Isnad {
  title: string;
  ar: string;
  en: string;
  source: string;
  sig: string;
  chain: IsnadLink[];
  note: string;
}

export const ISNADS_DATA: Isnad[] = [
  {
    title: "Hadith al-Niyyah — The Hadith of Intention (Bukhari #1)",
    ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    en: "Actions are judged only by intentions, and every person gets only what they intend.",
    source: "Sahih al-Bukhari #1 · Sahih Muslim · Opening hadith of countless Islamic works",
    sig: "Imam al-Shafi'i: 'This hadith constitutes one-third of all Islamic knowledge.' The first hadith in Bukhari — signaling that no act matters without sincere intention.",
    chain: [
      { name:"Prophet ﷺ",                         ar:"رسول الله ﷺ",          yr:"632 CE",        role:"Said in Medina",                                    c:"#d4a017", tc:"#1a0a00" },
      { name:"Umar ibn al-Khattab ؓ",              ar:"عمر",                   yr:"d.644",         role:"2nd Caliph — heard it directly",                    c:"#b8860b", tc:"#fffef9" },
      { name:"Alqama ibn Waqqas al-Laythi",        ar:"علقمة بن وقاص",        yr:"d.~700",        role:"Tabi'i Medinan scholar",                            c:"#8b6008", tc:"#fffef9" },
      { name:"Muhammad ibn Ibrahim al-Taymi",      ar:"محمد بن إبراهيم",      yr:"d.120 AH",      role:"Tabi'i — Umar hadith specialist",                   c:"#7a5500", tc:"#fffef9" },
      { name:"Yahya ibn Sa'id al-Ansari",          ar:"يحيى الأنصاري",        yr:"d.143 AH",      role:"Taba' Tabi'i — Medina judge",                       c:"#0a5c2e", tc:"#fffef9" },
      { name:"Imam al-Bukhari",                    ar:"البخاري",               yr:"810–870 CE",    role:"Recorded as Hadith #1 in Sahih al-Bukhari",         c:"#505090", tc:"#fffef9" },
      { name:"You — 2026 CE",                      ar:"أنت اليوم",             yr:"Now",           role:"1,400 years — every link verified",                 c:"#d4a017", tc:"#1a0a00" },
    ],
    note: "This hadith has a UNIQUE chain (Gharib Mutlaq) — each link had only ONE narrator to the next. Despite this, its authenticity is beyond question because of the exceptional trustworthiness of each person in the chain. Every Islamic scholar begins their first lesson with this hadith.",
  },
  {
    title: "Hadith Jibril — Islam, Iman and Ihsan Defined (Bukhari #50 · Muslim #8)",
    ar: "أَنْ تَعْبُدَ اللهَ كَأَنَّكَ تَرَاهُ، فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ",
    en: "Worship Allah as though you see Him — and if you cannot see Him, know that He sees you.",
    source: "Sahih al-Bukhari #50 · Sahih Muslim #8 — 'The Mother of Hadiths' defining all three levels of the deen",
    sig: "This single hadith defines the entire spiritual program of Islam in three levels: Islam (5 pillars), Iman (6 articles of faith), and Ihsan (worshipping as though you see Allah). Transmitted by Jibril appearing in human form.",
    chain: [
      { name:"Prophet ﷺ",                         ar:"رسول الله ﷺ",          yr:"632 CE",        role:"Answered Jibril's questions in the mosque",          c:"#d4a017", tc:"#1a0a00" },
      { name:"Umar ibn al-Khattab ؓ",              ar:"عمر",                   yr:"d.644",         role:"Present in the gathering",                           c:"#b8860b", tc:"#fffef9" },
      { name:"Yahya ibn Ya'mar",                   ar:"يحيى بن يعمر",         yr:"d.~129 AH",     role:"Tabi'i — Basra, founder of Arabic grammar",          c:"#8b6008", tc:"#fffef9" },
      { name:"Abu al-Aswad al-Du'ali",             ar:"أبو الأسود الدؤلي",    yr:"d.69 AH",       role:"Tabi'i — Basra scholar",                             c:"#7a5500", tc:"#fffef9" },
      { name:"Abd Allah ibn Burayda",              ar:"عبدالله بن بريدة",     yr:"d.115 AH",      role:"Parallel chain transmitter",                         c:"#0a5c2e", tc:"#fffef9" },
      { name:"Imam Muslim",                        ar:"مسلم",                  yr:"820–875 CE",    role:"Preserved in Sahih Muslim as Hadith #8",             c:"#505090", tc:"#fffef9" },
      { name:"You — 2026 CE",                      ar:"أنت اليوم",             yr:"Now",           role:"The definition of Ihsan — unchanged 1,400 years",    c:"#d4a017", tc:"#1a0a00" },
    ],
    note: "Transmitted through MULTIPLE parallel chains — Abu Hurayra ؓ also narrated a version. This multiplicity (Tawatur ma'nawi) makes it among the most authenticated narrations in the entire corpus.",
  },
  {
    title: "The Golden Chain — Prayer Requires Purity (Muslim #224)",
    ar: "لَا يَقْبَلُ اللهُ صَلَاةً بِغَيْرِ طُهُورٍ",
    en: "Allah does not accept prayer without purification (wudu).",
    source: "Sahih Muslim #224 — Via the Golden Chain (Silsilah al-Dhahab) — the most authenticated chain in hadith history",
    sig: "Ibn al-Mubarak and Imam al-Bukhari called Prophet ﷺ → Ibn Umar → Nafi' → Malik the 'GOLDEN CHAIN' — the single most authenticated narration sequence. Your wudu before every prayer connects to this chain.",
    chain: [
      { name:"Prophet ﷺ",                         ar:"رسول الله ﷺ",          yr:"632 CE",        role:"Established the law of purification",                c:"#d4a017", tc:"#1a0a00" },
      { name:"Abdullah ibn Umar ؓ ✦",              ar:"ابن عمر ✦",             yr:"d.693 CE",      role:"Son of 2nd Caliph — 2,630 hadiths",                  c:"#b8860b", tc:"#fffef9" },
      { name:"Nafi' mawla Ibn Umar ✦",             ar:"نافع ✦ GOLDEN",        yr:"d.117 AH",      role:"THE GOLDEN CHAIN — served Ibn Umar 30 years",        c:"#d4a017", tc:"#1a0a00" },
      { name:"Imam Malik ibn Anas ✦",              ar:"الإمام مالك ✦",        yr:"d.179 AH",      role:"Recorded in al-Muwatta — most correct book after Quran",c:"#0a5c2e",tc:"#fffef9"},
      { name:"Al-Shafi'i / Ibn al-Qasim",         ar:"الشافعي / ابن القاسم", yr:"800s CE",       role:"Transmitted to Egypt, Syria, and all schools",        c:"#1a3462", tc:"#fffef9" },
      { name:"All Six Hadith Collections",         ar:"الكتب الستة",           yr:"850–915 CE",    role:"Preserved in Bukhari, Muslim, Nasa'i, Abu Dawud, Tirmidhi, Ibn Majah",c:"#505090",tc:"#fffef9"},
      { name:"You — 2026 CE",                      ar:"أنت اليوم",             yr:"Now",           role:"Your wudu traces through this chain",                c:"#d4a017", tc:"#1a0a00" },
    ],
    note: "'Golden Chain' coined because al-Bukhari — famously unsparing in criticism — called it the most reliable narrators ever assembled. The chain is taught to every student of hadith sciences worldwide.",
  },
  {
    title: "The Hanafi Chain — Bismillah Before Wudu",
    ar: "لَا وُضُوءَ لِمَنْ لَمْ يَذْكُرِ اسْمَ اللهِ عَلَيْهِ",
    en: "There is no valid wudu for one who does not mention the name of Allah over it.",
    source: "Sunan Abi Dawud #101 · Sunan Ibn Majah #399 — Illustrating the specific Hanafi jurisprudential chain",
    sig: "This hadith shows how a specific ruling (Bismillah before wudu is emphasized in Hanafi fiqh) traces through the exact Kufan chain from Ibn Masud to Abu Hanifa — and then into the books we have today.",
    chain: [
      { name:"Prophet ﷺ",                         ar:"رسول الله ﷺ",          yr:"632 CE",        role:"Said to companions before prayer",                    c:"#d4a017", tc:"#1a0a00" },
      { name:"Sa'id ibn Zayd / Abu Hurayra ؓ",    ar:"سعيد بن زيد / أبو هريرة",yr:"d.672/678",  role:"Two companions transmitted different versions",       c:"#b8860b", tc:"#fffef9" },
      { name:"Ibrahim al-Nakha'i",                 ar:"إبراهيم النخعي",       yr:"d.714 CE",      role:"Kufa's leading scholar — 3rd link in Hanafi chain",  c:"#8b6008", tc:"#fffef9" },
      { name:"Hammad ibn Abi Sulayman",            ar:"حماد بن أبي سليمان",   yr:"d.738 CE",      role:"Abu Hanifa's primary teacher for 18 years",           c:"#7a5500", tc:"#fffef9" },
      { name:"Imam Abu Hanifa",                    ar:"أبو حنيفة الإمام",      yr:"d.767 CE",      role:"Ruled: Bismillah before wudu is wajib/mustahabb",    c:"#b8860b", tc:"#fffef9" },
      { name:"Abu Yusuf + al-Shaybani",            ar:"أبو يوسف والشيباني",   yr:"d.798/805",     role:"Codified the ruling in 6 Zahir al-Riwaya books",      c:"#8b6008", tc:"#fffef9" },
      { name:"You — 2026 CE",                      ar:"أنت اليوم",             yr:"Now",           role:"Your wudu method follows this ruling",                c:"#d4a017", tc:"#1a0a00" },
    ],
    note: "The same action (Bismillah before wudu) has DIFFERENT legal weights across schools — proving that the transmission chain matters, not just the content. Each school's ruling traces to a different chain of transmitters.",
  },
  {
    title: "Hadith of Mercy — Kindness to Every Soul (Abu Dawud #4941)",
    ar: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    en: "The merciful are shown mercy by the Most Merciful. Be merciful to those on earth and He who is in heaven will be merciful to you.",
    source: "Sunan Abi Dawud #4941 · Jami al-Tirmidhi #1924 (Hasan Sahih) — In Riyad al-Salihin by al-Nawawi",
    sig: "Encapsulates the Prophet's ﷺ social ethics in one sentence. Cited by all four schools as a foundational principle. Among the most widely recited hadiths in Islamic preaching worldwide.",
    chain: [
      { name:"Prophet ﷺ",                         ar:"رسول الله ﷺ",          yr:"632 CE",        role:"Said in a general sermon",                            c:"#d4a017", tc:"#1a0a00" },
      { name:"Abd Allah ibn Amr ibn al-As ؓ",     ar:"عبدالله بن عمرو",      yr:"d.684 CE",      role:"Companion who wrote hadiths with Prophet's ﷺ permission",c:"#b8860b",tc:"#fffef9"},
      { name:"Abu Qabis (Hayy ibn Hani')",        ar:"أبو قابس",              yr:"Tabi'i",        role:"Transmitted from Abd Allah ibn Amr",                  c:"#8b6008", tc:"#fffef9" },
      { name:"Abd al-Rahman ibn Jubayr (Egypt)",   ar:"عبدالرحمن بن جبير",    yr:"Tabi'i",        role:"Egyptian scholar in the chain",                       c:"#7a5500", tc:"#fffef9" },
      { name:"Abu Dawud al-Sijistani",             ar:"أبو داود السجستاني",    yr:"d.889 CE",      role:"Preserved in Sunan Abi Dawud #4941",                  c:"#505090", tc:"#fffef9" },
      { name:"Imam al-Nawawi",                     ar:"الإمام النووي",         yr:"d.1277 CE",     role:"Included in Riyad al-Salihin — in every Muslim home", c:"#1a3462", tc:"#fffef9" },
      { name:"You — 2026 CE",                      ar:"أنت اليوم",             yr:"Now",           role:"Read by millions daily in every language",             c:"#d4a017", tc:"#1a0a00" },
    ],
    note: "Abd Allah ibn Amr ؓ was one of the few companions who wrote hadiths in a personal notebook (al-Sahifah al-Sadiqah — 'The Truthful Scroll') with the Prophet's ﷺ explicit permission — making his hadiths among the earliest written narrations in Islam.",
  },
];

/* ── Living Legacy ── */
export interface LegacySchool {
  key: string;
  name: string;
  ar: string;
  pct: string;
  pop: string;
  col: string;
  bg: string;
  border: string;
  tc: string;
  regions: string;
  why: string;
  scholars: string[];
}

export const LEGACY_SCHOOLS: LegacySchool[] = [
  {
    key:'hf', name:"Hanafi School", ar:"المذهب الحنفي", pct:"~48%", pop:"~864 million Muslims",
    col:"#b8860b", bg:"rgba(184,134,11,.09)", border:"rgba(184,134,11,.35)", tc:"#6a3800",
    regions:"Turkey · Pakistan · India · Bangladesh · Afghanistan · Central Asia (Uzbekistan, Kazakhstan, Kyrgyzstan) · Balkans · Egypt (Ottoman era) · Tatarstan · Xinjiang Uyghurs",
    why:"The Abbasid and Ottoman Empires adopted Hanafi as their official legal school — spreading it across ~35 countries. The Ottoman Mejelle (1869–1876) was the first Islamic civil code.",
    scholars:["al-Tahawi (d.933)","al-Sarakhsi (d.1090)","al-Marghinani (d.1197)","Shah Waliullah (d.1762)","Darul Uloom Deoband (est.1867)","al-Zuhayli (d.2015)"],
  },
  {
    key:'ml', name:"Maliki School", ar:"المذهب المالكي", pct:"~25%", pop:"~450 million Muslims",
    col:"#0a5c2e", bg:"rgba(10,92,46,.09)", border:"rgba(10,92,46,.35)", tc:"#062e18",
    regions:"Morocco · Algeria · Tunisia · Libya · West Africa (Senegal, Mali, Niger, Nigeria, Mauritania) · Sudan · Bahrain · Kuwait · historically Al-Andalus (Spain 711–1492 CE)",
    why:"Imam Malik lived his entire life in Medina. His students spread the school to the Islamic West. Yahya al-Andalusi transmitted it to Spain; from Spain to North Africa. ~250 million West Africans follow Malik today.",
    scholars:["Sahnun (d.854)","Ibn Abi Zayd (d.996)","Ibn Rushd/Averroës (d.1198)","Mukhtasar Khalil (d.1374)","al-Qaradawi (d.2022)"],
  },
  {
    key:'sf', name:"Shafi'i School", ar:"المذهب الشافعي", pct:"~28%", pop:"~504 million Muslims",
    col:"#1a3462", bg:"rgba(26,52,98,.09)", border:"rgba(26,52,98,.35)", tc:"#0a1c3a",
    regions:"Indonesia (225 million) · Malaysia · Brunei · East Africa (Kenya, Tanzania, Somalia) · Yemen · Egypt · Syria · Kurdish regions · Malabar India",
    why:"Indonesia alone (225 million) makes this the largest school by population. Al-Shafi'i went to Egypt — students spread east to Persia and Khorasan. Arab traders brought the school to Southeast Asia in the 13th–15th centuries.",
    scholars:["al-Muzani (d.878)","al-Ghazali (d.1111)","al-Nawawi (d.1277)","Ibn Hajar al-Asqalani (d.1449)","Habib Umar ibn Hafiz (b.1963)"],
  },
  {
    key:'hb', name:"Hanbali School", ar:"المذهب الحنبلي", pct:"~10%", pop:"~180 million Muslims",
    col:"#7a1010", bg:"rgba(122,16,16,.09)", border:"rgba(122,16,16,.35)", tc:"#3a0808",
    regions:"Saudi Arabia (official state law) · Qatar · UAE (partially) · Kuwait · historically all of Najd (central Arabia) · Hanbali communities worldwide through Salafi influence",
    why:"Contained to Arabia for centuries. The alliance between Ibn Abd al-Wahhab (Hanbali) and Muhammad ibn Saud (1744) created Saudi Arabia. Saudi oil wealth from the 1970s onward funded Hanbali/Salafi institutions globally.",
    scholars:["Ibn Qudama (d.1223)","Ibn Taymiyyah (d.1328)","Ibn al-Qayyim (d.1350)","Ibn Abd al-Wahhab (d.1792)","Ibn Baz (d.1999)","Ibn Uthaymin (d.2001)"],
  },
];

export interface ModernScholar {
  name: string;
  ar: string;
  dates: string;
  desc: string;
  key: string;
}

export const MODERN_SCHOLARS: ModernScholar[] = [
  { name:"Rashid Ahmad Gangohi",    ar:"رشيد أحمد الكنكوهي",  dates:"1829–1905 CE", key:'hf',
    desc:"Co-founder Darul Uloom Deoband. Hanafi. Fatawa Rashidiyya shaped South Asian Islam." },
  { name:"Anwar Shah Kashmiri",     ar:"أنور شاه الكشميري",   dates:"1875–1933 CE", key:'hf',
    desc:"Greatest Hanafi hadith scholar of the modern era. Commentary on Bukhari (Fath al-Mulhim) — most cited 20th-century hadith work." },
  { name:"Sayyid Sabiq",            ar:"السيد سابق",           dates:"1915–2000 CE", key:'ml',
    desc:"Fiqh al-Sunnah (3 volumes) — most widely read practical fiqh manual of the 20th century. Translated into dozens of languages." },
  { name:"Wahba al-Zuhayli",        ar:"وهبة الزحيلي",         dates:"1932–2015 CE", key:'hf',
    desc:"al-Fiqh al-Islami wa Adillatuh (8 vols) — most comprehensive modern comparative fiqh encyclopedia." },
  { name:"Yusuf al-Qaradawi",       ar:"يوسف القرضاوي",        dates:"1926–2022 CE", key:'ml',
    desc:"al-Halal wa al-Haram fi al-Islam — most-read 20th-century fiqh book (20+ languages). European Council for Fatwa." },
  { name:"Abd al-Aziz ibn Baz",     ar:"ابن باز",               dates:"1909–1999 CE", key:'hb',
    desc:"Grand Mufti Saudi Arabia 1993–1999. 10,000+ fatwas. Hanbali-Salafi. Influenced Islamic scholarship in every Muslim country." },
  { name:"Muhammad ibn Uthaymin",   ar:"ابن عثيمين",            dates:"1925–2001 CE", key:'hb',
    desc:"Saudi Hanbali. 200+ published volumes. Sharh al-Mumti on Hanbali fiqh. Among the most downloaded Islamic scholars." },
  { name:"Said Ramadan al-Buti",    ar:"سعيد رمضان البوطي",    dates:"1929–2013 CE", key:'sf',
    desc:"Syrian Shafi'i. Fiqh al-Sira — most read Prophetic biography of the modern era. Killed in a Damascus mosque bombing 2013." },
  { name:"Habib Umar ibn Hafiz",    ar:"الحبيب عمر",            dates:"1963– CE",     key:'sf',
    desc:"Yemeni Shafi'i. Founder of Dar al-Mustafa in Tarim. Living embodiment of the Shafi'i-Yemeni scholarly tradition." },
];

export interface Institution {
  name: string;
  yr: string;
  desc: string;
  key: string;
}

export const INSTITUTIONS: Institution[] = [
  { name:"Darul Uloom Deoband",         yr:"est. 1867, Deoband, India",           key:'hf',
    desc:"Most influential Hanafi seminary of the 20th century. Graduates teach across Pakistan, India, Bangladesh, Afghanistan, UK, South Africa." },
  { name:"Al-Azhar University",          yr:"est. 972 CE, Cairo, Egypt",           key:'ml',
    desc:"World's oldest continuously operating university. Primary Maliki/Shafi'i faculty. Grand Imam's fatwas recognized globally." },
  { name:"Islamic University of Medina", yr:"est. 1961, Medina, Saudi Arabia",     key:'hb',
    desc:"Fully funded for international students. Hanbali-Salafi curriculum. Graduates return to every Muslim country." },
  { name:"Dar al-Mustafa",               yr:"est. 1993, Tarim, Yemen",             key:'sf',
    desc:"Shafi'i-Yemeni tradition. Founded by Habib Umar ibn Hafiz. Graduates carry the Hadhrami Shafi'i style to Southeast Asia and East Africa." },
  { name:"Al-Qarawiyyin University",     yr:"est. 859 CE, Fez, Morocco",           key:'ml',
    desc:"World's oldest degree-granting university (UNESCO). Maliki curriculum. Shaped North African and Andalusian Islam for 1,000 years." },
  { name:"Zaytuna College (USA)",        yr:"est. 2009, Berkeley, California",     key:'ml',
    desc:"First accredited Muslim liberal arts college in the USA. Maliki curriculum under Imam Zaid Shakir and Sheikh Hamza Yusuf." },
  { name:"Umm al-Qura University",       yr:"est. 1949, Mecca, Saudi Arabia",      key:'hb',
    desc:"Primary Hanbali/Salafi curriculum. Trains scholars from the Muslim world. Attached to the Grand Mosque." },
  { name:"IIIT — Virginia, USA",         yr:"est. 1981, Virginia, USA",            key:'hf',
    desc:"Cross-madhab Islamic research institute. Focused on Islamization of knowledge — integrating Islamic epistemology with modern academic disciplines." },
];

