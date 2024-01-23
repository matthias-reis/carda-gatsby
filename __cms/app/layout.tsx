import type { Metadata } from 'next';
import { Roboto, Fira_Code } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/StyleRegistry';
import './global.css';
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
const fira = Fira_Code({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anne CMS',
  description: 'Content Manager for SoundsVegan.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[roboto.className, fira.className].join(' ')}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
