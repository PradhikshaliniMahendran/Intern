import React from 'react';
import './About.css';
import tech from '../assets/tech.png';

function About() {
    return (
        <section id="about" className='about-section'>
            <div className="about-container">
                <div className="about-image-wrapper">
                    <img
                      src={tech}
                      alt="Apptron Solutions Team Working"
                      className="about-image"
                    />
                    <div className="image-overlay-card">
                        <h4>⭐ 4.9/5 Customer Rating</h4>
                        <p>Trusted by 10,000+ tech enthusiasts worldwide.</p>
                    </div>
                </div>
                <div className="about-content">
                    <span className="sub-title">About Our Store</span>
                    <h2 className="section-title">Your onr-stop shop for premium tech products</h2>
                    <p className="about-description">
                        Vimsa Tech Store is a leading online retailer of cutting-edge technology products.

                        From hogh-performance laptops and smartphones to smart home devices and gaing accessories,

                        we curate only the best products from top brands worldwide. Our mission is to make

                        technology accessible, affortable, and reliable for everyone.
                    </p>

                    <div className="about-stats">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Products</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Brands</span>
                        </div>
                    </div>
                    <button className="btn-readmore">Shop Now</button>
                </div>
            </div>
        </section>
    );
}

export default About;