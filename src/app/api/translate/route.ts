import { NextRequest, NextResponse } from 'next/server';
import { translate, batchTranslate, getDictionaryEntries, getDictionaryCategories } from '@/lib/translation-service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'dictionary';

  if (action === 'dictionary') {
    return NextResponse.json({
      entries: getDictionaryEntries(),
      categories: getDictionaryCategories(),
      totalWords: getDictionaryEntries().length,
      languages: ['english', 'kiswahili', 'kikuyu', 'luo', 'somali'],
    });
  }

  return NextResponse.json({ error: 'Use POST for translations, GET for dictionary' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, texts, sourceLang, targetLang, action } = body;

    if (action === 'batch' && Array.isArray(texts)) {
      const results = await batchTranslate(texts, sourceLang || 'english', targetLang || 'kiswahili');
      return NextResponse.json({ results, count: results.length });
    }

    if (!text) {
      return NextResponse.json({ error: 'Text required' }, { status: 400 });
    }

    const result = await translate(text, sourceLang || 'english', targetLang || 'kiswahili');
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}
