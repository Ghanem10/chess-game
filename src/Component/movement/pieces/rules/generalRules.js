import { Team, Type, samePosition } from '../../constants/functions';
import { 
    pawnMove, 
    bishopMove, 
    knightMove, 
    rockMove, 
    queenMove, 
    kingMove,
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves
} from './piecesIndex';

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
                validMove = kingMove(previousX, previousY, x, y, team, chessBoard);
                break;
        }
        return validMove;
    }

    getValidMove(piece, chessBoard) {
        switch(piece.Piece) {
            case Type.PAWN:
                return getPossiblePawnMoves(piece, chessBoard);
            case Type.BISHOP:
                return getPossibleBishopMoves(piece, chessBoard);
            case Type.KNIGHT:
                return getPossibleKnightMoves(piece, chessBoard);
            case Type.KING:
                return getPossibleKingMoves(piece, chessBoard);
            case Type.QUEEN:
                return getPossibleQueenMoves(piece, chessBoard);
            case Type.ROCK:
                return getPossibleRookMoves(piece, chessBoard);
            default:
                return [];
        }
    }
}