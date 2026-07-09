import React, {useState, useEffect} from 'react';
import ProductCard from '../components/ProductCard';
import manualProducts from '../data/products';
import { fetchProducts } from '../services/api';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [activeFilter, setActiveFilter] = useState('All');


    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiData = await fetchProducts();

                const transformedApiData = apiData.map(item => ({
                    id: item.id,
                    name: item.title,
                    category: item.category,
                    brand: item.brand,
                    price: item.price,
                    rating:item.rating,
                    stock: item.stock,
                    available: item.stock > 0,
                    image: item.thumbnail,
                    description: item.description,
                    discountPercentage: item.discountPercentage,
                    source: 'API'

                }));

                const transformedManualData = manualProducts.map(item => ({
                    ...item,
                    source: 'Manual'
                }));

                const combinedProducts = [
                    ...transformedApiData,
                    ...transformedManualData
                ];

                setProducts(combinedProducts);
                console.log(`✅ Loaded ${transformedApiData.length} APIproducts + ${transformedManualData.length} manual product = ${combinedProducts.length} total`);
            } catch (err) {
                console.warn('Api failed, using only manual data:', err);

                const manualData = manualProducts.map(item => ({
                    ...item,
                    source: 'Manual'
                }));
                setProducts(manualData);
                setError('API unavailable. Showing manual products only.');

            } finally {
                setLoading(false);
            }
        
        };

        loadProducts();
    }, []);

    const categories = ['All', ...new Set(products.map((p) => p.category))];

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter((p) => p.category === activeFilter);

    const totalProducts = products.length;
    const availableCount = products.filter((p) => p.available).length;
    const outOfStockCount = products.filter((p) => !p.available).length;


    if (loading) {
        return (
            <div className="products-page">
                <div className="loader-container">
                    <div className="loader-spinner"></div>
                    <p className="loader-text">Loading Products...</p>
                </div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="products-page">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Something went wrong</h2>
                    <p className="error-message">{error}</p>
                    <button className="retry-btn" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="products-page">

            <header className="products-header">
                <span className="badge">React Lists, Keys & Conditional Rendering</span>
                <h1 className="main-title">Product Store</h1>
                <p className="subtitle">
                    Showing {products.length} products
                    ({products.filter(p => p.source === 'API').length} from API +
                    {products.filter(p => p.source === 'Manual').length} from Manual)
                </p>

                <div className="data-source-indicator">
                    <span className="source-badge combined">
                        🌐 API + 📁 Manual Data
                    </span>
                </div>
        

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
                            product={product}
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