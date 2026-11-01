import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useMovimientoReducido from './useMovimientoReducido';
import useCarrusel from './useCarrusel';

vi.mock('./useMovimientoReducido', () => ({
  default: vi.fn(() => false),
}));

function avanzar(ms) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe('useCarrusel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useMovimientoReducido.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('avanza automáticamente cada intervalo', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    expect(result.current.indice).toBe(0);

    avanzar(7999);
    expect(result.current.indice).toBe(0);

    avanzar(1);
    expect(result.current.indice).toBe(1);

    avanzar(8000);
    expect(result.current.indice).toBe(2);
  });

  it('vuelve al inicio al pasar el último slide', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 2, intervalo: 1000 }),
    );

    avanzar(2000);

    expect(result.current.indice).toBe(0);
  });

  it('no incrementa versionManual con el avance automático', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    avanzar(8000);

    expect(result.current.indice).toBe(1);
    expect(result.current.versionManual).toBe(0);
  });

  it('pausa por interacción y reanuda a los 5 segundos', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.iniciarInteraccion();
    });

    expect(result.current.pausado).toBe(true);

    avanzar(10000);
    expect(result.current.pausado).toBe(true);

    act(() => {
      result.current.finalizarInteraccion();
    });

    avanzar(4999);
    expect(result.current.pausado).toBe(true);

    avanzar(1);
    expect(result.current.pausado).toBe(false);
  });

  it('registra clics, toques o teclado y reanuda a los 5 segundos', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.registrarInteraccion();
    });

    expect(result.current.pausado).toBe(true);

    avanzar(5000);
    expect(result.current.pausado).toBe(false);
  });

  it('mantiene la pausa manual hasta que el usuario la quite', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.alternarPausa();
    });

    expect(result.current.pausaManual).toBe(true);
    expect(result.current.pausado).toBe(true);

    avanzar(20000);
    expect(result.current.pausado).toBe(true);

    act(() => {
      result.current.alternarPausa();
    });

    expect(result.current.pausaManual).toBe(false);
    expect(result.current.pausado).toBe(false);
  });

  it('quita la pausa por interacción al reanudar manualmente', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.iniciarInteraccion();
    });

    act(() => {
      result.current.alternarPausa();
    });

    expect(result.current.pausado).toBe(true);

    act(() => {
      result.current.alternarPausa();
    });

    expect(result.current.pausado).toBe(false);
  });

  it('cambia de slide con las flechas y reinicia el temporizador', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    avanzar(6000);

    act(() => {
      result.current.irSiguiente();
    });

    expect(result.current.indice).toBe(1);
    expect(result.current.versionManual).toBe(1);

    avanzar(7999);
    expect(result.current.indice).toBe(1);

    avanzar(1);
    expect(result.current.indice).toBe(2);
  });

  it('permite ir al slide anterior con vuelta circular', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.irAnterior();
    });

    expect(result.current.indice).toBe(3);
    expect(result.current.versionManual).toBe(1);
  });

  it('permite ir a un slide concreto', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    act(() => {
      result.current.irA(2);
    });

    expect(result.current.indice).toBe(2);
    expect(result.current.versionManual).toBe(1);
  });

  it('se detiene con movimiento reducido', () => {
    useMovimientoReducido.mockReturnValue(true);

    const { result } = renderHook(() =>
      useCarrusel({ total: 4, intervalo: 8000 }),
    );

    expect(result.current.pausado).toBe(true);

    avanzar(20000);
    expect(result.current.indice).toBe(0);
  });

  it('no avanza si hay un solo slide', () => {
    const { result } = renderHook(() =>
      useCarrusel({ total: 1, intervalo: 1000 }),
    );

    expect(result.current.pausado).toBe(true);

    avanzar(5000);
    expect(result.current.indice).toBe(0);
  });

  it('normaliza el índice cuando cambia el total', () => {
    const { result, rerender } = renderHook(
      ({ total }) => useCarrusel({ total, intervalo: 8000 }),
      { initialProps: { total: 4 } },
    );

    act(() => {
      result.current.irA(3);
    });

    expect(result.current.indice).toBe(3);

    rerender({ total: 2 });

    expect(result.current.indice).toBe(1);
  });
});
