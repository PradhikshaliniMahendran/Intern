import React from 'react';
import products from '../data/products';
import './Reports.css';

function Reports() {
    const totalProducts = products.length;
    const availableProducts = products.filter(p => p.available).length;
    const outOfStock = products.filter(p => !p.available).length;

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="reports-page">
            <h1 className="page-title">Reports</h1>
                
            <div className="stats-row">
                <div className="stat-box">
                    <span className="stat-num">{totalProducts}</span>
                    <span className="stat-lbl">Total Products</span>
                </div>
                <div className="stat-box green">
                    <span className="stat-num">{availableProducts}</span>
                    <span className="stat-lbl">In Stock</span>
                </div>
                <div className="stat-box red">
                    <span className="stat-num">{outOfStock}</span>
                    <span className="stat-lbl">Out of Stock</span>
                </div>
            </div>

            <div className="category-box">
                <h3>Categories</h3>
                {categories.map(cat => (
                    <div key={cat} className="cat-row">
                        <span>{cat}</span>
                        <span>{products.filter(p => p.category === cat).length}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reports;