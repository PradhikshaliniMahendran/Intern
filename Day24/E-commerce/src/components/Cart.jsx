import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <div className="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Browse our products and add items to your cart</p>
                <button className="btn-shop" onClick={() => navigate('/products')}>
                    Start Shoping
                </button>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>🛒 Shopping Cart</h1>
                <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="cart-layout">
                <div className="cart-items-list">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={item.thumbnail || item.image}
                                alt={item.title}
                                className="cart-item-img"
                                onClick={() => navigate(`/product/${item.id}`)}
                            />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title" onClick={() => navigate(`/product/${item.id}`)}>
                                    {item.title}
                                </h3>
                                <p className="cart-item-category">{item.category}</p>
                                <p className="cart-item-price">LKR{item.price} each</p>
                            </div>
                            <div className="cart-item-actions">
                                <div className="qty-controls">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span className="qty-num">{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p className="cart-item-subtotal">LKR{(item.price * item.quantity).toFixed(2)}</p>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>LKR{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-text">Free</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>LKR{cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="btn-checkout" onClick={() => navigate('/checkout')}>
                        Proceed to Checkout →
                    </button>
                    <button className="btn-clear" onClick={clearCart}>
                        Clear cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;