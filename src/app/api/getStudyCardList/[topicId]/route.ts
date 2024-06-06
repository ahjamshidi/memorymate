import { NextRequest, NextResponse } from 'next/server';
import { getStudyCardList } from '@/controllers/flashcardController';
export async function GET(
  req: NextRequest,
  { params }: { params: { topicId: string } }
) {
  const topics = await getStudyCardList(req, params);
  return NextResponse.json({ date: topics, message: 'GET TOPIC' });
}
export async function POST() {
  return NextResponse.json({ message: 'POST TOPIC' });
}
