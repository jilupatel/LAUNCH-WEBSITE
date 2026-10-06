"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function AboutTeaser() {
  const { aboutTeaser } = siteConfig.home;

  const handleClick = () => {
    trackEvent("cta_click", {
      location: "about_teaser",
      target: aboutTeaser.cta.href,
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual graphic */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <PlaceholderImage
              label="Our Approach & Team Values"
              category="Company Story"
              aspect="4/3"
            />
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              {aboutTeaser.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {aboutTeaser.title}
            </h2>

            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutTeaser.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
              {aboutTeaser.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl sm:text-2xl font-black text-blue-600">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={aboutTeaser.cta.href}
                onClick={handleClick}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {aboutTeaser.cta.text}
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
