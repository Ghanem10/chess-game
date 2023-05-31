import { samePosition } from "../constants/functions";
import { squareOccupied, SquareEmptyOrOccupiedByOpponent, squareOccupiedByOpponent, squareOccupiedByKing } from "../rules/reference";

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
  