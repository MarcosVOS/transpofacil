'use client';

import { useState, useEffect } from 'react';

export default function useGeolocation() {
  const [location, setLocation] = useState([-23.5582918, -46.6620722]);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        () => {
          console.warn('Unable to retrieve location. Using default.');
        },
        options,
      );
    }
  }, []);

  return location;
}
