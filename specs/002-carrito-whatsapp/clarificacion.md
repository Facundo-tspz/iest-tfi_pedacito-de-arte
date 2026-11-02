# Clarificación — Spec 002: Carrito + WhatsApp

- **Fecha:** 2026-11-02
- **Spec revisada:** `specs/002-carrito-whatsapp/spec.md`
- **Estado:** Aprobada — C01–C20 aprobadas por el estudiante el 2026-11-02.
- **Regla:** no se escribe código hasta aprobar el plan y las tareas.

---

## 1. Decisiones propuestas

| ID | Tema | Decisión propuesta | Impacto |
| :--- | :--- | :--- | :--- |
| **C01** | Interfaz del carrito | Página dedicada `/carrito`, no drawer. Más simple de testear, accesible y compartible. | RF05, RF06 |
| **C02** | CTA individual | Mantener “Consultar por WhatsApp” en el detalle y sumar “Agregar al encargo”. | RF04.6, RF05.1 |
| **C03** | Ítems repetidos | Fusionar solo si coinciden producto, opciones y notas; en ese caso sumar cantidad. Si cambian opciones o notas, crear una línea nueva. | RF05.2 |
| **C04** | Cantidad | Entero entre 1 y 99. Bajar de 1 elimina el ítem. | RF05.3, RF05.4 |
| **C05** | Contador de navbar | Mostrar la suma total de unidades, no la cantidad de líneas. | RF05.11 |
| **C06** | Edición desde el carrito | No editar opciones dentro del carrito. Para cambiarlas, quitar el ítem y volver al detalle. | RF05, UX |
| **C07** | Persistencia | Guardar en `localStorage` con clave versionada `pedacito-encargos-v1`. Sin expiración automática. | RF05.9 |
| **C08** | Datos inválidos | Descartar ítems corruptos o inválidos al cargar; mostrar aviso discreto si se eliminó algo. | RF05.10 |
| **C09** | Revalidación | Al abrir el carrito, releer productos desde el servicio. Actualizar precios y quitar productos u opciones no disponibles. | RF05.7, RF05.8 |
| **C10** | Precio nulo | Si algún ítem no tiene base, mostrar “Precio a confirmar” en la línea y “Total a confirmar por WhatsApp” en el total; no inventar cifras. | RF05.8 |
| **C11** | Total del carrito | Mostrar subtotal por ítem y total general cuando todos los precios sean numéricos. | RF05.7 |
| **C12** | Envío | Mantener el carrito después de abrir WhatsApp. El usuario lo vacía manualmente con confirmación. | RF06 |
| **C13** | Mensaje | Incluir todos los ítems, cantidad, opciones, notas, precio estimado por ítem, total y aclaración del precio final. | RF06.1 |
| **C14** | URL de producto | Incluir la URL absoluta de cada producto en el mensaje. | RF06.1 |
| **C15** | Notas | Recortar a 500 caracteres, aplicar `trim` y enviar texto plano. | RF06 |
| **C16** | WhatsApp faltante | Deshabilitar “Enviar encargo por WhatsApp” y mostrar explicación visible. | RF06.4 |
| **C17** | Carrito vacío | Mostrar estado vacío con CTA “Ver catálogo” y no permitir enviar. | RF05.12, RF06.5 |
| **C18** | Confirmación de vaciado | Pedir confirmación antes de vaciar un carrito con ítems. | RF05.5 |
| **C19** | Accesibilidad | Cantidades con botones “Sumar”/“Restar” etiquetados, foco visible y total anunciado con `aria-live`. | RF05, RNF |
| **C20** | Alcance técnico | Sin Supabase, sin pagos, sin cuentas y sin persistencia de encargos en servidor. | RF05, RF06 |

---

## 2. Flujo propuesto

1. El cliente elige opciones y notas en el detalle.
2. Presiona “Agregar al encargo”.
3. Se crea o actualiza un ítem en `localStorage`.
4. El contador de la navbar se actualiza.
5. En `/carrito`, puede cambiar cantidades, quitar ítems o vaciar.
6. Presiona “Enviar encargo por WhatsApp”.
7. Se abre `wa.me` con el mensaje completo.
8. El carrito permanece hasta que el usuario lo vacíe.

---

## 3. Formato del mensaje propuesto

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

Si no hay opciones: `Opciones: Sin preferencia`.
Si no hay notas: `Notas: Sin notas`.
Si falta algún precio: `Total a confirmar por WhatsApp`.

---

## 4. Riesgos detectados

1. **Datos locales obsoletos:** se mitiga con revalidación contra el servicio al abrir el carrito.
2. **Mensaje demasiado largo:** WhatsApp admite textos largos, pero se mantendrá un formato compacto.
3. **Precios cambiantes:** el total es estimado y se aclara que el final se confirma por WhatsApp.
4. **Producto eliminado entre sesiones:** se quita del carrito y se avisa.
5. **Configuración faltante:** si no hay número de WhatsApp, el envío se deshabilita.

---

## 5. Criterio para avanzar al plan

- Aprobar C01–C20.
- Actualizar `spec.md` con estas decisiones.
- Recién después generar `plan.md` y `tasks.md`.
