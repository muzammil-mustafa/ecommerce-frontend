# 🛍️ AuraStore — Modern E-Commerce Frontend

An e-commerce product store built with **React 19**, **JavaScript (ES6+)**, and **Modern CSS**. Features local JSON mock data, persistent cart and wishlist using `localStorage`, category filtering, real-time search, price range filters, sorting, customer reviews, a slide-over cart with free-shipping meters, and an interactive 3-step checkout.

---

## 🌟 Key Features

- **🏠 Home Page**: Engaging hero banner with Deal of the Day card, flash sale countdown timer, trust and value proposition strip, category shortcuts, trending bestsellers, and customer testimonials.
- **🔍 Search & Filter Engine**: Live multi-field search (by product name, description, and category), category tabs with counts, price slider (\$30 - \$300), and in-stock toggles.
- **📊 Sorting**: Sort by Featured, Price (Low to High), Price (High to Low), Highest Customer Rating, and Newest Arrivals.
- **🎴 Product Cards**: High-res Unsplash photography, hover zoom, discount badges, wishlist toggle with instant state, star ratings, and quick "Add to Cart" with visual feedback.
- **📄 Product Details Modal**:
  - Image gallery with clickable thumbnail view selector
  - Technical specifications table
  - Color swatch selector
  - Interactive quantity controls (`+`, `-`, direct input)
  - "Add to Bag" and "Buy Now" (direct to checkout)
  - Customer review list with a "Leave a Review" interactive form
  - "You Might Also Like" related product recommendations
- **🛒 Shopping Cart Drawer**:
  - Free shipping progress bar (\$75 threshold tracker)
  - Per-item quantity increment, decrement, and removal
  - Promo code system (Try `SAVE15` for 15% off or `WELCOME10` for 10% off)
  - Automatic subtotal, tax (8%), shipping calculation, and grand total
- **❤️ Wishlist Drawer**:
  - Save favorite items
  - "Move to Bag" and "Move All to Bag"
- **💳 Multi-Step Checkout Modal**:
  - Step 1: Shipping address with validation
  - Step 2: Payment method (Credit/Debit Card with formatted fields, PayPal Express, Cash on Delivery)
  - Step 3: Order confirmation receipt with generated order reference ID and estimated delivery date
- **📱 Responsive Mobile Design**:
  - Full mobile navigation drawer and mobile search bar
  - Touch-friendly layout
  - Fixed mobile bottom navigation bar (Home, Catalog, Wishlist, Bag)
- **🔔 Toast Notification System**: Animated feedback alerts for actions (e.g. adding items, applying coupons, saving to wishlist).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📖 Complete Learning Guide & Git Walkthrough

A complete, educational breakdown of every component, state hook, and Git command is available in:
👉 **[LEARNING_GUIDE.md](./LEARNING_GUIDE.md)**

---

## 🏷️ Test Promo Codes
- `SAVE15` — 15% off entire order
- `WELCOME10` — 10% off entire order
- `VIP20` — 20% off entire order

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES6+ Modules)
- **Styling**: Modern CSS3 (Variables, Flexbox, CSS Grid, Glassmorphism, Responsive Media Queries)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data**: Local JSON (`src/data/products.json`)
