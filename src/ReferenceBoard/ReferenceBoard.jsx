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

    const board = new Board(piece, setHighlighSquare, highlightSquare);

    useEffect(() => {
        addChessPieces(initialstate);
    }, []);
    
    // update the piece position based on its possible moves.
    const t = (s, b, c) => {
        const m = s.some(a => a.x === b && a.y === c);
        return m ? true : false;
    }

    function successMove(state, x, y, currentPiece, titleRef) {
        const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;
        const validMove = t(currentPiece.possibleMoves, x, y);
        const enpassantMove = board.isEnpassantMove(
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
    
    const updatePossibleMoves = (gridx, gridy) => board.calculateAllMoves(gridx, gridy);

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