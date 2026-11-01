const FORMATEADOR_ARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const PRECIO_A_CONFIRMAR = 'Precio a confirmar';

function normalizarPrecio(valor) {
  if (typeof valor === 'number') {
    return Number.isFinite(valor) ? valor : null;
  }

  if (typeof valor === 'string' && valor.trim() !== '') {
    const numero = Number(valor);

    return Number.isFinite(numero) ? numero : null;
  }

  return null;
}

export function formatearPrecio(precio) {
  const normalizado = normalizarPrecio(precio);

  return normalizado === null ? PRECIO_A_CONFIRMAR : FORMATEADOR_ARS.format(normalizado);
}

export function calcularPrecioEstimado(precioBase, opciones = []) {
  const base = normalizarPrecio(precioBase);

  if (base === null) {
    return null;
  }

  const adicionales = Array.isArray(opciones)
    ? opciones.reduce((total, opcion) => {
        const adicional = normalizarPrecio(opcion?.precio_extra);

        return adicional === null ? total : total + adicional;
      }, 0)
    : 0;

  return base + adicionales;
}
