import React, { useEffect, useRef, useState } from "react";
import displayPieces from "./layout/SortOutPieces";
import piecesRules from "./movement/rules/pawnRules";

const Numbers_Verticlly = ['8', '7', '6', '5', '4', '3', '2', '1'];
const Chars_Horizontally = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let GenerateRandomIndex = 0, count = 0;

const initialstate = [];
const Piece = {
    position: String,
    image: Image,
    x: Number,
    y: Number
};

export default function ChessBoard() {
    const [square, setSquare] = useState([]);
    const [piece, setPiece] = useState(initialstate);
    const Board = useRef(null);

    const [element, setElement] = useState(null);
    const [gridx, setGridX] = useState(0);
    const [gridy, setGridY] = useState(0);
    const rules = new piecesRules();
    
    function createBoard() {
        const Board = [];

        for (let x = 0; x < Numbers_Verticlly.length; x++) {
            const square = [];
            for (let y = 0; y < Chars_Horizontally.length; y++) {

                let image = undefined;

                Piece.position = `${[Chars_Horizontally[x]] + [Numbers_Verticlly[y]]}`;
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
        const Edges = Board.current;

        if (el.classList.contains('piece') && Edges) {
            const x = e.clientX - 40;
            const y = e.clientY - 40;

            const previousX = Math.floor((e.clientX - Edges.offsetLeft) / 75);
            const previousY = Math.floor((e.clientY - Edges.offsetTop) / 75);

            setGridX(previousX);
            setGridY(previousY);

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
            const MaxY = Edges.offsetTop + Edges.clientHeight - 50; 

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
            
            setPiece((row) => {
                const s = row.map((t) => {
                    if (t.x === gridx && t.y === gridy) {
                        const validMove = rules.isOccupied (
                            gridx,
                            gridy,
                            x, y,
                            t.Piece,
                            t.team,
                            row
                        );
                        
                        if (validMove) {
                            t.x = x;
                            t.y = y;
                        }else {
                            element.style.position = 'relative';
                            element.style.removeProperty('left');
                            element.style.removeProperty('top');
                        }
                    }
                    return t;
                });
                return removeDuplicate(s);
            });
            setElement(null);
        }
    }

    function removeDuplicate(pieces) {
        const newPieces = [];
        const positions = [];
        
        pieces.forEach((piece) => {
          const pos = `${piece.x}-${piece.y}`;
          if (!positions.includes(pos)) {
            newPieces.push(piece);
            positions.push(pos);
          }
        });
        
        return newPieces;
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
        displayPieces(initialstate);
    }, [piece]);

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