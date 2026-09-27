import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight
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

  const handleMoveAll = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1);
      removeFromWishlist(item.id);
    });
  };

  const handleBrowse = () => {
    setIsWishlistOpen(false);
    setActiveView('shop');
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div
        className="morae-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist Archive"
      >
        {/* Header */}
        <div className="drawer-top-bar">
          <div className="drawer-title-group">
            <span className="drawer-tag">[ SAVED RELEASES ]</span>
            <h3 className="drawer-heading">Wishlist ({wishlist.length})</h3>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-scroll-body">
          {wishlist.length === 0 ? (
            <div className="drawer-empty-view">
              <div className="empty-cart-orb">
                <Heart size={48} className="empty-heart-icon" />
              </div>
              <h4>No items saved in wishlist</h4>
              <p>Save items from the catalog to curate your personal hardware shortlist.</p>
              <button className="btn btn-primary" onClick={handleBrowse}>
                <span>Browse Catalog</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="wishlist-products-list">
              {wishlist.map((item) => (
                <div key={item.id} className="morae-wishlist-tile">
                  <img src={item.image} alt={item.name} className="wishlist-thumb" />

                  <div className="wishlist-info-col">
                    <span className="mono-code">MR-{String(item.id).padStart(2, '0')}</span>
                    <h4 className="wishlist-name">{item.name}</h4>
                    <span className="wishlist-price">${item.price.toFixed(2)}</span>

                    <div className="wishlist-actions-row">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => moveWishlistToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        className="btn-trash-outline"
                        onClick={() => removeFromWishlist(item.id)}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
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
          <div className="drawer-bottom-panel">
            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={handleMoveAll}
            >
              <ShoppingBag size={17} />
              <span>Move All to Shopping Bag</span>
            </button>
            <div className="drawer-secondary-links">
              <button className="text-link" onClick={handleBrowse}>
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
