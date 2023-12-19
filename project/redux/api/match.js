import { API, handleApiError } from "./utils";

export const updatePlayerData = (playerData) => async (dispatch) => {
    try {
        await API.post("/user/signin", playerData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch(
            {
                type: "UPDATE_PLAYER_DATA",
                payload: playerData,
            }
        );
    } catch (error) {
        return handleApiError(error);
    }  
};