import { Team } from "../components/lib/movement/constants/functions";

export const checkCurrentSquare = (piece, piecesTurns, position,x, y) => {

    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const currentPiece = piece.find((p) => p.x === x && p.y === y);
    const currentTeam = piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;
    
    const lastChar = position.slice(-1)[0];
    const number = parseInt(lastChar, 10);
    const isColor = number % 2 === 0;
    
    const charIndex = chars.indexOf(position.charAt(0));
    const isWhiteSquare = charIndex % 2 === 0;
    const squareColor = isColor ? isWhiteSquare : !isWhiteSquare;

    return [
        currentPiece,
        currentTeam,
        squareColor
    ];
};