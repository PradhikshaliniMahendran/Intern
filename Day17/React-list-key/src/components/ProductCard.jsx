import React from 'react';
import './ProductCard.css';

function ProductCard({id, name, category, brand, price, rating, stock, available, image}) {

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '★';
        if (hasHalf) stars += '½';
        return stars;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className={`product-card ${!available ? 'out-of-stock-card' : ''}`}>

            <div className="card-image-wrapper">
                <img src={image} alt={name} className="card-image" />

                {available ? (
                    <span className="stock-badge badge-in">✓ In Stock</span>
                ) : (
                    <span className="stock-badge badge-out">✕ Out of Stock</span>
                )}

                <span className="category-tag">{category}</span>
            </div>

            <div className="card-body">
                <p className="card-brand">{brand}</p>
                <h3 className="card-name">{name}</h3>
                <p className="card-id">{id}</p>

                <div className="card-rating">
                    <span className="stars">{renderStars(rating)}</span>
                    <span className="rating-value">{rating}</span>
                </div>

                <p className="card-price">{formatPrice(price)}</p>

                {available && (
                    <p className="stock-count">{stock} units left</p>
                )}
            </div>

            <div className="card-footer">
                {available ? (
                    <button className="btn-cart">🛒 Add to Cart</button>
                ) : (
                    <button className="btn-notify">🔔 Notify Me</button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;