
import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addChessPieces } from '../components/squares/pieces';

import Board from '../components/lib/piecesLogic';
import ClonePieces from '../components/lib/clonePieces';

import { Team, Type, samePosition } from '../components/lib/movement/constants/functions';
import { PawnPromotion } from '../components/pawnpromotion/pawnPromotion';

import ResignOrDraw from '../components/resign&Draw/resignOrDraw';
import GameEndTemplate from '../components/endGame/gameEndTemplate';
import updateRecordMoves from '../components/recorder/_updateMoves';
import ResponsiveMobile from '../components/mobile/responsiveMobile';
import RecorderMovesTemplate from '../components/recorder/_recorder';
import TimerPlayer from '../components/timer/index';
import Loading from '../components/spinner/loading';

import { updatePieceValidMove } from '../util/updatePiecesValidMoves';
import { CreateChessBoard } from '../hooks/createChessBoard';

import { 
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
import '../../project/assets/scss/main/responsiveMobile.scss';
import '../../project/assets/scss/main/resignOrDraw.scss';


const websocket = io(`${import.meta.env.VITE_URL}`, {
        transports : ["websocket"] 
});

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
    
    const [ourTeamTimer, setOurTeamTimer] = useState(180);
    const [enemyTeamTimer, setEnemyTeamTimer] = useState(180);
    const [rematch, setRematch] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    const state = useSelector((state) => state.match);
    const user = JSON.parse(localStorage.getItem("token")).user;

    const currentTeam = (piecesTurns % 2 === 1) 
            ? ourTeamTimer 
            : enemyTeamTimer;

    const chessBoard = useRef(null);
    const pawnPromotionTitleRef = useRef(null);

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
            const copyBoardPieces = new ClonePieces(newState).clone();
            setPieces(copyBoardPieces);
        };

        updateState();
    }, []);

    websocket.emit("online-players");
    
    function successMove(state, x, y, currentPiece, pawnPromotionTitleRef) {
        
        const promotePawn = (piece) => {
            const promotionPawn = piece.team === Team.WHITE ? 0 : 7;

            if (y === promotionPawn && piece.Piece === Type.PAWN) {
                pawnPromotionTitleRef.current.classList.remove("hide-title");
                setPawnPromotion(piece);
            }
        };

        if (currentPiece?.team === Team.WHITE && piecesTurns % 2 !== 1) {
            return false;
        } else if (currentPiece?.team === Team.BLACK && piecesTurns % 2 !== 0) {
            return false;
        }

        const validMove = updatePieceValidMove(currentPiece?.possibleMoves, x, y);

        const playMove = board.playMove(
            x, y, 
            state,
            currentPiece,
            promotePawn,
            setPieces, 
            validMove,
        );

        return !!playMove && setPiecesTurns((pre) => pre + 1);
    }

    /**
     * @var {number} offset - offset for the piece to be moved to the mouse position.
    */
   
    const squaresOnPhoneWidth = 47;
    const squaresOnDesktopWidth = 62;
    const offset = 30;

    const grabbingPiece = (e) => {
        e.stopPropagation();
        e.preventDefault(); 

        const targetElement = e.target;
        const chessBoardEdges = chessBoard.current;

        const DataAttr = targetElement.getAttribute('datatype');
        const PieceExists = targetElement.classList.contains('piece');

        const currentTeam = piecesTurns % 2 === 0 
                            ? Team.BLACK 
                            : Team.WHITE;

        if (PieceExists && currentTeam === DataAttr && chessBoardEdges && !pauseReview) {
            const newWidthAndHeight = width < 500 ? squaresOnPhoneWidth : squaresOnDesktopWidth;

            const gridx = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / newWidthAndHeight);
            const gridy = Math.floor((e.clientY - chessBoardEdges.offsetTop) / newWidthAndHeight);

            dispatch(updatePreviousPosition({ GridX: gridx, GridY: gridy }));
            setActivePiece(targetElement);

            if (currentTeam === DataAttr) {
                board.calculateAllMoves(gridx, gridy);
            }
        }
    }
    
    const MovingPiece = (e) => {
        const chessBoardEdges = chessBoard.current;

        if (activePiece && chessBoardEdges) {
            
            // Min and Max X and Y for chess board edges 
            // Pieces can't go beyond these edges

            const MinX = chessBoardEdges.offsetLeft - 50;
            const MinY = chessBoardEdges.offsetTop - 85;
            const MaxX = chessBoardEdges.offsetLeft + chessBoardEdges.clientWidth - 40;
            const MaxY = chessBoardEdges.offsetTop + chessBoardEdges.clientHeight - 45; 
            
            // X and Y are calculated based on the mouse position
            // The piece will be moved to the mouse position

            const x = e.clientX - chessBoardEdges.offsetLeft - offset;
            const y = e.clientY - chessBoardEdges.offsetTop - offset;
            
            activePiece.style.position = 'absolute';
            activePiece.style.zIndex = '4';

            // if (x < MinX || x > MaxX || y < MinY || y > MaxY) {
            //     
            // } else {}

            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
            
        } else {
            activePiece?.style.removeProperty('left');
            activePiece?.style.removeProperty('top');
            setActivePiece(null);
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

    const matchData = {
        move: null,
        message: null,
    };
    
    const droppingPiece = (e) => {

        const chessBoardEdges = chessBoard.current;

        let capturedPiece;
        let isCastling;

        if (activePiece && chessBoardEdges) {
            const newWidthAndHeight = width < 500 ? squaresOnPhoneWidth : squaresOnDesktopWidth;

            const x = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / newWidthAndHeight);
            const y = Math.floor((e.clientY - chessBoardEdges.offsetTop) / newWidthAndHeight);

            dispatch(updateNextPosition({ x: x, y: y }));

            const currentPiece = pieces.find(
                (t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY
            );

            const opponentPiece = pieces.find(
                (t) => samePosition(t, x, y) && t.team !== currentPiece.team
            );

            const playMove = successMove(state, x, y, currentPiece, pawnPromotionTitleRef);

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

                matchData.move = payload;
                websocket.emit("room-game-moves", matchInfo.room, matchData.move);

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

    const resignMatch = () => {
        setOurTeamTimer(0);
    };

    const drawMatch = () => {
        setOurTeamTimer(0);
        setEnemyTeamTimer(0);
    };
    
    useEffect(() => {
        
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, []);

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
        const search = async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_URL}/search`, { 
                        id: user._id 
                    },
                );

                if (data.isEmpty) {
                    navigate("/");
                }

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
    }, []);

    return (
        <div className="chess-board-page">

            <Loading loading={loading} />

            <ResignOrDraw 
                resign={resignMatch} 
                draw={drawMatch} 
                vsengine={false} 
            />

            <div className="chess-board-template">

                <TimerPlayer 
                    isCheckMate={isCheckMate}
                    piecesTurns={piecesTurns}
                    setOurTeam={setOurTeamTimer}
                    setEnemyTeam={setEnemyTeamTimer}
                    enemyTeam={enemyTeamTimer}
                    ourTeam={ourTeamTimer}
                    rematch={rematch}
                    websocket={websocket}
                />

                <div className="chess-board" ref={chessBoard} >
                    <PawnPromotion
                        x={state.nextPosition.x}
                        y={state.nextPosition.y}
                        pawnPromotion={pawnPromotion}
                        setPawnPromotion={setPawnPromotion}
                        ref={pawnPromotionTitleRef}
                        piece={pieces}
                        vsEngine={false}
                    />

                    <CreateChessBoard 
                        grabbingPiece={grabbingPiece}
                        MovingPiece={MovingPiece}
                        droppingPiece={droppingPiece}
                        activePiece={activePiece}
                        highlightSquare={highlightSquare}
                        chessBoard={chessBoard}
                        pieces={pieces}
                        piecesTurns={piecesTurns}
                    />

                    {
                        (isCheckMate || ourTeamTimer <= 0 || enemyTeamTimer <= 0) && (
                            <GameEndTemplate
                                isCheckMate={isCheckMate}
                                piecesTurns={piecesTurns}
                                currentTeam={currentTeam}
                                ourTeamTimer={ourTeamTimer}
                                enemyTeamTimer={enemyTeamTimer} 
                                setRematch={setRematch}
                                setisCheckMate={setisCheckMate}
                                setRecordMoves={setRecordMoves}
                                setPiecesTurns={setPiecesTurns}
                                setOurTeam={setOurTeamTimer}
                                setPieces={setPieces}
                                setEnemyTeam={setEnemyTeamTimer}
                                matchInfo={matchInfo}
                            />
                        )
                    }
                </div>
            </div>

            {
                (!(width < 700)) ? (
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
                ) : <ResponsiveMobile />
            }

        </div>
    );
}