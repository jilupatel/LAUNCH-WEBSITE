import React from "react";
import { siteConfig } from "@/content/site";

export function ServicesList() {
  const { services } = siteConfig.about;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Scope of Offerings
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Core Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A comprehensive suite of capabilities designed to cover your needs from concept to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  What is included:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 text-blue-600 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
