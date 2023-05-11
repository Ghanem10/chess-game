import { samePosition } from "../functions/func";
import piecesRules from "./rules/rules";

export default function queenMove(previousX, previousY, x, y, team, chessBoard) {
    const boardWidthHeight = 8;
    const queen = new piecesRules();

    for (let i = 1; i < boardWidthHeight; i++) {
        // HORIZONTAL MOVEMENT
        if (y === previousY) {
            const multiplier = (x < previousX) ? -1 : 1;
            const passedPosition = { x: previousX + (i * multiplier), y: previousY };
            if (samePosition(passedPosition, x, y)) {
                if (queen.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (queen.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
        // VERTICAL MOVEMENT
        if (x === previousX) {
            const multiplier = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
            if (samePosition(passedPosition, x, y)) {
                if (queen.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (queen.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
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
                if (queen.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (queen.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}