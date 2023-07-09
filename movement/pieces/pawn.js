import { Team } from "../constants/functions";
import { squareOccupied, squareOccupiedByOpponent } from "../rules/reference";

export function getPossiblePawnMoves(pawn, chessBoard) {
    const possiblePositions = [];

    const initialRow = pawn.team === Team.WHITE ? 6 : 1;
    const pawnDirection = pawn.team === Team.WHITE ? -1 : 1;
  
    // Forward move
    const forwardPosition = { x: pawn.x, y: pawn.y + pawnDirection };
    if (!squareOccupied(forwardPosition.x, forwardPosition.y, chessBoard)) {
        possiblePositions.push(forwardPosition);
        if (pawn.y === initialRow) {
            const doubleForwardPosition = { x: pawn.x, y: pawn.y + pawnDirection * 2 };
            if (!squareOccupied(doubleForwardPosition.x, doubleForwardPosition.y, chessBoard)) {
                possiblePositions.push(doubleForwardPosition);
            }
        }
    }
  
    // Attack moves
    const attackLeftPosition = { x: pawn.x - 1, y: pawn.y + pawnDirection };
    const attackRightPosition = { x: pawn.x + 1, y: pawn.y + pawnDirection };
    if (squareOccupiedByOpponent(attackLeftPosition.x, attackLeftPosition.y, chessBoard, pawn.team)) {
        possiblePositions.push(attackLeftPosition);
    }
    if (squareOccupiedByOpponent(attackRightPosition.x, attackRightPosition.y, chessBoard, pawn.team)) {
        possiblePositions.push(attackRightPosition);
    }

    return possiblePositions;
    // En-passant moves
}

// fix the bug in the previous function.
export function pawnAttacks(pawn, chessBoard) {
    const possiblePositions = [];
    const pawnDirection = pawn.team === Team.WHITE ? -1 : 1;
    const attackLeftPosition = { x: pawn.x - 1, y: pawn.y + pawnDirection };
    const attackRightPosition = { x: pawn.x + 1, y: pawn.y + pawnDirection };
    if (!squareOccupied(attackLeftPosition.x, attackLeftPosition.y, chessBoard, pawn.team)) {
        possiblePositions.push(attackLeftPosition);
    }
    if (!squareOccupied(attackRightPosition.x, attackRightPosition.y, chessBoard, pawn.team)) {
        possiblePositions.push(attackRightPosition);
    }

    return possiblePositions;
}