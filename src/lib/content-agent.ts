// ============================================================
// RoboKid Content Agent — Auto-generates & caches content
// Generates stories, puzzles, vocabulary, and fun facts
// Uses Gemini AI with Kenyan CBC context
// ============================================================

import type { Grade, Subject, Language } from '@/types';

/** Cached content item */
interface CachedContent {
  id: string;
  type: 'story' | 'puzzle' | 'vocabulary' | 'fun_fact' | 'riddle' | 'poem' | 'tongue_twister';
  grade: Grade;
  subject: Subject;
  language: Language;
  content: string;
  title: string;
  generatedAt: string;
  tags: string[];
}

/** Content Agent state */
interface AgentState {
  cache: CachedContent[];
  lastGenerated: string | null;
  totalGenerated: number;
  isGenerating: boolean;
}

// In-memory content cache (persists per server lifecycle)
const agentState: AgentState = {
  cache: [],
  lastGenerated: null,
  totalGenerated: 0,
  isGenerating: false,
};

// Pre-loaded content library (always available, no API needed)
const CONTENT_LIBRARY: CachedContent[] = [
  // ---- STORIES ----
  {
    id: 'story-001', type: 'story', grade: 1, subject: 'english', language: 'english',
    title: 'The Clever Hare and the Lion',
    content: `Once upon a time, near the great Maasai Mara, there lived a small hare named Sungura. Sungura was the cleverest animal in the savanna.\n\nOne hot day, Simba the lion blocked the path to the watering hole. "No one passes without paying me five mangoes!" he roared.\n\nSungura thought carefully. "Great Simba," he said, "I know a tree with a hundred mangoes, just beyond the hill."\n\nSimba followed Sungura eagerly. But the tree was next to a deep river! When Simba looked down at his reflection, Sungura said, "Look! Another lion has already taken the mangoes!"\n\nSimba roared at his reflection and jumped into the river — SPLASH! While he swam, all the animals crossed the path safely.\n\nMoral: Brains are mightier than strength. 🧠`,
    generatedAt: new Date().toISOString(), tags: ['animals', 'folktale', 'moral'],
  },
  {
    id: 'story-002', type: 'story', grade: 2, subject: 'english', language: 'english',
    title: 'Wanjiku and the Magic Shamba',
    content: `Wanjiku lived in a small village near Mount Kenya. Every morning, she helped her grandmother tend their shamba.\n\n"Cucu," Wanjiku asked, "why do you talk to the plants?"\n\nHer grandmother smiled. "Because plants are alive, just like us. When we care for them, they care for us."\n\nOne evening, Wanjiku planted a special seed her grandmother gave her. She watered it, sang to it, and protected it from the hot sun.\n\nAfter thirty days, the most beautiful tree grew — with golden leaves that shimmered in the moonlight. Each leaf had a word written on it: LOVE, PATIENCE, KINDNESS, RESPECT, UNITY.\n\n"These are the fruits that matter most," Cucu said. And Wanjiku understood.\n\nMoral: The most valuable things we grow are not fruits, but good values. 🌳`,
    generatedAt: new Date().toISOString(), tags: ['values', 'farming', 'family'],
  },
  {
    id: 'story-003', type: 'story', grade: 1, subject: 'kiswahili', language: 'kiswahili',
    title: 'Tembo na Panya — Hadithi ya Urafiki',
    content: `Siku moja, Tembo mkubwa alitembea msituni. Ghafla, alisikia sauti ndogo: "Tafadhali nisaidie!"\n\nIlikuwa Panya mdogo, aliyenaswa chini ya jiwe kubwa. Tembo alitumia mkonga wake kuondoa jiwe. "Asante sana!" Panya alisema.\n\n"Huna wasiwasi, rafiki mdogo," Tembo alijibu.\n\nWiki mbili baadaye, Tembo alinaswa kwenye mtego wa wavuvi. Alilia kwa sauti kubwa! Panya mdogo alisikia na kukimbia kusaidia. Alitafuna kamba ya mtego kwa meno yake madogo.\n\nTembo alikuwa huru! "Rafiki yangu mdogo, umenisaidia!"\n\nPanya alitabasamu. "Marafiki wanasaidiana — wakubwa na wadogo."\n\nFunzo: Ukubwa si kipimo cha uwezo. Kila mtu ana jambo la kutoa. 🐘🐭`,
    generatedAt: new Date().toISOString(), tags: ['urafiki', 'wanyama', 'funzo'],
  },
  {
    id: 'story-004', type: 'story', grade: 3, subject: 'environmental', language: 'english',
    title: 'The River That Remembered',
    content: `The Tana River had been flowing through Kenya for thousands of years. It remembered everything.\n\nIt remembered the elephants that came to drink at Tsavo. It remembered the farmers who planted rice along its banks. It remembered the children who played in its shallow waters near Garissa.\n\nBut one year, the river noticed something wrong. Plastic bottles and bags floated in its water. The fish were getting sick. The flamingos stopped visiting.\n\n"Help me," the river whispered to a young girl named Amina.\n\nAmina heard the river's call. She organized her classmates for a cleanup. They collected 200 bags of rubbish in one day! They planted trees along the banks. They told their parents to stop dumping waste.\n\nSlowly, the river healed. The fish returned. The flamingos came back.\n\n"Thank you," the river sang. And Amina knew she had found her life's purpose — to protect the rivers of Kenya.\n\nLesson: We are all guardians of our environment. 🌊💚`,
    generatedAt: new Date().toISOString(), tags: ['conservation', 'environment', 'rivers'],
  },

  // ---- FUN FACTS ----
  {
    id: 'fact-001', type: 'fun_fact', grade: 1, subject: 'environmental', language: 'english',
    title: 'Elephants Never Forget',
    content: '🐘 Did you know? Elephants have the largest brain of any land animal. They can remember places, friends, and even events from many years ago! Elephants at Amboseli National Park in Kenya have been studied for over 50 years.',
    generatedAt: new Date().toISOString(), tags: ['animals', 'elephants', 'brain'],
  },
  {
    id: 'fact-002', type: 'fun_fact', grade: 2, subject: 'environmental', language: 'english',
    title: 'Kenya Has Two Snow-Capped Mountains',
    content: '🏔️ Even though Kenya is on the equator, Mount Kenya (5,199m) has snow on its peaks! It is the second tallest mountain in Africa after Kilimanjaro. The name "Kenya" actually comes from the Kamba people\'s name for this mountain — "Kiinyaa."',
    generatedAt: new Date().toISOString(), tags: ['geography', 'mountains', 'Kenya'],
  },
  {
    id: 'fact-003', type: 'fun_fact', grade: 1, subject: 'mathematics', language: 'english',
    title: 'Bees Are Math Experts',
    content: '🐝 Honeybees build their honeycombs using hexagons — shapes with 6 sides! Scientists say this is the most efficient shape for storing honey. Kenya has over 80,000 beekeepers!',
    generatedAt: new Date().toISOString(), tags: ['shapes', 'bees', 'math'],
  },
  {
    id: 'fact-004', type: 'fun_fact', grade: 3, subject: 'environmental', language: 'english',
    title: 'Flamingos Turn Pink From Food',
    content: '🦩 Flamingos are born white or grey! They turn pink from eating tiny shrimp and algae in the lake. Lake Nakuru in Kenya sometimes has over 1 MILLION flamingos — making it look like a pink carpet from above!',
    generatedAt: new Date().toISOString(), tags: ['animals', 'birds', 'flamingos'],
  },
  {
    id: 'fact-005', type: 'fun_fact', grade: 2, subject: 'environmental', language: 'english',
    title: 'Giraffes Have the Same Number of Neck Bones as Humans',
    content: '🦒 Despite their super long necks, giraffes have only 7 neck vertebrae — the same as humans! Each bone is just much, much longer. Giraffes at the Giraffe Centre in Nairobi are so friendly they eat from your hand!',
    generatedAt: new Date().toISOString(), tags: ['animals', 'giraffes', 'body'],
  },
  {
    id: 'fact-006', type: 'fun_fact', grade: 3, subject: 'mathematics', language: 'english',
    title: 'Kenya\'s Marathon Runners & Math',
    content: '🏃 Eliud Kipchoge ran a marathon (42.195 km) in 2 hours and 35 seconds! That means he ran each kilometer in about 2 minutes and 50 seconds. How many seconds is that total? 2 × 3600 + 35 = 7,235 seconds!',
    generatedAt: new Date().toISOString(), tags: ['sports', 'math', 'Kipchoge'],
  },

  // ---- RIDDLES ----
  {
    id: 'riddle-001', type: 'riddle', grade: 1, subject: 'english', language: 'english',
    title: 'Riddle Time!',
    content: '🤔 I have a trunk but I\'m not a tree. I have big ears but I can\'t hear your whispers. I never forget. What am I?\n\n🎯 Answer: An elephant! (Tembo)',
    generatedAt: new Date().toISOString(), tags: ['riddle', 'animals'],
  },
  {
    id: 'riddle-002', type: 'riddle', grade: 2, subject: 'english', language: 'english',
    title: 'Kitendawili!',
    content: '🤔 I am tall but have no legs. I have a neck but no head. I eat leaves from the top of trees. What am I?\n\n🎯 Answer: A giraffe! (Twiga)',
    generatedAt: new Date().toISOString(), tags: ['riddle', 'animals'],
  },
  {
    id: 'riddle-003', type: 'riddle', grade: 1, subject: 'kiswahili', language: 'kiswahili',
    title: 'Kitendawili cha Kiswahili',
    content: '🤔 Kitendawili! Kina miguu minne lakini hakitembei. Watu wanakaa juu yake. Ni nini?\n\n🎯 Jibu: Kiti! (A chair)',
    generatedAt: new Date().toISOString(), tags: ['kitendawili', 'vitu'],
  },

  // ---- POEMS ----
  {
    id: 'poem-001', type: 'poem', grade: 2, subject: 'english', language: 'english',
    title: 'My Beautiful Kenya',
    content: `🇰🇪 My Beautiful Kenya\n\nFrom the mountains high to the ocean blue,\nKenya, my homeland, I love you true.\n\nElephants march through the morning mist,\nFlamingos dance where the waters kissed.\n\nChildren laughing in the school yard bright,\nLearning and growing from morning to night.\n\nUgali and sukuma on mama's plate,\nEvery meal she makes is truly great.\n\nKenya, Kenya, proud and free,\nThe most beautiful country, to me. 🌍`,
    generatedAt: new Date().toISOString(), tags: ['poem', 'Kenya', 'patriotic'],
  },
  {
    id: 'poem-002', type: 'poem', grade: 1, subject: 'kiswahili', language: 'kiswahili',
    title: 'Nchi Yangu',
    content: `🇰🇪 Nchi Yangu\n\nNchi yangu, nchi yangu,\nNchi yangu ni Kenya.\n\nMilima mirefu, bahari kubwa,\nWanyama wengi, watu wema.\n\nShule yangu, nyumba yangu,\nMahali pangu ni Kenya.\n\nNapenda Kenya, nchi yangu!\nHakuna nchi kama Kenya! 🌟`,
    generatedAt: new Date().toISOString(), tags: ['shairi', 'Kenya', 'uzalendo'],
  },

  // ---- TONGUE TWISTERS ----
  {
    id: 'tt-001', type: 'tongue_twister', grade: 2, subject: 'english', language: 'english',
    title: 'English Tongue Twister',
    content: '👅 Try saying this fast three times:\n\n"Seven slippery snakes silently slid south from the Samburu savanna!"\n\n🐍🐍🐍🐍🐍🐍🐍',
    generatedAt: new Date().toISOString(), tags: ['tongue twister', 'fun'],
  },
  {
    id: 'tt-002', type: 'tongue_twister', grade: 2, subject: 'kiswahili', language: 'kiswahili',
    title: 'Sentensi Ngumu ya Kiswahili',
    content: '👅 Jaribu kusema hii haraka mara tatu:\n\n"Kuku mkubwa wa Kamau akakimbia kwa kasi kuelekea Kisumu!"\n\n🐔💨',
    generatedAt: new Date().toISOString(), tags: ['sentensi ngumu', 'mchezo'],
  },

  // ---- VOCABULARY ----
  {
    id: 'vocab-001', type: 'vocabulary', grade: 1, subject: 'kiswahili', language: 'kiswahili',
    title: 'Siku za Wiki (Days of the Week)',
    content: `📅 Days of the Week in Kiswahili:\n\n🌙 Jumatatu — Monday\n🌙 Jumanne — Tuesday\n🌙 Jumatano — Wednesday\n🌙 Alhamisi — Thursday\n🌙 Ijumaa — Friday\n☀️ Jumamosi — Saturday\n☀️ Jumapili — Sunday\n\n💡 "Juma" means "week" in Kiswahili!`,
    generatedAt: new Date().toISOString(), tags: ['siku', 'wiki', 'msamiati'],
  },
  {
    id: 'vocab-002', type: 'vocabulary', grade: 1, subject: 'kiswahili', language: 'kiswahili',
    title: 'Rangi (Colors)',
    content: `🎨 Colors in Kiswahili:\n\n🔴 Nyekundu — Red\n🔵 Buluu — Blue\n🟢 Kijani — Green\n🟡 Njano — Yellow\n⚫ Nyeusi — Black\n⚪ Nyeupe — White\n🟠 Chungwa — Orange\n🟣 Zambarau — Purple\n🩷 Waridi — Pink\n🤎 Kahawia — Brown`,
    generatedAt: new Date().toISOString(), tags: ['rangi', 'msamiati'],
  },
  {
    id: 'vocab-003', type: 'vocabulary', grade: 1, subject: 'environmental', language: 'english',
    title: 'Kenyan Wildlife in Kiswahili',
    content: `🦁 Learn Animal Names:\n\n🦁 Simba — Lion\n🐘 Tembo — Elephant\n🦒 Twiga — Giraffe\n🦓 Punda Milia — Zebra\n🦏 Kifaru — Rhino\n🦛 Kiboko — Hippo\n🐆 Duma — Cheetah\n🐃 Nyati — Buffalo\n🐊 Mamba — Crocodile\n🦩 Heroe — Flamingo\n🦅 Tai — Eagle\n🐒 Tumbili — Monkey`,
    generatedAt: new Date().toISOString(), tags: ['animals', 'vocabulary', 'wildlife'],
  },
  {
    id: 'vocab-004', type: 'vocabulary', grade: 2, subject: 'mathematics', language: 'english',
    title: 'Numbers 1-10 in 3 Languages',
    content: `🔢 Count in Three Languages!\n\n1 — One — Moja — Ĩmwe\n2 — Two — Mbili — Igĩrĩ\n3 — Three — Tatu — Ithatũ\n4 — Four — Nne — Inya\n5 — Five — Tano — Ithano\n6 — Six — Sita — Itandatũ\n7 — Seven — Saba — Mũgwanja\n8 — Eight — Nane — Inyanya\n9 — Nine — Tisa — Kenda\n10 — Ten — Kumi — Ikũmi\n\n🇬🇧 English · 🇰🇪 Kiswahili · 🏔️ Gĩkũyũ`,
    generatedAt: new Date().toISOString(), tags: ['numbers', 'multilingual', 'counting'],
  },
];

// Initialize cache with pre-loaded content
agentState.cache = [...CONTENT_LIBRARY];
agentState.totalGenerated = CONTENT_LIBRARY.length;

/** Get content by type */
export function getContentByType(type: CachedContent['type'], grade?: Grade, language?: Language): CachedContent[] {
  return agentState.cache.filter(c =>
    c.type === type &&
    (grade === undefined || c.grade === grade) &&
    (language === undefined || c.language === language)
  );
}

/** Get random content */
export function getRandomContent(count: number = 5, grade?: Grade): CachedContent[] {
  const filtered = grade ? agentState.cache.filter(c => c.grade === grade) : agentState.cache;
  return [...filtered].sort(() => Math.random() - 0.5).slice(0, count);
}

/** Get daily content (rotates based on date) */
export function getDailyContent(grade: Grade): CachedContent[] {
  const today = new Date().getDate();
  const filtered = agentState.cache.filter(c => c.grade === grade);
  const start = today % Math.max(1, filtered.length - 3);
  return filtered.slice(start, start + 4);
}

/** Get all content */
export function getAllContent(): CachedContent[] {
  return agentState.cache;
}

/** Get agent stats */
export function getAgentStats() {
  return {
    totalContent: agentState.cache.length,
    stories: agentState.cache.filter(c => c.type === 'story').length,
    funFacts: agentState.cache.filter(c => c.type === 'fun_fact').length,
    riddles: agentState.cache.filter(c => c.type === 'riddle').length,
    poems: agentState.cache.filter(c => c.type === 'poem').length,
    vocabulary: agentState.cache.filter(c => c.type === 'vocabulary').length,
    tongueTwisters: agentState.cache.filter(c => c.type === 'tongue_twister').length,
    lastGenerated: agentState.lastGenerated,
    isGenerating: agentState.isGenerating,
  };
}

/** Add new content to cache */
export function addContentToCache(content: Omit<CachedContent, 'id' | 'generatedAt'>): CachedContent {
  const newContent: CachedContent = {
    ...content,
    id: `gen-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    generatedAt: new Date().toISOString(),
  };
  agentState.cache.push(newContent);
  agentState.lastGenerated = newContent.generatedAt;
  agentState.totalGenerated++;
  return newContent;
}

export type { CachedContent };
