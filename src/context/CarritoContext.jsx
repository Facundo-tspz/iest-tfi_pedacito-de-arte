import { useEffect, useRef, useState } from 'react';
import { CarritoContext } from './contextoCarrito';
import { obtenerProductoPorSlug } from '../services/catalogo';
import {
  calcularTotales,
  crearItemCarrito,
  fusionarItem,
  guardarCarrito,
  leerCarrito,
  normalizarCantidad,
} from '../utils/carrito';

function fusionarLista(items) {
  return items.reduce((acumulado, item) => fusionarItem(acumulado, item), []);
}

export default function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leerCarrito());
  const [aviso, setAviso] = useState(null);
  const itemsIniciales = useRef(items);

  useEffect(() => {
    guardarCarrito(items);
  }, [items]);

  useEffect(() => {
    const iniciales = itemsIniciales.current;

    if (iniciales.length === 0) {
      return undefined;
    }

    let activo = true;

    const revalidar = async () => {
      const resultados = await Promise.all(
        iniciales.map(async (item) => {
          try {
            const producto = await obtenerProductoPorSlug(item.slug);
            return { item, producto };
          } catch {
            return { item, producto: null, error: true };
          }
        }),
      );

      if (!activo) {
        return;
      }

      let huboCambios = false;
      const revalidados = [];

      resultados.forEach(({ item, producto, error }) => {
        if (error) {
          revalidados.push(item);
          return;
        }

        if (!producto) {
          huboCambios = true;
          return;
        }

        const opciones = item.opciones
          .map((opcion) =>
            producto.opciones?.find((actual) => actual.id === opcion.id && actual.activo !== false),
          )
          .filter(Boolean);

        if (opciones.length !== item.opciones.length) {
          huboCambios = true;
        }

        const actualizado = crearItemCarrito({
          producto,
          opciones,
          notas: item.notas,
          cantidad: item.cantidad,
        });

        if (actualizado) {
          revalidados.push(actualizado);
        } else {
          huboCambios = true;
        }
      });

      setItems((actuales) => {
        const agregados = actuales.filter((item) => !iniciales.includes(item));
        return fusionarLista([...revalidados, ...agregados]);
      });

      if (huboCambios) {
        setAviso('Algunos productos u opciones ya no están disponibles y se quitaron del carrito.');
      }
    };

    revalidar();

    return () => {
      activo = false;
    };
  }, []);

  const agregar = (producto, opciones = [], notas = '') => {
    const item = crearItemCarrito({ producto, opciones, notas });

    if (!item) {
      return false;
    }

    setItems((actuales) => fusionarItem(actuales, item));
    return true;
  };

  const cambiarCantidad = (clave, cantidad) => {
    const numero = Number(cantidad);

    if (!Number.isFinite(numero) || numero < 1) {
      setItems((actuales) => actuales.filter((item) => item.clave !== clave));
      return;
    }

    const cantidadNormalizada = normalizarCantidad(numero);

    setItems((actuales) =>
      actuales.map((item) =>
        item.clave === clave ? { ...item, cantidad: cantidadNormalizada } : item,
      ),
    );
  };

  const quitar = (clave) => {
    setItems((actuales) => actuales.filter((item) => item.clave !== clave));
  };

  const vaciar = () => {
    setItems([]);
  };

  const totales = calcularTotales(items);

  return (
    <CarritoContext.Provider
      value={{
        items,
        cantidadTotal: totales.cantidadTotal,
        totalEstimado: totales.totalEstimado,
        tienePreciosPendientes: totales.tienePreciosPendientes,
        aviso,
        limpiarAviso: () => setAviso(null),
        agregar,
        cambiarCantidad,
        quitar,
        vaciar,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
