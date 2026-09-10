import {
  Playfair_Display,
  DM_Sans,
  Space_Mono,
  Noto_Sans_Telugu,
} from 'next/font/google';

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700', '900'],
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const fontVariables = [
  playfairDisplay.variable,
  dmSans.variable,
  spaceMono.variable,
  notoSansTelugu.variable,
].join(' ');
