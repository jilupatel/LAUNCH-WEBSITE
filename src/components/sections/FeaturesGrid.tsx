import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function FeaturesGrid() {
  const { features } = siteConfig.home;

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            What We Deliver
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Key Capabilities & Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Engineered with a focus on reliability, clear outcomes, and professional standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    {feature.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Learn details
                  <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
