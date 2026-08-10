import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SkillByte | Master your life. One micro-app at a time.",
  description: "A premium micro-app portal that provides addictive, educational tools for different aspects of human life.",
  icons: {
    icon: "/logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-black dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
