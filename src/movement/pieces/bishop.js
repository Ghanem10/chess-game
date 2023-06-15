import { 
    squareOccupied, 
    squareOccupiedByOpponent, 
    squareOccupiedByKing 
} from "../rules/reference";

export function getPossibleBishopMoves(bishop, chessBoard) {
    const possiblePositions = [];
    const diagonalWidthHeight = 8;
    
    function traverseDiagonal(dx, dy) {
        for (let i = 1; i < diagonalWidthHeight; i++) {
            const passedPosition = { x: bishop.x + i * dx, y: bishop.y + i * dy };
            const insideBoardPositions =
            passedPosition.x < 8 &&
            passedPosition.y < 8 &&
            passedPosition.x > -1 &&
            passedPosition.y > -1;
    
            if (!squareOccupied(passedPosition.x, passedPosition.y, chessBoard) && insideBoardPositions) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            } else if (squareOccupiedByKing(passedPosition.x, passedPosition.y, chessBoard, bishop.team)) {
                possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
            } else {
                if (squareOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, bishop.team)) {
                    possiblePositions.push({ x: passedPosition.x, y: passedPosition.y });
                }
                break;
            }
        }
    }
  
    traverseDiagonal(1, -1); // TOP RIGHT
    traverseDiagonal(-1, -1); // TOP LEFT
    traverseDiagonal(1, 1); // BOTTOM RIGHT
    traverseDiagonal(-1, 1); // BOTTOM LEFT
  
    return possiblePositions;
}  