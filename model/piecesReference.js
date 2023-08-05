import { Type, Team } from "../movement/constants/functions";
import {
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves,
    getPossibleAttackPawnMoves,
    getCastlingKingMoves,
} from '../movement/rules/piecesIndex';

export default class Board {
    
    /**
     * 
     * @param {Array} piece - An array containing the piece Object.
     * 
     * @param {Function} setHighlight - A function to update pieces moves.
     * 
     * @param {number} piecesTurns - The number of turns to determine the current team.
     * 
     * 
     * ##NOTE: Moves in this class represent the possible moves where the piece
     *         can move to.
     */

    constructor(piece, setHighlight, highlight, piecesTurns) {
        this.piece = piece;
        this.setHighlight = setHighlight;
        this.highlight = highlight;
        this.piecesTurns = piecesTurns;
    }

    currentTeam() {
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

    // Calculate the en-passant move for the pawns, and return false if !hasEn-passant.
    isEnpassantMove(state, x, y, currentPiece, chessBoard) {
        const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;
        
        if (currentPiece.Piece === Type.PAWN) {
            
            // Check the col of the enemy piece and if has-Enpassant property is true, then move across.
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

    // If this function returns true, then, a move has been successfully made - otherwise false.
    playMove(x, y, state, currentPiece, promotePawn, PawnDir, setPiece, validMove) {
        
        const targetRook = this.piece.find(
            (r) => this.samePosition(r, x, y)
        );

        const enpassant = this.isEnpassantMove(state, x, y, currentPiece, this.piece);


        // Castle if the path to the targeted rock is true and not blocked by our or the enemy pieces.
        if (currentPiece.Piece === Type.KING && targetRook?.Piece === Type.ROCK && this.currentTeam()) {

            
            // Determine which rock position is available, and find specify the potential position of the king.
            const direction = (targetRook.x - currentPiece.x > 0) ? 1 : -1;
            const newKingPosition = currentPiece.x + direction * 2;

            
            // Check if the rock and the king possible moves matches, whithout this it causes duplicates and potential bugs.
            const K = currentPiece.Piece === Type.KING && currentPiece.possibleMoves.some(
                (t) => this.samePosition(t, targetRook.x, targetRook.y)
            );
            
            // Loop through the pieces and if the king's and the rock's possible moves matches, perform castling.
            this.piece.map((p) => {

                if (p.team === this.currentTeam()) {
                    
                    // We check if the position to drop the piece matches the rock possible moves
                    if (p.Piece === currentPiece.Piece && K) {
                        p.x = newKingPosition;
                        
                        // 
                    } else if (this.samePosition(p, targetRook.x, targetRook.y) && K) {
                        p.x = newKingPosition - direction;
                    }
                }
                
                return p;
            });
        } 
        
        if (enpassant) {

            // If the property of the pawn [is-Enpassant] is true, then we eliminate the enemy piece.
            const EnpassantPawn = this.piece.reduce((result, p) => {


                // When the pawn on it's first rank and moved two square up, then, its enpassant is true.
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

            // This returns true only if the piece position is matches the dropping position. See ./ReferenceBoard.
            const pawns = this.piece.reduce((result, p) => {
            
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
    
    // Get all the piece's calculated possible moves based on the piece type.
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

    matchedOpponentMoves(s, kingMoves) {
        return kingMoves.some((m) => m.x === s.x && m.y === s.y);
    }

    findAttackingPath(king, enemy) {
        // todo, remove the path that doesn't 
        // have a king from an array.

        const pathToKingPosition = [];

        let pathExist = true;
        let stackAttackPath = [];

        // Iterate through the enemy moves to check if it matches the king moves matches.
        for (const moves of enemy.possibleMoves) {
                
            // Once the king position is reached, push the stack of the path to the king.
            if (this.samePosition(moves, king.x, king.y)) {
                
                pathToKingPosition.push(...stackAttackPath);
                
                pathExist = false;
            } 

            stackAttackPath.push(moves);

            // break if the path to the king' position has reached.
            if (!pathExist) {
                break;
            }
        }

        return pathToKingPosition;
    }
    
    // This fn contains the logic for updating piece's moves, and [king-protection, pinned-piece, valid-kingmoves].
    kingMovementsAndProtection(gridx, gridy) {

        // Find the king piece position of the current team.
        const king = this.piece.find(
            (t) => t.Piece === Type.KING && t.team === this.currentTeam()
        );
        
        const validMoves = [];

        // Loop through the king's moves to track when the king is in-check.
        for (const kingMove of king.possibleMoves) {
            
            let valid = true;
        
            // If any of the enemy pieces support the piece that's being attacked by the king.
            const hasProtection = this.piece.find(
                (enemy) => this.samePosition(enemy, kingMove.x, kingMove.y) && enemy.team !== king.team
            );

            
            // Then, the piece is not up for grab if it's proctected by its own pieces - ['king can't attack it'].
            if (hasProtection) {
                this.piece = this.piece.filter(
                    (enemy) => !this.samePosition(enemy, kingMove.x, kingMove.y)
                );
            }

            // Loop though the enemy pieces to track when the enemy piece delivers check to the king.
            for (const enemy of this.piece.filter((t) => t.team !== this.currentTeam())) {
                
                // Get their possible moves to make the necessary comparison.
                const possibleMovesPiece = this.getValidMove(enemy, this.piece);


                // Tracking the path from the enemy piece to the king when it delivers check.
                const pathToKingPosition = this.findAttackingPath(king, enemy);
                

                // Checking the enemy piece type to remove the invalid moves for the king.
                if (enemy.Piece === Type.PAWN) {
                    
                    const attackPawnMoves = getPossibleAttackPawnMoves(enemy, this.piece);

                    // Loop through the pawn attacking moves and update the king valid moves accordingly.
                    if (attackPawnMoves?.some(
                        (t) => t.x !== king.x && this.samePosition(t, kingMove.x, kingMove.y)
                        )) {

                        valid = false;
                    }
                } else {
                    
                    // Loop through the other pieces, excluding the king, and remove any king moves matches.
                    if (possibleMovesPiece?.some((t) => this.samePosition(t, kingMove.x, kingMove.y))) {
                        
                        valid = false;
                
                        this.piece
                        .filter((p) => p.team === this.currentTeam())
                        .forEach((p) => {
                            p.possibleMoves = p.possibleMoves.filter((move) =>
                                possibleMovesPiece.some(t => this.matchedOpponentMoves(t, [move]))
                            );
                            
                            this.setHighlight(p.possibleMoves);
                        });
                    }
                }
            }

            // Update the valid moves for the king.
            if (valid) {
                validMoves.push(kingMove);
            }
        }

        // Iterate through the current pieces to update the king's valid moves.
        this.piece.map((p) => {
            
            if (this.samePosition(p, gridx, gridy)) {
                
                // Update the king's moves with the valid moves.
                if (p.Piece === Type.KING) {
                    p.possibleMoves = validMoves;
                }

                // Remove the team moves if it's not playing.
                if (p.team !== this.currentTeam()) {
                    p.possibleMoves = [];
                }
            
                // Update the possible moves of all pieces.
                this.setHighlight(p.possibleMoves);
            }

            return p;
        });
    }

    calculateAllMoves(gridx, gridy) {

        // This fn is triggere's the on-grab fn [chassBoard/component] to calcualte all moves.
        this.piece.map((p) => {
            
            p.possibleMoves = this.getValidMove(p, this.piece);
            this.setHighlight(p.possibleMoves);

            return p;
        });

        
        // Calculate king's moves for castling move by finding the target rock.
        for (const king of this.piece.filter(
            (k) => k.Piece === Type.KING && k.team === this.currentTeam())
            ) {
            
            const previousKingPossibleMoves = king.possibleMoves
            const newCastlingPossibleMoves = getCastlingKingMoves(king, this.piece);
           
            
            // Update the king possible moves with the matched rock position for castling.
            king.possibleMoves = [
                ...previousKingPossibleMoves,
                ...newCastlingPossibleMoves
            ];
        }

        // Todo, All the moves must be calculate when you drop the piece, not on grabbing the piece.
        this.kingMovementsAndProtection(gridx, gridy);
    }
}