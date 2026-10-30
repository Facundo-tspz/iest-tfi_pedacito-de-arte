import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-fondo">
      <Navbar />
      <main className="contenedor flex-1 py-16">
        <Outlet />
      </main>
    </div>
  );
}
