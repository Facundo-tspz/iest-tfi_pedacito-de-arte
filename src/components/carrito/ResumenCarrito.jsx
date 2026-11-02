import { useState } from 'react';
import { formatearPrecio } from '../../utils/precio';

function describirUnidades(cantidad) {
  return cantidad === 1 ? '1 unidad' : `${cantidad} unidades`;
}

export default function ResumenCarrito({
  cantidadTotal = 0,
  totalEstimado = null,
  tienePreciosPendientes = false,
  onVaciar,
}) {
  const [confirmando, setConfirmando] = useState(false);
  const totalPendiente = tienePreciosPendientes || totalEstimado === null;

  return (
    <aside
      aria-labelledby="resumen-carrito-titulo"
      className="rounded-2xl border border-contraste/15 bg-blanco/60 p-5 shadow-sm shadow-principal/5"
    >
      <h2
        id="resumen-carrito-titulo"
        className="font-titulos text-2xl font-semibold text-principal"
      >
        Resumen del encargo
      </h2>

      <p className="mt-2 font-cuerpo text-sm text-contraste">{describirUnidades(cantidadTotal)}</p>

      <div className="mt-5 border-t border-contraste/15 pt-5">
        <p className="font-cuerpo text-xs font-semibold uppercase tracking-[0.16em] text-contraste">
          Total estimado
        </p>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 font-titulos text-3xl font-semibold text-principal"
        >
          {totalPendiente ? 'Total a confirmar por WhatsApp' : formatearPrecio(totalEstimado)}
        </p>
        <p className="mt-3 font-cuerpo text-xs leading-relaxed text-contraste">
          El precio final se confirma por WhatsApp según personalización y cantidad.
        </p>
      </div>

      <div className="mt-6 border-t border-contraste/15 pt-5">
        {!confirmando ? (
          <button
            type="button"
            onClick={() => setConfirmando(true)}
            className="font-cuerpo text-sm font-semibold text-contraste underline-offset-4 hover:text-principal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
          >
            Vaciar encargo
          </button>
        ) : (
          <div role="group" aria-label="Confirmar vaciado">
            <p className="font-cuerpo text-sm font-semibold text-principal">
              ¿Vaciar todo el encargo?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onVaciar}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-secundario px-4 font-cuerpo text-sm font-semibold text-blanco transition-colors hover:bg-secundario/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
              >
                Sí, vaciar
              </button>
              <button
                type="button"
                onClick={() => setConfirmando(false)}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-contraste/20 bg-fondo px-4 font-cuerpo text-sm font-semibold text-contraste transition-colors hover:bg-blanco focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-fondo"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
