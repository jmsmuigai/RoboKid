import { NextRequest, NextResponse } from 'next/server';

/**
 * Smart Content Generator API
 * Auto-generates content when buttons are clicked:
 * - Stories with Kenyan context
 * - Math puzzles for specific grades
 * - Language exercises
 * - Fun facts about Kenya/Africa
 * - Vocabulary in multiple languages
 */

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

async function generateWithGemini(prompt: string): Promise<string> {
  if (!GOOGLE_API_KEY) throw new Error('API key not configured');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
      }),
      signal: AbortSignal.timeout(20000),
    }
  );

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function POST(request: NextRequest) {
  try {
    const { type, grade, subject, language, topic } = await request.json();

    const langNames: Record<string, string> = {
      english: 'English', kiswahili: 'Kiswahili', kikuyu: 'Gĩkũyũ (Kikuyu)',
      luo: 'Dholuo (Luo)', somali: 'Somali',
    };
    const lang = langNames[language] || 'English';

    let prompt = '';

    switch (type) {
      case 'story':
        prompt = `Write a short, age-appropriate story for a Grade ${grade || 1} Kenyan child in ${lang}.
The story should:
- Be 150-200 words
- Be set in Kenya (mention real places like Nairobi, Mombasa, Maasai Mara, etc.)
- Use Kenyan names (Wanjiku, Ochieng, Amina, Kipchoge, etc.)
- Have a moral lesson
- Be engaging and fun for children aged 6-9
${subject ? `- Relate to the subject: ${subject}` : ''}
${topic ? `- Include the topic: ${topic}` : ''}

Write ONLY the story. Start with a title.`;
        break;

      case 'puzzle':
        prompt = `Create a fun ${subject || 'math'} puzzle for a Grade ${grade || 1} Kenyan child in ${lang}.
The puzzle should:
- Be age-appropriate for Grade ${grade || 1} (ages ${(grade || 1) + 5}-${(grade || 1) + 6})
- Use Kenyan context (matatus, shambas, market, animals)
- Include the question AND the answer
- Be engaging and colorful in description
${topic ? `- Focus on the topic: ${topic}` : ''}

Format: PUZZLE: [question]\\nHINT: [hint]\\nANSWER: [answer]\\nEXPLANATION: [why]`;
        break;

      case 'vocabulary':
        prompt = `Create a vocabulary lesson for a Grade ${grade || 1} Kenyan child.
Generate 8 words related to "${topic || 'animals'}" with translations in ALL of these languages:
- English
- Kiswahili
- Gĩkũyũ (Kikuyu)
- Dholuo (Luo)
- Somali

Format each word as:
🇬🇧 [English] | 🇰🇪 [Kiswahili] | 🏔️ [Kikuyu] | 🐟 [Luo] | 🌊 [Somali]

Be culturally accurate. Use the natural way a native speaker would say each word.`;
        break;

      case 'riddle':
        prompt = `Create 3 fun riddles (Kitendawili) for Kenyan children in ${lang}.
Each riddle should:
- Be about something familiar to Kenyan children
- Have a clear, clever answer
- Be appropriate for Grade ${grade || 1}

Format: RIDDLE: [riddle]\\nANSWER: [answer]`;
        break;

      case 'funfact':
        prompt = `Generate 5 amazing fun facts about Kenya and Africa for children aged 6-9.
Each fact should be:
- Surprising and interesting
- Easy to understand
- Related to nature, animals, geography, or culture
- Include an emoji

Format as a numbered list. Write in ${lang}.`;
        break;

      case 'poem':
        prompt = `Write a short, cheerful poem for Kenyan children in ${lang}.
The poem should:
- Be 8-12 lines
- Rhyme (if possible in the language)
- Be about ${topic || 'Kenya, nature, or school'}
- Be suitable for Grade ${grade || 1} children
- Include imagery of Kenya

Write ONLY the poem with a title.`;
        break;

      case 'exercise':
        prompt = `Create a learning exercise for Grade ${grade || 1} ${subject || 'Mathematics'} in ${lang}.
Topic: ${topic || 'counting'}
Generate 5 questions with:
- Clear instructions
- Multiple choice options (A, B, C, D) where applicable
- Answers at the bottom
- Kenyan context in examples

Be grade-appropriate and fun!`;
        break;

      case 'translation':
        prompt = `Translate the following text into ALL 5 RoboKid languages. Return translations in this exact format:

🇬🇧 English: [original or English translation]
🇰🇪 Kiswahili: [Kiswahili translation]
🏔️ Gĩkũyũ: [Kikuyu translation]
🐟 Dholuo: [Luo translation]
🌊 Somali: [Somali translation]

Text to translate: "${topic}"

Be culturally accurate — use natural phrasing that a native speaker would use.`;
        break;

      default:
        prompt = `Generate an educational activity for a Grade ${grade || 1} Kenyan child about ${topic || subject || 'learning'} in ${lang}. Make it fun, interactive, and culturally relevant to Kenya.`;
    }

    const content = await generateWithGemini(prompt);

    return NextResponse.json({
      content,
      type,
      grade,
      subject,
      language,
      topic,
      generatedAt: new Date().toISOString(),
      source: 'gemini-2.0-flash',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed', content: null },
      { status: 500 }
    );
  }
}
