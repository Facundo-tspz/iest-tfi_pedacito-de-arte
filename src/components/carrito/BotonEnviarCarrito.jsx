import { useId } from 'react';
import configuracion from '../../config/configuracion';
import { construirMensajeCarrito, crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';

export default function BotonEnviarCarrito({ items = [] }) {
  const idAviso = useId();
  const mensaje = construirMensajeCarrito(items);
  const url = items.length > 0 ? crearUrlWhatsApp(configuracion.whatsapp, mensaje) : '';

  return (
    <div>
      {url ? (
        <Boton href={url} target="_blank" rel="noopener noreferrer" className="w-full">
          Enviar encargo por WhatsApp
        </Boton>
      ) : (
        <Boton disabled aria-describedby={idAviso} className="w-full">
          Enviar encargo por WhatsApp
        </Boton>
      )}

      {!url ? (
        <p
          id={idAviso}
          className="mt-2 text-center font-cuerpo text-xs leading-relaxed text-contraste"
        >
          La consulta por WhatsApp no está disponible en este momento.
          {import.meta.env.DEV ? ' Configurá VITE_WHATSAPP para habilitarla.' : ''}
        </p>
      ) : null}
    </div>
  );
}
