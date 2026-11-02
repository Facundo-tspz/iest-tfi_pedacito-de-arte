const VARIANTES = {
  primario:
    'bg-principal text-blanco shadow-sm shadow-principal/20 hover:bg-principal/90 active:bg-principal/80',
  secundario:
    'border border-secundario bg-blanco/60 text-principal hover:bg-blanco active:bg-fondo',
  suave:
    'bg-complementario-principal/20 text-principal hover:bg-complementario-principal/35 active:bg-complementario-principal/50',
  texto: 'bg-transparent text-principal underline-offset-4 hover:underline active:text-contraste',
};

const TAMANOS = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

export default function Boton({
  children,
  variante = 'primario',
  tamano = 'md',
  href,
  tipo = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const clases =
    `inline-flex items-center justify-center gap-2 rounded-xl font-cuerpo font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTES[variante] ?? VARIANTES.primario} ${TAMANOS[tamano] ?? TAMANOS.md} ${className}`.trim();

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={clases}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={tipo} disabled={disabled} className={clases} {...props}>
      {children}
    </button>
  );
}
