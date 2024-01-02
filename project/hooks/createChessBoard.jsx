import React, { useEffect } from "react";

import Squares from "../components/squares/squaresLayout";

import { updateBoardState } from "../redux/actions/matchAction";
import { useDispatch, useSelector } from "react-redux";

export const CreateChessBoard = ({ 
    grabbingPiece, 
    MovingPiece, 
    droppingPiece, 
    activePiece, 
    highlightSquare, 
    chessBoard, 
    pieces,
    piecesTurns }) => {

    const state = useSelector((state) => state.match);
    const dispatch = useDispatch();

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
            dispatch(updateBoardState(Board));
        }

        createBoard();
    }, []);

    return (
        <div className="chess-board" ref={chessBoard} >

            {state.squares.map((row, index) => (

                <div className="row" key={index}>
                    {row.map(({ position, x, y }) => (
                        <Squares
                            key={`${x}-${y}`}
                            piece={pieces}
                            x={x} y={y}
                            piecesTurns={piecesTurns}
                            highlightSquare={highlightSquare}
                            position={position}
                            activePiece={activePiece}
                            grabbingPiece={grabbingPiece}
                            MovingPiece={MovingPiece}
                            droppingPiece={droppingPiece}
                        />
                    ))}
                </div>
            ))}

        </div>
    );
};