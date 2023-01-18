import React, { useEffect, useState } from "react";
import Image from './layout/displayImage';

export default function ChessBoard() {
    const [createSquares, setCreateSquare] = useState([]);
    let GenerateRandomIndex = 0;
    let visited = false;
    let count = 0;

    const Numbers_Verticlly = ['1','2','3','4','5','6','7','8'];
    const Chars_Horizontally = ['a','b','c','d','e','f','g','h'];

    function createBoard() {
        const Board = [];
        
        for (let y = 0; y < Chars_Horizontally.length; y++) {
            let square = [];
            for (let x = Numbers_Verticlly.length - 1; x >= 0; x--) {
                square.push([Numbers_Verticlly[x] + Chars_Horizontally[y]]);
            }
            Board.push(square);
        }
        setCreateSquare(Board);
    }
    
    useEffect(() => {
        createBoard();
    }, []);

    // ['2g', '4a']
    const colorSwitch = (x) => {
        let res = x[0].slice()[0];
        let color = Math.floor(res);

        if (color == 8) {
            if (count > 0) {
                visited = true;
                GenerateRandomIndex += 1;
            }
            count += 1;
        }

        console.log(`color: ${color}`+ ` index: ${GenerateRandomIndex}`)
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
                        <div
                            key={index}
                            className="square"
                            style={{
                                width: "59px",
                                height: "59px",
                                backgroundColor: colorSwitch(x)
                            }}
                        >
                         {x[0].slice()[0] == '7' && <Image index={'./black-pawn.png'}/>}
                         {x[0].slice()[0] == '2' && <Image index={'./white-pawn.png'}/>}
                         {x[0].slice() == '1a' && <Image index={'./white-rock.png'}/>}
                         {x[0].slice() == '1b' && <Image index={'./white-knight.png'}/>}
                         {x[0].slice() == '1c' && <Image index={'./white-bishop.png'}/>}
                         {x[0].slice() == '1d' && <Image index={'./white-queen.png'}/>}
                         {x[0].slice() == '1e' && <Image index={'./white-king.png'}/>}
                         {x[0].slice() == '1f' && <Image index={'./white-bishop.png'}/>}
                         {x[0].slice() == '1g' && <Image index={'./white-knight.png'}/>}
                         {x[0].slice() == '1h' && <Image index={'./white-rock.png'}/>}

                         {x[0].slice() == '8a' && <Image index={'./black-rock.png'}/>}
                         {x[0].slice() == '8b' && <Image index={'./black-knight.png'}/>}
                         {x[0].slice() == '8c' && <Image index={'./black-bishop.png'}/>}
                         {x[0].slice() == '8d' && <Image index={'./black-queen.png'}/>}
                         {x[0].slice() == '8e' && <Image index={'./black-king.png'}/>}
                         {x[0].slice() == '8f' && <Image index={'./black-bishop.png'}/>}
                         {x[0].slice() == '8g' && <Image index={'./black-knight.png'}/>}
                         {x[0].slice() == '8h' && <Image index={'./black-rock.png'}/>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}