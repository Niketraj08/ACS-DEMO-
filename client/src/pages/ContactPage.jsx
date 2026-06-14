import SEO from '../components/ui/SEO';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Astra Cognix Solutions for a free consultation." />
      <div className="pt-28 pb-8 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We'd love to hear about your project.</p>
        </div>
      </div>
      <Contact compact />
    </>
  );
}
