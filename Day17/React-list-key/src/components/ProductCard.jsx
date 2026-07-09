import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {

    const { id, name, title, description, available, source, image,  price, discountPercentage, rating, stock, brand, category, thumbnail} = product;

    const productName = title || name || 'Product';
    const productImage = thumbnail || image || 'https://via.placeholder.com/400x300?text=No+Image';
    const isAvailable = available !== undefined ? available : (stock > 0);
    const discount = discountPercentage || 0;
    const productDescription = description || 'No description available';

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
        <div className={`product-card ${!isAvailable? 'out-of-stock-card' : ''}`}>

            <div className="card-image-wrapper">
                <img src={productImage} alt={productName} className="card-image" />

                {isAvailable ? (
                    <span className="stock-badge badge-in">✓ In Stock</span>
                ) : (
                    <span className="stock-badge badge-out">✕ Out of Stock</span>
                )}

                <span className="category-tag">{category}</span>

                {source && (
                    <span className={`source-tag ${source === 'API' ? 'api' : 'manual'}`}>
                        {source === 'API' ? '🌐' : '📁'}
                    </span>
                )}
            </div>

            <div className="card-body">
                <p className="card-brand">{brand}</p>
                <h3 className="card-name">{title}</h3>
                <p className="card-id">ID:{id}</p>

                <div className="card-rating">
                    <span className="stars">{renderStars(rating)}</span>
                    <span className="rating-value">{rating}</span>
                </div>

                <p className="card-price">{formatPrice(price)}</p>

                {discount > 0 && (
                    <span className="discount-badge">-{Math.round(discount)}% OFF</span>
                )}

                {isAvailable && stock > 0 && (
                    <p className="stock-count">{stock} units left</p>
                )}

                <p className="card-description">{productDescription.substring(0,60)}...</p>
            </div>

            <div className="card-footer">
                {isAvailable ? (
                    <button className="btn-cart">🛒 Add to Cart</button>
                ) : (
                    <button className="btn-notify">🔔 Notify Me</button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;