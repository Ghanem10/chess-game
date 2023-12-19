import axios from "axios";

const authInterceptor = (req) => {
    const accessToken = JSON.parse(localStorage.getItem("token"))?.accessToken;
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
};

export const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
});

API.interceptors.request.use(authInterceptor);

export const handleApiError = async (error) => {
    try {
        const errorMessage = error.response?.data?.message || 
                            "An unexpected error occurred.";

        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};