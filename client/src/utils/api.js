// API Configuration
// Prioridad: window.APP_CONFIG (runtime) > import.meta.env (build time) > localhost (fallback)
const API_URL = window.APP_CONFIG?.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('🔧 API Configuration:', {
    runtimeConfig: window.APP_CONFIG?.API_URL,
    buildTimeConfig: import.meta.env.VITE_API_URL,
    finalURL: API_URL
});

// Get JWT token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// API Helper functions
export const api = {
    // Base fetch wrapper
    async request(endpoint, options = {}) {
        const url = `${API_URL}${endpoint}`;
        const token = getAuthToken();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    auth: {
        login: (credentials) => api.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),
        signup: (userData) => api.request('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
        getCurrentUser: () => api.request('/api/auth/me'),
    },

    // Users endpoints
    users: {
        getMe: () => api.request('/api/users/me'),
        getAll: () => api.request('/api/users'),
        getById: (id) => api.request(`/api/users/${id}`),
        update: (id, userData) => api.request(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        }),
        delete: (id) => api.request(`/api/users/${id}`, {
            method: 'DELETE',
        }),
    },

    // Pets endpoints
    pets: {
        getAll: () => api.request('/api/pets'),
        create: (petData) => api.request('/api/pets', {
            method: 'POST',
            body: JSON.stringify(petData),
        }),
        update: (id, petData) => api.request(`/api/pets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(petData),
        }),
        delete: (id) => api.request(`/api/pets/${id}`, {
            method: 'DELETE',
        }),
    },

    // Sitters endpoints
    sitters: {
        getAll: (params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return api.request(`/api/sitters${queryString ? `?${queryString}` : ''}`);
        },
        getById: (id) => api.request(`/api/sitters/${id}`),
        createProfile: (profileData) => api.request('/api/sitters/profile', {
            method: 'POST',
            body: JSON.stringify(profileData),
        }),
        getAvailability: (id, params = {}) => {
            const queryString = new URLSearchParams(params).toString();
            return api.request(`/api/sitters/${id}/availability${queryString ? `?${queryString}` : ''}`);
        },
        updateAvailability: (availabilityData) => api.request('/api/sitters/availability', {
            method: 'POST',
            body: JSON.stringify(availabilityData),
        }),
        createReview: (id, reviewData) => api.request(`/api/sitters/${id}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData),
        }),
    },

    // Bookings endpoints
    bookings: {
        create: (bookingData) => api.request('/api/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        }),
        getAll: () => api.request('/api/bookings'),
        getById: (id) => api.request(`/api/bookings/${id}`),
        getSitterBookings: () => api.request('/api/bookings/sitter'),
        getSitterClients: () => api.request('/api/bookings/clients'),
        getSitterPets: () => api.request('/api/bookings/pets'),
        updateStatus: (id, status) => api.request(`/api/bookings/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
    },
};

export default api;
