import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Y ESWAR — Data Scientist | AI / ML Researcher',
  description:
    'Portfolio of Y Eswar — Data Scientist, AI/ML Engineer and researcher working across machine learning, computer vision, multimodal AI and cloud technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
