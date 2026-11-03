import { describe, expect, it } from 'vitest';
import { obtenerImagenHero, obtenerImagenPrincipal, obtenerImagenesGaleria } from './imagenes';

const PRODUCTO = {
  imagenes: [
    {
      id: 'catalogo-2',
      url: 'https://cdn.test/catalogo-2.webp',
      alt: 'Interior del producto',
      orden: 2,
      es_hero: false,
    },
    {
      id: 'hero',
      url: 'https://cdn.test/hero.webp',
      alt: 'Producto sobre mesa de taller',
      orden: 3,
      es_hero: true,
    },
    {
      id: 'catalogo-1',
      url: 'https://cdn.test/catalogo-1.webp',
      alt: 'Producto cerrado',
      orden: 1,
      es_hero: false,
    },
  ],
};

describe('selección de imágenes de producto', () => {
  it('usa la imagen marcada como hero', () => {
    expect(obtenerImagenHero(PRODUCTO)?.id).toBe('hero');
  });

  it('usa la primera imagen de catálogo aunque el hero esté primero', () => {
    expect(obtenerImagenPrincipal(PRODUCTO)?.id).toBe('catalogo-1');
  });

  it('excluye la imagen de hero de la galería', () => {
    expect(obtenerImagenesGaleria(PRODUCTO).map((imagen) => imagen.id)).toEqual([
      'catalogo-1',
      'catalogo-2',
    ]);
  });

  it('vuelve a la primera imagen cuando no hay hero', () => {
    const productoSinHero = {
      imagenes: [{ id: 'unica', url: 'https://cdn.test/unica.webp', alt: 'Única', orden: 4 }],
    };

    expect(obtenerImagenHero(productoSinHero)?.id).toBe('unica');
    expect(obtenerImagenPrincipal(productoSinHero)?.id).toBe('unica');
  });

  it('no usa el hero como imagen de catálogo si es la única imagen', () => {
    const productoConSoloHero = {
      imagenes: [
        {
          id: 'hero',
          url: 'https://cdn.test/hero.webp',
          alt: 'Producto sobre mesa de taller',
          orden: 1,
          es_hero: true,
        },
      ],
    };

    expect(obtenerImagenPrincipal(productoConSoloHero)).toBeNull();
    expect(obtenerImagenesGaleria(productoConSoloHero)).toEqual([]);
  });

  it('devuelve null cuando no hay imágenes', () => {
    expect(obtenerImagenHero({ imagenes: [] })).toBeNull();
    expect(obtenerImagenPrincipal({})).toBeNull();
    expect(obtenerImagenesGaleria({})).toEqual([]);
  });
});
