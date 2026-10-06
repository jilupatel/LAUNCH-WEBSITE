import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must have at least 7 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^[0-9+\s\-().]+$/, "Please enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters long")
    .max(2000, "Message cannot exceed 2000 characters"),
  hp_company: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
}
