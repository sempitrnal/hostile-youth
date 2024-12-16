import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[#0e0e0e] transition-colors  dark:text-gray-100`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
