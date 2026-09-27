import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Eye,
  ArrowUpRight
} from 'lucide-react';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct
  } = useShop();

  const [added, setAdded] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const itemCode = `MR-${String(product.id).padStart(2, '0')}`;

  return (
    <div
      className={`morae-product-card ${viewMode === 'list' ? 'card-list-mode' : ''}`}
      onClick={() => setSelectedProduct(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
    >
      {/* Top Header of Card */}
      <div className="card-top-header">
        <span className="card-item-code">[{itemCode}]</span>
        <span className="card-cat-label">{product.category}</span>
        <button
          className={`card-wishlist-trigger ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from saved' : 'Save item'}
        >
          <Heart size={16} fill={isFavorited ? '#fc721b' : 'none'} color={isFavorited ? '#fc721b' : '#777777'} />
        </button>
      </div>

      {/* Image Area */}
      <div className="card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card-product-img"
          loading="lazy"
        />

        {/* Badges */}
        <div className="card-badge-cluster">
          {product.badge && (
            <span className={`morae-badge ${product.badge.toLowerCase().includes('sale') ? 'badge-sale' : 'badge-accent'}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge && (
            <span className="morae-badge badge-sale">-{discountPercent}%</span>
          )}
        </div>

        {/* Hover Quick View Pill */}
        <div className="card-hover-overlay">
          <span className="hover-inspect-pill">
            <Eye size={14} />
            <span>QUICK INSPECT</span>
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="card-content-area">
        <div className="card-rating-line">
          <div className="stars-mini-row">
            <Star size={13} className="star-fill" />
            <span className="rating-val">{product.rating}</span>
          </div>
          <span className="reviews-tally">({product.reviewsCount} reviews)</span>
        </div>

        <h3 className="card-item-title" title={product.name}>
          {product.name}
        </h3>

        {viewMode === 'list' && (
          <p className="card-list-summary">{product.description}</p>
        )}

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="card-colors-row">
            {product.colors.map((hex, idx) => (
              <span
                key={idx}
                className="color-dot"
                style={{ backgroundColor: hex }}
                title={`Finish option ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Footer: Price & Add Button */}
        <div className="card-bottom-bar">
          <div className="card-price-stack">
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="price-strikethrough">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className={`btn-add-bag ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to bag`}
          >
            {added ? (
              <>
                <Check size={14} />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>+ BAG</span>
              </>
            )}
          </button>
        </div>

        {/* Low inventory alert */}
        {product.inStock && product.stockCount <= 10 && (
          <div className="card-stock-warning">
            LIMITED STOCK: {product.stockCount} UNITS REMAINING
          </div>
        )}
      </div>
    </div>
  );
};
