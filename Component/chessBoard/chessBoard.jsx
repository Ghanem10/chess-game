import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Squares from "../../layout/squares";
import PawnPromotion from "../../layout/pawnPromotion";
import stateManagement, { SQUARES } from "../state/stateManagement";
import TimerPlayer from "../../interface/timer/timerPlayer";
import { LightContext } from "../../interface/wraper/props";
import Recorder from "../../interface/recordmoves/recorder";
import updateRecordMoves from "./updateRecordMoves";
import { samePosition } from "../../movement/constants/functions";

const NumbersAxie = ['8', '7', '6', '5', '4', '3', '2', '1'];
const CharsAxie = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function ChessBoard({ 
    successMove, 
    piece, 
    updatePossibleMoves, 
    highlightSquare, 
    pawnPromotion, 
    setPawnPromotion, piecesTurns, 
    startGame, setStartGame 
}) {
    
    const [state, dispatch] = useReducer(stateManagement, { 
        squares: [], 
        coordinates: { GridX: -1, GridY: -1 },
        nextPosition: { x: -1, y: -1 },
        activePiece: null,
    });
    const { 
        boardColor, 
        setRecordMoves
    } = useContext(LightContext);

    // These states can be incorporated with the useReducer state for consistency.
    const [history, setHistory] = useState([]);
    const [nextPosition, setNextPosition] = useState([]);
    const [imgPiece, setImgPiece] = useState([]);
    const [opp, setOpp] = useState([]);

    const Board = useRef(null);
    const titleRef = useRef();

    // Create the chess board with variables declared at the top level of the component.
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

    function grabbingPiece(e) {
        
        const Element = e.target;
        const Edges = Board.current;

        if (Element.classList.contains('piece') && Edges) {
            const x = e.clientX - 40;
            const y = e.clientY - 40;

            const gridx = Math.floor((e.clientX - Edges.offsetLeft) / 65);
            const gridy = Math.floor((e.clientY - Edges.offsetTop) / 65);
            
            dispatch({
                type: SQUARES.COORDINATES_X_Y,
                payload: {
                    coordinates: {
                        GridX: gridx,
                        GridY: gridy
                    }
                },
            });

            Element.style.position = 'absolute';
            Element.style.left = `${x}px`;
            Element.style.top = `${y}px`;

            dispatch({
                type: SQUARES.SET_ACTIVE_PIECE,
                payload: {
                    activePiece: Element,
                }
            });
            
            // The possible moves should really be in the dropping piece fn.
            updatePossibleMoves(gridx, gridy);
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
            state.activePiece.style.cursor = "grabbing";

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

    // This function handles all the logic of the pieces.
    function droppingPiece(e) {
        const Edges = Board.current;

        if (state.activePiece && Edges) {
            
            const x = Math.floor((e.clientX - Edges.offsetLeft) / 65);
            const y = Math.floor((e.clientY - Edges.offsetTop) / 65);
            
            dispatch({
                type: SQUARES.UPDATE_NEXT_X_Y,
                payload: {
                    nextPosition: {
                       x: x, y: y
                    },
                }
            });

            // Get the piece previous position.
            const currentPiece = piece.find(
                (t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY
            );
            
            // Get the enemy piece that has the same position of the current piece.
            const opponentPiece = piece.find(
                (t) => samePosition(t, x, y) && t.team !== currentPiece.team
            );

            if (currentPiece) {
                const playMove = successMove(state, x, y, currentPiece, titleRef);

                if (playMove) {

                    if (opponentPiece) {
                        setOpp(opponentPiece);
                    }
                    setImgPiece(pre => {
                        return [
                            ...pre,
                            opponentPiece ? 
                            opponentPiece.image : 
                            currentPiece.image
                        ];
                    });
                    updateRecordMoves(
                        state, 
                        setRecordMoves, x, y, 
                        currentPiece, 
                        opponentPiece
                    );
                    setHistory(pre => [
                        ...pre, {
                        gx: state.coordinates.GridX, 
                        gy: state.coordinates.GridY 
                    }]);
                    setNextPosition(pre => [
                        ...pre,
                        { x: x, y: y }
                    ]);
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
            <div className="container">
                <TimerPlayer 
                    piecesTurns={piecesTurns}
                    startGame={startGame}
                    setStartGame={setStartGame}
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
                        {row.map(({ position, x, y }, index) => (
                            <Squares 
                                key={index}
                                piece={piece}
                                x={x} y={y}
                                highlightSquare={highlightSquare}
                                position={position}
                                state={state}
                                updateBoardColor={boardColor}
                                grabbingPiece={grabbingPiece}
                                MovingPiece={MovingPiece}
                                droppingPiece={droppingPiece}
                            />
                        ))}
                        </div>
                    ))}
                </div>
                <Recorder 
                    pieces={piece}
                    history={history}
                    nextPosition={nextPosition}
                    imgPiece={imgPiece}
                    opp={opp}
                />
            </div>
        </>
    );
}