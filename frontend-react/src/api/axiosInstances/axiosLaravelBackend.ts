import axios from "axios";

// URL
const baseURL = "http://localhost:8000/api/v1/";

// Headers
const axiosLaravelBackend = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

// REQUEST INTERCEPTOR
axiosLaravelBackend.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// RESPONSE INTERCEPTOR
axiosLaravelBackend.interceptors.response.use(
    (response) => response,
    (error) => {
        const token = localStorage.getItem("token");
        const status = error.response?.status;
        const data = error.response?.data;

        // brak autoryzacji
        if (status === 401 && token) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject({status, data});
    }
);

export default axiosLaravelBackend;