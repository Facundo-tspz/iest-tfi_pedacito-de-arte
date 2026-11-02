import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FOTOS_PROCESO } from '../../data/mockCatalogo';
import useMovimientoReducido from '../../hooks/useMovimientoReducido';
import HeroProceso from './HeroProceso';

vi.mock('../../hooks/useMovimientoReducido', () => ({
  default: vi.fn(() => false),
}));

const FOTOS = [...FOTOS_PROCESO].sort((a, b) => a.orden - b.orden);

function renderizarHero() {
  return render(<HeroProceso />);
}

function obtenerSlides() {
  return document.querySelectorAll('[aria-roledescription="slide"]');
}

describe('HeroProceso', () => {
  beforeEach(() => {
    useMovimientoReducido.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('muestra 4 fotos de proceso, la primera activa y sin h1', () => {
    renderizarHero();

    expect(screen.getByRole('region', { name: 'Proceso artesanal' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Proceso artesanal' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();

    expect(screen.getByRole('region', { name: 'Proceso artesanal' })).toHaveClass(
      'h-[55vh]',
      'sm:h-[45vh]',
    );

    const slides = obtenerSlides();

    expect(slides).toHaveLength(4);
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: FOTOS[0].alt })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: FOTOS[1].alt })).not.toBeInTheDocument();
  });

  it('avanza automáticamente cada 4 segundos hacia la izquierda', () => {
    vi.useFakeTimers();
    renderizarHero();

    const slides = obtenerSlides();

    expect(slides[0]).toHaveClass('translate-x-0');
    expect(slides[1]).toHaveClass('translate-x-full');

    act(() => {
      vi.advanceTimersByTime(3999);
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
    expect(slides[0]).toHaveClass('-translate-x-full');
    expect(slides[1]).toHaveClass('translate-x-0');
  });

  it('permite pausar y reanudar con el botón visible', () => {
    vi.useFakeTimers();
    renderizarHero();

    fireEvent.click(screen.getByRole('button', { name: 'Pausar carrusel de proceso' }));

    expect(
      screen.getByRole('button', { name: 'Reproducir carrusel de proceso' }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reproducir carrusel de proceso' }));

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
  });

  it('pausa al hacer clic y reanuda a los 5 segundos', () => {
    vi.useFakeTimers();
    renderizarHero();

    fireEvent.click(screen.getByRole('region', { name: 'Proceso artesanal' }));

    act(() => {
      vi.advanceTimersByTime(4999);
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    act(() => {
      vi.advanceTimersByTime(3999);
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
  });

  it('no pausa al pasar el mouse', () => {
    vi.useFakeTimers();
    renderizarHero();

    fireEvent.mouseEnter(screen.getByRole('region', { name: 'Proceso artesanal' }));

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByRole('group', { name: '2 de 4' })).toBeInTheDocument();
  });

  it('se detiene, fija la primera imagen y oculta el botón con movimiento reducido', () => {
    useMovimientoReducido.mockReturnValue(true);
    vi.useFakeTimers();
    renderizarHero();

    act(() => {
      vi.advanceTimersByTime(8000);
    });

    expect(screen.getByRole('group', { name: '1 de 4' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /carrusel de proceso/i })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: FOTOS[0].alt })).toBeInTheDocument();
  });
});
