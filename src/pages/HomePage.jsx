import CategoriasHome from '../components/home/CategoriasHome';
import HeroDestacados from '../components/home/HeroDestacados';
import HeroProceso from '../components/home/HeroProceso';
import IntroMarca from '../components/home/IntroMarca';
import Novedades from '../components/home/Novedades';
import ServiciosCTA from '../components/home/ServiciosCTA';
import SEO from '../components/seo/SEO';

export default function HomePage() {
  return (
    <>
      <SEO
        titulo="Pedacito de Arte | Papelería Creativa hecha con amor"
        descripcion="Agendas personalizadas, agendas docentes, anotadores y revistas para colorear. Papelería artesanal hecha con amor. Armá tu encargo y envialo por WhatsApp."
        url="/"
      />

      <HeroDestacados />
      <IntroMarca />
      <CategoriasHome />
      <Novedades />
      <HeroProceso />
      <ServiciosCTA />
    </>
  );
}
