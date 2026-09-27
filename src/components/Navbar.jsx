import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  Menu,
  Sparkles,
  SlidersHorizontal,
  Home,
  Store
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
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activeView !== 'shop') {
      setActiveView('shop');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleNavigate = (view, category = null) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>
            ✨ <strong>LIMITED TIME:</strong> Use coupon <code>SAVE15</code> for 15% off orders over $50! Free worldwide shipping on orders $75+
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="nav-container">
        {/* Left: Mobile Menu Trigger + Logo */}
        <div className="nav-left">
          <button
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div
            className="brand-logo"
            onClick={() => handleNavigate('home')}
            role="button"
            tabIndex={0}
          >
            <div className="logo-icon-wrapper">
              <Sparkles className="logo-sparkle" size={20} />
            </div>
            <span className="logo-text">
              Aura<span className="logo-accent">Store</span>
            </span>
          </div>

          <nav className="desktop-nav-links">
            <button
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigate('home')}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeView === 'shop' ? 'active' : ''}`}
              onClick={() => handleNavigate('shop')}
            >
              Shop All
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigate('shop', 'Electronics')}
            >
              Electronics
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigate('shop', 'Fashion')}
            >
              Fashion
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigate('shop', 'Audio')}
            >
              Audio
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="nav-search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (activeView !== 'shop') setActiveView('shop');
              }}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={handleClearSearch}
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions (Wishlist & Cart & Mobile Search) */}
        <div className="nav-actions">
          {/* Mobile search toggle */}
          <button
            className="action-btn mobile-search-toggle"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
            aria-label="Toggle mobile search"
          >
            <Search size={20} />
          </button>

          {/* Wishlist Button */}
          <button
            className="action-btn wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Wishlist with ${wishlist.length} items`}
            title="View Wishlist"
          >
            <Heart size={21} className={wishlist.length > 0 ? 'has-items' : ''} />
            {wishlist.length > 0 && (
              <span className="badge-counter wishlist-badge">{wishlist.length}</span>
            )}
          </button>

          {/* Cart Button */}
          <button
            className="action-btn cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items`}
            title="View Cart"
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="badge-counter cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {mobileSearchVisible && (
        <div className="mobile-search-dropdown">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={handleClearSearch}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="brand-logo">
                <Sparkles className="logo-sparkle" size={18} />
                <span className="logo-text">AuraStore</span>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-menu-body">
              <nav className="mobile-nav-list">
                <button
                  className={`mobile-nav-item ${activeView === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavigate('home')}
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                <button
                  className={`mobile-nav-item ${activeView === 'shop' ? 'active' : ''}`}
                  onClick={() => handleNavigate('shop')}
                >
                  <Store size={18} />
                  <span>Shop Catalog</span>
                </button>
              </nav>

              <div className="mobile-menu-section">
                <h4>Popular Categories</h4>
                <div className="mobile-category-tags">
                  {['Electronics', 'Audio', 'Fashion', 'Home & Living', 'Footwear'].map((cat) => (
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

              <div className="mobile-menu-promo">
                <p>🎁 <strong>Promo Code:</strong> <code>SAVE15</code></p>
                <small>Apply at checkout for 15% discount!</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
