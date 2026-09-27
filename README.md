# 🎧 MORAE® — Atmospheric E-Commerce Frontend

A luxury e-commerce experience designed after the **[MORAE Shopiframe Framer Template](https://morae-shopiframe.framer.website/)**. Built with **React 19**, **JavaScript (ES6+)**, and **Modern Dark CSS**.

Features atmospheric visuals, editorial typography (`Instrument Serif`, `Space Mono`), vibrant orange accents (`#fc721b`), persistent cart and wishlist using `localStorage`, category filtering, search, price range sorting, multi-step checkout, and full dedicated pages.

---

## 🌟 Pages & Key Features

- **🏠 Home Page (`/`)**:
  - Signature MORAE hero headline: *"Silence speaks louder when design refuses to explain itself."*
  - Flagship hardware visual card (`MR-01`) with ready-to-dispatch indicator
  - 5-principle technical specifications strip (ANC, Transparent Mode, 40h Battery, Gestures, Adaptive Balance)
  - 5-discipline category navigation cards
  - Trending bestsellers & fresh releases
  - Editorial manifesto banner: *"Transparent glass. Bold color. Pure experience."*
  - Verified listener testimonials from London, Milan, and Seoul
- **🛍️ Product Catalog Page (`/shop`)**:
  - Monospace category tabs with exact item counters
  - Real-time multi-attribute search (name, description, category)
  - Price slider (\$30 - \$300) with orange indicator
  - In-stock availability checkbox
  - Sorting: Featured, Price Low/High, Rating, Newest Releases
  - Layout toggle (4-column Grid View vs 1-column List View)
- **📖 Philosophy & Craft Page (`/about`)**:
  - *"Crafted for clarity, not applause."*
  - 4 Performance Benchmarks (40h Battery, 32% Noise Reduction, 0.08s Latency, +27% Clarity)
  - Vision and Honest Craft principles
- **📬 Studio Contact Page (`/contact`)**:
  - Direct studio coordinates (`support@morae.com`, telephone, studio hours)
  - Interactive communication form with topic selector and confirmation state
- **📄 Product Details Modal**:
  - Multi-angle clickable thumbnail gallery
  - Technical parameters matrix
  - Color finish variant swatches
  - Stepper quantity controls
  - "Add to Bag" & "Instant Checkout"
  - Customer review list with interactive "Write Review" form
  - Related hardware recommendations
- **🛒 Shopping Bag Slide-Over**:
  - Complimentary courier shipping progress rail (\$75 threshold)
  - Per-item quantity adjustments & deletion
  - Voucher system (Test code: `SAVE15` for 15% off, `WELCOME10` for 10% off)
  - Automated subtotal, tax (8%), shipping, and total calculations
- **❤️ Wishlist Drawer**:
  - Saved releases shortlist
  - "Move to Bag" per item and "Move All to Shopping Bag"
- **💳 3-Step Checkout Modal**:
  - Step 1: Shipping address with country selection
  - Step 2: Payment method (Credit Card with formatted fields, PayPal Express, Cash on Delivery)
  - Step 3: Order confirmation receipt with generated reference ID (`AUR-XXXXXX`)
- **📱 Responsive Mobile Experience**:
  - Hamburger menu with category shortcuts and search
  - Fixed mobile bottom navigation bar (Home, Catalog, Philosophy, Saved, Bag)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🏷️ Test Voucher Codes
- `SAVE15` — 15% off entire order
- `WELCOME10` — 10% off entire order
- `VIP20` — 20% off entire order

---

## 📖 In-Depth Learning Guide

For a line-by-line explanation of every component, state hook, and Git command:
👉 **[LEARNING_GUIDE.md](./LEARNING_GUIDE.md)**

---

## 🐙 Push to GitHub

```powershell
cd "C:\Users\Muzamil Mustafa\.gemini\antigravity\scratch\ecommerce-frontend"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ecommerce-frontend.git
git push -u origin main
```
