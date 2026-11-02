import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CatalogoPage from './CatalogoPage';

function renderizarCatalogo(ruta = '/catalogo') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <CatalogoPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('CatalogoPage', () => {
  it('muestra el catálogo completo con su título y metadatos', async () => {
    renderizarCatalogo();

    expect(screen.getByRole('heading', { level: 1, name: 'Catálogo' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      await screen.findByRole('heading', { level: 3, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(10);
    expect(await screen.findByText('10 resultados')).toBeInTheDocument();

    await waitFor(() => {
      expect(document.title).toBe('Catálogo de Productos | Pedacito de Arte');
    });
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Explorá agendas, agendas docentes, anotadores y revistas para colorear. Personalizá tu encargo y consultá por WhatsApp.',
    );
  });

  it('aplica la categoría de la URL', async () => {
    renderizarCatalogo('/catalogo?categoria=anotadores');

    expect(
      await screen.findByRole('heading', { level: 3, name: 'Anotador de Cocina' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('2 resultados')).toBeInTheDocument();
  });

  it('aplica la búsqueda de la URL y conserva el texto en el buscador', async () => {
    renderizarCatalogo('/catalogo?buscar=botanica');

    expect(
      await screen.findByRole('heading', { level: 3, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('1 resultado')).toBeInTheDocument();
    expect(screen.getByLabelText('Buscar en el catálogo')).toHaveValue('botanica');
  });

  it('avisa cuando la categoría de la URL no existe y muestra todos los productos', async () => {
    renderizarCatalogo('/catalogo?categoria=no-existe');

    expect(
      await screen.findByText(
        'La categoría seleccionada no está disponible. Mostrando todos los productos.',
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 3, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(10);
    expect(screen.getByText('10 resultados')).toBeInTheDocument();
  });

  it('muestra el estado vacío con acción cuando no hay resultados', async () => {
    renderizarCatalogo('/catalogo?buscar=zzz');

    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: 'No encontramos productos',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todo el catálogo' })).toHaveAttribute(
      'href',
      '/catalogo',
    );
    expect(screen.getByText('0 resultados')).toBeInTheDocument();
  });
});
