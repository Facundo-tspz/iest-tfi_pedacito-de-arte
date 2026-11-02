import { useId } from 'react';
import configuracion from '../../config/configuracion';
import { construirMensajeWhatsApp, crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';

export default function CtaWhatsApp({ producto, opciones = [], notas = '' }) {
  const idAviso = useId();
  const idConfiguracion = useId();
  const urlProducto = `${configuracion.urlSitio}/catalogo/${producto.slug}`;
  const mensaje = construirMensajeWhatsApp({
    producto,
    opciones,
    notas,
    url: urlProducto,
  });
  const urlWhatsApp = crearUrlWhatsApp(configuracion.whatsapp, mensaje);

  return (
    <div className="mt-4 space-y-3">
      {urlWhatsApp ? (
        <Boton href={urlWhatsApp} target="_blank" rel="noopener noreferrer" className="w-full">
          Consultar por WhatsApp
        </Boton>
      ) : (
        <Boton disabled aria-describedby={idConfiguracion} className="w-full">
          Consultar por WhatsApp
        </Boton>
      )}

      <Boton variante="secundario" disabled aria-describedby={idAviso} className="w-full">
        Agregar al encargo
      </Boton>

      <p id={idAviso} className="text-center font-cuerpo text-xs leading-relaxed text-contraste">
        Disponible en la próxima etapa.
      </p>

      {!urlWhatsApp ? (
        <p
          id={idConfiguracion}
          className="text-center font-cuerpo text-xs leading-relaxed text-contraste"
        >
          La consulta por WhatsApp no está disponible en este momento.
          {import.meta.env.DEV ? ' Configurá VITE_WHATSAPP para habilitarla.' : ''}
        </p>
      ) : null}
    </div>
  );
}
