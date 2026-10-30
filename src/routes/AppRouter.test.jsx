import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './AppRouter';

function renderizarRuta(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('AppRoutes', () => {
  it('muestra el home en la ruta raíz', () => {
    renderizarRuta('/');

    expect(screen.getByText(/Base técnica en construcción/)).toBeInTheDocument();
  });

  it('muestra la página 404 en una ruta desconocida', () => {
    renderizarRuta('/ruta-inexistente');

    expect(
      screen.getByRole('heading', { name: 'No encontramos esta página' }),
    ).toBeInTheDocument();
  });
});
