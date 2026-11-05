# ConnectWave - Cable TV & Gigabit Fiber Broadband Provider

A modern, responsive, high-contrast multi-page website and subscriber portal for a Cable TV and Fiber Broadband provider.

![ConnectWave Preview](https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=85)

---

## 🚀 Live Pages & Features

| Page | File | Description |
|---|---|---|
| **Home 1 (Main)** | [`index.html`](index.html) | Modern telecom landing page featuring plans, coverage check, 4 core services, 6 value pillars, 350+ TV channel preview, verified subscriber reviews, and FAQ. |
| **Home 2** | [`Home2.html`](Home2.html) | Alternative modern connected-home layout. |
| **Plans & Packages** | [`plans.html`](plans.html) | Fiber broadband, cable TV, and combo plans with interactive category filters and side-by-side comparison matrix. |
| **Coverage Area** | [`coverage.html`](coverage.html) | Interactive PIN code and locality availability checker, active city hubs, and RWA / society network request form. |
| **Subscriber Dashboard** | [`dashboard.html`](dashboard.html) | Subscriber portal for 1-click UPI bill payments, viewing active plans, raising service complaints with live engineer tracking, and running speed diagnostics. |
| **Subscriber Login** | [`login.html`](login.html) | Dedicated authentication portal with show/hide eye toggle button, field icons, and 1-click quick demo login. |
| **Apply / Sign Up** | [`signup.html`](signup.html) | Connection application form with package selection, PIN code validation, and password eye toggle. |
| **Services Overview** | [`services.html`](services.html) | Detailed breakdown of Gigabit FTTH broadband, 4K digital cable TV packages, and mesh Wi-Fi 6. |
| **About Us** | [`about.html`](about.html) | Company background, carrier-neutral infrastructure, and network values. |
| **Support & FAQs** | [`support.html`](support.html) | Self-service help desk, 24/7 helpline details, and common troubleshooting guides. |
| **Contact Desk** | [`contact.html`](contact.html) | Sales and corporate connectivity enquiry form with office details. |

---

## ⚡ Key Highlights

1. **Subscriber Dashboard (`dashboard.html`):**
   - **Bill Payments:** Statement breakdown, interactive checkout modal (UPI, Card, NetBanking), instant payment simulation, and receipt PDF downloads.
   - **Plan Management:** Current plan overview (100 Mbps + 180 Channels + OTT apps), real-time high-speed data meter (542 GB / 1,000 GB), 1-click speed upgrades, and booster add-ons (+200GB, Sports HD, Static IP).
   - **Service Complaints:** Interactive ticket submission (Broadband Down, Slow Speed, STB glitch, Billing), urgency selector, appointment slots, and real-time 3-step tracking timeline (*Logged → Assigned → Resolved*).
   - **Diagnostics & Speed Test:** Live bandwidth speedometer measuring download, upload, and ping latency.

2. **Dedicated Auth Pages (`login.html` & `signup.html`):**
   - Full navbar and footer removed for a clean, focused authentication layout.
   - Interactive eye icon to show/hide passwords.
   - Field icons across name, email, phone, PIN, package, and password fields.
   - One-click demo login button for instant dashboard review.

3. **Design & Responsiveness:**
   - **High Contrast:** Strictly optimized contrast ratios (WCAG AAA) for both light and dark themes.
   - **Multi-Device Alignment:** Tested and calibrated across mobile (320px–580px), tablet (786px), desktop (1024px–1440px), and ultrawide screens (up to 2014px+).
   - **RTL & Dark Mode:** Global right-to-left language toggle and light/dark theme switch with browser `localStorage` persistence.
   - **Consistent Brand Identity:** Uniform `ConnectWave` logo and brand typography across the header and footer on every page.

---

## 🛠️ How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/HTMLStaticWorks-Org/Cable_TV_Broadband_Provider.git
   ```
2. Open `index.html` in any modern web browser or start a local server (e.g., VS Code *Live Server* or `npx serve`).
3. To view the subscriber portal directly, open `login.html` and click **"One-Click Login"** or navigate directly to `dashboard.html`.

---

## 📄 License & Notes
- This is a frontend demo and client-side prototype.
- In production, replace placeholder contact details, sample pricing, and Unsplash imagery with your real telecom provider assets, and connect forms to your billing/CRM endpoints.
