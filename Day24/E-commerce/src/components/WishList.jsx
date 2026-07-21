import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

function WishList() {
    const { wishlist, removeFromWishlist, toggleWishlist} = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-empty">
                <div className="empty-icon">🤍</div>
                <h2>Yow wishlist is empty</h2>
                <p>Save products you love and come back later!</p>
                <button className="btn-browse" onClick={() => navigate('/products')}>
                    Browse Products
                </button>

            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1>🤍 My Wishlist</h1> 
                <span className="wishlist-count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="wishlist-grid">
                {wishlist.map(item => (
                    <div key={item.id} className="wishlist-card">
                        <div className="wishlist-img-wrap" onClick={() => navigate(`/product/${item.id}`)}>
                            <img
                                src={item.thumbnail || item.image}
                                alt={item.title}
                                className="wishlist-img"
                            />
                        </div>
                        <div className="wishlist-card-body">
                            <p className="wishlist-category">{item.category}</p>
                            <h3 className="wishlist-title" onClick={() => navigate(`/product/${item.id}`)}>
                                {item.title}
                            </h3>
                            <p className="wishlist-price">LKR{item.price}</p>
                            <div className="wishlist-actions">
                                <button
                                    className="btn-add-cart"
                                    onClick={() => { addToCart(item, 1);}}
                                >
                                    🛒 Add to Cart
                                </button>
                                <button
                                    className="btn-remove-wish"
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishList;