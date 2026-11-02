import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import EstadoVacio from './EstadoVacio';

function renderizarEstado(tipo) {
  return render(
    <MemoryRouter>
      <EstadoVacio tipo={tipo} />
    </MemoryRouter>,
  );
}

describe('EstadoVacio', () => {
  it('muestra la variante sin resultados con acción para ver todo', () => {
    renderizarEstado('sin-resultados');

    expect(
      screen.getByRole('heading', { level: 2, name: 'No encontramos productos' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Probá con otra búsqueda o elegí una categoría diferente.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todo el catálogo' })).toHaveAttribute(
      'href',
      '/catalogo',
    );
  });

  it('muestra la variante sin productos publicados y sin acción', () => {
    renderizarEstado('sin-productos');

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Todavía no hay productos publicados',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Volvé a visitarnos pronto para conocer las novedades.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Ver todo el catálogo' })).not.toBeInTheDocument();
  });
});
