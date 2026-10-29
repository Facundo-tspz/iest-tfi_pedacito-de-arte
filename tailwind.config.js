import daisyui from 'daisyui';

const coloresMarca = {
  fondo: '#FAF3DD',
  principal: '#264653',
  blanco: '#FFFFFF',
  contraste: '#5F4A39',
  secundario: '#E76F51',
  'complementario-principal': '#E9C46A',
  'complementario-secundario': '#2A9D8F',
};

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: coloresMarca,
      fontFamily: {
        titulos: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cuerpo: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        pedacito: {
          primary: coloresMarca.principal,
          'primary-content': coloresMarca.fondo,
          secondary: coloresMarca['complementario-principal'],
          'secondary-content': coloresMarca.principal,
          accent: coloresMarca.contraste,
          'accent-content': coloresMarca.fondo,
          neutral: coloresMarca.principal,
          'neutral-content': coloresMarca.fondo,
          'base-100': coloresMarca.fondo,
          'base-200': coloresMarca.fondo,
          'base-300': coloresMarca.fondo,
          'base-content': coloresMarca.principal,
          info: coloresMarca.principal,
          'info-content': coloresMarca.fondo,
          success: coloresMarca.principal,
          'success-content': coloresMarca.fondo,
          warning: coloresMarca['complementario-principal'],
          'warning-content': coloresMarca.principal,
          error: coloresMarca.contraste,
          'error-content': coloresMarca.fondo,
        },
      },
    ],
  },
};
