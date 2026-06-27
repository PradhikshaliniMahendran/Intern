let DONORS = JSON.parse(localStorage.getItem("blood_donors")) || [];
let REQUESTS = JSON.parse(localStorage.getItem("blood-requests")) || [];

function saveDonors() {
    localStorage.setItem("blood_donors",JSON.stringify(DONORS));
}

function saveRequests() {
    localStorage.setItem("blood_requests",JSON.stringify(REQUESTS));
}