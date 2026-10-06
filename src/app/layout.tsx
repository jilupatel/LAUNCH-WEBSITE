import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GTM } from "@/components/layout/GTM";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { DemoToolsDrawer } from "@/components/demo-tools/DemoToolsDrawer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
const gscToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Professional Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  verification: gscToken ? { google: gscToken } : undefined,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <GTM />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <DemoToolsDrawer />
      </body>
    </html>
  );
}
