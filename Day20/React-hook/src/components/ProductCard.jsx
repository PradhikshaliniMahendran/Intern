import React from 'react';
import useCounter from '../hooks/useCounter';
import './ProductCard.css';

function ProductCard({ product }) {
    if (!product) {
        return <div className="product-card-error">Product data not available</div>;
    }

    const { id, name, title, available, image,  price, stock, brand, category, thumbnail} = product;

    const { count, increment, decrement, reset } = useCounter(stock || 0, 0, 50);

    const productName = name || 'Product';
    const productImage = image || 'https://via.placeholder.com/400x300?text=No+Image';
    const isAvailable = available !== undefined ? available : (stock > 0);
    


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

            </div>

            <div className="card-body">
                <p className="card-brand">{brand}</p>
                <h3 className="card-name">{title}</h3>
                <p className="card-id">ID:{id}</p>


                <p className="card-price">{formatPrice(price)}</p>


                {isAvailable && stock > 0 && (
                    <p className="stock-count">{stock} units left</p>
                )}

                <div className="counter-section">
                    <span className="quantity-label">Quantity:</span>
                    <div className="counter-controls">
                        <button className="counter-btn" onClick={decrement}>-</button>
                        <span className="counter-value">{count}</span>
                        <button className="counter-btn" onClick={increment}>+</button>
                    </div>
                    <button className="reset-btn" onClick={reset}>Reset</button>
                </div>
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