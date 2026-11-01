import { normalizarWhatsApp } from '../config/configuracion';

const MAX_NOTAS = 500;

function limpiarNotas(notas) {
  return typeof notas === 'string' ? notas.trim().slice(0, MAX_NOTAS) : '';
}

function formatearOpciones(opciones) {
  if (!Array.isArray(opciones)) {
    return 'Sin preferencia';
  }

  const partes = opciones
    .filter((opcion) => opcion?.tipo_opcion && opcion?.valor)
    .map((opcion) => `${opcion.tipo_opcion}: ${opcion.valor}`);

  return partes.length > 0 ? partes.join(' | ') : 'Sin preferencia';
}

export function construirMensajeWhatsApp({
  producto = {},
  opciones = [],
  notas = '',
  url = '',
} = {}) {
  const nombre = typeof producto?.nombre === 'string' ? producto.nombre.trim() : '';
  const codigo = typeof producto?.codigo === 'string' ? producto.codigo.trim() : '';
  const productoTexto = codigo ? `${nombre} (${codigo})` : nombre;
  const lineas = [
    'Hola, quiero consultar por:',
    `Producto: ${productoTexto}`,
    `Opciones: ${formatearOpciones(opciones)}`,
    `Notas: ${limpiarNotas(notas) || 'Sin notas'}`,
  ];
  const urlLimpia = typeof url === 'string' ? url.trim() : '';

  if (urlLimpia) {
    lineas.push(`URL: ${urlLimpia}`);
  }

  return lineas.join('\n');
}

export function crearUrlWhatsApp(numero, mensaje) {
  const numeroNormalizado = normalizarWhatsApp(numero);
  const texto = typeof mensaje === 'string' ? mensaje : '';

  if (!numeroNormalizado || !texto) {
    return '';
  }

  return `https://wa.me/${numeroNormalizado}?text=${encodeURIComponent(texto)}`;
}
