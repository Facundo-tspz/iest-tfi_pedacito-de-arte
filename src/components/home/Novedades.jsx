import { useEffect, useState } from 'react';
import { obtenerDestacados, obtenerNovedades } from '../../services/catalogo';
import ProductoCard from '../catalogo/ProductoCard';
import Seccion from '../ui/Seccion';

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let activo = true;

    obtenerDestacados(4)
      .then((destacados) => {
        const slugsHero = destacados.map((producto) => producto.slug);

        return obtenerNovedades(4, slugsHero);
      })
      .then((datos) => {
        if (!activo) {
          return;
        }

        setNovedades(Array.isArray(datos) ? datos : []);
        setEstado('listo');
      })
      .catch(() => {
        if (!activo) {
          return;
        }

        setNovedades([]);
        setEstado('error');
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <Seccion titulo="Novedades" descripcion="Otras piezas de papelería para inspirarte.">
      {estado === 'cargando' ? (
        <p role="status" className="font-cuerpo text-sm text-contraste">
          Cargando novedades…
        </p>
      ) : null}

      {estado === 'error' ? (
        <p role="alert" className="font-cuerpo text-sm text-contraste">
          No pudimos cargar las novedades en este momento.
        </p>
      ) : null}

      {estado === 'listo' && novedades.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {novedades.map((producto) => (
            <li key={producto.id}>
              <ProductoCard producto={producto} />
            </li>
          ))}
        </ul>
      ) : null}

      {estado === 'listo' && novedades.length === 0 ? (
        <p className="font-cuerpo text-sm text-contraste">
          No hay novedades para mostrar en este momento.
        </p>
      ) : null}
    </Seccion>
  );
}
