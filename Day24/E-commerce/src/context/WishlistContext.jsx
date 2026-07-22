import React, { createContext, useContext, useState, useEffect, Children} from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children}) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('ecommerce_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlist));
        } catch (err) {
            console.error('Failed to save wishlist to localStorage:', err);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return[...prev, product]
        });
    };

    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.some(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (id) => wishlist.some(item => item.id === id);

    const wishlistCount = wishlist.length;

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            wishlistCount
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);