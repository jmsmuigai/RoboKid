// ============================================================
// RoboKid Translation Service
// Integrates: MyMemory API (free, no key) for English↔Swahili
// + Gemini API for Kikuyu, Luo, Somali (low-resource languages)
// + Built-in dictionary for common educational terms
// ============================================================

/** Built-in dictionary for common educational terms across 5 languages */
const DICTIONARY: Record<string, Record<string, string>> = {
  // Numbers
  'one':     { kiswahili: 'moja',    kikuyu: 'ĩmwe',     luo: 'achiel',   somali: 'kow' },
  'two':     { kiswahili: 'mbili',   kikuyu: 'igĩrĩ',    luo: 'ariyo',    somali: 'laba' },
  'three':   { kiswahili: 'tatu',    kikuyu: 'ithatũ',    luo: 'adek',     somali: 'saddex' },
  'four':    { kiswahili: 'nne',     kikuyu: 'inya',      luo: 'angʼwen',  somali: 'afar' },
  'five':    { kiswahili: 'tano',    kikuyu: 'ithano',    luo: 'abich',    somali: 'shan' },
  'six':     { kiswahili: 'sita',    kikuyu: 'ithandatũ', luo: 'auchiel',  somali: 'lix' },
  'seven':   { kiswahili: 'saba',    kikuyu: 'mũgwanja',  luo: 'abiriyo',  somali: 'toddoba' },
  'eight':   { kiswahili: 'nane',    kikuyu: 'inyanya',   luo: 'aboro',    somali: 'siddeed' },
  'nine':    { kiswahili: 'tisa',    kikuyu: 'kenda',     luo: 'ochiko',   somali: 'sagaal' },
  'ten':     { kiswahili: 'kumi',    kikuyu: 'ikũmi',     luo: 'apar',     somali: 'toban' },
  // Days of the week
  'monday':    { kiswahili: 'Jumatatu',  kikuyu: 'Mũthenya wa mbere',  luo: 'Wuok Tich',    somali: 'Isniin' },
  'tuesday':   { kiswahili: 'Jumanne',   kikuyu: 'Mũthenya wa kerĩ',  luo: 'Tich Ariyo',   somali: 'Talaado' },
  'wednesday': { kiswahili: 'Jumatano',  kikuyu: 'Mũthenya wa gatatũ', luo: 'Tich Adek',    somali: 'Arbaco' },
  'thursday':  { kiswahili: 'Alhamisi',  kikuyu: 'Mũthenya wa kana',   luo: 'Tich Angʼwen', somali: 'Khamiis' },
  'friday':    { kiswahili: 'Ijumaa',    kikuyu: 'Mũthenya wa gatano', luo: 'Tich Abich',   somali: 'Jimce' },
  'saturday':  { kiswahili: 'Jumamosi',  kikuyu: 'Mũthenya wa gatandatũ', luo: 'Chieng Ngeso', somali: 'Sabti' },
  'sunday':    { kiswahili: 'Jumapili',  kikuyu: 'Kĩũmĩa',            luo: 'Jumapil',      somali: 'Axad' },
  // Common words
  'water':     { kiswahili: 'maji',     kikuyu: 'maaĩ',     luo: 'pi',       somali: 'biyo' },
  'food':      { kiswahili: 'chakula',  kikuyu: 'irio',     luo: 'chiemo',   somali: 'cunto' },
  'school':    { kiswahili: 'shule',    kikuyu: 'thukuru',  luo: 'skul',     somali: 'dugsi' },
  'teacher':   { kiswahili: 'mwalimu', kikuyu: 'mũrutani', luo: 'japuonj',  somali: 'macallin' },
  'book':      { kiswahili: 'kitabu',   kikuyu: 'ibuku',    luo: 'buk',      somali: 'buug' },
  'mother':    { kiswahili: 'mama',     kikuyu: 'maitu',    luo: 'mama',     somali: 'hooyo' },
  'father':    { kiswahili: 'baba',     kikuyu: 'baba',     luo: 'wuoro',    somali: 'aabo' },
  'child':     { kiswahili: 'mtoto',    kikuyu: 'kaana',    luo: 'nyathi',   somali: 'ilmo' },
  'friend':    { kiswahili: 'rafiki',   kikuyu: 'mũrata',   luo: 'osiep',    somali: 'saaxiib' },
  'house':     { kiswahili: 'nyumba',   kikuyu: 'nyũmba',   luo: 'ot',       somali: 'guri' },
  'tree':      { kiswahili: 'mti',      kikuyu: 'mũtĩ',     luo: 'yath',     somali: 'geed' },
  'sun':       { kiswahili: 'jua',      kikuyu: 'riũa',     luo: 'chiengʼ',  somali: 'qorrax' },
  'rain':      { kiswahili: 'mvua',     kikuyu: 'mbura',    luo: 'koth',     somali: 'roob' },
  'animal':    { kiswahili: 'mnyama',   kikuyu: 'nyamũ',    luo: 'le',       somali: 'xayawaan' },
  'cow':       { kiswahili: 'ng\'ombe', kikuyu: 'ng\'ombe', luo: 'dhiang\'', somali: 'sac' },
  'goat':      { kiswahili: 'mbuzi',    kikuyu: 'mbũri',    luo: 'diel',     somali: 'ri' },
  'chicken':   { kiswahili: 'kuku',     kikuyu: 'ngũkũ',    luo: 'gweno',    somali: 'digaag' },
  'lion':      { kiswahili: 'simba',    kikuyu: 'mũrũũthi', luo: 'sibuor',   somali: 'libaax' },
  'elephant':  { kiswahili: 'tembo',    kikuyu: 'njogu',    luo: 'liech',    somali: 'maroodi' },
  'giraffe':   { kiswahili: 'twiga',    kikuyu: 'ndũĩga',   luo: 'twiga',    somali: 'geri' },
  'fish':      { kiswahili: 'samaki',   kikuyu: 'thamaki',  luo: 'rech',     somali: 'kalluun' },
  'bird':      { kiswahili: 'ndege',    kikuyu: 'nyoni',    luo: 'winyo',    somali: 'shimbir' },
  // Colours
  'red':       { kiswahili: 'nyekundu', kikuyu: 'mũtune',   luo: 'makwar',   somali: 'cas' },
  'blue':      { kiswahili: 'buluu',    kikuyu: 'bũrũũ',    luo: 'bul',      somali: 'buluug' },
  'green':     { kiswahili: 'kijani',   kikuyu: 'kĩbirũ',   luo: 'mangʼich', somali: 'cagaar' },
  'yellow':    { kiswahili: 'njano',    kikuyu: 'njano',    luo: 'rateng\'', somali: 'huruud' },
  'white':     { kiswahili: 'nyeupe',   kikuyu: 'mweru',    luo: 'rachar',   somali: 'cad' },
  'black':     { kiswahili: 'nyeusi',   kikuyu: 'mwĩrũ',    luo: 'rateng\'', somali: 'madow' },
  // Body parts
  'head':      { kiswahili: 'kichwa',   kikuyu: 'mũtwe',    luo: 'wich',     somali: 'madax' },
  'eye':       { kiswahili: 'jicho',    kikuyu: 'riitho',   luo: 'wang\'',   somali: 'il' },
  'ear':       { kiswahili: 'sikio',    kikuyu: 'gatũ',     luo: 'it',       somali: 'dheg' },
  'hand':      { kiswahili: 'mkono',    kikuyu: 'gũoko',    luo: 'lwedo',    somali: 'gacmo' },
  'foot':      { kiswahili: 'mguu',     kikuyu: 'kũgũrũ',   luo: 'tiend',    somali: 'cag' },
  // Greetings
  'hello':     { kiswahili: 'habari',   kikuyu: 'wĩ mwega', luo: 'misawa',   somali: 'salaan' },
  'thank you': { kiswahili: 'asante',   kikuyu: 'nĩ wega',  luo: 'erokamano', somali: 'mahadsanid' },
  'goodbye':   { kiswahili: 'kwaheri',  kikuyu: 'tigwo na wega', luo: 'oriti', somali: 'nabadgelyo' },
  'good morning': { kiswahili: 'habari ya asubuhi', kikuyu: 'wĩ mwega rũciinĩ', luo: 'oyawore', somali: 'subax wanaagsan' },
  'how are you': { kiswahili: 'habari yako', kikuyu: 'wĩ mwega', luo: 'idhi nade', somali: 'sidee tahay' },
  // Math terms
  'add':       { kiswahili: 'ongeza',   kikuyu: 'ongera',   luo: 'med',      somali: 'ku dar' },
  'subtract':  { kiswahili: 'toa',      kikuyu: 'ruta',     luo: 'gol',      somali: 'ka jar' },
  'multiply':  { kiswahili: 'zidisha',  kikuyu: 'inyihĩria', luo: 'medri',   somali: 'ku dhufan' },
  'divide':    { kiswahili: 'gawanya',  kikuyu: 'gaya',     luo: 'pog',      somali: 'u qayb' },
  'equal':     { kiswahili: 'sawa',     kikuyu: 'rĩngana',  luo: 'rom',      somali: 'isku mid' },
  'number':    { kiswahili: 'nambari',  kikuyu: 'namba',    luo: 'namba',    somali: 'lambar' },
  'circle':    { kiswahili: 'duara',    kikuyu: 'mũĩngo',   luo: 'duol',     somali: 'goobo' },
  'triangle':  { kiswahili: 'pembe tatu', kikuyu: 'mũcehe wa pembe ithatũ', luo: 'kombe adek', somali: 'saddex xagal' },
  'square':    { kiswahili: 'mraba',    kikuyu: 'mũrabaa',  luo: 'rabaa',    somali: 'afar gees' },
  // Food
  'milk':      { kiswahili: 'maziwa',   kikuyu: 'iria',     luo: 'chak',     somali: 'caano' },
  'bread':     { kiswahili: 'mkate',    kikuyu: 'mũgate',   luo: 'makati',   somali: 'rooti' },
  'rice':      { kiswahili: 'wali',     kikuyu: 'wari',     luo: 'oduma',    somali: 'bariis' },
  'banana':    { kiswahili: 'ndizi',    kikuyu: 'marigu',   luo: 'rabolo',   somali: 'muus' },
  'mango':     { kiswahili: 'embe',     kikuyu: 'iembe',    luo: 'manga',    somali: 'cambe' },
  'egg':       { kiswahili: 'yai',      kikuyu: 'itũmbi',   luo: 'tong\'',   somali: 'ukun' },
  'beans':     { kiswahili: 'maharagwe', kikuyu: 'mboco',   luo: 'oganda',   somali: 'digir' },
  'maize':     { kiswahili: 'mahindi',  kikuyu: 'mũhĩndĩ',  luo: 'oduma',    somali: 'galley' },
};

/** Translate using the built-in dictionary (word-level lookup) */
function translateWithDictionary(text: string, targetLang: string): string | null {
  const lower = text.toLowerCase().trim();
  const entry = DICTIONARY[lower];
  if (entry && entry[targetLang]) {
    return entry[targetLang];
  }
  return null;
}

/** Translate using MyMemory API (free, no key required, supports en↔sw) */
async function translateWithMyMemory(text: string, sourceLang: string, targetLang: string): Promise<string | null> {
  // MyMemory language codes
  const langMap: Record<string, string> = {
    english: 'en',
    kiswahili: 'sw',
    somali: 'so',
  };

  const src = langMap[sourceLang];
  const tgt = langMap[targetLang];

  if (!src || !tgt) return null;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      // MyMemory returns uppercase for untranslated text — filter those
      if (translated.toUpperCase() !== translated || text.toUpperCase() === text) {
        return translated;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/** Translate using Gemini API (for Kikuyu, Luo, and other low-resource languages) */
async function translateWithGemini(text: string, sourceLang: string, targetLang: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const langNames: Record<string, string> = {
    english: 'English',
    kiswahili: 'Kiswahili (Swahili)',
    kikuyu: 'Gĩkũyũ (Kikuyu)',
    luo: 'Dholuo (Luo)',
    somali: 'Somali',
  };

  const srcName = langNames[sourceLang] || sourceLang;
  const tgtName = langNames[targetLang] || targetLang;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Translate the following text from ${srcName} to ${tgtName}. 
IMPORTANT: Return ONLY the translated text, nothing else. No explanations, no notes.
If the text contains proper nouns (names of people or places), keep them as-is.
Be culturally accurate — use the natural way a native ${tgtName} speaker would say this.

Text to translate:
"${text}"`,
            }],
          }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 500 },
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    const data = await res.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (content) {
      // Clean up any quotes or extra whitespace
      return content.replace(/^["'\s]+|["'\s]+$/g, '').trim();
    }
    return null;
  } catch {
    return null;
  }
}

export interface TranslationResult {
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  method: 'dictionary' | 'mymemory' | 'gemini' | 'fallback';
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Main translation function — cascading strategy:
 * 1. Dictionary lookup (instant, highest accuracy for known terms)
 * 2. MyMemory API (free, good for English↔Swahili/Somali)
 * 3. Gemini API (for Kikuyu, Luo, and complex sentences)
 * 4. Fallback: return original with note
 */
export async function translate(
  text: string,
  sourceLang: string = 'english',
  targetLang: string = 'kiswahili'
): Promise<TranslationResult> {
  // Same language — return as-is
  if (sourceLang === targetLang) {
    return { original: text, translated: text, sourceLang, targetLang, method: 'dictionary', confidence: 'high' };
  }

  // Step 1: Dictionary lookup (single words/phrases)
  const dictResult = translateWithDictionary(text, targetLang);
  if (dictResult) {
    return { original: text, translated: dictResult, sourceLang, targetLang, method: 'dictionary', confidence: 'high' };
  }

  // Step 2: MyMemory API (free, works well for en↔sw and en↔so)
  if (['english', 'kiswahili', 'somali'].includes(sourceLang) &&
      ['english', 'kiswahili', 'somali'].includes(targetLang)) {
    const mmResult = await translateWithMyMemory(text, sourceLang, targetLang);
    if (mmResult) {
      return { original: text, translated: mmResult, sourceLang, targetLang, method: 'mymemory', confidence: 'medium' };
    }
  }

  // Step 3: Gemini API (for all languages, especially low-resource)
  const geminiResult = await translateWithGemini(text, sourceLang, targetLang);
  if (geminiResult) {
    return { original: text, translated: geminiResult, sourceLang, targetLang, method: 'gemini', confidence: 'medium' };
  }

  // Step 4: Fallback
  return { original: text, translated: text, sourceLang, targetLang, method: 'fallback', confidence: 'low' };
}

/** Batch translate multiple texts */
export async function batchTranslate(
  texts: string[],
  sourceLang: string = 'english',
  targetLang: string = 'kiswahili'
): Promise<TranslationResult[]> {
  return Promise.all(texts.map(t => translate(t, sourceLang, targetLang)));
}

/** Get all dictionary entries for display */
export function getDictionaryEntries(): { word: string; translations: Record<string, string> }[] {
  return Object.entries(DICTIONARY).map(([word, translations]) => ({
    word,
    translations,
  }));
}

/** Get dictionary categories */
export function getDictionaryCategories(): Record<string, string[]> {
  return {
    'Numbers': ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
    'Days of the Week': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    'Greetings': ['hello', 'thank you', 'goodbye', 'good morning', 'how are you'],
    'Animals': ['cow', 'goat', 'chicken', 'lion', 'elephant', 'giraffe', 'fish', 'bird'],
    'Colours': ['red', 'blue', 'green', 'yellow', 'white', 'black'],
    'Body Parts': ['head', 'eye', 'ear', 'hand', 'foot'],
    'Food': ['milk', 'bread', 'rice', 'banana', 'mango', 'egg', 'beans', 'maize'],
    'Family': ['mother', 'father', 'child', 'friend'],
    'Nature': ['water', 'sun', 'rain', 'tree', 'animal'],
    'School': ['school', 'teacher', 'book'],
    'Math': ['add', 'subtract', 'multiply', 'divide', 'equal', 'number', 'circle', 'triangle', 'square'],
  };
}
