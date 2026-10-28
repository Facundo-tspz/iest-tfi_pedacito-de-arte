# Pedacito de Arte: Instrucciones para Agentes de IA

**Proyecto:** TFI — sitio web de catálogo y encargos de papelería artesanal.  
**Stack oficial:** React 18 + Vite + React Router + Tailwind CSS + DaisyUI + Supabase (Postgres/Storage) + Netlify/Functions + WhatsApp.

Este archivo es la entrada operativa para cualquier agente de IA. No reemplaza la Constitución ni las reglas detalladas.

---

## 1. Lectura obligatoria antes de actuar

1. `docs/CONSTITUCION.md`
2. `docs/REGLAS-IA.md`
3. `docs/ROADMAP.md`
4. `docs/PROGRESO.md` y `memory.md`
5. `docs/01-CONTEXTO.md` a `docs/10-SEGURIDAD.md`
6. `docs/IDENTIDAD-MARCA.md`
7. La spec activa en `specs/NNN-nombre/`

Si hay contradicciones o falta contexto, detenerse y preguntar antes de escribir código.

---

## 2. Alcance del producto

- Sitio de **catálogo y encargos**, no una tienda con pagos.
- Productos: Agendas, Agendas Docentes, Anotadores y Revistas para Colorear.
- El cliente arma un carrito de encargos y lo envía por WhatsApp.
- No hay pagos, checkout, cuentas de cliente, stock ni historial de pedidos en Fase 1.
- El panel administrativo tiene roles `admin` y `editor`, CMS de secciones y biblioteca de medios.
- La autenticación del panel es propia: usuario y contraseña, sin Supabase Auth ni Gmail.

---

## 3. Reglas de trabajo

- Trabajar **una sola fase** del roadmap y **una sola tarea** por conversación.
- No avanzar sin la palabra **“aprobado”**.
- No escribir código sin spec aprobada.
- Tests primero o junto con el código.
- Revisar cada archivo antes de darlo por terminado.
- Actualizar `docs/PROGRESO.md` y `memory.md` al finalizar cada tarea o fase.
- Registrar prompts importantes y errores reales de la IA en `docs/PROMPTS.md`.
- No hacer commit sin proponer antes archivos y mensaje.
- No hacer push sin aprobación explícita.
- No instalar dependencias, ejecutar migraciones ni desplegar sin aprobación.

---

## 4. Comandos y skills

Comandos disponibles:

- `/spec` — crea la especificación sin código.
- `/clarificar` — revisa la spec como QA y registra decisiones.
- `/plan` — genera plan y tareas verificables.
- `/verificar` — valida RF, tests y build.
- `/cambio` — actualiza la spec ante un requisito nuevo.

Skills propias:

- `verificar-criterios` — comprueba RF con evidencia.
- `auditar-marca` — revisa tokens, tipografías, contraste y accesibilidad.

---

## 5. Reglas de código y diseño

- Código, variables y comentarios en español.
- Componentes React en `PascalCase` y `.jsx`.
- Hooks con prefijo `use`; funciones y variables en `camelCase`.
- Endpoints en `kebab-case`.
- Usar exclusivamente tokens de marca. Prohibido escribir colores hexadecimales en componentes.
- Tipografías: Cormorant Garamond para títulos y Poppins para cuerpo/UI.
- Mobile first desde 360 px, con foco visible, teclado y `alt` descriptivo.
- No usar Bootstrap, Material UI, Angular, Vue, Svelte, Firebase ni MongoDB.
- No usar `localStorage` para secretos.

---

## 6. Seguridad

- Ningún secreto en el repositorio, capturas o chat.
- `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` son las únicas variables públicas de Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` vive solo en Netlify Functions.
- RLS activa en todas las tablas; `anon` solo lee datos públicos.
- Escrituras administrativas solo por Functions con sesión, rol y validación.
- Validar payloads en servidor.
- No enviar datos personales reales a herramientas de IA.
- Archivos permitidos: JPG, PNG y WebP, con límite de tamaño.

---

## 7. Prohibiciones

- Inventar requisitos, precios, textos, datos o resultados.
- Cambiar el stack sin justificación y aprobación.
- Exponer credenciales.
- Borrar archivos o historial sin autorización.
- Avanzar de fase sin aprobación.
- Trabajar en varias fases o tareas al mismo tiempo.
- Implementar pagos, cuentas de cliente o checkout.
- Aceptar código generado sin leerlo y comprenderlo.
- Usar personas reales identificables, marcas o estilos de artistas con nombre propio en imágenes generadas.

---

## 8. Criterio de terminado

Una tarea termina cuando cumple su spec, tiene tests o evidencia, `npm test`, `npm run lint` y `npm run build` pasan, el estudiante revisó y entendió el código, y el progreso quedó actualizado.
