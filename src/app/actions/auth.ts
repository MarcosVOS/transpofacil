'use server';

import { generateToken, verifyToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const emails = [
  'marcos@marcos.com',
  'guilherme@guilherme.com',
  'teste@teste.com',
  'renan@renan.com',
  'stefani@stefani.com',
  'ana@ana.com',
  'gi@gi.com',
  'julia@julia.com',
  'matheus@matheus.com',
];

const passwords = [
  'marcos1234',
  'guilherme1234',
  'teste1234',
  'renan1234',
  'stefani1234',
  'ana1234',
  'gi1234',
  'julia1234',
  'matheus1234',
];

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  if (checksAuthorization(formDataRaw.email, formDataRaw.password)) {
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

const checksAuthorization = (email: string, password: string): Boolean => {
  const validEmail = emails.filter((emailIn) => emailIn === email).length > 0;
  const validPassword =
    passwords.filter((passwordIn) => passwordIn === password).length > 0;

  return validEmail && validPassword;
};

export { signIn };
