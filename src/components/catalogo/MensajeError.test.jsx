import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import MensajeError from './MensajeError';

describe('MensajeError', () => {
  it('muestra el mensaje y ejecuta el reintento', async () => {
    const usuario = userEvent.setup();
    const reintentar = vi.fn();

    render(<MensajeError onReintentar={reintentar} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'No pudimos cargar los productos en este momento.',
    );

    await usuario.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(reintentar).toHaveBeenCalledTimes(1);
  });
});
