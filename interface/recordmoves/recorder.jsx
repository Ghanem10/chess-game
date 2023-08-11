import React, { useContext, useState } from 'react';
import { LightContext } from '../wraper/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './recorder.scss';

let count = 1;

export default function Recorder({ pieces, history, nextPosition }) {

    const { recordMoves, setRecordMoves } = useContext(LightContext);
    const [last, setLast] = useState([]);

    function moveBack() {

        if (recordMoves.length === 0) return;

        const lastMove = recordMoves[recordMoves.length - 1];
        setRecordMoves(prevMoves => prevMoves.slice(0, -1));
        setLast(prevLast => [...prevLast, lastMove]);
        
        const prepos = history[history.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        // TODO
        // Clone the board for captured pieces
        const cloneBoard = pieces.map((t) => ({ ...t }));

        for (const piece of pieces) {
            if (piece.x === nextpos.x && piece.y === nextpos.y) {
                piece.x = prepos.gx;
                piece.y = prepos.gy;
            } 
        }

        count += 1;
    }

    function moveForward() {

        if (last.length === 0) return;
        
        count -= 1;
        const nextMove = last[last.length - 1];

        setLast(prevLast => prevLast.slice(0, -1));
        setRecordMoves(prevMoves => [...prevMoves, nextMove]);

        const prepos = history[history.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        // TODO
        // Clone the board for captured pieces
        const cloneBoard = pieces.map((t) => ({ ...t }));

        for (const piece of pieces) {

            if (piece.x === prepos.gx && piece.y === prepos.gy) {
                piece.x = nextpos.x;
                piece.y = nextpos.y;
            } 
        }
    }

    const imgStyle = {
        width: "50px",
        height: "50px",
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
            </div>
            <div className='foot-record-moves'>
                <img src='./crown.png' style={imgStyle} />
                <span>One Game, let's play!</span>
            </div>
        </div>
    );
}