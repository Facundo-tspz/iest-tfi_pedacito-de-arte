import { useEffect, useState } from 'react';

const CONSULTA_MOVIMIENTO_REDUCIDO = '(prefers-reduced-motion: reduce)';

function obtenerPreferencia() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO).matches;
}

export default function useMovimientoReducido() {
  const [movimientoReducido, setMovimientoReducido] = useState(obtenerPreferencia);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia(CONSULTA_MOVIMIENTO_REDUCIDO);
    const alCambiar = (evento) => setMovimientoReducido(evento.matches);

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', alCambiar);

      return () => media.removeEventListener('change', alCambiar);
    }

    media.addListener(alCambiar);

    return () => media.removeListener(alCambiar);
  }, []);

  return movimientoReducido;
}
