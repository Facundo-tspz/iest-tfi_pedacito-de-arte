import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { obtenerDestacados, obtenerNovedades } from '../../services/catalogo';
import Novedades from './Novedades';

vi.mock('../../services/catalogo', () => ({
  obtenerDestacados: vi.fn(),
  obtenerNovedades: vi.fn(),
}));

const HERO = [
  { id: 'hero-1', slug: 'agenda-botanica' },
  { id: 'hero-2', slug: 'agenda-docente-primavera' },
  { id: 'hero-3', slug: 'anotador-de-cocina' },
  { id: 'hero-4', slug: 'revista-mandalas' },
];

const NOVEDADES = [
  {
    id: 'prod-1',
    nombre: 'Agenda Minimal',
    slug: 'agenda-minimal',
    categoria: { nombre: 'Agendas' },
    descripcion: 'Agenda de diseño simple con interior rayado.',
    precio_base: 15000,
    imagenes: [{ url: null, alt: 'Agenda Minimal con tapa de cartón' }],
  },
  {
    id: 'prod-2',
    nombre: 'Agenda Viajera',
    slug: 'agenda-viajera',
    categoria: { nombre: 'Agendas' },
    descripcion: 'Agenda liviana para llevar a todas partes.',
    precio_base: null,
    imagenes: [{ url: null, alt: 'Agenda Viajera abierta' }],
  },
  {
    id: 'prod-3',
    nombre: 'Agenda Docente Bosque',
    slug: 'agenda-docente-bosque',
    categoria: { nombre: 'Agendas Docentes' },
    descripcion: 'Planificador docente con diseño de bosque.',
    precio_base: null,
    imagenes: [{ url: null, alt: 'Agenda Docente Bosque' }],
  },
  {
    id: 'prod-4',
    nombre: 'Agenda Docente Cielo',
    slug: 'agenda-docente-cielo',
    categoria: { nombre: 'Agendas Docentes' },
    descripcion: 'Planificador docente con diseño celeste.',
    precio_base: null,
    imagenes: [{ url: null, alt: 'Agenda Docente Cielo' }],
  },
];

function renderizarNovedades() {
  return render(
    <MemoryRouter>
      <Novedades />
    </MemoryRouter>,
  );
}

describe('Novedades', () => {
  beforeEach(() => {
    obtenerDestacados.mockResolvedValue(HERO);
    obtenerNovedades.mockResolvedValue(NOVEDADES);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('muestra 4 novedades excluyendo los productos del hero', async () => {
    renderizarNovedades();

    expect(
      await screen.findByRole('heading', { level: 3, name: 'Agenda Minimal' }),
    ).toBeInTheDocument();

    expect(obtenerDestacados).toHaveBeenCalledWith(4);
    expect(obtenerNovedades).toHaveBeenCalledWith(4, [
      'agenda-botanica',
      'agenda-docente-primavera',
      'anotador-de-cocina',
      'revista-mandalas',
    ]);
    expect(screen.getByRole('region', { name: 'Novedades' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Agenda Minimal' }).closest('a'),
    ).toHaveAttribute('href', '/catalogo/agenda-minimal');
    expect(screen.getByText(/15\.000/)).toBeInTheDocument();
    expect(screen.getAllByText('Precio a confirmar')).toHaveLength(3);
    expect(
      screen.getByRole('img', { name: 'Agenda Minimal con tapa de cartón' }),
    ).toBeInTheDocument();
  });

  it('muestra un aviso si falla la carga', async () => {
    obtenerDestacados.mockRejectedValue(new Error('fallo'));
    renderizarNovedades();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No pudimos cargar las novedades en este momento.',
    );
  });
});
