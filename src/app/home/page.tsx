import Maps from './map';
import { cookies } from 'next/headers'
import { verifyToken } from '@/utils/jwt';
import { account } from '../actions/auth';
import DrawerMaps from './drawerBar';


export default async function Home() {
  async function create() {
    'use server'
    const payload = await verifyToken(cookies().get('transpofacil-v.1.0.0')!.value)

    if (payload === 'invalid token') {
      console.log('Token inválido');
      throw new Error('Invalid token');
    }

    return {
      name: payload.payload.name as string,
      email: payload.payload.email as string,
      password: payload.payload.password as string,
    };
  }

  const currentUser: account = await create()

  return (
    <div className="w-[100vw] h-[100vh] relative">
      <Maps />
      <DrawerMaps currentUser={currentUser}></DrawerMaps>
    </div>
  );
}
