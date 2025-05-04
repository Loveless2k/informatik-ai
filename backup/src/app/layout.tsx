import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

// Default metadata (will be overridden by page-specific metadata)
export const metadata: Metadata = {
  title: "Informatik-AI | Soluciones Inteligentes de IA para Empresas",
  description: "Informatik-AI ofrece soluciones de IA de vanguardia para empresas, incluyendo consultoría de IA, machine learning, analítica de datos y desarrollo personalizado de IA.",
  keywords: "soluciones de IA, inteligencia artificial, machine learning, analítica de datos, inteligencia empresarial, transformación digital",
  authors: [{ name: "Informatik-AI Team" }],
  creator: "Informatik-AI",
  publisher: "Informatik-AI",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://informatik-ai.com'),
  alternates: {
    languages: {
      'en-US': '/en',
      'es-ES': '/',
    },
    canonical: '/',
  },
  openGraph: {
    title: "Informatik-AI | Soluciones Inteligentes de IA para Empresas",
    description: "Soluciones de IA de vanguardia para impulsar la transformación digital de tu empresa",
    url: 'https://informatik-ai.com',
    siteName: 'Informatik-AI',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Informatik-AI | Soluciones de IA para Empresas",
    description: "Soluciones de IA de vanguardia para impulsar la transformación digital de tu empresa",
    creator: '@informatik_ai',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
