import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../../config/configuracion';
import SEO from './SEO';

const URL_ORIGINAL = configuracion.urlSitio;

function renderizarSEO(props) {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>,
  );
}

describe('SEO', () => {
  beforeEach(() => {
    configuracion.urlSitio = 'https://pedacito.test';
  });

  afterEach(() => {
    configuracion.urlSitio = URL_ORIGINAL;
  });

  it('aplica título, descripción, canonical y Open Graph absolutos', async () => {
    renderizarSEO({
      titulo: 'Catálogo de Productos | Pedacito de Arte',
      descripcion: 'Explorá agendas, anotadores y revistas para colorear.',
      url: '/catalogo',
    });

    await waitFor(() => {
      expect(document.title).toBe('Catálogo de Productos | Pedacito de Arte');
    });

    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Explorá agendas, anotadores y revistas para colorear.',
    );
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://pedacito.test/catalogo',
    );
    expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'website',
    );
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Catálogo de Productos | Pedacito de Arte',
    );
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://pedacito.test/marca/logo-icono.png',
    );
    expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://pedacito.test/catalogo',
    );
    expect(document.head.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
  });
});
