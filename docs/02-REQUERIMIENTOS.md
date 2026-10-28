# 02 - Requerimientos del Sistema: Pedacito de Arte

Este documento define los requerimientos funcionales (RF) y no funcionales (RNF) del sitio y del panel administrativo.

---

## 1. Requerimientos funcionales

| ID | Requerimiento | Descripción | Prioridad |
| :--- | :--- | :--- | :--- |
| **RF01** | Catálogo público | Mostrar productos con imagen, nombre, descripción, categoría y precio base o “Precio a confirmar”. | Alta |
| **RF02** | Filtrado por categoría | Permitir filtrar por Agendas, Agendas Docentes, Anotadores y Revistas para Colorear. | Alta |
| **RF03** | Búsqueda | Buscar productos por nombre, categoría, código o temática. | Media |
| **RF04** | Detalle y personalización | Mostrar galería, características y opciones de personalización con precio adicional cuando corresponda. | Alta |
| **RF05** | Carrito de encargos | Agregar, modificar cantidad y quitar productos; conservar opciones y notas; calcular total estimado. | Alta |
| **RF06** | Envío por WhatsApp | Generar un mensaje estructurado con el resumen del encargo y abrir el WhatsApp del taller. | Alta |
| **RF07** | Servicios y contenido | Mostrar páginas de Servicios, Sobre Nosotros y Contacto con contenido editable. | Media |
| **RF08** | Consulta personalizada | Permitir iniciar una consulta especial por WhatsApp con los datos ingresados por el usuario. | Media |
| **RF09** | Autenticación administrativa | Login propio con usuario y contraseña, sin Supabase Auth ni Gmail, con sesión segura y roles. | Alta |
| **RF10** | Gestión de productos y categorías | Crear, editar, publicar, ordenar y cambiar disponibilidad de productos, categorías y opciones. | Alta |
| **RF11** | Biblioteca de medios | Subir, recortar, convertir a WebP, almacenar y reutilizar imágenes con texto alternativo. | Alta |
| **RF12** | CMS de secciones | Editar textos e imágenes de Home, Servicios, Contacto y Footer desde el panel. | Alta |
| **RF13** | Gestión de usuarios | El admin crea y edita usuarios admin/editor, resetea contraseñas y desactiva cuentas. | Alta |

### Reglas de negocio asociadas

- **RN01:** la web no procesa pagos; el total es estimado y se confirma por WhatsApp.
- **RN02:** no existen cuentas de cliente ni historial de pedidos en Fase 1.
- **RN03:** el editor no puede eliminar productos, categorías, medios ni usuarios.
- **RN04:** el editor no puede modificar configuración crítica ni gestionar usuarios.
- **RN05:** un producto sin precio cargado muestra “Precio a confirmar”, nunca `$0`.

---

## 2. Requerimientos no funcionales

- **RNF01 — Responsive:** mobile first desde 360 px, tablet y escritorio.
- **RNF02 — Rendimiento:** Lighthouse ≥80 en Rendimiento y carga optimizada con WebP.
- **RNF03 — Identidad visual:** solo tokens de marca; sin colores hardcodeados.
- **RNF04 — Accesibilidad:** contraste, foco visible, teclado, jerarquía de encabezados y `alt` descriptivo.
- **RNF05 — Publicación:** Netlify con HTTPS y deploy desde GitHub; Supabase como base de datos y Storage.
- **RNF06 — Calidad:** tests automáticos, `npm run lint` y `npm run build` sin errores.
- **RNF07 — Seguridad:** RLS, secretos fuera del cliente, `service_role` solo en Functions, validación de payloads.
- **RNF08 — SEO:** títulos y descripciones por página, Open Graph, sitemap, robots y `noindex` en admin.
- **RNF09 — Modelo de encargos:** sin pagos, checkout, stock, cuentas de cliente ni persistencia de pedidos.
- **RNF10 — Mantenibilidad:** código modular, nombres en español y documentación actualizada.

---

## 3. Historias de usuario

### HU-01 — Catálogo y encargo

> **Como** cliente interesado en papelería artesanal,  
> **quiero** ver los productos, personalizarlos y enviar mi encargo por WhatsApp,  
> **para** no tener que escribir la lista manualmente ni consultar precio por precio.

**Criterios de aceptación:**

- [ ] El catálogo muestra las cuatro categorías y permite filtrar.
- [ ] El detalle muestra imágenes, características y opciones.
- [ ] “Agregar al encargo” incrementa el contador del carrito.
- [ ] El carrito permite cambiar cantidades y eliminar ítems.
- [ ] El total se muestra como estimado y se aclara que se confirma por WhatsApp.
- [ ] “Enviar encargo por WhatsApp” abre el chat con el mensaje formateado.

### HU-02 — Administración de productos

> **Como** editor,  
> **quiero** crear y publicar productos con imágenes, características y precios,  
> **para** mantener el catálogo actualizado sin tocar código.

**Criterios de aceptación:**

- [ ] Puedo iniciar sesión con usuario y contraseña.
- [ ] Puedo crear un producto, subir y recortar imágenes, y publicarlo.
- [ ] Puedo editar categorías, opciones y precios.
- [ ] No puedo eliminar productos ni acceder a usuarios o configuración crítica.
- [ ] Los cambios se reflejan en el sitio público.

### HU-03 — Gestión de usuarios

> **Como** admin,  
> **quiero** crear editores, resetear contraseñas y desactivar cuentas,  
> **para** controlar quién puede administrar el sitio.

**Criterios de aceptación:**

- [ ] Puedo crear un usuario con rol admin o editor.
- [ ] Puedo resetear una contraseña sin enviar email.
- [ ] Al desactivar un usuario, su sesión deja de ser válida.
- [ ] No puedo eliminar al último admin activo.

---

## 4. Fuera de alcance

- Pagos en línea, seña o Mercado Pago.
- Login de clientes.
- Stock e inventario.
- Historial de encargos.
- Envíos automáticos.
- Facturación.
- Múltiples idiomas.
