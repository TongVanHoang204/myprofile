"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("[data-cursor-grow]")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ 
        x: mouseX, 
        y: mouseY,
        translateX: "-15%", // Adjust offset to align finger tip accurately
        translateY: "-15%",
      }}
    >
      <motion.div
        animate={{
          scale: clicking ? 0.9 : hovering ? 1.1 : 1,
          rotate: hovering ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative h-20 w-20"
      >
        <img
          src="/cursor-arm.png"
          alt="Cursor Arm"
          className="h-full w-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}
