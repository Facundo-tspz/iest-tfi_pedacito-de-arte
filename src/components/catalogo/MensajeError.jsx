import Boton from '../ui/Boton';

export default function MensajeError({
  mensaje = 'No pudimos cargar los productos en este momento.',
  onReintentar,
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-contraste/15 bg-blanco/60 p-8 text-center"
    >
      <p className="mx-auto max-w-md font-cuerpo text-base leading-relaxed text-contraste">
        {mensaje}
      </p>
      <Boton variante="primario" onClick={onReintentar} className="mt-5">
        Reintentar
      </Boton>
    </div>
  );
}
