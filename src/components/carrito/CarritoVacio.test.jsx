import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CarritoVacio from './CarritoVacio';

describe('CarritoVacio', () => {
  it('muestra el mensaje y el enlace al catálogo', () => {
    render(
      <MemoryRouter>
        <CarritoVacio />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Tu carrito está vacío' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Elegí una pieza del catálogo y agregala para armar tu encargo.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toHaveAttribute('href', '/catalogo');
  });
});
