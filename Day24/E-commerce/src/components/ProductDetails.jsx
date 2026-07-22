import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchProductById } from '../services/api';
import './ProductDetails.css';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="detail-loader">
                <div className="loader-spinner"></div>
                <p>Loading Product...</p>
            </div>
        );
    }

    if (error || !product) {
        return(
        <div className="detail-error">
            <span>⚠️</span>
            <h2>Product not found</h2>
            <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
        );
    }

    const {
        title, brand, category, price, rating, stock,
        description, discountPercentage, images, thumbnail
    } = product;

    const productImages = images && images.length > 0 ? images : [thumbnail];
    const isWishlisted = isInWishlist(product.id);
    const instock = stock > 0;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
    <div className="detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
           ← Back
        </button>

        <div className="detail-layout">
            <div className="detail-gallery">
                <div className="main-image-wrap">
                    <img
                        src={productImages[selectedImage]}
                        alt={title}
                        className="main-image"
                    />
                    {discountPercentage > 0 && (
                        <span className="detail-discount-badge">
                            {Math.round(discountPercentage)}% OFF
                        </span>
                    )}
                </div>
                {productImages.length > 1 && (
                    <div className="thumbnail-row">
                        {productImages.map((img,idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${title} ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="detail-info">
                <div className="detail-meta">
                    <span className="detail-category">{category}</span>
                    {brand && <span className="detail-brand">by {brand}</span>}
                </div>

                <h1 className="detail-title">{title}</h1>

                <div className="detail-rating">
                    <span className="stars">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5- Math.round(rating))}</span>
                    <span className="rating-val">{rating} / 5</span>
                    <span className={`stock-status ${instock ?  'in-stock' : 'out-stock'}`}>
                        {instock ? `✓ ${stock} in stock` : '✗ Out of stock'}
                    </span>
                </div>

                <div className="detail-price-row">
                    <span className="detail-price">LKR{price}</span>
                    {discountPercentage > 0 && (
                        <span className="detail-original-price">
                            LKR{(price / (1- discountPercentage / 100)).toFixed(2)}
                        </span>
                    )}
                </div>

                <p className="detail-description">{description}</p>

                {instock && (
                    <div className="detail-qty-row">
                        <span>Quantity:</span>
                        <div className="qty-controls">
                            <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <span className="qty-num">{quantity}</span>
                            <button className="qty-btn" onClick={() => setQuantity(q => Math.min(1, q + 1))}>+</button>
                        </div>
                    </div>

                )}

                <div className="detail-action-btns">
                    <button className="btn-add-cart" onClick={handleAddToCart} disabled={!instock}>
                        {instock ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>
                    <button
                        className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product)}
                    >
                        {isWishlisted ? '❤️ Wishlisted' : '🤍 Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    </div>
    );



}

export default ProductDetails;