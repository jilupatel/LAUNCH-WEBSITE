import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ServicesList } from "@/components/sections/ServicesList";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaStrip } from "@/components/sections/CtaStrip";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "About & Services",
  description: siteConfig.about.header.subtitle,
};

export default function AboutPage() {
  const { header, story, values, ctaBanner } = siteConfig.about;

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Company Overview & Solutions
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {header.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {header.subtitle}
          </p>
        </div>
      </section>

      {/* Story & Commitment Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {story.title}
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {story.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Core Values */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {values.map((val) => (
                  <div key={val.title} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{val.title}</h3>
                    <p className="text-xs text-slate-600 leading-normal">{val.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderImage
                label="Mission & Team Overview"
                category="Company Profile"
                aspect="4/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <ServicesList />

      {/* 3-Step Process Steps */}
      <ProcessSteps />

      {/* Bottom CTA Banner */}
      <CtaStrip
        title={ctaBanner.title}
        description={ctaBanner.description}
        ctaText={ctaBanner.cta.text}
        ctaHref={ctaBanner.cta.href}
      />
    </div>
  );
}
