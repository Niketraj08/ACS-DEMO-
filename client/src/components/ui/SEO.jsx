import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, ogImage, canonical }) {
  const siteName = 'Astra Cognix Solutions Pvt Ltd';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
