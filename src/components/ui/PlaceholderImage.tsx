import React from "react";

interface PlaceholderImageProps {
  label: string;
  category?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "21/9";
  className?: string;
}

export function PlaceholderImage({
  label,
  category = "Service Preview",
  aspect = "16/9",
  className = "",
}: PlaceholderImageProps) {
  const aspectClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-4/3",
    "1/1": "aspect-square",
    "21/9": "aspect-21/9",
  }[aspect];

  return (
    <div
      role="img"
      aria-label={`${label} - Visual placeholder illustration`}
      className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 border border-slate-200 flex flex-col items-center justify-center p-6 select-none ${className}`}
    >
      {/* Abstract geometric background elements */}
      <svg
        className="absolute inset-0 h-full w-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2563eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 text-center max-w-xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 mb-3 border border-blue-600/20">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-1">
          {category}
        </p>
        <h3 className="text-sm font-medium text-slate-800 leading-snug">
          {label}
        </h3>
        <span className="inline-block mt-2 text-[11px] text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
          Industry-Neutral Placeholder
        </span>
      </div>
    </div>
  );
}
