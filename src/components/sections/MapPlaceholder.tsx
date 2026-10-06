import React from "react";
import { siteConfig } from "@/content/site";

export function MapPlaceholder() {
  const { mapPlaceholder } = siteConfig.contactPage;

  return (
    <div
      role="region"
      aria-label="Map location illustration"
      className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Abstract Map Grid Graphic */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="streetMap" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#f8fafc" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="20" cy="20" r="1.5" fill="#cbd5e1" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#streetMap)" />
        {/* Abstract road paths */}
        <path d="M -10 60 Q 90 80 210 50" fill="none" stroke="#64748b" strokeWidth="3" />
        <path d="M 80 -10 Q 110 90 70 210" fill="none" stroke="#64748b" strokeWidth="3" />
      </svg>

      {/* Center Marker Card */}
      <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-xs p-5 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-red-100 text-red-600 mb-3 shadow-xs">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h4 className="font-bold text-slate-900 text-sm">
          {mapPlaceholder.title}
        </h4>
        <p className="text-xs text-slate-600 mt-1 leading-snug">
          {mapPlaceholder.details}
        </p>
        <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
          {mapPlaceholder.coordinates}
        </div>
      </div>

      <span className="absolute bottom-3 left-3 text-[10px] text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
        Static Map Component (Zero Google Maps API cost)
      </span>
    </div>
  );
}
