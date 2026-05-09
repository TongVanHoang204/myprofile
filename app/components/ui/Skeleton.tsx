"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkeletonProps {
  className?: string;
  variant?: "rectangle" | "circle" | "rounded";
}

export default function Skeleton({ className, variant = "rectangle" }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "bg-slate-200 dark:bg-slate-800/50",
        variant === "circle" && "rounded-full",
        variant === "rounded" && "rounded-2xl",
        className
      )}
    />
  );
}
