import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../../components/ui/Boton';
import Logo from '../../components/ui/Logo';
import { iniciarSesionAdmin } from '../../services/admin';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();

  const enviar = async (evento) => {
    evento.preventDefault();
    setError('');
    setEnviando(true);

    try {
      await iniciarSesionAdmin(usuario, password);
      navegar('/estudio', { replace: true });
    } catch {
      setError('Usuario o contraseña incorrectos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-blanco lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-principal p-8 text-blanco sm:p-12">
        <Logo fondo="oscuro" />

        <div className="mt-12 max-w-md lg:mt-0">
          <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.18em] text-complementario-principal">
            Panel administrativo
          </p>
          <h1 className="mt-4 font-titulos text-4xl font-semibold leading-tight sm:text-5xl">
            Papelería creativa, ordenada en un solo lugar.
          </h1>
          <p className="mt-5 font-cuerpo text-base leading-relaxed text-blanco/75">
            Administrá productos, imágenes y contenido del taller.
          </p>
        </div>

        <p className="mt-12 font-cuerpo text-xs text-blanco/50 lg:mt-0">Pedacito de Arte</p>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <p className="font-cuerpo text-sm font-semibold uppercase tracking-[0.16em] text-contraste">
            Acceso privado
          </p>
          <h2 className="mt-2 font-titulos text-3xl font-semibold text-principal sm:text-4xl">
            Ingresar al panel
          </h2>

          <form onSubmit={enviar} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-usuario"
                className="font-cuerpo text-sm font-semibold text-principal"
              >
                Usuario
              </label>
              <input
                id="admin-usuario"
                type="text"
                value={usuario}
                onChange={(evento) => setUsuario(evento.target.value)}
                autoComplete="username"
                required
                className="mt-2 min-h-12 w-full rounded-xl border border-contraste/20 bg-blanco px-4 font-cuerpo text-base text-principal focus-visible:border-complementario-secundario focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-blanco"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="font-cuerpo text-sm font-semibold text-principal"
              >
                Contraseña
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                autoComplete="current-password"
                required
                className="mt-2 min-h-12 w-full rounded-xl border border-contraste/20 bg-blanco px-4 font-cuerpo text-base text-principal focus-visible:border-complementario-secundario focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-blanco"
              />
            </div>

            {error ? (
              <p role="alert" className="font-cuerpo text-sm text-secundario">
                {error}
              </p>
            ) : null}

            <Boton type="submit" disabled={enviando} className="w-full">
              {enviando ? 'Ingresando…' : 'Ingresar'}
            </Boton>
          </form>

          <Link
            to="/"
            className="mt-6 inline-flex font-cuerpo text-sm font-semibold text-contraste underline-offset-4 hover:text-principal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-complementario-secundario focus-visible:ring-offset-2 focus-visible:ring-offset-blanco"
          >
            Volver al sitio
          </Link>
        </div>
      </section>
    </div>
  );
}
