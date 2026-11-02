import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import OpcionesPersonalizacion from './OpcionesPersonalizacion';

const OPCIONES = [
  {
    id: 'op-interior-rayado',
    tipo_opcion: 'Interior',
    valor: 'Rayado',
    precio_extra: 0,
    orden: 1,
    activo: true,
  },
  {
    id: 'op-interior-punteado',
    tipo_opcion: 'Interior',
    valor: 'Punteado',
    precio_extra: 500,
    orden: 2,
    activo: true,
  },
  {
    id: 'op-tamano-a5',
    tipo_opcion: 'Tamaño',
    valor: 'A5',
    precio_extra: 0,
    orden: 1,
    activo: true,
  },
];

function OpcionesConEstado() {
  const [seleccion, setSeleccion] = useState({});

  return (
    <OpcionesPersonalizacion
      opciones={OPCIONES}
      seleccion={seleccion}
      onSeleccionar={(tipo, id) => setSeleccion((actual) => ({ ...actual, [tipo]: id }))}
    />
  );
}

describe('OpcionesPersonalizacion', () => {
  it('agrupa las opciones y deja Sin preferencia por defecto', () => {
    render(<OpcionesConEstado />);

    expect(screen.getByRole('group', { name: 'Interior' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Tamaño' })).toBeInTheDocument();
    expect(screen.getAllByLabelText('Sin preferencia')).toHaveLength(2);
    screen.getAllByLabelText('Sin preferencia').forEach((radio) => {
      expect(radio).toBeChecked();
    });
  });

  it('permite una sola selección por tipo y muestra el adicional', async () => {
    const usuario = userEvent.setup();
    render(<OpcionesConEstado />);

    await usuario.click(screen.getByLabelText(/Punteado/));

    expect(screen.getByLabelText(/Punteado/)).toBeChecked();
    expect(screen.getByLabelText(/Rayado/)).not.toBeChecked();
    expect(screen.getByText(/\+ \$ 500/)).toBeInTheDocument();
  });

  it('no renderiza nada si no hay opciones activas', () => {
    const { container } = render(
      <OpcionesPersonalizacion opciones={[]} seleccion={{}} onSeleccionar={() => {}} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
