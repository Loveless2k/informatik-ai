import { Metadata } from 'next';
import CalendarioPublico from '@/components/CalendarioPublico';

export const metadata: Metadata = {
  title: 'Reserva tu Reunión | Informatik-AI',
  description: 'Agenda una reunión de 30 minutos con el equipo de Informatik-AI. Sin registro requerido. Horarios disponibles de 19:00 a 21:00 hrs.',
  keywords: 'calendario, reservar reunión, Informatik-AI, consultoría, inteligencia artificial, agendar cita, sin registro',
  openGraph: {
    title: 'Reserva tu Reunión | Informatik-AI',
    description: 'Agenda una reunión de 30 minutos con el equipo de Informatik-AI. Sin registro requerido. Horarios disponibles de 19:00 a 21:00 hrs.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reserva tu Reunión | Informatik-AI',
    description: 'Agenda una reunión de 30 minutos con el equipo de Informatik-AI. Sin registro requerido.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CalendarioPublicoPage() {
  return <CalendarioPublico />;
}
