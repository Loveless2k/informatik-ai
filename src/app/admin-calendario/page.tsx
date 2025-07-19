import { Metadata } from 'next';
import CalendarioAdmin from '@/components/CalendarioAdmin';

export const metadata: Metadata = {
  title: 'Panel de Administración | Calendario Informatik-AI',
  description: 'Panel de administración para gestionar el calendario de reuniones de Informatik-AI. Acceso restringido.',
  keywords: 'administración, calendario, Informatik-AI, panel admin, gestión horarios',
  robots: {
    index: false, // No indexar páginas de admin
    follow: false,
  },
};

export default function CalendarioAdminPage() {
  return <CalendarioAdmin />;
}
