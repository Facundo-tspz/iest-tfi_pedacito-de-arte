import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Footer from './Footer';

vi.mock('../../config/configuracion', () => ({
  default: {
    whatsapp: '549297462371',
    instagram: '@pedacito',
    email: 'hola@pedacito.test',
    urlSitio: 'https://pedacito.test',
  },
}));

function renderizarFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe('Footer', () => {
  it('muestra logo, navegación, contacto y textos legales', () => {
    renderizarFooter();

    expect(screen.getByText('Pedacito')).toBeInTheDocument();
    expect(screen.getByText('de')).toBeInTheDocument();
    expect(screen.getByText('ARTE')).toBeInTheDocument();

    const navegacion = screen.getByRole('navigation', {
      name: 'Navegación del pie de página',
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

    expect(screen.getByRole('link', { name: 'Consultas por WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/549297462371',
    );
    expect(screen.getByRole('link', { name: 'hola@pedacito.test' })).toHaveAttribute(
      'href',
      'mailto:hola@pedacito.test',
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://instagram.com/pedacito',
    );

    expect(
      screen.getByText(/Pedacito de Arte\. Todos los derechos reservados/),
    ).toBeInTheDocument();
    expect(screen.getByText('Los precios finales se confirman por WhatsApp.')).toBeInTheDocument();
  });

  it('abre WhatsApp e Instagram en otra pestaña con rel seguro', () => {
    renderizarFooter();

    const whatsapp = screen.getByRole('link', {
      name: 'Consultas por WhatsApp',
    });
    const instagram = screen.getByRole('link', { name: 'Instagram' });

    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
