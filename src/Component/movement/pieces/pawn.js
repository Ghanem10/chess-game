import { Team } from "../functions/func";
import piecesRules from "./rules/rules";

export default function pawnMove(previousX, previousY, x, y, team, chessBoard) {
    const initialRow = team === Team.WHITE ? 6 : 1;
    const PawnDiraction = team === Team.WHITE ? -1 : 1;
    const pawn = new piecesRules();

    // LEGEL MOVEMENT
    if (previousX === x && (y - previousY === PawnDiraction)) {
        if (!pawn.squareOccupied(x, y, chessBoard)) {
            return true;
        }
    } else if (previousY === initialRow && previousX === x && (y - previousY === PawnDiraction * 2)) {
        if (!pawn.squareOccupied(x, y, chessBoard) && !pawn.squareOccupied(x, y - PawnDiraction, chessBoard)) {
            return true;
        }
    }
    // CAPTURE MOVEMENT
    else if (x - previousX === -1 && y - previousY === PawnDiraction) {
        if (pawn.squareOccupiedByOpponent(x, y, chessBoard, team)) {
            return true;
        }
    }else if (x - previousX === 1 && y - previousY === PawnDiraction) {
        if (pawn.squareOccupiedByOpponent(x, y, chessBoard, team)) {
            return true;
        }
    }
    return false;
}