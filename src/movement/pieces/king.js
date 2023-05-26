import { samePosition } from "../constants/functions";
import { squareOccupied, SquareEmptyOrOccupiedByOpponent, squareOccupiedByOpponent } from "../rules/reference";

export const kingMove = (previousX, previousY, x, y, team, chessBoard) => {
    const boardWidthHeight = 2;
    
    for (let i = 1; i < boardWidthHeight; i++) {

        // KING MOVEMENT
        const multiplierX = (x < previousX) ? -1 : (x > previousX) ? 1 : 0;
        const multiplierY = (y < previousY) ? -1 : (y > previousY) ? 1 : 0;
        const passedPosition = { x: previousX + (i * multiplierX), y: previousY + (i * multiplierY) };
        
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
    return false;
}

export function getPossibleKingMoves(king, chessBoard) {
    const possiblePositions = [];
    const boardWidthHeight = 2;
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x + i, y: king.y + i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x - i, y: king.y + i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x - i, y: king.y - i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x + i, y: king.y - i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x, y: king.y + i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x, y: king.y - i };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x + i, y: king.y };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    for (let i = 1; i < boardWidthHeight; i++) {
        const passedPosition = { x: king.x - i, y: king.y };
        const insideBoardPositions = passedPosition.x < 8 && passedPosition.y < 8 && passedPosition.x > -1 && passedPosition.y > -1;
        if(!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
            possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
        } else {
            if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
            break;
        }
    }
    return possiblePositions;
}