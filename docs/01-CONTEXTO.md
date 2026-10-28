# 01 - Contexto del Proyecto: Pedacito de Arte

Este documento define el problema de negocio, los objetivos, el público y el alcance del sitio web de **Pedacito de Arte**.

---

## 1. Problema de negocio

La marca comercializa papelería artesanal en ferias locales y por Instagram/WhatsApp. Esa modalidad tiene tres limitaciones:

- **Catálogo disperso:** el cliente no puede ver de forma ordenada todos los modelos, formatos, interiores y encuadernaciones disponibles.
- **Atención repetitiva:** cada consulta sobre precios, opciones o disponibilidad se responde de forma individual.
- **Pedidos difíciles de armar:** sin una herramienta de selección, el comprador debe escribir a mano qué quiere y el taller debe reconstruir el pedido.

---

## 2. Objetivo del proyecto

Construir un sitio de catálogo y encargos que permita:

1. Mostrar los productos organizados por categoría.
2. Personalizar cada producto con opciones de interior, tapa, encuadernación y notas.
3. Armar un carrito de **encargos** con cantidades y un total estimado.
4. Enviar el resumen del encargo al WhatsApp del taller.
5. Administrar productos, imágenes y contenido desde un panel con roles `admin` y `editor`.

---

## 3. Público destinatario

- **Docentes y profesionales:** agendas docentes, agendas de trabajo y planificadores.
- **Familias y público infantil:** revistas y libros para colorear.
- **Público general:** agendas personales, anotadores y papelería creativa.
- **Clientes de ferias y redes:** personas que llegan desde Instagram o escanean un QR en el puesto.

---

## 4. Productos del catálogo

El catálogo de Fase 1 tiene cuatro líneas:

### Agendas
Agendas personales, anuales, perpetuas y profesionales, con opciones de tapa, interior y encuadernación.

### Agendas Docentes
Agendas con planificadores adaptados a la rutina docente: cursos, alumnos, calificaciones y planificación.

### Anotadores
Anotadores y cuadernos en formatos A5/A6, con hojas lisas, rayadas o punteadas.

### Revistas para Colorear
Revistas y libros temáticos con ilustraciones y actividades para colorear.

### Servicios complementarios
Diseño personalizado, impresión, laminado y encuadernación. Los trabajos especiales se consultan por WhatsApp.

---

## 5. Modelo de funcionamiento

- La web es **solo de encargos**. No procesa pagos, no cobra señas ni gestiona cuentas de cliente.
- El carrito es una herramienta para armar el pedido y calcular un total estimado.
- El precio final se confirma por WhatsApp según personalización, cantidad y disponibilidad.
- La entrega se coordina por WhatsApp o en la feria/taller.
- No se guarda historial de pedidos en Fase 1.

---

## 6. Panel administrativo

El sitio incluye un panel propio con dos roles:

- **Admin:** gestiona usuarios, configuración crítica, productos, categorías, medios y contenido.
- **Editor:** crea, edita y publica productos, categorías y secciones; no elimina ni administra usuarios o configuración crítica.

El panel permite subir imágenes, recortarlas, convertirlas a WebP y editar las secciones de la página.

---

## 7. Fuera de alcance de la Fase 1

- Pasarelas de pago y checkout.
- Cuentas de cliente o login público.
- Cálculo automático de envíos.
- Control de stock.
- Historial de pedidos.
- Facturación electrónica.
- Integración con marketplaces.

---

## 8. Identidad

La identidad visual, la paleta y las tipografías están definidas en `docs/IDENTIDAD-MARCA.md` y son de cumplimiento obligatorio.
