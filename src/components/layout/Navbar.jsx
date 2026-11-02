import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import useCarrito from '../../hooks/useCarrito';
import useNavbarScroll from '../../hooks/useNavbarScroll';
import ContadorCarrito from '../carrito/ContadorCarrito';
import MenuMovil from './MenuMovil';

const ID_MENU_MOVIL = 'menu-movil';

const ENLACES = [
  { etiqueta: 'Inicio', destino: '/', exacto: true },
  { etiqueta: 'Catálogo', destino: '/catalogo' },
  { etiqueta: 'Nosotros', destino: '/#nosotros', ancla: true },
  { etiqueta: 'Servicios', destino: '/#servicios', ancla: true },
  { etiqueta: 'Contacto', destino: '/#contacto', ancla: true },
];

const CLASE_ENLACE = 'font-cuerpo text-sm font-medium transition-colors focus-visible:text-blanco';
const CLASE_ENLACE_INACTIVO = 'text-blanco/90 hover:text-blanco';
const CLASE_ENLACE_ACTIVO = 'text-complementario-principal';

function IconoMenu({ abierto }) {
  if (abierto) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="h-6 w-6"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function Navbar() {
  const { conFondo } = useNavbarScroll();
  const { cantidadTotal } = useCarrito();
  const ubicacion = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const botonMenuRef = useRef(null);
  const rutaAnterior = useRef(ubicacion.key);

  const cerrarMenu = useCallback(() => {
    setMenuAbierto(false);
    requestAnimationFrame(() => {
      botonMenuRef.current?.focus();
    });
  }, []);

  const alternarMenu = useCallback(() => {
    setMenuAbierto((abierto) => !abierto);
  }, []);

  useEffect(() => {
    if (rutaAnterior.current === ubicacion.key) {
      return undefined;
    }

    rutaAnterior.current = ubicacion.key;

    if (!menuAbierto) {
      return undefined;
    }

    const temporizador = requestAnimationFrame(cerrarMenu);

    return () => cancelAnimationFrame(temporizador);
  }, [cerrarMenu, menuAbierto, ubicacion.key]);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-complementario-principal bg-gradient-to-b from-principal from-65% via-principal/95 via-85% to-principal/85 backdrop-blur-xl ring-1 ring-inset ring-blanco/10 transition-shadow duration-300 ease-out ${
        conFondo ? 'shadow-xl shadow-principal/30' : 'shadow-lg shadow-principal/20'
      }`}
    >
      <div className="contenedor flex min-h-20 items-center justify-between gap-4">
        <Logo fondo="oscuro" />

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 md:flex">
          {ENLACES.map(({ etiqueta, destino, exacto, ancla }) => {
            if (ancla) {
              return (
                <Link
                  key={etiqueta}
                  to={destino}
                  className={`${CLASE_ENLACE} ${CLASE_ENLACE_INACTIVO}`}
                >
                  {etiqueta}
                </Link>
              );
            }

            return (
              <NavLink
                key={etiqueta}
                to={destino}
                end={exacto}
                className={({ isActive }) =>
                  `${CLASE_ENLACE} ${isActive ? CLASE_ENLACE_ACTIVO : CLASE_ENLACE_INACTIVO}`
                }
              >
                {etiqueta}
              </NavLink>
            );
          })}
          <ContadorCarrito cantidad={cantidadTotal} />
        </nav>

        <button
          ref={botonMenuRef}
          type="button"
          aria-expanded={menuAbierto}
          aria-controls={ID_MENU_MOVIL}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={alternarMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-blanco transition-colors hover:bg-blanco/10 md:hidden"
        >
          <IconoMenu abierto={menuAbierto} />
        </button>
      </div>

      <MenuMovil
        id={ID_MENU_MOVIL}
        abierto={menuAbierto}
        enlaces={ENLACES}
        cantidadCarrito={cantidadTotal}
        onCerrar={cerrarMenu}
      />
    </header>
  );
}
