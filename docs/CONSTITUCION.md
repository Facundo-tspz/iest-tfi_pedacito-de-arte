# Constitución del Proyecto: Pedacito de Arte

Este documento rige todo el desarrollo del Trabajo Final Integrador. Cualquier agente de IA debe leerlo antes de crear una especificación, un plan, una tarea o código.

---

## Principios obligatorios

### 1. La especificación precede al código

Ninguna funcionalidad se implementa sin una spec aprobada en `specs/NNN-nombre/spec.md`, con requisitos en notación EARS, casos límite, fuera de alcance y criterios de finalización. Si el requisito cambia, primero se actualiza la spec y después el código.

**Comprobación:** no existe código de una funcionalidad sin su carpeta `specs/NNN-nombre/` aprobada.

### 2. Una sola fase y una sola tarea por vez

El trabajo avanza según `docs/ROADMAP.md`. No se trabaja en dos fases al mismo tiempo ni se adelantan tareas de una fase futura. Cada fase termina con una pausa explícita y requiere la palabra **“aprobado”** del estudiante para continuar.

**Comprobación:** el estado de `docs/PROGRESO.md` indica una única fase activa y la fase siguiente no tiene cambios iniciados.

### 3. Stack y arquitectura fijos

El stack oficial es React 18 + Vite + JavaScript/JSX, React Router, Tailwind CSS 3 + DaisyUI 4, Supabase Postgres + Storage, Netlify + Netlify Functions y enlaces de WhatsApp. Cualquier cambio de stack debe justificarse en `docs/03-TECNOLOGIAS.md`, registrarse en `docs/PROGRESO.md` y aprobarse antes de implementarse.

**Comprobación:** `package.json`, la estructura de carpetas y la documentación coinciden con el stack declarado.

### 4. Identidad visual desde tokens

Todos los colores, tipografías, radios y sombras provienen de variables CSS y del tema de Tailwind definido en `docs/IDENTIDAD-MARCA.md`. Se prohíben los colores hexadecimales escritos a mano en componentes, estilos o HTML.

**Comprobación:** una búsqueda de colores hex en `src/` no devuelve valores sueltos; solo aparecen en el archivo de tokens.

### 5. Seguridad y privacidad por defecto

Ningún secreto se escribe en el repositorio, en capturas ni en el chat. La `service_role` de Supabase vive únicamente en variables de entorno de Netlify Functions. Las tablas públicas usan RLS de solo lectura. Los formularios y payloads se validan en el servidor. Nunca se envían datos personales reales a herramientas de IA generativa.

**Comprobación:** `.env.local` está ignorado; no hay claves en el historial; `anon` no puede escribir; las Functions validan sesión, rol y datos.

### 6. Calidad verificable

Cada tarea se implementa con tests primero o junto con el código. `npm test`, `npm run lint` y `npm run build` deben pasar antes de cerrar una tarea. Cada requerimiento funcional debe tener evidencia en `verificacion.md` y en el historial de commits.

**Comprobación:** la matriz RF → evidencia → estado está completa y los comandos de calidad pasan sin errores.

### 7. Accesibilidad, responsividad y SEO

La interfaz se construye mobile first desde 360 px, con contraste suficiente, navegación por teclado, etiquetas `alt` descriptivas, jerarquía correcta de encabezados y metadatos por página. El objetivo mínimo es Lighthouse de 80 puntos en Rendimiento, Accesibilidad, Buenas prácticas y SEO.

**Comprobación:** informe Lighthouse adjunto y recorrido manual con teclado en las pantallas principales.

### 8. Uso responsable y transparente de la IA

Toda pieza generada con IA se identifica como “Generado con IA” y se registra en `multimedia/FICHAS-IA.md`. No se generan personas reales identificables, marcas registradas, personajes protegidos ni estilos de artistas con nombre propio. Se verifican licencias, se revisan sesgos, se documentan los errores de la IA en `docs/PROMPTS.md` y ninguna sugerencia se acepta sin revisión y comprensión humana.

**Comprobación:** declaración de IA firmada, fichas completas, prompts sin datos personales y al menos tres errores de IA documentados con su corrección.

---

## Regla de conflicto

Si una orden del estudiante contradice esta Constitución, el agente debe detenerse, señalar el conflicto y pedir una decisión antes de modificar código o documentación estructural.
