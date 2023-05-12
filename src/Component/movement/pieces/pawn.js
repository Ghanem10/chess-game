import { Team, Type, samePosition } from "../constants/functions";
import { squareOccupied, squareOccupiedByOpponent } from "./rules/reference";

export const pawnMove = (previousX, previousY, x, y, team, chessBoard) => {
    const initialRow = team === Team.WHITE ? 6 : 1;
    const PawnDiraction = team === Team.WHITE ? -1 : 1;

    // LEGEL MOVEMENT
    if (previousX === x && (y - previousY === PawnDiraction)) {
        if (!squareOccupied(x, y, chessBoard)) {
            return true;
        }
    } else if (previousY === initialRow && previousX === x && (y - previousY === PawnDiraction * 2)) {
        if (!squareOccupied(x, y, chessBoard) && !squareOccupied(x, y - PawnDiraction, chessBoard)) {
            return true;
        }
    }
    // CAPTURE MOVEMENT
    else if (x - previousX === -1 && y - previousY === PawnDiraction) {
        if (squareOccupiedByOpponent(x, y, chessBoard, team)) {
            return true;
        }
    }else if (x - previousX === 1 && y - previousY === PawnDiraction) {
        if (squareOccupiedByOpponent(x, y, chessBoard, team)) {
            return true;
        }
    }
    return false;
}

export function getPossiblePawnMoves(preX, preY, team, x, y, chessBoard) {
    const PawnDiraction = team === Team.WHITE ? -1 : 1;
    if (y - preY === PawnDiraction || y - preY === PawnDiraction * 2) {
        console.log("PAWN");
    }
}