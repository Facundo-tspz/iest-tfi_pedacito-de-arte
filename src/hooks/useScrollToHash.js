import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMovimientoReducido from './useMovimientoReducido';

const OFFSET_NAVBAR_POR_DEFECTO = 96;

function obtenerId(hash) {
  if (typeof hash !== 'string' || !hash.startsWith('#')) {
    return '';
  }

  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return hash.slice(1);
  }
}

export default function useScrollToHash(offset = OFFSET_NAVBAR_POR_DEFECTO) {
  const { hash } = useLocation();
  const movimientoReducido = useMovimientoReducido();
  const movimientoReducidoRef = useRef(movimientoReducido);

  useEffect(() => {
    movimientoReducidoRef.current = movimientoReducido;
  }, [movimientoReducido]);

  useEffect(() => {
    const id = obtenerId(hash);

    if (!id) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      const elemento = document.getElementById(id);

      if (!elemento) {
        return;
      }

      const top =
        elemento.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: movimientoReducidoRef.current ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, offset]);
}
