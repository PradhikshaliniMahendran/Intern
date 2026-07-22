import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { fetchProducts } from '../services/api';
import './ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    let filtered = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (searchQuery.trim()) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader-spinner"></div>
                <p>Loading products...</p>
            </div>

        );
    }

    if (error) {
        return (
            <div className="error-container">
                <span>⚠️</span>
                <h2>Failed to load products</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="product-list-page">
            <div className="pl-header">
                <h1>🛍️ All Products</h1>
                <p>{filtered.length} products found</p>
            </div>

            <div className="pl-controls">
                <div className="pl-search">
                    <SearchBar products={products} onSearch={setSearchQuery} />
                </div>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="default">Sort: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Best Rating</option>
                </select>
            </div>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="no-results">
                    <span>🔍</span>
                    <p>No products found. Try a different search or category.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>


    );
}

export default ProductList;