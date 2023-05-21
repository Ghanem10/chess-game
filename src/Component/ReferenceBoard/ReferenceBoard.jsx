import React, { useEffect, useState } from 'react'
import { Team, Type, samePosition } from '../movement/constants/functions';
import {
    pawnMove, 
    bishopMove, 
    knightMove, 
    rockMove, 
    queenMove, 
    kingMove,
    getPossiblePawnMoves,
    getPossibleBishopMoves, 
    getPossibleKnightMoves, 
    getPossibleKingMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves
} from '../movement/rules/piecesIndex';
import { addChessPieces } from '../layout/pieceImages';
import ChessBoard from '../chessBoard/chessBoard';

const initialstate = [];

export default function ReferenceBoard() {
    const [piece, setPiece] = useState(initialstate);
    const [highlightSquare, setHighlighSquare] = useState([]);
    const [pawnPromotion, setPawnPromotion] = useState();

    useEffect(() => {
        addChessPieces(initialstate);
    }, []);

    function playMove(state, x, y, currentPiece, titleRef) {
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

        if (enpassantMove) {
            const EnpassantPawn = piece.reduce((result, p) => {
                if (samePosition(p, state.coordinates.GridX, state.coordinates.GridY)) {
                    p.EnpassantMove = false;
                    p.x = x;
                    p.y = y;
                    result.push(p);
                } else if (!(samePosition(p, x, y - PawnDiraction))) {
                    p.EnpassantMove = false;
                    result.push(p);
                }
                return result;
            }, []);
            setPiece(EnpassantPawn);
        } else if (validMove) {
            const pawns = piece.reduce((result, p) => {
                if (samePosition(p, state.coordinates.GridX, state.coordinates.GridY)) {
                    p.EnpassantMove = Math.abs(state.coordinates.GridY - y) === 2;
                    p.x = x;
                    p.y = y;

                    const promotionPawn = p.team === Team.WHITE ? 0 : 7;
                    if (y === promotionPawn && p.Piece === Type.PAWN) {
                        titleRef.current.classList.remove("hide-title");
                        setPawnPromotion(p);
                    }
                    result.push(p);
                } else if (!(samePosition(p, x, y))) {
                    p.EnpassantMove = false;
                    result.push(p);
                }
                return result;
            }, []);
            setPiece(pawns);
        } else {
            return false;
        }
        return true;
    }
    
    function updatePossibleMoves(gridx, gridy) {
        setPiece((currentP) => {
            const update = currentP.map((p) => {
                if (samePosition(p, gridx, gridy)) {
                    p.possibleMoves = getValidMove(p, currentP);
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

    function getValidMove(piece, chessBoard) {
        switch(piece.Piece) {
            case Type.PAWN:
                return getPossiblePawnMoves(piece, chessBoard);
            case Type.BISHOP:
                return getPossibleBishopMoves(piece, chessBoard);
            case Type.KNIGHT:
                return getPossibleKnightMoves(piece, chessBoard);
            case Type.KING:
                return getPossibleKingMoves(piece, chessBoard);
            case Type.QUEEN:
                return getPossibleQueenMoves(piece, chessBoard);
            case Type.ROCK:
                return getPossibleRookMoves(piece, chessBoard);
            default:
                return [];
        }
    }

    return (
        <>
            <ChessBoard 
                playMove={playMove}
                piece={piece}
                highlightSquare={highlightSquare}
                pawnPromotion={pawnPromotion}
                setPawnPromotion={setPawnPromotion}
                updatePossibleMoves={updatePossibleMoves}
            />
        </>
    );
}