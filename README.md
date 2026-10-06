# Launch Website Package Demo (₹7,499)

A fully-working, industry-neutral demo website built for the **Launch Website** package (₹7,499) of our web agency.
Designed to be shown to prospective clients during sales calls to demonstrate exactly what the entry-level plan delivers.

Works **out of the box with an empty `.env`** using built-in mock providers and an interactive **Demo Tools** inspection drawer!

---

## ⚡ Quick Start

1. **Clone & Install:**
   ```bash
   git clone <repo-url>
   cd launch-website
   npm install
   ```

2. **Copy Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(All variables can remain completely blank for local demo/mock mode!)*

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Environment Configuration & Live Setup Guide

To transition from demo/mock mode to live services, fill in values in `.env.local`:

### 1. Google Sheets Integration (`GOOGLE_SHEET_WEBHOOK_URL`, `GOOGLE_SHEET_SECRET`)
Stores contact inquiries directly in a free Google Spreadsheet without requiring paid third-party forms.
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Rename the active sheet tab at the bottom to `Enquiries`.
3. In row 1, add these exact column headers:
   - `A1`: `Timestamp`
   - `B1`: `Name`
   - `C1`: `Email`
   - `D1`: `Phone`
   - `E1`: `Message`
   - `F1`: `Source`
4. Click **Extensions** > **Apps Script**.
5. Replace everything in the script editor with the code from [`docs/google-apps-script.gs`](./docs/google-apps-script.gs).
6. Set a secret passkey (e.g. `my_secret_token_123`) in the script or leave as default.
7. Click **Deploy** > **New deployment**.
8. Select type: **Web app**:
   - **Description**: `Launch Website Contact Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
9. Click **Deploy**, authorize access with your Google account, and copy the **Web app URL**.
10. In `.env.local`:
    ```env
    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
    GOOGLE_SHEET_SECRET=my_secret_token_123
    ```

---

### 2. Email Notifications (`EMAIL_PROVIDER`, `SMTP_*`)
On submission, the system sends an internal lead alert to `EMAIL_TO` and an instant auto-reply confirmation to the customer.

* **Option A: Ethereal (Zero setup dummy email with preview link)**:
  ```env
  EMAIL_PROVIDER=ethereal
  ```
  Generates a disposable test inbox automatically on each send. A preview link is returned and displayed in the Demo Tools drawer and server logs!

* **Option B: Real SMTP (e.g., Gmail)**:
  ```env
  EMAIL_PROVIDER=smtp
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=465
  SMTP_USER=yourbusiness@gmail.com
  SMTP_PASS=your-16-char-app-password
  EMAIL_FROM="Your Business Name" <yourbusiness@gmail.com>
  EMAIL_TO=inquiries@yourbusiness.com
  ```
  *(To generate a Gmail App Password: Google Account > Security > 2-Step Verification > App passwords).*

* **Option C: Mailtrap Sandbox**:
  Use your Mailtrap sandbox host, port 2525, user, and password.

---

### 3. Google Tag Manager (`NEXT_PUBLIC_GTM_ID`)
1. Go to [tagmanager.google.com](https://tagmanager.google.com) and create an account & container (Select **Web**).
2. Copy your Container ID formatted as `GTM-XXXXXXX`.
3. In `.env.local`:
   ```env
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```
   *(When empty, all `dataLayer` events like `page_view`, `cta_click`, `whatsapp_click`, and `form_submit` are safely logged in the browser console and inspectable live in the Demo Tools drawer).*

---

### 4. Google Search Console Verification (`NEXT_PUBLIC_GSC_VERIFICATION`)
1. Open [Google Search Console](https://search.google.com/search-console).
2. Add a property using the **URL prefix** method.
3. Choose the **HTML tag** verification method.
4. Copy **only** the token inside `content="..."` (e.g. `abc123xyz...`).
5. In `.env.local`:
   ```env
   NEXT_PUBLIC_GSC_VERIFICATION=abc123xyz...
   ```

---

### 5. WhatsApp Floating Button (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
* Enter your phone number with country code and no symbols or spaces (e.g. `919876543210`).
* If left blank, clicking the WhatsApp button launches an interactive **Demo WhatsApp modal** that clearly explains the real-world client experience.

---

## 🎨 Single-File Content Reskinning

Every single piece of copy, branding text, company phone, email, accent color, and service list is centralized in:
`src/content/site.ts`

To adapt this demo for a dentist, real estate agent, gym, restaurant, lawyer, or consultant, edit **only** `src/content/site.ts`!

---

## 🔍 Demo Tools Drawer

During sales meetings, click the **Demo Tools** badge in the bottom-left corner to reveal:
- **Package Info**: The complete ₹7,499 feature checklist vs features reserved for higher tiers.
- **Sheet**: Live spreadsheet view of submitted contact entries stored in `localStorage` (or sent to Google Sheets).
- **Email**: Real-time outbox inspection of sent notifications and auto-responders (with clickable Ethereal preview links).
- **Tracking**: Live `dataLayer` event stream showing events as users interact with the site.
- **Status & Reset**: Live/Mock health indicators and a one-click button to reset local demo data.

> **Tip for Clean Client Previews:** Pass `?demo=off` in the URL (e.g. `http://localhost:3000/?demo=off`) to hide the Demo Tools floating launcher completely.

---

## 📄 Structure & Features (₹7,499 Deliverables)

- **Pages (Exactly 3):**
  1. `/` — Home (Hero with CTA, Feature/Service Highlights, About Teaser, CTA Banner)
  2. `/about` — About & Services (Company narrative, full service breakdown, 3-step simple process)
  3. `/contact` — Contact (Zod-validated form, direct details, static map placeholder, social links)
- **Technical Deliverables:**
  - Responsive layout (mobile-first, 360px to 1440px+)
  - Instant Contact API route (`POST /api/contact`)
  - Floating WhatsApp trigger
  - Search engine endpoints: `/sitemap.xml`, `/robots.txt`, `/llms.txt`
  - High accessibility & zero external tracking or font dependencies
