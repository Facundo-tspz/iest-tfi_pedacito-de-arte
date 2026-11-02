import { useId } from 'react';
import configuracion from '../../config/configuracion';
import { construirMensajeWhatsApp, crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';

export default function CtaWhatsApp({ producto, opciones = [], notas = '' }) {
  const idAviso = useId();
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
        <Boton disabled className="w-full">
          Consultar por WhatsApp
        </Boton>
      )}

      <Boton variante="secundario" disabled aria-describedby={idAviso} className="w-full">
        Agregar al encargo
      </Boton>

      <p id={idAviso} className="text-center font-cuerpo text-xs leading-relaxed text-contraste">
        Disponible en la próxima etapa.
      </p>

      {!urlWhatsApp && import.meta.env.DEV ? (
        <p className="text-center font-cuerpo text-xs leading-relaxed text-contraste">
          Configurá VITE_WHATSAPP para habilitar la consulta.
        </p>
      ) : null}
    </div>
  );
}
