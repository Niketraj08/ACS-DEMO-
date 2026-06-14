import SEO from '../components/ui/SEO';
import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import CTA from '../components/sections/CTA';

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn about Astra Cognix Solutions - mission, vision, and our expert team." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Discover our story, values, and commitment to digital excellence.</p>
        </div>
      </div>
      <About />
      <WhyChooseUs />
      <CTA />
    </>
  );
}
