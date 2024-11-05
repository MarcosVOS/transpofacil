'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import useGeolocation from "@/hooks/useGeolocation";
import { LatLngExpression, LatLngTuple } from 'leaflet';

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
      </div>
    </div>
  );
}
