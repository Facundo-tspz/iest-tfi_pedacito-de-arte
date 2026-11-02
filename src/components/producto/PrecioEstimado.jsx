import { calcularPrecioEstimado, formatearPrecio } from '../../utils/precio';

export default function PrecioEstimado({ precioBase, opciones = [] }) {
  const precioEstimado = calcularPrecioEstimado(precioBase, opciones);

  return (
    <div className="rounded-2xl border border-contraste/15 bg-blanco/60 p-5">
      <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
        Precio estimado
      </p>
      <p className="mt-2 font-titulos text-3xl font-semibold text-principal">
        {formatearPrecio(precioEstimado)}
      </p>
      <p className="mt-2 font-cuerpo text-xs leading-relaxed text-contraste">
        El precio final se confirma por WhatsApp según personalización y cantidad.
      </p>
    </div>
  );
}
