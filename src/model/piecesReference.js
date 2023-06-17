import { Type, Team } from "../movement/constants/functions";
import {
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves,
    pawnAttacks
} from '../movement/rules/piecesIndex';

export default class Board {
    constructor(piece, setHighlight, highlight, piecesTurns) {
        this.piece = piece;
        this.setHighlight = setHighlight;
        this.highlight = highlight;
        this.piecesTurns = piecesTurns;
    }

    currentTeam() {
        const team = this.piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;
        return team;
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
    
    opponentMatchPosition(king, opponent) {
        const match = opponent.filter(op => king.x === op.x && king.y === op.y);
        if (match.length <= 0) return;
        return match ? true : false;
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
    
    calculateAllMoves(gridx, gridy) {
        this.piece.map((p) => {
            p.possibleMoves = this.getValidMove(p, this.piece);
            if (p.team !== this.currentTeam()) {
                p.possibleMoves = [];
            }
            this.setHighlight(p.possibleMoves);
            return p;
        });
        this.possiblePiecesMoves();
        this.checkingTheKing(gridx, gridy);
    }
    
    checkingTheKing(gridx, gridy) {
        const king = {
            [Team.WHITE]: this.piece.find(t => t.Piece === Type.KING && t.team === Team.WHITE),
            [Team.BLACK]: this.piece.find(t => t.Piece === Type.KING && t.team === Team.BLACK)
        }

        const validKingMoves = (king) => {
            const validMoves = [];
            for (const kingMove of king.possibleMoves) {
                let isValidMove = true;
                const hasProtection = this.piece
                    .find(p => this.samePosition(p, kingMove.x, kingMove.y) && p.team !== king.team);
                if (hasProtection) {
                    this.piece = this.piece
                        .filter(p => !this.samePosition(p, kingMove.x, kingMove.y));
                }
                for (const piece of this.piece) {
                    if (piece.team === king.team) continue;
                    const possibleMovesPiece = this.getValidMove(piece, this.piece);
                    if (piece.Piece === Type.PAWN) {
                        const possiblePawn = pawnAttacks(piece, this.piece);
                        if (this.opponentMatchPosition(kingMove, possiblePawn)) {
                            isValidMove = false;
                        }
                    } 
                    else if (this.opponentMatchPosition(kingMove, possibleMovesPiece)) {
                        isValidMove = false;
                    }
                }

                if (isValidMove) {
                    validMoves.push(kingMove);
                }
            }
            return validMoves;
        }; 

        const whiteKing = validKingMoves(king[Team.WHITE]);
        const blackKing = validKingMoves(king[Team.BLACK]);

        this.piece.map((p) => {
            if (this.samePosition(p, gridx, gridy)) {
                if (p.Piece === Type.KING && p.team === Team.WHITE) {
                    p.possibleMoves = whiteKing;
                } else if (p.Piece === Type.KING && p.team === Team.BLACK) {
                    p.possibleMoves = blackKing;
                } 
                if (p.team !== this.currentTeam()) {
                    p.possibleMoves = [];
                }
                this.setHighlight(p.possibleMoves);
            }
            return p;
        });
    }
    
    possiblePiecesMoves() {
        for (const p of this.piece.filter(t => t.team === this.currentTeam())) {
            const king = this.piece
                .find(o => o.Piece === Type.KING && o.team === this.currentTeam());
            for (const enemy of this.piece.filter(t => t.team !== this.currentTeam())) {
                enemy.possibleMoves = this.getValidMove(enemy, this.piece);
                const check = enemy.possibleMoves.some(t => this.samePosition(t, king.x, king.y));
                if (check) {
                    const ours = p.possibleMoves.filter(t => this.opponentMatchPosition(t, enemy.possibleMoves));
                    if (ours) {
                        if (p.Piece !== Type.KING) {
                            p.possibleMoves = ours;
                            this.setHighlight(p.possibleMoves)
                        }
                    }                    
                }
            }
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
}