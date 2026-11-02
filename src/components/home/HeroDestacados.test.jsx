import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useMovimientoReducido from '../../hooks/useMovimientoReducido';
import { obtenerDestacados } from '../../services/catalogo';
import HeroDestacados from './HeroDestacados';

vi.mock('../../services/catalogo', () => ({
  obtenerDestacados: vi.fn(),
}));

vi.mock('../../hooks/useMovimientoReducido', () => ({
  default: vi.fn(() => false),
}));

const PRODUCTOS = [
  {
    id: 'prod-1',
    nombre: 'Agenda Botánica',
    slug: 'agenda-botanica',
    categoria: { nombre: 'Agendas' },
    descripcion: 'Agenda artesanal con tapa ilustrada.',
    precio_base: 15000,
    imagenes: [{ url: null, alt: 'Agenda Botánica con tapa floral' }],
  },
  {
    id: 'prod-2',
    nombre: 'Agenda Docente',
    slug: 'agenda-docente',
    categoria: { nombre: 'Agendas Docentes' },
    descripcion: 'Agenda para planificar el ciclo lectivo.',
    precio_base: 18000,
    imagenes: [{ url: null, alt: 'Agenda Docente abierta' }],
  },
  {
    id: 'prod-3',
    nombre: 'Anotador de Cocina',
    slug: 'anotador-de-cocina',
    categoria: { nombre: 'Anotadores' },
    descripcion: 'Anotador para recetas y listas de compras.',
    precio_base: 9000,
    imagenes: [{ url: null, alt: 'Anotador de Cocina abierto' }],
  },
  {
    id: 'prod-4',
    nombre: 'Revista Mandalas',
    slug: 'revista-mandalas',
    categoria: { nombre: 'Revistas para Colorear' },
    descripcion: 'Revista con ilustraciones para colorear.',
    precio_base: 7500,
    imagenes: [{ url: null, alt: 'Revista Mandalas con diseños circulares' }],
  },
];

function renderizarHero() {
  return render(
    <MemoryRouter>
      <HeroDestacados />
    </MemoryRouter>,
  );
}

describe('HeroDestacados', () => {
  beforeEach(() => {
    useMovimientoReducido.mockReturnValue(false);
    obtenerDestacados.mockResolvedValue(PRODUCTOS);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('carga hasta 4 destacados y muestra la frase de marca', async () => {
    renderizarHero();

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();

    expect(obtenerDestacados).toHaveBeenCalledWith(4);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Papelería creativa hecha con amor',
      }),
    ).toBeInTheDocument();

    const slides = document.querySelectorAll('article');

    expect(slides).toHaveLength(4);
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();
  });

  it('navega con las flechas y anuncia solo los cambios manuales', async () => {
    const usuario = userEvent.setup();
    renderizarHero();

    await screen.findByRole('heading', { level: 2, name: 'Agenda Botánica' });

    await usuario.click(screen.getByRole('button', { name: 'Producto siguiente' }));

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Agenda Docente' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Producto 2 de 4: Agenda Docente');

    await usuario.click(screen.getByRole('button', { name: 'Producto anterior' }));

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Producto 1 de 4: Agenda Botánica');
  });

  it('permite pausar y reanudar el carrusel', async () => {
    const usuario = userEvent.setup();
    renderizarHero();

    await screen.findByRole('heading', { level: 2, name: 'Agenda Botánica' });

    const relleno = screen.getByTestId('progreso-relleno');

    expect(relleno).toHaveStyle({ animationPlayState: 'running' });

    await usuario.click(screen.getByRole('button', { name: 'Pausar carrusel' }));

    expect(screen.getByRole('button', { name: 'Reproducir carrusel' })).toBeInTheDocument();
    expect(relleno).toHaveStyle({ animationPlayState: 'paused' });

    await usuario.click(screen.getByRole('button', { name: 'Reproducir carrusel' }));

    expect(screen.getByRole('button', { name: 'Pausar carrusel' })).toBeInTheDocument();
  });

  it('avanza automáticamente cada 8 segundos', async () => {
    vi.useFakeTimers();
    renderizarHero();

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
  });

  it('oculta la barra y el control de pausa con movimiento reducido', async () => {
    useMovimientoReducido.mockReturnValue(true);
    renderizarHero();

    await screen.findByRole('heading', { level: 2, name: 'Agenda Botánica' });

    expect(screen.queryByTestId('progreso-hero')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pausar carrusel' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Producto siguiente' })).toBeInTheDocument();
  });

  it('muestra un fallback con enlace al catálogo si falla la carga', async () => {
    obtenerDestacados.mockRejectedValue(new Error('fallo'));
    renderizarHero();

    expect(await screen.findByText(/No pudimos cargar los destacados/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toHaveAttribute('href', '/catalogo');
  });
});
