import React from 'react';
import './Services.css';

function Services() {
    const services = [
        {
        title: "Software Engineering",
        desc: "Custom web applications, robust enterprise systems, and automated microservices built with moodern frameworks.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
        )
        },
        {
        title: "UI/UX & Brand Design",
        desc: "Immersive user interfaces, interactive mockups, and consistent brand design systems focused on user conversion.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.37a2.121 2.121 0 113 3l-9.37 9.37a4.5 4.5 0 01-1.897 1.13L6 21l.378-3.264a4.5 4.5 0 011.13-1.897l1.022-1.022z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 10.5h.008v.008H18V10.5zm-6 6h.008v.008H12v-.008z" />
            </svg>
        )
        },
        {
        title: "Cloud & DevOps Solutions",
        desc: "Secure, auto-scalable AWS/GCP cloud architectures paired with seamless CI/CD delivery pipelines.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
        )
        },
        {
        title: "Digital Marketing & SEO",
        desc: "Data-driven advertising campaigns, SEO optimization models, and a visula growth marketing strategies.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="service-svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
        )
        }
    ];

    return (
        <section id="services" className="service-section">
            <div className="services-header">
                <span className="sub-title">Our Expertise</span>
                <h2 className="section-title">Services We Provide</h2>
                <p className="section-desc">We offer end-to-end digital solutions designed to help you launch, scale, scale, and optimize your business products.</p>
            </div>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-card">
                        <div className="service-icon-wrapper">
                            {service.icon}
                        </div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
    
}

export default Services;