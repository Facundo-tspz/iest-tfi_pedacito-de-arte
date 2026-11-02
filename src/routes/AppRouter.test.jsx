import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './AppRouter';

function renderizarRuta(ruta) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('AppRoutes', () => {
  it('muestra el home en la ruta raíz', () => {
    renderizarRuta('/');

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Papelería creativa hecha con amor',
      }),
    ).toBeInTheDocument();
  });

  it('muestra el catálogo en /catalogo', () => {
    renderizarRuta('/catalogo');

    expect(screen.getByRole('heading', { level: 1, name: 'Catálogo' })).toBeInTheDocument();
  });

  it('muestra el detalle en /catalogo/:slug', async () => {
    renderizarRuta('/catalogo/agenda-botanica');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
  });

  it('muestra la página 404 en una ruta desconocida', () => {
    renderizarRuta('/ruta-inexistente');

    expect(screen.getByRole('heading', { name: 'No encontramos esta página' })).toBeInTheDocument();
  });
});
