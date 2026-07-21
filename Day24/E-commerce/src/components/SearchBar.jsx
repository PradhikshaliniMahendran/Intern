import React, { useState, useEffect, useRef } from 'react';
import { useNvigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ products = [], onSearch }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions ] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.trim().length > 1 && products.length > 0) {
            const matches = products.filter(p =>
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                (p.brand && p.brand.toLowerCase().includes(query.toLowerCase())) ||
                (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 6);
            setSuggestions(matches);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }

        if (onSearch) {
            onSearch(query);
        }
    }, [query, products]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
        document.addEventListener
    }, []);

    const handleSelectProduct = (id) => {
        setQuery('');
        setIsOpen(false);
        navigate(`/product/${id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(false);
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="search-bar-wrapper" ref={wrapperRef}>
            <form onSubmit={handleSubmit} className="search-bar-form">
                <span className="search-icon">🔍</span>
                <input 
                    type="text"
                    className="search-input"
                    placeholder="Search electronics, beauty, fashion..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length > 1 && setIsOpen(true)}
                />
                {query && (
                    <button
                        type="button"
                        className="search-clear-btn"
                        onClick={() => { setQuery(''); setIsOpen(false);}}
                    >
                        ✕
                    </button>
                )}
            </form>

            {isOpen && suggestions.length > 0 && (
                <div className="search-suggestions-dropdown">
                    <div className="suggetion-header">Search SUggestions ({suggestions.length})</div>
                    {suggestions.map(item => (
                        <div
                            key={item.id}
                            className="suggestion-item"
                            onClick={() => handleSelectProduct(item.id)}
                        >
                            <img
                                src={item.thumbnail || item.image}
                                alt={item.title}
                                className="suggestion-img"
                            />
                            <div className="suggestion-info">
                                <span className="suggestion-title">{item.title}</span>
                                <div className="suggestion-meta">
                                    <span className="suggestion-category">{item.category}</span>
                                    <span className="suggestion-price">LKR{item.price}</span>
                                </div>
                            </div>
                        </div>
                                
                    ))}
                </div>

            )}
        </div>
    );
}

export default SearchBar;