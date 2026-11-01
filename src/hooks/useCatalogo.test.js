import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { obtenerProductos } from '../services/catalogo';
import useCatalogo from './useCatalogo';

vi.mock('../services/catalogo', () => ({
  obtenerProductos: vi.fn(),
}));

describe('useCatalogo', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('empieza cargando y luego expone los productos', async () => {
    const productos = [{ id: 'prod-1' }];
    obtenerProductos.mockResolvedValue(productos);

    const { result } = renderHook(() =>
      useCatalogo({ categoria: 'agendas', buscar: 'botanica' }),
    );

    expect(result.current.cargando).toBe(true);

    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });

    expect(result.current.productos).toEqual(productos);
    expect(result.current.error).toBeNull();
    expect(obtenerProductos).toHaveBeenCalledWith({
      categoria: 'agendas',
      buscar: 'botanica',
    });
  });

  it('expone el error y permite reintentar', async () => {
    const productos = [{ id: 'prod-1' }];
    obtenerProductos
      .mockRejectedValueOnce(new Error('fallo del servicio'))
      .mockResolvedValueOnce(productos);

    const { result } = renderHook(() => useCatalogo());

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.cargando).toBe(false);
    expect(result.current.productos).toEqual([]);

    act(() => {
      result.current.reintentar();
    });

    await waitFor(() => {
      expect(result.current.productos).toEqual(productos);
    });

    expect(result.current.error).toBeNull();
    expect(obtenerProductos).toHaveBeenCalledTimes(2);
  });

  it('vuelve a cargar cuando cambian los filtros', async () => {
    obtenerProductos
      .mockResolvedValueOnce([{ id: 'prod-agenda' }])
      .mockResolvedValueOnce([{ id: 'prod-anotador' }]);

    const { result, rerender } = renderHook(
      ({ filtros }) => useCatalogo(filtros),
      { initialProps: { filtros: { categoria: 'agendas' } } },
    );

    await waitFor(() => {
      expect(result.current.productos).toEqual([{ id: 'prod-agenda' }]);
    });

    rerender({ filtros: { categoria: 'anotadores' } });

    await waitFor(() => {
      expect(result.current.productos).toEqual([{ id: 'prod-anotador' }]);
    });

    expect(obtenerProductos).toHaveBeenNthCalledWith(1, {
      categoria: 'agendas',
      buscar: undefined,
    });
    expect(obtenerProductos).toHaveBeenNthCalledWith(2, {
      categoria: 'anotadores',
      buscar: undefined,
    });
  });
});
