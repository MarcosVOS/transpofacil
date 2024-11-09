'use server';

import { generateToken, verifyToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const accounts = [
  { name: 'marcos', email: 'marcos@marcos.com', password: 'marcos1234' },
  { name: 'guilherme', email: 'guilherme@guilherme.com', password: 'guilherme1234' },
  { name: 'teste', email: 'teste@teste.com', password: 'teste1234' },
  { name: 'renan', email: 'renan@renan.com', password: 'renan1234' },
  { name: 'stefani', email: 'stefani@stefani.com', password: 'stefani1234' },
  { name: 'ana', email: 'ana@ana.com', password: 'ana1234' },
  { name: 'gi', email: 'gi@gi.com', password: 'gi1234' },
  { name: 'julia', email: 'julia@julia.com', password: 'julia1234' },
  { name: 'matheus', email: 'matheus@matheus.com', password: 'matheus1234' },
];

const signIn = async (formData: FormData) => {
  if (
    checksAuthorization(
      formData.get('email') as string,
      formData.get('password') as string,
    )
  ) {
    const account = accounts.find((account) => account.email === formData.get('email'));

    console.log('AccountStatus: ', account);

    const cookieAuth = await generateToken(account);
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
  const validAccount =
    accounts.filter((account) => {
      return account.email === email && account.password === password;
    }).length > 0;
  return validAccount;
};

export { signIn };
