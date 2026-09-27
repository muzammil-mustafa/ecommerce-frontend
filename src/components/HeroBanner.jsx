import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Headphones,
  Laptop,
  Shirt,
  Armchair,
  Footprints,
  Flame
} from 'lucide-react';

export const HeroBanner = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  // Flash sale countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveView('shop');
  };

  const categories = [
    { name: 'Audio', icon: Headphones, count: '3 Products', color: 'cat-audio' },
    { name: 'Electronics', icon: Laptop, count: '3 Products', color: 'cat-electronics' },
    { name: 'Fashion', icon: Shirt, count: '4 Products', color: 'cat-fashion' },
    { name: 'Home & Living', icon: Armchair, count: '3 Products', color: 'cat-home' },
    { name: 'Footwear', icon: Footprints, count: '3 Products', color: 'cat-footwear' }
  ];

  return (
    <div className="hero-section">
      {/* Main Hero Spotlight */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} className="badge-icon" />
            <span>Summer Essentials 2026 Collection</span>
          </div>

          <h1 className="hero-title">
            Curated Gear &amp; Apparel for Modern Living
          </h1>

          <p className="hero-subtitle">
            Discover engineered audio, minimalist fashion, artisan homeware, and performance footwear. Handpicked for enduring craftsmanship and contemporary aesthetics.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                setSelectedCategory('All');
                setActiveView('shop');
              }}
            >
              <span>Shop All Products</span>
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => handleCategoryClick('Audio')}
            >
              <span>Explore Audio Gear</span>
            </button>
          </div>

          {/* Flash Sale Pill */}
          <div className="flash-sale-badge">
            <Flame size={16} className="flame-icon" />
            <span>Limited Flash Sale Ends In:</span>
            <div className="countdown-box">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span> :
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span> :
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Featured AuraStudio Pro Headphones"
              className="hero-featured-img"
            />
            <div className="hero-floating-tag">
              <span className="floating-badge">Deal of the Day</span>
              <h4 className="floating-name">AuraStudio Pro ANC</h4>
              <p className="floating-price">
                $249.99 <span className="original">$299.99</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Value Proposition Strip */}
      <div className="value-strip">
        <div className="value-item">
          <div className="value-icon-box">
            <Truck size={22} />
          </div>
          <div>
            <h4>Free Express Shipping</h4>
            <p>On all qualifying orders over $75</p>
          </div>
        </div>

        <div className="value-item">
          <div className="value-icon-box">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4>2-Year Full Warranty</h4>
            <p>100% authentic manufacturer backed</p>
          </div>
        </div>

        <div className="value-item">
          <div className="value-icon-box">
            <RotateCcw size={22} />
          </div>
          <div>
            <h4>30-Day Hassle-Free Returns</h4>
            <p>Zero restocking fee guarantee</p>
          </div>
        </div>

        <div className="value-item">
          <div className="value-icon-box">
            <Zap size={22} />
          </div>
          <div>
            <h4>Instant Safe Checkout</h4>
            <p>Protected by 256-bit SSL encryption</p>
          </div>
        </div>
      </div>

      {/* Category Shortcut Cards */}
      <div className="category-showcase-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you need in our curated departments</p>
          </div>
          <button
            className="view-all-link"
            onClick={() => {
              setSelectedCategory('All');
              setActiveView('shop');
            }}
          >
            <span>View All Departments</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="category-cards-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`category-card ${cat.color}`}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
              >
                <div className="cat-icon-container">
                  <Icon size={26} />
                </div>
                <h3 className="cat-card-title">{cat.name}</h3>
                <span className="cat-card-count">{cat.count}</span>
                <span className="cat-card-arrow">
                  <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
