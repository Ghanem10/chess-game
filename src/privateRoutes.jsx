import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { setInitialAuthState } from "../project/redux/actions/authAction";

const PrivateRoutes = ({ userData }) => {

    const isAuthenticated = useMemo(() => {
        return (userData, accessToken) => {
            return userData && accessToken;
        };
    }, []);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token)?.accessToken;
    
    useEffect(() => {
        if(!isAuthenticated(userData, accessToken)) {
            dispatch(setInitialAuthState(navigate));
        }
    }, [
        dispatch, 
        navigate, 
        userData, 
        accessToken, 
        isAuthenticated
    ]);

    return isAuthenticated(userData, accessToken) ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" />
    );
};

export default PrivateRoutes;