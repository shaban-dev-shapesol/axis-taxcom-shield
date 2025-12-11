import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
}

export const SEO = ({ 
  title, 
  description, 
  canonical,
  type = "website" 
}: SEOProps) => {
  const siteName = "Investigation.tax";
  const fullTitle = title === "Home" ? `${siteName} | HMRC Investigation Defence` : `${title} | ${siteName}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};
