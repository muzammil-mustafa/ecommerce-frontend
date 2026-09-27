import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Volume2, ShieldCheck, Compass, Sliders } from 'lucide-react';

export const AboutView = () => {
  const { setActiveView } = useShop();

  return (
    <div className="about-page-view">
      {/* Editorial Header */}
      <section className="about-hero-section">
        <div className="section-mono-tag">
          <span>[ 03 ] PHILOSOPHY &amp; CRAFT</span>
        </div>
        <h1 className="about-hero-title">
          Crafted for clarity, <span className="serif-italic-accent">not applause.</span>
        </h1>
        <p className="about-hero-lead">
          In a world full of distraction, we design for those who notice. MORAE® is about clarity, detail, and pure listening — tools for focus, not show.
        </p>
      </section>

      {/* Atmospheric Visual Strip */}
      <div className="about-visual-banner">
        <img
          src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=80"
          alt="MORAE Studio Acoustic Laboratory"
          className="about-banner-img"
        />
        <div className="about-banner-overlay">
          <div className="banner-tag">® NO OFFICE. GLOBAL REACH.</div>
          <h3 className="banner-quote">
            "In a world full of noise, silence became a choice."
          </h3>
        </div>
      </div>

      {/* The 4 Architectural Engineering Metrics */}
      <section className="about-metrics-section">
        <div className="metrics-header">
          <span className="mono-subhead">[ PERFORMANCE BENCHMARKS ]</span>
          <h2 className="metrics-title">Obsessive tuning across every millimeter</h2>
        </div>

        <div className="metrics-quad-grid">
          <div className="metric-box">
            <span className="metric-num-mono">[ 01 ]</span>
            <div className="metric-stat-highlight">40 Hours</div>
            <h4 className="metric-name">Battery Endurance</h4>
            <p className="metric-desc">
              Engineered for marathon listening sessions. Rapid charge yields 6 hours of high-fidelity playback in just 10 minutes.
            </p>
          </div>

          <div className="metric-box">
            <span className="metric-num-mono">[ 02 ]</span>
            <div className="metric-stat-highlight">32%</div>
            <h4 className="metric-name">Enhanced Noise Reduction</h4>
            <p className="metric-desc">
              Advanced proprietary ANC algorithms analyze environmental acoustic frequency waves 38,000 times per second.
            </p>
          </div>

          <div className="metric-box">
            <span className="metric-num-mono">[ 03 ]</span>
            <div className="metric-stat-highlight">0.08s</div>
            <h4 className="metric-name">Instant Response Time</h4>
            <p className="metric-desc">
              Capacitive gesture pads and optical ear sensors react instantaneously with zero perceptual lag.
            </p>
          </div>

          <div className="metric-box">
            <span className="metric-num-mono">[ 04 ]</span>
            <div className="metric-stat-highlight">+27%</div>
            <h4 className="metric-name">Acoustic Clarity</h4>
            <p className="metric-desc">
              Custom neodymium drivers tuned flat for studio honesty rather than artificial bass exaggeration.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Philosophy Breakdown */}
      <section className="philosophy-duo-section">
        <div className="philosophy-card">
          <span className="mono-pill">VISION</span>
          <h3 className="philosophy-heading">
            Eliminate distractions, <span className="serif-italic-accent">highlight essence.</span>
          </h3>
          <p>
            At MORAE, we do not follow commercial trends. We study the subtle patterns of sound and the ways people interact with tactile hardware. Every design decision is deliberate — nothing is accidental. The goal isn't to impress onlookers, but to allow clarity, calm, and focused immersion to emerge naturally.
          </p>
        </div>

        <div className="philosophy-card">
          <span className="mono-pill">HONEST CRAFT</span>
          <h3 className="philosophy-heading">
            Function first, <span className="serif-italic-accent">form second.</span>
          </h3>
          <p>
            Precision matters more than extravagance. Metals are cool to the touch; memory foams and woven composites are durable yet unassuming. Even the smallest acoustic chamber joint is considered for both resonance damping and structural longevity.
          </p>
        </div>
      </section>

      {/* CTA Box */}
      <section className="about-cta-strip">
        <div>
          <span className="mono-subhead">[ DISCOVER THE HARDWARE ]</span>
          <h2 className="cta-headline">Experience MORAE in your everyday routine.</h2>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            setActiveView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span>Shop Full Catalog</span>
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};
