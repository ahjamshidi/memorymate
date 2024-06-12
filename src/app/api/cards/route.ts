import { NextRequest, NextResponse } from 'next/server';
import { setCardReview } from '@/controllers/flashcardController';

export async function POST( req:NextRequest,{ params }: { params: { cardId: string } }) {
  const result = await setCardReview(req,params);
  return NextResponse.json({data:result, message: 'POST TOPIC' });
}
