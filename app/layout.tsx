import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jorge Mejía — Fullstack Developer',
  description:
    'Portfolio of Jorge Mejía, fullstack developer based in Guatemala City, building web applications and APIs.',
};

/** Enables `env(safe-area-inset-*)` for notched iPhones and similar devices. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Prevent theme flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('jm-theme');
                if (t) document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --display: ${spaceGrotesk.style.fontFamily}, 'Helvetica Neue', sans-serif;
                --sans: ${spaceGrotesk.style.fontFamily}, 'Helvetica Neue', sans-serif;
                --mono: ${jetbrainsMono.style.fontFamily}, 'Courier New', monospace;
                --serif: ${cormorantGaramond.style.fontFamily}, ui-serif, Georgia, serif;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
