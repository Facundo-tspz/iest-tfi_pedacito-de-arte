import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerDestacados, obtenerNovedades } from '../../services/catalogo';
import { formatearPrecio } from '../../utils/precio';
import PlaceholderImagen from '../ui/PlaceholderImagen';
import Seccion from '../ui/Seccion';

function ImagenNovedad({ producto }) {
  const imagen = producto.imagenes?.[0];
  const alt = imagen?.alt || `Imagen de ${producto.nombre}`;

  if (imagen?.url) {
    return (
      <img
        src={imagen.url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }

  return (
    <PlaceholderImagen
      alt={alt}
      aspecto="tarjeta"
      texto="Foto próximamente"
      className="rounded-none border-0"
    />
  );
}

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
              <Link
                to={`/producto/${producto.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-contraste/15 bg-blanco/60 transition-colors hover:border-complementario-secundario hover:bg-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
              >
                <ImagenNovedad producto={producto} />

                <div className="flex flex-1 flex-col p-4">
                  <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste">
                    {producto.categoria.nombre}
                  </span>
                  <h3 className="mt-2 font-titulos text-xl font-semibold leading-tight text-principal">
                    {producto.nombre}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-cuerpo text-sm leading-relaxed text-contraste">
                    {producto.descripcion}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="font-cuerpo text-sm font-semibold text-principal">
                      {formatearPrecio(producto.precio_base)}
                    </span>
                    <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-principal">
                      Ver producto
                    </span>
                  </div>
                </div>
              </Link>
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
