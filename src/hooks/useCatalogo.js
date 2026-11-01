import { useCallback, useEffect, useState } from 'react';
import { obtenerProductos } from '../services/catalogo';

function crearClave(categoria, buscar, intento) {
  return JSON.stringify([categoria ?? null, buscar ?? null, intento]);
}

export default function useCatalogo({ categoria, buscar } = {}) {
  const [intento, setIntento] = useState(0);
  const clave = crearClave(categoria, buscar, intento);
  const [resultado, setResultado] = useState({
    clave: null,
    productos: [],
    error: null,
    cargando: true,
  });

  useEffect(() => {
    let activo = true;

    obtenerProductos({ categoria, buscar })
      .then((datos) => {
        if (activo) {
          setResultado({
            clave,
            productos: datos,
            error: null,
            cargando: false,
          });
        }
      })
      .catch((fallo) => {
        if (activo) {
          setResultado({
            clave,
            productos: [],
            error: fallo,
            cargando: false,
          });
        }
      });

    return () => {
      activo = false;
    };
  }, [categoria, buscar, clave]);

  const reintentar = useCallback(() => {
    setIntento((valor) => valor + 1);
  }, []);

  return {
    productos: resultado.clave === clave ? resultado.productos : [],
    cargando: resultado.clave !== clave || resultado.cargando,
    error: resultado.clave === clave ? resultado.error : null,
    reintentar,
  };
}
