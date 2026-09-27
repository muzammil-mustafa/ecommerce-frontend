import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  MessageSquarePlus,
  Send
} from 'lucide-react';

export const ProductDetailsModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    setIsCheckoutOpen
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors && selectedProduct.colors.length > 0
      ? selectedProduct.colors[0]
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Review submission state
  const [reviewsList, setReviewsList] = useState(selectedProduct.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Reset state when selectedProduct changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(
      selectedProduct.colors && selectedProduct.colors.length > 0
        ? selectedProduct.colors[0]
        : null
    );
    setQuantity(1);
    setReviewsList(selectedProduct.reviews || []);
    setShowReviewForm(false);
  }, [selectedProduct]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProduct]);

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.image];

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      return next >= 1 && next <= (selectedProduct.stockCount || 99) ? next : prev;
    });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  // Related products (same category excluding current)
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
      <div
        className="product-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={selectedProduct.name}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Gallery & Images */}
          <div className="modal-gallery-column">
            <div className="main-display-image-wrap">
              <img
                src={images[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="main-display-image"
              />
              {selectedProduct.badge && (
                <span className="modal-badge-tag">{selectedProduct.badge}</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="gallery-thumbnails-row">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees Under Image */}
            <div className="modal-trust-box">
              <div className="trust-row">
                <Truck size={16} />
                <span>Free standard shipping over $75</span>
              </div>
              <div className="trust-row">
                <RotateCcw size={16} />
                <span>30 days free return policy</span>
              </div>
              <div className="trust-row">
                <ShieldCheck size={16} />
                <span>Official 2-year warranty included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Options & Actions */}
          <div className="modal-info-column">
            <div className="modal-category-badge">{selectedProduct.category}</div>
            <h1 className="modal-product-title">{selectedProduct.name}</h1>

            {/* Rating & Reviews counter */}
            <div className="modal-ratings-summary">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`star-icon ${i < Math.floor(selectedProduct.rating) ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <span className="rating-num"><strong>{selectedProduct.rating}</strong>/5</span>
              <span className="review-count">({reviewsList.length} verified reviews)</span>
            </div>

            {/* Price Box */}
            <div className="modal-price-box">
              <span className="modal-active-price">${selectedProduct.price.toFixed(2)}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="modal-strikethrough-price">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="modal-discount-pill">Save {discountPercent}%</span>
                </>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="stock-status-line">
              <span className={`status-dot ${selectedProduct.inStock ? 'in-stock' : 'out-of-stock'}`} />
              <span className="status-text">
                {selectedProduct.inStock
                  ? `In Stock (${selectedProduct.stockCount} units available)`
                  : 'Currently Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="modal-description-text">{selectedProduct.description}</p>

            {/* Key Features Bullet Points */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="modal-features-list">
                <h4>Key Features</h4>
                <ul>
                  {selectedProduct.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={14} className="feature-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Swatch Selector */}
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div className="modal-option-group">
                <span className="option-label">Color Finish:</span>
                <div className="color-swatches-interactive">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-pick-circle ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls & Action Buttons */}
            <div className="modal-actions-area">
              <div className="quantity-controls-block">
                <span className="option-label">Quantity:</span>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1 && val <= selectedProduct.stockCount) {
                        setQuantity(val);
                      }
                    }}
                    min="1"
                    max={selectedProduct.stockCount}
                  />
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= selectedProduct.stockCount}
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now */}
              <div className="modal-button-cluster">
                <button
                  className={`btn btn-primary btn-block ${addedSuccess ? 'btn-success' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  className="btn btn-accent btn-block"
                  onClick={handleBuyNow}
                  disabled={!selectedProduct.inStock}
                >
                  <Zap size={18} />
                  <span>Instant Checkout</span>
                </button>

                <button
                  className={`btn btn-outline btn-block ${isFavorited ? 'wishlist-active' : ''}`}
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Heart size={18} fill={isFavorited ? '#ef4444' : 'none'} color={isFavorited ? '#ef4444' : 'currentColor'} />
                  <span>{isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Technical Specifications */}
            {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
              <div className="modal-specs-section">
                <h4>Technical Specifications</h4>
                <div className="specs-table">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}</span>
                      <span className="spec-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews Section */}
            <div className="modal-reviews-section">
              <div className="reviews-header-bar">
                <h4>Customer Reviews ({reviewsList.length})</h4>
                <button
                  className="btn-sm btn-ghost"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  <MessageSquarePlus size={15} />
                  <span>{showReviewForm ? 'Cancel Review' : 'Write Review'}</span>
                </button>
              </div>

              {/* Review submission form */}
              {showReviewForm && (
                <form className="add-review-form" onSubmit={handleAddReview}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="star-rating-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-pick-btn"
                          onClick={() => setNewReviewRating(star)}
                        >
                          <Star
                            size={18}
                            className={`star-icon ${star <= newReviewRating ? 'filled' : ''}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Review Comment</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="How was the product quality, performance, or fit?"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={14} />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="reviews-cards-list">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="review-card-item">
                    <div className="review-card-header">
                      <span className="review-author">{rev.author}</span>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    <div className="review-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={`star-icon ${i < rev.rating ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                    <p className="review-comment-text">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Products Recommendations */}
            {relatedProducts.length > 0 && (
              <div className="modal-related-section">
                <h4>Similar Items in {selectedProduct.category}</h4>
                <div className="related-items-row">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      className="related-item-card"
                      onClick={() => setSelectedProduct(rel)}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={rel.image} alt={rel.name} />
                      <div className="related-item-info">
                        <span className="related-item-name">{rel.name}</span>
                        <span className="related-item-price">${rel.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
