import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DogSprite - Your Pixel Buddy",
    template: "%s | DogSprite",
  },
  description: "Create pixel art and animations in your browser. 100% local, zero cloud, completely private. Works offline, no accounts required.",
  keywords: ["pixel art editor", "sprite editor", "animation software", "offline pixel art", "privacy-first art tool", "local-first", "pixel art animation", "sprite creation", "game art", "indie developer tools"],
  authors: [{ name: "DogSprite", url: "https://dogsprite.org" }],
  creator: "DogSprite",
  publisher: "DogSprite",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dogsprite.org",
    languages: {
      en: "https://dogsprite.org",
      es: "https://dogsprite.org/es",
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: [
      { url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "DogSprite - Your Pixel Buddy",
    description: "Create pixel art and animations in your browser. 100% local, zero cloud, completely private.",
    url: "https://dogsprite.org",
    siteName: "DogSprite",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DogSprite - Your Pixel Buddy",
    description: "Create pixel art and animations in your browser. 100% local, zero cloud.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a1525",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
