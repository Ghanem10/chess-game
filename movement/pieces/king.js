'use strict';

import { Type, samePosition } from "../constants/functions";
import { squareOccupied, squareOccupiedByOpponent } from "../rules/reference";

export function getPossibleKingMoves(king, chessBoard) {
    const possiblePositions = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {

        if (i === 0 && j === 0) continue;
            const passedPosition = { x: king.x + i, y: king.y + j };
            const insideBoardPositions =
            passedPosition.x < 8 &&
            passedPosition.y < 8 &&
            passedPosition.x > -1 &&
            passedPosition.y > -1;

            if (!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            } else if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, king.team) && insideBoardPositions) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            }
        }
    }

    return possiblePositions;
}  

export function getCastlingKingMoves(king, pieces) {

    const possiblePositions = [];
    
    // If the king has moved from his initial rank then castling isn't valid
    if (king.hasmoved) return possiblePositions;

    // Filter all the rock on the board
    const rocks = pieces.filter(
        (p) => p.Piece === Type.ROCK && p.team === king.team && !p.hasmoved
    );

    // Iterate over them to calcualte the king's position
    for (const rock of rocks) {

        // Check the direction of which the king is positiioned
        const directionKing = (rock.x - king.x > 0) ? 1 : -1;

        // Copy the existing king's position to check if it matches
        // the rock's possiblemoves by incrementing it's positions
        const copyKingPosition = Object.assign({}, king);
        copyKingPosition.x += directionKing;

        // If the desired rock wasn't found then simply continue
        if (!rock.possibleMoves.some(
            (t) => samePosition(t, copyKingPosition.x, copyKingPosition.y)
            )) {
            continue;
        }

        // Get all the possible moves of the rock that are on the same rank of the king
        const targetRankMoves = rock.possibleMoves.filter(
            (r) => r.y === king.y
        );

        // Get all the enemy pieces of the pieces array
        const enemyPieces = pieces.filter(
            (p) => p.team !== king.team
        );

        let path = true;

        // Iterate over them to check the matching positions of the rock
        for (const enemy of enemyPieces) {

            for (const moves of enemy.possibleMoves) {
                
                // Check if the rock possible moves matches any of the enemy's possible moves
                // Or if the king is in check, then, return false as it's not valid path
                if (targetRankMoves.some((s) => samePosition(s, moves.x, moves.y) 
                    || samePosition(moves, king.x, king.y))
                    ) {
                    path = false;
                }

                // Break if the enemy's moves matches the path to castling
                if (!path) {
                    break;
                }
            }

            if (!path) {
                break;
            }
        }

        // If the path matches look for other paths available
        if (!path) {
            continue;
        }

        // Update the possible moves of the king with the rock's possible moves
        possiblePositions.push({ x: rock.x, y: rock.y });
    }

    return possiblePositions;
}