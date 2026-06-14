import SEO from '../components/ui/SEO';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

export default function FAQPage() {
  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about our services." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Find answers to common questions.</p>
        </div>
      </div>
      <FAQ />
      <CTA />
    </>
  );
}
