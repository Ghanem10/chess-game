import piecesRules from "./rules/rules";

export default function rockMove(previousX, previousY, x, y, team, chessBoard) {
    const boardWidthHieght = 8;
    const rock = new piecesRules();

    // VERTICAL MOVEMENT
    if (previousX === x) {
        for (let i = 1; i < boardWidthHieght; i++) {
            const multiplier = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (rock.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (rock.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
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
                console.log("virtically")
                if (rock.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (rock.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}