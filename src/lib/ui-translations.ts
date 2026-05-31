import type { Language } from '@/types';

export const UI_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Menu Tabs
  'tab_learn': {
    english: '📚 Learn',
    kiswahili: '📚 Jifunze',
    kikuyu: '📚 Thoma',
    luo: '📚 Puonjri',
    somali: '📚 Baro'
  },
  'tab_notes': {
    english: '📖 Textbook Notes',
    kiswahili: '📖 Maelezo ya Vitabu',
    kikuyu: '📖 Mabuku ma Thome',
    luo: '📖 Buche ma Puonj',
    somali: '📖 Qoraallada Buugaagta'
  },
  'tab_quiz': {
    english: '📝 Exams',
    kiswahili: '📝 Mitihani',
    kikuyu: '📝 Mĩgerio',
    luo: '📝 Tembe',
    somali: '📝 Imtixaanno'
  },
  'tab_code': {
    english: '💻 Code Lab',
    kiswahili: '💻 Karakana ya Msimbo',
    kikuyu: '💻 Gũcoda',
    luo: '💻 Koding',
    somali: '💻 Waaxda Codaynta'
  },
  'tab_music': {
    english: '🎹 Music Lab',
    kiswahili: '🎹 Studio ya Muziki',
    kikuyu: '🎹 Labu ya Mũgambo',
    luo: '🎹 Lab ma Wer',
    somali: '🎹 Waaxda Muusigga'
  },
  'tab_ai': {
    english: '🤖 AI',
    kiswahili: '🤖 Akili Mnemba',
    kikuyu: '🤖 AI ya Kũmenya',
    luo: '🤖 AI ma Rieko',
    somali: '🤖 AI-ga Garaadka'
  },
  'tab_generate': {
    english: '✨ Generate',
    kiswahili: '✨ Tengeneza',
    kikuyu: '✨ Ũmĩrĩria',
    luo: '✨ Loso Manyien',
    somali: '✨ Samee Cusub'
  },
  'tab_gallery': {
    english: '🎨 Gallery',
    kiswahili: '🎨 Nyumba ya Sanaa',
    kikuyu: '🎨 Mbica na Chapa',
    luo: '🎨 Galar ma Chapa',
    somali: '🎨 Matxafka'
  },
  'tab_toys': {
    english: '🧸 Toys & Cartoons',
    kiswahili: '🧸 Vichezeo na Vibonzo',
    kikuyu: '🧸 Mathako na Katuni',
    luo: '🧸 Mielo kod Katuni',
    somali: '🧸 Alaabta & Kartoonada'
  },
  'tab_lugha': {
    english: '👅 Lugha & Tracing',
    kiswahili: '👅 Lugha na Kuchora',
    kikuyu: '👅 Mũgambo Witũ',
    luo: '👅 Dhok Wa & Lero',
    somali: '👅 Afkeenna'
  },
  
  // Dashboard headers
  'welcome_prefix': {
    english: 'Welcome back,',
    kiswahili: 'Karibu tena,',
    kikuyu: 'Wĩ mwega,',
    luo: 'Ber biro,',
    somali: 'Ku soo dhowaad,'
  },
  'switch_stage': {
    english: 'Switch Stage',
    kiswahili: 'Badilisha Kiwango',
    kikuyu: 'Garũra Kĩbaro',
    luo: 'Lok Kar Kobi',
    somali: 'Beddel Heerka'
  },
  'current_stage_label': {
    english: 'Stage:',
    kiswahili: 'Kiwango:',
    kikuyu: 'Kĩbaro:',
    luo: 'Kobi:',
    somali: 'Heerka:'
  },
  
  // Subject Titles
  'mathematics': {
    english: 'Mathematics Activities',
    kiswahili: 'Shughuli za Hisabati',
    kikuyu: 'Mĩthungũro ya Namba',
    luo: 'Kwan kod Finyo',
    somali: 'Xisaab'
  },
  'environmental': {
    english: 'Environmental Activities',
    kiswahili: 'Shughuli za Mazingira',
    kikuyu: 'Mazingira na Wĩra',
    luo: 'Kar Dhiang kod Piny',
    somali: 'Sayniska & Deegaanka'
  },
  'english': {
    english: 'English Language',
    kiswahili: 'Lugha ya Kiingereza',
    kikuyu: 'Gĩthungũ',
    luo: 'Dho-Rachar (Ngere)',
    somali: 'Af-Ingiriisi'
  },
  'kiswahili': {
    english: 'Kiswahili Language',
    kiswahili: 'Lugha ya Kiswahili',
    kikuyu: 'Gĩthweri',
    luo: 'Dho-Swahili',
    somali: 'Af-Sawaaxili'
  },
  'indigenous': {
    english: 'Indigenous Languages',
    kiswahili: 'Lugha za Kiasili',
    kikuyu: 'Mũgambo wa Kĩmũriũ',
    luo: 'Dhe-Moko (Dhok Wa)',
    somali: 'Afafka Dhalad'
  },
  'creative': {
    english: 'Creative Activities',
    kiswahili: 'Shughuli za Ubunifu',
    kikuyu: 'Wĩra wa Ũgemi',
    luo: 'Loso kod Chapa',
    somali: 'Farshaxan & Ubunifu'
  },
  'religious': {
    english: 'Religious Education',
    kiswahili: 'Elimu ya Dini',
    kikuyu: 'Kũmenya Ngai',
    luo: 'Puonj Laini',
    somali: 'Tarbiya'
  },

  // Descriptions
  'math_desc': {
    english: 'Numbers, counting, shapes, and problem-solving in everyday Kenyan life',
    kiswahili: 'Nambari, kuhesabu, maumbo, na utatuzi wa shida katika maisha ya kila siku ya Kenya',
    kikuyu: 'Namba, kũtara, mĩhianano, na ũrũgamĩri wa mathĩna mĩtũũrĩre-inĩ ya gũkũ Kenya',
    luo: 'Namba, kwan, chapa, kod tieko shida e ngima piny Kenya',
    somali: 'Tirooyinka, xisaabinta, qaababka, iyo xalinta mashaakilaadka nolosha maalinlaha ah'
  },
  'environmental_desc': {
    english: 'Exploring nature, hygiene, nutrition, and our beautiful Kenyan environment',
    kiswahili: 'Kuchunguza asili, usafi, lishe, na mazingira yetu mazuri ya Kenya',
    kikuyu: 'Gũthuthuria ndũire, ũtheri, irio cia mwĩrĩ, na mazingira mega ma gũkũ Kenya',
    luo: 'Piny, ler, chiemo maber, kod kar dhiang maber piny Kenya',
    somali: 'Barashada dabeecadda, nadaafadda, nafaqada, iyo deegaankeenna quruxda badan'
  },
  'english_desc': {
    english: 'Reading, writing, and speaking English with confidence and joy',
    kiswahili: 'Kusoma, kuandika, na kuzungumza Kiingereza kwa ujasiri na furaha',
    kikuyu: 'Gũthoma, kwandĩka, na kwaria Gĩthungũ na wĩra na gĩkeno',
    luo: 'Somo, ndiko, kod wuo Dho-Rachar gi chir kod mor',
    somali: 'Akhrinta, qorista, iyo ku hadalka Af-Ingiriisiga si kalsooni iyo farxad leh'
  },
  'kiswahili_desc': {
    english: 'Kusoma, kuandika, na kuzungumza Kiswahili kwa ufasaha',
    kiswahili: 'Kusoma, kuandika, na kuzungumza Kiswahili kwa ufasaha na makini',
    kikuyu: 'Gũthoma, kwandĩka, na kwaria Gĩthweri na ũkinyanĩru',
    luo: 'Somo, ndiko, kod wuo Dho-Swahili e yo maber',
    somali: 'Akhrinta, qorista, iyo ku hadalka Af-Sawaaxiliga si sax ah'
  },
  'indigenous_desc': {
    english: 'Learn and celebrate your mother tongue — Kikuyu, Luo, Somali & more',
    kiswahili: 'Jifunze na usherehekee lugha yako ya mama — Kikuyu, Luo, Somali na zaidi',
    kikuyu: 'Kũmenya na gũkena na kĩmũriũ gĩaku — Gĩkũyũ, Luo, Somali na ingĩ nyingi',
    luo: 'Puonjri kod mor gi dhoru — Kikuyu, Luo, Somali kod moko mangʼeny',
    somali: 'Baro oo u dabbaaldeg afkaaga hooyo — Kiikuyu, Luwo, Soomaali iyo in kale'
  },
  'creative_desc': {
    english: 'Art, music, movement, and creative expression for vibrant young minds',
    kiswahili: 'Sanaa, muziki, harakati, na usemi wa ubunifu kwa akili changa za kuvutia',
    kikuyu: 'Ũgemi, mũgambo, kũinĩra, na kũonania ũgemi kũrĩ ciana nini cia kĩyo',
    luo: 'Loso chapa, wer, mielo, kod lony e loso gik manyien',
    somali: 'Farshaxanka, muusigga, dhaqdhaqaaqa, iyo hal-abuurka carruurta yar yar'
  },
  'religious_desc': {
    english: 'Values, morals, and spiritual growth with community respect',
    kiswahili: 'Maadili, maadili, na ukuaji wa kiroho kwa heshima ya jamii',
    kikuyu: 'Kũmenya Ngai na mĩtũũrĩre mĩega, na gĩtĩo kĩa andũ othe',
    luo: 'Puonj lini, ler, kod ratiro e piny mar mor',
    somali: 'Tarbiya, akhlaaqda, iyo koritaanka ruuxiga ah ee ixtiraamka bulshada'
  },
  
  // Theme Buttons
  'beats_off': { english: '🔇 Beats Off', kiswahili: '🔇 Muziki Zima', kikuyu: '🔇 Zima Mũgambo', luo: '🔇 Wer Kuot', somali: '🔇 Muusigga Demi' },
  'beats_on': { english: '🎵 Beats On', kiswahili: '🎵 Muziki Washa', kikuyu: '🎵 Washa Mũgambo', luo: '🎵 Wer Go', somali: '🎵 Muusigga Daara' },
  'dark_mode': { english: '🌌 Dark Mode', kiswahili: '🌌 Hali ya Giza', kikuyu: '🌌 Giza Mode', luo: '🌌 Kar Mudho', somali: '🌌 Hali Madow' },
  'bright_mode': { english: '🎒 Bright Mode', kiswahili: '🎒 Hali ya Mwanga', kikuyu: '🎒 Ũtheri Mode', luo: '🎒 Kar Ler', somali: '🎒 Hali Iftiin' },
  
  // Other interactive messages
  'exams_outline': {
    english: 'CBE Mock Exam Practice Questions',
    kiswahili: 'Maswali ya Mitihani ya Maandalizi ya CBE',
    kikuyu: 'Mĩgerio ya CBE na Kĩyo',
    luo: 'Penjo mar Mock mar CBE',
    somali: 'Su\'aalaha Imtixaanka CBE ee diyaargarowga'
  },
  'start_exam_btn': {
    english: 'Start Exam',
    kiswahili: 'Anza Mtihani',
    kikuyu: 'Ambĩrĩria Mũgerio',
    luo: 'Chak Tem',
    somali: 'Bilow Imtixaanka'
  },
  'learn_outline': {
    english: 'Select a subject and start studying dynamic CBC lessons!',
    kiswahili: 'Chagua somo na uanze kusoma masomo ya kusisimua ya CBC!',
    kikuyu: 'Thuura somo naũmbĩrĩrie gũthoma thome wa CBC!',
    luo: 'Yier somo to ichak somo puonj mag CBC!',
    somali: 'Dooro maadad oo bilow casharrada CBC!'
  },
  'stage_g1-3': {
    english: 'Lower Primary',
    kiswahili: 'Elimu ya Msingi ya Chini',
    kikuyu: 'Kĩbaro Gĩa Thĩ',
    luo: 'Kobi mar Piny',
    somali: 'Hoose/Dhexe'
  },
  'stage_g4-6': {
    english: 'Upper Primary',
    kiswahili: 'Elimu ya Msingi ya Juu',
    kikuyu: 'Kĩbaro Gĩa Katĩ',
    luo: 'Kobi mar Malo',
    somali: 'Dhexe Sare'
  },
  'stage_advanced': {
    english: 'Advanced AI & Robotics',
    kiswahili: 'Akili Mnemba na Roboti za Juu',
    kikuyu: 'AI na Cũrũ ya Katĩ',
    luo: 'Robotics kod AI mar Malo',
    somali: 'AI & Robotik Sare'
  },
  'personal_dictionary_title': {
    english: '🧠 Mine New Vocabulary Words!',
    kiswahili: '🧠 Jifunze Msamiati Mpya!',
    kikuyu: '🧠 Kũmenya Ciugo Njerũ!',
    luo: '🧠 Puonjri Weche Manyien!',
    somali: '🧠 Baro Erayo Cusub!'
  },
  'personal_dictionary_desc': {
    english: 'Enter any word in English, and RoboKid will automatically run translations to Kiswahili, Kikuyu, Luo, and Somali, saving them into your personal daily dictionary!',
    kiswahili: 'Weka neno lolote la Kiingereza, na RoboKid itatafsiri kiotomatiki kwa Kiswahili, Kikuyu, Luo, na Kisomali, na kulihifadhi kwenye kamusi yako ya kila siku!',
    kikuyu: 'Andĩka kiugo o gĩothe kĩa Gĩthungũ, na RoboKid nĩũgũtaũra o rĩmwe na Gĩthweri, Gĩkũyũ, Luo, na Somali, o gũkĩhithia thĩinĩ wa ibuku rĩaku rĩa ciugo!',
    luo: 'Ket wach moro amora mar Dho-Rachar, RoboKid biro loke e Dho-Swahili, Kikuyu, Luo, kod Somali, kendo chiwogi e buk mari mar weche!',
    somali: 'Gali eray kasta oo Ingiriisi ah, RoboKid ayaana si otomaatik ah ugu tarjumi doonta Sawaaxili, Kiikuyu, Luwo, iyo Soomaali, kuna kaydin doonta qaamuuskaaga maalinlaha ah!'
  },
  'personal_dictionary_placeholder': {
    english: 'Type an English word (e.g. Lion, School, Happy)...',
    kiswahili: 'Andika neno la Kiingereza (mfano Simba, Shule, Furaha)...',
    kikuyu: 'Andĩka kiugo kĩa Gĩthungũ (taũrĩ ngũkũ, thukuru, gĩkeno)...',
    luo: 'Ndik wach mar Dho-Rachar (ranyisi Sibuor, Skul, Mor)...',
    somali: 'Qor eray Ingiriisi ah (tusaale Libaax, Dugsi, Farxad)...'
  },
  'personal_dictionary_btn': {
    english: 'Mine Word 💎',
    kiswahili: 'Tafuta Neno 💎',
    kikuyu: 'Thuthuria Kiugo 💎',
    luo: 'Yod Wach 💎',
    somali: 'Baar Erayga 💎'
  },
  'marquee_welcome': {
    english: '🌟 Welcome to RoboKid! The AI-Powered CBC Companion for Kenyan Super Kids! Play music, write code, trace letters, and build robots! 🚀',
    kiswahili: '🌟 Karibu RoboKid! Mwenza wa Akili Mnemba wa CBC kwa Watoto Wanaojifunza Kenya! Cheza muziki, andika msimbo, chora herufi, na unda roboti! 🚀',
    kikuyu: '🌟 Wĩ mwega RoboKid! Mũrata waku wa kũmenya AI na gũkũria kĩyo gĩa ciana cia Kenya! Kĩina mũgambo, andĩka cũrũ, tera herufi, naũria roboti! 🚀',
    luo: '🌟 Nyathi RoboKid! Rieko mar AI e CBC mar nyithindo ma Kenya! Go wer, ndik koding, ler herufi, kendo los roboti! 🚀',
    somali: '🌟 Ku soo dhowaada RoboKid! Wehelka Garaadka Macmalka ah ee CBC ee Carruurta Soomaaliyeed/Kenyanka ah! Muusig garaac, kood qor, xarfo tijaabi, oo robot dhis! 🚀'
  }
};

export function translateUI(key: string, lang: Language): string {
  const translations = UI_TRANSLATIONS[key];
  if (translations && translations[lang]) {
    return translations[lang];
  }
  return key; // Fallback
}
