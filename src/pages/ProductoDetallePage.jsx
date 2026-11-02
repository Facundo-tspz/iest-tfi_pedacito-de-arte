import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CtaWhatsApp from '../components/producto/CtaWhatsApp';
import GaleriaProducto from '../components/producto/GaleriaProducto';
import NotasPersonalizacion from '../components/producto/NotasPersonalizacion';
import OpcionesPersonalizacion from '../components/producto/OpcionesPersonalizacion';
import PrecioEstimado from '../components/producto/PrecioEstimado';
import MensajeError from '../components/catalogo/MensajeError';
import SEO from '../components/seo/SEO';
import NotFoundPage from './NotFoundPage';
import useProducto from '../hooks/useProducto';
import { formatearPrecio } from '../utils/precio';

function DetalleProducto({ producto }) {
  const [seleccion, setSeleccion] = useState({});
  const [notas, setNotas] = useState('');
  const opciones = producto.opciones ?? [];
  const tieneOpciones = opciones.some((opcion) => opcion.activo !== false);
  const opcionesSeleccionadas = opciones.filter(
    (opcion) => seleccion[opcion.tipo_opcion] === opcion.id,
  );
  const caracteristicas = producto.caracteristicas ?? [];

  const seleccionarOpcion = (tipo, id) => {
    setSeleccion((actual) => ({ ...actual, [tipo]: id }));
  };

  return (
    <section className="contenedor py-10 sm:py-14">
      <Link
        to="/catalogo"
        className="inline-flex items-center gap-2 font-cuerpo text-sm font-semibold text-principal transition-colors hover:text-contraste focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
      >
        <span aria-hidden="true">←</span>
        Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <GaleriaProducto producto={producto} />

        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-complementario-principal px-3 py-1 font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-principal">
            {producto.categoria.nombre}
          </span>
          <h1 className="mt-4 break-words font-titulos text-4xl font-bold leading-tight text-principal sm:text-5xl">
            {producto.nombre}
          </h1>
          <p className="mt-4 font-cuerpo text-base leading-relaxed text-contraste">
            {producto.descripcion}
          </p>

          <p className="mt-5 font-cuerpo text-sm text-contraste">
            <span className="font-semibold text-principal">Precio base:</span>{' '}
            <span className="text-base font-semibold text-principal">
              {formatearPrecio(producto.precio_base)}
            </span>
          </p>

          {caracteristicas.length > 0 ? (
            <section aria-labelledby="detalle-caracteristicas" className="mt-8">
              <h2
                id="detalle-caracteristicas"
                className="font-titulos text-2xl font-semibold text-principal"
              >
                Características
              </h2>
              <ul className="mt-3 grid gap-2 font-cuerpo text-sm text-contraste sm:grid-cols-2">
                {caracteristicas.map((caracteristica) => (
                  <li key={caracteristica} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-complementario-secundario">
                      •
                    </span>
                    {caracteristica}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          {tieneOpciones ? (
            <section aria-labelledby="detalle-personalizacion">
              <h2
                id="detalle-personalizacion"
                className="font-titulos text-2xl font-semibold text-principal"
              >
                Personalización
              </h2>
              <OpcionesPersonalizacion
                opciones={opciones}
                seleccion={seleccion}
                onSeleccionar={seleccionarOpcion}
              />
            </section>
          ) : null}

          <NotasPersonalizacion valor={notas} onCambiar={setNotas} />
        </div>

        <aside aria-label="Precio y consulta">
          <PrecioEstimado precioBase={producto.precio_base} opciones={opcionesSeleccionadas} />
          <CtaWhatsApp producto={producto} opciones={opcionesSeleccionadas} notas={notas} />
        </aside>
      </div>
    </section>
  );
}

export default function ProductoDetallePage() {
  const { slug } = useParams();
  const { producto, cargando, error, reintentar } = useProducto(slug);

  if (cargando) {
    return (
      <div className="contenedor py-16">
        <p role="status" className="font-cuerpo text-sm text-contraste">
          Cargando producto…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contenedor py-16">
        <MensajeError onReintentar={reintentar} />
      </div>
    );
  }

  if (!producto) {
    return (
      <>
        <SEO
          titulo="Producto no encontrado | Pedacito de Arte"
          descripcion="El producto solicitado no está disponible."
          url={`/catalogo/${slug ?? ''}`}
        />
        <NotFoundPage />
      </>
    );
  }

  return (
    <>
      <SEO
        titulo={producto.meta_titulo || `${producto.nombre} | Pedacito de Arte`}
        descripcion={producto.meta_descripcion || producto.descripcion}
        url={`/catalogo/${producto.slug}`}
        tipo="product"
      />
      <DetalleProducto key={producto.slug} producto={producto} />
    </>
  );
}
