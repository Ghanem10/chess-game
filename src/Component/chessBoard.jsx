import React, { useEffect, useRef, useState } from "react";
import displayPieces from "./layout/displayImage";

const Numbers_Verticlly = ['8', '7', '6', '5', '4', '3', '2', '1'];
const Chars_Horizontally = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let GenerateRandomIndex = 0, count = 0, isActivePiece = null;

const initialstate = [];
const Piece = {
    occupied: Boolean,
    position: String,
    image: Image,
    x: Number,
    y: Number
};

export default function ChessBoard() {
    const [square, setSquare] = useState([]);
    const [piece, setPiece] = useState(initialstate);
    const Board = useRef(null);


    displayPieces(initialstate);

    function createBoard() {
        const Board = [];

        for (let y = 0; y < Chars_Horizontally.length; y++) {
            const square = [];
            for (let x = 0; x < Numbers_Verticlly.length; x++) {

                let image = undefined;
                
                Piece.position = `${[Chars_Horizontally[y]] + [Numbers_Verticlly[x]]}`;
                piece.forEach((t) => {
                    if (t.x === x && t.y === y) {
                        image = t.image;
                    }
                });

                Piece.image = image;
                square.push({ 
                    ...Piece 
                });
            }
            Board.push(square);
        }
        setSquare(Board);
    }

    function grabbingPiece(e) {
        const el = e.target;
        
        if (el.classList.contains('piece')) {
            const x = e.clientX - 30;
            const y = e.clientY - 30;

            const MinX = 426, MaxX = 873;
            const MinY = 64, MaxY = 503;

            el.style.position = 'absolute';
            
            if (x > MinX && x < MaxX) {
                el.style.left = `${x}px`;
            }
            
            if (y > MinY && y < MaxY) {
                el.style.top = `${y}px`;
            }
            
            isActivePiece = el;
        }
    }
    
    function MovingPiece(e) {
        const Edges = Board.current;
        if (isActivePiece && Edges) {
            
            const MaxX = Edges.offsetLeft * 100 + 70;
            const MinX = (Edges.clientHeight / 2) + 197;

            const MinY = Edges.offsetTop - 10;
            const MaxY = (Edges.clientWidth / 2) - 174; 

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

    function dropingPiece(e) {
        const Edges = Board.current;

        if (isActivePiece && Edges) {

            const x = Math.round((e.clientX - Edges.offsetLeft) / 100);
            const y = Math.round((e.clientY - Edges.offsetTop) / 100);

            // fix board indices
            setPiece((row) => {
                const s = row.map((t) => {
                    if (t.x === x && t.y === y) {
                        t.x = x;
                        t.y = y;
                    }
                    return t;
                });
                return s;
            });
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
            {square.map((row, index) => ( 
                <div
                    className="row"
                    key={index}
                >
                    {row.map(({ position, image }, index) => (
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
                                image && 
                                <div
                                    className="piece"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                    }}
                                >
                                </div>
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}