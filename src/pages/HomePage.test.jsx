import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../config/configuracion';
import HomePage from './HomePage';

const URL_ORIGINAL = configuracion.urlSitio;

function renderizarHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    configuracion.urlSitio = 'https://pedacito.test';
    configuracion.whatsapp = '549297462371';
  });

  afterEach(() => {
    configuracion.urlSitio = URL_ORIGINAL;
    configuracion.whatsapp = '';
  });

  it('compone todas las secciones con un solo h1', async () => {
    renderizarHome();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Papelería creativa hecha con amor',
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 2, name: 'Sobre nosotros' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Categorías' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Novedades' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Proceso artesanal' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Servicios' })).toBeInTheDocument();

    expect(await screen.findByRole('heading', { level: 3, name: 'Agendas' })).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 3, name: 'Agenda Minimal' }),
    ).toBeInTheDocument();
  });

  it('aplica los metadatos de la Home', async () => {
    renderizarHome();

    await waitFor(() => {
      expect(document.title).toBe('Pedacito de Arte | Papelería Creativa hecha con amor');
    });

    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Agendas personalizadas, agendas docentes, anotadores y revistas para colorear. Papelería artesanal hecha con amor. Armá tu encargo y envialo por WhatsApp.',
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://pedacito.test/',
    );
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Pedacito de Arte | Papelería Creativa hecha con amor',
    );
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://pedacito.test/marca/logo-icono.png',
    );
  });
});
