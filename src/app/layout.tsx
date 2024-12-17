import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hostile Youth Records',
  description: 'The official website of Hostile Youth Records',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          scrollbarGutter: 'stable',
        }}
        className={`${geistSans.variable} ${geistMono.variable} bg-[#fffef4] antialiased transition-colors dark:bg-[#0e0e0e] dark:text-gray-100`}
      >
        <Nav />
        <div className="container mx-auto min-h-screen max-w-4xl border-[#333] px-4 pb-[15rem] pt-10 lg:pt-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
