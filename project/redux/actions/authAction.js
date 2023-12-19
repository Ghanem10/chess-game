import * as api from "../api/authAPI";
import * as types from "../constant/authConstant";
import { isValidToken } from "../../util/authUtils";
import { refreshTokenAction } from "./refreshToken";

export const initializeAuth = () => async (dispatch) => {
    const accessToken = JSON.parse(localStorage.getItem("token"))?.accessToken;
    const refreshToken = JSON.parse(localStorage.getItem("token"))?.refreshToken;

    if (accessToken && refreshToken) {
        if (isValidToken(accessToken)) {
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setUserData(JSON.parse(localStorage.getItem("token")).user));
        } else {
            await dispatch(refreshTokenAction(refreshToken));
        }
    }
};

export const setAccessToken = (accessToken) => async (dispatch) => {
    dispatch({ type: types.SET_ACCESS_TOKEN, payload: accessToken });
};

export const setRefreshToken = (refreshToken) => async (dispatch) => {
    dispatch({ type: types.SET_REFRESH_TOKEN, payload: refreshToken });
};

export const setUserData = (userData) => async (dispatch) => {
    dispatch({ type: types.SET_USER_DATA, payload: userData });
};

export const setInitialAuthState = (navigate) => async (dispatch) => {
    await dispatch({ type: types.LOGOUT });
    navigate("/signin");
};

export const logoutAction = () => async (dispatch) => {
    try {
        const { data } = await api.logout();
        localStorage.removeItem("token");

        dispatch({ type: types.LOGOUT, payload: data });
    } catch (error) {
        dispatch({ type: types.LOGOUT, payload: types.ERROR_MESSAGE });
    }
};

export const signUpAction = (formData, navigate) => async (dispatch) => {
    try {
        localStorage.removeItem("token");

        const response = await api.signUp(formData);
        const { error } = response;

        if (error) {
            dispatch({
                type: types.SIGNUP_FAIL,
                payload: error,
            });
        } else {
            dispatch({
                type: types.SIGNUP_SUCCESS,
                payload: types.SIGNUP_SUCCESS_MESSAGE,
            });
            navigate("/signin");
        }
    } catch (error) {
        dispatch({
            type: types.SIGNUP_FAIL,
            payload: types.ERROR_MESSAGE,
        });
    }
};

export const signInAction = (formData, navigate) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        const { error, data } = response;
        
        if (error) {
            dispatch({
                type: types.SIGNIN_FAIL,
                payload: error,
            });
        } else {

            const { 
                user, 
                accessToken, 
                refreshToken, 
                accessTokenUpdatedAt 
            } = data;

            const token = {
                user,
                accessToken,
                refreshToken,
                accessTokenUpdatedAt,
            };

            localStorage.setItem("token", JSON.stringify(token));

            dispatch({
                type: types.SIGNIN_SUCCESS,
                payload: token,
            });
            
            navigate("/Profile");
        }
    } catch (error) {
        await dispatch({
            type: types.SIGNIN_FAIL,
            payload: error,
        });
        
        navigate("/signin");
    }
};