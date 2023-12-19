import * as api from "../api/userAPI";
import * as types from "../constant/userConstant";

/**
 * @function getUserAction - get current user's data by Id.
 * @function updateUserAction - updates the user/player game status.
 * @function getPublicUsersAction - returns a list of friends connected to this user.
 * @function getPublicUserByIdAction - returns a friend by id from public friends list.
 * @function getConnectedUsersAction - returns all the friends connected to this user.
*/

export const getUserAction = (id) => async (dispatch) => {
    try {
        const { error, data } = await api.getUser(id);

        if (error) {
            throw new Error(error);
        }

        dispatch({
            type: types.GET_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_USER_FAIL,
            payload: error.message,
        });
    }
};

export const updateUserAction = (id, payload) => async (dispatch) => {
    try {
        const { error, data } = await api.updateUserStatus(id, payload);

        if (error) {
            throw new Error(error);
        }

        dispatch({
            type: types.GET_UPDATED_USER_STATUS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_UPDATED_USER_STATUS_FAIL,
            payload: error,
        });
    }
};

export const getPublicUsersAction = () => async (dispatch) => {
    try {
        const { error, data } = await api.getPublicUsers();

        if (error) {
        throw new Error(error);
        }

        dispatch({
            type: types.GET_PUBLIC_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_PUBLIC_USERS_FAIL,
            payload: error,
        });
    }
};

export const getPublicUserByIdAction = (id) => async (dispatch) => {
    try {
        const { error, data } = await api.getPublicUserById(id);
        if (error) {
            throw new Error(error);
        }
        dispatch({
            type: types.GET_PUBLIC_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_PUBLIC_USERS_FAIL,
            payload: error,
        });
    }
};

export const getAddFriendAction = (id) => async (dispatch) => {
    try {
        const { error, data } = await api.addFriend(id);
        if (error) {
            throw new Error(error);
        }
        dispatch({
            type: types.GET_ADD_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_ADD_USER_FAIL,
            payload: error,
        });
    }
};


export const getRemoveFriendAction = (id) => async (dispatch) => {
    try {
        const { error, data } = await api.removeFriend(id);
        if (error) {
            throw new Error(error);
        }
        dispatch({
            type: types.GET_REMOVE_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_REMOVE_USER_FAIL,
            payload: error,
        });
    }
};

export const getConnectedUsersAction = () => async (dispatch) => {
    try {
        const { error, data } = await api.getConnectedUsers();
        if (error) {
            throw new Error(error);
        }
        dispatch({
            type: types.GET_CONNECTED_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_CONNECTED_USERS_FAIL,
            payload: error,
        });
    }
};