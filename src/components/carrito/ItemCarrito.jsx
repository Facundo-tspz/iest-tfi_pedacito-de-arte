import { calcularSubtotalItem } from '../../utils/carrito';
import { formatearPrecio } from '../../utils/precio';
import PlaceholderImagen from '../ui/PlaceholderImagen';

function ImagenItem({ item }) {
  const alt = item.imagen?.alt || `Imagen de ${item.nombre}`;

  if (item.imagen?.url) {
    return (
      <img
        src={item.imagen.url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-24 w-24 rounded-xl object-cover"
      />
    );
  }

  return (
    <PlaceholderImagen alt={alt} aspecto="cuadrado" texto="Foto" className="h-24 w-24 rounded-xl" />
  );
}

export default function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
  const subtotal = calcularSubtotalItem(item);
  const opciones = item.opciones.length
    ? item.opciones.map((opcion) => `${opcion.tipo_opcion}: ${opcion.valor}`).join(' | ')
    : 'Sin preferencia';
  const notas = item.notas || 'Sin notas';

  return (
    <article className="rounded-2xl border border-contraste/15 bg-blanco/60 p-4 shadow-sm shadow-principal/5">
      <div className="flex gap-4">
        <ImagenItem item={item} />

        <div className="min-w-0 flex-1">
          <span className="font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste">
            {item.categoria.nombre}
          </span>
          <h3 className="mt-1 break-words font-titulos text-xl font-semibold text-principal">
            {item.nombre}
          </h3>
          <p className="mt-2 break-words font-cuerpo text-sm text-contraste">
            Opciones: {opciones}
          </p>
          <p className="mt-1 break-words font-cuerpo text-sm text-contraste">Notas: {notas}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-contraste/15 bg-fondo">
              <button
                type="button"
                aria-label={`Restar una unidad de ${item.nombre}`}
                onClick={() => onCambiarCantidad(item.clave, item.cantidad - 1)}
                disabled={item.cantidad <= 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-principal transition-colors hover:bg-blanco disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
              >
                −
              </button>
              <span
                aria-live="polite"
                aria-label={`Cantidad: ${item.cantidad}`}
                className="min-w-8 text-center font-cuerpo text-sm font-semibold text-principal"
              >
                {item.cantidad}
              </span>
              <button
                type="button"
                aria-label={`Sumar una unidad de ${item.nombre}`}
                onClick={() => onCambiarCantidad(item.clave, item.cantidad + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold text-principal transition-colors hover:bg-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => onQuitar(item.clave)}
              className="font-cuerpo text-sm font-semibold text-contraste underline-offset-4 hover:text-principal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
            >
              Quitar
            </button>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="font-cuerpo text-sm font-semibold text-principal">
            {subtotal === null ? 'Precio a confirmar' : formatearPrecio(subtotal)}
          </span>
        </div>
      </div>
    </article>
  );
}
