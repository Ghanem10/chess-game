import { Team, Type } from '../functions/func';

export default class pawnRules {

    isEnpassantMove(previousX, previousY, x, y, type, team, chessBoard) {
        const PawnDiraction = team === Team.WHITE ? -1 : 1;
        
        if (type === Type.PAWN) {
            if ((x - previousX === -1 || x - previousX === 1) && y - previousY === PawnDiraction) {
                const piece = chessBoard.find((p) => p.x === x && p.y === y - PawnDiraction && p.EnpassantMove);
                if (piece) return true;
            }
        }
        return false;
    }

    squareOccupiedByOpponent(x, y, chessBoard, team) {
        const piece = chessBoard.find(t => t.x === x && t.y === y && t.team !== team);
        return piece ? true : false;
    }

    squareOccupied(x, y, chessBoard) {
        const square = chessBoard.find(pre => pre.x === x && pre.y === y);
        return square ? true : false;
    }

    isOccupied(previousX, previousY, x, y, type, team, chessBoard) {

        if (type === Type.PAWN) {
            const initialRow = team === Team.WHITE ? 6 : 1;
            const PawnDiraction = team === Team.WHITE ? -1 : 1;

            // LEGEL MOVEMENT
            if (previousX === x && (y - previousY === PawnDiraction)) {
                if (!this.squareOccupied(x, y, chessBoard)) {
                    return true;
                }
            } else if (previousY === initialRow && previousX === x && (y - previousY === PawnDiraction * 2)) {
                if (!this.squareOccupied(x, y, chessBoard) && !this.squareOccupied(x, y - PawnDiraction, chessBoard)) {
                    return true;
                }
            }

            // CAPTURE MOVEMENT
            else if (x - previousX === -1 && y - previousY === PawnDiraction) {
                if (this.squareOccupiedByOpponent(x, y, chessBoard, team)) {
                    return true;
                }
            }else if (x - previousX === 1 && y - previousY === PawnDiraction) {
                if (this.squareOccupiedByOpponent(x, y, chessBoard, team)) {
                    return true;
                }
            }
        } else if (type === Type.BISHOP) {
            const Diagonal = 8;
            for (let i = 1; i < Diagonal; i++) {
                
                // TOP RIGHT
                if (x > previousX && y < previousY) {
                    const passedPosition = { x: previousX + i, y: previousY - i };
                    if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                        break;
                    }
                }
                // LEGAL MOVE
                if (x - previousX === i && y - previousY === -i) {
                    return true;
                }
                // TOP LEFT
                if (x < previousX && y < previousY) {
                    const passedPosition = { x: previousX - i, y: previousY - i };
                    if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                        break;
                    }
                }
                // LEGAL MOVE
                if (x - previousX === -i && y - previousY === -i) {
                    return true;
                }
                // BOTTOM RIGHT
                if (x > previousX && y > previousY) {
                    const passedPosition = { x: previousX + i, y: previousY + i };
                    if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                        break;
                    }
                }
                // LEGAL MOVE
                if (x - previousX === i && y - previousY === i) {
                    return true;
                }
                // BOTTOM LEFT
                if (x < previousX && y > previousY) {
                    const passedPosition = { x: previousX - i, y: previousY + i };
                    if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                        break;
                    }
                }
                // LEGAL MOVE
                if (x - previousX === -i && y - previousY === i) {
                    return true;
                }
            }
            return false;
        }
        
        return false;
    }
}