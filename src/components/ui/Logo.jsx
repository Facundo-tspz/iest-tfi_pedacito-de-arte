const estilosPorFondo = {
  claro: {
    texto: 'text-principal',
    fondoIcono: '',
  },
  oscuro: {
    texto: 'text-blanco',
    fondoIcono: 'rounded-full bg-fondo',
  },
};

const LETRAS_PEDACITO = 'Pedacito'.split('');

export default function Logo({ fondo = 'claro', className = '' }) {
  const estilos = estilosPorFondo[fondo] ?? estilosPorFondo.claro;

  return (
    <span data-fondo={fondo} className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <span
        className={`inline-flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center sm:h-[3.75rem] sm:w-[3.75rem] ${estilos.fondoIcono}`.trim()}
      >
        <img
          src="/marca/logo-icono.png"
          alt=""
          aria-hidden="true"
          width="512"
          height="512"
          className="h-14 w-14 max-w-none object-contain sm:h-16 sm:w-16"
        />
      </span>

      <span className="-ml-0.5 flex flex-col items-stretch leading-none">
        <span
          data-testid="logo-pedacito"
          className={`flex w-full justify-between font-titulos text-2xl font-semibold italic sm:text-3xl ${estilos.texto}`}
        >
          <span className="sr-only">Pedacito</span>
          {LETRAS_PEDACITO.map((letra, indice) => (
            <span key={`${letra}-${indice}`} aria-hidden="true">
              {letra}
            </span>
          ))}
        </span>

        <span className="mt-1 flex items-baseline justify-between gap-2">
          <span className={`font-titulos text-xl font-semibold italic sm:text-2xl ${estilos.texto}`}>
            de
          </span>
          <span
            className={`-mr-[0.1em] font-cuerpo text-xl font-extrabold uppercase tracking-[0.1em] sm:text-2xl ${estilos.texto}`}
          >
            ARTE
          </span>
        </span>
      </span>
    </span>
  );
}
