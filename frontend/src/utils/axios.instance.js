import axios from "axios";

let store;

export const injectStore = _store => {
    store = _store;
};

const axiosPrivate = axios.create({
    baseURL: 'https://xclone.up.railway.app/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosPrivate.interceptors.request.use(
    (config) => {
        console.log('Request:', {
            method: config.method,
            url: config.url,
            headers: config.headers,
            cookies: document.cookie,
            withCredentials: config.withCredentials
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Log error response details
        console.log('Error Response: ', {
            status: error.response?.status,
            url: originalRequest.url,
            message: error.response?.data?.message || 'Unknown error'
        });

        // Check if error is due to token expiration
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!store) {
                    throw new Error('Redux store is not initialized');
                }
                const response = await axiosPrivate.post('/users/re-refreshtoken');
                
                if (response.data) {
                    // Retry the original request
                    return axiosPrivate(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                
                if (store) {
                    // Dispatch logout action if refresh fails
                    store.dispatch({ type: 'auth/logout' });
                }
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { axiosPrivate }; 