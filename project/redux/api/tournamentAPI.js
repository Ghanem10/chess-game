import { API, handleApiError } from "./utils";

export const getPublicTournaments = async () => {
    try {
        const { data } = await API.get(`/tournament/public-tournaments`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

export const createNewTournament = async (id) => {
    try {
        const { data } = await API.post(`/tournament/${id}/create-tournament`, {
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
        const { data } = await API.get(`/tournament/${id}/remove-tournament`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};