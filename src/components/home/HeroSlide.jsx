import { Link } from 'react-router-dom';
import PlaceholderImagen from '../ui/PlaceholderImagen';
import { formatearPrecio } from '../../utils/precio';

function ImagenHero({ producto, posicion }) {
  const imagen = producto.imagenes?.[0];
  const alt = imagen?.alt || `Imagen de ${producto.nombre}`;

  if (imagen?.url) {
    return (
      <img
        src={imagen.url}
        alt={alt}
        loading={posicion === 0 ? 'eager' : 'lazy'}
        fetchPriority={posicion === 0 ? 'high' : 'auto'}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <PlaceholderImagen
      alt={alt}
      aspecto="portada"
      texto="Foto de escena próximamente"
      className="absolute inset-0 h-full w-full rounded-none border-0"
    />
  );
}

export default function HeroSlide({ producto, activo, posicion, total }) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${posicion + 1} de ${total}`}
      aria-hidden={!activo}
      className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
        activo ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
      }`}
    >
      <ImagenHero producto={producto} posicion={posicion} />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-principal/95 via-principal/75 to-principal/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-principal/95 via-transparent to-transparent"
      />

      <div className="relative z-10 flex h-full items-end pb-28 pt-36 sm:items-center sm:pb-0 sm:pt-0">
        <div className="contenedor">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-complementario-principal px-3 py-1 font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-principal">
              {producto.categoria.nombre}
            </span>

            <h2 className="mt-4 font-titulos text-4xl font-bold leading-tight text-blanco sm:text-5xl lg:text-6xl">
              {producto.nombre}
            </h2>

            <p className="mt-4 line-clamp-2 max-w-xl font-cuerpo text-base leading-relaxed text-blanco/90 sm:line-clamp-3 sm:text-lg">
              {producto.descripcion}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to={`/catalogo/${producto.slug}`}
                tabIndex={activo ? undefined : -1}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blanco px-6 font-cuerpo text-base font-semibold text-principal transition-colors hover:bg-fondo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-principal"
              >
                Ver producto
              </Link>

              <span className="font-cuerpo text-lg font-semibold text-blanco">
                {formatearPrecio(producto.precio_base)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
