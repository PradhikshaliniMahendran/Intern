import React from 'react';
import './CompanyInfo.css';

const CompanyInfo = () => {
    return (
        <div className="company-info-card">
            <div className="company-header">
                <div className="logo badge">
                    <span className="logo-emoji">⚡</span>
                </div>
                <div>
                    <h2 className="company-name">Apptron Solutions</h2>
                    <p className="company-tagline">Enterprise Support & Tech Services</p>
                </div>
            </div>

            <p className="company-desc">
                Have questions or need assistance? Reach out to out dedicated support team. We're here help to your business scale effortlessly.
            </p>

            <div className="info-list">
                <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div className="info-details">
                        <span className="info-label">Address</span>
                        <span className="info-val">100 Tech Par Boulevard, Suite 400<br />Silicone Tower, CA 94025</span>
                    </div>
                </div>

                 <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-details">
                        <span className="info-label">Phone Number</span>
                        <span className="info-val">+94 123 456 789 / +94 987 654 321</span>
                    </div>
                </div>

                 <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div className="info-details">
                        <span className="info-label">Email Support</span>
                        <span className="info-val">support@apptronsolutions.com</span>
                    </div>
                </div>

                 <div className="info-item">
                    <div className="info-icon">🕒</div>
                    <div className="info-details">
                        <span className="info-label">Business Hours</span>
                        <span className="info-val">Mon - Fri: 8.00 AM - 7:00 PM EST<br />Sat - Sun: Closed (Emergency On-Call)</span>
                    </div>
                </div>
            </div>

            <div className="social-links">
                <span className="social-title">Follow Us</span>
                <div className="social-icons">
                    <span className="social-chip">🌐 Website</span>
                    <span className="social-chip">💼 LinkedIn</span>
                    <span className="social-chip">🐦 Twitter</span>
                </div>
            </div>
        </div>

        
    );
};

export default CompanyInfo;