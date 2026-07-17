import React, {useState} from 'react';
import manualProducts from '../data/products';
import './Products.css';

function Products() {
    const [products, setProducts] = useState(manualProducts);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', ...new Set(products.map((p) => p.category))];

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter((p) => p.category === activeFilter);

    const totalProducts = products.length;
    const availableCount = products.filter((p) => p.available).length;
    const outOfStockCount = products.filter((p) => !p.available).length;

    return (
        <div className="products-page">

            <header className="products-header">
                <h1 className="page-title">📦 All Products</h1>
                <p className="page-subtitle">Browse all products in your inventory</p>
                
                <div className="stats-row">
                    <div className="stat-chip">
                        <span className="stat-num">{totalProducts}</span>
                        <span className="stat-lbl">Total Products</span>
                    </div>
                    <div className="stat-chip green">
                        <span className="stat-num">{availableCount}</span>
                        <span className="stat-lbl">In Stock</span>
                    </div>
                    <div className="stat-chip red">
                        <span className="stat-num">{outOfStockCount}</span>
                        <span className="stat-lbl">Out of Stock</span>
                    </div>
                </div>
            </header>

             <div className="filter-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <div className="empty-state">No products found in this category.</div>
            ) : (

                <main className="products-grid">
                    {filteredProducts.map((product) => (
                        <productCard key={product.id} product={product} />
                    ))}
                </main>
            )}

            <footer className="products-footer">
                <p>Vimsa Tech Store &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default Products;