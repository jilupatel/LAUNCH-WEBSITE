import React from "react";
import { siteConfig } from "@/content/site";

export function ProcessSteps() {
  const { process } = siteConfig.about;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            How We Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our 3-Step Engagement Process
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A clear, predictable roadmap from initial consultation to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {process.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-slate-50 rounded-xl p-8 border border-slate-200/80 flex flex-col justify-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-black text-blue-600">
                  {step.step}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phase {idx + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
