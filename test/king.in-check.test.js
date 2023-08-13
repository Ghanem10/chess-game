// Test all the checks to the king, mainly the ones that are close to the king's position.

import Board from "../model/piecesReference";

const checkpath = new Board();

describe("check which path the king is getting attacked from diagonal", () => {

    it("should find attacking path for diagonal attack", () => {

        // Pieces positions on the board.
        const king = { x: 7, y: 7 };
        const enemy = { x: 3, y: 3 };

        // Path tracker.
        const attackingPath = checkpath.findAttackingPath(king, enemy);

        const expectedPath = [
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
        ];

        if (attackingPath.length !== 0) {
            expect(attackingPath).toEqual(expectedPath);
        }
    });
});

describe("check which path the king is getting attacked", () => {
    it('should find attacking path for horizontal attack', () => {
            
        // Pieces positions on the board.
        const king = { x: 7, y: 4 };
        const enemy = { x: 2, y: 4 };

        const attackingPath = checkpath.findAttackingPath(king, enemy);

        const expectedPath = [
            { x: 2, y: 4 },
            { x: 3, y: 4 },
            { x: 4, y: 4 },
            { x: 5, y: 4 },
            { x: 6, y: 4 },
        ];

        if (attackingPath.length !== 0) {
            expect(attackingPath).toEqual(expectedPath);
        }
    });
});

describe("check which path the king is getting attacked", () => {

    it('should find attacking path for vertical attack', () => {
        
        // Pieces positions on the board.
        const king = { x: 1, y: 1 };
        const enemy = { x: 1, y: 7 };
    
        const attackingPath = checkpath.findAttackingPath(king, enemy);
    
        const expectedPath = [
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 1, y: 4 },
            { x: 1, y: 5 },
            { x: 1, y: 6 },
        ];

        if (attackingPath.length !== 0) {
            expect(attackingPath).toEqual(expectedPath);
        }
    });
});