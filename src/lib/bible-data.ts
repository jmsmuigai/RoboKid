// ============================================================
// RoboKid Platform — Bible & Religious Education Data
// English | Kiswahili | Gĩkũyũ | Dholuo
// Kid-friendly verses, stories, and challenges
// ============================================================

export type BibleLanguage = 'english' | 'kiswahili' | 'kikuyu' | 'luo';

export interface BibleVerse {
  id: string;
  reference: string; // e.g. "John 3:16"
  english: string;
  kiswahili: string;
  kikuyu: string;
  luo: string;
  theme: string;
  emojiIcon: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface BibleChallenge {
  id: string;
  type: 'fill_blank' | 'match_verse' | 'true_false' | 'memory' | 'story_order';
  verseId: string;
  language: BibleLanguage;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  grade: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface BibleStory {
  id: string;
  title: { english: string; kiswahili: string; kikuyu: string; luo: string };
  summary: { english: string; kiswahili: string; kikuyu: string; luo: string };
  lesson: { english: string; kiswahili: string; kikuyu: string; luo: string };
  characters: string[];
  emojiScene: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  book: string;
  chapter: string;
}

// =============================================
// BIBLE VERSES — Multi-Language
// =============================================
export const BIBLE_VERSES: BibleVerse[] = [
  {
    id: 'bv-001',
    reference: 'John 3:16',
    english: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    kiswahili: 'Kwa maana Mungu aliupenda ulimwengu kiasi kwamba alimtoa Mwanawe wa pekee, ili kila mtu anayemwamini asipotee, bali awe na uzima wa milele.',
    kikuyu: 'Ningĩ Ngai nĩwendete thi nĩ ũndũ waakĩ, agĩtũmĩria Mwana wake wa kamwe, nĩ ũndũ mũndũ o wothe ũkĩmwĩkania nake ndahota gũtikagwo no akorwo na ũima wa tũũrĩro.',
    luo: 'Nimar Nyasaye nohero piny ahinya, omiyo nomiyo Wuode mana achiel, mondo ng\'ato ang\'ata moyie kuome kik lal, to obed gi ngima manyaka chieng\'.',
    theme: 'Love of God',
    emojiIcon: '❤️',
    grade: 1,
  },
  {
    id: 'bv-002',
    reference: 'Proverbs 3:5-6',
    english: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    kiswahili: 'Mwamini BWANA kwa moyo wako wote na usitegemee akili zako mwenyewe. Mkubali katika njia zako zote, naye ataelekeza njia zako.',
    kikuyu: 'Ĩkĩra JEHOVA na ngoro yaku yothe, ũtegerie na mũoyo waku wene. Mũhĩnye mĩcĩ yaku yothe, nake agaaheana njĩra yaku.',
    luo: 'Geno Jehova gi chunyi duto; kik gi koorni winj maru owuon. Lembe kuome e yoreni duto, to en obiro luoro yoreni.',
    theme: 'Faith & Trust',
    emojiIcon: '🙏',
    grade: 1,
  },
  {
    id: 'bv-003',
    reference: 'Psalm 23:1',
    english: 'The Lord is my shepherd; I shall not want.',
    kiswahili: 'BWANA ndiye mchungaji wangu; sitakuwa na uhitaji.',
    kikuyu: 'JEHOVA nĩwe mũhũrũku wakwa; ndingahota kũtikagwo nĩ kĩndũ.',
    luo: 'Jehova en jachwany wa; ok anyal ritruok.',
    theme: 'God\'s Care',
    emojiIcon: '🐑',
    grade: 1,
  },
  {
    id: 'bv-004',
    reference: 'Matthew 5:9',
    english: 'Blessed are the peacemakers, for they will be called children of God.',
    kiswahili: 'Heri wapatanishi, kwa maana wao wataitwa wana wa Mungu.',
    kikuyu: 'Moragwo na baraka arĩa matooragia athĩĩ tharaka, nĩgũkorwo nĩ mao makaĩtwo ciana cia Ngai.',
    luo: 'Ber ng\'a ma miyo yie, nimar ibiro luongogi nyithind Nyasaye.',
    theme: 'Peace',
    emojiIcon: '☮️',
    grade: 2,
  },
  {
    id: 'bv-005',
    reference: 'Philippians 4:13',
    english: 'I can do all this through him who gives me strength.',
    kiswahili: 'Naweza kufanya mambo yote katika yeye aniyenimarisha.',
    kikuyu: 'Nĩ nendaga kũhota gũkora o gĩkaro gĩothe gĩtimĩrio nĩ iye arĩa anyihagia ngũũmo.',
    luo: 'Danyal gik moko duto kuom Kristo ma omiya teko.',
    theme: 'Strength',
    emojiIcon: '💪',
    grade: 2,
  },
  {
    id: 'bv-006',
    reference: '1 Corinthians 13:4',
    english: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
    kiswahili: 'Upendo huvumilia, upendo ni mwema. Hauna wivu, wala haujisifu, wala haujivuna.',
    kikuyu: 'Rũrathĩmi nĩ rũrĩgĩte, rũrathĩmi nĩ rũrĩgĩ mwega. Nĩrũtigĩra hinya, nĩrũtigĩra gũĩhĩĩtia, nĩrũtigĩra gũĩkobia.',
    luo: 'Hera en hodhore, hera en ber. Ok omor gi nyako, ok owuoyo, ok onywoli.',
    theme: 'Love',
    emojiIcon: '💝',
    grade: 3,
  },
  {
    id: 'bv-007',
    reference: 'Joshua 1:9',
    english: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    kiswahili: 'Kuwa imara na ujasiri. Usiogope wala usivunjike moyo, kwa maana BWANA Mungu wako atakuwa nawe popote uendapo.',
    kikuyu: 'Ĩkara na ngumo na ũiguĩ mwega. Ũtigatigage wĩtĩkio waku, nĩgũkorwo JEHOVA Ngai waku akaakorwo na wee handũ othe ũkuoyaga.',
    luo: 'Bed motegno kendo mager. Kik luor, kik bwok; nimar Jehova Nyasayi biro bedo kodi kama idhi duto.',
    theme: 'Courage',
    emojiIcon: '🦁',
    grade: 3,
  },
  {
    id: 'bv-008',
    reference: 'Jeremiah 29:11',
    english: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
    kiswahili: 'Kwa maana ninajua mipango ninayokusudia kwenu, asema BWANA, mipango ya kukustawi na si ya kukudhuru, mipango ya kukupa tumaini na siku zijazo.',
    kikuyu: 'Nĩndĩ na ũhoti wa gũĩĩ njĩra nĩndĩnaatooranĩra, nĩtarĩa JEHOVA, njĩra cia gũtũũĩra ndia mwega na itĩ kũhonagia, njĩra cia gũkũhe tũmaĩni na ithe riũ rĩkurĩ.',
    luo: 'Nimar ang\'eyo chenro ma an-go ni un, Jehova wacho, chenro ma nyalo miyo ber kendo ok hinyou, chenro ma nyalo miyo geno kod ngima mabiro.',
    theme: 'God\'s Plan',
    emojiIcon: '⭐',
    grade: 4,
  },
  {
    id: 'bv-009',
    reference: 'Romans 8:28',
    english: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    kiswahili: 'Nasi tunajua kwamba katika mambo yote Mungu hufanya kazi kwa faida yao wampendao, wale walioitwa kwa kusudi lake.',
    kikuyu: 'Na itĩkĩte gũtĩkana atĩ o na mĩtũrĩre yothe Ngai nĩhĩkagĩra mĩtũrĩre na mwega wa arĩa mamwendete, arĩa maitwo na njĩra ya ũhĩgwo wake.',
    luo: 'Kendo wang\'eyo ni gik moko duto Nyasaye timo e ber ni jogo mahero, jogo moluongore kaluwore gi dwache.',
    theme: 'Purpose',
    emojiIcon: '🎯',
    grade: 4,
  },
  {
    id: 'bv-010',
    reference: 'Matthew 22:37-39',
    english: 'Love the Lord your God with all your heart and with all your soul and with all your mind. Love your neighbor as yourself.',
    kiswahili: 'Mpende Bwana Mungu wako kwa moyo wako wote na kwa roho yako yote na kwa akili yako yote. Mpende jirani yako kama nafsi yako.',
    kikuyu: 'Wenda JEHOVA Ngai waku na ngoro yaku yothe na na roho yako yothe na na mũoyo waku wothe. Wende mũrũgĩ waku ta wĩwendete wee mwene.',
    luo: 'Her Jehova Nyasachi gi chunyi duto kendo gi ngimani duto kendo gi pachu duto. Her wadu kaka ihere iwuon.',
    theme: 'Greatest Commandment',
    emojiIcon: '💖',
    grade: 5,
  },
  {
    id: 'bv-011',
    reference: 'Galatians 5:22-23',
    english: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.',
    kiswahili: 'Lakini tunda la Roho ni upendo, furaha, amani, uvumilivu, utu wema, wema, uaminifu, upole na kujizuia.',
    kikuyu: 'No tũndũ twa Roho nĩ rũrathĩmi, githĩĩo, tharaka, ũrĩgĩtĩku, ũtheri, ũgĩ, ũhoniu, ũnyoru na ũmenyereria mwene.',
    luo: 'To nyako mar Roho en hera, mor, kwe, hodhore, ber, dier, adiera, muolo kendo ngʼeyo maru owuon.',
    theme: 'Fruit of the Spirit',
    emojiIcon: '🍇',
    grade: 5,
  },
  {
    id: 'bv-012',
    reference: 'Micah 6:8',
    english: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
    kiswahili: 'Amekuonyesha, ee binadamu, kilicho chema. Na BWANA anahitaji nini kwako? Ila kutenda haki, na kupenda huruma, na kwenda kwa unyenyekevu na Mungu wako.',
    kikuyu: 'Wee mũndũ, akũonire ũrĩa wega. Niguo JEHOVA egaga nĩkĩ? Ni gũkora ũrĩa wega, gũwenda ũhĩĩtu, na gũita na NGAI waku ũtĩrĩri.',
    luo: 'Osenyisi, in dhano, gima ber. To ang\'o ma Jehova dwachi kuomi? Mana timo makwa kendo hero ng\'wono, to wuoth gi Nyasachi gi muolo.',
    theme: 'Justice & Mercy',
    emojiIcon: '⚖️',
    grade: 6,
  },
];

// =============================================
// BIBLE STORIES — Multi-Language
// =============================================
export const BIBLE_STORIES: BibleStory[] = [
  {
    id: 'bs-001',
    title: {
      english: 'David and Goliath',
      kiswahili: 'Daudi na Goliathi',
      kikuyu: 'Daudi na Goliathi',
      luo: 'Daudi gi Goliath',
    },
    summary: {
      english: 'A young shepherd boy named David trusted in God and defeated the giant Goliath with just a small stone and a sling. With courage and faith, small people can defeat big problems!',
      kiswahili: 'Kijana mchungaji aitwaye Daudi alimwamini Mungu na kumshinda Goliathi mkubwa kwa jiwe dogo na kombeo. Kwa ujasiri na imani, wadogo wanaweza kushinda matatizo makubwa!',
      kikuyu: 'Kĩgorĩ gĩkũ gĩtũmaga ngʼombe gĩtũmĩtwo Daudi gĩĩkĩirie Ngai na gĩhagũra Goliathi mũkũrũ na kĩĩgũ na ĩtimũ. Na ũiguĩ na ĩtĩkĩo, arĩa matinogĩ nĩmagũta gũhagũra ĩhinda rĩnene!',
      luo: 'Rawera matin ma jachwany mane iluonge Daudi noyie kuom Nyasaye mi oloyo Goliath maduong\' gi kidi matin kod akwero. Gi luor kod yie, joma tin nyal loyo chandruoge maduong\'!',
    },
    lesson: {
      english: 'God helps the brave! When you trust in God, you can face any challenge no matter how big it seems.',
      kiswahili: 'Mungu husaidia wenye ujasiri! Ukimwamini Mungu, unaweza kukabili changamoto yoyote haijalishi ni kubwa kiasi gani.',
      kikuyu: 'Ngai nĩahĩkagĩra arĩa maiguĩ! Ũrĩkĩire NGAI, nĩngwenda gũhota gũĩhĩta o kĩhinda gĩothe ona kana nĩkĩnene kĩ ĩhinda.',
      luo: 'Nyasaye konyo jogo moluor! Ka iyie kuom Nyasaye, itwenyo ritruok ang\'o ang\'o kata obedo maduong\'.',
    },
    characters: ['David', 'Goliath', 'King Saul'],
    emojiScene: '🪨 ⚔️ 🦁',
    grade: 1,
    book: '1 Samuel',
    chapter: '17',
  },
  {
    id: 'bs-002',
    title: {
      english: 'Noah\'s Ark',
      kiswahili: 'Safina ya Nuhu',
      kikuyu: 'Birika rĩa Nuhu',
      luo: 'Yie mar Nuhu',
    },
    summary: {
      english: 'God asked Noah to build a giant boat called an ark. Noah obeyed and saved his family and two of every animal on earth from a great flood. God put a beautiful rainbow in the sky as a promise.',
      kiswahili: 'Mungu alimwambia Nuhu ajenye chombo kikubwa cha meli kiitwacho safina. Nuhu alitii na kuokoa familia yake na wanyama wawili wa kila aina duniani kutoka kwa gharika kubwa. Mungu aliweka upinde wa mvua mzuri angani kama ahadi.',
      kikuyu: 'Ngai agĩĩra Nuhu aake birika rĩnene rĩoitwo birika. Nuhu akaĩtĩkĩra na agĩokoa hĩndĩ ya kĩhindi gĩkĩnene ũrĩa na ciana ciake na nyamũ igĩrĩ cia thĩ yothe. Ngai agĩĩka gwa na hĩndĩ ya mbura ĩrĩa mĩhĩĩthu nĩ njĩra ya irĩra.',
      luo: 'Nyasaye nowuoyo ni Nuhu maro yie maduong\' ma iluong\'ore yie. Nuhu noluoro mi olaro joge gi le ariyo ariyo kuom piny duto kuom moo maduong\'. Nyasaye nopogo kor kot maler e polo kaka singruok.',
    },
    lesson: {
      english: 'When we obey God\'s instructions, He protects us. God always keeps His promises!',
      kiswahili: 'Tunapotii maagizo ya Mungu, Yeye analinda. Mungu daima hushika ahadi zake!',
      kikuyu: 'Tũĩtĩkĩra maũndũ ma Ngai, nĩakĩatũhanda. Ngai nĩahoyaga irĩra iake yothe!',
      luo: 'Ka waluoro wach Nyasaye, En ogwadhwa. Nyasaye jogo singruoke duto!',
    },
    characters: ['Noah', 'God', 'Noah\'s Family'],
    emojiScene: '🚢 🌈 🐘 🦒 🦁',
    grade: 1,
    book: 'Genesis',
    chapter: '6-9',
  },
  {
    id: 'bs-003',
    title: {
      english: 'The Good Samaritan',
      kiswahili: 'Msamaria Mwema',
      kikuyu: 'Mũndũ Mwega wa Samaria',
      luo: 'Ja-Samaria Maber',
    },
    summary: {
      english: 'A man was hurt on the road. Two important people walked past and ignored him. But a Samaritan — considered an outsider — stopped, helped, bandaged his wounds, and paid for his care. Jesus told this story to teach us to love everyone as our neighbor.',
      kiswahili: 'Mtu mmoja alijeruhiwa barabarani. Watu wawili wakubwa walipita na kumwacha. Lakini Msamaria — aliyechukuliwa mgeni — alisimama, akamsaidia, akafunga majeraha yake, na kulipa malazi yake. Yesu alisimulia hadithi hii kutufundisha kupenda kila mtu kama jirani yetu.',
      kikuyu: 'Mũndũ ũmwe akahonagio njĩrani. Andũ airi a kĩĩgũ akagita ta atihaana na we. No mũndũ wa Samaria — ũrĩa watambĩragwo mũndũ wa nja — agĩĩmara, agĩmũhĩkia, agĩfunga marũũmi make, na agĩũĩhia. Jesũ agĩacikia ũhoti ũyũ nĩ ũndũ wa gũtũigĩĩrĩria gũwenda mũndũ wĩrĩa ta mũrũgĩ witũ.',
      luo: 'Ngʼat moro nodhi odinore yo. Joodong ariyo nobayo kendo ne ok konye. To ja-Samaria moro — ma ne gikwaye mana jat thuolo — nochung\', nokonye, nosubo chunyepe, kendo nochulo ni jorit. Yesu noacho sigano ni mondo opuonjwa hera ngʼato ngʼato kaka wawade.',
    },
    lesson: {
      english: 'Our neighbor is anyone who needs our help. Show kindness to everyone, not just people who look like us!',
      kiswahili: 'Jirani yetu ni yeyote anayehitaji msaada wetu. Onyesha wema kwa kila mtu, si tu wanaofanana nasi!',
      kikuyu: 'Mũrũgĩ witũ nĩ mũndũ wĩrĩa athomekĩria ũhĩkio witũ. Onya ũtheri kũrĩ mũndũ wĩrĩa wothe, tĩ arĩa tu mataũranaga na ithũ!',
      luo: 'Wawade en ngʼato ang\'ata mathienowa konyo. Nyis ber ni ngʼato ang\'ata, ok mana joma ranchore kaka wan!',
    },
    characters: ['Injured Man', 'Priest', 'Levite', 'Good Samaritan'],
    emojiScene: '🏥 ❤️ 🤝 🛣️',
    grade: 2,
    book: 'Luke',
    chapter: '10:25-37',
  },
  {
    id: 'bs-004',
    title: {
      english: 'Jesus Feeds 5000 People',
      kiswahili: 'Yesu Alilisha Watu 5000',
      kikuyu: 'Jesũ Akũha Andũ Iĩ Ngiri Ithano',
      luo: 'Yesu Nochwoyo Ji 5000',
    },
    summary: {
      english: 'A huge crowd of 5000 people followed Jesus and were hungry. A small boy shared his lunch — five loaves of bread and two fish. Jesus blessed the food and everyone ate until they were full, with 12 baskets left over!',
      kiswahili: 'Umati mkubwa wa watu 5000 ulifuata Yesu na wakiwa na njaa. Mvulana mdogo alishiriki chakula chake cha mchana — mikate mitano na samaki wawili. Yesu alibariki chakula na kila mtu akala hadi kushiba, na vikapu 12 vilisalia!',
      kikuyu: 'Gĩthaka kĩnene kĩa andũ iĩ ngĩrĩ ĩthano gĩkaragia Jesũ na gĩkĩgorĩ. Kĩgorĩ kĩkũ gĩkĩgabana chakũ chake — mkate ĩthano na ngĩrĩ ĩgĩrĩ cia thamaki. Jesũ akĩbarikia chakũ na mũndũ wothe agĩrĩa gũkĩa na akorwo na nguo ĩkũmi na ĩgĩrĩ cia iṇya ĩtigĩtĩire!',
      luo: 'Oganda maduong\' ma ji 5000 noluwe Yesu kendo ne gicol kech. Wuoyi matin moro nopogo chiembene — mkate abich gi rech ariyo. Yesu noguedho chiema mi ngʼato ngʼata nocham ndi ndi, mi ne pok otim basked apar gariyo!',
    },
    lesson: {
      english: 'When we give what little we have to God, He can use it to bless many people. Sharing is a miracle!',
      kiswahili: 'Tunapompa Mungu kidogo tulichonacho, Yeye anaweza kutumia kubariki watu wengi. Kushiriki ni muujiza!',
      kikuyu: 'Tũrĩkĩĩtia Ngai kĩkĩĩnjĩ tũkĩnayo, agũhota gũgĩĩtĩmiria kũbarikia andũ aingĩ. Kũgabana nĩ mũujĩza!',
      luo: 'Ka wamiye Nyasaye matin mano tin, En twenyo tiyogo mondo oguedhi ji mang\'eny. Pogo en honni!',
    },
    characters: ['Jesus', 'Disciples', 'Small Boy', 'Crowd'],
    emojiScene: '🍞 🐟 🙏 👥',
    grade: 2,
    book: 'John',
    chapter: '6:1-14',
  },
  {
    id: 'bs-005',
    title: {
      english: 'Daniel in the Lions\' Den',
      kiswahili: 'Danieli Katika Simba',
      kikuyu: 'Danieli na Ndiathũ cia Ngĩo',
      luo: 'Daniel e Ot Simu',
    },
    summary: {
      english: 'Daniel was a man who prayed to God three times every day. Bad people tricked the king into making a law against prayer. Daniel was thrown into a lions\' den! But God sent an angel to shut the lions\' mouths, and Daniel was safe.',
      kiswahili: 'Danieli alikuwa mtu aliyemwomba Mungu mara tatu kila siku. Watu wabaya walidanganya mfalme kutengeneza sheria dhidi ya sala. Danieli alitupwa kwenye shimo la simba! Lakini Mungu alimtuma malaika kufunga midomo ya simba, na Danieli alikuwa salama.',
      kikuyu: 'Danieli akorwo mũndũ ũrĩa wombagaga Ngai hĩndĩ igĩrĩ na igĩrĩ o mũthenya. Andũ arĩa magũ magĩhĩĩtĩa mũthamaki gũika wathani wa kũganĩĩra gũomba. Danieli agĩturĩkĩrwo na ndiathũ cia ngĩo! No Ngai agĩtũma mũingĩri-ndũrĩro kũhana miromo ya ngĩo, na Danieli agĩkorwo salama.',
      luo: 'Daniel ne en dhano molemo Nyasaye katne adek nyaka odiechieng. Joma rach nodimo ruoth mondo omi chik mako lemo. Daniel noidho e ot simu! To Nyasaye nooro malaika mondo oniudo dhok simu, mi Daniel noidho maber.',
    },
    lesson: {
      english: 'Never stop praying, even when it is hard. God protects those who are faithful to Him!',
      kiswahili: 'Usikome kuomba, hata wakati wa ugumu. Mungu analinda wale walio waaminifu kwake!',
      kikuyu: 'Ũtikimara gũomba, o na rĩrĩ nĩkĩgũmu. Ngai nĩahanda arĩa mamũhoniu!',
      luo: 'Kik rem lemo, kata obedo ahinya. Nyasaye gwadho jogo maadier kuome!',
    },
    characters: ['Daniel', 'King Darius', 'Lions', 'Angel'],
    emojiScene: '🦁 🙏 👼 🏛️',
    grade: 3,
    book: 'Daniel',
    chapter: '6',
  },
];

// =============================================
// BIBLE CHALLENGES — Per Language
// =============================================
export const BIBLE_CHALLENGES: BibleChallenge[] = [
  // English Challenges
  {
    id: 'bc-001',
    type: 'fill_blank',
    verseId: 'bv-001',
    language: 'english',
    question: 'Complete the verse: "For God so loved the world that he gave his ___ and only Son..."',
    options: ['one', 'big', 'tall', 'first'],
    correctAnswer: 'one',
    explanation: 'John 3:16 says God gave His "one and only Son" — this shows how much God loves us!',
    points: 10,
    grade: 1,
  },
  {
    id: 'bc-002',
    type: 'true_false',
    verseId: 'bv-003',
    language: 'english',
    question: 'Psalm 23:1 says "The Lord is my shepherd; I shall not want." TRUE or FALSE?',
    options: ['TRUE', 'FALSE'],
    correctAnswer: 'TRUE',
    explanation: 'Correct! Psalm 23:1 teaches us that God is like a good shepherd who takes care of us.',
    points: 5,
    grade: 1,
  },
  {
    id: 'bc-003',
    type: 'match_verse',
    verseId: 'bv-005',
    language: 'english',
    question: 'Which Bible verse says: "I can do all this through him who gives me strength"?',
    options: ['John 3:16', 'Philippians 4:13', 'Psalm 23:1', 'Joshua 1:9'],
    correctAnswer: 'Philippians 4:13',
    explanation: 'Philippians 4:13! Paul wrote this verse to encourage us that with God\'s help, we can overcome any challenge!',
    points: 10,
    grade: 2,
  },
  {
    id: 'bc-004',
    type: 'fill_blank',
    verseId: 'bv-007',
    language: 'english',
    question: 'Joshua 1:9 says: "Be ___ and courageous. Do not be afraid..."',
    options: ['strong', 'quiet', 'small', 'fast'],
    correctAnswer: 'strong',
    explanation: 'God told Joshua to be STRONG and courageous — God is always with us wherever we go!',
    points: 10,
    grade: 3,
  },
  // Kiswahili Challenges
  {
    id: 'bc-005',
    type: 'fill_blank',
    verseId: 'bv-001',
    language: 'kiswahili',
    question: 'Jaza pengo: "Kwa maana Mungu aliupenda ___ kiasi kwamba alimtoa Mwanawe..."',
    options: ['ulimwengu', 'mto', 'msitu', 'mlima'],
    correctAnswer: 'ulimwengu',
    explanation: 'Yohana 3:16 inasema Mungu aliupenda ULIMWENGU — hii inamaanisha Mungu anakupenda wewe pia!',
    points: 10,
    grade: 1,
  },
  {
    id: 'bc-006',
    type: 'true_false',
    verseId: 'bv-004',
    language: 'kiswahili',
    question: 'Mathayo 5:9 inasema heri wanaofanya vita. KWELI au UONGO?',
    options: ['KWELI', 'UONGO'],
    correctAnswer: 'UONGO',
    explanation: 'UONGO! Mathayo 5:9 inasema heri WApatanishi — wale wanaoleta amani na upendo!',
    points: 5,
    grade: 2,
  },
  {
    id: 'bc-007',
    type: 'fill_blank',
    verseId: 'bv-006',
    language: 'kiswahili',
    question: 'Jaza: "Upendo huvumilia, upendo ni ___"',
    options: ['mwema', 'mkali', 'mrefu', 'mzuri'],
    correctAnswer: 'mwema',
    explanation: '1 Wakorintho 13:4 inafundisha kwamba upendo wa kweli ni wa uvumilivu na wema!',
    points: 10,
    grade: 3,
  },
  // Kikuyu Challenges
  {
    id: 'bc-008',
    type: 'fill_blank',
    verseId: 'bv-002',
    language: 'kikuyu',
    question: 'Jaza: "Ĩkĩra JEHOVA na ___ yaku yothe..."',
    options: ['ngoro', 'mũkũrũ', 'igũrũ', 'gĩthaka'],
    correctAnswer: 'ngoro',
    explanation: 'Mĩhĩa 3:5 ĩtũigĩĩrĩria gũĩkĩra JEHOVA na NGORO yaitũ yothe — nĩ ta gũmũwenda maita mothe!',
    points: 10,
    grade: 1,
  },
  {
    id: 'bc-009',
    type: 'true_false',
    verseId: 'bv-003',
    language: 'kikuyu',
    question: 'Ndaĩ 23:1 ĩrĩa "JEHOVA nĩwe mũhũrũku wakwa" — Nĩ kweli kana mĩhĩĩthu?',
    options: ['Nĩ kweli', 'Nĩ mĩhĩĩthu'],
    correctAnswer: 'Nĩ kweli',
    explanation: 'Nĩ kweli! Ndaĩ 23:1 ĩtũigĩĩrĩria atĩ Ngai nĩ ta mũhũrũku mwega ũrĩa atũhanda!',
    points: 5,
    grade: 1,
  },
  // Luo Challenges
  {
    id: 'bc-010',
    type: 'fill_blank',
    verseId: 'bv-001',
    language: 'luo',
    question: 'Wuoki wach ni: "Nimar Nyasaye nohero ___ ahinya..."',
    options: ['piny', 'lawa', 'nam', 'got'],
    correctAnswer: 'piny',
    explanation: 'Johana 3:16 wacho ni Nyasaye nohero PINY — mano tiende ni oheri bende!',
    points: 10,
    grade: 1,
  },
  {
    id: 'bc-011',
    type: 'match_verse',
    verseId: 'bv-007',
    language: 'luo',
    question: 'En wach mane wacho: "Bed motegno kendo mager. Kik luor..."?',
    options: ['Johana 3:16', 'Zab 23:1', 'Joshua 1:9', 'Filipi 4:13'],
    correctAnswer: 'Joshua 1:9',
    explanation: 'Joshua 1:9! Wach ni Nyasaye nowacho ni Joshua mondo obed gi luor — Nyasaye bedo kode duto!',
    points: 10,
    grade: 3,
  },
];

// =============================================
// HELPER FUNCTIONS
// =============================================

export function getVerseByLanguage(verse: BibleVerse, lang: BibleLanguage): string {
  return verse[lang] || verse.english;
}

export function getChallengesByLanguage(lang: BibleLanguage, grade?: number): BibleChallenge[] {
  const filtered = BIBLE_CHALLENGES.filter(c => c.language === lang);
  if (grade) return filtered.filter(c => c.grade <= grade);
  return filtered;
}

export function getStoriesByGrade(grade: number): BibleStory[] {
  return BIBLE_STORIES.filter(s => s.grade <= grade);
}

export function getVersesByGrade(grade: number): BibleVerse[] {
  return BIBLE_VERSES.filter(v => v.grade <= grade);
}

export function getStoryTitle(story: BibleStory, lang: BibleLanguage): string {
  return story.title[lang] || story.title.english;
}

export function getStorySummary(story: BibleStory, lang: BibleLanguage): string {
  return story.summary[lang] || story.summary.english;
}

export function getStoryLesson(story: BibleStory, lang: BibleLanguage): string {
  return story.lesson[lang] || story.lesson.english;
}
