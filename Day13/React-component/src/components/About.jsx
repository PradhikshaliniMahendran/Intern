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
                        <h4>100% Client Satisfaction</h4>
                        <p>Industry-leading digital development agency.</p>
                    </div>
                </div>
                <div className="about-content">
                    <span className="sub-title">Who are we</span>
                    <h2 className="section-title">We engineering digital solutions for fast growing companies</h2>
                    <p className="about-description">
                        Founded with a vision automate and accelerate business growth, Apptron solutions brings together world-class software engineering, intuitive user experience design, and cloud-native solutions under one roof. We partner with visionaries to turn complex ideas into robust software products.
                    </p>
                    <button className="btn-readmore">Read More</button>
                </div>
            </div>
        </section>
    );
}

export default About;