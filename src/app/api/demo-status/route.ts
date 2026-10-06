import { NextResponse } from "next/server";

export async function GET() {
  const hasSheetUrl = Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim());
  const emailProvider = process.env.EMAIL_PROVIDER?.trim().toLowerCase() || "mock";
  const hasWhatsApp = Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim());
  const hasGtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID?.trim());
  const hasGsc = Boolean(process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim());

  return NextResponse.json({
    sheet: {
      status: hasSheetUrl ? "live" : "mock",
      label: hasSheetUrl ? "Connected (Apps Script Webhook)" : "Mock Mode (Local Sheet)",
      description: hasSheetUrl
        ? "Form entries are sent directly to your Google Sheet tab."
        : "Stored in client-side localStorage spreadsheet for demonstration.",
    },
    email: {
      status: emailProvider === "smtp" ? "live" : emailProvider === "ethereal" ? "ethereal" : "mock",
      label:
        emailProvider === "smtp"
          ? "Live SMTP Connected"
          : emailProvider === "ethereal"
          ? "Ethereal Test Sandbox"
          : "Mock Outbox (Client Simulation)",
      description:
        emailProvider === "smtp"
          ? "Real emails are dispatched to owner and client via SMTP."
          : emailProvider === "ethereal"
          ? "Disposable test inboxes created with viewable web preview links."
          : "Emails are stored and inspectable in the Demo Tools outbox.",
    },
    whatsapp: {
      status: hasWhatsApp ? "live" : "demo_modal",
      label: hasWhatsApp ? "Live WhatsApp Number" : "Interactive Demo Modal",
      description: hasWhatsApp
        ? `Opens direct chat with wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}.`
        : "Opens an educational modal showing the live chat behavior.",
    },
    gtm: {
      status: hasGtm ? "live" : "datalayer_only",
      label: hasGtm ? `Active (ID: ${process.env.NEXT_PUBLIC_GTM_ID})` : "DataLayer Inspector Only",
      description: hasGtm
        ? "Google Tag Manager container script is loaded in page head."
        : "Events are pushed to window.dataLayer and logged in Demo Tools.",
    },
    gsc: {
      status: hasGsc ? "configured" : "omitted",
      label: hasGsc ? "Verification Meta Tag Present" : "Meta Tag Omitted (Empty Env)",
      description: hasGsc
        ? "Google Search Console ownership token is included in HTML head."
        : "Set NEXT_PUBLIC_GSC_VERIFICATION in .env.local to activate.",
    },
  });
}
