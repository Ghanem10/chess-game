import { Type, Team } from "../movement/constants/functions";
import {
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves,
    getCastlingKingMoves,
} from '../movement/rules/piecesIndex';

export default class Board {
    
    /**
     * 
     * @param {Array} pieces - An array containing the piece Object.
     * 
     * @param {Function} setReviewMoves - A function to update pieces moves.
     * 
     * @param {number} piecesTurns - The number of turns to determine the current team.
     * 
     * 
     * ##NOTE: Moves in this class represent the possible moves where the piece
     *         can move to.
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
        
        const targetRook = this.pieces.find(
            (r) => this.samePosition(r, x, y)
        );

        const enpassant = this.isEnpassantMove(state, x, y, currentPiece, this.pieces);


        // Castle if the path to the targeted rock is true and not blocked by our or the enemy pieces.
        if (currentPiece.Piece === Type.KING && targetRook?.Piece === Type.ROCK && this.currentTeam) {

            
            // Determine which rock position is available, and find specify the potential position of the king.
            const direction = (targetRook.x - currentPiece.x > 0) ? 1 : -1;
            const newKingPosition = currentPiece.x + direction * 2;

            
            // Check if the rock and the king possible moves matches, whithout this it causes duplicates and potential bugs.
            const K = currentPiece.Piece === Type.KING && currentPiece.possibleMoves.some(
                (t) => this.samePosition(t, targetRook.x, targetRook.y)
            );
            
            // Loop through the pieces and if the king's and the rock's possible moves matches, perform castling.
            this.pieces.map((p) => {

                if (p.team === this.currentTeam) {
                    
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
            const EnpassantPawn = this.pieces.reduce((result, p) => {


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
    
    KingMovementsInCheck(gridx, gridy) {
        
        // Loop through all the pieces and filter the current team pieces.
        for (const piece of this.pieces.filter((t) => t.team === this.currentTeam)) {
            
            // Iterate over the current pieces' possible moves.
            for (const move of piece.possibleMoves) {

                // Deep cloning the positions of all the pieces by creating new object for each piece.
                let clonedChessBoard = this.pieces.map((q) => ({ ...q }));
                
                // Filter all the pieces possible moves by removing the piece's current move from the copied board.                
                clonedChessBoard = clonedChessBoard.filter((q) => !this.samePosition(q, move.x, move.y));
                
                // Find the cloned piece that corresponds to the current piece's position.
                let clonedPiecePosition = clonedChessBoard.find((t) => this.samePosition(t, piece.x, piece.y));

                
                // Update the cloned piece's position to the move's position.
                clonedPiecePosition.x = move.x;
                clonedPiecePosition.y = move.y;
                
                // At each iteration, clone the current king's position for later checks if its position is under attack by other pieces.
                const clonedKing = clonedChessBoard.find((p) => p.Piece === Type.KING && p.team === this.currentTeam);
    
                
                // Loop over the enemy pieces of the cloned chess board.
                for (const enemy of clonedChessBoard.filter((t) => t.team !== this.currentTeam)) {
                    
                    // Update the possible moves of the enemy's possible moves.
                    enemy.possibleMoves = this.getValidMove(enemy, clonedChessBoard);
                    
                    if (enemy.Piece === Type.PAWN) {

                        // Check if the possible moves of the pawn matches the cloned king's position - only the attack moves.
                        if (enemy.possibleMoves?.some((t) => this.samePosition(t, clonedKing.x, clonedKing.y))) {
                            
                            // Update the possible moves of the current pieces that doesn't matches the possible moves.
                            piece.possibleMoves = piece.possibleMoves?.filter((t) => !this.samePosition(t, move.x, move.y));
                        }
                    
                    } else {

                        // Check if the possible moves of the other enemy pieces match the cloned king's position.
                        if (enemy.possibleMoves?.some((t) => this.samePosition(t, clonedKing.x, clonedKing.y))) {
                        
                            // Update the possible moves of the current pieces of the current team that doesn't match the move.
                            piece.possibleMoves = piece.possibleMoves?.filter((t) => !this.samePosition(t, move.x, move.y));
                        }
                    }
                }
            }

            // Update the possible moves of the grabbed piece.
            if (this.samePosition(piece, gridx, gridy)) {

                // Update the possible moves of the current piece.
                this.setReviewMoves(piece.possibleMoves);
            }
        }
    }


    calculateAllMoves(gridx, gridy) {

        // This fn is triggere's the on-grab fn [chassBoard/component] to calcualte all moves.
        this.pieces.map((p) => {
            
            p.possibleMoves = this.getValidMove(p, this.pieces);
            
            if (p.team !== this.currentTeam) {
                p.possibleMoves = [];
            }
            
            if (this.samePosition(p, gridx, gridy)) {
                this.setReviewMoves(p.possibleMoves);
            }
            
            return p;
        });

        
        // Calculate king's moves for castling move by finding the target rock.
        for (const king of this.pieces.filter(
            (k) => k.Piece === Type.KING && k.team === this.currentTeam)
            ) {
            
            const previousKingPossibleMoves = king.possibleMoves
            const newCastlingPossibleMoves = getCastlingKingMoves(king, this.pieces);
           
            
            // Update the king possible moves with the matched rock position for castling.
            king.possibleMoves = [
                ...previousKingPossibleMoves,
                ...newCastlingPossibleMoves
            ];
        }

        this.KingMovementsInCheck(gridx, gridy);
    }


    checkMate() {

        // TODO, refactor this code after implementing the calcualte fn for getting the moves correctly.
        
        const king = this.pieces.find((k) => k.Piece === Type.KING && k.team !== this.currentTeam);
        const current = this.pieces.filter((l) => l.team === this.currentTeam);
        

        king.possibleMoves = this.getValidMove(king, this.pieces);

        const a = [];
        let check = false;

        for (const move of king.possibleMoves) {
            let valid = true;

            for (const enemy of this.pieces.filter((t) => t.team === this.currentTeam)) {
                enemy.possibleMoves = this.getValidMove(enemy, this.pieces);

                if (enemy.Piece === Type.PAWN) {
                    if (enemy.possibleMoves.some((t) => this.samePosition(t, move.x, move.y))) {
                        valid = false;
                    }
                    if (enemy.possibleMoves.some((t) => this.samePosition(t, king.x, king.y))) {
                        check = true;
                    }
                } else { 
                    if (enemy.possibleMoves.some((t) => this.samePosition(t, move.x, move.y))) {
                        valid = false;
                    }
                    if (enemy.possibleMoves.some((t) => this.samePosition(t, king.x, king.y))) {
                        check = true;
                    }
                }
            }

            if (valid) {
                a.push(move);
            }
        }

        king.possibleMoves = a;

        if (king.possibleMoves <= 0 && check) {

            for (const move of current) {

                move.possibleMoves = this.getValidMove(move, this.pieces);
                
                if (move.possibleMoves.every((t) => t.length <= 0)) {
                    
                    this.setisCheckMate(true);
                }
            }
        }
    }
}