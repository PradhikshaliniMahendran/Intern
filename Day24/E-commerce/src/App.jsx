import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {CartProvider} from './context/CartContext';
import { WishlistProvider} from './context/WishlistContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/WishList';
import Checkout from './components/Checkout';



function AppContent() {
  const { theme } = useTheme();
  return (
    <div className={`app-root ${theme}`}>
      <Navbar />
      <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
      </main>
    </div>
  );
}

function App() {
  return(
    <Router>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
