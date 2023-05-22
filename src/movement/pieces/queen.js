import { samePosition } from "../constants/functions";
import { squareOccupied, SquareEmptyOrOccupiedByOpponent } from "../rules/reference";

export const queenMove = (previousX, previousY, x, y, team, chessBoard) => {
    const boardWidthHeight = 8;

    for (let i = 1; i < boardWidthHeight; i++) {
        // HORIZONTAL MOVEMENT
        if (y === previousY) {
            const multiplier = (x < previousX) ? -1 : 1;
            const passedPosition = { x: previousX + (i * multiplier), y: previousY };
            if (samePosition(passedPosition, x, y)) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // VERTICAL MOVEMENT
        if (x === previousX) {
            const multiplier = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
            if (samePosition(passedPosition, x, y)) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // DIAGONAL
        if (!(x === previousX || y === previousY)) {
            const multiplierX = (x < previousX) ? -1 : 1;
            const multiplierY = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX + (i * multiplierX), y: previousY + (i * multiplierY) };
            
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

export function getPossibleQueenMoves(queen, chessBoard) {
    const possiblePositions = [];
    const boardWidthHeight = 8;
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x + i, y: queen.y + i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x - i, y: queen.y + i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x - i, y: queen.y - i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x + i, y: queen.y - i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x, y: queen.y + i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x, y: queen.y - i };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x + i, y: queen.y };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: queen.x - i, y: queen.y };
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            break;
        }
    }
    return possiblePositions;
}