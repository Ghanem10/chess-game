import { API, handleApiError } from "./utils";

export const getUser = async (id) => {
    try {
        const { data } = await API.get(`/user/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const updateUserStatus = async (id, payload) => {
    try {
        const { data } = await API.put(`/user/${id}/update-status`, { id, ...payload }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getPublicUsers = async () => {
    try {
        const { data } = await API.get("/user/public-friends");
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getPublicUserById = async (id) => {
    try {
        const { data } = await API.get(`/user/public-friend/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const addFriend = async (id) => {
    try {
        const { data } = await API.patch(`/user/${id}/add-friend`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const removeFriend = async (id) => {
    try {
        const { data } = await API.patch(`/user/${id}/remove-friend`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getConnectedUsers = async () => {
    try {
        const { data } = await API.get("/user/connected-friends");
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};