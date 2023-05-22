import { Type, Team } from "../movement/constants/functions";
import {
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves
} from '../movement/rules/piecesIndex';

export default class Board {
    constructor(piece) {
        this.piece = piece;
    }

    samePosition(piece, x, y) {
        return piece.x === x && piece.y === y;
    }

    promotePawn(piece, y, setPawn, titleRef) {
        const promotionPawn = piece.team === Team.WHITE ? 0 : 7;
        if (y === promotionPawn && piece.Piece === Type.PAWN) {
            titleRef.current.classList.remove("hide-title");
            setPawn(piece);
        }
    }

    updateCoordinates(piece, x, y) {
        piece.x = x;
        piece.y = y;
    }

    updateEnpassantMove(piece, state, y) {
        piece.EnpassantMove = Math.abs(state.coordinates.GridY - y) === 2;
    }

    playMove(x, y, titleRef, state, setPawn, enpassant, PawnDir, setPiece, validMove) {
        if (enpassant) {
            const EnpassantPawn = this.piece.reduce((result, p) => {
                if (this.samePosition(p, state.coordinates.GridX, state.coordinates.GridY)) {
                    p.EnpassantMove = false;
                    this.updateCoordinates(p, x, y);
                    result.push(p);
                } else if (!this.samePosition(p, x, y - PawnDir)) {
                    p.EnpassantMove = false;
                    result.push(p);
                }
                return result;
            }, []);
            setPiece(EnpassantPawn);
        } else if (validMove) {
            const pawns = this.piece.reduce((result, p) => {
                if (this.samePosition(p, state.coordinates.GridX, state.coordinates.GridY)) {
                    this.updateEnpassantMove(p, state, y);
                    this.updateCoordinates(p, x, y);
                    this.promotePawn(p, y, setPawn, titleRef);
                    result.push(p);
                } else if (!this.samePosition(p, x, y)) {
                    p.EnpassantMove = false;
                    result.push(p);
                }
                return result;
            }, []);
            setPiece(pawns);
        } else {
            return false;
        }
        return true;
    }

    calculateAllMoves() {
        for (const piece of this.piece) {
            if (Array.isArray(piece.possibleMoves)) {
                piece.possibleMoves = this.getValidMove(piece, this.piece);
                console.log(piece.possibleMoves);
            }
        }
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