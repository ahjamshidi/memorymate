import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const USERID = 1;
export const getStudyCardList = async (
  req: NextRequest,
  params: { topicId: string }
) => {
  try {
    const topicId = params.topicId;
    const cards = await prisma.flashcard.findMany({
      where: {
        ownerId: USERID,
        topicId: parseInt(topicId),
      },
    });
    return cards;
  } catch (error) {
    NextResponse.json({ error: 'Error fetching users' });
  }
};
