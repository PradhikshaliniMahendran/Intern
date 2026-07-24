import Swal from 'sweetalert2';

export const confirmDelete = async (studentName) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to delete ${studentName}? This action cannot be undone`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        background: '#1e293b',
        color: '#f1f5f9',
    });

    return result.isConfirmed;
}