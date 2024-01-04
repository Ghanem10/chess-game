
import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addChessPieces } from '../components/squares/pieces';

import Board from '../components/lib/piecesLogic';
import ClonePieces from '../components/lib/clonePieces';

import { Team, Type } from '../components/lib/movement/constants/functions';
import { PawnPromotion } from '../components/pawnpromotion/pawnPromotion';

import ResignOrDraw from '../components/resign&Draw/resignOrDraw';
import EngineEndgame from '../components/engine/engine.endgame';
import ResponsiveMobile from '../components/mobile/responsiveMobile';
import Loading from '../components/spinner/loading';

import { CreateChessBoard } from '../hooks/createChessBoard';
import { updatePieceValidMove } from '../util/updatePiecesValidMoves';

import { 
    updateNextPosition, 
    updatePreviousPosition
} from '../redux/actions/matchAction';

import '../assets/scss/main/chessboard.scss';
import '../assets/scss/main/pawnPromotion.scss';
import '../../project/assets/scss/main/_endGame.scss';
import '../../project/assets/scss/main/responsiveMobile.scss';
import '../../project/assets/scss/main/resignOrDraw.scss';


export default function Vsengine() {
    
    const [pieces, setPieces] = useState([]);
    const [isCheckMate, setisCheckMate] = useState(false);
    const [pawnPromotion, setPawnPromotion] = useState(null);
    const [highlightSquare, setHighlightSquare] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [piecesTurns, setPiecesTurns] = useState(1);
    const [loading, setLoading] = useState(true);
    const [resign, setResign] = useState(false);
    const [draw, setDraw] = useState(false);
    
    const [width, setWidth] = useState(window.innerWidth);

    const state = useSelector((state) => state.match);

    const chessBoard = useRef(null);
    const pawnPromotionTitleRef = useRef(null);

    const dispatch = useDispatch();

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
        
        return !!playMove;
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

        if (PieceExists && currentTeam === Team.WHITE && chessBoardEdges) {
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
            
            // X and Y are calculated based on the mouse position
            // The piece will be moved to the mouse position

            const x = e.clientX - chessBoardEdges.offsetLeft - offset;
            const y = e.clientY - chessBoardEdges.offsetTop - offset;

            activePiece.style.position = 'absolute';
            activePiece.style.zIndex = '4';

            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;

        } else {
            activePiece?.style.removeProperty('left');
            activePiece?.style.removeProperty('top');

            setActivePiece(null);
        }
    };
    
    const droppingPiece = (e) => {

        const chessBoardEdges = chessBoard.current;

        if (activePiece && chessBoardEdges) {
            const newWidthAndHeight = width < 500 ? squaresOnPhoneWidth : squaresOnDesktopWidth;

            const x = Math.floor((e.clientX - chessBoardEdges.offsetLeft) / newWidthAndHeight);
            const y = Math.floor((e.clientY - chessBoardEdges.offsetTop) / newWidthAndHeight);

            dispatch(updateNextPosition({ x: x, y: y }));

            const currentPiece = pieces.find(
                (t) => t.x === state.coordinates.GridX && t.y === state.coordinates.GridY
            );

            const playMove = successMove(state, x, y, currentPiece, pawnPromotionTitleRef);

            if (playMove) {

                board.calculateAllMoves(state.coordinates.GridX, state.coordinates.GridY);
                setPiecesTurns((pre) => pre + 1);

            } else {
                activePiece.style.position = 'relative';
                activePiece.style.removeProperty('left');
                activePiece.style.removeProperty('top');
            }

            setActivePiece(null);
        }
    };

    const resignMatch = () => {
        setResign(true);
    };

    const drawMatch = () => {
        setDraw(true);
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
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="chess-board-page">

            <Loading loading={loading} />

            <ResignOrDraw 
                resign={resignMatch} 
                draw={drawMatch}
                vsengine={true}
            />

            <div className="chess-board-template">
                <div className="chess-board" ref={chessBoard} >
                    <PawnPromotion
                        x={state.nextPosition.x}
                        y={state.nextPosition.y}
                        pawnPromotion={pawnPromotion}
                        setPawnPromotion={setPawnPromotion}
                        ref={pawnPromotionTitleRef}
                        piece={pieces}
                        vsEngine={true}
                    />

                    <EngineEndgame
                        isCheckMate={isCheckMate}
                        setisCheckMate={setisCheckMate}  
                        setPieces={setPieces}
                        resign={resign}
                        draw={draw}
                    />

                    <CreateChessBoard 
                        grabbingPiece={grabbingPiece}
                        MovingPiece={MovingPiece}
                        droppingPiece={droppingPiece}
                        activePiece={activePiece}
                        highlightSquare={highlightSquare}
                        pieces={pieces}
                        piecesTurns={piecesTurns}
                    />
                </div>
            </div>

            {
                (width < 700) && (
                    <ResponsiveMobile />
                )
            }

        </div>
    );
}
