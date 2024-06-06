import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterSchemaValidator } from './validators/register';
import { loginSchemaValidator } from './validators/login';
export const registerUser = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await RegisterSchemaValidator(body.email, body);
    const hashedPassword = await hashPass(body.password);
    const newUser = await prisma.user.create({
      data: { name: body.name, email: body.email, password: hashedPassword },
    });
    const SEKTOKEN: string = process.env.JWT_SECRET || '';
    const accessToken = jwt.sign({ _id: newUser.id }, SEKTOKEN, {
      expiresIn: '5h',
    });
    return { success: true, data: accessToken };
  } catch (error) {
    //TODO improve error handeling
    return { success: false, error };
  }
};
export const loginUser = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await loginSchemaValidator(body);

    const existUser = await prisma.user.findFirst({
      where: { email: body.email },
    });
    if (existUser) {
      const passCheck = await bcrypt.compare(body.password, existUser.password);
      console.log(passCheck);
      if (!passCheck) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 405 }
        );
      }
      const SEKTOKEN: string = process.env.JWT_SECRET || '';
      const accessToken = jwt.sign({ _id: existUser.id }, SEKTOKEN, {
        expiresIn: '5h',
      });
      const { password, createdAt, updatedAt, ...returnUser } = existUser;
      return NextResponse.json({
        message: 'User login',
        date: { accessToken, data: returnUser },
      });
    }
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 405 }
    );
  } catch (error) {
    NextResponse.json({ error: 'Error fetching users' }, { status: 405 });
  }
};
async function hashPass(password: string) {
  return await bcrypt.hash(password, 10);
}
