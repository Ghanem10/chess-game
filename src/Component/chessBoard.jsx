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
                square.push([Chars_Horizontally[y]] + [Numbers_Verticlly[x]]);
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
        let res = x.slice(-1)[0];
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
                         {x.slice(-1)[0] == '7' && <Image index={'./black-pawn.png'}/>}
                         {x.slice(-1)[0] == '2' && <Image index={'./white-pawn.png'}/>}
                         {x.slice() == 'a1' && <Image index={'./white-rock.png'}/>}
                         {x.slice() == 'b1' && <Image index={'./white-knight.png'}/>}
                         {x.slice() == 'c1' && <Image index={'./white-bishop.png'}/>}
                         {x.slice() == 'd1' && <Image index={'./white-queen.png'}/>}
                         {x.slice() == 'e1' && <Image index={'./white-king.png'}/>}
                         {x.slice() == 'f1' && <Image index={'./white-bishop.png'}/>}
                         {x.slice() == 'g1' && <Image index={'./white-knight.png'}/>}
                         {x.slice() == 'h1' && <Image index={'./white-rock.png'}/>}

                         {x.slice() == 'a8' && <Image index={'./black-rock.png'}/>}
                         {x.slice() == 'b8' && <Image index={'./black-knight.png'}/>}
                         {x.slice() == 'c8' && <Image index={'./black-bishop.png'}/>}
                         {x.slice() == 'd8' && <Image index={'./black-queen.png'}/>}
                         {x.slice() == 'e8' && <Image index={'./black-king.png'}/>}
                         {x.slice() == 'f8' && <Image index={'./black-bishop.png'}/>}
                         {x.slice() == 'g8' && <Image index={'./black-knight.png'}/>}
                         {x.slice() == 'h8' && <Image index={'./black-rock.png'}/>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}