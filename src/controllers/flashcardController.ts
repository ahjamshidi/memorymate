import { Card } from '@/constances/interfaces';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const USERID = 1;
const NEWCAERDNUM = 30;
export const setCardReview = async (
  req: NextRequest,
  params: { cardId: string }
) => {
  try {
    // -- last review null => { Again: 6m, Hard: 10m, Good: 1d, Easy: 4d } TODO develop proper algorithm for repeate
    const levels: {
      Again: number;
      Hard: number;
      Good: number;
      Easy: number;
    } = {
      Again: 6 * 60 * 1000,
      Hard: 10 * 60 * 1000,
      Good: 24 * 60 * 60 * 1000,
      Easy: 4 * 24 * 60 * 60 * 1000,
    };

    const body: { id: number; level: 'Again' | 'Hard' | 'Good' | 'Easy' } =
      await req.json();
    const result = await prisma.flashcard.update({
      where: { id: body.id },
      data: {
        reviewTime: new Date(new Date().getTime() + levels[body.level]),
        updatedAt: new Date(),
        topic: {
          update: {
            data: {
              updatedAt: new Date(),
            },
          },
        },
      },
    });
    return body;
  } catch (error) {
    NextResponse.json({ error: 'Error fetching users' });
  }
};
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
    return error;
  }
};
