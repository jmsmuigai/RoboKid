// ============================================================
// RoboKid — Gemini Pro AI Engine
// Server-side only — API key never exposed to client
// ============================================================

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { KENYAN_CONTEXT, APP_CONFIG } from './constants';
import type { Grade, Subject, Language } from '@/types';

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

/** Generate a CBC-aligned puzzle */
export async function generatePuzzle(grade: Grade, subject: Subject, language: Language): Promise<string> {
  const model = getModel();
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

  const prompt = `${SYSTEM_PROMPT}

TASK: Create ONE short, interactive puzzle for a Grade ${grade} student (${ageMap[grade]}).
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

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini puzzle generation error:', error);
    throw new Error('Failed to generate puzzle');
  }
}

/** Translate content to target language */
export async function translateContent(
  text: string,
  targetLanguage: Language,
  grade: Grade
): Promise<string> {
  const model = getModel();
  const ageMap: Record<Grade, string> = { 
    1: '6-year-old', 2: '7-year-old', 3: '8-year-old', 
    4: '9-year-old', 5: '10-year-old', 6: '11-year-old', 
    7: '12-to-14-year-old (Advanced AI & Robotics)' 
  };

  const prompt = `${SYSTEM_PROMPT}

TASK: Translate the following text for a Grade ${grade} student (${ageMap[grade]}).
Target Language: ${targetLanguage}

RULES:
- Use simple, age-appropriate vocabulary
- Maintain the original meaning
- Use culturally appropriate expressions
- Return ONLY the translated text, nothing else

TEXT TO TRANSLATE:
${text}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate content');
  }
}

/** Generate a CBC lesson summary */
export async function generateLesson(
  grade: Grade,
  subject: Subject,
  topic: string,
  language: Language
): Promise<string> {
  const model = getModel();

  const prompt = `${SYSTEM_PROMPT}

TASK: Create a short, engaging lesson for a Grade ${grade} student.
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

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Lesson generation error:', error);
    throw new Error('Failed to generate lesson');
  }
}

/** Generate a story in any language */
export async function generateStory(
  grade: Grade,
  language: Language,
  theme?: string
): Promise<string> {
  const model = getModel();

  const prompt = `${SYSTEM_PROMPT}

TASK: Write a short, fun story for a Grade ${grade} student in ${language}.
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

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Story generation error:', error);
    throw new Error('Failed to generate story');
  }
}
