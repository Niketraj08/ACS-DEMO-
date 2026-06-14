import SEO from '../components/ui/SEO';
import Services from '../components/sections/Services';
import CTA from '../components/sections/CTA';

export default function ServicesPage() {
  return (
    <>
      <SEO title="Services" description="Comprehensive IT services - web, mobile, AI, cloud, ERP, and more." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">End-to-end technology solutions for modern businesses.</p>
        </div>
      </div>
      <Services />
      <CTA />
    </>
  );
}
