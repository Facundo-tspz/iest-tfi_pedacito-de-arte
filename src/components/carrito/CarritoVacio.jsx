import { Link } from 'react-router-dom';

export default function CarritoVacio() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-contraste/15 bg-blanco/60 p-8 text-center"
    >
      <h2 className="font-titulos text-2xl font-semibold text-principal">Tu carrito está vacío</h2>
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
  );
}
