import React from 'react';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';

function Home() {
    return (
        <div className="home-page">
            <About />
            <Services />
            <Contact />
        </div>
    );
}

export default Home;