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

    squareOccupiedByOpponent(x, y, chessBoard, team) {
        const piece = chessBoard.find(t => t.x === x && t.y === y && t.team !== team);
        return piece ? true : false;
    }

    squareOccupied(x, y, chessBoard) {
        const square = chessBoard.find(pre => pre.x === x && pre.y === y);
        return square ? true : false;
    }

    isOccupied(previousX, previousY, x, y, type, team, chessBoard) {

        if (type === PieceType.PAWN) {
            const initialRow = team === Team.WHITE ? 6 : 1;
            const PawnDiraction = team === Team.WHITE ? -1 : 1;

            // LEGEL MOVEMENT
            if (previousX === x && (y - previousY === PawnDiraction)) {
                if (!this.squareOccupied(x, y, chessBoard)) {
                    return true;
                }
            } else if (previousY === initialRow && previousX === x && (y - previousY === PawnDiraction * 2)) {
                if (!this.squareOccupied(x, y, chessBoard) && !this.squareOccupied(x, y - PawnDiraction, chessBoard)) {
                    return true;
                }
            }

            // CAPTURE MOVEMENT
            else if (x - previousX === -1 && y - previousY === PawnDiraction) {
                console.log("upper left");
                if (this.squareOccupiedByOpponent(x, y, chessBoard, team)) {
                    return true;
                }
            }else if (x - previousX === 1 && y - previousY === PawnDiraction) {
                console.log("upper right");
                if (this.squareOccupiedByOpponent(x, y, chessBoard, team)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}