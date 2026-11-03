# Prompts del Hero — F5

- **Proyecto:** Pedacito de Arte
- **Fase:** F5 — Producción multimedia con IA
- **Pieza:** fondo maestro del hero y composición de productos
- **Herramienta:** ChatGPT con generación de imágenes
- **Fecha de registro:** 2026-11-02
- **Estado:** fondo generado y validado visualmente; composiciones de producto en producción

---

## 1. Objetivo de la pieza

Crear un fondo horizontal para el hero del sitio y reutilizarlo en las diapositivas del carrusel de productos destacados. El fondo debe permitir superponer el texto del hero y montar fotografías reales de los productos sin que se note un cambio de perspectiva, iluminación o escala.

La pieza se apoya en dos prompts:

1. **Prompt de fondo:** genera una superficie vacía, cenital y armónica con la identidad de marca.
2. **Prompt de composición:** integra la foto real de cada producto sobre ese fondo.

El producto no se genera con IA. Se conserva la fotografía real y la IA se usa para el fondo, la integración y la iluminación.

---

## 2. Prompt del fondo

```text
Create a photorealistic editorial-style website hero background, perfectly top-down flat lay, 90 degrees overhead view, wide horizontal 16:9 landscape format. An empty artisan workshop surface made of light oak or warm cream linen, filling the entire frame with no table edge and no wall. Soft, diffused natural daylight from the upper left, gentle realistic shadows, 50mm lens, f/5.6. The left 45% of the frame must be calm, uncluttered negative space for website text. The right-center 50% must be a clean, empty surface reserved for product compositing. The top-right corner must remain visually calm and slightly darker for white text legibility. Subtle props only at the far edges: a roll of kraft paper, a small ceramic cup, a few dried stems, a paintbrush, loose cream sheets. Brand palette accents: midnight blue (#264653), warm mustard (#E9C46A), coral (#E76F51), muted teal (#2A9D8F), chocolate brown (#5F4A39). Keep an 8-10% empty safety margin around all edges. Do not include text, typography, letters, logo, watermark, people, hands, faces, agendas, notebooks, books, stationery products, clutter, harsh flash, hard shadows, neon colors, oversaturation, cartoon style, illustration, 3D render, low resolution, distorted perspective, brand names, copyrighted characters, or extra fingers. Natural color grading, realistic materials, no CGI look, one single image only.
```

### 2.1. Fundamentación del prompt de fondo

- **Formato 16:9:** coincide con la proporción horizontal del hero y con el recorte esperado para escritorio. El sitio usa `object-cover`, por eso se reserva un margen de seguridad del 8–10 %.
- **Vista cenital de 90°:** las fotos de producto fueron tomadas desde arriba. Generar el fondo con la misma perspectiva evita que los productos parezcan parados sobre una mesa frontal o pegados sobre una pared.
- **Superficie sin borde ni pared:** una mesa frontal con borde inferior genera una línea de horizonte incompatible con las fotos cenitales. Al llenar todo el encuadre con la superficie, el montaje mantiene una perspectiva coherente.
- **45 % izquierdo libre:** el hero superpone título, descripción y CTA sobre el sector izquierdo. Ese espacio debe quedar limpio para que el texto tenga contraste y no compita con objetos.
- **Centro-derecha reservado:** allí se monta el producto real. La zona debe estar vacía en el fondo para evitar duplicaciones o elementos que interfieran con la silueta.
- **Superior derecho tranquilo:** el `h1` del hero se ubica en esa área y usa texto blanco. Por eso el fondo debe ser visualmente simple y ligeramente más oscuro.
- **Luz natural desde arriba-izquierda:** define una dirección de luz única. La composición del producto debe respetar esa dirección para que la sombra y el brillo sean coherentes.
- **Paleta de marca:** los acentos retoman los tokens de `docs/IDENTIDAD-MARCA.md` sin convertir el fondo en una pieza saturada. La base crema y la madera clara sostienen el protagonismo del producto.
- **Props solo en los bordes:** el papel kraft, la taza, las ramas secas y el pincel aportan contexto artesanal sin invadir las zonas de texto o producto.
- **Exclusiones explícitas:** se prohíben textos, logos, personas, manos, productos y personajes protegidos para evitar alucinaciones, problemas de derechos y elementos que arruinen el montaje.
- **Realismo fotográfico:** se pide materialidad, luz suave y grano natural para que el fondo no parezca una ilustración ni un render 3D.

---

## 3. Prompt de composición

```text
Composite the provided real product photo onto the empty right-center area of the background. The product was photographed from directly above, so match the top-down flat-lay perspective. Preserve the exact product shape, cover design, printed text, colors, proportions, elastic band, metal eyelets, and page edges. Place it at a realistic scale, fully resting on the table, not floating. Add a soft, realistic contact shadow toward the lower right, consistent with soft natural light coming from the upper left. Keep the left 45% clear and keep the top-right corner clear. Do not redraw, redesign, sharpen, or invent product details. Do not add text, logos, people, hands, or extra products. Photorealistic, wide horizontal 16:9.
```

### 3.1. Fundamentación del prompt de composición

- **Producto real, no generado:** la IA no debe inventar tapas, textos, elásticos ni ojalillos. La foto real es la fuente de verdad del catálogo.
- **Perspectiva cenital:** el producto se integra como si estuviera apoyado en la misma superficie que el fondo, visto desde arriba.
- **Escala realista:** el producto debe ocupar una porción creíble del plano, sin quedar diminuto ni gigante. El A6 puede verse algo más chico que una agenda A5.
- **Apoyo y sombra de contacto:** la sombra hacia abajo-derecha confirma que el objeto está apoyado y que la luz viene de arriba-izquierda.
- **Zonas seguras:** se mantienen libres el 45 % izquierdo y el superior derecho para no invadir el texto del hero.
- **Prohibición de redibujado:** si la IA modifica la tapa, el texto o la forma, el resultado no sirve para el catálogo.
- **Sin elementos extra:** no se agregan logos, personas, manos ni productos adicionales que confundan la lectura de la pieza.

---

## 4. Orden de uso

1. Generar el fondo con el prompt de la sección 2.
2. Revisar que no tenga borde de mesa, pared, textos, productos ni personas.
3. Guardar el fondo maestro.
4. Recortar el producto real y quitarle el fondo.
5. Montar el producto con el prompt de la sección 3.
6. Revisar perspectiva, escala, sombra y zonas libres.
7. Repetir la composición con el mismo fondo para los demás productos del hero.
8. Exportar las versiones finales en 16:9.

**Importante:** el fondo se genera una sola vez. No se regenera para cada producto, porque el carrusel debe mantener continuidad visual.

---

## 5. Criterios de aceptación

- [ ] El fondo es horizontal 16:9.
- [ ] No tiene borde de mesa ni pared.
- [ ] No contiene textos, logos, marcas ni personajes protegidos.
- [ ] No contiene personas, manos ni productos generados.
- [ ] El 45 % izquierdo está libre para el texto del hero.
- [ ] El superior derecho está tranquilo para el `h1`.
- [ ] El producto está en el centro-derecha.
- [ ] El producto conserva forma, tapa, textos y proporciones.
- [ ] El producto parece apoyado, no flotando.
- [ ] La sombra coincide con la luz de arriba-izquierda.
- [ ] El tamaño es creíble respecto del fondo.
- [ ] La pieza final mantiene la paleta de marca.
- [ ] La versión exportada resiste el recorte mobile sin perder el producto.

---

## 6. Registro de iteraciones

| Versión | Fecha | Cambio realizado | Archivo | Estado |
| :--- | :--- | :--- | :--- | :--- |
| V1 | 2026-11-02 | Fondo maestro generado y validado visualmente. | Pendiente de archivo | Aprobado para composición |
| V2 |  | Ajuste de luz, props o encuadre. |  |  |
| V3 |  | Composición final con producto real. |  |  |

---

## 7. Ficha de IA asociada

- **Herramienta:** ChatGPT con generación de imágenes.
- **Tipo de intervención:** generación de fondo e integración visual.
- **Prompt del fondo:** sección 2 de este documento.
- **Prompt de composición:** sección 3 de este documento.
- **Datos personales enviados:** ninguno.
- **Personas reales:** no.
- **Marcas o personajes protegidos:** no.
- **Revisión humana:** pendiente de completar por cada producto.
- **Declaración:** pieza generada/editada con IA; debe identificarse como “Generado con IA” o “Editado con IA” según corresponda.

---

## 8. Notas de uso

- ChatGPT no tiene un campo separado de “negative prompt”; las exclusiones se incluyen dentro del mismo mensaje.
- La biblioteca de medios permite recortar en 16:9 (1920 × 1080) para el hero y en 4:3 (1200 × 900) para el catálogo.
- Si ChatGPT redibuja el producto, se descarta la versión y se compone en Canva, Photopea o Photoshop.
- Las fotos de producto con luz blanca fuerte deben corregirse antes del montaje: balance de blancos, altas luces, sombras y contraste.
- La sombra de contacto se agrega en la composición, no se hereda de la foto original si la dirección de luz no coincide.
- Las imágenes finales se exportan en WebP para el sitio y se conservan los originales para la ficha y las iteraciones.

---

## 9. Relación con la documentación del TPFI

Este documento forma parte de la evidencia de F5 y sirve como base para:

- `multimedia/FICHAS-IA.md`;
- Anexo I: matriz de herramientas de IA;
- Anexo III: ficha de piezas generadas;
- informe final, sección de producción multimedia;
- declaración de uso responsable de IA.

No reemplaza la ficha oficial de la pieza ni la declaración de IA; las complementa con la trazabilidad de los prompts y sus decisiones de diseño.
