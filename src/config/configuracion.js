const URL_SITIO_POR_DEFECTO = 'http://localhost:5173';

function limpiar(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

export function normalizarWhatsApp(valor) {
  return limpiar(valor).replace(/\D/g, '');
}

function obtenerOrigen(ubicacion) {
  if (ubicacion && typeof ubicacion.origin === 'string' && ubicacion.origin) {
    return ubicacion.origin;
  }

  return URL_SITIO_POR_DEFECTO;
}

function normalizarUrlSitio(valor, ubicacion) {
  const url = limpiar(valor);

  if (!url) {
    return obtenerOrigen(ubicacion);
  }

  try {
    const parseada = new URL(url);
    const ruta = parseada.pathname.replace(/\/+$/, '');

    return `${parseada.origin}${ruta}`;
  } catch {
    return obtenerOrigen(ubicacion);
  }
}

function obtenerUbicacion() {
  return typeof window !== 'undefined' ? window.location : null;
}

export function crearConfiguracion(
  entorno = import.meta.env,
  ubicacion = obtenerUbicacion(),
) {
  return {
    whatsapp: normalizarWhatsApp(entorno.VITE_WHATSAPP),
    urlSitio: normalizarUrlSitio(entorno.VITE_SITE_URL, ubicacion),
    instagram: limpiar(entorno.VITE_INSTAGRAM),
    email: limpiar(entorno.VITE_EMAIL),
  };
}

const configuracion = crearConfiguracion();

export default configuracion;
