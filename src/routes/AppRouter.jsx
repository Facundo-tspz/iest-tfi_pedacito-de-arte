import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import RutaAdminProtegida from '../components/admin/RutaAdminProtegida';
import AppLayout from '../components/layout/AppLayout';
import CarritoPage from '../pages/CarritoPage';
import CatalogoPage from '../pages/CatalogoPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ProductoDetallePage from '../pages/ProductoDetallePage';
import DashboardPage from '../pages/admin/DashboardPage';
import LoginPage from '../pages/admin/LoginPage';
import MediaPage from '../pages/admin/MediaPage';
import ProductoFormPage from '../pages/admin/ProductoFormPage';
import ProductosPage from '../pages/admin/ProductosPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="estudio/login" element={<LoginPage />} />
      <Route path="estudio" element={<RutaAdminProtegida />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="productos/nuevo" element={<ProductoFormPage />} />
          <Route path="productos/:id" element={<ProductoFormPage />} />
          <Route path="media" element={<MediaPage />} />
        </Route>
      </Route>

      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="catalogo/:slug" element={<ProductoDetallePage />} />
        <Route path="carrito" element={<CarritoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
