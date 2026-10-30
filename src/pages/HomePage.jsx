import Logo from '../components/ui/Logo';

export default function HomePage() {
  return (
    <section className="min-h-[150vh]">
      <h1 className="sr-only">Pedacito de Arte</h1>
      <Logo />
      <p className="mt-6 max-w-xl font-cuerpo text-base text-contraste">
        Base técnica en construcción. La navegación y el contenido del home se definen en la
        siguiente etapa.
      </p>
    </section>
  );
}
