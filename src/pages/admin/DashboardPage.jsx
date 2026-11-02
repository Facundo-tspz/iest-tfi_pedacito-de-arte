import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { obtenerCategorias, obtenerProductos } from '../../services/catalogo';

export default function DashboardPage() {
  const { usuario } = useOutletContext();
  const [resumen, setResumen] = useState({
    productos: null,
    categorias: null,
    error: false,
  });

  useEffect(() => {
    let activo = true;

    Promise.all([obtenerProductos(), obtenerCategorias()])
      .then(([productos, categorias]) => {
        if (activo) {
          setResumen({
            productos: productos.length,
            categorias: categorias.length,
            error: false,
          });
        }
      })
      .catch(() => {
        if (activo) {
          setResumen({ productos: null, categorias: null, error: true });
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div>
      <div className="max-w-2xl">
        <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-contraste">
          Bienvenido
        </p>
        <h2 className="mt-2 font-titulos text-3xl font-semibold text-principal sm:text-4xl">
          Hola, {usuario.nombre}.
        </h2>
        <p className="mt-3 font-cuerpo text-base leading-relaxed text-contraste">
          Este es el punto de partida para administrar el catálogo del taller.
        </p>
      </div>

      {resumen.error ? (
        <p role="alert" className="mt-6 font-cuerpo text-sm text-secundario">
          No se pudo cargar el resumen del catálogo.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-contraste/15 bg-blanco p-5">
          <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
            Productos
          </p>
          <p className="mt-3 font-titulos text-4xl font-semibold text-principal">
            {resumen.productos ?? '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-contraste/15 bg-blanco p-5">
          <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
            Categorías
          </p>
          <p className="mt-3 font-titulos text-4xl font-semibold text-principal">
            {resumen.categorias ?? '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-contraste/15 bg-blanco p-5">
          <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
            Medios
          </p>
          <p className="mt-3 font-cuerpo text-sm text-contraste">
            Disponible en el próximo bloque.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-complementario-principal/40 bg-complementario-principal/10 p-5">
        <h3 className="font-titulos text-2xl font-semibold text-principal">Próximo paso</h3>
        <p className="mt-2 max-w-2xl font-cuerpo text-sm leading-relaxed text-contraste">
          La gestión de medios y productos se habilita en el Bloque C. La sesión y el dashboard ya
          están funcionando.
        </p>
      </div>
    </div>
  );
}
