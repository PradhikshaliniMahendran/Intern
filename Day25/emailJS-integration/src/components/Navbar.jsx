import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [active, setActive] =useState('support');

    const handleClick = (e, id) => {
        e.preventDefault();
        setActive(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behaviour: 'smooth', block: 'start'});
        }
    };

    const link = [
        {id: 'hero', label:'Home'},
        {id: 'about', label:'About Us'},
        {id: 'support', label:'Contact Support'},
        {id: 'faq', label:'FAQ'},
    ];

    return (
        <header className="navbar">
            <div className="nav-container">
                <div className="nav-brand" onClick={(e) => handleClick(e, 'hero')} style={{cursor: 'pointer'}}>
                    <span className="logo-icon">🏢</span>
                    <span className="brand-name">Apptron Solutions <span className="brand-sub">Support</span></span>
                </div>
                <nav className="nav-links">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`nav-link ${active === link.id ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, link.id)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;