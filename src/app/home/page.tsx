'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import useGeolocation from "@/hooks/useGeolocation";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';

export default function Home() {
  const location = useGeolocation();

  const Map = useMemo(() => dynamic(
    () => import('@/components/map/'),
    {
      loading: () => {
        return (<p
          className="flex justify-center items-center w-[100%] h-[100%] font-black text-4xl"
          style={{ color: "var(--green-300)" }}>O MAPA ESTÁ CARREGANDO...</p>)
      },
      ssr: false,
    }
  ), []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="bg-white-700 mx-auto w-[100%] h-[100%]">
        <Map posix={location as LatLngExpression | LatLngTuple} />
        <div className='absolute top-2 left-1/2 p-2 shadow-black z-1000 rounded -translate-x-1/2'
        >
          <div className='flex justify-center items-center space-x-8'>
            <Input
              size={120}
              type="text"
              id="location"
              name="location"
              placeholder="Destino"
              className='bg-white px-3 pt-5 pb-5'
            />
            <Button variant='green'>
              <Search />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
