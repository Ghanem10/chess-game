import piecesRules from "./rules/rules";

export default function bishopMove(previousX, previousY, x, y, team, chessBoard) {
    const DiagonalWidthHieght = 8;
    const bishop = new piecesRules();

    for (let i = 1; i < DiagonalWidthHieght; i++) {
        // TOP RIGHT
        if (x > previousX && y < previousY) {
            const passedPosition = { x: previousX + i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (bishop.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (bishop.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // TOP LEFT
        if (x < previousX && y < previousY) {
            const passedPosition = { x: previousX - i, y: previousY - i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (bishop.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (bishop.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }

        // BOTTOM RIGHT
        if (x > previousX && y > previousY) {
            const passedPosition = { x: previousX + i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (bishop.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (bishop.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // BOTTOM LEFT
        if (x < previousX && y > previousY) {
            const passedPosition = { x: previousX - i, y: previousY + i };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (bishop.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (bishop.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}