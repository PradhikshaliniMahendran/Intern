import React from 'react';

const Header = () => {
    return (
        <header style = {styles.header}>
            <div style={styles.container}>
                <div style ={styles.logoContainer}>
                    <img src="/logo.png" alt="Company Logo" style={styles.logoImage} />
                    <h2>Apptron Solutions</h2>


                </div>
                <nav style = {styles.nav}>
                    <ul style = {styles.navList}>
                        <li><a href="#" style = {styles.navLink}>Home</a></li> 
                        <li><a href="#" style = {styles.navLink}>About</a></li>
                        <li><a href="#" style = {styles.navLink}>Services</a></li> 
                        <li><a href="#" style = {styles.navLink}>Contact</a></li> 
                    </ul>
                </nav>
            </div>
        </header>

    );
};

const styles= {
    header: {
        width: '100%',
        padding: '0',
        backgroundColor: 'rgb(250, 113, 63)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(160, 60, 0, 0.35)',
        color: 'white',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        maxWidth: '100%',
        margin: '0 auto',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logoImage: {
        width: '30px',
        height: '30px',
        backgroundColor: '#f5f5f5',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    },
    nav: {
        display: 'flex',
    },
    navList: {
        display: 'flex',
        lifeStyle: 'none',
        gap: '30px',
        margin: 0,
        padding: 0,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
};

export default Header;