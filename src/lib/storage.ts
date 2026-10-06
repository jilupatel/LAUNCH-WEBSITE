export interface StoredSheetRow {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  mode: string;
}

export interface StoredEmailMessage {
  id: string;
  timestamp: string;
  to: string;
  subject: string;
  body: string;
  type: "notification" | "autoreply";
  previewUrl?: string;
  mode: string;
}

export interface StoredTrackEvent {
  id: string;
  timestamp: string;
  event: string;
  payload: Record<string, unknown>;
}

const STORAGE_KEYS = {
  SHEET: "demo_sheet_records",
  EMAIL: "demo_email_outbox",
  TRACKING: "demo_tracking_events",
};

export const STORAGE_UPDATE_EVENT = "demo_storage_updated";

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_UPDATE_EVENT));
  }
}

export function getStoredSheetRows(): StoredSheetRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHEET);
    if (!raw) return getInitialSampleRows();
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredSheetRow(row: StoredSheetRow): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredSheetRows();
    const updated = [row, ...current];
    localStorage.setItem(STORAGE_KEYS.SHEET, JSON.stringify(updated));
    notifyUpdate();
  } catch (err) {
    console.error("Failed to save sheet row in localStorage", err);
  }
}

export function getStoredEmailMessages(): StoredEmailMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMAIL);
    if (!raw) return getInitialSampleEmails();
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredEmailMessage(msg: StoredEmailMessage): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredEmailMessages();
    const updated = [msg, ...current];
    localStorage.setItem(STORAGE_KEYS.EMAIL, JSON.stringify(updated));
    notifyUpdate();
  } catch (err) {
    console.error("Failed to save email in localStorage", err);
  }
}

export function getStoredTrackingEvents(): StoredTrackEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRACKING);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredTrackingEvent(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredTrackingEvents();
    const newEvent: StoredTrackEvent = {
      id: "evt_" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      event,
      payload,
    };
    const updated = [newEvent, ...current].slice(0, 50); // Keep last 50 events
    localStorage.setItem(STORAGE_KEYS.TRACKING, JSON.stringify(updated));
    notifyUpdate();
  } catch (err) {
    console.error("Failed to save tracking event", err);
  }
}

export function resetDemoStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.SHEET);
    localStorage.removeItem(STORAGE_KEYS.EMAIL);
    localStorage.removeItem(STORAGE_KEYS.TRACKING);
    // Re-seed default sample records
    localStorage.setItem(STORAGE_KEYS.SHEET, JSON.stringify(getInitialSampleRows()));
    localStorage.setItem(STORAGE_KEYS.EMAIL, JSON.stringify(getInitialSampleEmails()));
    notifyUpdate();
  } catch (err) {
    console.error("Failed to reset demo storage", err);
  }
}

function getInitialSampleRows(): StoredSheetRow[] {
  return [
    {
      id: "sample_row_1",
      timestamp: "2026-10-05 14:32:10",
      name: "Sample Client Inquiry",
      email: "sample.lead@example.com",
      phone: "+91 98000 11223",
      message: "Interested in the Launch Website plan. Looking forward to our call.",
      source: "Website Contact Form",
      mode: "mock",
    },
  ];
}

function getInitialSampleEmails(): StoredEmailMessage[] {
  return [
    {
      id: "sample_email_1",
      timestamp: "2026-10-05 14:32:11",
      to: "contact@yourbusiness.com",
      subject: "[New Lead] Inquiry from Sample Client Inquiry",
      body: "Name: Sample Client Inquiry\nEmail: sample.lead@example.com\nPhone: +91 98000 11223\nMessage: Interested in the Launch Website plan.",
      type: "notification",
      mode: "mock",
    },
    {
      id: "sample_email_2",
      timestamp: "2026-10-05 14:32:12",
      to: "sample.lead@example.com",
      subject: "Thank you for contacting Your Business Name",
      body: "Thank you for reaching out. We have received your inquiry and will contact you within 24 business hours.",
      type: "autoreply",
      mode: "mock",
    },
  ];
}
