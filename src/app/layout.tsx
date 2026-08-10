import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SkillByte | Master your life. One micro-app at a time.",
  description: "A premium micro-app portal that provides addictive, educational tools for different aspects of human life. Discover biological hacks, mechanics labs, and core fitness training.",
  keywords: ["SkillByte", "micro-apps", "education", "productivity", "fitness", "mechanics", "biology hack"],
  authors: [{ name: "SkillByte" }],
  openGraph: {
    title: "SkillByte | Master your life. One micro-app at a time.",
    description: "A premium micro-app portal that provides addictive, educational tools for different aspects of human life.",
    url: "https://skillbyte.us",
    siteName: "SkillByte",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "SkillByte Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillByte | Master your life. One micro-app at a time.",
    description: "A premium micro-app portal that provides addictive, educational tools for different aspects of human life.",
    images: ["/logo.jpg"],
  },
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EZ4XZQV2F1"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EZ4XZQV2F1', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-black dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
