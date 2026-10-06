"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

interface CtaStripProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CtaStrip({
  title,
  description,
  ctaText,
  ctaHref,
}: CtaStripProps) {
  const finalTitle = title || siteConfig.home.ctaStrip.title;
  const finalDesc = description || siteConfig.home.ctaStrip.description;
  const finalCta = ctaText || siteConfig.home.ctaStrip.cta.text;
  const finalHref = ctaHref || siteConfig.home.ctaStrip.cta.href;

  const handleClick = () => {
    trackEvent("cta_click", {
      location: "cta_strip",
      target: finalHref,
      text: finalCta,
    });
  };

  return (
    <section className="bg-blue-600 text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {finalTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-blue-100">
              {finalDesc}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={finalHref}
              onClick={handleClick}
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-blue-700 bg-white hover:bg-blue-50 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              {finalCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
