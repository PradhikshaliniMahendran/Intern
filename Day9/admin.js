let PRODUCTS =JSON.parse(localStorage.getItem("petcart_catalog")) || [];

function saveCatalogState() {
    localStorage.setItem("petcart_catalog", JSON.stringify(PRODUCTS));
}

const toastContainer = document.getElementById("toast-container");

function showToast(message,type = 'success') {
    const toast = document.createElement("div");
    toast.className = `toast-enter flex items-center gap-3 p-4 rounded-xl shadow-xl border bg-gray-900 pointer-events-auto max-w-sm w-full`;

    let borderClass = 'border-amber-500/30';
    let iconHtml = '<i data-lucide= "check-circle" class="h-5 w-5 text-amber-400 flex-shrink-0"></i>';

    
    if (type === 'error') {
        borderClass = 'border-red-500/30';
        iconHtml = '<i data-lucide= "x-circle" class= "h-5 w-5 text-red-400 flex-shrink-0"></i>';
    } else if (type === 'info') {
        borderClass = 'border-orange-500/30';
        iconHtml = '<i data-lucide= "info" class= "h-5 w-5 text-orange-400 flex-shrink-0"></i>';
    }

    toast.classList.add(borderClass);
    toast.innerHTML = `
    ${iconHtml}
    <div class= "flex-grow text-sm font-medium text-gray-200">${message}</div>
    <button class="text-gray-500 hover:text-white transition-colors" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="h-4 w-4"></i>
    </button>
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

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const addPetForm = document.getElementById("add-pet-form");
    const adminCancelBtn = document.getElementById("admin-cancel-btn");
    const fileInput = document.getElementById("admin-image-file");

    let uploadedImageBase64 = "";

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 1.5 * 1024 * 1024) {
                    showToast("File is too large! Please choose an image smaller than 1.5.", "error");
                    fileInput.value = "";
                    uploadedImageBase64 = "";
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    uploadedImageBase64 = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

    }

    if (addPetForm) {
            addPetForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const title = document.getElementById("admin-title").value.trim();
                const category = document.getElementById("admin-category").value.trim();
                const priceInput = document.getElementById("admin-price").value.trim();
                const ratingInput = document.getElementById("admin-rating").value.trim();
                const inStock = document.getElementById("admin-stock").value === "true";
                const description = document.getElementById("admin-description").value.trim();

                let errors = [];

                if (title === "") {
                    errors.push("Breed Name is required.");
                }
                if (priceInput === "") {
                    errors.push("Adoption Fee is required.");
                } else {
                    const price = parseFloat(priceInput);
                    if (isNaN(price) || price < 0 ) {
                        errors.push("Adoption Fee must be a valid positive number.");
                    }
                }
                if (ratingInput === "") {
                    errors.push("Rating is required.");
                } else {
                    const rating = parseFloat(ratingInput);
                    if (isNaN(rating) || rating < 1.0  || rating > 5.0) {
                        errors.push("Rating must be a number between 1.0 and 5.0.");
                    }
                }
                if (description === "") {
                    errors.push("Short Description is required.");
                }
                if (uploadedImageBase64 === "") {
                    errors.push("Dog image file is required.");
                }
                if (errors.length > 0) {
                    errors.forEach(err => showToast(err, "error"));
                    return;
                }

                const newPet = {
                    id: "pet-" + (PRODUCTS.length + 1) + "-" + Date.now(),
                    title: title,
                    category: category,
                    price: parseFloat(priceInput),
                    rating: parseFloat(ratingInput),
                    image: uploadedImageBase64,
                    description: description,
                    inStock: inStock 
                };

                PRODUCTS.push(newPet);
                saveCatalogState();

                addPetForm.reset();
                uploadedImageBase64 = "";
                showToast(`Successfully added <strong>${title}</strong> to catalog!`, 'success');
            });

        }

        if (adminCancelBtn) {
            adminCancelBtn.addEventListener("click", () => {
                addPetForm.reset();
                uploadedImageBase64 = "";
                showToast("Form cleared", 'info');
            });
        }
});