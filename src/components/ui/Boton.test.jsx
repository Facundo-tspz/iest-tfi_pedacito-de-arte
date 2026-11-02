import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Boton from './Boton';

describe('Boton', () => {
  it('renderiza un botón con la variante primaria por defecto', () => {
    render(<Boton>Enviar encargo</Boton>);

    const boton = screen.getByRole('button', { name: 'Enviar encargo' });

    expect(boton).toHaveAttribute('type', 'button');
    expect(boton).toHaveClass('bg-principal');
    expect(boton).toHaveClass('text-blanco');
  });

  it('respeta el tipo submit', () => {
    render(<Boton tipo="submit">Publicar</Boton>);

    expect(screen.getByRole('button', { name: 'Publicar' })).toHaveAttribute('type', 'submit');
  });

  it('aplica variante y tamaño', () => {
    render(
      <Boton variante="secundario" tamano="lg">
        Volver
      </Boton>,
    );

    const boton = screen.getByRole('button', { name: 'Volver' });

    expect(boton).toHaveClass('border-secundario');
    expect(boton).toHaveClass('min-h-12');
  });

  it('se deshabilita y no dispara el clic', async () => {
    const alHacerClic = vi.fn();
    const usuario = userEvent.setup();

    render(
      <Boton disabled onClick={alHacerClic}>
        Publicar
      </Boton>,
    );

    const boton = screen.getByRole('button', { name: 'Publicar' });

    expect(boton).toBeDisabled();

    await usuario.click(boton);

    expect(alHacerClic).not.toHaveBeenCalled();
  });

  it('renderiza un enlace cuando recibe href', () => {
    render(<Boton href="https://wa.me/549297462371">Consultar por WhatsApp</Boton>);

    const enlace = screen.getByRole('link', {
      name: 'Consultar por WhatsApp',
    });

    expect(enlace).toHaveAttribute('href', 'https://wa.me/549297462371');
    expect(enlace).toHaveClass('bg-principal');
  });

  it('deshabilita el enlace sin quitar el nombre accesible', () => {
    render(
      <Boton href="https://wa.me/549297462371" disabled>
        Consultar por WhatsApp
      </Boton>,
    );

    const enlace = screen.getByText('Consultar por WhatsApp').closest('a');

    expect(enlace).not.toHaveAttribute('href');
    expect(enlace).toHaveAttribute('aria-disabled', 'true');
    expect(enlace).toHaveAttribute('tabindex', '-1');
  });
});
