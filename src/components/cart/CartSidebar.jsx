import React from 'react';
import { CartItem } from './CartItem';
import { EmptyState } from '../ui/EmptyState';

export const CartSidebar = ({
    cart,
    cartCount,
    cartTotal,
    onUpdateQuantity,
    onRemoveFromCart,
    onCheckout,
    showCart
}) => {
    return (
        <div className="cart-sidebar">
            <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Shopping Cart
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
                    {cartCount} items
                </span>
            </h2>
            {cart.length === 0 ? (
                <EmptyState message="Your cart is empty" />
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemoveFromCart}
                            />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="cart-total-row">
                            <span className="total-label">Subtotal</span>
                            <span className="total-amount">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={onCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
