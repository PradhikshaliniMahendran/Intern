import './Home.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProducts();

                const sorted = [...data].sort((a, b) => b.rating - a.rating).slice(0,8);
                setFeatured(sorted);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const categories = [
        {name: 'Electronics', emoji: '📱', color: '#6366f1'},
        {name: 'Beauty', emoji: '💄', color: '#ec4899'},
        {name: 'Furniture', emoji: '🛋️', color: '#f59e0b'},
        {name: 'Sports', emoji: '⚽', color: '#10b981'},
        {name: 'Groceries', emoji: '🛒', color: '#06b6d4'},
        {name: 'Vehicles', emoji: '🚗', color: '#f43f5e'},
    ];

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge">🔥 New Arrivals Every Week</span>
                    <h1 className="hero-title">
                        Shop <span className="hero-gradient">Everything</span>You Love
                    </h1>
                    <p className="hero-subtitle">
                        Discover Thousands of products across electronics, beauty, fashion, groceries and more. Fast shipping, great prices!
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary" onClick={() => navigate('/products')}>
                            Shop Now →
                        </button>
                        <button className="btn-primary" onClick={() => navigate('/wishlist')}>
                           🤍 Wishlist
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat"><span>100+</span><p>Products</p></div>
                        <div className="hero-stat"><span>50+</span><p>Categories</p></div>
                        <div className="hero-stat"><span>Free</span><p>Shipping</p></div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-blob"></div>
                    <span className="hero-emoji">🛍️</span>
                </div>
            </section>

            <section className="categories-section">
                <h2 className="section-title">Browse Categories</h2>
                <div className="categories-grid">
                    {categories.map(cat => (
                        <div
                            key={cat.name}
                            className="cat-card"
                            style={{'--cat-color': cat.color}}
                            onClick={() => navigate(`/products?category=${cat.name}`)}
                        >
                            <span className="cat-emoji">{cat.emoji}</span>
                            <span className="cat-name">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="featured-section">
                <div className="section-header">
                    <h2 className="section-title">⭐ Top Rated Products</h2>
                    <button className="btn-view-all" onClick={() => navigate('/products')}>View All</button>
                </div>
                {loading ? (
                    <div className="featured-loader">
                        <p>Loading Products...</p>
                    </div>
                ) : (
                    <div className="featured-grid">
                        {featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;