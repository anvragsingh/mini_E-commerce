import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { FilterSidebar } from './components/layout/FilterSidebar';
import { CartSidebar } from './components/cart/CartSidebar';
import { ProductGrid } from './components/products/ProductGrid';
import { ProductModal } from './components/products/ProductModal';
import { Toast } from './components/ui/Toast';
import { useCart } from './hooks/useCart';
import { useDebounce } from './hooks/useDebounce';
import './styles/App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('');


  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast(`Added ${product.title} to cart`);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    addToast('Item removed from cart', 'error');
  };

  const handleCheckout = () => {
    addToast('Checkout feature coming soon!');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [dummyResponse, fakeStoreResponse] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=20'),
          fetch('https://fakestoreapi.com/products')
        ]);

        const dummyData = await dummyResponse.json();
        const fakeStoreData = await fakeStoreResponse.json();

        const normalizeDummy = dummyData.products;
        const normalizeFakeStore = fakeStoreData.map(product => ({
          ...product,
          id: product.id + 100,
          thumbnail: product.image,
          stock: 50,
          discountPercentage: 0,
          rating: product.rating.rate
        }));

        setProducts([...normalizeDummy, ...normalizeFakeStore]);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (debouncedSearch) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, debouncedSearch, selectedCategory, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortOrder('');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || sortOrder;

  return (
    <div className="app">
      <Header cartCount={cartCount} onToggleCart={() => setShowCart(!showCart)} />

      <div className="container">
        <aside className={`sidebar ${showCart ? 'show-cart' : ''}`}>
          <FilterSidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            categories={categories}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            showCart={showCart}
            onCloseCart={() => setShowCart(false)}
          />

          <CartSidebar
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
            showCart={showCart}
          />
        </aside>

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          error={error}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenModal={setSelectedProduct}
        />
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
