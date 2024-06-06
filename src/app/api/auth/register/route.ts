import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/controllers/authController';
export async function POST(req: NextRequest) {
  try {
    const result = await registerUser(req);
    if (!result.success) {
      return NextResponse.json({
        error: result.error,
        message: 'Can not register becues of these errors',
      });
    }
    return NextResponse.json({ data: result, message: 'User Register' });
  } catch (error) {
    return NextResponse.json({ message: 'Method not allowed', error });
  }
}
