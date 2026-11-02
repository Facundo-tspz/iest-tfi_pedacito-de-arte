import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import configuracion from '../../config/configuracion';
import BotonEnviarCarrito from './BotonEnviarCarrito';

const ITEM = {
  nombre: 'Agenda Botánica',
  codigo: 'AG-001',
  slug: 'agenda-botanica',
  cantidad: 1,
  precio_base: 10000,
  opciones: [],
  notas: '',
};

const URL_ORIGINAL = configuracion.urlSitio;

describe('BotonEnviarCarrito', () => {
  beforeEach(() => {
    configuracion.whatsapp = '549297462371';
    configuracion.urlSitio = 'https://pedacito.test';
  });

  afterEach(() => {
    configuracion.whatsapp = '';
    configuracion.urlSitio = URL_ORIGINAL;
  });

  it('genera el enlace de WhatsApp con el encargo completo', () => {
    render(<BotonEnviarCarrito items={[ITEM]} />);

    const enlace = screen.getByRole('link', {
      name: 'Enviar encargo por WhatsApp',
    });
    const texto = new URL(enlace.getAttribute('href')).searchParams.get('text');

    expect(texto).toContain('1. Agenda Botánica (AG-001)');
    expect(texto).toContain('Cantidad: 1');
    expect(texto).toMatch(/Total estimado: \$[\s]+10\.000/);
    expect(enlace).toHaveAttribute('target', '_blank');
    expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('deshabilita el envío si no hay ítems', () => {
    render(<BotonEnviarCarrito items={[]} />);

    expect(screen.getByRole('button', { name: 'Enviar encargo por WhatsApp' })).toBeDisabled();
  });

  it('deshabilita el envío si falta el número de WhatsApp', () => {
    configuracion.whatsapp = '';
    render(<BotonEnviarCarrito items={[ITEM]} />);

    expect(screen.getByRole('button', { name: 'Enviar encargo por WhatsApp' })).toBeDisabled();
    expect(screen.getByText(/La consulta por WhatsApp no está disponible/)).toBeInTheDocument();
  });
});
