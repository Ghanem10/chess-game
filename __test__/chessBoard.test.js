import { bishopMove } from "../src/Component/movement/pieces/bishop";

describe('bishopMove', () => {
    const chessBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ...Array.from({ length: 4 }, () => Array(8).fill('')),
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];

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
