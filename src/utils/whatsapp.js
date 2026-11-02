import configuracion, { normalizarWhatsApp } from '../config/configuracion';
import { calcularSubtotalItem, calcularTotales } from './carrito';
import { formatearPrecio } from './precio';

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

export function construirMensajeCarrito(items = [], urlBase = configuracion.urlSitio) {
  const lista = Array.isArray(items) ? items : [];
  const base = typeof urlBase === 'string' ? urlBase.replace(/\/+$/, '') : '';
  const lineas = ['Hola, quiero consultar por este encargo:', ''];

  lista.forEach((item, indice) => {
    const codigo = typeof item?.codigo === 'string' ? item.codigo.trim() : '';
    const subtotal = calcularSubtotalItem(item);
    const url = item?.slug && base ? `${base}/catalogo/${item.slug}` : '';

    lineas.push(`${indice + 1}. ${item.nombre}${codigo ? ` (${codigo})` : ''}`);
    lineas.push(`   Cantidad: ${item.cantidad}`);
    lineas.push(`   Opciones: ${formatearOpciones(item.opciones)}`);
    lineas.push(`   Notas: ${limpiarNotas(item.notas) || 'Sin notas'}`);
    lineas.push(
      `   Precio estimado: ${subtotal === null ? 'Precio a confirmar' : formatearPrecio(subtotal)}`,
    );

    if (url) {
      lineas.push(`   URL: ${url}`);
    }

    lineas.push('');
  });

  const totales = calcularTotales(lista);

  lineas.push(
    totales.tienePreciosPendientes
      ? 'Total a confirmar por WhatsApp'
      : `Total estimado: ${formatearPrecio(totales.totalEstimado)}`,
  );
  lineas.push('El precio final se confirma por WhatsApp según personalización y cantidad.');

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
