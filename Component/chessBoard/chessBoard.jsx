import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import Squares from "../../layout/squares";
import PawnPromotion from "./pawnPromotion";
import stateManagement, { SQUARES } from "../state/stateManagement";
import TimerPlayer from "../../interface/timer/timerPlayer";
import { LightContext } from "../../contextprovider/context.provider";
import Recorder from "../../interface/recordmoves/recorder";
import updateRecordMoves from "./updateRecordMoves";
import { samePosition } from "../../movement/constants/functions";

const NumbersAxie = ['8', '7', '6', '5', '4', '3', '2', '1'];
const CharsAxie = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default function ChessBoard({ 
    successMove, 
    piece, setPiece,
    updatePossibleMoves, 
    highlightSquare, 
    pawnPromotion, 
    setPawnPromotion, updateStateTwo,
    startGame, setStartGame, 
    checkMateStatus, isCheckMate,
    setisCheckMate
}) {
    
    const [state, dispatch] = useReducer(stateManagement, { 
        squares: [], 
        coordinates: { GridX: -1, GridY: -1 },
        nextPosition: { x: -1, y: -1 },
        activePiece: null,
    });
    const { 
        boardColor, 
        setRecordMoves,
        toggle
    } = useContext(LightContext);

    const [history, setHistory] = useState([]);
    const [nextPosition, setNextPosition] = useState([]);
    const [opponent, setOpponent] = useState([]);
    const [isMatch, setIsMatch] = useState([]);
    const [ours, setOurs] = useState(60);
    const [enemy, setEnemy] = useState(60);

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

            const playMove = successMove(state, x, y, currentPiece, titleRef);

            if (playMove) {

                setIsMatch((pr) => [...pr, opponentPiece ? "1" : "0"]);
                
                if (opponentPiece !== undefined) {
                    setOpponent((preOPP) => [...preOPP, opponentPiece]);
                }

                setHistory(pre => [ 
                        ...pre, { 
                            gx: state.coordinates.GridX, 
                            gy: state.coordinates.GridY 
                        }
                    ]
                );

                updateRecordMoves(
                    state, 
                    setRecordMoves, x, y, 
                    currentPiece, 
                    opponentPiece
                );

                setNextPosition(pre => [
                    ...pre,
                    { x: x, y: y }
                ]);
                
            } else {
                state.activePiece.style.position = 'relative';
                state.activePiece.style.removeProperty('left');
                state.activePiece.style.removeProperty('top');
            }
            
            dispatch({
                type: SQUARES.SET_ACTIVE_PIECE,
                payload: {
                    activePiece: null
                },
            });
            
            checkMateStatus();
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
                ref={titleRef}
                piece={piece}
            />
            <div className="container">
                <TimerPlayer 
                    startGame={startGame}
                    setStartGame={setStartGame}
                    updateStateTwo={updateStateTwo}
                    isCheckMate={isCheckMate}
                    setisCheckMate={setisCheckMate}
                    setOurs={setOurs}
                    setOpponent= {setEnemy}
                    ours={ours}
                    opponent={enemy}
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
                            {row.map(({ position, x, y }) => (
                                <Squares 
                                    key={`${x}-${y}`}
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
                            {/** apply it up without div */}
                            {toggle && <div className="review"></div>}
                        </div>
                    ))}
                    
                </div>
                <Recorder 
                    pieces={piece}
                    setPiece={setPiece}
                    history={history}
                    nextPosition={nextPosition}
                    opponent={opponent}
                    isMatch={isMatch}
                    ours={ours}
                    enemy={enemy}
                />
            </div>
        </>
    );
}