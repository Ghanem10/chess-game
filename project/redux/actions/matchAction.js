import * as types from "../constant/matchConstant";

export const updatePlayerData = (playerData) => {
    return {
        type: types.UPDATE_PLAYER_DATA,
        payload: playerData,
    };
};

export const updateBoardStatePieces = (pieces) => {
    return {
        type: types.UPDATE_BOARD_STATE_PIECES,
        payload: pieces,
    };
};

export const restStatePieces = (pieces) => {
    return {
        type: types.UPDATE_BOARD_STATE_PIECES,
        payload: pieces,
    };
};

export const updateBoardState = (squares) => {
    return {
        type: types.UPDATE_BOARD_STATE,
        payload: squares,
    };
};

export const restBoardState = (restBoard) => {
    return {
        type: types.REST_BOARD_STATE,
        payload: restBoard,
    };
};

export const updatePreviousPosition = (prePosition) => {
    return {
        type: types.UPDATE_PIECE_COORDINATES,
        payload: prePosition,
    };
};

export const updateNextPosition = (nextPosition) => {
    return {
        type: types.UPDATE_PIECE_NEXT_POSITION,
        payload: nextPosition
    };
};