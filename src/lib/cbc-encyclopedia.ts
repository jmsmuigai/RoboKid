// ============================================================
// RoboKid CBC Targeter Encyclopedia
// Complete KICD CBC Lower Primary Curriculum Data (Grade 1-3)
// Source: KICD Curriculum Designs, CBC Targeters, EasyElimu, Arena.co.ke
// All strands, sub-strands, learning outcomes, activities, and assessment criteria
// ============================================================

export interface CBCStrand {
  id: string;
  strand: string;
  subStrands: CBCSubStrand[];
}

export interface CBCSubStrand {
  id: string;
  title: string;
  grade: 1 | 2 | 3;
  term: 1 | 2 | 3;
  learningOutcomes: string[];
  keyInquiryQuestions: string[];
  suggestedActivities: string[];
  coreCompetencies: string[];
  values: string[];
  resources: string[];
  assessment: string[];
  kenyanContext: string; // RoboKid's African context for this topic
}

// ============================================================
// MATHEMATICS ACTIVITIES — Grade 1, 2, 3
// ============================================================
export const MATH_STRANDS: CBCStrand[] = [
  {
    id: 'math-numbers',
    strand: 'Numbers',
    subStrands: [
      // GRADE 1
      { id: 'g1-num-concept', title: 'Number Concept — Sorting & Grouping', grade: 1, term: 1,
        learningOutcomes: ['Sort and group objects by colour, size, shape, and texture', 'Match and pair objects from the environment', 'Compare groups using more than, less than, equal to'],
        keyInquiryQuestions: ['How do we sort things?', 'Which group has more?', 'What is the same and different?'],
        suggestedActivities: ['Sort bottle caps by colour', 'Group fruits by type at the market', 'Pair shoes and socks', 'Use sticks and stones for grouping'],
        coreCompetencies: ['Critical thinking', 'Problem solving', 'Communication'],
        values: ['Responsibility', 'Sharing', 'Cooperation'],
        resources: ['Bottle caps', 'Stones', 'Sticks', 'Fruits', 'Beads', 'Leaves'],
        assessment: ['Observation', 'Oral questions', 'Practical activity'],
        kenyanContext: 'Wanjiku sorts mangoes, oranges and bananas at Mama Njeri\'s market stall in Nyeri. She groups them by colour and size for customers.',
      },
      { id: 'g1-whole-numbers', title: 'Whole Numbers 1-50', grade: 1, term: 1,
        learningOutcomes: ['Count objects up to 50', 'Read and write numbers 1-50 in symbols and words', 'Identify place value of tens and ones', 'Count forwards and backwards'],
        keyInquiryQuestions: ['How many objects can you count?', 'What number comes after 25?', 'Can you count backwards from 20?'],
        suggestedActivities: ['Count seeds in a pod', 'Use abacus for place value', 'Number songs and rhymes', 'Skip counting on a number line'],
        coreCompetencies: ['Numeracy', 'Communication', 'Learning to learn'],
        values: ['Patience', 'Accuracy', 'Diligence'],
        resources: ['Seeds', 'Abacus', 'Number charts', 'Flash cards', 'Counter trays'],
        assessment: ['Written exercise', 'Oral counting', 'Number recognition test'],
        kenyanContext: 'Ochieng counts passengers boarding a matatu on Mombasa Road. "Kumi na mbili... kumi na tatu... 13 passengers!" The matatu is almost full!',
      },
      { id: 'g1-addition', title: 'Addition of Whole Numbers', grade: 1, term: 2,
        learningOutcomes: ['Add numbers whose sum does not exceed 20', 'Use objects to demonstrate addition', 'Write addition sentences using + and = signs', 'Solve word problems involving addition'],
        keyInquiryQuestions: ['What happens when we put things together?', 'How many do we have in total?'],
        suggestedActivities: ['Combine groups of bottle caps', 'Shopping game at pretend duka', 'Addition using fingers', 'Number bonds to 10'],
        coreCompetencies: ['Numeracy', 'Problem solving', 'Creativity'],
        values: ['Sharing', 'Honesty', 'Cooperation'],
        resources: ['Bottle caps', 'Stones', 'Number line', 'Flash cards', 'Counters'],
        assessment: ['Written sums', 'Practical demonstration', 'Word problems'],
        kenyanContext: 'At the school canteen in Eldoret, Kipchoge buys 3 mandazi and 4 samosa. How many snacks does he have? 3 + 4 = 7 snacks!',
      },
      { id: 'g1-subtraction', title: 'Subtraction of Whole Numbers', grade: 1, term: 2,
        learningOutcomes: ['Subtract numbers within 20', 'Use objects to demonstrate take away', 'Write subtraction sentences using - and = signs', 'Understand subtraction as the inverse of addition'],
        keyInquiryQuestions: ['What happens when we take away?', 'How many are left?'],
        suggestedActivities: ['Take away stones from a group', 'Sharing sweets equally', 'Subtraction stories', 'Number line jumps backwards'],
        coreCompetencies: ['Numeracy', 'Critical thinking', 'Problem solving'],
        values: ['Fairness', 'Generosity', 'Patience'],
        resources: ['Stones', 'Counters', 'Number line', 'Real objects'],
        assessment: ['Written exercise', 'Oral questions', 'Problem solving tasks'],
        kenyanContext: 'Amina has 15 groundnuts. She gives 6 to her friend Fatuma in Garissa. How many groundnuts does Amina have left? 15 - 6 = 9.',
      },
      // GRADE 2
      { id: 'g2-whole-numbers', title: 'Whole Numbers 1-100', grade: 2, term: 1,
        learningOutcomes: ['Count, read and write numbers up to 100', 'Identify place value of tens and ones up to 99', 'Compare and order numbers up to 100', 'Round off numbers to the nearest 10'],
        keyInquiryQuestions: ['Which number is greater?', 'What is the value of 5 in 54?', 'Can you arrange these numbers from smallest to largest?'],
        suggestedActivities: ['Hundred square chart activities', 'Place value using sticks and rubber bands', 'Number ordering game', 'Skip counting by 2s, 5s, and 10s'],
        coreCompetencies: ['Numeracy', 'Critical thinking', 'Self-efficacy'],
        values: ['Accuracy', 'Diligence', 'Integrity'],
        resources: ['Hundred chart', 'Sticks', 'Rubber bands', 'Number cards', 'Abacus'],
        assessment: ['Written test', 'Practical tasks', 'Oral assessment'],
        kenyanContext: 'At Maasai Market, Mama Wanjiku arranges 100 beaded bracelets in groups of 10. "Kumi, ishirini, thelathini..." She counts by tens to organize her stock.',
      },
      { id: 'g2-addition', title: 'Addition up to 99', grade: 2, term: 1,
        learningOutcomes: ['Add two-digit numbers without carrying', 'Add two-digit numbers with carrying/regrouping', 'Solve word problems involving addition', 'Check addition using subtraction'],
        keyInquiryQuestions: ['How do we add numbers with two digits?', 'What do we do when the ones column adds up to more than 9?'],
        suggestedActivities: ['Place value addition with sticks', 'Shopping activities with money', 'Mental math competitions', 'Partner problem solving'],
        coreCompetencies: ['Numeracy', 'Problem solving', 'Communication'],
        values: ['Cooperation', 'Respect', 'Patience'],
        resources: ['Place value chart', 'Play money', 'Counters', 'Workbooks'],
        assessment: ['Written sums', 'Mental math quiz', 'Word problems'],
        kenyanContext: 'Kamau\'s shamba harvested 37 bags of maize. His neighbor Otieno harvested 45 bags. Together they took 37 + 45 = 82 bags to the NCPB depot in Nakuru.',
      },
      { id: 'g2-multiplication', title: 'Multiplication — Concept & Tables', grade: 2, term: 2,
        learningOutcomes: ['Understand multiplication as repeated addition', 'Multiply using 2, 5, and 10 times tables', 'Write multiplication sentences using × and = signs', 'Solve simple word problems involving multiplication'],
        keyInquiryQuestions: ['What is a faster way to add equal groups?', 'How many legs do 4 cows have?'],
        suggestedActivities: ['Skip counting activities', 'Array models with bottle caps', 'Multiplication songs', 'Equal groups game'],
        coreCompetencies: ['Numeracy', 'Critical thinking', 'Creativity'],
        values: ['Hard work', 'Patience', 'Persistence'],
        resources: ['Bottle caps', 'Arrays', 'Multiplication charts', 'Objects for grouping'],
        assessment: ['Oral tables test', 'Written exercise', 'Practical demonstration'],
        kenyanContext: 'A boda boda stand in Kisumu has 6 motorcycles. Each motorcycle has 2 wheels. How many wheels in total? 6 × 2 = 12 wheels!',
      },
      { id: 'g2-money', title: 'Money — Kenyan Shillings', grade: 2, term: 3,
        learningOutcomes: ['Identify Kenyan coins and notes', 'Add and subtract money amounts up to KES 100', 'Make change in simple transactions', 'Appreciate the value of money and saving'],
        keyInquiryQuestions: ['What coins and notes do we use in Kenya?', 'How do we make change?', 'Why should we save money?'],
        suggestedActivities: ['Play shop with real/play money', 'Role-play buying and selling', 'Counting coins game', 'Design a savings chart'],
        coreCompetencies: ['Numeracy', 'Financial literacy', 'Self-efficacy'],
        values: ['Honesty', 'Responsibility', 'Thrift'],
        resources: ['Play money', 'Real coins', 'Price tags', 'Shop items'],
        assessment: ['Practical shopping exercise', 'Written problems', 'Oral questions'],
        kenyanContext: 'Njeri visits the local duka to buy milk for KES 50 and bread for KES 45. She gives the shopkeeper KES 100. Change = KES 100 - KES 95 = KES 5!',
      },
      // GRADE 3
      { id: 'g3-whole-numbers', title: 'Whole Numbers up to 999', grade: 3, term: 1,
        learningOutcomes: ['Count, read and write numbers up to 999', 'Identify place value of hundreds, tens and ones', 'Compare, order and round off 3-digit numbers', 'Use >, <, = symbols correctly'],
        keyInquiryQuestions: ['What is the value of each digit in 573?', 'Which is greater: 489 or 498?'],
        suggestedActivities: ['Place value with bundles of sticks', 'Number dictation', 'Ordering numbers game', 'Number puzzles'],
        coreCompetencies: ['Numeracy', 'Critical thinking', 'Digital literacy'],
        values: ['Accuracy', 'Diligence', 'Integrity'],
        resources: ['Place value chart', 'Number cards', 'Abacus', 'Workbooks'],
        assessment: ['Written test', 'Place value chart exercise', 'Number dictation'],
        kenyanContext: 'Nairobi National Park has 524 wildebeest, 318 zebras, and 127 giraffes. Which animal has the highest population? 524 > 318 > 127. Wildebeest win!',
      },
      { id: 'g3-fractions', title: 'Fractions — Halves, Quarters, Thirds', grade: 3, term: 2,
        learningOutcomes: ['Identify fractions as parts of a whole', 'Read and write ½, ¼, ¾, ⅓, ⅔', 'Compare simple fractions', 'Shade fractional parts of shapes'],
        keyInquiryQuestions: ['What is a fraction?', 'How do we share equally?', 'Which is bigger: ½ or ¼?'],
        suggestedActivities: ['Fold and cut paper into equal parts', 'Share food equally', 'Fraction walls', 'Colour fractional parts'],
        coreCompetencies: ['Numeracy', 'Critical thinking', 'Problem solving'],
        values: ['Fairness', 'Sharing', 'Equity'],
        resources: ['Paper', 'Scissors', 'Fraction strips', 'Circular cut-outs'],
        assessment: ['Shading exercise', 'Matching fractions', 'Word problems'],
        kenyanContext: 'Mama cuts a chapati into 4 equal parts for her children. Each child gets ¼ of the chapati. If 2 children eat, they\'ve eaten ½ = 2/4 of the chapati!',
      },
      { id: 'g3-division', title: 'Division — Sharing Equally', grade: 3, term: 2,
        learningOutcomes: ['Understand division as sharing equally', 'Divide numbers up to 100 by 2, 3, 4, 5, and 10', 'Write division sentences using ÷ and = signs', 'Solve word problems involving division'],
        keyInquiryQuestions: ['How do we share things equally?', 'How many groups can we make?'],
        suggestedActivities: ['Share objects equally among friends', 'Division using arrays', 'Relate multiplication and division', 'Story problems'],
        coreCompetencies: ['Numeracy', 'Problem solving', 'Communication'],
        values: ['Fairness', 'Generosity', 'Cooperation'],
        resources: ['Counters', 'Sharing trays', 'Number line', 'Workbooks'],
        assessment: ['Written division sums', 'Practical sharing', 'Word problems'],
        kenyanContext: '24 learners in Mwalimu Otieno\'s class in Migori need to form equal groups for a nature walk. If he makes 4 groups, each group has 24 ÷ 4 = 6 learners.',
      },
    ],
  },
  {
    id: 'math-measurement',
    strand: 'Measurement',
    subStrands: [
      { id: 'g1-length', title: 'Length — Comparing & Measuring', grade: 1, term: 2,
        learningOutcomes: ['Compare lengths using long/short, tall/short, thick/thin', 'Measure length using non-standard units (hand spans, strides)', 'Order objects by length'],
        keyInquiryQuestions: ['Which stick is longer?', 'How many hand spans is the desk?'],
        suggestedActivities: ['Compare heights of learners', 'Measure classroom items with hand spans', 'Arrange sticks by length', 'Outdoor measuring walk'],
        coreCompetencies: ['Numeracy', 'Problem solving', 'Creativity'],
        values: ['Accuracy', 'Patience', 'Cooperation'],
        resources: ['Sticks', 'Strings', 'Rulers', 'Objects of different lengths'],
        assessment: ['Practical measurement', 'Oral questions', 'Observation'],
        kenyanContext: 'Aisha measures the height of sunflowers in the school shamba using her hand spans. The tallest sunflower is 8 hand spans! The shortest is only 3.',
      },
      { id: 'g1-time', title: 'Time — Days & Sequencing Events', grade: 1, term: 3,
        learningOutcomes: ['Name the days of the week in order', 'Sequence daily events (morning, afternoon, evening, night)', 'Read time to the hour on a clock face'],
        keyInquiryQuestions: ['What day is today?', 'What do you do in the morning?', 'What does the clock say?'],
        suggestedActivities: ['Days of the week song', 'Daily routine chart', 'Making a paper plate clock', 'Sequencing picture cards'],
        coreCompetencies: ['Communication', 'Self-efficacy', 'Digital literacy'],
        values: ['Punctuality', 'Responsibility', 'Discipline'],
        resources: ['Calendar', 'Clock', 'Picture cards', 'Paper plates'],
        assessment: ['Oral sequencing', 'Clock reading', 'Daily routine description'],
        kenyanContext: 'Every Jumamosi (Saturday), Kamau helps his father at the farm. On Jumapili (Sunday), the family goes to church. Jumatatu (Monday) means back to school!',
      },
      { id: 'g2-mass', title: 'Mass — Heavy and Light', grade: 2, term: 1,
        learningOutcomes: ['Compare masses using heavy/light', 'Measure mass using a simple balance', 'Estimate and verify mass of objects', 'Use non-standard units to measure mass'],
        keyInquiryQuestions: ['Which is heavier?', 'How can we find out which is heavier without lifting?'],
        suggestedActivities: ['Balance scale experiments', 'Compare fruits by weight', 'Estimate then measure', 'Sort classroom items by mass'],
        coreCompetencies: ['Problem solving', 'Critical thinking', 'Self-efficacy'],
        values: ['Honesty', 'Accuracy', 'Curiosity'],
        resources: ['Balance scale', 'Stones', 'Fruits', 'Classroom objects'],
        assessment: ['Practical weighing', 'Estimation tasks', 'Oral questions'],
        kenyanContext: 'At Kongowea Market in Mombasa, traders use a balance to weigh tomatoes. 1 kg of tomatoes on one side, stones on the other. Which is heavier?',
      },
      { id: 'g2-capacity', title: 'Capacity — Full, Half, Empty', grade: 2, term: 2,
        learningOutcomes: ['Compare capacities using full, half-full, empty', 'Measure capacity using non-standard units (cups, tins)', 'Estimate and verify capacity of containers'],
        keyInquiryQuestions: ['Which container holds more water?', 'How many cups fill this jug?'],
        suggestedActivities: ['Water play activities', 'Filling and comparing containers', 'Cooking measurements', 'Capacity estimation game'],
        coreCompetencies: ['Numeracy', 'Problem solving', 'Creativity'],
        values: ['Conservation', 'Cleanliness', 'Responsibility'],
        resources: ['Containers', 'Water', 'Cups', 'Jugs', 'Bottles'],
        assessment: ['Practical measurement', 'Estimation tasks', 'Written exercise'],
        kenyanContext: 'Atieno fills the school tank with buckets of water from the borehole. It takes 20 buckets to fill the tank. Each bucket holds about 10 litres.',
      },
      { id: 'g3-standard-units', title: 'Standard Units — Metres, Kilograms, Litres', grade: 3, term: 1,
        learningOutcomes: ['Measure length in centimetres and metres', 'Measure mass in grams and kilograms', 'Measure capacity in millilitres and litres', 'Convert between simple units'],
        keyInquiryQuestions: ['How long is the classroom in metres?', 'How many grams make 1 kilogram?'],
        suggestedActivities: ['Measure classroom with metre rule', 'Weigh items on a kitchen scale', 'Read labels on products', 'Metric conversion exercises'],
        coreCompetencies: ['Numeracy', 'Digital literacy', 'Problem solving'],
        values: ['Accuracy', 'Diligence', 'Integrity'],
        resources: ['Metre rule', 'Kitchen scale', 'Measuring cups', 'Product labels'],
        assessment: ['Practical measurement tasks', 'Conversion exercises', 'Written test'],
        kenyanContext: 'The school field at Moi Primary is 50 metres long. Kipchoge can run it in 8 seconds! The distance from the gate to the classroom is 120 metres.',
      },
    ],
  },
  {
    id: 'math-geometry',
    strand: 'Geometry',
    subStrands: [
      { id: 'g1-shapes', title: '2D Shapes — Circle, Square, Triangle, Rectangle', grade: 1, term: 3,
        learningOutcomes: ['Identify and name basic 2D shapes', 'Draw basic shapes', 'Find shapes in the environment', 'Create patterns using shapes'],
        keyInquiryQuestions: ['What shapes can you see around you?', 'How many sides does a triangle have?'],
        suggestedActivities: ['Shape hunt in the classroom', 'Drawing shapes', 'Shape collage', 'Pattern making with cut-outs'],
        coreCompetencies: ['Creativity', 'Critical thinking', 'Communication'],
        values: ['Appreciation', 'Curiosity', 'Creativity'],
        resources: ['Shape cut-outs', 'Crayons', 'Paper', 'Environmental objects'],
        assessment: ['Shape identification', 'Drawing test', 'Pattern completion'],
        kenyanContext: 'The Kenyan flag has rectangles (stripes), triangles (the shield), and circles (the Maasai shield pattern). Can you find all the shapes?',
      },
      { id: 'g2-3d-shapes', title: '3D Shapes — Cube, Cuboid, Cylinder, Sphere, Cone', grade: 2, term: 2,
        learningOutcomes: ['Identify and name common 3D shapes', 'Describe properties (faces, edges, corners)', 'Relate 3D shapes to real objects', 'Distinguish between 2D and 3D shapes'],
        keyInquiryQuestions: ['What is the difference between a circle and a sphere?', 'How many faces does a cube have?'],
        suggestedActivities: ['3D shape hunt', 'Building with clay/boxes', 'Sorting 2D and 3D shapes', 'Describe and draw'],
        coreCompetencies: ['Creativity', 'Critical thinking', 'Communication'],
        values: ['Curiosity', 'Exploration', 'Teamwork'],
        resources: ['Boxes', 'Balls', 'Cans', 'Clay', 'Tins'],
        assessment: ['Identification test', 'Description task', 'Classification'],
        kenyanContext: 'A tin of Kimbo is a cylinder. A dice is a cube. A football is a sphere. Githeri is served in a cone-shaped funnel at the kiosk!',
      },
      { id: 'g3-lines-angles', title: 'Lines, Symmetry, and Simple Angles', grade: 3, term: 3,
        learningOutcomes: ['Identify straight, curved, horizontal, vertical and diagonal lines', 'Identify lines of symmetry in shapes and objects', 'Identify right angles in the environment', 'Create symmetric patterns'],
        keyInquiryQuestions: ['What is a line of symmetry?', 'Where can you see right angles?'],
        suggestedActivities: ['Fold paper to find symmetry', 'Hunt for right angles', 'Draw symmetric patterns', 'Create African art with symmetry'],
        coreCompetencies: ['Creativity', 'Critical thinking', 'Self-efficacy'],
        values: ['Appreciation of beauty', 'Creativity', 'Observation'],
        resources: ['Paper', 'Mirrors', 'Set squares', 'African pattern templates'],
        assessment: ['Pattern creation', 'Symmetry identification', 'Angle hunting'],
        kenyanContext: 'Traditional Maasai beadwork uses beautiful symmetrical patterns. The butterfly\'s wings have perfect symmetry. The corner of your desk is a right angle!',
      },
    ],
  },
];

// ============================================================
// ENVIRONMENTAL ACTIVITIES — Grade 1, 2, 3
// ============================================================
export const ENV_STRANDS: CBCStrand[] = [
  {
    id: 'env-social',
    strand: 'Social Environment',
    subStrands: [
      { id: 'g1-myself', title: 'Myself — My Body', grade: 1, term: 1,
        learningOutcomes: ['Name and point to main body parts', 'State functions of body parts', 'Appreciate own body and take care of it', 'Identify similarities and differences in people'],
        keyInquiryQuestions: ['What body parts do you have?', 'Why do we have two eyes?', 'How are we the same and different?'],
        suggestedActivities: ['Body part labelling', 'Simon Says game', 'Draw yourself', 'Mirror activity'],
        coreCompetencies: ['Self-efficacy', 'Communication', 'Creativity'],
        values: ['Self-respect', 'Appreciation', 'Love'],
        resources: ['Mirror', 'Body chart', 'Crayons', 'Paper'],
        assessment: ['Body part identification', 'Drawing', 'Oral description'],
        kenyanContext: 'Little Wambui looks in the mirror and says: "I have curly hair like Mama! I have brown eyes like Baba! I am special — there is no one else like me in all of Kenya!"',
      },
      { id: 'g1-family', title: 'My Family — Members and Roles', grade: 1, term: 1,
        learningOutcomes: ['Identify members of the nuclear and extended family', 'Describe roles of family members', 'Appreciate family members and their contributions', 'Show respect for elders'],
        keyInquiryQuestions: ['Who are the members of your family?', 'What does your mother/father do?', 'Why is family important?'],
        suggestedActivities: ['Draw your family', 'Family role-play', 'Family tree activity', 'Share stories about grandparents'],
        coreCompetencies: ['Communication', 'Self-efficacy', 'Citizenship'],
        values: ['Love', 'Respect', 'Responsibility', 'Unity'],
        resources: ['Family photos', 'Crayons', 'Paper', 'Puppets'],
        assessment: ['Family description', 'Role-play observation', 'Drawing'],
        kenyanContext: 'Odhiambo\'s family in Siaya has Baba (father), Mama (mother), Dani (grandmother), and his 3 siblings. During holidays, cousins from Nairobi visit and the homestead is full of laughter.',
      },
      { id: 'g1-school', title: 'Our School — School Environment', grade: 1, term: 2,
        learningOutcomes: ['Name different places in the school compound', 'Identify school workers and their roles', 'Follow school rules and routines', 'Keep the school environment clean'],
        keyInquiryQuestions: ['What places are in our school?', 'Who keeps our school clean?', 'Why do we have school rules?'],
        suggestedActivities: ['School tour and mapping', 'Interview school workers', 'Cleaning activity', 'Rule-making discussion'],
        coreCompetencies: ['Citizenship', 'Communication', 'Collaboration'],
        values: ['Respect', 'Responsibility', 'Cleanliness', 'Obedience'],
        resources: ['School map', 'Interview cards', 'Cleaning tools'],
        assessment: ['Map drawing', 'Oral report', 'Observation of behaviour'],
        kenyanContext: 'At Uhuru Primary School, the head teacher is Mwalimu Njoroge. The cook Mama Akinyi prepares ugali and beans for lunch. The watchman Mzee Kiprop keeps everyone safe.',
      },
      { id: 'g2-community', title: 'Our Community — People and Services', grade: 2, term: 1,
        learningOutcomes: ['Identify community helpers and their roles', 'Name services available in the community', 'Show respect for community workers', 'Practice good behaviour in the community'],
        keyInquiryQuestions: ['Who helps us in our community?', 'What services do we get?', 'How can we help our community?'],
        suggestedActivities: ['Community walk', 'Role-play community helpers', 'Draw community map', 'Thank you letters to helpers'],
        coreCompetencies: ['Citizenship', 'Communication', 'Collaboration'],
        values: ['Respect', 'Gratitude', 'Service'],
        resources: ['Community map', 'Props for role-play', 'Drawing materials'],
        assessment: ['Oral presentation', 'Community map', 'Role-play'],
        kenyanContext: 'In Nyeri town, Doctor Wangari treats sick children at the clinic. Officer Muthoni directs traffic. Mwalimu Karanja teaches at the school. All are important!',
      },
      { id: 'g3-national-symbols', title: 'Our Country — National Symbols & Heritage', grade: 3, term: 1,
        learningOutcomes: ['Identify Kenya\'s national symbols (flag, anthem, coat of arms)', 'Describe the meaning of colours on the Kenyan flag', 'Sing the national anthem', 'Appreciate cultural diversity in Kenya'],
        keyInquiryQuestions: ['What are Kenya\'s national symbols?', 'What do the flag colours represent?', 'Why is unity important?'],
        suggestedActivities: ['Draw and colour the Kenyan flag', 'Learn the national anthem', 'Cultural day celebrations', 'Research national heroes'],
        coreCompetencies: ['Citizenship', 'Communication', 'Self-efficacy'],
        values: ['Patriotism', 'Unity', 'Peace', 'National pride'],
        resources: ['Kenyan flag', 'Anthem lyrics', 'Pictures of national symbols', 'Map of Kenya'],
        assessment: ['Flag drawing', 'Anthem recitation', 'Symbol identification'],
        kenyanContext: 'Black = the people, Red = blood shed for freedom, Green = the land, White = peace. The shield and spears on the coat of arms represent defence of freedom. Harambee means pulling together!',
      },
    ],
  },
  {
    id: 'env-natural',
    strand: 'Natural Environment',
    subStrands: [
      { id: 'g1-weather', title: 'Weather — Sunny, Rainy, Cloudy, Windy', grade: 1, term: 2,
        learningOutcomes: ['Observe and describe daily weather conditions', 'Record weather using simple symbols', 'Relate weather to daily activities and clothing', 'Stay safe during bad weather'],
        keyInquiryQuestions: ['What is the weather like today?', 'What do you wear when it rains?', 'What should we do during a storm?'],
        suggestedActivities: ['Daily weather chart', 'Weather symbols drawing', 'Dressing for weather game', 'Weather songs'],
        coreCompetencies: ['Observation', 'Communication', 'Self-efficacy'],
        values: ['Safety', 'Responsibility', 'Awareness'],
        resources: ['Weather chart', 'Symbols cards', 'Umbrella', 'Sweater'],
        assessment: ['Weather recording', 'Symbol matching', 'Oral description'],
        kenyanContext: 'In Nyahururu it\'s very cold — you need a sweater! In Mombasa it\'s hot and sunny — time for light clothes! In Kisumu during April rains, carry your umbrella!',
      },
      { id: 'g1-plants', title: 'Plants Around Us', grade: 1, term: 3,
        learningOutcomes: ['Name common plants in the environment', 'Identify parts of a plant (root, stem, leaf, flower)', 'State uses of plants (food, medicine, shelter)', 'Care for plants'],
        keyInquiryQuestions: ['What plants grow near our school?', 'What are the parts of a plant?', 'How do plants help us?'],
        suggestedActivities: ['Nature walk to observe plants', 'Plant a seed and watch it grow', 'Draw and label plant parts', 'Leaf collection and art'],
        coreCompetencies: ['Observation', 'Creativity', 'Responsibility'],
        values: ['Conservation', 'Care', 'Appreciation'],
        resources: ['Seeds', 'Soil', 'Pots', 'Watering can', 'Plant specimens'],
        assessment: ['Plant part labelling', 'Planting activity', 'Oral questions'],
        kenyanContext: 'In the school shamba: maize gives us ugali, tea bushes give us chai, sukuma wiki (kale) is our favourite vegetable, and the mango tree gives sweet shade and fruit!',
      },
      { id: 'g2-animals', title: 'Animals — Domestic and Wild', grade: 2, term: 2,
        learningOutcomes: ['Classify animals as domestic or wild', 'Name common Kenyan domestic and wild animals', 'Describe characteristics and uses of animals', 'Show kindness to animals'],
        keyInquiryQuestions: ['Which animals live with people?', 'Where do wild animals live?', 'Why should we care for animals?'],
        suggestedActivities: ['Animal classification game', 'Visit to a farm/park', 'Animal sounds game', 'Draw favourite animal'],
        coreCompetencies: ['Critical thinking', 'Communication', 'Creativity'],
        values: ['Kindness', 'Compassion', 'Responsibility'],
        resources: ['Animal pictures', 'Story books', 'Videos', 'Farm visit'],
        assessment: ['Classification test', 'Drawing', 'Oral description'],
        kenyanContext: 'Domestic: ng\'ombe (cow), kuku (chicken), mbuzi (goat), mbwa (dog). Wild: simba (lion) at Maasai Mara, tembo (elephant) at Amboseli, twiga (giraffe) at Nairobi National Park.',
      },
      { id: 'g2-soil', title: 'Soil — Types and Uses', grade: 2, term: 3,
        learningOutcomes: ['Identify different types of soil (loam, clay, sand)', 'Describe characteristics of each soil type', 'State uses of different soils', 'Practice simple soil conservation'],
        keyInquiryQuestions: ['What colour is the soil near your home?', 'Which soil is best for farming?', 'How can we take care of our soil?'],
        suggestedActivities: ['Collect and compare soil samples', 'Water drainage experiment', 'Pottery with clay', 'Planting in different soils'],
        coreCompetencies: ['Observation', 'Critical thinking', 'Problem solving'],
        values: ['Conservation', 'Responsibility', 'Stewardship'],
        resources: ['Soil samples', 'Containers', 'Water', 'Seeds', 'Clay'],
        assessment: ['Soil identification', 'Experiment report', 'Oral questions'],
        kenyanContext: 'The red soil of Kiambu (loam) is perfect for growing tea and coffee. The sandy soil of the coast is great for coconut palms. The black cotton soil of Kano Plains is very fertile for rice!',
      },
      { id: 'g3-water', title: 'Water — Sources, Uses, and Conservation', grade: 3, term: 1,
        learningOutcomes: ['Identify sources of water (rain, rivers, lakes, wells, taps)', 'Describe uses of water in daily life', 'Explain ways to make water safe for drinking', 'Practice water conservation'],
        keyInquiryQuestions: ['Where does our water come from?', 'Why is clean water important?', 'How can we save water?'],
        suggestedActivities: ['Water source mapping', 'Water purification demo (boiling, filtering)', 'Water conservation poster', 'Rain harvesting project'],
        coreCompetencies: ['Critical thinking', 'Problem solving', 'Citizenship'],
        values: ['Conservation', 'Responsibility', 'Health'],
        resources: ['Water samples', 'Filter materials', 'Poster paper', 'Local water source visit'],
        assessment: ['Water source identification', 'Conservation plan', 'Poster evaluation'],
        kenyanContext: 'Lake Victoria provides water for millions. The Tana River is Kenya\'s longest. In Turkana, boreholes provide precious water. Always boil or filter water before drinking!',
      },
      { id: 'g3-water-cycle', title: 'The Water Cycle', grade: 3, term: 2,
        learningOutcomes: ['Describe the stages of the water cycle', 'Explain evaporation, condensation, and precipitation', 'Relate the water cycle to weather patterns', 'Appreciate the importance of the water cycle'],
        keyInquiryQuestions: ['Where does rain come from?', 'What happens to water in a puddle on a hot day?', 'Why does the water cycle matter?'],
        suggestedActivities: ['Water cycle diagram drawing', 'Evaporation experiment with saucer', 'Condensation on cold glass demo', 'Water cycle song'],
        coreCompetencies: ['Scientific thinking', 'Communication', 'Creativity'],
        values: ['Appreciation', 'Conservation', 'Curiosity'],
        resources: ['Saucers', 'Cold glass', 'Heat source', 'Water cycle poster'],
        assessment: ['Diagram labelling', 'Experiment observation', 'Oral explanation'],
        kenyanContext: 'Water from Lake Naivasha evaporates in the sun, forms clouds over the Aberdare Mountains, and falls as rain that flows back through rivers to the lake. The cycle never stops!',
      },
    ],
  },
  {
    id: 'env-health',
    strand: 'Health, Hygiene & Nutrition',
    subStrands: [
      { id: 'g1-personal-hygiene', title: 'Personal Hygiene — Keeping Clean', grade: 1, term: 1,
        learningOutcomes: ['Practice handwashing with soap and water', 'Brush teeth correctly morning and evening', 'Keep hair, nails, and body clean', 'Use a handkerchief/tissue when sneezing'],
        keyInquiryQuestions: ['Why do we wash our hands?', 'When should we brush our teeth?', 'What happens if we don\'t keep clean?'],
        suggestedActivities: ['Handwashing demonstration', 'Tooth brushing practice', 'Hygiene song', 'Germ experiment (glitter on hands)'],
        coreCompetencies: ['Self-efficacy', 'Responsibility', 'Health literacy'],
        values: ['Cleanliness', 'Self-care', 'Health'],
        resources: ['Soap', 'Water', 'Toothbrush', 'Towel', 'Poster'],
        assessment: ['Practical demonstration', 'Observation checklist', 'Hygiene quiz'],
        kenyanContext: 'Always wash your hands with soap: before eating ugali, after using the choo (toilet), after playing outside. 20 seconds of scrubbing keeps the germs away!',
      },
      { id: 'g1-food-groups', title: 'Common Foods & Food Groups', grade: 1, term: 2,
        learningOutcomes: ['Name common foods eaten at home', 'Group foods into energy-giving, body-building, and protective', 'Appreciate eating a balanced diet', 'Practice good eating habits'],
        keyInquiryQuestions: ['What foods do you eat at home?', 'Why do we need different types of food?'],
        suggestedActivities: ['Food sorting game', 'Draw your favourite meal', 'Balanced plate activity', 'Market visit'],
        coreCompetencies: ['Critical thinking', 'Health literacy', 'Self-efficacy'],
        values: ['Health', 'Gratitude', 'Sharing'],
        resources: ['Food pictures', 'Plates', 'Real food items', 'Chart'],
        assessment: ['Food classification', 'Balanced meal drawing', 'Oral questions'],
        kenyanContext: 'Energy-giving: ugali, chapati, rice, sweet potato. Body-building: beans, milk, eggs, fish, meat. Protective: sukuma wiki, spinach, mangoes, oranges. A balanced meal has all three!',
      },
      { id: 'g2-diseases', title: 'Common Diseases — Prevention & Safety', grade: 2, term: 2,
        learningOutcomes: ['Name common childhood diseases (malaria, diarrhea, flu, COVID)', 'Describe causes and symptoms', 'State prevention measures', 'Know when to seek medical help'],
        keyInquiryQuestions: ['What diseases affect children?', 'How can we prevent malaria?', 'What should we do when feeling sick?'],
        suggestedActivities: ['Disease prevention poster', 'Role-play: visiting the doctor', 'Mosquito net demonstration', 'Handwashing relay'],
        coreCompetencies: ['Health literacy', 'Problem solving', 'Communication'],
        values: ['Health', 'Responsibility', 'Care'],
        resources: ['Health posters', 'Mosquito net', 'Props for role-play'],
        assessment: ['Prevention plan', 'Poster creation', 'Oral quiz'],
        kenyanContext: 'Sleep under a treated mosquito net every night to prevent malaria. Wash hands to prevent diarrhea. If you feel sick, tell Mama and visit the nearest dispensary or hospital.',
      },
      { id: 'g3-balanced-diet', title: 'Balanced Diet & Meal Planning', grade: 3, term: 1,
        learningOutcomes: ['Plan a balanced meal using local foods', 'Explain the importance of each food group', 'Identify signs of poor nutrition', 'Practice good table manners'],
        keyInquiryQuestions: ['What is a balanced diet?', 'How can we plan healthy meals?', 'What are signs of poor nutrition?'],
        suggestedActivities: ['Meal planning exercise', 'Cooking demo with local foods', 'Nutrition survey', 'Food diary for a week'],
        coreCompetencies: ['Critical thinking', 'Health literacy', 'Self-efficacy'],
        values: ['Health', 'Responsibility', 'Gratitude'],
        resources: ['Food pyramid chart', 'Local foods', 'Cooking items', 'Food diary'],
        assessment: ['Meal plan', 'Food diary review', 'Nutrition quiz'],
        kenyanContext: 'Breakfast: chai with milk + bread. Lunch: githeri (maize and beans) with sukuma wiki. Dinner: ugali with fish and cabbage. Add a mango or banana for vitamins!',
      },
    ],
  },
];

// ============================================================
// LANGUAGE ACTIVITIES — English, Kiswahili (Grade 1-3)
// ============================================================
export const LANGUAGE_STRANDS: CBCStrand[] = [
  {
    id: 'eng-literacy',
    strand: 'English Language Activities',
    subStrands: [
      { id: 'g1-eng-listening', title: 'Listening & Speaking — Phonics Foundations', grade: 1, term: 1,
        learningOutcomes: ['Listen attentively to stories and instructions', 'Identify and produce letter sounds (a-z)', 'Blend CVC words (cat, mat, pin)', 'Respond to simple questions in English'],
        keyInquiryQuestions: ['What sound does the letter make?', 'Can you blend these sounds?', 'What happened in the story?'],
        suggestedActivities: ['Letter sound songs', 'CVC word building with cards', 'Story listening and retelling', 'I-Spy phonics game'],
        coreCompetencies: ['Communication', 'Creativity', 'Learning to learn'],
        values: ['Attentiveness', 'Respect', 'Participation'],
        resources: ['Letter cards', 'Story books', 'Phonics chart', 'Audio recordings'],
        assessment: ['Sound recognition', 'Blending test', 'Story comprehension'],
        kenyanContext: 'C-A-T spells cat! 🐱 M-A-P spells map! 🗺️ Today\'s story: "Njeri\'s First Day at School" — listen carefully and tell me what happened to Njeri.',
      },
      { id: 'g1-eng-reading', title: 'Reading — Simple Words & Sentences', grade: 1, term: 2,
        learningOutcomes: ['Read simple CVC and CVCC words', 'Read simple sentences with familiar words', 'Use pictures to understand stories', 'Develop a love for reading'],
        keyInquiryQuestions: ['Can you read this word?', 'What is happening in the picture?'],
        suggestedActivities: ['Guided reading groups', 'Sentence strip matching', 'Read aloud sessions', 'Library corner time'],
        coreCompetencies: ['Communication', 'Learning to learn', 'Creativity'],
        values: ['Love of reading', 'Patience', 'Curiosity'],
        resources: ['Readers (Level 1)', 'Sentence strips', 'Big books', 'Library corner'],
        assessment: ['Reading aloud', 'Word recognition', 'Comprehension questions'],
        kenyanContext: '"I see a big mango tree. Baba sits under the tree. The sun is hot. I give Baba some water." — Grade 1 reading passage set in a Kenyan homestead.',
      },
      { id: 'g2-eng-writing', title: 'Writing — Sentences & Short Paragraphs', grade: 2, term: 2,
        learningOutcomes: ['Write legible sentences using capital letters and full stops', 'Construct simple sentences from picture prompts', 'Write a short paragraph of 3-4 sentences', 'Spell common words correctly'],
        keyInquiryQuestions: ['What do you see in the picture?', 'Can you write a sentence about it?', 'Where do we use capital letters?'],
        suggestedActivities: ['Sentence building from pictures', 'Diary writing', 'Copy writing practice', 'Spelling tests'],
        coreCompetencies: ['Communication', 'Creativity', 'Self-efficacy'],
        values: ['Neatness', 'Effort', 'Creativity'],
        resources: ['Exercise books', 'Pencils', 'Picture cards', 'Word wall'],
        assessment: ['Writing task', 'Spelling test', 'Paragraph writing'],
        kenyanContext: 'Write 3 sentences about your favourite animal: "I like giraffes. Giraffes are very tall. They live in the Maasai Mara. They eat leaves from tall trees."',
      },
      { id: 'g3-eng-comprehension', title: 'Reading Comprehension & Creative Writing', grade: 3, term: 1,
        learningOutcomes: ['Read and understand a passage of 50-100 words', 'Answer comprehension questions (who, what, when, where, why)', 'Write a creative paragraph of 5-6 sentences', 'Use adjectives to describe nouns'],
        keyInquiryQuestions: ['What is the main idea of the story?', 'Can you describe the character?', 'How would you end the story differently?'],
        suggestedActivities: ['Comprehension exercises', 'Story writing', 'Book reports', 'Descriptive writing'],
        coreCompetencies: ['Communication', 'Critical thinking', 'Creativity'],
        values: ['Creativity', 'Expression', 'Critical thinking'],
        resources: ['Readers (Level 3)', 'Comprehension worksheets', 'Writing journals'],
        assessment: ['Comprehension test', 'Creative writing task', 'Oral presentation'],
        kenyanContext: 'Read this story about Kipchoge: "Eliud Kipchoge grew up in Kapsisiywa, Nandi County. He ran to school every day, 5 kilometres each way. Today, he is the fastest marathon runner in the world!"',
      },
    ],
  },
  {
    id: 'kisw-lugha',
    strand: 'Kiswahili Language Activities',
    subStrands: [
      { id: 'g1-kisw-listening', title: 'Kusikiliza na Kuzungumza — Herufi na Sauti', grade: 1, term: 1,
        learningOutcomes: ['Kusikiliza kwa makini hadithi na maagizo', 'Kutambua na kutamka herufi za Kiswahili (A-Z)', 'Kutamka silabi rahisi (ba, be, bi, bo, bu)', 'Kujibu maswali rahisi kwa Kiswahili'],
        keyInquiryQuestions: ['Herufi hii inaitwa nini?', 'Silabi hii inasemaje?', 'Hadithi ilikuwa kuhusu nini?'],
        suggestedActivities: ['Nyimbo za herufi', 'Kucheza mchezo wa silabi', 'Kusikiliza hadithi', 'Kuchora picha za herufi'],
        coreCompetencies: ['Mawasiliano', 'Ubunifu', 'Kujifunza kujifunza'],
        values: ['Makini', 'Heshima', 'Ushirikiano'],
        resources: ['Kadi za herufi', 'Vitabu vya hadithi', 'Chati ya herufi'],
        assessment: ['Kutambua herufi', 'Kutamka silabi', 'Kueleza hadithi'],
        kenyanContext: 'BA-BA spells Baba (Father)! MA-MA spells Mama! SHU-LE spells Shule (School)! Let\'s learn our Kiswahili syllables together!',
      },
      { id: 'g2-kisw-kusoma', title: 'Kusoma — Maneno na Sentensi', grade: 2, term: 1,
        learningOutcomes: ['Kusoma maneno yenye silabi mbili na tatu', 'Kusoma sentensi fupi kwa sauti', 'Kuelewa maana ya maneno mapya', 'Kupenda kusoma vitabu vya Kiswahili'],
        keyInquiryQuestions: ['Neno hili linasomekaje?', 'Sentensi hii inamaanisha nini?', 'Unaweza kueleza picha hii?'],
        suggestedActivities: ['Kusoma kwa sauti darasani', 'Mchezo wa maneno', 'Kusoma na mwenzako', 'Kuchora na kuandika'],
        coreCompetencies: ['Mawasiliano', 'Ubunifu', 'Kujifunza'],
        values: ['Kupenda kusoma', 'Bidii', 'Uvumilivu'],
        resources: ['Vitabu vya kusoma', 'Kadi za maneno', 'Picha', 'Chati'],
        assessment: ['Kusoma kwa sauti', 'Kuelewa maandishi', 'Maswali ya ufahamu'],
        kenyanContext: '"Baba anaenda shambani. Mama anapika chakula. Watoto wanacheza nje. Jua linawaka sana." — Kifungu cha kusoma darasa la pili.',
      },
      { id: 'g3-kisw-ufahamu', title: 'Ufahamu na Insha — Kuandika kwa Kiswahili', grade: 3, term: 2,
        learningOutcomes: ['Kusoma na kuelewa kifungu cha maneno 50-80', 'Kujibu maswali ya ufahamu', 'Kuandika insha fupi ya aya moja', 'Kutumia alama za uandishi (nukta, mkato, alama ya mshangao)'],
        keyInquiryQuestions: ['Hadithi hii inazungumzia nini?', 'Kwa nini wahusika walifanya hivyo?', 'Unaweza kuandika hadithi yako?'],
        suggestedActivities: ['Mazoezi ya ufahamu', 'Kuandika insha', 'Kusoma hadithi', 'Mchezo wa sarufi'],
        coreCompetencies: ['Mawasiliano', 'Fikra tunduizi', 'Ubunifu'],
        values: ['Ubunifu', 'Bidii', 'Fikra huru'],
        resources: ['Vitabu vya ufahamu', 'Daftari', 'Kalamu', 'Kamusi ndogo'],
        assessment: ['Mtihani wa ufahamu', 'Insha', 'Sarufi'],
        kenyanContext: '"Amina aliamka asubuhi na mapema. Alioga, akavaa sare yake ya shule, na akapiga mswaki. Mama alimpikia uji wa wimbi. Amina alikuwa tayari kwenda shuleni."',
      },
    ],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Get all strands for a subject */
export function getStrandsForSubject(subject: 'mathematics' | 'environmental' | 'english' | 'kiswahili'): CBCStrand[] {
  switch (subject) {
    case 'mathematics': return MATH_STRANDS;
    case 'environmental': return ENV_STRANDS;
    case 'english': return LANGUAGE_STRANDS.filter(s => s.id === 'eng-literacy');
    case 'kiswahili': return LANGUAGE_STRANDS.filter(s => s.id === 'kisw-lugha');
    default: return [];
  }
}

/** Get all sub-strands for a specific grade */
export function getSubStrandsForGrade(grade: 1 | 2 | 3, subject?: string): CBCSubStrand[] {
  const allStrands = [...MATH_STRANDS, ...ENV_STRANDS, ...LANGUAGE_STRANDS];
  const filtered = subject
    ? getStrandsForSubject(subject as any)
    : allStrands;
  return filtered.flatMap(s => s.subStrands.filter(ss => ss.grade === grade));
}

/** Get all sub-strands for a specific grade and term */
export function getSubStrandsForGradeAndTerm(grade: 1 | 2 | 3, term: 1 | 2 | 3): CBCSubStrand[] {
  const allStrands = [...MATH_STRANDS, ...ENV_STRANDS, ...LANGUAGE_STRANDS];
  return allStrands.flatMap(s => s.subStrands.filter(ss => ss.grade === grade && ss.term === term));
}

/** Get total count of all sub-strands in the encyclopedia */
export function getEncyclopediaStats() {
  const allStrands = [...MATH_STRANDS, ...ENV_STRANDS, ...LANGUAGE_STRANDS];
  const allSubStrands = allStrands.flatMap(s => s.subStrands);
  return {
    totalStrands: allStrands.length,
    totalSubStrands: allSubStrands.length,
    totalLearningOutcomes: allSubStrands.reduce((sum, ss) => sum + ss.learningOutcomes.length, 0),
    totalActivities: allSubStrands.reduce((sum, ss) => sum + ss.suggestedActivities.length, 0),
    totalInquiryQuestions: allSubStrands.reduce((sum, ss) => sum + ss.keyInquiryQuestions.length, 0),
    byGrade: {
      grade1: allSubStrands.filter(ss => ss.grade === 1).length,
      grade2: allSubStrands.filter(ss => ss.grade === 2).length,
      grade3: allSubStrands.filter(ss => ss.grade === 3).length,
    },
    bySubject: {
      mathematics: MATH_STRANDS.flatMap(s => s.subStrands).length,
      environmental: ENV_STRANDS.flatMap(s => s.subStrands).length,
      english: LANGUAGE_STRANDS.filter(s => s.id === 'eng-literacy').flatMap(s => s.subStrands).length,
      kiswahili: LANGUAGE_STRANDS.filter(s => s.id === 'kisw-lugha').flatMap(s => s.subStrands).length,
    },
  };
}

/** Search encyclopedia by keyword */
export function searchEncyclopedia(query: string): CBCSubStrand[] {
  const q = query.toLowerCase();
  const allStrands = [...MATH_STRANDS, ...ENV_STRANDS, ...LANGUAGE_STRANDS];
  return allStrands.flatMap(s => s.subStrands.filter(ss =>
    ss.title.toLowerCase().includes(q) ||
    ss.kenyanContext.toLowerCase().includes(q) ||
    ss.learningOutcomes.some(lo => lo.toLowerCase().includes(q)) ||
    ss.suggestedActivities.some(a => a.toLowerCase().includes(q))
  ));
}
