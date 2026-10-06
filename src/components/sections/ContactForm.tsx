"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData, ContactRecord } from "@/lib/validators";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import {
  saveStoredSheetRow,
  saveStoredEmailMessage,
  StoredEmailMessage,
} from "@/lib/storage";

interface SubmissionResponse {
  success: boolean;
  record?: ContactRecord;
  deliveries?: {
    sheet: { success: boolean; mode: string; message: string };
    emailNotification: {
      success: boolean;
      mode: string;
      to: string;
      subject: string;
      body: string;
      previewUrl?: string;
      message: string;
    };
    emailAutoReply: {
      success: boolean;
      mode: string;
      to: string;
      subject: string;
      body: string;
      previewUrl?: string;
      message: string;
    };
  };
  error?: string;
  message?: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const { form } = siteConfig.contactPage;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      hp_company: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: SubmissionResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to submit form");
      }

      // Persist to client-side localStorage so Demo Tools updates immediately
      if (data.record) {
        saveStoredSheetRow({
          id: data.record.id,
          timestamp: data.record.timestamp,
          name: data.record.name,
          email: data.record.email,
          phone: data.record.phone,
          message: data.record.message,
          source: data.record.source,
          mode: data.deliveries?.sheet.mode || "mock",
        });

        if (data.deliveries?.emailNotification) {
          const notifMsg: StoredEmailMessage = {
            id: "notif_" + data.record.id,
            timestamp: data.record.timestamp,
            to: data.deliveries.emailNotification.to,
            subject: data.deliveries.emailNotification.subject,
            body: data.deliveries.emailNotification.body,
            type: "notification",
            previewUrl: data.deliveries.emailNotification.previewUrl,
            mode: data.deliveries.emailNotification.mode,
          };
          saveStoredEmailMessage(notifMsg);
        }

        if (data.deliveries?.emailAutoReply) {
          const replyMsg: StoredEmailMessage = {
            id: "reply_" + data.record.id,
            timestamp: data.record.timestamp,
            to: data.deliveries.emailAutoReply.to,
            subject: data.deliveries.emailAutoReply.subject,
            body: data.deliveries.emailAutoReply.body,
            type: "autoreply",
            previewUrl: data.deliveries.emailAutoReply.previewUrl,
            mode: data.deliveries.emailAutoReply.mode,
          };
          saveStoredEmailMessage(replyMsg);
        }
      }

      // Track analytics event
      trackEvent("form_submit", {
        formId: "contact_page_form",
        email: values.email,
        name: values.name,
      });

      setSubmissionResult(data);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setSubmissionResult(null);
    setApiError(null);
  };

  if (submissionResult) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
            ✓
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900">
              {form.successTitle}
            </h3>
            <p className="text-sm text-emerald-800">
              {form.successMessage}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-emerald-200/80 text-xs text-slate-600 space-y-2">
          <div className="flex items-center justify-between font-semibold text-slate-800 border-b pb-1.5">
            <span>Inquiry Delivery Summary:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px]">
              Recorded
            </span>
          </div>
          <p>
            <strong>Google Sheet:</strong>{" "}
            {submissionResult.deliveries?.sheet.mode === "live"
              ? "Appended to live connected Google Sheet"
              : "Saved to Demo Sheet (viewable in Demo Tools drawer)"}
          </p>
          <p>
            <strong>Internal Notification:</strong>{" "}
            {submissionResult.deliveries?.emailNotification.message}
          </p>
          <p>
            <strong>Customer Auto-reply:</strong>{" "}
            {submissionResult.deliveries?.emailAutoReply.message}
          </p>

          {submissionResult.deliveries?.emailNotification.previewUrl && (
            <p className="pt-1">
              <a
                href={submissionResult.deliveries.emailNotification.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline font-semibold"
              >
                🔗 View Sent Email in Ethereal Sandbox →
              </a>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSendAnother}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5"
    >
      {apiError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
          <strong>Error submitting form:</strong> {apiError}
        </div>
      )}

      {/* Honeypot Field (Hidden from humans, traps automated spam bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_company">Company Website (Leave Blank)</label>
        <input
          type="text"
          id="hp_company"
          tabIndex={-1}
          autoComplete="off"
          {...register("hp_company")}
        />
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          {form.nameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder={form.namePlaceholder}
          aria-invalid={errors.name ? "true" : "false"}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
            errors.name
              ? "border-red-500 focus:ring-red-400 bg-red-50/20"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-500/20"
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          {form.emailLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder={form.emailPlaceholder}
          aria-invalid={errors.email ? "true" : "false"}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
            errors.email
              ? "border-red-500 focus:ring-red-400 bg-red-50/20"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-500/20"
          }`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          {form.phoneLabel} <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder={form.phonePlaceholder}
          aria-invalid={errors.phone ? "true" : "false"}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
            errors.phone
              ? "border-red-500 focus:ring-red-400 bg-red-50/20"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-500/20"
          }`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          {form.messageLabel} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={form.messagePlaceholder}
          aria-invalid={errors.message ? "true" : "false"}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors resize-y ${
            errors.message
              ? "border-red-500 focus:ring-red-400 bg-red-50/20"
              : "border-slate-300 focus:border-blue-600 focus:ring-blue-500/20"
          }`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600 font-medium" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{form.submittingButton}</span>
          </>
        ) : (
          <span>{form.submitButton}</span>
        )}
      </button>

      <p className="text-center text-xs text-slate-500 pt-1">
        🔒 Form submissions trigger real-time Google Sheets & email notifications.
      </p>
    </form>
  );
}
