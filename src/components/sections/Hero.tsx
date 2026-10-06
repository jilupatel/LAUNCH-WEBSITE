"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Hero() {
  const { hero, trustPoints } = siteConfig.home;

  const handleCtaClick = (ctaName: string, href: string) => {
    trackEvent("cta_click", {
      location: "hero",
      cta: ctaName,
      target: href,
    });
  };

  return (
    <section className="relative bg-white pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {hero.badge}
            </div>

            {/* Main Heading (single H1 for page SEO) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={hero.ctaPrimary.href}
                onClick={() => handleCtaClick("primary", hero.ctaPrimary.href)}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {hero.ctaPrimary.text}
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                onClick={() => handleCtaClick("secondary", hero.ctaSecondary.href)}
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {hero.ctaSecondary.text}
              </Link>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Commitments:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-slate-700">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual illustration placeholder */}
          <div className="lg:col-span-5">
            <PlaceholderImage
              label="Service Operations Overview"
              category="Core Platform"
              aspect="4/3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
