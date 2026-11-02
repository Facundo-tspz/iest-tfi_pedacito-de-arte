insert into public.categorias (id, nombre, slug, descripcion, orden, activo)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Agendas',
    'agendas',
    'Agendas artesanales y personalizadas.',
    1,
    true
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Agendas Docentes',
    'agendas-docentes',
    'Agendas con planificadores para la rutina docente.',
    2,
    true
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Anotadores',
    'anotadores',
    'Anotadores y libros para notas, recetas y listas.',
    3,
    true
  ),
  (
    '44444444-4444-4444-8444-444444444444',
    'Para colorear',
    'para-colorear',
    'Revistas, libros y futuros productos para colorear.',
    4,
    true
  )
on conflict (id) do nothing;

insert into public.productos (
  id,
  codigo,
  nombre,
  slug,
  categoria_id,
  descripcion,
  caracteristicas,
  precio_base,
  precio_mayorista,
  cantidad_minima_mayorista,
  precio_desde,
  destacado,
  disponible,
  orden
)
values
  (
    'a1111111-1111-4111-8111-111111111111',
    'AN-A6-50',
    'Anotador A6 x 50 hojas',
    'anotador-a6-x-50-hojas',
    '33333333-3333-4333-8333-333333333333',
    'Anotador artesanal de formato A6 con 50 hojas y diseños personalizados. Ideal para llevar notas, listas y recordatorios.',
    array[
      'Formato A6',
      '50 hojas',
      'Diseños personalizados',
      'Interior rayado, cuadriculado o punteado'
    ],
    3500.00,
    2200.00,
    10,
    false,
    false,
    true,
    1
  ),
  (
    'a2222222-2222-4222-8222-222222222222',
    'LIB-REC-A5',
    'Libro de Recetas A5 x 40 hojas',
    'libro-de-recetas-a5-x-40-hojas',
    '33333333-3333-4333-8333-333333333333',
    'Libro A5 con 40 hojas para organizar recetas. Incluye secciones para ingredientes, preparación, notas, foto, tiempo de cocción y porciones.',
    array[
      'Formato A5',
      '40 hojas',
      'Secciones guiadas por receta',
      'Tapa dura',
      'Elástico opcional con ojalillos metálicos'
    ],
    8000.00,
    5500.00,
    10,
    false,
    false,
    true,
    2
  ),
  (
    'a3333333-3333-4333-8333-333333333333',
    'REV-COL',
    'Revista para Colorear',
    'revista-para-colorear',
    '44444444-4444-4444-8444-444444444444',
    'Revista para colorear con tapa de papel fotográfico y 3 hojas interiores A4 de 80 g impresas doble faz. Va abrochada y está disponible en varios diseños.',
    array[
      'Tapa de papel fotográfico',
      '3 hojas interiores A4 de 80 g',
      'Impresión doble faz',
      'Abrochada',
      'Varios diseños disponibles'
    ],
    2000.00,
    1200.00,
    10,
    false,
    false,
    true,
    3
  ),
  (
    'a4444444-4444-4444-8444-444444444444',
    'AD-A5',
    'Agenda Docente A5',
    'agenda-docente-a5',
    '22222222-2222-4222-8222-222222222222',
    'Agenda A5 de tapa dura para docentes, con calendarios anual, mensual y semanal, listas de asistencia y seguimiento. La cantidad de secciones de seguimiento varía según la cantidad de cursos.',
    array[
      'Calendario anual, mensual y semanal',
      'Licencias, trabajos prácticos y evaluaciones',
      'Notas por trimestre y espacio para cuatrimestre',
      'Asistencia y hojas rayadas para notas',
      'Tapa dura',
      'Elástico opcional con ojalillos metálicos'
    ],
    12000.00,
    null,
    10,
    false,
    false,
    true,
    4
  ),
  (
    'a5555555-5555-4555-8555-555555555555',
    'AG-PERS',
    'Agenda Personalizada',
    'agenda-personalizada',
    '11111111-1111-4111-8111-111111111111',
    'Agenda A5 de tapa dura personalizada con calendarios y hojas rayadas. Se pueden agregar módulos según lo que necesite cada cliente, como ventas, citas o seguimiento.',
    array[
      'Calendario anual, mensual y semanal',
      'Hojas rayadas para notas',
      'Módulos personalizados',
      'Tapa dura',
      'Elástico opcional con ojalillos metálicos',
      'Precio desde $13.000 según contenido'
    ],
    13000.00,
    null,
    10,
    true,
    false,
    true,
    5
  ),
  (
    'a6666666-6666-4666-8666-666666666666',
    'LIB-COL-A5',
    'Libro A5 para Colorear',
    'libro-a5-para-colorear',
    '44444444-4444-4444-8444-444444444444',
    'Libro A5 para colorear con 50 hojas, orientación horizontal y tapa dura. Pensado para usar con marcadores al agua y disponible en varios diseños.',
    array[
      'Formato A5',
      '50 hojas',
      'Orientación horizontal',
      'Tapa dura',
      'Para marcadores al agua',
      'Varios diseños',
      'Elástico opcional con ojalillos metálicos'
    ],
    8000.00,
    null,
    10,
    false,
    false,
    true,
    6
  )
on conflict (id) do nothing;

insert into public.opciones_personalizacion (
  producto_id,
  tipo_opcion,
  valor,
  precio_extra,
  orden,
  activo
)
values
  ('a1111111-1111-4111-8111-111111111111', 'Interior', 'Rayado', 0, 1, true),
  ('a1111111-1111-4111-8111-111111111111', 'Interior', 'Cuadriculado', 0, 2, true),
  ('a1111111-1111-4111-8111-111111111111', 'Interior', 'Punteado', 0, 3, true),
  ('a2222222-2222-4222-8222-222222222222', 'Elástico', 'Sí', 0, 1, true),
  ('a4444444-4444-4444-8444-444444444444', 'Cursos', '4 cursos', 0, 1, true),
  ('a4444444-4444-4444-8444-444444444444', 'Cursos', '8 cursos', 2000, 2, true),
  ('a4444444-4444-4444-8444-444444444444', 'Cursos', '12 cursos', 4000, 3, true),
  ('a4444444-4444-4444-8444-444444444444', 'Elástico', 'Sí', 0, 1, true),
  ('a5555555-5555-4555-8555-555555555555', 'Elástico', 'Sí', 0, 1, true),
  ('a6666666-6666-4666-8666-666666666666', 'Elástico', 'Sí', 0, 1, true)
on conflict (producto_id, tipo_opcion, valor) do nothing;
