import React, { useState, useEffect } from "react";

export const useCreateChessBoard = () => {

    const [squares, setSquares] = useState([]);

    useEffect(() => {
        const createBoard = () => {
            const NumbersAxie = ["8", "7", "6", "5", "4", "3", "2", "1"];
            const CharsAxie = ["a", "b", "c", "d", "e", "f", "g", "h"];

            const Board = [];
            
            for (let x = 0; x < NumbersAxie.length; x++) {
                const square = [];
                
                for (let y = 0; y < CharsAxie.length; y++) {
                    square.push({
                        position: `${[CharsAxie[x]] + [NumbersAxie[y]]}`, 
                        x: x, y: y
                    });
                }
                Board.push(square);
            }
            setSquares(Board);    
        }

        createBoard();
    }, []);

    return squares;
};