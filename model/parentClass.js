import { Type } from "../movement/constants/functions";

export default class Piece {
    
    constructor(piece) {
        this.piece = piece;
    }

    isPawn() {
        return this.piece.Piece === Type.PAWN; 
    }
}