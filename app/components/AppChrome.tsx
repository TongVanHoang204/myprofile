"use client";

import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ParticleBackground from "@/app/components/ParticleBackground";
import ScrollProgress from "@/app/components/ScrollProgress";
import RouteTransitionLoader from "@/app/components/RouteTransitionLoader";

type AppChromeProps = {
  children: React.ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isImmersiveRoute = pathname === "/three-d";

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {!isImmersiveRoute ? <ParticleBackground /> : null}
      {!isImmersiveRoute ? <ScrollProgress /> : null}
      <Suspense fallback={null}>
        <RouteTransitionLoader />
      </Suspense>

      {!isImmersiveRoute ? <Navbar /> : null}
      <main className="w-full flex-1">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>
      {!isImmersiveRoute ? <Footer /> : null}
    </div>
  );
}
