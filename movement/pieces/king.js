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
    
    if (king.hasmoved) return possiblePositions;

    const rocks = pieces.filter(
        (p) => p.Piece === Type.ROCK && p.team === king.team && !p.hasmoved
    );

    for (const rock of rocks) {

        const directionKing = (rock.x - king.x > 0) ? 1 : -1;

        const copyKingPosition = Object.assign({}, king);
        copyKingPosition.x += directionKing;

        if (!rock.possibleMoves.some(
            (t) => samePosition(t, copyKingPosition.x, copyKingPosition.y)
            )) {
            continue;
        }

        const targetRankMoves = rock.possibleMoves.filter(
            (r) => r.y === king.y
        );

        const enemyPieces = pieces.filter(
            (p) => p.team !== king.team
        );

        let path = true;

        for (const enemy of enemyPieces) {

            for (const moves of enemy.possibleMoves) {
                
                if (targetRankMoves.some((s) => samePosition(s, moves.x, moves.y))) {
                    path = false;
                }

                if (!path) {
                    break;
                }
            }

            if (!path) {
                break;
            }
        }

        if (!path) {
            continue;
        }
        possiblePositions.push({ x: rock.x, y: rock.y });
    }

    return possiblePositions;
}