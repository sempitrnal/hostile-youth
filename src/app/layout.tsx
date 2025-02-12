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
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between px-4 pb-[15rem] pt-10 lg:flex-row lg:pt-10">
          {/* Sidebar */}

          <div className="container min-h-screen w-full border-[#333] lg:w-[100%]">
            {children}
          </div>
          {/* <div className="sticky top-[7.5rem] h-full w-max bg-transparent p-5 transition-[width]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Categories
            </h2>
            <ul>
              <li>
                <a href="/rock" className="text-gray-700 dark:text-gray-300">
                  Rock
                </a>
              </li>
              <li>
                <a href="/pop" className="text-gray-700 dark:text-gray-300">
                  Pop
                </a>
              </li>
              <li>
                <a href="/hip-hop" className="text-gray-700 dark:text-gray-300">
                  Hip-Hop
                </a>
              </li>
            </ul>
            <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">
              Connect
            </h2>
            <ul>
              <li>
                <a
                  href="https://twitter.com/hostileyouth"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/hostileyouth"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
