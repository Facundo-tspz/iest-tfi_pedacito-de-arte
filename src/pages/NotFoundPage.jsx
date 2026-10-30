import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center">
      <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.2em] text-contraste">
        Error 404
      </p>
      <h1 className="mt-4 font-titulos text-4xl font-semibold text-principal sm:text-5xl">
        No encontramos esta página
      </h1>
      <p className="mt-4 max-w-md font-cuerpo text-base text-contraste">
        Puede que el enlace haya cambiado o que la página ya no exista.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-principal px-6 py-3 font-cuerpo text-sm font-semibold text-blanco transition-colors hover:bg-contraste"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
