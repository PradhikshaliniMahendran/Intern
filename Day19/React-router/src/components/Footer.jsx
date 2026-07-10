import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Vimsa</h3>
                    <p>Innovation tech solutions for the modern world.</p>
                    <div className="social-links">
                        <a href="#" className="social-icon">📱</a>
                        <a href="#" className="social-icon">🐦</a>
                        <a href="#" className="social-icon">📷</a>
                        <a href="#" className="social-icon">💼</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Products</h4>
                    <ul>
                        <li><Link to="/products">Software</Link></li>
                        <li><Link to="/products">Hardware</Link></li>
                        <li><Link to="/products">Cloud Solutions</Link></li>
                        <li><Link to="/products">AI & ML</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>📧 info@vimsa.com</p>
                    <p>📞 +94 71 234 5678</p>
                    <p>📍 Colombo, Sri Lanka</p>
                    <p>🕐 Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
            </div>

                <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Vimsa Tech. All Rights Reserved.</p>
            </div>
        </footer>

    );
}

export default Footer;