import { API, handleApiError } from "./utils";

export const callPublicTournaments = async () => {
    try {
        const { data } = await API.get(`/tournament/public-tournaments`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const createNewTournament = async (id, title) => {
    try {
        const { data } = await API.post(`/tournament/${id}/create-tournament`, { title }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const getTournamentById = async (id) => {
    try {
        const { data } = await API.get(`/tournament/${id}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const removeTournamentById = async (id) => {
    try {
        const { error } = await API.delete(`/tournament/${id}/remove-tournament`, { id: id });
        return { error: error };
    } catch (error) {
        return handleApiError(error);
    }
};