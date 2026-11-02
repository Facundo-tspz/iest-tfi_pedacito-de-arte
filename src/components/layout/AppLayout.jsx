import { Outlet } from 'react-router-dom';
import useScrollToHash from '../../hooks/useScrollToHash';
import Footer from './Footer';
import Navbar from './Navbar';

export default function AppLayout() {
  useScrollToHash();

  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
