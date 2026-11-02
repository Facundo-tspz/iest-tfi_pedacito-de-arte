import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FiltrosCategoria from './FiltrosCategoria';

const CATEGORIAS = [
  { id: 'cat-agendas', nombre: 'Agendas', slug: 'agendas' },
  { id: 'cat-docentes', nombre: 'Agendas Docentes', slug: 'agendas-docentes' },
  { id: 'cat-anotadores', nombre: 'Anotadores', slug: 'anotadores' },
  {
    id: 'cat-revistas',
    nombre: 'Revistas para Colorear',
    slug: 'revistas-para-colorear',
  },
];

function MostrarRuta() {
  const ubicacion = useLocation();

  return <span data-testid="ruta">{`${ubicacion.pathname}${ubicacion.search}`}</span>;
}

function renderizarFiltros(ruta = '/catalogo') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <FiltrosCategoria categorias={CATEGORIAS} />
      <MostrarRuta />
    </MemoryRouter>,
  );
}

describe('FiltrosCategoria', () => {
  it('marca la categoría activa con aria-pressed', () => {
    renderizarFiltros('/catalogo?categoria=agendas');

    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Agendas' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('group', { name: 'Filtros de categoría' })).toBeInTheDocument();
  });

  it('actualiza la URL y conserva la búsqueda al elegir una categoría', async () => {
    const usuario = userEvent.setup();
    renderizarFiltros('/catalogo?buscar=agenda');

    await usuario.click(screen.getByRole('button', { name: 'Agendas' }));

    expect(screen.getByTestId('ruta')).toHaveTextContent(
      '/catalogo?buscar=agenda&categoria=agendas',
    );
    expect(screen.getByRole('button', { name: 'Agendas' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('vuelve a todas y quita la categoría de la URL', async () => {
    const usuario = userEvent.setup();
    renderizarFiltros('/catalogo?buscar=agenda&categoria=agendas');

    await usuario.click(screen.getByRole('button', { name: 'Todas' }));

    expect(screen.getByTestId('ruta')).toHaveTextContent('/catalogo?buscar=agenda');
    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('muestra Todas como activa si la categoría de la URL no es válida', () => {
    renderizarFiltros('/catalogo?categoria=no-existe');

    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Agendas' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
