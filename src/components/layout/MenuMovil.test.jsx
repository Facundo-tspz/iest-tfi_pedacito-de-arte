import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import MenuMovil from './MenuMovil';

const ENLACES = [
  { etiqueta: 'Inicio', destino: '/' },
  { etiqueta: 'Catálogo', destino: '/catalogo' },
  { etiqueta: 'Nosotros', destino: '/#nosotros' },
  { etiqueta: 'Servicios', destino: '/#servicios' },
  { etiqueta: 'Contacto', destino: '/#contacto' },
];

function renderizarMenu({ abierto = true, onCerrar = vi.fn() } = {}) {
  return render(
    <MemoryRouter>
      <MenuMovil id="menu-movil" abierto={abierto} enlaces={ENLACES} onCerrar={onCerrar} />
    </MemoryRouter>,
  );
}

describe('MenuMovil', () => {
  it('no expone la navegación cuando está cerrado', () => {
    renderizarMenu({ abierto: false });

    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument();
    expect(document.getElementById('menu-movil')).toHaveAttribute('hidden');
  });

  it('enfoca el primer enlace al abrirse', async () => {
    renderizarMenu();

    const primerEnlace = screen.getByRole('link', { name: 'Inicio' });

    await waitFor(() => {
      expect(primerEnlace).toHaveFocus();
    });
  });

  it('atrapa el foco y lo devuelve al primer enlace al salir del último', async () => {
    renderizarMenu();

    const primerEnlace = screen.getByRole('link', { name: 'Inicio' });
    const ultimoEnlace = screen.getByRole('link', {
      name: 'Carrito: 0 encargos',
    });

    await waitFor(() => {
      expect(primerEnlace).toHaveFocus();
    });

    ultimoEnlace.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(primerEnlace).toHaveFocus();
  });

  it('atrapa el foco y lo lleva al último enlace al retroceder desde el primero', async () => {
    renderizarMenu();

    const primerEnlace = screen.getByRole('link', { name: 'Inicio' });
    const ultimoEnlace = screen.getByRole('link', {
      name: 'Carrito: 0 encargos',
    });

    await waitFor(() => {
      expect(primerEnlace).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    expect(ultimoEnlace).toHaveFocus();
  });

  it('cierra el menú al presionar Escape', async () => {
    const onCerrar = vi.fn();
    renderizarMenu({ onCerrar });

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Inicio' })).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onCerrar).toHaveBeenCalledTimes(1);
  });

  it('cierra el menú al elegir un enlace', async () => {
    const onCerrar = vi.fn();
    renderizarMenu({ onCerrar });

    fireEvent.click(screen.getByRole('link', { name: 'Catálogo' }));

    expect(onCerrar).toHaveBeenCalledTimes(1);
  });
});
