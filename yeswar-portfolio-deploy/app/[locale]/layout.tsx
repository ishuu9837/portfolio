import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/lib/utils/fonts';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { SkipLink } from '@/components/ui/skip-link';
import { GrainOverlay } from '@/components/ui/grain-overlay';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Y ESWAR — Data Scientist | AI / ML Researcher',
  description:
    'Portfolio of Y Eswar — Data Scientist, AI/ML Engineer and researcher working across machine learning, computer vision, multimodal AI and cloud technologies.',
  keywords: [
    'Y Eswar',
    'Data Scientist',
    'AI',
    'ML',
    'Machine Learning',
    'Computer Vision',
    'Multimodal AI',
    'Portfolio',
    'Deep Learning',
    'Cloud',
  ],
  authors: [{ name: 'Y Eswar' }],
  creator: 'Y Eswar',
  openGraph: {
    title: 'Y ESWAR — Data Scientist | AI / ML Researcher',
    description:
      'Portfolio of Y Eswar — Data Scientist, AI/ML Engineer and researcher working across machine learning, computer vision, multimodal AI and cloud technologies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Y Eswar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Y ESWAR — Data Scientist | AI / ML Researcher',
    description:
      'Portfolio of Y Eswar — Data Scientist, AI/ML Engineer and researcher.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'te')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${fontVariables} font-body antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <SmoothScrollProvider>
              <SkipLink />
              <GrainOverlay />
              <CustomCursor />
              {children}
            </SmoothScrollProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
