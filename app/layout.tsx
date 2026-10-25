import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Background from "@/components/Background";
import MouseGlow from "@/components/MouseGlow";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Nabila ELN is a systems-driven software engineer and solo founder building autonomous backend architectures. Ask me anything.";

export const metadata: Metadata = {
  title: "Nabila ELN | Software Engineer",
  description,
  openGraph: {
    title: "Nabila ELN | Software Engineer",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <Background />
        <MouseGlow />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}