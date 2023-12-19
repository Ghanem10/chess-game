import { jwtDecode } from "jwt-decode";
import { refreshTokenAction } from "../redux/actions/refreshToken";

export const tokenMiddleware = (store) => (next) => async (action) => {
    if (action.meta && action.meta.requiresAuth) {

        const state = store.getState();
        const token = state.auth?.accessToken;

        if (token) {
            const expiresIn = jwtDecode(token).exp * 1000 - Date.now();
            
            if (expiresIn < 1800000) {
                const refreshToken = state.auth.refreshToken;
                try {
                    await store.dispatch(refreshTokenAction(refreshToken));
                    
                    const newToken = store.getState().auth.accessToken;
                    if (!newToken) {
                        throw new Error("Access token not found after refresh");
                    }
                } catch (error) {
                    store.dispatch({ type: "LOGOUT" });
                }
            }
        } else {
            store.dispatch({ type: "LOGOUT" });
        }
    }
    return next(action);
};