import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    const removeItem = () => {
        localStorage.removeItem(key);
        setStoredValue(initialValue);
    };

    return [storedValue, setStoredValue, removeItem];
}

export default useLocalStorage;