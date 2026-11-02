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

Rutas base: `/estudio`. Se evita `/admin` y `/panel`.

```text
/estudio/login
/estudio
/estudio/productos
/estudio/productos/nuevo
/estudio/productos/:id
/estudio/categorias
/estudio/media
/estudio/contenido
/estudio/usuarios
/estudio/configuracion
/estudio/sin-permiso
```

### Login
Usuario y contraseña. Sin registro público, sin Gmail y sin Supabase Auth.

Diseño de pantalla partida:
- Izquierda: fondo `principal`, logo, nombre de marca y frase breve.
- Derecha: formulario blanco con usuario, contraseña y botón “Ingresar”.
- En móvil se apila: marca compacta arriba y formulario abajo.
- Sin “recordarme”, sin recuperación por email y con error genérico.

### Layout
- Sidebar fijo a la izquierda con navegación vertical.
- Contenido a la derecha con barra superior y `h1` de la sección.
- El título de la sección aparece en el ítem activo del sidebar, en la barra superior y en el contenido.
- El ítem activo se marca con barra izquierda dorada, fondo dorado suave y texto/icono en `complementario-principal`.
- Iconos SVG pequeños propios, sin librería externa.
- Barra superior: título de sección a la izquierda, usuario y “Salir” a la derecha.

### Responsive
- Escritorio `lg`: sidebar expandido de ~260 px con icono y texto.
- Tablet `md`: rail compacto de ~72 px solo con iconos, `aria-label` y tooltip.
- Móvil: drawer lateral con iconos y texto, abierto desde la barra superior; el contenido usa todo el ancho.
- No se usa un rail de solo iconos en 360 px para no reducir el espacio de tablas y formularios.

### Estética
- Sidebar: `bg-principal`, texto `blanco`.
- Contenido: `bg-blanco`, títulos `text-principal` y lectura `text-contraste`.
- Acentos: `complementario-principal` para activo y `complementario-secundario` para acciones secundarias.
- Tablas con encabezado `bg-fondo/60` y bordes `contraste/10` o `contraste/15`.
- Sin negro puro; se usa `contraste` para reducir fatiga visual.

### Dashboard
Resumen de productos, categorías, imágenes y último acceso, con accesos rápidos.

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

- El editor ve Dashboard, Productos, Categorías, Medios y Contenido.
- El editor no ve botones de eliminar, Usuarios ni Configuración.
- El admin ve todo.
- Si un editor intenta llamar una acción prohibida, el servidor responde `403`.
- Página `403` en `/estudio/sin-permiso` con mensaje claro.

---

## 6. Estados y responsive

- Mobile first desde 360 px.
- Menú hamburguesa en el sitio público.
- Panel admin: sidebar expandido en escritorio, rail de iconos en tablet y drawer en móvil.
- Botón flotante de WhatsApp.
- Foco visible en todos los controles.
- Contraste verificado.
- Imágenes con `alt` obligatorio.
- Sin texto de relleno.
- Skeletons en cargas y toasts en acciones.
