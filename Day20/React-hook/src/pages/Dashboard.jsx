import React from 'react';
import products from '../data/products';
import useSearch from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import './Dashboard.css';

function Dashboard() {
    const { searchTerm, setSearchTerm, filteredProducts } = useSearch(products, ['name', 'brand']);
    const validProducts = filteredProducts.filter(product => product && product.id);

    const totalProducts = products.length;
    const availableProducts = products.filter(p => p.available).length;
    const outOfStock = products.filter(p => !p.available).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity),
    0);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0,

        }).format(price);
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">Product Inventory Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your product inventory efficiently</p>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-icon">📦</span>
                    <div className="stat-info">
                        <span className="stat-number">{totalProducts}</span>
                        <span className="stat-label">Total Products</span>
                    </div>
                </div>
                <div className="stat-card green">
                    <span className="stat-icon">✅</span>
                    <div className="stat-info">
                        <span className="stat-number">{availableProducts}</span>
                        <span className="stat-label">Avilable</span>
                    </div>
                </div>
                <div className="stat-card red">
                    <span className="stat-icon">❌</span>
                    <div className="stat-info">
                        <span className="stat-number">{outOfStock}</span>
                        <span className="stat-label">Out of Stock</span>
                    </div>
                </div>
                <div className="stat-card purple">
                    <span className="stat-icon">💰</span>
                    <div className="stat-info">
                        <span className="stat-number">{formatPrice(totalValue)}</span>
                        <span className="stat-label">Total Inventory Value</span>
                    </div>
                </div>
            </div>

            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {filteredProducts.length === 0 ? (
                <div className="empty-state">No products found matching your search.</div>
            ) : (
                <div className="products-grid">
                    {validProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />

                    ))}
                    </div>
             )}
        </div>
    );
}

export default Dashboard;