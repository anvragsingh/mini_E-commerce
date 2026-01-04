import React from 'react';

export const Header = ({ cartCount, onToggleCart }) => {
    return (
        <header className="header">
            <h1>Mini E-Commerce</h1>
            <button className="cart-toggle" onClick={onToggleCart}>
                <span style={{ fontSize: '1.1rem' }}>🛒</span>
                <span>Cart</span>
                <span className="cart-count-badge">{cartCount}</span>
            </button>
        </header>
    );
};
