const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?limit=100`);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json()
        return data.products;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};

export const fetchProductById = async (id) => {
    try {
     const response = await fetch(`${API_BASE_URL}/products/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        return await response.json()
       
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};