"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rawNumber = siteConfig.contact.whatsappNumber?.trim() || "";
  const hasLiveNumber = rawNumber.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    trackEvent("whatsapp_click", {
      mode: hasLiveNumber ? "live" : "demo_modal",
      targetNumber: hasLiveNumber ? rawNumber : "demo_placeholder",
    });

    if (!hasLiveNumber) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const whatsappLink = hasLiveNumber
    ? `https://wa.me/${rawNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        siteConfig.contact.whatsappDefaultMessage
      )}`
    : "#";

  return (
    <>
      {/* Floating Action Button */}
      <aside aria-label="WhatsApp Contact Action" className="fixed bottom-6 right-6 z-40">
        <a
          id="whatsapp-floating-btn"
          href={whatsappLink}
          target={hasLiveNumber ? "_blank" : undefined}
          rel={hasLiveNumber ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          aria-label="Chat with us on WhatsApp"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-6 h-6 fill-current shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 2C6.516 2 2.03 6.486 2.03 12.001c0 1.954.566 3.778 1.542 5.32L2 22.001l4.814-1.528c1.47.886 3.208 1.396 5.217 1.396 5.516 0 10.002-4.486 10.002-10.002C22.033 6.486 17.547 2 12.031 2zm0 18.25c-1.748 0-3.376-.5-4.757-1.374l-.341-.219-2.855.906.924-2.776-.239-.364a8.17 8.17 0 01-1.309-4.422c0-4.549 3.7-8.25 8.25-8.25 4.549 0 8.25 3.701 8.25 8.25 0 4.55-3.701 8.25-8.25 8.25zm4.537-6.177c-.248-.124-1.469-.724-1.696-.807-.228-.083-.393-.124-.559.124-.166.248-.642.807-.787.973-.145.166-.29.187-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.237-1.472-1.382-1.72-.145-.248-.016-.382.108-.506.112-.111.248-.29.373-.435.124-.145.166-.248.248-.415.083-.166.041-.311-.021-.435-.062-.124-.559-1.348-.766-1.846-.201-.486-.406-.42-.559-.427-.145-.008-.311-.01-.477-.01-.166 0-.435.062-.663.311-.228.248-.87 0.85-.87 2.073 0 1.223.89 2.406 1.014 2.572.124.166 1.751 2.673 4.242 3.748.593.256 1.056.409 1.417.524.595.189 1.137.162 1.565.098.477-.071 1.469-.6 1.677-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.477-.29z" />
          </svg>
          <span className="hidden sm:inline font-medium text-sm pr-1">Chat on WhatsApp</span>
        </a>
      </aside>

      {/* Demo WhatsApp Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex p-1.5 rounded-md bg-[#25D366]/10 text-[#20bd5a]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2C6.516 2 2.03 6.486 2.03 12.001c0 1.954.566 3.778 1.542 5.32L2 22.001l4.814-1.528c1.47.886 3.208 1.396 5.217 1.396 5.516 0 10.002-4.486 10.002-10.002C22.033 6.486 17.547 2 12.031 2z" />
                  </svg>
                </span>
                <h3 id="wa-modal-title" className="text-lg font-bold text-slate-900">
                  DEMO WhatsApp Connector
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                In the live <strong>₹7,499 Launch Website</strong>, clicking this button instantly redirects the visitor to a real WhatsApp conversation with your business:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-700">
                <p className="font-semibold text-slate-900 mb-1">Target Action Preview:</p>
                <p className="truncate">URL: https://wa.me/91XXXXXXXXXX</p>
                <p className="mt-1 text-slate-500">Prefilled: &quot;{siteConfig.contact.whatsappDefaultMessage}&quot;</p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs">
                <strong>Why is this modal appearing?</strong>
                <p className="mt-0.5">
                  The environment variable <code className="bg-amber-100 px-1 py-0.5 rounded">NEXT_PUBLIC_WHATSAPP_NUMBER</code> is currently empty in <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code>. Once configured with your phone number, visitors will jump directly into WhatsApp without this prompt.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
