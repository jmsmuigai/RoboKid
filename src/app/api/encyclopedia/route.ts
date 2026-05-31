import { NextRequest, NextResponse } from 'next/server';
import {
  getSubStrandsForGrade,
  getSubStrandsForGradeAndTerm,
  getEncyclopediaStats,
  searchEncyclopedia,
  getStrandsForSubject,
} from '@/lib/cbc-encyclopedia';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'stats';
  const grade = searchParams.get('grade') ? parseInt(searchParams.get('grade')!) as 1 | 2 | 3 : undefined;
  const term = searchParams.get('term') ? parseInt(searchParams.get('term')!) as 1 | 2 | 3 : undefined;
  const subject = searchParams.get('subject') || undefined;
  const query = searchParams.get('q') || undefined;

  try {
    switch (action) {
      case 'stats':
        return NextResponse.json({ stats: getEncyclopediaStats(), source: 'cbc-encyclopedia' });

      case 'strands':
        if (!subject) return NextResponse.json({ error: 'Subject required' }, { status: 400 });
        return NextResponse.json({
          strands: getStrandsForSubject(subject as any),
          source: 'cbc-encyclopedia',
        });

      case 'substrands':
        if (!grade) return NextResponse.json({ error: 'Grade required' }, { status: 400 });
        const subStrands = term
          ? getSubStrandsForGradeAndTerm(grade, term)
          : getSubStrandsForGrade(grade, subject);
        return NextResponse.json({ subStrands, count: subStrands.length, source: 'cbc-encyclopedia' });

      case 'search':
        if (!query) return NextResponse.json({ error: 'Query (q) required' }, { status: 400 });
        const results = searchEncyclopedia(query);
        return NextResponse.json({ results, count: results.length, query, source: 'cbc-encyclopedia' });

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
