import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PrecioEstimado from './PrecioEstimado';

describe('PrecioEstimado', () => {
  it('muestra Precio a confirmar cuando la base es nula', () => {
    render(<PrecioEstimado precioBase={null} />);

    expect(screen.getByRole('status')).toHaveTextContent('Precio a confirmar');
    expect(screen.queryByText(/\$\s?0/)).not.toBeInTheDocument();
  });

  it('suma los adicionales de las opciones seleccionadas', () => {
    render(
      <PrecioEstimado
        precioBase={10000}
        opciones={[{ precio_extra: 500 }, { precio_extra: 1000 }]}
      />,
    );

    expect(screen.getByText(/11\.500/)).toBeInTheDocument();
  });

  it('muestra la base cuando no hay adicionales', () => {
    render(<PrecioEstimado precioBase={8000} opciones={[]} />);

    expect(screen.getByText(/8\.000/)).toBeInTheDocument();
  });
});
