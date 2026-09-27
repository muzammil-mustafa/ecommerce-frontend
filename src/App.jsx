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
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import {
  ArrowRight,
  Star,
  Home,
  Store,
  Heart,
  ShoppingBag,
  Info,
  Phone
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

  const bestsellers = products.filter((p) => p.badge === 'Bestseller').slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === 'New Arrival' || p.badge === 'Limited').slice(0, 4);

  // MORAE Verified Testimonials
  const testimonials = [
    {
      id: 1,
      quote: "It feels like the world finally learned to whisper. You don’t realize how much chaos you carry until it takes it away.",
      author: "Noah Patel",
      title: "Sound Designer & Composer",
      location: "London, UK"
    },
    {
      id: 2,
      quote: "Every note sounds personal, like it knows who’s listening. The materials feel cool to the touch and disappear when worn.",
      author: "Elena Rossi",
      title: "Industrial Architect",
      location: "Milan, IT"
    },
    {
      id: 3,
      quote: "I stopped checking the battery. It just never seems to die. Clean, unpretentious, and uncompromising in build.",
      author: "David Kim",
      title: "Creative Director",
      location: "Seoul, KR"
    }
  ];

  return (
    <div className="morae-root-layout">
      {/* Dynamic Toast Alerts */}
      <ToastContainer />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Area Based on Active View */}
      <main className="morae-main-container">
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <>
            <HeroBanner />

            {/* Bestsellers Section */}
            <section className="morae-showcase-section">
              <div className="showcase-header">
                <div>
                  <span className="mono-subhead">[ ESSENTIAL RELEASES ]</span>
                  <h2 className="showcase-title">
                    Trending Hardware &amp; <span className="serif-italic-accent">Acoustics</span>
                  </h2>
                </div>
                <button
                  className="mono-view-all"
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>EXPLORE ALL ARCHIVES</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="morae-grid-4">
                {bestsellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Editorial Storytelling Banner */}
            <section className="morae-editorial-section">
              <div className="editorial-grid">
                <div className="editorial-text-side">
                  <span className="mono-subhead">[ THE MORAE MANIFESTO ]</span>
                  <h2 className="editorial-title">
                    Transparent glass. Bold color. <span className="serif-italic-accent">Pure experience.</span>
                  </h2>
                  <p className="editorial-lead">
                    Sound is not just heard — it moves through you. It breathes, it glows, it becomes part of who you are. We construct physical objects that honor acoustic intention rather than commercial hype.
                  </p>

                  <div className="editorial-pillars-row">
                    <div className="pillar-item">
                      <span className="pillar-mono">[01]</span>
                      <h4>Silence Shaped</h4>
                      <p>Blocks environmental chaos without air pressure fatigue.</p>
                    </div>
                    <div className="pillar-item">
                      <span className="pillar-mono">[02]</span>
                      <h4>Adaptive Tuning</h4>
                      <p>Continuously compensates for spatial acoustic acoustics.</p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      setActiveView('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span>Read Full Philosophy</span>
                    <ArrowRight size={17} />
                  </button>
                </div>

                <div className="editorial-visual-side">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
                    alt="Acoustic Engineering"
                  />
                  <div className="visual-caption-tag">
                    <span>® NO OFFICE. GLOBAL REACH.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Fresh Drops Section */}
            <section className="morae-showcase-section">
              <div className="showcase-header">
                <div>
                  <span className="mono-subhead">[ NEW DROPS ]</span>
                  <h2 className="showcase-title">
                    Limited Production &amp; <span className="serif-italic-accent">Fresh Arrivals</span>
                  </h2>
                </div>
                <button
                  className="mono-view-all"
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>VIEW ALL ITEMS</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="morae-grid-4">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="morae-testimonials-section">
              <div className="testimonials-header">
                <span className="mono-subhead">[ VERIFIED OBSERVATIONS ]</span>
                <h2 className="showcase-title">
                  Hear it from those who <span className="serif-italic-accent">listen deeply.</span>
                </h2>
              </div>

              <div className="morae-testimonials-grid">
                {testimonials.map((t) => (
                  <div key={t.id} className="morae-quote-card">
                    <p className="quote-body">"{t.quote}"</p>
                    <div className="quote-author-line">
                      <span className="author-name">— {t.author}</span>
                      <span className="author-role">{t.title}, {t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: PRODUCT CATALOG PAGE */}
        {activeView === 'shop' && (
          <div className="shop-view-wrapper">
            <ProductGrid />
          </div>
        )}

        {/* VIEW 3: PHILOSOPHY & ABOUT PAGE */}
        {activeView === 'about' && (
          <AboutView />
        )}

        {/* VIEW 4: CONTACT INQUIRIES PAGE */}
        {activeView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Tab Bar */}
      <nav className="morae-mobile-bottom-bar">
        <button
          className={`mobile-tab-btn ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Home size={18} />
          <span>Home</span>
        </button>

        <button
          className={`mobile-tab-btn ${activeView === 'shop' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Store size={18} />
          <span>Catalog</span>
        </button>

        <button
          className={`mobile-tab-btn ${activeView === 'about' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Info size={18} />
          <span>Philosophy</span>
        </button>

        <button
          className="mobile-tab-btn"
          onClick={() => setIsWishlistOpen(true)}
        >
          <div className="tab-badge-wrap">
            <Heart size={18} />
            {wishlist.length > 0 && <span className="tab-dot-count">{wishlist.length}</span>}
          </div>
          <span>Saved</span>
        </button>

        <button
          className="mobile-tab-btn"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="tab-badge-wrap">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="tab-dot-count accent-dot">{cartCount}</span>}
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
