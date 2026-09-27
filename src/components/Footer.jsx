import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { setActiveView, setSelectedCategory, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed! Check your inbox for 15% off coupon.', 'success');
    setEmail('');
  };

  const handleNav = (category) => {
    setSelectedCategory(category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      {/* Newsletter Strip */}
      <div className="newsletter-banner">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <span className="newsletter-eyebrow">Stay in the Loop</span>
            <h3 className="newsletter-heading">Get 15% Off Your First Order</h3>
            <p className="newsletter-sub">
              Subscribe for exclusive drop alerts, private sales, and design stories.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={20} />
                <span>You are subscribed! Welcome to the Aura community.</span>
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  <span>Subscribe</span>
                  <Send size={15} />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-col brand-col">
          <div className="brand-logo" onClick={() => { setActiveView('home'); window.scrollTo(0,0); }}>
            <div className="logo-icon-wrapper">
              <Sparkles className="logo-sparkle" size={18} />
            </div>
            <span className="logo-text">Aura<span className="logo-accent">Store</span></span>
          </div>
          <p className="footer-brand-bio">
            Curated essentials, precision audio, and contemporary apparel designed for uncompromising daily life. Built for quality, clarity, and sustainable craftsmanship.
          </p>
          <div className="footer-trust-badge">
            <ShieldCheck size={16} />
            <span>Guaranteed Authentic &amp; Backed by 2-Year Warranty</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Shop Categories</h4>
          <ul className="footer-links">
            <li><button onClick={() => handleNav('Audio')}>Audio &amp; Sound</button></li>
            <li><button onClick={() => handleNav('Electronics')}>Electronics &amp; Gear</button></li>
            <li><button onClick={() => handleNav('Fashion')}>Apparel &amp; Fashion</button></li>
            <li><button onClick={() => handleNav('Home & Living')}>Home &amp; Living</button></li>
            <li><button onClick={() => handleNav('Footwear')}>Footwear &amp; Running</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><a href="#shipping" onClick={(e) => e.preventDefault()}>Shipping &amp; Delivery</a></li>
            <li><a href="#returns" onClick={(e) => e.preventDefault()}>30-Day Free Returns</a></li>
            <li><a href="#warranty" onClick={(e) => e.preventDefault()}>Warranty Information</a></li>
            <li><a href="#tracking" onClick={(e) => e.preventDefault()}>Track Your Order</a></li>
            <li><a href="#help" onClick={(e) => e.preventDefault()}>Help &amp; FAQ Center</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="#story" onClick={(e) => e.preventDefault()}>Our Story &amp; Studio</a></li>
            <li><a href="#sustainability" onClick={(e) => e.preventDefault()}>Sustainability Pledge</a></li>
            <li><a href="#press" onClick={(e) => e.preventDefault()}>Press &amp; Media Kit</a></li>
            <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers</a></li>
            <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy &amp; Terms</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Payment Options */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} AuraStore Inc. All rights reserved. Designed with precision.
        </p>

        <div className="payment-badges-row">
          <span className="pay-chip">VISA</span>
          <span className="pay-chip">Mastercard</span>
          <span className="pay-chip">AMEX</span>
          <span className="pay-chip">PayPal</span>
          <span className="pay-chip">Apple Pay</span>
        </div>
      </div>
    </footer>
  );
};
