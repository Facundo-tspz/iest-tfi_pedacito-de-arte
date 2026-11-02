import { Link } from 'react-router-dom';

const CLASE_ACCION =
  'mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-principal px-5 font-cuerpo text-sm font-semibold text-blanco transition-colors hover:bg-principal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo';

export default function EstadoVacio({ tipo = 'sin-resultados' }) {
  const sinProductos = tipo === 'sin-productos';
  const titulo = sinProductos ? 'Todavía no hay productos publicados' : 'No encontramos productos';
  const descripcion = sinProductos
    ? 'Volvé a visitarnos pronto para conocer las novedades.'
    : 'Probá con otra búsqueda o elegí una categoría diferente.';

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-contraste/15 bg-blanco/60 p-8 text-center"
    >
      <h2 className="font-titulos text-2xl font-semibold text-principal sm:text-3xl">{titulo}</h2>
      <p className="mx-auto mt-3 max-w-md font-cuerpo text-sm leading-relaxed text-contraste">
        {descripcion}
      </p>

      {!sinProductos ? (
        <Link to="/catalogo" className={CLASE_ACCION}>
          Ver todo el catálogo
        </Link>
      ) : null}
    </div>
  );
}
