let PRODUCTS =JSON.parse(localStorage.getItem("petcart_catalog")) || [];

function saveCatalogState() {
    localStorage.setItem("petcart_catalog", JSON.stringify(PRODUCTS));
}

let cart = JSON.parse(localStorage.getItem("petcart_cart")) || [];

let selectedProducts = [];
let favouriteProducts = JSON.parse(localStorage.getItem("petcart-favourites")) || [];

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

let applidePromoCode = "";
const cartDiscount = document.getElementById("cart-discount") || {textContent: "", 
    classList: {add: () => {}, remove: () => {}}
};

function saveCartState() {
    localStorage.setItem("minisocart_cart",JSON.stringify(cart));
}

function toggleSelectProduct(productId) {
    const index = selectedProducts.indexOf(productId);
    if (index > -1) {
        selectedProducts.splice(index, 1);
        showToast("Dog breed unselected", "info");
    } else {
        selectedProducts.push(productId);
        showToast("Dog breed selected", "success");
    }
    renderProducts
}

function toggleFavourite(productId) {
    const index = favouriteProducts.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (index > -1) {
        favouriteProducts.splice(index, 1);
        showToast(`Removed <strong>${product.title}</strong> from favourites`, "info");
    } else {
        favouriteProducts.push(productId);
        showToast(`Added <strong>${product.title}</strong> to favourites`, "success"); 
    }
    saveCartState();
    renderCart();
}

function showToast(message, type = 'success') {
    const toast = document.createElement("div");
    toast.className = `toast-enter flex items-center gap-3 p-4 rounded-xl shadow-xl border bg-gray-900 pointer-events-auto max-w-sm w-full`;


    let borderClass = 'border-indigo-500/30';
    let iconHtml = '<i data-lucide = "check-circle" class= "h-5 w-5 text-indigo-400 flex-shrink-0"></i>';


    if (type === 'error') {
        borderClass = 'border-red-500/30';
        iconHtml = '<i data-lucide= "x-circle" class= "h-5 w-5 text-red-400 flex-shrink-0"></i>';
    } else if (type === 'info') {
        borderClass = 'border-blue-500/30';
        iconHtml = '<i data-lucide= "info" class= "h-5 w-5 text-blue-400 flex-shrink-0"></i>';
    }

    toast.classList.add(borderClass);
    toast.innerHTML = `
    ${iconHtml}
    <div class= "flex-grow text-sm font-medium text-gray-200">${message}</div>
    <button class="text-gray-500 hover:text-white transition-colors" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="h-4 w-4"></i>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout (() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.95)';
        toast.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function buildRatingStars(rating) {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4;

    for (let i = 1; i <= 5; i++) {
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
        const isAdded = cart.some(item => item.productId === product.id);
        const cartQty = isAdded ? cart.find(item => item.productId === product.id).quantity : 0;

        const card = document.createElement("div");
        card.className = "glass-card rounded-2xl overflow-hidden p-4 flex flex-col justify-between group";
        card.innerHTML = `
            <div class = "relative rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800/40 aspect-[1/1] flex items-center justify-center ">
                <img src = "${product.image}" alt="${product.title}" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'" class="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300">
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

                    <p class="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        ${product.description}
                    </p>
                </div>

                <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-850">
                    <span class="text-lg font-extrabold text-white">
                        Rs${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>

                    ${isAdded ? `
                        <div class="flex items-center bg-indigo-950/65 border border-indigo-900 rounded-xl overflow-hidden">
                            <button onclick= "updateCartQuantity('${product.id}', -1)" class="px-2.5 py-2 hover:bg-indigo-900/60 text-indigo-300 hover:text-white transition-colors">
                                <i data-lucide="minus" class="h-3.5 w-3.5"></i>
                            </button>
                            <span class="px-2 text-xs font-bold text-white min-w-5 text-center">${cartQty}</span>
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

function renderCart() {
    cartItemsContainer.innerHTML = "";

    let itemsCount = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div class="h-16 w-16 rounded-full bg-gray-900 border border-gray-850 flex items-center justify-center text-gray-500">
                    <i data-lucide="shopping-cart" class="h-7 w-7"></i>
                </div>
                <div>
                    <h4 class="text-base font-bold text-white">Your cart is empty</h4>
                    <p class="text-gray-400 text-xs mt-1 max-w-[200px]">Add some products from our catalog to get started.</p>
                </div>
            </div>
            `;

            cartSubTotal.textContent = "Rs0.00";
            cartTax.textContent = "Rs0.00";
            cartTotal.textContent = "Rs0.00";
            cartTotalNav.textContent = "Rs0.00";

            cartBadge.textContent = "0";
            cartBadge.classList.add("hidden");

            checkoutBtn.disabled = true;
            checkoutBtn.classList.add("opacity-50", "cursor-not-allowed");
            clearCartBtn.classList.add("hidden");

            lucide.createIcons();
            return;
    }

    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("opacity-50", "cursor-not-allowed");
    clearCartBtn.classList.remove("hidden");

    cart.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (!product) return;

        itemsCount += item.quantity;
        const itemSubtotal = product.price * item.quantity;
        subtotal += itemSubtotal;

        const cartCard = document.createElement("div");
        cartCard.className = "flex items-center gap-4 bg-gray-900/40 border border-850 p-3 rounded-xl";
        cartCard.innerHTML = `
            <div class= "h-16 w-16 bg-gray-950/60 border border-gray-800 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                <img src = "${product.image}" alt="${product.title}" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'" class="max-h-full max-w-full object-contain">
            </div>
            
            <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start">
                    <h4 class="text-xs font-bold text-white truncate pr-2">${product.title}</h4>
                    <button onclick="removeFromCart('${product.id}')" class="text-gray-500 hover:text-red-400 transition-colors p-0.5">
                        <i data-lucide="trash-2" class="h-3.5 w-3.5"></i>
                    </button>
                </div>
                
                <p class="text-xs text-indigo-400 font-medium mt-0.5">
                    Rs${product.price.toFixed(2)}
                </p>
                
                <div class="flex items-center justify-between mt-2">
                    <!-- Quantity buttons -->
                    <div class="flex items-center bg-gray-950 border border-gray-850 rounded-lg overflow-hidden">
                        <button onclick="updateCartQuantity('${product.id}', -1)" class="px-2 py-1 text-gray-400  hover:text-white hover:bg-gray-850 transition-all">
                            <i data-lucide="minus" class="h-3 w-3"></i>
                        </button>
                        <span class="px-2 text-xs font-bold text-gray-200 text-center min-w-4">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${product.id}', 1)" class="px-2 py-1 text-gray-400  hover:text-white hover:bg-gray-850 transition-all">
                            <i data-lucide="plus" class="h-3 w-3"></i>
                        </button>
                    </div>
                    
                    <span class="text-xs font-extrabold text-white">
                        Rs${itemSubtotal.toFixed(2)}
                    </span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartCard);

    });

    let discountAmount = 0;
    if (applidePromoCode === "MINISOCART10") {
        discountAmount = subtotal * 0.10;
        cartDiscount.textContent = `-Rs${discountAmount.toFixed(2)}`;
        cartDrawerCount.classList.remove("hidden");
    } else {
        cartDrawerCount.classList.add("hidden");
    }

    const taxableSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxableSubtotal * 0.08;
    const finalTotal = taxableSubtotal + taxAmount;

    cartSubTotal.textContent = `Rs${subtotal.toFixed(2)}`;
    cartTax.textContent = `Rs${taxAmount.toFixed(2)}`;
    cartTotal.textContent = `Rs${finalTotal.toFixed(2)}`;
    cartTotalNav.textContent = `Rs${finalTotal.toFixed(2)}`;
    cartDrawerCount.textContent = `${itemsCount} item${itemsCount !== 1 ? 's' : ''}`;

    cartBadge.textContent = itemsCount;
    cartBadge.classList.remove("hidden");

    cartBadge.classList.remove("animate-cart-bounce");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("animate-cart-bounce");

    lucide.createIcons();
}

function addToCart(productId) {
    const existingIndex = cart.findIndex(item => item.productId === productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) return;

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({productId, quantity: 1});
    }

    saveCartState();
    renderProducts();
    renderCart();

    showToast(`Added <strong>${product.title}</strong> to cart!`, "success");
 
}

function updateCartQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.productId === productId);
    if (itemIndex === -1) return;

    const newQty = cart[itemIndex].quantity + delta;

    if (newQty <= 0) {
        removeFromCart(productId);
    } else {
        cart[itemIndex].quantity = newQty;
        saveCartState();
        renderProducts();
        renderCart();
    }
}

function removeFromCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    cart = cart.filter(item => item.productId !== productId);

    saveCartState();
    renderProducts();
    renderCart();

    if (product) {
        showToast(`Removed <strong>${product.title}</strong> from cart`, "info");

    }

}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCartState();
    renderProducts();
    renderCart();
    showToast("Cleared your shopping cart", "info");
}

function handleCheckout() {
    if (cart.length === 0) return;

    const checkoutSum = cartTotal.textContent;

    cart = [];
    saveCartState();

    toggleCartDrawer(false);
    renderProducts();
    renderCart();

    showToast(`Checkout successful! Thank you for purchasing. paid: ${checkoutSum}`, "success");
}

function toggleCartDrawer(isOpen) {
    if (isOpen) {
        cartDrawer.classList.remove("hidden");
        setTimeout(() => {
            cartBackdrop.classList.remove("opacity-0");
            cartBackdrop.classList.add("opacity-100");
            cartPanel.classList.remove("translate-x-full");
            cartPanel.classList.add("translate-x-0");
        }, 50);
    } else {
        cartBackdrop.classList.remove("opacity-100");
        cartBackdrop.classList.add("opacity-0");
        cartPanel.classList.remove("translate-x-0");
        cartPanel.classList.add("translate-x-full");

        setTimeout(() => {
            cartDrawer.classList.add("hidden");
        }, 300);
    }
}

window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderCart();

    cartTrigger.addEventListener("click", () => toggleCartDrawer(true));
    cartClose.addEventListener("click", () => toggleCartDrawer(false));
    cartBackdrop.addEventListener("click", () => toggleCartDrawer(false));

    searchInput.addEventListener("input", (e) => {
        currentSearchQuery = e.target.value;
        renderProducts();
    });

    categoryFilters.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const buttons = categoryFilters.querySelectorAll("button");
        buttons.forEach(b => {
            b.className = "px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all duration-200";
        });

        btn.className = "px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm border border-indigo-500 transition-all duration-200";

        currentCategoryFilter = btn.dataset.category;
        renderProducts();

    });

    sortSelect.addEventListener("change", (e) => {
        currentSortOption = e.target.value;
        renderProducts();
    });

    resetSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentSearchQuery = "";

        const buttons = categoryFilters.querySelectorAll("button");
        buttons.forEach(b => {
            if (b.dataset.category === "all") {
                b.className = "px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm border border-indigo-500 transition-all duration-200";
            } else {
                b.className = "px-4 py-2.5 rounded-xl text-xs font-semibold bg-gray-900/60 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all duration-200";
            }
        });

        currentCategoryFilter = "all";
        renderProducts();
    });

    clearCartBtn.addEventListener("click", clearCart);
    checkoutBtn.addEventListener("click", handleCheckout);
});



