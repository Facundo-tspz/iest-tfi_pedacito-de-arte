import { Link } from 'react-router-dom';

function describirCantidad(cantidad) {
  return cantidad === 1 ? '1 encargo' : `${cantidad} encargos`;
}

export default function ContadorCarrito({ cantidad = 0, onClick, className = '' }) {
  return (
    <Link
      to="/carrito"
      onClick={onClick}
      aria-label={`Carrito: ${describirCantidad(cantidad)}`}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 font-cuerpo text-sm font-medium text-blanco/90 transition-colors hover:bg-blanco/10 hover:text-blanco focus-visible:bg-blanco/10 focus-visible:text-blanco ${className}`.trim()}
    >
      <span>Carrito</span>
      <span
        aria-hidden="true"
        className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-complementario-principal px-1 text-xs font-semibold text-principal"
      >
        {cantidad}
      </span>
    </Link>
  );
}
