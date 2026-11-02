import { useId } from 'react';
import configuracion from '../../config/configuracion';
import { construirMensajeWhatsApp, crearUrlWhatsApp } from '../../utils/whatsapp';
import Boton from '../ui/Boton';

export default function CtaWhatsApp({
  producto,
  opciones = [],
  notas = '',
  onAgregar,
  agregado = false,
}) {
  const idConfirmacion = useId();
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

      <Boton
        variante="secundario"
        onClick={onAgregar}
        aria-describedby={agregado ? idConfirmacion : undefined}
        className="w-full"
      >
        Agregar al encargo
      </Boton>

      {agregado ? (
        <p
          id={idConfirmacion}
          role="status"
          aria-live="polite"
          className="text-center font-cuerpo text-xs leading-relaxed text-complementario-secundario"
        >
          Producto agregado al encargo.
        </p>
      ) : null}

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
