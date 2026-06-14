import SEO from '../components/ui/SEO';
import Portfolio from '../components/sections/Portfolio';
import CTA from '../components/sections/CTA';

export default function PortfolioPage() {
  return (
    <>
      <SEO title="Portfolio" description="Explore our successful projects and case studies." />
      <div className="pt-28 pb-8 gradient-bg">
        <div className="container-custom text-center text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Showcasing our best work across industries.</p>
        </div>
      </div>
      <Portfolio />
      <CTA />
    </>
  );
}
