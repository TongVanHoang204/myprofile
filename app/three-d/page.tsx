import type { Metadata } from "next";
import ThreeDExperiencePage from "@/app/components/three-d/ThreeDExperiencePage";

export const metadata: Metadata = {
  title: "3D Experience",
  description:
    "A cinematic liquid-glass landing page experiment with immersive video sections and motion-driven storytelling.",
};

export default function ThreeDPage() {
  return <ThreeDExperiencePage />;
}
