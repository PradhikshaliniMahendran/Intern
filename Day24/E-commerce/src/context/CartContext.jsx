import React, { createContext, useContext, useState, useEffect} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children}) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('ecommerce_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
        } catch (err) {
            console.error('Failed to save cart to localStorage:', err);
        }
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                );
            }
            return [...prev, {...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQty) => {
        if (newQty <= 0) {
            removeFromCart(id);
            return;
        }
        setCart(prev =>
            prev.map(item =>
                item.id === id ? {...item, quantity: newQty } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);