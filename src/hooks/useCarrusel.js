import { useCallback, useEffect, useRef, useState } from 'react';
import useMovimientoReducido from './useMovimientoReducido';

function normalizarTotal(total) {
  const numero = Number(total);

  return Number.isFinite(numero) ? Math.max(0, Math.floor(numero)) : 0;
}

function normalizarIndice(indice, total) {
  if (total <= 0) {
    return 0;
  }

  const numero = Number(indice);
  const indiceEntero = Number.isFinite(numero) ? Math.floor(numero) : 0;

  return ((indiceEntero % total) + total) % total;
}

export default function useCarrusel({
  total = 0,
  intervalo = 8000,
  reanudarMs = 5000,
} = {}) {
  const movimientoReducido = useMovimientoReducido();
  const totalNormalizado = normalizarTotal(total);
  const [indice, setIndice] = useState(0);
  const [pausaManual, setPausaManual] = useState(false);
  const [pausaPorInteraccion, setPausaPorInteraccion] = useState(false);
  const [versionManual, setVersionManual] = useState(0);
  const [reinicio, setReinicio] = useState(0);
  const temporizadorReanudacion = useRef(null);

  const indiceActual = normalizarIndice(indice, totalNormalizado);
  const pausado =
    pausaManual ||
    pausaPorInteraccion ||
    movimientoReducido ||
    totalNormalizado <= 1;

  const limpiarTemporizadorReanudacion = useCallback(() => {
    if (temporizadorReanudacion.current !== null) {
      clearTimeout(temporizadorReanudacion.current);
      temporizadorReanudacion.current = null;
    }
  }, []);

  const programarReanudacion = useCallback(() => {
    limpiarTemporizadorReanudacion();
    temporizadorReanudacion.current = setTimeout(() => {
      temporizadorReanudacion.current = null;
      setPausaPorInteraccion(false);
    }, reanudarMs);
  }, [limpiarTemporizadorReanudacion, reanudarMs, setPausaPorInteraccion]);

  const iniciarInteraccion = useCallback(() => {
    limpiarTemporizadorReanudacion();
    setPausaPorInteraccion(true);
  }, [limpiarTemporizadorReanudacion, setPausaPorInteraccion]);

  const finalizarInteraccion = useCallback(() => {
    programarReanudacion();
  }, [programarReanudacion]);

  const registrarInteraccion = useCallback(() => {
    setPausaPorInteraccion(true);
    programarReanudacion();
  }, [programarReanudacion, setPausaPorInteraccion]);

  const alternarPausa = useCallback(() => {
    limpiarTemporizadorReanudacion();

    if (pausaManual) {
      setPausaManual(false);
      setPausaPorInteraccion(false);
      return;
    }

    setPausaManual(true);
  }, [
    limpiarTemporizadorReanudacion,
    pausaManual,
    setPausaManual,
    setPausaPorInteraccion,
  ]);

  const irA = useCallback(
    (destino) => {
      if (totalNormalizado <= 0) {
        return;
      }

      setIndice(normalizarIndice(destino, totalNormalizado));
      setVersionManual((valor) => valor + 1);
      setReinicio((valor) => valor + 1);
    },
    [totalNormalizado, setIndice, setVersionManual, setReinicio],
  );

  const irSiguiente = useCallback(() => {
    if (totalNormalizado <= 0) {
      return;
    }

    setIndice((actual) => normalizarIndice(actual + 1, totalNormalizado));
    setVersionManual((valor) => valor + 1);
    setReinicio((valor) => valor + 1);
  }, [totalNormalizado, setIndice, setVersionManual, setReinicio]);

  const irAnterior = useCallback(() => {
    if (totalNormalizado <= 0) {
      return;
    }

    setIndice((actual) => normalizarIndice(actual - 1, totalNormalizado));
    setVersionManual((valor) => valor + 1);
    setReinicio((valor) => valor + 1);
  }, [totalNormalizado, setIndice, setVersionManual, setReinicio]);

  useEffect(() => {
    if (pausado || intervalo <= 0) {
      return undefined;
    }

    const temporizador = setInterval(() => {
      setIndice((actual) => normalizarIndice(actual + 1, totalNormalizado));
    }, intervalo);

    return () => clearInterval(temporizador);
  }, [pausado, intervalo, totalNormalizado, reinicio]);

  useEffect(() => {
    return () => {
      limpiarTemporizadorReanudacion();
    };
  }, [limpiarTemporizadorReanudacion]);

  return {
    indice: indiceActual,
    total: totalNormalizado,
    pausado,
    pausaManual,
    movimientoReducido,
    versionManual,
    irAnterior,
    irSiguiente,
    irA,
    alternarPausa,
    iniciarInteraccion,
    finalizarInteraccion,
    registrarInteraccion,
  };
}
