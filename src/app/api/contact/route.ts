import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, ContactRecord } from "@/lib/validators";
import { getSheetProvider } from "@/lib/providers/sheet";
import { getEmailProvider } from "@/lib/providers/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, hp_company } = validationResult.data;

    // Honeypot bot protection
    if (hp_company && hp_company.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // Build normalized record
    const record: ContactRecord = {
      id: "rec_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      name,
      email,
      phone,
      message,
      source: "Website Contact Form",
    };

    // Providers execution
    const sheetProvider = getSheetProvider();
    const emailProvider = getEmailProvider();

    const [sheetResult, emailNotifResult, emailAutoReplyResult] = await Promise.all([
      sheetProvider.appendRow(record),
      emailProvider.sendNotification(record),
      emailProvider.sendAutoReply(record),
    ]);

    return NextResponse.json({
      success: true,
      record,
      deliveries: {
        sheet: sheetResult,
        emailNotification: emailNotifResult,
        emailAutoReply: emailAutoReplyResult,
      },
    });
  } catch (error: unknown) {
    console.error("Error processing contact submission:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
