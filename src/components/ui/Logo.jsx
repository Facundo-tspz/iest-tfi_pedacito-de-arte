const estilosPorFondo = {
  claro: {
    texto: 'text-principal',
    fondoIcono: '',
  },
  oscuro: {
    texto: 'text-fondo',
    fondoIcono: 'rounded-xl bg-fondo p-1',
  },
};

export default function Logo({ fondo = 'claro', className = '' }) {
  const estilos = estilosPorFondo[fondo] ?? estilosPorFondo.claro;

  return (
    <span data-fondo={fondo} className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <span
        className={`inline-flex shrink-0 items-center justify-center ${estilos.fondoIcono}`.trim()}
      >
        <img
          src="/marca/logo-icono.png"
          alt=""
          aria-hidden="true"
          width="512"
          height="512"
          className="h-10 w-10 object-contain sm:h-11 sm:w-11"
        />
      </span>

      <span className="flex flex-col items-start leading-none">
        <span className={`font-titulos text-3xl font-semibold italic sm:text-4xl ${estilos.texto}`}>
          Pedacito
        </span>
        <span className="mt-0.5 flex items-baseline gap-1.5">
          <span className={`font-titulos text-lg font-semibold italic sm:text-xl ${estilos.texto}`}>
            de
          </span>
          <span
            className={`font-cuerpo text-lg font-extrabold uppercase tracking-[0.12em] sm:text-xl ${estilos.texto}`}
          >
            ARTE
          </span>
        </span>
      </span>
    </span>
  );
}
