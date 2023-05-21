import { SquareEmptyOrOccupiedByOpponent, squareOccupied } from "../rules/reference";

export const knightMove = (previousX, previousY, x, y, team, chessBoard) => {
    const boardWidthHieght = 2;

    for (let i = -1; i < boardWidthHieght; i+= 2) {
        for (let j = -1; j < boardWidthHieght; j+= 2) {
            // TOP AND BOTTOM
            if (y - previousY === 2 * i) {
                if (x - previousX === j) {
                    if (SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                        return true;
                    }
                }
            }
            // LEFT AND RIGHT
            if (x - previousX === 2 * i) {
                if (y - previousY === j) {
                    if (SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

export function getPossibleKnightMoves(knight, chessBoard) {
    const possiblePositions = [];
    const boardWidthHieght = 2;
    for (let i = -1; i < boardWidthHieght; i+= 2) {
        for (let j = -1; j < boardWidthHieght; j+= 2) {
            // LEFT AND RIGHT
            if (!squareOccupied(knight.x + 2 * i, knight.y + j, chessBoard)) {
                possiblePositions.push({ x: knight.x + 2 * i, y: knight.y + j });
            }
            // UP AND BOTTOM
            if (!squareOccupied(knight.x + j, knight.y + 2 * i, chessBoard)) {
                possiblePositions.push({ x: knight.x + j, y: knight.y + 2 * i });
            }
        }
    }
    return possiblePositions;
}