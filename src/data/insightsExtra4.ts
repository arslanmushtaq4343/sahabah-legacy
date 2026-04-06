/* ─────────────────────────────────────────────────────────────────────────
   Insights Page — Enrichment Data Set 4  (Features 77, 79, 82, 85)
   ──────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 77 — "WHICH COMPANION ARE YOU?" PERSONALITY QUIZ
   12 questions from actual companion behaviors → archetype match
   ═════════════════════════════════════════════════════════════════════ */

export interface QuizArchetype {
  id: string;
  name: string;
  nameAr: string;
  rank: number;
  color: string;
  title: string;
  traitSummary: string;
  traitDetails: string[];
  supportingHadith: string;
  source: string;
  whyMatch: string;
}

export const QUIZ_ARCHETYPES: QuizArchetype[] = [
  {
    id: 'abu-bakr', name: 'Abu Bakr al-Siddiq', nameAr: 'أبو بكر الصديق', rank: 1, color: '#b8860b',
    title: 'The Unwavering Believer',
    traitSummary: 'Absolute trust, immediate certainty, quiet courage. You believe before proof arrives — and your loyalty is total once given.',
    traitDetails: [
      'You make decisions based on deep intuition and trust, not just evidence',
      'When others panic, you provide calm, grounded reassurance',
      'Your generosity is wholehearted — you give without calculating',
      'You rarely argue, but when you commit, nothing moves you',
    ],
    supportingHadith: '"Abu Bakr did not excel you by fasting much or praying much, but by something that settled in his heart." — The Prophet ﷺ',
    source: 'Tirmidhi',
    whyMatch: 'Abu Bakr\'s defining quality was not any single act of worship — it was the quality of his heart. He believed in the Night Journey when no one else did. He gave everything without being asked. His faith was structural, not performative.',
  },
  {
    id: 'umar', name: 'Umar ibn al-Khattab', nameAr: 'عمر بن الخطاب', rank: 2, color: '#8b3a08',
    title: 'The Just Enforcer',
    traitSummary: 'You see injustice and cannot stay silent. You act decisively, even if it costs you socially. You hold yourself to the highest standard.',
    traitDetails: [
      'You have strong convictions and will voice them even when unpopular',
      'You are deeply fair — you would correct yourself publicly if wrong',
      'You respond to situations with action, not endless deliberation',
      'Your directness can feel harsh, but comes from genuine care',
    ],
    supportingHadith: '"Whenever Umar took a road, the Shaytan would take a different road." — The Prophet ﷺ',
    source: 'Bukhari 3294',
    whyMatch: 'Umar embodied the principle that truth must be spoken, even to power. He wept at the Quran, but was immovable against injustice. His famous words: "Correct Umar if he errs" define his character — accountability without ego.',
  },
  {
    id: 'ali', name: 'Ali ibn Abi Talib', nameAr: 'علي بن أبي طالب', rank: 4, color: '#0a3d2e',
    title: 'The Profound Thinker',
    traitSummary: 'Knowledge is your refuge. You think deeply before speaking. You hold complexity well and resist oversimplification.',
    traitDetails: [
      'You prefer depth over breadth in relationships and knowledge',
      'You absorb ideas from everywhere and synthesize them uniquely',
      'You are a natural teacher — you explain what others cannot',
      'You can be misunderstood because your thinking is ahead of the room',
    ],
    supportingHadith: '"I am the city of knowledge and Ali is its gate." — The Prophet ﷺ',
    source: 'Tirmidhi 3723',
    whyMatch: 'Ali spent his life seeking and transmitting knowledge. His preserved speeches (Nahj al-Balagha) reveal a mind of extraordinary philosophical depth. He questioned, synthesized, and expressed truths others could not reach.',
  },
  {
    id: 'aisha', name: 'Aisha bint Abi Bakr', nameAr: 'عائشة بنت أبي بكر', rank: 5, color: '#7a3060',
    title: 'The Perceptive Scholar',
    traitSummary: 'Sharp, observant, intellectually driven. You notice what others miss. You push back on errors and demand precision.',
    traitDetails: [
      'You have excellent memory and attention to detail',
      'You are not afraid to correct misunderstandings, even publicly',
      'Your insight often comes faster than others can articulate the question',
      'You value accuracy over social comfort in knowledge',
    ],
    supportingHadith: '"Take half your religion from Humaira (Aisha)." — The Prophet ﷺ',
    source: 'Hakim, al-Mustadrak',
    whyMatch: 'Aisha corrected other companions\' narrations 67 times. She remembered details of the Prophet\'s ﷺ private life that no one else could. She was consulted by companions after his death as the supreme authority on the Sunnah. Her precision was legendary.',
  },
  {
    id: 'bilal', name: 'Bilal ibn Rabah', nameAr: 'بلال بن رباح', rank: 10, color: '#4a4a8a',
    title: 'The Resilient Overcomer',
    traitSummary: 'You have been through things that would break others — and they didn\'t. Your faith became a fortress built from hardship, not comfort.',
    traitDetails: [
      'You endure hardship without losing your core identity',
      'You find meaning in suffering that transforms it into strength',
      'You are intensely loyal to whoever lifted you when you were low',
      'Others find your story inspiring without you trying to inspire them',
    ],
    supportingHadith: '"I heard the sound of your footsteps in Paradise before my own." — The Prophet ﷺ to Bilal',
    source: 'Bukhari 1149',
    whyMatch: "Bilal endured being dragged across hot sand with a boulder on his chest. His response was one word: 'Ahad, Ahad' (One, One). His faith didn't collapse under maximum pressure — it became purer.",
  },
  {
    id: 'salman', name: 'Salman al-Farisi', nameAr: 'سلمان الفارسي', rank: 29, color: '#509070',
    title: 'The Seeker',
    traitSummary: 'You have traveled far — spiritually, intellectually, sometimes literally — searching for what is true. You won\'t settle for inherited certainty.',
    traitDetails: [
      'You question before you commit — and once you commit, you are immovable',
      'You draw wisdom from unexpected sources and cultures',
      'You endure long periods of searching without discouragement',
      'You are beloved across very different groups because of your universal outlook',
    ],
    supportingHadith: '"Salman is of us — of the Ahl al-Bayt." — The Prophet ﷺ',
    source: 'Tabarani; Hilyat al-Awliya',
    whyMatch: 'Salman left Persia, travelled through centuries of searching, served multiple masters — all to find the final prophet. His story is the definitive Islamic narrative of the sincere seeker. The Prophet ﷺ claimed him as family.',
  },
  {
    id: 'abu-dharr', name: 'Abu Dharr al-Ghifari', nameAr: 'أبو ذر الغفاري', rank: 15, color: '#2a5040',
    title: 'The Principled Dissenter',
    traitSummary: 'You speak truth to power without calculating consequences. You live with radical simplicity and find wealth-hoarding morally intolerable.',
    traitDetails: [
      'You cannot perform agreement when you genuinely disagree',
      'You are deeply ascetic — comfort makes you suspicious, not relieved',
      'You will endure exile rather than compromise your principles',
      'Others call you extreme; you call yourself honest',
    ],
    supportingHadith: '"There is no one under the sky, or on the earth, more truthful in speech than Abu Dharr." — The Prophet ﷺ',
    source: 'Tirmidhi 3801',
    whyMatch: 'Abu Dharr publicly denounced wealth accumulation even when advised by other companions to be quiet. He was exiled to the desert at the end of his life for refusing to be silent. He died alone, with nothing — and considered it victory.',
  },
  {
    id: 'khalid', name: 'Khalid ibn al-Walid', nameAr: 'خالد بن الوليد', rank: 12, color: '#8b1a38',
    title: 'The Strategic Executor',
    traitSummary: 'You see patterns others miss, move faster than your opponents expect, and transform weakness into advantage by repositioning.',
    traitDetails: [
      'You excel in high-pressure, fast-moving situations',
      'You assess situations quickly and act decisively',
      'You carry past failures as lessons, not shame',
      'Your loyalty, once given, is militarily fierce',
    ],
    supportingHadith: '"Khalid is a sword from the swords of Allah." — The Prophet ﷺ',
    source: 'Bukhari 3757',
    whyMatch: 'Khalid won over 100 battles without a single defeat. He converted late, was the general who nearly defeated the Muslims at Uhud — then became their greatest commander. He once wept: "I have fought in so many battles seeking martyrdom — but I will die in my bed like an old camel."',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    text: string;
    archetypes: string[];  // companion IDs this maps to
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'A close friend tells you something that contradicts what you\'ve always believed. You:',
    context: 'Based on how Abu Bakr believed the Night Journey instantly vs. others who demanded proof.',
    options: [
      { text: 'Believe them without needing evidence — their character is proof enough', archetypes: ['abu-bakr'] },
      { text: 'Ask sharp, clarifying questions until it makes complete logical sense', archetypes: ['aisha', 'ali'] },
      { text: 'Suspend judgment, go away and think about it deeply for a long time', archetypes: ['salman', 'ali'] },
      { text: 'Push back firmly — trust is earned, not assumed', archetypes: ['umar', 'abu-dharr'] },
    ],
  },
  {
    id: 2,
    question: 'You witness an injustice happening publicly. You:',
    context: 'Based on Umar\'s immediate confrontation of wrongdoers vs. Uthman\'s softer approach.',
    options: [
      { text: 'Intervene immediately and loudly — silence is complicity', archetypes: ['umar', 'abu-dharr'] },
      { text: 'Address it firmly but privately, to avoid humiliating anyone', archetypes: ['uthman', 'abu-bakr'] },
      { text: 'Find the smartest way to correct it without creating more conflict', archetypes: ['ali', 'aisha'] },
      { text: 'Endure it if you can\'t fix it — some battles choose you, not the other way', archetypes: ['bilal', 'salman'] },
    ],
  },
  {
    id: 3,
    question: 'You have more wealth than you need. What do you do?',
    context: 'Based on Abu Bakr giving 100%, Umar giving 50%, Uthman\'s 950 camels, vs. Abu Dharr\'s radical anti-wealth stance.',
    options: [
      { text: 'Give it all — holding onto excess is a kind of spiritual failure', archetypes: ['abu-bakr', 'abu-dharr'] },
      { text: 'Give half — your family also has rights over your wealth', archetypes: ['umar'] },
      { text: 'Use it strategically — money is a tool, not an enemy', archetypes: ['uthman', 'khalid'] },
      { text: 'Keep only what you strictly need, give the rest to people who need it', archetypes: ['bilal', 'salman'] },
    ],
  },
  {
    id: 4,
    question: 'Someone in your community spreads a false rumor about you. You:',
    context: 'Based on Aisha\'s exoneration story and Ali\'s response to the accusations during the Fitna.',
    options: [
      { text: 'Wait — the truth will surface on its own, you don\'t need to defend yourself', archetypes: ['aisha', 'abu-bakr'] },
      { text: 'Address it directly and publicly with clear evidence', archetypes: ['umar', 'aisha'] },
      { text: 'It wounds you, but you accept it as a test and endure', archetypes: ['bilal', 'salman'] },
      { text: 'Spend your energy understanding why it happened — anger wastes time', archetypes: ['ali', 'abu-dharr'] },
    ],
  },
  {
    id: 5,
    question: 'You are given a leadership position you didn\'t seek. You:',
    context: 'Based on Abu Bakr\'s reluctance and weeping vs. Umar\'s disciplined embrace of responsibility.',
    options: [
      { text: 'Accept with humility, deeply aware it\'s a burden more than an honor', archetypes: ['abu-bakr', 'ali'] },
      { text: 'Embrace it fully — if the work needs doing, someone has to do it', archetypes: ['umar', 'khalid'] },
      { text: 'Seek counsel from those wiser before accepting', archetypes: ['uthman', 'salman'] },
      { text: 'Decline or minimize — power corrupts and I prefer to serve', archetypes: ['abu-dharr', 'bilal'] },
    ],
  },
  {
    id: 6,
    question: 'Your spiritual practice is best described as:',
    context: 'Based on Ali\'s 1000 rak\'ahs/month, Aisha\'s precise observance, Bilal\'s post-wudu prayer.',
    options: [
      { text: 'Deep, private, often nocturnal — my best moments are alone with Allah', archetypes: ['ali', 'abu-bakr'] },
      { text: 'Precise and consistent — I follow the Sunnah in every detail', archetypes: ['aisha', 'umar'] },
      { text: 'Intense in waves — when it hits, it fully consumes me', archetypes: ['bilal', 'abu-dharr'] },
      { text: 'Philosophical and contemplative — I find worship in understanding', archetypes: ['salman', 'ali'] },
    ],
  },
  {
    id: 7,
    question: 'In a heated argument, you:',
    context: 'Based on Umar\'s bluntness, Aisha\'s precision, Ali\'s philosophical resolution, Abu Bakr\'s silence.',
    options: [
      { text: 'State your position clearly and don\'t back down unless shown evidence', archetypes: ['umar', 'aisha'] },
      { text: 'Get quiet — your silence carries more weight than your words', archetypes: ['abu-bakr', 'uthman'] },
      { text: 'Seek the underlying principle everyone\'s actually arguing about', archetypes: ['ali', 'salman'] },
      { text: 'Walk away — some arguments don\'t deserve your energy', archetypes: ['bilal', 'abu-dharr'] },
    ],
  },
  {
    id: 8,
    question: 'A great opportunity arrives — but it requires abandoning your current path. You:',
    context: 'Based on Salman\'s decades-long search vs. Khalid\'s rapid conversion and reorientation.',
    options: [
      { text: 'Move quickly — hesitation is just fear wearing disguise', archetypes: ['khalid', 'umar'] },
      { text: 'Take time to verify the opportunity is truly right before moving', archetypes: ['salman', 'ali'] },
      { text: 'Consult those you trust most before deciding', archetypes: ['abu-bakr', 'uthman'] },
      { text: 'Depends on your gut in the moment — no rule works for everything', archetypes: ['aisha', 'abu-dharr'] },
    ],
  },
  {
    id: 9,
    question: 'How do you handle a period of hardship and suffering?',
    context: 'Based on Bilal\'s "Ahad" under torture, Abu Bakr\'s weeping in the cave, Salman\'s decades of servitude.',
    options: [
      { text: 'Anchor to something unchanging — one word, one principle, one name', archetypes: ['bilal', 'abu-bakr'] },
      { text: 'Analyze what is happening and find the strategic response', archetypes: ['khalid', 'ali'] },
      { text: 'Accept it as refinement — the best people are tested the most', archetypes: ['salman', 'abu-dharr'] },
      { text: 'Seek to understand the deeper meaning; suffering has a lesson', archetypes: ['ali', 'aisha'] },
    ],
  },
  {
    id: 10,
    question: 'Your closest friend makes a serious moral mistake. You:',
    context: 'Based on Umar correcting Abu Bakr, Aisha\'s direct criticism, Abu Bakr\'s patient approach.',
    options: [
      { text: 'Tell them immediately and directly — friendship requires honesty', archetypes: ['umar', 'aisha'] },
      { text: 'Give it time and choose the right moment to address it gently', archetypes: ['abu-bakr', 'uthman'] },
      { text: 'Help them understand through questions, not statements', archetypes: ['ali', 'salman'] },
      { text: 'You have to live by your principles even if it costs the friendship', archetypes: ['abu-dharr', 'umar'] },
    ],
  },
  {
    id: 11,
    question: 'What do you believe your greatest gift to the world is?',
    context: 'Based on each companion\'s primary contribution to Islamic history.',
    options: [
      { text: 'The stability you provide — when others waver, you hold firm', archetypes: ['abu-bakr', 'bilal'] },
      { text: 'Your knowledge — understanding you\'ve earned through seeking', archetypes: ['ali', 'aisha', 'salman'] },
      { text: 'Your action — you get things done when others deliberate', archetypes: ['khalid', 'umar'] },
      { text: 'Your refusal to compromise — the world needs people who won\'t yield', archetypes: ['abu-dharr', 'umar'] },
    ],
  },
  {
    id: 12,
    question: 'At the end of life, what would you most want to be remembered for?',
    context: 'Based on each companion\'s dying words, final acts, and historical legacy.',
    options: [
      { text: 'Your loyalty — that you stood by people when it cost you something', archetypes: ['abu-bakr', 'bilal'] },
      { text: 'Your knowledge — that your understanding outlived you', archetypes: ['ali', 'aisha'] },
      { text: 'Your justice — that you made things fairer while you were here', archetypes: ['umar', 'abu-dharr'] },
      { text: 'Your search — that you never stopped looking for what is true', archetypes: ['salman', 'khalid'] },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 79 — "WHAT WOULD YOU DO?" COMPANION DILEMMA SIMULATOR
   Real historical dilemmas → branching choices → companion's real decision
   ═════════════════════════════════════════════════════════════════════ */
export interface DilemmaOption {
  text: string;
  isReal: boolean;   // was this the companion's actual choice?
  outcome: string;   // what happened because of this choice
  color: string;
}

export interface DilemmaScenario {
  id: number;
  companion: string;
  companionAr: string;
  companionRank: number;
  color: string;
  year: string;
  title: string;
  setup: string;
  choices: DilemmaOption[];
  realChoiceHadith: string;
  source: string;
  lesson: string;
}

export const DILEMMA_SCENARIOS: DilemmaScenario[] = [
  {
    id: 1, companion: 'Umar ibn al-Khattab', companionAr: 'عمر بن الخطاب', companionRank: 2, color: '#8b3a08',
    year: '628 CE / 6 AH',
    title: "Umar's Crisis at Hudaybiyyah",
    setup: "You are Umar ibn al-Khattab. The Treaty of Hudaybiyyah has just been signed. It states that Muslims who flee Mecca to join you must be returned — but Meccans who defect to Quraysh will NOT be returned. The Prophet ﷺ has agreed. You believe this is humiliating and unfair. You approach Abu Bakr, who tells you to trust the Prophet ﷺ. What do you do?",
    choices: [
      { text: "Go to the Prophet ﷺ directly and challenge the treaty terms face-to-face", isReal: true, outcome: "Umar did this — he confronted the Prophet ﷺ directly. The Prophet ﷺ told him: 'I am the servant of Allah and His Messenger. I will not contradict His command.' Umar said: 'I never stopped making amends for this until I was certain I had compensated.' He fasted, prayed, and gave charity for years because of his doubt.", color: '#8b3a08' },
      { text: "Accept the treaty in silence — a test of your faith", isReal: false, outcome: "This would have been the safer spiritual choice. Within 2 years, the treaty terms were nullified when Quraysh broke it — and the Conquest of Mecca followed. The treaty was one of the Prophet's ﷺ greatest strategic victories, though it appeared a defeat.", color: '#1a3462' },
      { text: "Lead a faction of companions to oppose the treaty", isReal: false, outcome: "This would have fractured the early Muslim community. The Prophet ﷺ had divine guidance in the decision. The few companions who hesitated — all later recognized the treaty's genius.", color: '#8b1a38' },
      { text: "Ask Abu Bakr to advocate against it on your behalf", isReal: false, outcome: "Abu Bakr simply told Umar: 'Follow him and do not contradict him.' He refused to challenge the Prophet ﷺ. Abu Bakr's certainty was absolute — a quality Umar spent the rest of his life admiring.", color: '#509070' },
    ],
    realChoiceHadith: '"By Allah, I continued to give charity, fast, and pray for a long time for what I said that day, hoping it would be expiation for what I did." — Umar ibn al-Khattab',
    source: 'Bukhari 2731; Sahih Muslim',
    lesson: "Umar's doubt at Hudaybiyyah haunted him. He regretted not having Abu Bakr's unconditional trust. The lesson: sometimes the most spiritually advanced action is not confrontation — it is the harder act of complete surrender to what you cannot yet understand.",
  },
  {
    id: 2, companion: 'Abu Bakr al-Siddiq', companionAr: 'أبو بكر الصديق', companionRank: 1, color: '#b8860b',
    year: '632 CE / 11 AH',
    title: "Abu Bakr's Decision After the Prophet's ﷺ Death",
    setup: "The Prophet ﷺ has died. Multiple Arab tribes have announced they are leaving Islam — some say they will pray but refuse to pay zakat; others have renounced Islam entirely; others have followed false prophets. Umar tells you: 'We cannot fight people who say la ilaha illallah.' The senior companions are divided. You are the Caliph. What do you do?",
    choices: [
      { text: "Fight all who refuse zakat — it is part of the religion, inseparable from prayer", isReal: true, outcome: "Abu Bakr said: 'By Allah, if they withhold even a rope they used to give the Prophet ﷺ, I will fight them for it.' He launched the Ridda wars. Within 2 years, the entire peninsula was reunified and false prophets defeated. Many scholars say this was the most consequential decision in early Islam.", color: '#b8860b' },
      { text: "Focus only on the clear apostates — don't fight those who pray but refuse zakat", isReal: false, outcome: "This was Umar's initial position. He later said: 'By Allah, I saw that Allah had opened Abu Bakr's chest to fight them, and I recognized it was the truth.' If zakat refusal had been tolerated, the financial-religious unity of Islam would have fractured.", color: '#1a3462' },
      { text: "Negotiate with the tribes — give them time to return on their own", isReal: false, outcome: "Several companions argued for patience. But the consolidation of false prophets and the momentum of tribal rebellion would have been impossible to counter once they gained strength. Speed was essential.", color: '#509070' },
      { text: "Focus on Medina's defense — the Muslim community is too small to fight everyone", isReal: false, outcome: "This was a real strategic concern. Some companions feared the Muslim community was too depleted after the Prophet's ﷺ death. Abu Bakr rejected this reasoning entirely.", color: '#8b3a08' },
    ],
    realChoiceHadith: '"By Allah, if they withhold from me even a rope that they used to give the Messenger of Allah ﷺ as zakat, I will fight them for withholding it." — Abu Bakr',
    source: 'Bukhari 1400; Muslim 20',
    lesson: "Abu Bakr's decision unified Islam permanently. Umar later called it the most correct decision of his life to follow Abu Bakr. The lesson: sometimes courage means taking a position that all your advisers oppose — if you have divine guidance in the underlying principle.",
  },
  {
    id: 3, companion: 'Uthman ibn Affan', companionAr: 'عثمان بن عفان', companionRank: 3, color: '#1a3462',
    year: '656 CE / 35 AH',
    title: "Uthman's Final Decision: Abdicate or Stand Firm",
    setup: "You are Uthman ibn Affan. Rebels have surrounded your house in Medina for 40 days. They demand you resign as Caliph or they will kill you. Ali has sent his sons to guard your door. Muawiya in Syria has offered to send an army. Your companions urge you to flee or fight. You know: if you order fighting, Muslim blood will be shed. If you resign, it may create permanent precedent that Caliphs can be forced out. You have seen the Prophet ﷺ in a dream and he told you: 'Break your fast with us tonight.'",
    choices: [
      { text: "Order no bloodshed — accept martyrdom rather than cause civil war in Medina", isReal: true, outcome: "Uthman told companions: 'I will not be the first to shed Muslim blood after the Prophet ﷺ.' He was killed while reading the Quran. His blood fell on the verse: 'And Allah will protect you from the people.' His martyrdom became the defining wound of early Islamic history — the First Fitna.", color: '#1a3462' },
      { text: "Accept the rebels' demands and step down to preserve peace", isReal: false, outcome: "This would have established that armed pressure could remove caliphs. The precedent would have destabilized every future Islamic state. Ali refused to counsel Uthman to resign for this exact reason.", color: '#509070' },
      { text: "Accept Muawiya's army and crush the rebellion", isReal: false, outcome: "This was available to him. He refused. His reasoning: 'I don't want to be a cause of civil war.' If he had accepted, the rebels would have been defeated but at the cost of massive bloodshed in Medina itself — the city of the Prophet ﷺ.", color: '#8b3a08' },
      { text: "Escape at night and let the caliphate reorganize itself", isReal: false, outcome: "Several companions offered to escort him to safety. He refused, saying he would not leave the city of the Prophet ﷺ — or the Quran he was reading.", color: '#b8860b' },
    ],
    realChoiceHadith: '"I will not be the first to shed Muslim blood in Medina after the Messenger of Allah ﷺ." — Uthman ibn Affan',
    source: 'Ibn Sa\'d Tabaqat 3/73; Ibn Kathir Bidaya',
    lesson: "Uthman chose a martyr's death over civil war. His decision has been debated for 1400 years. Those who criticize him forget: he saw the Prophet ﷺ in a dream saying 'break your fast with us tonight' — he knew exactly what was coming, and chose it.",
  },
  {
    id: 4, companion: 'Ali ibn Abi Talib', companionAr: 'علي بن أبي طالب', companionRank: 4, color: '#0a3d2e',
    year: '657 CE / 37 AH',
    title: "Ali's Decision at the Arbitration of Siffin",
    setup: "The Battle of Siffin has lasted months. You are Ali ibn Abi Talib. Muawiya's army is losing — then they raise copies of the Quran on spears and call for arbitration. Your generals cry: this is a trick! Keep fighting — we have them. But your own army is divided: some refuse to fight on seeing the Quran raised. Your advisers are split. You must decide: continue the battle you are winning, or accept the arbitration.",
    choices: [
      { text: "Accept the call to arbitration — you cannot fight people holding the Quran", isReal: true, outcome: "Ali accepted. The arbitration at Adhruh went disastrously — Muawiya's negotiator outmaneuvered Ali's negotiator Abu Musa al-Ash'ari. The caliphate split permanently. A faction of Ali's own army (the Kharijites) then turned on him, calling him a hypocrite for accepting human arbitration. He was later assassinated.", color: '#0a3d2e' },
      { text: "Ignore the Quran-on-spears — it is clearly a tactical trick and press the attack", isReal: false, outcome: "This was what Ali's commanders urged. Had he done this, the battle might have ended quickly. But his army was already fragmenting — he could not force men to fight against what they interpreted as the Quran's authority.", color: '#8b3a08' },
      { text: "Propose your own arbitration terms instead of accepting theirs", isReal: false, outcome: "Ali did try to choose the arbitrators himself — he wanted Ibn Abbas. But his army forced him to accept Abu Musa al-Ash'ari, who was outmaneuvered by Amr ibn al-As. The lesson of Siffin is that even the most just leader can be undermined by those around him.", color: '#1a3462' },
      { text: "Declare the Quran-on-spears invalid and let your generals decide", isReal: false, outcome: "Some of his commanders were ready to continue regardless. But Ali's principle was that he would not override his soldiers' religious conscience by force — a principle that cost him the caliphate.", color: '#509070' },
    ],
    realChoiceHadith: '"Know that whoever fights for the Quran has the same standing as whoever fights for the book itself." — Ali ibn Abi Talib (before reluctantly accepting)',
    source: 'Tabari Tarikh; Nasr ibn Muzahim, Waq\'at Siffin',
    lesson: "Ali's decision at Siffin is one of history's great tragic dilemmas. He was right to value the Quran's sanctity — but it was used against him strategically. His error was in the choice of arbitrator, not the principle. Wisdom includes knowing when principle is being weaponized.",
  },
  {
    id: 5, companion: 'Salman al-Farisi', companionAr: 'سلمان الفارسي', companionRank: 29, color: '#509070',
    year: '627 CE / 5 AH',
    title: "Salman's Strategic Suggestion at Khandaq",
    setup: "You are Salman al-Farisi. The Confederates — 10,000 men — have marched on Medina. The Muslim army is 3,000. Direct battle is impossible. The Prophet ﷺ is consulting companions for strategy. No one has a solution. You have knowledge from Persian warfare that the others don't. Do you speak up?",
    choices: [
      { text: "Suggest digging a trench — a Persian strategy unknown to Arab warfare", isReal: true, outcome: "Salman suggested the Khandaq (trench). The Prophet ﷺ adopted it immediately. Every tribe fought to claim Salman: 'Salman is of us!' The Ansar said it. The Muhajirun said it. The Prophet ﷺ settled it: 'Salman is of us — of the Ahl al-Bayt.' The trench made the confederation's cavalry useless.", color: '#509070' },
      { text: "Stay silent — your strategy is from non-Islamic culture; perhaps it's not appropriate", isReal: false, outcome: "This would have been a catastrophic error. Salman's hesitation would have cost the battle. Islam has no prohibition against beneficial knowledge from any source. The Prophet ﷺ famously said: 'Wisdom is the believer's lost property — wherever he finds it, he has more right to it.'", color: '#1a3462' },
      { text: "Suggest a night raid instead — more familiar and faster", isReal: false, outcome: "Night raids against 10,000 men with a force of 3,000 would have been suicidal. The trench was the correct strategic insight — it neutralized the enemy's greatest advantage (cavalry) while requiring no pitched battle.", color: '#8b3a08' },
      { text: "Propose sending diplomatic envoys to divide the confederation", isReal: false, outcome: "Nu'aym ibn Mas'ud did exactly this — and it worked brilliantly in conjunction with the trench. But without the trench, diplomacy alone could not have prevented the Confederate army from simply marching into Medina.", color: '#b8860b' },
    ],
    realChoiceHadith: '"Salman is of us — of the Ahl al-Bayt." — The Prophet ﷺ at the Battle of Khandaq',
    source: 'Tabaqat Ibn Sa\'d; Ibn Hisham Seerah',
    lesson: "Salman's suggestion was revolutionary — it broke every assumption of 7th century Arabian warfare. The lesson: knowledge from other traditions is not a contradiction of faith. Wisdom belongs to whoever finds it. Salman's Persian knowledge saved Islamic civilization.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 82 — BATTLE ROLE SIMULATOR
   Pick a battle, assign companions to positions, compare with reality
   ═════════════════════════════════════════════════════════════════════ */
export interface BattlePosition {
  id: string;
  label: string;
  labelAr: string;
  description: string;
  x: number;  // SVG position 0-100
  y: number;
}

export interface ActualDeployment {
  positionId: string;
  companionRank?: number;
  companionName: string;
  reason: string;
}

export interface SimBattle {
  id: string;
  name: string;
  year: string;
  color: string;
  intro: string;
  positions: BattlePosition[];
  actualDeployment: ActualDeployment[];
  strategicNote: string;
  outcome: string;
}

export const SIM_BATTLES: SimBattle[] = [
  {
    id: 'badr', name: 'Battle of Badr', year: '624 CE / 2 AH', color: '#b8860b',
    intro: 'The first major battle of Islam. 313 Muslims against 1,000 Qurayshi warriors. Assign the companions to positions, then see the Prophet\'s ﷺ actual deployment.',
    positions: [
      { id: 'commander', label: 'Supreme Commander', labelAr: 'القائد العام', description: 'Overall command and strategic decisions', x: 50, y: 20 },
      { id: 'right-flank', label: 'Right Flank', labelAr: 'الميمنة', description: 'Protects right side of army', x: 75, y: 50 },
      { id: 'left-flank', label: 'Left Flank', labelAr: 'الميسرة', description: 'Protects left side of army', x: 25, y: 50 },
      { id: 'center', label: 'Center / Battle Line', labelAr: 'القلب', description: 'Main battle engagement', x: 50, y: 50 },
      { id: 'standard', label: 'Standard Bearer', labelAr: 'صاحب الراية', description: 'Carries the flag of the Muslim army', x: 50, y: 35 },
      { id: 'cavalry', label: 'Cavalry Lead', labelAr: 'قائد الفرسان', description: 'Commands the mounted fighters', x: 62, y: 40 },
    ],
    actualDeployment: [
      { positionId: 'commander', companionRank: 0, companionName: 'Prophet Muhammad ﷺ', reason: 'The Prophet ﷺ personally commanded Badr — he arranged the rows himself and prayed through the night before the battle.' },
      { positionId: 'right-flank', companionRank: 8, companionName: "Sa'd ibn Abi Waqqas", reason: "Sa'd was 17 years old and placed on the right flank. He was already known as the most accurate archer among the companions." },
      { positionId: 'left-flank', companionRank: 35, companionName: 'Khabbab ibn al-Aratt', reason: 'Experienced in personal combat and stationed to anchor the left.' },
      { positionId: 'center', companionRank: 7, companionName: 'Hamza ibn Abd al-Muttalib', reason: "Hamza was the most physically powerful warrior in the Muslim army. He killed multiple opponents at Badr including Utba ibn Rabi'a — his uncle's challenge." },
      { positionId: 'standard', companionRank: 2, companionName: 'Umar ibn al-Khattab', reason: "Umar carried the standard of the Muhajirun. His presence gave a psychological boost — Quraysh knew what facing Umar meant." },
      { positionId: 'cavalry', companionRank: 9, companionName: 'Abu Ubayda ibn al-Jarrah', reason: 'Led the cavalry coordination. At Badr, cavalry was minimal — but Abu Ubayda\'s tactical awareness made him the natural choice for mobile command.' },
    ],
    strategicNote: 'The Prophet ﷺ placed strongest warriors at center to break the Qurayshi elite. He arranged every rank personally, pressing chests back into position. He predicted the exact spot where major Qurayshi leaders would fall — and they died precisely there.',
    outcome: 'Muslim victory: 70 Qurayshi killed (including Abu Jahl), 70 captured. Muslim losses: 14 martyred. The victory was so decisive that the Quran dedicated an entire surah (Al-Anfal) to it.',
  },
  {
    id: 'uhud', name: 'Battle of Uhud', year: '625 CE / 3 AH', color: '#8b3a08',
    intro: "The Quraysh return with 3,000 warriors. The Prophet ﷺ deploys 700 Muslims. The key decision: 50 archers on Mount Uhud's pass. Assign them and see what happened.",
    positions: [
      { id: 'commander', label: 'Supreme Commander', labelAr: 'القائد العام', description: 'Overall command', x: 50, y: 20 },
      { id: 'archers', label: 'Archers — Pass of Uhud', labelAr: 'الرماة', description: 'CRITICAL: Must not leave under any circumstances', x: 75, y: 25 },
      { id: 'right-flank', label: 'Right Flank', labelAr: 'الميمنة', description: 'Protects right side', x: 75, y: 55 },
      { id: 'left-flank', label: 'Left Flank', labelAr: 'الميسرة', description: 'Protects left side', x: 25, y: 55 },
      { id: 'bodyguard', label: "Prophet's ﷺ Guard", labelAr: 'حراسة النبي', description: "Stays with the Prophet ﷺ at all times", x: 50, y: 35 },
    ],
    actualDeployment: [
      { positionId: 'commander', companionRank: 0, companionName: 'Prophet Muhammad ﷺ', reason: 'The Prophet ﷺ commanded, chose the battlefield position, and specifically instructed the archers NEVER to leave their post even if they see us being eaten by birds.' },
      { positionId: 'archers', companionRank: undefined, companionName: 'Abdullah ibn Jubayr (commander) + 49 archers', reason: "The Prophet ﷺ gave an explicit command: 'Do not leave this position even if you see us being carried by birds.' When 40 of the 50 abandoned their post to collect war spoils, Khalid ibn al-Walid attacked from behind — causing the Muslim rout." },
      { positionId: 'right-flank', companionRank: 12, companionName: "Khalid ibn al-Walid (Qurayshi side — not yet Muslim)", reason: "Khalid was still with Quraysh at Uhud. He commanded their cavalry on the right. When the archers abandoned the pass, he executed the flanking maneuver that reversed the battle. He later said this was the decisive moment." },
      { positionId: 'left-flank', companionRank: 7, companionName: 'Hamza ibn Abd al-Muttalib', reason: 'Hamza anchored the left. He killed multiple opponents before Wahshi, hired by Hind bint Utba, struck him with a javelin. His death broke the Muslim morale momentarily.' },
      { positionId: 'bodyguard', companionRank: 9, companionName: 'Abu Ubayda ibn al-Jarrah + Talha ibn Ubaydullah', reason: "Talha was struck by multiple arrows protecting the Prophet ﷺ. He received 24 wounds in one day. His hand was permanently disabled shielding the Prophet ﷺ. The Prophet ﷺ called him a living martyr." },
    ],
    strategicNote: 'Uhud shows the catastrophic cost of abandoning instructions. The Muslim army was winning — then 40 archers left their post. The entire battle hinged on those 40 disobeying one direct command. The lesson is embedded in Islamic military and moral philosophy to this day.',
    outcome: 'Tactical defeat — 70 Muslims martyred including Hamza. But the Quraysh did not enter Medina — so strategically, it was not a decisive loss. The Prophet ﷺ was wounded. Mutilation of Muslim bodies by Hind bint Utba caused long-term moral shock.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   FEATURE 85 — DAY-BY-DAY EVENT RECONSTRUCTION
   5 pivotal events with hour-by-hour companion accounts
   ═════════════════════════════════════════════════════════════════════ */
export interface ReconstructionMoment {
  time: string;
  companions: string[];
  location: string;
  event: string;
  detail: string;
  source: string;
  significance?: string;
}

export interface ReconstructionEvent {
  id: string;
  title: string;
  year: string;
  color: string;
  intro: string;
  moments: ReconstructionMoment[];
}

export const RECONSTRUCTION_EVENTS: ReconstructionEvent[] = [
  {
    id: 'hijra-night',
    title: 'The Night of the Hijra',
    year: '622 CE / 1 AH (the night before)',
    color: '#b8860b',
    intro: 'The most consequential night in Islamic history — the Prophet ﷺ leaves Mecca for Medina. Every hour mattered.',
    moments: [
      { time: 'Sunset', companions: ['Ali ibn Abi Talib'], location: "The Prophet's ﷺ house, Mecca", event: 'Ali instructed to sleep in the Prophet\'s ﷺ bed', detail: "The Prophet ﷺ told Ali to sleep in his green Hadhrami cloak so the assassins watching the house would think he was still inside. Ali asked: 'Will you be safe, O Prophet of Allah?' The Prophet ﷺ said: 'Yes.' Ali lay down, heart racing, knowing assassins were outside.", source: 'Ibn Hisham Seerah 1/485', significance: 'Ali was the only companion willing to be the decoy — knowingly placing himself in mortal danger' },
      { time: 'Night — after Isha', companions: ['Prophet ﷺ', 'Abu Bakr'], location: 'Abu Bakr\'s house, Mecca (back entrance)', event: 'Secret departure through back door', detail: "The Prophet ﷺ recited Surah Ya-Sin and threw dust toward the 40 Qurayshi assassins surrounding his house — their eyes were sealed and they could not see him pass. He came to Abu Bakr's house. Abu Bakr had been waiting, weeping with hope. His two she-camels were ready, hired from Abdullah ibn Urayqit.", source: 'Bukhari 476', significance: 'The blindness of the assassins is one of the miracles of the Hijra night' },
      { time: 'Deep night', companions: ['Prophet ﷺ', 'Abu Bakr'], location: 'Cave of Thawr — 3 miles south of Mecca', event: 'Hiding in Cave Thawr — 3 nights', detail: "Abu Bakr entered first, checked the cave for danger, blocked all holes with his feet and clothes. He found one hole uncovered — covered it with his heel. A snake bit him but he did not flinch so the Prophet ﷺ would not wake. The Prophet ﷺ slept in his lap. When he woke, he applied his saliva to the bite and it healed.", source: 'Ibn Hisham; Bayhaqi Dala\'il', significance: "Abu Bakr's self-sacrifice in the cave is the origin of the Quran's 'Do not grieve — Allah is with us'" },
      { time: 'Dawn (Fajr)', companions: ['Ali ibn Abi Talib'], location: 'The Prophet\'s ﷺ house, Mecca', event: "Ali returns the trust items (amanaat) to their owners", detail: "The Prophet ﷺ had in his keeping valuable items belonging to Quraysh — he trusted them even while they plotted against him. He instructed Ali to return every item to its rightful owner before leaving Mecca. Ali spent days after this completing the task before joining the Prophet ﷺ in Medina on foot.", source: 'Ibn Hisham Seerah 1/487', significance: "Even in flight, the Prophet ﷺ honored every trust — giving his enemies their due. Ali walked from Mecca to Medina barefoot." },
      { time: 'Morning — Day 4', companions: ['Asma bint Abi Bakr'], location: 'Route south of Mecca', event: "Asma bint Abi Bakr brings food — using her belt (Dhaat al-Nitaqayn)", detail: "Asma prepared provisions for the Prophet ﷺ and her father — but had no rope to tie the food bag. She tore her belt in two to tie it. The Prophet ﷺ gave her the name Dhaat al-Nitaqayn (She of the Two Belts). Quraysh came to Abu Bakr's house and threatened Asma — her grandfather Abu Quhafa was blind. She filled pots with stones to make it appear the money was still there.", source: 'Bukhari 3905', significance: "Asma was pregnant and still climbed Mount Thawr to deliver food — an act of extraordinary courage" },
    ],
  },
  {
    id: 'badr-day',
    title: 'The Day of Badr',
    year: '624 CE / 2 AH — 17 Ramadan',
    color: '#1a3462',
    intro: 'The first major battle of Islam. 313 against 1,000. Reconstructed hour by hour from multiple companion narrations.',
    moments: [
      { time: 'Pre-dawn — Night of 16 Ramadan', companions: ['Prophet ﷺ', 'Abu Bakr'], location: 'Battle camp near the wells of Badr', event: "The Prophet ﷺ prays all night", detail: "The Prophet ﷺ raised his hands before dawn and cried out: 'O Allah, if this group perishes today, You will not be worshipped on earth after this day.' Abu Bakr stood beside him and said: 'O Prophet — you have implored your Lord enough.' The Prophet ﷺ emerged with his eyes red from weeping.", source: 'Muslim 1763', significance: 'The most documented pre-battle prayer in history' },
      { time: 'Dawn', companions: ['Prophet ﷺ', 'All companions'], location: 'Badr valley', event: "Prophet ﷺ arranges the rows personally", detail: "The Prophet ﷺ walked through the Muslim lines with a rod, pressing companions back into position. He pressed the chest of Sawad ibn Ghaziyyah back and Sawad asked: 'O Prophet — that hurt!' The Prophet ﷺ exposed his own chest: 'Retaliate.' Sawad embraced him instead, saying 'this may be my last chance to touch you.'", source: 'Abu Dawud 2662', significance: 'The Prophet ﷺ died in the same year as Sawad — who then met him in Paradise' },
      { time: 'Early morning', companions: ['Prophet ﷺ'], location: 'Battle command tent', event: "Prophet ﷺ predicts exact locations of enemy deaths", detail: "The Prophet ﷺ pointed to the sand: 'This is where Abu Jahl will fall. This is where Utba ibn Rabi'a will fall. This is where Umayya ibn Khalaf will fall.' Every body was found in precisely the location he predicted. This was witnessed and narrated by multiple companions.", source: 'Muslim 2873', significance: 'One of the most precise and documented miracles of the Prophet ﷺ' },
      { time: 'Midday — battle height', companions: ['Hamza ibn Abd al-Muttalib', 'Ali ibn Abi Talib'], location: 'Front battle line', event: 'The 1-on-1 duels — Islamic tradition before full engagement', detail: "Three Quraysh champions stepped forward: Utba ibn Rabi'a, Shayba ibn Rabi'a, and Walid ibn Utba. Three Ansar stepped to meet them — but Utba said: 'Send us our equals.' The Prophet ﷺ sent Hamza, Ali, and Ubaydah ibn al-Harith. All three Quraysh were killed. Ubaydah was mortally wounded — the Prophet ﷺ told him he was a martyr and Ubaydah wept with joy.", source: 'Ibn Hisham Seerah 1/627', significance: 'The formal duels set the moral and physical tone of the battle' },
      { time: 'Mid-afternoon', companions: ['Abd al-Rahman ibn Awf'], location: 'Badr battlefield', event: 'Youngest companions show extraordinary valor', detail: "Abd al-Rahman ibn Awf saw two boys from the Ansar, barely teenagers, asking him about Abu Jahl: 'Which one is Abu Jahl? We heard he insulted the Prophet ﷺ.' They killed Abu Jahl together and then went to the Prophet ﷺ with bloodied swords asking whose was the killing blow. The Prophet ﷺ told them both: it was yours.", source: 'Bukhari 3964', significance: 'The death of Abu Jahl — the most vicious opponent of early Islam — by two teenage boys' },
    ],
  },
  {
    id: 'death-prophet',
    title: "The Death of the Prophet ﷺ",
    year: '632 CE / 11 AH — 12 Rabi al-Awwal',
    color: '#7a3060',
    intro: "The most devastating day in Muslim history. Every companion present has left detailed narrations. This reconstruction follows the final hours.",
    moments: [
      { time: 'Monday dawn — Fajr prayer', companions: ['All companions in Medina'], location: "Masjid al-Nabawi", event: "The Prophet ﷺ appears at the mosque one final time", detail: "The Prophet ﷺ had been ill for 13 days. On Monday morning, he lifted the curtain of Aisha's room — which faced the mosque — and looked at the rows of companions praying. He smiled. Abu Bakr wanted to step back but the Prophet ﷺ gestured for him to continue. The companions saw the Prophet ﷺ and almost broke their prayer with joy. He returned to Aisha's room.", source: "Bukhari 681", significance: "This was the last time the companions saw the Prophet ﷺ alive — his final view of his community praying" },
      { time: "Mid-morning", companions: ["Aisha", "Fatima", "Ali"], location: "Aisha's room", event: "The Prophet ﷺ calls for all his household", detail: "The Prophet ﷺ summoned Fatima. She came close and he whispered something to her — she wept. Then he whispered again — she smiled. Aisha asked later: what did he say? Fatima revealed: first he told her he would die soon. Then he told her she would be the first to follow him — and she was, 6 months later.", source: "Bukhari 3624", significance: "One of the most intimate and documented exchanges in Islamic history" },
      { time: "Early afternoon", companions: ["Aisha", "Abd al-Rahman ibn Abi Bakr"], location: "Aisha's room", event: "The Prophet ﷺ brushes his teeth for the last time", detail: "Abd al-Rahman ibn Abi Bakr entered with a fresh siwak (miswak). The Prophet ﷺ looked at it. Aisha offered it to him — he was too weak to hold it. She chewed the tip to soften it and gave it to him. He cleaned his teeth with it. Aisha said: 'He died with the siwak I had softened — in my lap.'", source: "Bukhari 890", significance: "The Prophet's ﷺ final act was maintaining a practice of the Sunnah — cleaning his teeth" },
      { time: "Afternoon — near Asr", companions: ["Aisha"], location: "Aisha's room — the Prophet ﷺ resting on her chest", event: "The moment of death", detail: "Aisha narrated: 'He was leaning against my chest. I heard him say: \'With those whom Allah has blessed — the prophets, the truthful, the martyrs, and the righteous.\' Then: \'O Allah, the highest companion.\' Then his head became heavy. He was gone.' She said she did not know until later: 'the highest companion' (al-rafiq al-a'la) was his choice — not the dunya.", source: "Bukhari 4463", significance: "His final words were a choice — and he chose Allah over recovery" },
      { time: "After Asr", companions: ["Abu Bakr"], location: "Masjid al-Nabawi", event: "Abu Bakr's announcement — the most important speech in Islamic history", detail: "Umar was standing outside threatening anyone who said the Prophet ﷺ had died. Abu Bakr came, kissed the Prophet ﷺ on the forehead, and walked to the mosque. He recited Quran 3:144 — and it was as if the people had never heard it before. Umar's legs gave out beneath him. The community collapsed in grief, then reformed.", source: "Bukhari 4454", significance: "Abu Bakr's speech prevented the fragmentation of the Muslim community at its most vulnerable moment" },
    ],
  },
  {
    id: 'conquest-mecca',
    title: 'The Conquest of Mecca',
    year: '630 CE / 8 AH — Ramadan 20',
    color: '#0a5c2e',
    intro: 'The bloodless conquest. The city where the Prophet ﷺ was persecuted for 13 years surrenders in one day. Companion accounts of every hour.',
    moments: [
      { time: 'Night before — evening', companions: ['Prophet ﷺ', 'Abu Bakr', '10,000 companions'], location: 'Camp outside Mecca — al-Zawiya', event: "10,000 fires lit simultaneously", detail: "The Prophet ﷺ ordered every companion to light a fire. The hillsides around Mecca glowed. Abu Sufyan, watching from outside the city, was brought to the Prophet ﷺ — he accepted Islam. The Prophet ﷺ told him: 'Whoever enters the mosque is safe. Whoever enters Abu Sufyan's house is safe. Whoever closes his door is safe.'", source: "Ibn Hisham Seerah", significance: "The largest Muslim army in history assembled around Mecca without a single arrow fired yet" },
      { time: 'Dawn', companions: ['Khalid ibn al-Walid', 'Zubayr ibn al-Awwam', 'Sa\'d ibn Abi Waqqas'], location: '4 gates of Mecca simultaneously', event: 'Four columns enter Mecca simultaneously', detail: "The Prophet ﷺ divided the army into 4 columns. Khalid entered from the south, Zubayr from the west with the Prophet's ﷺ green standard. Sa'd entered from the upper pass. Abu Ubayda from the valley road. The only resistance was a small engagement at Khalid's gate — 13 Quraysh were killed. Total Muslim losses: 2.", source: "Ibn Hisham; Waqidi", significance: "A city of 100,000 surrendered to 10,000 with almost no bloodshed — unprecedented in ancient warfare" },
      { time: 'Mid-morning', companions: ['Bilal ibn Rabah', 'Prophet ﷺ'], location: 'Ka\'bah — Masjid al-Haram', event: "Bilal calls the adhan from the roof of the Ka'bah", detail: "After the Prophet ﷺ circled the Ka'bah 7 times and broke the idols with his staff, he summoned Bilal and told him to climb to the roof of the Ka'bah and call the adhan. Abu Sufyan watched and said to Suhail ibn Amr: 'The son of Rabah on the roof of the Ka'bah.' Suhail said: 'If Muhammad disapproves, we can say something.' Before they could, the Prophet ﷺ approached and said: 'If you say other than good, Allah will punish you.'", source: "Ibn Sa'd; Suhayli", significance: "The man who was dragged in chains on Mecca's streets now called to prayer from its highest point" },
      { time: 'Late morning', companions: ['Prophet ﷺ', 'All Quraysh assembled'], location: 'Ka\'bah courtyard', event: "General amnesty — 'Go, you are free'", detail: "All of Quraysh who had persecuted Muslims for 23 years assembled before the Prophet ﷺ. He asked: 'What do you think I will do to you?' They said: 'Good — you are a noble brother and the son of a noble brother.' He replied: 'Go — you are free (antum al-tulaqaa).' No executions. No revenge. No slavery.", source: "Ibn Hisham; Bayhaqi Dala'il", significance: "The most comprehensive political amnesty in ancient history — sparing people who had tortured and killed Muslims" },
    ],
  },
];
