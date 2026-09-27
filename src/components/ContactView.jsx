import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactView = () => {
  const { addToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Product Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    addToast('Enquiry received. Our studio team will reply shortly.', 'success');
  };

  return (
    <div className="contact-page-view">
      <div className="section-mono-tag">
        <span>[ 04 ] COMMUNICATIONS</span>
      </div>

      <div className="contact-layout-grid">
        {/* Left Column: Direct Info */}
        <div className="contact-info-col">
          <h1 className="contact-hero-title">
            Have a question or <span className="serif-italic-accent">a request?</span>
          </h1>

          <p className="contact-lead-text">
            If you need to reach us, use the form. We reply when there’s something to say — simple, direct, and honest.
          </p>

          <div className="contact-coords-matrix">
            <div className="coord-row">
              <span className="coord-label">[ GENERAL ENQUIRIES ]</span>
              <a href="mailto:support@morae.com" className="coord-val">
                support@morae.com
              </a>
            </div>

            <div className="coord-row">
              <span className="coord-label">[ DIRECT TELEPHONE ]</span>
              <span className="coord-val">+1 (555) 019-4820</span>
            </div>

            <div className="coord-row">
              <span className="coord-label">[ STUDIO HOURS ]</span>
              <span className="coord-val">Mon — Fri / 09:00 — 18:00 UTC</span>
            </div>

            <div className="coord-row">
              <span className="coord-label">[ CHANNELS ]</span>
              <div className="coord-social-tags">
                <span className="social-pill">INSTAGRAM</span>
                <span className="social-pill">YOUTUBE</span>
                <span className="social-pill">X (TWITTER)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Message Dispatched</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your communication has been routed to our team. Expect an update at <code>{formData.email}</code>.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Product Enquiry', message: '' });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="morae-contact-form">
                <div className="form-group">
                  <label>[ YOUR NAME ]</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>[ EMAIL ADDRESS ]</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus.vance@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>[ TOPIC ]</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="Product Enquiry">Product Technical Specifications</option>
                    <option value="Order Tracking">Order &amp; Shipping Status</option>
                    <option value="Warranty Claim">12-Month Limited Warranty</option>
                    <option value="Press / Studio">Press &amp; Design Collaborations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>[ MESSAGE ]</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your enquiry with as much detail as possible..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  <span>Transmit Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
