import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((req) => {
    const accessToken = JSON.parse(localStorage.getItem("token"))?.accessToken;
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
});

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
    try {
        const response = await API.post("/user/refresh-token", {
            refreshToken,
        });

        const token = JSON.parse(localStorage.getItem("token"));
        const payload = response.data;
        localStorage.setItem("token", JSON.stringify({ ...token, ...payload }));
        dispatch({
            type: "REFRESH_TOKEN_SUCCESS",
            payload: payload,
        });
    } catch (error) {
        localStorage.removeItem("token");
        dispatch({
            type: "REFRESH_TOKEN_FAIL",
            payload: error.response.data,
        });
    }
};