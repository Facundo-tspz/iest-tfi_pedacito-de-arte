# 11 - Cambios y Justificaciones: Pedacito de Arte

- **Estado:** Activo — se actualiza al cerrar cada fase.
- **Última actualización:** 2026-11-02
- **Objetivo:** registrar tecnologías, dependencias, cambios de datos y decisiones estructurales que se incorporan al proyecto, con su justificación, alternativas e impacto.

> Este documento se completa a medida que avanza el roadmap. No reemplaza a `docs/PROGRESO.md` ni a las specs.

---

## 1. Tecnologías y dependencias

| Fecha | Fase | Tecnología | Versión | Motivo | Alternativas evaluadas | Impacto | Aprobación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-11-02 | F4 | `react-easy-crop` | 6.2.4 | Recorte de imágenes en la biblioteca de medios. | Se evaluó un recorte propio; se descartó por tiempo y accesibilidad. | Dependencia de UI para el panel. | Aprobado por el estudiante. | Instalado en F4. |
| 2026-11-02 | F4 | `@supabase/supabase-js` | 2.58.0 | Cliente público de Supabase y Functions administrativas. | Evaluado como dependencia oficial del stack. | Agrega cliente JS y bundle de Functions. | Aprobado por el estudiante. | Instalado en F4. |
| 2026-10-30 | F2 | `react-helmet-async` | 3.0.0 | Metadatos por ruta (title, description, canonical y Open Graph) en una SPA con React 18. Ya previsto en `docs/03-TECNOLOGIAS.md` y `docs/09-SEO.md`. | Hook propio `useSEO` con `useEffect`; se descarta para no reimplementar deduplicación y actualizaciones asíncronas. | Nueva dependencia; requiere `HelmetProvider`; impacto pequeño en el bundle. | Aprobado por el estudiante (C03). | Instalado en F2 (T01). |

---

## 2. Cambios de modelo de datos

| Fecha | Fase | Tabla | Cambio | Motivo | Impacto | Aprobación | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-30 | F4 | `productos` | Agregar `caracteristicas text[] NOT NULL DEFAULT '{}'`. | RF04.1 exige mostrar características y hoy no existe un campo para eso. | El mock de F2 usa `caracteristicas: string[]`; el admin de F4 debe permitir editar una lista. | Aprobado por el estudiante (C02). | Reflejado en `docs/05-DATOS.md`; pendiente de implementar en el esquema de F4. |
| 2026-11-02 | F4 | `productos` | Agregar `precio_mayorista`, `cantidad_minima_mayorista` y `precio_desde`. | Los productos reales tienen precio minorista y mayorista, y la Agenda Personalizada se muestra “desde”. | El catálogo público debe mostrar “Consultar precio mayorista” cuando no haya valor. | Aprobado por el estudiante. | Reflejado en `docs/05-DATOS.md` y migraciones. |
| 2026-11-02 | F4 | `categorias` | “Revistas para Colorear” pasa a “Para colorear”. | Unifica revistas, libros para colorear y futuros productos como mandalas. | Cambia el nombre y slug de la cuarta categoría. | Aprobado por el estudiante (C21). | Reflejado en docs, spec y seed. |

---

## 3. Cambios de configuración

| Fecha | Fase | Cambio | Motivo | Impacto | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-10-30 | F2 | Agregar `VITE_WHATSAPP`, `VITE_SITE_URL`, `VITE_INSTAGRAM` y `VITE_EMAIL` a `.env.example`. | Evitar hardcodear el contacto, el dominio y las redes en componentes. | Requiere cargar los valores en `.env.local` y en Netlify. | Aprobado (C18); implementado en F2 (T02). |

---

## 4. Pendientes

- Completar la justificación final al cerrar F2.
- Revisar este documento al cerrar cada fase y agregar los cambios que correspondan.
