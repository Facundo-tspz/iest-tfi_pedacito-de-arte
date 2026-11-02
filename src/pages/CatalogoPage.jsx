import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BuscadorCatalogo from '../components/catalogo/BuscadorCatalogo';
import EstadoVacio from '../components/catalogo/EstadoVacio';
import FiltrosCategoria from '../components/catalogo/FiltrosCategoria';
import GrillaProductos from '../components/catalogo/GrillaProductos';
import MensajeError from '../components/catalogo/MensajeError';
import SkeletonCard from '../components/catalogo/SkeletonCard';
import SEO from '../components/seo/SEO';
import Seccion from '../components/ui/Seccion';
import useCatalogo from '../hooks/useCatalogo';
import { obtenerCategorias } from '../services/catalogo';

const CANTIDAD_SKELETONS = 8;

export default function CatalogoPage() {
  const [searchParams] = useSearchParams();
  const categoriaUrl = searchParams.get('categoria') ?? '';
  const buscar = searchParams.get('buscar') ?? '';
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    let activo = true;

    obtenerCategorias()
      .then((datos) => {
        if (activo) {
          setCategorias(Array.isArray(datos) ? datos : []);
        }
      })
      .catch(() => {
        if (activo) {
          setCategorias([]);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const { productos, cargando, error, reintentar } = useCatalogo({
    categoria: categoriaUrl || undefined,
    buscar,
  });
  const categoriaValida =
    !categoriaUrl || categorias.some((categoria) => categoria.slug === categoriaUrl);
  const mostrarAvisoCategoria = Boolean(categoriaUrl) && categorias.length > 0 && !categoriaValida;
  const hayFiltrosActivos = Boolean(buscar.trim()) || Boolean(categoriaUrl);
  const cantidadResultados = cargando || error ? undefined : productos.length;

  return (
    <>
      <SEO
        titulo="Catálogo de Productos | Pedacito de Arte"
        descripcion="Explorá agendas, agendas docentes, anotadores y revistas para colorear. Personalizá tu encargo y consultá por WhatsApp."
        url="/catalogo"
      />

      <Seccion
        nivelTitulo={1}
        titulo="Catálogo"
        descripcion="Explorá las cuatro líneas de papelería y encontrá la pieza que buscás."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <BuscadorCatalogo cantidadResultados={cantidadResultados} />
          <FiltrosCategoria categorias={categorias} />
        </div>

        {mostrarAvisoCategoria ? (
          <p role="status" className="mt-4 font-cuerpo text-sm text-contraste">
            La categoría seleccionada no está disponible. Mostrando todos los productos.
          </p>
        ) : null}

        <div className="mt-8" aria-busy={cargando}>
          {cargando ? (
            <div role="status" aria-live="polite">
              <span className="sr-only">Cargando productos…</span>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: CANTIDAD_SKELETONS }, (_, indice) => (
                  <SkeletonCard key={`skeleton-${indice}`} />
                ))}
              </div>
            </div>
          ) : null}

          {!cargando && error ? <MensajeError onReintentar={reintentar} /> : null}

          {!cargando && !error && productos.length === 0 ? (
            <EstadoVacio tipo={hayFiltrosActivos ? 'sin-resultados' : 'sin-productos'} />
          ) : null}

          {!cargando && !error && productos.length > 0 ? (
            <GrillaProductos productos={productos} />
          ) : null}
        </div>
      </Seccion>
    </>
  );
}
