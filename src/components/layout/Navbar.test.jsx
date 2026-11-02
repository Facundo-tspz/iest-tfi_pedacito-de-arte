import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import CarritoProvider from '../../context/CarritoContext';
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

function NavegadorPrueba() {
  const navegar = useNavigate();

  return (
    <button type="button" onClick={() => navegar('/catalogo')}>
      Cambiar ruta
    </button>
  );
}

function renderizarNavbar({ conNavegador = false } = {}) {
  return render(
    <CarritoProvider>
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        {conNavegador ? <NavegadorPrueba /> : null}
      </MemoryRouter>
    </CarritoProvider>,
  );
}

describe('Navbar', () => {
  beforeEach(() => {
    window.localStorage.clear();
    definirScrollY(0);
  });

  it('muestra el logo de la marca', () => {
    renderizarNavbar();

    expect(screen.getByText('Pedacito')).toBeInTheDocument();
    expect(screen.getByText('de')).toBeInTheDocument();
    expect(screen.getByText('ARTE')).toBeInTheDocument();
  });

  it('muestra los enlaces principales de navegación', () => {
    renderizarNavbar();

    const navegacion = screen.getByRole('navigation', {
      name: 'Navegación principal',
    });

    expect(within(navegacion).getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/');
    expect(within(navegacion).getByRole('link', { name: 'Catálogo' })).toHaveAttribute(
      'href',
      '/catalogo',
    );
    expect(within(navegacion).getByRole('link', { name: 'Nosotros' })).toHaveAttribute(
      'href',
      '/#nosotros',
    );
    expect(within(navegacion).getByRole('link', { name: 'Servicios' })).toHaveAttribute(
      'href',
      '/#servicios',
    );
    expect(within(navegacion).getByRole('link', { name: 'Contacto' })).toHaveAttribute(
      'href',
      '/#contacto',
    );
    expect(within(navegacion).getByRole('link', { name: 'Carrito: 0 encargos' })).toHaveAttribute(
      'href',
      '/carrito',
    );
  });

  it('usa el azul medianoche, el degradado sutil y el borde dorado de la marca', () => {
    const { container } = renderizarNavbar();
    const navbar = container.querySelector('header');

    expect(navbar).toHaveClass('bg-gradient-to-b');
    expect(navbar).toHaveClass('from-principal');
    expect(navbar).toHaveClass('to-principal/85');
    expect(navbar).toHaveClass('border-complementario-principal');
  });

  it('permanece visible y pegado arriba al scrollear', () => {
    const { container } = renderizarNavbar();
    const navbar = container.querySelector('header');

    desplazarA(300);

    expect(navbar).toHaveClass('sticky');
    expect(navbar).not.toHaveClass('-translate-y-full');
  });

  it('intensifica la sombra al scrollear', () => {
    const { container } = renderizarNavbar();
    const navbar = container.querySelector('header');

    expect(navbar).toHaveClass('shadow-lg');

    desplazarA(120);

    expect(navbar).toHaveClass('shadow-xl');
    expect(navbar).toHaveClass('backdrop-blur-xl');
  });

  it('abre el menú móvil y enfoca el primer enlace', async () => {
    const usuario = userEvent.setup();
    renderizarNavbar();

    const boton = screen.getByRole('button', { name: 'Abrir menú' });

    expect(boton).toHaveAttribute('aria-expanded', 'false');
    expect(boton).toHaveAttribute('aria-controls', 'menu-movil');

    await usuario.click(boton);

    const menu = screen.getByRole('navigation', {
      name: 'Navegación móvil',
    });

    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(within(menu).getAllByRole('link')).toHaveLength(6);

    await waitFor(() => {
      expect(within(menu).getByRole('link', { name: 'Inicio' })).toHaveFocus();
    });
  });

  it('cierra el menú con Escape y devuelve el foco al botón', async () => {
    const usuario = userEvent.setup();
    renderizarNavbar();

    const boton = screen.getByRole('button', { name: 'Abrir menú' });

    await usuario.click(boton);
    await usuario.keyboard('{Escape}');

    await waitFor(() => {
      expect(
        screen.queryByRole('navigation', { name: 'Navegación móvil' }),
      ).not.toBeInTheDocument();
    });

    expect(boton).toHaveFocus();
  });

  it('cierra el menú al cambiar de ruta y devuelve el foco al botón', async () => {
    const usuario = userEvent.setup();
    renderizarNavbar({ conNavegador: true });

    const boton = screen.getByRole('button', { name: 'Abrir menú' });

    await usuario.click(boton);

    expect(screen.getByRole('navigation', { name: 'Navegación móvil' })).toBeInTheDocument();

    await usuario.click(screen.getByRole('button', { name: 'Cambiar ruta' }));

    await waitFor(() => {
      expect(
        screen.queryByRole('navigation', { name: 'Navegación móvil' }),
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(boton).toHaveFocus();
    });
  });
});
