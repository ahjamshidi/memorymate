import { Card } from '@/constances/interfaces';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const USERID = 1;
const NEWCAERDNUM = 30;
export const getStudyCardList = async (
  req: NextRequest,
  params: { topicId: string }
) => {
  try {
    const topicId = params.topicId;
    const Newcards = await prisma.flashcard.findMany({
      include: {
        topic: true,
      },
      where: {
        ownerId: USERID,
        topicId: parseInt(topicId),
        reviewTime: null,
      },
      take: NEWCAERDNUM,
    });
    const todayDateStart = new Date();
    todayDateStart.setHours(0, 0, 0, 0);
    const todayDateEnd = new Date();
    todayDateEnd.setHours(23, 59, 59, 59);
    const RewieCards = await prisma.flashcard.findMany({
      include: {
        topic: true,
      },
      where: {
        ownerId: USERID,
        topicId: parseInt(topicId),
        reviewTime: { gte: todayDateStart, lt: todayDateEnd },
      },
    });
    const lastReview = Newcards[0].topic
      ? Newcards[0].topic.updatedAt
      : RewieCards[0].topic
      ? RewieCards[0].topic.updatedAt
      : null;
    let resultArr: { new: Card[]; review: Card[]; lastReview: Date | null } = {
      new: Newcards,
      review: RewieCards,
      lastReview: lastReview,
    };

    return resultArr;
  } catch (error) {
    NextResponse.json({ error: 'Error fetching users' });
  }
};
