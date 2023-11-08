import React, { useEffect, useState } from 'react';
import { Type, Team } from '../lib/movement/constants/functions';
import { addChessPieces } from '../squares/pieces';
import ChessBoard from '../chessboard/board';
import Board from '../lib/piecesLogic';

const initialstate = [];

export default function MainTemplateBoard() {
    
    const [piece, setPiece] = useState([]);
    const [highlightSquare, setHighlighSquare] = useState([]);
    const [isCheckMate, setisCheckMate] = useState(false);
    const [pawnPromotion, setPawnPromotion] = useState();
    const [piecesTurns, setPiecesTurns] = useState(1);
        
    const board = new Board(
        piece, 
        setHighlighSquare, 
        piecesTurns,
        setisCheckMate
    );

    // remove
    const updateStateTwo = () => {
        const copy = initialstate.map((t) => ({ ...t }));
        setPiece(copy);       
    };
    
    // update the piece position based on its possible moves.
    const updatePieceValidMove = (s, b, c) => {
        const m = s.some(a => a.x === b && a.y === c);
        return m ? true : false;
    }

    function successMove(state, x, y, currentPiece, titleRef) {

        const promotePawn = (piece) => {
            const promotionPawn = piece.team === Team.WHITE ? 0 : 7;
            
            if (y === promotionPawn && piece.Piece === Type.PAWN) {
                titleRef.current.classList.remove("hide-title");
                setPawnPromotion(piece);
            }
        };

        if (currentPiece.team === Team.WHITE && piecesTurns % 2 !== 1) {
            return false;
        } else if (currentPiece.team === Team.BLACK && piecesTurns % 2 !== 0) {
            return false;
        }

        const validMove = updatePieceValidMove(currentPiece.possibleMoves, x, y);

        const playMove = board.playMove(
            x, y, 
            state,
            currentPiece,
            promotePawn,
            setPiece, 
            validMove,
        );

        if (playMove) {
            setPiecesTurns(pre => pre + 1)
        } else {
            return false;
        }

        return playMove;
    }
    
    const updatePossibleMoves = (gridx, gridy) => {
        board.calculateAllMoves(gridx, gridy)
    };

    useEffect(() => {
        addChessPieces(initialstate);
        const updateInitialStateArray = () => {
            const copy = initialstate.map((t) => ({ ...t }));
            setPiece(copy);       
        };

        updateInitialStateArray();
    }, []);

    return (
        <ChessBoard 
            setPiecesTurns={setPiecesTurns}
            piecesTurns={piecesTurns}
            piece={piece}
            setPiece={setPiece}
            successMove={successMove}
            isCheckMate={isCheckMate}
            pawnPromotion={pawnPromotion}
            updateStateTwo={updateStateTwo}
            setisCheckMate={setisCheckMate}
            highlightSquare={highlightSquare}
            setPawnPromotion={setPawnPromotion}
            updatePossibleMoves={updatePossibleMoves}
        />
    );
}