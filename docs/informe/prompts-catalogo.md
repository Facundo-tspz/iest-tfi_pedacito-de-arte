# Prompts del Catálogo — F5

- **Proyecto:** Pedacito de Arte
- **Fase:** F5 — Producción multimedia con IA
- **Pieza:** fondo maestro 4:3 y composición de imágenes de catálogo
- **Herramienta:** ChatGPT con generación de imágenes
- **Fecha de registro:** 2026-11-02
- **Estado:** prompts definidos; imágenes de catálogo en producción

---

## 1. Objetivo de la pieza

Crear imágenes horizontales en **4:3** para las tarjetas del catálogo y la galería de producto. El fondo debe ser sobrio, cenital y reutilizable, con el producto centrado y sin elementos que compitan con la pieza.

Estas imágenes se usan en:

- tarjetas del catálogo (`aspect-[4/3]`);
- galería del detalle de producto (`aspect-square`, con recorte centrado);
- selección de imagen principal del producto en el panel.

La imagen del hero es una pieza distinta: usa 16:9 y espacio libre a la izquierda para el texto. El catálogo usa 4:3 y producto centrado.

---

## 2. Prompt del fondo para catálogo

```text
Create a photorealistic top-down flat-lay background for an artisan stationery catalog, 4:3 landscape format. An empty surface of warm cream linen or light oak, filling the entire frame with no table edge and no wall. Soft, diffused natural daylight from the upper left, gentle realistic shadows, 50mm lens, f/5.6. The central 60% of the frame must be completely empty and clean for product compositing. Keep a 10% safety margin around all edges. Subtle props only at the extreme edges: a small piece of kraft paper, a few dried stems, a ceramic cup, a paintbrush. Brand palette accents: midnight blue (#264653), warm mustard (#E9C46A), coral (#E76F51), muted teal (#2A9D8F), chocolate brown (#5F4A39). Do not include text, typography, letters, logo, watermark, people, hands, faces, agendas, notebooks, books, stationery products, clutter, harsh flash, hard shadows, neon colors, oversaturation, cartoon style, illustration, 3D render, low resolution, distorted perspective, brand names, copyrighted characters, or extra fingers. Natural color grading, realistic materials, no CGI look, one single image only.
```

### 2.1. Fundamentación del prompt de fondo

- **Formato 4:3:** coincide con la tarjeta del catálogo y con el recorte de 1200 × 900 que genera Medios.
- **Vista cenital:** las fotos de producto fueron tomadas desde arriba; el fondo mantiene la misma perspectiva y evita que el producto parezca pegado sobre una pared.
- **Superficie continua:** sin borde de mesa ni pared, para que el producto se apoye sobre un plano creíble.
- **Centro libre:** el 60 % central queda vacío para montar el producto sin objetos que interfieran con su silueta.
- **Margen de seguridad del 10 %:** protege el producto del recorte de la tarjeta y del recorte cuadrado de la galería.
- **Luz superior izquierda:** define una dirección única para que la sombra del producto caiga hacia abajo-derecha.
- **Props solo en los bordes:** aportan contexto artesanal sin invadir el centro.
- **Paleta de marca:** retoma los tokens de `docs/IDENTIDAD-MARCA.md` sin saturar la imagen.
- **Exclusiones explícitas:** evitan textos, logos, personas, productos generados y personajes protegidos.
- **Realismo fotográfico:** se busca una superficie material, con luz suave y sin aspecto de render.

---

## 3. Prompt de composición para catálogo

```text
Composite the provided real product photo onto the center of the background. The product was photographed from directly above, so match the top-down flat-lay perspective. Preserve the exact product shape, cover design, printed text, colors, proportions, elastic band, metal eyelets, and page edges. Place the product centered, occupying about 60-70% of the frame, with a 10% safety margin around it. It must be fully resting on the surface, not floating. Add a soft, realistic contact shadow toward the lower right, consistent with soft natural light coming from the upper left. Do not redraw, redesign, sharpen, or invent product details. Do not add text, logos, people, hands, or extra products. Photorealistic, 4:3 landscape.
```

### 3.1. Fundamentación del prompt de composición

- **Producto real:** la IA no debe inventar tapas, textos, elásticos ni ojalillos. La foto real es la fuente de verdad del catálogo.
- **Perspectiva cenital:** el producto se integra como si estuviera apoyado sobre la misma superficie del fondo.
- **Producto centrado:** la tarjeta usa 4:3 y la galería usa un recorte cuadrado; centrar el producto asegura que se vea en ambos formatos.
- **Escala 60–70 %:** el producto tiene protagonismo sin tocar los bordes ni quedar diminuto.
- **Margen del 10 %:** evita que el recorte de la tarjeta corte partes del producto.
- **Sombra de contacto:** confirma que el producto está apoyado y mantiene la coherencia con la luz superior izquierda.
- **Sin redibujado:** si la IA modifica la tapa, el texto o la forma, la imagen no sirve para el catálogo.
- **Sin elementos extra:** no se agregan logos, personas, manos ni otros productos.

---

## 4. Diferencias con el hero

| Aspecto | Hero | Catálogo |
| :--- | :--- | :--- |
| Formato | 16:9 | 4:3 |
| Tamaño | 1920 × 1080 | 1200 × 900 |
| Producto | Centro-derecha | Centrado |
| Espacio libre | 45 % izquierdo para texto | Sin espacio para texto |
| Fondo | Escena con más props | Fondo sobrio |
| Uso | Carrusel del Home | Tarjetas y galería |

No se debe reutilizar el fondo del hero para el catálogo: el producto quedaría descentrado y el recorte de la tarjeta perdería la composición.

---

## 5. Orden de uso

1. Generar el fondo con el prompt de la sección 2.
2. Revisar que no tenga borde de mesa, pared, textos, productos ni personas.
3. Guardar el fondo maestro.
4. Recortar la foto real del producto y quitarle el fondo.
5. Montar el producto con el prompt de la sección 3.
6. Revisar que el producto quede centrado y con margen.
7. Repetir el montaje con el mismo fondo para los demás productos.
8. Exportar en 4:3 y subir a Medios con el formato **Catálogo (4:3)**.

**Importante:** el fondo se genera una sola vez y se reutiliza. No se regenera para cada producto.

---

## 6. Criterios de aceptación

- [ ] La imagen es 4:3 horizontal.
- [ ] El fondo no tiene borde de mesa ni pared.
- [ ] El fondo no contiene textos, logos, marcas ni personajes protegidos.
- [ ] El fondo no contiene personas, manos ni productos generados.
- [ ] El producto está centrado.
- [ ] El producto ocupa entre 60 y 70 % del encuadre.
- [ ] El producto conserva forma, tapa, textos y proporciones.
- [ ] El producto parece apoyado, no flotando.
- [ ] La sombra coincide con la luz de arriba-izquierda.
- [ ] El producto conserva un margen del 10 %.
- [ ] La imagen funciona en la tarjeta 4:3.
- [ ] La imagen funciona en el recorte cuadrado de la galería.
- [ ] La pieza mantiene la paleta de marca.

---

## 7. Registro de iteraciones

| Versión | Fecha | Cambio realizado | Archivo | Estado |
| :--- | :--- | :--- | :--- | :--- |
| V1 | 2026-11-02 | Fondo maestro 4:3 generado. | Pendiente de archivo | En revisión |
| V2 |  | Ajuste de luz, encuadre o escala. |  |  |
| V3 |  | Composición final con producto real. |  |  |

---

## 8. Ficha de IA asociada

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

## 9. Notas de uso

- ChatGPT no tiene un campo separado de “negative prompt”; las exclusiones se incluyen dentro del mismo mensaje.
- Si ChatGPT redibuja el producto, se descarta la versión y se compone en Canva, Photopea o Photoshop.
- Corregir el balance de blancos y las luces antes del montaje, sobre todo si la foto se tomó con luz artificial blanca.
- La imagen principal del catálogo debe ser una foto cerrada o centrada; las fotos abiertas muy anchas conviene usarlas como imágenes secundarias de galería.
- En Medios, seleccionar **Catálogo (4:3)** para generar 1200 × 900.
- En Productos, marcar la imagen de catálogo y la del hero; no elegir la de catálogo como “Imagen para el hero”.
- La imagen marcada como hero se excluye del catálogo y de la galería; solo aparece en el Home.
- Agenda Personalizada puede quedar con placeholder hasta contar con su foto real.

---

## 10. Relación con la documentación del TPFI

Este documento forma parte de la evidencia de F5 y sirve como base para:

- `multimedia/FICHAS-IA.md`;
- Anexo I: matriz de herramientas de IA;
- Anexo III: ficha de piezas generadas;
- informe final, sección de producción multimedia;
- declaración de uso responsable de IA.

No reemplaza la ficha oficial de la pieza ni la declaración de IA; las complementa con la trazabilidad de los prompts y sus decisiones de diseño.
