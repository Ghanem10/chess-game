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
    const possibleMoves = [];


    return possibleMoves;
}