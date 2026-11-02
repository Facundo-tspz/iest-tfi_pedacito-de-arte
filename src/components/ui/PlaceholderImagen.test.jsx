import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PlaceholderImagen from './PlaceholderImagen';

describe('PlaceholderImagen', () => {
  it('expone el alt como nombre accesible', () => {
    render(<PlaceholderImagen alt="Agenda floral" />);

    expect(screen.getByRole('img', { name: 'Agenda floral' })).toBeInTheDocument();
  });

  it('oculta el placeholder cuando no recibe alt', () => {
    const { container } = render(<PlaceholderImagen />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('aplica tokens de marca, aspecto y clase personalizada', () => {
    render(
      <PlaceholderImagen alt="Agenda floral" aspecto="tarjeta" className="sombra-personalizada" />,
    );

    const placeholder = screen.getByRole('img', { name: 'Agenda floral' });

    expect(placeholder).toHaveClass('bg-gradient-to-br');
    expect(placeholder).toHaveClass('from-complementario-principal/25');
    expect(placeholder).toHaveClass('to-complementario-secundario/15');
    expect(placeholder).toHaveClass('border-contraste/15');
    expect(placeholder).toHaveClass('aspect-[4/3]');
    expect(placeholder).toHaveClass('sombra-personalizada');
  });

  it('muestra el texto por defecto y permite reemplazarlo', () => {
    const { rerender } = render(<PlaceholderImagen alt="Agenda floral" />);

    expect(screen.getByText('Imagen próximamente')).toBeInTheDocument();

    rerender(<PlaceholderImagen alt="Agenda floral" texto="Foto en preparación" />);

    expect(screen.getByText('Foto en preparación')).toBeInTheDocument();
  });
});
