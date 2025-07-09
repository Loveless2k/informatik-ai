import { Metadata } from 'next';
import CalendarioInformatikAI from '@/components/CalendarioInformatikAI';

export const metadata: Metadata = {
  title: 'Calendario de Reuniones | Informatik-AI',
  description: 'Programa una reunión de 30 minutos con el equipo de Informatik-AI. Horarios disponibles de 19:00 a 21:00 hrs.',
  keywords: 'calendario, reuniones, Informatik-AI, consultoría, inteligencia artificial, programar cita',
  openGraph: {
    title: 'Calendario de Reuniones | Informatik-AI',
    description: 'Programa una reunión de 30 minutos con el equipo de Informatik-AI. Horarios disponibles de 19:00 a 21:00 hrs.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calendario de Reuniones | Informatik-AI',
    description: 'Programa una reunión de 30 minutos con el equipo de Informatik-AI. Horarios disponibles de 19:00 a 21:00 hrs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalendarioPage() {
  return <CalendarioInformatikAI />;
}
