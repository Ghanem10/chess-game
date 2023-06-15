import { squareOccupied, squareOccupiedByOpponent, squareOccupiedByKing } from "../rules/reference";

export function getPossibleRookMoves(rook, chessBoard) {
    const possiblePositions = [];
    const boardWidthHeight = 8;
    const directions = [
      { x: 0, y: 1 }, // Up
      { x: 0, y: -1 }, // Down
      { x: 1, y: 0 }, // Right
      { x: -1, y: 0 }, // Left
    ];
  
    for (const direction of directions) {
      let newX = rook.x + direction.x;
      let newY = rook.y + direction.y;

      while (newX >= 0 && newY >= 0 && newX < boardWidthHeight && newY < boardWidthHeight) {
        if (!squareOccupied(newX, newY, chessBoard)) {
            possiblePositions.push({ x: newX, y: newY });
        } else if (squareOccupiedByKing(newX, newY, chessBoard, rook.team)) {
            possiblePositions.push({ x: newX, y: newY });
        } else {
            if (squareOccupiedByOpponent(newX, newY, chessBoard, rook.team)) {
                possiblePositions.push({ x: newX, y: newY });
            }
            break;
        }
            newX += direction.x;
            newY += direction.y;
        }
    }
  
    return possiblePositions;
  }
  