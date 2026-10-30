import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://evioncharge.com'),
  title: 'EVION | Smarter Electric Vehicle Charging Solutions',
  description:
    "Discover EVION's electric vehicle charging solutions for a more seamless charging experience. High-power DC charging hubs, smart station discovery, and enterprise infrastructure.",
  keywords: [
    'EV charging',
    'electric vehicle charging solutions',
    'EV charging station',
    'ultra fast charging',
    'commercial EV charging',
    'home EV wallbox',
    'EVION charging network',
  ],
  authors: [{ name: 'EVION Mobility Ltd' }],
  openGraph: {
    title: 'EVION | Smarter Electric Vehicle Charging Solutions',
    description:
      "Discover EVION's electric vehicle charging solutions for a more seamless charging experience.",
    type: 'website',
    locale: 'en_GB',
    siteName: 'EVION Charging',
    images: [
      {
        url: '/images/hero-poster.jpg',
        width: 1920,
        height: 1080,
        alt: 'EVION Electric Vehicle Charging Station in Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EVION | Smarter Electric Vehicle Charging Solutions',
    description:
      "Discover EVION's electric vehicle charging solutions for a more seamless charging experience.",
    images: ['/images/hero-poster.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lato.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400;1,6..12,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutomotiveBusiness',
              name: 'EVION',
              description:
                'Electric vehicle charging infrastructure network and smart charging solutions provider.',
              url: 'https://evioncharge.com',
              serviceType: 'Electric Vehicle Charging Stations',
              areaServed: 'Global',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-charcoal font-sans antialiased selection:bg-electric-green/30 selection:text-charcoal flex flex-col justify-between">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
