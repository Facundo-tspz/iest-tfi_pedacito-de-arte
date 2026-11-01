import { describe, expect, it } from 'vitest';
import { CATEGORIAS, PRODUCTOS } from '../data/mockCatalogo';
import {
  obtenerCategorias,
  obtenerDestacados,
  obtenerNovedades,
  obtenerProductoPorSlug,
  obtenerProductos,
} from './catalogo';

const SLUGS_HERO = [
  'agenda-botanica',
  'agenda-docente-primavera',
  'anotador-de-cocina',
  'revista-mandalas',
];

describe('servicio de catálogo', () => {
  it('devuelve las categorías activas ordenadas', async () => {
    const categorias = await obtenerCategorias();

    expect(categorias).toHaveLength(4);
    expect(categorias.map((categoria) => categoria.slug)).toEqual([
      'agendas',
      'agendas-docentes',
      'anotadores',
      'revistas-para-colorear',
    ]);
    expect(categorias.every((categoria) => categoria.activo)).toBe(true);
  });

  it('devuelve los productos disponibles ordenados', async () => {
    const productos = await obtenerProductos();

    expect(productos).toHaveLength(10);
    expect(productos.map((producto) => producto.orden)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it('filtra por categoría', async () => {
    const productos = await obtenerProductos({ categoria: 'agendas' });

    expect(productos).toHaveLength(3);
    expect(
      productos.every((producto) => producto.categoria.slug === 'agendas'),
    ).toBe(true);
  });

  it('ignora una categoría inválida', async () => {
    const productos = await obtenerProductos({ categoria: 'no-existe' });

    expect(productos).toHaveLength(10);
  });

  it('busca sin distinguir mayúsculas ni acentos', async () => {
    const productos = await obtenerProductos({ buscar: 'BOTÁNICA' });

    expect(productos.map((producto) => producto.slug)).toEqual([
      'agenda-botanica',
    ]);
  });

  it('busca por código', async () => {
    const productos = await obtenerProductos({ buscar: 'AD-002' });

    expect(productos.map((producto) => producto.slug)).toEqual([
      'agenda-docente-bosque',
    ]);
  });

  it('busca por descripción', async () => {
    const productos = await obtenerProductos({ buscar: 'recetas' });

    expect(productos.map((producto) => producto.slug)).toEqual([
      'anotador-de-cocina',
    ]);
  });

  it('busca por nombre de categoría', async () => {
    const productos = await obtenerProductos({ buscar: 'anotadores' });

    expect(productos).toHaveLength(2);
    expect(
      productos.every(
        (producto) => producto.categoria.slug === 'anotadores',
      ),
    ).toBe(true);
  });

  it('combina categoría y búsqueda', async () => {
    const productos = await obtenerProductos({
      categoria: 'agendas',
      buscar: 'viajera',
    });

    expect(productos.map((producto) => producto.slug)).toEqual([
      'agenda-viajera',
    ]);
  });

  it('devuelve vacío cuando la combinación no tiene resultados', async () => {
    const productos = await obtenerProductos({
      categoria: 'agendas',
      buscar: 'docente',
    });

    expect(productos).toEqual([]);
  });

  it('devuelve el detalle por slug y null si no existe', async () => {
    const producto = await obtenerProductoPorSlug('agenda-botanica');

    expect(producto?.nombre).toBe('Agenda Botánica');
    expect(await obtenerProductoPorSlug('no-existe')).toBeNull();
  });

  it('devuelve hasta cuatro destacados ordenados', async () => {
    const destacados = await obtenerDestacados();

    expect(destacados).toHaveLength(4);
    expect(destacados.map((producto) => producto.slug)).toEqual(SLUGS_HERO);
  });

  it('completa los destacados con los primeros disponibles', async () => {
    const revista = PRODUCTOS.find(
      (producto) => producto.slug === 'revista-mandalas',
    );

    revista.destacado = false;

    try {
      const destacados = await obtenerDestacados(4);

      expect(destacados.map((producto) => producto.slug)).toEqual([
        'agenda-botanica',
        'agenda-docente-primavera',
        'anotador-de-cocina',
        'agenda-minimal',
      ]);
    } finally {
      revista.destacado = true;
    }
  });

  it('devuelve novedades excluyendo los slugs del hero', async () => {
    const novedades = await obtenerNovedades(4, SLUGS_HERO);

    expect(novedades.map((producto) => producto.slug)).toEqual([
      'agenda-minimal',
      'agenda-viajera',
      'agenda-docente-bosque',
      'agenda-docente-cielo',
    ]);
  });

  it('respeta el límite de novedades', async () => {
    const novedades = await obtenerNovedades(2, SLUGS_HERO);

    expect(novedades).toHaveLength(2);
  });

  it('excluye productos de categorías inactivas', async () => {
    const categoria = CATEGORIAS.find(
      (item) => item.slug === 'anotadores',
    );

    categoria.activo = false;

    try {
      const categorias = await obtenerCategorias();
      const productos = await obtenerProductos();

      expect(
        categorias.some((item) => item.slug === 'anotadores'),
      ).toBe(false);
      expect(
        productos.some(
          (producto) => producto.categoria.slug === 'anotadores',
        ),
      ).toBe(false);
      expect(await obtenerProductoPorSlug('anotador-de-cocina')).toBeNull();
    } finally {
      categoria.activo = true;
    }
  });

  it('excluye productos no disponibles', async () => {
    const producto = PRODUCTOS.find(
      (item) => item.slug === 'agenda-minimal',
    );

    producto.disponible = false;

    try {
      const productos = await obtenerProductos();

      expect(
        productos.some((item) => item.slug === 'agenda-minimal'),
      ).toBe(false);
      expect(await obtenerProductoPorSlug('agenda-minimal')).toBeNull();
    } finally {
      producto.disponible = true;
    }
  });
});
