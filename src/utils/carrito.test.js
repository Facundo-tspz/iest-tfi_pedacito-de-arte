import { describe, expect, it } from 'vitest';
import {
  CLAVE_ALMACENAMIENTO,
  CANTIDAD_MAXIMA,
  NOTAS_MAXIMAS,
  calcularSubtotalItem,
  calcularTotales,
  crearClaveItem,
  crearItemCarrito,
  fusionarItem,
  guardarCarrito,
  leerCarrito,
  normalizarCantidad,
  normalizarNotas,
} from './carrito';

const PRODUCTO = {
  id: 'prod-agenda-botanica',
  slug: 'agenda-botanica',
  nombre: 'Agenda Botánica',
  codigo: 'AG-001',
  categoria: { nombre: 'Agendas', slug: 'agendas' },
  precio_base: 10000,
};

const OPCIONES = [
  {
    id: 'op-interior-rayado',
    tipo_opcion: 'Interior',
    valor: 'Rayado',
    precio_extra: 0,
  },
  {
    id: 'op-tamano-a4',
    tipo_opcion: 'Tamaño',
    valor: 'A4',
    precio_extra: 500,
  },
];

function crearStorage() {
  const datos = new Map();

  return {
    getItem: (clave) => (datos.has(clave) ? datos.get(clave) : null),
    setItem: (clave, valor) => datos.set(clave, String(valor)),
    removeItem: (clave) => datos.delete(clave),
  };
}

describe('utilidades del carrito', () => {
  it('normaliza notas y cantidades dentro de los límites', () => {
    expect(normalizarNotas('  hola  ')).toBe('hola');
    expect(normalizarNotas('a'.repeat(600))).toHaveLength(NOTAS_MAXIMAS);
    expect(normalizarCantidad(0)).toBe(1);
    expect(normalizarCantidad(100)).toBe(CANTIDAD_MAXIMA);
    expect(normalizarCantidad('3.7')).toBe(3);
    expect(normalizarCantidad('no-es-numero')).toBe(1);
  });

  it('genera la misma clave con opciones en distinto orden', () => {
    const clave1 = crearClaveItem(PRODUCTO, OPCIONES, '  Regalo  ');
    const clave2 = crearClaveItem(PRODUCTO, [...OPCIONES].reverse(), 'Regalo');

    expect(clave1).toBe(clave2);
    expect(crearClaveItem(PRODUCTO, OPCIONES, 'Otra nota')).not.toBe(clave1);
  });

  it('crea un ítem con producto, opciones, notas y cantidad', () => {
    const item = crearItemCarrito({
      producto: PRODUCTO,
      opciones: OPCIONES,
      notas: '  Regalo  ',
      cantidad: 2,
    });

    expect(item).toMatchObject({
      producto_id: PRODUCTO.id,
      slug: PRODUCTO.slug,
      nombre: PRODUCTO.nombre,
      codigo: PRODUCTO.codigo,
      cantidad: 2,
      notas: 'Regalo',
      precio_base: 10000,
    });
    expect(item.opciones).toHaveLength(2);
    expect(item.clave).toBe(crearClaveItem(PRODUCTO, OPCIONES, 'Regalo'));
  });

  it('rechaza productos sin slug o nombre', () => {
    expect(crearItemCarrito({ producto: { nombre: 'Sin slug' } })).toBeNull();
    expect(crearItemCarrito({ producto: { slug: 'sin-nombre' } })).toBeNull();
  });

  it('fusiona ítems iguales y respeta el máximo de cantidad', () => {
    const item = crearItemCarrito({
      producto: PRODUCTO,
      opciones: OPCIONES,
    });
    const conUno = fusionarItem([], item);
    const conDos = fusionarItem(conUno, { ...item, cantidad: 1 });
    const conMaximo = fusionarItem(conDos, { ...item, cantidad: 999 });

    expect(conUno).toHaveLength(1);
    expect(conDos[0].cantidad).toBe(2);
    expect(conMaximo[0].cantidad).toBe(CANTIDAD_MAXIMA);

    const distinto = crearItemCarrito({
      producto: PRODUCTO,
      opciones: [{ ...OPCIONES[0], id: 'op-interior-punteado' }],
    });

    expect(fusionarItem(conDos, distinto)).toHaveLength(2);
  });

  it('calcula subtotales y totales con adicionales y cantidades', () => {
    const item = crearItemCarrito({
      producto: PRODUCTO,
      opciones: OPCIONES,
      cantidad: 2,
    });

    expect(calcularSubtotalItem(item)).toBe(21000);

    const otros = crearItemCarrito({
      producto: { ...PRODUCTO, slug: 'anotador', nombre: 'Anotador', precio_base: 5000 },
    });

    expect(calcularTotales([item, otros])).toEqual({
      cantidadTotal: 3,
      totalEstimado: 26000,
      tienePreciosPendientes: false,
    });
  });

  it('no inventa total cuando falta un precio base', () => {
    const item = crearItemCarrito({
      producto: { ...PRODUCTO, precio_base: null },
    });

    expect(calcularSubtotalItem(item)).toBeNull();
    expect(calcularTotales([item])).toEqual({
      cantidadTotal: 1,
      totalEstimado: null,
      tienePreciosPendientes: true,
    });
  });

  it('guarda y recupera el carrito desde un almacenamiento válido', () => {
    const storage = crearStorage();
    const item = crearItemCarrito({ producto: PRODUCTO, opciones: OPCIONES });

    expect(guardarCarrito([item], storage)).toBe(true);
    expect(leerCarrito(storage)).toEqual([item]);
  });

  it('tolera almacenamiento corrupto, versión incorrecta o ítems inválidos', () => {
    const storage = crearStorage();

    storage.setItem(CLAVE_ALMACENAMIENTO, '{');
    expect(leerCarrito(storage)).toEqual([]);

    storage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify({ version: 99, items: [] }));
    expect(leerCarrito(storage)).toEqual([]);

    const item = crearItemCarrito({ producto: PRODUCTO });
    storage.setItem(
      CLAVE_ALMACENAMIENTO,
      JSON.stringify({ version: 1, items: [item, { invalido: true }] }),
    );
    expect(leerCarrito(storage)).toHaveLength(1);
  });

  it('devuelve un carrito vacío si no hay almacenamiento disponible', () => {
    expect(leerCarrito(null)).toEqual([]);
    expect(guardarCarrito([], null)).toBe(false);
  });

  it('devuelve false si el almacenamiento falla al guardar', () => {
    const storage = {
      setItem: () => {
        throw new Error('sin espacio');
      },
    };

    expect(guardarCarrito([], storage)).toBe(false);
  });
});
