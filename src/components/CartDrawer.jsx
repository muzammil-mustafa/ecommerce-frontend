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
  CheckCircle2
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
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

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBrowse = () => {
    setIsCartOpen(false);
    setActiveView('shop');
  };

  const remainingForFree = Math.max(0, freeShippingThreshold - discountedSubtotal);
  const shippingPercent = Math.min(100, (discountedSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div
        className="morae-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="drawer-top-bar">
          <div className="drawer-title-group">
            <span className="drawer-tag">[ CART ARCHIVE ]</span>
            <h3 className="drawer-heading">Shopping Bag ({cartCount})</h3>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {cart.length > 0 && (
          <div className="morae-shipping-meter">
            {remainingForFree > 0 ? (
              <p className="shipping-hint">
                Add <strong>${remainingForFree.toFixed(2)}</strong> for complimentary courier dispatch.
              </p>
            ) : (
              <p className="shipping-hint shipping-unlocked">
                <CheckCircle2 size={15} />
                <span>Complimentary express courier shipping unlocked.</span>
              </p>
            )}
            <div className="meter-rail">
              <div
                className={`meter-fill ${remainingForFree === 0 ? 'full' : ''}`}
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body: Items */}
        <div className="drawer-scroll-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-view">
              <div className="empty-cart-orb">
                <ShoppingBag size={48} />
              </div>
              <h4>Your bag is currently empty</h4>
              <p>Explore the MORAE catalog to select precision audio and lifestyle hardware.</p>
              <button className="btn btn-primary" onClick={handleBrowse}>
                <span>Explore Catalog</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="cart-products-list">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor || 'def'}`} className="morae-cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-thumbnail" />

                  <div className="cart-item-col">
                    <div className="cart-item-headline">
                      <div>
                        <span className="mono-code">MR-{String(item.id).padStart(2, '0')}</span>
                        <h4 className="item-name">{item.name}</h4>
                      </div>
                      <button
                        className="item-delete-btn"
                        onClick={() => removeFromCart(item.id, item.selectedColor)}
                        title="Remove release"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <div className="item-variant-label">
                        <span
                          className="color-dot-indicator"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span>Finish variant</span>
                      </div>
                    )}

                    <div className="item-foot-row">
                      <div className="morae-qty-stepper">
                        <button
                          className="stepper-btn"
                          onClick={() => updateQuantity(item.id, -1, item.selectedColor)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="stepper-val">{item.quantity}</span>
                        <button
                          className="stepper-btn"
                          onClick={() => updateQuantity(item.id, 1, item.selectedColor)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="item-line-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-bottom-panel">
            {/* Coupon Code Form */}
            <div className="morae-coupon-wrap">
              {appliedCoupon ? (
                <div className="coupon-active-badge">
                  <div className="coupon-left-text">
                    <Tag size={13} />
                    <span>
                      VOUCHER: <strong>{appliedCoupon}</strong> ({(couponDiscountPercent * 100)}% OFF)
                    </span>
                  </div>
                  <button className="coupon-remove-link" onClick={removeCoupon}>
                    [ REMOVE ]
                  </button>
                </div>
              ) : (
                <form className="coupon-form" onSubmit={handleApply}>
                  <div className="coupon-field-group">
                    <input
                      type="text"
                      placeholder="ENTER VOUCHER (SAVE15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button type="submit" className="btn-coupon-submit">
                      APPLY
                    </button>
                  </div>
                  <div className="coupon-quick-pills">
                    <span>Try:</span>
                    <button
                      type="button"
                      className="coupon-quick-tag"
                      onClick={() => applyCoupon('SAVE15')}
                    >
                      SAVE15 (15% OFF)
                    </button>
                    <button
                      type="button"
                      className="coupon-quick-tag"
                      onClick={() => applyCoupon('WELCOME10')}
                    >
                      WELCOME10 (10% OFF)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="morae-breakdown">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="calc-row discount-text">
                  <span>Voucher Discount ({(couponDiscountPercent * 100)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="calc-row">
                <span>Courier Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="free-tag">COMPLIMENTARY</strong>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="calc-row">
                <span>Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="calc-row total-highlight">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="drawer-actions-stack">
              <button className="btn btn-primary btn-block btn-lg" onClick={handleCheckout}>
                <span>Proceed to Checkout</span>
                <ArrowRight size={17} />
              </button>

              <div className="drawer-secondary-links">
                <button className="text-link" onClick={handleBrowse}>
                  Continue Browsing
                </button>
                <button className="text-link danger-link" onClick={clearCart}>
                  Clear Bag
                </button>
              </div>
            </div>

            <div className="drawer-security-note">
              <ShieldCheck size={13} />
              <span>256-Bit Encrypted Secure Channel</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
