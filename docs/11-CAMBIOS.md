# 11 - Cambios y Justificaciones: Pedacito de Arte

- **Estado:** Provisional — aprobado por el estudiante (2026-10-30); se completa al cerrar F2.
- **Última actualización:** 2026-10-30
- **Objetivo:** registrar tecnologías, dependencias, cambios de datos y decisiones estructurales que se incorporan al proyecto, con su justificación, alternativas e impacto.

> Este documento se completa a medida que avanza el roadmap. No reemplaza a `docs/PROGRESO.md` ni a las specs.

---

## 1. Tecnologías y dependencias

| Fecha | Fase | Tecnología | Versión | Motivo | Alternativas evaluadas | Impacto | Aprobación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-30 | F2 | `react-helmet-async` | 3.0.0 | Metadatos por ruta (title, description, canonical y Open Graph) en una SPA con React 18. Ya previsto en `docs/03-TECNOLOGIAS.md` y `docs/09-SEO.md`. | Hook propio `useSEO` con `useEffect`; se descarta para no reimplementar deduplicación y actualizaciones asíncronas. | Nueva dependencia; requiere `HelmetProvider`; impacto pequeño en el bundle. | Aprobado por el estudiante (C03). | Instalado en F2 (T01). |

---

## 2. Cambios de modelo de datos

| Fecha | Fase | Tabla | Cambio | Motivo | Impacto | Aprobación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-30 | F4 | `productos` | Agregar `caracteristicas text[] NOT NULL DEFAULT '{}'`. | RF04.1 exige mostrar características y hoy no existe un campo para eso. | El mock de F2 usa `caracteristicas: string[]`; el admin de F4 debe permitir editar una lista. | Aprobado por el estudiante (C02). | Reflejado en `docs/05-DATOS.md`; pendiente de implementar en el esquema de F4. |

---

## 3. Cambios de configuración

| Fecha | Fase | Cambio | Motivo | Impacto | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-30 | F2 | Agregar `VITE_WHATSAPP`, `VITE_SITE_URL`, `VITE_INSTAGRAM` y `VITE_EMAIL` a `.env.example`. | Evitar hardcodear el contacto, el dominio y las redes en componentes. | Requiere cargar los valores en `.env.local` y en Netlify. | Aprobado (C18); implementado en F2 (T02). |

---

## 4. Pendientes

- Completar la justificación final al cerrar F2.
- Revisar este documento al cerrar cada fase y agregar los cambios que correspondan.
