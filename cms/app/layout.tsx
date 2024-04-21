import type { Metadata } from 'next';
import { Noto_Sans as Sans, Noto_Sans_Mono as Mono } from 'next/font/google';
import './globals.css';

const mono = Mono({ subsets: ['latin'], variable: '--font-mono' });
const sans = Sans({ subsets: ['latin'], variable: '--font-sans', axes: ['wdth']  });

export const metadata: Metadata = {
  title: 'Anne CMS',
  description: 'Content Management System for SoundsVegan.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`dark ${mono.variable} ${sans.className}`}>{children}</body>
    </html>
  );
}
