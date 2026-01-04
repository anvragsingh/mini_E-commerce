import React from 'react';

export const ProductCard = React.memo(({ product, onAddToCart, inCart, onOpenModal }) => {
  const inStock = product.stock > 0;

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={() => onOpenModal(product)}>
        <img src={product.thumbnail} alt={product.title} className="product-image" />
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title" onClick={() => onOpenModal(product)}>
          {product.title}
        </h3>

        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>

        <div className="product-actions">
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            disabled={!inStock || inCart}
          >
            {inCart ? 'In Cart' : inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
