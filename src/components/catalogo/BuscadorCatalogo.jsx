import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebouncedValue from '../../hooks/useDebouncedValue';

function describirResultados(cantidad) {
  return cantidad === 1 ? '1 resultado' : `${cantidad} resultados`;
}

export default function BuscadorCatalogo({ cantidadResultados }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscarUrl = searchParams.get('buscar') ?? '';
  const [texto, setTexto] = useState(buscarUrl);
  const textoDebounced = useDebouncedValue(texto, 300);

  useEffect(() => {
    if (textoDebounced === buscarUrl) {
      return;
    }

    const siguiente = new URLSearchParams(searchParams);

    if (textoDebounced.trim()) {
      siguiente.set('buscar', textoDebounced);
    } else {
      siguiente.delete('buscar');
    }

    setSearchParams(siguiente, { replace: true });
  }, [buscarUrl, searchParams, setSearchParams, textoDebounced]);

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="buscador-catalogo"
          className="font-cuerpo text-sm font-semibold text-principal"
        >
          Buscar en el catálogo
        </label>

        <div className="relative">
          <input
            id="buscador-catalogo"
            type="search"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Nombre, código o categoría"
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-contraste/20 bg-blanco/70 px-4 pr-12 font-cuerpo text-base text-principal placeholder:text-contraste/60 focus-visible:border-complementario-secundario focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
          />

          {texto ? (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setTexto('')}
              className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-lg text-contraste transition-colors hover:bg-fondo hover:text-principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
            >
              <span aria-hidden="true">×</span>
            </button>
          ) : null}
        </div>
      </div>

      {typeof cantidadResultados === 'number' ? (
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-3 font-cuerpo text-sm text-contraste"
        >
          {describirResultados(cantidadResultados)}
        </p>
      ) : null}
    </div>
  );
}
