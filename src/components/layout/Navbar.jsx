import Logo from '../ui/Logo';
import useNavbarScroll from '../../hooks/useNavbarScroll';

export default function Navbar() {
  const { conFondo } = useNavbarScroll();

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-complementario-principal bg-gradient-to-b from-principal from-65% via-principal/95 via-85% to-principal/85 backdrop-blur-xl ring-1 ring-inset ring-blanco/10 transition-shadow duration-300 ease-out ${
        conFondo ? 'shadow-xl shadow-principal/30' : 'shadow-lg shadow-principal/20'
      }`}
    >
      <div className="contenedor flex min-h-20 items-center">
        <Logo fondo="oscuro" />
      </div>
    </header>
  );
}
