# 07 - Convenciones de Código y Git: Pedacito de Arte

Este documento define nomenclatura, idioma, estructura de commits y flujo de trabajo.

---

## 1. Nomenclatura

| Elemento | Convención | Ejemplo |
| :--- | :--- | :--- |
| Componentes React | `PascalCase.jsx` | `TarjetaProducto.jsx` |
| Páginas | `PascalCase.jsx` | `CatalogPage.jsx` |
| Hooks | `camelCase` con prefijo `use` | `useProductos.js` |
| Servicios | `camelCase.js` | `whatsappService.js` |
| Utilidades | `camelCase.js` | `formatters.js` |
| Variables y funciones | `camelCase` en español | `agregarAlEncargo()` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_IMAGE_SIZE_MB` |
| Endpoints | `kebab-case` | `/api/admin/productos` |
| Tablas y campos SQL | `snake_case` | `precio_base` |
| Componentes de admin | `PascalCase` | `ProductoFormPage.jsx` |
| Specs | `NNN-nombre` | `003-panel-admin` |

---

## 2. Idioma

- Código, nombres de variables y comentarios en español.
- Los comentarios explican el por qué, no lo obvio.
- Los textos visibles se revisan y no se dejan como relleno.
- Los mensajes de error deben ser claros para el usuario.

---

## 3. Estructura de código

- Componentes de presentación sin lógica de datos pesada.
- Consultas a Supabase en `src/services/` o `src/lib/`.
- Lógica reutilizable en hooks.
- Validaciones compartidas y validación de servidor con `zod`.
- Sin `service_role` en `src/`.
- Sin colores hex en componentes.
- Sin `localStorage` para secretos.

---

## 4. Specs y tareas

- Cada funcionalidad vive en `specs/NNN-nombre/`.
- `spec.md` usa notación EARS.
- `tasks.md` tiene tareas de menos de 30 minutos y un “Listo cuando” verificable.
- No se implementa una tarea sin estar aprobada.
- Cada tarea se relaciona con al menos un RF o criterio de aceptación.

---

## 5. Git y commits

Formato:

```text
<tipo>(<módulo>): <descripción breve en presente y minúsculas>
```

Tipos permitidos:

- `feat`: nueva funcionalidad.
- `fix`: corrección.
- `docs`: documentación.
- `style`: estilos sin lógica.
- `refactor`: reestructuración.
- `test`: tests.
- `chore`: configuración o mantenimiento.

Ejemplos:

```text
docs(f0): crea constitucion y arnes del proyecto
feat(catalogo): agrega filtros por categoria
fix(carrito): corrige calculo de total estimado
test(admin): verifica rechazo de editor sin permisos
```

### Regla de commit

Antes de cada commit:

1. Mostrar `git status`.
2. Indicar archivos incluidos.
3. Proponer el mensaje.
4. Esperar aprobación.
5. Commitear solo lo correspondiente a la tarea.
6. No hacer push sin nueva aprobación.

---

## 6. Ramas

- `main`: producción y deploy en Netlify.
- `develop`: integración, si se usa.
- `feature/<nombre-tarea>`: ramas temporales.

El repositorio debe mantener historial de commits por tarea, como exige el TFI.

---

## 7. Variables de entorno

Públicas:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`

Privadas:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

No se commitea `.env`, `.env.local` ni claves.

---

## 8. Calidad

Antes de cerrar una tarea:

```text
npm test
npm run lint
npm run build
```

Los tres deben pasar. Si no existen todavía, se indica en la verificación de la fase.
