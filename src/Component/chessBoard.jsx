import React, { useEffect, useRef, useState } from "react";
import displayPieces from "./layout/displayImage";


export default function ChessBoard() {
    const [createSquares, setCreateSquare] = useState([]);
    const Board = useRef(null);
    
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

    function grabbingPiece(e) {
        const el = e.target;

        if (el.classList.contains('piece')) {
            const x = e.clientX - 30;
            const y = e.clientY - 30;

            el.style.position = 'absolute';
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;

            isActivePiece = el;
        }
    }
    
    function MovingPiece(e) {
        const Edges = Board.current;

        if (isActivePiece && Edges) {
            const MinX = Edges.offsetLeft + 9.15;
            const MinY = Edges.offsetTop - 8.12;

            const x = e.clientX - 30;
            const y = e.clientY - 30;
            
            console.log(x, y)
            isActivePiece.style.position = 'absolute';
            
            // Bug fix x and y
            isActivePiece.style.left = x > MinX ? `${MinX}px` : `${x}px`;
            isActivePiece.style.top = y < MinY ? `${MinY}px` : `${y}px`;
           
            isActivePiece.style.left = x < 214 ? `${214}px` : `${x}px`;
            isActivePiece.style.top = y > 500 ? `${500}px` : `${y}px`;
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
        <div className="chessBoard">
            {createSquares.map((row, index) => (
                <div
                    className="row"
                    key={index}
                    ref={Board}
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