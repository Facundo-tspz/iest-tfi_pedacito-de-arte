import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useMovimientoReducido from './useMovimientoReducido';

function crearMediaQuery(matchesInicial = false) {
  let matches = matchesInicial;
  const oyentes = new Set();

  return {
    get matches() {
      return matches;
    },
    set matches(valor) {
      matches = valor;
    },
    addEventListener: vi.fn((evento, oyente) => {
      if (evento === 'change') {
        oyentes.add(oyente);
      }
    }),
    removeEventListener: vi.fn((evento, oyente) => {
      if (evento === 'change') {
        oyentes.delete(oyente);
      }
    }),
    emitir(valor) {
      matches = valor;
      oyentes.forEach((oyente) => oyente({ matches: valor }));
    },
  };
}

const matchMediaOriginal = window.matchMedia;

describe('useMovimientoReducido', () => {
  let media;

  beforeEach(() => {
    media = crearMediaQuery(false);
    window.matchMedia = vi.fn(() => media);
  });

  afterEach(() => {
    if (matchMediaOriginal) {
      window.matchMedia = matchMediaOriginal;
    } else {
      delete window.matchMedia;
    }

    vi.restoreAllMocks();
  });

  it('detecta la preferencia inicial', () => {
    media.matches = true;

    const { result } = renderHook(() => useMovimientoReducido());

    expect(result.current).toBe(true);
  });

  it('actualiza el valor cuando cambia la preferencia', () => {
    const { result } = renderHook(() => useMovimientoReducido());

    expect(result.current).toBe(false);

    act(() => {
      media.emitir(true);
    });

    expect(result.current).toBe(true);
  });

  it('deja de escuchar al desmontar', () => {
    const { unmount } = renderHook(() => useMovimientoReducido());

    expect(media.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    unmount();

    expect(media.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('devuelve false cuando matchMedia no está disponible', () => {
    delete window.matchMedia;

    const { result } = renderHook(() => useMovimientoReducido());

    expect(result.current).toBe(false);
  });
});
