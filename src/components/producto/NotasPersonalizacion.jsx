import { useId } from 'react';

const MAX_NOTAS = 500;

export default function NotasPersonalizacion({ valor = '', onCambiar }) {
  const idNotas = useId();
  const idContador = `${idNotas}-contador`;
  const cantidad = valor.length;

  return (
    <div className="mt-6">
      <label htmlFor={idNotas} className="font-cuerpo text-sm font-semibold text-principal">
        Notas de personalización
      </label>
      <textarea
        id={idNotas}
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value.slice(0, MAX_NOTAS))}
        maxLength={MAX_NOTAS}
        rows={4}
        aria-describedby={idContador}
        placeholder="Contanos si querés algún detalle especial."
        className="mt-2 w-full resize-y rounded-xl border border-contraste/20 bg-blanco/70 px-4 py-3 font-cuerpo text-base text-principal placeholder:text-contraste/60 focus-visible:border-complementario-secundario focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
      />
      <p id={idContador} className="mt-2 text-right font-cuerpo text-xs text-contraste">
        {cantidad}/{MAX_NOTAS}
      </p>
    </div>
  );
}
