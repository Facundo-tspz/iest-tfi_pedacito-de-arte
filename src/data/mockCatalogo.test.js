import { describe, expect, it } from 'vitest';
import { CATEGORIAS, FOTOS_PROCESO, PRODUCTOS } from './mockCatalogo';

const CATEGORIAS_ESPERADAS = [
  ['Agendas', 'agendas'],
  ['Agendas Docentes', 'agendas-docentes'],
  ['Anotadores', 'anotadores'],
  ['Revistas para Colorear', 'revistas-para-colorear'],
];

describe('mockCatalogo', () => {
  it('define las cuatro categorías del catálogo', () => {
    expect(CATEGORIAS).toHaveLength(4);
    expect(CATEGORIAS.map(({ nombre, slug }) => [nombre, slug])).toEqual(
      CATEGORIAS_ESPERADAS,
    );
    expect(
      CATEGORIAS.every((categoria) => categoria.activo && categoria.provisional),
    ).toBe(true);
  });

  it('define diez productos con dos o tres por categoría', () => {
    expect(PRODUCTOS).toHaveLength(10);

    for (const categoria of CATEGORIAS) {
      const cantidad = PRODUCTOS.filter(
        (producto) => producto.categoria_id === categoria.id,
      ).length;

      expect(cantidad).toBeGreaterThanOrEqual(2);
      expect(cantidad).toBeLessThanOrEqual(3);
    }
  });

  it('define cuatro productos destacados', () => {
    expect(PRODUCTOS.filter((producto) => producto.destacado)).toHaveLength(4);
  });

  it('usa precio_base null en todos los productos', () => {
    expect(PRODUCTOS.every((producto) => producto.precio_base === null)).toBe(
      true,
    );
  });

  it('incluye características válidas en todos los productos', () => {
    for (const producto of PRODUCTOS) {
      expect(Array.isArray(producto.caracteristicas)).toBe(true);
      expect(producto.caracteristicas.length).toBeGreaterThan(0);
      expect(producto.caracteristicas.length).toBeLessThanOrEqual(8);
      expect(
        producto.caracteristicas.every(
          (caracteristica) => caracteristica.length <= 80,
        ),
      ).toBe(true);
    }
  });

  it('relaciona cada producto con su categoría', () => {
    for (const producto of PRODUCTOS) {
      const categoria = CATEGORIAS.find(
        (item) => item.id === producto.categoria_id,
      );

      expect(categoria).toBeDefined();
      expect(producto.categoria).toEqual({
        id: categoria.id,
        nombre: categoria.nombre,
        slug: categoria.slug,
      });
    }
  });

  it('define imágenes con alt descriptivo', () => {
    for (const producto of PRODUCTOS) {
      expect(producto.imagenes.length).toBeGreaterThan(0);
      expect(
        producto.imagenes.every((imagen) => imagen.alt.trim().length > 0),
      ).toBe(true);
    }
  });

  it('define opciones de personalización válidas y con ids únicos', () => {
    const ids = new Set();

    for (const producto of PRODUCTOS) {
      expect(producto.opciones.length).toBeGreaterThan(0);

      for (const opcion of producto.opciones) {
        expect(opcion.id).toBeTruthy();
        expect(ids.has(opcion.id)).toBe(false);
        ids.add(opcion.id);
        expect(opcion.tipo_opcion).toBeTruthy();
        expect(opcion.valor).toBeTruthy();
        expect(opcion.precio_extra).toBeGreaterThanOrEqual(0);
        expect(opcion.activo).toBe(true);
        expect(opcion.provisional).toBe(true);
      }
    }
  });

  it('define cuatro fotos de proceso', () => {
    expect(FOTOS_PROCESO).toHaveLength(4);
    expect(
      FOTOS_PROCESO.every(
        (foto) => foto.provisional && foto.alt.trim().length > 0,
      ),
    ).toBe(true);
  });

  it('usa códigos y slugs únicos', () => {
    expect(new Set(PRODUCTOS.map((producto) => producto.codigo)).size).toBe(
      PRODUCTOS.length,
    );
    expect(new Set(PRODUCTOS.map((producto) => producto.slug)).size).toBe(
      PRODUCTOS.length,
    );
    expect(new Set(CATEGORIAS.map((categoria) => categoria.slug)).size).toBe(
      CATEGORIAS.length,
    );
  });

  it('marca todos los productos como provisionales', () => {
    expect(PRODUCTOS.every((producto) => producto.provisional)).toBe(true);
  });
});
