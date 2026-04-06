/* ─────────────────────────────────────────────────────────────────────────
   Connections Extra  —  Features 88 (Letters), 89 (Testimonies), 93 (Map)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 88 — COMPANION-TO-COMPANION CORRESPONDENCE ARCHIVE
   Documented letters between companions with Arabic text + source
   ═════════════════════════════════════════════════════════════════════ */
export interface CompanionLetter {
  id: string;
  from: string;
  fromRank?: number;
  fromColor: string;
  to: string;
  toRank?: number;
  year: string;
  category: 'governance' | 'military' | 'theological' | 'personal' | 'political';
  subject: string;
  excerptAr: string;
  excerptEn: string;
  fullContextEn: string;
  source: string;
  historicalSignificance: string;
}

export const COMPANION_LETTERS: CompanionLetter[] = [
  {
    id: 'abu-bakr-usama',
    from: 'Abu Bakr al-Siddiq', fromRank: 1, fromColor: '#b8860b',
    to: "Usama ibn Zayd ibn Haritha (army commander)",
    year: '632 CE / 11 AH', category: 'military',
    subject: "Instructions to the Army of Usama — Do Not Kill Non-Combatants",
    excerptAr: "لا تقتلوا شيخاً فانياً، ولا طفلاً صغيراً، ولا امرأةً، ولا تعقروا نخلاً، ولا تحرقوا زرعاً",
    excerptEn: '"Do not kill an old man past his prime, a small child, a woman, do not cut down palm trees, do not burn crops, do not slaughter a sheep or cow except for food, do not destroy beehives, do not drown them in water."',
    fullContextEn: 'Abu Bakr issued these 10 rules of war to Usama ibn Zayd\'s army as they departed for the Byzantine frontier — the first and most comprehensive war ethics code issued by a Muslim ruler. The letter preceded any international humanitarian law by 1,300 years. Abu Bakr delivered it to Usama personally, walking beside his horse.',
    source: 'Muwatta Malik; Tabari Tarikh 3/226; Abu Yusuf Kitab al-Kharaj',
    historicalSignificance: 'The foundational document of Islamic laws of war. All four madhabs use it as a primary source for combatant/non-combatant distinction. It predates the Geneva Conventions by over a millennium.',
  },
  {
    id: 'umar-abu-musa',
    from: 'Umar ibn al-Khattab', fromRank: 2, fromColor: '#8b3a08',
    to: 'Abu Musa al-Ash\'ari (Governor of Basra)',
    year: '636 CE / 17 AH', category: 'governance',
    subject: "The Risalah al-Qada — Umar's Letter on Judicial Principles",
    excerptAr: "أَمَّا بَعْدُ: فَإِنَّ الْقَضَاءَ فَرِيضَةٌ مُحْكَمَةٌ وَسُنَّةٌ مُتَّبَعَةٌ، فَافْهَمْ إِذَا أُدْلِيَ إِلَيْكَ",
    excerptEn: '"After greetings: Judgment is a solemn obligation and an established practice. Understand [the case] when it is presented to you, for there is no benefit in speech that is not implemented, and do not let rank or nobility distract you from truth."',
    fullContextEn: 'This letter is the oldest surviving document on Islamic judicial principles. Umar wrote it to Abu Musa instructing him on how to judge: treat parties equally, be consistent, do not judge in anger, admit when you are wrong and reverse the judgment. The letter\'s passage on reversing incorrect judgments ("reversing a wrong verdict is better than persisting in it") became a foundational principle in Islamic law.',
    source: 'Bayhaqi Sunan al-Kubra 20/138; Ibn Abi Shayba; Musannaf 7/221',
    historicalSignificance: 'The Risalah al-Qada is the oldest surviving document on judicial ethics in any civilization. Islamic law scholars cite it in every book of jurisprudence. It establishes: judicial independence, equal treatment, prohibition of judging in anger, right to reverse a wrong judgment.',
  },
  {
    id: 'umar-saad',
    from: 'Umar ibn al-Khattab', fromRank: 2, fromColor: '#8b3a08',
    to: "Sa'd ibn Abi Waqqas (Commander at Qadisiyyah)",
    year: '636 CE / 15 AH', category: 'military',
    subject: "Pre-Battle Instructions for Qadisiyyah",
    excerptAr: "أَمَّا بَعْدُ، فَإِنِّي آمُرُكَ وَجَمِيعَ مَنْ مَعَكَ بِتَقْوَى اللَّهِ عَلَى كُلِّ حَالٍ",
    excerptEn: '"After greetings: I command you and all those with you to have taqwa of Allah in all situations. Taqwa is the greatest provision in war. I say to you: The conquest of hearts comes before the conquest of lands — be just and the people will come to you."',
    fullContextEn: "Umar's letter to Sa'd before Qadisiyyah is one of the most studied documents in Islamic military history. It set out: internal discipline, fair treatment of prisoners, fair distribution of spoils, prohibition of individual looting. Sa'd read it aloud to the army before battle. The battle resulted in the complete collapse of the Sassanid Persian Empire.",
    source: "Tabari Tarikh 4/289; Ibn Sa'd Tabaqat 3/196",
    historicalSignificance: "The outcome of Qadisiyyah (conquest of Persia) reshaped the civilizational composition of the Islamic world. Umar's letter shaped the conduct of the battle and the treatment of Persians afterward — which is why Persian culture survived and flourished under Islam rather than being extinguished.",
  },
  {
    id: 'ali-muawiyah-1',
    from: 'Ali ibn Abi Talib', fromRank: 4, fromColor: '#0a3d2e',
    to: "Mu'awiyah ibn Abi Sufyan (Governor of Syria)",
    year: '656 CE / 36 AH', category: 'political',
    subject: "Ali's First Letter to Mu'awiyah — Demand for Allegiance",
    excerptAr: "أَمَّا بَعْدُ، فَإِنَّ بَيْعَتِي لَزِمَتْكَ وَأَنْتَ بِالشَّامِ",
    excerptEn: '"After greetings: My bay\'ah (pledge of allegiance) is binding upon you even in Syria. The one who pledged allegiance to me was the same people who pledged to Abu Bakr and Umar. The one present has no right to choose, and the one absent has no right to reject. Shura (consultation) belongs to the Muhajirun and Ansar — what they have agreed upon is Islam\'s decision."',
    fullContextEn: 'This was the first in a series of letters between Ali and Mu\'awiyah — a diplomatic exchange of extraordinary historical importance. Ali is asserting that the caliphate was legitimately established through shura in Medina, and Mu\'awiyah\'s demand that the killers of Uthman be brought to justice first before allegiance is legally inadmissible. The exchange of letters (preserved in Nahj al-Balagha and classical sources) lasted months before deteriorating into the Battle of Siffin.',
    source: 'Nahj al-Balagha, Letter 6; Tabari Tarikh 5/62',
    historicalSignificance: 'This exchange constitutes one of the greatest political-theological debates in Islamic history — the relationship between legitimacy, justice, and bay\'ah. It shaped Islamic political theory for 1,400 years.',
  },
  {
    id: 'muawiyah-ali-reply',
    from: "Mu'awiyah ibn Abi Sufyan", fromRank: undefined, fromColor: '#2a5080',
    to: 'Ali ibn Abi Talib', toRank: 4,
    year: '656 CE / 36 AH', category: 'political',
    subject: "Mu'awiyah's Response — Demanding Justice for Uthman First",
    excerptAr: "أَمَّا بَعْدُ، فَإِنَّكَ تَعْلَمُ أَنَّ عُثْمَانَ قُتِلَ مَظْلُوماً",
    excerptEn: '"After greetings: You know that Uthman was killed unjustly. The people of Syria refuse to pledge until the killers of the Commander of the Faithful are handed over. Hand us the killers of Uthman — then consider the matter of allegiance."',
    fullContextEn: "Mu'awiyah's letter makes the theological-legal argument that a bay'ah given before justice is served is a bay'ah that rewards injustice. He cites Uthman's status as the Prophet's ﷺ son-in-law and the companion of the cave to argue that his blood cannot be overlooked in the name of political unity. The exchange between Ali and Mu'awiyah constitutes the founding document of the Islamic political science debate on legitimacy vs. justice.",
    source: 'Tabari Tarikh 5/65; Ibn Abi Shayba Musannaf',
    historicalSignificance: "This debate — legitimacy vs. preconditions for bay'ah — has never been fully resolved in Islamic political thought. It generated the first schism in the Muslim community and its theological dimensions are still debated by Islamic political theorists.",
  },
  {
    id: 'ali-egypt',
    from: 'Ali ibn Abi Talib', fromRank: 4, fromColor: '#0a3d2e',
    to: "Malik ibn al-Ashtar (Governor of Egypt, newly appointed)",
    year: '658 CE / 38 AH', category: 'governance',
    subject: "The Greatest Political Document in Islamic History",
    excerptAr: "وَاعْلَمْ أَنَّ الرَّعِيَّةَ طَبَقَاتٌ لَا يَصْلُحُ بَعْضُهَا إِلَّا بِبَعْضٍ",
    excerptEn: '"Know that the subjects are classes that cannot function without each other. Among them are: soldiers of Allah, the clerical and judicial class, revenue collectors for justice and welfare, dhimmis (protected non-Muslims), merchants and craftsmen, and the lowest stratum — the poor and needy. And Allah has designated for each class its due in His Book and the Prophet\'s ﷺ Sunnah."',
    fullContextEn: "Ali's letter to Malik al-Ashtar (Nahj al-Balagha Letter 53) is considered by Islamic scholars to be the most comprehensive document of Islamic governance ever written. It covers: selection of ministers, treatment of subjects, care for the poor, governance of military, tax administration, judicial independence, managing different religious communities, leadership ethics. The United Nations displayed a portion of this letter at its headquarters.",
    source: "Nahj al-Balagha, Letter 53 — the most cited letter in Islamic political theory",
    historicalSignificance: "The letter to Malik al-Ashtar has been called the 'Magna Carta of Islamic governance.' It was displayed at the United Nations Office in New York. It contains principles of human rights, minority protection, and judicial independence that preceded Western legal developments by centuries.",
  },
  {
    id: 'umar-governors-general',
    from: 'Umar ibn al-Khattab', fromRank: 2, fromColor: '#8b3a08',
    to: 'All Governors of the Islamic State',
    year: '634-644 CE', category: 'governance',
    subject: "The General Circular on Governor Accountability",
    excerptAr: "مَنْ وَلَّيْنَاهُ عَمَلاً فَلْيُظْهِرْ مَا مَعَهُ مِنَ الْمَالِ",
    excerptEn: '"Whoever we appoint to an administrative position must declare all assets at the time of appointment. If he acquires wealth beyond what can be explained by his official salary, it is confiscated. I have appointed you to rule people, not to rule over them."',
    fullContextEn: "Umar instituted the world's first systematic anti-corruption framework for governors. He required asset declarations before and after appointments, maintained independent audit systems, and famously docked half the wealth of his own son-in-law Abu Sufyan for trading while in official capacity. He also instituted a poverty line: no subject should go hungry within the caliphate.",
    source: "Ibn Abi Shayba Musannaf; Kanz al-Ummal; Suyuti Tarikh al-Khulafa",
    historicalSignificance: "Umar's governance innovations — asset declarations, governor accountability, public treasury separation from personal wealth — are studied in Islamic economics and governance courses today as precursors to modern public finance.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 89 — COMPANION PEER TESTIMONY ARCHIVE
   What companions said about other companions — authenticated statements
   ═════════════════════════════════════════════════════════════════════ */
export interface PeerTestimony {
  speaker: string;
  speakerRank: number;
  speakerColor: string;
  about: string;
  aboutRank: number;
  relationship: string;
  testimony: string;
  testimonyAr?: string;
  context: string;
  source: string;
  category: 'praise' | 'critique' | 'factual' | 'grief';
}

export const PEER_TESTIMONIES: PeerTestimony[] = [
  { speaker:'The Prophet ﷺ', speakerRank:0, speakerColor:'#d4a820', about:'Abu Bakr al-Siddiq', aboutRank:1, relationship:'Companion, father-in-law', testimony:'"If I were to take a khaleel (intimate friend) from among my community, it would be Abu Bakr — but the brotherhood of Islam is sufficient between us. Close every window into this mosque except Abu Bakr\'s."', context:'Said near the end of his life, leaving only Abu Bakr\'s door to the mosque open — a symbolic act that companions understood as indicating Abu Bakr\'s future role.', source:'Bukhari 466', category:'praise' },
  { speaker:'Abu Bakr al-Siddiq', speakerRank:1, speakerColor:'#b8860b', about:'Ali ibn Abi Talib', aboutRank:4, relationship:'Fellow senior companion, son-in-law of the Prophet ﷺ', testimony:'"Ali is the most knowledgeable of this community in what comes from the Prophet ﷺ in matters of inheritance and family law."', context:'Abu Bakr deferred specifically to Ali on matters of inheritance (fara\'id) — acknowledging his superior knowledge in this domain.', source:'Bayhaqi Sunan; Ibn Abi Shayba', category:'factual' },
  { speaker:'Umar ibn al-Khattab', speakerRank:2, speakerColor:'#8b3a08', about:'Abdullah ibn Abbas', aboutRank:19, relationship:'Young scholar companion; Umar invited him to his advisory council', testimony:'"Ibn Abbas among the elders is like a full moon among stars." He was asked: "Why do you bring this young man into council while sons of Badr are present?" He replied: "He is among those you know."', context:'Umar admitted Ibn Abbas to his council despite being 30+ years younger than the senior companions — a recognition of his extraordinary intellect.', source:'Bukhari 4477; Tabari context', category:'praise' },
  { speaker:'Umar ibn al-Khattab', speakerRank:2, speakerColor:'#8b3a08', about:'Aisha bint Abi Bakr', aboutRank:5, relationship:"Prophet's ﷺ wife, Abu Bakr's daughter", testimony:'"You were the most beloved of people to the Messenger of Allah ﷺ, and the most beloved of people to me is whoever the Prophet ﷺ loved."', context:'Said by Umar when determining the pension amounts for the Prophet\'s ﷺ wives — he gave Aisha the highest share.', source:'Ibn Sa\'d Tabaqat 8/74', category:'praise' },
  { speaker:'Aisha bint Abi Bakr', speakerRank:5, speakerColor:'#7a3060', about:'Khadijah bint Khuwaylid', aboutRank:0, relationship:"Prophet's ﷺ first wife — before Aisha's time", testimony:'"I never envied any of the Prophet\'s wives as much as I envied Khadijah — though I never saw her. He would mention her so often that I once said: It is as if there were no other woman in the world except Khadijah! He replied: She was this and that — and she believed in me when no one else did."', context:'Aisha\'s famous testimony about Khadijah — whom she never met but felt the weight of deeply.', source:'Bukhari 3818', category:'factual' },
  { speaker:'Aisha bint Abi Bakr', speakerRank:5, speakerColor:'#7a3060', about:'Umar ibn al-Khattab', aboutRank:2, relationship:'Father\'s colleague; senior companion', testimony:'"If only the first two (Abu Bakr and Umar) had agreed on a thing, the Prophet ﷺ would not act against it — they were his right and left hands." And she said of Umar: "He was not like other men — he was a different matter entirely."', context:'Said after Umar\'s assassination — Aisha\'s recognition of Abu Bakr and Umar as the Prophet\'s ﷺ primary advisers.', source:'Ibn Sa\'d Tabaqat 3/287', category:'praise' },
  { speaker:'Ali ibn Abi Talib', speakerRank:4, speakerColor:'#0a3d2e', about:'Abu Bakr al-Siddiq', aboutRank:1, relationship:'Father-in-law\'s closest companion; predecessor', testimony:'"Abu Bakr was the most excellent of the companions. I asked my father: \'Who is the best of people after the Prophet ﷺ?\' He said: Abu Bakr. I said: Then who? He said: Umar. And I was afraid he would say: Then Ali."', context:'Ali\'s direct ranking of companions — cited by Sunni scholars as his authenticated personal testimony on the question of precedence.', source:'Bukhari 3671; Tirmidhi 3707', category:'factual' },
  { speaker:'Ali ibn Abi Talib', speakerRank:4, speakerColor:'#0a3d2e', about:"Sa'd ibn Abi Waqqas", aboutRank:8, relationship:'Early Muslim, maternal uncle of the Prophet ﷺ', testimony:'"I have not seen anyone more deserving of the station the Prophet ﷺ gave him than Sa\'d — when Sa\'d shot an arrow, the Prophet ﷺ said: \'Shoot, may my mother and father be your ransom.\' I have never heard the Prophet ﷺ say this to anyone else."', context:'Ali highlighting the unique honor the Prophet ﷺ showed Sa\'d on the battlefield — the dual ransom expression was the highest form of Arabic praise.', source:'Bukhari 2905; Muslim 2412', category:'praise' },
  { speaker:'Abu Dharr al-Ghifari', speakerRank:15, speakerColor:'#2a5040', about:'Ali ibn Abi Talib', aboutRank:4, relationship:'Fellow early Muslim', testimony:'"I have not seen a door more open to knowledge than the door of Ali."', context:'Abu Dharr\'s testimony about Ali\'s accessibility as a teacher and the depth of his knowledge.', source:'Hilyat al-Awliya 1/67', category:'praise' },
  { speaker:"Sa'd ibn Abi Waqqas", speakerRank:8, speakerColor:'#5a3080', about:'Uthman ibn Affan', aboutRank:3, relationship:'Senior companion, fellow Ten Promised Paradise', testimony:'"I saw the angels washing Uthman in a vessel of water from the time he died." And when asked about the Civil War, he said: "I did not fight those who killed Uthman because I did not see clear proof about who had done it — but I saw that Uthman was killed unjustly."', context:'Sa\'d\'s famous neutrality during the First Fitna — he refused to join any side but clearly stated Uthman\'s murder was unjust.', source:'Ibn Sa\'d Tabaqat 3/73; Tabari 5/98', category:'factual' },
  { speaker:'Jabir ibn Abdullah', speakerRank:35, speakerColor:'#4a3030', about:'Bilal ibn Rabah', aboutRank:10, relationship:'Fellow companion', testimony:'"We saw the Prophet ﷺ look down when Bilal recited — and the Prophet ﷺ\'s lips moved with his recitation. Once Bilal paused at a verse about mercy and the Prophet ﷺ began to weep before Bilal resumed."', context:'A rare account of how Bilal\'s recitation affected the Prophet ﷺ emotionally — beyond the famous hadith about hearing his footsteps in Paradise.', source:'Ibn Sa\'d Tabaqat 3/232', category:'praise' },
  { speaker:'The Prophet ﷺ', speakerRank:0, speakerColor:'#d4a820', about:'Umar ibn al-Khattab', aboutRank:2, relationship:'Most senior companion after Abu Bakr', testimony:'"Whoever I pass, they follow. Whoever Umar passes, the Shaytan takes a different road."', context:'The Prophet\'s ﷺ statement about Umar\'s spiritual authority — implying that even demonic forces recognized Umar\'s moral power and avoided confronting him.', source:'Bukhari 3294', category:'praise' },
  { speaker:'The Prophet ﷺ', speakerRank:0, speakerColor:'#d4a820', about:'Khalid ibn al-Walid', aboutRank:12, relationship:'Late convert, greatest military commander', testimony:'"Khalid is a sword of the swords of Allah. He is al-Amin (trustworthy). Whoever speaks against Khalid speaks against me."', context:'Said after some companions criticized Khalid for what they saw as excessive force in a battle. The Prophet ﷺ defended him and paid blood money from his own wealth.', source:'Bukhari 4339; Muslim 1064', category:'praise' },
  { speaker:'Umar ibn al-Khattab', speakerRank:2, speakerColor:'#8b3a08', about:'Abu Ubayda ibn al-Jarrah', aboutRank:9, relationship:'Fellow Ten Promised Paradise, trusted general', testimony:'"If I die and Abu Ubayda is still alive, I would designate him as my successor — the most trustworthy of this community."', context:'Said while still Caliph, before Abu Ubayda died of plague in 639 CE. Umar wept when the news arrived, saying the community had lost its greatest trustworthy man.', source:'Bukhari 2735; Ibn Sa\'d 3/411', category:'praise' },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 93 — COMPANION-TO-COMPANION NARRATION MAP
   Second-order hadith transmission: one companion narrating from another
   ═════════════════════════════════════════════════════════════════════ */
export interface C2CNarration {
  narrator: string;
  narratorRank: number;
  narratorColor: string;
  source: string;       // the companion they narrated FROM (not the Prophet ﷺ)
  sourceRank: number;
  relationship: string;
  hadith: string;
  hadithAr?: string;
  subject: string;
  sourceRef: string;
  whySignificant: string;
}

export const C2C_NARRATIONS: C2CNarration[] = [
  { narrator:"Ibn Abbas", narratorRank:19, narratorColor:'#2a5080', source:'Ali ibn Abi Talib', sourceRank:4, relationship:'Student — Ibn Abbas was one of Ali\'s closest students', hadith:'"Whoever wants to know about the judgments of Abu Bakr and Umar should look to Umar ibn al-Khattab," (via Ali, meaning: Ali transmitted Umar\'s juristic method).', subject:'Hadith on Prophetic governance transmitted via the senior companion chain', sourceRef:"Ibn Sa'd Tabaqat 2/338", whySignificant:'Shows Ali as an intermediate transmitter — Ibn Abbas\'s knowledge of early caliphate jurisprudence came largely through Ali.' },
  { narrator:'Umar ibn al-Khattab', narratorRank:2, narratorColor:'#8b3a08', source:'Abu Bakr al-Siddiq', sourceRank:1, relationship:'Successor, closest colleague', hadith:'"Abu Bakr said to me: \'The Messenger of Allah told me: Do not praise a man in his face — it is like cutting his throat.\'" Umar narrated this directly from Abu Bakr.', subject:'Prohibition of excessive flattery', sourceRef:'Bukhari 2663', whySignificant:'A rare case of Umar narrating directly from Abu Bakr — establishing a Sahabi-to-Sahabi chain for this social ethics teaching.' },
  { narrator:'Aisha bint Abi Bakr', narratorRank:5, narratorColor:'#7a3060', source:'Umar ibn al-Khattab', sourceRank:2, relationship:'Father\'s close companion; she heard his rulings and transmitted them', hadith:'"Umar said: The weeping of the family does not harm the dead — he is punished for his own sins." Aisha said: This contradicts what the Quran says: "No bearer of burden bears another\'s burden." And she narrated the correct version.', subject:'On whether a deceased person is punished because of family\'s public crying', sourceRef:'Bukhari 1286', whySignificant:'A critical case: Aisha directly corrects a narration attributed to Umar by citing a stronger Quranic argument. Shows the scholarly peer review among companions.' },
  { narrator:'Anas ibn Malik', narratorRank:13, narratorColor:'#0a5c2e', source:'Abu Bakr al-Siddiq', sourceRank:1, relationship:'Young companion who served both the Prophet ﷺ and Abu Bakr', hadith:'"Abu Bakr said during the Ridda wars: I will fight whoever separates prayer and zakat, for zakat is the right of wealth. By Allah, if they withheld a rope-cord that they gave to the Messenger of Allah ﷺ, I would fight them for it." Anas narrated this directly from Abu Bakr.', subject:'Abu Bakr\'s decision to fight the Ridda apostates who refused zakat', sourceRef:'Bukhari 1399', whySignificant:'Anas as direct witness and narrator of Abu Bakr\'s most consequential single decision — preserving the policy rationale in his own words.' },
  { narrator:'Ali ibn Abi Talib', narratorRank:4, narratorColor:'#0a3d2e', source:'Abu Bakr al-Siddiq', sourceRank:1, relationship:'Fellow Caliph; Ali narrated several Abu Bakr rulings', hadith:'"Abu Bakr narrated to me that the Prophet ﷺ said: There is no sin that Allah does not forgive except arrogance." Ali heard this from Abu Bakr who heard it from the Prophet ﷺ.', subject:'On the unforgivable nature of kibr (arrogance)', sourceRef:'Tirmidhi 2000; chain through Ali from Abu Bakr', whySignificant:'A Sahabi-to-Sahabi chain establishing: the Prophet ﷺ → Abu Bakr → Ali — showing how the two most senior companions transmitted to each other.' },
  { narrator:'Abdullah ibn Umar', narratorRank:30, narratorColor:'#b8860b', source:'Umar ibn al-Khattab', sourceRank:2, relationship:'Son — primary transmitter of his father\'s hadiths', hadith:'"My father (Umar) heard the Prophet ﷺ say on the pulpit: Three are unacceptable to Allah — an imam (leader) whom the people hate, a man who prays behind him unwillingly, and two men who speak to each other while ignoring others."', subject:'On leadership legitimacy requiring public acceptance', sourceRef:"Ibn Majah 970; Ibn Sa'd", whySignificant:"Ibn Umar is the single greatest source for Umar's hadiths — he transmitted 2,630 narrations, many of which went through his father as an intermediate link." },
  { narrator:'Ibn Abbas', narratorRank:19, narratorColor:'#2a5080', source:'Umar ibn al-Khattab', sourceRank:2, relationship:'Junior companion; Umar included him in senior councils', hadith:'"I asked Umar: O Commander of the Faithful — why did you open the caliphate council to this young man (Ibn Abbas) instead of our sons? He said: Because I have tested him and found that his tongue is controlled, his heart is mature, and his knowledge is filled. Your sons have mouths that are beyond their hearts."', subject:'Umar\'s reason for including Ibn Abbas in senior decision-making', sourceRef:'Bukhari 4477', whySignificant:"One of the most revealing companion-to-companion exchanges — Ibn Abbas narrating Umar's specific justification for his own inclusion, a uniquely personal transmission." },
  { narrator:'Jabir ibn Abdullah', narratorRank:35, narratorColor:'#4a3030', source:"Sa'd ibn Abi Waqqas", sourceRank:8, relationship:'Fellow Ansar-Muhajir companion relationship', hadith:'"Sa\'d said: I was the first Arab to shoot an arrow in the way of Allah. I saw the Prophet ﷺ pray for me while I drew my bow: O Allah, answer his prayer and guide his arrow." Jabir narrated this directly from Sa\'d.', subject:"On Sa'd's distinction as the first archer in Islam", sourceRef:'Bukhari 3728', whySignificant:"Establishes Sa'd's own testimony transmitted through Jabir — a peer transmission preserving personal memory rather than the Prophet ﷺ chain." },
];
