/** */
export interface Pieces {
    image?: string,
    x: number,
    y: number,
    possibleMoves: number[],
    Piece?: string,
    hasmoved?: boolean,
    team?: string,
};

/** */
export interface Position {
    x: number,
    y: number,
};

/** */
export enum RandomPiece {
    Pawn,
    Knight,
    Rock,
    King,
    Queen,
    Bishop,
};