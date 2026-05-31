import { NextRequest, NextResponse } from 'next/server';
import { getAllContent } from '@/lib/content-agent';
import { examQuestions } from '@/lib/exam-bank';

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

async function generateWithHuggingFace(prompt: string): Promise<string> {
  const model = "Qwen/Qwen2.5-1.5B-Instruct";
  const hfToken = process.env.HF_TOKEN || "";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (hfToken) {
    headers["Authorization"] = `Bearer ${hfToken}`;
  }

  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      inputs: `<|im_start|>system\nYou are RoboKid AI, an educational companion for kids. Generate direct answers.<|im_end|>\n<|im_start|>user\n${prompt}<|im_end|>\n<|im_start|>assistant\n`,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        return_full_text: false,
      }
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`HuggingFace error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  let generatedText = "";
  if (Array.isArray(data)) {
    generatedText = data[0]?.generated_text || "";
  } else if (data?.generated_text) {
    generatedText = data.generated_text;
  } else if (typeof data === "string") {
    generatedText = data;
  }

  return generatedText.replace(/<\|im_end\|>/g, '').replace(/<\|im_start\|>/g, '').trim();
}

function generateOfflineFallback(type: string, grade: number, subject: string, language: string, topic: string): string {
  const isSwahili = language === 'kiswahili';
  
  switch (type) {
    case 'story': {
      const stories = getAllContent().filter(c => c.type === 'story' && c.language === language);
      const selected = stories[Math.floor(Math.random() * stories.length)] || getAllContent().find(c => c.type === 'story');
      return selected ? `TITLE: ${selected.title}\n\n${selected.content}` : "No offline story available.";
    }
    
    case 'puzzle': {
      const questions = examQuestions.filter(q => q.grade === (grade || 1) && q.subject === (subject || 'mathematics'));
      const selected = questions[Math.floor(Math.random() * questions.length)] || examQuestions[0];
      return `PUZZLE: ${selected.question}\nHINT: Try drawing it out.\nANSWER: ${selected.correctAnswer}\nEXPLANATION: ${selected.explanation || "That's the correct answer!"}`;
    }
    
    case 'vocabulary': {
      const vocabs = getAllContent().filter(c => c.type === 'vocabulary');
      const selected = vocabs[Math.floor(Math.random() * vocabs.length)];
      return selected ? selected.content : `🇬🇧 Banana | 🇰🇪 Ndizi | 🏔️ Marigu | 🐟 Rabolo | 🌊 Muus\n🇬🇧 Mango | 🇰🇪 Embe | 🏔️ Iembe | 🐟 Manga | 🌊 Cambe`;
    }
    
    case 'riddle': {
      const riddles = getAllContent().filter(c => c.type === 'riddle' && c.language === language);
      if (riddles.length > 0) {
        return riddles.map(r => r.content).join('\n\n');
      }
      return isSwahili 
        ? "RIDDLE: Nina miguu minne lakini sitembei. Mimi ni nini?\nANSWER: Kiti\n\nRIDDLE: Nina macho lakini sioni. Mimi ni nini?\nANSWER: Nazi"
        : "RIDDLE: I have a tail and a head, but no body. What am I?\nANSWER: A coin\n\nRIDDLE: I have teeth but cannot bite. What am I?\nANSWER: A comb";
    }
    
    case 'funfact': {
      const facts = getAllContent().filter(c => c.type === 'fun_fact' && c.language === language);
      if (facts.length > 0) {
        return facts.map((f, i) => `${i+1}. ${f.content}`).join('\n\n');
      }
      return isSwahili
        ? "1. Twiga ndiye mnyama mrefu zaidi duniani.\n2. Kenya ina milima miwili yenye theluji."
        : "1. 🐘 Elephants have the largest brain of any land animal.\n2. 🏔️ Mount Kenya has snow on its peaks even though it is on the equator.";
    }
    
    case 'poem': {
      const poems = getAllContent().filter(c => c.type === 'poem' && c.language === language);
      const selected = poems[Math.floor(Math.random() * poems.length)];
      return selected ? `${selected.title}\n\n${selected.content}` : "My Beautiful Kenya\nFrom the mountains high to the ocean blue,\nKenya, my homeland, I love you true.";
    }
    
    case 'exercise': {
      const questions = examQuestions.filter(q => q.grade === (grade || 1) && q.subject === (subject || 'mathematics'));
      if (questions.length > 0) {
        return questions.slice(0, 3).map((q, i) => {
          const opts = q.options ? q.options.join('\n') : '';
          return `${i+1}. ${q.question}\n${opts}\nAnswer: ${q.correctAnswer}\n`;
        }).join('\n');
      }
      return "1. 3 + 2 = ?\nA) 4\nB) 5\nC) 6\nD) 7\nAnswer: B";
    }
    
    case 'translation': {
      return `🇬🇧 English: Hello\n🇰🇪 Kiswahili: Habari\n🏔️ Gĩkũyũ: Wĩ mwega\n🐟 Dholuo: Misawa\n🌊 Somali: Salaan`;
    }
    
    default:
      return "Keep learning and smiling, RoboKid!";
  }
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

    let content = '';
    let apiSource = 'gemini-2.0-flash';

    try {
      content = await generateWithGemini(prompt);
    } catch (error) {
      console.warn('Gemini generate route error, trying HuggingFace fallback:', error);
      try {
        content = await generateWithHuggingFace(prompt);
        apiSource = 'huggingface-qwen';
      } catch (hfError) {
        console.error('HuggingFace generate route error, using Offline fallback:', hfError);
        content = generateOfflineFallback(type, grade, subject, language, topic);
        apiSource = 'offline-fallback';
      }
    }

    return NextResponse.json({
      content,
      type,
      grade,
      subject,
      language,
      topic,
      generatedAt: new Date().toISOString(),
      source: apiSource,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed', content: null },
      { status: 500 }
    );
  }
}
