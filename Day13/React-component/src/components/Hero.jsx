import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section id="Home" className="hero-section">
            <div className="hero-content">
                <span className="badge">Next-Gen Technology</span>
                <h1 className="heto-title">
                    Shaping the Future of <span className="gradient-text">Digital Innovation</span>
                </h1>
                <p className="hero-description">
                    At Apptron Solutions, we build cutting-edge software products, cloud architectures, and stunning design frameworks that propel business forward.
                </p>
                <div className="hero-actions">
                    <a href="#Services" className="btn-primary">Get Started</a>
                    <a href="#about" className="btn-secondary">Learn More</a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="glow-sphere"></div>
            </div>
        </section>
    );
}

export default Hero;