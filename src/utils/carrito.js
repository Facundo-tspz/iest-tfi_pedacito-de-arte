export const CLAVE_ALMACENAMIENTO = 'pedacito-encargos-v1';
export const VERSION_CARRITO = 1;
export const CANTIDAD_MAXIMA = 99;
export const NOTAS_MAXIMAS = 500;

function normalizarPrecio(valor) {
  if (typeof valor === 'number') {
    return Number.isFinite(valor) && valor >= 0 ? valor : null;
  }

  if (typeof valor === 'string' && valor.trim() !== '') {
    const numero = Number(valor);
    return Number.isFinite(numero) && numero >= 0 ? numero : null;
  }

  return null;
}

function normalizarOpcion(opcion) {
  if (!opcion || typeof opcion !== 'object') {
    return null;
  }

  const tipo = typeof opcion.tipo_opcion === 'string' ? opcion.tipo_opcion.trim() : '';
  const valor = typeof opcion.valor === 'string' ? opcion.valor.trim() : '';

  if (!tipo || !valor) {
    return null;
  }

  return {
    id: typeof opcion.id === 'string' && opcion.id ? opcion.id : `${tipo}:${valor}`,
    tipo_opcion: tipo,
    valor,
    precio_extra: normalizarPrecio(opcion.precio_extra) ?? 0,
  };
}

function normalizarOpciones(opciones) {
  if (!Array.isArray(opciones)) {
    return [];
  }

  return opciones.map(normalizarOpcion).filter(Boolean);
}

export function normalizarNotas(notas) {
  return typeof notas === 'string' ? notas.trim().slice(0, NOTAS_MAXIMAS) : '';
}

export function normalizarCantidad(cantidad) {
  const numero = Number(cantidad);

  if (!Number.isFinite(numero)) {
    return 1;
  }

  return Math.min(CANTIDAD_MAXIMA, Math.max(1, Math.floor(numero)));
}

export function crearClaveItem(producto, opciones = [], notas = '') {
  const slug = typeof producto?.slug === 'string' ? producto.slug.trim() : '';
  const ids = normalizarOpciones(opciones)
    .map((opcion) => opcion.id)
    .sort();

  return JSON.stringify([slug, ids, normalizarNotas(notas)]);
}

export function crearItemCarrito({ producto, opciones = [], notas = '', cantidad = 1 } = {}) {
  const slug = typeof producto?.slug === 'string' ? producto.slug.trim() : '';
  const nombre = typeof producto?.nombre === 'string' ? producto.nombre.trim() : '';

  if (!slug || !nombre) {
    return null;
  }

  const opcionesNormalizadas = normalizarOpciones(opciones);
  const notasNormalizadas = normalizarNotas(notas);

  return {
    clave: crearClaveItem(producto, opcionesNormalizadas, notasNormalizadas),
    producto_id: typeof producto.id === 'string' && producto.id ? producto.id : slug,
    slug,
    nombre,
    codigo: typeof producto.codigo === 'string' ? producto.codigo.trim() : '',
    categoria: {
      nombre:
        typeof producto.categoria?.nombre === 'string' ? producto.categoria.nombre.trim() : '',
      slug: typeof producto.categoria?.slug === 'string' ? producto.categoria.slug.trim() : '',
    },
    precio_base: normalizarPrecio(producto.precio_base),
    cantidad: normalizarCantidad(cantidad),
    opciones: opcionesNormalizadas,
    notas: notasNormalizadas,
  };
}

export function normalizarItemCarrito(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  return crearItemCarrito({
    producto: {
      id: item.producto_id,
      slug: item.slug,
      nombre: item.nombre,
      codigo: item.codigo,
      categoria: item.categoria,
      precio_base: item.precio_base,
    },
    opciones: item.opciones,
    notas: item.notas,
    cantidad: item.cantidad,
  });
}

export function fusionarItem(items, item) {
  const normalizado = normalizarItemCarrito(item);

  if (!normalizado) {
    return Array.isArray(items) ? items : [];
  }

  const lista = Array.isArray(items) ? items : [];
  const existente = lista.find((actual) => actual.clave === normalizado.clave);

  if (!existente) {
    return [...lista, normalizado];
  }

  return lista.map((actual) =>
    actual.clave === normalizado.clave
      ? {
          ...actual,
          cantidad: normalizarCantidad(actual.cantidad + normalizado.cantidad),
        }
      : actual,
  );
}

export function calcularSubtotalItem(item) {
  const base = normalizarPrecio(item?.precio_base);

  if (base === null) {
    return null;
  }

  const adicionales = Array.isArray(item?.opciones)
    ? item.opciones.reduce(
        (total, opcion) => total + (normalizarPrecio(opcion?.precio_extra) ?? 0),
        0,
      )
    : 0;

  return (base + adicionales) * normalizarCantidad(item?.cantidad);
}

export function calcularTotales(items = []) {
  const lista = Array.isArray(items) ? items.filter(Boolean) : [];
  let cantidadTotal = 0;
  let totalEstimado = 0;
  let tienePreciosPendientes = false;

  lista.forEach((item) => {
    cantidadTotal += normalizarCantidad(item.cantidad);
    const subtotal = calcularSubtotalItem(item);

    if (subtotal === null) {
      tienePreciosPendientes = true;
      return;
    }

    totalEstimado += subtotal;
  });

  return {
    cantidadTotal,
    totalEstimado: tienePreciosPendientes ? null : totalEstimado,
    tienePreciosPendientes,
  };
}

function obtenerAlmacenamiento(storage) {
  if (storage !== undefined) {
    return storage;
  }

  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function leerCarrito(storage) {
  try {
    const almacenamiento = obtenerAlmacenamiento(storage);

    if (!almacenamiento) {
      return [];
    }

    const crudo = almacenamiento.getItem(CLAVE_ALMACENAMIENTO);

    if (!crudo) {
      return [];
    }

    const datos = JSON.parse(crudo);

    if (!datos || datos.version !== VERSION_CARRITO || !Array.isArray(datos.items)) {
      return [];
    }

    return datos.items.map(normalizarItemCarrito).filter(Boolean);
  } catch {
    return [];
  }
}

export function guardarCarrito(items, storage) {
  try {
    const almacenamiento = obtenerAlmacenamiento(storage);

    if (!almacenamiento) {
      return false;
    }

    const normalizados = (Array.isArray(items) ? items : [])
      .map(normalizarItemCarrito)
      .filter(Boolean);

    almacenamiento.setItem(
      CLAVE_ALMACENAMIENTO,
      JSON.stringify({ version: VERSION_CARRITO, items: normalizados }),
    );

    return true;
  } catch {
    return false;
  }
}
