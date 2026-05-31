// ============================================================
// RoboKid — Gemini Pro AI Engine with Smart HF & Offline Fallbacks
// Server-side only — API key never exposed to client
// ============================================================

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { KENYAN_CONTEXT, APP_CONFIG } from './constants';
import type { Grade, Subject, Language } from '@/types';
import { examQuestions } from './exam-bank';
import { curriculumTopics } from './curriculum-data';
import { getAllContent } from './content-agent';

// Initialize Gemini — server-side only
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Safety settings for child-safe content
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

/** Get the Gemini model instance */
function getModel() {
  return genAI.getGenerativeModel({
    model: APP_CONFIG.geminiModel,
    safetySettings,
  });
}

/** System prompt for all RoboKid Gemini interactions */
const SYSTEM_PROMPT = `You are RoboKid AI — a friendly, enthusiastic Kenyan CBC (Competency-Based Curriculum) expert and early childhood educator. You create interactive, educational content for Grade 1-3 children in Kenya.

IMPORTANT RULES:
1. All content MUST be age-appropriate for children aged 6-8 years
2. Use a warm, encouraging, and playful tone
3. Set scenarios in KENYAN contexts using:
   - Kenyan names: ${KENYAN_CONTEXT.names.boys.join(', ')}, ${KENYAN_CONTEXT.names.girls.join(', ')}
   - Kenyan places: ${KENYAN_CONTEXT.places.join(', ')}
   - Kenyan landmarks: ${KENYAN_CONTEXT.landmarks.join(', ')}
   - Kenyan foods: ${KENYAN_CONTEXT.foods.join(', ')}
   - Kenyan transport: ${KENYAN_CONTEXT.transport.join(', ')}
   - Kenyan animals: ${KENYAN_CONTEXT.animals.join(', ')}
   - Kenyan farming: ${KENYAN_CONTEXT.farming.join(', ')}
4. Keep vocabulary simple and grade-appropriate
5. Never include violent, scary, or inappropriate content
6. Celebrate Kenya's diversity and culture
7. Use Kenya Shillings (KES) for money questions`;

/** Hugging Face serverless inference helper */
async function queryHuggingFace(prompt: string, maxTokens = 1000): Promise<string> {
  const model = "Qwen/Qwen2.5-1.5B-Instruct";
  const hfToken = process.env.HF_TOKEN || "";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (hfToken) {
    headers["Authorization"] = `Bearer ${hfToken}`;
  }

  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inputs: `<|im_start|>system\n${SYSTEM_PROMPT}<|im_end|>\n<|im_start|>user\n${prompt}<|im_end|>\n<|im_start|>assistant\n`,
      parameters: {
        max_new_tokens: maxTokens,
        temperature: 0.7,
        return_full_text: false,
      },
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  let generatedText = "";
  if (Array.isArray(data)) {
    generatedText = data[0]?.generated_text || "";
  } else if (data?.generated_text) {
    generatedText = data.generated_text;
  } else if (typeof data === "string") {
    generatedText = data;
  }

  // Clean conversational chat markup from assistant response if present
  generatedText = generatedText.replace(/<\|im_end\|>/g, '').replace(/<\|im_start\|>/g, '').trim();
  return generatedText;
}

/** Offline fallbacks for when both APIs fail */
function getOfflinePuzzle(grade: Grade, subject: Subject, language: Language): string {
  const matchingQuestions = examQuestions.filter(
    (q) => q.grade === grade && q.subject === subject
  );

  let selectedQ = matchingQuestions[Math.floor(Math.random() * matchingQuestions.length)];
  if (!selectedQ) {
    const gradeQuestions = examQuestions.filter((q) => q.grade === grade);
    selectedQ = gradeQuestions[Math.floor(Math.random() * gradeQuestions.length)];
  }
  if (!selectedQ) {
    selectedQ = examQuestions[0];
  }

  const isSwahili = language === 'kiswahili';
  const puzzle = {
    question: selectedQ.question,
    options: selectedQ.options || ["A) 1", "B) 2", "C) 3", "D) 4"],
    correct: selectedQ.correctAnswer || "A",
    explanation: selectedQ.explanation || (isSwahili ? "Jibu sahihi ni nzuri!" : "Well done, that is correct!"),
    hint: selectedQ.kenyanContext || (isSwahili ? "Fikiria kwa makini" : "Think carefully about the question"),
    funFact: isSwahili 
      ? "RoboKid inakusaidia kujifunza hisabati na sayansi kwa urahisi!" 
      : "Robots use computer code to solve hard math problems in milliseconds!"
  };

  return JSON.stringify(puzzle);
}

function getOfflineTranslation(text: string, targetLanguage: Language): string {
  const lowerText = text.toLowerCase().trim();
  
  const greetings: Record<string, Record<Language, string>> = {
    "hello": { english: "Hello", kiswahili: "Habari", kikuyu: "Wĩ mwega", luo: "Misawa", somali: "Salaan" },
    "thank you": { english: "Thank you", kiswahili: "Asante", kikuyu: "Nĩ wega", luo: "Erokamano", somali: "Mahadsanid" },
    "goodbye": { english: "Goodbye", kiswahili: "Kwaheri", kikuyu: "Tigwo na wega", luo: "Oriti", somali: "Nabadgelyo" }
  };

  for (const [key, langMap] of Object.entries(greetings)) {
    if (lowerText.includes(key)) {
      return langMap[targetLanguage] || text;
    }
  }

  return text;
}

function getOfflineLesson(grade: Grade, subject: Subject, topic: string, language: Language): string {
  const matchingTopics = curriculumTopics.filter(
    (t) => t.grade === grade && t.subject === subject
  );

  let selectedTopic = matchingTopics.find((t) => 
    t.title.toLowerCase().includes(topic.toLowerCase()) || 
    topic.toLowerCase().includes(t.title.toLowerCase())
  );

  if (!selectedTopic) {
    selectedTopic = matchingTopics[Math.floor(Math.random() * matchingTopics.length)];
  }

  if (!selectedTopic) {
    selectedTopic = curriculumTopics.find((t) => t.grade === grade) || curriculumTopics[0];
  }

  const isSwahili = language === 'kiswahili';

  const lesson = {
    title: selectedTopic.title,
    introduction: selectedTopic.description || `Welcome to this special lesson on ${selectedTopic.title}! We will learn step-by-step.`,
    keyPoints: selectedTopic.learningOutcomes || [
      "Understand the basic concept",
      "Apply the knowledge in everyday life",
      "Practice with real-life examples"
    ],
    activity: selectedTopic.suggestedActivities?.[0] || "Draw a picture representing what you learned today in your notebook.",
    vocabularyWords: (selectedTopic.keywords || ["learning"]).map(kw => ({
      word: kw,
      meaning: isSwahili ? "Neno muhimu la kujifunza leo" : "An important keyword for today's lesson."
    })),
    checkUnderstanding: isSwahili 
      ? `Je, umeelewa nini kuhusu ${selectedTopic.title}?` 
      : `What was the most interesting part of ${selectedTopic.title}?`
  };

  return JSON.stringify(lesson);
}

function getOfflineStory(grade: Grade, language: Language, theme?: string): string {
  const stories = getAllContent().filter(
    (c) => c.type === 'story' && c.grade === grade && c.language === language
  );

  let selectedStory = stories[Math.floor(Math.random() * stories.length)];
  if (!selectedStory) {
    const langStories = getAllContent().filter((c) => c.type === 'story' && c.language === language);
    selectedStory = langStories[Math.floor(Math.random() * langStories.length)];
  }
  if (!selectedStory) {
    const anyStories = getAllContent().filter((c) => c.type === 'story');
    selectedStory = anyStories[Math.floor(Math.random() * anyStories.length)];
  }

  if (!selectedStory) {
    return JSON.stringify({
      title: "Adventure in the Savannah",
      story: "Once upon a time, a clever little bird guided a lost baby elephant back to its family in Tsavo. All the animals rejoiced and sang songs of friendship.",
      moral: "Helping others brings great joy.",
      questions: ["Who was guided back to their family?", "Where did the story happen?"]
    });
  }

  const lines = selectedStory.content.split('\n\n');
  const storyText = lines.filter(l => !l.startsWith('Moral:') && !l.startsWith('Funzo:')).join('\n\n');
  const moralLine = lines.find(l => l.startsWith('Moral:') || l.startsWith('Funzo:'));
  const moral = moralLine ? moralLine.replace(/^(Moral:|Funzo:)\s*/, '') : "Kindness and cleverness are always rewarded.";

  const story = {
    title: selectedStory.title,
    story: storyText,
    moral: moral,
    questions: [
      "Who was the main character in the story?",
      "What was the moral lesson of the story?"
    ]
  };

  return JSON.stringify(story);
}

/** Generate a CBC-aligned puzzle */
export async function generatePuzzle(grade: Grade, subject: Subject, language: Language): Promise<string> {
  const ageMap: Record<Grade, string> = { 
    1: '6-year-old', 2: '7-year-old', 3: '8-year-old', 
    4: '9-year-old', 5: '10-year-old', 6: '11-year-old', 
    7: '12-to-14-year-old (Advanced AI & Robotics)' 
  };

  const subjectMap: Record<Subject, string> = {
    mathematics: 'Mathematics Activities (numbers, counting, shapes, measurement)',
    environmental: 'Environmental Activities (nature, hygiene, nutrition, conservation)',
    english: 'English Language Activities (reading, writing, speaking)',
    kiswahili: 'Kiswahili Language Activities (kusoma, kuandika, kuzungumza)',
    indigenous: 'Indigenous Language Activities (mother tongue learning)',
    creative: 'Creative Activities (art, music, movement)',
    religious: 'Religious Education Activities (values, morals)',
  };

  const langMap: Record<Language, string> = {
    english: 'English',
    kiswahili: 'Kiswahili',
    kikuyu: 'Gĩkũyũ (Kikuyu)',
    luo: 'Dholuo (Luo)',
    somali: 'Af-Soomaali (Somali)',
  };

  const prompt = `TASK: Create ONE short, interactive puzzle for a Grade ${grade} student (${ageMap[grade]}).
Subject: ${subjectMap[subject]}
Language: ${langMap[language]}

REQUIREMENTS:
- The puzzle should be fun and engaging
- Include a clear question and 4 multiple-choice options (A, B, C, D)
- Mark the correct answer
- Add a brief, encouraging explanation
- Use Kenyan context (names, places, foods, animals)
- Keep it appropriate for a ${ageMap[grade]}
- Write entirely in ${langMap[language]}

FORMAT your response as JSON:
{
  "question": "the puzzle question",
  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "correct": "A",
  "explanation": "brief explanation",
  "hint": "a helpful hint",
  "funFact": "an interesting fact related to the topic"
}`;

  // 1. Try Gemini
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");
    const model = getModel();
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${prompt}`);
    return result.response.text();
  } catch (error) {
    console.warn('Gemini generatePuzzle error, trying HuggingFace fallback:', error);
    
    // 2. Try Hugging Face
    try {
      return await queryHuggingFace(prompt, 600);
    } catch (hfError) {
      console.error('HuggingFace generatePuzzle error, using Offline fallback:', hfError);
      
      // 3. Fall back to Offline template
      return getOfflinePuzzle(grade, subject, language);
    }
  }
}

/** Translate content to target language */
export async function translateContent(
  text: string,
  targetLanguage: Language,
  grade: Grade
): Promise<string> {
  const ageMap: Record<Grade, string> = { 
    1: '6-year-old', 2: '7-year-old', 3: '8-year-old', 
    4: '9-year-old', 5: '10-year-old', 6: '11-year-old', 
    7: '12-to-14-year-old (Advanced AI & Robotics)' 
  };

  const prompt = `TASK: Translate the following text for a Grade ${grade} student (${ageMap[grade]}).
Target Language: ${targetLanguage}

RULES:
- Use simple, age-appropriate vocabulary
- Maintain the original meaning
- Use culturally appropriate expressions
- Return ONLY the translated text, nothing else

TEXT TO TRANSLATE:
${text}`;

  // 1. Try Gemini
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");
    const model = getModel();
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${prompt}`);
    return result.response.text();
  } catch (error) {
    console.warn('Gemini translateContent error, trying HuggingFace fallback:', error);
    
    // 2. Try Hugging Face
    try {
      return await queryHuggingFace(prompt, 500);
    } catch (hfError) {
      console.error('HuggingFace translateContent error, using Offline fallback:', hfError);
      
      // 3. Fall back to Offline template
      return getOfflineTranslation(text, targetLanguage);
    }
  }
}

/** Generate a CBC lesson summary */
export async function generateLesson(
  grade: Grade,
  subject: Subject,
  topic: string,
  language: Language
): Promise<string> {
  const prompt = `TASK: Create a short, engaging lesson for a Grade ${grade} student.
Subject: ${subject}
Topic: ${topic}
Language: ${language}

FORMAT as JSON:
{
  "title": "lesson title",
  "introduction": "fun opening paragraph",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "activity": "a hands-on activity for the student",
  "vocabularyWords": [{"word": "...", "meaning": "..."}],
  "checkUnderstanding": "a simple question to check comprehension"
}`;

  // 1. Try Gemini
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");
    const model = getModel();
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${prompt}`);
    return result.response.text();
  } catch (error) {
    console.warn('Gemini generateLesson error, trying HuggingFace fallback:', error);
    
    // 2. Try Hugging Face
    try {
      return await queryHuggingFace(prompt, 800);
    } catch (hfError) {
      console.error('HuggingFace generateLesson error, using Offline fallback:', hfError);
      
      // 3. Fall back to Offline template
      return getOfflineLesson(grade, subject, topic, language);
    }
  }
}

/** Generate a story in any language */
export async function generateStory(
  grade: Grade,
  language: Language,
  theme?: string
): Promise<string> {
  const prompt = `TASK: Write a short, fun story for a Grade ${grade} student in ${language}.
Theme: ${theme || 'Adventure in Kenya'}

RULES:
- Maximum 150 words
- Use simple vocabulary appropriate for the grade
- Include Kenyan characters, settings, and cultural elements
- Include a moral lesson
- Make it exciting and engaging

FORMAT as JSON:
{
  "title": "story title",
  "story": "the full story text",
  "moral": "the moral of the story",
  "questions": ["comprehension question 1", "comprehension question 2"]
}`;

  // 1. Try Gemini
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");
    const model = getModel();
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${prompt}`);
    return result.response.text();
  } catch (error) {
    console.warn('Gemini generateStory error, trying HuggingFace fallback:', error);
    
    // 2. Try Hugging Face
    try {
      return await queryHuggingFace(prompt, 800);
    } catch (hfError) {
      console.error('HuggingFace generateStory error, using Offline fallback:', hfError);
      
      // 3. Fall back to Offline template
      return getOfflineStory(grade, language, theme);
    }
  }
}
