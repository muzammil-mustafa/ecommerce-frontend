import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ArrowRight,
  Headphones,
  Laptop,
  Shirt,
  Armchair,
  Footprints,
  Sparkles,
  Zap
} from 'lucide-react';

export const HeroBanner = () => {
  const { setActiveView, setSelectedCategory, products, setSelectedProduct } = useShop();

  // Highlight hero product (MORAE flagship headphones)
  const heroProduct = products.find((p) => p.id === 1) || products[0];

  const categories = [
    { name: 'Audio', code: '01', count: '3 Items' },
    { name: 'Electronics', code: '02', count: '3 Items' },
    { name: 'Fashion', code: '03', count: '4 Items' },
    { name: 'Home & Living', code: '04', count: '3 Items' },
    { name: 'Footwear', code: '05', count: '3 Items' }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveView('shop');
  };

  return (
    <div className="morae-hero-section">
      {/* Top Meta Bar */}
      <div className="hero-top-meta">
        <span className="hero-tag-mono">[ MORAE® HARDWARE ARCHIVE 2026 ]</span>
        <span className="hero-tag-mono">EDITION: 01 / GLOBAL RELEASE</span>
      </div>

      {/* Main Hero Grid */}
      <div className="morae-hero-banner">
        <div className="hero-editorial-left">
          <div className="morae-subhead-pill">
            <span className="pulse-dot" />
            <span>ATMOSPHERIC MINIMALISM</span>
          </div>

          <h1 className="morae-hero-title">
            Silence speaks louder when design <span className="serif-italic-accent">refuses to explain itself.</span>
          </h1>

          <p className="morae-hero-description">
            In a world full of noise, silence became a choice. Engineered with surgical-grade alloys, custom 40mm acoustic acoustic drivers, and obsessive zero-clutter ergonomics.
          </p>

          <div className="morae-hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                setSelectedCategory('All');
                setActiveView('shop');
              }}
            >
              <span>Explore Collection</span>
              <ArrowRight size={17} />
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setSelectedProduct(heroProduct)}
            >
              <span>Inspect Flagship [ MR-01 ]</span>
            </button>
          </div>

          <div className="morae-scroll-indicator">
            <span className="mono-scroll">[ SCROLL TO DISCOVER ]</span>
            <span className="scroll-line" />
          </div>
        </div>

        {/* Right: Dramatic Hero Visual */}
        <div className="hero-visual-right">
          <div
            className="morae-visual-card"
            onClick={() => setSelectedProduct(heroProduct)}
            role="button"
            tabIndex={0}
          >
            <div className="visual-top-bar">
              <span className="visual-code">MR-01 / FLAGSHIP</span>
              <span className="visual-status">READY TO DISPATCH</span>
            </div>

            <div className="visual-img-container">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="visual-featured-img"
              />
            </div>

            <div className="visual-bottom-info">
              <div>
                <h3 className="visual-title">{heroProduct.name}</h3>
                <span className="visual-desc">Hybrid Active Noise Cancellation 2.0</span>
              </div>
              <div className="visual-price-block">
                <span className="visual-price">${heroProduct.price.toFixed(2)}</span>
                <span className="visual-inspect-tag">INSPECT ›</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Highlights 5-Column Bar */}
      <div className="morae-specs-strip">
        <div className="spec-strip-item">
          <span className="strip-idx">[ 01 ]</span>
          <h4>Active Noise Cancellation</h4>
          <p>Proprietary acoustic isolation</p>
        </div>
        <div className="spec-strip-item">
          <span className="strip-idx">[ 02 ]</span>
          <h4>Transparent Mode</h4>
          <p>Natural environmental awareness</p>
        </div>
        <div className="spec-strip-item">
          <span className="strip-idx">[ 03 ]</span>
          <h4>40-Hour Battery</h4>
          <p>Extended playback stamina</p>
        </div>
        <div className="spec-strip-item">
          <span className="strip-idx">[ 04 ]</span>
          <h4>Intuitive Gestures</h4>
          <p>Zero tactile buttons needed</p>
        </div>
        <div className="spec-strip-item">
          <span className="strip-idx">[ 05 ]</span>
          <h4>Adaptive Balance</h4>
          <p>Real-time room EQ tuning</p>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="morae-category-nav-section">
        <div className="category-nav-header">
          <span className="mono-subhead">[ DEPARTMENTS ]</span>
          <span className="mono-meta">CURATED ACROSS 5 DISCIPLINES</span>
        </div>

        <div className="morae-category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="morae-cat-card"
              onClick={() => handleCategoryClick(cat.name)}
              role="button"
              tabIndex={0}
            >
              <div className="cat-card-top">
                <span className="cat-code">/{cat.code}</span>
                <span className="cat-count-tag">{cat.count}</span>
              </div>
              <h3 className="cat-title">{cat.name}</h3>
              <div className="cat-bottom-link">
                <span>View Products</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
