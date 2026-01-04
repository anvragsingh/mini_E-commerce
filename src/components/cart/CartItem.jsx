import React from 'react';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <div className="cart-item-price">${item.price.toFixed(2)}</div>

        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.stock)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.stock)}
            disabled={item.quantity >= item.stock}
          >
            +
          </button>

          <button
            className="remove-btn-icon"
            onClick={() => onRemove(item.id)}
            title="Remove item"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};
