# Tareas — Spec 002: Carrito + WhatsApp

- **Fase:** F3
- **Estado:** Aprobado — T06 completada; T07 pendiente
- **Plan:** `specs/002-carrito-whatsapp/plan.md`
- **Regla:** una tarea por vez. No se avanza sin verificar la anterior.
- **Estimación:** cada tarea debe resolverse en menos de 30 minutos. Si una tarea se agranda, se divide.

---

## 1. Tabla de tareas

| ID | Tarea | RF / AC | Archivos esperados | Listo cuando | Test asociado | Depende de |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **T01** | Crear utilidades del carrito y persistencia. | RF05.1, RF05.2, RF05.7, RF05.9, RF05.10, AC01, AC02, AC06 | `src/utils/carrito.js`, test | Clave de fusión, normalización, límites, totales y lectura/escritura segura funcionan. | Unitarios de `carrito.js`. | — |
| **T02** | Crear `CarritoProvider` y `useCarrito`. | RF05.1–RF05.11, AC01–AC06 | `src/context/CarritoContext.jsx`, `src/hooks/useCarrito.js`, test | Agregar, fusionar, cambiar cantidad, quitar, vaciar y persistir desde el contexto. | Tests del contexto. | T01 |
| **T03** | Revalidar ítems contra el catálogo. | RF05.7, RF05.8, RF05.10, AC05, AC06 | Contexto y servicio de catálogo, test | Se actualizan precios, se quitan productos/opciones inválidas y se avisa. | Tests de revalidación. | T02 |
| **T04** | Activar “Agregar al encargo” en el detalle. | RF05.1, RF05.6, AC01, AC04 | `CtaWhatsApp.jsx` o componente de agregado, `ProductoDetallePage`, test | El botón agrega producto, opciones y notas; confirma la acción. | Test de integración del detalle. | T02 |
| **T05** | Agregar contador al navbar y menú móvil. | RF05.11, AC03 | `Navbar.jsx`, `MenuMovil.jsx`, tests | El contador muestra unidades totales y se actualiza. | Tests de navbar y menú. | T02 |
| **T06** | Crear página `/carrito` con lista y cantidades. | RF05.3–RF05.6, AC03, AC04 | `src/pages/CarritoPage.jsx`, `ItemCarrito.jsx`, tests | Se ven ítems, opciones, notas, cantidades y acciones de sumar/restar/quitar. | Tests de página e item. | T02 |
| **T07** | Implementar resumen, totales, vaciado y estados. | RF05.5, RF05.7, RF05.8, RF05.12, AC05, AC07 | `ResumenCarrito.jsx`, `CarritoVacio.jsx`, test | Total estimado correcto, precio pendiente, estado vacío y confirmación de vaciado. | Tests de resumen y estados. | T06 |
| **T08** | Implementar mensaje de WhatsApp del carrito. | RF06.1–RF06.3, AC08 | `src/utils/whatsapp.js`, test | El mensaje incluye ítems, cantidades, opciones, notas, URL, total y aclaración. | Unitarios de mensaje. | T01 |
| **T09** | Implementar botón de envío y número faltante. | RF06.2–RF06.5, AC08, AC09 | `BotonEnviarCarrito.jsx`, tests | El enlace abre `wa.me`; sin número se deshabilita con explicación; carrito vacío no envía. | Tests de CTA. | T07, T08 |
| **T10** | Integrar ruta, SEO y accesibilidad del carrito. | RF05, RF06, RNF, AC11 | `AppRouter.jsx`, `main.jsx`, `SEO.jsx`, `CarritoPage.jsx`, tests | `/carrito` renderiza, el provider envuelve la app, hay un `h1`, metadatos y foco correcto. | Tests de ruta, SEO y accesibilidad. | T02–T09 |
| **T11** | Integrar contador y agregado en el flujo real. | RF05.1, RF05.11, AC01–AC03 | `Navbar`, `MenuMovil`, `ProductoDetallePage`, tests | Agregar desde detalle actualiza contador y carrito; el menú móvil muestra el acceso. | Tests de integración. | T04–T10 |
| **T12** | Cerrar calidad y evidencia de F3. | RNF06, AC12 | `specs/002-carrito-whatsapp/verificacion.md`, docs | `npm test`, lint y build pasan; matriz RF/AC actualizada. | Comandos de calidad + revisión. | T01–T11 |

---

## 2. Orden de ejecución

1. T01–T03: modelo, contexto y revalidación.
2. T04–T05: agregado desde detalle y contador.
3. T06–T07: página del carrito, resumen y estados.
4. T08–T09: mensaje y envío por WhatsApp.
5. T10–T11: integración, SEO y accesibilidad.
6. T12: calidad y evidencia.

---

## 3. Reglas de avance

- Marcar una tarea como terminada solo cuando su “Listo cuando” se cumple y sus tests pasan.
- No empezar una tarea si la dependencia no está terminada.
- No mezclar tareas de F4.
- Si aparece un requisito nuevo, actualizar la spec antes de implementar.
- Al cerrar F3, ejecutar `npm test`, `npm run lint` y `npm run build`.
- La implementación comienza solo con la palabra **“aprobado”**.
