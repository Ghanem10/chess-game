import { Type, Team } from "./movement/constants/functions";
import {
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves,
    getCastlingKingMoves,
} from './movement/rules/piecesIndex';

export default class Board {
    
    /**
     * 
     * @param {Array} pieces - An array containing the piece Object.
     * @param {state} setReviewMoves - A state to update pieces moves.
     * @param {number} piecesTurns - The number of turns to determine the current team.
     * @param {*.Piece} pieceType - e.g White - Black.
     * 
     */

    constructor(pieces, setReviewMoves, piecesTurns, setisCheckMate) {
        this.pieces = pieces;
        this.setReviewMoves = setReviewMoves;
        this.piecesTurns = piecesTurns;
        this.setisCheckMate = setisCheckMate;
    }

    get currentTeam() {
        return this.piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;
    }

    samePosition(piece, x, y) {
        return piece.x === x && piece.y === y;
    }

    updateCoordinates(piece, x, y) {
        piece.x = x;
        piece.y = y;
    }

    updateEnpassantMove(piece, state, y) {
        piece.EnpassantMove = Math.abs(state.coordinates.GridY - y) === 2;
    }

    isEnpassantMove(state, x, y, currentPiece, chessBoard) {
        const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;
        
        if (currentPiece.Piece === Type.PAWN) {

            if ((x - state.coordinates.GridX === -1 || x - state.coordinates.GridX === 1)
                && y - state.coordinates.GridY === PawnDiraction) {

                const piece = chessBoard.find(
                    (p) => this.samePosition(p, x, y - PawnDiraction) 
                        && p.EnpassantMove && p.Piece === Type.PAWN
                );
                
                return piece ? true : false;
            }
        }

        return false;
    }

    playMove(x, y, state, currentPiece, promotePawn, setPiece, validMove) {
        
        const PawnDir = currentPiece.team === Team.WHITE ? -1 : 1;
        const enpassant = this.isEnpassantMove(state, x, y, currentPiece, this.pieces);

        const targetRook = this.pieces.find((r) => this.samePosition(r, x, y) && r.team === currentPiece.team);
        
        const pathNotBlocked = currentPiece.Piece === Type.KING && currentPiece.possibleMoves.some(
            (t) => this.samePosition(t, targetRook?.x, targetRook?.y)
        );

        if (currentPiece.Piece === Type.KING && targetRook?.Piece === Type.ROCK && this.currentTeam) {

            const direction = (targetRook.x - currentPiece.x > 0) ? 1 : -1;
            const newKingPosition = currentPiece.x + direction * 2;

            this.pieces.map((p) => {

                if (p.team === this.currentTeam) {

                    if (p.Piece === currentPiece.Piece && pathNotBlocked) {
                        p.x = newKingPosition;

                    } else if (this.samePosition(p, targetRook.x, targetRook.y) && pathNotBlocked) {
                        p.x = newKingPosition - direction;
                    }
                }
                
                return p;
            });
        } 
        
        if (enpassant) {

            const EnpassantPawn = this.pieces.reduce((result, p) => {
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

            const pawns = this.pieces.reduce((result, p) => {
            
                if (this.samePosition(p, state.coordinates.GridX, state.coordinates.GridY)) {

                    if (p.Piece === Type.KING || p.Piece === Type.ROCK) {
                        p.hasmoved = true;
                    }

                    this.updateEnpassantMove(p, state, y);
                    this.updateCoordinates(p, x, y);

                    promotePawn(p);
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


    KingMovementsInCheck(gridx, gridy) {
        
        for (const piece of this.pieces.filter((t) => t.team === this.currentTeam)) {
            for (const move of piece.possibleMoves) {

                let clonedChessBoard = this.pieces.map((q) => ({ ...q }));
                
                clonedChessBoard = clonedChessBoard.filter((q) => !this.samePosition(q, move.x, move.y));
                let clonedPiecePosition = clonedChessBoard.find((t) => this.samePosition(t, piece.x, piece.y));

                clonedPiecePosition.x = move.x;
                clonedPiecePosition.y = move.y;
                
                const clonedKing = clonedChessBoard.find((p) => p.Piece === Type.KING && p.team === this.currentTeam);
    
                for (const enemy of clonedChessBoard.filter((t) => t.team !== this.currentTeam)) {
                    
                    enemy.possibleMoves = this.getValidMove(enemy, clonedChessBoard);
                    
                    if (enemy.Piece === Type.PAWN) {

                        if (enemy.possibleMoves?.some((t) => this.samePosition(t, clonedKing.x, clonedKing.y))) {
                            piece.possibleMoves = piece.possibleMoves?.filter((t) => !this.samePosition(t, move.x, move.y));
                        }
                    
                    } else {
                        if (enemy.possibleMoves?.some((t) => this.samePosition(t, clonedKing.x, clonedKing.y))) {
                            piece.possibleMoves = piece.possibleMoves?.filter((t) => !this.samePosition(t, move.x, move.y));
                        }
                    }
                }
            }

            if (this.samePosition(piece, gridx, gridy)) {
                this.setReviewMoves(piece.possibleMoves);
            }
        }
    }


    calculateAllMoves(gridx, gridy) {

        for (const p of this.pieces.filter((t) => t.team === this.currentTeam)) {
            p.possibleMoves = this.getValidMove(p, this.pieces);
        }
        
        for (const king of this.pieces.filter((t) => t.team === this.currentTeam && t.Piece === Type.KING)) {
            const previousKingPossibleMoves = king.possibleMoves
            const newCastlingPossibleMoves = getCastlingKingMoves(king, this.pieces);
        
            king.possibleMoves = [
                ...previousKingPossibleMoves,
                ...newCastlingPossibleMoves
            ];
        }

        this.KingMovementsInCheck(gridx, gridy);
        
        if (this.pieces.filter((t) => t.team === this.currentTeam).some((m) => m.possibleMoves.length > 0)) return;

        this.setisCheckMate(true);
    }
}