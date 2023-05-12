import { samePosition } from "../functions/func";
import piecesRules from "./rules/rules";

export default function kingMove(previousX, previousY, x, y, type, team, chessBoard) {
    const boardWidthHeight = 2;
    const king = new piecesRules();
    
    for (let i = 1; i < boardWidthHeight; i++) {

        // KING MOVEMENT
        const multiplierX = (x < previousX) ? -1 : (x > previousX) ? 1 : 0;
        const multiplierY = (y < previousY) ? -1 : (y > previousY) ? 1 : 0;
        const passedPosition = { x: previousX + (i * multiplierX), y: previousY + (i * multiplierY) };
        
        if (samePosition(passedPosition, x, y)) {
            if (king.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                return true;
            }
        }else {
            if (king.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                break;
            }
        }
    }
    return false;
}