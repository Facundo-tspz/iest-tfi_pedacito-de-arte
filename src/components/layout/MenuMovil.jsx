import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ContadorCarrito from '../carrito/ContadorCarrito';

const SELECTOR_ENFOCABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function obtenerEnfocables(contenedor) {
  return Array.from(contenedor.querySelectorAll(SELECTOR_ENFOCABLES));
}

export default function MenuMovil({ id, abierto, enlaces, cantidadCarrito = 0, onCerrar }) {
  const contenedorRef = useRef(null);

  useEffect(() => {
    if (!abierto) {
      return undefined;
    }

    const contenedor = contenedorRef.current;

    if (!contenedor) {
      return undefined;
    }

    const enfocarPrimero = requestAnimationFrame(() => {
      const enfocables = obtenerEnfocables(contenedor);
      enfocables[0]?.focus();
    });

    const manejarTeclado = (evento) => {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        onCerrar();
        return;
      }

      if (evento.key !== 'Tab') {
        return;
      }

      const enfocables = obtenerEnfocables(contenedor);

      if (enfocables.length === 0) {
        evento.preventDefault();
        return;
      }

      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];

      if (!contenedor.contains(document.activeElement)) {
        evento.preventDefault();
        primero.focus();
        return;
      }

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
        return;
      }

      if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', manejarTeclado);

    return () => {
      cancelAnimationFrame(enfocarPrimero);
      document.removeEventListener('keydown', manejarTeclado);
    };
  }, [abierto, onCerrar]);

  return (
    <div
      id={id}
      ref={contenedorRef}
      hidden={!abierto}
      className="border-t border-blanco/15 bg-principal md:hidden"
    >
      <nav aria-label="Navegación móvil" className="contenedor py-4">
        <ul className="flex flex-col gap-1">
          {enlaces.map(({ etiqueta, destino }) => (
            <li key={etiqueta}>
              <Link
                to={destino}
                onClick={onCerrar}
                className="block rounded-lg px-3 py-3 font-cuerpo text-base font-medium text-blanco/90 transition-colors hover:bg-blanco/10 hover:text-blanco focus-visible:bg-blanco/10 focus-visible:text-blanco"
              >
                {etiqueta}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-2 border-t border-blanco/15 pt-2">
          <ContadorCarrito cantidad={cantidadCarrito} onClick={onCerrar} />
        </div>
      </nav>
    </div>
  );
}
