import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const USERID = 1;
export const getTopics = async (req: NextRequest, res: NextResponse) => {
  try {
    const topics = await prisma.topic.findMany({ where: { ownerId: USERID } });
    return topics;
  } catch (error) {
    NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
};
