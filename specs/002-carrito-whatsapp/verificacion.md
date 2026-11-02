# Verificación — Spec 002: Carrito + WhatsApp

- **Fecha:** 2026-11-02
- **Fase:** F3
- **Estado:** Aprobada por pruebas automatizadas y revisión de flujo.
- **Alcance:** RF05, RF06, AC01–AC12.

---

## 1. Comandos de calidad

| Comando | Resultado |
| :--- | :--- |
| `npm test` | 246/246 tests, 54 archivos |
| `npm run lint` | Sin errores |
| `npm run build` | Correcto, 109 módulos transformados |

---

## 2. Matriz de requisitos

| RF | Evidencia | Estado |
| :--- | :--- | :--- |
| RF05 — Carrito | `src/utils/carrito.js`, `CarritoContext.jsx`, `CarritoPage.jsx`, `ItemCarrito.jsx`, `ResumenCarrito.jsx`, `CarritoVacio.jsx`; tests de utilidades, contexto, página y componentes. | cumple |
| RF06 — WhatsApp | `construirMensajeCarrito`, `BotonEnviarCarrito`, `crearUrlWhatsApp`; tests de mensaje, codificación y número faltante. | cumple |

---

## 3. Criterios de aceptación

| AC | Evidencia | Estado |
| :--- | :--- | :--- |
| AC01 | Agregar desde el detalle crea el ítem; test de flujo en `AppRouter.test.jsx` y test de detalle. | cumple |
| AC02 | Fusión por producto + opciones + notas; tests de `carrito.js` y contexto. | cumple |
| AC03 | Cantidades, quitar y contador; tests de contexto, item y navbar. | cumple |
| AC04 | Opciones y notas por ítem; tests de item y detalle. | cumple |
| AC05 | Total estimado y precio pendiente; tests de resumen y utilidades. | cumple |
| AC06 | Persistencia en `localStorage`; tests de almacenamiento y contexto. | cumple |
| AC07 | Estado vacío con enlace al catálogo; test de `CarritoVacio` y página. | cumple |
| AC08 | Mensaje de WhatsApp con ítems, cantidades, opciones, notas, URL y total; tests de mensaje y CTA. | cumple |
| AC09 | Número faltante deshabilita el envío con aviso; test de `BotonEnviarCarrito`. | cumple |
| AC10 | Sin pagos, checkout, cuentas, stock ni historial. | cumple |
| AC11 | Responsive, foco visible, etiquetas y `aria-live`; tests de componentes y página. | cumple |
| AC12 | Tests, lint y build pasan. | cumple |

---

## 4. Flujo verificado

1. Agregar producto desde `/catalogo/:slug`.
2. El contador de navbar aumenta por unidades.
3. Abrir `/carrito`.
4. Cambiar cantidades, quitar ítems o vaciar con confirmación.
5. Ver total estimado o “Total a confirmar por WhatsApp”.
6. Enviar el encargo completo por WhatsApp.

---

## 5. Pendiente manual

- Revisión visual final en navegador antes de la entrega.
- Prueba del enlace real de WhatsApp con el número configurado.
