"use client";

import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ParticleBackground from "@/app/components/ParticleBackground";
import ScrollProgress from "@/app/components/ScrollProgress";
import RouteTransitionLoader from "@/app/components/RouteTransitionLoader";
import SpotifyPlayer from "@/app/components/SpotifyPlayer";
import CustomCursor from "@/app/components/CustomCursor";

type AppChromeProps = {
  children: React.ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const isImmersiveRoute = false;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {!isImmersiveRoute ? <ParticleBackground /> : null}
      {!isImmersiveRoute ? <ScrollProgress /> : null}
      <Suspense fallback={null}>
        <RouteTransitionLoader />
      </Suspense>

      {!isImmersiveRoute ? <Navbar /> : null}
      <main className="w-full flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={usePathname()}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isImmersiveRoute ? <Footer /> : null}
      
      {/* Global Music Player */}
      <SpotifyPlayer />
      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
}
