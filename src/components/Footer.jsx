import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';

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
    addToast('Subscribed to MORAE studio dispatch. Check email for SAVE15 voucher.', 'success');
    setEmail('');
  };

  const handleNav = (view, category = null) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="morae-footer">
      {/* Studio Newsletter Strip */}
      <div className="footer-newsletter-section">
        <div className="newsletter-wrapper">
          <div className="newsletter-left">
            <span className="mono-subhead">[ DISPATCH ALERTS ]</span>
            <h3 className="newsletter-headline">
              First access to limited releases and <span className="serif-italic-accent">design studies.</span>
            </h3>
            <p className="newsletter-description">
              Receive notifications when new hardware batches enter production. No spam. Strictly engineering and release milestones.
            </p>
          </div>

          <form className="newsletter-morae-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="newsletter-success-tag">
                <CheckCircle2 size={16} />
                <span>SUBSCRIBED TO MORAE DISPATCH</span>
              </div>
            ) : (
              <div className="input-with-btn">
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  <span>DISPATCH</span>
                  <Send size={14} />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="footer-columns-area">
        {/* Brand Column */}
        <div className="footer-column brand-info-col">
          <div className="footer-logo" onClick={() => handleNav('home')}>
            <span className="brand-dot" />
            <span className="logo-text">MORAE<sup>®</sup></span>
          </div>
          <p className="footer-philosophy-quote">
            "Our headphones aren't for everyone. They're for those who notice the details others overlook."
          </p>
          <div className="footer-status-pill">
            <span className="live-dot" />
            <span>STUDIO SERVERS ONLINE / GLOBAL COURIER ACTIVE</span>
          </div>
        </div>

        {/* Directory Column */}
        <div className="footer-column">
          <span className="footer-col-header">[ ARCHIVE ]</span>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNav('home')}>[ 01 ] Home</button></li>
            <li><button onClick={() => handleNav('shop')}>[ 02 ] Catalog</button></li>
            <li><button onClick={() => handleNav('about')}>[ 03 ] Philosophy &amp; Craft</button></li>
            <li><button onClick={() => handleNav('contact')}>[ 04 ] Studio Contact</button></li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="footer-column">
          <span className="footer-col-header">[ DEPARTMENTS ]</span>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNav('shop', 'Audio')}>Audio &amp; Acoustics</button></li>
            <li><button onClick={() => handleNav('shop', 'Electronics')}>Hardware &amp; Devices</button></li>
            <li><button onClick={() => handleNav('shop', 'Fashion')}>Apparel &amp; Textiles</button></li>
            <li><button onClick={() => handleNav('shop', 'Home & Living')}>Living &amp; Workspace</button></li>
            <li><button onClick={() => handleNav('shop', 'Footwear')}>Performance Footwear</button></li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div className="footer-column">
          <span className="footer-col-header">[ CHANNELS &amp; TERMS ]</span>
          <div className="footer-social-tags">
            <span className="social-chip">INSTAGRAM</span>
            <span className="social-chip">YOUTUBE</span>
            <span className="social-chip">X / TWITTER</span>
            <span className="social-chip">FACEBOOK</span>
          </div>
          <div className="footer-policies-quick">
            <span>12-Month Warranty</span>
            <span>•</span>
            <span>30-Day Returns</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-legal-bar">
        <span className="legal-copy">
          &copy; 2026 MORAE<sup>®</sup> AUDIO HARDWARE. ALL RIGHTS RESERVED.
        </span>

        <div className="legal-chips">
          <span className="morae-chip">CODE: SAVE15</span>
          <span className="morae-chip">GLOBAL COURIER DISPATCH</span>
          <span className="morae-chip">ZERO LATENCY</span>
        </div>
      </div>
    </footer>
  );
};
