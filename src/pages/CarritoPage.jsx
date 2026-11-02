import { Link } from 'react-router-dom';
import BotonEnviarCarrito from '../components/carrito/BotonEnviarCarrito';
import CarritoVacio from '../components/carrito/CarritoVacio';
import ItemCarrito from '../components/carrito/ItemCarrito';
import ResumenCarrito from '../components/carrito/ResumenCarrito';
import SEO from '../components/seo/SEO';
import useCarrito from '../hooks/useCarrito';

export default function CarritoPage() {
  const {
    items,
    cantidadTotal,
    totalEstimado,
    tienePreciosPendientes,
    aviso,
    limpiarAviso,
    cambiarCantidad,
    quitar,
    vaciar,
  } = useCarrito();

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
          <div className="mt-8">
            <CarritoVacio />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.clave}>
                  <ItemCarrito item={item} onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <ResumenCarrito
                cantidadTotal={cantidadTotal}
                totalEstimado={totalEstimado}
                tienePreciosPendientes={tienePreciosPendientes}
                onVaciar={vaciar}
              />
              <BotonEnviarCarrito items={items} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
