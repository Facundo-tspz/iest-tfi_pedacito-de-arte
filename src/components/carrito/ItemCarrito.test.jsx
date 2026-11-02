import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ItemCarrito from './ItemCarrito';

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

function renderizarItem(overrides = {}) {
  const onCambiarCantidad = vi.fn();
  const onQuitar = vi.fn();

  render(
    <ItemCarrito
      item={{ ...ITEM, ...overrides }}
      onCambiarCantidad={onCambiarCantidad}
      onQuitar={onQuitar}
    />,
  );

  return { onCambiarCantidad, onQuitar };
}

describe('ItemCarrito', () => {
  it('muestra producto, opciones, notas, cantidad y subtotal', () => {
    renderizarItem();

    expect(screen.getByText('Agendas')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Agenda Botánica' })).toBeInTheDocument();
    expect(screen.getByText(/Interior: Rayado/)).toBeInTheDocument();
    expect(screen.getByText(/Para regalo/)).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad: 2')).toBeInTheDocument();
    expect(screen.getByText(/20\.000/)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Agenda Botánica con tapa floral' }),
    ).toBeInTheDocument();
  });

  it('suma, resta y quita el ítem', async () => {
    const usuario = userEvent.setup();
    const { onCambiarCantidad, onQuitar } = renderizarItem();

    await usuario.click(
      screen.getByRole('button', { name: 'Sumar una unidad de Agenda Botánica' }),
    );
    expect(onCambiarCantidad).toHaveBeenCalledWith(ITEM.clave, 3);

    await usuario.click(
      screen.getByRole('button', { name: 'Restar una unidad de Agenda Botánica' }),
    );
    expect(onCambiarCantidad).toHaveBeenCalledWith(ITEM.clave, 1);

    await usuario.click(screen.getByRole('button', { name: 'Quitar' }));
    expect(onQuitar).toHaveBeenCalledWith(ITEM.clave);
  });

  it('deshabilita restar cuando la cantidad es uno', () => {
    renderizarItem({ cantidad: 1 });

    expect(
      screen.getByRole('button', { name: 'Restar una unidad de Agenda Botánica' }),
    ).toBeDisabled();
  });
});
