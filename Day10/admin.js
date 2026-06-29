let USERS = [];
try {
    USERS = JSON.parse(localStorage.getItem("blood_users")) || [];
} catch (e) {
    console.error("Currupted blood_users data in localStorage, resetting database...", e);
    localStorage.setItem("blood_users",JSON.stringify([]));
}



function saveUsers() {
    try{
        localStorage.setItem("blood_users",JSON.stringify(USERS));
    } catch (e) {
        console.error("Failed to save uers to localStorage:", e)
    }
    
}

let editTargetId = null;

document.addEventListener("DOMContentLoaded", () => {
    try{
        if (window.lucide) {
            lucide.createIcons();
        } else {
            console.error("Lucide library not loaded. check internet connection or unpkg link.");
        }
    } catch (e) {
        console.error("Error creating Lucide icons:", e);
    }
    
    try{
    renderStats();
    renderUsersTable();
    } catch (e) {
        console.error("Error rensering dashboard stats or table:", e);
    }

    const formElement = document.getElementById("user-form");
    if (formElement) {
        formElement.addEventListener("submit", handleUserSubmit);
    } else {
        console.error("Form 'user-form' not found in HTML.")
    }

    

});

function renderStats() {
    const donorsBadge = document.getElementById("stat-donors");
    const requestsBadge = document.getElementById("stat-requests");
    const usersBadge = document.getElementById("stat-users");

    const donorsList = window.DONORS || [];
    const requestsList = window.REQUESTS || []; 

    document.getElementById("stat-donors").textContent = donorsList.length;
    document.getElementById("stat-requests").textContent = requestsList.length;
    document.getElementById("stat-users").textContent = USERS.length;

}

function renderUsersTable() {
    const tbody = document.getElementById("users-tbody");
    if (!tbody) {
        console.error("Table body 'users-tbody' not found in HTML.");
        return;
    }
    tbody.innerHTML= "";

    if (USERS.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class= "px-6 py-12 text-center text-slate-400"> No staff member registered.</td></tr>`;
        return;
    }

    USERS.forEach(user => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50/50 border-b border-slate-100 transition-colors";

        let statusColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
        if (user.status === "Inactive") statusColor= "bg-slate-100 text-slate-500 border-slate-200";

        let roleColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
        if (user.role === "Admin") roleColor= "bg-rose-50 text-rose-600 border-rose-100";

        tr.innerHTML = `
        <td class= "px-6 py-4 font-semibold text-slate-900">${user.name}</td>
        <td class= "px-6 py-4 text-slate-500">${user.email}</td>
        <td class= "px-6 py-4 text-slate-650">${user.city}</td>
        <td class= "px-6 py-4">
            <span class= "px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleColor}">${user.role}</span>
        </td>
        <td class= "px-6 py-4">
            <button onclick="toggleUserStatus('${user.id}')" class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor} hover:opacity-80 transition-all">
                ${user.status}
            </button>
        </td>
        <td class= "px-6 py-4 text-right space-x-2">
            <button onclick="openEditModal('${user.id}')" class="text-blue-600 hover:text-blue-800 transition-colors font-semibold">Edit</button>
            <button onclick="deleteUser('${user.id}')" class="text-red-600 hover:text-red-800 transition-colors font-semibold">Delete</button>
        </td>

        `;
        tbody.appendChild(tr);
        
    });
}

function handleUserSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const city = document.getElementById("user-city").value.trim();
    const role = document.getElementById("user-role").value;
    const status = document.getElementById("user-status").value;

    if (!name || !email || !city || !role) {
        showToast("Please fill all required volunteer fields.", "error");
        return;
    }

    if (editTargetId) {
        const idx = USERS.findIndex(u => u.id === editTargetId);
        if (idx !== -1) {
            USERS[idx] = {...USERS[idx], name, email, city, role, status};
            saveUsers();
            showToast("Volunteer/User profile updated!", "success");
        }
    } else {
        const newUser = {
            id: "user-" + Date.now(),
            name, email, city, role, status
        };
        USERS.push(newUser);
        saveUsers();
        showToast("New volunteer account created!", "success");
    }
    closeModal();
    renderStats();
    renderUsersTable();
}

function deleteUser(id) {
    if (!confirm("Are you sure want to revoke this volunteer's access?")) return;

    USERS = USERS.filter(u => u.id !== id);
    saveUsers();
    showToast("volunteer access revoked." ,"info");

    renderStats();
    renderUsersTable();
}

function toggleUserStatus(id) {
    const idx = USERS.findIndex(u => u.id === id);
        if (idx !== -1) {
            USERS[idx].status = USERS[idx].status === "Active" ? "Inactive" : "Active";
            saveUsers();
            showToast(`User stats set ti ${USERS[idx].status}`, "info");
            renderUsersTable();

    }
}

function openAddModal() {
    editTargetId = null;
    document.getElementById("user-modal-title").textContent = "Register staff / Volunteer";
    document.getElementById("user-form").reset();
    document.getElementById("user-modal").classList.remove("hidden");
    document.getElementById("user-modal").classList.add("flex");

}

function openEditModal(id) {
    editTargetId = id;
    document.getElementById("user-modal-title").textContent = "Edit Volunteer Details";

    const item = USERS.find(u => u.id === id);
    if (item) {
        document.getElementById("user-name").value = item.name;
        document.getElementById("user-email").value = item.email;
        document.getElementById("user-city").value = item.city;
        document.getElementById("user-role").value = item.role;
        document.getElementById("user-status").value = item.status;

    }

    document.getElementById("user-modal").classList.remove("hidden");
    document.getElementById("user-modal").classList.add("flex");
}

function closeModal() {
    document.getElementById("user-modal").classList.remove("flex");
    document.getElementById("user-modal").classList.add("hidden");
}

window.openAddModal = openAddModal;
window.openEditModal = openEditModal;
window.closeModal = closeModal;
window.deleteUser = deleteUser;
window.toggleUserStatus = toggleUserStatus;