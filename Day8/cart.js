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
        image:"images/keyboard.jpgg",
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