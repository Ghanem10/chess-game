import { API, handleApiError } from "./utils";

export const signIn = async (formData) => {
    try {
        const res = await API.post("/user/signin", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return { error: null, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const signUp = async (formData) => {
    try {
        const res = await API.post("/user/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return { error: null, data: res.data };
    } catch (error) {
        return {
            error: error,
            data: null,
        };
    }
};

export const logout = async () => {
    try {
        const res = await API.post("/user/logout", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return { error: null, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};