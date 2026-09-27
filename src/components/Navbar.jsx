import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  Menu,
  ArrowUpRight
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setSelectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activeView !== 'shop') {
      setActiveView('shop');
    }
  };

  const handleNavigate = (view, category = null) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-header">
      {/* Top Ticker Announcement */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="mono-ticker-item">
            ® NO OFFICE. GLOBAL REACH. &nbsp;///&nbsp; USE CODE <strong className="accent-orange-text">SAVE15</strong> FOR 15% OFF &nbsp;///&nbsp; COMPLIMENTARY COURIER SHIPPING OVER $75
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="nav-container">
        {/* Left: Brand Logo */}
        <div className="nav-left">
          <button
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div
            className="brand-logo"
            onClick={() => handleNavigate('home')}
            role="button"
            tabIndex={0}
          >
            <span className="brand-dot" />
            <span className="logo-text">MORAE<sup>®</sup></span>
          </div>

          <nav className="desktop-nav-links">
            <button
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigate('home')}
            >
              [ 01 ] HOME
            </button>
            <button
              className={`nav-link ${activeView === 'shop' ? 'active' : ''}`}
              onClick={() => handleNavigate('shop')}
            >
              [ 02 ] CATALOG
            </button>
            <button
              className={`nav-link ${activeView === 'about' ? 'active' : ''}`}
              onClick={() => handleNavigate('about')}
            >
              [ 03 ] PHILOSOPHY
            </button>
            <button
              className={`nav-link ${activeView === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavigate('contact')}
            >
              [ 04 ] CONTACT
            </button>
          </nav>
        </div>

        {/* Center/Right: Search Bar & Actions */}
        <div className="nav-right">
          {/* Search Trigger / Expandable Input */}
          <div className={`nav-search-bar ${searchOpen ? 'expanded' : ''}`}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search catalog by name or tag..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (activeView !== 'shop') setActiveView('shop');
                }}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear query"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Wishlist Pill */}
          <button
            className="action-pill-btn wishlist-pill"
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Wishlist (${wishlist.length})`}
            title="Saved Items"
          >
            <Heart size={16} className={wishlist.length > 0 ? 'heart-active' : ''} />
            <span className="pill-text">SAVED</span>
            {wishlist.length > 0 && (
              <span className="pill-counter">{wishlist.length}</span>
            )}
          </button>

          {/* Cart Pill */}
          <button
            className="action-pill-btn cart-pill"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Cart (${cartCount})`}
            title="Shopping Cart"
          >
            <ShoppingBag size={16} />
            <span className="pill-text">BAG</span>
            <span className="pill-counter accent-bg">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="brand-logo">
                <span className="brand-dot" />
                <span className="logo-text">MORAE<sup>®</sup></span>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-menu-body">
              <div className="mobile-search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <nav className="mobile-nav-list">
                <button
                  className={`mobile-nav-item ${activeView === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavigate('home')}
                >
                  <span>[ 01 ] HOME</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  className={`mobile-nav-item ${activeView === 'shop' ? 'active' : ''}`}
                  onClick={() => handleNavigate('shop')}
                >
                  <span>[ 02 ] CATALOG</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  className={`mobile-nav-item ${activeView === 'about' ? 'active' : ''}`}
                  onClick={() => handleNavigate('about')}
                >
                  <span>[ 03 ] PHILOSOPHY</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  className={`mobile-nav-item ${activeView === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavigate('contact')}
                >
                  <span>[ 04 ] CONTACT</span>
                  <ArrowUpRight size={16} />
                </button>
              </nav>

              <div className="mobile-menu-categories">
                <span className="mono-subhead">[ DEPARTMENTS ]</span>
                <div className="mobile-cat-pills">
                  {['Audio', 'Electronics', 'Fashion', 'Home & Living', 'Footwear'].map((cat) => (
                    <button
                      key={cat}
                      className="category-pill-btn"
                      onClick={() => handleNavigate('shop', cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mobile-menu-footer">
                <span className="mono-meta">PROMO VOUCHER: SAVE15 (15% OFF)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
