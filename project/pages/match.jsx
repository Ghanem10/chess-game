
import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addChessPieces } from '../components/squares/pieces';

import Board from '../components/lib/piecesLogic';
import ClonePieces from '../components/lib/clonePieces';
import Squares from '../components/squares/squaresLayout';

import { Team, Type, samePosition } from '../components/lib/movement/constants/functions';
import { PawnPromotion } from '../components/pawnpromotion/pawnPromotion';
import updateRecordMoves from '../components/recorder/_updateMoves';

import RecorderMovesTemplate from '../components/recorder/_recorder';
import TimerPlayer from '../components/timer/index';

import { 
    updateBoardState, 
    updateBoardStatePieces, 
    updateNextPosition, 
    updatePreviousPosition
} from '../redux/actions/matchAction';

import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

import '../assets/scss/main/chessboard.scss';
import '../assets/scss/main/pawnPromotion.scss';
import '../../project/assets/scss/main/chat.scss';
import '../../project/assets/scss/main/_recorder.scss';
import '../../project/assets/scss/main/_timer.scss';
import '../../project/assets/scss/main/_endGame.scss';


const websocket = io(`${import.meta.env.VITE_URL}`, 
    {
        transports : ["websocket"] 
    },
);

export default function MainTemplateBoard() {

    /**
     * @description Main function for board logic, pieces movements,
     * local state updates (pieces position, turns, pawn promotion),
     * and socket connection handling for player matchmaking.
    */
    
    const [pieces, setPieces] = useState([]);
    const [isCheckMate, setisCheckMate] = useState(false);
    const [pawnPromotion, setPawnPromotion] = useState(null);
    const [highlightSquare, setHighlightSquare] = useState([]);
    const [recordMoves, setRecordMoves] = useState([]);
    const [idxCount, setIdxCount] = useState(1);
    const [activePiece, setActivePiece] = useState(null);
    const [piecesTurns, setPiecesTurns] = useState(1);
    const [pieceToPlay, setPieceToPlay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pauseReview, setPauseReview] = useState(false);
    
    const state = useSelector((state) => state.match);
    const user = JSON.parse(localStorage.getItem("token")).user;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const board = new Board(
        pieces, 
        setHighlightSquare, 
        piecesTurns,
        setisCheckMate,
    );

    useEffect(() => {
        const updateState = () => {
            const newState = addChessPieces();
            const copy = new ClonePieces(newState).clone();
            
            dispatch(updateBoardStatePieces(copy));
            setPieces(copy);
        };

        updateState();
    }, []);

    const updatePieceValidMove = (s, b, c) => {
        const m = s.some(a => a.x === b && a.y === c);
        return m ? true : false;
    }

    websocket.emit("online-players");
    
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
            setPieces, 
            validMove,
        );

        if (playMove) {
            setPiecesTurns((pre) => pre + 1);
        } else {
            return false;
        }

        return playMove;
    }

    const chessBoard = useRef(null);
    const titleRef = useRef(null);

    const grabbingPiece = (e) => {
        e.stopPropagation();
        e.preventDefault(); 

        const Element = e.target;
        const chessBoardEdges = chessBoard.current;
        const DataAttr = Element.getAttribute('datatype');
        const PieceExists = Element.classList.contains('piece');
        const currentTeam = piecesTurns % 2 === 0 ? Team.BLACK : Team.WHITE;

        if (PieceExists && currentTeam === DataAttr && chessBoardEdges && !pauseReview) {
            const gridx = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / 62);
            const gridy = Math.floor((e.clientY - chessBoardEdges.offsetTop) / 62);

            dispatch(updatePreviousPosition({ GridX: gridx, GridY: gridy }));
            setActivePiece(Element);

            if (currentTeam === DataAttr) {
                board.calculateAllMoves(gridx, gridy);
            }
        }
    }
    
    const MovingPiece = (e) => {
        const chessBoardEdges = chessBoard.current;

        if (activePiece && chessBoardEdges) {
            
            const MinX = chessBoardEdges.offsetLeft - 50;
            const MinY = chessBoardEdges.offsetTop - 85;
            const MaxX = chessBoardEdges.offsetLeft + chessBoardEdges.clientWidth - 40;
            const MaxY = chessBoardEdges.offsetTop + chessBoardEdges.clientHeight - 45; 
            
            const x = e.clientX - 40;
            const y = e.clientY - 40;
            
            activePiece.style.position = 'absolute';
            activePiece.style.zIndex = '4';

            if (x < MinX || x > MaxX || y < MinY || y > MaxY) {
                activePiece.style.removeProperty('left');
                activePiece.style.removeProperty('top');

                setActivePiece(null);
            } else {
                activePiece.style.left = `${x}px`;
                activePiece.style.top = `${y}px`;
            }
        }
    };

    /**
     * @property {string} room - room id.
     * @property {string} playerId - player id.
     * @property {Object} move - move made by each player.
     * @property {string} message - message.
    */

    const [matchInfo, setMatchInfo] = useState({
        room: null,
        playerId: user._id,
        team: null,
    });

    const match = {
        move: null,
        message: null,
    };
    
    const droppingPiece = (e) => {

        const chessBoardEdges = chessBoard.current;

        let capturedPiece;
        let isCastling;

        if (activePiece && chessBoardEdges) {

            const x = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / 65);
            const y = Math.floor((e.clientY - chessBoardEdges.offsetTop) / 65);

            dispatch(updateNextPosition({ x: x, y: y }));

            const currentPiece = pieces.find(
                (t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY
            );

            const opponentPiece = pieces.find(
                (t) => samePosition(t, x, y) && t.team !== currentPiece.team
            );

            const playMove = successMove(state, x, y, currentPiece, titleRef);

            if (playMove) {
                if (
                    currentPiece.x === opponentPiece?.x && 
                    currentPiece.y === opponentPiece?.y
                    ) {
                    capturedPiece = opponentPiece;
                }

                if (currentPiece.Piece === Type.KING) {
                    isCastling = currentPiece.isCaslt;
                }

                const payload = {
                    prePosition: {
                        gx: state.coordinates.GridX,
                        gy: state.coordinates.GridY,
                    },
                    nextPosition: {
                        x: x,
                        y: y,
                    },
                    capture: capturedPiece,
                    caslting: isCastling,
                };

                match.move = payload;
                websocket.emit("room-game-moves", matchInfo.room, match.move);

                board.calculateAllMoves(state.coordinates.GridX, state.coordinates.GridY);

                setPieceToPlay(pre => [...pre, payload]);

                updateRecordMoves( 
                    state,
                    idxCount,
                    setIdxCount,
                    setRecordMoves, x, y,
                    currentPiece, 
                    opponentPiece
                );

            } else {
                activePiece.style.position = 'relative';
                activePiece.style.removeProperty('left');
                activePiece.style.removeProperty('top');
            }

            setActivePiece(null);
        }
    };

    useEffect(() => {
        websocket.on("room-game-moves", (move) => {
            
            setPieces((piece) => {
                return piece.map((p) => {
                    if (
                        p.x === move.prePosition.gx && 
                        p.y === move.prePosition.gy
                        ) {
                        return {
                            ...p,
                            x: move.nextPosition.x,
                            y: move.nextPosition.y
                        };
                    }
                    
                    return p;
                });
            });

            setPiecesTurns(piecesTurns + 1);
        });
    }, []);


    useEffect(() => {
        const createBoard = () => {
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
    
            dispatch(updateBoardState(Board));
        };

        const search = async () => {
            try {
                const { data } = await axios
                    .post(`${import.meta.env.VITE_URL}/search`, { 
                        id: user._id 
                    },
                );

                // if (data.isEmpty) {
                //     navigate("/");
                // }

                localStorage.setItem("secondPlayer", JSON.stringify(data));

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        websocket.emit("enter-room-on-match-start", matchInfo);
        websocket.on('joined-room', (roomData) => {
            setMatchInfo((preState) => {

                const player = roomData.players.find(
                    (p) => p.id === matchInfo.playerId
                );

                const playerTeam = player 
                        ? player.team 
                        : null;
            
                return { 
                    ...preState, 
                    room: roomData.id,
                    team: playerTeam,
                };
            });
        });

        search();
        createBoard();
    }, []);

    return (
        <div className="chess-board-page">

            <div className={`${ loading ? "loading-page" : "" }`}>
                <svg className="spinner" viewBox="0 0 50 50">
                    <circle 
                        className="path" 
                        cx="25" cy="25" 
                        r="20" fill="none" 
                        strokeWidth="5"
                    ></circle>
                </svg>
            </div>

            <div className="chess-board-template">

                <TimerPlayer 
                    setRecordMoves={setRecordMoves}
                    isCheckMate={isCheckMate}
                    setisCheckMate={setisCheckMate}
                    piecesTurns={piecesTurns}
                    matchInfo={matchInfo}
                    setPieces={setPieces}
                    websocket={websocket}
                    setPiecesTurns={setPiecesTurns}
                />

                <PawnPromotion
                    x={state.nextPosition.x}
                    y={state.nextPosition.y}
                    pawnPromotion={pawnPromotion}
                    setPawnPromotion={setPawnPromotion}
                    ref={titleRef}
                    piece={pieces}
                    vsEngine={false}
                />

                <div className="chess-board" ref={chessBoard} >

                    {state.squares.map((row, index) => (

                        <div className="row" key={index}>
                            {row.map(({ position, x, y }) => (
                                <Squares
                                    key={`${x}-${y}`}
                                    piece={pieces}
                                    x={x} y={y}
                                    piecesTurns={piecesTurns}
                                    highlightSquare={highlightSquare}
                                    position={position}
                                    activePiece={activePiece}
                                    grabbingPiece={grabbingPiece}
                                    MovingPiece={MovingPiece}
                                    droppingPiece={droppingPiece}
                                />
                            ))}
                        </div>
                    ))}

                </div>
            </div>

            <RecorderMovesTemplate
                setRecordMoves={setRecordMoves}
                setPieces={setPieces}
                ws={websocket}
                recordMoves={recordMoves}
                pieceToPlay={pieceToPlay}
                pieces={pieces}
                setPauseReview={setPauseReview}
                pauseReview={pauseReview}
                match={matchInfo}
            />

        </div>
    );
}