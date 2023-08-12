import React, { useEffect, useState } from 'react'
import { Team, Type } from '../movement/constants/functions';
import { addChessPieces } from '../layout/pieceImages';
import ChessBoard from '../Component/chessBoard/chessBoard';
import ListOptions from '../interface/listfront/list';
import Board from '../model/piecesReference';

const initialstate = [];
export let piecesTurns = 1;

export default function ReferenceBoard() {
    
    const [piece, setPiece] = useState([]);
    const [highlightSquare, setHighlighSquare] = useState([]);
    const [pawnPromotion, setPawnPromotion] = useState();
    const [startGame, setStartGame] = useState(false);

    const board = new Board(
        piece, 
        setHighlighSquare, 
        piecesTurns,
    );

    function updateInitialStateArray() {
        // Deep copy the initialState array and push the copied array.
        const copy = initialstate.map((t) => ({ ...t }));
        setPiece(copy);       
    }
    
    function updateStateTwo() {
        // Deep copy to update the board when the rematch btn is triggered.
        const copy = initialstate.map((t) => ({ ...t }));
        setPiece(copy);       
    }

    useEffect(() => {
        addChessPieces(initialstate);
        updateInitialStateArray();
    }, []);
    
    // update the piece position based on its possible moves.
    const updatePieceValidMove = (s, b, c) => {
        const m = s.some(a => a.x === b && a.y === c);
        return m ? true : false;
    }

    function successMove(state, x, y, currentPiece, titleRef) {

        function promotePawn(piece) {
            const promotionPawn = piece.team === Team.WHITE ? 0 : 7;
            if (y === promotionPawn && piece.Piece === Type.PAWN) {
                titleRef.current.classList.remove("hide-title");
                setPawnPromotion(piece);
            }
        }

        const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;
        const validMove = updatePieceValidMove(currentPiece.possibleMoves, x, y);

        if (currentPiece.team === Team.WHITE 
            && piecesTurns % 2 !== 1) {
            return false;
        } else if (currentPiece.team === Team.BLACK 
            && piecesTurns % 2 !== 0) {
            return false;
        }

        const playMove = board.playMove(
            x, y, 
            state,
            currentPiece,
            promotePawn,
            PawnDiraction, 
            setPiece, 
            validMove,
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
                    successMove={successMove}
                    piece={piece}
                    startGame={startGame}
                    setStartGame={setStartGame}
                    highlightSquare={highlightSquare}
                    pawnPromotion={pawnPromotion}
                    setPawnPromotion={setPawnPromotion}
                    updatePossibleMoves={updatePossibleMoves}
                    updateStateTwo={updateStateTwo}
                />
            )}
        </>
    );
}