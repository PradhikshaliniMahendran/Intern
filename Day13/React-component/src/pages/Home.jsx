import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;