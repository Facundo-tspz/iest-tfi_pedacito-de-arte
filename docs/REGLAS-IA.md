# Reglas para Agentes de IA: Pedacito de Arte

Estas reglas complementan `AGENTS.md` y `docs/CONSTITUCION.md`. Son obligatorias para cualquier agente que trabaje en este repositorio.

---

## 1. Lectura obligatoria antes de actuar

Leer en este orden:

1. `AGENTS.md`
2. `docs/CONSTITUCION.md`
3. `docs/REGLAS-IA.md`
4. `docs/ROADMAP.md`
5. `docs/PROGRESO.md` y `memory.md`
6. `docs/01-CONTEXTO.md` a `docs/10-SEGURIDAD.md`
7. La spec activa en `specs/NNN-nombre/`

Si falta contexto o hay contradicciones, detenerse y preguntar antes de escribir código.

---

## 2. Reglas de trabajo

- Trabajar **una sola fase** del roadmap y **una sola tarea** por conversación.
- No adelantar archivos, código ni decisiones de fases futuras.
- No escribir código sin una spec aprobada.
- No modificar la spec para “hacer que entre” el código. Si el requisito cambia, actualizar primero la spec.
- Antes de implementar, presentar el plan de la tarea y esperar aprobación cuando corresponda.
- Implementar con tests primero o junto con el código.
- Revisar cada archivo antes de darlo por terminado.
- Actualizar `docs/PROGRESO.md` y `memory.md` al finalizar cada tarea o fase.
- Registrar en `docs/PROMPTS.md` los prompts importantes y, como mínimo, tres errores de la IA con su detección y corrección.
- No ejecutar comandos destructivos, instalaciones, migraciones ni despliegues sin aprobación.
- No hacer commit sin proponer antes archivos y mensaje. No hacer push sin aprobación explícita.

---

## 3. Reglas de código

- Código, nombres de variables y comentarios en español.
- Componentes React en `PascalCase` y extensión `.jsx`.
- Hooks con prefijo `use`, funciones y variables en `camelCase`.
- Constantes globales en `UPPER_SNAKE_CASE`.
- Endpoints en `kebab-case`.
- No agregar comentarios obvios; solo explicar decisiones complejas.
- No instalar dependencias sin justificarlas y recibir aprobación.
- No usar librerías de estilos distintas de Tailwind + DaisyUI.
- No usar `localStorage` para secretos, tokens de admin ni datos sensibles.
- No hardcodear precios, textos de contacto ni el número de WhatsApp: se leen de configuración.
- No hardcodear colores ni tipografías: usar tokens de marca.
- No usar `innerHTML` con contenido generado por usuarios.

---

## 4. Reglas de seguridad y datos

- Nunca escribir claves, contraseñas, tokens ni cadenas de conexión en el repositorio, capturas o chat.
- La `SUPABASE_SERVICE_ROLE_KEY` solo puede existir en el entorno de Netlify Functions.
- El frontend público usa únicamente `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Toda tabla pública debe tener RLS y políticas de solo lectura para `anon`.
- Toda escritura administrativa pasa por Functions y valida sesión, rol y payload.
- Validar formularios y payloads en el servidor, no solo en el navegador.
- No registrar datos personales en logs.
- No incluir datos reales de clientes, contraseñas, API keys ni información privada en prompts de IA.
- Rechazar archivos subidos que no sean JPG, PNG o WebP, y aplicar límites de tamaño.

---

## 5. Reglas de contenido e IA generativa

- Identificar toda pieza generada con IA con la leyenda “Generado con IA”.
- Registrar cada pieza en `multimedia/FICHAS-IA.md` con herramienta, prompt, iteraciones, edición humana, licencia y uso.
- No generar personas reales identificables ni deepfakes.
- No imitar marcas, logos, personajes protegidos ni estilos de artistas con nombre propio.
- Verificar las licencias y condiciones de uso comercial de cada herramienta.
- Revisar sesgos y documentar al menos una corrección realizada.
- Planificar los prompts antes de generar en cantidad y registrar piezas generadas vs. utilizadas.
- No inventar datos para gráficos, métricas, commits, tareas ni resultados de tests.
- No publicar textos de relleno. El contenido provisional debe estar marcado y reemplazarse antes de la entrega.

---

## 6. Prohibiciones absolutas

- Inventar requisitos, precios, funcionalidades o resultados.
- Cambiar el stack sin justificación y aprobación.
- Exponer secretos o credenciales.
- Borrar archivos, tablas o historial sin autorización.
- Ejecutar `git push`, `git reset --hard`, migraciones o despliegues sin aprobación.
- Instalar skills externas sin leerlas completas.
- Aceptar código generado sin revisarlo y comprenderlo.
- Avanzar de fase sin la palabra “aprobado”.
- Trabajar en varias fases o tareas al mismo tiempo.
- Usar colores hardcodeados o tipografías fuera de la identidad de marca.
- Implementar pagos, cuentas de cliente o checkout: la web es solo de encargos por WhatsApp.

---

## 7. Definición de terminado

Una tarea está terminada cuando:

1. Cumple el requisito y los criterios de aceptación de la spec.
2. Tiene tests o evidencia de verificación.
3. `npm test`, `npm run lint` y `npm run build` pasan.
4. El estudiante revisó y entendió los cambios.
5. `docs/PROGRESO.md` y `memory.md` están actualizados.
6. El mensaje de commit fue aprobado y el commit se realizó.

Una fase está terminada cuando todas sus tareas cumplen lo anterior y existe un informe de validación.

---

## 8. Protocolo ante errores de la IA

Cuando una respuesta, comando o implementación de la IA sea incorrecta:

1. Detenerse.
2. Explicar qué se hizo mal.
3. Indicar cómo se detectó.
4. Proponer la corrección.
5. Aplicar la corrección con aprobación.
6. Registrar el caso en `docs/PROMPTS.md`.

No ocultar errores ni “arreglarlos” cambiando la spec sin autorización.

---

## 9. Protocolo de commit

Antes de cada commit:

1. Mostrar `git status` y los archivos afectados.
2. Proponer un mensaje con formato Conventional Commits.
3. Esperar aprobación.
4. Hacer el commit solo con los archivos de la tarea.
5. No hacer push sin una nueva aprobación.

Formato:

```text
<tipo>(<módulo>): <descripción breve en presente y minúsculas>
```

Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
