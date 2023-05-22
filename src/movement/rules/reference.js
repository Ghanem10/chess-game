import { samePosition } from "../constants/functions";

export const squareOccupiedByOpponent = (x, y, chessBoard, team) => {
    const piece = chessBoard.find(t => samePosition(t, x, y) && t.team !== team);
    return piece ? true : false;
}

export const squareOccupied = (x, y, chessBoard) => {
    const piece = chessBoard.find(t => samePosition(t, x, y));
    return piece ? true : false;
}

export const SquareEmptyOrOccupiedByOpponent = (x, y, chessBoard, team) => {
    return (!squareOccupied(x, y, chessBoard) || squareOccupiedByOpponent(x, y, chessBoard, team));
}