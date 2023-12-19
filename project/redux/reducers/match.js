import * as types from "../constant/matchConstant";

const initialState = {
    squares: [],
    pieces: [],
    coordinates: { 
        GridX: -1, GridY: -1 
    },
    nextPosition: { 
        x: -1, y: -1 
    },
    recordedMoves: [],
};

const matchReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch(type) {
        case types.UPDATE_PLAYER_DATA:
            return {
                ...state,
                recordedMoves: payload,
            };

        case types.UPDATE_BOARD_STATE_PIECES:
            return {
                ...state,
                pieces: payload.map((piece) => ({ ...piece })),
            };

        case types.UPDATE_BOARD_STATE:
            return {
                ...state,
                squares: payload,
            };

        case types.REST_BOARD_STATE:
            return {
                ...state,
                squares: payload,
            };

        case types.UPDATE_PIECE_COORDINATES:
            return {
                ...state,
                coordinates: payload,
            };

        case types.UPDATE_PIECE_NEXT_POSITION:
            return {
                ...state,
                nextPosition: payload,
            };
            
        default:
            return state;
    };

};

export default matchReducer;