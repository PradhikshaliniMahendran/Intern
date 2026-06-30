import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
        <div style={StyleSheet.home}>
            <Header />
            <Hero />
            <Footer />
        </div>
    );
};

const styles = {
    home: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        
    },
};

export default Home;