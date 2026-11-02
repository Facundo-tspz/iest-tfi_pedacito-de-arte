import { Link } from 'react-router-dom';
import ItemCarrito from '../components/carrito/ItemCarrito';
import SEO from '../components/seo/SEO';
import useCarrito from '../hooks/useCarrito';

export default function CarritoPage() {
  const { items, aviso, limpiarAviso, cambiarCantidad, quitar } = useCarrito();

  return (
    <>
      <SEO
        titulo="Carrito de encargos | Pedacito de Arte"
        descripcion="Revisá los productos, opciones y cantidades de tu encargo antes de enviarlo por WhatsApp."
        url="/carrito"
      />

      <section className="contenedor py-10 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-contraste">
              Encargos
            </p>
            <h1 className="mt-2 font-titulos text-4xl font-semibold text-principal sm:text-5xl">
              Carrito de encargos
            </h1>
          </div>

          <Link
            to="/catalogo"
            className="font-cuerpo text-sm font-semibold text-principal underline-offset-4 hover:text-contraste hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
          >
            Seguir viendo el catálogo
          </Link>
        </div>

        {aviso ? (
          <div
            role="status"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-complementario-principal/40 bg-complementario-principal/15 p-4 font-cuerpo text-sm text-principal sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{aviso}</p>
            <button
              type="button"
              onClick={limpiarAviso}
              className="self-start font-cuerpo text-xs font-semibold text-principal underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo sm:self-auto"
            >
              Cerrar aviso
            </button>
          </div>
        ) : null}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-contraste/15 bg-blanco/60 p-8 text-center">
            <h2 className="font-titulos text-2xl font-semibold text-principal">
              Tu carrito está vacío
            </h2>
            <p className="mx-auto mt-3 max-w-md font-cuerpo text-sm leading-relaxed text-contraste">
              Elegí una pieza del catálogo y agregala para armar tu encargo.
            </p>
            <Link
              to="/catalogo"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-principal px-5 font-cuerpo text-sm font-semibold text-blanco transition-colors hover:bg-principal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li key={item.clave}>
                <ItemCarrito item={item} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
