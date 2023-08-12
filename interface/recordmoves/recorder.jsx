import React, { useContext, useState } from 'react';
import { LightContext } from '../wraper/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { samePosition } from '../../movement/constants/functions';
import './recorder.scss';

let count = 1;
let position = 0;

export default function Recorder({ pieces, history, nextPosition, opponent, setPiece, isMatch }) {

    // ##The castling moves and moving piece aren't implemented yet. So, this works only for capture.
    // TODO: unimplemented code for handling king in-check logic is causing bugs. BUG!.
    const { recordMoves, setRecordMoves } = useContext(LightContext);
    const [last, setLast] = useState([]);

    // Deep cloning of the opponent piece and the chess board.
    const cloneOpponent = opponent.map((t) => ({ ...t }));
    const clonedBoard = pieces.map((t) => ({ ...t }));


    function moveBack() {

        // Edge cases if either the count or the moves are null, then simply return.
        if (recordMoves.length === 0 || count < 0) return;

        // Get the last move of the recored array and store it in var.
        const lastMove = recordMoves[recordMoves.length - 1];

        // Remove the last idx of the record moves.
        setRecordMoves(
            (prevMoves) => prevMoves.slice(0, -1)
        );
        
        // Update the other state with that move.
        setLast(
            (prevLast) => [
                ...prevLast, 
                lastMove
            ]
        );
        
        /**
         * @summary { prepos & nextpos }
         * 
         * These are indices in the ./chessBoard component.
         * 
         * The values they have its the previous position of
         * the pieces as well as the next positions.
        */
        
        // Slice only the last index of the array on a click.
        const prepos = history[history.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        // Map through the original state of the pieces and update
        // their values accordingly.
        pieces.map((t) => {

            // If the pieces is in the next position
            // then move it back to the previous pos.
            if (t.x === nextpos.x && t.y === nextpos.y) {
                t.x = prepos.gx;
                t.y = prepos.gy;
            }

            return t;
        });
    
        // This state tracks the positions where the pieces
        // is captured. [0] -> normal move & [1] -> captured.
        const lastIndx = isMatch[isMatch.length - count];
        

        // Only if the pieces was in a captured position do this.
        if (lastIndx === "1") {
        
            const len = cloneOpponent.length;
            
            position += 1;
            
            // Edge cases if the position > or < then stop.
            if (position < 0 || position > len) return;
            

            if (cloneOpponent !== undefined) {

                setPiece((w) => {

                    // Update the captured piece of clonedOpponent
                    // array and push it to the original pieces arr.
                    const update = [
                        ...w, 
                        cloneOpponent[len - position]
                    ];
    
                    return update;
                });
            }
        }

        count += 1;
    }

    // In this fn the logic is reversed - as we need to remove
    // the piece we're adding above to avoid any unexpected behavior.
    function moveForward() {

        if (last.length === 0) return;
        
        count -= 1;

        const nextMove = last[last.length - 1];

        setLast(
            (prevLast) => prevLast.slice(0, -1)
        );
        
        setRecordMoves(
            (prevMoves) => [
                ...prevMoves, 
                nextMove
            ]
        );

        const prepos = history[history.length - count];

        const nextpos = nextPosition[nextPosition.length - count];

        if (prepos === undefined) return;

        // Map and check if the piece in the previous position
        // then, move them to the next.
        pieces.map((t) => {
        
            if (t.x === prepos.gx && t.y === prepos.gy) {
                t.x = nextpos.x;
                t.y = nextpos.y;
            } 

            return t;
        });

        const lastIndx = isMatch[isMatch.length - count];
        
        if (lastIndx === "1") {
            
            const len = cloneOpponent.length;

            const op = cloneOpponent[len - position];

            // Remove the captured piece of the clonedboard array.
            clonedBoard.filter((t) => !samePosition(t, op.x, op.y));

            position -= 1;
        }
    }

    const imgStyle = {
        width: "30px",
        height: "30px",
    };

    const h1Style = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px"
    };

    return (
        <div className='record-container'>
            <h2 style={h1Style}>
                <img src='./knight.png' style={imgStyle} />
                <span>Record moves</span>
            </h2>
            <div className='record-moves'>
                {recordMoves}
            </div>
            <div className='btns-record-moves'>
                <button className='record-left' 
                    // onClick={moveBack}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                        id='arrow-left'
                    />
                </button>
                <button className='record-right' 
                    // onClick={moveForward}
                >
                    <FontAwesomeIcon 
                        icon={faArrowRight} 
                        id='arrow-right'
                    />
                </button>
                
            </div>
            <div className='foot-record-moves'>
                <img src='./crown.png' style={imgStyle} />
                <span>One Game, let's play!</span>
            </div>
            <span className='title'>Still, under development</span>
        </div>
    );
}