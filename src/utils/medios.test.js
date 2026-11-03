import { describe, expect, it } from 'vitest';
import {
  etiquetaFormato,
  filtrarMedios,
  formatoMedio,
  nombreDesdePath,
  ordenarMedios,
  priorizarSeleccionados,
} from './medios';

const MEDIOS = [
  {
    id: '1',
    path: '2026/11111111-1111-4111-8111-111111111111-anotador-a6-hero.webp',
    alt: 'Anotador A6 sobre mesa de taller',
    width: 1920,
    height: 1080,
    created_at: '2026-11-02T10:00:00.000Z',
  },
  {
    id: '2',
    path: '2026/22222222-2222-4222-8222-222222222222-anotador-a6-catalogo-1.webp',
    alt: 'Anotador A6 cerrado',
    width: 1200,
    height: 900,
    created_at: '2026-11-02T11:00:00.000Z',
  },
  {
    id: '3',
    path: '2026/33333333-3333-4333-8333-333333333333-agenda-docente-hero.webp',
    alt: 'Agenda Docente abierta',
    width: 1920,
    height: 1080,
    created_at: '2026-11-02T12:00:00.000Z',
  },
];

describe('utilidades de medios', () => {
  it('obtiene un nombre legible desde el path', () => {
    expect(nombreDesdePath(MEDIOS[0].path)).toBe('anotador a6 hero');
    expect(nombreDesdePath('2026/catalogo.webp')).toBe('catalogo');
    expect(nombreDesdePath(null)).toBe('');
  });

  it('detecta el formato según las dimensiones', () => {
    expect(formatoMedio(MEDIOS[0])).toBe('hero');
    expect(formatoMedio(MEDIOS[1])).toBe('catalogo');
    expect(formatoMedio({ width: null, height: null })).toBe('otro');
    expect(etiquetaFormato(MEDIOS[0])).toBe('Hero (16:9)');
    expect(etiquetaFormato(MEDIOS[1])).toBe('Catálogo (4:3)');
  });

  it('busca por nombre, alt o formato sin distinguir acentos', () => {
    expect(filtrarMedios(MEDIOS, { buscar: 'ANOTADOR' })).toHaveLength(2);
    expect(filtrarMedios(MEDIOS, { buscar: 'agenda' })).toHaveLength(1);
    expect(filtrarMedios(MEDIOS, { buscar: '16:9' })).toHaveLength(2);
    expect(filtrarMedios(MEDIOS, { buscar: 'no existe' })).toHaveLength(0);
  });

  it('filtra por formato y por seleccionadas', () => {
    expect(filtrarMedios(MEDIOS, { formato: 'hero' })).toHaveLength(2);
    expect(filtrarMedios(MEDIOS, { formato: 'catalogo' })).toHaveLength(1);
    expect(
      filtrarMedios(MEDIOS, {
        soloSeleccionadas: true,
        seleccionadas: [MEDIOS[1].path],
      }),
    ).toEqual([MEDIOS[1]]);
  });

  it('ordena por nombre o por fecha', () => {
    expect(ordenarMedios(MEDIOS, 'nombre').map((medio) => medio.id)).toEqual(['3', '2', '1']);
    expect(ordenarMedios(MEDIOS, 'recientes').map((medio) => medio.id)).toEqual(['3', '2', '1']);
  });

  it('prioriza las imágenes seleccionadas sin perder el orden restante', () => {
    expect(priorizarSeleccionados(MEDIOS, [MEDIOS[1].path]).map((medio) => medio.id)).toEqual([
      '2',
      '1',
      '3',
    ]);
  });
});
