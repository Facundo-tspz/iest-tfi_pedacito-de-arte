import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Seccion from './Seccion';

describe('Seccion', () => {
  it('renderiza una región con título semántico y contenido', () => {
    render(
      <Seccion titulo="Categorías">
        <p>Explorá nuestras líneas de productos.</p>
      </Seccion>,
    );

    const region = screen.getByRole('region', { name: 'Categorías' });

    expect(region.tagName).toBe('SECTION');
    expect(screen.getByRole('heading', { level: 2, name: 'Categorías' })).toBeInTheDocument();
    expect(screen.getByText('Explorá nuestras líneas de productos.')).toBeInTheDocument();
  });

  it('usa el id recibido para el ancla y el título', () => {
    render(<Seccion id="categorias" titulo="Categorías" />);

    const region = screen.getByRole('region', { name: 'Categorías' });

    expect(region).toHaveAttribute('id', 'categorias');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'categorias-titulo');
  });

  it('permite cambiar el nivel del título y el ancho', () => {
    render(<Seccion titulo="Detalle del producto" nivelTitulo={3} ancho="angosto" />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Detalle del producto',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Detalle del producto' })).toHaveClass('max-w-3xl');
  });

  it('muestra la descripción y aplica la clase personalizada', () => {
    render(
      <Seccion
        titulo="Novedades"
        descripcion="Los últimos trabajos del taller."
        className="seccion-personalizada"
      />,
    );

    const region = screen.getByRole('region', { name: 'Novedades' });

    expect(screen.getByText('Los últimos trabajos del taller.')).toBeInTheDocument();
    expect(region).toHaveClass('seccion-personalizada');
    expect(region).toHaveClass('max-w-6xl');
  });

  it('no crea un encabezado si no recibe título', () => {
    const { container } = render(<Seccion descripcion="Contenido sin título principal." />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Contenido sin título principal.')).toBeInTheDocument();
    expect(container.querySelector('section')).not.toHaveAttribute('aria-labelledby');
  });
});
