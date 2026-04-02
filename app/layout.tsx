import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "@/app/context/LanguageContext";
import { contactInfo, socialLinks } from "@/app/data/contact";
import RouteTransitionLoader from "@/app/components/RouteTransitionLoader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const vercelUrl =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
const ogImage =
  process.env.NEXT_PUBLIC_OG_IMAGE || "/profile/tong-van-hoang-avatar.jpg";
const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tống Văn Hoàng - Portfolio",
    template: "%s | Tống Văn Hoàng",
  },
  description:
    "Portfolio của Tống Văn Hoàng, sinh viên HUTECH định hướng Web Developer Intern với React, Node.js, Express, Flutter và Git workflow.",
  keywords: [
    "Tống Văn Hoàng",
    "Portfolio",
    "Web Developer",
    "Web Developer Intern",
    "React",
    "Node.js",
    "Express",
    "Flutter",
    "GitHub",
    "HUTECH",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Tống Văn Hoàng - Portfolio",
    description:
      "Portfolio của Tống Văn Hoàng, sinh viên HUTECH định hướng Web Developer Intern với React, Node.js, Express, Flutter và Git workflow.",
    siteName: "Portfolio Tống Văn Hoàng",
    locale: "vi_VN",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Portfolio Tống Văn Hoàng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tống Văn Hoàng - Portfolio",
    description:
      "Portfolio của Tống Văn Hoàng, sinh viên HUTECH định hướng Web Developer Intern với React, Node.js, Express, Flutter và Git workflow.",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tống Văn Hoàng",
    url: siteUrl,
    email: `mailto:${contactInfo.email}`,
    telephone: contactInfo.phone,
    jobTitle: "Web Developer Intern",
    sameAs: socialLinks.map((item) => item.href),
  };

  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              <ParticleBackground />
              <ScrollProgress />
              <Suspense fallback={null}>
                <RouteTransitionLoader />
              </Suspense>

              <Navbar />
              <main className="w-full flex-1">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
