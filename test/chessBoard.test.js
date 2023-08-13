import {
    bishopMove,
    knightMove,
    kingMove,
    queenMove,
    rockMove,
} from '../src/movement/rules/piecesIndex';

const chessBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ...Array.from({ length: 4 }, () => Array(8).fill('')),
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

describe('bishopMove', () => {
    it('returns true if bishop can move diagonally from A1 to H8', () => {
        const previousX = 1;
        const previousY = 1;
        const x = 8;
        const y = 8;
        const team = 'white';

        const result = bishopMove(previousX, previousY, x, y, team, chessBoard);
        expect(result).toBe(true);
    });

    it('returns false if bishop cannot move from E4 to D6', () => {
        const previousX = 5;
        const previousY = 4;
        const x = 4;
        const y = 6;
        const team = 'black';
        const result = bishopMove(previousX, previousY, x, y, team, chessBoard);

        expect(result).toBe(false);
    });
});

describe('knightMove', () => {
    it('returns true if knight can move b8 to c6', () => {
        const previousX = 1;
        const previousY = 0;
        const x = 2;
        const y = 2;
        const team = 'black';

        const result = knightMove(previousX, previousY, x, y, team, chessBoard);
        expect(result).toBe(true);
    });

    it('returns false if knight cannot move from b8 to b6', () => {
        const previousX = 1;
        const previousY = 0;
        const x = 1;
        const y = 1;
        const team = 'black';
        const result = knightMove(previousX, previousY, x, y, team, chessBoard);

        expect(result).toBe(false);
    });
});

describe('kingMove', () => {
    it('returns true if kingMove can move e8 to e7', () => {
        const previousX = 4;
        const previousY = 0;
        const x = 4;
        const y = 1;
        const team = 'black';

        const result = kingMove(previousX, previousY, x, y, team, chessBoard);
        expect(result).toBe(true);
    });

    it('returns false if kingMove cannot move from e8 to e6', () => {
        const previousX = 4;
        const previousY = 0;
        const x = 4;
        const y = 2;
        const team = 'black';
        const result = kingMove(previousX, previousY, x, y, team, chessBoard);

        expect(result).toBe(false);
    });
});


describe('rockMove', () => {
    it('returns true if rockMove can move a8 to a3', () => {
        const previousX = 0;
        const previousY = 0;
        const x = 0;
        const y = 5;
        const team = 'black';

        const result = rockMove(previousX, previousY, x, y, team, chessBoard);
        expect(result).toBe(true);
    });

    it('returns false if rockMove cannot move from a8 to h1', () => {
        const previousX = 0;
        const previousY = 0;
        const x = 7;
        const y = 7;
        const team = 'black';
        const result = rockMove(previousX, previousY, x, y, team, chessBoard);

        expect(result).toBe(false);
    });
});


describe('queenMove', () => {
    it('returns true if queenMove can move d8 to a5', () => {
        const previousX = 3;
        const previousY = 0;
        const x = 0;
        const y = 3;
        const team = 'black';

        const result = queenMove(previousX, previousY, x, y, team, chessBoard);
        expect(result).toBe(true);
    });

    it('returns false if queenMove cannot move from d8 to a6', () => {
        const previousX = 3;
        const previousY = 0;
        const x = 0;
        const y = 4;
        const team = 'black';
        const result = queenMove(previousX, previousY, x, y, team, chessBoard);

        expect(result).toBe(false);
    });
});