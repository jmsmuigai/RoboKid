import { NextResponse } from 'next/server';
import { generatePuzzle } from '@/lib/gemini';
import type { Grade, Subject, Language } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { grade, subject, language, contentType } = body as {
      grade: Grade;
      subject: Subject;
      language: Language;
      contentType: string;
    };

    // Validate inputs
    if (!grade || !subject || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: grade, subject, language' },
        { status: 400 }
      );
    }

    const validGrades = [1, 2, 3];
    if (!validGrades.includes(grade)) {
      return NextResponse.json({ error: 'Invalid grade. Must be 1, 2, or 3' }, { status: 400 });
    }

    // Generate content based on type
    const content = await generatePuzzle(grade, subject, language);

    return NextResponse.json({
      content,
      metadata: {
        grade,
        subject,
        language,
        contentType: contentType || 'puzzle',
        generatedAt: new Date().toISOString(),
        model: 'gemini-2.0-flash',
      },
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
