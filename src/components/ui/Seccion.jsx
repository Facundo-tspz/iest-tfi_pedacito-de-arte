import { useId } from 'react';

const ANCHOS = {
  normal: 'max-w-6xl',
  angosto: 'max-w-3xl',
  amplio: 'max-w-7xl',
  completo: 'max-w-none',
};

const ETIQUETAS_TITULO = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export default function Seccion({
  id,
  titulo,
  descripcion,
  children,
  className = '',
  ancho = 'normal',
  nivelTitulo = 2,
}) {
  const idGenerado = useId();
  const idTitulo = titulo ? (id ? `${id}-titulo` : `${idGenerado}-titulo`) : undefined;
  const EtiquetaTitulo = ETIQUETAS_TITULO[nivelTitulo] ?? 'h2';
  const claseAncho = ANCHOS[ancho] ?? ANCHOS.normal;

  return (
    <section
      id={id}
      aria-labelledby={idTitulo}
      className={`mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${claseAncho} ${className}`.trim()}
    >
      {(titulo || descripcion) && (
        <div className="mb-8 max-w-2xl">
          {titulo && (
            <EtiquetaTitulo
              id={idTitulo}
              className="font-titulos text-3xl font-semibold text-principal sm:text-4xl"
            >
              {titulo}
            </EtiquetaTitulo>
          )}
          {descripcion && (
            <p className="mt-3 text-base leading-relaxed text-contraste">{descripcion}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
