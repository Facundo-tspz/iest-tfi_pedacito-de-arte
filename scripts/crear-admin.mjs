import { randomBytes, scryptSync } from 'node:crypto';

function limpiarUrl(valor) {
  if (typeof valor !== 'string') {
    return '';
  }

  const limpio = valor.trim().replace(/^["']|["']$/g, '');

  try {
    const url = new URL(limpio);

    if (url.protocol !== 'https:') {
      return '';
    }

    return url.origin;
  } catch {
    return '';
  }
}

function limpiarClave(valor) {
  if (typeof valor !== 'string') {
    return '';
  }

  return valor
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/\s+/g, '');
}

function decodificarJwt(clave) {
  try {
    const partes = clave.split('.');

    if (partes.length !== 3) {
      return null;
    }

    return JSON.parse(Buffer.from(partes[1], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

function prepararHeaders(clave, esJwt) {
  const headers = {
    apikey: clave,
  };

  if (esJwt) {
    headers.Authorization = `Bearer ${clave}`;
  }

  return headers;
}

async function main() {
  const url = limpiarUrl(process.env.SUPABASE_URL);
  const clave = limpiarClave(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const usuario = process.env.ADMIN_USUARIO?.trim();
  const nombre = process.env.ADMIN_NOMBRE?.trim() || usuario;
  const password = process.env.ADMIN_PASSWORD?.replace(/\r/g, '');
  const rol = process.env.ADMIN_ROL?.trim() || 'admin';

  if (!url || !clave || !usuario || !password) {
    console.error(
      'Faltan SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_USUARIO o ADMIN_PASSWORD.',
    );
    process.exitCode = 1;
    return;
  }

  const host = new URL(url).hostname;

  if (!/^[a-z0-9]{20}\.supabase\.co$/i.test(host)) {
    console.error(
      'La URL no parece ser la Project URL de Supabase. No uses el nombre del proyecto.',
    );
    console.error('Debe verse como https://<ref>.supabase.co, con un código de 20 caracteres.');
    console.error(`URL recibida: ${url}`);
    process.exitCode = 1;
    return;
  }

  if (!['admin', 'editor'].includes(rol)) {
    console.error('ADMIN_ROL debe ser admin o editor.');
    process.exitCode = 1;
    return;
  }

  const esJwt = clave.startsWith('eyJ');
  const esSecretKey = clave.startsWith('sb_secret_');
  const cantidadPuntos = (clave.match(/\./g) ?? []).length;

  if (esJwt && cantidadPuntos !== 2) {
    console.error(
      `La clave JWT está mal formada: tiene ${cantidadPuntos} puntos y debería tener 2. Probablemente se pegaron dos claves juntas o se copió incompleta.`,
    );
    console.error(`Largo recibido: ${clave.length} caracteres.`);
    process.exitCode = 1;
    return;
  }

  if (clave.startsWith('sb_publishable_')) {
    console.error(
      'La clave cargada es publishable/anon. Necesitás la service_role o la secret key.',
    );
    process.exitCode = 1;
    return;
  }

  if (!esJwt && !esSecretKey) {
    console.error('La clave no tiene un formato reconocido. Debe empezar con eyJ o sb_secret_.');
    process.exitCode = 1;
    return;
  }

  if (esJwt) {
    const payload = decodificarJwt(clave);
    const refUrl = new URL(url).hostname.split('.')[0];

    if (!payload || !payload.ref || !payload.role) {
      console.error(
        'La clave JWT no se pudo interpretar. Volvé a copiar la service_role completa.',
      );
      console.error(`Largo recibido: ${clave.length} caracteres.`);
      process.exitCode = 1;
      return;
    }

    if (payload.ref !== refUrl) {
      console.error(
        `La clave pertenece al proyecto "${payload.ref}", pero la URL es del proyecto "${refUrl}".`,
      );
      process.exitCode = 1;
      return;
    }

    if (payload?.role && payload.role !== 'service_role') {
      console.error(`La clave es JWT con rol "${payload.role}". Necesitás una clave service_role.`);
      process.exitCode = 1;
      return;
    }
  }

  const headers = prepararHeaders(clave, esJwt);
  const preflight = await fetch(`${url}/rest/v1/categorias?select=id&limit=1`, { headers });

  if (!preflight.ok) {
    const detalle = await preflight.text();
    console.error(`No se pudo autenticar contra Supabase: HTTP ${preflight.status}.`);

    if (preflight.status === 401) {
      console.error(
        'Revisá que la URL y la clave sean del mismo proyecto y que la clave sea service_role o secret.',
      );
      console.error(
        `Diagnóstico: largo=${clave.length}, puntos=${cantidadPuntos}, prefijo=${clave.slice(0, 6)}.`,
      );
    }

    if (detalle) {
      console.error(detalle);
    }

    process.exitCode = 1;
    return;
  }

  const sal = randomBytes(16).toString('hex');
  const hash = scryptSync(password, sal, 64, {
    N: 16384,
    r: 8,
    p: 1,
  }).toString('hex');
  const passwordHash = `scrypt$16384$8$1$${sal}$${hash}`;

  const respuesta = await fetch(`${url}/rest/v1/usuarios_admin?on_conflict=usuario`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      usuario,
      nombre,
      password_hash: passwordHash,
      rol,
      activo: true,
      session_version: 1,
    }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    console.error(`No se pudo crear el admin: HTTP ${respuesta.status}.`);

    if (detalle) {
      console.error(detalle);
    }

    process.exitCode = 1;
    return;
  }

  console.log(`Usuario admin creado o actualizado: ${usuario}`);
}

main().catch((error) => {
  console.error('Error inesperado al crear el admin.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
