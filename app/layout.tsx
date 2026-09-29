import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurante Galeón | Mejor Restaurante en Asturias - Sidrería en Villaviciosa",
  description: "Restaurante Galeón en Villaviciosa, Asturias. Considerada la mejor sidrería y restaurante de Asturias. Sidra natural, mariscos frescos y cocina asturiana tradicional.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Restaurante Galeón",
    "image": "https://www.restaurantegaleon.com/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Villaviciosa",
      "addressRegion": "Asturias",
      "addressCountry": "ES"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1240",
      "bestRating": "5"
    },
    "servesCuisine": "Asturiana, Sidrería, Mariscos",
    "priceRange": "€€"
  };

  return (
    <html lang="es">
      <body style={{margin:0}}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
