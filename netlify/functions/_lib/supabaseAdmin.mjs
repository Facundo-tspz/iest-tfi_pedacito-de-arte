import { createClient } from '@supabase/supabase-js';

let cliente = null;

export function obtenerSupabaseAdmin() {
  if (cliente) {
    return cliente;
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.');
  }

  cliente = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cliente;
}
