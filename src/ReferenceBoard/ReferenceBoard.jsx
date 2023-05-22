import React, { useEffect, useState } from 'react'
import { Team, Type, samePosition } from '../movement/constants/functions';
import {
    pawnMove, 
    bishopMove, 
    knightMove, 
    rockMove, 
    queenMove, 
    kingMove,
} from '../movement/rules/piecesIndex';
import { addChessPieces } from '../layout/pieceImages';
import ChessBoard from '../Component/chessBoard/chessBoard';
import Board from '../model/piecesReference';

const initialstate = [];

export default function ReferenceBoard() {
    const [piece, setPiece] = useState(initialstate);
    const [highlightSquare, setHighlighSquare] = useState([]);
    const [pawnPromotion, setPawnPromotion] = useState();

    const board = new Board(piece);

    useEffect(() => {
        addChessPieces(initialstate);
    }, []);
    
    function successMove(state, x, y, currentPiece, titleRef) {
        const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;
        const validMove = isValid(
            state.coordinates.GridX,
            state.coordinates.GridY,
            x, y,
            currentPiece.Piece,
            currentPiece.team,
            piece
        );
        const enpassantMove = isEnpassantMove(
            state.coordinates.GridX,
            state.coordinates.GridY,
            x, y,
            currentPiece.Piece,
            currentPiece.team,
            piece
        );
        
        const playMove = board.playMove(
            x, y, 
            titleRef, 
            state, 
            setPawnPromotion, 
            enpassantMove, 
            PawnDiraction, 
            setPiece, 
            validMove
        );

        return playMove;
    }
    
    function updatePossibleMoves(gridx, gridy) {
        setPiece((currentP) => {
            const update = currentP.map((p) => {
                if (samePosition(p, gridx, gridy)) {
                    p.possibleMoves = board.getValidMove(p, currentP);
                    setHighlighSquare(p.possibleMoves);
                }
                return p;
            });
            return update;
        });
    }

    function isEnpassantMove(previousX, previousY, x, y, type, team, chessBoard) {
        const PawnDiraction = team === Team.WHITE ? -1 : 1;
        
        if (type === Type.PAWN) {
            if ((x - previousX === -1 || x - previousX === 1) && y - previousY === PawnDiraction) {
                const piece = chessBoard.find((p) => samePosition(p, x, y - PawnDiraction) && p.EnpassantMove);
                if (piece) return true;
            }
        }
        return false;
    }

    function isValid(previousX, previousY, x, y, type, team, chessBoard) {
        let validMove = false;

        switch(type) {
            case Type.PAWN:
                validMove = pawnMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.BISHOP:
                validMove = bishopMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.KNIGHT:
                validMove = knightMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.ROCK:
                validMove = rockMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.QUEEN:
                validMove = queenMove(previousX, previousY, x, y, team, chessBoard);
                break;
            case Type.KING:
                validMove = kingMove(previousX, previousY, x, y, team, chessBoard);
                break;
        }
        return validMove;
    }

    return (
        <>
            <ChessBoard 
                successMove={successMove}
                piece={piece}
                highlightSquare={highlightSquare}
                pawnPromotion={pawnPromotion}
                setPawnPromotion={setPawnPromotion}
                updatePossibleMoves={updatePossibleMoves}
            />
        </>
    );
}