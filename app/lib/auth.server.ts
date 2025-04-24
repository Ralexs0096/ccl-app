import { prisma } from '~/db/client';
// import bcrypt from 'bcryptjs';

type Credentials = {
  email: string;
  password: string;
};

export async function validateCredentials({ email, password }: Credentials) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) return null;

  // TODO: Hash password
  // const isValid = await bcrypt.compare(password, user.password);
  const isValid = password === user.password;
  return isValid ? user : null;
}
