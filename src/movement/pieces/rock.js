import { squareOccupied, SquareEmptyOrOccupiedByOpponent, squareOccupiedByOpponent, squareOccupiedByKing } from "../rules/reference";

export const rockMove = (previousX, previousY, x, y, team, chessBoard) => {
    const boardWidthHieght = 8;

    // VERTICAL MOVEMENT
    if (previousX === x) {
        for (let i = 1; i < boardWidthHieght; i++) {
            const multiplier = (y < previousY) ? -1 : 1;
            const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            } else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    } 
    // HORIZONTAL MOVEMENT
    else if (previousY === y) {
        for (let i = 1; i < boardWidthHieght; i++) {
            const multiplier = (x < previousX) ? -1 : 1;
            const passedPosition = { x: previousX + (i * multiplier), y: previousY };
            if (passedPosition.x === x && passedPosition.y === y) {
                if (SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                    return true;
                }
            }else {
                if (squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                    break;
                }
            }
        }
    }
    return false;
}

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
  