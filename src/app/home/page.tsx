import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserRound } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Maps from './map';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/jwt';
import { account } from '../actions/auth';

const suggestions = [
  'Amador Bueno', 'Brás', 'Bruno Covas Mendes Vila Natal', 'Calmon Viana',
  'Capão Redondo', 'Chácara Klabin', 'Corinthians-Itaquera', 'Estudantes',
  'Jabaquara', 'Jardim Colonial', 'Julio Prestes', 'Jundiai', 'Luz', 'Osasco',
  'Palmeiras-Barra Funda', 'Rio Grande da Serra', 'Tamanduatei', 'Tucuruvi',
  'Vila Madalena', 'Vila Prudente', 'Vila Sônia'
].sort();

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


  console.log("currentUser: ", currentUser)


  return (
    <div className="w-[100vw] h-[100vh] relative">
      <Maps />
      <div className="bg-white-700 mx-auto w-full h-full">
        <div className="absolute top-2 left-1/2 p-2 shadow-black z-1000 rounded -translate-x-1/2">
          <div className="flex justify-center items-center space-x-8">
            <Input
              size={120}
              type="text"
              id="location"
              list="suggestions"
              name="location"
              placeholder="Destino"
              className="bg-white px-3 pt-5 pb-5"
            />
            <datalist id="suggestions">
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="green">
                  <Search />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="z-[1002] h-[60vh]">
                <DrawerHeader>
                  <DrawerTitle>Sejá bem vindo(a) {currentUser.name}</DrawerTitle>
                  <DrawerDescription>Tudo certo</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className='flex flex-row justify-center'>
                  <Button variant="green">Comprar</Button>
                  <DrawerClose>
                    <Button variant="destructive">Cancelar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="absolute top-2 right-2 z-1000">
          <Avatar className="flex flex-col justify-center items-center bg-[var(--green-300)] text-white rounded-full p-4">
            <AvatarImage alt="@shadcn" />
            <UserRound size={18} />
          </Avatar>
        </div>
      </div>
    </div>
  );
}
