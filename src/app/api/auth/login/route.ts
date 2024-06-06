import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/controllers/authController';
export async function POST(req: NextRequest) {
  try {
    return loginUser(req);
  } catch (error) {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}
