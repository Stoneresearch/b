import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
    title: 'Bahar Sener | Tattoo Artist & Illustrator | Istanbul & Berlin',
    description: 'Explore the artistic universe of Bahar Sener, a renowned tattoo artist and illustrator based in Istanbul and Berlin. Specializing in fine line tattoos, botanical illustrations, and contemporary collage art. Book your custom tattoo design consultation today.',
    keywords: [
        'Bahar Sener',
        'tattoo artist Istanbul',
        'tattoo artist Berlin',
        'fine line tattoos',
        'botanical tattoos',
        'custom tattoo design',
        'illustration artist',
        'collage artist',
        'minimalist tattoos',
        'contemporary tattoo art',
        'Turkish tattoo artist',
        'German tattoo artist',
        'art portfolio',
        'custom illustrations',
        'artistic tattoos'
    ].join(', '),
    authors: [{ name: 'Bahar Sener' }],
    creator: 'Bahar Sener',
    publisher: 'Bahar Sener',
    openGraph: {
        type: 'website',
        url: 'https://baharsener.com',
        site_name: 'Bahar Sener Art Portfolio',
        title: 'Bahar Sener | Contemporary Tattoo Artist & Illustrator',
        description: 'Talented tattoo artist and illustrator Bahar Sener creates unique, personalized fine line tattoos and artistic illustrations. Available for appointments in Istanbul and Berlin.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    canonical: 'https://baharsener.com',
    category: 'Art & Design',
    classification: 'Tattoo Art, Illustrations, Contemporary Art',
};

// Add structured data for better SEO
export const generateStructuredData = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Bahar Sener Tattoo & Art',
        '@id': 'https://baharsener.com',
        url: 'https://www.baharsener.com',
        address: [
            {
                '@type': 'PostalAddress',
                addressLocality: 'Istanbul',
                addressCountry: 'TR',
                areaServed: 'Istanbul Metropolitan Area'
            },
            {
                '@type': 'PostalAddress',
                addressLocality: 'Berlin',
                addressCountry: 'DE',
                areaServed: 'Berlin Metropolitan Area'
            }
        ],
        description: 'Talented tattoo artist and illustrator Bahar Sener specializes in fine line tattoos, botanical illustrations, and contemporary collage art. Available for appointments in Istanbul and Berlin.',
        sameAs: [
            'https://instagram.com/baharssener'
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Tattoo Services',
            itemListElement: [
                {
                    '@type': 'OfferCatalog',
                    name: 'Fine Line Tattoos',
                    description: 'Delicate and precise fine line tattoo designs'
                },
                {
                    '@type': 'OfferCatalog',
                    name: 'Custom Illustrations',
                    description: 'Unique artistic illustrations and designs'
                },
                {
                    '@type': 'OfferCatalog',
                    name: 'Collage Art',
                    description: 'Contemporary collage artwork and compositions'
                }
            ]
        }
    };
};
