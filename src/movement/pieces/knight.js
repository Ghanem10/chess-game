import { squareOccupied, squareOccupiedByOpponent } from "../rules/reference";

export function getPossibleKnightMoves(knight, chessBoard) {
    const possiblePositions = [];
    const boardWidthHeight = 8;
    const knightMoves = [
        { x: -2, y: -1 }, // Move 1
        { x: -2, y: 1 }, // Move 2
        { x: -1, y: -2 }, // Move 3
        { x: -1, y: 2 }, // Move 4
        { x: 1, y: -2 }, // Move 5
        { x: 1, y: 2 }, // Move 6
        { x: 2, y: -1 }, // Move 7
        { x: 2, y: 1 }, // Move 8
    ];

    for (const move of knightMoves) {
        const newX = knight.x + move.x;
        const newY = knight.y + move.y;

        if (newX >= 0 && newY >= 0 && newX < boardWidthHeight && newY < boardWidthHeight) {
            if (!squareOccupied(newX, newY, chessBoard) || squareOccupiedByOpponent(newX, newY, chessBoard, knight.team)) {
                possiblePositions.push({ x: newX, y: newY });
            }
        }
    }
  return possiblePositions;
}