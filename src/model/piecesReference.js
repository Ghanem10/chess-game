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
    constructor(piece, setHighlight, highlight) {
        this.piece = piece;
        this.setHighlight = setHighlight;
        this.highlight = highlight;
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

    isKing(piece) {
        return piece.Piece === Type.KING;
    }
    
    opponentMatchPosition(king, opponent) {
        if (Array.isArray(opponent)) {
            const t = opponent.some(t => king.x === t.x && king.y === t.y);
            if (t) {
                console.log(opponent, king);
            }
        }
    }

    opponentMatchPosition(king, opponent) {
        if (Array.isArray(opponent)) {
            const match = opponent.some(op => king.x === op.x && king.y === op.y);
            return match;
        }
        return false;
    }
      
      calculateAllMoves(gridx, gridy) {
        this.piece.map((p) => {
            if (this.samePosition(p, gridx, gridy)) {
                p.possibleMoves = this.getValidMove(p, this.piece);
                this.setHighlight(p.possibleMoves);
            }
            return p;
        });
      
        const kingPosition = this.piece.find(t => t.Piece === Type.KING && t.team === Team.WHITE);
        
        if (Array.isArray(kingPosition.possibleMoves)) {
            const validMoves = [];
      
            for (const kingMove of kingPosition.possibleMoves) {
                let isValidMove = true;
        
                for (const piece of this.piece) {
                    if (piece.team === Team.BLACK) continue;
                    if (piece.Piece === Type.PAWN) continue;
            
                    if (this.opponentMatchPosition(kingMove, piece.possibleMoves)) {
                        isValidMove = false;
                        break;
                    }
                }
        
                if (isValidMove) {
                   validMoves.push(kingMove);
                }
            }
            // console.log(validMoves);
        }
    }
      
    isEnpassantMove(previousX, previousY, x, y, type, team, chessBoard) {
        const PawnDiraction = team === Team.WHITE ? -1 : 1;
        
        if (type === Type.PAWN) {
            if ((x - previousX === -1 || x - previousX === 1) && y - previousY === PawnDiraction) {
                const piece = chessBoard.find((p) => this.samePosition(p, x, y - PawnDiraction) && p.EnpassantMove);
                if (piece) return true;
            }
        }
        return false;
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