import axios from 'axios';
const http = axios.create({
    baseURL: import.meta.env.BASE_URL,
});
http.interceptors.request.use(config => {
    const timeStamp = Date.now().toString();
    const token = localStorage.getItem('auth-token');
    config.timeout = config?.timeout ?? 15000;   // per request timeout
    config.withCredentials = true;      
    const headers = config.headers;
    headers.set('Content-Type', 'application/json');
    headers.set('tlp-t',timeStamp);
    if (token) {
        headers.set('Authorization',`Bearer ${token}`);
    };

    return config;
}, error => Promise.reject(error));

// Response interceptor
http.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        const normalizedError = {
            success: false,
            message: 'Something went wrong',
            status: error.response?.status || 500,
            data: null,
        };


        if (error.response?.data) {
            const backend = error.response.data;
            normalizedError.success = backend.success ?? false;
            normalizedError.message = backend.message || error.message;
            normalizedError.status = backend.status || error.response.status;
            normalizedError.data = backend.data ?? null;
        }

        if (normalizedError?.status === 401) {
            console.error(normalizedError?.message || 'Session expired, please log in again.');
            localStorage.removeItem('auth-token');
            window.location.href = '/login';
        } else if (normalizedError?.status === 500) {
            console.error(normalizedError?.message || 'Server error. Please try again later.');
        } else {
            console.error(normalizedError?.message || 'Something went wrong');
        }
        return Promise.reject(normalizedError);
    }
);

export default http;