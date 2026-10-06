"use client";

import React, { useState, useEffect } from "react";
import {
  getStoredSheetRows,
  getStoredEmailMessages,
  getStoredTrackingEvents,
  saveStoredSheetRow,
  resetDemoStorage,
  STORAGE_UPDATE_EVENT,
  StoredSheetRow,
  StoredEmailMessage,
  StoredTrackEvent,
} from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";

interface IntegrationStatus {
  sheet: { status: string; label: string; description: string };
  email: { status: string; label: string; description: string };
  whatsapp: { status: string; label: string; description: string };
  gtm: { status: string; label: string; description: string };
  gsc: { status: string; label: string; description: string };
}

export function DemoToolsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"package" | "sheet" | "email" | "tracking" | "status">("package");
  const [sheetRows, setSheetRows] = useState<StoredSheetRow[]>([]);
  const [emailMessages, setEmailMessages] = useState<StoredEmailMessage[]>([]);
  const [trackingEvents, setTrackingEvents] = useState<StoredTrackEvent[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<StoredEmailMessage | null>(null);
  const [statusInfo, setStatusInfo] = useState<IntegrationStatus | null>(null);
  const [isHiddenByParam, setIsHiddenByParam] = useState(false);

  // Check ?demo=off
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("demo") === "off") {
        setIsHiddenByParam(true);
      }
    }
  }, []);

  // Fetch status info from /api/demo-status
  useEffect(() => {
    fetch("/api/demo-status")
      .then((res) => res.json())
      .then((data) => setStatusInfo(data))
      .catch((err) => console.error("Error fetching demo status", err));
  }, []);

  // Sync localStorage records
  const loadData = () => {
    setSheetRows(getStoredSheetRows());
    setEmailMessages(getStoredEmailMessages());
    setTrackingEvents(getStoredTrackingEvents());
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => loadData();
    window.addEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
  }, []);

  const handleAddSampleInquiry = () => {
    const sampleRecord: StoredSheetRow = {
      id: "sample_" + Date.now(),
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: "Prospective Client (Demo)",
      email: "demo.buyer@example.com",
      phone: "+91 98765 00112",
      message: "Hello! We are interested in ordering your services. Please provide quote details.",
      source: "Demo Tools Quick-Add",
      mode: statusInfo?.sheet.status || "mock",
    };
    saveStoredSheetRow(sampleRecord);
    trackEvent("demo_sample_row_added", { name: sampleRecord.name });
  };

  const handleResetData = () => {
    if (confirm("Reset all demo data back to default sample state?")) {
      resetDemoStorage();
      setSelectedEmail(null);
      trackEvent("demo_data_reset");
    }
  };

  if (isHiddenByParam) {
    return null;
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <aside aria-label="Sales Demo Controls" className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-lg hover:shadow-xl border border-slate-700 transition-all focus:outline-none focus:ring-4 focus:ring-slate-500/40"
          aria-label="Open Demo Tools Sales Helper"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>🛠️ Demo Tools</span>
          <span className="bg-blue-600 text-[10px] px-1.5 py-0.5 rounded font-bold">
            ₹7,499
          </span>
        </button>
      </aside>

      {/* Main Drawer Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-tools-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛠️</span>
                <div>
                  <h3 id="demo-tools-title" className="text-base font-bold flex items-center gap-2">
                    Launch Website Sales Demo Inspector
                    <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-blue-600 text-white">
                      ₹7,499 Package
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Client walkthrough helper — inspect live integrations, mock sheet, and outbox
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800"
                aria-label="Close Demo Tools"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 gap-1 text-xs font-semibold overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("package")}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "package"
                    ? "border-blue-600 text-blue-600 font-bold bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                📋 Package Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sheet")}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "sheet"
                    ? "border-blue-600 text-blue-600 font-bold bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                📊 Google Sheet
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                  {sheetRows.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("email")}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "email"
                    ? "border-blue-600 text-blue-600 font-bold bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                ✉️ Outbox
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                  {emailMessages.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tracking")}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "tracking"
                    ? "border-blue-600 text-blue-600 font-bold bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                🎯 Tracking (dataLayer)
                <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                  {trackingEvents.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("status")}
                className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "status"
                    ? "border-blue-600 text-blue-600 font-bold bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                ⚙️ Status & Reset
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 text-slate-800 text-sm">
              {/* TAB 1: PACKAGE INFO */}
              {activeTab === "package" && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      ₹7,499 &quot;Launch Website&quot; Package Deliverables
                    </h4>
                    <p className="text-xs text-slate-500">
                      Show this screen to clients during sales pitch calls to demonstrate scope clarity.
                    </p>
                  </div>

                  {/* Included Deliverables */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                    <h5 className="font-semibold text-emerald-800 flex items-center gap-2 text-xs uppercase tracking-wider">
                      <span>✓</span> Included in this plan:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">3 Handcrafted Pages</strong>
                        <p className="text-slate-600">Home, About & Services, and Contact page.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">100% Mobile-First Responsive</strong>
                        <p className="text-slate-600">Tested across 360px (mobile), 768px (tablet), 1280px (desktop).</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">Free Google Sheet Webhook</strong>
                        <p className="text-slate-600">Customer leads saved into Google Sheets (no recurring database fees).</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">Instant Email Alert & Auto-Reply</strong>
                        <p className="text-slate-600">Owner receives new lead alert; customer gets instant confirmation.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">Floating WhatsApp Chat Trigger</strong>
                        <p className="text-slate-600">Direct wa.me chat link with prefilled message.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">GTM & Search Console Ready</strong>
                        <p className="text-slate-600">Google Tag Manager integration and Search Console verification.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">Search Engine Architecture</strong>
                        <p className="text-slate-600">sitemap.xml, robots.txt, and modern AI /llms.txt included.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">Domain, Hosting 1-Yr & SSL</strong>
                        <p className="text-slate-600">Included high-speed cloud hosting and free HTTPS SSL setup.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">2 Design Revisions Included</strong>
                        <p className="text-slate-600">Feedback rounds before project sign-off.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                        <strong className="text-slate-900">1-Month Post-Launch Support</strong>
                        <p className="text-slate-600">Bug fixes and technical guidance included.</p>
                      </div>
                    </div>
                  </div>

                  {/* NOT Included Callout */}
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-2">
                    <h5 className="font-semibold text-rose-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span>✕</span> NOT in this ₹7,499 plan (Upsell to Growth/Scale):
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-900">
                      <li>• No Admin CMS / Login Dashboard</li>
                      <li>• No Dynamic Blog / Publishing System</li>
                      <li>• No E-Commerce / Payment Gateways</li>
                      <li>• No User Accounts / Client Portals</li>
                      <li>• No Heavy 3D / Scroll Motion Libraries</li>
                      <li>• No Complex Custom Web Apps</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: GOOGLE SHEET */}
              {activeTab === "sheet" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          Google Sheet Submissions Table
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            statusInfo?.sheet.status === "live"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {statusInfo?.sheet.status === "live"
                            ? "LIVE GOOGLE APPS SCRIPT"
                            : "DEMO / MOCK STORAGE"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {statusInfo?.sheet.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddSampleInquiry}
                      className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs shrink-0"
                    >
                      + Quick Test Lead
                    </button>
                  </div>

                  {/* Spreadsheet Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                          <tr>
                            <th className="py-2.5 px-3">Timestamp</th>
                            <th className="py-2.5 px-3">Name</th>
                            <th className="py-2.5 px-3">Email</th>
                            <th className="py-2.5 px-3">Phone</th>
                            <th className="py-2.5 px-3">Message</th>
                            <th className="py-2.5 px-3">Source</th>
                            <th className="py-2.5 px-3">Mode</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {sheetRows.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center py-8 text-slate-400">
                                No submissions yet. Submit the contact form to see live rows.
                              </td>
                            </tr>
                          ) : (
                            sheetRows.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50">
                                <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                                  {row.timestamp}
                                </td>
                                <td className="py-2 px-3 font-semibold text-slate-900 font-sans">
                                  {row.name}
                                </td>
                                <td className="py-2 px-3 text-blue-600 font-sans">
                                  {row.email}
                                </td>
                                <td className="py-2 px-3 text-slate-700 whitespace-nowrap">
                                  {row.phone}
                                </td>
                                <td className="py-2 px-3 text-slate-600 max-w-xs truncate font-sans">
                                  {row.message}
                                </td>
                                <td className="py-2 px-3 text-slate-500 whitespace-nowrap font-sans">
                                  {row.source}
                                </td>
                                <td className="py-2 px-3">
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      row.mode === "live"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-slate-100 text-slate-600"
                                    }`}
                                  >
                                    {row.mode}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: OUTBOX */}
              {activeTab === "email" && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">Email Deliveries Outbox</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 uppercase">
                        {statusInfo?.email.status || "mock"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {statusInfo?.email.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* List */}
                    <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-96 overflow-y-auto">
                      {emailMessages.length === 0 ? (
                        <p className="p-6 text-center text-xs text-slate-400">
                          Outbox empty. Submit the contact form to trigger emails.
                        </p>
                      ) : (
                        emailMessages.map((msg) => (
                          <button
                            type="button"
                            key={msg.id}
                            onClick={() => setSelectedEmail(msg)}
                            className={`w-full text-left p-3.5 transition-colors text-xs flex flex-col gap-1 ${
                              selectedEmail?.id === msg.id
                                ? "bg-blue-50/80 border-l-4 border-blue-600"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  msg.type === "notification"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {msg.type === "notification" ? "Owner Lead Alert" : "Customer Auto-Reply"}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-800 truncate">
                              To: {msg.to}
                            </p>
                            <p className="text-slate-500 truncate">
                              {msg.subject}
                            </p>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Preview Detail */}
                    <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
                      {selectedEmail ? (
                        <div className="space-y-4">
                          <div className="border-b pb-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase text-slate-400">
                                {selectedEmail.type === "notification"
                                  ? "Internal Lead Notification"
                                  : "Customer Confirmation"}
                              </span>
                              {selectedEmail.previewUrl && (
                                <a
                                  href={selectedEmail.previewUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-semibold text-blue-600 underline"
                                >
                                  Open Ethereal Web View ↗
                                </a>
                              )}
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm">
                              {selectedEmail.subject}
                            </h5>
                            <p className="text-xs text-slate-600 font-mono">
                              Recipient: <strong>{selectedEmail.to}</strong>
                            </p>
                          </div>

                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                            {selectedEmail.body}
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 flex items-center justify-center text-xs text-slate-400">
                          Select an email message from the list to inspect its contents.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TRACKING */}
              {activeTab === "tracking" && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">Live dataLayer Events Stream</h4>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                          WINDOW.DATALAYER
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Captures user events: page_view, cta_click, whatsapp_click, form_submit.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => trackEvent("test_click", { button: "demo_test" })}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                    >
                      Fire Test Event
                    </button>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-96 overflow-y-auto">
                    {trackingEvents.length === 0 ? (
                      <p className="p-8 text-center text-xs text-slate-400">
                        No events logged yet. Navigate pages or click buttons to trigger analytics events.
                      </p>
                    ) : (
                      trackingEvents.map((evt) => (
                        <div key={evt.id} className="p-3 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                {evt.event}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {evt.timestamp}
                              </span>
                            </div>
                            <pre className="text-[11px] font-mono text-slate-600 overflow-x-auto">
                              {JSON.stringify(evt.payload, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: STATUS & RESET */}
              {activeTab === "status" && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm">Integration Status Overview</h4>
                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-800">Google Sheet Provider:</strong>
                          <p className="text-slate-500">{statusInfo?.sheet.label}</p>
                        </div>
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          statusInfo?.sheet.status === "live" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {statusInfo?.sheet.status}
                        </span>
                      </div>

                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-800">Email Delivery Provider:</strong>
                          <p className="text-slate-500">{statusInfo?.email.label}</p>
                        </div>
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          statusInfo?.email.status === "live" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                        }`}>
                          {statusInfo?.email.status}
                        </span>
                      </div>

                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-800">WhatsApp Trigger:</strong>
                          <p className="text-slate-500">{statusInfo?.whatsapp.label}</p>
                        </div>
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          statusInfo?.whatsapp.status === "live" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {statusInfo?.whatsapp.status}
                        </span>
                      </div>

                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-800">Google Tag Manager:</strong>
                          <p className="text-slate-500">{statusInfo?.gtm.label}</p>
                        </div>
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          statusInfo?.gtm.status === "live" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {statusInfo?.gtm.status}
                        </span>
                      </div>

                      <div className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-800">Search Console Verification:</strong>
                          <p className="text-slate-500">{statusInfo?.gsc.label}</p>
                        </div>
                        <span className={`px-2 py-1 rounded font-bold uppercase text-[10px] ${
                          statusInfo?.gsc.status === "configured" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                        }`}>
                          {statusInfo?.gsc.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-200 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">Reset Local Demo Storage</h5>
                      <p className="text-xs text-slate-500">
                        Clears your captured mock spreadsheet entries, outbox emails, and tracking events.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetData}
                      className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                    >
                      Reset Demo Data
                    </button>
                  </div>

                  <div className="p-4 bg-slate-100 rounded-xl text-slate-600 text-xs">
                    <strong>Sales Demo URL Trick:</strong>
                    <p className="mt-1">
                      To present the website to a client without this Demo Tools button appearing at all, simply append <code className="bg-white px-1.5 py-0.5 rounded text-slate-800 font-mono">?demo=off</code> to any URL (e.g. <code className="bg-white px-1.5 py-0.5 rounded text-slate-800 font-mono">http://localhost:3000/?demo=off</code>).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
