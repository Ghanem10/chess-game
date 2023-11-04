
export const SQUARES = {
    ADD_SQUARES: "ADD_SQUARES",
    COORDINATES_X_Y: "COORDINATES_X_Y",
    SET_ACTIVE_PIECE: "SET_ACTIVE_PIECE",
    UPDATE_NEXT_X_Y: "UPDATE_NEXT_X_Y",
};

export default function stateManagement(state, action) {
    switch(action.type) {
        case SQUARES.ADD_SQUARES:
            return { ...state, squares: action.payload.squares };
        case SQUARES.COORDINATES_X_Y:
            return { ...state, coordinates: action.payload.coordinates };
        case SQUARES.SET_ACTIVE_PIECE:
            return { ...state, activePiece: action.payload.activePiece };
        case SQUARES.UPDATE_NEXT_X_Y:
            return { ...state, nextPosition: action.payload.nextPosition };
        default:
            return state;
    }
}