import React, { useEffect, useState } from "react";
import displayPieces from "./layout/displayImage";


export default function ChessBoard() {
    const [createSquares, setCreateSquare] = useState([]);
    
    const Numbers_Verticlly = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const Chars_Horizontally = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    let GenerateRandomIndex = 0, count = 0;

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

    useEffect(() => {
        createBoard();
    }, []);

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

    return (
        <div className="chessBoard">
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
                                className="square"
                                style={{
                                    width: "59px",
                                    height: "59px",
                                    backgroundColor: colorSwitch(x),
                                    backgroundImage: `url(${displayPieces(x)})`,
                                }}
                            >
                            </div>
                        ) 
                        : 
                        (
                            <div
                                key={index}
                                className="square"
                                style={{
                                    width: "59px",
                                    height: "59px",
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