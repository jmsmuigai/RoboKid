import { NextResponse } from 'next/server';
import { getRandomContent, getDailyContent, getContentByType, getAgentStats, addContentToCache, getAllContent } from '@/lib/content-agent';
import type { Grade, Language } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'daily';
  const grade = parseInt(searchParams.get('grade') || '1') as Grade;
  const type = searchParams.get('type');
  const language = searchParams.get('language') as Language | null;

  switch (action) {
    case 'daily':
      return NextResponse.json({ content: getDailyContent(grade), source: 'content-agent' });
    case 'random':
      const count = parseInt(searchParams.get('count') || '5');
      return NextResponse.json({ content: getRandomContent(count, grade), source: 'content-agent' });
    case 'type':
      if (!type) return NextResponse.json({ error: 'type parameter required' }, { status: 400 });
      return NextResponse.json({ content: getContentByType(type as any, grade, language || undefined), source: 'content-agent' });
    case 'all':
      return NextResponse.json({ content: getAllContent(), source: 'content-agent' });
    case 'stats':
      return NextResponse.json({ stats: getAgentStats(), source: 'content-agent' });
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newContent = addContentToCache(body);
    return NextResponse.json({ content: newContent, message: 'Content added to library' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add content' }, { status: 500 });
  }
}
