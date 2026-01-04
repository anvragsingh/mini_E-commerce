import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../ui/EmptyState';

export const ProductGrid = ({
    products,
    loading,
    error,
    cart,
    onAddToCart,
    onOpenModal
}) => {
    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <main className="main-content">
            <div className="results-header">
                <h2>Products ({products.length})</h2>
            </div>

            {products.length === 0 ? (
                <EmptyState message="No products found matching your filters" />
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            inCart={cart.some(item => item.id === product.id)}
                            onOpenModal={onOpenModal}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};
