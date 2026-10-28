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

  it('aplica el fondo crema al isotipo cuando se usa sobre fondo oscuro', () => {
    const { container } = render(<Logo fondo="oscuro" />);
    const imagen = container.querySelector('img');

    expect(container.firstChild).toHaveAttribute('data-fondo', 'oscuro');
    expect(imagen.parentElement).toHaveClass('bg-fondo');
  });
});
