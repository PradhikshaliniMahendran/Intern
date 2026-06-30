import React from 'react';

const Footer = () => {
    return ( 
        <footer style={styles.footer}>
            <p>&copy; 2026 Apptron Solutions. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgb(250, 113, 63)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(160, 60, 0, 0.3)',
        color: 'white',
        position: 'relative',
        bottom: 0,
        width: '100%',
        marginTop: 'auto',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
};

export default Footer;