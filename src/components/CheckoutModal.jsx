import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    discountedSubtotal,
    shippingCost,
    tax,
    cartTotal,
    appliedCoupon,
    placeOrder,
    setActiveView
  } = useShop();

  if (!isCheckoutOpen) return null;

  // Checkout Steps: 1: Shipping, 2: Payment, 3: Success
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form Fields
  const [shippingData, setShippingData] = useState({
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card', // 'card', 'paypal', 'cod'
    cardNumber: '4242 •••• •••• 4242',
    cardName: 'MARCUS VANCE',
    expiry: '12/28',
    cvv: '789'
  });

  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        shipping: shippingData,
        payment: {
          method: paymentData.method,
          lastFour: paymentData.method === 'card' ? '4242' : 'N/A'
        }
      });
      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep(3);
    }, 1800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmedOrder(null);
  };

  const handleOrderDone = () => {
    handleClose();
    setActiveView('shop');
  };

  return (
    <div className="modal-backdrop checkout-modal-backdrop" onClick={handleClose}>
      <div
        className="checkout-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Secure Checkout"
      >
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-brand">
            <Lock size={18} className="lock-icon" />
            <h3>Secure Checkout</h3>
          </div>

          {step < 3 && (
            <div className="checkout-step-indicator">
              <span className={`step-dot ${step === 1 ? 'active' : 'done'}`}>1. Shipping</span>
              <span className="step-separator">›</span>
              <span className={`step-dot ${step === 2 ? 'active' : ''}`}>2. Payment &amp; Review</span>
            </div>
          )}

          <button className="modal-close-btn" onClick={handleClose} aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="checkout-modal-body">
          {step === 3 && confirmedOrder ? (
            /* Step 3: Success Confirmation Screen */
            <div className="checkout-success-view">
              <div className="success-icon-wrap">
                <CheckCircle2 size={64} />
              </div>
              <h2 className="success-title">Order Confirmed!</h2>
              <p className="success-subtitle">
                Thank you for your purchase, <strong>{shippingData.firstName}</strong>. We've sent an order confirmation and tracking details to <code>{shippingData.email}</code>.
              </p>

              <div className="order-receipt-card">
                <div className="receipt-row">
                  <span>Order Reference</span>
                  <strong className="receipt-highlight">{confirmedOrder.orderId}</strong>
                </div>
                <div className="receipt-row">
                  <span>Estimated Delivery</span>
                  <strong>3 - 5 Business Days (Standard Ground)</strong>
                </div>
                <div className="receipt-row">
                  <span>Shipping Address</span>
                  <span>{shippingData.address}, {shippingData.city}, {shippingData.zipCode}</span>
                </div>
                <div className="receipt-row">
                  <span>Payment Status</span>
                  <span className="badge badge-success">Paid via {paymentData.method.toUpperCase()}</span>
                </div>
                <div className="receipt-row receipt-total">
                  <span>Total Amount Paid</span>
                  <strong>${confirmedOrder.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn btn-primary btn-lg" onClick={handleOrderDone}>
                  <span>Continue Shopping</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            /* Steps 1 & 2: Checkout Grid (Forms + Summary) */
            <div className="checkout-layout-grid">
              {/* Left Column: Forms */}
              <div className="checkout-form-column">
                {step === 1 && (
                  /* Step 1: Shipping Form */
                  <form onSubmit={handleShippingSubmit} className="checkout-step-form">
                    <h4 className="form-section-title">
                      <Truck size={18} />
                      <span>Shipping Address</span>
                    </h4>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={shippingData.firstName}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={shippingData.lastName}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={shippingData.email}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        placeholder="Street number and street name"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                      />
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={shippingData.city}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>State / Province</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={shippingData.state}
                          onChange={handleShippingChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={shippingData.zipCode}
                          onChange={handleShippingChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={shippingData.country}
                        onChange={handleShippingChange}
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Pakistan">Pakistan</option>
                      </select>
                    </div>

                    <div className="form-actions-row">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">
                        <span>Continue to Payment</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  /* Step 2: Payment Form */
                  <form onSubmit={handlePlaceOrder} className="checkout-step-form">
                    <div className="step-back-row">
                      <button
                        type="button"
                        className="btn-back-link"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft size={16} />
                        <span>Edit Shipping Details</span>
                      </button>
                    </div>

                    <h4 className="form-section-title">
                      <CreditCard size={18} />
                      <span>Payment Method</span>
                    </h4>

                    {/* Payment Method Selector */}
                    <div className="payment-options-grid">
                      <label className={`payment-option-card ${paymentData.method === 'card' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentData.method === 'card'}
                          onChange={() => setPaymentData({ ...paymentData, method: 'card' })}
                        />
                        <CreditCard size={20} />
                        <span>Credit / Debit Card</span>
                      </label>

                      <label className={`payment-option-card ${paymentData.method === 'paypal' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentData.method === 'paypal'}
                          onChange={() => setPaymentData({ ...paymentData, method: 'paypal' })}
                        />
                        <DollarSign size={20} />
                        <span>PayPal Express</span>
                      </label>

                      <label className={`payment-option-card ${paymentData.method === 'cod' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentData.method === 'cod'}
                          onChange={() => setPaymentData({ ...paymentData, method: 'cod' })}
                        />
                        <Truck size={20} />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>

                    {paymentData.method === 'card' && (
                      <div className="card-input-fields">
                        <div className="form-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            required
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            required
                            placeholder="4242 4242 4242 4242"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          />
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={paymentData.expiry}
                              onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Security Code (CVV)</label>
                            <input
                              type="password"
                              required
                              maxLength="4"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentData.method === 'paypal' && (
                      <div className="payment-note-box">
                        <p>You will be redirected to PayPal to complete your secure payment after clicking "Complete Order".</p>
                      </div>
                    )}

                    {paymentData.method === 'cod' && (
                      <div className="payment-note-box">
                        <p>Pay with cash upon physical delivery. Please have exact change ready.</p>
                      </div>
                    )}

                    <div className="form-actions-row">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span>Authorizing Payment...</span>
                        ) : (
                          <>
                            <Lock size={18} />
                            <span>Complete Order - ${cartTotal.toFixed(2)}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="security-assurances">
                      <ShieldCheck size={16} />
                      <span>256-Bit Bank Level Encryption Guarantee</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Order Summary */}
              <div className="checkout-summary-column">
                <div className="summary-card">
                  <h4 className="summary-title">Order Summary ({cart.length} items)</h4>

                  <div className="summary-items-scroll">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedColor || 'def'}`} className="summary-item-row">
                        <img src={item.image} alt={item.name} className="summary-item-img" />
                        <div className="summary-item-details">
                          <span className="summary-name">{item.name}</span>
                          <span className="summary-qty">Qty: {item.quantity}</span>
                        </div>
                        <span className="summary-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="summary-breakdown">
                    <div className="breakdown-line">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="breakdown-line discount">
                        <span>Coupon Discount ({appliedCoupon})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="breakdown-line">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <div className="breakdown-line">
                      <span>Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="breakdown-line grand-total">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
