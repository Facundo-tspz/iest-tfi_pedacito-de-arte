import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import CarritoProvider from '../context/CarritoContext';
import { AppRoutes } from './AppRouter';

function renderizarRuta(ruta) {
  return render(
    <HelmetProvider>
      <CarritoProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <AppRoutes />
        </MemoryRouter>
      </CarritoProvider>
    </HelmetProvider>,
  );
}

describe('AppRoutes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

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

  it('muestra el carrito en /carrito', () => {
    renderizarRuta('/carrito');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Carrito de encargos' }),
    ).toBeInTheDocument();
  });

  it('agrega desde el detalle y actualiza el contador', async () => {
    const usuario = userEvent.setup();
    renderizarRuta('/catalogo/agenda-botanica');

    await screen.findByRole('heading', { level: 1, name: 'Agenda Botánica' });
    await usuario.click(screen.getByRole('button', { name: 'Agregar al encargo' }));

    expect(screen.getByRole('link', { name: 'Carrito: 1 encargo' })).toBeInTheDocument();
  });

  it('muestra la página 404 en una ruta desconocida', () => {
    renderizarRuta('/ruta-inexistente');

    expect(screen.getByRole('heading', { name: 'No encontramos esta página' })).toBeInTheDocument();
  });
});
