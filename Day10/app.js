let DONORS = JSON.parse(localStorage.getItem("blood_donors")) || [];
let REQUESTS = JSON.parse(localStorage.getItem("blood_requests")) || [];

function saveDonors() {
    localStorage.setItem("blood_donors",JSON.stringify(DONORS));
}

function saveRequests() {
    localStorage.setItem("blood_requests",JSON.stringify(REQUESTS));
}

function showToast(message, type = 'success') {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `flex items-center gap-3 p-4 rounded-xl shadow-lg border bg-white text-slate-800 pointer-events-auto max-w-sm w-full transition-all duration-300 transform translate-y-2 opacity-0`;

    let borderClass = 'border-emerald-200 bg-emerald-50/50';
    let iconHtml = '<i data-lucide="check-circle" class= "h-5 w-5 text-emerald-600 flex-shrink-0"></i>';

    if (type === 'error') {
        borderClass = 'border-red-200 bg-red-50/50';
        iconHtml = '<i data-lucide = "x-circle" class= "h-5 w-5 text-red-600 flex-shrink-0"></i>';
    } else if (type === 'info') {
        borderClass = 'border-blue-200 bg-blue-50/50';
        iconHtml = '<i data-lucide = "info" class= "h-5 w-5 text-blue-600 flex-shrink-0"></i>';
    }

    toast.className += ` ${borderClass}`;
    toast.innerHTML = `
        ${iconHtml}
        <div class = "flex-grow text-sm font-medium">${message}</div>
        <button class="text-slate-400 hover:text-slate-600 transition-colors" onclick="this.parentElement.remove()">
            <i data-lucide="x" class="h-4 w-4"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    if (window.lucide) {
        lucide.createIcons();
    }

    setTimeout(() => {
        toast.classList.remove("translate-y-2", "opacity-0");

    }, 10);


    setTimeout (() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px) scale(0.95)';
        toast.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

window.DONORS = DONORS;
window.REQUESTS = REQUESTS;
window.saveDonors = saveDonors;
window.saveRequests = saveRequests;
window.showToast = showToast;