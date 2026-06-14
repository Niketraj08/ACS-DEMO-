import SEO from '../components/ui/SEO';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Portfolio from '../components/sections/Portfolio';
import TechStack from '../components/sections/TechStack';
import Pricing from '../components/sections/Pricing';
import Testimonials from '../components/sections/Testimonials';
import ClientLogos from '../components/sections/ClientLogos';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Astra Cognix Solutions - Premium IT services including web, mobile, AI, and cloud solutions."
      />
      <Hero />
      <About compact />
      <Services limit={8} />
      <WhyChooseUs />
      <Portfolio limit={6} />
      <TechStack />
      <Pricing />
      <Testimonials />
      <ClientLogos />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
