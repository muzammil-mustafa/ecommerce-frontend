# 📘 MORAE® E-Commerce Template & Architecture Learning Guide

Welcome to the **MORAE® E-Commerce Store** codebase! This application has been sculpted after the **morae-shopiframe.framer.website** design system: a dark, atmospheric, minimalist luxury aesthetic with high-fashion typography (`Instrument Serif`, `Space Mono`) and energetic burnt-orange accents (`#fc721b`).

This guide walks you through every layer of the architecture, explaining **how each component works**, **how state flows**, and **how to manage and push your repository to Git and GitHub**.

---

## 📑 Table of Contents
1. [Architecture & Component Tree](#1-architecture--component-tree)
2. [MORAE® Design Tokens & Styling Philosophy](#2-morae-design-tokens--styling-philosophy)
3. [Global State Management (`ShopContext.jsx`)](#3-global-state-management-shopcontextjsx)
4. [Deep Dive: All Pages & Views](#4-deep-dive-all-pages--views)
   - [View 1: Home Page (`HeroBanner.jsx` & `App.jsx`)](#view-1-home-page)
   - [View 2: Product Catalog & Filter Engine (`ProductGrid.jsx`)](#view-2-product-catalog--filter-engine)
   - [View 3: Philosophy & Craft (`AboutView.jsx`)](#view-3-philosophy--craft)
   - [View 4: Studio Contact (`ContactView.jsx`)](#view-4-studio-contact)
5. [Deep Dive: Drawers, Modals & Checkout](#5-deep-dive-drawers-modals--checkout)
   - [Product Details Modal (`ProductDetailsModal.jsx`)](#product-details-modal)
   - [Shopping Bag Slide-Over (`CartDrawer.jsx`)](#shopping-bag-slide-over)
   - [Wishlist Drawer (`WishlistDrawer.jsx`)](#wishlist-drawer)
   - [3-Step Checkout Modal (`CheckoutModal.jsx`)](#3-step-checkout-modal)
   - [Toast Notification Engine (`Toast.jsx`)](#toast-notification-engine)
6. [Complete Git & GitHub Step-by-Step Guide](#6-complete-git--github-step-by-step-guide)
7. [Running & Deploying the App](#7-running--deploying-the-app)

---

## 1. Architecture & Component Tree

The project runs on **React 19** and **Vite**:

```
ecommerce-frontend/
├── index.html                   # Fonts (Instrument Serif, Space Mono), metadata
├── package.json                 # Scripts and dependencies (lucide-react, react, vite)
├── src/
│   ├── main.jsx                 # Mounts root component
│   ├── index.css                # MORAE Design Tokens (Obsidian, Orange, hairline borders)
│   ├── App.css                  # All atmospheric dark styles, animations, responsive queries
│   ├── App.jsx                  # Main view coordinator (Home, Catalog, Philosophy, Contact)
│   ├── data/
│   │   └── products.json        # 16 curated releases across 5 departments
│   ├── context/
│   │   └── ShopContext.jsx      # Central Store: Cart, Wishlist, Filter, Checkout, Storage
│   └── components/
│       ├── Navbar.jsx           # Monospace header, brand dot, search, badges, mobile drawer
│       ├── HeroBanner.jsx       # Hero headline, 5-spec strip, visual card, category grid
│       ├── ProductCard.jsx      # Dark item card, codes [MR-0X], rating, add-to-bag feedback
│       ├── ProductGrid.jsx      # Catalog toolbar, price range slider, sort select, grid/list
│       ├── AboutView.jsx        # MORAE Philosophy, 4 performance benchmarks, vision
│       ├── ContactView.jsx      # Direct communication form, studio coordinates
│       ├── ProductDetailsModal.jsx # Image gallery, specs table, variant swatches, reviews
│       ├── CartDrawer.jsx       # Free-shipping meter, quantity buttons, coupon engine
│       ├── WishlistDrawer.jsx   # Saved items, move-to-bag batch action
│       ├── CheckoutModal.jsx    # 3-step checkout: Shipping -> Payment -> Receipt
│       ├── Toast.jsx            # Dynamic slide-in notification alerts
│       └── Footer.jsx           # Newsletter dispatch, quote, legal policies, copyright
```

---

## 2. MORAE® Design Tokens & Styling Philosophy

The template replicates the **MORAE Shopiframe Framer** design principles:

### A. Color Palette
- **Deep Obsidian Canvas**: `#070707` and `#0a0a0a` (eliminates glare, focuses the eye on product photography).
- **Hairline Architectural Borders**: `#1e1e1e` and `#2a2a2a` (ultra-subtle division lines).
- **International Orange**: `#fc721b` (vibrant safety orange used for active state pills, cart counters, primary CTAs, and hover halos).
- **Crimson Red**: `#cf1b42` (used for sale badges and alerts).
- **Clean Gray Scale**: `#ffffff` for titles, `#c0c0c0` for body copy, `#828282` for monospace metadata.

### B. High-Contrast Editorial Typography
- **Headlines & Accents**: `Instrument Serif` (e.g. *"Silence speaks louder when design refuses to explain itself."* or *"Crafted for clarity, not applause."*).
- **Technical Metadata & Badges**: `Space Mono` (e.g. `[ MR-01 ]`, `[ 01 ] HOME`, `[ CART (3) ]`).
- **Body & Controls**: `Inter` and `Plus Jakarta Sans`.

---

## 3. Global State Management (`ShopContext.jsx`)

File: `src/context/ShopContext.jsx`

All data and user interactions flow through the custom hook `useShop()`:

```jsx
const {
  activeView,          // 'home' | 'shop' | 'about' | 'contact'
  setActiveView,
  cart,                // array of items in shopping bag
  addToCart,
  updateQuantity,
  removeFromCart,
  cartTotal,
  wishlist,            // array of favorited items
  toggleWishlist,
  appliedCoupon,       // 'SAVE15', 'WELCOME10', 'VIP20'
  applyCoupon,
  isCartOpen,          // boolean for slide-over drawer
  isWishlistOpen,
  isCheckoutOpen,
  selectedProduct,     // product currently open in details modal
  setSelectedProduct
} = useShop();
```

### LocalStorage Synchronization:
Whenever you add or remove an item from the cart or wishlist, an automatic `useEffect` writes the state into the browser's persistent storage:
```jsx
useEffect(() => {
  localStorage.setItem('aurastore_cart', JSON.stringify(cart));
}, [cart]);
```
This guarantees that customer carts survive browser refreshes!

---

## 4. Deep Dive: All Pages & Views

### View 1: Home Page
- **Hero Banner**: Atmospheric lighting, headline with serif italic highlights, `[SCROLL]` indicator, and direct inspection of the flagship headphones (`MR-01`).
- **5-Spec Technical Strip**: Displays 5 key hardware principles: `Active Noise Cancellation`, `Transparent Mode`, `40-Hour Battery`, `Intuitive Gestures`, `Adaptive Balance`.
- **Department Grid**: 5 curated category cards (`Audio`, `Electronics`, `Fashion`, `Home & Living`, `Footwear`).
- **Trending Bestsellers Grid**: 4 top-selling hardware products with instant bag addition.
- **Editorial Manifesto Banner**: "Transparent glass. Bold color. Pure experience."
- **Customer Observations / Testimonials**: Quotes from verified creators in London, Milan, and Seoul.

### View 2: Product Catalog & Filter Engine
- **Category Filter Pills**: Clickable department pills with exact counts (`[ ALL (16) ]`, `[ AUDIO (3) ]`).
- **Multi-Attribute Search**: Live input filters across name, description, and tags simultaneously.
- **Price Range Slider**: Slider from \$30 to \$300 with orange track indicator.
- **In-Stock Checkbox**: Hides backordered items instantly.
- **Sorting Dropdown**: Price Low/High, Rating, Newest, or Featured.
- **View Switcher**: Toggle between 4-column Grid View and single-column List View.

### View 3: Philosophy & Craft (`/about`)
Replicates the MORAE `/about` template:
- Headline: *"Crafted for clarity, not applause."*
- Full-width atmospheric acoustic laboratory photography.
- **4 Architectural Engineering Benchmarks**:
  - `[ 01 ]` Battery Endurance: **40 Hours**
  - `[ 02 ]` Noise Reduction: **32% Deeper Isolation**
  - `[ 03 ]` Response Time: **0.08s Ultra-Fast**
  - `[ 04 ]` Acoustic Balance: **+27% Harmonic Clarity**
- Two-column philosophy cards: "Vision" and "Honest Craft".

### View 4: Studio Contact (`/contact`)
Replicates the MORAE `/contact` template:
- Direct coordinates: `support@morae.com`, telephone, studio hours, and social media handles.
- Interactive contact form (Name, Email, Topic, Message) with animated success confirmation.

---

## 5. Deep Dive: Drawers, Modals & Checkout

### Product Details Modal (`ProductDetailsModal.jsx`)
- Multi-angle clickable thumbnail gallery.
- Interactive color finish variant swatches.
- Stepper quantity controls (`+` / `-` / direct input) with stock boundary limits.
- Complete architectural specifications matrix (driver size, battery life, weight, warranty).
- Customer Reviews tab with an interactive "Write Review" submission form.
- "Related Hardware" recommendations row.

### Shopping Bag Slide-Over (`CartDrawer.jsx`)
- Slide-in panel from the right with glassmorphic backdrop.
- Animated orange free-shipping progress rail (\$75 threshold).
- Per-item quantity increment, decrement, and removal.
- Voucher engine accepting promo codes `SAVE15` (15% off) and `WELCOME10` (10% off).
- Automatic subtotal, tax (8%), shipping, and grand total calculations.

### Wishlist Drawer (`WishlistDrawer.jsx`)
- Preserves customer shortlists.
- "Move to Bag" for single items, or "Move All to Shopping Bag" in one click.

### 3-Step Checkout Modal (`CheckoutModal.jsx`)
- **Step 1: Shipping**: First name, last name, email, phone, street address, city, state, postal code, and country with form validation.
- **Step 2: Settlement**: Choose between Credit Card (with cardholder, number, expiry, CVV fields), PayPal Express, or Cash on Delivery.
- **Step 3: Receipt Confirmation**: Simulated 1.8s payment gateway authorization, generated order reference ID (`AUR-XXXXXX`), estimated courier arrival date, and destination summary.

---

## 6. Complete Git & GitHub Step-by-Step Guide

Your local repository is already initialized and committed on the `main` branch. To push it to your GitHub profile, follow these exact steps:

### Step 1: Open PowerShell / Terminal
```powershell
cd "C:\Users\Muzamil Mustafa\.gemini\antigravity\scratch\ecommerce-frontend"
```

### Step 2: Create a Repository on GitHub
1. Open your browser and navigate to **[https://github.com/new](https://github.com/new)**.
2. Set the repository name to: **`ecommerce-frontend`**.
3. Set visibility to **Public** (or Private).
4. **Important**: Leave "Add a README", "Add .gitignore", and "Choose a license" **UNCHECKED** (we already have them).
5. Click **Create repository**.

### Step 3: Link Your Local Repository to GitHub
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:
```powershell
# 1. Add your remote GitHub URL
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ecommerce-frontend.git

# 2. Push to GitHub
git push -u origin main
```

### Step 4: Making Updates in the Future
Whenever you edit code in the project, run this 3-command routine:
```powershell
git add .
git commit -m "feat: your descriptive change message"
git push
```

---

## 7. Running & Deploying the App

### Start Local Development Server:
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

### Free Instant Deployment on Vercel:
1. Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
2. Select **"Add New Project"** -> Import `ecommerce-frontend`.
3. Vercel automatically detects the Vite build command (`npm run build`) and output directory (`dist`).
4. Click **Deploy** to get your public `.vercel.app` URL!
