import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerCategorias } from '../../services/catalogo';
import Seccion from '../ui/Seccion';

export default function CategoriasHome() {
  const [categorias, setCategorias] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let activo = true;

    obtenerCategorias()
      .then((datos) => {
        if (!activo) {
          return;
        }

        setCategorias(Array.isArray(datos) ? datos : []);
        setEstado('listo');
      })
      .catch(() => {
        if (!activo) {
          return;
        }

        setCategorias([]);
        setEstado('error');
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <Seccion
      titulo="Categorías"
      descripcion="Cuatro líneas de papelería para encontrar lo que buscás."
    >
      {estado === 'cargando' ? (
        <p role="status" className="font-cuerpo text-sm text-contraste">
          Cargando categorías…
        </p>
      ) : null}

      {estado === 'error' ? (
        <p role="alert" className="font-cuerpo text-sm text-contraste">
          No pudimos cargar las categorías en este momento.
        </p>
      ) : null}

      {estado === 'listo' && categorias.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria, indice) => (
            <li key={categoria.id}>
              <Link
                to={`/catalogo?categoria=${encodeURIComponent(categoria.slug)}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-contraste/15 bg-blanco/60 p-5 transition-colors hover:border-complementario-secundario hover:bg-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
              >
                <div>
                  <span
                    aria-hidden="true"
                    className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-principal"
                  >
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-titulos text-2xl font-semibold leading-tight text-principal">
                    {categoria.nombre}
                  </h3>
                  <p className="mt-2 font-cuerpo text-sm leading-relaxed text-contraste">
                    {categoria.descripcion}
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-2 font-cuerpo text-sm font-semibold text-principal">
                  Ver categoría
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {estado === 'listo' && categorias.length === 0 ? (
        <p className="font-cuerpo text-sm text-contraste">No hay categorías disponibles.</p>
      ) : null}
    </Seccion>
  );
}
