import { Link } from 'react-router-dom';
import configuracion from '../../config/configuracion';
import { crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';
import PlaceholderImagen from '../ui/PlaceholderImagen';
import Seccion from '../ui/Seccion';

const CLASE_CTA_PRIMARIA =
  'inline-flex min-h-12 items-center justify-center rounded-xl bg-principal px-6 font-cuerpo text-base font-semibold text-blanco shadow-sm shadow-principal/20 transition-colors hover:bg-principal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo';

const MENSAJE_CONSULTA = 'Hola, quiero consultar por un encargo personalizado.';

export default function IntroMarca() {
  const urlWhatsApp = crearUrlWhatsApp(configuracion.whatsapp, MENSAJE_CONSULTA);

  return (
    <Seccion id="nosotros" titulo="Sobre nosotros">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="max-w-2xl font-cuerpo text-lg font-medium leading-relaxed text-principal">
            Un taller que transforma ideas en objetos de papel.
          </p>
          <p className="mt-3 max-w-2xl font-cuerpo text-base leading-relaxed text-contraste">
            Pedacito de Arte diseña y confecciona agendas, anotadores y revistas para colorear. Cada
            pieza combina funcionalidad, estética y calidez, y puede personalizarse con opciones de
            interior, tamaño y encuadernación.
          </p>
          <p className="mt-4 max-w-2xl font-cuerpo text-base leading-relaxed text-contraste">
            También realizamos trabajos especiales de diseño, impresión, laminado y encuadernación
            para proyectos y eventos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/catalogo" className={CLASE_CTA_PRIMARIA}>
              Ver catálogo
            </Link>

            {urlWhatsApp ? (
              <Boton
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                variante="secundario"
              >
                Hablemos por WhatsApp
              </Boton>
            ) : (
              <Boton variante="secundario" disabled>
                Hablemos por WhatsApp
              </Boton>
            )}
          </div>

          {!urlWhatsApp && import.meta.env.DEV ? (
            <p className="mt-2 font-cuerpo text-xs leading-relaxed text-contraste">
              Configurá VITE_WHATSAPP para habilitar la consulta.
            </p>
          ) : null}
        </div>

        <PlaceholderImagen
          alt="Mesa de trabajo con papeles, herramientas y materiales de encuadernación"
          aspecto="tarjeta"
          texto="Foto del taller próximamente"
          className="w-full shadow-xl shadow-principal/10"
        />
      </div>
    </Seccion>
  );
}
