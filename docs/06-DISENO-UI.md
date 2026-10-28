# 06 - Diseño de Interfaz de Usuario: Pedacito de Arte

Este documento define la aplicación de la identidad de marca, las pantallas públicas y el panel administrativo.

---

## 1. Tokens de marca

Los colores y tipografías se aplican únicamente mediante tokens. Definición oficial en `docs/IDENTIDAD-MARCA.md`.

| Elemento | Token / clase |
| :--- | :--- |
| Fondo principal | `bg-fondo` |
| Texto principal y títulos | `text-principal` |
| Texto secundario | `text-contraste` |
| Acento principal | `bg-secundario` / `text-secundario` |
| Badges y detalles | `bg-complementario-principal` |
| Foco y estados | `ring-complementario-secundario` |
| Títulos | `font-titulos` |
| Cuerpo y UI | `font-cuerpo` |

Prohibido usar valores hex directamente en componentes.

---

## 2. Componentes base

| Elemento | Uso |
| :--- | :--- |
| Botón primario | “Agregar al encargo”, “Enviar por WhatsApp”, “Publicar”. |
| Botón secundario | Filtros, cancelar, volver. |
| Badge | Categoría, “Destacado”, “Precio a confirmar”. |
| Tarjeta de producto | Imagen, nombre, descripción breve, precio base y CTA. |
| Input | Búsqueda, login, formularios. |
| Toast | Confirmaciones de carrito, guardado y errores. |
| Skeleton | Carga de catálogo y panel. |
| Modal / drawer | Carrito y confirmaciones. |

---

## 3. Pantallas públicas

### Home
- Navbar con logo, navegación y contador de encargos.
- Hero editable desde el CMS.
- Propuesta de valor.
- Productos destacados.
- Sobre Nosotros.
- CTA a WhatsApp.
- Footer editable.

### Catálogo
- Buscador en tiempo real.
- Filtros por las cuatro categorías.
- Grilla responsive: 1 columna móvil, 2 tablet, 3 o 4 escritorio.
- Estado vacío claro cuando no hay resultados.
- Skeletons durante la carga.

### Detalle de producto
- Galería con imagen principal y miniaturas.
- Nombre, categoría, descripción y características.
- Precio base o “Precio a confirmar”.
- Opciones de personalización con precio adicional.
- Campo de notas.
- Botón “Agregar al encargo”.

### Carrito de encargos
- Panel lateral o página dedicada.
- Ítems con imagen, opciones, notas y cantidad.
- Subtotal estimado.
- Aclaración: “El total final se confirma por WhatsApp”.
- Botón “Enviar encargo por WhatsApp”.
- Sin botones de pago.

### Servicios, Contacto y Footer
- Contenido editable desde el CMS.
- Datos de contacto desde configuración.
- Formulario de consulta que arma un mensaje de WhatsApp.

### 404
- Mensaje claro y enlace al catálogo.

---

## 4. Panel administrativo

Rutas:

```text
/admin/login
/admin
/admin/productos
/admin/productos/nuevo
/admin/productos/:id
/admin/categorias
/admin/contenido
/admin/media
/admin/usuarios
/admin/configuracion
```

### Login
Usuario y contraseña. Sin registro público, sin Gmail y sin Supabase Auth.

### Dashboard
Resumen de productos, categorías, imágenes y último acceso.

### Productos
Listado con búsqueda, filtro y estado. Formulario con:
- Datos generales.
- Categoría.
- Precio base.
- Galería ordenable.
- Opciones de personalización.
- Destacado y disponibilidad.
- SEO.

### Categorías
Crear, editar, ordenar y activar/desactivar.

### Contenido
Formularios estructurados para Hero, Valores, Sobre Nosotros, Servicios, Contacto y Footer. Sin HTML libre.

### Media
Biblioteca con subida, recorte, conversión a WebP, miniatura, texto alt y reutilización.

### Usuarios
Solo admin. Crear admin/editor, resetear contraseña, activar/desactivar y cambiar rol.

### Configuración
Solo admin. WhatsApp, email, redes, dirección, horarios y textos legales.

---

## 5. Roles en la interfaz

- El editor ve Productos, Categorías, Contenido y Media.
- El editor no ve botones de eliminar, Usuarios ni Configuración.
- El admin ve todo.
- Si un editor intenta llamar una acción prohibida, el servidor responde `403`.
- Página `403` con mensaje claro.

---

## 6. Estados y responsive

- Mobile first desde 360 px.
- Menú hamburguesa en móvil.
- Botón flotante de WhatsApp.
- Foco visible en todos los controles.
- Contraste verificado.
- Imágenes con `alt` obligatorio.
- Sin texto de relleno.
- Skeletons en cargas y toasts en acciones.
