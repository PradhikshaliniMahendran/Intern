import { toast } from 'react-toastify';

const defaultOptions = { 
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const notifySuccess = (message) => {
    toast.success(message, defaultOptions);
};

export const notifyError = (message) => {
    toast.error(message, defaultOptions);
};

export const notifyWarning = (message) => {
    toast.warning(message, defaultOptions);
};

export const notifyInfo = (message) => {
    toast.info(message, defaultOptions);
};