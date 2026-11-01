import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { obtenerProductoPorSlug } from '../services/catalogo';
import useProducto from './useProducto';

vi.mock('../services/catalogo', () => ({
  obtenerProductoPorSlug: vi.fn(),
}));

describe('useProducto', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('empieza cargando y luego expone el producto', async () => {
    const producto = { id: 'prod-1', slug: 'agenda-botanica' };
    obtenerProductoPorSlug.mockResolvedValue(producto);

    const { result } = renderHook(() => useProducto('agenda-botanica'));

    expect(result.current.cargando).toBe(true);

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.producto).toEqual(producto);
    expect(result.current.error).toBeNull();
    expect(obtenerProductoPorSlug).toHaveBeenCalledWith('agenda-botanica');
  });

  it('devuelve producto nulo sin error cuando no existe', async () => {
    obtenerProductoPorSlug.mockResolvedValue(null);

    const { result } = renderHook(() => useProducto('no-existe'));

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.producto).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('expone el error y permite reintentar', async () => {
    const producto = { id: 'prod-1', slug: 'agenda-botanica' };
    obtenerProductoPorSlug
      .mockRejectedValueOnce(new Error('fallo del servicio'))
      .mockResolvedValueOnce(producto);

    const { result } = renderHook(() => useProducto('agenda-botanica'));

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.cargando).toBe(false);
    expect(result.current.producto).toBeNull();

    act(() => {
      result.current.reintentar();
    });

    await waitFor(() => {
      expect(result.current.producto).toEqual(producto);
    });

    expect(result.current.error).toBeNull();
    expect(obtenerProductoPorSlug).toHaveBeenCalledTimes(2);
  });

  it('vuelve a cargar cuando cambia el slug', async () => {
    obtenerProductoPorSlug
      .mockResolvedValueOnce({ slug: 'agenda-botanica' })
      .mockResolvedValueOnce({ slug: 'agenda-minimal' });

    const { result, rerender } = renderHook(({ slug }) => useProducto(slug), {
      initialProps: { slug: 'agenda-botanica' },
    });

    await waitFor(() => {
      expect(result.current.producto).toEqual({ slug: 'agenda-botanica' });
    });

    rerender({ slug: 'agenda-minimal' });

    await waitFor(() => {
      expect(result.current.producto).toEqual({ slug: 'agenda-minimal' });
    });

    expect(obtenerProductoPorSlug).toHaveBeenNthCalledWith(1, 'agenda-botanica');
    expect(obtenerProductoPorSlug).toHaveBeenNthCalledWith(2, 'agenda-minimal');
  });
});
