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

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors && selectedProduct.colors.length > 0
      ? selectedProduct.colors[0]
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState(selectedProduct.reviews || []);
  const [authorName, setAuthorName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
    setSelectedColor(
      selectedProduct.colors && selectedProduct.colors.length > 0
        ? selectedProduct.colors[0]
        : null
    );
    setQuantity(1);
    setReviewsList(selectedProduct.reviews || []);
    setShowReviewForm(false);
  }, [selectedProduct]);

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
  const itemCode = `MR-${String(selectedProduct.id).padStart(2, '0')}`;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      return next >= 1 && next <= (selectedProduct.stockCount || 99) ? next : prev;
    });
  };

  const handleAdd = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      author: authorName.trim(),
      rating: reviewRating,
      date: 'Just now',
      comment: reviewComment.trim()
    };

    setReviewsList([newRev, ...reviewsList]);
    setAuthorName('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const related = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
      <div
        className="morae-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={selectedProduct.name}
      >
        {/* Close Button */}
        <button
          className="morae-modal-close"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="morae-modal-grid">
          {/* Left Column: Visual Gallery */}
          <div className="modal-col-gallery">
            <div className="modal-display-frame">
              <img
                src={images[activeImgIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-display-img"
              />
              <span className="modal-top-code">[{itemCode} / SPEC]</span>
            </div>

            {images.length > 1 && (
              <div className="modal-thumbs-strip">
                {images.map((url, i) => (
                  <button
                    key={i}
                    className={`thumb-box ${activeImgIndex === i ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(i)}
                    aria-label={`View angle ${i + 1}`}
                  >
                    <img src={url} alt={`Angle ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="modal-specs-box">
              <div className="spec-item-row">
                <Truck size={15} />
                <span>Complimentary express courier shipping over $75</span>
              </div>
              <div className="spec-item-row">
                <RotateCcw size={15} />
                <span>30-day inspection period &amp; hassle-free returns</span>
              </div>
              <div className="spec-item-row">
                <ShieldCheck size={15} />
                <span>Official 12-month manufacturer limited warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Order Controls */}
          <div className="modal-col-details">
            <div className="modal-dept-label">
              <span>[ {selectedProduct.category.toUpperCase()} ]</span>
            </div>

            <h1 className="modal-title-text">{selectedProduct.name}</h1>

            {/* Ratings */}
            <div className="modal-review-summary">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`star-icon ${i < Math.floor(selectedProduct.rating) ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <span className="mono-rating-score"><strong>{selectedProduct.rating}</strong> / 5.0</span>
              <span className="mono-rating-count">({reviewsList.length} reviews)</span>
            </div>

            {/* Price line */}
            <div className="modal-price-display">
              <span className="active-price">${selectedProduct.price.toFixed(2)}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="strikethrough-price">${selectedProduct.originalPrice.toFixed(2)}</span>
                  <span className="discount-tag">SAVE {discountPercent}%</span>
                </>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="modal-stock-indicator">
              <span className={`status-orb ${selectedProduct.inStock ? 'in-stock' : 'out-of-stock'}`} />
              <span className="mono-stock-label">
                {selectedProduct.inStock
                  ? `IN STOCK — ${selectedProduct.stockCount} UNITS AVAILABLE`
                  : 'CURRENTLY OUT OF STOCK'}
              </span>
            </div>

            {/* Description */}
            <p className="modal-desc-body">{selectedProduct.description}</p>

            {/* Features */}
            {selectedProduct.features && (
              <div className="modal-features-block">
                <span className="mono-features-header">[ HIGHLIGHTED SPECIFICATIONS ]</span>
                <ul>
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i}>
                      <span className="bullet-dash">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Swatch Options */}
            {selectedProduct.colors && (
              <div className="modal-variant-block">
                <span className="mono-subhead">[ FINISH VARIANT ]</span>
                <div className="variant-swatch-list">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      className={`swatch-ring ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select finish ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Adjuster & Actions */}
            <div className="modal-order-panel">
              <div className="qty-control-row">
                <span className="mono-subhead">[ QUANTITY ]</span>
                <div className="morae-qty-selector">
                  <button
                    className="qty-step-btn"
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <input
                    type="number"
                    className="qty-number-input"
                    value={quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v) && v >= 1 && v <= selectedProduct.stockCount) setQuantity(v);
                    }}
                    min="1"
                    max={selectedProduct.stockCount}
                  />
                  <button
                    className="qty-step-btn"
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= selectedProduct.stockCount}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-btn-cluster">
                <button
                  className={`btn btn-primary btn-block ${addedSuccess ? 'btn-success' : ''}`}
                  onClick={handleAdd}
                  disabled={!selectedProduct.inStock}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>ADDED TO SHOPPING BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>ADD TO BAG — ${(selectedProduct.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  className="btn btn-accent btn-block"
                  onClick={handleBuyNow}
                  disabled={!selectedProduct.inStock}
                >
                  <Zap size={16} />
                  <span>INSTANT CHECKOUT</span>
                </button>

                <button
                  className={`btn btn-outline btn-block ${isFavorited ? 'active-fav' : ''}`}
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Heart size={16} fill={isFavorited ? '#fc721b' : 'none'} color={isFavorited ? '#fc721b' : 'currentColor'} />
                  <span>{isFavorited ? 'SAVED IN WISHLIST' : 'SAVE TO WISHLIST'}</span>
                </button>
              </div>
            </div>

            {/* Technical Specs Table */}
            {selectedProduct.specs && (
              <div className="modal-specs-table-block">
                <span className="mono-subhead">[ ARCHITECTURAL PARAMETERS ]</span>
                <div className="morae-specs-grid">
                  {Object.entries(selectedProduct.specs).map(([k, v]) => (
                    <div key={k} className="spec-grid-row">
                      <span className="spec-k">{k}</span>
                      <span className="spec-v">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews Section */}
            <div className="modal-reviews-block">
              <div className="reviews-top-bar">
                <span className="mono-subhead">[ REVIEWS ({reviewsList.length}) ]</span>
                <button
                  className="btn-ghost-sm"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  <MessageSquarePlus size={14} />
                  <span>{showReviewForm ? 'CANCEL' : 'WRITE REVIEW'}</span>
                </button>
              </div>

              {showReviewForm && (
                <form className="modal-review-form" onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label>[ YOUR NAME ]</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>[ RATING SCORE ]</label>
                    <div className="rating-select-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="star-pick-btn"
                          onClick={() => setReviewRating(s)}
                        >
                          <Star
                            size={16}
                            className={`star-icon ${s <= reviewRating ? 'filled' : ''}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>[ FEEDBACK &amp; OBSERVATION ]</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Comment on acoustic fidelity, materials, or durability..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={14} />
                    <span>POST REVIEW</span>
                  </button>
                </form>
              )}

              <div className="reviews-scroll-list">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="morae-review-card">
                    <div className="rev-header">
                      <span className="rev-name">{rev.author}</span>
                      <span className="rev-date">{rev.date}</span>
                    </div>
                    <div className="rev-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`star-icon ${i < rev.rating ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                    <p className="rev-text">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Hardware */}
            {related.length > 0 && (
              <div className="modal-related-block">
                <span className="mono-subhead">[ RELATED HARDWARE ]</span>
                <div className="related-cards-row">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      className="related-item-tile"
                      onClick={() => setSelectedProduct(rel)}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={rel.image} alt={rel.name} />
                      <div className="rel-info">
                        <span className="rel-name">{rel.name}</span>
                        <span className="rel-price">${rel.price.toFixed(2)}</span>
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
