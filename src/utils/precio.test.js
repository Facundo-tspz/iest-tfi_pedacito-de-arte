import { describe, expect, it } from 'vitest';
import { calcularPrecioEstimado, formatearPrecio } from './precio';

describe('formatearPrecio', () => {
  it('formatea pesos argentinos sin decimales', () => {
    const formateado = formatearPrecio(12500);

    expect(formateado).toMatch(/\$\s?12\.500/);
    expect(formateado).not.toContain(',00');
  });

  it('muestra Precio a confirmar cuando la base es nula', () => {
    expect(formatearPrecio(null)).toBe('Precio a confirmar');
    expect(formatearPrecio(undefined)).toBe('Precio a confirmar');
    expect(formatearPrecio('')).toBe('Precio a confirmar');
  });

  it('nunca muestra $0 para una base nula', () => {
    expect(formatearPrecio(null)).not.toContain('$0');
  });

  it('acepta precios numéricos enviados como texto', () => {
    expect(formatearPrecio('12500')).toMatch(/12\.500/);
  });
});

describe('calcularPrecioEstimado', () => {
  it('suma los adicionales de las opciones elegidas', () => {
    const opciones = [{ precio_extra: 500 }, { precio_extra: 250 }];

    expect(calcularPrecioEstimado(10000, opciones)).toBe(10750);
  });

  it('devuelve la base cuando no hay opciones', () => {
    expect(calcularPrecioEstimado(10000)).toBe(10000);
  });

  it('devuelve null cuando la base es nula', () => {
    expect(calcularPrecioEstimado(null, [{ precio_extra: 500 }])).toBeNull();
  });

  it('ignora adicionales inválidos', () => {
    const opciones = [{ precio_extra: 500 }, { precio_extra: null }, { precio_extra: 'no-es-numero' }];

    expect(calcularPrecioEstimado(10000, opciones)).toBe(10500);
  });
});
