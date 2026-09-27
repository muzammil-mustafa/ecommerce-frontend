import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    moveWishlistToCart,
    removeFromWishlist,
    addToCart,
    setActiveView
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
      removeFromWishlist(item.id);
    });
  };

  const handleStartBrowsing = () => {
    setIsWishlistOpen(false);
    setActiveView('shop');
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div
        className="drawer-panel wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <Heart size={20} className="wishlist-header-heart" />
            <h3>Your Saved Wishlist</h3>
            <span className="drawer-count-badge">({wishlist.length})</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {wishlist.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-cart-icon">
                <Heart size={56} />
              </div>
              <h4>Your wishlist is empty</h4>
              <p>Tap the heart icon on any product to save your favorite picks for later.</p>
              <button className="btn btn-primary" onClick={handleStartBrowsing}>
                <span>Browse Products</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <img src={item.image} alt={item.name} className="wishlist-item-img" />

                  <div className="wishlist-item-info">
                    <span className="wishlist-item-category">{item.category}</span>
                    <h4 className="wishlist-item-name">{item.name}</h4>
                    <span className="wishlist-item-price">${item.price.toFixed(2)}</span>

                    <div className="wishlist-item-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => moveWishlistToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        className="btn-icon-danger"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove from wishlist"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="drawer-footer">
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={handleMoveAllToCart}
            >
              <ShoppingBag size={18} />
              <span>Move All to Shopping Bag</span>
            </button>
            <div className="drawer-sub-actions">
              <button className="btn-text-link" onClick={handleStartBrowsing}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
