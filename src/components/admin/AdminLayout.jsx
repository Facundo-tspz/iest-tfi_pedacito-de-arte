import { NavLink, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Logo from '../ui/Logo';
import { IconoMedios, IconoPanel, IconoProductos, IconoSalir } from './IconosAdmin';

const ENLACES = [
  { etiqueta: 'Dashboard', destino: '/estudio', icono: IconoPanel, exacto: true },
  { etiqueta: 'Productos', destino: '/estudio/productos', icono: IconoProductos },
  { etiqueta: 'Medios', destino: '/estudio/media', icono: IconoMedios },
];

export default function AdminLayout() {
  const { usuario, cerrarSesion } = useOutletContext();
  const ubicacion = useLocation();
  const actual =
    ENLACES.find(
      (enlace) => enlace.destino !== '/estudio' && ubicacion.pathname.startsWith(enlace.destino),
    ) ?? ENLACES[0];

  return (
    <div className="flex min-h-screen bg-blanco">
      <aside className="hidden w-64 shrink-0 flex-col bg-principal text-blanco md:flex">
        <div className="border-b border-blanco/10 p-5">
          <Logo fondo="oscuro" />
          <p className="mt-3 font-cuerpo text-xs uppercase tracking-[0.16em] text-blanco/60">
            Panel administrativo
          </p>
        </div>

        <nav aria-label="Navegación administrativa" className="p-3">
          <ul className="space-y-1">
            {ENLACES.map(({ etiqueta, destino, icono: Icono, exacto }) => (
              <li key={etiqueta}>
                <NavLink
                  to={destino}
                  end={exacto}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 font-cuerpo text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-complementario-principal/15 text-complementario-principal'
                        : 'text-blanco/80 hover:bg-blanco/10 hover:text-blanco'
                    }`
                  }
                >
                  <Icono />
                  {etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-blanco/10 p-3">
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 font-cuerpo text-sm font-medium text-blanco/80 transition-colors hover:bg-blanco/10 hover:text-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario"
          >
            <IconoSalir />
            Salir
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-contraste/10 px-4 sm:px-6">
          <div>
            <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
              Panel
            </p>
            <h1 className="font-titulos text-2xl font-semibold text-principal">
              {actual.etiqueta}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-cuerpo text-sm text-contraste sm:inline">
              {usuario.nombre}
            </span>
            <button
              type="button"
              onClick={cerrarSesion}
              aria-label="Cerrar sesión"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-principal transition-colors hover:bg-fondo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario md:hidden"
            >
              <IconoSalir />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet context={{ usuario, cerrarSesion }} />
        </main>
      </div>
    </div>
  );
}
