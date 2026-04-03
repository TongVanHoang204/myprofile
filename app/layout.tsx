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
const personName = "T\u1ed1ng V\u0103n Ho\u00e0ng";
const siteDescription =
  "Portfolio c\u1ee7a T\u1ed1ng V\u0103n Ho\u00e0ng, sinh vi\u00ean HUTECH \u0111\u1ecbnh h\u01b0\u1edbng Web Developer Intern v\u1edbi React, Node.js, Express, Flutter v\u00e0 Git workflow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personName} - Portfolio`,
    template: `%s | ${personName}`,
  },
  description: siteDescription,
  keywords: [
    personName,
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
    title: `${personName} - Portfolio`,
    description: siteDescription,
    siteName: `Portfolio ${personName}`,
    locale: "vi_VN",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `Portfolio ${personName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personName} - Portfolio`,
    description: siteDescription,
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
    name: personName,
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
