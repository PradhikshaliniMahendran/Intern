const PRODUCTS = [
    {
        id: "prod-1",
        title: "NeoWve Wireless Headphones",
        category: "audio",
        price: 4599.00,
        rating:4.5,
        image:"images/headphone.jpg",
        description: "Experience studio-grade active noise cancelling, plush memory foam earcups, and up to 40 hours of high-fidelity wireless audio playback."
    },
    {
        id: "prod-2",
        title: "Chronos Active Smartwatch",
        category: "wearables",
        price: 9999.00,
        rating:4.9,
        image:"images/watch.jpg",
        description: "Track your health with an advanced biosensor, high-resolution AMOLED display, customized workout modes, and a 14-day battery life."
    },
    {
        id: "prod-3",
        title: "AeroType Mechanical Keyboard",
        category: "accessories",
        price: 7850.00,
        rating:4.1,
        image:"images/keyboard.jpg",
        description: "Premium hot-swappable mechanical switches, double-shot PBT keycaps, fully customizable RGB backlighting, and solid aluminium casing."
    },
    {
        id: "prod-4",
        title: "Pulse360 portable Speaker",
        category: "audio",
        price: 12700.00,
        rating:4.0,
        image:"images/speaker.jpg",
        description: "Rugged waterproof fabric mesh body, deep passive bass radiators, 360-degree room-filling sound, and an interactive glowing neon RGB light ring."
    }
];

let cart = JSON.parse(localStorage.getItem("minisocart-cart")) || [];

let currentCategoryFilter = "all";
let currentSearchQuery = "";
let currentSortOption= "featured";

const productGrid = document.getElementById("product-grid");
const noProductsView = document.getElementById("no-products-view");
const searchInput = document.getElementById("search-input");
const categoryFilters = document.getElementById("category-filters");
const sortSelect = document.getElementById("sort-select");
const resetSearchBtn = document.getElementById("reset-search-btn");

const cartTrigger = document.getElementById("cart-trigger");
const cartBadge = document.getElementById("cart-badge");
const cartTotalNav = document.getElementById("cart-total-nav");
const cartDrawer = document.getElementById("cart-drawer");
const cartBackdrop = document.getElementById("cart-backdrop");
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartDrawerCount = document.getElementById("cart-drawer-count");
const cartSubTotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

const toastContainer = document.getElementById("toast-container");

function saveCartState() {
    localStorage.setItem("miniso_cart",JSON.stringify(cart));
}

function showToast(message, type = 'success') {
    const toast = document.createElement("div");
    toast.className = `toast-enter flex items-center gap-3 p-4 rounded-xl shadow-xl border bg-gray-900 pointer-events-auto max-w-sm w-full`;


    let borderClass = 'border-indigo-500/30';
    let iconHtml = '<i data-lucide = "check-circle" class= "h-5 w-5 text-indigo-400 flex-shrink-0"></i>';


    if (type === 'error') {
        borderClass = 'border-red-500/30';
        iconHtml = '<i data-lucid= "x-circle" class= "h-5 w-5 text-red-400 flex-shrink-0"></i>';
    } else if (type === 'info') {
        borderClass = 'border-blue-500/30';
        iconHtml = '<i data-lucid= "info" class= "h-5 w-5 text-blue-400 flex-shrink-0"></i>';
    }

    toast.classList.add(borderClass);
    toast.innerHTML = `
    ${iconHtml}
    <div class= "flex-grow text-sm font-medium text-gray-200>${message}</div>
    <button class="text-gray-500 hover:text-white transition-colors" onClick="this.parentElement.remove()">
        <i data-lucide="x" class="h-4 w-4"></i>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout (() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10x) scale(0.95)';
        toast.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function buildRatingStars(rating) {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4;

    for (let i = 1; 1 < 5; i++) {
        if (i <= fullStars) {
            starsHtml += '<i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
           starsHtml += '<i data-lucide="star-half" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>'; 
        } else {
            starsHtml += '<i data-lucide="star" class="h-3.5 w-3.5 text-gray-600"></i>';
        }
    }
    return starsHtml;
}

function renderProducts() {
    productGrid.innerHTML = "";

    let filteredProducts = PRODUCTS.filter(product => {
        if (currentCategoryFilter === "all") return true;
        return product.category.toLowerCase() === currentCategoryFilter.toLocaleLowerCase();
    });

    if (currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.toLocaleLowerCase().trim();
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLocaleLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLocaleLowerCase().includes(query)
        );
    }

    if (currentSortOption === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSortOption === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSortOption === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    if (filteredProducts.length === 0) {
        productGrid.classList.add("hidden");
        noProductsView.classList.remove("hidden");
        noProductsView.classList.add("flex");
        return;
    } else {
        productGrid.classList.remove("hidden");
        noProductsView.classList.remove("flex");
        noProductsView.classList.add("hidden");
    }

    filteredProducts.forEach(product => {
        const isAdded = cart.some(item.productId === product.id);
        const cartQty = isAdded ? cart.find(item => item.productId === product.id).quantity : 0;

        const card = document.createElement("div");
        card.className = "glass-card rounded-2xl overflow-hidden p-4 flex flex-col justify-between group";
        card.innerHTML = `
            <div class = "relative rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/40 aspect-[4/3] flex items-center justify-center p-4"
                <img src = "${productimage}" alt="${product.title}" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'" class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300">
                <span class="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-indigo-300 border border-indigo-900/60 uppercase">
                    ${product.category}
                </span>
            </div>

            <div class="mt-4 flex-grow flex flex-col justify-between">
                <div class="space-y-2">
                    <!-- Rating stars -->
                    <div class="flex items-center gap-1.5 text-amber-400">
                        <div class="flex items-center">
                            ${buildRatingStars(product.rating)}
                        </div>
                        <span class="text-xs text-gray-500 font-semibold">${product.rating.toFixed(1)}</span>
                    </div>

                    <h3 class="text-basr font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        ${product.title}
                    </h3>

                    <p class="text-xs text-gray-400 leading-relaxed line-champ-2">
                        ${product.description}
                    </p>
                </div>

                <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-850">
                    <span class="text-lg font-extrabold text-white">
                        $${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>

                    ${isAdded ? `
                        <div class="flex items-center bg-indigo-950/65 border border-indigo-900 rounded-xl overflow-hidden">
                            <button onclick= "updateCartQuantity('${product.id}', -1)" class="px-2.5 py-2 hover:bg-indigo-900/60 text-indigo-300 hover:text-white transition-colors">
                                <i data-lucide="minus" class="h-3.5 w-3.5"></i>
                            </button>
                            <span class="px-2 text-xs font-boldtext-white min-w-5 text-center">${cartQty}</span>
                            <button onclick="updateCartQuantity('${product.id}', 1)" class="px-2.5 py-2 hover:bg-indigo-900/60 text-indigo-300 hover:text-white transition-colors">
                                <i data-lucide="plus" class="h-3.5 w-3.5"></i>
                            </button>
                        </div>
                    ` : `
                       <button onclick="addToCart('${product.id}')" class="px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 flex items-center gap-1.5">
                        <i data-lucide="plus" class="h-3.5 w-3.5"></i> Add to Cart
                    </button>
                    `}
                </div>
            </div>
        `;
        productGrid.appendChild(card);   
    });

    lucide.createIcons();
}