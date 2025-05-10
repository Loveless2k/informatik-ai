import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Informatik-AI',
  description: 'Learn about Informatik-AI, our mission, vision, and the team behind our innovative AI solutions for businesses.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
