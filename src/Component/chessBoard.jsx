import React, { useEffect, useRef, useState } from "react";
import displayPieces from "./layout/displayImage";


export default function ChessBoard() {
    const [createSquares, setCreateSquare] = useState([]);
    const Board = useRef(null);

    const [square, setSquare] = useState([]);
    
    const Numbers_Verticlly = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const Chars_Horizontally = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let GenerateRandomIndex = 0, count = 0, isActivePiece = null;
    
    function createBoard() {
        const Board = [];

        for (let y = 0; y < Chars_Horizontally.length; y++) {
            let square = [];
            for (let x = Numbers_Verticlly.length - 1; x >= 0; x--) {
                square.push([Chars_Horizontally[y]] + [Numbers_Verticlly[x]]);
            }
            Board.push(square);
        }
        setCreateSquare(Board);
    }


    // refactor this function, and Modify the parent state.
    function obtainPiecesPositions() {
        const PiecesNames = [
            'rock', 
            'knight', 
            'bishop',
            'queen',
            'king',
            'bishop',
            'knight', 
            'rock', 
        ];
        let count = 0;

        createSquares.map((row) => {
            const Pieces = [];
            row.forEach((x) => {
                const val = x.slice(-1)[0];
                const Piece = {
                    occupid: false,
                    position: '',
                    piece: ''
                };
    
                if (val === '2' || val === '7') {
                    Piece.occupid = true;
                    Piece.piece = 'pawn';
                    Piece.position += `${x}`;
                }
                
                if (val === '1' || val === '8') {

                    if (count < PiecesNames.length + 1) {
                        Piece.occupid = true;
                        Piece.piece += `${PiecesNames[count]}`;
                        Piece.position += `${x}`;

                        if (val === '1') {
                            if (count > 0) {
                                count-= 1;

                                Piece.occupid = true;
                                Piece.piece = `${PiecesNames[count]}`;
                                Piece.position = `${x}`;
                            }
                        }
                    }
                    count+= 1;
                }
                Pieces.push(Piece);
            });
            setSquare(Pieces);
        });
    }

    function grabbingPiece(e) {
        const el = e.target;
        obtainPiecesPositions();
        
        if (el.classList.contains('piece')) {
            const x = e.clientX - 30;
            const y = e.clientY - 30;
            console.log(square)
            const MinX = 210;
            const MaxX = 654;
            const MinY = 68;
            const MaxY = 503;

            el.style.position = 'absolute';
            
            if (x > MinX && x < MaxX) {
                el.style.left = `${x}px`;
            }
            
            if (y > MinY && y < MaxY) {
                el.style.top = `${y}px`;
            }
            
            isActivePiece = el;
        }
        console.log(square)
    }
    
    function MovingPiece(e) {
        const Edges = Board.current;
       
        if (isActivePiece && Edges) {
            
            const MaxX = Edges.offsetLeft * 100 - 148;
            const MinX = Edges.clientHeight / 2 - 23;

            const MinY = Edges.offsetTop - 10;
            const MaxY = Edges.clientWidth / 2 + 44.5; 

            const x = e.clientX - 30;
            const y = e.clientY - 30;
            
            isActivePiece.style.position = 'absolute';

            if (x < MinX) {
                isActivePiece.style.left = `${MinX}px`;
            } else if (x > MaxX) {
                isActivePiece.style.left = `${MaxX}px`;
            }else {
                isActivePiece.style.left = `${x}px`;
            }

            if (y > MaxY) {
                isActivePiece.style.top = `${MaxY}px`;
            } else if (y < MinY) {
                isActivePiece.style.top = `${MinY}px`;
            } else {
                isActivePiece.style.top = `${y}px`;
            }
        }
        
    }

    function dropingPiece() {

        if (isActivePiece) {
            isActivePiece = null;
        }
    }

    const colorSwitch = (x) => {
        let res = x.slice(-1)[0];
        let color = Math.floor(res);

        if (color == 8) {
            if (count > 0) {
                GenerateRandomIndex += 1;
            }
            count += 1;
        }
        return ((color + GenerateRandomIndex) % 2 == 0) ? "white" : "darkblue";
    }

    useEffect(() => {
        
        createBoard();

    }, []);

    return (
        <div 
            className="chessBoard" 
            ref={Board}
            >
            {createSquares.map((row, index) => (
                <div
                    className="row"
                    key={index}
                >
                    {row.map((x, index) => (
                        (displayPieces(x)) 
                        ? 
                        (
                            <div
                                key={index}
                                className="square-piece"
                                style={{
                                    backgroundColor: colorSwitch(x),
                                }}
                            >
                                <div 
                                    className="piece"
                                    style={{
                                        backgroundImage: `url(${displayPieces(x)})`,
                                    }}
                                    onMouseDown={(e) => grabbingPiece(e)}
                                    onMouseMove={(e) => MovingPiece(e)}
                                    onMouseUp={() => dropingPiece()}
                                >
                                </div>
                            </div>
                        ) 
                        : 
                        (
                            <div
                                key={index}
                                className="square"
                                style={{
                                    backgroundColor: colorSwitch(x),
                                }}
                            >
                            </div>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}