import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl mx-auto border border-blue-100">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400">
          {siteConfig.name} • Clean Architecture Demo
        </div>
      </div>
    </div>
  );
}
