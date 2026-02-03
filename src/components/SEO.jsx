import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type }) {
  const siteTitle = "Valentine's Interactive";
  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || "Create a personalized, interactive Valentine's Day experience. Send letters, quizzes, and cards directly to your loved one.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name='description' content={finalDescription} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || "ValentineApp"} />
      <meta name="twitter:card" content={type || 'summary'} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
}
