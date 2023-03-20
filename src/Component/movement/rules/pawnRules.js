export const Team = {
    BLACK: 'black',
    WHITE: 'white'
};
export const PieceType = {
    PAWN: 'pawn',
    BISHOP: 'bishop',
    KNIGHT: 'knight',
    ROCK: 'rock',
    KING: 'king',
    QUEEN: 'queen'
};

export default class piecesRules {

    squareOccupied(x, y, chessBoard) {
        const square = chessBoard.find((CurrentIdx) => CurrentIdx.x === x && CurrentIdx.y === y);
        return square ? true : false;
    }

    isOccupied(previousX, previousY, x, y, type, team, chessBoard) {

        if (type === PieceType.PAWN) {
            if (team === Team.WHITE) {
                if (previousY === 6) {
                    if (previousX === x && previousY - y === 1) {
                        if (!this.squareOccupied(x, y, chessBoard)) {
                            return true;
                        }
                    }else if (previousX === x && previousY - y === 2) {
                        if (!this.squareOccupied(x, y, chessBoard) && !this.squareOccupied(x, y + 1, chessBoard)) {
                            return true;
                        }
                    }
                }else {
                    if (previousX === x && (previousY - y === 1)) {
                        if (!this.squareOccupied(x, y, chessBoard)) {
                            return true;
                        }
                    }
                }
            }else {
                if (previousY === 1) {
                    if (previousX === x && y - previousY === 1) {
                        if (!this.squareOccupied(x, y, chessBoard)) {
                            return true;
                        }
                    } else if (previousX === x && y - previousY === 2) {
                        if (!this.squareOccupied(x, y, chessBoard) && !this.squareOccupied(x, y - 1, chessBoard)) {
                            return true;
                        }
                    }
                }else {
                    if (previousX === x && (y - previousY === 1)) {
                        if (!this.squareOccupied(x, y, chessBoard)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}