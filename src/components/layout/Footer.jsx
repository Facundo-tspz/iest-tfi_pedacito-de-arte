import { Link } from 'react-router-dom';
import configuracion from '../../config/configuracion';
import Logo from '../ui/Logo';

const ENLACES = [
  { etiqueta: 'Inicio', destino: '/' },
  { etiqueta: 'Catálogo', destino: '/catalogo' },
  { etiqueta: 'Nosotros', destino: '/#nosotros' },
  { etiqueta: 'Servicios', destino: '/#servicios' },
  { etiqueta: 'Contacto', destino: '/#contacto' },
];

function obtenerUrlInstagram(valor) {
  const limpio = valor.trim();

  if (!limpio) {
    return '';
  }

  if (/^https?:\/\//i.test(limpio)) {
    return limpio;
  }

  return `https://instagram.com/${limpio.replace(/^@/, '')}`;
}

export default function Footer() {
  const urlWhatsApp = configuracion.whatsapp ? `https://wa.me/${configuracion.whatsapp}` : '';
  const urlInstagram = obtenerUrlInstagram(configuracion.instagram);
  const anio = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-principal text-blanco">
      <div className="contenedor grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo fondo="oscuro" />
          <p className="mt-5 max-w-sm font-cuerpo text-sm leading-relaxed text-fondo/80">
            Papelería creativa hecha con amor. Agendas, anotadores y revistas para colorear,
            personalizados a tu manera.
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h2 className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-complementario-principal">
            Explorar
          </h2>
          <ul className="mt-4 space-y-2">
            {ENLACES.map(({ etiqueta, destino }) => (
              <li key={etiqueta}>
                <Link
                  to={destino}
                  className="font-cuerpo text-sm text-fondo/80 transition-colors hover:text-blanco focus-visible:text-blanco"
                >
                  {etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-complementario-principal">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2 font-cuerpo text-sm">
            {urlWhatsApp && (
              <li>
                <a
                  href={urlWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fondo/80 transition-colors hover:text-blanco focus-visible:text-blanco"
                >
                  Consultas por WhatsApp
                </a>
              </li>
            )}
            {configuracion.email && (
              <li>
                <a
                  href={`mailto:${configuracion.email}`}
                  className="break-words text-fondo/80 transition-colors hover:text-blanco focus-visible:text-blanco"
                >
                  {configuracion.email}
                </a>
              </li>
            )}
            {urlInstagram && (
              <li>
                <a
                  href={urlInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fondo/80 transition-colors hover:text-blanco focus-visible:text-blanco"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-blanco/15">
        <div className="contenedor flex flex-col gap-3 py-6 font-cuerpo text-xs text-fondo/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {anio} Pedacito de Arte. Todos los derechos reservados.</p>
          <p>Los precios finales se confirman por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
