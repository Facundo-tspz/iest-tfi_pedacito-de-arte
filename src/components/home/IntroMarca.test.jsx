import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../../config/configuracion';
import IntroMarca from './IntroMarca';

function renderizarIntro() {
  return render(
    <MemoryRouter>
      <IntroMarca />
    </MemoryRouter>,
  );
}

describe('IntroMarca', () => {
  beforeEach(() => {
    configuracion.whatsapp = '549297462371';
  });

  afterEach(() => {
    configuracion.whatsapp = '';
  });

  it('muestra la presentación de la marca, la foto y las llamadas a la acción', () => {
    const { container } = renderizarIntro();

    expect(screen.getByRole('region', { name: 'Sobre nosotros' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Sobre nosotros' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByText(/Pedacito de Arte diseña y confecciona agendas/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: 'Stand de Pedacito de Arte en una feria con agendas, anotadores y revistas',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toHaveAttribute('href', '/catalogo');

    const enlaceWhatsApp = screen.getByRole('link', {
      name: 'Hablemos por WhatsApp',
    });
    const url = new URL(enlaceWhatsApp.getAttribute('href'));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/549297462371');
    expect(url.searchParams.get('text')).toBe(
      'Hola, quiero consultar por un encargo personalizado.',
    );
    expect(container.querySelector('#nosotros')).toBeInTheDocument();
  });
});
