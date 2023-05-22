import { squareOccupied, SquareEmptyOrOccupiedByOpponent } from "../rules/reference";

export const bishopMove = (previousX, previousY, x, y, team, chessBoard) => {
    const DiagonalWidthHieght = 8;

    for (let i = 1; i < DiagonalWidthHieght; i++) {
        // TOP RIGHT
        if (x > previousX && y < previousY) {
            const passedPosition = { x: previousX + i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // TOP LEFT
        if (x < previousX && y < previousY) {
            const passedPosition = { x: previousX - i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }

        // BOTTOM RIGHT
        if (x > previousX && y > previousY) {
            const passedPosition = { x: previousX + i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // BOTTOM LEFT
        if (x < previousX && y > previousY) {
            const passedPosition = { x: previousX - i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}

export function getPossibleBishopMoves(bishop, chessBoard) {
    const possiblePositions = [];
    const DiagonalWidthHieght = 8;
    // TOP RIGHT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionRight = { x: bishop.x + i, y: bishop.y - i };
        if (!squareOccupied(passedPositionRight.x, passedPositionRight.y, chessBoard)) {
            possiblePositions.push({ x: passedPositionRight.x, y: passedPositionRight.y });
        } else {
            break;
        }
    }
    // TOP LEFT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionLeft = { x: bishop.x - i, y: bishop.y - i };
        if (!squareOccupied(passedPositionLeft.x, passedPositionLeft.y, chessBoard)) {
            possiblePositions.push({ x: passedPositionLeft.x, y: passedPositionLeft.y });
        } else {
            break;
        }
    }
    // BOTTOM RIGHT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionBRight = { x: bishop.x + i, y: bishop.y + i };
        if (!squareOccupied(passedPositionBRight.x, passedPositionBRight.y, chessBoard)) {
            possiblePositions.push({ x: passedPositionBRight.x, y: passedPositionBRight.y });
        } else {
            break;
        }
    }
    // BOTTOM LEFT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionBLeft = { x: bishop.x - i, y: bishop.y + i };
        if (!squareOccupied(passedPositionBLeft.x, passedPositionBLeft.y, chessBoard)) {
            possiblePositions.push({ x: passedPositionBLeft.x, y: passedPositionBLeft.y });
        } else {
            break;
        }
    }
    return possiblePositions;
}