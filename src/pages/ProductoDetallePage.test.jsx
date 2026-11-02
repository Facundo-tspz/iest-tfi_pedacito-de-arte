import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import CarritoProvider from '../context/CarritoContext';
import configuracion from '../config/configuracion';
import ProductoDetallePage from './ProductoDetallePage';

const URL_ORIGINAL = configuracion.urlSitio;

function renderizarDetalle(ruta = '/catalogo/agenda-botanica') {
  return render(
    <HelmetProvider>
      <CarritoProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <Routes>
            <Route path="/catalogo/:slug" element={<ProductoDetallePage />} />
          </Routes>
        </MemoryRouter>
      </CarritoProvider>
    </HelmetProvider>,
  );
}

describe('ProductoDetallePage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    configuracion.whatsapp = '549297462371';
    configuracion.urlSitio = 'https://pedacito.test';
  });

  afterEach(() => {
    configuracion.whatsapp = '';
    configuracion.urlSitio = URL_ORIGINAL;
  });

  it('muestra la información completa, opciones, notas y CTAs', async () => {
    const usuario = userEvent.setup();
    renderizarDetalle();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Agenda Botánica' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText('Agendas')).toBeInTheDocument();
    expect(
      screen.getByText(/Agenda artesanal con tapa ilustrada y hojas para organizar tus días/),
    ).toBeInTheDocument();
    expect(screen.getByText('Tapa dura')).toBeInTheDocument();
    expect(screen.getAllByText('Precio a confirmar')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Volver al catálogo' })).toHaveAttribute(
      'href',
      '/catalogo',
    );
    expect(screen.getByRole('group', { name: 'Interior' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Tamaño' })).toBeInTheDocument();
    expect(screen.getByLabelText('Notas de personalización')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Agregar al encargo' })).toBeEnabled();

    const enlaceInicial = screen.getByRole('link', {
      name: 'Consultar por WhatsApp',
    });
    const textoInicial = new URL(enlaceInicial.getAttribute('href')).searchParams.get('text');

    expect(textoInicial).toContain('Opciones: Sin preferencia');
    expect(textoInicial).toContain('Notas: Sin notas');

    await usuario.click(screen.getByLabelText('Rayado'));
    await usuario.type(screen.getByLabelText('Notas de personalización'), 'Con nombre');

    const enlaceActualizado = screen.getByRole('link', {
      name: 'Consultar por WhatsApp',
    });
    const textoActualizado = new URL(enlaceActualizado.getAttribute('href')).searchParams.get(
      'text',
    );

    expect(textoActualizado).toContain('Opciones: Interior: Rayado');
    expect(textoActualizado).toContain('Notas: Con nombre');

    await usuario.click(screen.getByRole('button', { name: 'Agregar al encargo' }));

    expect(screen.getByText('Producto agregado al encargo.')).toBeInTheDocument();
  });

  it('aplica los metadatos del producto con fallback', async () => {
    renderizarDetalle();

    await screen.findByRole('heading', { level: 1, name: 'Agenda Botánica' });

    await waitFor(() => {
      expect(document.title).toBe('Agenda Botánica | Pedacito de Arte');
    });
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Agenda artesanal con tapa ilustrada y hojas para organizar tus días. Diseño floral de muestra.',
    );
  });

  it('muestra 404 si el slug no existe', async () => {
    renderizarDetalle('/catalogo/no-existe');

    expect(
      await screen.findByRole('heading', { name: 'No encontramos esta página' }),
    ).toBeInTheDocument();
  });
});
