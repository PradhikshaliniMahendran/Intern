import React from 'react';
import './StatusMessage.css';

const SuccessMessage = ({ onDismiss }) => {
    return (
        <div className="status-box success-box">
            <div className="status-icon">✅</div>
            <div className="status-content">
                <h4>Email Sent Successfully!</h4>
                <p>Tank you for reaching out. Our support team has received your message and will respond within 24 business hours.</p>
            </div>
            {onDismiss && (
                <button className="dismiss-btn" onClick={onDismiss}>✕</button>
            )}
        </div>
    );
};

export default SuccessMessage;