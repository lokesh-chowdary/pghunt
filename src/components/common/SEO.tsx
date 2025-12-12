import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  noindex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PG Finder - Find Your Perfect PG Accommodation Without Brokerage',
  description = 'Find verified PG accommodations in Mumbai, Delhi, Bangalore, Chennai, Pune, and Hyderabad. No brokerage fees, transparent pricing, and verified listings. Search by location, budget, and amenities.',
  keywords = 'PG, paying guest, accommodation, PG in Mumbai, PG in Delhi, PG in Bangalore, PG in Chennai, PG in Pune, PG in Hyderabad, no brokerage PG, verified PG listings',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  structuredData,
  noindex = false,
  canonical,
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = url ? `${siteUrl}${url}` : (typeof window !== 'undefined' ? window.location.href : '');
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : fullUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="PG Finder" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="author" content="PG Finder" />
      <meta name="theme-color" content="#6F3FF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

