import React, { useContext, useState } from 'react';
import { LightContext } from '../wraper/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPause } from '@fortawesome/free-solid-svg-icons';
import './recorder.scss';

let count = 1;
let position = 0;

export default function Recorder({ pieces, history, nextPosition, opponent, setPiece, isMatch, ours, enemy }) {

    const { recordMoves, setRecordMoves, setToggle } = useContext(LightContext);
    const cloneOpponent = opponent.map((t) => ({ ...t }));
    const [last, setLast] = useState([]);

    function moveBack() {

        if (!(ours <= 0 || enemy <= 0)) return;

        // Edge cases if either the count or the moves are null, then simply return.
        if (recordMoves.length <= 0 || count < 0) return;
        
        setToggle(true);

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
        
        // Slice only the last index of the array on a click.
        const prepos = history[history.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        // This state tracks the positions where the pieces
        // is captured. [0] -> normal move & [1] -> captured.
        
        pieces.map((t) => {
        
            if (t.x === nextpos.x && t.y === nextpos.y) {
                t.x = prepos.gx; 
                t.y = prepos.gy;
            }

            return t;
        });

        const lastIndx = isMatch[isMatch.length - count];

        console.log(isMatch, isMatch.length);
        // Only if the pieces was in a captured position do this.
        if (lastIndx === "1") {
        
            const len = cloneOpponent.length;
            
            position += 1;
            
            // Edge cases if the position > or < then stop.
            if (position <= 0 || position > len) return;
            
            if (cloneOpponent !== undefined) {

                setPiece((capture) => [...capture, cloneOpponent[len - position]]);
            }
        }

        count += 1;
    }

    // In this fn the logic is reversed - as we need to remove
    // the piece we're adding above to avoid any unexpected behavior.
    function moveForward() {

        if (!(ours <= 0 || enemy <= 0)) return;

        if (last.length <= 0) return;
        
        setToggle(true);

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

        pieces.map((t) => {
        
            if (t.x === prepos.gx && t.y === prepos.gy) {
                t.x = nextpos.x; 
                t.y = nextpos.y;
            }

            return t;
        });

        const lastIndx = isMatch[isMatch.length - count];

        if (lastIndx === "1") {
            
            position -= 1;
        }
    }

    function removeReviewMovesTitle() {
        setToggle(false);
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
                    onClick={moveBack}
                >
                    <FontAwesomeIcon 
                        icon={faArrowLeft} 
                        id='arrow-left'
                    />
                </button>
                <button className='record-right' 
                    onClick={moveForward}
                >
                    <FontAwesomeIcon 
                        icon={faArrowRight} 
                        id='arrow-right'
                    />
                </button>
                <button className='record-left' 
                    onClick={removeReviewMovesTitle}
                >
                    <FontAwesomeIcon 
                        icon={faPause} 
                        id='arrow-left'
                    />
                </button>
            </div>
            <div className='foot-record-moves'>
                <img src='./crown.png' style={imgStyle} />
                <span>One Game, let's play!</span>
            </div>
            <p id='title-b'>Review the game after its end.</p>   
        </div>
    );
}