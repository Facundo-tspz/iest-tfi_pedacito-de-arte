import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useDebouncedValue from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('devuelve el valor inicial de inmediato', () => {
    const { result } = renderHook(() => useDebouncedValue('inicial'));

    expect(result.current).toBe('inicial');
  });

  it('actualiza el valor después de 300 ms', () => {
    const { result, rerender } = renderHook(
      ({ valor }) => useDebouncedValue(valor),
      { initialProps: { valor: 'a' } },
    );

    rerender({ valor: 'ab' });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('ab');
  });

  it('cancela el temporizador anterior cuando cambia el valor', () => {
    const { result, rerender } = renderHook(
      ({ valor }) => useDebouncedValue(valor),
      { initialProps: { valor: 'a' } },
    );

    rerender({ valor: 'ab' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ valor: 'abc' });

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('abc');
  });

  it('respeta un retardo personalizado', () => {
    const { result, rerender } = renderHook(
      ({ valor }) => useDebouncedValue(valor, 500),
      { initialProps: { valor: 'a' } },
    );

    rerender({ valor: 'ab' });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('ab');
  });
});
