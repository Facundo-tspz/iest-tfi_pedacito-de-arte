import { Outlet } from 'react-router-dom';
import useScrollToHash from '../../hooks/useScrollToHash';
import Footer from './Footer';
import Navbar from './Navbar';

export default function AppLayout() {
  useScrollToHash();

  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-blanco focus:px-4 focus:py-2 focus:font-cuerpo focus:text-sm focus:font-semibold focus:text-principal focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido-principal" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
