"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = Math.random() * 0.5 - 0.25;
    this.vy = Math.random() * 0.5 - 0.25;
    this.size = Math.random() * 2 + 1;
    this.hue = Math.random() * 360; // Random starting hue for RGB effect
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    // Cycle hue for continuous RGB effect
    this.hue += 0.5;
    if (this.hue > 360) this.hue = 0;
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    // Dynamic RGB Color (HSL)
    // High saturation (100%) and Lightness (60% for dark / 50% for light)
    const lightness = isDark ? "60%" : "50%";
    const color = `hsl(${this.hue}, 100%, ${lightness})`;
    
    ctx.fillStyle = color;
    ctx.fill(); 
    
    // Glow effect matching the particle color
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 }; // Re-added mouse variable

    // Theme configuration
    const isDark = theme === "dark" || theme === "system";
    
    // RGB Effect configuration
    const lineBaseColor = isDark ? "255, 255, 255" : "15, 23, 42"; 

    // Removed inline class Particle

    const init = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      canvas.width = clientWidth;
      canvas.height = clientHeight;

      const area = clientWidth * clientHeight;
      const particleCount = Math.min(Math.floor(area / 15000), 200);
      
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Draw Particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, isDark);
      });

      // 2. Draw Connections (Reset shadow for performance)
      ctx.shadowBlur = 0;
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < maxDistance + 50) {
            const opacity = 1 - distMouse / (maxDistance + 50);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    init();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 transition-colors duration-300 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 -z-20" />
      <canvas ref={canvasRef} className="block w-full h-full opacity-60 dark:opacity-80" />
    </div>
  );
}
