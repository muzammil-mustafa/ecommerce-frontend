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
  DollarSign
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingCost,
    tax,
    cartTotal,
    appliedCoupon,
    placeOrder,
    setActiveView
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const [shipping, setShipping] = useState({
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 019-4820',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'United States'
  });

  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardName: 'MARCUS VANCE',
    expiry: '12/28',
    cvv: '789'
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        shipping,
        payment: {
          method: payment.method,
          lastFour: payment.method === 'card' ? '4242' : 'N/A'
        }
      });
      setConfirmed(order);
      setProcessing(false);
      setStep(3);
    }, 1800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setConfirmed(null);
  };

  const handleCompleteDone = () => {
    handleClose();
    setActiveView('shop');
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className="morae-checkout-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Secure Checkout"
      >
        {/* Header */}
        <div className="checkout-top-header">
          <div className="checkout-brand-title">
            <Lock size={16} className="lock-accent" />
            <span className="mono-title">MORAE® / SECURE ORDER DISPATCH</span>
          </div>

          {step < 3 && (
            <div className="checkout-steps-tracker">
              <span className={`step-tag ${step === 1 ? 'active' : 'done'}`}>[ 01 SHIPPING ]</span>
              <span className="step-div">›</span>
              <span className={`step-tag ${step === 2 ? 'active' : ''}`}>[ 02 PAYMENT ]</span>
            </div>
          )}

          <button className="morae-modal-close" onClick={handleClose} aria-label="Close checkout">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="checkout-dialog-body">
          {step === 3 && confirmed ? (
            /* Step 3: Success Screen */
            <div className="checkout-receipt-view">
              <div className="receipt-orb">
                <CheckCircle2 size={54} />
              </div>
              <h2 className="receipt-title">ORDER DISPATCH CONFIRMED</h2>
              <p className="receipt-lead">
                Thank you, <strong>{shipping.firstName}</strong>. Your order has entered our fulfillment queue. An automated tracking receipt has been dispatched to <code>{shipping.email}</code>.
              </p>

              <div className="receipt-data-card">
                <div className="data-row">
                  <span className="data-label">[ ORDER REFERENCE ]</span>
                  <strong className="data-ref">{confirmed.orderId}</strong>
                </div>
                <div className="data-row">
                  <span className="data-label">[ ESTIMATED COURIER ARRIVAL ]</span>
                  <span>3 – 5 Business Days (Tracked Air)</span>
                </div>
                <div className="data-row">
                  <span className="data-label">[ DESTINATION ]</span>
                  <span>{shipping.address}, {shipping.city}, {shipping.zipCode}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">[ SETTLEMENT ]</span>
                  <span className="receipt-badge">PAID VIA {payment.method.toUpperCase()}</span>
                </div>
                <div className="data-row receipt-grand-line">
                  <span className="data-label">[ TOTAL SETTLED ]</span>
                  <strong>${confirmed.total.toFixed(2)}</strong>
                </div>
              </div>

              <button className="btn btn-primary btn-lg" onClick={handleCompleteDone}>
                <span>Return to Catalog</span>
                <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            /* Steps 1 & 2 */
            <div className="checkout-two-col-grid">
              {/* Form Col */}
              <div className="checkout-form-pane">
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit} className="checkout-form">
                    <span className="mono-subhead">[ SHIPPING RECIPIENT &amp; ADDRESS ]</span>

                    <div className="grid-2-cols">
                      <div className="form-group">
                        <label>[ FIRST NAME ]</label>
                        <input
                          type="text"
                          required
                          value={shipping.firstName}
                          onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>[ LAST NAME ]</label>
                        <input
                          type="text"
                          required
                          value={shipping.lastName}
                          onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid-2-cols">
                      <div className="form-group">
                        <label>[ EMAIL ADDRESS ]</label>
                        <input
                          type="email"
                          required
                          value={shipping.email}
                          onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>[ TELEPHONE ]</label>
                        <input
                          type="tel"
                          required
                          value={shipping.phone}
                          onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>[ STREET ADDRESS ]</label>
                      <input
                        type="text"
                        required
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      />
                    </div>

                    <div className="grid-3-cols">
                      <div className="form-group">
                        <label>[ CITY ]</label>
                        <input
                          type="text"
                          required
                          value={shipping.city}
                          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>[ STATE / PROV ]</label>
                        <input
                          type="text"
                          required
                          value={shipping.state}
                          onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>[ POSTAL CODE ]</label>
                        <input
                          type="text"
                          required
                          value={shipping.zipCode}
                          onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>[ REGION / COUNTRY ]</label>
                      <select
                        value={shipping.country}
                        onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                        <option value="Pakistan">Pakistan</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                      <span>Continue to Payment</span>
                      <ArrowRight size={17} />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handlePlaceOrder} className="checkout-form">
                    <button
                      type="button"
                      className="back-step-btn"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={15} />
                      <span>Back to Shipping</span>
                    </button>

                    <span className="mono-subhead">[ SETTLEMENT METHOD ]</span>

                    <div className="payment-type-cards">
                      <label className={`morae-pay-card ${payment.method === 'card' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payMethod"
                          value="card"
                          checked={payment.method === 'card'}
                          onChange={() => setPayment({ ...payment, method: 'card' })}
                        />
                        <CreditCard size={18} />
                        <span>Credit / Debit Card</span>
                      </label>

                      <label className={`morae-pay-card ${payment.method === 'paypal' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payMethod"
                          value="paypal"
                          checked={payment.method === 'paypal'}
                          onChange={() => setPayment({ ...payment, method: 'paypal' })}
                        />
                        <DollarSign size={18} />
                        <span>PayPal Express</span>
                      </label>

                      <label className={`morae-pay-card ${payment.method === 'cod' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="payMethod"
                          value="cod"
                          checked={payment.method === 'cod'}
                          onChange={() => setPayment({ ...payment, method: 'cod' })}
                        />
                        <Truck size={18} />
                        <span>Cash On Physical Delivery</span>
                      </label>
                    </div>

                    {payment.method === 'card' && (
                      <div className="card-input-box">
                        <div className="form-group">
                          <label>[ CARDHOLDER NAME ]</label>
                          <input
                            type="text"
                            required
                            value={payment.cardName}
                            onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label>[ CARD NUMBER ]</label>
                          <input
                            type="text"
                            required
                            placeholder="4242 4242 4242 4242"
                            value={payment.cardNumber}
                            onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                          />
                        </div>

                        <div className="grid-2-cols">
                          <div className="form-group">
                            <label>[ EXPIRY (MM/YY) ]</label>
                            <input
                              type="text"
                              required
                              placeholder="12/28"
                              value={payment.expiry}
                              onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>[ CVV SECURITY CODE ]</label>
                            <input
                              type="password"
                              required
                              maxLength="4"
                              placeholder="789"
                              value={payment.cvv}
                              onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                      disabled={processing}
                    >
                      {processing ? (
                        <span>AUTHORIZING PAYMENT...</span>
                      ) : (
                        <>
                          <Lock size={16} />
                          <span>AUTHORIZE &amp; PLACE ORDER — ${cartTotal.toFixed(2)}</span>
                        </>
                      )}
                    </button>

                    <div className="security-guarantee-note">
                      <ShieldCheck size={14} />
                      <span>256-Bit Financial Encryption Active</span>
                    </div>
                  </form>
                )}
              </div>

              {/* Order Summary Pane */}
              <div className="checkout-summary-pane">
                <div className="summary-inner-box">
                  <span className="mono-subhead">[ ORDER OVERVIEW ({cart.length}) ]</span>

                  <div className="summary-items-list">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedColor || 'def'}`} className="summary-row-item">
                        <img src={item.image} alt={item.name} className="summary-img" />
                        <div className="summary-item-text">
                          <span className="s-name">{item.name}</span>
                          <span className="s-qty">QTY: {item.quantity}</span>
                        </div>
                        <span className="s-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="summary-calc-rows">
                    <div className="calc-line">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="calc-line discount">
                        <span>Voucher ({appliedCoupon})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="calc-line">
                      <span>Courier Dispatch</span>
                      <span>{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <div className="calc-line">
                      <span>Sales Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="calc-line grand-total-line">
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
