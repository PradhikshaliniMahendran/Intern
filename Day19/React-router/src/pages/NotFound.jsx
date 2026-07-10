import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <div className="not-found-icon">🔍</div>
                    <h2 className="not-found-subtitle">Page Not Found</h2>
                    <p className="not-found-text">
                        Oops! The page you are looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/" className="btn-home">
                       🏠 Go Back Home 
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default NotFound;