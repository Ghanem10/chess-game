import React, { useEffect, useState } from 'react'
import { Team } from '../movement/constants/functions';
import { addChessPieces } from '../layout/pieceImages';
import ChessBoard from '../Component/chessBoard/chessBoard';
import Board from '../model/piecesReference';
import ListOptions from '../interface/listfront/list';

const initialstate = [];
export let piecesTurns = 1;

export default function ReferenceBoard() {
    const [piece, setPiece] = useState(initialstate);
    const [highlightSquare, setHighlighSquare] = useState([]);
    const [pawnPromotion, setPawnPromotion] = useState();
    const [startGame, setStartGame] = useState(false);

    const board = new Board(
        piece, 
        setHighlighSquare, 
        highlightSquare, 
        piecesTurns
    );

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
        // en-passant move has a bug.
        if (currentPiece.team === Team.WHITE 
            && piecesTurns % 2 !== 1) {
            return false;
        } else if (currentPiece.team === Team.BLACK 
            && piecesTurns % 2 !== 0) {
            return false;
        }

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
        return playMove && piecesTurns++;
    }
    
    const updatePossibleMoves = (gridx, gridy) => board.calculateAllMoves(gridx, gridy);

    return (
        <>
            {(!startGame) ? (
                <ListOptions 
                    setStartGame={setStartGame}
                />
            ) : (
                <ChessBoard 
                    piecesTurns={piecesTurns}
                    successMove={successMove}
                    piece={piece}
                    startGame={startGame}
                    setStartGame={setStartGame}
                    highlightSquare={highlightSquare}
                    pawnPromotion={pawnPromotion}
                    setPawnPromotion={setPawnPromotion}
                    updatePossibleMoves={updatePossibleMoves}
                />
            )}
        </>
    );
}