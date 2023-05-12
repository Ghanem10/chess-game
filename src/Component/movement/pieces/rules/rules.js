import { Team, Type, samePosition } from '../../functions/func';
import { pawnMove, bishopMove, knightMove, rockMove, queenMove, kingMove } from './piecesEx';

export default class piecesRules {
    isEnpassantMove(previousX, previousY, x, y, type, team, chessBoard) {
        const PawnDiraction = team === Team.WHITE ? -1 : 1;
        
        if (type === Type.PAWN) {
            if ((x - previousX === -1 || x - previousX === 1) && y - previousY === PawnDiraction) {
                const piece = chessBoard.find((p) => samePosition(p, x, y - PawnDiraction) && p.EnpassantMove);
                if (piece) return true;
            }
        }
        return false;
    }
    SquareEmptyOrOccupiedByOpponent =(x, y, chessBoard, team) => {
        return (!this.squareOccupied(x, y, chessBoard) || this.squareOccupiedByOpponent(x, y, chessBoard, team));
      }

    squareOccupiedByOpponent(x, y, chessBoard, team) {
        const piece = chessBoard.find(t => samePosition(t, x, y) && t.team !== team);
        return piece ? true : false;
    }

    squareOccupied(x, y, chessBoard) {
        const square = chessBoard.find(pre => samePosition(pre, x, y));
        return square ? true : false;
    }

    isValid(previousX, previousY, x, y, type, team, chessBoard) {
        let validMove = false;

        switch(type) {
            case Type.PAWN:
                validMove = pawnMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.BISHOP:
                validMove = bishopMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.KNIGHT:
                validMove = knightMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.ROCK:
                validMove = rockMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.QUEEN:
                validMove = queenMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.KING:
                validMove = kingMove(previousX, previousY, x, y, type, team, chessBoard);
                break;
        }
        return validMove;
    }
}