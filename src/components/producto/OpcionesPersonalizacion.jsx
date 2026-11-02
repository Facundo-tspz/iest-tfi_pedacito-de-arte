import { useId } from 'react';
import { formatearPrecio } from '../../utils/precio';

function agruparOpciones(opciones) {
  const grupos = new Map();

  opciones
    .filter((opcion) => opcion.activo !== false)
    .forEach((opcion) => {
      if (!grupos.has(opcion.tipo_opcion)) {
        grupos.set(opcion.tipo_opcion, []);
      }

      grupos.get(opcion.tipo_opcion).push(opcion);
    });

  return Array.from(grupos, ([tipo, opcionesGrupo]) => ({
    tipo,
    opciones: [...opcionesGrupo].sort((a, b) => a.orden - b.orden),
  }));
}

function GrupoOpciones({ tipo, opciones, seleccion, onSeleccionar }) {
  const idGrupo = useId();

  return (
    <fieldset className="rounded-2xl border border-contraste/15 bg-blanco/60 p-4">
      <legend className="px-1 font-cuerpo text-sm font-semibold text-principal">{tipo}</legend>

      <div className="mt-3 space-y-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 font-cuerpo text-sm text-contraste hover:bg-fondo">
          <input
            type="radio"
            name={idGrupo}
            value=""
            checked={!seleccion}
            onChange={() => onSeleccionar(tipo, '')}
            className="h-4 w-4 accent-principal"
          />
          Sin preferencia
        </label>

        {opciones.map((opcion) => (
          <label
            key={opcion.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 font-cuerpo text-sm text-contraste hover:bg-fondo"
          >
            <input
              type="radio"
              name={idGrupo}
              value={opcion.id}
              checked={seleccion === opcion.id}
              onChange={() => onSeleccionar(tipo, opcion.id)}
              className="h-4 w-4 accent-principal"
            />
            <span>
              {opcion.valor}
              {opcion.precio_extra > 0 ? (
                <span className="ml-1 text-xs font-semibold text-principal">
                  + {formatearPrecio(opcion.precio_extra)}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function OpcionesPersonalizacion({ opciones = [], seleccion = {}, onSeleccionar }) {
  const grupos = agruparOpciones(opciones);

  if (grupos.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {grupos.map((grupo) => (
        <GrupoOpciones
          key={grupo.tipo}
          tipo={grupo.tipo}
          opciones={grupo.opciones}
          seleccion={seleccion[grupo.tipo] ?? ''}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  );
}
