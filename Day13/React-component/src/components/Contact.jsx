import React from 'react';
import './Contact.css';
function Contact() {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-info-panel">
                    <span className="sub-title">Connect with Us</span>
                    <h2 className="section-title">Let's build something exceptional together</h2>
                    <p className="contact-desc">
                        Have an idea or an active project? Reach out to our specialist team. We respond to all inquiries within 24 hours. 
                    </p>
                    <div className="contact-details">
                        <div className="contact-details-item">
                            <div className="detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="detail-svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div className="detail-text">
                                <h4>Email Address</h4>
                                <p>contact@apptron.com</p>
                            </div>
                        </div>
                        <div className="contact-details-item">
                            <div className="detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="detail-svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.502-5.184-3.864-6.686-6.686l1.293-.97c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </div>
                            <div className="detail-text">
                                <h4>Phone Number</h4>
                                <p>+94 11 234 5678</p>
                            </div>
                        </div>
                        <div className="contact-details-item">
                            <div className="detail-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="detail-svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div className="detail-text">
                                <h4>Location</h4>
                                <p>Apptron Complex, Colombo, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-form-panel">
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" placeholder="john@example.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="4" placeholder="Tell us about your project..." required ></textarea>
                        </div>
                        <button type="submit" className="btn-send">Send Inquiry</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;