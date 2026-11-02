# Plan Técnico — Spec 002: Carrito + WhatsApp

- **Fase:** F3
- **Estado:** Aprobado
- **Spec:** `specs/002-carrito-whatsapp/spec.md`
- **Clarificación:** `specs/002-carrito-whatsapp/clarificacion.md` (C01–C20 aprobadas)
- **Regla:** no se escribe código hasta aprobar este plan y `tasks.md`.

---

## 1. Enfoque técnico

F3 agrega un carrito de encargos local, sin pagos ni backend de pedidos.

1. **Estado global:** contexto de React `CarritoProvider` + hook `useCarrito`.
2. **Persistencia:** `localStorage` con clave versionada `pedacito-encargos-v1`.
3. **Modelo de ítem:** producto + opciones + notas + cantidad, con una clave de fusión.
4. **Revalidación:** al cargar, contrastar ítems con el servicio del catálogo.
5. **Página dedicada:** `/carrito`, con lista, cantidades, resumen y estado vacío.
6. **Contador:** unidades totales en navbar y menú móvil.
7. **Mensaje:** resumen estructurado de todos los ítems hacia `wa.me`.
8. **Sin backend:** no Supabase, no pagos, no cuentas, no historial.

---

## 2. Capas y archivos previstos

### Utilidades

- `src/utils/carrito.js`: clave de fusión, normalización, límites, lectura/escritura segura de `localStorage`, cálculo de totales.
- `src/utils/carrito.test.js`.

### Estado

- `src/context/CarritoContext.jsx`: provider, estado, acciones y revalidación.
- `src/hooks/useCarrito.js`: hook de consumo.
- `src/context/CarritoContext.test.jsx`.

### Carrito

- `src/components/carrito/ContadorCarrito.jsx`.
- `src/components/carrito/ItemCarrito.jsx`.
- `src/components/carrito/ResumenCarrito.jsx`.
- `src/components/carrito/CarritoVacio.jsx`.
- Tests de cada componente.

### Página y ruta

- `src/pages/CarritoPage.jsx`.
- `src/routes/AppRouter.jsx`: ruta `/carrito`.
- `src/components/seo/SEO.jsx`: metadatos de la página.
- Tests de página y ruta.

### Integración

- `src/components/producto/CtaWhatsApp.jsx`: “Agregar al encargo” activo.
- `src/components/layout/Navbar.jsx` y `MenuMovil.jsx`: enlace y contador.
- `src/main.jsx`: `CarritoProvider`.
- Tests de integración.

### WhatsApp

- `src/utils/whatsapp.js`: `construirMensajeCarrito`.
- `src/utils/whatsapp.test.js`.
- `src/components/carrito/BotonEnviarCarrito.jsx`.

---

## 3. Modelo de estado

```text
CarritoContext
├── items: ItemCarrito[]
├── cantidadTotal: number
├── totalEstimado: number | null
├── tienePreciosPendientes: boolean
├── agregar(producto, opciones, notas)
├── cambiarCantidad(clave, cantidad)
├── quitar(clave)
├── vaciar()
└── aviso: string | null
```

Reglas:

- `cantidadTotal` suma unidades.
- `totalEstimado` es numérico solo si todos los ítems tienen precio.
- `agregar` fusiona por producto + opciones + notas normalizadas.
- `cambiarCantidad` elimina si baja de 1 y limita a 99.
- `vaciar` requiere confirmación en la UI.
- `aviso` informa ítems eliminados por revalidación o acciones.

---

## 4. Persistencia

- Clave: `pedacito-encargos-v1`.
- Se guarda un objeto con `version` e `items`.
- Lectura tolerante a errores: JSON inválido, versión desconocida o ítems corruptos.
- No se guardan datos personales.
- No hay expiración automática.
- La revalidación actualiza precios y disponibilidad al iniciar la app.

---

## 5. Revalidación

Al cargar el provider:

1. Leer ítems del almacenamiento.
2. Consultar cada producto con `obtenerProductoPorSlug`.
3. Si no existe o no está disponible, quitar el ítem.
4. Si una opción guardada ya no existe o está inactiva, quitarla.
5. Actualizar nombre, categoría, precio y opciones con los datos actuales.
6. Recalcular claves y fusionar duplicados.
7. Mostrar aviso si se eliminó algo.

---

## 6. Página `/carrito`

- Título `h1`: “Carrito de encargos”.
- Lista de ítems con imagen, nombre, categoría, opciones, notas, cantidad y precio.
- Botones “Restar” y “Sumar” con etiquetas accesibles.
- Botón “Quitar” por ítem.
- Botón “Vaciar encargo” con confirmación en dos pasos.
- Resumen con subtotal por ítem y total.
- Aviso: “El precio final se confirma por WhatsApp”.
- Botón “Enviar encargo por WhatsApp”.
- Estado vacío con CTA al catálogo.
- Estado de carga durante la revalidación.

---

## 7. Mensaje de WhatsApp

```text
Hola, quiero consultar por este encargo:

1. Agenda Botánica (AG-001)
   Cantidad: 2
   Opciones: Interior: Rayado | Tamaño: A4
   Notas: Para regalo
   Precio estimado: $ 30.000
   URL: https://sitio/catalogo/agenda-botanica

Total estimado: $ 30.000
El precio final se confirma por WhatsApp según personalización y cantidad.
```

Reglas:

- `encodeURIComponent` sobre el mensaje completo.
- `Sin preferencia` y `Sin notas` cuando corresponda.
- `Total a confirmar por WhatsApp` si falta algún precio.
- No incluir datos personales.
- Número desde `configuracion.whatsapp`.
- Si falta el número, deshabilitar el envío con explicación.

---

## 8. Accesibilidad

- Un solo `h1` en `/carrito`.
- Contador de navbar con `aria-label` que incluya la cantidad.
- Botones de cantidad con nombres accesibles.
- Total en `aria-live="polite"`.
- Foco visible en todos los controles.
- Confirmación de vaciado operable con teclado.
- Enlace al catálogo en estado vacío.
- Imágenes con `alt` o placeholder accesible.

---

## 9. SEO

- Título: `Carrito de encargos | Pedacito de Arte`.
- Descripción: resumen del carrito y la confirmación por WhatsApp.
- URL canónica: `/carrito`.
- Si se agrega soporte de `noindex`, aplicarlo solo a esta página.

---

## 10. Estrategia de tests

- `carrito.js`: clave, fusión, cantidades, totales, storage corrupto.
- `CarritoContext`: agregar, fusionar, cambiar cantidad, quitar, vaciar, persistir, revalidar.
- Componentes: contador, ítem, resumen, estado vacío.
- Página: carga, edición de cantidades, total, vaciar, envío.
- Navbar: contador visible y actualizado.
- Detalle: “Agregar al encargo” crea el ítem.
- WhatsApp: mensaje con varios ítems, opciones, notas, precio nulo y número faltante.
- Router: `/carrito` responde correctamente.

---

## 11. Riesgos y mitigaciones

| Riesgo | Mitigación |
| :--- | :--- |
| `localStorage` corrupto | Lectura tolerante y descarte de ítems inválidos. |
| Datos obsoletos | Revalidación contra el servicio al iniciar. |
| Totales incorrectos | Cálculo centralizado y tests unitarios. |
| Mensaje demasiado largo | Formato compacto y sin datos innecesarios. |
| Número de WhatsApp faltante | Envío deshabilitado con explicación. |
| Duplicados | Clave de fusión estable y normalización de notas. |
| Accesibilidad del carrito | Botones etiquetados, foco visible y `aria-live`. |

---

## 12. Fuera de alcance

- Pagos, checkout, señas y pasarelas.
- Cuentas de cliente e historial.
- Stock, reservas y disponibilidad en tiempo real.
- Envíos automáticos.
- Supabase, migraciones y panel admin.
- Cupones, impuestos y facturación.
