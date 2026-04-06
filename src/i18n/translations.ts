import type { Language } from '../types';

export type TKey =
  | 'nav.home'
  | 'nav.companions'
  | 'nav.connections'
  | 'nav.insights'
  | 'nav.imams'
  | 'nav.archive'
  | 'ui.compare'
  | 'ui.language.ur'
  | 'ui.language.en'
  | 'ui.nightMode.exit'
  | 'ui.nightMode.enter'
  | 'imams.title'
  | 'imams.subtitle'
  | 'imams.tabs.fourImams'
  | 'imams.tabs.ahadith'
  | 'imams.tabs.transmission'
  | 'imams.tabs.isnad'
  | 'imams.tabs.qiraat'
  | 'imams.tabs.legacy'
  | 'imams.tabs.household'
  | 'imams.tabs.sahabiyyat'
  | 'imams.tabs.converts'
  | 'imams.tabs.laqab'
  | 'imams.tabs.guide'
  | 'ahadith.libraryTitle'
  | 'ahadith.librarySub'
  | 'ahadith.mode.imam'
  | 'ahadith.mode.love'
  | 'ahadith.searchPlaceholder'
  | 'ahadith.loading'
  | 'ahadith.noMatches'
  | 'ahadith.tags.all'
  | 'ahadith.tags.love'
  | 'ahadith.tags.respect'
  | 'ahadith.tags.brotherhood'
  | 'ahadith.tags.parents'
  | 'ahadith.tags.prophet'
  | 'ahadith.tags.kids'
  | 'comp.modal.tabs.profile'
  | 'comp.modal.tabs.quran'
  | 'comp.modal.tabs.tafsir'
  | 'comp.modal.tabs.family'
  | 'comp.modal.tabs.miracles'
  | 'comp.modal.tabs.poetry'
  | 'comp.modal.facts.born'
  | 'comp.modal.facts.death'
  | 'comp.modal.facts.origin'
  | 'comp.modal.facts.tribe'
  | 'comp.modal.facts.hadiths'
  | 'comp.modal.facts.battles'
  | 'comp.modal.occupation'
  | 'comp.modal.beforeIslam'
  | 'comp.modal.afterIslam'
  | 'comp.modal.significance'
  | 'comp.modal.relationship'
  | 'comp.modal.contributions'
  | 'comp.modal.character'
  | 'comp.modal.keyEvent'
  | 'comp.modal.propheticTestimony'
  | 'comp.modal.theirWords'
  | 'comp.modal.finalMoments'
  | 'comp.modal.legacy'
  | 'comp.modal.appearance'
  | 'comp.modal.dreams'
  | 'comp.modal.miracles'
  | 'comp.modal.burial'
  | 'comp.modal.battles'
  | 'comp.modal.duaFor'
  | 'comp.modal.aboutName'
  | 'comp.modal.quran.triggerIntro'
  | 'comp.modal.quran.noTrigger';

const EN: Record<TKey, string> = {
  'nav.home': 'Home',
  'nav.companions': 'Companions',
  'nav.connections': 'Connections',
  'nav.insights': 'Insights',
  'nav.imams': 'Imam Chain',
  'nav.archive': 'Archive',
  'ui.compare': 'Compare',
  'ui.language.ur': 'اردو',
  'ui.language.en': 'English',
  'ui.nightMode.exit': '☀ Day Mode',
  'ui.nightMode.enter': '🌙 Tahajjud',

  'imams.title': 'The Transmission Chain',
  'imams.subtitle': 'How prophetic knowledge passed from the Messenger ﷺ through companions, successors, and classical scholars — intact, to the present day.',
  'imams.tabs.fourImams': 'Four Imams',
  'imams.tabs.ahadith': 'Ahadith',
  'imams.tabs.transmission': 'Transmission',
  'imams.tabs.isnad': 'Isnad Chains',
  'imams.tabs.qiraat': "Qira'at",
  'imams.tabs.legacy': 'Legacy',
  'imams.tabs.household': 'Household',
  'imams.tabs.sahabiyyat': 'Sahabiyyat',
  'imams.tabs.converts': 'Converts',
  'imams.tabs.laqab': 'Laqab',
  'imams.tabs.guide': 'Guide',

  'ahadith.libraryTitle': 'Ahadith Library',
  'ahadith.librarySub': '4 curated sets · 20 each · Arabic + English + source · fast search',
  'ahadith.mode.imam': 'By Imam (4 × 20)',
  'ahadith.mode.love': 'Love & Respect (150)',
  'ahadith.searchPlaceholder': 'Search Arabic, English, Urdu, or source…',
  'ahadith.loading': 'Loading curated ahadith…',
  'ahadith.noMatches': 'No matches. Try a different search.',
  'ahadith.tags.all': 'All themes',
  'ahadith.tags.love': 'Love',
  'ahadith.tags.respect': 'Respect',
  'ahadith.tags.brotherhood': 'Brotherhood',
  'ahadith.tags.parents': 'Parents',
  'ahadith.tags.prophet': 'Prophet ﷺ',
  'ahadith.tags.kids': 'Kids',

  'comp.modal.tabs.profile': 'Profile',
  'comp.modal.tabs.quran': 'Quran',
  'comp.modal.tabs.tafsir': 'Tafsir',
  'comp.modal.tabs.family': 'Family',
  'comp.modal.tabs.miracles': 'Miracles',
  'comp.modal.tabs.poetry': 'Poetry',
  'comp.modal.facts.born': 'Born',
  'comp.modal.facts.death': 'Death',
  'comp.modal.facts.origin': 'Origin',
  'comp.modal.facts.tribe': 'Tribe',
  'comp.modal.facts.hadiths': 'Hadiths',
  'comp.modal.facts.battles': 'Battles',
  'comp.modal.occupation': 'Occupation',
  'comp.modal.beforeIslam': 'Before Islam',
  'comp.modal.afterIslam': 'After Islam',
  'comp.modal.significance': 'Significance',
  'comp.modal.relationship': 'Relationship to the Prophet ﷺ',
  'comp.modal.contributions': 'Contributions',
  'comp.modal.character': 'Character',
  'comp.modal.keyEvent': 'Key Event',
  'comp.modal.propheticTestimony': 'Prophetic Testimony',
  'comp.modal.theirWords': 'Their Words',
  'comp.modal.finalMoments': 'Final Moments',
  'comp.modal.legacy': 'Legacy',
  'comp.modal.appearance': 'Appearance',
  'comp.modal.dreams': 'Dreams & Visions',
  'comp.modal.miracles': 'Miracles & Distinctions',
  'comp.modal.burial': 'Burial',
  'comp.modal.battles': 'Battles',
  'comp.modal.duaFor': "Prophet's ﷺ Du'a for",
  'comp.modal.aboutName': 'What the Prophet ﷺ Said About',
  'comp.modal.quran.triggerIntro': 'These Quranic ayahs were revealed because of or directly relating to',
  'comp.modal.quran.noTrigger': 'No specific Quranic revelation linked to',
};

const UR: Record<TKey, string> = {
  'nav.home': 'ہوم',
  'nav.companions': 'صحابہ',
  'nav.connections': 'روابط',
  'nav.insights': 'بصیرت',
  'nav.imams': 'سلسلۂ ائمہ',
  'nav.archive': 'آرکائیو',
  'ui.compare': 'موازنہ',
  'ui.language.ur': 'اردو',
  'ui.language.en': 'English',
  'ui.nightMode.exit': '☀ دن موڈ',
  'ui.nightMode.enter': '🌙 تہجد',

  'imams.title': 'سلسلۂ روایت',
  'imams.subtitle': 'علمِ نبوی ﷺ کس طرح صحابہ، تابعین اور ائمہ کے ذریعے — محفوظ حالت میں — آج تک پہنچا۔',
  'imams.tabs.fourImams': 'چار ائمہ',
  'imams.tabs.ahadith': 'احادیث',
  'imams.tabs.transmission': 'ترسیل',
  'imams.tabs.isnad': 'اسناد',
  'imams.tabs.qiraat': 'قراءات',
  'imams.tabs.legacy': 'وراثت',
  'imams.tabs.household': 'اہلِ بیت',
  'imams.tabs.sahabiyyat': 'صحابیات',
  'imams.tabs.converts': 'قبولِ اسلام',
  'imams.tabs.laqab': 'القاب',
  'imams.tabs.guide': 'رہنمائی',

  'ahadith.libraryTitle': 'کتبِ احادیث',
  'ahadith.librarySub': '۴ مجموعے · ہر ایک میں ۲۰ · عربی + انگریزی + ماخذ · فوری تلاش',
  'ahadith.mode.imam': 'ائمہ کے مطابق (۴×۲۰)',
  'ahadith.mode.love': 'محبت و احترام (۱۵۰)',
  'ahadith.searchPlaceholder': 'عربی، انگریزی، اردو یا ماخذ میں تلاش…',
  'ahadith.loading': 'احادیث لوڈ ہو رہی ہیں…',
  'ahadith.noMatches': 'کوئی نتیجہ نہیں ملا۔ دوبارہ تلاش کریں۔',
  'ahadith.tags.all': 'تمام موضوعات',
  'ahadith.tags.love': 'محبت',
  'ahadith.tags.respect': 'احترام',
  'ahadith.tags.brotherhood': 'بھائی چارہ',
  'ahadith.tags.parents': 'والدین',
  'ahadith.tags.prophet': 'نبی ﷺ',
  'ahadith.tags.kids': 'بچوں کے لیے',

  'comp.modal.tabs.profile': 'پروفائل',
  'comp.modal.tabs.quran': 'قرآن',
  'comp.modal.tabs.tafsir': 'تفسیر',
  'comp.modal.tabs.family': 'خاندان',
  'comp.modal.tabs.miracles': 'کرامات',
  'comp.modal.tabs.poetry': 'شاعری',
  'comp.modal.facts.born': 'پیدائش',
  'comp.modal.facts.death': 'وفات',
  'comp.modal.facts.origin': 'وطن',
  'comp.modal.facts.tribe': 'قبیلہ',
  'comp.modal.facts.hadiths': 'احادیث',
  'comp.modal.facts.battles': 'غزوات',
  'comp.modal.occupation': 'پیشہ',
  'comp.modal.beforeIslam': 'قبل از اسلام',
  'comp.modal.afterIslam': 'بعد از اسلام',
  'comp.modal.significance': 'امتیاز',
  'comp.modal.relationship': 'نبی ﷺ سے تعلق',
  'comp.modal.contributions': 'خدمات',
  'comp.modal.character': 'اخلاق و اوصاف',
  'comp.modal.keyEvent': 'اہم واقعہ',
  'comp.modal.propheticTestimony': 'نبوی گواہی',
  'comp.modal.theirWords': 'ان کے کلمات',
  'comp.modal.finalMoments': 'آخری لمحات',
  'comp.modal.legacy': 'وراثت',
  'comp.modal.appearance': 'حلیہ',
  'comp.modal.dreams': 'خواب و رؤیا',
  'comp.modal.miracles': 'کرامات و امتیازات',
  'comp.modal.burial': 'مدفن',
  'comp.modal.battles': 'غزوات',
  'comp.modal.duaFor': 'نبی ﷺ کی دعا برائے',
  'comp.modal.aboutName': 'نبی ﷺ نے فرمایا (بابت)',
  'comp.modal.quran.triggerIntro': 'یہ قرآنی آیات اس صحابی کے بارے میں/ان کے سبب نازل ہوئیں یا براہِ راست ان سے متعلق ہیں:',
  'comp.modal.quran.noTrigger': 'ہمارے موجودہ ڈیٹا میں اس صحابی کے بارے میں کوئی مخصوص آیت درج نہیں۔',
};

export function t(lang: Language, key: TKey): string {
  const dict = lang === 'ur' ? UR : EN;
  return dict[key] ?? (EN[key] ?? key);
}

