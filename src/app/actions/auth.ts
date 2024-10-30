'use server';

import { generateToken, verifyToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (formDataRaw.email == 'teste@teste.com' && formDataRaw.password == 'teste123456') {
    const cookieAuth = await generateToken(formDataRaw);
    cookies().set({
      name: 'transpofacil-v.1.0.0',
      value: cookieAuth,
      httpOnly: false,
      path: '/',
    });

    redirect('/home');
  }

  return;
};

export { signIn };
