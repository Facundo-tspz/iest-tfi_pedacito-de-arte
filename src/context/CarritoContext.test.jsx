import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CarritoProvider from './CarritoContext';
import useCarrito from '../hooks/useCarrito';
import { obtenerProductoPorSlug } from '../services/catalogo';
import { CLAVE_ALMACENAMIENTO, crearItemCarrito, guardarCarrito } from '../utils/carrito';

vi.mock('../services/catalogo', () => ({
  obtenerProductoPorSlug: vi.fn(),
}));

const PRODUCTO = {
  id: 'prod-agenda-botanica',
  slug: 'agenda-botanica',
  nombre: 'Agenda Botánica',
  codigo: 'AG-001',
  categoria: { nombre: 'Agendas', slug: 'agendas' },
  precio_base: 10000,
  opciones: [
    {
      id: 'op-interior-rayado',
      tipo_opcion: 'Interior',
      valor: 'Rayado',
      precio_extra: 0,
      activo: true,
    },
    {
      id: 'op-tamano-a4',
      tipo_opcion: 'Tamaño',
      valor: 'A4',
      precio_extra: 500,
      activo: true,
    },
  ],
};

const OPCIONES = PRODUCTO.opciones;

function wrapper({ children }) {
  return <CarritoProvider>{children}</CarritoProvider>;
}

function renderizarCarrito() {
  return renderHook(() => useCarrito(), { wrapper });
}

describe('CarritoContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
    obtenerProductoPorSlug.mockResolvedValue(PRODUCTO);
  });

  it('agrega, fusiona y calcula cantidades y total', () => {
    const { result } = renderizarCarrito();

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES, 'Regalo');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.cantidadTotal).toBe(1);
    expect(result.current.totalEstimado).toBe(10500);

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES, ' Regalo ');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(2);
    expect(result.current.cantidadTotal).toBe(2);
    expect(result.current.totalEstimado).toBe(21000);
  });

  it('cambia cantidades, quita y vacía el carrito', () => {
    const { result } = renderizarCarrito();

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES);
    });

    const clave = result.current.items[0].clave;

    act(() => {
      result.current.cambiarCantidad(clave, 4);
    });
    expect(result.current.items[0].cantidad).toBe(4);

    act(() => {
      result.current.cambiarCantidad(clave, 0);
    });
    expect(result.current.items).toHaveLength(0);

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES);
    });
    act(() => {
      result.current.quitar(result.current.items[0].clave);
    });
    expect(result.current.items).toHaveLength(0);

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES);
    });
    act(() => {
      result.current.vaciar();
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('persiste el carrito en localStorage', async () => {
    const { result } = renderizarCarrito();

    act(() => {
      result.current.agregar(PRODUCTO, OPCIONES, 'Regalo');
    });

    await waitFor(() => {
      const guardado = JSON.parse(window.localStorage.getItem(CLAVE_ALMACENAMIENTO));
      expect(guardado.items).toHaveLength(1);
      expect(guardado.items[0].notas).toBe('Regalo');
    });
  });

  it('revalida precios y opciones al recuperar el carrito', async () => {
    const item = crearItemCarrito({
      producto: PRODUCTO,
      opciones: OPCIONES,
      cantidad: 2,
    });
    guardarCarrito([item]);

    obtenerProductoPorSlug.mockResolvedValue({
      ...PRODUCTO,
      precio_base: 12000,
      opciones: [OPCIONES[0]],
    });

    const { result } = renderizarCarrito();

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].precio_base).toBe(12000);
      expect(result.current.items[0].opciones).toHaveLength(1);
    });

    expect(result.current.aviso).toContain('ya no están disponibles');
  });

  it('quita un producto que ya no existe y avisa', async () => {
    const item = crearItemCarrito({ producto: PRODUCTO });
    guardarCarrito([item]);
    obtenerProductoPorSlug.mockResolvedValue(null);

    const { result } = renderizarCarrito();

    await waitFor(() => {
      expect(result.current.items).toHaveLength(0);
    });

    expect(result.current.aviso).toContain('ya no están disponibles');

    act(() => {
      result.current.limpiarAviso();
    });
    expect(result.current.aviso).toBeNull();
  });
});
