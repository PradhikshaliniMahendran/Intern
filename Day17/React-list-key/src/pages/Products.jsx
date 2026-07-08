import React, {useState} from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Products.css';

function Products() {
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
                <span className="badge">React Lists, Keys & Conditional Rendering</span>
                <h1 className="main-title">Product Store</h1>
        

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
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            category={product.category}
                            brand={product.brand}
                            price={product.price}
                            rating={product.rating}
                            stock={product.stock}
                            available={product.available}
                            image={product.image}
                        />
                    ))}
                </main>
            )}

            <footer className="products-footer">
                <p>Apptron Solutions &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );

}

export default Products;