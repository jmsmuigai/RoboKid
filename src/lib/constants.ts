// ============================================================
// RoboKid Platform — App Constants
// Kenya CBC Curriculum Configuration
// ============================================================

import type { LanguageInfo, Subject } from '@/types';

/** Supported languages with display metadata */
export const LANGUAGES: LanguageInfo[] = [
  { code: 'english', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'kiswahili', label: 'Kiswahili', nativeLabel: 'Kiswahili', flag: '🇰🇪' },
  { code: 'kikuyu', label: 'Kikuyu', nativeLabel: 'Gĩkũyũ', flag: '🏔️' },
  { code: 'luo', label: 'Luo', nativeLabel: 'Dholuo', flag: '🐟' },
  { code: 'somali', label: 'Somali', nativeLabel: 'Soomaali', flag: '🌟' },
];

/** Subject metadata for display */
export const SUBJECTS: Record<Subject, {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  bgPattern: string;
}> = {
  mathematics: {
    name: 'Mathematics Activities',
    icon: '🧮',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
    description: 'Numbers, counting, shapes, and problem-solving in everyday Kenyan life',
    bgPattern: '✕ ○ △ □',
  },
  environmental: {
    name: 'Environmental Activities',
    icon: '🌍',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
    description: 'Exploring nature, hygiene, nutrition, and our beautiful Kenyan environment',
    bgPattern: '🌿 💧 🌾 ☀️',
  },
  english: {
    name: 'English Language',
    icon: '📖',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
    description: 'Reading, writing, and speaking English with confidence',
    bgPattern: 'A B C D',
  },
  kiswahili: {
    name: 'Kiswahili Language',
    icon: '🗣️',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
    description: 'Kusoma, kuandika, na kuzungumza Kiswahili kwa ufasaha',
    bgPattern: 'KI SW AH IL',
  },
  indigenous: {
    name: 'Indigenous Languages',
    icon: '🏡',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)',
    description: 'Learn and celebrate your mother tongue — Kikuyu, Luo, Somali & more',
    bgPattern: '🏡 🌳 👨‍👩‍👧‍👦 🎶',
  },
  creative: {
    name: 'Creative Activities',
    icon: '🎨',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)',
    description: 'Art, music, movement, and creative expression',
    bgPattern: '🎨 🎵 💃 ✂️',
  },
  religious: {
    name: 'Religious Education',
    icon: '🕊️',
    color: '#78716C',
    gradient: 'linear-gradient(135deg, #78716C 0%, #57534E 50%, #44403C 100%)',
    description: 'Values, morals, and spiritual growth',
    bgPattern: '🕊️ ❤️ 🙏 ⭐',
  },
};

/** Grade-level metadata */
export const GRADES = [
  { grade: 1 as const, label: 'Grade 1', age: '6 years', color: '#22D3EE', emoji: '🌱' },
  { grade: 2 as const, label: 'Grade 2', age: '7 years', color: '#A78BFA', emoji: '🌿' },
  { grade: 3 as const, label: 'Grade 3', age: '8 years', color: '#FB923C', emoji: '🌳' },
];

/** Kenyan cultural context terms for Gemini prompts */
export const KENYAN_CONTEXT = {
  names: {
    boys: ['Ochieng', 'Kamau', 'Abdi', 'Kipchoge', 'Wafula', 'Mwangi', 'Hassan', 'Otieno', 'Karanja', 'Omar'],
    girls: ['Wanjiku', 'Amina', 'Achieng', 'Chebet', 'Nafula', 'Nyambura', 'Halima', 'Atieno', 'Muthoni', 'Fatuma'],
  },
  places: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Garissa', 'Eldoret', 'Nyeri', 'Malindi', 'Nanyuki', 'Lamu'],
  landmarks: ['Mount Kenya', 'Lake Victoria', 'Maasai Mara', 'Tsavo', 'Amboseli', 'Hell\'s Gate', 'Lake Nakuru'],
  foods: ['ugali', 'sukuma wiki', 'nyama choma', 'chapati', 'githeri', 'mandazi', 'mukimo', 'pilau', 'samosa', 'mahamri'],
  transport: ['matatu', 'boda boda', 'tuk tuk', 'SGR train', 'ferry'],
  animals: ['lion', 'elephant', 'giraffe', 'zebra', 'rhino', 'flamingo', 'hippo', 'cheetah', 'buffalo', 'leopard'],
  farming: ['shamba', 'tea plantation', 'coffee farm', 'maize field', 'dairy farm', 'fish pond'],
  currency: 'Kenya Shillings (KES)',
};

/** Revenue / subscription configuration */
export const SUBSCRIPTION = {
  free: {
    name: 'RoboKid Free',
    price: 0,
    puzzlesPerDay: 3,
    languages: ['english', 'kiswahili'] as const,
    examQuestionsPerSession: 5,
    features: [
      '3 puzzles per day per subject',
      'English & Kiswahili languages',
      '5 exam questions per session',
      'Basic games access',
    ],
  },
  premium: {
    name: 'RoboKid Premium',
    priceUSD: 2.99,
    priceKES: 399,
    puzzlesPerDay: Infinity,
    languages: ['english', 'kiswahili', 'kikuyu', 'luo', 'somali'] as const,
    examQuestionsPerSession: Infinity,
    features: [
      'Unlimited puzzles & content',
      'All 5 languages including indigenous',
      'Full exam bank with analytics',
      'Ad-free experience',
      'Downloadable worksheets (PDF)',
      'Parent dashboard & progress reports',
      'Priority AI responses',
    ],
  },
};

/** App-wide configuration */
export const APP_CONFIG = {
  name: 'RoboKid',
  tagline: 'Learn AI, Play Smart, Speak Your Language',
  description: 'AI-powered educational platform for Kenyan children aligned with the CBC curriculum',
  version: '1.0.0',
  maxAPICallsPerMinute: 30,
  geminiModel: 'gemini-2.0-flash',
  geminiSafetyLevel: 'BLOCK_MEDIUM_AND_ABOVE',
};
