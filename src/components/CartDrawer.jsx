import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    setItemQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    discountAmount,
    discountedSubtotal,
    shippingCost,
    freeShippingThreshold,
    tax,
    cartTotal,
    cartCount,
    appliedCoupon,
    couponDiscountPercent,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setActiveView
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyCoupon(promoInput);
    setPromoInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActiveView('shop');
  };

  // Free shipping calculations
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - discountedSubtotal);
  const shippingProgress = Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div
        className="drawer-panel cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <ShoppingBag size={20} />
            <h3>Your Shopping Bag</h3>
            <span className="drawer-count-badge">({cartCount})</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        {cart.length > 0 && (
          <div className="free-shipping-meter">
            {remainingForFreeShipping > 0 ? (
              <p className="shipping-text">
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Shipping!</strong>
              </p>
            ) : (
              <p className="shipping-text shipping-qualified">
                <CheckCircle2 size={16} />
                <span>You unlocked <strong>FREE Standard Shipping!</strong></span>
              </p>
            )}
            <div className="meter-track">
              <div
                className={`meter-bar ${remainingForFreeShipping === 0 ? 'completed' : ''}`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body: Cart Items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-cart-icon">
                <ShoppingBag size={56} />
              </div>
              <h4>Your bag is currently empty</h4>
              <p>Explore our premium collections and discover something tailored for you.</p>
              <button className="btn btn-primary" onClick={handleContinueShopping}>
                <span>Start Shopping</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor || 'default'}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-details">
                    <div className="cart-item-title-row">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id, item.selectedColor)}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <div className="cart-item-variant">
                        <span
                          className="color-dot-indicator"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span>Color variant</span>
                      </div>
                    )}

                    <div className="cart-item-bottom">
                      {/* Quantity Controls */}
                      <div className="cart-qty-controls">
                        <button
                          className="qty-btn-sm"
                          onClick={() => updateQuantity(item.id, -1, item.selectedColor)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn-sm"
                          onClick={() => updateQuantity(item.id, 1, item.selectedColor)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Total for this line item */}
                      <span className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer: Totals, Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Form */}
            <div className="promo-section">
              {appliedCoupon ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-left">
                    <Tag size={14} />
                    <span>
                      Coupon: <strong>{appliedCoupon}</strong> ({(couponDiscountPercent * 100)}% off)
                    </span>
                  </div>
                  <button className="remove-coupon-btn" onClick={removeCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <form className="coupon-input-form" onSubmit={handleApplyCoupon}>
                  <div className="coupon-input-wrap">
                    <Tag size={15} className="coupon-icon" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SAVE15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-sm btn-dark">
                      Apply
                    </button>
                  </div>
                  <div className="quick-coupon-hints">
                    <span>Try:</span>
                    <button
                      type="button"
                      className="coupon-tag-hint"
                      onClick={() => applyCoupon('SAVE15')}
                    >
                      SAVE15 (15% off)
                    </button>
                    <button
                      type="button"
                      className="coupon-tag-hint"
                      onClick={() => applyCoupon('WELCOME10')}
                    >
                      WELCOME10 (10% off)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="cart-breakdown-table">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="breakdown-row discount-row">
                  <span>Discount ({(couponDiscountPercent * 100)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="breakdown-row">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="free-shipping-tag">FREE</strong>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="breakdown-row">
                <span>Estimated Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="breakdown-row total-row">
                <span>Total</span>
                <span className="total-amount">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="drawer-actions-block">
              <button className="btn btn-primary btn-block btn-lg" onClick={handleCheckoutClick}>
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="drawer-sub-actions">
                <button className="btn-text-link" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
                <button className="btn-text-link btn-danger-link" onClick={clearCart}>
                  Clear Bag
                </button>
              </div>
            </div>

            <div className="secure-badge-note">
              <ShieldCheck size={14} />
              <span>Safe &amp; Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
