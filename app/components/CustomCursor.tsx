"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const TRAIL_COUNT = 8;

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const isHovering = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  // Trail positions stored in a ref for canvas drawing
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const rawPos = useRef({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Init trail
    trailRef.current = Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }));

    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
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

    // Canvas trail animation
    let hue = 260;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) { animFrameRef.current = requestAnimationFrame(draw); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx) { animFrameRef.current = requestAnimationFrame(draw); return; }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail — each point chases the one before it
      const trail = trailRef.current;
      trail[0] = { x: rawPos.current.x, y: rawPos.current.y };
      for (let i = 1; i < trail.length; i++) {
        trail[i] = {
          x: trail[i].x + (trail[i - 1].x - trail[i].x) * 0.35,
          y: trail[i].y + (trail[i - 1].y - trail[i].y) * 0.35,
        };
      }

      // Draw energy trail
      hue = (hue + 0.8) % 360;
      for (let i = trail.length - 1; i >= 1; i--) {
        const t = 1 - i / trail.length;
        const size = 6 * t;
        const alpha = t * 0.85;

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          trail[i].x, trail[i].y, 0,
          trail[i].x, trail[i].y, size * 2
        );
        gradient.addColorStop(0, `hsla(${hue}, 90%, 75%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${hue + 40}, 80%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Core orb */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{ x: smoothX, y: smoothY }}
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: hovering ? 52 : clicking ? 20 : 36,
            height: hovering ? 52 : clicking ? 20 : 36,
            rotate: 360,
            borderColor: hovering
              ? "rgba(251,191,36,0.9)"
              : "rgba(167,139,250,0.7)",
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            rotate: { duration: 2, ease: "linear", repeat: Infinity },
            borderColor: { duration: 0.2 },
          }}
          style={{
            borderWidth: 2,
            borderStyle: "dashed",
            borderRadius: "50%",
          }}
        />

        {/* Second counter-rotating ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: hovering ? 34 : 22,
            height: hovering ? 34 : 22,
            rotate: -360,
            borderColor: hovering
              ? "rgba(251,191,36,0.5)"
              : "rgba(139,92,246,0.5)",
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            rotate: { duration: 1.2, ease: "linear", repeat: Infinity },
            borderColor: { duration: 0.2 },
          }}
          style={{
            borderWidth: 1.5,
            borderStyle: "solid",
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />

        {/* Inner glowing core */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: clicking ? 3 : hovering ? 10 : 6,
            height: clicking ? 3 : hovering ? 10 : 6,
            backgroundColor: hovering ? "#fbbf24" : "#c4b5fd",
            boxShadow: hovering
              ? "0 0 12px 4px rgba(251,191,36,0.9), 0 0 30px 8px rgba(251,191,36,0.4)"
              : clicking
              ? "0 0 4px 2px rgba(196,181,253,0.5)"
              : "0 0 8px 3px rgba(167,139,250,0.9), 0 0 20px 6px rgba(139,92,246,0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        />

        {/* Hover burst particles */}
        <AnimatePresence>
          {hovering && (
            <>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <motion.div
                  key={deg}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300"
                  initial={{ width: 3, height: 3, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((deg * Math.PI) / 180) * 22,
                    y: Math.sin((deg * Math.PI) / 180) * 22,
                    opacity: 0.7,
                    width: 3,
                    height: 3,
                  }}
                  exit={{ opacity: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    boxShadow: "0 0 6px 2px rgba(251,191,36,0.8)",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
