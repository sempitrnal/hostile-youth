import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hostile Youth Records",
  description: "The official website of Hostile Youth Records",
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
          scrollbarGutter: "stable",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fffef4] dark:bg-[#0e0e0e] transition-colors  dark:text-gray-100`}
      >
        <Nav />
        <div className="container  max-w-4xl min-h-screen px-2 pt-10   mx-auto  border-[#333] lg:pt-10 pb-[15rem]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
