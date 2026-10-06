import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";

export const metadata: Metadata = {
  title: "Contact Us",
  description: siteConfig.contactPage.header.subtitle,
};

export default function ContactPage() {
  const { header } = siteConfig.contactPage;
  const { contact, socialLinks } = siteConfig;

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Reach Out Directly
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {header.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {header.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content: Details + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info & Static Map */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Communication Channels
                </h2>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg">📍</span>
                    <div>
                      <strong className="block text-slate-900 text-xs uppercase tracking-wide">
                        Office Location
                      </strong>
                      <span className="text-slate-600">{contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg">✉️</span>
                    <div>
                      <strong className="block text-slate-900 text-xs uppercase tracking-wide">
                        Inquiry Email
                      </strong>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg">📞</span>
                    <div>
                      <strong className="block text-slate-900 text-xs uppercase tracking-wide">
                        Direct Phone
                      </strong>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-slate-800 hover:text-blue-600 font-medium"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-lg">🕒</span>
                    <div>
                      <strong className="block text-slate-900 text-xs uppercase tracking-wide">
                        Operating Hours
                      </strong>
                      <span>{contact.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Online Profiles
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* Embedded-style Static Map Placeholder */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Location Preview
                </h3>
                <MapPlaceholder />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below. Submissions trigger automated lead capture and instant confirmation.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
