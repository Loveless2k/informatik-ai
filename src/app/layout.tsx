'use client';

import { Geist, Geist_Mono, Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import { ThemeProvider } from '@/context/ThemeContext';

// Load fonts
const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Forzar recarga de estilos en desarrollo
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FORCE_REFRESH === 'true') {
      const style = document.createElement('style');
      document.head.appendChild(style);
      document.head.removeChild(style);
    }
  }, []);

  // Verificar si la página está encendida
  const isPaginaEncendida = process.env.PRENDER_Y_APAGAR_PAGINA === 'ON';

  return (
    <html lang='es' className='scroll-smooth'>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <ThemeProvider>
        <body
          className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} font-outfit antialiased min-h-screen flex flex-col`}
        >
          {isPaginaEncendida && <Header />}
          <main className={isPaginaEncendida ? 'flex-grow' : 'min-h-screen'}>
            <PageTransition>{children}</PageTransition>
          </main>
          {isPaginaEncendida && <Footer />}
        </body>
      </ThemeProvider>
    </html>
  );
}
