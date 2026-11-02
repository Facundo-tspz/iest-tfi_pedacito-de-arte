import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCarrusel from '../../hooks/useCarrusel';
import { obtenerDestacados } from '../../services/catalogo';
import HeroSlide from './HeroSlide';

const INTERVALO_HERO = 8000;

function IconoFlecha({ direccion }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {direccion === 'izquierda' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

function IconoPausa() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="h-5 w-5"
    >
      <path d="M8 5v14M16 5v14" />
    </svg>
  );
}

function IconoPlay() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5l11 7-11 7V5z" />
    </svg>
  );
}

function BotonControl({ etiqueta, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={etiqueta}
      onClick={(evento) => {
        evento.stopPropagation();
        onClick();
      }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blanco/40 bg-principal/60 text-blanco backdrop-blur transition-colors hover:bg-principal/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-principal"
    >
      {children}
    </button>
  );
}

function BarraProgreso({ pausado }) {
  const estiloAnimacion = {
    animationName: 'progreso-hero',
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',
    animationPlayState: pausado ? 'paused' : 'running',
  };

  return (
    <div
      data-testid="progreso-hero"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 z-20 grid h-1.5 grid-cols-[6fr_1fr_1fr] gap-1 bg-principal/40 px-0.5"
    >
      <div className="relative h-full overflow-hidden rounded-full bg-blanco/20">
        <div
          data-testid="progreso-relleno"
          className="h-full origin-left rounded-full bg-complementario-principal"
          style={{ ...estiloAnimacion, animationDuration: '6s' }}
        />
      </div>
      <div className="relative h-full overflow-hidden rounded-full bg-blanco/20">
        <div
          className="h-full origin-left rounded-full bg-complementario-principal"
          style={{
            ...estiloAnimacion,
            animationDuration: '1s',
            animationDelay: '6s',
          }}
        />
      </div>
      <div className="relative h-full overflow-hidden rounded-full bg-blanco/20">
        <div
          className="h-full origin-left rounded-full bg-complementario-principal"
          style={{
            ...estiloAnimacion,
            animationDuration: '1s',
            animationDelay: '7s',
          }}
        />
      </div>
    </div>
  );
}

export default function HeroDestacados() {
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [anuncio, setAnuncio] = useState('');

  useEffect(() => {
    let activo = true;

    obtenerDestacados(4)
      .then((datos) => {
        if (!activo) {
          return;
        }

        setProductos(Array.isArray(datos) ? datos : []);
        setEstado('listo');
      })
      .catch(() => {
        if (!activo) {
          return;
        }

        setProductos([]);
        setEstado('error');
      });

    return () => {
      activo = false;
    };
  }, []);

  const total = productos.length;
  const carrusel = useCarrusel({ total, intervalo: INTERVALO_HERO });
  const hayProductos = estado === 'listo' && total > 0;
  const mostrarControles = hayProductos && total > 1;

  const manejarSiguiente = () => {
    if (total <= 0) {
      return;
    }

    const destino = (carrusel.indice + 1) % total;

    carrusel.registrarInteraccion();
    carrusel.irSiguiente();
    setAnuncio(`Producto ${destino + 1} de ${total}: ${productos[destino]?.nombre ?? ''}`);
  };

  const manejarAnterior = () => {
    if (total <= 0) {
      return;
    }

    const destino = (carrusel.indice - 1 + total) % total;

    carrusel.registrarInteraccion();
    carrusel.irAnterior();
    setAnuncio(`Producto ${destino + 1} de ${total}: ${productos[destino]?.nombre ?? ''}`);
  };

  return (
    <section
      role="region"
      aria-roledescription="carrusel"
      aria-label="Productos destacados"
      aria-busy={estado === 'cargando'}
      onMouseEnter={carrusel.registrarInteraccion}
      onFocusCapture={carrusel.registrarInteraccion}
      onClick={carrusel.registrarInteraccion}
      onTouchStart={carrusel.registrarInteraccion}
      onKeyDown={carrusel.registrarInteraccion}
      className="relative isolate h-[80vh] min-h-[560px] w-full overflow-hidden bg-principal sm:h-[70vh]"
    >
      <h1
        aria-label="Papelería creativa hecha con amor"
        className="absolute right-4 top-24 z-20 max-w-[11rem] text-left font-titulos text-xl font-semibold italic leading-tight text-blanco drop-shadow-lg sm:right-8 sm:top-28 sm:max-w-[16rem] sm:text-2xl"
      >
        <span className="block">Papelería creativa</span>
        <span className="block">hecha con amor</span>
      </h1>

      {estado === 'cargando' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-principal">
          <p className="font-cuerpo text-sm font-medium text-blanco/80">
            Cargando productos destacados…
          </p>
        </div>
      ) : hayProductos ? (
        <>
          {productos.map((producto, indice) => (
            <HeroSlide
              key={producto.id}
              producto={producto}
              activo={indice === carrusel.indice}
              posicion={indice}
              total={total}
            />
          ))}

          {mostrarControles ? (
            <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:right-8">
              <BotonControl etiqueta="Producto anterior" onClick={manejarAnterior}>
                <IconoFlecha direccion="izquierda" />
              </BotonControl>
              <BotonControl etiqueta="Producto siguiente" onClick={manejarSiguiente}>
                <IconoFlecha direccion="derecha" />
              </BotonControl>
              {!carrusel.movimientoReducido ? (
                <BotonControl
                  etiqueta={carrusel.pausaManual ? 'Reproducir carrusel' : 'Pausar carrusel'}
                  onClick={carrusel.alternarPausa}
                >
                  {carrusel.pausaManual ? <IconoPlay /> : <IconoPausa />}
                </BotonControl>
              ) : null}
            </div>
          ) : null}

          {total > 1 && !carrusel.movimientoReducido ? (
            <BarraProgreso
              key={`${carrusel.indice}-${carrusel.reinicio}`}
              pausado={carrusel.pausado}
            />
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 flex items-end pb-28 pt-36 sm:items-center sm:pb-0 sm:pt-0">
          <div className="contenedor">
            <div className="max-w-2xl">
              <p className="font-cuerpo text-lg text-blanco/90">
                No pudimos cargar los destacados en este momento.
              </p>
              <Link
                to="/catalogo"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blanco px-6 font-cuerpo text-base font-semibold text-principal transition-colors hover:bg-fondo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-principal"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      )}

      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {anuncio}
      </div>
    </section>
  );
}
