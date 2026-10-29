import { useEffect, useState } from 'react';

const UMBRAL_FONDO = 8;

export default function useNavbarScroll(umbral = UMBRAL_FONDO) {
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const alScrollear = () => {
      setConFondo(window.scrollY > umbral);
    };

    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });

    return () => window.removeEventListener('scroll', alScrollear);
  }, [umbral]);

  return { conFondo };
}
