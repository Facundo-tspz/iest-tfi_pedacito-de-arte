import { useEffect, useState } from 'react';

export default function useDebouncedValue(valor, retardo = 300) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorDebounced(valor);
    }, retardo);

    return () => clearTimeout(temporizador);
  }, [valor, retardo]);

  return valorDebounced;
}
