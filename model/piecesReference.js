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

    findAttackingPath(king, enemy) {
        
        /**
         * @summary { Loop and check the direction of the king.x - enemy.x }
         * 
         * A different solution is to use the sign method in JS
         * as it returns the sign of x whether it's positive or not.
         * 
         * Then, we simply increment the enemy's x and y until we reach the
         * king's position.
         * 
        */

        // Store the moves that leads to the king's position.
        const pathToKingPosition = [];
        
        // Check which direction is the king is at.
        const x = Math.sign(king.x - enemy.x);
        const y = Math.sign(king.y - enemy.y);

        // Store the enemy position in a new variable so we can custom the iteration.
        let newEnemyPositionX = enemy.x;
        let newEnemyPositionY = enemy.y;

        // When the new Enemy position isn't in the king's reach keep looking until you find it.
        while (newEnemyPositionX !== king.x || newEnemyPositionY !== king.y) {

            // Push the positions of the new calcualted enemy piece as we reach the king's position.
            pathToKingPosition.push({ x: newEnemyPositionX, y: newEnemyPositionY });
    
            // Increment the new position of the enemy piece with
            // the direction.
            newEnemyPositionX += x;
            newEnemyPositionY += y;
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

            // Copy the all the pieces positions so we can know if the piece is procted by its own pieces.
            const clonPiecesPositions = Object.assign([], this.piece);
        
            // If any of the enemy pieces support the piece that's being attacked by the king.
            const enemyPositionMatchedKing = this.piece.find(
                (enemy) => this.samePosition(enemy, kingMove.x, kingMove.y) && enemy.team !== king.team
            );
            
            // Then, the piece is not up for grab if it's proctected by its own pieces - ['king can't attack it'].
            if (enemyPositionMatchedKing) {
                
                // remove the enemy that has x, y from the board. This way we know that the piece's position
                // is protected by its own pieces.
                const copyNewArrayOfPiece = this.piece.filter((m) => !this.samePosition(m, kingMove.x, kingMove.y));
                
                // Iterate over the new copyed array, excluding the piece that matches the king's x & y position
                for (const move of copyNewArrayOfPiece) {

                    // Check if the position of the removed piece has any possible moves of the other pieces.
                    if (move.possibleMoves?.some((o) => this.samePosition(o, kingMove.x, kingMove.y))) {
                        
                        // remove it from the king's possible moves, as the
                        // piece is protected by its own pieces.
                        this.piece = this.piece.filter((t) => !this.samePosition(t, kingMove.x, kingMove.y));
                    }
                }

                // After that update the array with the cloned pieces to re-insert the removed piece.
                this.piece = clonPiecesPositions;
            }

            // Loop though the enemy pieces to track when the enemy piece delivers check to the king.
            for (const enemy of this.piece.filter((t) => t.team !== this.currentTeam())) {
                
                
                // Get their possible moves to make the necessary comparison.
                const possibleMovesPiece = this.getValidMove(enemy, this.piece);
                
                // Checking the enemy piece type to remove the invalid moves for the king.
                if (enemy.Piece === Type.PAWN) {
                    
                    const attackPawnMoves = getPossibleAttackPawnMoves(enemy, this.piece);

                    // Loop through the pawn attacking moves and update the king valid moves accordingly.
                    if (attackPawnMoves?.some((t) => this.samePosition(t, kingMove.x, kingMove.y))) {

                        valid = false;
                    }
                    
                    if (possibleMovesPiece?.some((t) => this.samePosition(t, king.x, king.y))) {

                        // Iterate over the current team moves and check at what position the pawn is located - to remove it.
                        this.piece.filter((p) => p.team === this.currentTeam())
                        .forEach((p) => {

                            // Filter the moves of the king's team that matches the attacking pawn position.
                            p.possibleMoves = p.possibleMoves.filter(
                                (pos) => this.samePosition(pos, enemy.x, enemy.y)
                            );

                            // Update the possible moves of all pieces.
                            this.setHighlight(p.possibleMoves);
                        });
                    }
                   
                } else {
                    // If the enemy's possible moves matches the king's possible moves, then, that square isn't valid. 
                    if (possibleMovesPiece?.some((t) => this.samePosition(t, kingMove.x, kingMove.y))) {
                   
                        valid = false;
                    }
                    
                    // If the enemy's possible moves matches the king's moves position, then block by other pieces.
                    if (possibleMovesPiece?.some((t) => this.samePosition(t, king.x, king.y))) {

                        // Tracking the path from the enemy piece to the king when it delivers check.
                        const pathToKingPosition = this.findAttackingPath(king, enemy);

                        //  Iterate over the current team moves and check at positions of the attacking piece - to remove/cover it.
                        this.piece.filter((p) => p.team === this.currentTeam())
                        .forEach((p) => {

                            // Capture the enemy when it's under attack - [When king's position isEqual to enemy [x, y]].
                            if (this.samePosition(enemy, kingMove.x, kingMove.y)) {

                                // Only filter the moves of the current team that matches the attacking piece x & y.
                                p.possibleMoves = p.possibleMoves.filter((pos) => this.samePosition(pos, enemy.x, enemy.y));

                            } else {

                                // Update the moves of the pieces that matches the path where the enemy gave a check from and its position.
                                p.possibleMoves = p.possibleMoves.filter(
                                    (pos) => pathToKingPosition.some(
                                        (m) => this.samePosition(pos, m.x, m.y) || this.samePosition(pos, enemy.x, enemy.y)
                                    )
                                );
                            }
    
                            // Update the possible moves of all pieces.
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


    /**
    
        * @todo { king's checkmating attacks }
    
    */

    // When the piece unlocks the path for a check from another piece to the enemy king.
    discoverCheck() {}


    // When the two enemy pieces deliver a check at the same time.
    doubleCheck() {}

    // When the knight delivers a check to the enemy king and the king has no moves to make.
    smotheredMate() {}


    // When the king is not in-check and has no moves or its pieces moves to make.
    steelMate() {}


    // When the king is in-check and has no moves or no pieces to cover or remove the attacking piece.
    checkMate() {
        
        // Find the king piece position of the current team.
        const king = this.piece.find(
            (t) => t.Piece === Type.KING && t.team === this.currentTeam()
        );

        // Loop over our current pieces, and check if the king is in-check
        for (const currentPieces of this.piece.filter((t) => t.team === this.currentTeam())) {

            // Loop through the enemy pieces to check if the king is in-check.
            for (const enemy of this.piece.filter((e) => e.team !== this.currentTeam())) {

                // When the enemys' possible moves matches the king's position, then, we know that the king is in-check.
                if (enemy.possibleMoves.some((m) => this.samePosition(m, king.x, king.y))) {

                    // Get the path when the enemy delivers check.
                    const pathToKingPosition = this.findAttackingPath(king, enemy);
                    
                    // We check whether the current pieces of the king's team have a move to eliminate the check given. 
                    const isThereAnyProtectionMoves = currentPieces.possibleMoves.filter(
                        (c) => pathToKingPosition.some((q) => this.samePosition(q, c.x, c.y))
                    );
                    
                    
                    // Check the length of king's possible moves array.
                    if (king.possibleMoves.length !== 0) {

                        // return true as the king can't go anywhere.
                        return true;
                    }
                }
            }
        }

        return false;
    }


    // #todo. This fn should be called when drop piece is triggered.
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

        // #The implementation for checkmates are ./interface folder - [later].
        // this.checkMate();
        // this.steelMate();
        // this.smotheredMate();

        // #Implementation above.
        // this.doubleCheck();
        // this.discoverCheck();
        this.kingMovementsAndProtection(gridx, gridy);
    }
}