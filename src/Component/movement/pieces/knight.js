import piecesRules from "./rules";

export default function knightMove(previousX, previousY, x, y, team, chessBoard) {
    const boardWidthHieght = 2;
    const knight = new piecesRules();

    for (let i = -1; i < boardWidthHieght; i+= 2) {
        for (let j = -1; j < boardWidthHieght; j++) {
            // TOP AND BOTTOM
            if (y - previousY === 2 * i) {
                if (x - previousX === j) {
                    if (knight.SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                        return true;
                    }
                }
            }
            // LEFT AND RIGHT
            if (x - previousX === 2 * i) {
                if (y - previousY === j) {
                    if (knight.SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}