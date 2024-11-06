'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import useGeolocation from '@/hooks/useGeolocation';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserRound } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export default function Home() {
  const location = useGeolocation();

  const [query, setQuery] = useState('');

  const suggestions = [
    'Amador Bueno',
    'Brás',
    'Bruno Covas Mendes Vila Natal',
    'Calmon Viana',
    'Capão Redondo',
    'Chácara Klabin',
    'Corinthians-Itaquera',
    'Estudantes',
    'Jabaquara',
    'Jardim Colonial',
    'Julio Prestes',
    'Jundiai',
    'Luz',
    'Osasco',
    'Palmeiras-Barra Funda',
    'Rio Grande da Serra',
    'Tamanduatei',
    'Tucuruvi',
    'Vila Madalena',
    'Vila Prudente',
    'Vila Sônia',
  ].sort();

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/'), {
        loading: () => (
          <p
            className="flex justify-center items-center w-full h-full font-black text-4xl"
            style={{ color: 'var(--green-300)' }}
          >
            O MAPA ESTÁ CARREGANDO...
          </p>
        ),
        ssr: false,
      }),
    [],
  );

  return (
    <div className="w-[100vw] h-[100vh] relative">
      <div className="bg-white-700 mx-auto w-full h-full">
        <Map posix={location as LatLngExpression | LatLngTuple} />

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
            <Button variant="green">
              <Search />
            </Button>
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
