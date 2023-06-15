import { squareOccupied, squareOccupiedByOpponent, squareOccupiedByKing } from "../rules/reference";

export function getPossibleQueenMoves(queen, chessBoard) {
    const possiblePositions = [];
    const directions = [
        { dx: 1, dy: 1 },
        { dx: -1, dy: 1 },
        { dx: -1, dy: -1 },
        { dx: 1, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 }
    ];

    for (const direction of directions) {
        let { x, y } = queen;
        while (true) {
            x += direction.dx;
            y += direction.dy;

            if (!isInsideBoard(x, y)) break;
            if (!squareOccupied(x, y, chessBoard)) {
                possiblePositions.push({ x, y });
                
            } else if (squareOccupiedByKing(x, y, chessBoard, queen.team)) {
                    possiblePositions.push({ x, y });
            } else {
                if (squareOccupiedByOpponent(x, y, chessBoard, queen.team)) {
                    possiblePositions.push({ x, y });
                } 
                break;
            }
        }
    }
    return possiblePositions;
}

function isInsideBoard(x, y) {
    return x >= 0 && y >= 0 && x < 8 && y < 8;
}
  