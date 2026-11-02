import { useSearchParams } from 'react-router-dom';

export default function FiltrosCategoria({ categorias = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaUrl = searchParams.get('categoria') ?? '';
  const slugsValidos = new Set(categorias.map((categoria) => categoria.slug));
  const categoriaActiva = slugsValidos.has(categoriaUrl) ? categoriaUrl : '';
  const filtros = [{ slug: '', nombre: 'Todas' }, ...categorias];

  const seleccionarCategoria = (slug) => {
    const siguiente = new URLSearchParams(searchParams);

    if (slug) {
      siguiente.set('categoria', slug);
    } else {
      siguiente.delete('categoria');
    }

    setSearchParams(siguiente);
  };

  return (
    <div role="group" aria-label="Filtros de categoría" className="flex flex-wrap gap-2">
      {filtros.map((categoria) => {
        const activo = categoria.slug === categoriaActiva;

        return (
          <button
            key={categoria.slug || 'todas'}
            type="button"
            aria-pressed={activo}
            onClick={() => seleccionarCategoria(categoria.slug)}
            className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 font-cuerpo text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo ${
              activo
                ? 'border-principal bg-principal text-blanco'
                : 'border-contraste/20 bg-blanco/60 text-principal hover:border-complementario-secundario hover:bg-blanco'
            }`}
          >
            {categoria.nombre}
          </button>
        );
      })}
    </div>
  );
}
