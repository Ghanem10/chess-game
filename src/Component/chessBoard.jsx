import React, { useEffect, useReducer, useRef, useState } from "react";
import { addChessPieces, displayPieces } from "./layout/pieceImages";
import { Type, Team, samePosition } from "./movement/constants/functions";
import piecesRules from "./movement/pieces/rules/generalRules";
import Squares from "./layout/squares";
import PawnPromotion from "./layout/pawnPromotion";
import stateManagement, { SQUARES } from "./movement/state/stateManagement";

const NumbersAxie = ['8', '7', '6', '5', '4', '3', '2', '1'];
const CharsAxie = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const initialstate = [];

export default function ChessBoard() {
    const [state, dispatch] = useReducer(stateManagement, { 
        squares: [], 
        coordinates: {
            GridX: -1,
            GridY: -1
        },
        nextPosition: {
            x: -1,
            y: -1
        },
        activePiece: null,
    });
    const [piece, setPiece] = useState(initialstate);
    const [pawnPromotion, setPawnPromotion] = useState();
    const [highlightSquare, setHighlighSquare] = useState([]);
    
    const rules = new piecesRules();
    const Board = useRef(null);
    const titleRef = useRef();

    
    function createBoard() {
        const Board = [];

        for (let x = 0; x < NumbersAxie.length; x++) {
            const square = [];
            for (let y = 0; y < CharsAxie.length; y++) {

                square.push({
                    position: `${[CharsAxie[x]] + [NumbersAxie[y]]}`, 
                    x: x, y: y
                });
            }
            Board.push(square);
        }
        dispatch({
            type: SQUARES.ADD_SQUARES,
            payload: {
                squares: Board
            },
        });
    }

    function updatePieceValidPositions(gridx, gridy) {
        setPiece((currentP) => {
            const update = currentP.map((p) => {
                if (samePosition(p, gridx, gridy)) {
                    p.possibleMoves = rules.getValidMove(p, currentP);
                    setHighlighSquare(p.possibleMoves);
                }
                return p;
            });
            return update;
        });
    }

    function grabbingPiece(e) {
        
        const Element = e.target;
        const Edges = Board.current;

        if (Element.classList.contains('piece') && Edges) {
            const x = e.clientX - 40;
            const y = e.clientY - 40;

            const gridx = Math.floor((e.clientX - Edges.offsetLeft) / 75);
            const gridy = Math.floor((e.clientY - Edges.offsetTop) / 75);
            
            dispatch({
                type: SQUARES.COORDINATES_X_Y,
                payload: {
                    coordinates: {
                        GridX: gridx,
                        GridY: gridy
                    }
                },
            });
            
            const MinX = 426, MaxX = 873;
            const MinY = 64, MaxY = 503;

            Element.style.position = 'absolute';
            if (x > MinX && x < MaxX) {
                Element.style.left = `${x}px`;
            }
            if (y > MinY && y < MaxY) {
                Element.style.top = `${y}px`;
            }
            dispatch({
                type: SQUARES.SET_ACTIVE_PIECE,
                payload: {
                    activePiece: Element,
                }
            });

            updatePieceValidPositions(gridx, gridy);
        }
    }
    
    function MovingPiece(e) {
        const Edges = Board.current;
        if (state.activePiece && Edges) {

            const MinX = Edges.offsetLeft - 15;
            const MinY = Edges.offsetTop - 15;
            const MaxX = Edges.offsetLeft + Edges.clientWidth - 60;
            const MaxY = Edges.offsetTop + Edges.clientHeight - 60; 

            const x = e.clientX - 40;
            const y = e.clientY - 40;
            
            state.activePiece.style.position = 'absolute';

            if (x < MinX) {
                state.activePiece.style.left = `${MinX}px`;
            } else if (x > MaxX) {
                state.activePiece.style.left = `${MaxX}px`;
            }else {
                state.activePiece.style.left = `${x}px`;
            }

            if (y > MaxY) {
                state.activePiece.style.top = `${MaxY}px`;
            } else if (y < MinY) {
                state.activePiece.style.top = `${MinY}px`;
            } else {
                state.activePiece.style.top = `${y}px`;
            }
        }
        
    }

    

    function dropingPiece(e) {
        const Edges = Board.current;

        if (state.activePiece && Edges) {
            
            const x = Math.floor((e.clientX - Edges.offsetLeft) / 75);
            const y = Math.floor((e.clientY - Edges.offsetTop) / 75);
            
            dispatch({
                type: SQUARES.UPDATE_NEXT_X_Y,
                payload: {
                    nextPosition: {
                       x: x, y: y
                    },
                }
            });

            const currentPiece = piece
                .find(t => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY);
            const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;

            if (currentPiece) {
                const validMove = rules.isValid(
                    state.coordinates.GridX,
                    state.coordinates.GridY,
                    x, y,
                    currentPiece.Piece,
                    currentPiece.team,
                    piece
                );
                const isEnpassantMove = rules.isEnpassantMove(
                    state.coordinates.GridX,
                    state.coordinates.GridY,
                    x, y,
                    currentPiece.Piece,
                    currentPiece.team,
                    piece
                );

                if (isEnpassantMove) {
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
                    state.activePiece.style.position = 'relative';
                    state.activePiece.style.removeProperty('left');
                    state.activePiece.style.removeProperty('top');
                }
            }

            dispatch({
                type: SQUARES.SET_ACTIVE_PIECE,
                payload: {
                    activePiece: null
                },
            });
        }
    }

    useEffect(() => {
        createBoard();
        addChessPieces(initialstate);
    }, []);

    return (
        <>
            <PawnPromotion 
                x={state.nextPosition.x}
                y={state.nextPosition.y}
                pawnPromotion={pawnPromotion}
                setPawnPromotion={setPawnPromotion}
                titleRef={titleRef}
                piece={piece}
            />
            <div 
                className="chessBoard" 
                ref={Board}
                >
                {state.squares.map((row, index) => (
                    <div
                        className="row"
                        key={index}
                    >
                    {row.map(({ position, x, y }, index) => {
                        return (
                            <Squares 
                                key={index}
                                piece={piece}
                                x={x} y={y}
                                highlightSquare={highlightSquare}
                                position={position}
                                state={state}
                                grabbingPiece={grabbingPiece}
                                MovingPiece={MovingPiece}
                                dropingPiece={dropingPiece}
                            />
                        )
                    })}
                    </div>
                ))}
            </div>
        </>
    );
}