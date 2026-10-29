import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-800.css';
import Navbar from './components/layout/Navbar';
import Logo from './components/ui/Logo';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen bg-fondo">
      <Navbar />

      <main className="contenedor min-h-[150vh] py-16">
        <h1 className="sr-only">Pedacito de Arte</h1>
        <Logo />
        <p className="mt-6 max-w-xl font-cuerpo text-base text-contraste">
          Base técnica en construcción. La navegación y el contenido del home se definen en la
          siguiente etapa.
        </p>
      </main>
    </div>
  </React.StrictMode>,
);
