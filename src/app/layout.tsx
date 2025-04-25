// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { emojiFavicon } from "@/lib/emojiFavicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sopiriye Jamabo | Interactive Terminal Resume",
    template: "%s | Sopiriye Jamabo",
  },
  description:
    "Explore the interactive terminal‑style resume of Sopiriye Jamabo — a creative frontend developer specializing in React, Next.js, and web experiences.",
  keywords: [
    "Sopiriye Jamabo",
    "Frontend Developer",
    "React",
    "Next.js",
    "Terminal Resume",
    "Portfolio",
  ],
  authors: [{ name: "Sopiriye Jamabo", url: "https://sopiriye.xyz" }],
  creator: "Sopiriye Jamabo",
  openGraph: {
    title: "Sopiriye Jamabo | Interactive Terminal Resume",
    description:
      "A unique terminal‑style resume for Sopiriye Jamabo, frontend engineer and creative web builder.",
    url: "https://sopiriye.xyz",
    siteName: "Sopiriye Jamabo",
    images: [
      {
        url: "https://sopiriye.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sopiriye Jamabo - Interactive Terminal Resume",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sopiriye Jamabo | Interactive Terminal Resume",
    description:
      "Explore the interactive terminal‑style resume of Sopiriye Jamabo — a creative frontend developer.",
    images: ["https://sopiriye.xyz/og-image.png"],
    creator: "@sopiriyejamabo",
  },
  icons: {
    icon: emojiFavicon,              
    apple: emojiFavicon,             
    shortcut: emojiFavicon,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
