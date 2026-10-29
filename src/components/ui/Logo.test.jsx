import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Logo';

describe('Logo', () => {
  it('muestra el nombre completo de la marca', () => {
    render(<Logo />);

    expect(screen.getByText('Pedacito')).toBeInTheDocument();
    expect(screen.getByText('de')).toBeInTheDocument();
    expect(screen.getByText('ARTE')).toBeInTheDocument();
  });

  it('deja el isotipo como decorativo para lectores de pantalla', () => {
    const { container } = render(<Logo />);
    const imagen = container.querySelector('img');

    expect(imagen).toHaveAttribute('alt', '');
    expect(imagen).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('aplica el fondo crema y la forma circular al isotipo sobre fondo oscuro', () => {
    const { container } = render(<Logo fondo="oscuro" />);
    const imagen = container.querySelector('img');

    expect(container.firstChild).toHaveAttribute('data-fondo', 'oscuro');
    expect(imagen.parentElement).toHaveClass('bg-fondo');
    expect(imagen.parentElement).toHaveClass('rounded-full');
  });

  it('usa texto blanco sobre fondo oscuro', () => {
    render(<Logo fondo="oscuro" />);

    expect(screen.getByTestId('logo-pedacito')).toHaveClass('text-blanco');
    expect(screen.getByText('de')).toHaveClass('text-blanco');
    expect(screen.getByText('ARTE')).toHaveClass('text-blanco');
  });

  it('hace más grande a Pedacito para alinear sus extremos con de ARTE', () => {
    render(<Logo />);

    expect(screen.getByTestId('logo-pedacito')).toHaveClass('text-2xl');
    expect(screen.getByTestId('logo-pedacito')).toHaveClass('sm:text-3xl');
    expect(screen.getByText('de')).toHaveClass('text-xl');
    expect(screen.getByText('ARTE')).toHaveClass('text-xl');
  });

  it('muestra ARTE con Poppins ExtraBold', () => {
    render(<Logo />);

    expect(screen.getByText('ARTE')).toHaveClass('font-cuerpo');
    expect(screen.getByText('ARTE')).toHaveClass('font-extrabold');
  });
});
