import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotasPersonalizacion from './NotasPersonalizacion';

function NotasConEstado({ inicial = '' }) {
  const [valor, setValor] = useState(inicial);

  return <NotasPersonalizacion valor={valor} onCambiar={setValor} />;
}

describe('NotasPersonalizacion', () => {
  it('tiene etiqueta, límite y contador visible', () => {
    render(<NotasConEstado inicial="Hola" />);

    const campo = screen.getByLabelText('Notas de personalización');

    expect(campo).toHaveAttribute('maxlength', '500');
    expect(campo).toHaveValue('Hola');
    expect(screen.getByText('4/500')).toBeInTheDocument();
    expect(campo).toHaveAttribute('aria-describedby');
  });

  it('recorta el texto pegado a 500 caracteres', () => {
    render(<NotasConEstado />);

    const campo = screen.getByLabelText('Notas de personalización');

    fireEvent.change(campo, { target: { value: 'a'.repeat(501) } });

    expect(campo).toHaveValue('a'.repeat(500));
    expect(screen.getByText('500/500')).toBeInTheDocument();
  });
});
