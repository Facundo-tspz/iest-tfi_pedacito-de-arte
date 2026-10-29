import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Navbar from './Navbar';

function definirScrollY(valor) {
  Object.defineProperty(window, 'scrollY', {
    value: valor,
    writable: true,
    configurable: true,
  });
}

function desplazarA(valor) {
  act(() => {
    definirScrollY(valor);
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('Navbar', () => {
  beforeEach(() => {
    definirScrollY(0);
  });

  it('muestra el logo de la marca', () => {
    render(<Navbar />);

    expect(screen.getByText('Pedacito')).toBeInTheDocument();
    expect(screen.getByText('de')).toBeInTheDocument();
    expect(screen.getByText('ARTE')).toBeInTheDocument();
  });

  it('usa el azul medianoche, el degradado sutil y el borde dorado de la marca', () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector('header');

    expect(navbar).toHaveClass('bg-gradient-to-b');
    expect(navbar).toHaveClass('from-principal');
    expect(navbar).toHaveClass('to-principal/85');
    expect(navbar).toHaveClass('border-complementario-principal');
  });

  it('permanece visible y pegado arriba al scrollear', () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector('header');

    desplazarA(300);

    expect(navbar).toHaveClass('sticky');
    expect(navbar).not.toHaveClass('-translate-y-full');
  });

  it('intensifica la sombra al scrollear', () => {
    const { container } = render(<Navbar />);
    const navbar = container.querySelector('header');

    expect(navbar).toHaveClass('shadow-lg');

    desplazarA(120);

    expect(navbar).toHaveClass('shadow-xl');
    expect(navbar).toHaveClass('backdrop-blur-xl');
  });
});
