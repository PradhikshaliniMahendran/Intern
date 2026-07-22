import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        clearCart();
        alert('✅ Oreder placed successfully! Thank you for shopping with us.');
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <span>🛒</span>
                <h2>Nothing to checkout</h2>
                <button onClick={() => navigate('/products')}>Browse Products</button>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1>📦 Checkout</h1>

            <div className="checkout-layout">
                <div className="checkout-form-card">
                    <h2>Shipping Details</h2>
                    <form className="checkout-form" onSubmit={(e) => {e.preventDefault(); handlePlaceOrder();}}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" placeholder="John" required />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" placeholder="Doe" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" placeholder="123 Main Street" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" placeholder="Colombo" required />
                                </div>
                                    <div className="form-group">
                                    <label>Postal Code</label>
                                    <input type="text" placeholder="00100" required />
                                    </div>
                                </div>
                            </div>
                            <h2 style={{marginTop: '28px'}}>Payment Info</h2>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" placeholder="1234 5678 9012 3456" required  maxLength={19}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" required />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input type="text" placeholder="123" required maxLength={3} />
                                </div>
                            </div>
                            <button type="submit" className="btn-place-order">
                                Place Order — LKR{cartTotal.toFixed(2)}
                            </button>
                    </form>
                </div>

                <div className="checkout-summary-card">
                    <h2>Order Review</h2>
                    {cart.map(item => (
                        <div key={item.id} className="co-item">
                            <img src={item.thumbnail || item.image} alt={item.title} className="co-img" />
                            <div className="co-details">
                                <p className="co-title">{item.title}</p>
                                <p className="co-qty">{item.quantity}</p>
                            </div>
                            <p className="co-price">LKR{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="co-total">
                        <span>Total</span>
                        <span>LKR{cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Checkout;