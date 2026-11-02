import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { cerrarSesionAdmin, obtenerSesionAdmin } from '../../services/admin';

export default function RutaAdminProtegida() {
  const [estado, setEstado] = useState('cargando');
  const [usuario, setUsuario] = useState(null);
  const navegar = useNavigate();

  useEffect(() => {
    let activo = true;

    obtenerSesionAdmin()
      .then((sesion) => {
        if (!activo) {
          return;
        }

        setUsuario(sesion);
        setEstado(sesion ? 'listo' : 'sin-sesion');
      })
      .catch(() => {
        if (activo) {
          setEstado('sin-sesion');
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  if (estado === 'cargando') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blanco">
        <p role="status" className="font-cuerpo text-sm text-contraste">
          Verificando sesión…
        </p>
      </div>
    );
  }

  if (estado === 'sin-sesion' || !usuario) {
    return <Navigate to="/estudio/login" replace />;
  }

  const cerrarSesion = async () => {
    try {
      await cerrarSesionAdmin();
    } finally {
      navegar('/estudio/login', { replace: true });
    }
  };

  return <Outlet context={{ usuario, cerrarSesion }} />;
}
