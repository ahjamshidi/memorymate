import { NextRequest, NextResponse } from 'next/server';
import { getTopics } from '@/controllers/topicControllers';
export async function GET(req: NextRequest, res: NextResponse) {
  const topics = await getTopics(req, res);
  return NextResponse.json({ data: topics, message: 'TOPICS' });
}
export async function POST() {
  return NextResponse.json({ message: 'POST TOPIC' });
}
