import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../../config/configuracion';
import ServiciosCTA from './ServiciosCTA';

function renderizarServicios() {
  return render(<ServiciosCTA />);
}

describe('ServiciosCTA', () => {
  beforeEach(() => {
    configuracion.whatsapp = '549297462371';
  });

  afterEach(() => {
    configuracion.whatsapp = '';
  });

  it('muestra la franja de servicios y el ancla de contacto', () => {
    const { container } = renderizarServicios();

    expect(screen.getByRole('region', { name: 'Servicios' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Servicios' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Diseño personalizado' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Impresión' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Laminado' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Encuadernación' })).toBeInTheDocument();
    expect(container.querySelector('#servicios')).toBeInTheDocument();
    expect(container.querySelector('#contacto')).toBeInTheDocument();
  });

  it('genera el enlace de WhatsApp con el mensaje de consulta', () => {
    renderizarServicios();

    const enlace = screen.getByRole('link', { name: 'Consultar por WhatsApp' });
    const url = new URL(enlace.getAttribute('href'));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/549297462371');
    expect(url.searchParams.get('text')).toBe(
      'Hola, quiero consultar por un encargo personalizado.',
    );
    expect(enlace).toHaveAttribute('target', '_blank');
    expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('deshabilita la CTA si falta el número de WhatsApp', () => {
    configuracion.whatsapp = '';
    renderizarServicios();

    expect(screen.getByRole('button', { name: 'Consultar por WhatsApp' })).toBeDisabled();
    expect(screen.queryByRole('link', { name: 'Consultar por WhatsApp' })).not.toBeInTheDocument();
  });
});
