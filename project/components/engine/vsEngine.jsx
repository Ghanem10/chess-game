import React, { useEffect, useReducer, useRef, useState } from 'react';
import stateManagement, { SQUARES } from '../chessboard/state/stateManagement';
import { Team } from '../lib/movement/constants/functions';
import Spinner from '../animation/spinner';
import Squares from '../squares/squaresLayout';
import TimerPlayer from '../chessboard/timer';
import { PawnPromotion } from '../chessboard/pawnPromotion';
import { Link } from 'react-router-dom';

// Style
import '../../assets/scss/engine/vsengine.scss';
import '../../assets/scss/engine/e_pawnPromotion.scss';

export default function VsEngine(props) {
    const { 
        successMove, piece, setPiece,
        updatePossibleMoves, setPiecesTurns,
        highlightSquare, pawnPromotion,
        setPawnPromotion, isCheckMate, 
        setisCheckMate, piecesTurns,
        updateStateTwo
    } = props;

    const [state, dispatch] = useReducer(stateManagement, { 
        squares: [], 
        coordinates: { GridX: -1, GridY: -1 },
        nextPosition: { x: -1, y: -1 },
        activePiece: null,
    });
    
    const [recordMoves, setRecordMoves] = useState([]);
    const [enemyTeam, setEnemyTeam] = useState(180);
    const [ourTeam, setOurTeam] = useState(180);
    const [loading, setLoading] = useState(true);

    const chessBoard = useRef(null);
    const titleRef = useRef(null);

    const searchParams = new URLSearchParams(location.search);
    const ID = searchParams.get("id");

    const grabbingPiece = (e) => {
        e.stopPropagation();
        e.preventDefault(); 

        const Element = e.target;
        const chessBoardEdges = chessBoard.current;
        const PieceExists = Element.classList.contains('piece');
        const currentTeam = piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;

        if (PieceExists &&  chessBoardEdges) {
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

            updatePossibleMoves(gridx, gridy);
        }
    };

    const movingPiece = (e) => {
        const chessBoardEdges = chessBoard.current;

        if (state.activePiece && chessBoardEdges) {
            
            const MinX = chessBoardEdges.offsetLeft - 50;
            const MinY = chessBoardEdges.offsetTop - 15;
            const MaxX = chessBoardEdges.offsetLeft + chessBoardEdges.clientWidth - 40;
            const MaxY = chessBoardEdges.offsetTop + chessBoardEdges.clientHeight - 45; 
            
            const x = e.clientX - 40;
            const y = e.clientY - 40;
            
            state.activePiece.style.position = 'absolute';
            state.activePiece.style.zIndex = '4';

            if (x < MinX || x > MaxX || y < MinY || y > MaxY) {
                state.activePiece.style.removeProperty('left');
                state.activePiece.style.removeProperty('top');
                state.activePiece = null;
            } else {
                state.activePiece.style.left = `${x}px`;
                state.activePiece.style.top = `${y}px`;
            }
        }
    };

    const droppingPiece = (e) => {
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

            const currentPiece = piece.find(
                (t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY
            );

            const playMove = successMove(state, x, y, currentPiece, titleRef);
            
            if (!playMove) {
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
    };


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
        <div className='engine-main-template'>
            <PawnPromotion
                VsEngine={true}
                x={state.nextPosition.x}
                y={state.nextPosition.y}
                pawnPromotion={pawnPromotion}
                setPawnPromotion={setPawnPromotion}
                ref={titleRef}
                piece={piece}
            />
            <Spinner loading={loading} />
            <div className="chess-board-template">
                <Link to={`/${ID ? `?id=${ID}`:''}`}>
                    <button className='chess-board-navigation'>Main Page</button>
                </Link>
                <TimerPlayer 
                    VsEngine={true}
                    setRecordMoves={setRecordMoves}
                    updateStateTwo={updateStateTwo}
                    isCheckMate={isCheckMate}
                    setisCheckMate={setisCheckMate}
                    setPiecesTurns={setPiecesTurns}
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
                                    MovingPiece={movingPiece}
                                    droppingPiece={droppingPiece}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}