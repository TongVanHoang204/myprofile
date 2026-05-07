import type { Metadata } from "next";
import ThreeDExperiencePage from "@/app/components/three-d/ThreeDExperiencePage";

export const metadata: Metadata = {
  title: "UI/UX Bio",
  description:
    "A compact UI/UX bio page for Tong Van Hoang with profile links, project highlights, and motion-led portfolio signals.",
};

export default function ThreeDPage() {
  return <ThreeDExperiencePage />;
}
