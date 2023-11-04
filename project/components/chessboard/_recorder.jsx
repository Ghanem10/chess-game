import React, { useEffect, useRef, useState } from 'react';

import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import '../../assets/scss/component/_recorder.scss';
import Chat from '../chatbox/chat';

let count = 1;
let position = 0;

// adjust with objs
export default function Recorder(props) {

    const {  
        recordMoves, setRecordMoves, 
        pieces, previousPositions, nextPosition, 
        opponent, setPiece, pieceCapturedPosition
    } = props;

    const [lastPositionIdx, setLastPositionIdx] = useState([]);
    const cloneOpponent = opponent.map((t) => ({ ...t }));

    const moveBack = () => {

        if (recordMoves.length <= 0 || count < 0) return;

        const lastPositionIdxMove = recordMoves[recordMoves.length - 1];

        setRecordMoves((prevMoves) => prevMoves.slice(0, -1));
        setLastPositionIdx((prevlastPositionIdx) => [...prevlastPositionIdx, lastPositionIdxMove]);

        const prepos = previousPositions[previousPositions.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        pieces.map((t) => {
        
            if (t.x === nextpos.x && t.y === nextpos.y) {
                t.x = prepos.gx; 
                t.y = prepos.gy;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - count];

        if (lastIndx === "1") {
            const len = cloneOpponent.length;
            position += 1;

            if (position <= 0 || position > len) return;
            if (cloneOpponent !== undefined) {
                setPiece((capture) => [...capture, cloneOpponent[len - position]]);
            }
        }

        count += 1;
    }

    const moveForward = () => {
        if (lastPositionIdx.length <= 0) return;
        
        count -= 1;
        const nextMove = lastPositionIdx[lastPositionIdx.length - 1];

        setLastPositionIdx((prevlastPositionIdx) => prevlastPositionIdx.slice(0, -1));
        setRecordMoves((prevMoves) => [...prevMoves, nextMove]);

        const prepos = previousPositions[previousPositions.length - count];
        const nextpos = nextPosition[nextPosition.length - count];

        if (prepos === undefined) return;

        pieces.map((t) => {
            if (t.x === prepos.gx && t.y === prepos.gy) {
                t.x = nextpos.x; 
                t.y = nextpos.y;
            }

            return t;
        });

        const lastIndx = pieceCapturedPosition[pieceCapturedPosition.length - count];

        if (lastIndx === "1") {
            position -= 1;
        }
    }

    return (
        <div className='record-container'>
            <div className='record-container-body'>
                <div className='record-moves'>{recordMoves}</div>
                <div className='btns-record-moves'>
                    <button className='record-1' onClick={moveBack}>
                        <Icon.ArrowLeft className='icon-1'/>
                    </button>
                    <button className='record-2' onClick={moveForward}>
                        <Icon.ArrowRight className='icon-2'/>
                    </button>
                    <button className='record-3'>
                        <Icon.Pause className='icon-3'/>
                    </button>
                </div>
                <Chat />
            </div>
            <Link to={'/'}>
                <button className='record-go-back'>Main page</button>
            </Link>
        </div>
    );
}