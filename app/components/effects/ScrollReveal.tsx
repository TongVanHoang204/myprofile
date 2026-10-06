"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  width = "fit-content",
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getVariants = () => {
    const distance = 50;
    
    const hidden = { opacity: 0, x: 0, y: 0 };
    if (direction === "up") hidden.y = distance;
    if (direction === "down") hidden.y = -distance;
    if (direction === "left") hidden.x = distance;
    if (direction === "right") hidden.x = -distance;

    return {
      hidden,
      visible: { opacity: 1, x: 0, y: 0 },
    };
  };

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
