import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CtaStrip } from "@/components/sections/CtaStrip";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <AboutTeaser />
      <CtaStrip />
    </>
  );
}
