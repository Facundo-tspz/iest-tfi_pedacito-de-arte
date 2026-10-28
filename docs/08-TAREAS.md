# 08 - Plan de Tareas: Pedacito de Arte

Este documento operacionaliza `docs/ROADMAP.md`. Las tareas se ejecutan de a una y no se avanza sin aprobación.

---

## F0 — Constitución, arnés y documentación

- [x] Crear `docs/CONSTITUCION.md`.
- [x] Crear `docs/ROADMAP.md` con la regla de una fase por vez.
- [x] Crear `docs/REGLAS-IA.md`.
- [x] Crear `docs/PROGRESO.md` y `memory.md`.
- [x] Crear `docs/PROMPTS.md` y `docs/DECLARACION-IA.md`.
- [x] Crear comandos `/spec`, `/clarificar`, `/plan`, `/verificar` y `/cambio`.
- [x] Crear skills `verificar-criterios` y `auditar-marca`.
- [x] Actualizar `AGENTS.md`, `CLAUDE.md`, `README.md` y `.gitignore`.
- [x] Actualizar los documentos 01 a 10.
- [x] Inicializar Git y configurar el remoto.
- [ ] Aprobar el commit de F0.

---

## F1 — Base técnica

- [ ] Crear `package.json` y fijar versiones.
- [ ] Instalar React, Vite, React Router, Tailwind, DaisyUI y dependencias aprobadas.
- [ ] Configurar tokens de marca y fuentes.
- [ ] Normalizar logo y favicon en `public/marca/`.
- [ ] Crear layout base, router y página 404.
- [ ] Configurar Vitest, ESLint y Prettier.
- [ ] Crear `netlify.toml` y `.env.example`.
- [ ] Verificar `npm test`, `npm run lint` y `npm run build`.
- [ ] Aprobar F1.

---

## F2 — Spec 001: Home + Catálogo

- [ ] `/spec` de `001-catalogo`.
- [ ] `/clarificar` y resolver hallazgos.
- [ ] `/plan` y `tasks.md`.
- [ ] Implementar Home.
- [ ] Implementar catálogo y filtros.
- [ ] Implementar búsqueda.
- [ ] Implementar detalle y opciones.
- [ ] Tests y validación.
- [ ] `/verificar` y aprobación.

---

## F3 — Spec 002: Carrito de encargos + WhatsApp

- [ ] `/spec` de `002-carrito-whatsapp`.
- [ ] `/clarificar`.
- [ ] `/plan` y `tasks.md`.
- [ ] Implementar carrito y persistencia local.
- [ ] Implementar cálculo de total estimado.
- [ ] Implementar mensaje y enlace de WhatsApp.
- [ ] Tests y validación.
- [ ] `/verificar` y aprobación.

---

## F4 — Spec 003: Panel admin + CMS

### 4.1 Auth, roles y usuarios
- [ ] Crear tablas y políticas.
- [ ] Implementar login, logout y sesión.
- [ ] Implementar RBAC en Functions.
- [ ] Implementar gestión de usuarios.
- [ ] Tests y aprobación.

### 4.2 Medios
- [ ] Biblioteca de medios.
- [ ] Subida con URL firmada.
- [ ] Recorte y conversión WebP.
- [ ] Miniaturas y alt.
- [ ] Tests y aprobación.

### 4.3 Productos, categorías y opciones
- [ ] CRUD de productos.
- [ ] CRUD de categorías.
- [ ] Opciones y precios extra.
- [ ] Galería ordenable.
- [ ] Publicación y destacados.
- [ ] Tests y aprobación.

### 4.4 CMS y configuración
- [ ] Editor de secciones.
- [ ] Configuración del sitio.
- [ ] Integración con páginas públicas.
- [ ] Tests y aprobación.

---

## F5 — Multimedia con IA

- [ ] Definir matriz de herramientas.
- [ ] Generar y seleccionar 8 imágenes.
- [ ] Producir video promocional.
- [ ] Producir video demo.
- [ ] Crear infografía SDD.
- [ ] Crear 3 gráficos con datos reales.
- [ ] Completar `FICHAS-IA.md`.
- [ ] Revisar realismo, sesgos y licencias.
- [ ] Aprobar F5.

---

## F6 — QA, deploy, informe y defensa

- [ ] Ejecutar tests y build final.
- [ ] Verificar RLS con `anon`.
- [ ] Ejecutar Lighthouse y corregir.
- [ ] Publicar en Netlify.
- [ ] Verificar rutas SPA y `/api/*`.
- [ ] Redactar informe.
- [ ] Crear guion de defensa y demo.
- [ ] Crear `ENLACES.md`.
- [ ] Aprobar entrega.

---

## Regla de ejecución

Cada casilla se marca solo con evidencia. No se marcan tareas por intención. Al terminar una fase, el agente actualiza `docs/PROGRESO.md` y se detiene.
