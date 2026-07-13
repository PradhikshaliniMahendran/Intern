import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm}) {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="🔍 Search by product name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;