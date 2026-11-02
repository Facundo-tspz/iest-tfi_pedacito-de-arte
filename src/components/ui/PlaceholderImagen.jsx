const ASPECTOS = {
  cuadrado: 'aspect-square',
  tarjeta: 'aspect-[4/3]',
  portada: 'aspect-[16/9]',
  retrato: 'aspect-[3/4]',
};

export default function PlaceholderImagen({
  alt,
  aspecto = 'cuadrado',
  texto = 'Imagen próximamente',
  className = '',
}) {
  const esDecorativa = !alt;
  const claseAspecto = ASPECTOS[aspecto] ?? ASPECTOS.cuadrado;

  return (
    <div
      role={esDecorativa ? undefined : 'img'}
      aria-label={esDecorativa ? undefined : alt}
      aria-hidden={esDecorativa ? 'true' : undefined}
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-contraste/15 bg-gradient-to-br from-complementario-principal/25 via-fondo to-complementario-secundario/15 ${claseAspecto} ${className}`.trim()}
    >
      <span className="flex flex-col items-center gap-2 px-4 text-center">
        <img
          src="/marca/logo-icono.png"
          alt=""
          aria-hidden="true"
          width="64"
          height="64"
          className="h-12 w-12 object-contain opacity-75"
        />
        <span
          aria-hidden="true"
          className="font-cuerpo text-xs font-semibold uppercase tracking-[0.12em] text-contraste"
        >
          {texto}
        </span>
      </span>
    </div>
  );
}
