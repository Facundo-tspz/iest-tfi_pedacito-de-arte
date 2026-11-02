# Spec 002 — Carrito de encargos + WhatsApp

- **Fase:** F3
- **Estado:** Aprobada — pendiente de clarificación
- **Depende de:** F2 cerrada y aprobada
- **Habilita:** F4 (panel admin + CMS)

---

## 1. Contexto y problema

El catálogo ya permite explorar productos, personalizarlos y consultar un producto individual por WhatsApp. Falta la herramienta para armar un encargo con varias piezas, conservar opciones y notas, estimar el total y enviar el resumen completo al taller.

El carrito es una herramienta de armado, no una tienda: no procesa pagos, no descuenta stock y no crea cuentas de cliente.

---

## 2. Objetivo

Permitir que el cliente agregue productos al carrito, ajuste cantidades, conserve la personalización, vea un total estimado y envíe el encargo completo por WhatsApp.

---

## 3. Historias de usuario

### HU-01 — Agregar un producto personalizado

> **Como** cliente interesado en un producto,  
> **quiero** agregarlo al carrito con las opciones y notas que elegí,  
> **para** armar un encargo sin escribir todo a mano.

**Criterios de aceptación asociados:** AC01, AC04.

### HU-02 — Administrar el encargo

> **Como** cliente que está armando un encargo,  
> **quiero** cambiar cantidades, quitar productos y ver el total estimado,  
> **para** revisar el pedido antes de enviarlo.

**Criterios de aceptación asociados:** AC02, AC03, AC05.

### HU-03 — Enviar el encargo

> **Como** cliente que terminó de elegir,  
> **quiero** enviar el resumen completo por WhatsApp,  
> **para** coordinar disponibilidad, precio final y entrega con el taller.

**Criterios de aceptación asociados:** AC08, AC09.

### HU-04 — Conservar el encargo

> **Como** cliente que está comparando opciones,  
> **quiero** que el carrito se conserve si recargo la página,  
> **para** no perder el trabajo de personalización.

**Criterios de aceptación asociados:** AC06.

---

## 4. Alcance

### Incluye

- Carrito de encargos con ítems personalizados.
- Cantidades, eliminación y vaciado del carrito.
- Persistencia en `localStorage`.
- Contador visible en la navbar.
- Página o panel de carrito.
- Total estimado y aclaración de que el precio final se confirma por WhatsApp.
- Mensaje estructurado de WhatsApp con todos los ítems.
- Revalidación de productos y opciones al cargar el carrito.
- Estados vacío, error y carga.
- Tests de lógica, componentes y flujo.
- Responsive y accesibilidad.

### No incluye

- Pagos, checkout, pasarela, seña o Mercado Pago.
- Cuentas de cliente.
- Stock, reservas o disponibilidad en tiempo real.
- Historial de pedidos.
- Envíos automáticos.
- Panel administrativo ni Supabase.
- Cupones, descuentos o impuestos.

---

## 5. Requisitos funcionales (EARS)

### RF05 — Carrito de encargos

- **RF05.1** Cuando el usuario seleccione “Agregar al encargo” en un producto, el sistema deberá agregar un ítem con producto, opciones, notas y cantidad 1.
- **RF05.2** Cuando el usuario agregue un producto con las mismas opciones y notas que un ítem existente, el sistema deberá incrementar la cantidad de ese ítem.
- **RF05.3** Cuando el usuario cambie la cantidad de un ítem, el sistema deberá actualizar la cantidad y el total estimado.
- **RF05.4** Cuando el usuario quite un ítem, el sistema deberá eliminarlo del carrito y actualizar el contador.
- **RF05.5** Cuando el usuario vacíe el carrito, el sistema deberá eliminar todos los ítems y mostrar el estado vacío.
- **RF05.6** El sistema deberá conservar opciones y notas por ítem.
- **RF05.7** El sistema deberá calcular el total estimado sumando base y adicionales de cada ítem, multiplicado por su cantidad.
- **RF05.8** Donde un producto no tenga `precio_base`, el sistema deberá mostrar “Precio a confirmar” y no deberá incluir un total numérico que lo invente.
- **RF05.9** El sistema deberá persistir el carrito en `localStorage` y recuperarlo al recargar.
- **RF05.10** Si el almacenamiento está corrupto o contiene ítems inválidos, entonces el sistema deberá descartarlos y mostrar un carrito válido o vacío.
- **RF05.11** El sistema deberá mostrar un contador de ítems en la navbar.
- **RF05.12** Cuando el carrito esté vacío, el sistema deberá mostrar un estado vacío con enlace al catálogo.

### RF06 — Envío por WhatsApp

- **RF06.1** Cuando el usuario seleccione “Enviar encargo por WhatsApp”, el sistema deberá generar un mensaje con todos los ítems, cantidades, opciones, notas y total estimado.
- **RF06.2** El sistema deberá codificar el mensaje con `encodeURIComponent` y abrir `https://wa.me/{numero}?text=...`.
- **RF06.3** El mensaje deberá aclarar que el precio final se confirma por WhatsApp.
- **RF06.4** Si `VITE_WHATSAPP` está vacío, entonces el sistema deberá deshabilitar el envío y mostrar un aviso claro.
- **RF06.5** Si el carrito está vacío, entonces el sistema deberá impedir el envío.
- **RF06.6** El envío no deberá procesar pagos ni persistir el encargo en una base de datos.

---

## 6. Datos del carrito

Cada ítem deberá conservar:

```text
{
  clave: string,
  producto_id: string,
  slug: string,
  nombre: string,
  codigo: string,
  categoria: { nombre, slug },
  precio_base: number | null,
  cantidad: number,
  opciones: [{ id, tipo_opcion, valor, precio_extra }],
  notas: string
}
```

Reglas:

- `clave` identifica producto + opciones + notas.
- `cantidad` será un entero entre 1 y 99.
- `notas` se recortan a 500 caracteres.
- El carrito no guarda datos personales, pagos ni secretos.
- La versión del almacenamiento será explícita para permitir migraciones futuras.

---

## 7. Experiencia de uso

- El detalle de producto mantiene “Consultar por WhatsApp” para una consulta individual.
- “Agregar al encargo” queda activo y confirma la acción.
- La navbar muestra un contador junto al enlace del carrito.
- El carrito muestra una lista de ítems con imagen, nombre, opciones, notas, cantidad, precio estimado y acciones.
- El total se muestra como “Total estimado”.
- Si algún ítem no tiene precio base, el total se muestra como “Total a confirmar por WhatsApp”.
- El botón principal será “Enviar encargo por WhatsApp”.
- No habrá botón de pago.

---

## 8. Casos límite

1. Producto no disponible al recuperar el carrito: quitar el ítem y avisar.
2. Opción eliminada o inactiva: quitar esa opción y recalcular.
3. Precio base cambiado: recalcular con el valor actual del servicio.
4. Cantidad mayor a 99: limitar a 99.
5. Cantidad menor a 1: eliminar el ítem.
6. Carrito con ítems sin precio: no mostrar total numérico.
7. `localStorage` corrupto: iniciar vacío sin romper la app.
8. `VITE_WHATSAPP` vacío: deshabilitar envío con explicación.
9. Carrito vacío: mostrar estado vacío y no permitir enviar.
10. Recarga o nueva pestaña: recuperar el carrito válido.

---

## 9. Requisitos no funcionales

- Mobile first desde 360 px.
- Navegación por teclado y foco visible.
- Contraste suficiente y tokens de marca.
- `aria-live` para cambios de cantidad y total cuando corresponda.
- Tests de persistencia, cálculos, mensaje y componentes.
- `npm test`, `npm run lint` y `npm run build` deben pasar.
- No se agregan dependencias sin justificación y aprobación.

---

## 10. Criterios de aceptación

- **AC01** Agregar un producto desde el detalle crea un ítem con opciones y notas.
- **AC02** Agregar el mismo producto con igual personalización incrementa la cantidad.
- **AC03** Cambiar cantidad, quitar ítems y vaciar el carrito actualizan la interfaz y el contador.
- **AC04** Las opciones y notas se conservan en cada ítem.
- **AC05** El total estimado se calcula correctamente; con precio nulo no se inventa un total.
- **AC06** El carrito persiste en `localStorage` y se recupera al recargar.
- **AC07** El carrito vacío muestra un estado claro con enlace al catálogo.
- **AC08** El mensaje de WhatsApp incluye todos los ítems y está codificado.
- **AC09** Si falta el número de WhatsApp, el envío se deshabilita con aviso.
- **AC10** No existe pago, checkout, cuenta de cliente, stock ni historial.
- **AC11** La interfaz es usable desde 360 px y con teclado.
- **AC12** Tests, lint y build pasan.

---

## 11. Decisiones pendientes de clarificación

1. ¿El carrito será una página `/carrito` o un panel lateral?
2. ¿“Consultar por WhatsApp” individual se mantiene junto a “Agregar al encargo”?
3. ¿El carrito se vacía después de abrir WhatsApp o queda hasta que el usuario lo vacíe?
4. ¿La revalidación de productos debe actualizar el precio guardado o solo avisar?
5. ¿El contador de la navbar suma unidades o cuenta líneas distintas?
6. ¿Se permite editar opciones desde el carrito o solo desde el detalle?
7. ¿El total estimado debe mostrarse por ítem y general, o solo general?

---

## 12. Fuera de alcance

- Pagos, checkout, señas y pasarelas.
- Cuentas de cliente e historial.
- Stock e inventario.
- Envíos automáticos.
- Panel admin y CMS.
- Supabase y migraciones.
- Cupones, impuestos y facturación.
