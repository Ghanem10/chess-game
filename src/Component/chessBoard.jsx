import React, { useEffect, useRef, useState } from "react";
import { displayPieces } from "./layout/SortOutPieces";
import { Type, Team, samePosition } from "./movement/functions/func";
import piecesRules from "./movement/pieces/rules/rules";

const NumbersAxie = ['8', '7', '6', '5', '4', '3', '2', '1'];
const CharsAxie = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let GenerateRandomIndex = 0, 
    count = 0;
const initialstate = [];

export default function ChessBoard() {
    const [square, setSquare] = useState([]);
    const [piece, setPiece] = useState(initialstate);
    const [pawnPromotion, setPawnPromotion] = useState();
    const [someY, setSomeY] = useState(null);
    const [someX, setSomeX] = useState(null);
    const Board = useRef(null);
    const titleRef = useRef();

    const [element, setElement] = useState(null);
    const [gridx, setGridX] = useState(0);
    const [gridy, setGridY] = useState(0);
    const pieces = new piecesRules();
    
    function createBoard() {
        const Board = [];

        for (let x = 0; x < NumbersAxie.length; x++) {
            const squares = [];
            for (let y = 0; y < CharsAxie.length; y++) {

                squares.push({
                    position: `${[CharsAxie[x]] + [NumbersAxie[y]]}`, 
                    x: x, y: y
                });
            }
            Board.push(squares);
        }
        setSquare(Board);
    }

    function grabbingPiece(e) {
        const el = e.target;
        const Edges = Board.current;

        if (el.classList.contains('piece') && Edges) {
            const x = e.clientX - 40;
            const y = e.clientY - 40;

            setGridX(Math.floor((e.clientX - Edges.offsetLeft) / 75));
            setGridY(Math.floor((e.clientY - Edges.offsetTop) / 75));

            const MinX = 426, MaxX = 873;
            const MinY = 64, MaxY = 503;

            el.style.position = 'absolute';

            if (x > MinX && x < MaxX) {
                el.style.left = `${x}px`;
            }
            
            if (y > MinY && y < MaxY) {
                el.style.top = `${y}px`;
            }
            setElement(el);
        }
    }
    
    function MovingPiece(e) {
        const Edges = Board.current;
        if (element && Edges) {
            
            const MinX = Edges.offsetLeft - 15;
            const MinY = Edges.offsetTop - 15;
            const MaxX = Edges.offsetLeft + Edges.clientWidth - 60;
            const MaxY = Edges.offsetTop + Edges.clientHeight - 60; 

            const x = e.clientX - 40;
            const y = e.clientY - 40;
            
            element.style.position = 'absolute';

            if (x < MinX) {
                element.style.left = `${MinX}px`;
            } else if (x > MaxX) {
                element.style.left = `${MaxX}px`;
            }else {
                element.style.left = `${x}px`;
            }

            if (y > MaxY) {
                element.style.top = `${MaxY}px`;
            } else if (y < MinY) {
                element.style.top = `${MinY}px`;
            } else {
                element.style.top = `${y}px`;
            }
        }
        
    }

    function dropingPiece(e) {
        const Edges = Board.current;

        if (element && Edges) {

            const x = Math.floor((e.clientX - Edges.offsetLeft) / 75);
            const y = Math.floor((e.clientY - Edges.offsetTop) / 75);
            setSomeX(x);
            setSomeY(y);
            const currentPiece = piece.find(t => t.x === gridx && t.y === gridy);
            const PawnDiraction = currentPiece.team === Team.WHITE ? -1 : 1;

            if (currentPiece) {
                const validMove = pieces.isValid(
                    gridx,
                    gridy,
                    x, y,
                    currentPiece.Piece,
                    currentPiece.team,
                    piece
                );
                const isEnpassantMove = pieces.isEnpassantMove(
                    gridx,
                    gridy,
                    x, y,
                    currentPiece.Piece,
                    currentPiece.team,
                    piece
                );

                if (isEnpassantMove) {
                    const EnpassantPawn = piece.reduce((result, p) => {
                        if (samePosition(p, gridx, gridy)) {
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
                        if (samePosition(p, gridx, gridy)) {
                            p.EnpassantMove = Math.abs(gridy - y) === 2;
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
                    element.style.position = 'relative';
                    element.style.removeProperty('left');
                    element.style.removeProperty('top');
                }
            }
            setElement(null);
        }
    }

    function promotPawn(PieceType) {
        const updatePromotedPieces = piece.reduce((result, p) => {
            const promotionPawnTeam = p.team === Team.WHITE ? "w" : "b";
            if (samePosition(p, someX, someY)) {
                p.Piece = PieceType;
                p.image = `${PieceType}-${promotionPawnTeam}.png`;
            }
            result.push(p);
            return result;
        }, []);
        setPawnPromotion(updatePromotedPieces);
        titleRef.current.classList.add("hide-title");
    }
    function pieceTeamColor () {
        if (pawnPromotion) {
            return pawnPromotion.team === Team.WHITE ? "w" : "b";
        } else {
            return "w";
          }
    }
    const colorSwitch = (x) => {
        const lastChar = x.slice(-1)[0];
        const color = Math.floor(lastChar);
        const isColor = color === 8;

        if (isColor && count > 0) {
            GenerateRandomIndex += 1;
        }
        count += isColor ? 1 : 0;
        return ((color + GenerateRandomIndex) % 2 == 0) ? "white" : "darkblue";
    }

    useEffect(() => {
        createBoard();
        displayPieces(initialstate);
    }, []);

    return (
        <>
            <div id="Pawn-promotion" className="hide-title" ref={titleRef}>
                <div className="body-promotion">
                    <img onClick={() => promotPawn(Type.ROCK)} src={`rock-${pieceTeamColor()}.png`}></img>
                    <img onClick={() => promotPawn(Type.QUEEN)} src={`queen-${pieceTeamColor()}.png`}></img>
                    <img onClick={() => promotPawn(Type.BISHOP)} src={`bishop-${pieceTeamColor()}.png`}></img>
                    <img onClick={() => promotPawn(Type.KNIGHT)} src={`knight-${pieceTeamColor()}.png`}></img>
                </div>
            </div>
            <div 
                className="chessBoard" 
                ref={Board}
                >
                {square.map((row, index) => (
                    <div
                        className="row"
                        key={index}
                    >
                    {row.map(({ position, x, y}, index) => {
                            /** Refactor this code */
                            const currentPiece = piece.find((pre) => pre.x === x && pre.y === y);
                            return (
                                <div
                                key={index}
                                className="square-piece"
                                style={{
                                    backgroundColor: colorSwitch(position),
                                }}
                                onMouseDown={(e) => grabbingPiece(e)}
                                onMouseMove={(e) => MovingPiece(e)}
                                onMouseUp={(e) => dropingPiece(e)}
                            >
                                {
                                    currentPiece && 
                                    <div
                                        className="piece"
                                        style={{
                                            backgroundImage: `url(${currentPiece.image})`,
                                        }}
                                    >
                                    </div>
                                }
                            </div>
                            )
                    })}
                    </div>
                ))}
            </div>
        </>
    );
}