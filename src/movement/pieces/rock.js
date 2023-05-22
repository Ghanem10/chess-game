import { squareOccupied, SquareEmptyOrOccupiedByOpponent } from "../rules/reference";

export const rockMove = (previousX, previousY, x, y, team, chessBoard) => {
    const boardWidthHieght = 8;

    // VERTICAL MOVEMENT
    if (previousX === x) {
        for (let i = 1; i < boardWidthHieght; i++) {
            const multiplier = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
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
    // HORIZONTAL MOVEMENT
    else if (previousY === y) {
        for (let i = 1; i < boardWidthHieght; i++) {
            const multiplier = (x < previousX) ? -1 : 1;
            const passedPosition = { x: previousX + (i * multiplier), y: previousY };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}

export function getPossibleRookMoves(rook, chessBoard) {
    const possiblePositions = [];
    const boardWidthHeight = 8;
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: rook.x, y: rook.y + i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: rook.x, y: rook.y - i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: rook.x + i, y: rook.y };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: rook.x - i, y: rook.y };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    return possiblePositions;
}