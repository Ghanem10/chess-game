import * as types from "../constant/userConstant";
import * as tournamentTypes from "../constant/tournamentConstant";
import { LOGOUT } from "../constant/authConstant";

const initialState = {
    user: {},
    connectedUsers: [],
    tournaments: [],
    userError: null,
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case LOGOUT:
            return {
                user: {},
                connectedUsers: [],
                userError: null,
            };
      
        case types.GET_USER_SUCCESS:
            return { 
                ...state, 
                user: payload, 
            };
      
        case types.GET_USER_FAIL:
            return { 
                ...state, 
                userError: payload 
            };
    
        case types.GET_UPDATED_USER_STATUS_SUCCESS:
            return {
                ...state,
                user: payload,
            };
        
        case types.GET_UPDATED_USER_STATUS_FAIL:
            return { 
                ...state, 
                userError: payload 
            };
    
        case types.GET_CONNECTED_USERS_SUCCESS:
            return {
                ...state,
                connectedUsers: payload || [],
            };

        case types.GET_CONNECTED_USERS_FAIL:
            return {
                ...state,
                userError: payload,
            };

        case types.GET_ADD_USER_SUCCESS:
            return {
                ...state,
                connectedUsers: payload,
                userError: null,
            };

        case types.GET_ADD_USER_FAIL:
            return {
                ...state,
                userError: payload,
            };

        case types.GET_REMOVE_USER_SUCCESS:
            return {
                ...state,
                connectedUsers: payload,
            };

        case types.GET_REMOVE_USER_FAIL:
            return {
                ...state,
                userError: payload,
            };

        case tournamentTypes.GET_PUBLIC_TOURNAMENTS_SUCCESS:
            return {
                ...state,
                tournaments: payload,
            };
        
        default:
            return state;
    };
};

export default userReducer;