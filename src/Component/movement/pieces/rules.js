import { Team, Type, samePosition } from '../functions/func';

export default class piecesRules {

    isEnpassantMove(previousX, previousY, x, y, type, team, chessBoard) {
        const PawnDiraction = team === Team.WHITE ? -1 : 1;
        
        if (type === Type.PAWN) {
            if ((x - previousX === -1 || x - previousX === 1) && y - previousY === PawnDiraction) {
                const piece = chessBoard.find((p) => samePosition(p, x, y - PawnDiraction) && p.EnpassantMove);
                if (piece) return true;
            }
        }
        return false;
    }
    SquareEmptyOrOccupiedByOpponent =(x, y, chessBoard, team) => {
        return (!this.squareOccupied(x, y, chessBoard) || this.squareOccupiedByOpponent(x, y, chessBoard, team));
      }

    squareOccupiedByOpponent(x, y, chessBoard, team) {
        const piece = chessBoard.find(t => samePosition(t, x, y) && t.team !== team);
        return piece ? true : false;
    }

    squareOccupied(x, y, chessBoard) {
        const square = chessBoard.find(pre => samePosition(pre, x, y));
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
            const DiagonalWidthHieght = 8;
            
            for (let i = 1; i < DiagonalWidthHieght; i++) {
                // TOP RIGHT
                if (x > previousX && y < previousY) {
                    const passedPosition = { x: previousX + i, y: previousY - i };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    } else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }
                // TOP LEFT
                if (x < previousX && y < previousY) {
                    const passedPosition = { x: previousX - i, y: previousY - i };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    } else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }

                // BOTTOM RIGHT
                if (x > previousX && y > previousY) {
                    const passedPosition = { x: previousX + i, y: previousY + i };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    } else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }
                // BOTTOM LEFT
                if (x < previousX && y > previousY) {
                    const passedPosition = { x: previousX - i, y: previousY + i };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    } else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }
            }
            return false;
        } else if (type === Type.KNIGHT) {
            const boardWidthHieght = 2;
            for (let i = -1; i < boardWidthHieght; i+= 2) {
                for (let j = -1; j < boardWidthHieght; j++) {
                    // TOP AND BOTTOM
                    if (y - previousY === 2 * i) {
                        if (x - previousX === j) {
                            if (this.SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                                return true;
                            }
                        }
                    }
                    // LEFT AND RIGHT
                    if (x - previousX === 2 * i) {
                        if (y - previousY === j) {
                            if (this.SquareEmptyOrOccupiedByOpponent(x, y, chessBoard, team)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        } else if (type === Type.ROCK) {
            const boardWidthHieght = 8;
            // HORIZONTAL MOVEMENT
            if (previousX === x) {
                for (let i = 1; i < boardWidthHieght; i++) {
                    const multiplier = (y < previousY) ? -1 : 1;
                    const passedPosition = { x: previousX, y: previousY + (i * multiplier) };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    } else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }
            } 
            // VERTICAL MOVEMENT
            else if (previousY === y) {
                for (let i = 1; i < boardWidthHieght; i++) {
                    const multiplier = (x < previousX) ? -1 : 1;
                    const passedPosition = { x: previousX + (i * multiplier), y: previousY };
                    if (passedPosition.x === x && passedPosition.y === y) {
                        console.log("virtically")
                        if (this.SquareEmptyOrOccupiedByOpponent(passedPosition.x, passedPosition.y, chessBoard, team)) {
                            return true;
                        }
                    }else {
                        if (this.squareOccupied(passedPosition.x, passedPosition.y, chessBoard)) {
                            break;
                        }
                    }
                }
            }
            return false;
        }
        return false;
    }
}