import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Eye,
  Sparkles
} from 'lucide-react';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct
  } = useShop();

  const [addedAnimation, setAddedAnimation] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`product-card ${viewMode === 'list' ? 'product-card-list' : ''}`}
      onClick={() => setSelectedProduct(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      {/* Image Container */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="card-badges">
          {product.badge && (
            <span className={`badge ${product.badge.toLowerCase().includes('sale') ? 'badge-sale' : 'badge-primary'}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge && (
            <span className="badge badge-sale">-{discountPercent}%</span>
          )}
        </div>

        {/* Wishlist Floating Button */}
        <button
          className={`wishlist-toggle-btn ${isFavorited ? 'is-active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorited ? '#ef4444' : 'none'} color={isFavorited ? '#ef4444' : '#64748b'} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="card-quick-actions">
          <span className="quick-view-btn">
            <Eye size={15} />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="product-card-info">
        <div className="card-meta">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={14} className="star-icon filled" />
            <span className="rating-score">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        {viewMode === 'list' && (
          <p className="product-list-description">{product.description}</p>
        )}

        {/* Color Swatches Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-swatches-preview">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="color-swatch-dot"
                style={{ backgroundColor: color }}
                title={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Price & Stock info */}
        <div className="card-footer">
          <div className="price-wrapper">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            className={`add-to-cart-btn ${addedAnimation ? 'added-state' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Low Stock Warning */}
        {product.inStock && product.stockCount <= 10 && (
          <div className="low-stock-alert">
            Only {product.stockCount} left in stock - order soon!
          </div>
        )}
      </div>
    </div>
  );
};
