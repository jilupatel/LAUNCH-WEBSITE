import { saveStoredTrackingEvent } from "./storage";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const eventData = {
    event: eventName,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer.push(eventData);

  // Store in demo tracking log for inspection drawer
  saveStoredTrackingEvent(eventName, payload);

  // Also log to console for development visibility
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics Event] ${eventName}:`, payload);
  }
}
