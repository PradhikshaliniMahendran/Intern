import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css'

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) return null;

    const {
        id, 
        title,
        brand,
        category,
        price,
        rating = 4.5,
        stock = 10,
        discountPercentage,
        thumbnail,
        images

    } = product;

    const productImage = thumbnail || (images && images [0]) || 'https://via.placeholder.com/300x300?text=No+Image';
    const isWhishlisted = isInWishlist(id);
    const inStock = stock > 0;

    const renderStars = (score) => {
        const fullStars = Math.floor(score);
        const hasHalf = score % 1 >= 0.5;
        const stars = [];

        for (let i=0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="star full">★</span>);
            } else if (i === fullStars && hasHalf) {
                stars.push(<span key={i} className="star half">★</span>);
            } else {
                stars.push(<span key={i} className="star empty">☆</span>);
            }
        }
        return stars;
    };

    const handleCardClick = () => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="card-image-container">
                <img src={productImage} alt={title} className="card-img" />

                {discountPercentage && discountPercentage > 0 && (
                    <span className="badge discount-badge">
                        {Math.round(discountPercentage)}% OFF
                    </span>
                )}

                <span className={`badge stock-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </span>

                <button
                    className={`wishlist-btn ${isWhishlisted ? 'active' : ''}`}
                    onClick={handleToggleWishlist}
                    title={isWhishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                    {isWhishlisted ? '❤️' : '🤍'}
                </button>
            </div>

            <div className="card-content">
                <div className="card-category-brand">
                    <span className="card-category">{category}</span>
                    {brand && <span className="card-brand">{brand}</span>}
                </div>

                <h3 className="card-title">{title}</h3>

                <div className="card-rating">
                    <div className="star-wrapper">{renderStars(rating)}</div>
                    <span className="rating-num">({rating})</span>
                </div>

                <div className="card-pricing">
                    <span className="current-price">LKR{price}</span>
                    {discountPercentage && (
                        <span className="original price">
                            LKR{(price / (1 - discountPercentage / 100)).toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="card-actions">
                    <button
                        className="btn-add-cart"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                    >
                        {inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;