import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import './Navbar.css'

function Navbar({ products = [] }) {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); 

    return (
        <nav className={`navbar ${theme}`}>
            <div className="nav-container">
                <NavLink to="/" className="nav-logo" onClick={() =>setMenuOpen(false)}>
                    🛒 <span>ShopZone</span>
                </NavLink>

                <div className="nav-search">
                    <SearchBar products={products} />
                </div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" end className="nav-link" onClick={() =>setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/products" className="nav-link" onClick={() =>setMenuOpen(false)}>Products</NavLink>
        

                <button className="icon-btn" onClick={() => { navigate('/wishlist'); setMenuOpen(false)}}>
                    🤍
                    {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
                </button>

                <button className="icon-btn cart-icon-btn" onClick={() => { navigate('/cart'); setMenuOpen(false)}}>
                    🛒
                    {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
                </button>

                <ThemeToggle />
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
            </button>
        </div>

        </nav>
    );
}

export default Navbar;