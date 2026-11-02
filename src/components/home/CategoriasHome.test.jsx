import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { obtenerCategorias } from '../../services/catalogo';
import CategoriasHome from './CategoriasHome';

vi.mock('../../services/catalogo', () => ({
  obtenerCategorias: vi.fn(),
}));

const CATEGORIAS = [
  {
    id: 'cat-agendas',
    nombre: 'Agendas',
    slug: 'agendas',
    descripcion: 'Agendas artesanales para organizar el día a día.',
  },
  {
    id: 'cat-docentes',
    nombre: 'Agendas Docentes',
    slug: 'agendas-docentes',
    descripcion: 'Agendas para la planificación docente.',
  },
  {
    id: 'cat-anotadores',
    nombre: 'Anotadores',
    slug: 'anotadores',
    descripcion: 'Anotadores para notas, recetas y listas.',
  },
  {
    id: 'cat-revistas',
    nombre: 'Revistas para Colorear',
    slug: 'revistas-para-colorear',
    descripcion: 'Revistas con ilustraciones para colorear.',
  },
];

function renderizarCategorias() {
  return render(
    <MemoryRouter>
      <CategoriasHome />
    </MemoryRouter>,
  );
}

describe('CategoriasHome', () => {
  beforeEach(() => {
    obtenerCategorias.mockResolvedValue(CATEGORIAS);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra las 4 categorías y sus enlaces filtrados', async () => {
    renderizarCategorias();

    expect(await screen.findByRole('heading', { level: 3, name: 'Agendas' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Categorías' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);

    const enlaces = [
      ['Agendas', '/catalogo?categoria=agendas'],
      ['Agendas Docentes', '/catalogo?categoria=agendas-docentes'],
      ['Anotadores', '/catalogo?categoria=anotadores'],
      ['Revistas para Colorear', '/catalogo?categoria=revistas-para-colorear'],
    ];

    enlaces.forEach(([nombre, href]) => {
      const encabezado = screen.getByRole('heading', { level: 3, name: nombre });

      expect(encabezado.closest('a')).toHaveAttribute('href', href);
    });

    expect(
      screen.getByText('Agendas artesanales para organizar el día a día.'),
    ).toBeInTheDocument();
  });

  it('muestra un aviso si falla la carga', async () => {
    obtenerCategorias.mockRejectedValue(new Error('fallo'));
    renderizarCategorias();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No pudimos cargar las categorías en este momento.',
    );
  });
});
