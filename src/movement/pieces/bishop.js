import { squareOccupied, SquareEmptyOrOccupiedByOpponent, squareOccupiedByOpponent } from "../rules/reference";

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
        const insideBoardPositions = passedPositionRight.x < 8 && passedPositionRight.y < 8 && passedPositionRight.x > -1 && passedPositionRight.y > -1;
        if (!squareOccupied(passedPositionRight.x, passedPositionRight.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPositionRight.x, y: passedPositionRight.y });
        } else {
            if (squareOccupiedByOpponent(passedPositionRight.x, passedPositionRight.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPositionRight.x, y: passedPositionRight.y });
            }
            break;
        }
    }
    // TOP LEFT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionLeft = { x: bishop.x - i, y: bishop.y - i };
        const insideBoardPositions = passedPositionLeft.x < 8 && passedPositionLeft.y < 8 && passedPositionLeft.x > -1 && passedPositionLeft.y > -1;
        if (!squareOccupied(passedPositionLeft.x, passedPositionLeft.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPositionLeft.x, y: passedPositionLeft.y });
        } else {
            if (squareOccupiedByOpponent(passedPositionLeft.x, passedPositionLeft.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPositionLeft.x, y: passedPositionLeft.y });
            }
            break;
        }
    }
    // BOTTOM RIGHT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionBRight = { x: bishop.x + i, y: bishop.y + i };
        const insideBoardPositions = passedPositionBRight.x < 8 && passedPositionBRight.y < 8 && passedPositionBRight.x > -1 && passedPositionBRight.y > -1;
        if (!squareOccupied(passedPositionBRight.x, passedPositionBRight.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPositionBRight.x, y: passedPositionBRight.y });
        } else {
            if (squareOccupiedByOpponent(passedPositionBRight.x, passedPositionBRight.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPositionBRight.x, y: passedPositionBRight.y });
            }
            break;
        }
    }
    // BOTTOM LEFT
    for (let i = 1; i < DiagonalWidthHieght; i++) {
        const passedPositionBLeft = { x: bishop.x - i, y: bishop.y + i };
        const insideBoardPositions = passedPositionBLeft.x < 8 && passedPositionBLeft.y < 8 && passedPositionBLeft.x > -1 && passedPositionBLeft.y > -1;
        if (!squareOccupied(passedPositionBLeft.x, passedPositionBLeft.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPositionBLeft.x, y: passedPositionBLeft.y });
        } else {
            if (squareOccupiedByOpponent(passedPositionBLeft.x, passedPositionBLeft.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPositionBLeft.x, y: passedPositionBLeft.y });
            }
            break;
        }
    }
    return possiblePositions;
}