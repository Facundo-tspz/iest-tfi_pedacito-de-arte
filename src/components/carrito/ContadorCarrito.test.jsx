import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ContadorCarrito from './ContadorCarrito';

function renderizarContador(props = {}) {
  return render(
    <MemoryRouter>
      <ContadorCarrito {...props} />
    </MemoryRouter>,
  );
}

describe('ContadorCarrito', () => {
  it('muestra la cantidad y el enlace al carrito', () => {
    renderizarContador({ cantidad: 3 });

    const enlace = screen.getByRole('link', {
      name: 'Carrito: 3 encargos',
    });

    expect(enlace).toHaveAttribute('href', '/carrito');
    expect(enlace).toHaveTextContent('Carrito');
    expect(enlace).toHaveTextContent('3');
  });

  it('usa singular con un solo encargo', () => {
    renderizarContador({ cantidad: 1 });

    expect(screen.getByRole('link', { name: 'Carrito: 1 encargo' })).toBeInTheDocument();
  });

  it('ejecuta el cierre al navegar desde el menú móvil', async () => {
    const usuario = userEvent.setup();
    const onClick = vi.fn();

    renderizarContador({ cantidad: 0, onClick });

    await usuario.click(screen.getByRole('link', { name: 'Carrito: 0 encargos' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
