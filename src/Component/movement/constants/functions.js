export const Team = {
    BLACK: 'black',
    WHITE: 'white'
};
export const Type = {
    PAWN: 'pawn',
    BISHOP: 'bishop',
    KNIGHT: 'knight',
    ROCK: 'rock',
    KING: 'king',
    QUEEN: 'queen'
};

export function samePosition(p1, x, y) {
    return p1.x === x && p1.y === y;
}