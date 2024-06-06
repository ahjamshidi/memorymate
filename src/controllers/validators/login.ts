import prisma from '@/lib/prisma';
import { z } from 'zod';
export const loginSchemaValidator = async (data: {}) => {
  const schema = z.object({
    password: z.string(),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
  });
  return await schema.parse(data);
};
