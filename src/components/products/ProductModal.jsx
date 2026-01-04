import React, { useEffect } from 'react';

export const ProductModal = ({ product, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!product) return null;

    const inStock = product.stock > 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', md: { flexDirection: 'row' } }}>
                        <div style={{ flex: 1, padding: '2rem', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px' }}
                            />
                        </div>
                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                            <span className="product-category" style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'block' }}>
                                {product.category}
                            </span>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
                                {product.title}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <span className="product-price" style={{ fontSize: '2rem' }}>${product.price.toFixed(2)}</span>
                                <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                                    {inStock ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.1rem' }}>
                                {product.description || "No description available for this product."}
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '12px' }}>
                                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Product Details</h4>
                                    <ul style={{ listStyle: 'none', color: 'var(--text-secondary)' }}>
                                        <li>Rating: {product.rating} / 5</li>
                                        <li>Brand: {product.brand}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
