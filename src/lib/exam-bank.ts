// ============================================================
// RoboKid Platform — KNEC-Aligned Exam Bank
// Kenya Early Years Assessment (KEYA) Practice Questions
// Grade 1-3 Mathematics, Environmental, English, Kiswahili
// ============================================================

import type { ExamQuestion, Grade, Subject } from '@/types';

export const examQuestions: ExamQuestion[] = [

  // ==========================================
  // GRADE 1 — MATHEMATICS
  // ==========================================
  {
    id: 'g1m001', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Wanjiku has 3 mangoes. Her mother gives her 2 more. How many mangoes does Wanjiku have now?',
    options: ['4', '5', '6', '3'],
    correctAnswer: '5',
    explanation: '3 mangoes + 2 more mangoes = 5 mangoes in total.',
    difficulty: 'easy', term: 1, strand: 'Addition',
    kenyanContext: 'A girl receiving mangoes from her mother at home',
  },
  {
    id: 'g1m002', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Count the passengers in the matatu: 🧑🧑🧑🧑🧑🧑🧑. How many passengers are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: 'Count each person carefully: 1, 2, 3, 4, 5, 6, 7. There are 7 passengers.',
    difficulty: 'easy', term: 1, strand: 'Counting',
    kenyanContext: 'Counting passengers in a matatu',
  },
  {
    id: 'g1m003', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Ochieng has 8 cows. He sells 3 cows at the market. How many cows are left?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '8 cows - 3 cows sold = 5 cows remaining.',
    difficulty: 'easy', term: 1, strand: 'Subtraction',
    kenyanContext: 'A farmer selling cows at the livestock market',
  },
  {
    id: 'g1m004', grade: 1, subject: 'mathematics', type: 'fill_blank',
    question: 'What number comes after 15? ___',
    correctAnswer: '16',
    explanation: 'When counting: 14, 15, 16. The number after 15 is 16.',
    difficulty: 'easy', term: 1, strand: 'Number Sequence',
  },
  {
    id: 'g1m005', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Which shape has 3 sides and 3 corners?',
    options: ['Circle', 'Triangle', 'Rectangle', 'Square'],
    correctAnswer: 'Triangle',
    explanation: 'A triangle has exactly 3 sides and 3 corners (vertices).',
    difficulty: 'easy', term: 2, strand: 'Shapes',
  },
  {
    id: 'g1m006', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Amina has 4 bananas and Fatuma has 6 bananas. How many bananas do they have together?',
    options: ['8', '9', '10', '11'],
    correctAnswer: '10',
    explanation: '4 bananas + 6 bananas = 10 bananas.',
    difficulty: 'medium', term: 1, strand: 'Addition',
    kenyanContext: 'Two girls combining their fruits',
  },
  {
    id: 'g1m007', grade: 1, subject: 'mathematics', type: 'true_false',
    question: 'A circle has 4 sides. True or False?',
    correctAnswer: 'False',
    explanation: 'A circle has no sides — it is a curved shape.',
    difficulty: 'easy', term: 2, strand: 'Shapes',
  },
  {
    id: 'g1m008', grade: 1, subject: 'mathematics', type: 'fill_blank',
    question: '5 + ___ = 9',
    correctAnswer: '4',
    explanation: 'We need to find what adds to 5 to make 9. Since 5 + 4 = 9, the answer is 4.',
    difficulty: 'medium', term: 1, strand: 'Addition',
  },
  {
    id: 'g1m009', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'Which is longer: a pencil or the school bus?',
    options: ['The pencil', 'The school bus', 'They are the same', 'Cannot tell'],
    correctAnswer: 'The school bus',
    explanation: 'A school bus is much longer than a pencil.',
    difficulty: 'easy', term: 2, strand: 'Measurement',
  },
  {
    id: 'g1m010', grade: 1, subject: 'mathematics', type: 'multiple_choice',
    question: 'What is the next number in the pattern: 2, 4, 6, 8, ___?',
    options: ['9', '10', '11', '12'],
    correctAnswer: '10',
    explanation: 'This is counting by 2s (skip counting). After 8 comes 10.',
    difficulty: 'medium', term: 3, strand: 'Patterns',
  },

  // ==========================================
  // GRADE 1 — ENVIRONMENTAL ACTIVITIES
  // ==========================================
  {
    id: 'g1e001', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'Which of these is a good hygiene practice?',
    options: ['Eating with dirty hands', 'Washing hands with soap before eating', 'Sharing a toothbrush', 'Not bathing for a week'],
    correctAnswer: 'Washing hands with soap before eating',
    explanation: 'Washing hands with soap removes germs and prevents diseases.',
    difficulty: 'easy', term: 1, strand: 'Personal Hygiene',
  },
  {
    id: 'g1e002', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'Which animal is a domestic animal found in many Kenyan farms?',
    options: ['Lion', 'Cow', 'Elephant', 'Giraffe'],
    correctAnswer: 'Cow',
    explanation: 'A cow is a domestic animal kept at home for milk and meat. Lions, elephants, and giraffes are wild animals.',
    difficulty: 'easy', term: 3, strand: 'Animals',
    kenyanContext: 'Farm animals in Kenya',
  },
  {
    id: 'g1e003', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'Ugali is made from which crop?',
    options: ['Rice', 'Maize', 'Wheat', 'Millet'],
    correctAnswer: 'Maize',
    explanation: 'Ugali, Kenya\'s staple food, is made from maize flour (unga wa mahindi).',
    difficulty: 'easy', term: 2, strand: 'Food',
    kenyanContext: 'Understanding the source of Kenya\'s staple food',
  },
  {
    id: 'g1e004', grade: 1, subject: 'environmental', type: 'true_false',
    question: 'Plants need water and sunlight to grow. True or False?',
    correctAnswer: 'True',
    explanation: 'All plants need water, sunlight, and air to grow healthy.',
    difficulty: 'easy', term: 2, strand: 'Plants',
  },
  {
    id: 'g1e005', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'What type of weather makes us carry an umbrella?',
    options: ['Sunny', 'Windy', 'Rainy', 'Hot'],
    correctAnswer: 'Rainy',
    explanation: 'We carry an umbrella when it rains to keep us dry.',
    difficulty: 'easy', term: 3, strand: 'Weather',
  },
  {
    id: 'g1e006', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'Which part of the body do we use to see?',
    options: ['Ears', 'Nose', 'Eyes', 'Mouth'],
    correctAnswer: 'Eyes',
    explanation: 'We use our eyes to see. Our ears are for hearing, nose for smelling, and mouth for eating and speaking.',
    difficulty: 'easy', term: 1, strand: 'Body Parts',
  },
  {
    id: 'g1e007', grade: 1, subject: 'environmental', type: 'multiple_choice',
    question: 'Which food helps build strong bones and teeth?',
    options: ['Sweets', 'Milk', 'Soda', 'Chips'],
    correctAnswer: 'Milk',
    explanation: 'Milk contains calcium which helps build strong bones and teeth.',
    difficulty: 'easy', term: 2, strand: 'Nutrition',
  },
  {
    id: 'g1e008', grade: 1, subject: 'environmental', type: 'true_false',
    question: 'We should brush our teeth only once a week. True or False?',
    correctAnswer: 'False',
    explanation: 'We should brush our teeth at least twice a day — in the morning and before bed.',
    difficulty: 'easy', term: 1, strand: 'Personal Hygiene',
  },

  // ==========================================
  // GRADE 1 — ENGLISH LANGUAGE
  // ==========================================
  {
    id: 'g1en001', grade: 1, subject: 'english', type: 'multiple_choice',
    question: 'Which letter makes the sound /m/?',
    options: ['N', 'M', 'B', 'P'],
    correctAnswer: 'M',
    explanation: 'The letter M makes the /m/ sound, as in "mama" and "mango".',
    difficulty: 'easy', term: 1, strand: 'Phonics',
  },
  {
    id: 'g1en002', grade: 1, subject: 'english', type: 'fill_blank',
    question: 'The c_t sat on the mat.',
    correctAnswer: 'a',
    explanation: 'The word is "cat" — a CVC (consonant-vowel-consonant) word.',
    difficulty: 'easy', term: 1, strand: 'Reading',
  },
  {
    id: 'g1en003', grade: 1, subject: 'english', type: 'multiple_choice',
    question: 'What is the correct greeting in the morning?',
    options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'],
    correctAnswer: 'Good morning',
    explanation: 'We say "Good morning" when we meet someone in the morning.',
    difficulty: 'easy', term: 1, strand: 'Speaking',
  },
  {
    id: 'g1en004', grade: 1, subject: 'english', type: 'multiple_choice',
    question: 'Which word rhymes with "cat"?',
    options: ['Dog', 'Bat', 'Cup', 'Car'],
    correctAnswer: 'Bat',
    explanation: '"Cat" and "bat" both end with the "-at" sound, so they rhyme.',
    difficulty: 'easy', term: 1, strand: 'Phonics',
  },
  {
    id: 'g1en005', grade: 1, subject: 'english', type: 'true_false',
    question: 'Every sentence starts with a capital letter. True or False?',
    correctAnswer: 'True',
    explanation: 'Yes! Every sentence must begin with a capital (uppercase) letter.',
    difficulty: 'easy', term: 2, strand: 'Writing',
  },

  // ==========================================
  // GRADE 2 — MATHEMATICS
  // ==========================================
  {
    id: 'g2m001', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'Kamau bought bread for KES 50 and milk for KES 30. How much did he spend in total?',
    options: ['KES 60', 'KES 70', 'KES 80', 'KES 90'],
    correctAnswer: 'KES 80',
    explanation: 'KES 50 + KES 30 = KES 80.',
    difficulty: 'easy', term: 1, strand: 'Addition',
    kenyanContext: 'Shopping at a local duka using Kenya Shillings',
  },
  {
    id: 'g2m002', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'A matatu had 45 passengers. At Westlands, 18 passengers got off. How many passengers are still in the matatu?',
    options: ['23', '25', '27', '29'],
    correctAnswer: '27',
    explanation: '45 - 18 = 27 passengers remain.',
    difficulty: 'medium', term: 1, strand: 'Subtraction',
    kenyanContext: 'Matatu passengers along a Nairobi route',
  },
  {
    id: 'g2m003', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'What is the place value of 4 in the number 47?',
    options: ['4 ones', '4 tens', '4 hundreds', '47'],
    correctAnswer: '4 tens',
    explanation: 'In the number 47, the digit 4 is in the tens place. It represents 40.',
    difficulty: 'medium', term: 1, strand: 'Place Value',
  },
  {
    id: 'g2m004', grade: 2, subject: 'mathematics', type: 'fill_blank',
    question: '3 × 5 = ___',
    correctAnswer: '15',
    explanation: '3 groups of 5: 5 + 5 + 5 = 15.',
    difficulty: 'easy', term: 2, strand: 'Multiplication',
  },
  {
    id: 'g2m005', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'Which Kenyan coin has the smallest value?',
    options: ['KES 1', 'KES 5', 'KES 10', 'KES 20'],
    correctAnswer: 'KES 1',
    explanation: 'The 1 shilling coin has the smallest value among these coins.',
    difficulty: 'easy', term: 2, strand: 'Money',
    kenyanContext: 'Understanding Kenyan currency',
  },
  {
    id: 'g2m006', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'What time does the clock show when the short hand points to 8 and the long hand points to 12?',
    options: ['12:08', '8:00', '8:12', '12:00'],
    correctAnswer: '8:00',
    explanation: 'When the short (hour) hand points to 8 and the long (minute) hand points to 12, it is 8 o\'clock.',
    difficulty: 'medium', term: 3, strand: 'Time',
  },
  {
    id: 'g2m007', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'Chebet has 2 bags of oranges. Each bag has 10 oranges. How many oranges does she have?',
    options: ['12', '15', '20', '22'],
    correctAnswer: '20',
    explanation: '2 bags × 10 oranges = 20 oranges total.',
    difficulty: 'easy', term: 2, strand: 'Multiplication',
    kenyanContext: 'Girl carrying bags of oranges from the farm',
  },
  {
    id: 'g2m008', grade: 2, subject: 'mathematics', type: 'fill_blank',
    question: '56 + 34 = ___',
    correctAnswer: '90',
    explanation: 'Add the ones: 6 + 4 = 10 (write 0, carry 1). Add the tens: 5 + 3 + 1 = 9. Answer: 90.',
    difficulty: 'medium', term: 1, strand: 'Addition',
  },
  {
    id: 'g2m009', grade: 2, subject: 'mathematics', type: 'multiple_choice',
    question: 'Nafula paid KES 100 for a book that costs KES 65. How much change should she receive?',
    options: ['KES 25', 'KES 30', 'KES 35', 'KES 45'],
    correctAnswer: 'KES 35',
    explanation: 'KES 100 - KES 65 = KES 35 change.',
    difficulty: 'medium', term: 2, strand: 'Money',
    kenyanContext: 'Shopping at a bookshop and calculating change',
  },
  {
    id: 'g2m010', grade: 2, subject: 'mathematics', type: 'true_false',
    question: '73 is greater than 37. True or False?',
    correctAnswer: 'True',
    explanation: '73 has 7 tens while 37 has 3 tens. Since 7 tens > 3 tens, 73 > 37.',
    difficulty: 'easy', term: 1, strand: 'Place Value',
  },

  // ==========================================
  // GRADE 2 — ENVIRONMENTAL ACTIVITIES
  // ==========================================
  {
    id: 'g2e001', grade: 2, subject: 'environmental', type: 'multiple_choice',
    question: 'Which of these is a source of water in Kenya?',
    options: ['Television', 'River', 'Chair', 'Book'],
    correctAnswer: 'River',
    explanation: 'Rivers (like Tana, Athi, and Nzoia) are important sources of water in Kenya.',
    difficulty: 'easy', term: 1, strand: 'Water',
    kenyanContext: 'Rivers as water sources in Kenya',
  },
  {
    id: 'g2e002', grade: 2, subject: 'environmental', type: 'multiple_choice',
    question: 'Which food group does ugali belong to?',
    options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Fats'],
    correctAnswer: 'Carbohydrates',
    explanation: 'Ugali is made from maize flour, which is rich in carbohydrates that give us energy.',
    difficulty: 'easy', term: 1, strand: 'Nutrition',
    kenyanContext: 'Classification of Kenya\'s staple food',
  },
  {
    id: 'g2e003', grade: 2, subject: 'environmental', type: 'multiple_choice',
    question: 'Where do flamingos live in Kenya?',
    options: ['Mount Kenya', 'Lake Nakuru', 'Nairobi City', 'The desert'],
    correctAnswer: 'Lake Nakuru',
    explanation: 'Lake Nakuru is famous for millions of flamingos that live along its shores.',
    difficulty: 'easy', term: 2, strand: 'Animal Habitats',
    kenyanContext: 'Kenya\'s iconic flamingo population',
  },
  {
    id: 'g2e004', grade: 2, subject: 'environmental', type: 'multiple_choice',
    question: 'Which type of soil is best for farming?',
    options: ['Sandy soil', 'Loam soil', 'Rocky soil', 'Clay soil'],
    correctAnswer: 'Loam soil',
    explanation: 'Loam soil is the best for farming because it holds water well and allows roots to grow easily.',
    difficulty: 'medium', term: 2, strand: 'Soil',
  },
  {
    id: 'g2e005', grade: 2, subject: 'environmental', type: 'multiple_choice',
    question: 'How can we prevent malaria?',
    options: ['Eating more food', 'Sleeping under a mosquito net', 'Drinking soda', 'Watching television'],
    correctAnswer: 'Sleeping under a mosquito net',
    explanation: 'Mosquito nets prevent mosquitoes from biting us at night, which helps prevent malaria.',
    difficulty: 'easy', term: 3, strand: 'Disease Prevention',
    kenyanContext: 'Malaria prevention in Kenya',
  },
  {
    id: 'g2e006', grade: 2, subject: 'environmental', type: 'true_false',
    question: 'Beans are a good source of proteins. True or False?',
    correctAnswer: 'True',
    explanation: 'Beans (including nyayo beans and kidney beans) are excellent plant-based sources of protein.',
    difficulty: 'easy', term: 1, strand: 'Nutrition',
    kenyanContext: 'Beans commonly grown and eaten in Kenya',
  },

  // ==========================================
  // GRADE 2 — ENGLISH LANGUAGE
  // ==========================================
  {
    id: 'g2en001', grade: 2, subject: 'english', type: 'multiple_choice',
    question: 'Read: "Atieno went to the market to buy tomatoes." Who went to the market?',
    options: ['The teacher', 'Atieno', 'Tomatoes', 'The market'],
    correctAnswer: 'Atieno',
    explanation: 'The sentence says "Atieno went to the market." So Atieno is the person who went.',
    difficulty: 'easy', term: 1, strand: 'Comprehension',
    kenyanContext: 'A girl shopping at the market',
  },
  {
    id: 'g2en002', grade: 2, subject: 'english', type: 'fill_blank',
    question: 'The dog ___ (is/are) playing in the garden.',
    correctAnswer: 'is',
    explanation: '"The dog" is singular (one dog), so we use "is" — "The dog is playing."',
    difficulty: 'easy', term: 2, strand: 'Grammar',
  },
  {
    id: 'g2en003', grade: 2, subject: 'english', type: 'multiple_choice',
    question: 'Which sentence is written correctly?',
    options: ['the boy ran fast.', 'The boy ran fast.', 'the Boy Ran fast.', 'THE BOY RAN FAST.'],
    correctAnswer: 'The boy ran fast.',
    explanation: 'A sentence starts with a capital letter and ends with a full stop.',
    difficulty: 'easy', term: 2, strand: 'Writing',
  },

  // ==========================================
  // GRADE 2 — KISWAHILI
  // ==========================================
  {
    id: 'g2k001', grade: 2, subject: 'kiswahili', type: 'multiple_choice',
    question: 'Soma: "Mwangi alikwenda shuleni asubuhi." Mwangi alikwenda wapi?',
    options: ['Nyumbani', 'Sokoni', 'Shuleni', 'Kanisani'],
    correctAnswer: 'Shuleni',
    explanation: 'Sentensi inasema "Mwangi alikwenda shuleni." Kwa hivyo, Mwangi alikwenda shuleni.',
    difficulty: 'easy', term: 1, strand: 'Ufahamu',
    kenyanContext: 'Mvulana akienda shuleni asubuhi',
  },
  {
    id: 'g2k002', grade: 2, subject: 'kiswahili', type: 'fill_blank',
    question: 'Mama ana___ (pika/lala) chakula jikoni.',
    correctAnswer: 'pika',
    explanation: '"Mama anapika chakula jikoni" maana yake ni mama anatengeneza chakula.',
    difficulty: 'easy', term: 2, strand: 'Kuandika',
  },
  {
    id: 'g2k003', grade: 2, subject: 'kiswahili', type: 'multiple_choice',
    question: 'Neno "nyumba" linamaanisha nini kwa Kiingereza?',
    options: ['School', 'House', 'Market', 'Church'],
    correctAnswer: 'House',
    explanation: '"Nyumba" kwa Kiingereza ni "house" — mahali tunapoishi.',
    difficulty: 'easy', term: 1, strand: 'Msamiati',
  },

  // ==========================================
  // GRADE 3 — MATHEMATICS
  // ==========================================
  {
    id: 'g3m001', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'A farmer in Nakuru harvested 456 bags of potatoes and 278 bags of cabbages. How many bags did the farmer harvest in total?',
    options: ['634', '724', '734', '744'],
    correctAnswer: '734',
    explanation: '456 + 278: Ones: 6+8=14 (write 4, carry 1). Tens: 5+7+1=13 (write 3, carry 1). Hundreds: 4+2+1=7. Answer: 734.',
    difficulty: 'medium', term: 1, strand: 'Addition',
    kenyanContext: 'A farmer harvesting crops in Nakuru',
  },
  {
    id: 'g3m002', grade: 3, subject: 'mathematics', type: 'fill_blank',
    question: '7 × 4 = ___',
    correctAnswer: '28',
    explanation: '7 × 4 = 28. Remember the multiplication table: 7, 14, 21, 28.',
    difficulty: 'easy', term: 1, strand: 'Multiplication',
  },
  {
    id: 'g3m003', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: '24 mandazi are shared equally among 6 children. How many mandazi does each child get?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '24 ÷ 6 = 4. Each child gets 4 mandazi.',
    difficulty: 'easy', term: 2, strand: 'Division',
    kenyanContext: 'Children sharing mandazi at break time',
  },
  {
    id: 'g3m004', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'Achieng cut a watermelon into 4 equal pieces. She ate 1 piece. What fraction of the watermelon did she eat?',
    options: ['½', '⅓', '¼', '⅕'],
    correctAnswer: '¼',
    explanation: 'The watermelon was cut into 4 equal pieces. Eating 1 out of 4 pieces = ¼ (one quarter).',
    difficulty: 'easy', term: 2, strand: 'Fractions',
    kenyanContext: 'A girl sharing a watermelon',
  },
  {
    id: 'g3m005', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'Hassan went shopping with KES 500. He bought sugar for KES 180 and flour for KES 150. How much money does he have left?',
    options: ['KES 130', 'KES 150', 'KES 170', 'KES 180'],
    correctAnswer: 'KES 170',
    explanation: 'Total spent: KES 180 + KES 150 = KES 330. Remaining: KES 500 - KES 330 = KES 170.',
    difficulty: 'medium', term: 2, strand: 'Money',
    kenyanContext: 'Shopping at a Kenyan supermarket',
  },
  {
    id: 'g3m006', grade: 3, subject: 'mathematics', type: 'fill_blank',
    question: 'In the number 385, the digit 8 is in the ___ place.',
    correctAnswer: 'tens',
    explanation: 'In 385: 3 is in the hundreds place, 8 is in the tens place, 5 is in the ones place.',
    difficulty: 'easy', term: 1, strand: 'Place Value',
  },
  {
    id: 'g3m007', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'A water container holds 5 litres. How many litres do 3 containers hold?',
    options: ['8 litres', '10 litres', '15 litres', '20 litres'],
    correctAnswer: '15 litres',
    explanation: '3 containers × 5 litres each = 15 litres total.',
    difficulty: 'easy', term: 3, strand: 'Measurement',
  },
  {
    id: 'g3m008', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'Which number is the greatest: 562, 625, 256, 652?',
    options: ['562', '625', '256', '652'],
    correctAnswer: '652',
    explanation: 'Compare hundreds first: 652 has 6 hundreds, same as 625. Compare tens: 652 has 5 tens, 625 has 2 tens. So 652 > 625 > 562 > 256.',
    difficulty: 'medium', term: 1, strand: 'Place Value',
  },
  {
    id: 'g3m009', grade: 3, subject: 'mathematics', type: 'fill_blank',
    question: '36 ÷ 9 = ___',
    correctAnswer: '4',
    explanation: '36 ÷ 9 = 4, because 9 × 4 = 36.',
    difficulty: 'easy', term: 2, strand: 'Division',
  },
  {
    id: 'g3m010', grade: 3, subject: 'mathematics', type: 'multiple_choice',
    question: 'Kipchoge runs 3 kilometres every day. How many kilometres does he run in 5 days?',
    options: ['8 km', '12 km', '15 km', '18 km'],
    correctAnswer: '15 km',
    explanation: '3 km × 5 days = 15 km. Kipchoge the runner!',
    difficulty: 'easy', term: 1, strand: 'Multiplication',
    kenyanContext: 'Named after Kenya\'s marathon hero Eliud Kipchoge',
  },

  // ==========================================
  // GRADE 3 — ENVIRONMENTAL ACTIVITIES
  // ==========================================
  {
    id: 'g3e001', grade: 3, subject: 'environmental', type: 'multiple_choice',
    question: 'Which Kenyan conservationist started the Green Belt Movement to plant trees?',
    options: ['Jomo Kenyatta', 'Wangari Maathai', 'Lupita Nyong\'o', 'Eliud Kipchoge'],
    correctAnswer: 'Wangari Maathai',
    explanation: 'Professor Wangari Maathai founded the Green Belt Movement in 1977 and won the Nobel Peace Prize in 2004.',
    difficulty: 'easy', term: 2, strand: 'Conservation',
    kenyanContext: 'Kenya\'s Nobel Peace Prize winner',
  },
  {
    id: 'g3e002', grade: 3, subject: 'environmental', type: 'multiple_choice',
    question: 'What are the three stages of the water cycle in order?',
    options: [
      'Condensation, Precipitation, Evaporation',
      'Evaporation, Condensation, Precipitation',
      'Precipitation, Evaporation, Condensation',
      'Evaporation, Precipitation, Condensation',
    ],
    correctAnswer: 'Evaporation, Condensation, Precipitation',
    explanation: 'Water evaporates (rises as vapor), condenses (forms clouds), and precipitates (falls as rain).',
    difficulty: 'medium', term: 1, strand: 'Water Cycle',
  },
  {
    id: 'g3e003', grade: 3, subject: 'environmental', type: 'multiple_choice',
    question: 'Which method of soil conservation involves building steps on a hillside?',
    options: ['Mulching', 'Terracing', 'Crop rotation', 'Irrigation'],
    correctAnswer: 'Terracing',
    explanation: 'Terracing creates step-like levels on hillsides to prevent soil erosion. Common in the Kenyan highlands.',
    difficulty: 'medium', term: 1, strand: 'Soil Conservation',
    kenyanContext: 'Terracing in the central highlands tea farms',
  },
  {
    id: 'g3e004', grade: 3, subject: 'environmental', type: 'multiple_choice',
    question: 'Which disease is spread by mosquitoes?',
    options: ['Typhoid', 'Cholera', 'Malaria', 'Flu'],
    correctAnswer: 'Malaria',
    explanation: 'Malaria is caused by parasites transmitted through the bite of infected Anopheles mosquitoes.',
    difficulty: 'easy', term: 3, strand: 'Disease Prevention',
  },
  {
    id: 'g3e005', grade: 3, subject: 'environmental', type: 'true_false',
    question: 'The 3 Rs of waste management are Reduce, Reuse, and Recycle. True or False?',
    correctAnswer: 'True',
    explanation: 'The 3Rs — Reduce, Reuse, Recycle — help us manage waste and protect the environment.',
    difficulty: 'easy', term: 2, strand: 'Conservation',
  },

  // ==========================================
  // GRADE 3 — ENGLISH LANGUAGE
  // ==========================================
  {
    id: 'g3en001', grade: 3, subject: 'english', type: 'multiple_choice',
    question: 'Read: "The tall giraffe ate leaves from the acacia tree." Which word is an adjective?',
    options: ['giraffe', 'ate', 'tall', 'tree'],
    correctAnswer: 'tall',
    explanation: '"Tall" is an adjective — it describes the giraffe (tells us about its height).',
    difficulty: 'easy', term: 2, strand: 'Parts of Speech',
  },
  {
    id: 'g3en002', grade: 3, subject: 'english', type: 'multiple_choice',
    question: 'Which word is a verb (action word)?',
    options: ['Beautiful', 'Running', 'Elephant', 'Kenya'],
    correctAnswer: 'Running',
    explanation: '"Running" is a verb — it describes an action (what someone is doing).',
    difficulty: 'easy', term: 2, strand: 'Parts of Speech',
  },
  {
    id: 'g3en003', grade: 3, subject: 'english', type: 'multiple_choice',
    question: 'Read the passage: "Nyambura woke up early. She brushed her teeth and ate breakfast. Then she walked to school." What did Nyambura do first?',
    options: ['Walked to school', 'Ate breakfast', 'Woke up early', 'Brushed her teeth'],
    correctAnswer: 'Woke up early',
    explanation: 'The passage tells events in order. First, Nyambura woke up early.',
    difficulty: 'easy', term: 1, strand: 'Comprehension',
    kenyanContext: 'A girl\'s morning routine before school',
  },
  {
    id: 'g3en004', grade: 3, subject: 'english', type: 'fill_blank',
    question: 'The children ___ (was/were) playing football.',
    correctAnswer: 'were',
    explanation: '"Children" is plural (more than one), so we use "were" — "The children were playing."',
    difficulty: 'easy', term: 2, strand: 'Grammar',
  },
  {
    id: 'g3en005', grade: 3, subject: 'english', type: 'multiple_choice',
    question: 'Which is the best title for this story: "The boy found a lost puppy. He gave it food and water. He took it home and named it Simba."',
    options: ['The Lost Puppy', 'The Boy Who Ate Food', 'Going to School', 'The Big House'],
    correctAnswer: 'The Lost Puppy',
    explanation: 'The story is mainly about a boy who found and rescued a lost puppy, so "The Lost Puppy" is the best title.',
    difficulty: 'medium', term: 3, strand: 'Comprehension',
    kenyanContext: 'Naming a puppy "Simba" (lion in Kiswahili)',
  },

  // ==========================================
  // GRADE 3 — KISWAHILI
  // ==========================================
  {
    id: 'g3k001', grade: 3, subject: 'kiswahili', type: 'multiple_choice',
    question: 'Soma: "Mti mrefu ulianguka kwa sababu ya upepo mkali." Neno "mrefu" ni aina gani ya neno?',
    options: ['Nomino', 'Kitenzi', 'Kivumishi', 'Kielezi'],
    correctAnswer: 'Kivumishi',
    explanation: '"Mrefu" ni kivumishi — kinaelezea nomino "mti" (kinatuambia jinsi mti ulivyo).',
    difficulty: 'medium', term: 2, strand: 'Sarufi',
  },
  {
    id: 'g3k002', grade: 3, subject: 'kiswahili', type: 'multiple_choice',
    question: 'Katika sentensi "Watoto walicheza mpira," neno "walicheza" ni nini?',
    options: ['Nomino', 'Kitenzi', 'Kivumishi', 'Kihusishi'],
    correctAnswer: 'Kitenzi',
    explanation: '"Walicheza" ni kitenzi — kinaonyesha kitendo (action) kilichofanywa.',
    difficulty: 'easy', term: 2, strand: 'Sarufi',
  },
  {
    id: 'g3k003', grade: 3, subject: 'kiswahili', type: 'fill_blank',
    question: 'Jomo Kenyatta alikuwa rais wa ___ wa Kenya.',
    correctAnswer: 'kwanza',
    explanation: 'Jomo Kenyatta alikuwa rais wa kwanza (first president) wa Kenya.',
    difficulty: 'easy', term: 1, strand: 'Ufahamu',
    kenyanContext: 'Kenya\'s first president and national history',
  },
];

/** Get questions by grade */
export function getQuestionsByGrade(grade: Grade): ExamQuestion[] {
  return examQuestions.filter(q => q.grade === grade);
}

/** Get questions by grade and subject */
export function getQuestionsByGradeAndSubject(grade: Grade, subject: Subject): ExamQuestion[] {
  return examQuestions.filter(q => q.grade === grade && q.subject === subject);
}

/** Get random questions for an exam session */
export function getRandomQuestions(grade: Grade, subject: Subject, count: number): ExamQuestion[] {
  const available = getQuestionsByGradeAndSubject(grade, subject);
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Get total question count by grade and subject */
export function getQuestionCount(grade: Grade, subject: Subject): number {
  return getQuestionsByGradeAndSubject(grade, subject).length;
}

/** Get all unique subjects that have questions */
export function getSubjectsWithQuestions(grade: Grade): Subject[] {
  const subjects = new Set<Subject>();
  examQuestions.filter(q => q.grade === grade).forEach(q => subjects.add(q.subject));
  return Array.from(subjects);
}
