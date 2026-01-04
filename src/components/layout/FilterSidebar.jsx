import React from 'react';

export const FilterSidebar = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    sortOrder,
    onSortChange,
    categories,
    hasActiveFilters,
    onClearFilters,
    showCart,
    onCloseCart
}) => {
    return (
        <div className="filters">
            <h2>Filters</h2>

            <div className="filter-group">
                <label>Search</label>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <label>Category</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Sort by Price</label>
                <select
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="">None</option>
                    <option value="low-high">Low to High</option>
                    <option value="high-low">High to Low</option>
                </select>
            </div>

            {hasActiveFilters && (
                <button className="clear-filters-btn" onClick={onClearFilters}>
                    Clear All Filters
                </button>
            )}


            {showCart && (
                <button
                    className="clear-filters-btn"
                    style={{ marginTop: '1rem', background: '#e2e8f0', color: '#333', borderColor: '#cbd5e1' }}
                    onClick={onCloseCart}
                >
                    Close Cart
                </button>
            )}
        </div>
    );
};
