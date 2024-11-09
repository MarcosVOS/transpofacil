'use client';

import useGeolocation from "@/hooks/useGeolocation";
import { LatLngExpression, LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Maps() {
    const location = useGeolocation();

    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map/'), {
                loading: () => (
                    <p className="flex justify-center items-center w-full h-full font-black text-4xl" style={{ color: 'var(--green-300)' }}>
                        O MAPA ESTÁ CARREGANDO...
                    </p>
                ),
                ssr: false,
            }),
        [],
    );

    return <Map posix={location as LatLngExpression | LatLngTuple} />;
}