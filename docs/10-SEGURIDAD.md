# 10 - Políticas de Seguridad: Pedacito de Arte

Este documento define el manejo de secretos, autenticación, permisos, RLS y validación.

---

## 1. Variables de entorno

Públicas del frontend:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`

Privadas, solo en Netlify Functions:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

Reglas:

- Nunca subir `.env`, `.env.local` ni claves al repositorio.
- Nunca pegar claves en el chat, capturas, prompts o documentación.
- `SUPABASE_SERVICE_ROLE_KEY` no puede aparecer en `src/`.
- La `anon key` no es un secreto, pero debe estar protegida por RLS.

---

## 2. Autenticación propia

- Usuario y contraseña, sin Supabase Auth, Gmail ni email.
- Contraseñas hasheadas con `scrypt` y comparación en tiempo constante.
- El hash nunca se devuelve al cliente.
- Sesión con JWT firmado y cookie `HttpOnly`, `Secure`, `SameSite=Strict`.
- Expiración máxima de 8 horas.
- El JWT incluye `usuario_id`, `rol` y `session_version`.
- Cada petición administrativa verifica que el usuario siga activo y que `session_version` coincida.
- Cambiar contraseña, rol o estado incrementa `session_version`.
- Límite de intentos fallidos por usuario/IP con bloqueo temporal.
- Validación de `Origin` en mutaciones.
- No hay recuperación por email: el admin resetea contraseñas.
- El admin no puede eliminarse a sí mismo ni dejar el sistema sin un admin activo.

---

## 3. Roles y permisos

### Admin
- Gestiona usuarios.
- Gestiona configuración crítica.
- Crea, edita, publica y elimina productos, categorías, medios y contenido.
- Puede cambiar roles.

### Editor
- Crea, edita y publica productos, categorías y contenido.
- Sube y reutiliza medios.
- No elimina productos, categorías, medios ni contenido.
- No accede a usuarios ni configuración crítica.
- Puede cambiar su propia contraseña.

La autorización se aplica en las Functions. Ocultar botones no es suficiente.

---

## 4. RLS en Supabase

- RLS activa en todas las tablas.
- `anon` solo lee filas públicas/activas.
- `usuarios_admin`, `login_intentos` y `media` no tienen acceso para `anon`.
- No existen políticas de escritura para `anon`.
- `service_role` se usa solo en el servidor y omite RLS.
- Storage: lectura pública del bucket `media`; escritura solo con URL firmada.

Prueba obligatoria antes de cerrar F4:

```text
Intentar insertar/actualizar/borrar con la anon key.
Resultado esperado: error por RLS.
```

---

## 5. Validación de datos

- Validar en el cliente para UX.
- Validar obligatoriamente en el servidor con `zod`.
- Validar slugs, precios, roles, estados y referencias.
- Rechazar precios negativos.
- Rechazar roles distintos de `admin` y `editor`.
- Rechazar imágenes que no sean JPG, PNG o WebP.
- Aplicar límite de tamaño y dimensiones.
- Escapar o sanitizar cualquier texto que se muestre como HTML.
- No concatenar SQL; usar el cliente de Supabase con parámetros.

---

## 6. Subida de imágenes

- La imagen no pasa por Netlify Functions.
- La Function genera una URL firmada de Supabase Storage.
- El navegador recorta, convierte a WebP y sube directo.
- Se registra en `media` con alt, dimensiones y peso.
- El alt es obligatorio.
- Solo el admin elimina archivos definitivamente.
- Se rechazan archivos ejecutables, SVG con scripts y MIME falsos.

---

## 7. Datos y privacidad

- No se persisten encargos ni datos personales de clientes.
- No se envían datos reales a herramientas de IA.
- No se registran contraseñas, tokens ni IPs en logs de aplicación.
- `login_intentos` guarda usuario, IP y resultado, sin contraseña.
- No se usan cookies de terceros ni tracking innecesario.

---

## 8. Seguridad de prompts e IA

- No incluir claves, contraseñas, datos de clientes ni información privada en prompts.
- No usar personas reales identificables.
- No imitar marcas ni estilos de artistas con nombre propio.
- Revisar licencias y condiciones de uso comercial.
- Etiquetar el contenido generado con IA.
- Registrar las piezas en `multimedia/FICHAS-IA.md`.

---

## 9. Checklist de seguridad

- [ ] `.env.local` ignorado por Git.
- [ ] Sin secretos en el historial de commits.
- [ ] `service_role` solo en Functions.
- [ ] RLS activa en todas las tablas.
- [ ] `anon` no puede escribir.
- [ ] Sesión con cookie HttpOnly y `session_version`.
- [ ] Rate limiting de login.
- [ ] RBAC verificado en servidor.
- [ ] Validación con `zod`.
- [ ] Uploads con tipo, tamaño y URL firmada.
- [ ] `noindex` en `/admin`.
- [ ] Sin datos personales en prompts.
