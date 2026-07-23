import React from 'react';
import './StatusMessage.css';

const ErrorMessage = ({ message, onDismiss}) => {
    return (
        <div className="status-box error-box">
            <div className="status-icon">❌</div>
            <div className="status-content">
                <h4>Failed to send Email</h4>
                <p>{message || 'Please check your connection and try again.'}</p>
            </div>
            {onDismiss && (
                <button className="dicmiss-btn" onClick={onDismiss}>✕</button>
            )}
        </div>
    );
};

export default ErrorMessage;