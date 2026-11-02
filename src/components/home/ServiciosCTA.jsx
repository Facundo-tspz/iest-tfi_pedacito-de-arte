import configuracion from '../../config/configuracion';
import { crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';
import Seccion from '../ui/Seccion';

const MENSAJE_CONSULTA = 'Hola, quiero consultar por un encargo personalizado.';

const SERVICIOS = [
  {
    titulo: 'Diseño personalizado',
    descripcion: 'Creamos el diseño de tu agenda, anotador o revista.',
  },
  {
    titulo: 'Impresión',
    descripcion: 'Imprimimos tus piezas en el formato que elijas.',
  },
  {
    titulo: 'Laminado',
    descripcion: 'Terminaciones mate o brillante para tus tapas.',
  },
  {
    titulo: 'Encuadernación',
    descripcion: 'Espiral o costura, según el proyecto.',
  },
];

export default function ServiciosCTA() {
  const urlWhatsApp = crearUrlWhatsApp(configuracion.whatsapp, MENSAJE_CONSULTA);

  return (
    <Seccion
      id="servicios"
      titulo="Servicios"
      descripcion="Diseño, impresión, laminado y encuadernación para tus proyectos de papelería."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICIOS.map((servicio, indice) => (
          <li
            key={servicio.titulo}
            className="rounded-2xl border border-contraste/15 bg-blanco/60 p-5 shadow-sm shadow-principal/5"
          >
            <span
              aria-hidden="true"
              className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-principal"
            >
              {String(indice + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-titulos text-xl font-semibold text-principal">
              {servicio.titulo}
            </h3>
            <p className="mt-2 font-cuerpo text-sm leading-relaxed text-contraste">
              {servicio.descripcion}
            </p>
          </li>
        ))}
      </ul>

      <div
        id="contacto"
        className="mt-10 scroll-mt-24 rounded-2xl bg-principal p-6 text-blanco shadow-xl shadow-principal/20 sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h3 className="font-titulos text-2xl font-semibold text-blanco sm:text-3xl">
              ¿Armamos tu encargo?
            </h3>
            <p className="mt-2 font-cuerpo text-sm leading-relaxed text-fondo/80">
              Contanos qué necesitás y coordinamos los detalles por WhatsApp.
            </p>
          </div>

          <div className="shrink-0">
            {urlWhatsApp ? (
              <Boton
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                variante="secundario"
                className="w-full sm:w-auto"
              >
                Consultar por WhatsApp
              </Boton>
            ) : (
              <Boton variante="secundario" disabled className="w-full sm:w-auto">
                Consultar por WhatsApp
              </Boton>
            )}

            {!urlWhatsApp && import.meta.env.DEV ? (
              <p className="mt-2 max-w-xs font-cuerpo text-xs leading-relaxed text-complementario-principal">
                Configurá VITE_WHATSAPP para habilitar la consulta.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Seccion>
  );
}
