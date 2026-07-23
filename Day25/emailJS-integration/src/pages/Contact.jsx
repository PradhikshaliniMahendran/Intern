import React from 'react';
import CompanyInfo from '../components/CompanyInfo';
import ContactForm from '../components/ContactForm';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-hero" id="hero">
                <span className="hero-badge">💬 24/7 Global Support</span>
                <h1 className="contact-title">Get in Touch with Our Team</h1>
                <p className="contact-subtitle">
                    Whether you need technical support, enterprise sales, or product inquiries, we're here to assist.
                </p>
            </div>

            <section id="about" className="about-section">
                <h2 className="sectio-heading">About Apptron Solutions</h2>
                <p className="about-text">
                    Apptron Solutions. is a leading enterprise technology and support services provider.
                    We specialize in cloud infrastructure, DevOps automation, and 24/7 managed IT support for
                    businesses worldwide. With over 500+ enterprise clients and a 99.9% uptime guarantee,
                    we deliver scalable, secure, and reliable solutions
                </p>
            </section>

            <section id="support" className="contact-grid">
                <CompanyInfo />
                <ContactForm />
            </section>

            <section id="faq" className="faq-section">
                <h2 className="section-heading">Frequently Asked Questions</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h4 className="faq-q">💡 How quickly will I receive a response?</h4>
                        <p className="faq-a">Our support team typically responds within 2-4 business hours during working days. For urgent issues, call our hotline directly.</p>
                    </div>
                    <div className="faq-item">
                        <h4 className="faq-q">🔒 Is my information secure?</h4>
                        <p className="faq-a">Absolutely. All form submissions are encrypted and processed through secure channels. We never share your data with third parties.</p>
                    </div>
                    <div className="faq-item">
                        <h4 className="faq-q">🌍 Do you offer international support?</h4>
                        <p className="faq-a">Yes! We provide support accross all time zones with regional teams in North America, Europe, and Asia-Pacific.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;