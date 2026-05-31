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
  // ============================================================
  // GRADE 4 (Upper Primary) - Sample Topics
  // ============================================================
  {
    id: 'g4-math-001',
    title: 'Multiplication & Simple Fractions',
    description: 'Learn multiplication with large numbers and simple fractions at Alliance Primary',
    grade: 4, subject: 'mathematics', term: 1,
    strand: 'Numbers',
    subStrand: 'Fractions',
    learningOutcomes: [
      'Multiply 3-digit numbers by 2-digit numbers',
      'Identify equivalent fractions using circles',
      'Apply subtraction to fractions with same denominators'
    ],
    suggestedActivities: [
      'Count packages of tea at the shamba',
      'Divide chapati into equal pieces (fourths and eighths)',
      'Multiply costs of bus tickets from Nakuru to Eldoret'
    ],
    keywords: ['multiply', 'fractions', 'equivalent', 'division']
  },
  {
    id: 'g4-env-001',
    title: 'Energy & Conservation in Kenya',
    description: 'Explore renewable energy like solar panels and water conservation',
    grade: 4, subject: 'environmental', term: 1,
    strand: 'Conservation',
    subStrand: 'Energy sources',
    learningOutcomes: [
      'Identify clean energy sources (solar, wind, geothermal)',
      'Explain how school water tanks harvest rain in Kilimani',
      'Demonstrate paper recycling methods'
    ],
    suggestedActivities: [
      'Build a simple solar cooker box',
      'Measure rain collector heights',
      'Create poster on conserving Amboseli wildlife waterholes'
    ],
    keywords: ['energy', 'solar', 'wind', 'recycle', 'water']
  },
  {
    id: 'g4-cre-001',
    title: 'Creative Art & Traditional Drums',
    description: 'Draw 3D shapes and learn traditional Kenyan drum patterns',
    grade: 4, subject: 'creative', term: 1,
    strand: 'Arts & Music',
    subStrand: 'Rhythm',
    learningOutcomes: [
      'Draw shapes with perspective (3D boxes and cylinders)',
      'Play basic syncopated drum beats on a conga',
      'Perform a traditional folk dance from western Kenya'
    ],
    suggestedActivities: [
      'Sketch Alliance High School buildings in 3D',
      'Sequence a basic rhythmic beat on a drum kit',
      'Sing school songs in multiple languages'
    ],
    keywords: ['drums', 'dance', '3d', 'perspective', 'drawing']
  },
  
  // ============================================================
  // ADVANCED LEVEL (Grade 7 - AI & Robotics Prep) - Sample Topics
  // ============================================================
  {
    id: 'g7-math-001',
    title: 'Programming Logic & Variables',
    description: 'Introduction to writing math code in Python and Java at Alliance High',
    grade: 7, subject: 'mathematics', term: 1,
    strand: 'Algebra',
    subStrand: 'Coding logic',
    learningOutcomes: [
      'Define coding variables for numbers and words',
      'Write simple mathematical formulas in Python',
      'Understand loops and conditional statements (if/else)'
    ],
    suggestedActivities: [
      'Type print("Hello World") in the RoboKid Terminal',
      'Create variables for Wanjiku\'s mangoes and run math operations',
      'Explain how a robot counts loops (1 to 10)'
    ],
    keywords: ['python', 'java', 'variables', 'logic', 'terminal']
  },
  {
    id: 'g7-env-001',
    title: 'Robotics Sensors & Environmental Monitoring',
    description: 'Learn how smart robots help us track soil moisture and weather',
    grade: 7, subject: 'environmental', term: 1,
    strand: 'Technology',
    subStrand: 'Sensors',
    learningOutcomes: [
      'Explain how ultrasonic sensors act like robot eyes',
      'Understand soil moisture sensors for tea farms in Nyeri',
      'Design a smart irrigation system flowchart'
    ],
    suggestedActivities: [
      'Simulate an distance sensor warning system in the terminal',
      'Draw circuit diagrams connecting sensors to a brain',
      'Discuss how self-driving tractors plow shambas'
    ],
    keywords: ['sensors', 'ultrasonic', 'circuits', 'irrigation', 'weather']
  },
  {
    id: 'g7-cre-001',
    title: 'Artificial Intelligence & Neural Networks',
    description: 'How computers learn to recognize patterns and make decisions',
    grade: 7, subject: 'creative', term: 1,
    strand: 'Digital Literacy',
    subStrand: 'Machine Learning',
    learningOutcomes: [
      'Explain what a Neural Network is in simple words',
      'Understand how computers recognize images (mangoes vs bananas)',
      'Discuss the ethics of AI and self-driving matatus'
    ],
    suggestedActivities: [
      'Test the visual math helper with shape triggers',
      'Teach a mock robot brain to identify sweet fruits',
      'Explain how speech translation handles Somali and Kikuyu'
    ],
    keywords: ['artificial intelligence', 'neural network', 'pattern', 'ethics']
  },

  // ==========================================
  // RELIGIOUS EDUCATION — All Grades (CBC Kenya)
  // Christian Religious Education (CRE)
  // ==========================================

  // GRADE 1
  {
    id: 'g1-re-001',
    title: 'God Created the World',
    description: 'Learn how God created the world in 6 days and rested on the 7th — the story of Creation',
    grade: 1, subject: 'religious', term: 1,
    strand: 'Creation',
    subStrand: 'God the Creator',
    learningOutcomes: [
      'Name the things God created in order',
      'Appreciate God\'s creation around us in Kenya',
      'Recite Genesis 1:1 by heart',
    ],
    suggestedActivities: [
      'Draw the things God created on each day',
      'Walk around the school compound and list nature\'s beauty',
      'Sing "He\'s Got the Whole World in His Hands"',
    ],
    keywords: ['creation', 'God', 'Genesis', 'world', 'days'],
  },
  {
    id: 'g1-re-002',
    title: 'God Loves Me — John 3:16',
    description: 'Understand and memorize John 3:16 — the most famous verse about God\'s love',
    grade: 1, subject: 'religious', term: 1,
    strand: 'God\'s Love',
    subStrand: 'Salvation',
    learningOutcomes: [
      'Recite John 3:16 in English and mother tongue',
      'Explain what it means that God loves the world',
      'Feel confident that God loves each child personally',
    ],
    suggestedActivities: [
      'Make a heart craft with John 3:16 written inside',
      'Learn John 3:16 in Kikuyu, Luo or Kiswahili',
      'Draw a picture of Jesus and write "Jesus loves me"',
    ],
    keywords: ['love', 'John', 'God', 'world', 'eternal life'],
  },
  {
    id: 'g1-re-003',
    title: 'The Story of Noah\'s Ark',
    description: 'Noah obeyed God, built an ark, and saved his family and animals from the flood',
    grade: 1, subject: 'religious', term: 2,
    strand: 'Bible Stories',
    subStrand: 'Obedience',
    learningOutcomes: [
      'Tell the story of Noah and the flood in their own words',
      'Explain the meaning of the rainbow as God\'s promise',
      'Value the importance of obeying God and parents',
    ],
    suggestedActivities: [
      'Colour a picture of Noah\'s Ark with all the animals',
      'Make a rainbow craft using coloured paper',
      'Act out the story of Noah\'s ark in groups',
    ],
    keywords: ['Noah', 'ark', 'flood', 'rainbow', 'obedience', 'promise'],
  },
  {
    id: 'g1-re-004',
    title: 'The Lord is My Shepherd — Psalm 23',
    description: 'Psalm 23 tells us God cares for us like a shepherd cares for his sheep',
    grade: 1, subject: 'religious', term: 3,
    strand: 'Psalms',
    subStrand: 'God\'s Care',
    learningOutcomes: [
      'Memorize Psalm 23:1 in English and mother tongue',
      'Describe how a shepherd takes care of sheep',
      'Relate God\'s care to their daily life in Kenya',
    ],
    suggestedActivities: [
      'Draw a shepherd with sheep on a Kenyan hillside',
      'Learn Psalm 23 as a song or spoken word',
      'Write Psalm 23:1 in their mother tongue (Kikuyu/Luo/Kiswahili)',
    ],
    keywords: ['Psalm', 'shepherd', 'sheep', 'God', 'care', 'protection'],
  },

  // GRADE 2
  {
    id: 'g2-re-001',
    title: 'David and Goliath — Courage with God',
    description: 'Young David defeated the giant Goliath with faith and a small stone — God helps the brave!',
    grade: 2, subject: 'religious', term: 1,
    strand: 'Bible Heroes',
    subStrand: 'Faith & Courage',
    learningOutcomes: [
      'Tell the story of David and Goliath',
      'Explain how faith in God gives us courage',
      'Apply lessons of courage to challenges at school',
    ],
    suggestedActivities: [
      'Act out the David vs Goliath story in class',
      'Make "stones of courage" — pebbles with Philippians 4:13 written on them',
      'Discuss a time you were brave like David',
    ],
    keywords: ['David', 'Goliath', 'courage', 'faith', 'stone', 'giant'],
  },
  {
    id: 'g2-re-002',
    title: 'Jesus Feeds 5000 People — Sharing is Caring',
    description: 'A small boy shared his five loaves and two fish and Jesus fed 5000 people!',
    grade: 2, subject: 'religious', term: 2,
    strand: 'Miracles of Jesus',
    subStrand: 'Generosity',
    learningOutcomes: [
      'Tell the miracle story of feeding the 5000',
      'Demonstrate the value of sharing with others',
      'Relate the miracle to sharing lunch at school',
    ],
    suggestedActivities: [
      'Bring a small lunch item to share with the class',
      'Draw the boy sharing his bread and fish',
      'Discuss how sharing makes everyone feel happy',
    ],
    keywords: ['Jesus', 'miracle', 'bread', 'fish', 'sharing', '5000'],
  },
  {
    id: 'g2-re-003',
    title: 'The Good Samaritan — Helping Our Neighbors',
    description: 'Learn to love and help everyone — even strangers — just like the Good Samaritan',
    grade: 2, subject: 'religious', term: 3,
    strand: 'Parables of Jesus',
    subStrand: 'Love & Kindness',
    learningOutcomes: [
      'Retell the parable of the Good Samaritan',
      'Explain who our "neighbor" is according to Jesus',
      'Show acts of kindness to classmates and community',
    ],
    suggestedActivities: [
      'Create a class "Kindness Board" with good deeds done this week',
      'Role-play helping someone who is hurt or sad',
      'Connect the parable to helping people in Nairobi, Kisumu or Garissa',
    ],
    keywords: ['Samaritan', 'neighbor', 'kindness', 'help', 'love', 'parable'],
  },

  // GRADE 3
  {
    id: 'g3-re-001',
    title: 'Daniel in the Lions\' Den — Never Stop Praying',
    description: 'Daniel prayed faithfully to God even when it was against the law — and God saved him!',
    grade: 3, subject: 'religious', term: 1,
    strand: 'Bible Heroes',
    subStrand: 'Prayer & Faithfulness',
    learningOutcomes: [
      'Tell the story of Daniel in the lions\' den',
      'Understand the power of faithful daily prayer',
      'Practice praying morning, afternoon, and evening like Daniel',
    ],
    suggestedActivities: [
      'Write a short prayer of thanks like Daniel might have prayed',
      'Draw Daniel praying with lions around him — and an angel protecting him',
      'Discuss what you would do if someone told you not to pray to God',
    ],
    keywords: ['Daniel', 'prayer', 'lions', 'faithfulness', 'God', 'angel'],
  },
  {
    id: 'g3-re-002',
    title: 'The Ten Commandments — God\'s Rules',
    description: 'God gave Moses ten important rules to help people live peacefully and love each other',
    grade: 3, subject: 'religious', term: 2,
    strand: 'God\'s Word',
    subStrand: 'The Law',
    learningOutcomes: [
      'Name the Ten Commandments from memory',
      'Explain why God gave us rules to follow',
      'Relate commandments to school rules and family values',
    ],
    suggestedActivities: [
      'Create a "Ten Commandments tablet" from clay or cardboard',
      'Match each commandment to a real-life situation in Kenya',
      'Write a letter to Moses asking him questions about the commandments',
    ],
    keywords: ['commandments', 'Moses', 'law', 'rules', 'God', 'Sinai'],
  },
  {
    id: 'g3-re-003',
    title: 'The Sermon on the Mount — Beatitudes',
    description: 'Jesus taught the Beatitudes — eight blessings for living a happy and godly life',
    grade: 3, subject: 'religious', term: 3,
    strand: 'Teachings of Jesus',
    subStrand: 'Beatitudes',
    learningOutcomes: [
      'List the Beatitudes from Matthew 5:3-12',
      'Explain the meaning of "Blessed are the peacemakers"',
      'Show peacemaking skills in classroom interactions',
    ],
    suggestedActivities: [
      'Write each Beatitude on a leaf shape — make a Beatitudes tree',
      'Role-play being a peacemaker in a school conflict',
      'Discuss how the Beatitudes relate to Ubuntu — community harmony',
    ],
    keywords: ['beatitudes', 'blessed', 'sermon', 'mountain', 'peace', 'Matthew'],
  },

  // GRADE 4
  {
    id: 'g4-re-001',
    title: 'The Life of Jesus — Birth, Ministry, Death & Resurrection',
    description: 'A comprehensive look at the life of Jesus from his birth in Bethlehem to his resurrection',
    grade: 4, subject: 'religious', term: 1,
    strand: 'Life of Jesus',
    subStrand: 'Gospel',
    learningOutcomes: [
      'Outline the key events in the life of Jesus',
      'Explain the significance of the death and resurrection of Jesus',
      'Connect the Easter story to hope and new beginnings',
    ],
    suggestedActivities: [
      'Create a timeline of Jesus\'s life from birth to resurrection',
      'Act out the Easter story in school assembly',
      'Write a newspaper article: "Miracle Worker Seen in Galilee!"',
    ],
    keywords: ['Jesus', 'birth', 'resurrection', 'Easter', 'Bethlehem', 'cross'],
  },
  {
    id: 'g4-re-002',
    title: 'Jeremiah 29:11 — God Has Great Plans for You!',
    description: 'God told Jeremiah that He has plans to give us hope and a wonderful future',
    grade: 4, subject: 'religious', term: 2,
    strand: 'Prophecy',
    subStrand: 'God\'s Purpose',
    learningOutcomes: [
      'Memorize Jeremiah 29:11 in English and mother tongue',
      'Believe that God has a special plan for their life',
      'Set goals for the future with trust in God\'s plan',
    ],
    suggestedActivities: [
      'Write "My Future Goals" letter guided by Jeremiah 29:11',
      'Make a "God\'s Plan for Me" vision board',
      'Discuss Kenyan role models who trusted God\'s plan — e.g. Wangari Maathai',
    ],
    keywords: ['Jeremiah', 'plans', 'hope', 'future', 'purpose', 'God'],
  },

  // GRADE 5
  {
    id: 'g5-re-001',
    title: 'Fruit of the Spirit — Galatians 5:22-23',
    description: 'Learn the 9 fruits of the Holy Spirit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control',
    grade: 5, subject: 'religious', term: 1,
    strand: 'Holy Spirit',
    subStrand: 'Fruit of the Spirit',
    learningOutcomes: [
      'Name all 9 fruits of the Spirit from Galatians 5:22-23',
      'Demonstrate at least 3 fruits of the Spirit in daily school life',
      'Understand the role of the Holy Spirit in a Christian\'s life',
    ],
    suggestedActivities: [
      'Create a fruit tree artwork with each fruit labeled',
      'Keep a weekly journal of when you showed a fruit of the Spirit',
      'Discuss how self-control helps in exams and sports',
    ],
    keywords: ['Galatians', 'Spirit', 'love', 'joy', 'peace', 'patience', 'kindness', 'faithfulness'],
  },
  {
    id: 'g5-re-002',
    title: 'The Greatest Commandment — Matthew 22:37-39',
    description: 'Jesus summed up all of God\'s law in two commands: Love God and love your neighbor',
    grade: 5, subject: 'religious', term: 2,
    strand: 'Teachings of Jesus',
    subStrand: 'Greatest Commandment',
    learningOutcomes: [
      'Memorize Matthew 22:37-39 in English and one mother tongue',
      'Explain how loving God leads to loving others',
      'Design a school or community project based on loving neighbors',
    ],
    suggestedActivities: [
      'Visit a community elder or orphan home in Nairobi/Kisumu',
      'Create a "Love Your Neighbor" poster for the school',
      'Write a poem about love in English, Kiswahili, and your mother tongue',
    ],
    keywords: ['love', 'commandment', 'Matthew', 'neighbor', 'God', 'heart'],
  },

  // GRADE 6
  {
    id: 'g6-re-001',
    title: 'Justice and Mercy — Micah 6:8',
    description: 'God calls us to act justly, love mercy and walk humbly — what does this mean in Kenya today?',
    grade: 6, subject: 'religious', term: 1,
    strand: 'Prophets',
    subStrand: 'Social Justice',
    learningOutcomes: [
      'Explain what "act justly, love mercy, walk humbly" means in Micah 6:8',
      'Identify injustices in Kenyan society and propose godly solutions',
      'Demonstrate humility and fairness in school leadership',
    ],
    suggestedActivities: [
      'Research a Kenyan justice issue (e.g. child labor, hunger) and present solutions',
      'Organize a class "Justice Day" with fair rules and community service',
      'Write a speech as if you are Micah speaking to Kenya today',
    ],
    keywords: ['Micah', 'justice', 'mercy', 'humility', 'social justice', 'Kenya'],
  },
  {
    id: 'g6-re-002',
    title: 'Romans 8:28 — All Things Work for Good',
    description: 'Paul teaches that God causes all things — even hard times — to work together for good',
    grade: 6, subject: 'religious', term: 2,
    strand: 'Epistles',
    subStrand: 'Suffering & Hope',
    learningOutcomes: [
      'Memorize Romans 8:28 in English and mother tongue',
      'Give examples of people in Kenya who trusted God through hard times',
      'Share how a personal difficulty led to something good',
    ],
    suggestedActivities: [
      'Interview a grandparent or elder about trusting God through hard times',
      'Write a short biography of a Kenyan who overcame hardship with faith',
      'Create a "Good Out of Difficulty" timeline for a Bible character',
    ],
    keywords: ['Romans', 'suffering', 'hope', 'good', 'purpose', 'faith'],
  },

  // GRADE 7 — ADVANCED
  {
    id: 'g7-re-001',
    title: 'AI, Robotics & Faith — Can Machines Have a Soul?',
    description: 'An advanced discussion: What does the Bible say about human uniqueness? How does our faith guide how we use technology?',
    grade: 7, subject: 'religious', term: 1,
    strand: 'Faith & Technology',
    subStrand: 'Christian Ethics in AI',
    learningOutcomes: [
      'Discuss the biblical basis for human dignity and uniqueness (Genesis 1:27)',
      'Evaluate the ethical use of AI from a Christian worldview',
      'Propose how Kenyan Christians can use technology responsibly',
    ],
    suggestedActivities: [
      'Debate: "Should robots replace humans in church worship?" — use Bible to support your view',
      'Write an essay: "How Should African Christians Use AI Responsibly?"',
      'Discuss: Does a robot have free will? What does the Bible say about free will?',
    ],
    keywords: ['AI', 'robots', 'faith', 'ethics', 'technology', 'Christian', 'human dignity'],
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
  for (const grade of [1, 2, 3, 4, 5, 6, 7] as Grade[]) {
    summary[grade] = {} as Record<Subject, number>;
    for (const subject of ['mathematics', 'environmental', 'english', 'kiswahili', 'indigenous', 'creative', 'religious'] as Subject[]) {
      summary[grade][subject] = getTopicsByGradeAndSubject(grade, subject).length;
    }
  }
  return summary;
}
