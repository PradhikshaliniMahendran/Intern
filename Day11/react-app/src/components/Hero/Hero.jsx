import React from 'react';

const Hero = () => {
    return (
        <section style={styles.hero}>
            <div style={styles.heroContent}>
                <h1 style={styles.heading}>Welcome to Our Website</h1>
                <p style={styles.description}>
                    We build modern, fast, and interactive web applications using React.
                    Join us on this exciting journey!
                </p>
                <button style={styles.button}>Learn More</button>
            </div>
        </section>
    );
};

const styles= {
    hero: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundImage: 'url(/Background.png)',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f0f3f8',
    width: '100%',
    textAlign: 'center',
    minHeight: 'calc(100vh - 35px - 80px)',
    },
    heroContent: {
        maxWidth: '600px',
        width: '100%',
        padding: '0 20px',
    },
    heading: {
        fontSize: '48px',
        marginBottom: '20px',
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    description: {
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '30px',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto 30px auto',
    },
    button: {
        padding: '12px 30px',
        fontSize: '18px',
        backgroundColor: '#f48744',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: 'bold',
    },
};

export default Hero;
