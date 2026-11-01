import { describe, expect, it } from 'vitest';
import { normalizarTexto } from './texto';

describe('normalizarTexto', () => {
  it('quita acentos y pasa a minúsculas', () => {
    expect(normalizarTexto('  BOTÁNICA  ')).toBe('botanica');
  });

  it('normaliza textos con eñes y diéresis', () => {
    expect(normalizarTexto('Diseño Artesanal')).toBe('diseno artesanal');
    expect(normalizarTexto('Agüita')).toBe('aguita');
  });

  it('devuelve cadena vacía para valores no textuales', () => {
    expect(normalizarTexto(null)).toBe('');
    expect(normalizarTexto(undefined)).toBe('');
    expect(normalizarTexto(123)).toBe('');
  });

  it('conserva los espacios internos', () => {
    expect(normalizarTexto('Agenda   Docente')).toBe('agenda   docente');
  });
});
