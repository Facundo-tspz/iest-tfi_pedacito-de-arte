import ProductoCard from './ProductoCard';

export default function GrillaProductos({ productos = [], className = '' }) {
  return (
    <ul
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`.trim()}
    >
      {productos.map((producto) => (
        <li key={producto.id}>
          <ProductoCard producto={producto} />
        </li>
      ))}
    </ul>
  );
}
