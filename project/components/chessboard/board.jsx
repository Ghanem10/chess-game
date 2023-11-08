import React, { useEffect, useReducer, useRef, useState } from "react";
import { Team, samePosition } from "../lib/movement/constants/functions";
import stateManagement, { SQUARES } from './state/stateManagement';
import { PawnPromotion } from "./pawnPromotion";
import updateRecordMoves from "./_updateMoves";
import Squares from '../squares/squaresLayout';
import Recorder from './_recorder';

import TimerPlayer from "./timer";
import Spinner from "../animation/spinner";

import '../../assets/scss/board/chessboard.scss';
import '../../assets/scss/board/pawnPromotion.scss';
import { io } from "socket.io-client";

const websocket = io(`${import.meta.env.VITE_URL}`);

export default function ChessBoard(props) {

    const { 
        successMove, piece, setPiece,
        updatePossibleMoves, setPiecesTurns,
        highlightSquare, pawnPromotion,
        setPawnPromotion, updateStateTwo,
        isCheckMate, setisCheckMate, piecesTurns
    } = props;

    const [state, dispatch] = useReducer(stateManagement, { 
        squares: [], 
        coordinates: { GridX: -1, GridY: -1 },
        nextPosition: { x: -1, y: -1 },
        activePiece: null,
    });


    const [pieceCapturedPosition, setPieceCapturedPosition] = useState([]);
    const [previousPositions, setPreviousPositions] = useState([]);
    const [nextPosition, setNextPosition] = useState([]);
    const [recordMoves, setRecordMoves] = useState([]);
    const [opponent, setOpponent] = useState([]);
    const [enemyTeam, setEnemyTeam] = useState(180);
    const [ourTeam, setOurTeam] = useState(180);
    const [loading, setLoading] = useState(true);

    const chessBoard = useRef(null);
    const titleRef = useRef(null);

    function grabbingPiece(e) {
        e.stopPropagation();
        e.preventDefault(); 

        const Element = e.target;
        const chessBoardEdges = chessBoard.current;
        const DataAttr = Element.getAttribute('datatype');
        const PieceExists = Element.classList.contains('piece');
        const currentTeam = piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;

        if (PieceExists && currentTeam === DataAttr && chessBoardEdges) {
            const gridx = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / 62);
            const gridy = Math.floor((e.clientY - chessBoardEdges.offsetTop) / 62);

            dispatch({
                type: SQUARES.COORDINATES_X_Y,
                payload: {
                    coordinates: {
                        GridX: gridx,
                        GridY: gridy
                    }
                },
            });

            dispatch({
                type: SQUARES.SET_ACTIVE_PIECE,
                payload: {
                    activePiece: Element,
                }
            });

            if (currentTeam === DataAttr) {
                updatePossibleMoves(gridx, gridy);
            }
        }
    }
    
    function MovingPiece(e) {
        const chessBoardEdges = chessBoard.current;

        if (state.activePiece && chessBoardEdges) {
            
            const MinX = chessBoardEdges.offsetLeft - 50;
            const MinY = chessBoardEdges.offsetTop - 15;
            const MaxX = chessBoardEdges.offsetLeft + chessBoardEdges.clientWidth - 40;
            const MaxY = chessBoardEdges.offsetTop + chessBoardEdges.clientHeight - 45; 
            
            const x = e.clientX - 40;
            const y = e.clientY - 40;
            
            state.activePiece.style.position = 'absolute';

            if (x < MinX || x > MaxX || y < MinY || y > MaxY) {
                state.activePiece.style.removeProperty('left');
                state.activePiece.style.removeProperty('top');
                state.activePiece = null;
            } else {
                state.activePiece.style.left = `${x}px`;
                state.activePiece.style.top = `${y}px`;
            }
        }
    }
    
    function droppingPiece(e) {

        const chessBoardEdges = chessBoard.current;

        if (state.activePiece && chessBoardEdges) {
            const x = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / 65);
            const y = Math.floor((e.clientY - chessBoardEdges.offsetTop) / 65);

            dispatch({
                type: SQUARES.UPDATE_NEXT_X_Y,
                payload: {
                    nextPosition: {
                       x: x, y: y
                    },
                }
            });

            const currentPiece = piece.find((t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY);
            const opponentPiece = piece.find((t) => samePosition(t, x, y) && t.team !== currentPiece.team);

            const playMove = successMove(state, x, y, currentPiece, titleRef);

            if (playMove) {

                websocket.emit("message", {
                    prePosition: {
                        gx: state.coordinates.GridX,
                        gy: state.coordinates.GridY,
                    },
                    nextPosition: {
                        x: x,
                        y: y,
                    },
                });

                updatePossibleMoves(state.coordinates.GridX, state.coordinates.GridY);
                setPieceCapturedPosition((prePos) => [...prePos, opponentPiece ? "1" : "0"]);

                if (opponentPiece !== undefined) {
                    setOpponent((preOppPiece) => [...preOppPiece, opponentPiece]);
                }
                
                setPreviousPositions((prePos) => [ 
                        ...prePos, { 
                            gx: state.coordinates.GridX, 
                            gy: state.coordinates.GridY 
                        }
                    ]
                );
                 
                setNextPosition((pos) => [
                    ...pos,
                    { x: x, y: y }
                ]);
                
                updateRecordMoves(
                    state, 
                    setRecordMoves, x, y, 
                    currentPiece, 
                    opponentPiece
                );
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
        }
    }

    useEffect(() => {

        websocket.on("message", (incomingMoves) => {

            setPiece((piece) => {
                return piece.map((p) => {

                    if (p.x === incomingMoves.prePosition.gx && p.y === incomingMoves.prePosition.gy) {
                        p.x = incomingMoves.nextPosition.x;
                        p.y = incomingMoves.nextPosition.y;
                    }
                    
                    return p;
                });
            });
            
            setPiecesTurns(pre => pre + 1);
        });
    }, []);

    useEffect(() => {
        function createBoard() {
            const NumbersAxie = ['8', '7', '6', '5', '4', '3', '2', '1'];
            const CharsAxie = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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

        createBoard();
        setTimeout(() => { setLoading(false); }, 600);
    }, []);

    return (
        <div className="chess-board-page">
            <PawnPromotion 
                x={state.nextPosition.x}
                y={state.nextPosition.y}
                pawnPromotion={pawnPromotion}
                setPawnPromotion={setPawnPromotion}
                ref={titleRef}
                piece={piece}
            />
            <Spinner loading={loading} />
            <div className="chess-board-template">
                <TimerPlayer 
                    setRecordMoves={setRecordMoves}
                    updateStateTwo={updateStateTwo}
                    isCheckMate={isCheckMate}
                    setisCheckMate={setisCheckMate}
                    piecesTurns={piecesTurns}
                    setOurTeam={setOurTeam}
                    setEnemyTeam= {setEnemyTeam}
                    ourTeam={ourTeam}
                    enemyTeam={enemyTeam}
                />
                <div className="chess-board" ref={chessBoard} >
                    {state.squares.map((row, index) => (
                        <div className="row" key={index}>
                            {row.map(({ position, x, y }) => (
                                <Squares 
                                    key={`${x}-${y}`}
                                    piece={piece}
                                    x={x} y={y}
                                    piecesTurns={piecesTurns}
                                    highlightSquare={highlightSquare}
                                    position={position}
                                    state={state}
                                    grabbingPiece={grabbingPiece}
                                    MovingPiece={MovingPiece}
                                    droppingPiece={droppingPiece}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Recorder 
                pieces={piece}
                setPiece={setPiece}
                previousPositions={previousPositions}
                nextPosition={nextPosition}
                opponent={opponent}
                websocket={websocket}
                pieceCapturedPosition={pieceCapturedPosition}
                recordMoves={recordMoves}
                setRecordMoves={setRecordMoves}
            />
        </div>
    );
}