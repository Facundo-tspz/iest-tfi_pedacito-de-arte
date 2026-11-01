import { useCallback, useEffect, useState } from 'react';
import { obtenerProductoPorSlug } from '../services/catalogo';

function crearClave(slug, intento) {
  return JSON.stringify([slug ?? null, intento]);
}

export default function useProducto(slug) {
  const [intento, setIntento] = useState(0);
  const clave = crearClave(slug, intento);
  const [resultado, setResultado] = useState({
    clave: null,
    producto: null,
    error: null,
    cargando: true,
  });

  useEffect(() => {
    let activo = true;

    obtenerProductoPorSlug(slug)
      .then((datos) => {
        if (activo) {
          setResultado({
            clave,
            producto: datos,
            error: null,
            cargando: false,
          });
        }
      })
      .catch((fallo) => {
        if (activo) {
          setResultado({
            clave,
            producto: null,
            error: fallo,
            cargando: false,
          });
        }
      });

    return () => {
      activo = false;
    };
  }, [slug, clave]);

  const reintentar = useCallback(() => {
    setIntento((valor) => valor + 1);
  }, []);

  return {
    producto: resultado.clave === clave ? resultado.producto : null,
    cargando: resultado.clave !== clave || resultado.cargando,
    error: resultado.clave === clave ? resultado.error : null,
    reintentar,
  };
}
