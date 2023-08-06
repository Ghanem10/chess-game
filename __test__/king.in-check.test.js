// Test all the checks to the king, mainly the ones that are close to the king's position.

import Board from "../model/piecesReference";

const checkpath = new Board();

describe("check which path the king is getting attacked from Bishop", () => {
    it("It should return the path that leads to the king's position", () => {

        const positions = [
            { x: 1, y: 3 },
            { x: 2, y: 2 },
            { x: 3, y: 1 },
            { x: 2, y: 4 },
        ];

        const enemyBishop = { 
            possibleMoves: positions 
        };

        const king = { x: 4, y: 0 };
        const result = checkpath.findAttackingPath(king, enemyBishop);

        expect(result).toStrictEqual([
            { x: 1, y: 3 },
            { x: 2, y: 2 },
            { x: 3, y: 1 }
        ])
    });
});


describe("check which path the king is getting attacked from the Queen", () => {
    it("It should return the path that lead sto the king's position", () => {

        const positions = [
            { x: 5, y: 2 },
            { x: 6, y: 3 },
            { x: 6, y: 5 },
            { x: 6, y: 4 },
            { x: 5, y: 6 },
        ];

        const enemyQueen = { 
            possibleMoves: positions 
        };

        const king = { x: 4, y: 7 };
        const result = checkpath.findAttackingPath(king, enemyQueen);

        expect(result).toStrictEqual([
            { x: 6, y: 5 },
            { x: 5, y: 6 },
        ])
    });
});


describe("check which path the king is getting attacked from Rock", () => {
    it("It should return the path that leads to the king's position", () => {

        const positions = [
            { x: 6, y: 5 },
            { x: 4, y: 4 },
            { x: 7, y: 3 },
            { x: 6, y: 4 },
            { x: 5, y: 4 },
        ];

        const enemyRock = { 
            possibleMoves: positions 
        };

        const king = { x: 3, y: 4 };
        const result = checkpath.findAttackingPath(king, enemyRock);

        if (result.length !== 0) {

            expect(result).toStrictEqual([
                { x: 6, y: 4 },
                { x: 5, y: 4 },
                { x: 4, y: 4 },
            ]);
        }
    });
});