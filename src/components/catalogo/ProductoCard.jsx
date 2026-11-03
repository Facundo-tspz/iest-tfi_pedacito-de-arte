import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/precio';
import { obtenerImagenPrincipal } from '../../utils/imagenes';
import PlaceholderImagen from '../ui/PlaceholderImagen';

function ImagenProducto({ producto }) {
  const imagen = obtenerImagenPrincipal(producto);
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

export default function ProductoCard({ producto }) {
  return (
    <article className="h-full">
      <Link
        to={`/catalogo/${producto.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-contraste/15 bg-blanco/60 transition-colors hover:border-complementario-secundario hover:bg-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
      >
        <ImagenProducto producto={producto} />

        <div className="flex flex-1 flex-col p-4">
          <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste">
            {producto.categoria.nombre}
          </span>
          <h3 className="mt-2 break-words font-titulos text-xl font-semibold leading-tight text-principal">
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
              Ver detalle
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
