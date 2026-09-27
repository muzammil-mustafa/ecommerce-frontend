import React from 'react';
import { useShop, ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import {
  Sparkles,
  ArrowRight,
  Star,
  Quote,
  Flame,
  Home,
  Store,
  Heart,
  ShoppingBag
} from 'lucide-react';
import './App.css';

const MainApp = () => {
  const {
    activeView,
    setActiveView,
    products,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setSelectedCategory
  } = useShop();

  // Bestsellers / Featured for Home page
  const featuredProducts = products.filter((p) => p.badge === 'Bestseller').slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === 'New Arrival' || p.badge === 'Limited').slice(0, 4);

  const testimonials = [
    {
      id: 1,
      quote: "The AuraStudio headphones sound noticeably crisper than my \$350 studio monitors. The battery life is unbelievable.",
      author: "David Vance",
      title: "Audio Engineer & Producer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      quote: "Shipping arrived in 2 days, and the packaging felt like unboxing a luxury designer piece. The selvedge jacket fits like a glove.",
      author: "Sofia Reynolds",
      title: "Architect & Creative Director",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      quote: "Exceptional shopping experience. Smooth checkout, crystal-clear tracking, and customer support replied in under 5 minutes.",
      author: "Liam Chang",
      title: "Product Designer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="app-layout">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        {activeView === 'home' ? (
          <>
            {/* Hero & Category Shortcuts */}
            <HeroBanner />

            {/* Featured Bestsellers Section */}
            <section className="featured-section">
              <div className="section-header">
                <div>
                  <div className="section-eyebrow">
                    <Flame size={15} />
                    <span>Customer Favorites</span>
                  </div>
                  <h2 className="section-title">Trending Bestsellers</h2>
                </div>
                <button
                  className="view-all-link"
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                  }}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="featured-products-grid">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Editorial Showcase Banner */}
            <section className="editorial-promo-banner">
              <div className="editorial-content">
                <span className="editorial-tag">Craftsmanship First</span>
                <h2 className="editorial-heading">
                  Designed Without Compromise. Engineered for Decades.
                </h2>
                <p className="editorial-text">
                  We partner directly with bespoke artisans and certified factories around the globe to eliminate middlemen markups and offer studio-grade materials at honest prices.
                </p>
                <div className="editorial-stats">
                  <div className="stat-box">
                    <strong>100%</strong>
                    <span>Fair-Trade Certified</span>
                  </div>
                  <div className="stat-box">
                    <strong>4.9/5</strong>
                    <span>Over 25,000+ Reviews</span>
                  </div>
                  <div className="stat-box">
                    <strong>2 Years</strong>
                    <span>Comprehensive Guarantee</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                  }}
                >
                  <span>Discover Full Collection</span>
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="editorial-image-side">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                  alt="Mechanical Keyboard Craftsmanship"
                />
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="featured-section">
              <div className="section-header">
                <div>
                  <div className="section-eyebrow">
                    <Sparkles size={15} />
                    <span>Fresh Drops</span>
                  </div>
                  <h2 className="section-title">New Releases &amp; Limited Runs</h2>
                </div>
                <button
                  className="view-all-link"
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                  }}
                >
                  <span>Shop All Items</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="featured-products-grid">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Customer Testimonials Slider/Grid */}
            <section className="testimonials-section">
              <div className="section-header-centered">
                <span className="section-eyebrow-center">Community Verified</span>
                <h2 className="section-title">Loved by Thousands Worldwide</h2>
                <p className="section-subtitle">Real feedback from verified purchasers</p>
              </div>

              <div className="testimonials-grid">
                {testimonials.map((item) => (
                  <div key={item.id} className="testimonial-card">
                    <div className="testimonial-stars">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} className="star-icon filled" />
                      ))}
                    </div>
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-author-box">
                      <img src={item.avatar} alt={item.author} className="author-avatar" />
                      <div>
                        <h4 className="author-name">{item.author}</h4>
                        <span className="author-title">{item.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Shop Catalog View */
          <div className="catalog-page-container">
            <ProductGrid />
          </div>
        )}
      </main>

      {/* Global Modals & Slide-out Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Quick Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          className={`mobile-tab-btn ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          className={`mobile-tab-btn ${activeView === 'shop' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Store size={20} />
          <span>Catalog</span>
        </button>

        <button
          className="mobile-tab-btn"
          onClick={() => setIsWishlistOpen(true)}
        >
          <div className="mobile-tab-icon-wrap">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="mobile-tab-badge">{wishlist.length}</span>
            )}
          </div>
          <span>Wishlist</span>
        </button>

        <button
          className="mobile-tab-btn"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="mobile-tab-icon-wrap">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="mobile-tab-badge">{cartCount}</span>
            )}
          </div>
          <span>Bag</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
