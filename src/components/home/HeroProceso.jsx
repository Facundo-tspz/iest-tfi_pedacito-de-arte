import { FOTOS_PROCESO } from '../../data/mockCatalogo';
import useCarrusel from '../../hooks/useCarrusel';
import PlaceholderImagen from '../ui/PlaceholderImagen';

const INTERVALO_PROCESO = 4000;
const ID_TITULO = 'hero-proceso-titulo';

const FOTOS = [...FOTOS_PROCESO].sort((a, b) => a.orden - b.orden);

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

function ImagenProceso({ foto, posicion }) {
  const alt = foto.alt || 'Foto del proceso artesanal';

  if (foto.url) {
    return (
      <img
        src={foto.url}
        alt={alt}
        loading={posicion === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <PlaceholderImagen
      alt={alt}
      aspecto="portada"
      texto="Foto de proceso próximamente"
      className="absolute inset-0 h-full w-full rounded-none border-0"
    />
  );
}

function obtenerClasesPosicion(indice, activo, total) {
  if (indice === activo) {
    return 'z-10 translate-x-0 opacity-100';
  }

  if (indice === (activo + 1) % total) {
    return 'pointer-events-none z-0 translate-x-full opacity-0';
  }

  return 'pointer-events-none z-0 -translate-x-full opacity-0';
}

export default function HeroProceso() {
  const total = FOTOS.length;
  const carrusel = useCarrusel({ total, intervalo: INTERVALO_PROCESO });
  const claseTransicion = carrusel.movimientoReducido
    ? ''
    : 'transition-[transform,opacity] duration-700 ease-out';

  return (
    <section
      role="region"
      aria-roledescription="carrusel"
      aria-labelledby={ID_TITULO}
      onMouseEnter={carrusel.registrarInteraccion}
      onFocusCapture={carrusel.registrarInteraccion}
      onClick={carrusel.registrarInteraccion}
      onTouchStart={carrusel.registrarInteraccion}
      onKeyDown={carrusel.registrarInteraccion}
      className="relative isolate h-[52vh] min-h-[320px] max-h-[540px] w-full overflow-hidden bg-principal"
    >
      <h2 id={ID_TITULO} className="sr-only">
        Proceso artesanal
      </h2>

      {FOTOS.map((foto, indice) => {
        const activo = indice === carrusel.indice;

        return (
          <article
            key={foto.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${indice + 1} de ${total}`}
            aria-hidden={!activo}
            className={`absolute inset-0 ${obtenerClasesPosicion(indice, carrusel.indice, total)} ${claseTransicion}`.trim()}
          >
            <ImagenProceso foto={foto} posicion={indice} />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-principal/70 via-transparent to-transparent"
            />
          </article>
        );
      })}

      {!carrusel.movimientoReducido ? (
        <button
          type="button"
          aria-label={
            carrusel.pausaManual ? 'Reproducir carrusel de proceso' : 'Pausar carrusel de proceso'
          }
          onClick={(evento) => {
            evento.stopPropagation();
            carrusel.alternarPausa();
          }}
          className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-blanco/40 bg-principal/60 text-blanco backdrop-blur transition-colors hover:bg-principal/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-principal sm:bottom-6 sm:right-8"
        >
          {carrusel.pausaManual ? <IconoPlay /> : <IconoPausa />}
        </button>
      ) : null}
    </section>
  );
}
