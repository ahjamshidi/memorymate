import prisma from '@/lib/prisma';
import { z } from 'zod';
export const RegisterSchemaValidator = async (email: string,data:{}) => {
  const schema = z.object({
    name: z.string().min(3, { message: 'Must be 3 or more characters long' }),
    password: z
      .string()
      .min(6, { message: 'Must be 6 or more characters long' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .refine(
        async (val) => {
          const existUser = await prisma.user.findFirst({ where: { email } });

          return existUser ? false : true;
        },
        {
          message: 'This Email Exsit!',
        }
      ),
  });
  return await schema.parseAsync(data);
};
