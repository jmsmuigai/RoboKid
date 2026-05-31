// ============================================================
// RoboKid Platform — CBC Curriculum Data
// Kenya Institute of Curriculum Development (KICD) 2025
// Rationalized Lower Primary (Grade 1-3) Framework
// ============================================================
// Sources: KICD Curriculum Designs, Kenya CBC Framework 2025
// 7 Rationalized Learning Areas for Lower Primary
// ============================================================

import type { Topic, Grade, Subject } from '@/types';

/** Complete CBC Curriculum Topics — Grade 1, 2, and 3 */
export const curriculumTopics: Topic[] = [

  // ==========================================
  // GRADE 1 — MATHEMATICS ACTIVITIES
  // ==========================================
  {
    id: 'g1-math-001',
    title: 'Counting Objects 1-50',
    description: 'Count objects in the environment up to 50',
    grade: 1, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Whole Numbers',
    learningOutcomes: [
      'Count objects up to 50 correctly',
      'Read and write numerals 1-50',
      'Identify numbers before and after a given number',
    ],
    suggestedActivities: [
      'Count fruits at Wanjiku\'s market stall',
      'Count passengers in a matatu',
      'Sing counting songs in groups',
    ],
    keywords: ['counting', 'numbers', 'numerals', 'objects'],
  },
  {
    id: 'g1-math-002',
    title: 'Addition of Whole Numbers (up to 10)',
    description: 'Add whole numbers whose sum does not exceed 10',
    grade: 1, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Addition',
    learningOutcomes: [
      'Add two numbers whose sum is up to 10',
      'Use real objects to demonstrate addition',
      'Write addition sentences using + and = signs',
    ],
    suggestedActivities: [
      'Use bottle tops to add groups',
      'Count mangoes in Ochieng\'s basket then add more',
      'Add cows at Kamau\'s shamba',
    ],
    keywords: ['addition', 'plus', 'sum', 'add'],
  },
  {
    id: 'g1-math-003',
    title: 'Subtraction of Whole Numbers (up to 10)',
    description: 'Subtract whole numbers within 10',
    grade: 1, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Subtraction',
    learningOutcomes: [
      'Subtract numbers within 10',
      'Use objects to demonstrate taking away',
      'Write subtraction sentences using - and =',
    ],
    suggestedActivities: [
      'Take away oranges from a group of 10',
      'Passengers getting off a matatu',
      'Birds flying away from a tree',
    ],
    keywords: ['subtraction', 'minus', 'take away', 'less'],
  },
  {
    id: 'g1-math-004',
    title: 'Shapes — Circles, Triangles, Rectangles, Squares',
    description: 'Identify and describe common 2D shapes',
    grade: 1, subject: 'mathematics', term: 2,
    strand: 'Geometry',
    subStrand: '2D Shapes',
    learningOutcomes: [
      'Identify circles, triangles, rectangles, and squares',
      'Describe properties of shapes (sides, corners)',
      'Find shapes in the environment',
    ],
    suggestedActivities: [
      'Find shapes on a Kenyan flag',
      'Identify shapes of road signs',
      'Draw shapes found in the classroom',
    ],
    keywords: ['shapes', 'circle', 'triangle', 'rectangle', 'square'],
  },
  {
    id: 'g1-math-005',
    title: 'Measurement — Length',
    description: 'Compare and measure lengths using non-standard units',
    grade: 1, subject: 'mathematics', term: 2,
    strand: 'Measurement',
    subStrand: 'Length',
    learningOutcomes: [
      'Compare objects as longer, shorter, or the same length',
      'Measure length using hand spans and strides',
      'Order objects by length',
    ],
    suggestedActivities: [
      'Measure the classroom using strides',
      'Compare lengths of pencils',
      'Measure the school farm fence using arm spans',
    ],
    keywords: ['length', 'long', 'short', 'measure'],
  },
  {
    id: 'g1-math-006',
    title: 'Patterns and Sequences',
    description: 'Identify and create simple patterns',
    grade: 1, subject: 'mathematics', term: 3,
    strand: 'Numbers',
    subStrand: 'Patterns',
    learningOutcomes: [
      'Identify repeating patterns in the environment',
      'Create patterns using objects and colors',
      'Extend a given pattern',
    ],
    suggestedActivities: [
      'Create bead patterns using Maasai-inspired colors',
      'Identify patterns in kikoi fabric',
      'Create number patterns on the number line',
    ],
    keywords: ['pattern', 'sequence', 'repeat', 'extend'],
  },

  // ==========================================
  // GRADE 1 — ENVIRONMENTAL ACTIVITIES
  // (Includes Hygiene & Nutrition per 2025 rationalization)
  // ==========================================
  {
    id: 'g1-env-001',
    title: 'Parts of the Body',
    description: 'Identify and name major parts of the human body',
    grade: 1, subject: 'environmental', term: 1,
    strand: 'The Human Body',
    subStrand: 'Body Parts',
    learningOutcomes: [
      'Name major external body parts',
      'Describe the function of each body part',
      'Practice proper care of body parts',
    ],
    suggestedActivities: [
      'Sing "Head, Shoulders, Knees and Toes" in Kiswahili',
      'Draw and label body parts',
      'Play Simon Says to identify body parts',
    ],
    keywords: ['body', 'head', 'hands', 'legs', 'eyes'],
  },
  {
    id: 'g1-env-002',
    title: 'Personal Hygiene',
    description: 'Practice personal cleanliness and hygiene habits',
    grade: 1, subject: 'environmental', term: 1,
    strand: 'Health & Hygiene',
    subStrand: 'Personal Hygiene',
    learningOutcomes: [
      'Demonstrate proper handwashing technique',
      'Explain the importance of bathing daily',
      'Describe how to care for teeth and hair',
    ],
    suggestedActivities: [
      'Practice 20-second handwashing with soap',
      'Create a daily hygiene chart',
      'Role-play visiting the school nurse',
    ],
    keywords: ['hygiene', 'clean', 'wash', 'health', 'soap'],
  },
  {
    id: 'g1-env-003',
    title: 'Food We Eat',
    description: 'Identify different types of food and their sources',
    grade: 1, subject: 'environmental', term: 2,
    strand: 'Nutrition',
    subStrand: 'Types of Food',
    learningOutcomes: [
      'Identify common Kenyan foods',
      'Group foods by their sources (plants/animals)',
      'Name foods that help us grow and stay healthy',
    ],
    suggestedActivities: [
      'Sort pictures of ugali, sukuma wiki, milk, and eggs',
      'Visit the school kitchen to identify foods',
      'Draw a plate with a balanced meal',
    ],
    keywords: ['food', 'ugali', 'fruits', 'vegetables', 'nutrition'],
  },
  {
    id: 'g1-env-004',
    title: 'Plants in My Environment',
    description: 'Identify common plants and their uses',
    grade: 1, subject: 'environmental', term: 2,
    strand: 'Living Things',
    subStrand: 'Plants',
    learningOutcomes: [
      'Identify common plants in the school compound',
      'Describe uses of plants (food, medicine, shade)',
      'Care for plants by watering and weeding',
    ],
    suggestedActivities: [
      'Nature walk to identify plants in the shamba',
      'Plant seeds in the school garden',
      'Draw and color different plants found at home',
    ],
    keywords: ['plants', 'trees', 'flowers', 'garden', 'shamba'],
  },
  {
    id: 'g1-env-005',
    title: 'Weather and Seasons',
    description: 'Observe and describe weather patterns',
    grade: 1, subject: 'environmental', term: 3,
    strand: 'The Environment',
    subStrand: 'Weather',
    learningOutcomes: [
      'Describe different types of weather (sunny, rainy, cloudy, windy)',
      'Relate weather to daily activities',
      'Keep a simple weather chart',
    ],
    suggestedActivities: [
      'Record daily weather for a week',
      'Discuss how weather affects farming at the shamba',
      'Draw pictures of rainy and sunny days in Nairobi',
    ],
    keywords: ['weather', 'rain', 'sun', 'wind', 'seasons'],
  },
  {
    id: 'g1-env-006',
    title: 'Animals Around Us',
    description: 'Identify domestic and wild animals',
    grade: 1, subject: 'environmental', term: 3,
    strand: 'Living Things',
    subStrand: 'Animals',
    learningOutcomes: [
      'Identify domestic animals (cow, goat, chicken)',
      'Identify wild animals (lion, elephant, giraffe)',
      'Describe how animals are useful to humans',
    ],
    suggestedActivities: [
      'Visit Nairobi National Park (virtual tour)',
      'Sort pictures of domestic and wild animals',
      'Discuss animals found at the Maasai Mara',
    ],
    keywords: ['animals', 'cow', 'lion', 'elephant', 'domestic', 'wild'],
  },

  // ==========================================
  // GRADE 1 — ENGLISH LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g1-eng-001',
    title: 'Letter Sounds (Phonics)',
    description: 'Identify and produce letter sounds',
    grade: 1, subject: 'english', term: 1,
    strand: 'Reading',
    subStrand: 'Phonological Awareness',
    learningOutcomes: [
      'Produce sounds of all 26 letters',
      'Identify initial sounds in words',
      'Match letters to their sounds',
    ],
    suggestedActivities: [
      'Sing the phonics song',
      'Play "I Spy" with letter sounds',
      'Sound hunt in the classroom',
    ],
    keywords: ['phonics', 'letters', 'sounds', 'alphabet'],
  },
  {
    id: 'g1-eng-002',
    title: 'Reading CVC Words',
    description: 'Read simple consonant-vowel-consonant words',
    grade: 1, subject: 'english', term: 1,
    strand: 'Reading',
    subStrand: 'Word Recognition',
    learningOutcomes: [
      'Blend sounds to read CVC words (cat, dog, hen)',
      'Read common CVC words in sentences',
      'Write CVC words from dictation',
    ],
    suggestedActivities: [
      'Use flashcards with pictures of Kenyan animals',
      'Build words with letter tiles',
      'Read simple words on labels around school',
    ],
    keywords: ['CVC', 'reading', 'blending', 'words'],
  },
  {
    id: 'g1-eng-003',
    title: 'Greetings and Introductions',
    description: 'Use appropriate greetings and self-introduction',
    grade: 1, subject: 'english', term: 1,
    strand: 'Speaking & Listening',
    subStrand: 'Oral Communication',
    learningOutcomes: [
      'Greet others appropriately (Good morning, Hello)',
      'Introduce self (My name is...)',
      'Respond to simple questions about self',
    ],
    suggestedActivities: [
      'Morning greeting circle',
      'Role-play meeting a new friend',
      'Introduce family members using pictures',
    ],
    keywords: ['greetings', 'hello', 'name', 'introduction'],
  },
  {
    id: 'g1-eng-004',
    title: 'Writing Letters and Words',
    description: 'Write upper and lowercase letters correctly',
    grade: 1, subject: 'english', term: 2,
    strand: 'Writing',
    subStrand: 'Handwriting',
    learningOutcomes: [
      'Write all 26 uppercase and lowercase letters',
      'Copy simple words neatly',
      'Write own name correctly',
    ],
    suggestedActivities: [
      'Trace letters in sand trays',
      'Copy words from the chalkboard',
      'Write names of classroom objects',
    ],
    keywords: ['writing', 'letters', 'handwriting', 'uppercase', 'lowercase'],
  },

  // ==========================================
  // GRADE 1 — KISWAHILI LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g1-kisw-001',
    title: 'Herufi za Kiswahili (Kiswahili Letters)',
    description: 'Tambua na kusoma herufi za Kiswahili',
    grade: 1, subject: 'kiswahili', term: 1,
    strand: 'Kusoma',
    subStrand: 'Utambuzi wa Herufi',
    learningOutcomes: [
      'Tambua herufi zote za Kiswahili',
      'Soma silabi rahisi (ba, be, bi, bo, bu)',
      'Andika herufi kwa usahihi',
    ],
    suggestedActivities: [
      'Imba wimbo wa herufi za Kiswahili',
      'Cheza mchezo wa herufi',
      'Andika herufi kwenye daftari',
    ],
    keywords: ['herufi', 'silabi', 'Kiswahili', 'kusoma'],
  },
  {
    id: 'g1-kisw-002',
    title: 'Maneno Rahisi (Simple Words)',
    description: 'Soma na kuandika maneno rahisi ya Kiswahili',
    grade: 1, subject: 'kiswahili', term: 1,
    strand: 'Kusoma',
    subStrand: 'Utambuzi wa Maneno',
    learningOutcomes: [
      'Soma maneno rahisi (mama, baba, nyumba)',
      'Andika maneno kutokana na silabi',
      'Tumia maneno rahisi katika sentensi',
    ],
    suggestedActivities: [
      'Soma maneno kwenye kadi',
      'Unda maneno kutokana na silabi',
      'Taja vitu darasani kwa Kiswahili',
    ],
    keywords: ['maneno', 'kusoma', 'kuandika', 'silabi'],
  },
  {
    id: 'g1-kisw-003',
    title: 'Salamu na Kujitambulisha (Greetings)',
    description: 'Tumia salamu za Kiswahili vizuri',
    grade: 1, subject: 'kiswahili', term: 1,
    strand: 'Kusikiliza na Kuzungumza',
    subStrand: 'Mawasiliano ya Mdomo',
    learningOutcomes: [
      'Salimia watu kwa heshima (Habari, Shikamoo)',
      'Jitambulishe kwa Kiswahili (Jina langu ni...)',
      'Jibu maswali rahisi kuhusu nafsi',
    ],
    suggestedActivities: [
      'Igiza salamu za asubuhi',
      'Jitambulishe kwa darasa',
      'Salimia watu tofauti (walimu, wazazi, marafiki)',
    ],
    keywords: ['salamu', 'habari', 'shikamoo', 'jina'],
  },

  // ==========================================
  // GRADE 2 — MATHEMATICS ACTIVITIES
  // ==========================================
  {
    id: 'g2-math-001',
    title: 'Place Value — Tens and Ones',
    description: 'Understand place value of digits in two-digit numbers',
    grade: 2, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Place Value',
    learningOutcomes: [
      'Identify tens and ones in numbers up to 99',
      'Write numbers in expanded form (34 = 30 + 4)',
      'Compare two-digit numbers using >, <, =',
    ],
    suggestedActivities: [
      'Use bundles of sticks to show tens and ones',
      'Group bottle tops into tens at Wanjiku\'s kiosk',
      'Write prices of items at the market',
    ],
    keywords: ['place value', 'tens', 'ones', 'compare'],
  },
  {
    id: 'g2-math-002',
    title: 'Addition of Two-Digit Numbers',
    description: 'Add two-digit numbers without and with regrouping',
    grade: 2, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Addition',
    learningOutcomes: [
      'Add two-digit numbers without regrouping',
      'Add two-digit numbers with regrouping',
      'Solve word problems involving addition',
    ],
    suggestedActivities: [
      'Calculate total cost of items at a Nairobi market',
      'Add passengers boarding a matatu at different stops',
      'Score addition in a football match',
    ],
    keywords: ['addition', 'two-digit', 'regrouping', 'sum'],
  },
  {
    id: 'g2-math-003',
    title: 'Subtraction of Two-Digit Numbers',
    description: 'Subtract two-digit numbers with and without borrowing',
    grade: 2, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Subtraction',
    learningOutcomes: [
      'Subtract two-digit numbers without borrowing',
      'Subtract two-digit numbers with borrowing',
      'Solve word problems involving subtraction',
    ],
    suggestedActivities: [
      'Calculate change from shopping at the duka',
      'Subtract passengers leaving a matatu',
      'Work out remaining seeds after planting',
    ],
    keywords: ['subtraction', 'two-digit', 'borrowing', 'difference'],
  },
  {
    id: 'g2-math-004',
    title: 'Introduction to Multiplication',
    description: 'Understand multiplication as repeated addition',
    grade: 2, subject: 'mathematics', term: 2,
    strand: 'Numbers',
    subStrand: 'Multiplication',
    learningOutcomes: [
      'Relate multiplication to repeated addition',
      'Multiply by 2, 5, and 10',
      'Use multiplication in real-life situations',
    ],
    suggestedActivities: [
      'Count pairs of shoes (multiply by 2)',
      'Count fingers on hands (multiply by 5)',
      'Count KES 10 coins (multiply by 10)',
    ],
    keywords: ['multiplication', 'times', 'groups', 'repeated addition'],
  },
  {
    id: 'g2-math-005',
    title: 'Money — Kenya Shillings',
    description: 'Identify and use Kenyan currency',
    grade: 2, subject: 'mathematics', term: 2,
    strand: 'Measurement',
    subStrand: 'Money',
    learningOutcomes: [
      'Identify Kenyan coins (1, 5, 10, 20, 40 KES)',
      'Identify Kenyan notes (50, 100, 200 KES)',
      'Calculate simple totals and give change',
    ],
    suggestedActivities: [
      'Set up a classroom duka (shop)',
      'Buy and sell items using play money',
      'Calculate matatu fare for a short trip',
    ],
    keywords: ['money', 'shillings', 'coins', 'notes', 'KES'],
  },
  {
    id: 'g2-math-006',
    title: 'Time — Reading the Clock',
    description: 'Tell time to the hour and half hour',
    grade: 2, subject: 'mathematics', term: 3,
    strand: 'Measurement',
    subStrand: 'Time',
    learningOutcomes: [
      'Read time to the hour on an analogue clock',
      'Read time to the half hour',
      'Relate time to daily activities',
    ],
    suggestedActivities: [
      'Set a clock to school assembly time (8:00)',
      'Match daily activities to times',
      'Create a daily timetable',
    ],
    keywords: ['time', 'clock', 'hour', 'half hour', 'o\'clock'],
  },

  // ==========================================
  // GRADE 2 — ENVIRONMENTAL ACTIVITIES
  // ==========================================
  {
    id: 'g2-env-001',
    title: 'Water and Its Uses',
    description: 'Understand the importance of clean water',
    grade: 2, subject: 'environmental', term: 1,
    strand: 'Natural Resources',
    subStrand: 'Water',
    learningOutcomes: [
      'Identify sources of water in the community',
      'Describe uses of water at home and school',
      'Explain ways to keep water clean',
    ],
    suggestedActivities: [
      'Map water sources in the school area',
      'Discuss water conservation at the shamba',
      'Compare clean and dirty water samples safely',
    ],
    keywords: ['water', 'clean', 'sources', 'river', 'borehole'],
  },
  {
    id: 'g2-env-002',
    title: 'Food Groups and Balanced Diet',
    description: 'Classify foods into groups for a balanced diet',
    grade: 2, subject: 'environmental', term: 1,
    strand: 'Nutrition',
    subStrand: 'Balanced Diet',
    learningOutcomes: [
      'Group foods into carbohydrates, proteins, and vitamins',
      'Plan a simple balanced meal',
      'Explain why a balanced diet is important',
    ],
    suggestedActivities: [
      'Sort pictures: ugali (carbs), beans (protein), fruits (vitamins)',
      'Plan a lunch menu using local foods',
      'Draw a balanced plate with Kenyan foods',
    ],
    keywords: ['food groups', 'balanced diet', 'carbohydrates', 'proteins', 'vitamins'],
  },
  {
    id: 'g2-env-003',
    title: 'Animals and Their Habitats',
    description: 'Understand where different animals live',
    grade: 2, subject: 'environmental', term: 2,
    strand: 'Living Things',
    subStrand: 'Animal Habitats',
    learningOutcomes: [
      'Match animals to their habitats',
      'Describe features of different habitats (forest, savanna, water)',
      'Explain how animals adapt to their environment',
    ],
    suggestedActivities: [
      'Create a habitat diorama of the Maasai Mara',
      'Sort animals: forest vs. savanna vs. water',
      'Discuss animals found at Lake Nakuru',
    ],
    keywords: ['habitat', 'savanna', 'forest', 'water', 'adaptation'],
  },
  {
    id: 'g2-env-004',
    title: 'Soil and Its Importance',
    description: 'Understand types of soil and their uses',
    grade: 2, subject: 'environmental', term: 2,
    strand: 'Natural Resources',
    subStrand: 'Soil',
    learningOutcomes: [
      'Identify different types of soil (clay, loam, sand)',
      'Describe uses of soil in farming and construction',
      'Explain how to conserve soil',
    ],
    suggestedActivities: [
      'Collect and compare soil samples from the shamba',
      'Discuss why red soil in Central Kenya is good for farming',
      'Plant seeds in different soil types',
    ],
    keywords: ['soil', 'clay', 'loam', 'sand', 'farming'],
  },
  {
    id: 'g2-env-005',
    title: 'Common Diseases and Prevention',
    description: 'Learn about common childhood diseases and how to prevent them',
    grade: 2, subject: 'environmental', term: 3,
    strand: 'Health & Hygiene',
    subStrand: 'Disease Prevention',
    learningOutcomes: [
      'Identify common diseases (malaria, flu, diarrhea)',
      'Describe ways to prevent common diseases',
      'Explain the importance of immunization',
    ],
    suggestedActivities: [
      'Discuss how to prevent malaria (mosquito nets)',
      'Role-play visiting the clinic for immunization',
      'Create prevention posters',
    ],
    keywords: ['diseases', 'malaria', 'prevention', 'hygiene', 'immunization'],
  },

  // ==========================================
  // GRADE 2 — ENGLISH LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g2-eng-001',
    title: 'Reading Simple Sentences',
    description: 'Read and understand simple sentences',
    grade: 2, subject: 'english', term: 1,
    strand: 'Reading',
    subStrand: 'Comprehension',
    learningOutcomes: [
      'Read simple sentences fluently',
      'Answer questions about what was read',
      'Retell a short story in own words',
    ],
    suggestedActivities: [
      'Read short stories about life in Kenya',
      'Answer "Who, What, Where" questions',
      'Pair reading with a classmate',
    ],
    keywords: ['reading', 'sentences', 'comprehension', 'story'],
  },
  {
    id: 'g2-eng-002',
    title: 'Writing Sentences',
    description: 'Construct and write simple sentences',
    grade: 2, subject: 'english', term: 2,
    strand: 'Writing',
    subStrand: 'Sentence Construction',
    learningOutcomes: [
      'Write complete sentences with capital letters and full stops',
      'Use describing words in sentences',
      'Write sentences about personal experiences',
    ],
    suggestedActivities: [
      'Write sentences about your weekend',
      'Describe your favorite Kenyan food',
      'Write about an animal you saw',
    ],
    keywords: ['writing', 'sentences', 'capital letters', 'full stop'],
  },

  // ==========================================
  // GRADE 2 — KISWAHILI LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g2-kisw-001',
    title: 'Kusoma Sentensi Rahisi (Reading Sentences)',
    description: 'Soma na kuelewa sentensi rahisi za Kiswahili',
    grade: 2, subject: 'kiswahili', term: 1,
    strand: 'Kusoma',
    subStrand: 'Ufahamu',
    learningOutcomes: [
      'Soma sentensi rahisi kwa ufasaha',
      'Jibu maswali kuhusu hadithi iliyosomwa',
      'Eleza hadithi fupi kwa maneno yako',
    ],
    suggestedActivities: [
      'Soma hadithi fupi za watoto wa Kenya',
      'Jibu maswali ya "Nani, Nini, Wapi"',
      'Soma na mwanafunzi mwenzako',
    ],
    keywords: ['kusoma', 'sentensi', 'ufahamu', 'hadithi'],
  },
  {
    id: 'g2-kisw-002',
    title: 'Kuandika Sentensi (Writing Sentences)',
    description: 'Tunga na kuandika sentensi rahisi',
    grade: 2, subject: 'kiswahili', term: 2,
    strand: 'Kuandika',
    subStrand: 'Uundaji wa Sentensi',
    learningOutcomes: [
      'Andika sentensi kamili kwa herufi kubwa na kituo',
      'Tumia maneno ya kuelezea katika sentensi',
      'Andika sentensi kuhusu shughuli za kila siku',
    ],
    suggestedActivities: [
      'Andika sentensi kuhusu wikendi yako',
      'Eleza chakula unachokipenda',
      'Andika kuhusu mnyama uliyemuona',
    ],
    keywords: ['kuandika', 'sentensi', 'herufi kubwa', 'kituo'],
  },

  // ==========================================
  // GRADE 3 — MATHEMATICS ACTIVITIES
  // ==========================================
  {
    id: 'g3-math-001',
    title: 'Numbers up to 999',
    description: 'Read, write, and order numbers up to 999',
    grade: 3, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Whole Numbers',
    learningOutcomes: [
      'Read and write numbers up to 999',
      'Identify place value (hundreds, tens, ones)',
      'Order and compare three-digit numbers',
    ],
    suggestedActivities: [
      'Read prices on products at the supermarket',
      'Compare distances between Kenyan towns',
      'Write population numbers of villages',
    ],
    keywords: ['hundreds', 'place value', 'order', 'compare', 'three-digit'],
  },
  {
    id: 'g3-math-002',
    title: 'Multiplication Tables (2, 3, 4, 5, 10)',
    description: 'Learn and apply basic multiplication tables',
    grade: 3, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Multiplication',
    learningOutcomes: [
      'Recite multiplication tables for 2, 3, 4, 5, and 10',
      'Solve multiplication problems',
      'Apply multiplication in daily situations',
    ],
    suggestedActivities: [
      'Count wheels on matatus (multiply by 4)',
      'Calculate cost of multiple items at the duka',
      'Skip counting games on the number line',
    ],
    keywords: ['multiplication', 'tables', 'times', 'product'],
  },
  {
    id: 'g3-math-003',
    title: 'Division — Sharing Equally',
    description: 'Divide numbers and understand equal sharing',
    grade: 3, subject: 'mathematics', term: 2,
    strand: 'Numbers',
    subStrand: 'Division',
    learningOutcomes: [
      'Divide numbers into equal groups',
      'Relate division to multiplication',
      'Solve simple word problems involving division',
    ],
    suggestedActivities: [
      'Share mandazi equally among friends',
      'Divide seeds into equal rows for planting',
      'Split matatu fare among passengers',
    ],
    keywords: ['division', 'share', 'equal', 'groups', 'quotient'],
  },
  {
    id: 'g3-math-004',
    title: 'Fractions — Halves, Quarters, Thirds',
    description: 'Understand and represent simple fractions',
    grade: 3, subject: 'mathematics', term: 2,
    strand: 'Numbers',
    subStrand: 'Fractions',
    learningOutcomes: [
      'Identify half (½), quarter (¼), and third (⅓) of a whole',
      'Represent fractions using pictures',
      'Find fractions of a set of objects',
    ],
    suggestedActivities: [
      'Cut a chapati into halves and quarters',
      'Share a watermelon into equal parts',
      'Color fractions of shapes on worksheets',
    ],
    keywords: ['fractions', 'half', 'quarter', 'third', 'equal parts'],
  },
  {
    id: 'g3-math-005',
    title: 'Money — Shopping and Budgeting',
    description: 'Use money in practical shopping situations',
    grade: 3, subject: 'mathematics', term: 2,
    strand: 'Measurement',
    subStrand: 'Money',
    learningOutcomes: [
      'Add and subtract amounts of money',
      'Calculate total cost and change',
      'Make a simple budget for a shopping list',
    ],
    suggestedActivities: [
      'Role-play shopping at Gikomba market',
      'Calculate total grocery bill',
      'Plan a class party with a budget of KES 500',
    ],
    keywords: ['money', 'shopping', 'budget', 'cost', 'change', 'KES'],
  },
  {
    id: 'g3-math-006',
    title: 'Measurement — Mass and Capacity',
    description: 'Measure mass in kilograms and capacity in litres',
    grade: 3, subject: 'mathematics', term: 3,
    strand: 'Measurement',
    subStrand: 'Mass and Capacity',
    learningOutcomes: [
      'Estimate and measure mass using a balance',
      'Estimate and measure capacity using litres',
      'Compare objects by mass and capacity',
    ],
    suggestedActivities: [
      'Weigh fruits at the market using a balance',
      'Measure water into 1-litre bottles',
      'Compare mass of classroom objects',
    ],
    keywords: ['mass', 'kilograms', 'capacity', 'litres', 'measure'],
  },

  // ==========================================
  // GRADE 3 — ENVIRONMENTAL ACTIVITIES
  // ==========================================
  {
    id: 'g3-env-001',
    title: 'Soil Types and Farming',
    description: 'Understand different soil types and their suitability for farming',
    grade: 3, subject: 'environmental', term: 1,
    strand: 'Natural Resources',
    subStrand: 'Soil Conservation',
    learningOutcomes: [
      'Identify soil types and their properties',
      'Explain which crops grow best in different soils',
      'Describe methods of soil conservation (terracing, mulching)',
    ],
    suggestedActivities: [
      'Compare volcanic soil from Central Kenya with sandy soil from Coast',
      'Plant beans in different soil types',
      'Visit a tea farm to observe soil management',
    ],
    keywords: ['soil', 'farming', 'conservation', 'terracing', 'crops'],
  },
  {
    id: 'g3-env-002',
    title: 'Water Cycle',
    description: 'Understand the water cycle and its importance',
    grade: 3, subject: 'environmental', term: 1,
    strand: 'Natural Resources',
    subStrand: 'Water',
    learningOutcomes: [
      'Describe the stages of the water cycle',
      'Explain evaporation, condensation, and precipitation',
      'Relate the water cycle to weather in Kenya',
    ],
    suggestedActivities: [
      'Demonstrate evaporation by leaving water in the sun',
      'Draw the water cycle with Mount Kenya as the mountain',
      'Discuss why Lake Victoria never runs dry',
    ],
    keywords: ['water cycle', 'evaporation', 'condensation', 'rain', 'precipitation'],
  },
  {
    id: 'g3-env-003',
    title: 'Conservation of the Environment',
    description: 'Learn about environmental conservation and sustainability',
    grade: 3, subject: 'environmental', term: 2,
    strand: 'Conservation',
    subStrand: 'Environmental Protection',
    learningOutcomes: [
      'Explain why conservation is important',
      'Describe ways to conserve trees and wildlife',
      'Practice waste management (reduce, reuse, recycle)',
    ],
    suggestedActivities: [
      'Organize a tree-planting exercise at school',
      'Discuss the work of Wangari Maathai (Green Belt Movement)',
      'Create waste sorting bins for the classroom',
    ],
    keywords: ['conservation', 'trees', 'wildlife', 'recycle', 'Wangari Maathai'],
  },
  {
    id: 'g3-env-004',
    title: 'Health — Common Diseases in Kenya',
    description: 'Learn about common diseases, causes, and prevention',
    grade: 3, subject: 'environmental', term: 3,
    strand: 'Health & Hygiene',
    subStrand: 'Disease Prevention',
    learningOutcomes: [
      'Identify common diseases in Kenya (malaria, typhoid, cholera)',
      'Explain causes and prevention of each disease',
      'Describe the role of community health workers',
    ],
    suggestedActivities: [
      'Invite the school nurse for a health talk',
      'Create prevention posters for the school',
      'Role-play visiting a health clinic',
    ],
    keywords: ['diseases', 'malaria', 'typhoid', 'cholera', 'prevention', 'health workers'],
  },

  // ==========================================
  // GRADE 3 — ENGLISH LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g3-eng-001',
    title: 'Reading Comprehension',
    description: 'Read and comprehend grade-level passages',
    grade: 3, subject: 'english', term: 1,
    strand: 'Reading',
    subStrand: 'Comprehension',
    learningOutcomes: [
      'Read passages fluently with expression',
      'Answer comprehension questions accurately',
      'Make predictions about stories',
    ],
    suggestedActivities: [
      'Read stories about Kenyan heroes (Wangari Maathai, Eliud Kipchoge)',
      'Complete comprehension worksheets',
      'Discuss main ideas and supporting details',
    ],
    keywords: ['comprehension', 'reading', 'passages', 'questions', 'main idea'],
  },
  {
    id: 'g3-eng-002',
    title: 'Parts of Speech — Nouns, Verbs, Adjectives',
    description: 'Identify and use basic parts of speech',
    grade: 3, subject: 'english', term: 2,
    strand: 'Grammar',
    subStrand: 'Parts of Speech',
    learningOutcomes: [
      'Identify nouns (naming words) in sentences',
      'Identify verbs (action words) in sentences',
      'Use adjectives (describing words) correctly',
    ],
    suggestedActivities: [
      'Sort words into nouns, verbs, adjectives',
      'Write sentences using each part of speech',
      'Play "Grammar Bingo" with classmates',
    ],
    keywords: ['nouns', 'verbs', 'adjectives', 'grammar', 'parts of speech'],
  },
  {
    id: 'g3-eng-003',
    title: 'Creative Writing — Short Stories',
    description: 'Write short creative stories',
    grade: 3, subject: 'english', term: 3,
    strand: 'Writing',
    subStrand: 'Creative Writing',
    learningOutcomes: [
      'Write a short story with a beginning, middle, and end',
      'Use descriptive language in writing',
      'Edit own work for spelling and punctuation',
    ],
    suggestedActivities: [
      'Write a story about a day at the market',
      'Write about an adventure at the national park',
      'Create a story about your best friend',
    ],
    keywords: ['creative writing', 'story', 'beginning', 'middle', 'end'],
  },

  // ==========================================
  // GRADE 3 — KISWAHILI LANGUAGE ACTIVITIES
  // ==========================================
  {
    id: 'g3-kisw-001',
    title: 'Ufahamu (Comprehension)',
    description: 'Soma na kuelewa vifungu vya maneno',
    grade: 3, subject: 'kiswahili', term: 1,
    strand: 'Kusoma',
    subStrand: 'Ufahamu',
    learningOutcomes: [
      'Soma vifungu kwa ufasaha',
      'Jibu maswali ya ufahamu kwa usahihi',
      'Eleza maana ya maneno magumu',
    ],
    suggestedActivities: [
      'Soma hadithi kuhusu mashujaa wa Kenya',
      'Jibu maswali ya ufahamu',
      'Elezea mawazo makuu ya hadithi',
    ],
    keywords: ['ufahamu', 'kusoma', 'vifungu', 'maswali'],
  },
  {
    id: 'g3-kisw-002',
    title: 'Insha Fupi (Short Compositions)',
    description: 'Andika insha fupi kwa Kiswahili',
    grade: 3, subject: 'kiswahili', term: 2,
    strand: 'Kuandika',
    subStrand: 'Utungaji',
    learningOutcomes: [
      'Andika insha fupi yenye mwanzo, kati, na mwisho',
      'Tumia maneno ya kuelezea katika uandishi',
      'Hariri kazi yako kwa hijai na uakifishaji',
    ],
    suggestedActivities: [
      'Andika insha kuhusu siku yangu sokoni',
      'Andika kuhusu safari ya hifadhi ya wanyama',
      'Tunga hadithi kuhusu rafiki yako bora',
    ],
    keywords: ['insha', 'kuandika', 'utungaji', 'hadithi'],
  },
  {
    id: 'g3-kisw-003',
    title: 'Sarufi — Nomino, Vitenzi, Vivumishi',
    description: 'Tambua na kutumia aina za maneno',
    grade: 3, subject: 'kiswahili', term: 2,
    strand: 'Sarufi',
    subStrand: 'Aina za Maneno',
    learningOutcomes: [
      'Tambua nomino katika sentensi',
      'Tambua vitenzi katika sentensi',
      'Tumia vivumishi kwa usahihi',
    ],
    suggestedActivities: [
      'Panga maneno katika nomino, vitenzi, vivumishi',
      'Tunga sentensi kwa kutumia kila aina ya neno',
      'Cheza mchezo wa sarufi na wanafunzi wenzako',
    ],
    keywords: ['sarufi', 'nomino', 'vitenzi', 'vivumishi', 'aina za maneno'],
  },
];

/** Get topics by grade */
export function getTopicsByGrade(grade: Grade): Topic[] {
  return curriculumTopics.filter(t => t.grade === grade);
}

/** Get topics by grade and subject */
export function getTopicsByGradeAndSubject(grade: Grade, subject: Subject): Topic[] {
  return curriculumTopics.filter(t => t.grade === grade && t.subject === subject);
}

/** Get topics by subject across all grades */
export function getTopicsBySubject(subject: Subject): Topic[] {
  return curriculumTopics.filter(t => t.subject === subject);
}

/** Get topic count summary */
export function getTopicCountSummary(): Record<Grade, Record<Subject, number>> {
  const summary = {} as Record<Grade, Record<Subject, number>>;
  for (const grade of [1, 2, 3] as Grade[]) {
    summary[grade] = {} as Record<Subject, number>;
    for (const subject of ['mathematics', 'environmental', 'english', 'kiswahili', 'indigenous', 'creative', 'religious'] as Subject[]) {
      summary[grade][subject] = getTopicsByGradeAndSubject(grade, subject).length;
    }
  }
  return summary;
}
