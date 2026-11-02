import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ResumenCarrito from './ResumenCarrito';

describe('ResumenCarrito', () => {
  it('muestra unidades y total estimado', () => {
    render(
      <ResumenCarrito
        cantidadTotal={3}
        totalEstimado={26000}
        tienePreciosPendientes={false}
        onVaciar={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Resumen del encargo' }),
    ).toBeInTheDocument();
    expect(screen.getByText('3 unidades')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/26\.000/);
    expect(screen.queryByText(/\$\s?0/)).not.toBeInTheDocument();
  });

  it('muestra total a confirmar cuando falta algún precio', () => {
    render(
      <ResumenCarrito
        cantidadTotal={1}
        totalEstimado={null}
        tienePreciosPendientes
        onVaciar={vi.fn()}
      />,
    );

    expect(screen.getByText('1 unidad')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Total a confirmar por WhatsApp');
  });

  it('pide confirmación antes de vaciar el encargo', async () => {
    const usuario = userEvent.setup();
    const onVaciar = vi.fn();

    render(<ResumenCarrito cantidadTotal={2} totalEstimado={20000} onVaciar={onVaciar} />);

    await usuario.click(screen.getByRole('button', { name: 'Vaciar encargo' }));

    expect(screen.getByRole('group', { name: 'Confirmar vaciado' })).toBeInTheDocument();

    await usuario.click(screen.getByRole('button', { name: 'Sí, vaciar' }));

    expect(onVaciar).toHaveBeenCalledTimes(1);
  });

  it('permite cancelar el vaciado', async () => {
    const usuario = userEvent.setup();

    render(<ResumenCarrito cantidadTotal={2} totalEstimado={20000} onVaciar={vi.fn()} />);

    await usuario.click(screen.getByRole('button', { name: 'Vaciar encargo' }));
    await usuario.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('group', { name: 'Confirmar vaciado' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Vaciar encargo' })).toBeInTheDocument();
  });
});
