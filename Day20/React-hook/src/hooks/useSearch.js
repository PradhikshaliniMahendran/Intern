import { useState, useMemo } from 'react';

function useSearch(products, searchKeys = ['name', 'brand']) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {

            return products;
        }

        const searchLower = searchTerm.toLowerCase().trim();

        return products.filter((product) => {
            return searchKeys.some((key) => {
                const value = product[key];
                if (typeof value === 'string') {
                    return value.toLocaleLowerCase().includes(searchLower);
                }
                return false;
            });
        });
    }, [products, searchTerm, searchKeys]);

    return {
        searchTerm,
        setSearchTerm,
        filteredProducts
    };
}

export default useSearch;