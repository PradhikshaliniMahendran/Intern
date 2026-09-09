const API_BASE = '/api';

let currentReqTab = 'Pending';
let currentDonorPage = 1;
let currentReqPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminState();
    if (document.getElementById('statTotalDonors')) loadLiveStats();
    if (document.getElementById('donorsGrid')) fetchDonors(1);
    if (document.getElementById('requestsGrid')) fetchEmergencyRequests(1);
    if (document.getElementById('adminDashboardPanel')) initAdminPage();
});

async function loadLiveStats() {
    const elemTotal = document.getElementById('statTotalDonors');
    if (!elemTotal) return;
    try {
        const res = await fetch(`${API_BASE}/admin/stats`);
        const data = await res.json();
        if (elemTotal) elemTotal.textContent = data.totalDonors || 0;
        const elemAvail = document.getElementById('statAvailableDonors');
        if (elemAvail) elemAvail.textContent = data.availableDonors || 0;
        const elemPending = document.getElementById('statPendingRequests');
        if (elemPending) elemPending.textContent = data.pendingRequests || 0;
        const elemFulfilled = document.getElementById('statFulfilledRequests');
        if (elemFulfilled) elemFulfilled.textContent = data.fullfilledRequests || 0;
    } catch(err) {
        console.error('Stats error:', err);
    }
}


function initAdminPage() {
    const adminUser = JSON.parse(localStorage.getItem('lifedrop_admin') || 'null');
    const loginSec = document.getElementById('adminLoginSection');
    const dashPanel = document.getElementById('adminDashboardPanel');

    if (adminUser) {
        if (loginSec) loginSec.classList.add('hidden');
        if (dashPanel) dashPanel.classList.remove('hidden');
        loadAdminRequests();
        loadAdminDonors();
    } else {
        if (loginSec) loginSec.classList.remove('hidden');
        if (dashPanel) dashPanel.classList.add('hidden');
    }
}


function checkAdminState() {
    const adminUser = JSON.parse(localStorage.getItem('lifedrop_admin') || 'null');
    const slot = document.getElementById('adminNavSlot');
    if (slot) {
        if (adminUser) {
            slot.innerHTML = `
                <a href="admin.html" class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-brandRed-500 text-brandRed-600 hover:bg-brandRed-50 flex items-center gap-1">
                    <i data-lucide="shield" class="h-3.5 w-3.5"></i> Admin (${adminUser.name})
                </a>
            `;
        } else {
            slot.innerHTML = `
                <a href="admin.html" class="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:border-brandRed-500 hover:text-brandRed-600 flex items-center gap-1">
                    <i data-lucide="lock" class="h-3.5 w-3.5"></i> Admin Login
                </a>
            `;
        }
        if (window.lucide) lucide.createIcons();
    }
}


async function fetchDonors(page = 1) {
    const container = document.getElementById('donorsGrid');
    if (!container) return;
    currentDonorPage = page;
    const bloodGroupElem = document.getElementById('searchBloodGroup');
    const cityElem = document.getElementById('searchCity');
    const bloodGroup = bloodGroupElem ? bloodGroupElem.value : '';
    const city = cityElem ? cityElem.value : '';

    container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Loading active donors...</p>';

    try {
        let url = `${API_BASE}/donors?`;
        if (bloodGroup) url += `blood_group=${encodeURIComponent(bloodGroup)}&`;
        if (city) url += `city=${encodeURIComponent(city)}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.donors || data.donors.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">No registered donors found matching your search query.</p>';
            document.getElementById('donorPagination').innerHTML = '';
            return;
        }

    
        const limit = 6;
        const totalPages = Math.ceil(data.donors.length / limit);
        const paginatedDonors = data.donors.slice((page - 1) * limit, page * limit);

        container.innerHTML = paginatedDonors.map(donor => `
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4">
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <div class="h-12 w-12 rounded-xl bg-brandRed-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-brandRed-600/30">
                            ${donor.blood_group}
                        </div>
                        <span class="text-xs px-2.5 py-1 rounded-full font-bold ${donor.is_available ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}">
                            ${donor.is_available ? '● Available' : '○ Unavailable'}
                        </span>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-slate-900">${donor.name}</h3>
                        <div class="text-xs text-slate-500 space-y-1.5 mt-2">
                            <p class="flex items-center gap-1.5"><i data-lucide="map-pin" class="h-3.5 w-3.5 text-brandRed-500"></i> <span>City: <strong class="text-slate-700">${donor.city}</strong></span></p>
                            <p class="flex items-center gap-1.5"><i data-lucide="phone" class="h-3.5 w-3.5 text-brandRed-500"></i> <span>Phone: <strong class="text-slate-700">${donor.phone}</strong></span></p>
                        </div>
                    </div>
                </div>
                <a href="tel:${donor.phone}" class="w-full py-2.5 bg-slate-100 hover:bg-brandRed-50 text-slate-700 hover:text-brandRed-600 border border-slate-200 hover:border-brandRed-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                    <i data-lucide="phone-call" class="h-4 w-4"></i> Contact Donor
                </a>
            </div>
        `).join('');

        if (window.lucide) lucide.createIcons();
        renderPagination('donorPagination', totalPages, page, (p) => fetchDonors(p));
    } catch (err) {
        console.error('Error fetching donors:', err);
        container.innerHTML = '<p style="color: var(--accent); grid-column: 1/-1;">Failed to load donors.</p>';
    }
}


function switchRequestTab(tab) {
    currentReqTab = tab;
    const tabPending = document.getElementById('tabPending');
    const tabFulfilled = document.getElementById('tabFulfilled');
    
    if (tab === 'Pending') {
        tabPending.className = 'px-4 py-2 rounded-lg bg-brandRed-600 text-white font-bold transition-all';
        tabFulfilled.className = 'px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
    } else {
        tabFulfilled.className = 'px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold transition-all';
        tabPending.className = 'px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-all';
    }
    fetchEmergencyRequests(1);
}


async function fetchEmergencyRequests(page = 1) {
    const container = document.getElementById('requestsGrid');
    if (!container) return;
    currentReqPage = page;
    container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Loading requests...</p>';

    try {
        const res = await fetch(`${API_BASE}/requests?status=${currentReqTab}`);
        const data = await res.json();

        if (!data.requests || data.requests.length === 0) {
            container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">No ${currentReqTab.toLowerCase()} requests recorded.</p>`;
            document.getElementById('requestPagination').innerHTML = '';
            return;
        }

        const limit = 6;
        const totalPages = Math.ceil(data.requests.length / limit);
        const paginatedReqs = data.requests.slice((page - 1) * limit, page * limit);

        container.innerHTML = paginatedReqs.map(req => {
            const isFulfilled = req.status === 'Fulfilled';
            return `
                <div class="bg-white p-6 rounded-2xl border ${isFulfilled ? 'border-emerald-200' : 'border-brandRed-200'} shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4">
                    <div>
                        <div class="flex justify-between items-start mb-3">
                            <div class="h-12 w-12 rounded-xl ${isFulfilled ? 'bg-emerald-600' : 'bg-brandRed-600'} text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                                ${req.blood_group}
                            </div>
                            <span class="text-xs px-2.5 py-1 rounded-full font-bold ${isFulfilled ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-brandRed-50 text-brandRed-600 border border-brandRed-200'}">
                                ${isFulfilled ? '✅ Fulfilled' : `🚨 ${req.units_needed} Unit(s)`}
                            </span>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-slate-900">Patient: ${req.patient_name}</h3>
                            <div class="text-xs text-slate-500 space-y-1.5 mt-2">
                                <p class="flex items-center gap-1.5"><i data-lucide="building-2" class="h-3.5 w-3.5 text-brandRed-500"></i> <span>Hospital: <strong class="text-slate-700">${req.hospital_name}</strong></span></p>
                                <p class="flex items-center gap-1.5"><i data-lucide="map-pin" class="h-3.5 w-3.5 text-brandRed-500"></i> <span>City: <strong class="text-slate-700">${req.city}</strong></span></p>
                                <p class="flex items-center gap-1.5"><i data-lucide="phone" class="h-3.5 w-3.5 text-brandRed-500"></i> <span>Emergency: <strong class="text-slate-700">${req.contact_number}</strong></span></p>
                                ${req.assigned_volunteer && req.assigned_volunteer !== 'Unassigned' ? `<p class="flex items-center gap-1.5"><i data-lucide="user-check" class="h-3.5 w-3.5 text-emerald-600"></i> <span>Volunteer: <strong class="text-emerald-700">${req.assigned_volunteer}</strong></span></p>` : ''}
                            </div>
                        </div>
                    </div>
                    ${!isFulfilled ? `
                        <a href="tel:${req.contact_number}" class="w-full py-2.5 bg-brandRed-600 hover:bg-brandRed-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-brandRed-600/20">
                            <i data-lucide="heart-handshake" class="h-4 w-4"></i> Donate Now
                        </a>
                    ` : `
                        <button class="w-full py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-default" disabled>
                            <i data-lucide="check-circle-2" class="h-4 w-4"></i> Life Saved
                        </button>
                    `}
                </div>
            `;
        }).join('');

        if (window.lucide) lucide.createIcons();

        renderPagination('requestPagination', totalPages, page, (p) => fetchEmergencyRequests(p));
    } catch (err) {
        console.error('Error fetching emergency requests:', err);
        container.innerHTML = '<p style="color: var(--accent); grid-column: 1/-1;">Failed to load emergency requests.</p>';
    }
}


function renderPagination(elemId, totalPages, currentPage, onSelect) {
    const container = document.getElementById(elemId);
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onSelect.toString()})(${i})">${i}</button>`;
    }
    container.innerHTML = buttons;
}


function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}


async function submitRegister(e) {
    e.preventDefault();
    const payload = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        phone: document.getElementById('regPhone').value,
        blood_group: document.getElementById('regBloodGroup').value,
        city: document.getElementById('regCity').value
    };

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok) {
            showToast('❤️ Registered as a Donor successfully!', 'success');
            closeModal('registerModal');
            document.getElementById('registerForm').reset();
            fetchDonors(1);
            loadLiveStats();
        } else {
            showToast(data.error || 'Registration failed', 'error');
        }
    } catch (err) {
        showToast('Server Error: Could not connect to API', 'error');
    }
}


async function submitRequest(e) {
    e.preventDefault();
    const payload = {
        patient_name: document.getElementById('reqPatientName').value,
        blood_group: document.getElementById('reqBloodGroup').value,
        units_needed: parseInt(document.getElementById('reqUnits').value) || 1,
        hospital_name: document.getElementById('reqHospital').value,
        city: document.getElementById('reqCity').value,
        contact_number: document.getElementById('reqContact').value
    };

    try {
        const res = await fetch(`${API_BASE}/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok) {
            showToast('🚨 Emergency Blood Request Posted Successfully!', 'success');
            closeModal('requestModal');
            document.getElementById('requestForm').reset();
            fetchEmergencyRequests(1);
            loadLiveStats();
        } else {
            showToast(data.error || 'Submission failed', 'error');
        }
    } catch (err) {
        showToast('Server Error: Could not submit request', 'error');
    }
}


async function submitAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            if (data.user.role !== 'admin') {
                showToast('Access Denied: Not an Admin account', 'error');
                return;
            }
            localStorage.setItem('lifedrop_admin', JSON.stringify(data.user));
            localStorage.setItem('lifedrop_token', data.token);
            showToast('🔓 Logged in as Admin!', 'success');
            if (document.getElementById('adminLoginModal')) closeModal('adminLoginModal');
            checkAdminState();
            if (document.getElementById('adminDashboardPanel')) {
                initAdminPage();
            } else {
                window.location.href = 'admin.html';
            }
        } else {
            showToast(data.error || 'Invalid Admin credentials', 'error');
        }
    } catch (err) {
        showToast('Server connection failed', 'error');
    }
}


function openAdminDashboard() {
    window.location.href = 'admin.html';
}


function logoutAdmin() {
    localStorage.removeItem('lifedrop_admin');
    localStorage.removeItem('lifedrop_token');
    if (document.getElementById('adminDashboardModal')) closeModal('adminDashboardModal');
    checkAdminState();
    if (document.getElementById('adminDashboardPanel')) initAdminPage();
    showToast('Admin logged out successfully', 'info');
}


function switchAdminSubTab(tab) {
    document.getElementById('adminTabRequests').style.display = tab === 'requests' ? 'block' : 'none';
    document.getElementById('adminTabDonors').style.display = tab === 'donors' ? 'block' : 'none';
    document.getElementById('adminTabRequestsBtn').classList.toggle('active', tab === 'requests');
    document.getElementById('adminTabDonorsBtn').classList.toggle('active', tab === 'donors');
}


async function loadAdminRequests() {
    const tbody = document.getElementById('adminRequestsTableBody');
    tbody.innerHTML = '<tr><td colspan="7">Loading requests...</td></tr>';
    try {
        const res = await fetch(`${API_BASE}/requests`);
        const data = await res.json();
        if (!data.requests || data.requests.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No requests found.</td></tr>';
            return;
        }

        tbody.innerHTML = data.requests.map(req => `
            <tr>
                <td><strong>${req.patient_name}</strong></td>
                <td><span class="blood-badge" style="width:28px; height:28px; font-size:0.8rem; display:inline-flex;">${req.blood_group}</span></td>
                <td>${req.hospital_name}</td>
                <td>${req.city}</td>
                <td>
                    <span class="status-badge ${req.status === 'Fulfilled' ? 'status-fulfilled' : 'status-unavailable'}">
                        ${req.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="assignVolunteerPrompt('${req._id}', '${req.assigned_volunteer || ''}')">
                        ${req.assigned_volunteer && req.assigned_volunteer !== 'Unassigned' ? req.assigned_volunteer : '➕ Assign'}
                    </button>
                </td>
                <td>
                    <div style="display:flex; gap:0.3rem;">
                        ${req.status === 'Pending' ? `
                            <button class="btn btn-sm btn-success" onclick="updateRequestStatus('${req._id}', 'Fulfilled')">Mark Fulfilled</button>
                        ` : `
                            <button class="btn btn-sm btn-warning" onclick="updateRequestStatus('${req._id}', 'Pending')">Reopen</button>
                        `}
                        <button class="btn btn-sm btn-danger" onclick="deleteRequestAdmin('${req._id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="7">Error loading requests.</td></tr>';
    }
}

async function loadAdminDonors() {
    const tbody = document.getElementById('adminDonorsTableBody');
    tbody.innerHTML = '<tr><td colspan="7">Loading donors...</td></tr>';
    try {
        const res = await fetch(`${API_BASE}/donors`);
        const data = await res.json();
        if (!data.donors || data.donors.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No donors found.</td></tr>';
            return;
        }

        tbody.innerHTML = data.donors.map(donor => `
            <tr>
                <td><strong>${donor.name}</strong></td>
                <td>${donor.email}</td>
                <td>${donor.phone}</td>
                <td><span class="blood-badge" style="width:28px; height:28px; font-size:0.8rem; display:inline-flex;">${donor.blood_group}</span></td>
                <td>${donor.city}</td>
                <td>
                    <span class="status-badge ${donor.is_available ? 'status-available' : 'status-unavailable'}">
                        ${donor.is_available ? 'Available' : 'Unavailable'}
                    </span>
                </td>
                <td>
                    <div style="display:flex; gap:0.3rem;">
                        <button class="btn btn-sm ${donor.is_available ? 'btn-warning' : 'btn-success'}" onclick="toggleDonorAvailability('${donor._id}', ${!donor.is_available})">
                            ${donor.is_available ? 'Set Unavailable' : 'Set Available'}
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteDonorAdmin('${donor._id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="7">Error loading donors.</td></tr>';
    }
}


async function updateRequestStatus(id, newStatus) {
    try {
        const res = await fetch(`${API_BASE}/requests/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
            showToast(`Request updated to ${newStatus}`, 'success');
            loadAdminRequests();
            fetchEmergencyRequests(currentReqPage);
            loadLiveStats();
        }
    } catch (err) {
        showToast('Failed to update status', 'error');
    }
}


async function assignVolunteerPrompt(id, currentVal) {
    const volunteerName = prompt('Enter Volunteer Name:', currentVal !== 'Unassigned' ? currentVal : '');
    if (volunteerName === null) return;
    try {
        const res = await fetch(`${API_BASE}/requests/${id}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ volunteer_name: volunteerName || 'Unassigned' })
        });
        if (res.ok) {
            showToast('Volunteer assigned successfully!', 'success');
            loadAdminRequests();
            fetchEmergencyRequests(currentReqPage);
        }
    } catch (err) {
        showToast('Failed to assign volunteer', 'error');
    }
}


async function deleteRequestAdmin(id) {
    if (!confirm('Are you sure you want to delete this blood request?')) return;
    try {
        const res = await fetch(`${API_BASE}/requests/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Request deleted', 'success');
            loadAdminRequests();
            fetchEmergencyRequests(currentReqPage);
            loadLiveStats();
        }
    } catch (err) {
        showToast('Failed to delete request', 'error');
    }
}


async function toggleDonorAvailability(userId, isAvailable) {
    try {
        const res = await fetch(`${API_BASE}/donors/toggle-availability`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, is_available: isAvailable })
        });
        if (res.ok) {
            showToast('Donor availability updated!', 'success');
            loadAdminDonors();
            fetchDonors(currentDonorPage);
            loadLiveStats();
        }
    } catch (err) {
        showToast('Failed to update donor availability', 'error');
    }
}


async function deleteDonorAdmin(id) {
    if (!confirm('Are you sure you want to remove this donor profile?')) return;
    try {
        const res = await fetch(`${API_BASE}/donors/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Donor deleted', 'success');
            loadAdminDonors();
            fetchDonors(currentDonorPage);
            loadLiveStats();
        }
    } catch (err) {
        showToast('Failed to delete donor', 'error');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return alert(message);

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-xl shadow-lg text-white font-semibold text-sm transition-all transform translate-y-2 opacity-0 flex items-center gap-2 ${
        type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-800'
    }`;
    toast.innerHTML = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
