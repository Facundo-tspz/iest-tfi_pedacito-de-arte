import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useCarrito from '../hooks/useCarrito';
import CarritoPage from './CarritoPage';

vi.mock('../hooks/useCarrito', () => ({
  default: vi.fn(),
}));

const ITEM = {
  clave: 'agenda-botanica::op-1::regalo',
  producto_id: 'prod-1',
  slug: 'agenda-botanica',
  nombre: 'Agenda Botánica',
  codigo: 'AG-001',
  categoria: { nombre: 'Agendas', slug: 'agendas' },
  precio_base: 10000,
  cantidad: 2,
  imagen: { url: null, alt: 'Agenda Botánica con tapa floral' },
  opciones: [{ id: 'op-1', tipo_opcion: 'Interior', valor: 'Rayado', precio_extra: 0 }],
  notas: 'Para regalo',
};

function renderizarCarrito() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <CarritoPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('CarritoPage', () => {
  let cambiarCantidad;
  let quitar;

  beforeEach(() => {
    cambiarCantidad = vi.fn();
    quitar = vi.fn();
    useCarrito.mockReturnValue({
      items: [ITEM],
      aviso: null,
      limpiarAviso: vi.fn(),
      cambiarCantidad,
      quitar,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra los ítems y permite cambiar cantidad o quitar', async () => {
    const usuario = userEvent.setup();
    renderizarCarrito();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Carrito de encargos' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Agenda Botánica' })).toBeInTheDocument();

    await usuario.click(
      screen.getByRole('button', { name: 'Sumar una unidad de Agenda Botánica' }),
    );
    expect(cambiarCantidad).toHaveBeenCalledWith(ITEM.clave, 3);

    await usuario.click(screen.getByRole('button', { name: 'Quitar' }));
    expect(quitar).toHaveBeenCalledWith(ITEM.clave);
  });

  it('muestra el estado vacío con enlace al catálogo', () => {
    useCarrito.mockReturnValue({
      items: [],
      aviso: null,
      limpiarAviso: vi.fn(),
      cambiarCantidad: vi.fn(),
      quitar: vi.fn(),
    });

    renderizarCarrito();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Tu carrito está vacío' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toHaveAttribute('href', '/catalogo');
  });
});
