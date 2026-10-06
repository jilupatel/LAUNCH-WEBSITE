import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const content = `# ${siteConfig.name}
> ${siteConfig.tagline}

## Overview
${siteConfig.description}

## Core Services
${siteConfig.about.services.map((s) => `- **${s.title}**: ${s.description}`).join("\n")}

## Contact & Direct Channels
- **Email**: ${siteConfig.contact.email}
- **Phone**: ${siteConfig.contact.phone}
- **Operating Hours**: ${siteConfig.contact.hours}
- **Address**: ${siteConfig.contact.address}

## Key Site Pages
- **Homepage** (${baseUrl}/): Introduction to our capabilities, key value propositions, and direct inquiry link.
- **About & Services** (${baseUrl}/about): Comprehensive service breakdown, company values, and 3-step delivery workflow.
- **Contact Us** (${baseUrl}/contact): Direct inquiry form, communication channels, and location details.

## Technical & Package Context
This website is built under the ₹7,499 Launch Website architecture, designed for maximum accessibility, ultra-fast load times, semantic HTML, and zero third-party dependencies.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
