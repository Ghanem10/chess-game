import * as api from "../api/tournamentAPI";
import * as types from "../constant/tournamentConstant";

export const getPublicTournaments = () => async (dispatch) => {
    try {
        const { error, data } = await api.callPublicTournaments();

        if (error) {
            throw new Error(error);
        }

        dispatch({
            type: types.GET_PUBLIC_TOURNAMENTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_TOURNAMENT_BY_ID_SUCCESS,
            payload: error.message,
        });
    }
};

export const createTournamentWithId = (id, title) => async (dispatch) => {
    try {
        const { error, data } = await api.createNewTournament(id, title);

        if (error) {
            throw new Error(error);
        }

        dispatch({
            type: types.GET_CREATED_TOURNAMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_CREATED_TOURNAMENT_FAIL,
            payload: error.message,
        });
    }
};

export const removeTournament = (id) => async (dispatch) => {
    try {
        const { error } = await api.removeTournamentById(id);

        if (error) {
            throw new Error(error);
        }

        dispatch({
            type: types.GET_REMOVED_TOURNEMENT_BY_ID_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: types.GET_REMOVED_TOURNEMENT_BY_ID_FAIL,
            payload: error.message,
        });
    }
};

export const getTournamentByIdAction = (id) => async (dispatch) => {
    try {
        const { error, data } = await api.getTournamentById(id);
        if (error) {
            throw new Error(error);
        }
        dispatch({
            type: types.GET_TOURNAMENT_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: types.GET_TOURNAMENT_BY_ID_FAIL,
            payload: error.message,
        });
    }
};