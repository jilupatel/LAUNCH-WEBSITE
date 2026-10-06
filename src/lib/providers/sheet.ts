import { ContactRecord } from "../validators";

export interface SheetDeliveryResult {
  success: boolean;
  mode: "live" | "mock";
  message: string;
  error?: string;
}

export interface SheetProvider {
  appendRow(record: ContactRecord): Promise<SheetDeliveryResult>;
}

class LiveGoogleSheetProvider implements SheetProvider {
  private webhookUrl: string;
  private secret: string;

  constructor(webhookUrl: string, secret: string) {
    this.webhookUrl = webhookUrl;
    this.secret = secret;
  }

  async appendRow(record: ContactRecord): Promise<SheetDeliveryResult> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: this.secret,
          ...record,
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          mode: "live",
          message: `Google Apps Script returned status ${response.status}`,
          error: await response.text().catch(() => "Unknown error"),
        };
      }

      const resData = await response.json().catch(() => ({}));
      return {
        success: true,
        mode: "live",
        message: resData.message || "Row appended to Google Sheet successfully.",
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        mode: "live",
        message: "Failed to communicate with Google Sheet webhook.",
        error: errorMessage,
      };
    }
  }
}

class MockSheetProvider implements SheetProvider {
  async appendRow(record: ContactRecord): Promise<SheetDeliveryResult> {
    // In mock mode, the server confirms receipt and signals the client to store the record in localStorage.
    return {
      success: true,
      mode: "mock",
      message: `[DEMO] Contact inquiry from ${record.name} recorded into Mock Sheet.`,
    };
  }
}

export function getSheetProvider(): SheetProvider {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEET_SECRET?.trim() || "";

  if (webhookUrl && webhookUrl.length > 0) {
    return new LiveGoogleSheetProvider(webhookUrl, secret);
  }

  return new MockSheetProvider();
}
